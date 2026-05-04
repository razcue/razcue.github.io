import { useState, useEffect } from 'react';
import { useToastStore } from '../stores/toast';
import en from '../i18n/en';
import es from '../i18n/es';
import type { Locale } from '../utils/i18n';

interface DownloadWithToastProps {
  locale: Locale;
}

export default function DownloadWithToast({ locale }: DownloadWithToastProps) {
  const enTranslations = en;
  const esTranslations = es;
  const currentTranslations = locale === 'es' ? esTranslations : enTranslations;

  const { activeToast, dismissToast } = useToastStore();
  const isOpen = activeToast === 'download';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleDismiss = () => {
    dismissToast();
  };

  const handleDownload = () => {
    dismissToast();
  };

  return (
    <div className="relative">
      <button
        onClick={() => {}}
        className="text-text-secondary hover:text-accent transition-colors cursor-pointer block"
        aria-label="Download Resume"
        title="Download Resume"
      >
        <i className="i-tabler-file-download w-6 h-6" />
      </button>

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
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <i className="i-tabler-file-download text-accent text-sm" />
              </div>
              <div className="flex-1">
                <p className="text-text text-sm mb-3">
                  {currentTranslations.hero.downloadResume}:
                </p>
                <div className="flex gap-2">
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