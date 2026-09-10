const FACTORY_STATE_PATH = "../data/FACTORY_STATE.json";
const HIT_PARADE_PATH = "../data/HIT_PARADE.md";
const SCORING_PATH = "../docs/SCORING_MODEL.md";
const NICHE_CARD_INDEX_PATH = "../data/niches/INDEX.md";

const metricDescriptions = [
  ["Рыночная возможность", "Сила категории и модели денег: 60% рынка и 40% экономики. Не определяет, что тестировать прямо сейчас."],
  ["Приоритет ставки", "Сравнивает только наши конкретные модели по экономике, защите, личному фильтру и качеству доказательств."],
  ["Рынок", "Размер, рост, спрос, конкуренция, рабочие референсы и один понятный сегмент."],
  ["Экономика", "Повторные продажи, маржа, cash cycle и возможность реинвестировать в рост."],
  ["Защита и масштаб", "Защита от копирования, операционная масштабируемость и воспроизводимый канал."],
  ["Личный фильтр", "Скорость денег, свобода, финансовая устойчивость и соответствие текущему фокусу."],
  ["Доверие", "Качество доказательств. Публичные данные не заменяют разговор, действие, оплату и повтор."],
];

const evidenceStatusLabels = {
  verified: "проверено",
  supported: "косвенно подтверждено",
  estimated: "оценочно",
  unverified: "не проверено",
};

const candidateStageOrder = { finalist: 0, reserve: 1, parked: 2, rejected: 3 };
const testabilityClasses = {
  testable_now: "ready",
  safety_first: "guarded",
  needs_channel: "blocked",
  needs_access: "blocked",
  switching_unproven: "blocked",
  do_not_invest: "stopped",
};

const portfolioColumns = {
  queue: ["Приоритет", "Ниша", "Приоритет ставки", "Экономика", "Доверие", "Решение", "Следующий шаг"],
  market: ["Место на карте", "Ниша / референс", "Рыночная возможность", "Рынок", "Экономика", "Доверие", "Вывод"],
};

const appState = {
  factory: null,
  candidateFilter: "all",
  portfolioView: "queue",
  portfolio: {
    market: { headers: [], rows: [] },
    queue: { headers: [], rows: [] },
  },
  selectedPortfolio: { source: "queue", index: 0 },
  criteriaByNiche: {},
  summariesByNiche: {},
};

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
  for (let index = start; index < lines.length && lines[index].trim().startsWith("|"); index += 1) {
    tableLines.push(lines[index]);
  }
  return { headers: splitMarkdownRow(tableLines[0]), rows: tableLines.slice(2).map(splitMarkdownRow) };
}

function parseCardInventory(markdown) {
  const table = parseTable(markdown, "Ниша");
  const pathIndex = table.headers.indexOf("Путь");
  return table.rows.filter((row) => row[0] && row[pathIndex]).map((row) => ({ name: row[0], path: `../${row[pathIndex]}` }));
}

function parseCriteria(markdown) {
  const table = parseTable(markdown, "Критерий");
  return table.rows.map(([title, points, description]) => ({ title, points, description }));
}

function parseNicheCriteria(markdown) {
  const lines = markdown.split("\n");
  const heading = lines.findIndex((line) => ["## Детальные критерии", "## Нишевой балл"].includes(line.trim()));
  if (heading === -1) return [];
  const start = lines.findIndex((line, index) => index > heading && line.trim().startsWith("| Критерий | Балл |"));
  if (start === -1) return [];
  const rows = [];
  for (let index = start + 2; index < lines.length && lines[index].trim().startsWith("|"); index += 1) {
    const [title, points, status, conclusion] = splitMarkdownRow(lines[index]);
    if (title && !title.startsWith("**")) rows.push({ title, points, status, conclusion });
  }
  return rows;
}

function parseOneLiner(markdown) {
  const lines = markdown.split("\n");
  const heading = lines.findIndex((line) => line.trim() === "## One-liner");
  if (heading === -1) return "";
  const parts = [];
  for (let index = heading + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (line.startsWith("## ") || (!line && parts.length)) break;
    if (line) parts.push(line);
  }
  return parts.join(" ");
}

function canonicalName(value) {
  return String(value ?? "").replace(/[«»]/g, "").trim();
}

function projectSourceHref(path) {
  return `../${String(path).split("/").map(encodeURIComponent).join("/")}`;
}

function formatDate(date) {
  const [year, month, day] = String(date).split("-").map(Number);
  return Number.isInteger(year) ? new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(year, month - 1, day)) : date;
}

function scoreTone(value) {
  const number = Number.parseFloat(value);
  if (number >= 65) return "strong";
  if (number >= 50) return "medium";
  return "weak";
}

