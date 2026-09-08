# Prompt — Update Hit Parade

```text
Model note: GPT-5.6 Sol/Высокий — нужно аккуратно обновить рейтинг, evidence stage и память проекта.

Прочитай AGENTS.md, docs/NICHE_DISCOVERY_LOOP.md, docs/SCORING_MODEL.md, docs/WORKFLOW.md, data/HIT_PARADE.md и последнюю карточку ниши.

Обнови hit parade:

1. Проверь тип объекта: `market_reference`, `concrete_bet`, `existing_asset` или `active_business`.
2. Проверь таблицу детальных критериев и базовые scores.
3. Пересчитай `market_opportunity_score`.
4. Считай `execution_priority_score` только когда определены наш сегмент, оффер и канал.
5. Примени caps/penalties.
6. Для новой или переоцениваемой конкретной ставки укажи `validation_stage`, strongest evidence E0–E5 и примени evidence cap.
7. Отсортируй карту рынков и очередь ставок независимо.
8. Обнови data/HIT_PARADE.md и карточку в data/niches/.
9. Добавь worklog, если изменение meaningful.
10. Не коммить без отдельной просьбы.
```
