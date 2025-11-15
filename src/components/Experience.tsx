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
  description: string;
  technologies: string[];
}

export default function Experience({ locale }: ExperienceProps) {
  const t = getTranslation(locale);
  const experiences: ExperienceItem[] =
    (t.experience && t.experience.items) || [];
  const [activeTab, setActiveTab] = useState(0);

  if (experiences.length === 0) return null;

  return (
    <section
      id="experience"
      className="min-h-screen flex items-start lg:items-center px-2 lg:px-6 lg:px-8 py-12 lg:py-20"
    >
      <div className="w-full mt-[8dvh] lg:mt-0">
        <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-[var(--text)] mb-4 sm:mb-8 lg:mb-12">
          {t.experience.title}
        </h2>

        <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
          {/* Desktop Tab List - Vertical on lg+ screens */}
          <div
            className="hidden lg:flex flex-col md:min-w-[200px]"
            role="tablist"
            aria-label="Experience tabs"
          >
            {experiences.map((exp, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`panel-${index}`}
                id={`tab-${index}`}
                onClick={() => setActiveTab(index)}
                className={`
                  relative px-4 py-3 text-left text-sm font-medium
                  transition-all duration-200
                  ${
                    activeTab === index
                      ? 'text-[var(--accent)] bg-[var(--surface)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--surface)]/50'
                  }
                `}
              >
                {/* Active indicator line */}
                <span
                  className={`
                    absolute left-0 top-0 w-0.5 h-full 
                    bg-[var(--accent)] transition-all duration-200
                    ${activeTab === index ? 'opacity-100' : 'opacity-0'}
                  `}
                />
                {exp.company}
              </button>
            ))}
          </div>

          {/* Mobile Dot Navigation - Horizontal dots for mobile/tablet */}
          <div
            className="flex lg:hidden justify-center gap-2 mb-4"
            role="tablist"
            aria-label="Experience navigation"
          >
            {experiences.map((exp, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeTab === index}
                aria-controls={`panel-${index}`}
                aria-label={`View ${exp.company} experience`}
                onClick={() => setActiveTab(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${
                    activeTab === index
                      ? 'bg-[var(--accent)] w-8'
                      : 'bg-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/50'
                  }
                `}
              />
            ))}
          </div>

          {/* Tab Panels */}
          <div className="flex-1 min-h-[300px] lg:min-h-[400px]">
            {experiences.map((exp, index) => (
              <div
                key={index}
                role="tabpanel"
                id={`panel-${index}`}
                aria-labelledby={`tab-${index}`}
                hidden={activeTab !== index}
                className="space-y-2 sm:space-y-4"
              >
                {/* Role and Period */}
                <div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-semibold text-[var(--text)]">
                    {exp.role}
                    <span className="text-[var(--accent)]">
                      {' '}
                      # {exp.company}
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                    {exp.period}
                    {exp.industry && (
                      <span className="text-[var(--accent)] ml-2">
                        • {exp.industry}
                      </span>
                    )}
                  </p>
                  {exp.location && (
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      {exp.location}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="text-[var(--text-secondary)] text-xs sm:text-base leading-relaxed">
                  {exp.description}
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-[var(--accent)] text-xs sm:text-sm rounded-full border border-[var(--accent)]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
