import { getTranslation, type Locale } from '../utils/i18n';

interface ProfileHeaderProps {
  locale: Locale;
}

export default function ProfileHeader({ locale }: ProfileHeaderProps) {
  const t = getTranslation(locale);

  return (
    <div className="flex items-center justify-between gap-8 lg:space-y-4">
      <div className="space-y-1 lg:space-y-4 flex-0 w-fit lg:flex-1">
        <p className="text-accent/80 text-xs md:text-base font-medium mb-2">
          {t.hero.greeting}
        </p>

        <div className="w-fit md:w-64 lg:w-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-text">
            {t.hero.name}
          </h1>
          <div className="flex justify-between">
            <h2 className="text-base md:text-xl lg:text-2xl text-accent">
              {t.hero.subtitle}
            </h2>
            <a
              className="hidden lg:block i-tabler-brand-github?mask text-lg md:text-2xl lg:text-3xl bg-text-secondary hover:bg-accent transition-colors mt-0.5 lg:mt-0"
              href="https://github.com/razcue"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            />
          </div>
        </div>
      </div>

      {/* Mobile Profile Photo - Only visible on mobile */}
      <div className="lg:hidden flex-1">
        <div className="w-14 h-14 rotate-45 overflow-hidden border-2 border-accent/80 shadow-lg shrink-0">
          <img
            src="/profile-pic.png"
            alt="Rayko Azcue"
            className="aspect-1 w-20 h-auto max-w-100 -rotate-45 object-cover -translate-x-2.5 -translate-y-3.5"
          />
        </div>
      </div>
    </div>
  );
}
