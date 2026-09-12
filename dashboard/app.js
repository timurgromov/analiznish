const REGISTRY_PATH = "../data/IDEA_REGISTRY.json";
const FACTORY_STATE_PATH = "../data/FACTORY_STATE.json";
const FACTORY_SCHEMA_PATH = "../data/FACTORY_SCHEMA.json";
const HIT_PARADE_PATH = "../data/HIT_PARADE.md";

const portfolioColumns = {
  queue: ["Приоритет", "Ниша", "Приоритет ставки", "Экономика", "Доверие", "Решение", "Следующий шаг"],
  market: ["Место на карте", "Ниша / референс", "Рыночная возможность", "Рынок", "Экономика", "Доверие", "Вывод"],
};

const objectTypeLabels = {
  market_reference: "Рыночный референс",
  concrete_bet: "Конкретная ставка",
  existing_asset: "Готовый актив",
  active_business: "Действующий бизнес",
};

const evidenceLabels = {
  E0: "Гипотеза",
  E1: "Публичные данные",
  E2: "Реальные интервью",
  E3: "Действие",
  E4: "Оплата",
  E5: "Повтор и экономика",
};

const decisionClassLabels = {
  advance: "можно двигать дальше",
  passed_not_selected: "прошла, но не выбрана",
  parked_missing_evidence: "не хватает доказательств",
  hard_blocked: "жёсткий блокер",
  failed_economics: "экономика не проходит",
  owner_hold: "ждёт решения владельца",
  reference_only: "рыночный референс",
  benchmark: "портфельный benchmark",
  not_researched: "ещё не исследована",
};

const state = {
  registry: null,
  factory: null,
  schema: null,
  activeView: "funnel",
  filters: { search: "", category: "all", stage: "all", gate: "all", sort: "current" },
  funnelStage: null,
  funnelGate: "all",
  funnelSort: "current",
  selectedRunId: null,
  portfolioView: "queue",
  portfolio: { market: { headers: [], rows: [] }, queue: { headers: [], rows: [] } },
  selectedPortfolioIndex: 0,
};

let activeTooltipTrigger = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function splitMarkdownRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function parseTable(markdown, firstHeader) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trim().startsWith(`| ${firstHeader} |`));
  if (start === -1) return { headers: [], rows: [] };
  const tableLines = [];
  for (let index = start; index < lines.length && lines[index].trim().startsWith("|"); index += 1) tableLines.push(lines[index]);
  return { headers: splitMarkdownRow(tableLines[0]), rows: tableLines.slice(2).map(splitMarkdownRow) };
}

function getRowValue(table, row, header) {
  const index = table.headers.indexOf(header);
  return index === -1 ? "" : row[index] || "";
}

function currentScore(idea) {
  return Math.round(state.registry.rankingModel.neutralPrior + (idea.baseScore - state.registry.rankingModel.neutralPrior) * idea.evidenceConfidence);
}

function stageById(id) {
  return state.registry.stages.find((stage) => stage.id === id);
}

function gateById(id) {
  return state.registry.gateStatuses.find((gate) => gate.id === id);
}

function auditFor(id) {
  return state.registry.decisionAudits?.[id] || null;
}

function checkpointById(id) {
  return state.schema.checkpoints.find((checkpoint) => checkpoint.id === id);
}

function checkpointStage(id) {
  return checkpointById(id)?.dashboardStage;
}

function factoryRuns() {
  return state.registry.runs.filter((run) => run.framework === "factory_v2");
}

function ideasForRun(runId) {
  return state.registry.ideas.filter((idea) => idea.runIds?.includes(runId));
}

function checkpointEntry(idea, checkpointId) {
  return auditFor(idea.id)?.checkpointHistory?.find((entry) => entry.checkpointId === checkpointId) || null;
}

function projectSourceHref(source) {
  return `../${String(source).split("/").map(encodeURIComponent).join("/")}`;
}

function sourceLink(source, label = "Исходный материал (Markdown) ↗", className = "source-link") {
  if (!source) return "";
  return `<a class="${className}" href="${projectSourceHref(source)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`;
}

function legacyConfidenceNote(idea) {
  if (!Number.isFinite(idea.legacyEvidenceConfidence) || idea.legacyEvidenceConfidence === idea.evidenceConfidence) return "";
  return `<small class="legacy-confidence">Legacy: ${Math.round(idea.legacyEvidenceConfidence * 100)}%; активное доверие ограничено evidence-cap ${idea.evidenceLevel} до ${Math.round(idea.evidenceConfidence * 100)}%.</small>`;
}

