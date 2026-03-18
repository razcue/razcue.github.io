import { type Locale, getTranslation } from '../utils/i18n';

interface JobStatusProps {
  locale: Locale;
}

export default function JobStatus({ locale }: JobStatusProps) {
  const t = getTranslation(locale);

  return (
    <section
      id="open-to"
      className="min-h-screen flex items-center px-2 lg:px-6 lg:px-8"
    >
      <div className="w-full">
        <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-text mb-4 sm:mb-8 lg:mb-12">
          {t.openTo.title}
        </h2>
        <p className="text-text-secondary text-xs sm:text-base lg:text-lg mb-6 lg:mb-8">
          {t.openTo.intro}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Target Roles */}
          <div>
            <h3 className="text-base sm:text-lg lg:text-2xl font-semibold text-text mb-3 lg:mb-4">
              {t.openTo.rolesTitle}
            </h3>
            <ul className="space-y-2">
              {t.openTo.roles.map((role: string, i: number) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-text-secondary text-xs sm:text-base lg:text-lg"
                >
                  <span className="i-tabler-check w-5 h-5 text-accent" />
                  {role}
                  {i === 0 && (
                    <span className="ml-0 sm:ml-2 px-2 pb-[0.02rem] pt-[0.1rem] text-[0.65rem] sm:text-base sm:pb-0.5 sm:pt-1 sm:px-3 border border-accent text-accent rounded-full">
                      {t.openTo.preferredRole}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-base sm:text-lg lg:text-2xl font-semibold text-text mb-3 lg:mb-4">
              {t.openTo.availabilityTitle}
            </h3>
            <ul className="space-y-2 mb-6">
              {t.openTo.availability.map((item: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-text-secondary text-xs sm:text-base lg:text-lg"
                >
                  <span className="i-tabler-check w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-accent text-surface font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 text-sm sm:text-base lg:text-lg"
            >
              {t.openTo.ctaTalk}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
