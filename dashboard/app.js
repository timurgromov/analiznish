const HIT_PARADE_PATH = "../data/HIT_PARADE.md";
const SCORING_PATH = "../docs/SCORING_MODEL.md";

const nicheCardPaths = {
  "Travel Radar": "../data/niches/2026-07-01-travel-radar.md",
  "Timur Gromov Business System": "../data/niches/2026-07-01-timur-gromov-business-system.md",
  "PastLife AI / Sansara": "../data/niches/2026-07-01-pastlife-ai-sansara.md",
  "Rule24 для психологов": "../data/niches/2026-07-03-rule24-psychologists.md",
  "ProfiWatcher для Profi.ru": "../data/niches/2026-07-05-profiwatcher-profi-ru.md",
  "Ассистент по женскому циклу": "../data/niches/2026-07-05-ai-cycle-assistant.md",
  "AI-фотосессии / Фотушка": "../data/niches/2026-07-16-ai-photo-sessions-fotushka.md",
};

const metricDescriptions = [
  {
    title: "Итог",
    text: "Финальный балл: базовый балл, умноженный на доверие к данным.",
  },
  {
    title: "Рынок",
    text: "Проверяет, есть ли большой сформированный рынок: размер, рост, горячий спрос, конкуренция, референс и один понятный сегмент.",
  },
  {
    title: "Экономика",
    text: "Проверяет, может ли модель зарабатывать нормально: LTV, повторные продажи, X4/маржа, cash cycle и деньги на реинвестирование.",
  },
  {
    title: "Защита и масштаб",
    text: "Проверяет, сложно ли бизнес копировать и можно ли масштабировать его через процессы, активы, делегирование и канал роста.",
  },
  {
    title: "Личный фильтр",
    text: "Проверяет, подходит ли идея тебе сейчас: быстрые деньги, свобода, финансовая устойчивость и фокус без распыления.",
  },
  {
    title: "Доверие",
    text: "Множитель качества доказательств. Непроверенная красивая идея режется сильнее, чем скучная ниша с фактами, конкурентами и понятной экономикой.",
  },
  {
    title: "Базовый балл",
    text: "Оценка модели по рынку, экономике, защите/масштабу и личному фильтру до поправки на доверие.",
  },
];

const metricHelp = Object.fromEntries(metricDescriptions.map((item) => [item.title, item.text]));

const evidenceStatusLabels = {
  verified: "проверено",
  supported: "косвенно подтверждено",
  estimated: "оценочно",
  unverified: "не проверено",
};

const state = {
  rows: [],
  headers: [],
  selectedIndex: 0,
  criteriaByNiche: {},
  summariesByNiche: {},
};

function splitMarkdownRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseFirstTable(markdown) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trim().startsWith("| Место |"));
  if (start === -1) return { headers: [], rows: [] };

  const tableLines = [];
  for (let i = start; i < lines.length; i += 1) {
    if (!lines[i].trim().startsWith("|")) break;
    tableLines.push(lines[i]);
  }

  const headers = splitMarkdownRow(tableLines[0]);
  const rows = tableLines.slice(2).map((line) => splitMarkdownRow(line));
  return { headers, rows };
}

function parseCriteria(markdown) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trim() === "| Критерий | Баллы | Как оценивать |");
  if (start === -1) return [];

  const rows = [];
  for (let i = start + 2; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line.startsWith("|")) break;
    const [title, points, description] = splitMarkdownRow(line);
    rows.push({ title, points, description });
  }
  return rows;
}

function parseNicheCriteria(markdown) {
  const lines = markdown.split("\n");
  const heading = lines.findIndex((line) => ["## Детальные критерии", "## Нишевой балл"].includes(line.trim()));
  if (heading === -1) return [];

  const start = lines.findIndex((line, index) => index > heading && line.trim().startsWith("| Критерий | Балл |"));
  if (start === -1) return [];

  const rows = [];
  for (let i = start + 2; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!line.startsWith("|")) break;
    const [title, points, status, conclusion] = splitMarkdownRow(line);
    if (!title || title.startsWith("**")) continue;
    rows.push({ title, points, status, conclusion });
  }
  return rows;
}

function parseOneLiner(markdown) {
  const lines = markdown.split("\n");
  const heading = lines.findIndex((line) => line.trim() === "## One-liner");
  if (heading === -1) return "";

  const parts = [];
  for (let i = heading + 1; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.startsWith("## ")) break;
    if (!line) {
      if (parts.length) break;
      continue;
    }
    parts.push(line);
  }
  return parts.join(" ");
}

function extractFormula(markdown) {
  const match = markdown.match(/overall_score\s*=\s*([^\n]+)/);
  if (!match) return "";
  return "Итог = Базовый балл × Доверие. Базовый балл = Рынок 35% + Экономика 25% + Защита и масштаб 20% + Личный фильтр 20%.";
}

