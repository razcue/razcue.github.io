import { getTranslation, type Locale } from '../utils/i18n';
import CircularScore from './CircularScore';
import ProfileHeader from './ProfileHeader';

interface AboutProps {
  locale: Locale;
}

export default function About({ locale }: AboutProps) {
  const t = getTranslation(locale);

  // Static Lighthouse-style metrics - update these values as needed
  const siteMetrics = {
    performance: 100,
    accessibility: 96,
    bestPractices: 100,
    seo: 100,
  };

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
        <div className="mb-4 sm:mb-8 lg:mb-16">
          <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-text mb-1 sm:mb-2 lg:mb-4">
            {t.about.title}
          </h2>
          <div className="space-y-2 text-text-secondary text-xs sm:text-base lg:text-lg leading-relaxed">
            {t.about.description.map((paragraph, index) => (
              <p key={index} className={`${index === 1 && 'hidden lg:block'}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* About This Site */}
        <div>
          <h3 className="text-lg sm:text-2xl lg:text-4xl font-bold text-text mb-1 sm:mb-2 lg:mb-4">
            {t.about.siteMetrics}
          </h3>
          <p className="text-text-secondary text-xs sm:text-base lg:text-lg mb-0 sm:mb-4 lg:mb-8">
            {t.about.siteMetricsDescription}
          </p>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 scale-80 sm:scale-100">
            <CircularScore
              score={siteMetrics.performance}
              label={t.about.performance}
            />
            <CircularScore
              score={siteMetrics.accessibility}
              label={t.about.accessibility}
            />
            <CircularScore
              score={siteMetrics.bestPractices}
              label={t.about.bestPractices}
            />
            <CircularScore score={siteMetrics.seo} label={t.about.seo} />
          </div>
        </div>
      </div>
    </section>
  );
}
