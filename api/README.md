# Portfolio API

Serverless API for the portfolio contact form, deployed on Vercel.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```bash
cp .env.example .env
```

3. Add your Resend API key to `.env`:

```bash
RESEND_API_KEY=re_your_actual_api_key
```

## Development

Run locally with Vercel CLI:

```bash
npm run dev
```

## Deployment

Deploy to Vercel:

```bash
npm run deploy
```

Or push to GitHub and let the GitHub Action handle deployment.

## Environment Variables

Set in Vercel dashboard:

- `RESEND_API_KEY`: Your Resend API key
- `BUTTONDOWN_API_KEY`: Your Buttondown API key (for newsletter)

## API Endpoints

### POST /api/contact

Send a contact form message.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### POST /api/newsletter

Subscribe to the newsletter.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "success": true
}
```
