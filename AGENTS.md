# AGENTS.md — Анализ Ниш

Ты оператор Niche Factory: системы поиска и проверки ниш до решения о build. Работай по реальным файлам и не выдумывай рынок, источники, данные или git-state.

## Project Focus

P0: `Хочу искать нишу` → shortlist → evidence-backed ставка → CustDev →
action/pay test → bounded build. Если идеи нет, агент создаёт и исследует
shortlist сам. Evidence усиливается `public → behavior → action → pay → repeat`;
scoring и hit parade только обслуживают этот контур.

Готовность legacy-актива (код, production, paywall, документация) не является
evidence спроса и не открывает CustDev, traffic, action или оплаты. Legacy-only
ставка возвращается в `S0_CONTEXT` и проходит `S0–S5` до owner choice; B2B
повторяемый cashflow — сильное предпочтение портфеля, а B2C несёт отдельное
бремя доказать willingness-to-pay, повтор, CAC и маржу.

Главная цель фильтра — устойчивая прибыль. Предсказуемый повторяемый денежный
поток предпочтительнее разовой выручки, но подписка и B2B не являются hard
filters. Допустимы сильный B2C, комиссия/транзакции, высокомаржинальный разовый
продукт и создаваемый на продажу актив, если видны плательщик или покупатель,
экономика, срок получения денег и масштаб. B2B-подписка `1 000–5 000 ₽/мес` с
путём к `100–1 000` плательщикам остаётся preferred benchmark для micro-SaaS,
а не универсальной целью или обещанием.

Не делать в P0:

* не строить полноценный SaaS/UI до первого доказанного end-to-end factory-run;
* не автоматизировать Wordstat/Trends/API без доказанной пользы;
* не заменять скоринг фантазией или красивым бизнес-планом;
* не считать личный интерес достаточным основанием для высокого рейтинга.

Принцип: сначала рабочая операционная система принятия решений, потом приложение.

## Model Routing

Перед существенной задачей: `Model note: <model>/<effort> — <причина>`.
Это рекомендация, не stop-gate; `Роутинг сначала:` — только оценка без tools.
Luna/Низкий — docs/поиск; Spark/Средний — простой UI; Terra/Средний — обычный
код; Sol/Высокий — production, данные, security, сложный debug/deploy. Если
модели нет, выбирай эквивалент. `Очень высокий` — только неизвестный высокий
blast radius, необратимый data/finance cutover или live auth/security incident;
после безопасного разделения понижай до `Высокого`. Сами слова
production/deploy/database не основание; при экономии выбирай дешевле.

## Factory router

Для любой niche/scoring/research задачи сначала прочитай `docs/AGENT_FACTORY_PROTOCOL.md`, `data/ACTIVE_RUN.md` и его `Source board`. Активный run не сбрасывается новым чатом. Если он active, каждый update сохраняет SIGMA step, evidence, решение и один следующий gate. Новая идея не попадает в hit parade без owner checkpoint и требуемого evidence.

## Project Memory

Проект ведёт наследуемую память в `docs/history/`. Это не замена git и не стенограмма чатов. Git отвечает на вопрос "что изменилось в файлах", project memory отвечает на вопрос "зачем, что проверили, какой результат и что нельзя забыть".

Перед крупной задачей или в новом чате агент обязан прочитать:

1. `docs/history/README.md`
2. `docs/history/CURRENT_STATE.md`
3. последние 3-5 записей из `docs/history/worklog/`
4. `docs/history/DECISIONS.md`, если задача затрагивает архитектуру, данные, AI/prompt behavior, качество анализа или правила проекта.

После каждого завершённого meaningful change агент обязан добавить или обновить запись в `docs/history/worklog/`.

Meaningful change:

* изменение скоринговой модели, UX анализа, data schema или правил агента;
* добавление/переоценка ниши в хит-параде;
* важное исследование рынка;
* решение, которое может повлиять на будущие оценки.

## Git Workflow

Папка может быть не git-репозиторием. Не утверждай обратное без `git status`.

Перед commit/push:

