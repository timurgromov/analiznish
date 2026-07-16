# 2026-07-01 — Timur Gromov Business System score

## Intent

Оценить текущий денежный бизнес пользователя как нишу и добавить его в хит-парад для проверки адекватности скоринга.

## Context

Пользователь указал, что бизнес работает с 2012 года и уже приносит деньги. Папка `TimurBusinessSystem` является координационным workspace для сайта, EventBudjet CRM, Profi.ru, Yandex Direct, SEO и базы знаний ведущего.

## Changes

* Прочитаны root docs `TimurBusinessSystem`, документы EventBudjet, YandexDirectGrowth, SEO, site current state и база знаний ведущего.
* Не читались `secret_key.txt`, `.env`, локальные БД, выгрузки с персональными данными и временные артефакты.
* Проверены публичные источники: live-сайт `timurgromov.ru`, 1portal, Stanislav Kozitskiy, TORAS Events.
* Добавлена карточка `data/niches/2026-07-01-timur-gromov-business-system.md`.
* Обновлен `data/HIT_PARADE.md`.

## Verification

* Локально: `./scripts/check-local.sh` passed.
* Runtime/deploy: не применимо, проект `Анализ Ниш` docs-only.
* Git: папка `Анализ Ниш` не является git-репозиторием.

## Result

Timur Gromov Business System получил initial score:

* Итог: 67
* Быстрые деньги: 89
* Масштаб: 65
* Фокус: 94
* Доверие к оценке: 0.82
* Вердикт: `Денежное ядро / масштабировать через ограниченные тесты`

## Risks / Follow-up

* Нет финансовой выгрузки по реальным заказам: COGS, gross margin, CAC, конверсии, прибыль.
* Есть рассинхрон цены классической свадьбы между локальным source (`135 000 RUB`) и live-сайтом (`145 000 RUB`).
* Следующий перескоринг нужен после 10-20 заказов в Margin CRM и корректного CPA по Profi.ru/Direct.

## Links

* Commit: none.
* PR: none.
* Deploy: none.
* Related card: `data/niches/2026-07-01-timur-gromov-business-system.md`.
