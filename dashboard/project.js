const REGISTRY_PATH = "../data/IDEA_REGISTRY.json";
const FACTORY_SCHEMA_PATH = "../data/FACTORY_SCHEMA.json";

const objectTypeLabels = { market_reference: "Рыночный референс", concrete_bet: "Конкретная ставка", existing_asset: "Готовый актив", active_business: "Действующий бизнес" };
const auditStatusLabels = { passed: "Пройден", failed: "Не пройден", parked: "На паузе", in_progress: "В работе", not_started: "Не начат", legacy_only: "Только legacy" };
const criterionResultLabels = { passed: "Подтверждено", failed: "Не выполнено", unknown: "Неизвестно", not_applicable: "Не применимо" };
const decisionClassLabels = { advance: "Можно двигать дальше", owner_hold: "Ждёт решения владельца", parked_missing_evidence: "Не хватает доказательств", hard_blocked: "Есть жёсткий блокер", failed_economics: "Экономика не проходит", passed_not_selected: "Прошла, но не выбрана", reference_only: "Только рыночный референс", benchmark: "Портфельный benchmark", not_researched: "Ещё не исследована" };
const competitionLabels = { confirms_market: "Подтверждает существование рынка", not_checked: "Не исследовано", not_applicable: "Не применимо" };
const geographyStatusLabels = { checked: "Проверено", partial: "Частично", not_checked: "Не проверено" };
const criterionLabels = {
  object_defined: "Объект определён", payer_hypothesis: "Есть гипотеза плательщика", money_mechanism: "Понятен механизм денег", geography_declared: "Задана география", cheap_falsifier: "Есть дешёвая проверка",
  market_exists: "Рынок существует", competitors_or_paid_alternatives: "Есть конкуренты или платные альтернативы", money_model_observed: "Наблюдается денежная модель",
  two_independent_signals: "Два независимых сигнала проблемы", signal_dates_recorded: "Даты сигналов зафиксированы", job_not_confused_with_product_claim: "Job отделён от заявления о продукте",
  geography_checked: "География проверена", local_payer_hypothesis: "Есть локальная гипотеза плательщика", lawful_research_access: "Доступен законный способ исследования", local_alternatives_mapped: "Локальные альтернативы нанесены на карту",
  eighteen_criteria_visible: "Все 18 критериев видимы", market_economics_moat_separated: "Рынок, экономика и защита разделены", unknowns_visible: "Неизвестные явно показаны", top_one_or_two: "Кандидат вошёл в 1–2 финалиста",
  competitors_mapped: "Конкуренты изучены", paid_job_observed: "Наблюдается оплачиваемая работа", differentiation_hypothesis: "Есть гипотеза отличия", first_channel_hypothesis: "Есть гипотеза первого канала", exactly_one_owner_selected_focus: "Владелец выбрал ровно один фокус",
  public_corpus: "Собран публичный корпус", research_question: "Сформулирован исследовательский вопрос", screener: "Готов screener", interview_guide: "Готов guide интервью", privacy_boundary: "Соблюдена приватная граница",
  five_real_interviews: "Проведено минимум пять реальных интервью", past_behavior: "Есть прошлое поведение, а не обещания", repeated_problem: "Проблема повторяется", cohort_synthesis: "Есть обезличенный cohort synthesis",
  jtbd: "Уточнён JTBD", first_sales_channel: "Уточнён первый канал продаж", financial_range: "Уточнён финансовый диапазон", observable_action: "Есть наблюдаемое затратное действие",
  real_payment_or_budget: "Есть реальные деньги или подтверждённый бюджет", paid_scope: "Зафиксирован оплаченный scope", payer_identity: "Известен реальный плательщик", payment_terms: "Зафиксированы условия оплаты",
  success_criteria: "Есть success criteria", kill_criteria: "Есть kill criteria", build_budget_limit: "Задан лимит build", manual_fallback: "Есть ручной fallback", bounded_scope_delivered: "Bounded scope доставлен", manual_fallback_available: "Ручной fallback доступен", usage_observable: "Использование наблюдаемо",
  repeat_use: "Есть повторное использование", retention: "Измерен retention", actual_economics: "Проверена фактическая экономика", repeatable_channel: "Подтверждён повторяемый канал",
};