function scoreClass(value) {
  const number = Number.parseFloat(String(value).replace(",", "."));
  if (number >= 65) return "strong";
  if (number >= 50) return "medium";
  return "weak";
}

function parseScore(value) {
  return Number.parseFloat(String(value).replace(",", "."));
}

function helpIcon(key) {
  const text = metricHelp[key];
  if (!text) return "";
  return `
    <span class="help-icon" tabindex="0" aria-label="${escapeHtml(text)}">
      ?
      <span class="help-tooltip">${escapeHtml(text)}</span>
    </span>
  `;
}

function labelWithHelp(label, key = label) {
  return `<span class="label-with-help">${escapeHtml(label)}${helpIcon(key)}</span>`;
}

function scoreCell(value, note = "", noteHelpKey = "") {
  const number = parseScore(value);
  if (Number.isNaN(number)) return value;
  const width = Math.max(0, Math.min(100, number));
  const klass = scoreClass(number);
  return `
    <div class="score-number">
      <span>${value}</span>
      ${note ? `<small>${escapeHtml(note)}${helpIcon(noteHelpKey)}</small>` : ""}
    </div>
    <div class="bar" aria-hidden="true"><span class="${klass}" style="width: ${width}%"></span></div>
  `;
}

function getRowValue(row, header) {
  const index = state.headers.indexOf(header);
  return index === -1 ? "" : row[index];
}

function calculatePotential(row) {
  const market = parseScore(getRowValue(row, "Рынок"));
  const economics = parseScore(getRowValue(row, "Экономика"));
  const moatScale = parseScore(getRowValue(row, "Защита и масштаб"));
  const personal = parseScore(getRowValue(row, "Личный фильтр"));
  if ([market, economics, moatScale, personal].some(Number.isNaN)) return null;
  return Math.round(0.35 * market + 0.25 * economics + 0.2 * moatScale + 0.2 * personal);
}

function columnClass(header) {
  if (["Итог", "Рынок", "Экономика", "Защита и масштаб", "Личный фильтр"].includes(header)) return "score-cell";
  if (header === "Место") return "rank";
  if (header === "Ниша") return "name-cell";
  if (header === "Модель") return "model-cell compact-text";
  if (header === "Доверие") return "confidence-cell";
  if (header === "Вердикт") return "verdict-cell compact-text";
  if (["Главный риск", "Следующий шаг"].includes(header)) return "long-text compact-text";
  if (header === "Пересмотр") return "date-cell";
  return "compact-text";
}

function renderHitParade(headers, rows) {
  const head = document.querySelector("#hit-head");
  const body = document.querySelector("#hit-body");

  head.innerHTML = `<tr>${headers
    .map((header) => `<th class="${columnClass(header)}">${labelWithHelp(header)}</th>`)
    .join("")}</tr>`;
  body.innerHTML = rows
    .map((row, index) => {
      const cells = headers
        .map((header, cellIndex) => {
          const cell = row[cellIndex] || "";
          const className = columnClass(header);
          let content = cell;
          if (header === "Итог") {
            const potential = calculatePotential(row);
            content = scoreCell(cell, potential === null ? "" : `база ${potential}`);
          } else if (["Рынок", "Экономика", "Защита и масштаб", "Личный фильтр"].includes(header)) {
            content = scoreCell(cell);
          }
          if (header === "Вердикт") {
            content = `<span class="verdict">${cell}</span>`;
          }
          return `<td class="${className}" title="${escapeHtml(cell)}">${content}</td>`;
        })
        .join("");
      const active = index === state.selectedIndex ? "active" : "";
      return `<tr class="${active}" data-index="${index}">${cells}</tr>`;
    })
    .join("");

  body.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedIndex = Number(row.dataset.index);
      renderHitParade(state.headers, state.rows);
      renderSelected();
    });
  });
}

