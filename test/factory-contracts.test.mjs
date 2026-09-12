import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildPublicArtifact, validatePublicArtifact } from "../scripts/build-public-dashboard.mjs";
import { validateActiveRunRecord, validateConsistency, validateFactoryState, validateRegistry } from "../scripts/factory-validation.mjs";
import { factoryFixtures, ideaById } from "../fixtures/factory-fixtures.mjs";

test("parked → active проходит без изменения validator", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.status = "active";
  fixture.activeRun.checkpointGateStatus = "in_progress";
  fixture.activeRun.completedCheckpoints = fixture.activeRun.completedCheckpoints
    .filter((checkpointId) => checkpointId !== fixture.activeRun.checkpointId);
  fixture.activeRun.markdown = fixture.activeRun.markdown
    .replace("## Точка возобновления (не текущая работа)", "## Единственная текущая работа")
    .replace("## Gate возобновлённого этапа", "## Gate этапа");
  assert.doesNotThrow(() => validateActiveRunRecord(fixture.activeRun, fixture));
  fixture.registry.runs.find((run) => run.id === fixture.activeRun.registryRunId).status = "active";
  assert.doesNotThrow(() => validateConsistency({
    schema: fixture.schema,
    activeRun: fixture.activeRun,
    registry: fixture.registry,
    factoryState: fixture.factoryState
  }));
});

test("неизвестный checkpoint падает", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.checkpointId = "S_UNKNOWN";
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /неизвестный Checkpoint ID/);
});

test("несовпадающая macro phase падает", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.macroPhase = "I · INSIGHT";
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /Macro phase/);
});

test("несовпадающее название checkpoint падает", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.currentStepName = "Другое имя";
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /Current step name/);
});

test("переход вне allowedNext падает", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.checkpointId = "S0_CONTEXT";
  fixture.activeRun.macroPhase = "S · SCAN";
  fixture.activeRun.currentStep = 0;
  fixture.activeRun.currentStepName = "Контекст и стартовая позиция";
  fixture.activeRun.completedCheckpoints = [];
  fixture.activeRun.previousCheckpoint = "S3_LOCALIZE";
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /переход S3_LOCALIZE → S0_CONTEXT не разрешён/);
});

test("checkpoint без обязательного prerequisite падает", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.checkpointId = "S4_OWNER";
  fixture.activeRun.currentStep = 4;
  fixture.activeRun.currentStepName = "Owner checkpoint — выбор одного финалиста P1/P2";
  fixture.activeRun.previousCheckpoint = "S5_COMPETITORS";
  fixture.activeRun.completedCheckpoints = ["S0_CONTEXT", "S1_MARKET", "S2_TREND", "S3_LOCALIZE"];
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /не выполнен prerequisite S5_COMPETITORS/);
});

test("E1 confidence 0.56 превышает cap", () => {
  const fixture = factoryFixtures();
  ideaById(fixture.registry, "kadra").evidenceConfidence = 0.56;
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /превышает cap 0.55/);
});

test("E3 confidence 0.81 превышает cap", () => {
  const fixture = factoryFixtures();
  const idea = ideaById(fixture.registry, "radarych");
  idea.runIds = ["psychologists-sigma-2026-09-09"];
  idea.evidenceLevel = "E3";
  idea.stage = "action_test";
  idea.gateStatus = "in_progress";
  idea.evidenceConfidence = 0.81;
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /превышает cap 0.8/);
});

test("legacy-код не открывает CustDev или action gate", () => {
  const fixture = factoryFixtures();
  const idea = ideaById(fixture.registry, "radarych");
  idea.runIds = ["portfolio-v07-2026-07-20"];
  idea.evidenceLevel = "E3";
  idea.stage = "action_test";
  idea.gateStatus = "in_progress";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /legacy-only ставка не может иметь evidence выше E1/);
});

test("paid без E4 падает", () => {
  const fixture = factoryFixtures();
  const idea = ideaById(fixture.registry, "radarych");
  idea.stage = "paid";
  idea.evidenceLevel = "E3";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /stage paid несовместим с E3/);
});

test("repeat/passed без E5 падает", () => {
  const fixture = factoryFixtures();
  const idea = ideaById(fixture.registry, "radarych");
  idea.stage = "repeat";
  idea.gateStatus = "passed";
  idea.evidenceLevel = "E4";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /repeat\/passed требует E5/);
});

test("незавершённый owner checkpoint не может иметь passed", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.checkpointId = "S4_OWNER";
  fixture.activeRun.currentStep = 4;
  fixture.activeRun.currentStepName = "Owner checkpoint — выбор одного финалиста P1/P2";
  fixture.activeRun.previousCheckpoint = "S5_COMPETITORS";
  fixture.activeRun.completedCheckpoints = ["S0_CONTEXT", "S1_MARKET", "S2_TREND", "S3_LOCALIZE", "S5_COMPETITORS"];
  fixture.activeRun.checkpointGateStatus = "passed";
  fixture.activeRun.completedCheckpoints.push("S4_OWNER");
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /passed требует ровно один выбранный фокус/);
});

test("активный S0 не допускает кандидата выше quick_scan", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.checkpointId = "S0_CONTEXT";
  fixture.activeRun.macroPhase = "S · SCAN";
  fixture.activeRun.currentStep = 0;
  fixture.activeRun.currentStepName = "Контекст и стартовая позиция";
  fixture.activeRun.previousCheckpoint = "—";
  fixture.activeRun.completedCheckpoints = [];
  fixture.activeRun.status = "active";
  fixture.activeRun.checkpointGateStatus = "in_progress";
  fixture.registry.runs.find((run) => run.id === fixture.activeRun.registryRunId).status = "active";
  const idea = ideaById(fixture.registry, "kadra");
  idea.stage = "market_research";
  idea.gateStatus = "in_progress";
  assert.throws(() => validateConsistency({
    schema: fixture.schema,
    activeRun: fixture.activeRun,
    registry: fixture.registry,
    factoryState: fixture.factoryState
  }), /не может опережать checkpoint S0_CONTEXT/);
});

test("factory state не содержит дублирующий activeDomainRun", () => {
  const fixture = factoryFixtures();
  fixture.factoryState.activeDomainRun = { status: "parked" };
  assert.throws(() => validateFactoryState(fixture.factoryState, { ...fixture, checkSources: false }), /activeDomainRun/);
});

test("public artifact ограничен allowlist и не содержит source-полей", () => {
  const fixture = factoryFixtures();
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "niche-factory-public-"));
  try {
    buildPublicArtifact({ rootDir: fixture.rootDir, outputDir });
    assert.doesNotThrow(() => validatePublicArtifact(outputDir, fixture.schema));
    for (const forbidden of fixture.schema.publicArtifact.forbiddenPrefixes) {
      assert.equal(fs.existsSync(path.join(outputDir, forbidden)), false, forbidden);
    }
    const publicRegistry = JSON.parse(fs.readFileSync(path.join(outputDir, "data/IDEA_REGISTRY.json"), "utf8"));
    assert.equal(publicRegistry.ideas.some((idea) => Object.hasOwn(idea, "source")), false);
    assert.equal(publicRegistry.runs.some((run) => Object.hasOwn(run, "source")), false);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});
