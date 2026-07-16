# 2026-07-01 — PastLife asset rescore

## Intent

Перескорить PastLife AI после уточнения пользователя: значительная часть времени ушла не только в конкретный оффер "прошлая жизнь", а в reusable admin/engine, который может поддерживать другие AI-photo toys и потенциальную продажу проекта.

## Changes

* Обновлена карточка `data/niches/2026-07-01-pastlife-ai-sansara.md`.
* Добавлен раздел `Asset / Exit Angle`.
* В evidence добавлен sale-ready package и reusable admin/prompt/payment/promo infrastructure.
* В `data/HIT_PARADE.md` PastLife обновлен:
  * Итог: `49` -> `55`;
  * Власов: `68` -> `72`;
  * Быстрые деньги: `77` -> `79`;
  * Масштаб: `62` -> `72`;
  * Фокус: `74` -> `82`;
  * Доверие: `0.70` -> `0.73`.

## Rationale

Reusable админка, PromptCard catalog, payment/products, promo/referral and analytics делают проект ценнее, чем одна consumer-игрушка. Возможен второй путь монетизации: продать проект как готовый AI entertainment asset. Но этот путь не считается доказанной монетизацией без payment happy path, метрик, demo/sale package и buyer interest.

## Verification

* Локально: `./scripts/check-local.sh` passed.
