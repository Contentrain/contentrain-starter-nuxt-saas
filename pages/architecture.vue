<script setup lang="ts">
import type { Footer, Navigation, SeoDefaults, SiteSettings } from "#contentrain";

type ModelField = {
  type?: string;
};

type ModelSchema = {
  id: string;
  kind: string;
  domain: string;
  fields?: Record<string, ModelField>;
};

type ArchitecturePayload = {
  groups: Array<{
    domain: string;
    models: ModelSchema[];
  }>;
};

type HomePayload = {
  footer: Footer;
  navigation: Navigation;
  seo: SeoDefaults;
  site: SiteSettings;
};

const [{ data: architecture }, { data: home }] = await Promise.all([
  useAsyncData<ArchitecturePayload>("architecture", () => $fetch("/api/architecture")),
  useAsyncData<HomePayload>("architecture-home", async () => {
    const response = await $fetch<HomePayload>("/api/home");
    return {
      footer: response.footer,
      navigation: response.navigation,
      seo: response.seo,
      site: response.site,
    };
  }),
]);

useSeoMeta({
  title: () => `Architecture | ${home.value?.site?.site_name ?? "Signal Stack"}`,
  description: () =>
    "Domain-grouped Contentrain model architecture for the Nuxt SaaS starter.",
});
</script>

<template>
  <main class="shell" data-theme="signal-saas">
    <header class="header">
      <NuxtLink href="/" class="brand">{{ home?.site?.site_name }}</NuxtLink>
      <nav class="nav muted">
        <a
          v-for="item in home?.navigation?.items ?? []"
          :key="item.label"
          :href="item.href"
        >
          {{ item.label }}
        </a>
      </nav>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">Content architecture</div>
        <h1>Model domains, schemas, and app surfaces in one place.</h1>
        <p>
          This page reads the local Contentrain model JSON files and groups them by domain so teams
          can inspect the exact schema behind the starter.
        </p>
      </div>

      <aside class="hero-card">
        <div class="eyebrow">Official links</div>
        <div class="footer-links">
          <a href="https://ai.contentrain.io/packages/sdk.html">SDK</a>
          <a href="https://docs.contentrain.io/">Docs</a>
          <a href="https://studio.contentrain.io/">Studio</a>
        </div>
      </aside>
    </section>

    <section class="section">
      <h2>Domain groups</h2>
      <div class="grid-2">
        <article v-for="group in architecture?.groups ?? []" :key="group.domain" class="quote-card">
          <h3 style="text-transform: capitalize;">{{ group.domain }}</h3>
          <p class="muted">{{ group.models.length }} models</p>
          <div class="chip-list">
            <span v-for="model in group.models" :key="model.id" class="field-chip">
              {{ model.id }} ({{ model.kind }})
            </span>
          </div>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Field examples</h2>
      <div class="grid-2">
        <article v-for="group in architecture?.groups ?? []" :key="`${group.domain}-fields`" class="quote-card">
          <h3 style="text-transform: capitalize;">{{ group.domain }}</h3>
          <div
            v-for="model in group.models"
            :key="`${group.domain}-${model.id}`"
            style="display: grid; gap: 0.75rem; margin-bottom: 1rem;"
          >
            <strong>{{ model.id }}</strong>
            <div class="chip-list">
              <span
                v-for="fieldName in Object.keys(model.fields ?? {})"
                :key="fieldName"
                class="field-chip"
              >
                {{ fieldName }}: {{ model.fields?.[fieldName]?.type ?? "unknown" }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <footer class="footer muted">
      <div class="footer-copy">
        <span>{{ home?.footer?.blurb }}</span>
        <span>{{ home?.footer?.legal_notice }}</span>
      </div>
      <div class="footer-columns">
        <section v-for="column in home?.footer?.columns ?? []" :key="column.title" class="footer-column">
          <strong>{{ column.title }}</strong>
          <div class="footer-links">
            <a v-for="link in column.links ?? []" :key="link.label" :href="link.href">
              {{ link.label }}
            </a>
          </div>
        </section>
      </div>
    </footer>
  </main>
</template>
