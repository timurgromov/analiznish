# Active Niche Factory Run

Schema version: 2
Run ID: legacy-portfolio-russia-2026-09-11
Registry run ID: legacy-portfolio-sigma-2026-09-11
Mode: niche_factory
Status: active
Direction: проверить существующие непсихологические ставки и активы единым SIGMA-ситом; выбрать только доказуемого кандидата для дальнейшей проверки спроса
Checkpoint ID: S0_CONTEXT
Checkpoint gate status: in_progress
Macro phase: S · SCAN
Current step: 0
Current step name: Контекст и стартовая позиция
Previous checkpoint: —
Completed checkpoints: —
Candidate IDs: radarych, kadra, ai-youtube-automation, cycle-assistant, pastlife-sansara, profiwatcher
Selected focus IDs: —
Strongest evidence: E1
Source board: data/discovery/2026-09-11-legacy-portfolio-sigma-run.md
Last updated: 2026-09-11

## Решение владельца

2026-09-11: владелец запустил первый portfolio-rescan. Цель — не выбирать
самый готовый код и не искать новые идеи преждевременно, а пропустить все
доступные непсихологические legacy-ставки через одинаковый ранний Factory
проход и увидеть выживших. Психологический run остаётся parked на `S4_OWNER`;
Rule24 и все психологические кандидаты не смешиваются с этим batch.

## Единственная текущая работа

Собрать `S0_CONTEXT` для шести ставок: реальный актив и его состояние,
плательщик, предполагаемый Job, модель денег, уже подтверждённые факты,
затраты/ограничения и первое недоказанное допущение. Legacy score, production
и документация учитываются только как контекст, не как разрешение на CustDev,
traffic, action или оплату.

## Gate этапа

Для всех шести кандидатов есть одна source-backed карта: что реально прочитано,
что подтверждено, чего нет и с какого question начинается `S1_MARKET`.
После этого batch может перейти в `S1_MARKET`; ранний Portfolio Gate наступит
только после `S0–S3` для всей пачки.

## Запрещённый переход

Не выбирать финалиста, не проводить интервью, не покупать трафик, не делать
продажи и не дорабатывать продукт до завершения `S0–S3` и раннего Portfolio
Gate. Нельзя считать production, payment UX, internal watcher или прежний
score доказательством спроса.
