// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
  modules: ["@nuxt/fonts", "@nuxtjs/color-mode", "@nuxtjs/supabase"],
  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google",
      },
    ],
  },
  supabase: {
    redirect: false,
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      appUrl: process.env.APP_URL,
    },
  },
});
