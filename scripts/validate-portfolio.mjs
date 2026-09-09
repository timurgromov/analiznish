import fs from "node:fs";

const cardInventory = fs.readFileSync("data/niches/INDEX.md", "utf8");

const marketCriteria = [
  "Сформированный рынок",
  "Размер рынка",
  "Рост рынка / тренд",
  "Горячий спрос",
  "Конкуренция",
  "Референс / готовая модель",
  "Одна проблема / один сегмент",
];
const economicsCriteria = [
  "Повторные продажи / LTV",
  "Наценка X4 / маржинальность",
  "Cash cycle",
  "Реинвестиционный потенциал",
];
const moatCriteria = ["Защита от копирования", "Операционная масштабируемость", "Канал роста"];
const personalCriteria = ["Быстрые деньги", "Свобода", "Финансовая устойчивость", "Фокус"];

function splitRow(line) {
  return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function canonical(value) {
  return String(value).replace(/[«»]/g, "").trim();
}

function parseNumber(value) {
  const match = String(value).replace(",", ".").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : Number.NaN;
}

function parseTable(markdown, firstHeader, secondHeader = null) {
  const lines = markdown.split("\n");
  const prefix = secondHeader ? `| ${firstHeader} | ${secondHeader} |` : `| ${firstHeader} |`;
  const start = lines.findIndex((line) => line.trim().startsWith(prefix));
  if (start === -1) throw new Error(`Не найдена таблица с первым столбцом «${firstHeader}»`);
  const rows = [];
  for (let index = start; index < lines.length && lines[index].trim().startsWith("|"); index += 1) {
    rows.push(splitRow(lines[index]));
  }
  return { headers: rows[0], rows: rows.slice(2) };
}

const cards = parseTable(cardInventory, "Ниша", "Путь").rows.map((row) => [row[0], row[1], row[2]]);

function rowMap(table) {
  return new Map(table.rows.map((row) => [canonical(row[0]), row]));
}

function cell(table, row, header) {
  const index = table.headers.indexOf(header);
  if (index === -1) throw new Error(`Нет столбца «${header}»`);
  return row[index];
}

function scoreFromCriteria(criteria, titles, denominator) {
  const rows = rowMap(criteria);
  const sum = titles.reduce((total, title) => {
    const row = rows.get(canonical(title));
    if (!row) throw new Error(`Нет критерия «${title}»`);
    const value = parseNumber(row[1]);
    if (Number.isNaN(value)) throw new Error(`Критерий «${title}» не имеет числового балла`);
    return total + value;
  }, 0);
  return Math.round((100 * sum) / denominator);
}

function findScoreRow(scores, prefix) {
  const row = scores.rows.find((candidate) => canonical(candidate[0]).startsWith(canonical(prefix)));
  if (!row) throw new Error(`Нет score-строки «${prefix}»`);
  return row;
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label}: ожидалось ${expected}, получено ${actual}`);
}

const hitParade = fs.readFileSync("data/HIT_PARADE.md", "utf8");
const marketTable = parseTable(hitParade, "Место на карте");
const queueTable = parseTable(hitParade, "Приоритет");
const marketRows = new Map(marketTable.rows.map((row) => [canonical(cell(marketTable, row, "Ниша / референс")), row]));
const queueRows = new Map(queueTable.rows.map((row) => [canonical(cell(queueTable, row, "Ниша")), row]));

for (const [name, path, expectedType] of cards) {
  const markdown = fs.readFileSync(path, "utf8");
  const criteria = parseTable(markdown, "Критерий");
  const scores = parseTable(markdown, "Метрика", "Балл");
  const marketScore = scoreFromCriteria(criteria, marketCriteria, 70);
  const economicsScore = scoreFromCriteria(criteria, economicsCriteria, 45);
  const moatScore = scoreFromCriteria(criteria, moatCriteria, 30);
  const scoreMarket = parseNumber(findScoreRow(scores, "Рынок")[1]);
  const scoreEconomics = parseNumber(findScoreRow(scores, "Экономика")[1]);
  const scoreMoat = parseNumber(findScoreRow(scores, "Защита и масштаб")[1]);
  const confidence = parseNumber(findScoreRow(scores, "Доверие к оценке")[1]);

  assertEqual(scoreMarket, marketScore, `${name}: market_score`);
  assertEqual(scoreEconomics, economicsScore, `${name}: economics_score`);
  assertEqual(scoreMoat, moatScore, `${name}: moat_scale_score`);

  const marketOpportunity = Math.round(0.6 * marketScore + 0.4 * economicsScore);
  const marketRow = marketRows.get(canonical(name));
  if (!marketRow) throw new Error(`${name}: отсутствует на карте рынков`);
  assertEqual(cell(marketTable, marketRow, "Тип объекта"), expectedType, `${name}: тип объекта`);
  assertEqual(parseNumber(cell(marketTable, marketRow, "Рыночная возможность")), marketOpportunity, `${name}: рыночная возможность в hit parade`);
  assertEqual(parseNumber(cell(marketTable, marketRow, "Рынок")), marketScore, `${name}: рынок в hit parade`);
  assertEqual(parseNumber(cell(marketTable, marketRow, "Экономика")), economicsScore, `${name}: экономика в hit parade`);
  assertEqual(parseNumber(cell(marketTable, marketRow, "Доверие")), confidence, `${name}: доверие в hit parade`);

  if (expectedType === "Рыночный референс") {
    if (queueRows.has(canonical(name))) throw new Error(`${name}: рыночный референс не должен быть в очереди ставок`);
    continue;
  }

  const personal = parseTable(markdown, "Подоценка");
  const personalRows = rowMap(personal);
  const personalValues = personalCriteria.map((title) => {
    const row = personalRows.get(canonical(title));
    if (!row) throw new Error(`${name}: нет подоценки «${title}»`);
    return parseNumber(row[1]);
  });
  const personalScore = Math.round(0.4 * personalValues[0] + 0.2 * personalValues[1] + 0.2 * personalValues[2] + 0.2 * personalValues[3]);
  const scorePersonal = parseNumber(findScoreRow(scores, "Личный фильтр")[1]);
  assertEqual(scorePersonal, personalScore, `${name}: personal_filter_score`);

  const executionPriority = Math.round((0.4 * economicsScore + 0.35 * moatScore + 0.25 * personalScore) * confidence);
  const queueRow = queueRows.get(canonical(name));
  if (!queueRow) throw new Error(`${name}: отсутствует в очереди ставок`);
  assertEqual(parseNumber(cell(queueTable, queueRow, "Приоритет ставки")), executionPriority, `${name}: приоритет ставки в hit parade`);
  assertEqual(parseNumber(cell(queueTable, queueRow, "Защита и масштаб")), moatScore, `${name}: защита в hit parade`);
  assertEqual(parseNumber(cell(queueTable, queueRow, "Личный фильтр")), personalScore, `${name}: личный фильтр в hit parade`);
}

const marketScores = marketTable.rows.map((row) => parseNumber(cell(marketTable, row, "Рыночная возможность")));
const queueScores = queueTable.rows.map((row) => parseNumber(cell(queueTable, row, "Приоритет ставки")));
const executableCards = cards.filter(([, , type]) => type !== "Рыночный референс").length;
assertEqual(marketTable.rows.length, cards.length, "Количество объектов на карте");
assertEqual(queueTable.rows.length, executableCards, "Количество объектов в очереди");
assertEqual(JSON.stringify(marketScores), JSON.stringify([...marketScores].sort((a, b) => b - a)), "Сортировка карты");
assertEqual(JSON.stringify(queueScores), JSON.stringify([...queueScores].sort((a, b) => b - a)), "Сортировка очереди");

console.log(`portfolio v0.7 ok: ${marketTable.rows.length} markets, ${queueTable.rows.length} executable bets`);