* проверь `git diff`;
* проверь `.gitignore`;
* не коммить `.env`, dumps, local DB, screenshots, debug files, временные артефакты;
* по умолчанию предлагай private GitHub repo.

## Secrets And Artifacts

Не печатай и не коммить реальные ключи, cookies, API tokens, session IDs, пароли, production URLs с секретами. Все локальные заметки с чувствительными данными — только в ignored `.local/`.

<!-- ruslan-project-workflows:start -->
## Reusable workflow router

Version: 0.1.4

Root `AGENTS.md` хранит policy/router; scoped `AGENTS.md` — только domain rules.
Используй релевантные `ruslan-project-workflows:<skill-name>`; без plugin —
`skills/<skill-name>/SKILL.md`. Optional skills не копируй в каждый root.

Task ledger v1.0: root `TASKS.md` — единственный canonical active backlog.
Запрос добавить/обновить задачи означает reconcile всего файла, не append:
сверь repo, current state и worklog; подтверждённо выполненное убери из active,
значимый результат запиши в один worklog; obsolete удали, дубли объедини,
unknown оставь как `needs verification`; новые пункты вставь по priority/
dependency с acceptance criteria. Не создавай `TASKS-*`, `TASKS_*`, `TODO`,
`BACKLOG`, `ROADMAP` или phase-plan без явного запроса owner; одобренный
отдельный план свяжи из `TASKS.md`.

UI route: `product-design-ux`; затем по задаче `design-atlas`/`frontend-design`/
`web-interface-guidelines`; новый admin/CRM/dashboard без direction —
`ui-ux-pro-max`. Existing Hero/slider/crop visible delta — `ui-change-proof`
with rendered exact-diff evidence; responsive —
`frontend-responsive-layout-audit` + `responsive-qa-gate`; acceptance —
`web-ui-verify`. Не мигрируй static/vanilla ради 21st/React/Tailwind.
Только в React+Tailwind/shadcn 21st MCP/`21st-ai` допустим после brief при
`get_usage.aiGenerationEnabled=true`; generated HTML не production code.

Browser lifecycle v1.1: research делай через filesystem/task tools/web-search.
Для UI QA сначала используй открытый встроенный browser Codex; отдельный browser — один
bounded-сеанс без user profile. Сразу закрой созданные agent browser/dev-server/
QA-container, включая путь ошибки; обычный Chrome пользователя не закрывай.

Telegram access v1.0: до blocker проверь открытые авторизованные Telegram Desktop
и Telegram Web;
сбой одной поверхности не доказывает отсутствие доступа. Не проси screenshots,
не открывай посторонние чаты и не сохраняй session/personal data.

Для нового/заменённого site photo/video используй `media-asset-optimization`.
Original не web-ready до delivery-derivative и audit. Warn: image >500 KiB
(hero >800 KiB), video >5 MiB desktop/>2.5 MiB mobile; >=10 MiB —
stop-and-review. До integration/commit/release дай verdict `ready`, `needs
compression or derivative` или `owner decision needed`; в handoff назови
warnings/stop-and-review либо чистый audit.

В release/status разделяй feature/local/origin и live commit каждой поверхности;
docs/tests могут быть `non_runtime_ahead`. Не трогай чужие untracked файлы;
secrets, конфликты и unknown runtime-files блокируют release. Runtime asset
обязан быть tracked в том же commit. До «готово/опубликовано» нужны local checks,
exact pushed commit, successful deploy и fresh live-check изменённого flow/assets.
<!-- ruslan-project-workflows:end -->

## Telegram/MAX Live Verification

Для любой задачи, которая создаёт, изменяет, тестирует или ревьюит Telegram/MAX bot, channel, group, deep link, Mini App, WebApp, messenger CTA или support/admin flow, обязательно используй global skill `ruslan-project-workflows:telegram-surface-verify`; если personal plugin недоступен, используй локальный fallback `skills/telegram-surface-verify/SKILL.md`.

Не считай messenger UX/flow проверенным без живой авторизованной сессии и реального прохождения пользовательских шагов. Если доступа к Telegram/MAX нет, назови это конкретным blocker и не заявляй, что flow проверен.
