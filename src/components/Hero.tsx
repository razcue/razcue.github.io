import { getTranslation, type Locale } from '../utils/i18n';
import ProfileHeader from './ProfileHeader';

interface HeroProps {
  locale: Locale;
}

export default function Hero({ locale }: HeroProps) {
  const t = getTranslation(locale);

  return (
    <div className="space-y-12">
      {/* Greeting and Name with Social Links */}
      <ProfileHeader locale={locale} />

      {/* CTA Buttons */}
      <div className="flex gap-6 justify-center items-center">
        {/* Download Resume Button */}
        <a
          href="/Rayko_Azcue_Resume.pdf"
          download="Rayko_Azcue_Resume.pdf"
          className="relative px-4 py-3 text-accent font-medium overflow-hidden group w-40 cursor-pointer flex items-center justify-center gap-2"
          style={{ background: 'transparent' }}
        >
          <i className="i-tabler-file-download relative z-10 text-xl"></i>
          <span className="relative z-10 uppercase">
            {t.hero.downloadResume}
          </span>

          {/* Animated borders - matching style */}
          <span
            className="absolute top-0 right-0 w-2 h-px bg-accent transition-all duration-500 ease-out group-hover:w-full"
            style={{ transformOrigin: 'right' }}
          ></span>
          <span
            className="absolute top-0 right-0 w-px h-2 bg-accent transition-all duration-500 ease-out delay-100 group-hover:h-full"
            style={{ transformOrigin: 'top' }}
          ></span>
          <span
            className="absolute bottom-0 left-0 w-2 h-px bg-accent transition-all duration-500 ease-out group-hover:w-full"
            style={{ transformOrigin: 'left' }}
          ></span>
          <span
            className="absolute bottom-0 left-0 w-px h-2 bg-accent transition-all duration-500 ease-out delay-100 group-hover:h-full"
            style={{ transformOrigin: 'bottom' }}
          ></span>
        </a>
      </div>
    </div>
  );
}
