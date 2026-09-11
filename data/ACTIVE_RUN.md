# Active Niche Factory Run

Schema version: 2
Run ID: psychologists-russia-2026-09-09
Registry run ID: psychologists-sigma-2026-09-09
Mode: niche_factory
Status: parked
Direction: прибыльный продукт для рынка частнопрактикующих психологов в России; recurring cashflow предпочтителен
Checkpoint ID: S4_OWNER
Checkpoint gate status: parked
Macro phase: S · SCAN
Current step: 4
Current step name: Owner checkpoint — выбор одного финалиста P1/P2
Previous checkpoint: S5_COMPETITORS
Completed checkpoints: S0_CONTEXT, S1_MARKET, S2_TREND, S3_LOCALIZE, S5_COMPETITORS
Candidate IDs: psych-lead-to-paid-session, rpp-between-session
Selected focus IDs: —
Strongest evidence: E1
Source board: data/discovery/2026-09-09-psychologists-sigma-run.md
Last updated: 2026-09-11

## Текущее решение владельца

2026-09-10: доменный проход психологов поставлен на паузу по явному решению
владельца. Текущая задача проекта — улучшить общий контур поиска ниш, а не
продолжать интервью психологов. P0-hardening 2026-09-11 вернул resume point к
owner checkpoint: выбрать ровно один финалист P1/P2. Это исправление состояния
не является разрешением возобновить run.

Главная цель — устойчивая прибыль. Повторяемый cashflow предпочтителен, но B2B
и подписка не являются hard filters: сильный B2C, комиссия, разовая прибыльная
модель или актив для продажи тоже допустимы. Для micro-SaaS сохраняется ориентир
`1 000–5 000 ₽/мес` и путь к `100–1 000` плательщикам. Доступ через
жену-психолога, её коллег и Ирину Ушкову — стартовый канал исследования и
дистрибуции, но не граница рынка. Наличие конкурентов считается доказательством
рынка и денег, а не причиной закрыть направление.

## Точка возобновления (не текущая работа)

Владелец явно возобновляет run и выбирает ровно одну ставку: P1
`psych-lead-to-paid-session` либо P2 `rpp-between-session`. После выбора агент
проводит E1-подготовку `I_E1`; реальные интервью до её завершения запрещены.

## Gate возобновлённого этапа

Выбран ровно один финалист, `S4_OWNER` переведён в `passed`, выбор сохранён в
`Selected focus IDs` и реестре. Следующий checkpoint — `I_E1`; только после
полного публичного корпуса и подготовки интервью открывается `I_E2`.

## Запрещённый переход

Пока `Status: parked`, не возвращать пользователя к психологам автоматически,
не выбирать P1/P2 за владельца и не выдавать interview action. Возобновление
требует явного owner decision.

Не проводить интервью до owner choice и E1-подготовки. Не показывать или
строить финальный продукт, лендинг, бота, CRM или интеграцию с мессенджерами до
problem, action и money gates. Новый материал о методологии можно встроить в
контур, но он не активирует parked run.
