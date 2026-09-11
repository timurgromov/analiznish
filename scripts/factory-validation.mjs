import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const moduleDir = path.dirname(fileURLToPath(import.meta.url));
export const defaultRoot = path.resolve(moduleDir, "..");

export function invariant(condition, message, label = "factory") {
  if (!condition) throw new Error(`${label}: ${message}`);
}

export function readJson(rootDir, relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function normalizeInline(value) {
  return String(value).trim().replace(/^([\`])|([\`])$/g, "");
}

function fieldFromMarkdown(markdown, name, label) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`^${escaped}:\\s*(.+)$`, "m"));
  invariant(match, `отсутствует поле «${name}»`, label);
  return normalizeInline(match[1]);
}

function parseList(value) {
  if (!value || ["—", "-", "none", "null"].includes(value.toLowerCase())) return [];
  return value.split(",").map((item) => normalizeInline(item)).filter(Boolean);
}

function safeProjectPath(rootDir, source, label) {
  invariant(typeof source === "string" && source.trim(), "пустой source", label);
  invariant(!path.isAbsolute(source), `source должен быть относительным путём проекта: ${source}`, label);
  const resolved = path.resolve(rootDir, source);
  invariant(resolved === rootDir || resolved.startsWith(`${rootDir}${path.sep}`), `source выходит за границу проекта: ${source}`, label);
  invariant(fs.existsSync(resolved), `source не существует: ${source}`, label);
  return resolved;
}

function ids(items, label) {
  const result = new Map();
  for (const item of items ?? []) {
    invariant(item && typeof item.id === "string" && item.id, "элемент без id", label);
    invariant(!result.has(item.id), `дублируется id: ${item.id}`, label);
    result.set(item.id, item);
  }
  return result;
}

function evidenceRank(level) {
  return Number(String(level).slice(1));
}

export function validateSchema(schema) {
  const label = "data/FACTORY_SCHEMA.json";
  invariant(schema.schemaVersion === 1, "поддерживается только schemaVersion 1", label);
  for (const key of ["runSchemaVersion", "registrySchemaVersion", "factoryStateSchemaVersion"]) {
    invariant(Number.isInteger(schema[key]), `${key} должен быть целым`, label);
  }

  const stages = ids(schema.stages, label);
  invariant(stages.size === 8, "контракт должен содержать ровно 8 стадий объекта", label);
  const expectedStages = ["inbox", "quick_scan", "market_research", "finalist", "interviews", "action_test", "paid", "repeat"];
  invariant(JSON.stringify([...stages.keys()]) === JSON.stringify(expectedStages), "порядок восьми стадий неканонический", label);

  const gateStatuses = ids(schema.gateStatuses, label);
  invariant(gateStatuses.has("parked") && gateStatuses.has("failed"), "parked/failed должны быть исходами gate", label);
  invariant(!stages.has("parked") && !stages.has("failed"), "parked/failed не могут быть стадиями", label);

  const objectTypes = new Set(schema.objectTypes);
  invariant(objectTypes.size === 4, "ожидаются четыре object type", label);
  const caps = schema.evidenceCaps;
  for (const level of ["E0", "E1", "E2", "E3", "E4", "E5"]) {
    invariant(Number.isFinite(caps[level]), `нет evidence cap для ${level}`, label);
  }

  const phases = new Set((schema.macroPhases ?? []).map((phase) => phase.label));
  const checkpoints = ids(schema.checkpoints, label);
  for (const checkpoint of checkpoints.values()) {
    invariant(phases.has(checkpoint.macroPhase), `${checkpoint.id}: неизвестная macro phase`, label);
    invariant(stages.has(checkpoint.dashboardStage), `${checkpoint.id}: неизвестная dashboard stage`, label);
    invariant(Number.isInteger(checkpoint.step), `${checkpoint.id}: step должен быть целым`, label);
    invariant(typeof checkpoint.name === "string" && checkpoint.name.trim(), `${checkpoint.id}: name обязателен`, label);
  }
  for (const checkpoint of checkpoints.values()) {
    for (const prerequisite of checkpoint.prerequisites ?? []) {
      invariant(checkpoints.has(prerequisite), `${checkpoint.id}: неизвестный prerequisite ${prerequisite}`, label);
    }
    for (const next of checkpoint.allowedNext ?? []) {
      invariant(checkpoints.has(next), `${checkpoint.id}: неизвестный allowedNext ${next}`, label);
    }
  }

  for (const gateId of ["interview_ready", "offer_ready", "build_ready", "scale_ready"]) {
    const gate = schema.readinessGates?.[gateId];
    invariant(gate, `нет readiness gate ${gateId}`, label);
    for (const checkpoint of gate.requiredCheckpoints ?? []) {
      invariant(checkpoints.has(checkpoint), `${gateId}: неизвестный checkpoint ${checkpoint}`, label);
    }
    invariant(Object.hasOwn(caps, gate.requiredEvidence), `${gateId}: неизвестный evidence ${gate.requiredEvidence}`, label);
  }
  return schema;
}

export function loadSchema(rootDir = defaultRoot) {
  return validateSchema(readJson(rootDir, "data/FACTORY_SCHEMA.json"));
}

export function parseActiveRun(markdown, label = "data/ACTIVE_RUN.md") {
  const required = [
    "Schema version",
    "Run ID",
    "Registry run ID",
    "Mode",
    "Status",
    "Direction",
    "Checkpoint ID",
    "Checkpoint gate status",
    "Macro phase",
    "Current step",
    "Current step name",
    "Previous checkpoint",
    "Completed checkpoints",
    "Candidate IDs",
    "Selected focus IDs",
    "Strongest evidence",
    "Source board",
    "Last updated"
  ];
  const values = Object.fromEntries(required.map((name) => [name, fieldFromMarkdown(markdown, name, label)]));
  return {
    schemaVersion: Number(values["Schema version"]),
    runId: values["Run ID"],
    registryRunId: values["Registry run ID"],
    mode: values.Mode,
    status: values.Status,
    direction: values.Direction,
    checkpointId: values["Checkpoint ID"],
    checkpointGateStatus: values["Checkpoint gate status"],
    macroPhase: values["Macro phase"],
    currentStep: Number(values["Current step"]),
    currentStepName: values["Current step name"],
    previousCheckpoint: values["Previous checkpoint"],
    completedCheckpoints: parseList(values["Completed checkpoints"]),
    candidateIds: parseList(values["Candidate IDs"]),
    selectedFocusIds: parseList(values["Selected focus IDs"]),
    strongestEvidence: values["Strongest evidence"],
    sourceBoard: values["Source board"],
    lastUpdated: values["Last updated"],
    markdown
  };
}

export function validateActiveRunRecord(run, { schema, boardText, rootDir = defaultRoot } = {}) {
  validateSchema(schema);
  const label = "data/ACTIVE_RUN.md";
  invariant(run.schemaVersion === schema.runSchemaVersion, `поддерживается schema version ${schema.runSchemaVersion}`, label);
  invariant(schema.runStatuses.includes(run.status), `недопустимый Status «${run.status}»`, label);
  invariant(run.mode === "niche_factory", "Mode должен быть niche_factory", label);
  invariant(/^E[0-5]$/.test(run.strongestEvidence), "Strongest evidence должен быть E0–E5", label);
  invariant(/^\d{4}-\d{2}-\d{2}$/.test(run.lastUpdated), "Last updated должен быть YYYY-MM-DD", label);
  invariant(/^[a-z0-9-]+$/.test(run.runId), "некорректный Run ID", label);
  invariant(/^[a-z0-9-]+$/.test(run.registryRunId), "некорректный Registry run ID", label);

  const checkpoints = ids(schema.checkpoints, "data/FACTORY_SCHEMA.json");
  const checkpoint = checkpoints.get(run.checkpointId);
  invariant(checkpoint, `неизвестный Checkpoint ID «${run.checkpointId}»`, label);
  invariant(run.macroPhase === checkpoint.macroPhase, `Macro phase «${run.macroPhase}» не соответствует ${run.checkpointId}`, label);
  invariant(run.currentStep === checkpoint.step, `Current step ${run.currentStep} не соответствует ${run.checkpointId}`, label);
  invariant(run.currentStepName === checkpoint.name, `Current step name не соответствует ${run.checkpointId}`, label);

  const completed = new Set(run.completedCheckpoints);
  invariant(completed.size === run.completedCheckpoints.length, "Completed checkpoints содержит дубликаты", label);
  for (const checkpointId of completed) invariant(checkpoints.has(checkpointId), `неизвестный completed checkpoint ${checkpointId}`, label);
  for (const prerequisite of checkpoint.prerequisites ?? []) {
    invariant(completed.has(prerequisite), `${run.checkpointId}: не выполнен prerequisite ${prerequisite}`, label);
  }
  for (const checkpointId of completed) {
    const completedCheckpoint = checkpoints.get(checkpointId);
    for (const prerequisite of completedCheckpoint.prerequisites ?? []) {
      invariant(completed.has(prerequisite), `${checkpointId}: не выполнен prerequisite ${prerequisite}`, label);
    }
  }

  if (["—", "-", "none"].includes(run.previousCheckpoint.toLowerCase())) {
    invariant(run.checkpointId === schema.checkpoints[0].id, "previous checkpoint обязателен не для первого checkpoint", label);
  } else {
    const previous = checkpoints.get(run.previousCheckpoint);
    invariant(previous, `неизвестный Previous checkpoint «${run.previousCheckpoint}»`, label);
    invariant(previous.allowedNext.includes(run.checkpointId), `переход ${run.previousCheckpoint} → ${run.checkpointId} не разрешён`, label);
    invariant(completed.has(run.previousCheckpoint), `Previous checkpoint ${run.previousCheckpoint} не завершён`, label);
  }

  const gateStatuses = new Set(schema.gateStatuses.map((status) => status.id));
  invariant(gateStatuses.has(run.checkpointGateStatus), `неизвестный Checkpoint gate status «${run.checkpointGateStatus}»`, label);
  if (run.checkpointGateStatus === "passed") {
    invariant(completed.has(run.checkpointId), "checkpoint с passed должен быть в Completed checkpoints", label);
  } else {
    invariant(!completed.has(run.checkpointId), "незавершённый checkpoint не должен быть в Completed checkpoints", label);
  }

  invariant(new Set(run.candidateIds).size === run.candidateIds.length, "Candidate IDs содержит дубликаты", label);
  invariant(new Set(run.selectedFocusIds).size === run.selectedFocusIds.length, "Selected focus IDs содержит дубликаты", label);
  invariant(run.selectedFocusIds.length <= 1, "в run допускается максимум один выбранный фокус", label);
  for (const selected of run.selectedFocusIds) invariant(run.candidateIds.includes(selected), `выбранный focus ${selected} отсутствует в Candidate IDs`, label);
  if (run.checkpointId === "S4_OWNER" && run.checkpointGateStatus !== "passed") {
    invariant(run.selectedFocusIds.length === 0, "незавершённый owner checkpoint не может иметь выбранный фокус", label);
  }
  if (run.checkpointId === "S4_OWNER" && run.checkpointGateStatus === "passed") {
    invariant(run.selectedFocusIds.length === 1, "owner checkpoint с passed требует ровно один выбранный фокус", label);
  }
  const postOwner = new Set(["I_E1", "I_E2", "I_E3", "I_E4", "G_SCOPE", "M_BUILD", "A_E5"]);
  if (postOwner.has(run.checkpointId)) {
    invariant(run.selectedFocusIds.length === 1, `${run.checkpointId}: должен быть выбран ровно один фокус`, label);
    invariant(completed.has("S4_OWNER"), `${run.checkpointId}: owner checkpoint не пройден`, label);
  }

  if (boardText === undefined) {
    const boardPath = safeProjectPath(rootDir, run.sourceBoard, label);
    boardText = fs.readFileSync(boardPath, "utf8");
  }
  const escapedName = checkpoint.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  invariant(new RegExp(`^\\|\\s*${checkpoint.step}\\.\\s*${escapedName}\\s*\\|`, "m").test(boardText), `Source board не содержит точную строку checkpoint ${checkpoint.id}`, label);

  const markdown = run.markdown ?? "";
  if (run.status === "active") {
    for (const heading of ["## Единственная текущая работа", "## Gate этапа", "## Запрещённый переход"]) {
      invariant(markdown.includes(heading), `отсутствует раздел «${heading}»`, label);
    }
  }
  if (run.status === "parked") {
    for (const heading of ["## Точка возобновления (не текущая работа)", "## Gate возобновлённого этапа", "## Запрещённый переход"]) {
      invariant(markdown.includes(heading), `для parked run отсутствует раздел «${heading}»`, label);
    }
  }
  return run;
}

export function validateActiveRun({ rootDir = defaultRoot, schema = loadSchema(rootDir), markdown } = {}) {
  const activeRunPath = path.join(rootDir, "data/ACTIVE_RUN.md");
  const text = markdown ?? fs.readFileSync(activeRunPath, "utf8");
  const run = parseActiveRun(text);
  return validateActiveRunRecord(run, { schema, rootDir });
}

export function validateRegistry(registry, { schema, rootDir = defaultRoot, checkSources = true } = {}) {
  validateSchema(schema);
  const label = "data/IDEA_REGISTRY.json";
  invariant(registry.schemaVersion === schema.registrySchemaVersion, `поддерживается только schemaVersion ${schema.registrySchemaVersion}`, label);
  invariant(/^\d{4}-\d{2}-\d{2}$/.test(registry.updatedAt), "updatedAt должен быть YYYY-MM-DD", label);
  invariant(registry.rankingModel?.neutralPrior === 50, "neutralPrior должен быть 50", label);
  invariant(registry.rankingModel?.formula === "round(50 + (baseScore - 50) * evidenceConfidence)", "неожиданная ranking formula", label);
  invariant(JSON.stringify(registry.stages) === JSON.stringify(schema.stages), "stages должны точно соответствовать FACTORY_SCHEMA", label);
  invariant(JSON.stringify(registry.gateStatuses) === JSON.stringify(schema.gateStatuses), "gateStatuses должны точно соответствовать FACTORY_SCHEMA", label);

  const stageMap = ids(schema.stages, "data/FACTORY_SCHEMA.json");
  const gateStatuses = new Set(schema.gateStatuses.map((status) => status.id));
  const objectTypes = new Set(schema.objectTypes);
  const runIds = new Set();
  for (const run of registry.runs ?? []) {
    invariant(/^[a-z0-9-]+$/.test(run.id), `некорректный run id: ${run.id}`, label);
    invariant(!runIds.has(run.id), `дублируется run id: ${run.id}`, label);
    runIds.add(run.id);
    for (const key of ["title", "category", "status", "result", "evidenceLevel", "updatedAt", "source"]) {
      invariant(typeof run[key] === "string" && run[key].trim(), `${run.id}.${key} обязателен`, label);
    }
    invariant(schema.runStatuses.includes(run.status), `${run.id}: неизвестный status ${run.status}`, label);
    if (checkSources) safeProjectPath(rootDir, run.source, `${label}:${run.id}`);
  }

  const ideaIds = new Set();
  const aliases = new Set();
  const cardSources = new Set();
  for (const idea of registry.ideas ?? []) {
    invariant(/^[a-z0-9-]+$/.test(idea.id), `некорректный idea id: ${idea.id}`, label);
    invariant(!ideaIds.has(idea.id), `дублируется idea id: ${idea.id}`, label);
    ideaIds.add(idea.id);
    for (const key of ["title", "projectSummary", "customer", "customerOutcome", "moneyModel", "category", "objectType", "scoreBasis", "evidenceLevel", "rankingReason", "mainRisk", "nextGate", "source"]) {
      invariant(typeof idea[key] === "string" && idea[key].trim(), `${idea.id}.${key} обязателен`, label);
    }
    invariant(objectTypes.has(idea.objectType), `${idea.id}: неизвестный objectType ${idea.objectType}`, label);
    invariant(Number.isFinite(idea.baseScore) && idea.baseScore >= 0 && idea.baseScore <= 100, `${idea.id}.baseScore должен быть 0–100`, label);
    invariant(/^E[0-5]$/.test(idea.evidenceLevel), `${idea.id}.evidenceLevel должен быть E0–E5`, label);
    invariant(Number.isFinite(idea.evidenceConfidence) && idea.evidenceConfidence >= 0 && idea.evidenceConfidence <= 1, `${idea.id}.evidenceConfidence должен быть 0–1`, label);
    invariant(idea.evidenceConfidence <= schema.evidenceCaps[idea.evidenceLevel] + Number.EPSILON, `${idea.id}.evidenceConfidence ${idea.evidenceConfidence} превышает cap ${schema.evidenceCaps[idea.evidenceLevel]} для ${idea.evidenceLevel}`, label);
    if (Object.hasOwn(idea, "legacyEvidenceConfidence")) {
      invariant(Number.isFinite(idea.legacyEvidenceConfidence) && idea.legacyEvidenceConfidence >= 0 && idea.legacyEvidenceConfidence <= 1, `${idea.id}.legacyEvidenceConfidence должен быть 0–1`, label);
      invariant(idea.legacyEvidenceConfidence >= idea.evidenceConfidence, `${idea.id}.legacyEvidenceConfidence не может быть ниже активного confidence`, label);
    }
    invariant(stageMap.has(idea.stage), `${idea.id}: неизвестный stage ${idea.stage}`, label);
    invariant(gateStatuses.has(idea.gateStatus), `${idea.id}: неизвестный gateStatus ${idea.gateStatus}`, label);
    const evidenceRule = schema.stageEvidence[idea.stage];
    invariant(evidenceRule.allowed.includes(idea.evidenceLevel), `${idea.id}: stage ${idea.stage} несовместим с ${idea.evidenceLevel}`, label);
    if (idea.gateStatus === "passed" && evidenceRule.passedRequires) {
      invariant(evidenceRank(idea.evidenceLevel) >= evidenceRank(evidenceRule.passedRequires), `${idea.id}: ${idea.stage}/passed требует ${evidenceRule.passedRequires}`, label);
    }
    if (checkSources) safeProjectPath(rootDir, idea.source, `${label}:${idea.id}`);
    if (idea.source.startsWith("data/niches/") && !idea.source.endsWith("INDEX.md") && !idea.source.endsWith("README.md")) {
      cardSources.add(idea.source);
    }
    invariant(Array.isArray(idea.runIds), `${idea.id}.runIds должен быть массивом`, label);
    invariant(new Set(idea.runIds).size === idea.runIds.length, `${idea.id}.runIds содержит дубликаты`, label);
    for (const runId of idea.runIds) invariant(runIds.has(runId), `${idea.id}: неизвестный runId ${runId}`, label);
    for (const alias of idea.aliases ?? []) {
      invariant(!aliases.has(alias), `дублируется alias: ${alias}`, label);
      aliases.add(alias);
    }
  }

  if (checkSources) {
    const nicheCards = fs.readdirSync(path.join(rootDir, "data/niches"))
      .filter((name) => name.endsWith(".md") && !["INDEX.md", "README.md"].includes(name))
      .map((name) => path.posix.join("data/niches", name));
    for (const card of nicheCards) invariant(cardSources.has(card), `карточка отсутствует в едином реестре: ${card}`, label);
  }
  invariant(registry.ideas.length >= 10, "единый реестр не должен содержать только один domain batch", label);
  invariant(new Set(registry.ideas.map((idea) => idea.category)).size >= 5, "реестр должен покрывать несколько категорий", label);
  return registry;
}

export function validateFactoryState(state, { schema, rootDir = defaultRoot, checkSources = true } = {}) {
  validateSchema(schema);
  const label = "data/FACTORY_STATE.json";
  invariant(state.schemaVersion === schema.factoryStateSchemaVersion, `поддерживается только schemaVersion ${schema.factoryStateSchemaVersion}`, label);
  invariant(/^\d{4}-\d{2}-\d{2}$/.test(state.updatedAt), "updatedAt должен быть YYYY-MM-DD", label);
  if (checkSources) safeProjectPath(rootDir, state.registrySource, `${label}:registrySource`);
  invariant(state.dashboard?.defaultView === "all-ideas", "dashboard.defaultView должен быть all-ideas", label);
  invariant(state.dashboard?.readOnly === true, "dashboard должен оставаться read-only", label);
  for (const key of ["title", "addIdeaInstruction"]) {
    invariant(typeof state.dashboard?.[key] === "string" && state.dashboard[key].trim(), `dashboard.${key} обязателен`, label);
  }
  invariant(!Object.hasOwn(state, "activeDomainRun"), "activeDomainRun дублирует ACTIVE_RUN и запрещён", label);
  for (const key of ["status", "statusLabel", "summary", "confirmed", "unknown", "nextGate", "source"]) {
    invariant(typeof state.systemStatus?.[key] === "string" && state.systemStatus[key].trim(), `systemStatus.${key} обязателен`, label);
  }
  invariant(state.systemStatus.status === "configured", "systemStatus.status должен быть configured", label);
  invariant(state.systemStatus.endToEndValidated === false, "endToEndValidated должен быть false до полного прохода", label);
  invariant(state.systemStatus.statusLabel === "Контур настроен, но не подтверждён end-to-end", "неверный честный statusLabel", label);
  invariant(!/\sили\s/i.test(state.systemStatus.nextGate), "nextGate должен содержать один gate без альтернативы «или»", label);
  if (checkSources) safeProjectPath(rootDir, state.systemStatus.source, `${label}:systemStatus.source`);
  return state;
}

export function validateConsistency({ schema, activeRun, registry, factoryState }) {
  const label = "factory consistency";
  invariant(factoryState.registrySource === "data/IDEA_REGISTRY.json", "FACTORY_STATE указывает не на канонический реестр", label);
  const registryRun = registry.runs.find((run) => run.id === activeRun.registryRunId);
  invariant(registryRun, `в реестре нет Registry run ID ${activeRun.registryRunId}`, label);
  invariant(registryRun.status === activeRun.status, `статус ACTIVE_RUN (${activeRun.status}) не совпадает с реестром (${registryRun.status})`, label);
  invariant(registryRun.source === "data/ACTIVE_RUN.md", "registry run должен ссылаться на ACTIVE_RUN.md", label);
  const ideas = new Map(registry.ideas.map((idea) => [idea.id, idea]));
  for (const candidateId of activeRun.candidateIds) {
    const idea = ideas.get(candidateId);
    invariant(idea, `кандидат ${candidateId} отсутствует в реестре`, label);
    invariant(idea.runIds.includes(activeRun.registryRunId), `кандидат ${candidateId} не связан с ${activeRun.registryRunId}`, label);
  }
  if (activeRun.checkpointId === "S4_OWNER" && activeRun.checkpointGateStatus !== "passed") {
    for (const candidateId of activeRun.candidateIds) {
      invariant(ideas.get(candidateId).gateStatus !== "passed", `незавершённый owner checkpoint не допускает passed у ${candidateId}`, label);
    }
  }
  if (activeRun.status === "parked") {
    for (const candidateId of activeRun.candidateIds) {
      invariant(ideas.get(candidateId).gateStatus === "parked", `кандидат parked run должен иметь gateStatus parked: ${candidateId}`, label);
    }
  }
  invariant(activeRun.selectedFocusIds.length <= 1, "в активном run больше одного выбранного фокуса", label);
  return true;
}

export function validateAll({ rootDir = defaultRoot } = {}) {
  const schema = loadSchema(rootDir);
  const activeRun = validateActiveRun({ rootDir, schema });
  const registry = validateRegistry(readJson(rootDir, "data/IDEA_REGISTRY.json"), { schema, rootDir });
  const factoryState = validateFactoryState(readJson(rootDir, "data/FACTORY_STATE.json"), { schema, rootDir });
  validateConsistency({ schema, activeRun, registry, factoryState });
  return { schema, activeRun, registry, factoryState };
}
