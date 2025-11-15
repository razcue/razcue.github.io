import { defineConfig, presetIcons } from 'unocss';
import presetWind4 from '@unocss/preset-wind4';

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      collections: {
        tabler: () =>
          import('@iconify-json/tabler/icons.json').then((i) => i.default),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  safelist: [
    // CSS variable color classes
    'bg-[var(--bg)]',
    'bg-[var(--surface)]',
    'bg-[var(--accent)]',
    'bg-[var(--border)]',
    'text-[var(--text)]',
    'text-[var(--text-secondary)]',
    'text-[var(--accent)]',
    'border-[var(--border)]',
    'border-[var(--accent)]',
    // Hover states
    'hover:bg-[var(--surface)]',
    'hover:bg-[var(--accent)]',
    'hover:text-[var(--accent)]',
    'hover:border-[var(--accent)]',
    // Status badge colors
    'bg-green-500/20',
    'text-green-400',
    'border-green-500/30',
    'bg-blue-500/20',
    'text-blue-400',
    'border-blue-500/30',
    'bg-gray-500/20',
    'text-gray-400',
    'border-gray-500/30',
    'bg-purple-500/20',
    'text-purple-400',
    'border-purple-500/30',
    // Tabler icons
    'i-tabler-brand-github',
    'i-tabler-external-link',
    'i-tabler-message-dots',
  ],
  theme: {
    colors: {
      // Brittany Chiang inspired colors (from v4.brittanychiang.com)
      'dark-navy': '#020c1b',
      navy: '#0a192f',
      'light-navy': '#112240',
      'lightest-navy': '#233554',
      slate: '#8892b0',
      'light-slate': '#a8b2d1',
      'lightest-slate': '#ccd6f6',
      white: '#e6f1ff',
      green: '#64ffda',
      'green-tint': 'rgba(100, 255, 218, 0.1)',

      // Theme mapped colors
      dark: {
        bg: '#0a192f',
        surface: '#112240',
        text: '#e6f1ff',
        'text-secondary': '#8892b0',
        accent: '#64ffda',
      },
      light: {
        bg: '#ffffff',
        surface: '#f8fafc',
        text: '#1e293b',
        'text-secondary': '#64748b',
        accent: '#0ea5e9',
      },
    },
  },
});
