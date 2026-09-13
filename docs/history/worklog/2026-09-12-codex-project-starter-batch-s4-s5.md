# Codex Project Starter — S4–S5 comparison batch

> **Статус: superseded 2026-09-13.** Документ ошибочно раздробил одну идею на
> сегментные и delivery-варианты. Актуальный Thesis Contract и этап:
> `data/discovery/2026-09-13-codex-project-starter-thesis-reset.md`.

Дата: 2026-09-12
Run: `codex-project-starter-batch-russia-2026-09-12`
Статус: `active / S4_OWNER`

## Зачем

Исходная ставка прошла S0–S3, но один candidate не имеет права сам пройти
обязательный Portfolio Gate. Владелец разрешил собрать и сравнить batch вместо
перехода к курсу, продажам или разработке.

## Что проверено

Собраны пять конкретных payer/outcome моделей: self-serve для эксперта,
Founder MVP Launch Sprint, PM Prototype OS, AI Delivery OS для малого агентства
и широкий business-owner starter. Для них проверены публичные страницы paid
self-serve, cohort и workshop офферов. Все продавцовые claims и глобальные цены
оставлены E1: они доказывают category, но не продажи, российский спрос или
экономику нашей версии.

Единая матрица 18 критериев оставила низкими неизвестные LTV, CAC, channel,
support burden, local buyer и ROI. P1 — `founder-mvp-launch-sprint`, P2 —
`agency-ai-delivery-os`; оба прошли S5 с конкурентной рамкой. Три оставшихся
варианта получили `passed_not_selected`, а не failed: конкуренция подтверждает
рынок и не была причиной отсечения.

## Решение и граница

Чистый template pack не стал первым продуктом: без узкого outcome и
сопровождения он слишком похож на бесплатные материалы. Templates сохранены как
возможный delivery-слой P1, а не как обещание покупателю.

Run переведён в `S4_OWNER / active`. Выбор не автоматизирован по score: владелец
должен выбрать один из двух финалистов. До этого запрещены interviews, сбор
контактов, landing с оплатой, предоплаты, трафик и build. После выбора разрешён
только `I_E1` с public corpus, screener, interview guide и privacy boundary.

## Артефакты

* `data/discovery/2026-09-12-codex-project-starter-batch-s4-s5.md`
* `data/ACTIVE_RUN.md`
* `data/IDEA_REGISTRY.json`
* `data/IDEA_INBOX.md`
* `data/FACTORY_STATE.json`
* `data/HIT_PARADE.md`
* `data/PORTFOLIO_CLOSURE.md`
* `docs/history/CURRENT_STATE.md`

## Проверка

`./scripts/check-local.sh` прошёл: active run, registry (32 идеи) и factory
consistency валидны. `node --test` — 19/19; `git diff --check` — без ошибок;
сборка public artifact прошла в `/tmp/niche-factory-public-20260912-codex-batch`
(12 allowlisted files).
