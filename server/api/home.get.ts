import { document, query, singleton } from "#contentrain";

const featureOrder = [
  "narrative-product-marketing",
  "shared-content-contracts",
  "nuxt-native-structure",
];
const integrationOrder = ["stripe", "supabase", "resend", "posthog", "hubspot", "linear"];

export default defineEventHandler(() => {
  const site = singleton("site-settings").locale("en").get();
  const navigation = singleton("navigation").locale("en").get();
  const hero = singleton("hero").locale("en").get();
  const seo = singleton("seo-defaults").locale("en").get();
  const footer = singleton("footer").locale("en").get();
  const features = query("feature")
    .locale("en")
    .all()
    .toSorted((left, right) => featureOrder.indexOf(left.id) - featureOrder.indexOf(right.id));
  const plans = query("pricing-tier").locale("en").sort("featured", "desc").all();
  const integrations = query("integration")
    .locale("en")
    .all()
    .toSorted((left, right) => integrationOrder.indexOf(left.id) - integrationOrder.indexOf(right.id));
  const testimonials = query("testimonial").locale("en").all();
  const faqs = query("faq-item").locale("en").all();
  const changelog = document("changelog-entry")
    .locale("en")
    .all()
    .toSorted((left, right) => String(right.release_date).localeCompare(String(left.release_date), "en"));

  return {
    site,
    navigation,
    hero,
    seo,
    footer,
    features,
    plans,
    integrations,
    testimonials,
    faqs,
    changelog,
  };
});
