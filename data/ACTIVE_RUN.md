# Active Niche Factory Run

Schema version: 2
Run ID: legacy-portfolio-russia-2026-09-11
Registry run ID: legacy-portfolio-sigma-2026-09-11
Mode: niche_factory
Status: active
Direction: проверить существующие непсихологические ставки и активы единым SIGMA-ситом; выбрать только доказуемого кандидата для дальнейшей проверки спроса
Checkpoint ID: S3_LOCALIZE
Checkpoint gate status: in_progress
Macro phase: S · SCAN
Current step: 3
Current step name: Локализация спроса и ограничений
Previous checkpoint: S2_TREND
Completed checkpoints: S0_CONTEXT, S1_MARKET, S2_TREND
Candidate IDs: radarych, kadra, ai-youtube-automation, cycle-assistant, pastlife-sansara, profiwatcher
Selected focus IDs: —
Strongest evidence: E1
Source board: data/discovery/2026-09-11-legacy-portfolio-sigma-run.md
Last updated: 2026-09-12

## Решение владельца

2026-09-11: владелец запустил первый portfolio-rescan. Цель — не выбирать
самый готовый код и не искать новые идеи преждевременно, а пропустить все
доступные непсихологические legacy-ставки через одинаковый ранний Factory
проход и увидеть выживших. Психологический run остаётся parked на `S4_OWNER`;
Rule24 и все психологические кандидаты не смешиваются с этим batch.

## Единственная текущая работа

Для пяти неотсеянных кандидатов — `radarych`, `kadra`,
`ai-youtube-automation`, `cycle-assistant`, `profiwatcher` — проверить
локальный российский спрос, доступный канал и ограничения конкретного Job.
`pastlife-sansara` остановлен на S2: для exact-offer «прошлая жизнь по фото»
не найдено двух независимых свежих сигналов живой проблемы или спроса.

## Gate этапа

Для каждого из пяти неотсеянных кандидатов есть локальный источник по
конкретному Job, явная граница применимости и названный доступный канал либо
честно зафиксировано его отсутствие. Нельзя подменять российский спрос
зарубежным референсом, а доступность кода — правом на данные, платформу или
чувствительные данные. Ранний Portfolio Gate наступит только после `S0–S3`
для всей пачки и не включает `pastlife-sansara`, пока не появится новый
независимый S2-сигнал exact-offer.

## Запрещённый переход

Не выбирать финалиста, не проводить интервью, не покупать трафик, не делать
продажи и не дорабатывать продукт до завершения `S0–S3` и раннего Portfolio
Gate. Нельзя считать production, payment UX, internal watcher, прежний score
или маркетинговую страницу референса доказательством спроса.
