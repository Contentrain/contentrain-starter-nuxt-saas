import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

type ModelField = {
  type?: string;
};

type ModelSchema = {
  id: string;
  kind: string;
  domain: string;
  fields?: Record<string, ModelField>;
};

export default defineEventHandler(async () => {
  const rootDir = process.cwd();
  const modelDir = path.join(rootDir, ".contentrain", "models");
  const modelFiles = (await readdir(modelDir)).sort();
  const models = await Promise.all(
    modelFiles.map(async (file) =>
      JSON.parse(await readFile(path.join(modelDir, file), "utf8")) as ModelSchema,
    ),
  );
  const domains = [...new Set(models.map((model) => model.domain))].sort((left, right) =>
    left.localeCompare(right, "en"),
  );

  return {
    groups: domains.map((domain) => ({
      domain,
      models: models.filter((model) => model.domain === domain),
    })),
  };
});
