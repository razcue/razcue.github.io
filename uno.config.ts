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
});
