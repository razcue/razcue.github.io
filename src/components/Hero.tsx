import { useState, useEffect, useRef } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';
import ProfileHeader from './ProfileHeader';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = getTranslation(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle hover with delay on desktop
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    if (isHovering) {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      setIsOpen(true);
    } else {
      // Add delay before closing to allow moving to dropdown
      leaveTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    }

    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, [isHovering]);

  const handleToggleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="space-y-12">
      {/* Greeting and Name with Social Links */}
      <ProfileHeader locale={locale} />

      {/* Download Resume Dropdown */}
      <div
        className="relative inline-block"
        ref={containerRef}
        onMouseEnter={() => window.innerWidth >= 1024 && setIsHovering(true)}
        onMouseLeave={() => window.innerWidth >= 1024 && setIsHovering(false)}
      >
        {/* Main Button - Download with Arrow Toggle Inside */}
        <a
          href="/Rayko_Azcue_Resume.pdf"
          download="Rayko_Azcue_Resume.pdf"
          className="relative px-4 py-3 text-accent font-medium overflow-hidden group w-50 cursor-pointer flex items-center justify-center gap-2"
          style={{ background: 'transparent' }}
        >
          <i className="i-tabler-file-download text-xl"></i>
          <span className="uppercase">{t.hero.downloadResume}</span>

          {/* Toggle Button - Rotated Square */}
          <button
            onClick={handleToggleClick}
            className="relative flex items-center justify-center p-1 -translate-y-px"
            aria-label="Toggle download options"
          >
            <div
              className={`border-2 border-2 rotate-45 transition-all duration-500 ${
                isOpen
                  ? 'w-2 h-2 border-accent rotate-65 text-accent bg-accent'
                  : 'w-3 h-3 group-hover:opacity-100 border-text-secondary/50'
              }`}
            />
          </button>

          {/* Animated borders */}
          <span
            className="absolute top-0 right-0 w-2 h-px bg-accent transition-all duration-500 ease-out group-hover:w-full"
            style={{ transformOrigin: 'right' }}
          ></span>
          <span
            className="absolute top-0 right-0 w-px h-2 bg-accent transition-all duration-500 ease-out delay-100 group-hover:h-full"
            style={{ transformOrigin: 'top' }}
          ></span>
          <span
            className="absolute bottom-0 left-0 w-2 h-px bg-accent transition-all duration-500 ease-out delay-100 group-hover:w-full"
            style={{ transformOrigin: 'left' }}
          ></span>
          <span
            className="absolute bottom-0 left-0 w-px h-2 bg-accent transition-all duration-500 ease-out delay-200 group-hover:h-full"
            style={{ transformOrigin: 'bottom' }}
          ></span>
        </a>

        {/* Dropdown Menu - matches anchor width (w-44) */}
        {isOpen && (
          <div className="absolute left-0 mt-1 w-50 bg-surface rounded-lg shadow-xl z-50 animate-fade-in">
            <a
              href="/Rayko_Azcue_Resume.pdf"
              download="Rayko_Azcue_Resume.pdf"
              className="flex items-center px-4 py-3 text-sm text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors rounded-t-lg group"
              onClick={() => setIsOpen(false)}
            >
              <span className="h-2 w-2 -translate-y-px border border-text-secondary/50 group-hover:bg-accent rotate-45 group-hover:rotate-65 mr-2 transition-all duration-500"></span>
              <span>{t.hero.onePageResume}</span>
            </a>
            <a
              href="/Rayko_Azcue_CV.pdf"
              download="Rayko_Azcue_CV.pdf"
              className="flex items-center px-4 py-3 text-sm text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors rounded-t-lg group"
              onClick={() => setIsOpen(false)}
            >
              <span className="h-2 w-2 -translate-y-px border border-text-secondary/50 group-hover:bg-accent rotate-45 group-hover:rotate-65 mr-2 transition-all duration-500"></span>
              {t.hero.fullResumeCV}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}