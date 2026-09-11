import { loadSchema, validateActiveRun } from "./factory-validation.mjs";

const schema = loadSchema();
const run = validateActiveRun({ schema });
console.log(`run state v${run.schemaVersion} ok: ${run.runId} · ${run.status} · ${run.checkpointId}`);
