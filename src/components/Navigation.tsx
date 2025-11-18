import { useState, useEffect } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';

interface NavigationProps {
  locale: Locale;
}

export default function Navigation({ locale }: NavigationProps) {
  const t = getTranslation(locale);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    // Set active section based on hash on mount
    const hash = window.location.hash.replace('#', '');
    if (hash && ['about', 'experience', 'projects', 'contact'].includes(hash)) {
      setActiveSection(hash);
    }

    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'contact'];
      const mainContent = document.querySelector(
        '#main-content .overflow-y-auto'
      );

      if (!mainContent) return;

      // Find which section is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const mainRect = mainContent.getBoundingClientRect();

          // Check if section is in viewport
          if (rect.top >= mainRect.top && rect.top <= mainRect.top + 200) {
            setActiveSection(sectionId);
            // Update URL hash without scrolling
            if (window.location.hash !== `#${sectionId}`) {
              history.replaceState(null, '', `#${sectionId}`);
            }
            break;
          }
        }
      }
    };

    const mainContent = document.querySelector(
      '#main-content .overflow-y-auto'
    );
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
      return () => mainContent.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Update URL hash first
      window.location.hash = sectionId;
      // Then scroll to element
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <nav className="space-y-16 mt-24" aria-label="Main navigation">
      {/* Main Navigation */}
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`flex items-center justify-start gap-4 text-sm transition-all group ${
                activeSection === item.id
                  ? 'text-accent w-9/12'
                  : 'text-text-secondary hover:text-accent w-8/12'
              }`}
              aria-label={`Navigate to ${item.label} section`}
            >
              <div className="flex items-center gap-3">
                {/* # symbol - only visible on hover */}
                <span className="text-lg font-medium font-mono translate-y-px opacity-0 group-hover:opacity-100 transition-opacity text-accent">
                  #
                </span>

                <span className="text-lg font-medium">{item.label}</span>
              </div>

              {/* Horizontal line after text - extends when active */}
              <span
                className={`h-px transition-all flex-1 ${
                  activeSection === item.id
                    ? 'bg-accent opacity-100'
                    : 'bg-text-secondary opacity-30 group-hover:opacity-60 group-hover:bg-accent'
                }`}
                style={{
                  minWidth: activeSection === item.id ? '4rem' : '2rem',
                }}
              ></span>
            </a>
          </li>
        ))}
      </ul>

      {/* Blog and Lab Links */}
      <div className="pt-6 border-t border-surface">
        <ul className="space-y-4">
          <li>
            <a
              href={locale === 'es' ? '/es/blog' : '/blog'}
              className="flex items-center gap-3 text-xl text-text-secondary hover:text-accent transition-colors group"
            >
              <i className="i-tabler-external-link w-5 h-5" />
              <span className="font-medium">{t.nav.blog}</span>
            </a>
          </li>
          <li>
            <a
              href={locale === 'es' ? '/es/lab' : '/lab'}
              className="flex items-center gap-3 text-xl text-text-secondary hover:text-accent transition-colors group"
            >
              <i className="i-tabler-external-link w-5 h-5" />
              <span className="font-medium">{t.nav.lab}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
