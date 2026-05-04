import nodemailer from 'nodemailer';
import { parseArgs } from 'util';

const YANDEX_USER = process.env.YANDEX_USER;
const YANDEX_APP_PASSWORD = process.env.YANDEX_APP_PASSWORD;
const YANDEX_SMTP_HOST = process.env.YANDEX_SMTP_HOST || 'smtp.yandex.com';
const YANDEX_SMTP_PORT = parseInt(process.env.YANDEX_SMTP_PORT || '465', 10);
const SENDER_NAME = process.env.SENDER_NAME || 'Rayko Azcue Pérez';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'razcue@yandex.com';

const EMAIL_PATTERNS = [
  'hr@{{domain}}',
  'careers@{{domain}}',
  'jobs@{{domain}}',
  'recruiting@{{domain}}',
  'talent@{{domain}}',
  'recruitment@{{domain}}',
  'hiring@{{domain}}',
  'apply@{{domain}}',
  'work@{{domain}}',
  'contact@{{domain}}',
  'info@{{domain}}',
  'hello@{{domain}}',
  'support@{{domain}}',
  'admin@{{domain}}',
  'team@{{domain}}',
  'office@{{domain}}',
  'contactus@{{domain}}',
  'general@{{domain}}',
  'mail@{{domain}}',
  'staff@{{domain}}',
  'dev@{{domain}}',
  'tech@{{domain}}',
  'it@{{domain}}',
];

const DELAY_BETWEEN_EMAILS = 3000; // 3 seconds to space out emails
const RESUME_LINK = 'https://razcue.github.io/Rayko_Azcue_Resume.pdf';

interface SendOptions {
  to: string;
  type: 'outreach' | 'follow-up' | 'summary';
  companyName?: string;
  companyData?: {
    website?: string;
    sector?: string;
    techStack?: string[];
    notes?: string;
    contactType?: string;
    emailsSent?: string[];
    emailsFailed?: string[];
    dateTime?: string;
  };
}

interface SendResult {
  success: boolean;
  sent: string[];
  failed: { email: string; error: string }[];
  messages: string[];
}

function outreachTemplate(companyName: string): { subject: string; html: string } {
  return {
    subject: `Senior Software Developer - ${companyName}`,
    html: `
<p>Hi there,</p>

<p>My name is Rayko Azcue Pérez, and I'm reaching out about potential software development opportunities at ${companyName}.</p>

<p>I'm a Senior Front End & Full Stack Engineer with 7+ years building scalable, performant web applications across SaaS, e-commerce, and other sectors, with focus on TypeScript and PHP. I have a proven track record in remote-first distributed teams across US, Spain, and LATAM.</p>

<p>I'm based in Havana, Cuba, and available for remote work worldwide or relocation. Regarding payments, I can receive money in a US bank account and am open to discussing other payment methods if needed.</p>

<p>You can view my resume here: <a href="${RESUME_LINK}">${RESUME_LINK}</a></p>

<p>Would love to chat about any opportunities you might have. I'm happy to share more about my experience or answer any questions.</p>

<p>Best,<br>
Rayko Azcue Pérez<br>
razcue@yandex.com<br>
razcue.github.io</p>
    `.trim(),
  };
}

function followUpTemplate(companyName: string): { subject: string; html: string } {
  return {
    subject: `Following Up - ${companyName}`,
    html: `
<p>Hi there,</p>

<p>Just following up on my previous email regarding software development opportunities at ${companyName}.</p>

<p>I'm a Senior Front End & Full Stack Engineer with 7+ years building scalable, performant web applications across SaaS, e-commerce, and other sectors, with focus on TypeScript and PHP. I have a proven track record in remote-first distributed teams across US, Spain, and LATAM.</p>

<p>I understand things can get busy, and I just wanted to check if there might be any current or upcoming positions that could be a good fit.</p>

<p>You can view my resume here: <a href="${RESUME_LINK}">${RESUME_LINK}</a></p>

<p>If now isn't the right time, no worries at all - feel free to keep my resume on file for future opportunities.</p>

<p>Best,<br>
Rayko Azcue Pérez<br>
razcue@yandex.com<br>
razcue.github.io</p>
    `.trim(),
  };
}

