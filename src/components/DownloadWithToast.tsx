import { useState, useEffect } from 'react';
import en from '../i18n/en';
import es from '../i18n/es';
import type { Locale } from '../utils/i18n';

interface DownloadWithToastProps {
  locale: Locale;
}

const ONE_HOUR_MS = 60 * 60 * 1000;

export default function DownloadWithToast({ locale }: DownloadWithToastProps) {
  const enTranslations = en;
  const esTranslations = es;
  const currentTranslations = locale === 'es' ? esTranslations : enTranslations;
  const [isOpen, setIsOpen] = useState(false);

  // Auto-show toast on page load
  useEffect(() => {
    const dismissed = localStorage.getItem('downloadToastDismissed');
    const now = Date.now();
    
    // Show if never dismissed or more than 1 hour ago
    if (!dismissed || now - parseInt(dismissed) > ONE_HOUR_MS) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('downloadToastDismissed', Date.now().toString());
  };

  const handleDownload = () => {
    setIsOpen(false);
    localStorage.setItem('downloadToastDismissed', Date.now().toString());
  };

  return (
    <div className="relative">
      {/* Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-text-secondary hover:text-accent transition-colors cursor-pointer block"
        aria-label="Download Resume"
        title="Download Resume"
      >
        <i className="i-tabler-file-download w-6 h-6" />
      </button>

      {/* Toast - matching chat toast style */}
      {isOpen && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-50 animate-fade-in">
          <div className="relative bg-surface border border-surface p-4 rounded-xl shadow-xl w-64">
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-px bg-accent"
              style={{
                width: '10px',
                height: '10px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                borderRight: '1px solid rgba(255,255,255,0.1)',
                transform: 'translateX(50%) rotate(45deg)',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            <div className="flex items-start gap-3">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <i className="i-tabler-file-download text-accent text-sm" />
                  </div>
                  <p className="text-text text-sm">
                    {currentTranslations.hero.downloadResume}
                  </p>
                </div>
                <div className="flex gap-2 flex-col">
                  <a
                    href="/Rayko_Azcue_Resume.pdf"
                    download="Rayko_Azcue_Resume.pdf"
                    onClick={handleDownload}
                    className="px-3 py-1.5 bg-accent text-surface text-xs font-medium rounded-lg hover:bg-accent/90 transition-colors"
                  >
                    {currentTranslations.hero.onePageResume}
                  </a>
                  <a
                    href="/Rayko_Azcue_CV.pdf"
                    download="Rayko_Azcue_CV.pdf"
                    onClick={handleDownload}
                    className="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-lg hover:bg-accent/20 transition-colors"
                  >
                    {currentTranslations.hero.fullResumeCV}
                  </a>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-text-secondary hover:text-text transition-colors"
                aria-label="Dismiss"
              >
                <i className="i-tabler-x text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}