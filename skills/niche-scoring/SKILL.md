---
name: niche-scoring
description: Use when evaluating a business niche, startup idea, MVP, offer, or business model for fast cash, scale potential, founder focus, hit-parade ranking, or rescore.
---

# Niche Scoring

Use this project-local skill when the user brings a niche or asks what to focus on.

## Read First

1. `AGENTS.md`
2. `docs/SCORING_MODEL.md`
3. `docs/WORKFLOW.md`
4. `docs/NICHE_QUESTIONNAIRE.md`
5. `docs/NICHE_INPUT_TEMPLATE.md`
6. `data/HIT_PARADE.md`

## Workflow

0. Пиши пользовательский анализ, карточки ниш, строки hit parade и dashboard-facing текст на русском. Английский допустим только для названий брендов, URL, путей файлов, команд, API/library names, технических идентификаторов и компактных терминов вроде SaaS, MVP, LTV, CAC, churn, webhook, backend/frontend.
1. Classify mode: `quick_scan`, `deep_score`, `rescore`, or `portfolio_review`.
2. If the user explicitly only wants to dump ideas, use `idea_inbox` and `data/IDEA_INBOX.md`; do not score. Otherwise, a new niche defaults to score + hit parade row + niche card, even when the score is only `quick_scan`.
3. Check questionnaire completion level.
4. For `deep_score`, require block A from `docs/NICHE_QUESTIONNAIRE.md`.
5. Apply hard filters before score.
6. Separate facts, assumptions, estimates, and unverified claims.
7. Всегда сначала выводи детальные критерии: сформированный рынок, размер рынка, рост/тренд, горячий спрос, конкуренция, референс/модель, одна проблема/сегмент, LTV, X4, защита, реинвестиционный потенциал, операционная масштабируемость, канал роста.
8. Score `market_score`, `economics_score`, `moat_scale_score`, `personal_filter_score`, and `evidence_confidence`.
9. Apply caps and penalties from `docs/SCORING_MODEL.md`.
10. Return verdict, main risk, next action, and kill conditions.
11. Update `data/HIT_PARADE.md` for every new evaluated niche unless the user explicitly says not to record it.
12. Add or update a card in `data/niches/` for every evaluated niche. For `quick_scan`, keep confidence low and document gaps.
13. Update `docs/history/` after meaningful changes.

## Acceptance

* Не выдумывать рыночные факты.
* Не ставить высокий score без confidence.
* Не делать отчет по нише без видимой таблицы детальных критериев.
* Не штрафовать новую идею только за отсутствие собственных оплат; оценивай открытый рынок, а отсутствие собственных продаж относить к evidence/traction.
* Не давать один мутный вердикт "перспективно" без score breakdown.
* Строка hit parade содержит главный риск и следующий шаг.
* Новая оцененная ниша не остается только в ответе чата: она попадает в `data/HIT_PARADE.md` и `data/niches/`, если пользователь явно не запретил запись.