function summaryTemplate(companyName: string, data: {
  website?: string;
  sector?: string;
  techStack?: string[];
  notes?: string;
  contactType?: string;
  emailsSent?: string[];
  emailsFailed?: string[];
  dateTime?: string;
}): { subject: string; html: string } {
  const website = data.website || '';
  const sector = data.sector || '';
  const techStack = data.techStack || [];
  const notes = data.notes || '';
  const contactType = data.contactType || 'summary';
  const emailsSent = data.emailsSent || [];
  const emailsFailed = data.emailsFailed || [];
  const dateTime = data.dateTime || new Date().toISOString();
  
  const sentList = emailsSent.length > 0 ? emailsSent.map(e => `• ${e}`).join('<br>') : 'None';
  const failedList = emailsFailed.length > 0 ? emailsFailed.map(e => `• ${e}`).join('<br>') : 'None';
  const techList = techStack.length > 0 ? techStack.join(', ') : 'N/A';
  const totalSent = emailsSent.length;
  const totalFailed = emailsFailed.length;
  const total = totalSent + totalFailed;
  
  return {
    subject: `Job Hunt Summary - ${companyName}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Hunt Summary</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: bold; color: #555; }
    .value { color: #333; }
    .emails-section { margin-top: 16px; padding: 12px; background: white; border-radius: 4px; }
    .emails-section h3 { margin: 0 0 8px 0; font-size: 14px; color: #667eea; }
    .sent { color: #22c55e; }
    .failed { color: #ef4444; }
    .total { font-size: 18px; font-weight: bold; color: #333; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${companyName}</h1>
  </div>
  <div class="content">
    <div class="field">
      <span class="label">Website:</span> <span class="value"><a href="${website || '#'}">${website || 'N/A'}</a></span>
    </div>
    <div class="field">
      <span class="label">Sector:</span> <span class="value">${sector || 'N/A'}</span>
    </div>
    <div class="field">
      <span class="label">Tech Stack:</span> <span class="value">${techList}</span>
    </div>
    <div class="field">
      <span class="label">Contact Type:</span> <span class="value">${contactType || 'outreach'}</span>
    </div>
    <div class="field">
      <span class="label">Date & Time:</span> <span class="value">${dateTime || new Date().toISOString()}</span>
    </div>
    
    <div class="emails-section">
      <h3>Emails Sent (${totalSent})</h3>
      <div class="sent">${sentList}</div>
    </div>
    
    <div class="emails-section">
      <h3>Emails Failed (${totalFailed})</h3>
      <div class="failed">${failedList}</div>
    </div>
    
    <div class="field" style="margin-top: 16px;">
      <span class="label">Total:</span> <span class="total">${total} emails</span>
    </div>
    
    ${notes ? `<div class="field" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0;">
      <span class="label">Notes:</span> <span class="value">${notes}</span>
    </div>` : ''}
  </div>
</body>
</html>
    `.trim(),
  };
}

function getEmailsForDomain(domain: string): string[] {
  return EMAIL_PATTERNS.map((pattern) => pattern.replace('{{domain}}', domain));
}

