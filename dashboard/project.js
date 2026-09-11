const REGISTRY_PATH = "../data/IDEA_REGISTRY.json";

const objectTypeLabels = {
  market_reference: "Рыночный референс",
  concrete_bet: "Конкретная ставка",
  existing_asset: "Готовый актив",
  active_business: "Действующий бизнес",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function projectSourceHref(source) {
  return `../${String(source).split("/").map(encodeURIComponent).join("/")}`;
}

function currentScore(idea, registry) {
  return Math.round(registry.rankingModel.neutralPrior + (idea.baseScore - registry.rankingModel.neutralPrior) * idea.evidenceConfidence);
}

function setStatus(text, tone = "") {
  const target = document.querySelector("#data-status");
  target.textContent = text;
  target.className = `status ${tone}`.trim();
}

async function init() {
  try {
    const response = await fetch(REGISTRY_PATH, { cache: "no-store" });
    if (!response.ok) throw new Error(`Не удалось загрузить реестр: ${response.status}`);
    const registry = await response.json();
    const id = new URLSearchParams(location.search).get("id");
    const idea = registry.ideas.find((item) => item.id === id);
    if (!idea) throw new Error("Такой проект не найден в едином реестре");
    const stage = registry.stages.find((item) => item.id === idea.stage);
    const gate = registry.gateStatuses.find((item) => item.id === idea.gateStatus);
    const score = currentScore(idea, registry);
    document.title = `${idea.title} — Анализ Ниш`;
    document.querySelector("#project-card").innerHTML = `<header class="project-card-hero">
      <div>
        <p class="section-kicker">${escapeHtml(objectTypeLabels[idea.objectType] || idea.objectType)} · ${escapeHtml(idea.category)}</p>
        <h1>${escapeHtml(idea.title)}</h1>
        <p>${escapeHtml(idea.projectSummary)}</p>
      </div>
      <div class="project-score" aria-label="Текущий рейтинг ${score}, доверие ${Math.round(idea.evidenceConfidence * 100)} процентов"><strong>${score}</strong><span>текущий рейтинг</span><b>${Math.round(idea.evidenceConfidence * 100)}% доверие</b></div>
    </header>
    <section class="project-facts" aria-label="Суть проекта">
      <div><span>Для кого</span><p>${escapeHtml(idea.customer)}</p></div>
      <div><span>Результат для клиента</span><p>${escapeHtml(idea.customerOutcome)}</p></div>
      <div><span>Как зарабатывает</span><p>${escapeHtml(idea.moneyModel)}</p></div>
    </section>
    <section class="project-research" aria-label="Состояние исследования">
      <div class="project-state"><span>Состояние</span><p><strong>${escapeHtml(stage?.label || idea.stage)}</strong> · ${escapeHtml(gate?.label || idea.gateStatus)} · ${escapeHtml(idea.evidenceLevel)}</p></div>
      <div><span>Почему в этом месте</span><p>${escapeHtml(idea.rankingReason)}</p></div>
      <div><span>Главный риск</span><p>${escapeHtml(idea.mainRisk)}</p></div>
      <div class="project-next"><span>Следующая проверка</span><p>${escapeHtml(idea.nextGate)}</p></div>
    </section>
    <section class="project-source"><p>Подробные заметки и доказательства сохранены отдельно. Это технический исходный материал, а не основное описание проекта.</p><a href="${projectSourceHref(idea.source)}" target="_blank" rel="noreferrer">Открыть исходный материал (Markdown) ↗</a></section>`;
    setStatus("Данные актуальны", "ok");
  } catch (error) {
    setStatus("Ошибка данных", "error");
    const message = document.querySelector("#error-message");
    message.hidden = false;
    message.textContent = `${error.message}. Открой карточку через локальный сервер или GitHub Pages, а не через file://.`;
  }
}

init();
