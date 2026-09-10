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

assert(state.schemaVersion === 2, "поддерживается только schemaVersion 2");
assert(/^\d{4}-\d{2}-\d{2}$/.test(state.updatedAt), "updatedAt должен быть YYYY-MM-DD");
sourceExists(state.registrySource, "registrySource");
assert(state.dashboard?.defaultView === "all-ideas", "dashboard.defaultView должен быть all-ideas");
assert(state.dashboard?.readOnly === true, "dashboard должен оставаться read-only");

for (const key of ["status", "statusLabel", "summary", "confirmed", "unknown", "nextGate"]) {
  assert(typeof state.systemStatus?.[key] === "string" && state.systemStatus[key].trim(), `systemStatus.${key} обязателен`);
}
sourceExists(state.systemStatus.source, "systemStatus");

assert(state.activeDomainRun?.status === "parked", "доменный run должен оставаться parked");
for (const key of ["id", "category", "statusLabel", "resumePoint"]) {
  assert(typeof state.activeDomainRun[key] === "string" && state.activeDomainRun[key].trim(), `activeDomainRun.${key} обязателен`);
}
sourceExists(state.activeDomainRun.source, "activeDomainRun");

console.log(`factory state v2 ok: default=${state.dashboard.defaultView}, domain run=${state.activeDomainRun.status}`);
