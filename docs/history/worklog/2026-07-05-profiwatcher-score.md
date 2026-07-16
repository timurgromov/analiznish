# 2026-07-05 — предварительная оценка ProfiWatcher

## Intent

Оценить, можно ли вырезать `ProfiWatcher` из EventBudjet и продавать как отдельный продукт для пользователей Profi.ru.

## Context

Пользователь описал боль: Profi.ru дает много заявок и шумных уведомлений, прямого API нет, поэтому текущий watcher работает через VPS/headless browser под аккаунтом пользователя. Нужно было понять, это потенциальная монетизация или слишком хрупкая платформа для продажи.

## Что было прочитано

Локальные файлы проекта оценки ниш:

- `docs/SCORING_MODEL.md`
- `docs/WORKFLOW.md`
- `docs/NICHE_QUESTIONNAIRE.md`
- `data/HIT_PARADE.md`
- `skills/niche-scoring/SKILL.md`
- `docs/history/*`

Локальные файлы EventBudjet:

- `profi_watcher/main.py`
- `profi_watcher/rules.py`
- `profi_watcher/parser.py`
- `profi_watcher/runtime_safety.py`
- `profi_watcher/api.py`
- `profi_auth_browser/main.py`
- `docs/profi_ru/watcher-mvp-plan.md`
- `docs/profi_ru/refund-sync-plan.md`
- `PAID_TRAFFIC_SPEC.md`
- `docs/PROFI_RU_CRM_REWORK_PLAN.md`
- `docker-compose.yml`

Публичная проверка:

- `https://profi.ru/`
- `https://ru.wikipedia.org/wiki/Профи.ру`
- Поиск прямой официальной API-документации для такого продукта не дал подтвержденного результата.

## Изменения

- Добавлена карточка `data/niches/2026-07-05-profiwatcher-profi-ru.md`.
- Добавлена строка ProfiWatcher в `data/HIT_PARADE.md`.
- `dashboard/app.js` подключает новую карточку.
- `TASKS.md` дополнен задачей проверки legal/platform risk, пилотов и uptime/support cost.
- `docs/history/CURRENT_STATE.md` обновлен под новую оцененную нишу.

## Результат

ProfiWatcher scored как `quick_scan`:

- Итог: `36`
- Рынок: `70`
- Экономика: `72`
- Защита и масштаб: `48`
- Личный фильтр: `66`
- Доверие: `0.55`
- Вердикт: `Парковка / legal-tech validation`

Ключевой вывод: как внутренний инструмент EventBudjet идея сильная. Как внешний продукт — потенциально денежная, но пока слишком хрупкая для публичного SaaS из-за отсутствия подтвержденного API, риска капчи/login_required, изменений интерфейса, блокировок и необходимости хранить пользовательские сессии.

## Проверка

- `python3 -m unittest discover` для `EventBudjet/profi_watcher/tests` прошел: `41 tests OK`.
- `./scripts/check-local.sh` прошел: `project docs skeleton ok`.
- `node --check dashboard/app.js` прошел.
- Git в папке `Анализ Ниш` не инициализирован, commit/push не выполнялся.
