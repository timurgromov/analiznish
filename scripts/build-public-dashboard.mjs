import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defaultRoot, invariant, validateAll } from "./factory-validation.mjs";

function stripPrivateFields(value, privateFields) {
  if (Array.isArray(value)) return value.map((item) => stripPrivateFields(item, privateFields));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !privateFields.has(key))
      .map(([key, item]) => [key, stripPrivateFields(item, privateFields)])
  );
}

function listFiles(directory, base = directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(absolute, base));
    else files.push(path.relative(base, absolute).split(path.sep).join("/"));
  }
  return files.sort();
}

function assertSafeOutput(rootDir, outputDir) {
  const resolved = path.resolve(outputDir);
  const projectOutput = path.join(path.resolve(rootDir), "_site");
  const temporaryRoot = path.resolve(os.tmpdir());
  const systemTmpRoot = path.resolve("/tmp");
  invariant(
    resolved === projectOutput || resolved.startsWith(`${temporaryRoot}${path.sep}`) || resolved.startsWith(`${systemTmpRoot}${path.sep}`),
    `public build output разрешён только в ${projectOutput} или системной temp: ${resolved}`,
    "public build"
  );
  invariant(resolved !== path.parse(resolved).root && resolved !== path.resolve(rootDir), "небезопасный output path", "public build");
}

export function validatePublicArtifact(outputDir, schema) {
  const label = "public artifact";
  const files = listFiles(outputDir);
  const allowedFiles = new Set(schema.publicArtifact.allowedFiles);
  const allowedPrefixes = schema.publicArtifact.allowedPrefixes;
  for (const file of files) {
    invariant(allowedFiles.has(file) || allowedPrefixes.some((prefix) => file.startsWith(prefix)), `файл вне allowlist: ${file}`, label);
    invariant(!schema.publicArtifact.forbiddenPrefixes.some((prefix) => file.startsWith(prefix)), `запрещённый публичный путь: ${file}`, label);
  }
  for (const required of allowedFiles) invariant(files.includes(required), `нет обязательного файла: ${required}`, label);
  for (const forbidden of schema.publicArtifact.forbiddenPrefixes) {
    invariant(!fs.existsSync(path.join(outputDir, forbidden)), `запрещённый каталог/файл существует: ${forbidden}`, label);
  }

  const registryPath = path.join(outputDir, "data/IDEA_REGISTRY.json");
  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const privateFields = new Set(schema.publicArtifact.registryPrivateFields);
  function visit(value, location = "registry") {
    if (Array.isArray(value)) return value.forEach((item, index) => visit(item, `${location}[${index}]`));
    if (!value || typeof value !== "object") return;
    for (const [key, item] of Object.entries(value)) {
      invariant(!privateFields.has(key), `${location}.${key} не должен попадать в public registry`, label);
      visit(item, `${location}.${key}`);
    }
  }
  visit(registry);
  return files;
}

export function buildPublicArtifact({ rootDir = defaultRoot, outputDir = path.join(rootDir, "_site") } = {}) {
  const { schema, registry } = validateAll({ rootDir });
  assertSafeOutput(rootDir, outputDir);
  fs.rmSync(outputDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(outputDir, "dashboard"), { recursive: true });
  fs.mkdirSync(path.join(outputDir, "data"), { recursive: true });
  fs.mkdirSync(path.join(outputDir, "docs"), { recursive: true });
  for (const name of ["app.js", "favicon.svg", "index.html", "project.html", "project.js", "styles.css"]) {
    fs.copyFileSync(path.join(rootDir, "dashboard", name), path.join(outputDir, "dashboard", name));
  }

  const sanitizedRegistry = stripPrivateFields(registry, new Set(schema.publicArtifact.registryPrivateFields));
  fs.writeFileSync(path.join(outputDir, "data/IDEA_REGISTRY.json"), `${JSON.stringify(sanitizedRegistry, null, 2)}\n`);
  for (const relativePath of ["data/FACTORY_STATE.json", "data/HIT_PARADE.md", "docs/SCORING_MODEL.md"]) {
    fs.copyFileSync(path.join(rootDir, relativePath), path.join(outputDir, relativePath));
  }
  fs.writeFileSync(path.join(outputDir, ".nojekyll"), "");
  const files = validatePublicArtifact(outputDir, schema);
  return { outputDir, files };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const outputFlag = process.argv.indexOf("--output");
  invariant(outputFlag < 0 || process.argv[outputFlag + 1], "--output требует путь", "public build");
  const outputDir = outputFlag >= 0 ? path.resolve(process.argv[outputFlag + 1]) : path.join(defaultRoot, "_site");
  const result = buildPublicArtifact({ outputDir });
  console.log(`public artifact ok: ${result.files.length} files → ${result.outputDir}`);
}
