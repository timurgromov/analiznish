# Active Niche Factory Run

Schema version: 2
Run ID: legacy-portfolio-russia-2026-09-11
Registry run ID: legacy-portfolio-sigma-2026-09-11
Mode: niche_factory
Status: active
Direction: проверить существующие непсихологические ставки и активы единым SIGMA-ситом; выбрать только доказуемого кандидата для дальнейшей проверки спроса
Checkpoint ID: S2_TREND
Checkpoint gate status: in_progress
Macro phase: S · SCAN
Current step: 2
Current step name: Тренд и живые проблемы
Previous checkpoint: S1_MARKET
Completed checkpoints: S0_CONTEXT, S1_MARKET
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

Для каждого из шести кандидатов собрать одинаковые свежие признаки `S2_TREND`:
динамику интереса, сезонность и независимые живые формулировки незакрытой
проблемы. Отделять наблюдаемый тренд и повторяемый problem signal от роста
категории, единичной жалобы и продавцовских заявлений.

## Gate этапа

Для каждого кандидата есть минимум два независимых свежих сигнала о проблеме
или спросе и отдельно зафиксирована сезонность/её неизвестность. Сигналы должны
относиться к конкретному Job, а не к общему интересу к AI, путешествиям или
здоровью. Ранний Portfolio Gate наступит только после `S0–S3` для всей пачки.

## Запрещённый переход

Не выбирать финалиста, не проводить интервью, не покупать трафик, не делать
продажи и не дорабатывать продукт до завершения `S0–S3` и раннего Portfolio
Gate. Нельзя считать production, payment UX, internal watcher, прежний score
или маркетинговую страницу референса доказательством спроса.
