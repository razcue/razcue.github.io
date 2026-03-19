# Newsletter Setup Guide

This document provides a comprehensive guide for setting up a newsletter system for your Astro-based portfolio/blog site. It covers popular newsletter services, integration options, and best practices.

## Overview

A newsletter system allows you to collect email subscribers and send them updates about your blog posts, projects, or other content. This guide focuses on integrating with your existing Astro site.

## Popular Newsletter Services

### 1. Buttondown

- **Pros**: Simple, developer-friendly, good for small to medium audiences
- **Pricing**: Free for up to 100 subscribers, then $9/month
- **Features**: Markdown support, custom domains, RSS-to-email, analytics

### 2. Mailchimp

- **Pros**: Feature-rich, widely used, good for marketing automation
- **Pricing**: Free for up to 500 subscribers, then tiered pricing
- **Features**: Advanced segmentation, A/B testing, e-commerce integration

### 3. ConvertKit

- **Pros**: Creator-focused, good for bloggers and content creators
- **Pricing**: Free for up to 1,000 subscribers, then $9/month
- **Features**: Visual email editor, forms, landing pages, tags

### 4. Revue (Twitter)

- **Pros**: Free, integrated with Twitter
- **Pricing**: Free
- **Features**: Simple interface, Twitter integration

### 5. Substack

- **Pros**: All-in-one platform for newsletters and blogs
- **Pricing**: Free to start, paid subscriptions available
- **Features**: Built-in blog, paid subscriptions, analytics

## Recommended Setup: Buttondown + Astro

For a developer portfolio site, Buttondown is recommended due to its simplicity and API-first approach.

### Step 1: Create Buttondown Account

