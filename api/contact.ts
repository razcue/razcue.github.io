import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Handle CORS
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*'); // In production, set this to 'https://razcue.github.io'
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = request.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return response.status(400).json({ error: 'All fields are required' });
    }

    // Send email to you (notification) with sender's info included
    const notificationEmail = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'razcue@yandex.com', // Your verified email (Resend free plan limitation)
      replyTo: email, // So you can reply directly to the sender
      subject: `Portfolio Contact from ${name}: ${subject}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Reply directly to this email to respond to ${email}</em></p>
      `,
    });

    // For now, we can only send to verified emails in Resend free plan
    // Skip sending confirmation to the sender unless they use your verified email
    let confirmationEmail: { error: null | unknown } = { error: null };

    // Only send confirmation if the sender is you (for testing)
    if (email === 'razcue@yandex.com') {
      confirmationEmail = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: email,
        subject: 'Thank you for contacting me!',
        html: `
          <h2>Thank you for reaching out, ${name}!</h2>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <hr>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p>Best regards,<br>Rayko Azcue</p>
        `,
      });
    }

    if (notificationEmail.error || confirmationEmail.error) {
      console.error('Email error:', notificationEmail.error || confirmationEmail.error);
      return response.status(500).json({ 
        error: 'Failed to send email. Please try again.' 
      });
    }

    return response.status(200).json({ 
      success: true,
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return response.status(500).json({ 
      error: 'An error occurred. Please try again later.' 
    });
  }
}
