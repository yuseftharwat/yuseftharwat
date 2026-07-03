import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(10),
});

/**
 * Sends via Resend when RESEND_API_KEY + CONTACT_TO_EMAIL are set.
 * Without them, falls back to logging the inquiry server-side so nothing
 * breaks and no submission is silently lost during development.
 *
 * Required env vars for live sending:
 *   RESEND_API_KEY=
 *   CONTACT_FROM_EMAIL=inquiries@yourdomain.com   (must be a verified Resend sender)
 *   CONTACT_TO_EMAIL=you@yourdomain.com
 */
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { name, email, company, projectType, budget, message } = parsed.data;

  const canSendEmail =
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL;

  if (!canSendEmail) {
    console.log("New contact inquiry (email not configured, logging only):", parsed.data);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        `Project type: ${projectType}`,
        `Budget: ${budget}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
  }
}
