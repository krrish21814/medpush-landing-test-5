import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, comment } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !comment) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter for Outlook
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    // Email content
    const mailOptions = {
      from: `"MEDPUSH Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Same email receives it
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #C11E2B; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 20px; background-color: white; padding: 15px; border-radius: 6px; border-left: 4px solid #C11E2B; }
            .label { font-weight: bold; color: #C11E2B; margin-bottom: 5px; }
            .value { color: #333; }
            .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            a { color: #C11E2B; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Contact Form Submission</h1>
              <p style="margin: 5px 0 0 0;">MEDPUSH Website</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Name</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>
              
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">Phone Number</div>
                <div class="value">${phone || 'Not provided'}</div>
              </div>
              
              <div class="field">
                <div class="label">Message</div>
                <div class="value">${comment}</div>
              </div>
              
              <div class="footer">
                <p>This email was sent from the MEDPUSH contact form</p>
                <p>Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: String(error) },
      { status: 500 }
    );
  }
}
