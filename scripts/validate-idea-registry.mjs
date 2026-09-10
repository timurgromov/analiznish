import fs from "node:fs";
import path from "node:path";

const registryPath = "data/IDEA_REGISTRY.json";
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(`${registryPath}: ${message}`);
}

function sourceExists(source, label) {
  assert(typeof source === "string" && source.trim(), `${label}: пустой source`);
  assert(!source.startsWith("/") && !source.includes(".."), `${label}: source должен быть относительным путём проекта`);
  assert(fs.existsSync(source), `${label}: source не существует: ${source}`);
}

assert(registry.schemaVersion === 1, "поддерживается только schemaVersion 1");
assert(/^\d{4}-\d{2}-\d{2}$/.test(registry.updatedAt), "updatedAt должен быть YYYY-MM-DD");
assert(registry.rankingModel?.neutralPrior === 50, "neutralPrior должен быть 50");
assert(registry.rankingModel?.formula === "round(50 + (baseScore - 50) * evidenceConfidence)", "неожиданная ranking formula");

const stages = new Map(registry.stages.map((stage) => [stage.id, stage]));
const gateStatuses = new Set(registry.gateStatuses.map((status) => status.id));
assert(stages.size === registry.stages.length && stages.size === 8, "этапы должны быть уникальными и покрывать 8 стадий");
assert(gateStatuses.size === registry.gateStatuses.length && gateStatuses.size === 6, "gate statuses должны быть уникальными и покрывать 6 исходов");

const runIds = new Set();
for (const run of registry.runs) {
  assert(!runIds.has(run.id), `дублируется run id: ${run.id}`);
  runIds.add(run.id);
  for (const key of ["id", "title", "category", "status", "result", "evidenceLevel", "updatedAt"]) {
    assert(typeof run[key] === "string" && run[key].trim(), `${run.id}.${key} обязателен`);
  }
  sourceExists(run.source, run.id);
}

const ideaIds = new Set();
const aliases = new Set();
const cardSources = new Set();
for (const idea of registry.ideas) {
  assert(/^[a-z0-9-]+$/.test(idea.id), `некорректный idea id: ${idea.id}`);
  assert(!ideaIds.has(idea.id), `дублируется idea id: ${idea.id}`);
  ideaIds.add(idea.id);
  for (const key of ["title", "category", "objectType", "scoreBasis", "evidenceLevel", "rankingReason", "mainRisk", "nextGate"]) {
    assert(typeof idea[key] === "string" && idea[key].trim(), `${idea.id}.${key} обязателен`);
  }
  assert(Number.isFinite(idea.baseScore) && idea.baseScore >= 0 && idea.baseScore <= 100, `${idea.id}.baseScore должен быть 0–100`);
  assert(Number.isFinite(idea.evidenceConfidence) && idea.evidenceConfidence >= 0 && idea.evidenceConfidence <= 1, `${idea.id}.evidenceConfidence должен быть 0–1`);
  assert(/^E[0-5]$/.test(idea.evidenceLevel), `${idea.id}.evidenceLevel должен быть E0–E5`);
  assert(stages.has(idea.stage), `${idea.id}: неизвестный stage ${idea.stage}`);
  assert(gateStatuses.has(idea.gateStatus), `${idea.id}: неизвестный gateStatus ${idea.gateStatus}`);
  sourceExists(idea.source, idea.id);
  if (idea.source.startsWith("data/niches/") && !idea.source.endsWith("INDEX.md") && !idea.source.endsWith("README.md")) {
    cardSources.add(idea.source);
  }
  for (const runId of idea.runIds ?? []) assert(runIds.has(runId), `${idea.id}: неизвестный runId ${runId}`);
  for (const alias of idea.aliases ?? []) {
    assert(!aliases.has(alias), `дублируется alias: ${alias}`);
    aliases.add(alias);
  }
}

const nicheCards = fs.readdirSync("data/niches")
  .filter((name) => name.endsWith(".md") && !["INDEX.md", "README.md"].includes(name))
  .map((name) => path.posix.join("data/niches", name));
for (const card of nicheCards) assert(cardSources.has(card), `карточка отсутствует в едином реестре: ${card}`);

const ranked = registry.ideas
  .map((idea) => ({ ...idea, currentScore: Math.round(50 + (idea.baseScore - 50) * idea.evidenceConfidence) }))
  .sort((a, b) => b.currentScore - a.currentScore || b.evidenceConfidence - a.evidenceConfidence || a.title.localeCompare(b.title, "ru"));

assert(registry.ideas.length >= 10, "единый реестр не должен содержать только один domain batch");
assert(new Set(registry.ideas.map((idea) => idea.category)).size >= 5, "реестр должен покрывать несколько категорий");
console.log(`idea registry ok: ${registry.ideas.length} ideas, ${new Set(registry.ideas.map((idea) => idea.category)).size} categories, top=${ranked[0].title} (${ranked[0].currentScore})`);