function getValue(row, header) {
  return getRowValue(row, header);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function translateEvidenceStatus(value) {
  return evidenceStatusLabels[value] || value;
}

function renderSelectedCriteria(name) {
  const criteria = state.criteriaByNiche[name] || [];
  if (!criteria.length) {
    return `
      <div class="selected-criteria-empty">
        По этой нише пока нет карточки с детальными критериями.
      </div>
    `;
  }

  return `
    <div class="selected-criteria">
      <h4>Детальные критерии</h4>
      <p>Это конкретная расшифровка выбранной ниши. Эти критерии потом собираются в блоки: рынок, экономика, защита/масштаб и личный фильтр.</p>
      <div class="selected-criteria-wrap">
        <table>
          <thead>
            <tr>
              <th>Критерий</th>
              <th>Балл</th>
              <th>Статус</th>
              <th>Вывод</th>
            </tr>
          </thead>
          <tbody>
            ${criteria
              .map(
                (item) => `
                  <tr>
                    <td>${escapeHtml(item.title)}</td>
                    <td><strong>${escapeHtml(item.points)}</strong></td>
                    <td>${escapeHtml(translateEvidenceStatus(item.status))}</td>
                    <td>${escapeHtml(item.conclusion)}</td>
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSelected() {
  const container = document.querySelector("#selected-niche");
  const row = state.rows[state.selectedIndex];
  if (!row) {
    container.className = "selected-empty";
    container.textContent = "Выбери строку в хит-параде, чтобы увидеть расшифровку.";
    return;
  }

  const name = getValue(row, "Ниша");
  const model = getValue(row, "Модель");
  const risk = getValue(row, "Главный риск");
  const next = getValue(row, "Следующий шаг");
  const summary = state.summariesByNiche[name] || model;
  const potential = calculatePotential(row);

  container.className = "";
  container.innerHTML = `
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(model)}</p>
    <div class="description-block">
      <strong>Коротко о бизнесе</strong>
      <span>${escapeHtml(summary)}</span>
    </div>
    <div class="selected-grid">
      <div><span>${labelWithHelp("Итог")}</span><strong>${getValue(row, "Итог")}</strong></div>
      <div><span>${labelWithHelp("Базовый балл")}</span><strong>${potential === null ? "—" : potential}</strong></div>
      <div><span>${labelWithHelp("Рынок")}</span><strong>${getValue(row, "Рынок")}</strong></div>
      <div><span>${labelWithHelp("Экономика")}</span><strong>${getValue(row, "Экономика")}</strong></div>
      <div><span>${labelWithHelp("Защита и масштаб")}</span><strong>${getValue(row, "Защита и масштаб")}</strong></div>
      <div><span>${labelWithHelp("Личный фильтр")}</span><strong>${getValue(row, "Личный фильтр")}</strong></div>
      <div><span>${labelWithHelp("Доверие")}</span><strong>${getValue(row, "Доверие")}</strong></div>
    </div>
    <div class="risk-block">
      <div><strong>Главный риск</strong>${escapeHtml(risk)}</div>
      <div><strong>Следующий шаг</strong>${escapeHtml(next)}</div>
    </div>
    ${renderSelectedCriteria(name)}
  `;
}

function renderMetrics() {
  const container = document.querySelector("#metric-list");
  container.innerHTML = metricDescriptions
    .map(
      (item) => `
        <article class="metric-item">
          <strong>${item.title}</strong>
          <p>${item.text}</p>
        </article>
      `,
    )
    .join("");
}

function renderCriteria(criteria) {
  const container = document.querySelector("#criteria-grid");
  container.innerHTML = criteria
    .map(
      (item) => `
        <article class="criterion">
          <h3>${item.title}</h3>
          <span class="points">${item.points}</span>
          <p>${item.description}</p>
        </article>
      `,
    )
    .join("");
}

function setStatus(text, type = "") {
  const status = document.querySelector("#data-status");
  status.textContent = text;
  status.className = `status ${type}`.trim();
}

async function loadText(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  }
  return response.text();
}

async function init() {
  try {
    const [hitParade, scoring, ...nicheCards] = await Promise.all([
      loadText(HIT_PARADE_PATH),
      loadText(SCORING_PATH),
      ...Object.values(nicheCardPaths).map((path) => loadText(path)),
    ]);
    const parsed = parseFirstTable(hitParade);
    const criteria = parseCriteria(scoring);
    const formula = extractFormula(scoring);
    state.criteriaByNiche = Object.fromEntries(
      Object.keys(nicheCardPaths).map((name, index) => [name, parseNicheCriteria(nicheCards[index])]),
    );
    state.summariesByNiche = Object.fromEntries(
      Object.keys(nicheCardPaths).map((name, index) => [name, parseOneLiner(nicheCards[index])]),
    );

    if (!parsed.rows.length) throw new Error("В data/HIT_PARADE.md не найдена таблица рейтинга.");
    if (!criteria.length) throw new Error("В docs/SCORING_MODEL.md не найдена таблица критериев.");

    state.headers = parsed.headers;
    state.rows = parsed.rows;

    document.querySelector("#formula-text").textContent = formula || document.querySelector("#formula-text").textContent;
    renderHitParade(state.headers, state.rows);
    renderSelected();
    renderMetrics();
    renderCriteria(criteria);
    setStatus("Данные загружены", "ok");
  } catch (error) {
    setStatus("Ошибка данных", "error");
    document.querySelector(".layout").insertAdjacentHTML(
      "afterbegin",
      `<div class="error-message">${error.message}. Открой dashboard через локальный сервер, а не через file://.</div>`,
    );
    renderMetrics();
  }
}

init();
