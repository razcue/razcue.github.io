import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { parseArgs } from 'util';

config();

const YANDEX_USER = process.env.YANDEX_USER;
const YANDEX_APP_PASSWORD = process.env.YANDEX_APP_PASSWORD;
const YANDEX_SMTP_HOST = process.env.YANDEX_SMTP_HOST || 'smtp.yandex.com';
const YANDEX_SMTP_PORT = parseInt(process.env.YANDEX_SMTP_PORT || '465', 10);
const SENDER_NAME = process.env.SENDER_NAME || 'Rayko Azcue Pérez';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'razcue@yandex.com';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  fromName?: string;
  replyTo?: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const { to, subject, html, text, fromName, replyTo, attachments } = options;

  if (!YANDEX_USER || !YANDEX_APP_PASSWORD) {
    return {
      success: false,
      error:
        'Missing YANDEX_USER or YANDEX_APP_PASSWORD environment variables. Create an app password at https://id.yandex.com/security/app-passwords',
    };
  }

  const transporter = nodemailer.createTransport({
    host: YANDEX_SMTP_HOST,
    port: YANDEX_SMTP_PORT,
    secure: true,
    auth: {
      user: YANDEX_USER,
      pass: YANDEX_APP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${fromName || SENDER_NAME}" <${SENDER_EMAIL}>`,
      to,
      subject,
      html,
      text,
      replyTo: replyTo || SENDER_EMAIL,
      attachments: attachments?.map((att) => ({
        filename: att.filename,
        path: att.path,
      })),
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const { values } = parseArgs({
    options: {
      to: { type: 'string' },
      subject: { type: 'string' },
      html: { type: 'string' },
      text: { type: 'string' },
      'from-name': { type: 'string' },
      'reply-to': { type: 'string' },
      attachment: { type: 'string' },
    },
  });

  const {
    to,
    subject,
    html,
    text,
    'from-name': fromName,
    'reply-to': replyTo,
    attachment,
  } = values;

  if (!to || !subject) {
    console.error(
      'Usage: bun run lib/yandex-mailer.ts --to "recipient@example.com" --subject "Subject" --html "<p>Body</p>"'
    );
    console.error('');
    console.error('Options:');
    console.error('  --to <email>          Recipient email (required)');
    console.error('  --subject <text>      Email subject (required)');
    console.error(
      '  --html <html>         HTML body (optional, requires --text if not provided)'
    );
    console.error(
      '  --text <text>        Plain text body (optional, required if --html not provided)'
    );
    console.error(
      '  --from-name <name>   Sender name (optional, default: Rayko Azcue Pérez)'
    );
    console.error('  --reply-to <email>   Reply-to email (optional)');
    console.error('  --attachment <path>  PDF attachment path (optional)');
    process.exit(1);
  }

  if (!html && !text) {
    console.error('Error: Either --html or --text must be provided');
    process.exit(1);
  }

  const attachments: Attachment[] = [];
  if (attachment) {
    const files = attachment.split(',');
    for (const file of files) {
      const [filename, path] = file.trim().split('=');
      if (filename && path) {
        attachments.push({ filename: filename.trim(), path: path.trim() });
      }
    }
  }

  console.log(`Sending email to: ${to}`);
  console.log(`Subject: ${subject}`);
  if (attachments.length > 0) {
    console.log(
      `Attachments: ${attachments.map((a) => a.filename).join(', ')}`
    );
  }

  const result = await sendEmail({
    to,
    subject,
    html,
    text,
    fromName,
    replyTo,
    attachments: attachments.length > 0 ? attachments : undefined,
  });

  if (result.success) {
    console.log(`✓ Email sent successfully!`);
    console.log(`  Message ID: ${result.messageId}`);
  } else {
    console.error(`✗ Failed to send email: ${result.error}`);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export {
  sendEmail,
  type SendEmailOptions,
  type SendEmailResult,
  type Attachment,
};
