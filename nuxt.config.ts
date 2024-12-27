// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  googleFonts: {
    families: {
      'Open Sans': [400, 600],
    },
    display: 'swap',
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    // Menambahkan Pinia module
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3333', // Sesuaikan dengan URL Adonis API Anda
    },
  },
})
