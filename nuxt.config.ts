import { fileURLToPath } from "node:url";

const contentrainClientDir = fileURLToPath(new URL("./.contentrain/client/", import.meta.url));
const contentrainClientIndex = fileURLToPath(new URL("./.contentrain/client/index.mjs", import.meta.url));

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  alias: {
    "#contentrain": contentrainClientIndex,
    "#contentrain/": `${contentrainClientDir}/`,
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