async function sendEmail(to: string, subject: string, html: string, attachment?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  if (!YANDEX_USER || !YANDEX_APP_PASSWORD) {
    return {
      success: false,
      error: 'Missing YANDEX_USER or YANDEX_APP_PASSWORD environment variables',
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

  const attachments = attachment
    ? [{ filename: 'Rayko_Azcue_Resume.pdf', path: attachment }]
    : undefined;

  try {
    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to,
      subject,
      html,
      replyTo: SENDER_EMAIL,
      attachments,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function send(options: SendOptions): Promise<SendResult> {
  const { to, type, companyName, companyData } = options;

  // Split comma-separated emails into array
  const emailList = to.split(',').map(e => e.trim()).filter(e => e);
  
  // If no @ in any, treat as domain (generate all email patterns)
  // Otherwise treat as email addresses
  const isDomain = emailList.length > 0 && !emailList[0].includes('@');
  const recipients = isDomain ? getEmailsForDomain(to) : emailList;

  // Determine company name: provided, or extract from domain, or use as-is
  const targetCompany = companyName || (isDomain ? to : to.split('@')[0]);

  // Select template based on type
  let template;
  if (type === 'summary') {
    template = summaryTemplate;
  } else if (type === 'outreach') {
    template = outreachTemplate;
  } else {
    template = followUpTemplate;
  }
  
  const subject = type === 'summary' && companyData 
    ? (template as (name: string, data: any) => ({ subject: '', html: '' }))(targetCompany, companyData)
    : (template as (name: string) => ({ subject: '', html: '' }))(targetCompany);

  const sent: string[] = [];
  const failed: { email: string; error: string }[] = [];
  const messages: string[] = [];

  for (const email of recipients) {
    const result = await sendEmail(email, subject.subject, subject.html, undefined);

    if (result.success) {
      sent.push(email);
      messages.push(`✓ Sent ${type} to: ${email}`);
    } else {
      failed.push({ email, error: result.error || 'Unknown error' });
      messages.push(`✗ Failed to ${email}: ${result.error}`);
    }

    // Add delay between emails to avoid spam detection
    if (recipients.indexOf(email) < recipients.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_EMAILS));
    }
  }

  // After outreach or follow-up, automatically send summary to raykoazp@gmail.com
  if (type === 'outreach' || type === 'follow-up') {
    const { default: dotenv } = await import('dotenv');
    dotenv.config();
    
    const summaryData = {
      website: companyData?.website || (isDomain ? 'https://' + to : ''),
      sector: companyData?.sector || '',
      techStack: companyData?.techStack || [],
      notes: companyData?.notes || '',
      contactType: type,
      emailsSent: sent,
      emailsFailed: failed.map(f => f.email),
      dateTime: new Date().toISOString()
    };
    
    const summaryHtml = summaryTemplate(targetCompany, summaryData);
    await sendEmail('raykoazp@gmail.com', summaryHtml.subject, summaryHtml.html, undefined);
    messages.push(`✓ Summary sent to raykoazp@gmail.com`);
  }

  return {
    success: failed.length === 0,
    sent,
    failed,
    messages,
  };
}

async function main() {
  const { values } = parseArgs({
    options: {
      to: { type: 'string' },
      type: { type: 'string' },
      company: { type: 'string' },
    },
  });

  const { to, type, company } = values;

  if (!to || !type) {
    console.error('Usage: bun run lib/yandex-mailer.ts --to <email|domain> --type <outreach|follow-up> [--company <name>]');
    console.error('');
    console.error('Options:');
    console.error('  --to <value>     Recipient email or domain (required)');
    console.error('  --type <val>    Type: "outreach" or "follow-up" (required)');
    console.error('  --company       Company name for email template (optional)');
    process.exit(1);
  }

  if (type !== 'outreach' && type !== 'follow-up' && type !== 'summary') {
    console.error('Error: --type must be "outreach", "follow-up", or "summary"');
    process.exit(1);
  }

  // If no @, treat as domain (generate all email patterns)
  // If has @, treat as single email address
  const isDomain = !to.includes('@');
  const target = isDomain ? to : 'email address';
  const companyName = company || (isDomain ? to : to.split('@')[0]);

  console.log(`Sending ${type} email to: ${target}`);
  console.log(`Type: ${type}`);
  console.log('');

  const result = await send({ to, type: type as 'outreach' | 'follow-up' | 'summary', companyName });

  console.log('\n--- Results ---');
  for (const msg of result.messages) {
    console.log(msg);
  }

  console.log(`\nSent: ${result.sent.length}`);
  console.log(`Failed: ${result.failed.length}`);

  if (result.sent.length === 0) {
    console.error('\n✗ No emails sent - aborting');
    process.exit(1);
  }

  console.log('\n--- Output Data ---');
  console.log(`SENT_EMAILS=${result.sent.join(',')}`);
  console.log(`FAILED_EMAILS=${result.failed.map((f) => f.email).join(',')}`);

  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export type { SendOptions, SendResult };
export {
  outreachTemplate,
  followUpTemplate,
  summaryTemplate,
  getEmailsForDomain,
};