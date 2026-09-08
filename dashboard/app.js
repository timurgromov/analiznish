const HIT_PARADE_PATH = "../data/HIT_PARADE.md";
const SCORING_PATH = "../docs/SCORING_MODEL.md";

const nicheCardPaths = {
  "Радарыч": "../data/niches/2026-07-01-travel-radar.md",
  "КАДРА": "../data/niches/2026-07-21-kadra-ai-photo.md",
  "Timur Gromov Business System": "../data/niches/2026-07-01-timur-gromov-business-system.md",
  "PastLife AI / Sansara": "../data/niches/2026-07-01-pastlife-ai-sansara.md",
  "Rule24 для психологов": "../data/niches/2026-07-03-rule24-psychologists.md",
  "ProfiWatcher для Profi.ru": "../data/niches/2026-07-05-profiwatcher-profi-ru.md",
  "Ассистент по женскому циклу": "../data/niches/2026-07-05-ai-cycle-assistant.md",
  "Авто SEO/CPA / Российский Союз Автомобилистов": "../data/niches/2026-07-23-auto-seo-cpa-leadgen.md",
  "LegalTech-документы для развода / OnSud": "../data/niches/2026-07-23-onsud-divorce-documents.md",
};

const metricDescriptions = [
  {
    title: "Рыночная возможность",
    text: "Показывает силу категории и модели денег: 60% рынка и 40% экономики. Не учитывает наш готовый код или личный фокус.",
  },
  {
    title: "Приоритет ставки",
    text: "Показывает, во что из наших определённых моделей разумно вложить ближайшие 7–14 дней. Чужому референсу не присваивается.",
  },
  {
    title: "Рынок",
    text: "Есть ли большой сформированный рынок: размер, рост, спрос, конкуренция, референс и понятный сегмент.",
  },
  {
    title: "Экономика",
    text: "Может ли модель зарабатывать: LTV, повторные продажи, маржа, cash cycle и деньги на рост.",
  },
  {
    title: "Защита и масштаб",
    text: "Сложно ли скопировать модель и можно ли масштабировать её через процессы, активы, делегирование и канал роста.",
  },
  {
    title: "Личный фильтр",
    text: "Подходит ли ставка сейчас: быстрые деньги, свобода, финансовая устойчивость и фокус без распыления.",
  },
  {
    title: "Доверие",
    text: "Качество доказательств. Оно видно рядом с рыночной возможностью и уменьшает только приоритет конкретной ставки.",
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
  market: { headers: [], rows: [] },
  queue: { headers: [], rows: [] },
  selected: { source: "market", index: 0 },
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

function parseTable(markdown, firstHeader) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trim().startsWith(`| ${firstHeader} |`));
  if (start === -1) return { headers: [], rows: [] };

  const tableLines = [];
  for (let index = start; index < lines.length; index += 1) {
    if (!lines[index].trim().startsWith("|")) break;
    tableLines.push(lines[index]);
  }

  return {
    headers: splitMarkdownRow(tableLines[0]),
    rows: tableLines.slice(2).map((line) => splitMarkdownRow(line)),
  };
}

