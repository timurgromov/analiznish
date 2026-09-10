import fs from "node:fs";

const statePath = "data/FACTORY_STATE.json";
const state = JSON.parse(fs.readFileSync(statePath, "utf8"));

function assert(condition, message) {
  if (!condition) throw new Error(`${statePath}: ${message}`);
}

function sourceExists(source, label) {
  assert(typeof source === "string" && source.length > 0, `${label}: пустой source`);
  assert(!source.startsWith("/") && !source.includes(".."), `${label}: source должен быть относительным путём проекта`);
  assert(fs.existsSync(source), `${label}: source не существует: ${source}`);
}

assert(state.schemaVersion === 1, "поддерживается только schemaVersion 1");
assert(/^\d{4}-\d{2}-\d{2}$/.test(state.updatedAt), "updatedAt должен быть YYYY-MM-DD");
assert(state.currentCheckpoint && typeof state.currentCheckpoint === "object", "нет currentCheckpoint");
const snapshot = state.workspaceSnapshot;
assert(snapshot && typeof snapshot === "object", "нет workspaceSnapshot");
const discoveryFiles = fs.readdirSync("data/discovery").filter((name) => name.endsWith(".md") && !name.startsWith("_") && name !== "README.md").length;
assert(snapshot.discoveryArtifacts === discoveryFiles, `workspaceSnapshot.discoveryArtifacts: ожидалось ${discoveryFiles}`);
for (const key of ["ideaInbox", "portfolioMarkets", "portfolioBets"]) {
  assert(Number.isInteger(snapshot[key]) && snapshot[key] >= 0, `workspaceSnapshot.${key} должен быть неотрицательным целым`);
}
for (const key of ["title", "summary", "confirmed", "unknown", "ownerDecision", "nextGate"]) {
  assert(typeof state.currentCheckpoint[key] === "string" && state.currentCheckpoint[key].trim(), `currentCheckpoint.${key} обязателен`);
}
sourceExists(state.currentCheckpoint.source, "currentCheckpoint");

const stats = state.currentCheckpoint.stats;
for (const key of ["marketplaceLeads", "moneyPatterns", "candidates", "finalists", "realInterviews", "actionTests", "payments", "repeatSignals"]) {
  assert(Number.isInteger(stats[key]) && stats[key] >= 0, `stats.${key} должен быть неотрицательным целым`);
}

const allowedStages = new Set(["finalist", "reserve", "parked", "rejected"]);
const allowedTestability = new Set(["testable_now", "safety_first", "needs_channel", "needs_access", "switching_unproven", "do_not_invest"]);
const ids = new Set();
for (const candidate of state.candidates) {
  assert(/^P\d+$/.test(candidate.id), `некорректный candidate id: ${candidate.id}`);
  assert(!ids.has(candidate.id), `дублируется candidate id: ${candidate.id}`);
  ids.add(candidate.id);
  assert(allowedStages.has(candidate.stage), `${candidate.id}: недопустимый stage`);
  assert(allowedTestability.has(candidate.testability), `${candidate.id}: недопустимый testability`);
  assert(/^E[0-5]$/.test(candidate.evidenceLevel), `${candidate.id}: evidenceLevel должен быть E0–E5`);
  for (const key of ["title", "payer", "moneyModel", "stageLabel", "testabilityLabel", "evidenceLabel", "risk", "nextGate"]) {
    assert(typeof candidate[key] === "string" && candidate[key].trim(), `${candidate.id}.${key} обязателен`);
  }
  for (const key of ["marketScore", "economicsScore", "marketOpportunityScore", "executionPriorityScore"]) {
    assert(Number.isFinite(candidate[key]) && candidate[key] >= 0 && candidate[key] <= 100, `${candidate.id}.${key} должен быть 0–100`);
  }
  assert(Number.isFinite(candidate.evidenceConfidence) && candidate.evidenceConfidence >= 0 && candidate.evidenceConfidence <= 1, `${candidate.id}.evidenceConfidence должен быть 0–1`);
  sourceExists(candidate.source, candidate.id);
}

assert(stats.candidates === state.candidates.length, "stats.candidates не совпадает с candidates.length");
assert(stats.finalists === state.candidates.filter((item) => item.stage === "finalist").length, "stats.finalists не совпадает с количеством finalist");
const interviewFiles = fs.readdirSync("data/interviews").filter((name) => name.endsWith(".md") && !name.startsWith("_") && name !== "README.md").length;
const experimentFiles = fs.readdirSync("data/experiments").filter((name) => name.endsWith(".md") && !name.startsWith("_") && name !== "README.md").length;
assert(stats.realInterviews <= interviewFiles, `realInterviews=${stats.realInterviews}, но interview-артефактов только ${interviewFiles}`);
assert(stats.actionTests <= experimentFiles, `actionTests=${stats.actionTests}, но experiment-артефактов только ${experimentFiles}`);
assert(stats.payments <= stats.actionTests, "payments не может быть больше actionTests");
assert(stats.repeatSignals <= stats.payments, "repeatSignals не может быть больше payments");

assert(Array.isArray(state.runs) && state.runs.length > 0, "runs должен содержать минимум один прогон");
for (const run of state.runs) {
  for (const key of ["id", "title", "status", "statusLabel", "result", "updatedAt"]) {
    assert(typeof run[key] === "string" && run[key].trim(), `run.${key} обязателен`);
  }
  assert(/^E[0-5]$/.test(run.evidenceLevel), `${run.id}: evidenceLevel должен быть E0–E5`);
  sourceExists(run.source, run.id);
}

console.log(`factory state ok: ${stats.marketplaceLeads} leads, ${stats.candidates} candidates, ${stats.finalists} finalists`);
