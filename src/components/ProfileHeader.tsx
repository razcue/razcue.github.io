import { getTranslation, type Locale } from '../utils/i18n';

interface ProfileHeaderProps {
  locale: Locale;
}

export default function ProfileHeader({ locale }: ProfileHeaderProps) {
  const t = getTranslation(locale);

  return (
    <div className="space-y-1 lg:space-y-4">
      <p className="text-accent text-xs md:text-base font-medium mb-2">
        {t.hero.greeting}
      </p>

      <div className="w-48 md:w-64 lg:w-full">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-text">
          {t.hero.name}
        </h1>
        <div className="flex justify-between">
          <h2 className="text-base md:text-xl lg:text-2xl text-text-secondary">
            Front End Developer
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
  );
}