function projectCardHref(id) {
  return `./project.html?id=${encodeURIComponent(id)}`;
}

function formatDate(value) {
  const [year, month, day] = String(value).split("-").map(Number);
  if (!Number.isInteger(year)) return value;
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(year, month - 1, day));
}

function scoreTone(score) {
  if (score >= 65) return "strong";
  if (score >= 55) return "promising";
  if (score >= 48) return "neutral";
  return "weak";
}

function confidenceText(confidence) {
  if (confidence >= 0.85) return "высокое";
  if (confidence >= 0.65) return "среднее";
  if (confidence >= 0.45) return "начальное";
  return "очень низкое";
}

function pluralIdeas(value) {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return `${value} идея`;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${value} идеи`;
  return `${value} идей`;
}

function pluralNoun(value, one, few, many) {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

function setStatus(text, tone = "") {
  const target = document.querySelector("#data-status");
  target.textContent = text;
  target.className = `status ${tone}`.trim();
}

function renderTopSummary() {
  const ideas = state.registry.ideas;
  const finalists = ideas.filter((idea) => idea.stage === "finalist").length;
  const interviews = ideas.filter((idea) => idea.stage === "interviews").length;
  const archive = ideas.filter((idea) => ["parked", "failed"].includes(idea.gateStatus)).length;
  const system = state.factory.systemStatus;
  const systemState = system.status === "configured" ? "Настроен" : system.statusLabel;
  const interviewHeadline = interviews === 0 ? "До интервью не дошла ни одна идея" : `${pluralIdeas(interviews)} дошли до интервью`;
  document.querySelector("#decision-brief").innerHTML = `<div class="owner-overview">
    <div class="owner-heading"><div><p class="section-kicker">Экран решений</p><h2 id="decision-brief-title">${escapeHtml(interviewHeadline)}</h2></div><span class="decision-status">${escapeHtml(systemState)}</span></div>
    <div class="owner-flow" aria-label="Текущее состояние портфеля">
      <a href="#all-ideas" class="owner-flow-step"><strong>${ideas.length}</strong><span>всего идей</span></a><i aria-hidden="true">→</i>
      <button type="button" class="owner-flow-step" data-stage-jump="finalist"><strong>${finalists}</strong><span>${pluralNoun(finalists, "финалист", "финалиста", "финалистов")}</span></button><i aria-hidden="true">→</i>
      <button type="button" class="owner-flow-step owner-flow-target" data-stage-jump="interviews"><strong>${interviews}</strong><span>на интервью</span></button>
    </div>
  </div>
  <aside class="owner-next-gate"><p class="section-kicker">Один следующий gate</p><strong>${escapeHtml(system.nextGate)}</strong><a href="#research">Открыть журнал исследований →</a></aside>
  <details class="decision-context"><summary>Что уже подтверждено и что остаётся неизвестным</summary><div><p><span>Подтверждено</span>${escapeHtml(system.confirmed)}</p><p><span>Неизвестно</span>${escapeHtml(system.unknown)}</p><p><span>Состояние контура</span>${escapeHtml(system.summary)}</p></div></details>`;
  document.querySelector("#tab-total").textContent = ideas.length;
  document.querySelector("#tab-runs").textContent = state.registry.runs.length;
  document.querySelector("#tab-archive").textContent = archive;
  document.querySelector("#updated-at").textContent = `Обновлено ${formatDate(state.registry.updatedAt)}`;
  document.querySelector("#add-idea-instruction").textContent = state.factory.dashboard.addIdeaInstruction;
  document.querySelector("#ranking-formula").textContent = state.registry.rankingModel.formula.replace("round", "округлить");
}

function renderFilterOptions() {
  const categorySelect = document.querySelector("#category-filter");
  const categories = [...new Set(state.registry.ideas.map((idea) => idea.category))].sort((a, b) => a.localeCompare(b, "ru"));
  categorySelect.innerHTML = `<option value="all">Все категории</option>${categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
  document.querySelector("#stage-filter").innerHTML = `<option value="all">Все этапы</option>${state.registry.stages.map((stage) => `<option value="${stage.id}">${escapeHtml(stage.label)}</option>`).join("")}`;
  document.querySelector("#gate-filter").innerHTML = `<option value="all">Все решения</option>${state.registry.gateStatuses.map((gate) => `<option value="${gate.id}">${escapeHtml(gate.label)}</option>`).join("")}`;
  document.querySelector("#funnel-gate-filter").innerHTML = `<option value="all">Все результаты</option>${state.registry.gateStatuses.map((gate) => `<option value="${gate.id}">${escapeHtml(gate.label)}</option>`).join("")}`;
}

function searchableText(idea) {
  return [idea.title, idea.category, idea.rankingReason, idea.mainRisk, idea.nextGate, objectTypeLabels[idea.objectType]].join(" ").toLocaleLowerCase("ru");
}

function sortIdeas(ideas, sortKey) {
  const sorters = {
    current: (a, b) => currentScore(b) - currentScore(a) || b.evidenceConfidence - a.evidenceConfidence || a.title.localeCompare(b.title, "ru"),
    base: (a, b) => b.baseScore - a.baseScore || b.evidenceConfidence - a.evidenceConfidence,
    confidence: (a, b) => b.evidenceConfidence - a.evidenceConfidence || currentScore(b) - currentScore(a),
    stage: (a, b) => (stageById(b.stage)?.order ?? 0) - (stageById(a.stage)?.order ?? 0) || currentScore(b) - currentScore(a),
    title: (a, b) => a.title.localeCompare(b.title, "ru"),
  };
  return [...ideas].sort(sorters[sortKey] || sorters.current);
}

function filteredIdeas() {
  const search = state.filters.search.trim().toLocaleLowerCase("ru");
  const ideas = state.registry.ideas.filter((idea) => {
    if (search && !searchableText(idea).includes(search)) return false;
    if (state.filters.category !== "all" && idea.category !== state.filters.category) return false;
    if (state.filters.stage !== "all" && idea.stage !== state.filters.stage) return false;
    if (state.filters.gate !== "all" && idea.gateStatus !== state.filters.gate) return false;
    return true;
  });
  return sortIdeas(ideas, state.filters.sort);
}

function ideaCard(idea, rank, compact = false) {
  const score = currentScore(idea);
  const stage = stageById(idea.stage);
  const gate = gateById(idea.gateStatus);
  const audit = auditFor(idea.id);
  return `<details class="idea-card tone-${scoreTone(score)} gate-${idea.gateStatus}${compact ? " compact" : ""}">
    <summary class="idea-summary">
      <span class="idea-rank">${rank}</span>
      <span class="idea-identity"><strong>${escapeHtml(idea.title)}</strong><small>${escapeHtml(idea.category)} · ${escapeHtml(objectTypeLabels[idea.objectType] || idea.objectType)}</small></span>
      <span class="rating-cell"><strong>${score}</strong><small>оценка ${idea.baseScore}</small></span>
      <span class="confidence-cell"><strong>${Math.round(idea.evidenceConfidence * 100)}%</strong><span class="confidence-track"><i style="width:${Math.round(idea.evidenceConfidence * 100)}%"></i></span><small>${escapeHtml(evidenceLabels[idea.evidenceLevel] || idea.evidenceLevel)}</small></span>
      <span class="stage-cell"><strong>${escapeHtml(stage?.label || idea.stage)}</strong><small>${escapeHtml(idea.evidenceLevel)}</small></span>
      <span class="gate-cell"><span>${escapeHtml(gate?.label || idea.gateStatus)}</span></span>
      <span class="reason-cell">${escapeHtml(idea.rankingReason)}${audit ? `<small class="audit-class">${escapeHtml(audit.currentCheckpointId)} · ${escapeHtml(decisionClassLabels[audit.decisionClass] || audit.decisionClass)}</small>` : ""}</span>
      <span class="expand-icon" aria-hidden="true">⌄</span>
    </summary>
    <div class="idea-details">
      <div class="project-summary-detail"><span>Что это за проект</span><p>${escapeHtml(idea.projectSummary)}</p></div>
      <div><span>Почему это место</span><p>${escapeHtml(idea.rankingReason)}</p></div>
      <div><span>Главный риск</span><p>${escapeHtml(idea.mainRisk)}</p></div>
      <div class="next-gate-detail"><span>Следующая проверка</span><p>${escapeHtml(idea.nextGate)}</p></div>
      <div class="score-explanation"><span>Как получился рейтинг</span><p><strong>${score}</strong> = 50 + (${idea.baseScore} − 50) × ${Math.round(idea.evidenceConfidence * 100)}%. Доверие ${confidenceText(idea.evidenceConfidence)}. ${escapeHtml(idea.scoreBasis)}.</p>${legacyConfidenceNote(idea)}</div>
      <a class="project-card-link" href="${projectCardHref(idea.id)}">Открыть карточку проекта →</a>
      ${sourceLink(idea.source)}
    </div>
  </details>`;
}

function renderIdeas() {
  const ideas = filteredIdeas();
  document.querySelector("#idea-list").innerHTML = ideas.map((idea, index) => ideaCard(idea, index + 1)).join("");
  const empty = document.querySelector("#idea-empty");
  empty.hidden = ideas.length !== 0;
  if (!ideas.length) {
    const title = document.querySelector("#idea-empty-title");
    const text = document.querySelector("#idea-empty-text");
    if (state.filters.stage === "inbox") {
      title.textContent = "Чистилище сейчас пусто";
      text.textContent = `Все ${state.registry.ideas.length} сохранённых идей уже получили хотя бы первичную классификацию и находятся на следующих этапах. Новая сырая идея сначала появится здесь.`;
    } else if (state.filters.stage !== "all") {
      const stage = stageById(state.filters.stage);
      title.textContent = `На этапе «${stage?.label || state.filters.stage}» сейчас нет идей`;
      text.textContent = stage?.description || "Идеи появятся здесь после предыдущей проверки.";
    } else if (state.filters.gate !== "all") {
      const gate = gateById(state.filters.gate);
      title.textContent = `С решением «${gate?.label || state.filters.gate}» сейчас нет идей`;
      text.textContent = gate?.description || "Измени фильтр, чтобы увидеть остальные идеи.";
    } else {
      title.textContent = "По этим фильтрам идей нет";
      text.textContent = "Измени запрос или покажи весь реестр.";
    }
  }
  document.querySelector("#result-count").textContent = pluralIdeas(ideas.length);
  const active = [];
  if (state.filters.search) active.push(`поиск «${state.filters.search}»`);
  if (state.filters.category !== "all") active.push(state.filters.category);
  if (state.filters.stage !== "all") active.push(`этап: ${stageById(state.filters.stage)?.label}`);
  if (state.filters.gate !== "all") active.push(`решение: ${gateById(state.filters.gate)?.label}`);
  document.querySelector("#filter-description").textContent = active.length ? active.join(" · ") : "без фильтров";
}

function renderFunnel() {
  const benchmarks = state.registry.ideas.filter((idea) => idea.objectType === "active_business");
  const factoryIdeas = state.registry.ideas.filter((idea) => idea.objectType !== "active_business");
  document.querySelector("#funnel-grid").innerHTML = state.registry.stages.map((stage) => {
    const current = factoryIdeas.filter((idea) => idea.stage === stage.id);
    const empty = current.length === 0;
    return `<li class="funnel-card"><button type="button" class="stage-jump ${empty ? "is-empty" : ""}${state.funnelStage === stage.id ? " selected" : ""}" data-stage-jump="${stage.id}" aria-pressed="${state.funnelStage === stage.id}" aria-label="Открыть этап ${escapeHtml(stage.label)}: сейчас ${current.length}">
      <span class="stage-number">${stage.order + 1}</span><strong class="stage-current">${current.length}</strong><span class="stage-current-label">сейчас</span><b>${escapeHtml(stage.label)}</b>
    </button></li>`;
  }).join("");
  document.querySelector("#stage-map-summary").textContent = `${pluralIdeas(factoryIdeas.length)} в Factory · ${pluralIdeas(benchmarks.length)} benchmark`;
  document.querySelector("#benchmark-row").innerHTML = benchmarks.length
    ? `<div><span class="benchmark-mark" aria-hidden="true">↗</span><p><strong>Отдельный действующий benchmark</strong><span>Он подтверждает деньги вне последовательного Factory-run и не рисует ложный проход через предыдущие стадии.</span></p></div>${benchmarks.map((idea) => `<button type="button" data-stage-jump="${idea.stage}">${escapeHtml(idea.title)} →</button>`).join("")}`
    : "";
}

function renderRunFunnel() {
  const runs = factoryRuns();
  const select = document.querySelector("#run-select");
  const target = document.querySelector("#run-funnel-body");
  if (!runs.length) {
    select.innerHTML = "";
    target.innerHTML = '<div class="empty-state"><strong>Factory-run ещё не записаны</strong><p>Воронка появится после первого сопоставимого запуска.</p></div>';
    return;
  }
  if (!runs.some((run) => run.id === state.selectedRunId)) state.selectedRunId = runs.at(-1).id;
  select.innerHTML = runs.map((run) => `<option value="${escapeHtml(run.id)}"${run.id === state.selectedRunId ? " selected" : ""}>${escapeHtml(run.title)}</option>`).join("");
  const run = runs.find((item) => item.id === state.selectedRunId);
  const ideas = ideasForRun(run.id);
  const checkpointIndexes = ideas.flatMap((idea) => (auditFor(idea.id)?.checkpointHistory || []).map((entry) => state.schema.checkpoints.findIndex((checkpoint) => checkpoint.id === entry.checkpointId))).filter((index) => index >= 0);
  const lastRecordedIndex = checkpointIndexes.length ? Math.max(...checkpointIndexes) : -1;
  const currentCheckpointIndexes = ideas.map((idea) => state.schema.checkpoints.findIndex((checkpoint) => checkpoint.id === auditFor(idea.id)?.currentCheckpointId)).filter((index) => index >= 0);
  const runCurrentIndex = currentCheckpointIndexes.length ? Math.max(...currentCheckpointIndexes) : -1;
  const visibleCheckpoints = state.schema.checkpoints.slice(0, Math.min(state.schema.checkpoints.length, Math.max(1, lastRecordedIndex + 2)));
  const runStatus = run.status === "complete" ? "Завершён" : run.status === "parked" ? "На паузе" : run.status === "active" ? "В работе" : "Остановлен";
  const batchStatus = ideas.length >= 5 && ideas.length <= 10 ? "Полный batch 5–10" : `Не batch: ${pluralIdeas(ideas.length)}`;
  const rows = visibleCheckpoints.map((checkpoint, index) => {
    const entries = ideas.map((idea) => checkpointEntry(idea, checkpoint.id)).filter(Boolean);
    const passed = entries.filter((entry) => entry.status === "passed").length;
    const parked = entries.filter((entry) => entry.status === "parked").length;
    const failed = entries.filter((entry) => entry.status === "failed").length;
    const notSelected = entries.filter((entry) => entry.status === "passed_not_selected").length;
    const legacy = entries.filter((entry) => entry.status === "legacy_only").length;
    const isCurrent = run.status !== "complete" && index === runCurrentIndex;
    let tone = "not-opened";
    if ((failed || notSelected) && (passed || parked)) tone = "mixed";
    else if (failed) tone = "failed";
    else if (notSelected) tone = "not-selected";
    else if (parked) tone = "parked";
    else if (passed) tone = "passed";
    else if (legacy) tone = "legacy";
    const result = [];
    if (passed) result.push(`${passed} прошли`);
    if (parked) result.push(`${parked} ждут evidence`);
    if (failed) result.push(`${failed} отсеяны`);
    if (notSelected) result.push(`${notSelected} прошли, не выбраны`);
    if (legacy) result.push(`${legacy} legacy-запись`);
    if (!result.length) result.push(index === lastRecordedIndex + 1 ? "Следующий, ещё не открыт" : "Нет записи в audit");
    const marker = tone === "passed" ? "✓" : tone === "failed" ? "×" : tone === "parked" || tone === "mixed" || tone === "not-selected" ? "‖" : "·";
    return `<li class="run-checkpoint tone-${tone}${isCurrent ? " is-current" : ""}"><span class="run-checkpoint-marker" aria-hidden="true">${marker}</span><div><span>${escapeHtml(checkpoint.id)}</span><strong>${escapeHtml(checkpoint.name)}</strong><small>${escapeHtml(result.join(" · "))}</small></div></li>`;
  }).join("");
  const candidateLinks = ideas.map((idea) => `<a href="${projectCardHref(idea.id)}">${escapeHtml(idea.title)}</a>`).join("");
  target.innerHTML = `<div class="run-rail"><ol>${rows}</ol></div><aside class="run-outcome"><div class="run-outcome-meta"><span class="run-status status-${escapeHtml(run.status)}">${escapeHtml(runStatus)}</span><span>${escapeHtml(batchStatus)}</span></div><h3>${escapeHtml(run.title)}</h3><p>${escapeHtml(run.result)}</p><div class="run-candidates"><span>Состав запуска</span>${candidateLinks || "<small>Связанные идеи не найдены</small>"}</div></aside>`;
}

function renderFunnelSelection() {
  const panel = document.querySelector("#funnel-selection-panel");
  panel.hidden = state.funnelStage === null;
  document.querySelectorAll("[data-stage-jump]").forEach((button) => {
    const selected = button.dataset.stageJump === state.funnelStage;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  if (state.funnelStage === null) return;

  const stage = state.funnelStage === "all" ? null : stageById(state.funnelStage);
  const gate = state.funnelGate === "all" ? null : gateById(state.funnelGate);
  const ideas = sortIdeas(state.registry.ideas.filter((idea) => {
    if (stage && idea.stage !== stage.id) return false;
    if (gate && idea.gateStatus !== gate.id) return false;
    return true;
  }), state.funnelSort);

  document.querySelector("#funnel-selection-title").textContent = stage ? stage.label : "Все этапы";
  document.querySelector("#funnel-selection-note").textContent = stage
    ? `Показаны идеи, которые сейчас находятся на этапе «${stage.label}». Результат gate и причина остановки видны в каждой строке.`
    : "Показаны идеи со всех этапов по выбранному результату проверки.";
  document.querySelector("#funnel-selection-count").textContent = pluralIdeas(ideas.length);
  document.querySelector("#funnel-selection-filter").textContent = gate ? `результат: ${gate.label}` : "все результаты проверки";
  document.querySelector("#funnel-gate-filter").value = state.funnelGate;
  document.querySelector("#funnel-sort-control").value = state.funnelSort;
  document.querySelector("#funnel-idea-list").innerHTML = ideas.map((idea, index) => ideaCard(idea, index + 1)).join("");

  const empty = document.querySelector("#funnel-idea-empty");
  empty.hidden = ideas.length !== 0;
  if (!ideas.length) {
    document.querySelector("#funnel-empty-title").textContent = stage?.id === "inbox"
      ? "Чистилище сейчас пусто"
      : "В этой выборке сейчас нет идей";
    document.querySelector("#funnel-empty-text").textContent = stage?.id === "inbox"
      ? `Все ${state.registry.ideas.length} сохранённых идей уже получили хотя бы первичную классификацию. Новая сырая идея сначала появится здесь.`
      : "Сними дополнительный фильтр результата или выбери другой этап.";
  }
}

function positionTooltip(trigger) {
  const tooltip = document.querySelector("#floating-tooltip");
  const triggerRect = trigger.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const margin = 10;
  const gap = 8;
  const left = Math.min(
    window.innerWidth - tooltipRect.width - margin,
    Math.max(margin, triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2),
  );
  const fitsAbove = triggerRect.top >= tooltipRect.height + gap + margin;
  const top = fitsAbove
    ? triggerRect.top - tooltipRect.height - gap
    : Math.min(window.innerHeight - tooltipRect.height - margin, triggerRect.bottom + gap);
  tooltip.style.left = `${Math.round(left)}px`;
  tooltip.style.top = `${Math.max(margin, Math.round(top))}px`;
}

function showTooltip(trigger) {
  const tooltip = document.querySelector("#floating-tooltip");
  if (activeTooltipTrigger && activeTooltipTrigger !== trigger) {
    activeTooltipTrigger.removeAttribute("aria-describedby");
    activeTooltipTrigger.setAttribute("aria-expanded", "false");
  }
  activeTooltipTrigger = trigger;
  tooltip.textContent = trigger.dataset.tooltip;
  tooltip.hidden = false;
  trigger.setAttribute("aria-describedby", "floating-tooltip");
  trigger.setAttribute("aria-expanded", "true");
  requestAnimationFrame(() => positionTooltip(trigger));
}

function hideTooltip(trigger = activeTooltipTrigger) {
  if (!trigger || trigger !== activeTooltipTrigger) return;
  const tooltip = document.querySelector("#floating-tooltip");
  tooltip.hidden = true;
  trigger.removeAttribute("aria-describedby");
  trigger.setAttribute("aria-expanded", "false");
  activeTooltipTrigger = null;
}

function bindTooltips() {
  document.querySelectorAll("[data-tooltip]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("mouseenter", () => showTooltip(trigger));
    trigger.addEventListener("mouseleave", () => {
      if (!trigger.matches(":focus-visible")) hideTooltip(trigger);
    });
    trigger.addEventListener("focus", () => {
      requestAnimationFrame(() => {
        if (trigger.matches(":focus-visible")) showTooltip(trigger);
      });
    });
    trigger.addEventListener("blur", () => hideTooltip(trigger));
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      showTooltip(trigger);
    });
  });
  document.addEventListener("pointerdown", (event) => {
    if (!event.target.closest("[data-tooltip]")) hideTooltip();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideTooltip();
  });
  window.addEventListener("resize", () => hideTooltip());
  window.addEventListener("scroll", () => hideTooltip(), true);
}

