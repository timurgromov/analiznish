# Prompt — Run CustDev Cycle

```text
Продолжи выбранную B2B-ставку со стадии `finalist` по checkpoints I_E1 → I_E2.

Прочитай data/ACTIVE_RUN.md, docs/RAIL_PROTOCOL.md,
docs/INSIGHT_EXECUTION_MODEL.md, docs/CUSTDEV_PROTOCOL.md,
docs/NICHE_DISCOVERY_LOOP.md и карточку ниши.
Сформулируй один research question, критерии респондента, payer map и 3–5
рискованных гипотез. Подготовь neutral interview guide о последнем реальном
эпизоде; не показывай решение в первой половине.

Сначала собери E1-корпус по `INSIGHT_EXECUTION_MODEL`: 20–50 наблюдений минимум
из трёх типов источников, provenance, противоречия, ядро сегмента, anti-segment
и synthetic stress test. Публичные источники и review mining собери сам. Мне выдай компактный план:
кого найти, сколько людей, каким сообщением пригласить, какие 8–10 вопросов
задать и как сохранить participant-level ответы только в
`.local/interviews/`. В Git запиши только обезличенную cohort synthesis.
После интервью синтезируй паттерны,
противоречия и следующий поведенческий experiment.

AI-аватары и synthetic interviews маркируй только как E0/E1. Каждый update
начинай с текущих phase/step из `ACTIVE_RUN`. Build разрешай
только после прохождения build gate из docs/CUSTDEV_PROTOCOL.md.
```
