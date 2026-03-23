import { document, singleton } from "#contentrain";
import type { ChangelogEntry } from "#contentrain";

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, "slug");
  const site = singleton("site-settings").locale("en").get();
  const navigation = singleton("navigation").locale("en").get();
  const footer = singleton("footer").locale("en").get();
  const seo = singleton("seo-defaults").locale("en").get();

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing changelog slug" });
  }

  const entry = document("changelog-entry")
    .locale("en")
    .all()
    .find((item: ChangelogEntry) => item.slug === slug);

  if (!entry) {
    throw createError({ statusCode: 404, statusMessage: "Changelog entry not found" });
  }

  return {
    entry,
    footer,
    navigation,
    seo,
    site,
  };
});
