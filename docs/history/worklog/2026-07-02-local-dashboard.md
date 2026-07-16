# 2026-07-02 — local dashboard

## Intent

Сделать визуальный интерфейс для хит-парада и критериев, чтобы не воспринимать скоринг только устно в чате.

## Decision

Для P0 выбран простой static dashboard без React, npm и Docker. Причина: источник правды уже лежит в Markdown, а текущая задача — быстро увидеть рейтинг и рецепт оценки, не строить полноценное приложение.

## Changes

* Добавлен `dashboard/index.html`.
* Добавлен `dashboard/styles.css`.
* Добавлен `dashboard/app.js`.
* Dashboard читает:
  * `data/HIT_PARADE.md`;
  * `docs/SCORING_MODEL.md`.
* Обновлены `README.md`, `UX.md`, `TASKS.md`, `docs/history/CURRENT_STATE.md`.
* `scripts/check-local.sh` теперь проверяет наличие dashboard-файлов.

## Result

Локальный интерфейс показывает:

* текущий hit parade;
* формулу итогового балла;
* расшифровку главных метрик;
* матрицу критериев `Нишевой балл`;
* выбранную нишу с главным риском и следующим шагом.

## Verification

* Локальная проверка пройдена: `./scripts/check-local.sh` -> `project docs skeleton ok`.
* JS syntax check пройден: `node --check dashboard/app.js`.
* Локальный сервер запущен: `python3 -m http.server 8765 --bind 127.0.0.1`.
* Проверена отдача `http://127.0.0.1:8765/dashboard/` и `http://127.0.0.1:8765/data/HIT_PARADE.md`.
