export type Theme = 'light' | 'dark';

/**
 * Get stored theme from localStorage
 */
function getStoredThemeValue(): Theme | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('theme') as Theme;
  return stored === 'light' || stored === 'dark' ? stored : null;
}

/**
 * Get system theme preference
 */
function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Get the best theme based on priority:
 * 1. Stored preference (localStorage)
 * 2. System preference
 * 3. Fallback to dark
 */
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'; // Default for SSR

  const stored = getStoredThemeValue();
  if (stored) return stored;

  return getSystemTheme();
}

export function setStoredTheme(theme: Theme): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export function applyTheme(theme: Theme): void {
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
