import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(254, "Email is too long"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

// --- HTML escaping ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// --- Rate limiting (in-memory, per serverless instance) ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per IP per minute

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, ip) => {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  });
}, RATE_LIMIT_WINDOW_MS);

// --- Allowed origins ---
const ALLOWED_ORIGINS = [
  "https://janritzer.dev",
  "https://www.janritzer.dev",
  "http://localhost:5173",
  "http://localhost:3000",
];

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // Origin validation
  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ success: false, error: "Forbidden" });
  }

  // Rate limiting
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    || req.socket.remoteAddress
    || "unknown";

  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, error: "Too many requests. Please try again later." });
  }

  try {
    const validatedData = contactSchema.parse(req.body);

    const safeName = escapeHtml(validatedData.name);
    const safeEmail = escapeHtml(validatedData.email);
    const safeSubject = escapeHtml(validatedData.subject);
    const safeMessage = escapeHtml(validatedData.message).replace(/\n/g, "<br>");

    const { error: emailError } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "jan.ritzer@tum.de",
      subject: `New Contact Form Message: ${validatedData.subject}`,
      html: `
        <h2>New message from your portfolio website</h2>
        <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (emailError) {
      console.error("Failed to send email:", emailError);
      return res.status(500).json({ success: false, error: "Failed to send message" });
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: "Invalid form data",
      });
    }
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to send message",
    });
  }
}
