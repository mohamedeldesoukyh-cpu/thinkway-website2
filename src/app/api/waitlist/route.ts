import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "ThinkWay Waitlist <onboarding@resend.dev>",
      to: "mohamedeldesouky.h@gmail.com",
      subject: `🎉 New waitlist signup: ${email}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
          <h2 style="color:#8b5cf6;margin-bottom:8px;">New ThinkWay signup</h2>
          <p style="color:#334155;font-size:15px;">Someone just joined your waitlist:</p>
          <p style="font-size:18px;font-weight:bold;color:#0f172a;background:#f1f5f9;padding:12px 16px;border-radius:8px;">
            ${email}
          </p>
          <p style="color:#64748b;font-size:13px;margin-top:24px;">
            Sent from your ThinkWay landing page waitlist form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email. Check your RESEND_API_KEY." }, { status: 500 });
  }
}
