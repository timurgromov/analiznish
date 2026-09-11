import { loadSchema, readJson, validateFactoryState } from "./factory-validation.mjs";

const schema = loadSchema();
const state = validateFactoryState(readJson(process.cwd(), "data/FACTORY_STATE.json"), { schema });
console.log(`factory state v${state.schemaVersion} ok: ${state.systemStatus.status}`);
