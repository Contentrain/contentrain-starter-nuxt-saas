<script setup lang="ts">
import type {
  ChangelogEntry,
  FaqItem,
  Feature,
  Footer,
  Hero,
  Integration,
  Navigation,
  PricingTier,
  SeoDefaults,
  SiteSettings,
  Testimonial,
} from "#contentrain";

type HomePayload = {
  changelog: ChangelogEntry[];
  faqs: FaqItem[];
  features: Feature[];
  footer: Footer;
  hero: Hero;
  integrations: Integration[];
  navigation: Navigation;
  plans: PricingTier[];
  seo: SeoDefaults;
  site: SiteSettings;
  testimonials: Testimonial[];
};

const { data: home } = await useAsyncData<HomePayload>("saas-home", () => $fetch("/api/home"));

useSeoMeta({
  title: () => home.value?.seo.meta_title ?? "Nuxt SaaS Starter",
  description: () =>
    home.value?.seo.meta_description ??
    "A premium SaaS starter with strong pricing, integrations, and narrative marketing structure.",
});
</script>

<template>
  <main class="shell" data-theme="signal-saas">
    <header class="header">
      <a href="/" class="brand">{{ home?.site?.site_name }}</a>
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
        <div class="eyebrow">{{ home?.hero?.eyebrow }}</div>
        <h1>{{ home?.hero?.title }}</h1>
        <p>{{ home?.hero?.subtitle }}</p>
        <div class="button-row">
          <a class="button" :href="home?.hero?.primary_cta_href">{{ home?.hero?.primary_cta_label }}</a>
          <a class="pill" :href="home?.hero?.secondary_cta_href">{{ home?.hero?.secondary_cta_label }}</a>
        </div>
      </div>

      <aside class="hero-card">
        <img
          v-if="home?.hero?.hero_media"
          :src="home.hero.hero_media"
          :alt="home?.hero?.title"
          class="hero-media"
        >
        <div class="eyebrow">Starter perspective</div>
        <p class="muted">
          {{ home?.site?.site_tagline }}
        </p>
      </aside>
    </section>

    <section id="features" class="section">
      <h2>Strong defaults for product marketing teams.</h2>
      <div class="grid-3">
        <article v-for="feature in home?.features ?? []" :key="feature.id" class="feature-card">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.summary }}</p>
        </article>
      </div>
    </section>

    <section id="pricing" class="section">
      <h2>Pricing surfaces that read clearly on first pass.</h2>
      <div class="grid-3">
        <article
          v-for="plan in home?.plans ?? []"
          :key="plan.id"
          class="plan-card"
          :class="{ featured: plan.featured }"
        >
          <h3>{{ plan.name }}</h3>
          <div class="price">{{ plan.price_label }}</div>
          <p>{{ plan.summary }}</p>
          <ul>
            <li v-for="bullet in plan.features" :key="bullet">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Integration storytelling can be content, not screenshots.</h2>
      <div class="grid-3">
        <article
          v-for="integration in home?.integrations ?? []"
          :key="integration.id"
          class="integration-card"
        >
          <strong>{{ integration.name }}</strong>
          <p class="muted">{{ integration.summary }}</p>
        </article>
      </div>
    </section>

    <section id="proof" class="section">
      <h2>Starter kits should feel shipped.</h2>
      <div class="grid-2">
        <article v-for="item in home?.testimonials ?? []" :key="item.id" class="quote-card">
          <div v-if="item.avatar" class="testimonial-head">
            <img :src="item.avatar" :alt="item.person_name" class="avatar">
            <div>
              <strong>{{ item.person_name }}</strong>
              <div class="muted">{{ item.person_role }}</div>
            </div>
          </div>
          <p>“{{ item.quote }}”</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Release notes that can graduate into docs later.</h2>
      <div class="grid-2">
        <NuxtLink
          v-for="entry in home?.changelog ?? []"
          :key="entry.slug"
          class="quote-card changelog-link"
          :to="`/changelog/${entry.slug}`"
        >
          <div class="eyebrow">{{ entry.release_date }}</div>
          <h3>{{ entry.title }}</h3>
          <p class="muted">{{ entry.summary }}</p>
        </NuxtLink>
      </div>
    </section>

    <section class="section">
      <h2>Teams can start structured and still move fast.</h2>
      <div class="grid-2">
        <article v-for="item in home?.faqs ?? []" :key="item.id" class="quote-card">
          <h3>{{ item.question }}</h3>
          <p class="muted">{{ item.answer }}</p>
        </article>
      </div>
    </section>

    <section class="section">
      <h2>Inspect the actual schema architecture.</h2>
      <div class="grid-2">
        <NuxtLink to="/architecture" class="quote-card changelog-link">
          <h3>Open architecture page</h3>
          <p class="muted">
            See Contentrain domains, model kinds, and field structures rendered from the local
            `.contentrain/models` directory.
          </p>
        </NuxtLink>
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
