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

      <div className="flex items-start gap-1 lg:gap-4">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-text">
            {t.hero.name}
          </h1>
          <h2 className="text-base md:text-xl text-text-secondary">
            Front End Developer
          </h2>
        </div>

        {/* Vertical Social Links */}
        <div className="flex flex-col gap-1 lg:gap-2 mt-1 lg:mt-2">
          <a
            className="i-tabler-brand-linkedin?mask text-2xl lg:text-3xl bg-text-secondary hover:bg-accent transition-colors"
            href="https://linkedin.com/in/rayko-azcue"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          />
          <a
            className="i-tabler-brand-github?mask text-2xl lg:text-3xl bg-text-secondary hover:bg-accent transition-colors"
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
