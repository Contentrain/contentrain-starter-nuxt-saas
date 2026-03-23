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

type ArchitectureGroup = {
  domain: string;
  models: ModelSchema[];
};

export default defineEventHandler(async () => {
  const rootDir = process.cwd();
  const modelDir = path.join(rootDir, ".contentrain", "models");
  const modelFiles = (await readdir(modelDir)).sort();
  const models: ModelSchema[] = await Promise.all(
    modelFiles.map(async (file: string) =>
      JSON.parse(await readFile(path.join(modelDir, file), "utf8")) as ModelSchema,
    ),
  );
  const domains: string[] = [...new Set(models.map((model: ModelSchema) => model.domain))].sort((left, right) =>
    left.localeCompare(right, "en"),
  );
  const groups: ArchitectureGroup[] = domains.map((domain: string) => ({
    domain,
    models: models.filter((model: ModelSchema) => model.domain === domain),
  }));

  return {
    groups,
  };
});
