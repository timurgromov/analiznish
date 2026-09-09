import fs from "node:fs";

const activeRunPath = "data/ACTIVE_RUN.md";
const markdown = fs.readFileSync(activeRunPath, "utf8");

function field(name) {
  const match = markdown.match(new RegExp(`^${name}:\\s*(.+)$`, "m"));
  if (!match) throw new Error(`${activeRunPath}: отсутствует поле «${name}»`);
  return match[1].trim().replace(/^`|`$/g, "");
}

const required = [
  "Schema version",
  "Run ID",
  "Mode",
  "Status",
  "Direction",
  "Macro phase",
  "Current step",
  "Current step name",
  "Strongest evidence",
  "Source board",
  "Last updated",
];

for (const name of required) field(name);

const allowedStatuses = new Set(["active", "parked", "complete", "killed"]);
const status = field("Status");
if (!allowedStatuses.has(status)) {
  throw new Error(`${activeRunPath}: недопустимый Status «${status}»`);
}

if (!/^E[0-5]$/.test(field("Strongest evidence"))) {
  throw new Error(`${activeRunPath}: Strongest evidence должен быть E0–E5`);
}

if (status === "active") {
  const sourceBoard = field("Source board");
  if (!fs.existsSync(sourceBoard)) {
    throw new Error(`${activeRunPath}: Source board не существует: ${sourceBoard}`);
  }

  const currentStep = Number(field("Current step"));
  if (!Number.isInteger(currentStep) || currentStep < 0) {
    throw new Error(`${activeRunPath}: Current step должен быть неотрицательным целым`);
  }

  const board = fs.readFileSync(sourceBoard, "utf8");
  if (!new RegExp(`^\\|\\s*${currentStep}\\.`, "m").test(board)) {
    throw new Error(`${sourceBoard}: нет строки текущего этапа ${currentStep}`);
  }

  for (const heading of ["## Единственная текущая работа", "## Gate этапа", "## Запрещённый переход"]) {
    if (!markdown.includes(heading)) {
      throw new Error(`${activeRunPath}: отсутствует раздел «${heading}»`);
    }
  }
}

console.log(`active run ok: ${field("Run ID")} · ${field("Macro phase")} · step ${field("Current step")}`);
