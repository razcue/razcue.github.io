import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Mark this endpoint as server-rendered (required for POST requests)
export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
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
        from: 'Rayko Azcue <onboarding@resend.dev>',
        to: email,
        replyTo: 'razcue@yandex.com',
        subject: `Re: ${subject}`,
        html: `
          <h2>Thank you for reaching out!</h2>
          <p>Hi ${name},</p>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p><strong>Your message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <br>
          <p>Best regards,<br>Rayko Azcue</p>
        `,
      });
    }

    // Check if both emails were sent successfully
    if (notificationEmail.error || confirmationEmail.error) {
      console.error(
        'Email error:',
        notificationEmail.error || confirmationEmail.error
      );
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Emails sent successfully',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
