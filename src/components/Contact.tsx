import { useState, useEffect } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';

interface ContactProps {
  locale: Locale;
}

export default function Contact({ locale }: ContactProps) {
  const t = getTranslation(locale);

  // Initialize state with message from URL if present
  const [formData, setFormData] = useState(() => {
    // Check URL hash for prefilled message
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const match = hash.match(/contact\?message=([^&]+)/);
      if (match) {
        const message = decodeURIComponent(match[1]);
        return {
          name: '',
          email: '',
          subject: '',
          message: message,
        };
      }
    }
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  });

  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  // Listen for hash changes to update message
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/contact\?message=([^&]+)/);
      if (match) {
        const message = decodeURIComponent(match[1]);
        setFormData((prev) => ({
          ...prev,
          message: message,
        }));

        // Focus the message field after a brief delay
        setTimeout(() => {
          const messageField = document.querySelector(
            '#message'
          ) as HTMLTextAreaElement;
          if (messageField) {
            messageField.focus();
          }
        }, 300);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Use Vercel API endpoint - update this with your actual Vercel project URL
      const apiUrl =
        import.meta.env.PUBLIC_API_URL ||
        'https://razcue-github-io.vercel.app/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');

      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-2 lg:px-6 lg:px-8 py-12 lg:py-20 relative"
    >
      {/* Floating Feedback Message */}
      {status !== 'idle' && (
        <div
          id="form-status"
          aria-live="polite"
          aria-atomic="true"
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 animate-slide-down"
        >
          {status === 'success' && (
            <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg shadow-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <i className="i-tabler-circle-check w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-accent font-medium text-xs sm:text-sm lg:text-base">
                    {t.contact.success}
                  </p>
                  <p className="text-text-secondary text-xs sm:text-sm mt-1">
                    {t.contact.successDetails}
                  </p>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg shadow-lg backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <i className="i-tabler-alert-circle w-5 h-5 sm:w-6 sm:h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-xs sm:text-sm lg:text-base">
                  {t.contact.error}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="w-full">
        <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-text mb-4 sm:mb-6 lg:mb-8">
          {t.contact.title}
        </h2>

        <p className="text-text-secondary text-xs sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-12 max-w-2xl">
          {t.contact.description}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4 lg:space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-text font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base"
              >
                {t.contact.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-surface border border-surface rounded-lg text-text text-xs sm:text-sm lg:text-base placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t.contact.placeholders.name}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-text font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base"
              >
                {t.contact.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-surface border border-surface rounded-lg text-text text-xs sm:text-sm lg:text-base placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder={t.contact.placeholders.email}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-text font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base"
            >
              {t.contact.subject}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-surface border border-surface rounded-lg text-text text-xs sm:text-sm lg:text-base placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder={t.contact.placeholders.subject}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-text font-medium mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base"
            >
              {t.contact.message}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-surface border border-surface rounded-lg text-text text-xs sm:text-sm lg:text-base placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder={t.contact.placeholders.message}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="px-6 py-2 sm:px-8 mb-2 lg:mb-4 sm:py-3 bg-accent text-dark font-medium text-xs sm:text-sm lg:text-base rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {status === 'sending' ? t.contact.sending : t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
}
