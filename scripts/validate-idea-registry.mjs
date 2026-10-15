import { loadSchema, readJson, validateRegistry } from "./factory-validation.mjs";

const schema = loadSchema();
const registry = validateRegistry(readJson(process.cwd(), "data/IDEA_REGISTRY.json"), { schema });
const deskQualifiedIds = new Set([
  ...registry.portfolioRound.stateGroups.provisional_finalist,
  ...registry.portfolioRound.stateGroups.selected_for_interviews,
]);
const ranked = registry.ideas
  .filter((idea) => deskQualifiedIds.has(idea.id))
  .map((idea) => ({ ...idea, currentScore: Math.round(50 + (idea.baseScore - 50) * idea.evidenceConfidence) }))
  .sort((a, b) => b.currentScore - a.currentScore || b.evidenceConfidence - a.evidenceConfidence || a.title.localeCompare(b.title, "ru"));
console.log(`idea registry v${registry.schemaVersion} ok: ${registry.ideas.length} ideas, ${new Set(registry.ideas.map((idea) => idea.category)).size} categories, desk-qualified=${ranked.length}, top=${ranked[0] ? `${ranked[0].title} (${ranked[0].currentScore})` : "none"}`);