function renderRuns() {
  document.querySelector("#run-list").innerHTML = [...state.registry.runs]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((run) => `<article class="run-item">
      <div class="run-marker status-${run.status}"></div>
      <div class="run-body">
        <div class="run-title"><div><span>${escapeHtml(run.category)}</span><h3>${escapeHtml(run.title)}</h3></div><time>${formatDate(run.updatedAt)}</time></div>
        <p>${escapeHtml(run.result)}</p>
        <div class="run-footer"><span>${escapeHtml(run.evidenceLevel)} · ${run.status === "complete" ? "завершён" : "припаркован"}</span>${sourceLink(run.source, "Исходный материал (Markdown) ↗", "")}</div>
      </div>
    </article>`).join("");
}

function renderArchive() {
  const groups = [
    ["parked", "Припаркованы", "Можно вернуть после указанного условия"],
    ["failed", "Отсеяны", "Возвращать только при изменении ключевого ограничения"],
  ];
  document.querySelector("#archive-groups").innerHTML = groups.map(([status, title, note]) => {
    const ideas = state.registry.ideas.filter((idea) => idea.gateStatus === status).sort((a, b) => currentScore(b) - currentScore(a));
    return `<section class="archive-section"><div class="archive-title"><div><h3>${title}</h3><p>${note}</p></div><strong>${ideas.length}</strong></div><div class="archive-list">${ideas.map((idea, index) => ideaCard(idea, index + 1, true)).join("")}</div></section>`;
  }).join("");
}

