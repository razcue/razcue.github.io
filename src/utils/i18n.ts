import en from '../i18n/en';
import es from '../i18n/es';

export type Locale = 'en' | 'es';
export type TranslationKey = keyof typeof en;

const translations = {
  en,
  es,
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale];
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  return locale === 'es' ? 'es' : 'en';
}

export function getLocalizedPath(pathname: string, locale: Locale): string {
  // Remove leading slash
  const path = pathname.startsWith('/') ? pathname.slice(1) : pathname;

  // If it's the home page and locale is default (en), don't add locale prefix
  if ((path === '' || path === 'index.html') && locale === 'en') {
    return '/';
  }

  // For other pages, add locale prefix
  return locale === 'en' ? `/${path}` : `/${locale}/${path}`;
}

/**
 * Get stored locale from localStorage
 */
export function getStoredLocale(): Locale | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('locale');
  return stored === 'es' || stored === 'en' ? stored : null;
}

/**
 * Set locale in localStorage
 */
export function setStoredLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
}

/**
 * Get browser's preferred locale
 */
export function getBrowserLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const lang = navigator.language.toLowerCase();
  // Check if browser language starts with 'es' (es, es-ES, es-MX, etc.)
  return lang.startsWith('es') ? 'es' : 'en';
}

/**
 * Get the best locale based on priority:
 * 1. Stored preference (localStorage)
 * 2. Browser language
 * 3. Fallback to English
 */
export function getPreferredLocale(): Locale {
  const stored = getStoredLocale();
  if (stored) return stored;

  return getBrowserLocale();
}
