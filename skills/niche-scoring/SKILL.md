---
name: niche-scoring
description: Use when evaluating a business niche, startup idea, MVP, offer, or business model for fast cash, scale potential, founder focus, hit-parade ranking, or rescore.
---

# Niche Scoring

Use this project-local skill when the user brings a niche or asks what to focus on.

## Read First

1. `AGENTS.md`
2. `data/ACTIVE_RUN.md` and its `Source board`
3. `docs/RAIL_PROTOCOL.md`
4. `docs/SIGMA_EXECUTION_MODEL.md`
5. `docs/INSIGHT_EXECUTION_MODEL.md`
6. `docs/IDEA_PURGATORY_PROTOCOL.md`
7. `docs/MARKETPLACE_REVERSE_ENGINEERING_PROTOCOL.md`
8. `docs/SCORING_MODEL.md`
9. `docs/WORKFLOW.md`
10. `docs/NICHE_DISCOVERY_LOOP.md`
11. `docs/CUSTDEV_PROTOCOL.md`
12. `docs/NICHE_QUESTIONNAIRE.md`
13. `docs/NICHE_INPUT_TEMPLATE.md`
14. `data/HIT_PARADE.md`

## Workflow

0. Пиши пользовательский анализ, карточки ниш, строки hit parade и dashboard-facing текст на русском. Английский допустим только для названий брендов, URL, путей файлов, команд, API/library names, технических идентификаторов и компактных терминов вроде SaaS, MVP, LTV, CAC, churn, webhook, backend/frontend.
1. Classify mode: `niche_factory`, `quick_scan`, `deep_score`, `rescore`, or `portfolio_review`. «Хочу искать нишу» launches `niche_factory` and does not require a ready idea.
1a. If `data/ACTIVE_RUN.md` is active, continue its phase and step. Do not reset
the run for a new chat, methodological link or side discussion; follow
`docs/RAIL_PROTOCOL.md`.
2. When the user wants to dump, ground or preserve an idea, use `idea_inbox` and
`data/IDEA_INBOX.md`: assign `A/B/C/X`, explain the position and one cheap next
check. Do not create a full score, niche card or hit parade row at this stage.
2a. When the user asks to find a current idea without a niche, run pain-first,
product-first and transaction-first discovery. Use acquisition marketplaces as
listing evidence, not as clone instructions or automatically proven revenue.
3. Check questionnaire completion level.
4. For `deep_score`, require block A from `docs/NICHE_QUESTIONNAIRE.md`.
5. Apply hard filters before score.
6. Classify `validation_stage` and strongest evidence `E0–E5`; a ready product can still be pre-CustDev.
7. Run the applicable discovery scan. Before interviews, batch 5–10 candidates
through `S · SCAN 0–3`, then apply the 18-criterion early Portfolio Gate at
step 4 and retain no more than 1–2 finalists.
7a. Treat sustainable profit as the objective and predictable recurring
cashflow as a preference, not a hard gate. Compare subscription, transaction,
commission, one-off, B2C and sellable-asset models by payer, contribution profit,
cash timing, repeatability, risk and launch cost.
8. Separate facts, assumptions, estimates, and unverified claims. Synthetic research is not a real interview and cannot exceed `E1`.
8a. Execute `I · INSIGHT` through a provenance-backed corpus and synthetic
stress test, then require separate real problem/action/pay gates.
9. Всегда сначала выводи детальные критерии: сформированный рынок, размер рынка, рост/тренд, горячий спрос, конкуренция, референс/модель, одна проблема/сегмент, LTV, X4, cash cycle, защита, реинвестиционный потенциал, операционная масштабируемость, канал роста.
10. Classify the object: `market_reference`, `concrete_bet`, `existing_asset`, or `active_business`.
11. Рассчитай `market_score`, `economics_score` и `moat_scale_score` строго по формулам v0.7, затем `personal_filter_score`, `evidence_confidence` и `market_opportunity_score`.
12. Calculate `execution_priority_score` only when our customer, offer and first channel are defined. Never invent it for a market reference.
13. Apply caps and penalties from `docs/SCORING_MODEL.md` and evidence caps from `docs/NICHE_DISCOVERY_LOOP.md`.
14. For a concrete bet, route the next step through real CustDev and the cheapest experiment. Do not authorize full MVP build before the build gate.
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
* Не рекомендовать полноценную разработку MVP без problem/offer evidence и денежного gate; feasibility spike должен иметь лимит.
* Карта рынков и очередь ставок не смешивают рыночный референс с конкретным активом одним баллом.
* Новая оцененная ниша не остается только в ответе чата: она попадает в `data/HIT_PARADE.md` и `data/niches/`, если пользователь явно не запретил запись.
* `node scripts/validate-portfolio.mjs` проходит: критерии, базовые блоки, производные показатели и сортировка двух таблиц согласованы.