function parseCriteria(markdown) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trim() === "| Критерий | Баллы | Как оценивать |");
  if (start === -1) return [];

  const rows = [];
  for (let index = start + 2; index < lines.length; index += 1) {
    const line = lines[index].trim();
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
  for (let index = start + 2; index < lines.length; index += 1) {
    const line = lines[index].trim();
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
  for (let index = heading + 1; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (line.startsWith("## ")) break;
    if (!line) {
      if (parts.length) break;
      continue;
    }
    parts.push(line);
  }
  return parts.join(" ");
}

function parseScore(value) {
  return Number.parseFloat(String(value).replace(",", "."));
}

function scoreClass(value) {
  const number = parseScore(value);
  if (number >= 65) return "strong";
  if (number >= 50) return "medium";
  return "weak";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function canonicalName(value) {
  return String(value).replace(/[«»]/g, "").trim();
}

function getRowValue(table, row, header) {
  const index = table.headers.indexOf(header);
  return index === -1 ? "" : row[index] || "";
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

function scoreCell(value) {
  const number = parseScore(value);
  if (Number.isNaN(number)) return escapeHtml(value || "—");
  const width = Math.max(0, Math.min(100, number));
  return `
    <div class="score-number"><span>${escapeHtml(value)}</span></div>
    <div class="bar" aria-hidden="true"><span class="${scoreClass(number)}" style="width: ${width}%"></span></div>
  `;
}

function columnClass(header) {
  if (["Рыночная возможность", "Приоритет ставки", "Рынок", "Экономика", "Защита и масштаб", "Личный фильтр"].includes(header)) return "score-cell";
  if (["Место на карте", "Приоритет"].includes(header)) return "rank";
  if (["Ниша / референс", "Ниша"].includes(header)) return "name-cell";
  if (header === "Тип объекта") return "type-cell compact-text";
  if (header === "Доверие") return "confidence-cell";
  if (["Сильнейшее доказательство", "Вывод", "Решение", "Главный риск", "Следующий шаг"].includes(header)) return "long-text compact-text";
  if (header === "Пересмотр") return "date-cell";
  return "compact-text";
}

function renderTable(source, headSelector, bodySelector) {
  const table = state[source];
  const head = document.querySelector(headSelector);
  const body = document.querySelector(bodySelector);
  const scoreHeaders = ["Рыночная возможность", "Приоритет ставки", "Рынок", "Экономика", "Защита и масштаб", "Личный фильтр"];

  head.innerHTML = `<tr>${table.headers
    .map((header) => `<th class="${columnClass(header)}">${labelWithHelp(header)}</th>`)
    .join("")}</tr>`;

  body.innerHTML = table.rows
    .map((row, index) => {
      const active = state.selected.source === source && state.selected.index === index ? "active" : "";
      const cells = table.headers
        .map((header, cellIndex) => {
          const cell = row[cellIndex] || "";
          const content = scoreHeaders.includes(header) ? scoreCell(cell) : escapeHtml(cell);
          return `<td class="${columnClass(header)}" title="${escapeHtml(cell)}">${content}</td>`;
        })
        .join("");
      return `<tr class="${active}" data-index="${index}">${cells}</tr>`;
    })
    .join("");

  body.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", () => {
      state.selected = { source, index: Number(row.dataset.index) };
      renderTable("market", "#market-head", "#market-body");
      renderTable("queue", "#queue-head", "#queue-body");
      renderSelected();
    });
  });
}

function findRowByName(table, name) {
  const nameHeader = table.headers.includes("Ниша / референс") ? "Ниша / референс" : "Ниша";
  return table.rows.find((row) => canonicalName(getRowValue(table, row, nameHeader)) === canonicalName(name));
}