1. Go to [buttondown.email](https://buttondown.email)
2. Sign up for an account
3. Verify your email
4. Create your first newsletter

### Step 2: Get API Key

1. Go to Settings > API
2. Generate a new API key
3. Copy the API key (keep it secure)

### Step 3: Set Up Environment Variables

Add to your `.env` file:

```
BUTTONDOWN_API_KEY=your_api_key_here
```

### Step 4: Create Newsletter API Endpoint

Create `api/newsletter.ts` in your `api/` directory:

```typescript
import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Subscribe to Buttondown
    const response = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${import.meta.env.BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to subscribe');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
```

### Step 5: Create Newsletter Signup Component

Create `src/components/blog/NewsletterSignup.tsx`:

```tsx
import { useState } from 'react';
import { getTranslation } from '../../utils/i18n';

interface Props {
  locale: 'en' | 'es';
  className?: string;
}

export default function NewsletterSignup({ className = '', locale }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const t = getTranslation(locale);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const apiBase = import.meta.env.DEV ? 'http://localhost:4321' : '';
      const response = await fetch(`${apiBase}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t.blog.newsletter.successMessage);
        setEmail('');
      } else {
        setMessage(data.error || t.blog.newsletter.errorMessage);
      }
    } catch (error) {
      setMessage(t.blog.newsletter.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
        📬 {t.blog.newsletter.title}
      </h3>
      <p className="text-text-secondary mb-4">
        {t.blog.newsletter.description}
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.blog.newsletter.placeholder}
          className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading
            ? t.blog.newsletter.subscribing
            : t.blog.newsletter.subscribe}
        </button>
      </form>
      {message && (
        <p
          className={`mt-3 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}
        >
          {message}
        </p>
      )}
      <p className="text-xs text-text-secondary mt-3">
        {t.blog.newsletter.poweredBy}
      </p>
    </div>
  );
}
```

### Step 6: Add Translations

Add to `src/i18n/en.ts` in the blog section:

```typescript
newsletter: {
  title: 'Subscribe to my Newsletter',
  description: 'Get the latest posts delivered right to your inbox',
  placeholder: 'your.email@example.com',
  subscribing: 'Subscribing...',
  subscribe: 'Subscribe',
  successMessage: 'Successfully subscribed! Check your email to confirm.',
  errorMessage: 'Failed to subscribe. Please try again.',
  poweredBy: 'Powered by Buttondown. No spam, unsubscribe anytime.',
},
```

Add to `src/i18n/es.ts`:

```typescript
newsletter: {
  title: 'Suscríbete a mi Newsletter',
  description: 'Recibe los últimos artículos directamente en tu bandeja de entrada',
  placeholder: 'tu.email@ejemplo.com',
  subscribing: 'Suscribiendo...',
  subscribe: 'Suscribirse',
  successMessage: '¡Suscripción exitosa! Revisa tu email para confirmar.',
  errorMessage: 'Error al suscribirse. Por favor intenta de nuevo.',
  poweredBy: 'Powered by Buttondown. Sin spam, cancela cuando quieras.',
},
```

### Step 7: Integrate Component

Add to your blog index pages (`src/pages/blog/index.astro` and `src/pages/es/blog/index.astro`):

```astro
import NewsletterSignup from '../../components/blog/NewsletterSignup'; // In the
template, after the featured post:
<div class="mt-8">
  <NewsletterSignup locale="en" client:load />
</div>
```

### Step 8: Install Dependencies

```bash
npm install resend
```

### Step 9: Configure Resend (Optional)

If you want to send confirmation emails, set up Resend:

1. Sign up at [resend.com](https://resend.com)
2. Get API key
3. Add to `.env`: `RESEND_API_KEY=your_key`
4. Update the API endpoint to send confirmation emails

## Alternative: Mailchimp Setup

### Step 1: Create Mailchimp Account

1. Go to [mailchimp.com](https://mailchimp.com)
2. Sign up and create an audience

### Step 2: Get API Key

1. Go to Account > Extras > API Keys
2. Create a key
3. Note your data center (e.g., us1)

### Step 3: Update API Endpoint

Replace the Buttondown API call with:

```typescript
const response = await fetch(
  `https://${dataCenter}.api.mailchimp.com/3.0/lists/${listId}/members`,
  {
    method: 'POST',
    headers: {
      Authorization: `apikey ${import.meta.env.MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'pending', // or 'subscribed' if double opt-in is disabled
    }),
  }
);
```

## Best Practices

### 1. Privacy & Compliance

- Include clear unsubscribe links
- Comply with GDPR/CCPA
- Use double opt-in for better deliverability

### 2. Content Strategy

- Send value, not just promotion
- Keep subject lines engaging
- Personalize when possible

### 3. Technical Considerations

- Rate limit API calls
- Handle errors gracefully
- Test thoroughly before launch

### 4. Analytics

- Track open rates, click rates
- Monitor subscriber growth
- A/B test subject lines and content

## Troubleshooting

### Common Issues

1. **API Rate Limits**: Implement caching or queuing
2. **Email Deliverability**: Use reputable senders, avoid spam triggers
3. **Spam Filters**: Ensure proper authentication (SPF, DKIM, DMARC)

### Testing

- Use tools like Mail-Tester or GlockApps to check deliverability
- Test with multiple email providers (Gmail, Outlook, etc.)

## Resources

- [Buttondown API Docs](https://api.buttondown.email/)
- [Mailchimp API Docs](https://mailchimp.com/developer/)
- [Email on Acid](https://www.emailonacid.com/) - Testing tool
- [Really Good Emails](https://reallygoodemails.com/) - Inspiration

## Cost Comparison

| Service    | Free Tier  | Paid Tier   | Best For      |
| ---------- | ---------- | ----------- | ------------- |
| Buttondown | 100 subs   | $9/month    | Developers    |
| Mailchimp  | 500 subs   | $10/month   | Marketers     |
| ConvertKit | 1,000 subs | $9/month    | Creators      |
| Revue      | Unlimited  | Free        | Twitter users |
| Substack   | Unlimited  | Free + paid | Writers       |

Remember to always test your newsletter setup thoroughly and comply with email regulations in your region.
