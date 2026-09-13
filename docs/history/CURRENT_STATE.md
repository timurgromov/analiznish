# Current State — 2026-09-13

## Текущая точка

Desk research текущего соревнования завершён. Единственный оперативный run
`global-portfolio-gate-2026-09-13` припаркован на `S4_OWNER`: владелец выбирает
ровно одну ставку для перехода в `I_E1`. Незавершённой исследовательской
очереди нет.

Итоговая классификация всех 28 объектов:

* 3 предварительных финалиста: контроль ранней дебиторки малых B2B-услуг,
  Codex Project Starter и путь «обращение → оплаченная первая сессия»;
* 20 идей вне текущего соревнования с измеримым условием возврата;
* 2 hard failed exact-модели: AI YouTube Automation и ProfiWatcher;
* 3 действующих бизнеса или рыночных референса, не участвующих в выборе.

Полный дайджест и причины: `data/PORTFOLIO_CLOSURE.md`. Машинный источник
состояния: `data/IDEA_REGISTRY.json`. До выбора одного финалиста интервью,
трафик, запрос оплаты и build не открыты.

## Что проверено

* Codex Project Starter прошёл S0–S5 как одна ставка AI-перехода и первого
  измеримого внедрения. Templates, сайт, группа, сопровождение, сегменты и
  длительность — компоненты или гипотезы внутри продукта, не отдельные идеи.
* B2B operations batch доведён до bounded gates. Контроль ранней дебиторки
  вошёл в итоговую тройку; compliance и остальные ставки получили конкретные
  условия возврата.
* Legacy и психологические ставки сведены в единый Global Portfolio Gate.
  Старые локальные статусы не считаются текущим итогом.
* У трёх финалистов strongest evidence остаётся E1. Реальные повторяемые Jobs,
  willingness-to-pay, CAC, маржа и repeat пока не подтверждены.

## Исправленная логика Factory

`competition state` отделён от стадии и результата gate. `parked` означает
остановку до следующего evidence/owner gate, а не рыночный провал. `failed`
требует явного `blockerCode` и проваленного критерия. Конкуренты, отсутствие
готового канала, продукта, moat, продаж или repeat не являются terminal
filters новой идеи.

Один активный run остаётся единственным rail, но ранний Portfolio Gate может
содержать ограниченный batch до 10 независимых ставок. Global Gate оставляет
не более трёх предварительных финалистов. После явного owner choice реестр
допускает ровно один `selected_for_interviews`.

Для принесённой владельцем идеи сначала обязателен Definition Interview и один
подтверждённый Thesis Contract. Сегменты, ICP, цена, канал и delivery не
создают новые продукты без отдельного owner authorization.

## Состояние системы

Niche Factory v2 имеет статус `configured`, но ещё не `validated` полным
end-to-end циклом. Для этого одна ставка должна пройти реальные интервью,
action, money, bounded build и repeat gate либо получить честный terminal
outcome.

Работает:

* машинный контракт `data/FACTORY_SCHEMA.json` schema v3;
* единый реестр `data/IDEA_REGISTRY.json` schema v4;
* active-run rail и consistency validators;
* scoring v0.7 и две независимые портфельные линзы;
* read-only dashboard с Global Gate и кликабельными состояниями соревнования;
  группа `20 вне текущего соревнования` объяснена как `6 + 9 + 5` по последнему
  пройденному gate, отдельно от двух hard blocker;
* public allowlist build без внутренних source paths;
* локальный validation suite `./scripts/check-local.sh`.

## Runtime и release boundary

* Frontend: static dashboard в `dashboard/`.
* Backend и PostgreSQL: отсутствуют; подробности хранятся в Markdown, индекс —
  в JSON.
* Local runtime: Docker Compose/nginx на `http://127.0.0.1:8765/dashboard/`.
* Production: GitHub Pages на
  `https://timurgromov.github.io/analiznish/dashboard/`.
* Branch: `main`; origin: `https://github.com/timurgromov/analiznish.git`.
* Dashboard read-only; изменение решения идёт через project sources и
  validators, не через UI.

## Единственный следующий gate

Владелец выбирает одну из трёх ставок. После этого агент:

1. записывает ровно один `selected_for_interviews`;
2. готовит screener, interview guide и evidence table для `I_E1`;
3. проводит минимум пять реальных интервью одного сегмента;
4. по заранее заданному критерию переводит ставку дальше, меняет сегмент,
   паркует или закрывает.

## Нельзя случайно откатить

* Не дробить Codex Project Starter и любую другую owner-идею на продукты по
  сегментам, форматам или delivery.
* Не выводить решение из score и не превращать `unknown` в `failed`.
* Не считать конкурентов или отсутствие готового канала отрицанием рынка.
* Не считать legacy-код, production или paywall evidence спроса.
* Не начинать интервью, action, оплату или build до явного выбора одной ставки.
* Не смешивать действующий бизнес, market reference и новую concrete bet.

## Где смотреть

* Активный rail: `data/ACTIVE_RUN.md`
* Итог портфеля: `data/PORTFOLIO_CLOSURE.md`
* Реестр и аудиты: `data/IDEA_REGISTRY.json`
* Global Gate evidence: `data/discovery/2026-09-13-global-portfolio-gate.md`
* Workflow: `docs/WORKFLOW.md`
* Решения: `docs/history/DECISIONS.md`
* Текущая очередь: `TASKS.md`