function renderSelectedCriteria(name) {
  const criteria = state.criteriaByNiche[canonicalName(name)] || [];
  if (!criteria.length) {
    return '<div class="selected-criteria-empty">По этой нише пока нет карточки с детальными критериями.</div>';
  }

  return `
    <div class="selected-criteria">
      <h4>Детальные критерии</h4>
      <p>Это расшифровка базовых блоков выбранного объекта. Рыночная возможность и приоритет ставки строятся уже поверх них.</p>
      <div class="selected-criteria-wrap">
        <table>
          <thead><tr><th>Критерий</th><th>Балл</th><th>Статус</th><th>Вывод</th></tr></thead>
          <tbody>
            ${criteria
              .map(
                (item) => `
                  <tr>
                    <td>${escapeHtml(item.title)}</td>
                    <td><strong>${escapeHtml(item.points)}</strong></td>
                    <td>${escapeHtml(evidenceStatusLabels[item.status] || item.status)}</td>
                    <td>${escapeHtml(item.conclusion)}</td>
                  </tr>`,
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
  const selectedTable = state[state.selected.source];
  const selectedRow = selectedTable.rows[state.selected.index];
  if (!selectedRow) {
    container.className = "selected-empty";
    container.textContent = "Выбери строку в таблице, чтобы увидеть расшифровку.";
    return;
  }

  const selectedNameHeader = selectedTable.headers.includes("Ниша / референс") ? "Ниша / референс" : "Ниша";
  const name = getRowValue(selectedTable, selectedRow, selectedNameHeader);
  const marketRow = findRowByName(state.market, name);
  const queueRow = findRowByName(state.queue, name);
  const type = getRowValue(state.market, marketRow || [], "Тип объекта") || getRowValue(state.queue, queueRow || [], "Тип объекта");
  const summary = state.summariesByNiche[canonicalName(name)] || "";
  const opportunity = marketRow ? getRowValue(state.market, marketRow, "Рыночная возможность") : "—";
  const priority = queueRow ? getRowValue(state.queue, queueRow, "Приоритет ставки") : "—";
  const market = marketRow ? getRowValue(state.market, marketRow, "Рынок") : "—";
  const economics = marketRow ? getRowValue(state.market, marketRow, "Экономика") : queueRow ? getRowValue(state.queue, queueRow, "Экономика") : "—";
  const confidence = marketRow ? getRowValue(state.market, marketRow, "Доверие") : queueRow ? getRowValue(state.queue, queueRow, "Доверие") : "—";
  const evidence = marketRow ? getRowValue(state.market, marketRow, "Сильнейшее доказательство") : "";
  const marketConclusion = marketRow ? getRowValue(state.market, marketRow, "Вывод") : "";
  const decision = queueRow ? getRowValue(state.queue, queueRow, "Решение") : "Это рыночный референс: приоритет нашей ставки не рассчитывается, пока не определены наш сегмент, оффер и канал.";
  const risk = queueRow ? getRowValue(state.queue, queueRow, "Главный риск") : marketConclusion;
  const next = queueRow ? getRowValue(state.queue, queueRow, "Следующий шаг") : "Если рассматривать вход, сначала выбрать одну вертикаль, плательщика, оффер и первый канал.";

  container.className = "";
  container.innerHTML = `
    <p class="selection-context">Открыто из: ${state.selected.source === "market" ? "карты рынков и референсов" : "очереди конкретных ставок"}</p>
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(summary)}</p>
    <div class="description-block"><strong>Тип объекта</strong><span>${escapeHtml(type)}</span></div>
    <div class="selected-grid">
      <div><span>${labelWithHelp("Рыночная возможность")}</span><strong>${escapeHtml(opportunity)}</strong></div>
      <div><span>${labelWithHelp("Приоритет ставки")}</span><strong>${escapeHtml(priority)}</strong></div>
      <div><span>${labelWithHelp("Рынок")}</span><strong>${escapeHtml(market)}</strong></div>
      <div><span>${labelWithHelp("Экономика")}</span><strong>${escapeHtml(economics)}</strong></div>
      <div><span>${labelWithHelp("Доверие")}</span><strong>${escapeHtml(confidence)}</strong></div>
    </div>
    <div class="evidence-block"><strong>Сильнейшее доказательство</strong>${escapeHtml(evidence)}</div>
    <div class="risk-block">
      <div><strong>Решение</strong>${escapeHtml(decision)}</div>
      <div><strong>Главный риск / вывод</strong>${escapeHtml(risk)}</div>
      <div><strong>Следующий шаг</strong>${escapeHtml(next)}</div>
    </div>
    ${renderSelectedCriteria(name)}
  `;
}

function renderMetrics() {
  document.querySelector("#metric-list").innerHTML = metricDescriptions
    .map((item) => `<article class="metric-item"><strong>${item.title}</strong><p>${item.text}</p></article>`)
    .join("");
}

function renderCriteria(criteria) {
  document.querySelector("#criteria-grid").innerHTML = criteria
    .map((item) => `<article class="criterion"><h3>${item.title}</h3><span class="points">${item.points}</span><p>${item.description}</p></article>`)
    .join("");
}

function setStatus(text, type = "") {
  const status = document.querySelector("#data-status");
  status.textContent = text;
  status.className = `status ${type}`.trim();
}

async function loadText(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Не удалось загрузить ${path}: ${response.status}`);
  return response.text();
}

async function init() {
  try {
    const [hitParade, scoring, ...nicheCards] = await Promise.all([
      loadText(HIT_PARADE_PATH),
      loadText(SCORING_PATH),
      ...Object.values(nicheCardPaths).map((path) => loadText(path)),
    ]);
    state.market = parseTable(hitParade, "Место на карте");
    state.queue = parseTable(hitParade, "Приоритет");
    state.criteriaByNiche = Object.fromEntries(
      Object.keys(nicheCardPaths).map((name, index) => [canonicalName(name), parseNicheCriteria(nicheCards[index])]),
    );
    state.summariesByNiche = Object.fromEntries(
      Object.keys(nicheCardPaths).map((name, index) => [canonicalName(name), parseOneLiner(nicheCards[index])]),
    );

    if (!state.market.rows.length || !state.queue.rows.length) {
      throw new Error("В data/HIT_PARADE.md не найдены обе таблицы портфеля.");
    }
    const criteria = parseCriteria(scoring);
    if (!criteria.length) throw new Error("В docs/SCORING_MODEL.md не найдена таблица критериев.");

    renderTable("market", "#market-head", "#market-body");
    renderTable("queue", "#queue-head", "#queue-body");
    renderSelected();
    renderMetrics();
    renderCriteria(criteria);
    setStatus("Данные загружены", "ok");
  } catch (error) {
    setStatus("Ошибка данных", "error");
    document.querySelector(".layout").insertAdjacentHTML(
      "afterbegin",
      `<div class="error-message">${escapeHtml(error.message)}. Открой dashboard через локальный сервер, а не через file://.</div>`,
    );
    renderMetrics();
  }
}

init();
