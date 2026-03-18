import { getTranslation, type Locale } from '../utils/i18n';
import ProfileHeader from './ProfileHeader';

interface AboutProps {
  locale: Locale;
}

const GITHUB_USER = 'razcue';

function getYearsOfExperience(startDate: Date = new Date(2018, 8, 1)): number {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  const monthDiff = now.getMonth() - startDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && now.getDate() < startDate.getDate())
  ) {
    years--;
  }
  return years;
}

function getStreakStatsUrl(locale: Locale, theme: 'dark' | 'light'): string {
  const base = 'https://github-readme-streak-stats.herokuapp.com';
  const params = new URLSearchParams({
    user: GITHUB_USER,
    theme: 'transparent',
    hide_border: 'true',
    exclude_days: 'Sun,Sat',
    card_width: '494',
    card_height: '194',
  });

  if (theme === 'dark') {
    params.set('border', '1E293B');
    params.set('stroke', '64ffda');
    params.set('ring', '64ffda');
    params.set('fire', '64ffda');
    params.set('currStreakNum', '64ffda');
    params.set('currStreakLabel', '64ffda');
    params.set('sideNums', '64ffda');
    params.set('sideLabels', '64ffda');
    params.set('dates', '8892b0');
    params.set('excludeDaysLabel', '0a192f');
  } else {
    params.set('border', 'E2E8F0');
    params.set('stroke', '0EA5E9');
    params.set('ring', '0EA5E9');
    params.set('fire', '0EA5E9');
    params.set('currStreakNum', '0EA5E9');
    params.set('currStreakLabel', '0EA5E9');
    params.set('sideNums', '0EA5E9');
    params.set('sideLabels', '0EA5E9');
    params.set('dates', '64748B');
    params.set('excludeDaysLabel', 'FFFFFF');
  }

  params.set('locale', locale);

  return `${base}?${params.toString()}`;
}

export default function About({ locale }: AboutProps) {
  const t = getTranslation(locale);
  const yearsExp = getYearsOfExperience();
  const yearsText = `${yearsExp} ${t.about.yearsOfExperience}`;

  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-2 lg:px-6 lg:px-8"
    >
      <div className="w-full">
        {/* Mobile Profile Header - Only visible on mobile */}
        <div className="lg:hidden mb-4">
          <ProfileHeader locale={locale} />
        </div>

        {/* About Me */}
        <div>
          {/* Title with Profile Photo on desktop */}
          <div className="flex items-start gap-8 mb-1 sm:mb-2 lg:mb-4">
            <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-text translate-y-0 lg:translate-y-4">
              {t.about.title}
            </h2>
            {/* Desktop Profile Photo - Only visible on lg screens */}
            <div className="hidden lg:block w-14 h-14 rotate-45 overflow-hidden border-2 border-accent/80 shadow-lg shrink-0 -mt-1">
              <img
                src="/profile-pic.png"
                alt="Rayko Azcue"
                className="aspect-1 w-20 h-auto max-w-100 -rotate-45 object-cover -translate-x-2.5 -translate-y-3.5"
              />
            </div>
          </div>

          <div className="space-y-2 text-text-secondary text-xs sm:text-base lg:text-lg leading-relaxed">
            {t.about.description.map((paragraph, index) => (
              <p key={index} className={`${index === 1 && 'hidden lg:block'}`}>
                {index === 0 ? (
                  <>
                    {t.about.beforeDescription}{' '}
                    <span className="text-accent font-semibold">
                      {yearsText}
                    </span>
                    {paragraph}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>
        </div>

        {/* GitHub Streak Stats */}
        <div className="mt-4 lg:mt-6">
          <h3 className="text-sm sm:text-base font-semibold text-text mb-2">
            {t.about.githubStreak}
          </h3>
          <a
            href="https://github.com/razcue"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full max-w-md lg:max-w-lg mx-auto"
          >
            {/* Dark theme - shown by default, hidden when light */}
            <img
              src={getStreakStatsUrl(locale, 'dark')}
              alt="GitHub Streak"
              className="w-full h-auto streak-dark"
            />
            {/* Light theme - hidden by default, shown when light */}
            <img
              src={getStreakStatsUrl(locale, 'light')}
              alt="GitHub Streak"
              className="w-full h-auto hidden streak-light"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