function renderPortfolioTable() {
  const table = state.portfolio[state.portfolioView];
  const columns = portfolioColumns[state.portfolioView];
  document.querySelector("#portfolio-head").innerHTML = `<tr>${columns.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}<th><span class="visually-hidden">Детали</span></th></tr>`;
  document.querySelector("#portfolio-body").innerHTML = table.rows.map((row, index) => `<tr class="${index === state.selectedPortfolioIndex ? "selected" : ""}">${columns.map((header) => {
    const value = getRowValue(table, row, header);
    const numeric = ["Рыночная возможность", "Приоритет ставки", "Рынок", "Экономика"].includes(header);
    return `<td class="${numeric ? "numeric" : ""}">${numeric ? `<strong class="score-${scoreTone(Number(value))}">${escapeHtml(value)}</strong>` : escapeHtml(value)}</td>`;
  }).join("")}<td><button class="row-open" type="button" data-index="${index}">Подробнее</button></td></tr>`).join("");
  document.querySelectorAll(".row-open").forEach((button) => button.addEventListener("click", () => {
    state.selectedPortfolioIndex = Number(button.dataset.index);
    renderPortfolioTable();
    renderPortfolioDetail();
  }));
}

function renderPortfolioDetail() {
  const table = state.portfolio[state.portfolioView];
  const row = table.rows[state.selectedPortfolioIndex];
  const target = document.querySelector("#portfolio-detail");
  if (!row) {
    target.innerHTML = "<p>В этом представлении пока нет данных.</p>";
    return;
  }
  const nameHeader = table.headers.includes("Ниша / референс") ? "Ниша / референс" : "Ниша";
  const name = getRowValue(table, row, nameHeader);
  const conclusion = getRowValue(table, row, state.portfolioView === "queue" ? "Решение" : "Вывод");
  const next = getRowValue(table, row, "Следующий шаг") || "Сначала определить нашу конкретную ставку, сегмент и канал.";
  target.innerHTML = `<div><span>Выбранный объект</span><h3>${escapeHtml(name)}</h3></div><div class="portfolio-detail-grid"><div><span>Вывод</span><p>${escapeHtml(conclusion)}</p></div><div><span>Следующий шаг</span><p>${escapeHtml(next)}</p></div></div>`;
}

