import { useState, useEffect, useRef } from 'react';
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
  bullets?: string[];
  technologies: string[];
}

export default function Experience({ locale }: ExperienceProps) {
  const t = getTranslation(locale);
  const experiences: ExperienceItem[] =
    (t.experience && t.experience.items) || [];
  const [activeTab, setActiveTab] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Check if user has seen the swipe hint
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasSeenHint = localStorage.getItem('experience-swipe-hint-seen');
    if (!hasSeenHint) {
      setShowSwipeHint(true);

      // Hide hint after 3 seconds
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
        localStorage.setItem('experience-swipe-hint-seen', 'true');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      const duration = touchEndTime - touchStartTime;

      // Check if it's a swipe (fast gesture)
      if (duration > 500) return;

      // Determine if swipe is more horizontal or vertical
      const isHorizontal = Math.abs(diffX) > Math.abs(diffY);

      // Only handle horizontal swipes with minimum distance
      if (isHorizontal && Math.abs(diffX) > 50) {
        e.preventDefault();
        if (diffX > 0) {
          // Swiped left - go to next
          setActiveTab((prev) => Math.min(prev + 1, experiences.length - 1));
        } else {
          // Swiped right - go to previous
          setActiveTab((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    const section = sectionRef.current;
    section.addEventListener('touchstart', handleTouchStart, { passive: true });
    section.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      section.removeEventListener('touchstart', handleTouchStart);
      section.removeEventListener('touchend', handleTouchEnd);
    };
  }, [experiences.length]);

  if (experiences.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="min-h-screen flex items-start lg:items-center px-2 lg:px-6 lg:px-8 py-12 lg:py-20 relative"
    >
      {/* Swipe Hint - Mobile Only */}
      {showSwipeHint && (
        <div className="lg:hidden absolute inset-0 pointer-events-none flex items-center justify-between px-4 z-20">
          <div className="animate-pulse">
            <div className="i-tabler-chevron-left w-12 h-12 text-accent opacity-70 animate-bounce-horizontal-left" />
          </div>
          <div className="animate-pulse animation-delay-300">
            <div className="i-tabler-chevron-right w-12 h-12 text-accent opacity-70 animate-bounce-horizontal-right" />
          </div>
        </div>
      )}

      <div className="w-full mt-[8dvh] lg:mt-0">
        <h2 className="text-lg sm:text-2xl lg:text-4xl font-bold text-text mb-4 sm:mb-8 lg:mb-12">
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
                  transition-all duration-200 cursor-pointer
                  ${
                    activeTab === index
                      ? 'text-accent bg-surface'
                      : 'text-text-secondary hover:text-accent hover:bg-surface/50'
                  }
                `}
              >
                {/* Active indicator line */}
                <span
                  className={`
                    absolute left-0 top-0 w-0.5 h-full 
                    bg-accent transition-all duration-200
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
                      ? 'bg-accent w-8'
                      : 'bg-text-secondary/30 hover:bg-text-secondary/50'
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
                  <h3 className="text-base sm:text-xl lg:text-2xl font-semibold text-text">
                    {exp.role}
                    <span className="text-accent"> # {exp.company}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-1">
                    {exp.period}
                    {exp.industry && (
                      <span className="text-accent ml-2">• {exp.industry}</span>
                    )}
                  </p>
                  {exp.location && (
                    <p className="text-xs sm:text-sm text-text-secondary">
                      {exp.location}
                    </p>
                  )}
                </div>

                {/* Description */}
                {exp.bullets && exp.bullets.length > 0 ? (
                  <ul className="text-text-secondary text-xs sm:text-base leading-relaxed space-y-2 list-disc list-outside ml-5">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-text-secondary text-xs sm:text-base leading-relaxed">
                    {exp.description}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-accent text-xs sm:text-sm rounded-full border border-accent/20"
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
