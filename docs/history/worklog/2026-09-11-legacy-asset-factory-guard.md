# 2026-09-11 — Legacy asset guard для Niche Factory

## Контекст

При portfolio review legacy «Радарыч» был ошибочно рекомендован к
founder-сессиям и оплатам на основании существующего технического контура.
Проверка показала: карточка была legacy `deep_score`, а не SIGMA/INSIGHT run;
то же смешение относилось к PastLife AI / Sansara. Формальная валидация до
изменения проверяла совместимость E-level и стадии, но не происхождение
исследования.

## Изменение

* В schema добавлены `legacy_pre_factory` / `factory_v2` frameworks и
  `legacyRunGuard`.
* Validator запрещает legacy-only concrete bet и existing asset выше E1,
  `market_research` и parked/failed outcomes.
* «Радарыч» и PastLife AI / Sansara возвращены на E1 `quick_scan` / `parked`;
  их historical confidence сохранен в `legacyEvidenceConfidence`.
* КАДРА перестала числиться прошедшей без Factory run и тоже требует `S0`.
* `PROJECT_SPEC`, workflow, AGENTS, hit parade и task list синхронизированы:
  asset readiness не является market evidence; B2B preferred, B2C несет
  отдельное бремя доказательства экономики.

## Проверка

* `node scripts/validate-idea-registry.mjs` — passed.
* `node --test test/factory-contracts.test.mjs` — 14 passed, включая новый
  negative case для legacy E3/action.

## Следующий gate

Владелец выбирает не «готовый продукт для продаж», а один корректный run:
либо новый B2B batch, либо recovery `S0_CONTEXT` существующего актива. Ни
«Радарыч», ни Sansara не могут быть активированы без этого решения.