function getRowValue(table, row, header) {
  const index = table.headers.indexOf(header);
  return index === -1 ? "" : row[index] || "";
}

function findRowByName(table, name) {
  const header = table.headers.includes("Ниша / референс") ? "Ниша / референс" : "Ниша";
  return table.rows.find((row) => canonicalName(getRowValue(table, row, header)) === canonicalName(name));
}

function setStatus(text, type = "") {
  const element = document.querySelector("#data-status");
  element.textContent = text;
  element.className = `status ${type}`.trim();
}

function renderCheckpoint() {
  const checkpoint = appState.factory.currentCheckpoint;
  const snapshot = appState.factory.workspaceSnapshot;
  document.querySelector("#workspace-stats").innerHTML = [
    [snapshot.ideaInbox, "в чистилище"],
    [snapshot.discoveryArtifacts, "research-артефактов"],
    [snapshot.portfolioMarkets, "рынков на карте"],
    [snapshot.portfolioBets, "ставок в портфеле"],
  ].map(([value, label]) => `<span><strong>${value}</strong> ${label}</span>`).join("");
  document.querySelector("#checkpoint-title").textContent = checkpoint.title;
  document.querySelector("#checkpoint-status").textContent = checkpoint.statusLabel;
  document.querySelector("#checkpoint-summary").textContent = checkpoint.summary;
  document.querySelector("#checkpoint-confirmed").textContent = checkpoint.confirmed;
  document.querySelector("#checkpoint-unknown").textContent = checkpoint.unknown;
  document.querySelector("#checkpoint-gate").textContent = checkpoint.nextGate;
  document.querySelector("#checkpoint-decision").textContent = checkpoint.ownerDecision;
  document.querySelector("#checkpoint-updated").textContent = `Обновлено ${formatDate(appState.factory.updatedAt)}`;
  const source = document.querySelector("#checkpoint-source");
  source.href = projectSourceHref(checkpoint.source);
  source.target = "_blank";
  source.rel = "noreferrer";
}

function renderFunnel() {
  const stats = appState.factory.currentCheckpoint.stats;
  const stages = [
    ["Источники", stats.marketplaceLeads, "Публичные сигналы"],
    ["Кандидаты", stats.candidates, "Конкретные модели"],
    ["Финалисты", stats.finalists, "До реальных людей"],
    ["Реальные клиенты", stats.realInterviews, "Прошлое поведение"],
    ["Деньги", stats.payments, "Оплата или бюджет"],
    ["Повтор и масштаб", stats.repeatSignals, "Retention и экономика"],
  ];
  const currentIndex = stages.findIndex(([, count]) => count === 0);
  document.querySelector("#funnel-rail").innerHTML = stages
    .map(([label, count, note], index) => {
      const state = index < currentIndex ? "passed" : index === currentIndex ? "current" : "future";
      const stateLabel = state === "passed" ? "есть сигнал" : state === "current" ? "текущий gate" : "ещё не проверено";
      return `<li class="funnel-stage ${state}">
        <div class="stage-marker"><span>${count}</span></div>
        <strong>${escapeHtml(label)}</strong>
        <small>${escapeHtml(note)}</small>
        <span class="stage-state">${stateLabel}</span>
      </li>`;
    })
    .join("");

  const parked = appState.factory.candidates.filter((item) => item.stage === "parked").length;
  const rejected = appState.factory.candidates.filter((item) => item.stage === "rejected").length;
  document.querySelector("#funnel-aside").innerHTML = `<span><strong>${parked}</strong> в парковке</span><span><strong>${rejected}</strong> отсеяно</span>`;
}