function switchView(view, updateHash = true) {
  hideTooltip();
  const available = new Set(["all-ideas", "funnel", "research", "portfolio", "archive"]);
  state.activeView = available.has(view) ? view : "funnel";
  document.querySelectorAll(".view-tab").forEach((button) => {
    const active = button.dataset.view === state.activeView;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll(".app-view").forEach((panel) => {
    const active = panel.dataset.panel === state.activeView;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
  if (updateHash) history.replaceState(null, "", `#${state.activeView}`);
  window.scrollTo({ top: 0, behavior: "instant" });
}

function resetIdeaFilters() {
  state.filters = { search: "", category: "all", stage: "all", gate: "all", sort: "current" };
  document.querySelector("#idea-search").value = "";
  document.querySelector("#category-filter").value = "all";
  document.querySelector("#stage-filter").value = "all";
  document.querySelector("#gate-filter").value = "all";
  document.querySelector("#sort-control").value = "current";
  renderIdeas();
}

function bindControls() {
  document.querySelectorAll(".view-tab").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.view === "all-ideas") resetIdeaFilters();
    switchView(button.dataset.view);
  }));
  const bindings = [
    ["#idea-search", "search", "input"],
    ["#category-filter", "category", "change"],
    ["#stage-filter", "stage", "change"],
    ["#gate-filter", "gate", "change"],
    ["#sort-control", "sort", "change"],
  ];
  bindings.forEach(([selector, key, event]) => document.querySelector(selector).addEventListener(event, (inputEvent) => {
    state.filters[key] = inputEvent.target.value;
    renderIdeas();
  }));
  document.querySelector("#reset-filters").addEventListener("click", resetIdeaFilters);
  document.querySelector("#show-all-ideas").addEventListener("click", resetIdeaFilters);
  document.querySelector("#run-select").addEventListener("change", (event) => {
    state.selectedRunId = event.target.value;
    renderRunFunnel();
  });
  document.querySelectorAll("[data-stage-jump]").forEach((button) => button.addEventListener("click", () => {
    state.funnelStage = button.dataset.stageJump;
    state.funnelGate = "all";
    renderFunnelSelection();
    document.querySelector("#funnel-selection-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  }));
  document.querySelector("#funnel-gate-filter").addEventListener("change", (event) => {
    state.funnelGate = event.target.value;
    renderFunnelSelection();
  });
  document.querySelector("#funnel-sort-control").addEventListener("change", (event) => {
    state.funnelSort = event.target.value;
    renderFunnelSelection();
  });
  document.querySelector("#clear-funnel-selection").addEventListener("click", () => {
    state.funnelStage = null;
    state.funnelGate = "all";
    state.funnelSort = "current";
    renderFunnelSelection();
  });
  document.querySelectorAll(".portfolio-tab").forEach((button) => button.addEventListener("click", () => {
    state.portfolioView = button.dataset.portfolio;
    state.selectedPortfolioIndex = 0;
    document.querySelectorAll(".portfolio-tab").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderPortfolioTable();
    renderPortfolioDetail();
  }));
}

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  return response.json();
}

async function loadText(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  return response.text();
}

async function init() {
  try {
    const [registry, factory, schema, hitParade] = await Promise.all([loadJson(REGISTRY_PATH), loadJson(FACTORY_STATE_PATH), loadJson(FACTORY_SCHEMA_PATH), loadText(HIT_PARADE_PATH)]);
    state.registry = registry;
    state.factory = factory;
    state.schema = schema;
    state.portfolio.market = parseTable(hitParade, "Место на карте");
    state.portfolio.queue = parseTable(hitParade, "Приоритет");
    if (!registry.ideas?.length || !registry.runs?.length || !state.portfolio.market.rows.length || !state.portfolio.queue.rows.length) throw new Error("Один из источников не содержит обязательных данных");
    renderTopSummary();
    renderFilterOptions();
    renderIdeas();
    renderFunnel();
    renderRunFunnel();
    renderFunnelSelection();
    renderRuns();
    renderArchive();
    renderPortfolioTable();
    renderPortfolioDetail();
    bindTooltips();
    bindControls();
    const requestedView = location.hash.replace("#", "") || factory.dashboard.defaultView;
    switchView(requestedView, false);
    window.addEventListener("hashchange", () => switchView(location.hash.replace("#", ""), false));
    setStatus("Данные загружены", "ok");
  } catch (error) {
    setStatus("Ошибка данных", "error");
    const message = document.querySelector("#error-message");
    message.hidden = false;
    message.textContent = `${error.message}. Открой dashboard через локальный сервер, а не через file://.`;
  }
}

init();
