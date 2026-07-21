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

* В активном портфеле восемь объектов: Timur Gromov Business System, Радарыч, КАДРА, PastLife AI / Sansara, Rule24 для психологов, ProfiWatcher для Profi.ru, Ассистент по женскому циклу, AI-фотосессии / Фотушка.
* ProfiWatcher добавлен только как `quick_scan` с низким доверием `0.55`: кодовый актив проверен, но продажа внешним пользователям заблокирована до проверки правил Profi.ru, платных пилотов и фактической надежности сессий.
* Ассистент по женскому циклу после v0.7 имеет рыночную возможность `68`, приоритет ставки `24`, доверие `0.55`. Категория сильная, но basic Flo for Partners бесплатен, поэтому платный pair-mode, LTV и канал не считаются доказанными.
* AI-фотосессии / «Фотушка» — `market_reference`: рыночная возможность `75`, рынок `83`, экономика `62`, доверие `0.80`. Открытые данные дополнены живым Telegram onboarding, free result, нативным каталогом и pricing surfaces из исследования «КАДРЫ»; «до 10 млн ₽/мес», COGS, margin и repeat остаются `self-reported`. У референса нет приоритета нашей ставки.
* КАДРА — `concrete_bet`: рыночная возможность `72`, приоритет ставки `34`, доверие `0.65`. Hands-on research Фотушки, НейроКадра и Facee подтверждает рынок; собственного runtime, точной цены, cost model, повторяемого канала и оплат ещё нет.
* PastLife AI / Sansara — `existing_asset`: рыночная возможность `50`, приоритет ставки `31`. Production-движок доказан, но direct-offer спрос и экономика нет; MyHeritage официально закрыл AI Time Machine в январе 2026 года.
* Радарыч — `concrete_bet`: рыночная возможность `76`, рынок `87`, экономика `60`, приоритет ставки `52`, доверие `0.82`. Учтены production commercial flow, hands-on аудит пяти Telegram-ботов, российские media competitors и международные pricing benchmarks; реальных оплат, CAC, churn и доказанного канала нет.
* Карта v0.7: Радарыч `76`, «Фотушка» `75`, Timur Gromov Business System `73`, КАДРА `72`, ассистент по циклу `68`, Rule24 `57`, PastLife `50`, ProfiWatcher `48`.
* Очередь v0.7: Timur `58`, Радарыч `52`, КАДРА `34`, PastLife `31`, Rule24 `25`, ассистент по циклу `24`, ProfiWatcher `21`.
* Git инициализирован на ветке `main`; `origin` подключен к `https://github.com/timurgromov/analiznish.git`. До initial commit удалённый репозиторий был пустым; видимость repo — public по настройке пользователя.
* GitHub Pages включён с источником `GitHub Actions`. Workflow публикует dashboard по адресу `https://timurgromov.github.io/analiznish/dashboard/` при изменениях в `dashboard/`, `data/` или `docs/SCORING_MODEL.md` на `main`.
* Score не записывается автоматически, но `scripts/validate-portfolio.mjs` пересчитывает блоки из критериев и падает при расхождении карточек, hit parade, формул или сортировки.
* Dashboard read-only и не редактирует Markdown.
* Нет интеграции с Wordstat/Trends/Sheets/Notion.

## Important Defaults

* Сначала hard filters, потом баллы.
* Актуальная модель — v0.7: две таблицы v0.6 сохраняются, а `Рынок`, `Экономика` и `Защита и масштаб` детерминированы детальными критериями. `Рыночная возможность` строится из рынка и экономики; `Приоритет ставки` — только для конкретной нашей модели, из экономики, защиты/масштаба, личного фильтра и доверия.
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

* Commit: `4d54e2b` (`Calibrate portfolio scoring with evidence`) на `main`.
* Deploy: local Docker Compose и GitHub Pages.
* Локальная проверка переоценки 2026-07-21 прошла: `node scripts/validate-portfolio.mjs`, `./scripts/check-local.sh`, `node --check dashboard/app.js`, `git diff --check`; валидатор подтверждает 8 рынков и 7 исполнимых ставок. Production Pages нужно проверить после push текущего commit.