function candidateCard(candidate) {
  const testabilityClass = testabilityClasses[candidate.testability] || "blocked";
  return `<article class="candidate-card stage-${candidate.stage}">
    <div class="candidate-rank">${escapeHtml(candidate.id)}</div>
    <div class="candidate-main">
      <div class="candidate-title-row">
        <div>
          <div class="badge-row">
            <span class="badge stage-badge">${escapeHtml(candidate.stageLabel)}</span>
            <span class="badge testability ${testabilityClass}">${escapeHtml(candidate.testabilityLabel)}</span>
          </div>
          <h3>${escapeHtml(candidate.title)}</h3>
        </div>
        <a class="icon-link" href="${projectSourceHref(candidate.source)}" target="_blank" rel="noreferrer" aria-label="Открыть исследование: ${escapeHtml(candidate.title)}">↗</a>
      </div>
      <div class="candidate-facts">
        <div><span>Кто платит</span><strong>${escapeHtml(candidate.payer)}</strong></div>
        <div><span>Модель денег</span><strong>${escapeHtml(candidate.moneyModel)}</strong></div>
      </div>
      <div class="candidate-bottom">
        <div class="risk-copy"><span>Главный риск</span><p>${escapeHtml(candidate.risk)}</p></div>
        <div class="gate-copy"><span>Следующий gate</span><p>${escapeHtml(candidate.nextGate)}</p></div>
      </div>
    </div>
    <div class="candidate-scores" aria-label="Оценки кандидата">
      <div><span>Рынок</span><strong class="score-${scoreTone(candidate.marketOpportunityScore)}">${candidate.marketOpportunityScore}</strong></div>
      <div><span>Ставка</span><strong class="score-${scoreTone(candidate.executionPriorityScore)}">${candidate.executionPriorityScore}</strong></div>
      <div><span>Доверие</span><strong>${Math.round(candidate.evidenceConfidence * 100)}%</strong></div>
      <small>${escapeHtml(candidate.evidenceLabel)}</small>
    </div>
  </article>`;
}

function renderCandidates() {
  const candidates = [...appState.factory.candidates].sort((a, b) => candidateStageOrder[a.stage] - candidateStageOrder[b.stage]);
  for (const stage of ["all", "finalist", "reserve", "parked", "rejected"]) {
    const count = stage === "all" ? candidates.length : candidates.filter((item) => item.stage === stage).length;
    document.querySelector(`#count-${stage}`).textContent = count;
  }
  const visible = appState.candidateFilter === "all" ? candidates : candidates.filter((item) => item.stage === appState.candidateFilter);
  document.querySelector("#candidate-list").innerHTML = visible.map(candidateCard).join("");
  document.querySelector("#candidate-empty").hidden = visible.length !== 0;
}

function renderRuns() {
  document.querySelector("#run-list").innerHTML = appState.factory.runs
    .map((run) => `<article class="run-item">
      <div class="run-status-dot ${run.status}" aria-hidden="true"></div>
      <div>
        <div class="run-title-row"><h3>${escapeHtml(run.title)}</h3><span class="badge">${escapeHtml(run.statusLabel)}</span></div>
        <p>${escapeHtml(run.result)}</p>
        <div class="run-meta"><span>${escapeHtml(run.evidenceLevel)} · ${formatDate(run.updatedAt)}</span><a href="${projectSourceHref(run.source)}" target="_blank" rel="noreferrer">Открыть источник ↗</a></div>
      </div>
    </article>`)
    .join("");
}

function renderPortfolioTable() {
  const source = appState.portfolioView;
  const table = appState.portfolio[source];
  const columns = portfolioColumns[source];
  const head = document.querySelector("#portfolio-head");
  const body = document.querySelector("#portfolio-body");
  head.innerHTML = `<tr>${columns.map((header) => `<th>${escapeHtml(header)}</th>`).join("")}<th><span class="visually-hidden">Открыть</span></th></tr>`;
  body.innerHTML = table.rows
    .map((row, index) => {
      const selected = appState.selectedPortfolio.source === source && appState.selectedPortfolio.index === index;
      const cells = columns.map((header) => {
        const value = getRowValue(table, row, header);
        const score = ["Рыночная возможность", "Приоритет ставки", "Рынок", "Экономика"].includes(header);
        return `<td class="${score ? "numeric" : ""}">${score ? `<strong class="score-${scoreTone(value)}">${escapeHtml(value)}</strong>` : escapeHtml(value)}</td>`;
      }).join("");
      return `<tr class="${selected ? "selected" : ""}">${cells}<td><button class="row-open" type="button" data-index="${index}" aria-label="Открыть детали строки ${index + 1}">Подробнее</button></td></tr>`;
    })
    .join("");
  body.querySelectorAll(".row-open").forEach((button) => {
    button.addEventListener("click", () => {
      appState.selectedPortfolio = { source, index: Number(button.dataset.index) };
      renderPortfolioTable();
      renderPortfolioDetail();
    });
  });
}

