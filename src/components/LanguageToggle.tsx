import { useState, useEffect } from 'react';
import {
  getLocaleFromUrl,
  getLocalizedPath,
  setStoredLocale,
  type Locale,
} from '../utils/i18n';

interface LanguageToggleProps {
  currentPath: string;
}

export default function LanguageToggle({ currentPath }: LanguageToggleProps) {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');

  useEffect(() => {
    // Get current locale from URL
    const url = new URL(window.location.href);
    setCurrentLocale(getLocaleFromUrl(url));
  }, []);

  const toggleLanguage = () => {
    const newLocale: Locale = currentLocale === 'en' ? 'es' : 'en';

    // Save locale preference to localStorage
    setStoredLocale(newLocale);

    // Get current hash (section) to preserve it
    const currentHash = window.location.hash;

    // Navigate to the new locale path with preserved hash
    const newPath = getLocalizedPath(currentPath, newLocale);
    window.location.href = newPath + currentHash;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="text-sm sm:text-base font-medium text-primary hover:text-[var(--accent)] transition-colors"
      aria-label={`Switch to ${currentLocale === 'en' ? 'Spanish' : 'English'}`}
    >
      {currentLocale === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
