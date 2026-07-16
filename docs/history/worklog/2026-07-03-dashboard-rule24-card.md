# 2026-07-03 — dashboard Rule24 card and descriptions

## Intent

Исправить ситуацию, когда в dashboard для Rule24 показывалось сообщение "нет карточки с детальными критериями", хотя Markdown-карточка уже была создана.

## Context

После добавления Rule24 в `data/HIT_PARADE.md` dashboard продолжал загружать только три старые карточки из hardcoded списка в `dashboard/app.js`. Поэтому Rule24 отображался в таблице, но выбранная карточка не подтягивала детальные критерии.

## Изменения

* `dashboard/app.js`: добавлен путь к `data/niches/2026-07-03-rule24-psychologists.md`.
* `dashboard/app.js`: добавлен parser `## One-liner`, чтобы показывать короткий description бизнеса для выбранной ниши.
* `dashboard/app.js`: добавлен перевод evidence statuses в dashboard: `verified/supported/estimated/unverified` показываются по-русски.
* `dashboard/styles.css`: добавлен блок `Коротко о бизнесе`.
* `dashboard/index.html`: обновлены версии `app.js` и `styles.css`, чтобы Chrome не оставался на старом cached asset при обычной перезагрузке.
* `dashboard/favicon.svg`: добавлен узнаваемый favicon для вкладки dashboard.
* `dashboard/index.html`: favicon подключен как SVG icon.
* Карточка Rule24 и строка hit parade переведены на русский в пользовательских текстах.
* В `AGENTS.md` и `skills/niche-scoring/SKILL.md` закреплено правило: пользовательские отчеты по нишам и dashboard-тексты писать на русском.

## Результат

Dashboard теперь показывает:

* короткое описание бизнеса для каждой текущей ниши из ее карточки;
* детальные критерии Rule24 при выборе строки Rule24.

## Проверка

* `node --check dashboard/app.js` passed.
* `./scripts/check-local.sh` passed.
* Docker dashboard container is running on `127.0.0.1:8765`.
* Headless Chrome screenshot saved to `/tmp/niche-dashboard-rule24.png`; visible block `Коротко о бизнесе` is rendered.
* `curl -I 'http://127.0.0.1:8765/dashboard/favicon.svg?v=20260703'` returned `200 OK` with `Content-Type: image/svg+xml`.