function renderPortfolioDetail() {
  const source = appState.selectedPortfolio.source;
  const table = appState.portfolio[source];
  const row = table.rows[appState.selectedPortfolio.index];
  const container = document.querySelector("#portfolio-detail");
  if (!row) {
    container.innerHTML = "<p>Нет данных для выбранного представления.</p>";
    return;
  }
  const nameHeader = table.headers.includes("Ниша / референс") ? "Ниша / референс" : "Ниша";
  const name = getRowValue(table, row, nameHeader);
  const marketRow = findRowByName(appState.portfolio.market, name);
  const queueRow = findRowByName(appState.portfolio.queue, name);
  const summary = appState.summariesByNiche[canonicalName(name)] || "Карточка содержит подробную оценку и доказательства по объекту.";
  const evidence = marketRow ? getRowValue(appState.portfolio.market, marketRow, "Сильнейшее доказательство") : "—";
  const risk = queueRow ? getRowValue(appState.portfolio.queue, queueRow, "Главный риск") : getRowValue(appState.portfolio.market, marketRow || [], "Вывод");
  const next = queueRow ? getRowValue(appState.portfolio.queue, queueRow, "Следующий шаг") : "Сначала определить наш сегмент, оффер и канал.";
  const criteria = appState.criteriaByNiche[canonicalName(name)] || [];
  container.innerHTML = `<div class="portfolio-detail-head"><div><span>Выбранный объект</span><h3>${escapeHtml(name)}</h3></div><span class="badge">${source === "queue" ? "Наша ставка" : "Рынок / референс"}</span></div>
    <p>${escapeHtml(summary)}</p>
    <div class="detail-grid">
      <div><span>Сильнейшее доказательство</span><p>${escapeHtml(evidence)}</p></div>
      <div><span>Главный риск / вывод</span><p>${escapeHtml(risk)}</p></div>
      <div><span>Следующий шаг</span><p>${escapeHtml(next)}</p></div>
    </div>
    ${criteria.length ? `<details class="criteria-details"><summary>Показать ${criteria.length} детальных критериев</summary><div class="criteria-table-wrap"><table><thead><tr><th>Критерий</th><th>Балл</th><th>Статус</th><th>Вывод</th></tr></thead><tbody>${criteria.map((item) => `<tr><td>${escapeHtml(item.title)}</td><td><strong>${escapeHtml(item.points)}</strong></td><td>${escapeHtml(evidenceStatusLabels[item.status] || item.status)}</td><td>${escapeHtml(item.conclusion)}</td></tr>`).join("")}</tbody></table></div></details>` : ""}`;
}

function renderMethodology(criteria) {
  document.querySelector("#metric-list").innerHTML = metricDescriptions.map(([title, text]) => `<article><strong>${escapeHtml(title)}</strong><p>${escapeHtml(text)}</p></article>`).join("");
  document.querySelector("#criteria-grid").innerHTML = criteria.map((item) => `<article><div><h3>${escapeHtml(item.title)}</h3><span>${escapeHtml(item.points)}</span></div><p>${escapeHtml(item.description)}</p></article>`).join("");
}

function bindControls() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      appState.candidateFilter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderCandidates();
    });
  });
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      appState.portfolioView = button.dataset.portfolio;
      appState.selectedPortfolio = { source: appState.portfolioView, index: 0 };
      document.querySelectorAll(".tab-button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-selected", String(active));
      });
      renderPortfolioTable();
      renderPortfolioDetail();
    });
  });
}

async function loadText(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  return response.text();
}

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  return response.json();
}

async function init() {
  try {
    const [factory, hitParade, scoring, inventory] = await Promise.all([
      loadJson(FACTORY_STATE_PATH),
      loadText(HIT_PARADE_PATH),
      loadText(SCORING_PATH),
      loadText(NICHE_CARD_INDEX_PATH),
    ]);
    const nicheIndex = parseCardInventory(inventory);
    const cards = await Promise.all(nicheIndex.map((item) => loadText(item.path)));
    appState.factory = factory;
    appState.portfolio.market = parseTable(hitParade, "Место на карте");
    appState.portfolio.queue = parseTable(hitParade, "Приоритет");
    appState.criteriaByNiche = Object.fromEntries(nicheIndex.map((item, index) => [canonicalName(item.name), parseNicheCriteria(cards[index])]));
    appState.summariesByNiche = Object.fromEntries(nicheIndex.map((item, index) => [canonicalName(item.name), parseOneLiner(cards[index])]));
    const criteria = parseCriteria(scoring);
    if (!factory.candidates?.length || !appState.portfolio.market.rows.length || !appState.portfolio.queue.rows.length || !criteria.length) {
      throw new Error("Один из источников не содержит обязательных данных");
    }

    renderCheckpoint();
    renderFunnel();
    renderCandidates();
    renderRuns();
    renderPortfolioTable();
    renderPortfolioDetail();
    renderMethodology(criteria);
    bindControls();
    setStatus("Данные актуальны", "ok");
  } catch (error) {
    setStatus("Ошибка данных", "error");
    const message = document.querySelector("#error-message");
    message.hidden = false;
    message.textContent = `${error.message}. Открой dashboard через локальный сервер, а не через file://.`;
  }
}

init();
