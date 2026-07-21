# 2026-07-21 — Переоценка «Радарыча» и «КАДРЫ»

## Intent

Проверить, меняют ли технологический рост «Радарыча» и новый конкурентный/маркетинговый research «КАДРЫ» карту рынков и очередь конкретных ставок.

## Context

За 20–21 июля «Радарыч» получил публичный бренд, коммерческий paywall, access/payment ledger, admin cockpit, новый onboarding, retention surfaces и hands-on конкурентный аудит. В отдельном проекте «КАДРА» пройдены Фотушка, НейроКадр и Facee, получен controlled result НейроКадра и полностью просмотрен нативный каталог Фотушки.

Важно было не подменить readiness рынком: чужая тракция и исследование не становятся нашими продажами, а технологическая готовность не доказывает willingness-to-pay.

## Changes

- Travel Radar переименован в портфеле в «Радарыч».
- У «Радарыча» hands-on конкуренты подняли критерий референса `9 → 10`, production/commercial maturity — personal filter `64 → 70`, confidence `0.70 → 0.82`; market opportunity осталась `76`, execution priority вырос `43 → 52`.
- Confidence референса «Фотушка» повышен `0.72 → 0.80` за живой onboarding, free result, нативный каталог и pricing surfaces; базовые `83/62` и рыночная возможность `75` не повышались без независимой экономики.
- «КАДРА» добавлена как отдельная `concrete_bet`, а не как новое имя «Фотушки» или PastLife: market opportunity `72`, execution priority `34`, confidence `0.65`.
- Обновлены hit parade, три карточки, dashboard mapping, validator registry и `CURRENT_STATE.md`.

## Verification

- `node scripts/validate-portfolio.mjs` — `portfolio v0.7 ok: 8 markets, 7 executable bets`.
- `./scripts/check-local.sh` — passed.
- `node --check dashboard/app.js` — passed.
- `git diff --check` — passed.
- Live Telegram: авторизованный «Радарыч» показал paywall Founders 100, preview и объяснение продукта. CTA заявки и реальная оплата не выполнялись.

## Result

Карта: `Радарыч 76 → Фотушка 75 → Timur 73 → КАДРА 72 → цикл 68 → Rule24 57 → PastLife 50 → ProfiWatcher 48`.

Очередь: `Timur 58 → Радарыч 52 → КАДРА 34 → PastLife 31 → Rule24 25 → цикл 24 → ProfiWatcher 21`.

«Радарыч» остался вторым по исполнению после действующего бизнеса Timur, но разрыв существенно сократился. «КАДРА» вошла выше PastLife, однако остаётся в парковке до одного коммерческого vertical slice.

## Risks / Follow-up

- «Радарычу» нужны пять независимых founder-сессий и первые 10 реальных оплат; без них экономика `60` не повышается.
- «КАДРЕ» нужны один launch-сегмент, точный пакет/цена, первый канал, donor/provider cost test и 10 реальных покупателей.
- Revenue/margin/repeat «Фотушки» остаются self-reported.
- Production GitHub Pages проверить после push.

## Links

- Related decisions: `docs/history/DECISIONS.md`
- Radarych evidence: sibling project `travel-radar/docs/COMPETITOR_PRICING_AND_BUSINESS_PLAN_2026-07-20.md`, `travel-radar/docs/TELEGRAM_COMPETITOR_BOT_AUDIT_2026-07-21.md`
- Kadra evidence: sibling project `Кадра /docs/history/CURRENT_STATE.md`, `Кадра /docs/research/`
