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
4. `docs/NICHE_DISCOVERY_LOOP.md`
5. `docs/CUSTDEV_PROTOCOL.md`
6. `docs/NICHE_QUESTIONNAIRE.md`
7. `docs/NICHE_INPUT_TEMPLATE.md`
8. `data/HIT_PARADE.md`

## Workflow

0. Пиши пользовательский анализ, карточки ниш, строки hit parade и dashboard-facing текст на русском. Английский допустим только для названий брендов, URL, путей файлов, команд, API/library names, технических идентификаторов и компактных терминов вроде SaaS, MVP, LTV, CAC, churn, webhook, backend/frontend.
1. Classify mode: `niche_factory`, `quick_scan`, `deep_score`, `rescore`, or `portfolio_review`. «Хочу искать нишу» launches `niche_factory` and does not require a ready idea.
2. If the user explicitly only wants to dump ideas, use `idea_inbox` and `data/IDEA_INBOX.md`; do not score. Otherwise, a new niche defaults to score + hit parade row + niche card, even when the score is only `quick_scan`.
3. Check questionnaire completion level.
4. For `deep_score`, require block A from `docs/NICHE_QUESTIONNAIRE.md`.
5. Apply hard filters before score.
6. Classify `validation_stage` and strongest evidence `E0–E5`; a ready product can still be pre-CustDev.
7. Run the applicable 10-stage discovery scan from `docs/NICHE_DISCOVERY_LOOP.md`.
8. Separate facts, assumptions, estimates, and unverified claims. Synthetic research is not a real interview and cannot exceed `E1`.
9. Всегда сначала выводи детальные критерии: сформированный рынок, размер рынка, рост/тренд, горячий спрос, конкуренция, референс/модель, одна проблема/сегмент, LTV, X4, cash cycle, защита, реинвестиционный потенциал, операционная масштабируемость, канал роста.
10. Classify the object: `market_reference`, `concrete_bet`, `existing_asset`, or `active_business`.
11. Рассчитай `market_score`, `economics_score` и `moat_scale_score` строго по формулам v0.7, затем `personal_filter_score`, `evidence_confidence` и `market_opportunity_score`.
12. Calculate `execution_priority_score` only when our customer, offer and first channel are defined. Never invent it for a market reference.
13. Apply caps and penalties from `docs/SCORING_MODEL.md` and evidence caps from `docs/NICHE_DISCOVERY_LOOP.md`.
14. For a concrete B2B bet, route the next step through real CustDev and the cheapest experiment. Do not authorize full MVP build before the build gate.
15. Return verdict, main risk, next action, kill conditions, validation stage, riskiest assumption and next gate; for a reference, return evidence, gaps and the condition for defining our entry.
16. Update the applicable table(s) in `data/HIT_PARADE.md` for every new evaluated niche unless the user explicitly says not to record it.
17. Add or update a card in `data/niches/` for every evaluated niche. For `quick_scan`, keep confidence low and document gaps.
18. Update `docs/history/` after meaningful changes.

## Acceptance

* Не выдумывать рыночные факты.
* Не ставить высокий score без confidence.
* Не делать отчет по нише без видимой таблицы детальных критериев.
* Не штрафовать новую идею только за отсутствие собственных оплат; оценивай открытый рынок, а отсутствие собственных продаж относить к evidence/traction.
* Не давать один мутный вердикт "перспективно" без score breakdown.
* Не выдавать AI-аватара, review mining или synthetic interview за CustDev.
* Не рекомендовать полноценную разработку B2B MVP без problem/offer evidence и денежного gate; feasibility spike должен иметь лимит.
* Карта рынков и очередь ставок не смешивают рыночный референс с конкретным активом одним баллом.
* Новая оцененная ниша не остается только в ответе чата: она попадает в `data/HIT_PARADE.md` и `data/niches/`, если пользователь явно не запретил запись.
* `node scripts/validate-portfolio.mjs` проходит: критерии, базовые блоки, производные показатели и сортировка двух таблиц согласованы.
