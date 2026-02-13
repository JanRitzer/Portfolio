import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const validatedData = contactSchema.parse(req.body);

    try {
      await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: "jan.ritzer@tum.de",
        subject: `New Contact Form Message: ${validatedData.subject}`,
        html: `
          <h2>New message from your portfolio website</h2>
          <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
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
    return res.status(500).json({
      success: false,
      error: "Failed to send message",
    });
  }
}
