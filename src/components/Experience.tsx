import { useState } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';

interface ExperienceProps {
  locale: Locale;
}

interface ExperienceItem {
  company: string;
  location?: string;
  period: string;
  role: string;
  industry?: string;
  bullets?: string[];
  technologies: string[];
}

interface ParsedHighlight {
  text: string;
  companyName: string;
  companyIndex: number;
}

function parseHighlights(
  highlights: string[],
  experiences: ExperienceItem[]
): ParsedHighlight[] {
  return highlights
    .map((highlight) => {
      const atMatch = highlight.match(/^(.+?)\s*@(.+)$/);
      if (!atMatch) return null;

      const text = atMatch[1].trim();
      const companyName = atMatch[2].trim();

      const companyIndex = experiences.findIndex((exp) =>
        exp.company.toLowerCase().includes(companyName.toLowerCase())
      );

      if (companyIndex === -1) return null;

      return { text, companyName, companyIndex };
    })
    .filter((h): h is ParsedHighlight => h !== null);
}

export default function Experience({ locale }: ExperienceProps) {
  const t = getTranslation(locale);
  const experiences: ExperienceItem[] = (t.experience && t.experience.items) || [];
  const rawHighlights: string[] = (t.experience && t.experience.highlights) || [];
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  const highlights = parseHighlights(rawHighlights, experiences);

  if (experiences.length === 0) return null;

  const handleBack = () => {
    setSelectedCompany(null);
  };

  const handleBulletClick = (companyIndex: number) => {
    setSelectedCompany(companyIndex);
  };

  const selectedExp = selectedCompany !== null ? experiences[selectedCompany] : null;

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center lg:items-center px-2 lg:px-6 lg:px-8 sm:py-12 lg:py-20"
    >
      <div className="w-full">
        <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-text mb-1 sm:mb-2 lg:mb-4">
          {t.experience.title}
        </h2>

        {selectedCompany !== null && selectedExp ? (
          <div className="space-y-4 animate-fade-in">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm sm:text-base cursor-pointer"
            >
              <span className="i-tabler-arrow-left" />
              <span>Back to highlights</span>
            </button>

            <div className="bg-surface/50 rounded-lg p-4 sm:p-6 border border-accent/10">
              <h3 className="text-base sm:text-xl lg:text-2xl font-semibold text-text">
                {selectedExp.role}
                <span className="text-accent">#{selectedExp.company}</span>
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary mt-1">
                {selectedExp.period}
                {selectedExp.industry && (
                  <span className="text-accent ml-2">• {selectedExp.industry}</span>
                )}
              </p>
              {selectedExp.location && (
                <p className="text-xs sm:text-sm text-text-secondary">
                  {selectedExp.location}
                </p>
              )}

              {selectedExp.bullets && selectedExp.bullets.length > 0 && (
                <ul className="text-text-secondary text-xs sm:text-base leading-relaxed space-y-2 list-disc list-outside ml-5 mt-4">
                  {selectedExp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex}>{bullet}</li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-3 sm:pt-4">
                {selectedExp.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 sm:px-3 py-0.5 sm:py-1 text-accent text-xs sm:text-sm rounded-full border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-4">
            {highlights.map((highlight, index) => (
              <span
                key={index}
                role="button"
                onClick={() => handleBulletClick(highlight.companyIndex)}
                className="w-full text-left group cursor-pointer flex items-start gap-2"
              >
                <span className="text-text-secondary text-sm sm:text-sm leading-relaxed group-hover:text-accent transition-colors">
                  {highlight.text}
                  <span
                    className="text-accent opacity-80 font-medium group-hover:opacity-100 ml-1 cursor-pointer"
                  >
                    @{highlight.companyName}
                  </span>
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}