import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Handle CORS
  const allowedOrigins = [
    'https://razcue.github.io',
    'http://localhost:4321',
    'http://localhost:3000',
  ];

  const origin = request.headers.origin || '';

  if (allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    response.setHeader(
      'Access-Control-Allow-Origin',
      'https://razcue.github.io'
    );
  }

  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS preflight request
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  // Only allow POST
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = request.body;

    if (!email || !email.includes('@')) {
      return response.status(400).json({ error: 'Invalid email address' });
    }

    const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

    if (!BUTTONDOWN_API_KEY) {
      console.error('BUTTONDOWN_API_KEY is not configured');
      return response
        .status(500)
        .json({ error: 'Newsletter service not configured' });
    }

    // Subscribe to Buttondown
    const buttondownResponse = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tags: ['blog-signup'],
        }),
      }
    );

    if (buttondownResponse.ok) {
      return response.status(200).json({ success: true });
    } else {
      const error = await buttondownResponse.json();
      console.error('Buttondown API error:', error);
      return response
        .status(buttondownResponse.status)
        .json({ error: 'Failed to subscribe' });
    }
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
