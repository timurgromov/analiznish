# 2026-07-01 — Travel Radar score

## Intent

Оценить проект `travel-radar` как нишу и добавить его в хит-парад по обновлённой методологии с обязательной таблицей `Оценка по Власову`.

## Context

`travel-radar` — private MVP в production: Telegram-бот, FastAPI, PostgreSQL, worker/scheduler, Travelpayouts / Aviasales Data API, price history, anomalies, ready trips, return sniper and Bali purchase radar. P1 commercial track в документах: paid personal Telegram bot + free Telegram channel.

## Changes

* Прочитаны `README.md`, `PROJECT_SPEC.md`, `TASKS.md`, `API_SPIKE.md`, `docs/COMMERCIAL_LAUNCH_REVIEW.md`, `docs/history/CURRENT_STATE.md`, `docs/RADAR_OPERATIONS.md`, `docs/READY_TRIPS.md`.
* Не читались `.env`, `.local/*` и секреты.
* Добавлена карточка `data/niches/2026-07-01-travel-radar.md`.
* Обновлён `data/HIT_PARADE.md`.

## Result

Travel Radar получил initial score:

* Итог: 57
* Власов: 79
* Быстрые деньги: 70
* Масштаб: 76
* Фокус: 78
* Доверие к оценке: 0.76
* Вердикт: `Докрутить модель / paid beta`

## Rationale

Ниша сильная по Власову: рынок сформирован, конкуренция доказывает спрос, есть подписочная LTV-модель и понятное отличие от общих каналов — персональный радар. Главный риск не в технологии, а в willingness-to-pay: пользователи могут любить бесплатный канал, но не платить за личного бота.

## Verification

* Локально: `./scripts/check-local.sh` passed.

## Links

* Related card: `data/niches/2026-07-01-travel-radar.md`.
