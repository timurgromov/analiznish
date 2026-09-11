import fs from "node:fs";
import path from "node:path";
import { defaultRoot, loadSchema, parseActiveRun, readJson } from "../scripts/factory-validation.mjs";

function clone(value) {
  return structuredClone(value);
}

export function factoryFixtures(rootDir = defaultRoot) {
  const schema = loadSchema(rootDir);
  const markdown = fs.readFileSync(path.join(rootDir, "data/ACTIVE_RUN.md"), "utf8");
  const activeRun = parseActiveRun(markdown);
  const boardText = fs.readFileSync(path.join(rootDir, activeRun.sourceBoard), "utf8");
  const registry = readJson(rootDir, "data/IDEA_REGISTRY.json");
  const factoryState = readJson(rootDir, "data/FACTORY_STATE.json");
  return {
    rootDir,
    schema: clone(schema),
    activeRun: clone(activeRun),
    boardText,
    registry: clone(registry),
    factoryState: clone(factoryState)
  };
}

export function ideaById(registry, id) {
  return registry.ideas.find((idea) => idea.id === id);
}
