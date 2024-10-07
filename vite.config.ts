import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import federation from '@originjs/vite-plugin-federation'
import { URL } from 'url'

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    federation({
      name: 'modules.razcue.github.io',
      filename: 'remoteEntry.js',
      exposes: {
        './Marquee': './src/components/Marquee.vue',
      },
      shared: ['vue'],
    }),
  ],
  base: '',
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          `@import 'vuetify/styles';`,
      },
    },
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
  },
})
