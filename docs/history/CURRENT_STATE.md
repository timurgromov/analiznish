# Current State — 2026-07-17

## Project

`Анализ Ниш` — личная docs-first система оценки бизнес-ниш, стартап-идей и фокуса. Первичная роль проекта — принять поток идей без превращения каждой в обязательство, отсечь слабое и выбрать один релевантный следующий фокус.

Текущий этап: рабочая docs-first система с локальным Docker dashboard.

## Current Runtime / Stack

* Frontend: локальный static dashboard в `dashboard/`.
* Backend: отсутствует.
* Database: Markdown files.
* Storage: local project files.
* Deploy: локальный Docker Compose service на `127.0.0.1:8765`; GitHub Pages workflow подготовлен для публичного read-only dashboard.
* External services: не подключены.

## What Works Now

* Есть правила агента в `AGENTS.md`.
* Есть P0 specification в `PROJECT_SPEC.md`.
* Есть скоринговая модель в `docs/SCORING_MODEL.md`.
* Есть workflow анализа в `docs/WORKFLOW.md`.
* Есть обязательный опросник в `docs/NICHE_QUESTIONNAIRE.md`.
* Есть шаблоны входа и отчета.
* Есть `data/IDEA_INBOX.md` для сырых идей до оценки.
* Есть живой хит-парад в `data/HIT_PARADE.md`.
* Есть project memory в `docs/history/`.
* Есть локальная проверка `scripts/check-local.sh`.
* Есть read-only dashboard для просмотра hit parade и критериев.
* Dashboard стабильно поднимается через `docker compose up -d dashboard`.

## Known Blockers

* Уже оценены семь активных ниш: Timur Gromov Business System, Travel Radar, PastLife AI / Sansara, Rule24 для психологов, ProfiWatcher для Profi.ru, Ассистент по женскому циклу, AI-фотосессии / Фотушка.
* ProfiWatcher добавлен только как `quick_scan` с низким доверием `0.55`: кодовый актив проверен, но продажа внешним пользователям заблокирована до проверки правил Profi.ru, платных пилотов и фактической надежности сессий.
* Ассистент по женскому циклу пересчитан как РФ/СНГ Telegram-first продукт под цель `100 000 ₽/мес`: итог `45`, доверие `0.60`. MVP не обязан быть AI-продуктом: базовая версия может быть скриптовым ботом с расчетом фаз и заранее подготовленными рекомендациями. Конкуренция учтена как плюс к рынку, а не минус. Риск не в Flo/Clue, а в недоказанной готовности русскоязычных пользователей платить, канале привлечения и доверии к чувствительным данным в Telegram-боте.
* AI-фотосессии / Фотушка добавлены как `quick_scan` после глубокого исследования конкурента: итог `37`, рынок `86`, доверие `0.55`. Универсальный B2C-клон поставлен в парковку; допустим только 7–14-дневный платный тест одной event/B2B/emotional вертикали. Заявления «до 10 млн ₽/мес» и «4–5 млн ₽» отмечены как self-reported; второе означает собственные средства, а не привлечённый раунд.
* Git инициализирован на ветке `main`; `origin` подключен к `https://github.com/timurgromov/analiznish.git`. До initial commit удалённый репозиторий был пустым; видимость repo — public по настройке пользователя.
* GitHub Pages ещё требует разового выбора источника `GitHub Actions` в настройках репозитория. После этого workflow публикует dashboard по адресу `https://timurgromov.github.io/analiznish/dashboard/` при изменениях в `dashboard/` или `data/` на `main`.
* Нет автоматического расчета score из карточек.
* Dashboard read-only и не редактирует Markdown.
* Нет интеграции с Wordstat/Trends/Sheets/Notion.

## Important Defaults

* Сначала hard filters, потом баллы.
* Актуальная модель — v0.5: `Рынок`, `Экономика`, `Защита и масштаб`, `Личный фильтр`, умноженные на `Доверие`.
* Новая ниша, которую пользователь приносит на оценку, по умолчанию попадает в `data/HIT_PARADE.md` и получает карточку в `data/niches/`, даже если это только `quick_scan` с низким доверием. Не записывать в рейтинг можно только при явном запросе `idea_inbox`, "не добавлять" или "без записи".
* Сырые идеи можно фиксировать как `idea_inbox` только по явному запросу; это не hit parade и не backlog обязательств.
* `Быстрые деньги`, `Свобода`, `Фин. устойчивость` и `Фокус` считаются подуровнем `Личного фильтра`.
* Низкая доказательность снижает итоговый score.
* По умолчанию GitHub repo должен быть private, если проект публикуется. Для этого проекта пользователь уже создал public repo, поэтому его видимость не менять без отдельного запроса.

## Do Not Accidentally Revert

* Не возвращать старую схему `vlasov_score` + `scale_score`.
* Не возвращать старую схему v0.4 с отдельными колонками `Нишевой балл`, `Быстрые деньги`, `Свобода`, `Фин. устойчивость`, `Фокус`.
* Не считать отсутствие конкурентов плюсом.
* Не обновлять hit parade без confidence и main risk.
* Не оставлять новую оцененную нишу только в ответе чата, если пользователь явно не запретил запись.

## Where To Look First

* Project rules: `AGENTS.md`
* Current tasks: `TASKS.md`
* Scoring: `docs/SCORING_MODEL.md`
* Workflow: `docs/WORKFLOW.md`
* Questionnaire: `docs/NICHE_QUESTIONNAIRE.md`
* Hit parade: `data/HIT_PARADE.md`
* Dashboard: `dashboard/index.html`
* Decisions: `docs/history/DECISIONS.md`
* Worklog: `docs/history/worklog/`

## Last Known Good State

* Commit: `d1a32be` (`Initial project import`) на `main` с проектными файлами и без локальных артефактов.
* Deploy: local Docker Compose; GitHub Pages workflow подготовлен, первый публичный deploy ожидает включения `GitHub Actions` как источника Pages.
* Verification: `./scripts/check-local.sh` и `node --check dashboard/app.js` прошли 2026-07-16; Docker dashboard работает, `HTTP/1.1 200 OK`; nginx отдаёт новую строку, карточку и mapping.
