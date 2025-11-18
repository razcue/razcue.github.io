import LanguageToggle from './LanguageToggle';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import { getTranslation, type Locale } from '../utils/i18n';

interface SideBarProps {
  locale: Locale;
  showNavigation?: boolean;
  currentPath?: string;
}

// Map of paths to their parent/back navigation
const backNavigationMap: Record<string, string> = {
  '/blog': '/',
  '/es/blog': '/es/',
  '/lab': '/',
  '/es/lab': '/es/',
};

export default function Sidebar({
  locale,
  showNavigation = false,
  currentPath = '/',
}: SideBarProps) {
  const t = getTranslation(locale);

  // Determine back navigation URL
  const getBackUrl = () => {
    // Normalize path (remove trailing slash for comparison)
    const normalizedPath = currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    // Check exact match first
    if (backNavigationMap[normalizedPath]) {
      return backNavigationMap[normalizedPath];
    }

    // Check if it's a blog post page (any path under /blog/ that's not the index)
    if (
      (currentPath.startsWith('/blog/') || currentPath.startsWith('/blog')) &&
      currentPath !== '/blog' &&
      currentPath !== '/blog/' &&
      !currentPath.startsWith('/blog/tag/')
    ) {
      return '/blog';
    }
    if (
      (currentPath.startsWith('/es/blog/') ||
        currentPath.startsWith('/es/blog')) &&
      currentPath !== '/es/blog' &&
      currentPath !== '/es/blog/' &&
      !currentPath.startsWith('/es/blog/tag/')
    ) {
      return '/es/blog';
    }

    // Default: go back in history
    return null;
  };

  const backUrl = getBackUrl();

  const handleBack = () => {
    if (backUrl) {
      window.location.href = backUrl;
    } else {
      window.history.back();
    }
  };

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
    { id: 'about' },
    { id: 'experience' },
    { id: 'projects' },
    { id: 'contact' },
  ];

  return (
    <div className="flex flex-col items-center h-full pt-2 pb-8">
      {/* Back Button - Show when not on home page */}
      {currentPath !== '/' && currentPath !== '/es/' && (
        <>
          <button
            onClick={handleBack}
            className="my-4 text-text-secondary hover:text-accent transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <i className="i-tabler-arrow-left w-6 h-6" />
          </button>
          <div className="w-px flex-1 bg-text-secondary opacity-30 mb-4 sm:mb-6"></div>
        </>
      )}

      {/* Spacer to push content to bottom when no back button */}
      {(currentPath === '/' || currentPath === '/es/') && (
        <div className="flex-1"></div>
      )}

      {/* Main Navigation - Only show on home page */}
      {showNavigation && (
        <>
          <ul className="block lg:hidden space-y-4 mb-4 sm:mb-6 pl-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-start gap-4 text-sm transition-all text-left cursor-pointer group ${
                    activeSection === item.id
                      ? 'text-accent w-9/12'
                      : 'text-text-secondary hover:text-accent w-8/12'
                  }`}
                  aria-label={`Navigate to ${item.id} section`}
                >
                  <div
                    className={`w-4 h-3 border-2 duration-500 transition-all ${activeSection === item.id ? 'border-accent rotate-65' : 'border-text-secondary opacity-30'}`}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Vertical Line above links */}
          <div className="block lg:hidden w-px flex-1 bg-text-secondary opacity-30 mb-4 sm:mb-6 max-h-4 sm:max-h-16 lg:max-h-32"></div>
        </>
      )}

      {/* Blog and Lab Links */}
      <div className="block lg:hidden border-t border-surface mb-4 sm:mb-6">
        <ul className="space-y-1 sm:space-y-2">
          <li>
            <a
              href={locale === 'es' ? '/es/blog' : '/blog'}
              className="text-text-secondary hover:text-accent transition-colors text-xs sm:text-sm font-medium tracking-widest"
              style={{ writingMode: 'vertical-rl' }}
            >
              <span className="font-medium">{t.nav.blog}</span>
            </a>
          </li>
          <li>
            <div className="w-px h-2 sm:h-4 ml-2 flex-1 bg-text-secondary opacity-30 mb-3 sm:mb-4"></div>
          </li>
          <li>
            <a
              href={locale === 'es' ? '/es/lab' : '/lab'}
              className="text-text-secondary hover:text-accent transition-colors text-xs sm:text-sm font-medium tracking-widest"
              style={{ writingMode: 'vertical-rl' }}
            >
              <span className="font-medium">{t.nav.lab}</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Vertical Line above theme */}
      <div className="block lg:hidden w-px flex-1 bg-text-secondary opacity-30 mb-4 sm:mb-6 max-h-4 sm:max-h-16 lg:max-h-32"></div>

      {/* Theme Toggle */}
      <div className="mb-1 sm:mb-4">
        <ThemeToggle />
      </div>

      {/* Language Toggle - Horizontal */}
      <div className="mb-4 sm:mb-6">
        <LanguageToggle currentPath={currentPath} />
      </div>

      {/* Vertical Line above email */}
      <div className="w-px flex-1 bg-text-secondary opacity-30 mb-4 sm:mb-6 max-h-4 sm:max-h-16 lg:max-h-32"></div>

      {/* Vertical Email */}
      <div className="flex flex-col items-center">
        <a
          href="mailto:razcue@yandex.com"
          className="text-text-secondary hover:text-accent transition-colors text-xs sm:text-sm font-medium tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
          razcue@yandex.com
        </a>
      </div>

      {/* Vertical Line below email */}
      <div className="w-px flex-1 bg-text-secondary opacity-30 mt-4 sm:mt-6 max-h-16 lg:max-h-32"></div>
    </div>
  );
}
