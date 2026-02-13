import { z } from "zod";

export const insertContactMessageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export interface ContactMessage extends InsertContactMessage {
  id: string;
  createdAt: string;
}
