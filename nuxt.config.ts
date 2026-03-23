export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  alias: {
    "#contentrain": "./.contentrain/client/index.mjs",
  },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Nuxt SaaS Starter",
      meta: [
        {
          name: "description",
          content: "A premium SaaS starter with strong pricing, integrations, and narrative marketing structure.",
        },
      ],
    },
  },
});
