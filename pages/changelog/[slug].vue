<script setup lang="ts">
import type { ChangelogEntry, Footer, Navigation, SeoDefaults, SiteSettings } from "#contentrain";

type ChangelogPayload = {
  entry: ChangelogEntry;
  footer: Footer;
  navigation: Navigation;
  seo: SeoDefaults;
  site: SiteSettings;
};

const route = useRoute();
const { data: page } = await useAsyncData<ChangelogPayload>(
  `changelog:${route.params.slug}`,
  () => $fetch(`/api/changelog/${route.params.slug}`),
);

const paragraphs = computed(() =>
  String(page.value?.entry?.content ?? "")
    .split(/\n\s*\n/g)
    .filter(Boolean),
);

useSeoMeta({
  title: () => `${page.value?.entry?.title ?? "Changelog"} | ${page.value?.site?.site_name ?? "Signal Stack"}`,
  description: () => page.value?.entry?.summary ?? page.value?.seo?.meta_description,
});
</script>

<template>
  <main class="shell" data-theme="signal-saas">
    <header class="header">
      <NuxtLink href="/" class="brand">{{ page?.site?.site_name }}</NuxtLink>
      <nav class="nav muted">
        <a
          v-for="item in page?.navigation?.items ?? []"
          :key="item.label"
          :href="item.href"
        >
          {{ item.label }}
        </a>
      </nav>
    </header>

    <section class="hero">
      <div>
        <div class="eyebrow">Changelog entry</div>
        <h1>{{ page?.entry?.title }}</h1>
        <p>{{ page?.entry?.summary }}</p>
        <div class="button-row">
          <NuxtLink class="button" href="/">Back to starter</NuxtLink>
          <a class="pill" href="https://docs.contentrain.io/">Open Contentrain docs</a>
        </div>
      </div>

      <aside class="hero-card">
        <div class="eyebrow">Released</div>
        <p class="muted">{{ page?.entry?.release_date }}</p>
      </aside>
    </section>

    <section class="section">
      <h2>Release narrative</h2>
      <div class="grid-2">
        <article v-for="paragraph in paragraphs" :key="paragraph" class="quote-card">
          <p class="muted">{{ paragraph }}</p>
        </article>
      </div>
    </section>

    <footer class="footer muted">
      <div class="footer-copy">
        <span>{{ page?.footer?.blurb }}</span>
        <span>{{ page?.footer?.legal_notice }}</span>
      </div>
      <div class="footer-columns">
        <section v-for="column in page?.footer?.columns ?? []" :key="column.title" class="footer-column">
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
