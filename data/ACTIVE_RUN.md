# Active Niche Factory Run

Schema version: 2
Run ID: global-portfolio-gate-2026-09-13
Registry run ID: global-portfolio-gate-2026-09-13
Mode: niche_factory
Status: parked
Direction: Планирование подготовки интервью; выбрать пакет 1–3 ставки и одну текущую работу
Checkpoint ID: S4_OWNER
Checkpoint gate status: parked
Macro phase: S · SCAN
Current step: 4
Current step name: Owner checkpoint — план пакета интервью
Previous checkpoint: S5_COMPETITORS
Completed checkpoints: S0_CONTEXT, S1_MARKET, S2_TREND, S3_LOCALIZE, S4_PORTFOLIO_GATE, S5_COMPETITORS
Candidate IDs: agency-ar-control, codex-project-starter-product, psych-lead-to-paid-session, radarych, rpp-between-session, rule24, kadra, pastlife-sansara, outsourced-compliance-calendar, cycle-assistant, rpp-practice-lab, psych-employer-outcome, psych-couples-practices, rpp-supervision-os, psych-emotional-eating, psych-practice-crm, field-service-next-action, wholesale-order-to-cash, smb-contract-obligations, vendor-security-evidence
Selected focus IDs: —
Research Unit: portfolio_batch
Strongest evidence: E1
Source board: data/discovery/2026-09-13-portfolio-interview-readiness-audit.md
Last updated: 2026-09-14

## Решение владельца

2026-09-13: владелец уточнил, что готовность к интервью не означает выбор одного
победителя. Desk research завершён; следующий рабочий пакет 1–3 ставки и одна
текущая работа ещё не назначены.

## Что реально проверено

Все 25 concrete bets получили явный исход; незавершённой desk-очереди нет.
Двадцать ставок прошли S0–S5 и вошли в ранжированный desk-квалифицированный пул. Три объекта требуют сначала
уточнить границу ставки: generic AI-психолог, generic marketplace сессий и
общий field-service ops. Две exact-модели сохраняют hard blocker.

Завершение desk research не означает ни равенство ставок, ни выбор победителя,
ни фактическую готовность к интервью. Баллы задают предварительный порядок;
`interview_ready` открывается только после I_E1 и не разрешает build.

## Точка возобновления (не текущая работа)

Ждать плана владельца: 1–3 ставки в ближайший пакет подготовки и одна из них как
текущая работа; после этого готовить I_E1 текущей ставки.

## Gate возобновлённого этапа

Владелец называет 1–3 ставки для пакета подготовки и одну текущую. Реестр
переносит пакет в `selected_for_interviews`, а `Selected focus IDs` содержит
ровно одну текущую работу. Для неё готовятся screener, interview guide и
evidence table; только после прохождения I_E1 проводятся минимум пять реальных
интервью.

## Запрещённый переход

До планирования пакета не начинать интервью. Трафик, запрос оплаты и build
остаются закрыты последующими action/pay gates.
