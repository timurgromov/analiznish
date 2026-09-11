import { validateAll } from "./factory-validation.mjs";

const { activeRun, registry } = validateAll();
console.log(`factory consistency ok: ${activeRun.registryRunId} · ${registry.ideas.length} ideas · focus=${activeRun.selectedFocusIds.length}`);
