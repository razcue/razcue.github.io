import { type Locale } from '../utils/i18n';
import ProfileHeader from './ProfileHeader';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      {/* Greeting and Name with Social Links */}
      <ProfileHeader locale={locale} />

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={() => scrollToSection('contact')}
          className="relative px-6 py-3 text-[var(--accent)] font-medium overflow-hidden group w-48"
          style={{ background: 'transparent' }}
        >
          <span className="relative z-10 uppercase">Get In Touch</span>

          {/* Animated borders - two pens drawing from corners */}
          {/* Top border - draws from right to left */}
          <span
            className="absolute top-0 right-0 w-2 h-px bg-[var(--accent)] transition-all duration-500 ease-out group-hover:w-full"
            style={{ transformOrigin: 'right' }}
          ></span>
          {/* Right border - draws from top to bottom */}
          <span
            className="absolute top-0 right-0 w-px h-2 bg-[var(--accent)] transition-all duration-500 ease-out delay-100 group-hover:h-full"
            style={{ transformOrigin: 'top' }}
          ></span>
          {/* Bottom border - draws from left to right */}
          <span
            className="absolute bottom-0 left-0 w-2 h-px bg-[var(--accent)] transition-all duration-500 ease-out group-hover:w-full"
            style={{ transformOrigin: 'left' }}
          ></span>
          {/* Left border - draws from bottom to top */}
          <span
            className="absolute bottom-0 left-0 w-px h-2 bg-[var(--accent)] transition-all duration-500 ease-out delay-100 group-hover:h-full"
            style={{ transformOrigin: 'bottom' }}
          ></span>
        </button>
      </div>
    </div>
  );
}
