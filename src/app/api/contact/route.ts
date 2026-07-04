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
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { name, email, company, projectType, budget, message, honeypot } = parsed.data;

  // Spam protection: honeypot check
  if (honeypot) {
    console.warn("Spam bot caught by honeypot:", email);
    // Return a fake success to not tip off the bot
    return NextResponse.json({ ok: true, delivered: true });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY is not configured" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Beautifully formatted HTML email template
    const htmlEmail = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f9fafb;">
        <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <div style="background-color: #111827; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">New Project Inquiry</h1>
          </div>
          <div style="padding: 40px 30px;">
            <p style="margin: 0 0 24px; font-size: 16px; color: #374151; line-height: 1.5;">You have received a new project inquiry from <strong>${name}</strong>.</p>
            
            <div style="margin-bottom: 24px; border-left: 4px solid #C69C6D; padding-left: 16px; background-color: #fdfbf7; padding: 16px;">
              <h2 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280;">Client Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 4px 0; font-size: 14px; color: #6b7280; width: 100px;">Name</td>
                  <td style="padding: 4px 0; font-size: 15px; color: #111827; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-size: 14px; color: #6b7280;">Email</td>
                  <td style="padding: 4px 0; font-size: 15px; color: #111827; font-weight: 500;"><a href="mailto:${email}" style="color: #C69C6D; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-size: 14px; color: #6b7280;">Company</td>
                  <td style="padding: 4px 0; font-size: 15px; color: #111827; font-weight: 500;">${company || "—"}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 32px; border-left: 4px solid #C69C6D; padding-left: 16px; background-color: #fdfbf7; padding: 16px;">
              <h2 style="margin: 0 0 16px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280;">Project Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 4px 0; font-size: 14px; color: #6b7280; width: 100px;">Type</td>
                  <td style="padding: 4px 0; font-size: 15px; color: #111827; font-weight: 500; text-transform: capitalize;">${projectType.replace("-", " ")}</td>
                </tr>
                <tr>
                  <td style="padding: 4px 0; font-size: 14px; color: #6b7280;">Budget</td>
                  <td style="padding: 4px 0; font-size: 15px; color: #111827; font-weight: 500;">${budget}</td>
                </tr>
              </table>
            </div>

            <h2 style="margin: 0 0 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280;">Message</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="background-color: #f9fafb; border-top: 1px solid #e5e7eb; padding: 20px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: #9ca3af;">This email was sent from your portfolio website.</p>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: "youssifqp123@gmail.com",
      reply_to: email,
      subject: `New Inquiry: ${projectType.replace("-", " ")} for ${company || name}`,
      html: htmlEmail,
    });

    if (error) {
      console.error("Resend API returned an error:", error);
      return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, delivered: true, id: data?.id });
  } catch (error: any) {
    console.error("Resend send threw an exception:", error);
    return NextResponse.json({ error: error?.message || "Delivery failed" }, { status: 502 });
  }
}