function escapeHtml(value) { return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function currentScore(idea, registry) { return Math.round(registry.rankingModel.neutralPrior + (idea.baseScore - registry.rankingModel.neutralPrior) * idea.evidenceConfidence); }
function setStatus(text, tone = "") { const target = document.querySelector("#data-status"); target.textContent = text; target.className = `status ${tone}`.trim(); }
function legacyConfidenceNote(idea) { return !Number.isFinite(idea.legacyEvidenceConfidence) || idea.legacyEvidenceConfidence === idea.evidenceConfidence ? "" : `<small class="legacy-confidence">Legacy: ${Math.round(idea.legacyEvidenceConfidence * 100)}%; активное доверие ограничено evidence-cap ${idea.evidenceLevel} до ${Math.round(idea.evidenceConfidence * 100)}%.</small>`; }
function criterionLabel(id, audit) { return audit.criteria.find((criterion) => criterion.id === id)?.label || criterionLabels[id] || id.replaceAll("_", " "); }
function projectSourceSection(source) {
  if (!source) return `<section class="project-source"><p>Публичная карточка показывает обезличенный audit trail. Внутренний путь источника не публикуется.</p></section>`;
  const href = `../${String(source).split("/").map(encodeURIComponent).join("/")}`;
  return `<section class="project-source"><p>Подробные заметки и доказательства сохранены отдельно.</p><a href="${href}" target="_blank" rel="noreferrer">Открыть исходный материал (Markdown) ↗</a></section>`;
}

function renderCheckpointPath(schema, audit) {
  const history = new Map(audit.checkpointHistory.map((entry) => [entry.checkpointId, entry]));
  return schema.checkpoints.map((checkpoint) => {
    const entry = history.get(checkpoint.id);
    const status = entry?.status || "not_started";
    return `<li class="checkpoint-item status-${status}${audit.currentCheckpointId === checkpoint.id ? " is-current" : ""}"><div class="checkpoint-marker" aria-hidden="true"></div><div class="checkpoint-copy"><div class="checkpoint-heading"><span>${escapeHtml(checkpoint.id)}</span><strong>${escapeHtml(checkpoint.name)}</strong><b>${escapeHtml(auditStatusLabels[status] || status)}</b></div><p>${escapeHtml(entry?.summary || "Этап ещё не начат.")}</p><details class="checkpoint-contract"><summary>Показать критерии этапа</summary><div><strong>${escapeHtml(checkpoint.gateQuestion)}</strong><ul>${checkpoint.passCriteria.map((id) => `<li>${escapeHtml(criterionLabel(id, audit))}</li>`).join("")}</ul><p>${escapeHtml(checkpoint.failurePolicy)}</p></div></details></div></li>`;
  }).join("");
}

function renderCurrentGate(schema, audit) {
  const checkpoint = schema.checkpoints.find((item) => item.id === audit.currentCheckpointId);
  if (!checkpoint) return "";
  return `<section class="project-section current-gate-section"><div class="project-section-head"><div><p class="section-kicker">Текущий gate · ${escapeHtml(checkpoint.id)}</p><h2>${escapeHtml(checkpoint.name)}</h2></div><span class="gate-macro">${escapeHtml(checkpoint.macroPhase)}</span></div><div class="gate-question"><span>Контрольный вопрос</span><p>${escapeHtml(checkpoint.gateQuestion)}</p></div><div class="gate-contract"><div><span>Чтобы пройти</span><ul>${checkpoint.passCriteria.map((id) => `<li>${escapeHtml(criterionLabel(id, audit))}</li>`).join("")}</ul></div><div><span>Если не выполнено</span><p>${escapeHtml(checkpoint.failurePolicy)}</p></div></div></section>`;
}

function renderEvidence(audit) {
  return `<section class="project-section evidence-section"><div class="project-section-head"><div><p class="section-kicker">Проверяемые основания</p><h2>Критерии решения</h2></div><p>Неизвестное не превращается в провал. Конкуренция отдельно показывает наличие рынка.</p></div><div class="criteria-list">${audit.criteria.map((criterion) => `<article class="criterion-card result-${criterion.result}"><header><strong>${escapeHtml(criterion.label)}</strong><span>${escapeHtml(criterionResultLabels[criterion.result] || criterion.result)}</span></header><p>${escapeHtml(criterion.observation)}</p><small>${escapeHtml(criterion.evidenceLevel)}</small></article>`).join("")}</div></section>`;
}

function renderGeographies(audit) {
  return `<section class="project-section geography-section"><div class="project-section-head"><div><p class="section-kicker">Границы рынка</p><h2>География проверок</h2></div></div><div class="geography-grid">${audit.geographies.map((item) => `<article><header><strong>${escapeHtml(item.market)}</strong><span>${escapeHtml(geographyStatusLabels[item.status] || item.status)}</span></header><p>${escapeHtml(item.summary)}</p></article>`).join("")}</div></section>`;
}

async function loadJson(path) { const response = await fetch(path, { cache: "no-store" }); if (!response.ok) throw new Error(`Не удалось загрузить ${path}: ${response.status}`); return response.json(); }

async function init() {
  try {
    const [registry, schema] = await Promise.all([loadJson(REGISTRY_PATH), loadJson(FACTORY_SCHEMA_PATH)]);
    const id = new URLSearchParams(location.search).get("id");
    const idea = registry.ideas.find((item) => item.id === id);
    const audit = registry.decisionAudits?.[id];
    if (!idea || !audit) throw new Error("Такой проект или его audit trail не найден в едином реестре");
    const stage = registry.stages.find((item) => item.id === idea.stage);
    const gate = registry.gateStatuses.find((item) => item.id === idea.gateStatus);
    const score = currentScore(idea, registry);
    const blocker = audit.blockerCode ? `Есть: ${audit.blockerCode}` : "Нет";
    document.title = `${idea.title} — Анализ Ниш`;
    document.querySelector("#project-card").innerHTML = `<header class="project-card-hero"><div><p class="section-kicker">${escapeHtml(objectTypeLabels[idea.objectType] || idea.objectType)} · ${escapeHtml(idea.category)}</p><h1>${escapeHtml(idea.title)}</h1><p>${escapeHtml(idea.projectSummary)}</p></div><div class="project-score" aria-label="Текущий рейтинг ${score}, доверие ${Math.round(idea.evidenceConfidence * 100)} процентов"><strong>${score}</strong><span>текущий рейтинг</span><b>${Math.round(idea.evidenceConfidence * 100)}% доверие</b>${legacyConfidenceNote(idea)}</div></header>
    <section class="decision-strip" aria-label="Текущее решение"><div><span>Checkpoint</span><strong>${escapeHtml(audit.currentCheckpointId)}</strong></div><div><span>Этап</span><strong>${escapeHtml(stage?.label || idea.stage)}</strong></div><div><span>Решение</span><strong>${escapeHtml(gate?.label || idea.gateStatus)}</strong></div><div><span>Класс решения</span><strong>${escapeHtml(decisionClassLabels[audit.decisionClass] || audit.decisionClass)}</strong></div><div><span>Hard blocker</span><strong>${escapeHtml(blocker)}</strong></div><div class="competition-fact"><span>Конкуренция</span><strong>${escapeHtml(competitionLabels[audit.competitionEffect] || audit.competitionEffect)}</strong></div></section>
    <section class="project-facts" aria-label="Суть проекта"><div><span>Для кого</span><p>${escapeHtml(idea.customer)}</p></div><div><span>Результат для клиента</span><p>${escapeHtml(idea.customerOutcome)}</p></div><div><span>Как зарабатывает</span><p>${escapeHtml(idea.moneyModel)}</p></div></section>
    <section class="project-research" aria-label="Состояние исследования"><div><span>Почему в этом месте</span><p>${escapeHtml(idea.rankingReason)}</p></div><div><span>Главный риск</span><p>${escapeHtml(idea.mainRisk)}</p></div><div class="project-next"><span>Следующая проверка</span><p>${escapeHtml(idea.nextGate)}</p></div><div><span>Уровень доказательств</span><p><strong>${escapeHtml(idea.evidenceLevel)}</strong> · ${Math.round(idea.evidenceConfidence * 100)}% активного доверия</p></div></section>
    ${renderCurrentGate(schema, audit)}${renderEvidence(audit)}${renderGeographies(audit)}
    <section class="project-section path-section"><div class="project-section-head"><div><p class="section-kicker">Полная история</p><h2>Путь по воронке</h2></div><p>Пройденные, текущий и ещё не начатые checkpoints показаны отдельно.</p></div><ol class="checkpoint-list">${renderCheckpointPath(schema, audit)}</ol></section>${projectSourceSection(idea.source)}`;
    setStatus("Данные загружены", "ok");
  } catch (error) {
    setStatus("Ошибка данных", "error");
    const message = document.querySelector("#error-message");
    message.hidden = false;
    message.textContent = `${error.message}. Открой карточку через локальный сервер или GitHub Pages, а не через file://.`;
  }
}

init();
