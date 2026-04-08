import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, vehicle, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Use Resend to send email
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

    if (!RESEND_API_KEY || !CONTACT_EMAIL) {
      console.error('Missing RESEND_API_KEY or CONTACT_EMAIL environment variables');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Vette Contact Form <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        subject: `New Inquiry from ${name}${vehicle ? ` — ${vehicle}` : ''}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e63946; border-bottom: 2px solid #e63946; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td>
              </tr>` : ''}
              ${vehicle ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">Vehicle of Interest:</td>
                <td style="padding: 8px 0;">${vehicle}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
              <strong>Message:</strong>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; color: #888; font-size: 12px;">
              Sent from Vette website contact form
            </p>
          </div>
        `,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Resend API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
