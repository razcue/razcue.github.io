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
  theme: {
    colors: {
      // Theme semantic colors using CSS variables
      bg: 'var(--bg)',
      surface: 'var(--surface)',
      text: 'var(--text)',
      'text-secondary': 'var(--text-secondary)',
      accent: 'var(--accent)',
    },
  },
  // Preflights (CSS reset) are automatically included and applied FIRST
  // This ensures utility classes like bg-accent override the reset's background-color: transparent
  // The order is: Preflights (reset) → Theme → Utility classes → Your custom CSS
  preflights: [
    {
      getCSS: () => `
        /* Override button reset to not set background-color by default */
        button, [type='button'], [type='reset'], [type='submit'] {
          background-color: initial;
        }
      `,
    },
  ],
});
