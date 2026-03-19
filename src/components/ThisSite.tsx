import { useState, useRef } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';
import CircularScore from './CircularScore';

interface ThisSiteProps {
  locale: Locale;
}

export default function ThisSite({ locale }: ThisSiteProps) {
  const t = getTranslation(locale);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const siteMetrics = [
    { score: 100, label: t.about.performance },
    { score: 96, label: t.about.accessibility },
    { score: 100, label: t.about.bestPractices },
    { score: 100, label: t.about.seo },
  ];

  const features = [
    {
      id: 'performance',
      icon: 'i-tabler-bolt',
      label: t.thisSite.features.performance,
      description: t.thisSite.featureDescriptions.performance,
    },
    {
      id: 'design',
      icon: 'i-tabler-palette',
      label: t.thisSite.features.design,
      description: t.thisSite.featureDescriptions.design,
    },
    {
      id: 'accessibility',
      icon: 'i-tabler-accessible',
      label: t.thisSite.features.accessibility,
      description: t.thisSite.featureDescriptions.accessibility,
    },
    {
      id: 'seo',
      icon: 'i-tabler-search',
      label: t.thisSite.features.seo,
      description: t.thisSite.featureDescriptions.seo,
    },
    {
      id: 'i18n',
      icon: 'i-tabler-language',
      label: t.thisSite.features.i18n,
      description: t.thisSite.featureDescriptions.i18n,
    },
    {
      id: 'responsive',
      icon: 'i-tabler-device-mobile',
      label: t.thisSite.features.responsive,
      description: t.thisSite.featureDescriptions.responsive,
    },
    {
      id: 'blog',
      icon: 'i-tabler-file-text',
      label: t.thisSite.features.blog,
      description: t.thisSite.featureDescriptions.blog,
    },
    {
      id: 'aiChat',
      icon: 'i-tabler-message-circle',
      label: t.thisSite.features.ai.chat,
      description: t.thisSite.aiFeatures.chat,
    },
    {
      id: 'aiResume',
      icon: 'i-tabler-file-description',
      label: t.thisSite.features.ai.resume,
      description: t.thisSite.aiFeatures.resume,
    },
    {
      id: 'aiJobSearch',
      icon: 'i-tabler-briefcase',
      label: t.thisSite.features.ai.jobSearch,
      description: t.thisSite.aiFeatures.jobSearch,
    },
  ];

  const toggleFeature = (id: string) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth =
        scrollContainerRef.current.scrollWidth / features.length;
      const newActiveSlide = Math.round(scrollLeft / cardWidth);
      setActiveSlide(newActiveSlide);
    }
  };

  const currentFeature = features[activeSlide];

  return (
    <section
      id="this-site"
      className="min-h-screen flex items-center px-2 lg:px-6 lg:px-8"
    >
      <div className="w-full max-w-4xl">
        {/* Section Title */}
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-text mb-2">
          {t.thisSite.title}
        </h2>

        {/* Description */}
        <p className="text-text-secondary text-sm sm:text-base mb-4 lg:mb-6">
          {t.thisSite.description}
        </p>

        {/* Web Vitals - Smaller circles */}
        <div className="flex items-center gap-4 sm:gap-6 mb-4 lg:mb-6 scale-85 origin-left">
          {siteMetrics.map((metric, index) => (
            <CircularScore
              key={index}
              score={metric.score}
              label={metric.label}
            />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          {/* Scrollable Chips */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-2 px-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveSlide(index)}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm bg-surface border rounded-full transition-colors cursor-pointer ${
                  activeSlide === index
                    ? 'border-accent text-accent'
                    : 'border-border text-text-secondary'
                }`}
              >
                <i className={`${feature.icon} w-3.5 h-3.5`} />
                <span>{feature.label}</span>
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-3">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveSlide(index);
                  scrollContainerRef.current?.scrollTo({
                    left:
                      (scrollContainerRef.current.scrollWidth /
                        features.length) *
                      index,
                    behavior: 'smooth',
                  });
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeSlide === index ? 'bg-accent' : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Fixed Height Expanded Box */}
          <div className="mt-3 p-3 bg-surface border border-border rounded-lg h-32 overflow-hidden">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {currentFeature?.description.map(
                (item: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-1.5 text-xs text-text-secondary"
                  >
                    <i className="i-tabler-check w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Desktop: Expandable Chips */}
        <div className="hidden lg:grid grid-cols-3 gap-2">
          {features.map((feature) => (
            <div key={feature.id}>
              <button
                onClick={() => toggleFeature(feature.id)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs sm:text-sm bg-surface border rounded-full transition-colors cursor-pointer w-full justify-center ${
                  expandedFeature === feature.id
                    ? 'border-accent text-accent'
                    : 'border-border text-text-secondary hover:border-accent/50 hover:text-accent'
                }`}
              >
                <i className={`${feature.icon} w-3.5 h-3.5`} />
                <span>{feature.label}</span>
              </button>
              {expandedFeature === feature.id && (
                <div className="mt-2 p-3 bg-surface border border-border rounded-lg">
                  <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                    {feature.description.map((item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary"
                      >
                        <i className="i-tabler-check w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="mt-4 lg:mt-6">
          <span className="text-text-secondary text-xs sm:text-sm">
            {t.thisSite.techStack}:
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {t.thisSite.techStackItems.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
