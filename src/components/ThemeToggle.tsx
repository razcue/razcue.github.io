import { useState, useEffect } from 'react';
import {
  getStoredTheme,
  setStoredTheme,
  applyTheme,
  type Theme,
} from '../utils/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg transition-colors cursor-pointer"
      >
        <i className="i-tabler-moon h-4 md:h-5 w-4 md:w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-text-secondary hover:text-accent transition-colors cursor-pointer"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <i className="i-tabler-sun h-6 w-6" />
      ) : (
        <i className="i-tabler-moon h-6 w-6" />
      )}
    </button>
  );
}
