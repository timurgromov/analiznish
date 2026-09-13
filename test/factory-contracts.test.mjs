import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildPublicArtifact, validatePublicArtifact } from "../scripts/build-public-dashboard.mjs";
import { validateActiveRunRecord, validateConsistency, validateFactoryState, validateRegistry, validateSchema } from "../scripts/factory-validation.mjs";
import { factoryFixtures, ideaById } from "../fixtures/factory-fixtures.mjs";

function makeActiveRunSingleThesis(fixture, thesis = "Один подтверждённый тезис") {
  fixture.activeRun.candidateIds = [fixture.activeRun.candidateIds[0]];
  fixture.activeRun.researchUnit = "single_thesis";
  fixture.activeRun.thesisId = fixture.activeRun.candidateIds[0];
  fixture.activeRun.scopeLock = "owner decision";
  fixture.activeRun.canonicalThesis = thesis;
  fixture.activeRun.thesisConfirmation = "owner_confirmed";
  fixture.activeRun.definitionSource = "owner message";
  fixture.activeRun.prohibitedReframes = "не дробить продукт";
  ideaById(fixture.registry, fixture.activeRun.candidateIds[0]).canonicalThesis = thesis;
}

test("parked → active проходит без изменения validator", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.status = "active";
  fixture.activeRun.checkpointGateStatus = "in_progress";
  fixture.activeRun.completedCheckpoints = fixture.activeRun.completedCheckpoints
    .filter((checkpointId) => checkpointId !== fixture.activeRun.checkpointId);
  fixture.activeRun.markdown = fixture.activeRun.markdown
    .replace("## Точка возобновления (не текущая работа)", "## Единственная текущая работа")
    .replace("## Gate возобновлённого этапа", "## Gate этапа")
    .replace("## Итог закрытого run", "## Единственная текущая работа")
    .replace("## Условие возвращения", "## Gate этапа");
  assert.doesNotThrow(() => validateActiveRunRecord(fixture.activeRun, fixture));
  fixture.registry.runs.find((run) => run.id === fixture.activeRun.registryRunId).status = "active";
  assert.doesNotThrow(() => validateConsistency({
    schema: fixture.schema,
    activeRun: fixture.activeRun,
    registry: fixture.registry,
    factoryState: fixture.factoryState
  }));
});

test("single_thesis не допускает разветвления на несколько candidate IDs", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.researchUnit = "single_thesis";
  fixture.activeRun.thesisId = fixture.activeRun.candidateIds[0];
  fixture.activeRun.scopeLock = "owner decision";
  fixture.activeRun.candidateIds.push("invented-variant");
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /single_thesis допускает ровно один Candidate ID/);
});

test("schema явно различает Portfolio Gate и Single-thesis Gate", () => {
  const fixture = factoryFixtures();
  assert.match(fixture.schema.researchUnitRule.singleThesisGate, /Single-thesis/);
  assert.match(fixture.schema.researchUnitRule.portfolioBatchGate, /Portfolio Gate/);
});

test("single_thesis без подтверждённого канонического тезиса падает", () => {
  const fixture = factoryFixtures();
  makeActiveRunSingleThesis(fixture);
  fixture.activeRun.canonicalThesis = "";
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /требует Canonical thesis/);
});

test("канонический тезис ACTIVE_RUN должен совпадать с реестром", () => {
  const fixture = factoryFixtures();
  makeActiveRunSingleThesis(fixture);
  ideaById(fixture.registry, fixture.activeRun.candidateIds[0]).canonicalThesis = "Подменённый продукт";
  assert.throws(() => validateConsistency({
    schema: fixture.schema,
    activeRun: fixture.activeRun,
    registry: fixture.registry,
    factoryState: fixture.factoryState
  }), /Canonical thesis кандидата/);
});

test("readiness gap не может стать blockerCode", () => {
  const fixture = factoryFixtures();
  fixture.schema.blockerCodes.push("existing_channel");
  assert.throws(() => validateSchema(fixture.schema), /readiness-признак existing_channel не может быть blockerCode/);
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
  fixture.activeRun.currentStepName = "Owner checkpoint — выбор одного финалиста";
  fixture.activeRun.previousCheckpoint = "S5_COMPETITORS";
  fixture.activeRun.completedCheckpoints = ["S0_CONTEXT", "S1_MARKET", "S2_TREND", "S3_LOCALIZE"];
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /не выполнен prerequisite S4_PORTFOLIO_GATE/);
});

test("S3 не может перепрыгнуть ранний Portfolio Gate", () => {
  const fixture = factoryFixtures();
  fixture.activeRun.checkpointId = "S5_COMPETITORS";
  fixture.activeRun.currentStep = 5;
  fixture.activeRun.currentStepName = "Конкуренты и конкурентная рамка финалистов";
  fixture.activeRun.previousCheckpoint = "S3_LOCALIZE";
  fixture.activeRun.completedCheckpoints = ["S0_CONTEXT", "S1_MARKET", "S2_TREND", "S3_LOCALIZE"];
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /не выполнен prerequisite S4_PORTFOLIO_GATE/);
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
  fixture.activeRun.currentStepName = "Owner checkpoint — выбор одного финалиста";
  fixture.activeRun.previousCheckpoint = "S5_COMPETITORS";
  fixture.activeRun.completedCheckpoints = ["S0_CONTEXT", "S1_MARKET", "S2_TREND", "S3_LOCALIZE", "S4_PORTFOLIO_GATE", "S5_COMPETITORS"];
  fixture.activeRun.checkpointGateStatus = "passed";
  fixture.activeRun.completedCheckpoints.push("S4_OWNER");
  assert.throws(() => validateActiveRunRecord(fixture.activeRun, fixture), /passed требует ровно один выбранный фокус/);
});

