import { useState } from 'react';
import { getTranslation, type Locale } from '../../utils/i18n';

interface Props {
  className?: string;
  locale: Locale;
}

export default function NewsletterSignup({ className = '', locale }: Props) {
  const t = getTranslation(locale);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // TODO: Replace with actual Buttondown API endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage(t.blog.newsletter.successMessage);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(t.blog.newsletter.errorMessage);
      }
    } catch {
      setStatus('error');
      setMessage(t.blog.newsletter.errorMessage);
    }
  };

  return (
    <div
      className={`bg-surface border border-surface rounded-lg p-6 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-text mb-2">
          📬 {t.blog.newsletter.title}
        </h3>
        <p className="text-sm text-text-secondary">
          {t.blog.newsletter.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.blog.newsletter.placeholder}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-3 bg-bg border border-surface rounded-lg text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-3 bg-accent text-dark font-medium rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {status === 'loading'
            ? t.blog.newsletter.subscribing
            : t.blog.newsletter.subscribe}
        </button>

        {message && (
          <p
            className={`text-sm ${
              status === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <p className="text-xs text-text-secondary mt-4">
        {t.blog.newsletter.poweredBy}
      </p>
    </div>
  );
}
