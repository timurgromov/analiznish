# Current State — 2026-07-20

## Project

`Анализ Ниш` — личная docs-first система оценки бизнес-ниш, стартап-идей и фокуса. Первичная роль проекта — принять поток идей без превращения каждой в обязательство, отсечь слабое и выбрать один релевантный следующий фокус.

Текущий этап: рабочая docs-first система с локальным Docker dashboard и двумя независимыми портфельными представлениями: карта рынков/референсов и очередь конкретных ставок.

## Current Runtime / Stack

* Frontend: локальный static dashboard в `dashboard/`.
* Backend: отсутствует.
* Database: Markdown files.
* Storage: local project files.
* Deploy: локальный Docker Compose service на `127.0.0.1:8765` и публичный read-only dashboard на GitHub Pages: `https://timurgromov.github.io/analiznish/dashboard/`.
* External services: не подключены.

## What Works Now

* Есть правила агента в `AGENTS.md`.
* Есть P0 specification в `PROJECT_SPEC.md`.
* Есть скоринговая модель в `docs/SCORING_MODEL.md`.
* Есть workflow анализа в `docs/WORKFLOW.md`.
* Есть обязательный опросник в `docs/NICHE_QUESTIONNAIRE.md`.
* Есть шаблоны входа и отчета.
* Есть `data/IDEA_INBOX.md` для сырых идей до оценки.
* Есть живой портфель в `data/HIT_PARADE.md`: отдельная карта рынков/референсов и очередь конкретных ставок.
* Есть project memory в `docs/history/`.
* Есть локальная проверка `scripts/check-local.sh`.
* Есть read-only dashboard для просмотра hit parade и критериев.
* Dashboard стабильно поднимается через `docker compose up -d dashboard`.

## Known Blockers

* В активном портфеле семь объектов: Timur Gromov Business System, Travel Radar, PastLife AI / Sansara, Rule24 для психологов, ProfiWatcher для Profi.ru, Ассистент по женскому циклу, AI-фотосессии / Фотушка.
* ProfiWatcher добавлен только как `quick_scan` с низким доверием `0.55`: кодовый актив проверен, но продажа внешним пользователям заблокирована до проверки правил Profi.ru, платных пилотов и фактической надежности сессий.
* Ассистент по женскому циклу пересчитан как РФ/СНГ Telegram-first продукт под цель `100 000 ₽/мес`: итог `45`, доверие `0.60`. MVP не обязан быть AI-продуктом: базовая версия может быть скриптовым ботом с расчетом фаз и заранее подготовленными рекомендациями. Конкуренция учтена как плюс к рынку, а не минус. Риск не в Flo/Clue, а в недоказанной готовности русскоязычных пользователей платить, канале привлечения и доверии к чувствительным данным в Telegram-боте.
* AI-фотосессии / «Фотушка» классифицированы как `market_reference`: рыночная возможность `78`, рынок `86`, экономика `66`, доверие `0.55`. Это выше PastLife (`65`) на карте рынков. Заявление «до 10 млн ₽/мес» остаётся `self-reported`; оно не перенесено в экономику нашей будущей модели. Универсальный B2C-клон не имеет приоритета ставки до выбора своей вертикали, оффера и канала.
* PastLife AI / Sansara классифицирован как `existing_asset`: рыночная возможность `65`, приоритет ставки `49`. Приоритет отражает ценность уже готового актива и короткого теста, а не более высокий потолок бизнеса, чем у AI-фотосессий.
* Git инициализирован на ветке `main`; `origin` подключен к `https://github.com/timurgromov/analiznish.git`. До initial commit удалённый репозиторий был пустым; видимость repo — public по настройке пользователя.
* GitHub Pages включён с источником `GitHub Actions`. Workflow публикует dashboard по адресу `https://timurgromov.github.io/analiznish/dashboard/` при изменениях в `dashboard/`, `data/` или `docs/SCORING_MODEL.md` на `main`.
* Нет автоматического расчета score из карточек.
* Dashboard read-only и не редактирует Markdown.
* Нет интеграции с Wordstat/Trends/Sheets/Notion.

## Important Defaults

* Сначала hard filters, потом баллы.
* Актуальная модель — v0.6: четыре базовых блока сохраняются, но единый `overall_score` больше не является рейтингом портфеля. `Рыночная возможность` строится из рынка и экономики; `Приоритет ставки` — только для конкретной нашей модели, из экономики, защиты/масштаба, личного фильтра и доверия.
* Новая ниша, которую пользователь приносит на оценку, по умолчанию попадает в `data/HIT_PARADE.md` и получает карточку в `data/niches/`, даже если это только `quick_scan` с низким доверием. Не записывать в рейтинг можно только при явном запросе `idea_inbox`, "не добавлять" или "без записи".
* Сырые идеи можно фиксировать как `idea_inbox` только по явному запросу; это не hit parade и не backlog обязательств.
* `Быстрые деньги`, `Свобода`, `Фин. устойчивость` и `Фокус` считаются подуровнем `Личного фильтра`.
* Низкая доказательность показывается рядом с рыночной возможностью и снижает приоритет конкретной ставки; она не должна прятать сильный рынок внизу карты.
* По умолчанию GitHub repo должен быть private, если проект публикуется. Для этого проекта пользователь уже создал public repo, поэтому его видимость не менять без отдельного запроса.

## Do Not Accidentally Revert

* Не возвращать старую схему `vlasov_score` + `scale_score`.
* Не возвращать старую схему v0.4 с отдельными колонками `Нишевой балл`, `Быстрые деньги`, `Свобода`, `Фин. устойчивость`, `Фокус`.
* Не возвращать один общий рейтинг v0.5 для смешанных типов объектов: рыночного референса, действующего бизнеса и существующего актива.
* Не считать отсутствие конкурентов плюсом.
* Не обновлять hit parade без типа объекта и доверия; у конкретной ставки должны быть риск и следующий шаг.
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

* Основа: commit `4d08f18` (`Fix Pages dashboard data artifact`) на `main`; следующий commit содержит миграцию v0.6.
* Deploy: local Docker Compose и GitHub Pages.
* Локальная проверка v0.6: `./scripts/check-local.sh`, `node --check dashboard/app.js`, parser-level contract и мобильная HTTP-проверка прошли. После push проверить новый GitHub Actions run и публичный dashboard.