test("конкуренция не может быть failed-критерием", () => {
  const fixture = factoryFixtures();
  fixture.registry.decisionAudits.radarych.criteria.find((criterion) => criterion.id === "competition").result = "failed";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /конкуренция не может быть failed-критерием/);
});

test("failed без blockerCode падает", () => {
  const fixture = factoryFixtures();
  const idea = ideaById(fixture.registry, "radarych");
  idea.gateStatus = "failed";
  fixture.registry.decisionAudits.radarych.decisionClass = "hard_blocked";
  fixture.registry.decisionAudits.radarych.criteria[0].result = "failed";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /gateStatus failed требует blockerCode/);
});

test("нехватка evidence не может маскироваться под failed", () => {
  const fixture = factoryFixtures();
  const idea = ideaById(fixture.registry, "cycle-assistant");
  idea.gateStatus = "failed";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /gateStatus failed требует blockerCode/);
});

test("concrete bet не получает passed_not_selected без owner decision", () => {
  const fixture = factoryFixtures();
  const idea = ideaById(fixture.registry, "rule24");
  idea.gateStatus = "passed_not_selected";
  fixture.registry.decisionAudits.rule24.decisionClass = "passed_not_selected";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /passed_not_selected требует явного ownerDecision/);
});

test("portfolio round классифицирует каждый объект ровно один раз", () => {
  const fixture = factoryFixtures();
  fixture.registry.portfolioRound.stateGroups.out_of_current_competition.pop();
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /классифицировать каждый объект ровно один раз/);
});

test("portfolio round запрещает двойное участие объекта", () => {
  const fixture = factoryFixtures();
  fixture.registry.portfolioRound.stateGroups.queued_research.push("kadra");
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /одновременно находится/);
});

test("provisional finalist обязан ждать owner gate", () => {
  const fixture = factoryFixtures();
  const finalistId = fixture.registry.portfolioRound.stateGroups.provisional_finalist[0];
  fixture.registry.decisionAudits[finalistId].currentCheckpointId = "S5_COMPETITORS";
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /должен ждать S4_OWNER/);
});

test("Global Portfolio Gate оставляет не больше трёх финалистов", () => {
  const fixture = factoryFixtures();
  fixture.registry.portfolioRound.status = "ready_for_owner_choice";
  fixture.registry.portfolioRound.globalGateStatus = "ready";
  fixture.registry.portfolioRound.currentResearchIds = [];
  fixture.registry.portfolioRound.stateGroups.out_of_current_competition.push(
    ...fixture.registry.portfolioRound.stateGroups.active_research,
    ...fixture.registry.portfolioRound.stateGroups.queued_research
  );
  fixture.registry.portfolioRound.stateGroups.active_research = [];
  fixture.registry.portfolioRound.stateGroups.queued_research = [];
  fixture.registry.portfolioRound.stateGroups.out_of_current_competition =
    fixture.registry.portfolioRound.stateGroups.out_of_current_competition.filter((id) => id !== "kadra");
  fixture.registry.portfolioRound.stateGroups.provisional_finalist.push("kadra");
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /Global Portfolio Gate должен оставить 1–3/);
});

test("один active run допускает bounded batch до десяти ставок", () => {
  const fixture = factoryFixtures();
  const batch = fixture.registry.portfolioRound.stateGroups.out_of_current_competition.slice(0, 7);
  fixture.registry.portfolioRound.status = "researching";
  fixture.registry.portfolioRound.globalGateStatus = "not_ready";
  fixture.registry.portfolioRound.currentResearchIds = batch;
  fixture.registry.portfolioRound.stateGroups.active_research = batch;
  fixture.registry.portfolioRound.stateGroups.out_of_current_competition =
    fixture.registry.portfolioRound.stateGroups.out_of_current_competition.filter((id) => !batch.includes(id));
  assert.doesNotThrow(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }));
});

test("active research batch больше десяти ставок падает", () => {
  const fixture = factoryFixtures();
  const batch = fixture.registry.portfolioRound.stateGroups.out_of_current_competition.slice(0, 11);
  fixture.registry.portfolioRound.status = "researching";
  fixture.registry.portfolioRound.globalGateStatus = "not_ready";
  fixture.registry.portfolioRound.currentResearchIds = batch;
  fixture.registry.portfolioRound.stateGroups.active_research = batch;
  fixture.registry.portfolioRound.stateGroups.out_of_current_competition =
    fixture.registry.portfolioRound.stateGroups.out_of_current_competition.filter((id) => !batch.includes(id));
  assert.throws(() => validateRegistry(fixture.registry, { ...fixture, checkSources: false }), /active research batch превышает 10/);
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
  const idea = ideaById(fixture.registry, fixture.activeRun.candidateIds[0]);
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
    assert.equal(fs.existsSync(path.join(outputDir, "data/FACTORY_SCHEMA.json")), true);
    assert.equal(publicRegistry.ideas.some((idea) => Object.hasOwn(idea, "source")), false);
    assert.equal(publicRegistry.runs.some((run) => Object.hasOwn(run, "source")), false);
    const publicSchema = JSON.parse(fs.readFileSync(path.join(outputDir, "data/FACTORY_SCHEMA.json"), "utf8"));
    const publicFactoryState = JSON.parse(fs.readFileSync(path.join(outputDir, "data/FACTORY_STATE.json"), "utf8"));
    assert.equal(Object.hasOwn(publicSchema, "publicArtifact"), false);
    assert.equal(Object.hasOwn(publicFactoryState.systemStatus, "source"), false);
  } finally {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
});
