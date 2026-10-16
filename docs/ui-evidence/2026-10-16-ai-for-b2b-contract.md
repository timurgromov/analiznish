# UI change contract — AI для B2B в кабинете

- Change ID: `2026-10-16-ai-for-b2b-registry`
- Requested visible change: отдельная корпоративная ставка видна в кабинете и получает предварительное место.
- Surface: `/dashboard/` и `/dashboard/project.html?id=ai-for-b2b-corporate-practicum`.
- User state: публичный read-only кабинет, данные текущей сборки.
- Exact target: строка «AI для B2B — корпоративный практикум и внедрение».
- Action: вкладка «Все идеи» → поиск «AI для B2B» → открыть карточку.
- Baseline: публичная сборка 2026-09-14 показывала 28 идей, 20 в desk-пуле; новой ставки не было.
- Expected: 29 идей, 21 в desk-пуле; отдельная карточка с баллом 56, E1 / 55%, `S4_OWNER / parked`.
- Preserved: старый Codex Project Starter отдельной строкой, ноль выбранных текущих фокусов, 3 need-definition, 2 hard blockers, 3 reference.
- Required viewports: исходный desktop и мобильный 390×844.
- Attempt: 1.
