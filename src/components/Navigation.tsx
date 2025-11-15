import { useState, useEffect } from 'react';
import { getTranslation, type Locale } from '../utils/i18n';

interface NavigationProps {
  locale: Locale;
}

export default function Navigation({ locale }: NavigationProps) {
  const t = getTranslation(locale);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
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
      element.scrollIntoView({ behavior: 'smooth' });
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
            <button
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center justify-start gap-4 text-sm transition-all text-left group ${
                activeSection === item.id
                  ? 'text-[var(--accent)] w-9/12'
                  : 'text-[var(--text-secondary)] hover:text-[var(--accent)] w-8/12'
              }`}
              aria-label={`Navigate to ${item.label} section`}
            >
              <div className="flex items-center gap-3">
                {/* # symbol - only visible on hover */}
                <span className="text-lg font-medium font-mono translate-y-px opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]">
                  #
                </span>

                <span className="text-lg font-medium">{item.label}</span>
              </div>

              {/* Horizontal line after text - extends when active */}
              <span
                className={`h-px transition-all flex-1 ${
                  activeSection === item.id
                    ? 'bg-[var(--accent)] opacity-100'
                    : 'bg-[var(--text-secondary)] opacity-30 group-hover:opacity-60 group-hover:bg-[var(--accent)]'
                }`}
                style={{
                  minWidth: activeSection === item.id ? '4rem' : '2rem',
                }}
              ></span>
            </button>
          </li>
        ))}
      </ul>

      {/* Blog and Lab Links */}
      <div className="pt-6 border-t border-[var(--surface)]">
        <ul className="space-y-4">
          <li>
            <a
              href="/blog"
              className="flex items-center gap-3 text-xl text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
            >
              {/* External link icon */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="font-medium">{t.nav.blog}</span>
            </a>
          </li>
          <li>
            <a
              href="/lab"
              className="flex items-center gap-3 text-xl text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
            >
              {/* External link icon */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="font-medium">{t.nav.lab}</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
