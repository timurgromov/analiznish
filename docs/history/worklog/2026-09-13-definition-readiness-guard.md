# 2026-09-13 — Definition Gate и защита новых идей от преждевременного отсева

## Причина

На Codex Project Starter проявились две системные ошибки. Агент сначала
размножил одну идею на варианты по сегменту и delivery, затем сузил исходный
продукт до self-serve templates и закрыл его по низкому execution score и
отсутствию готового канала/moat/repeat. Владелец не принимал решение
`passed_not_selected`.

## Решение

Добавлен обязательный `docs/IDEA_DEFINITION_PROTOCOL.md`: конкретная идея
начинается с короткого owner interview, одного Thesis Contract и явного
подтверждения канонического тезиса. Вопросы задаются максимум по четыре за
сообщение; владелец не обязан заранее знать рынок, канал, цену или экономику.

Оценка разделена на четыре слоя: opportunity, business design, readiness и
evidence confidence. Отсутствие готового продукта, канала, аудитории, кейсов,
moat и доказанных CAC/LTV/repeat стало non-terminal: это вход в план
исследования, а не причина `failed` или `passed_not_selected`. Score определяет
порядок следующих экспериментов, но не outcome.

## Машинные предохранители

* `single_thesis` требует один Candidate ID, owner-confirmed canonical thesis,
  источник определения и список запрещённых подмен;
* canonical thesis должен дословно совпадать в `ACTIVE_RUN` и реестре;
* readiness gaps не могут быть blocker codes;
* `passed_not_selected` конкретной ставки требует явного owner decision и его
  источник;
* S4/S5 используют проверяемые гипотезы бизнеса и достижимой аудитории, а не
  требование уже иметь готовый канал или moat.

## Исправление состояния

Codex Project Starter восстановлен как программа практического AI-перехода и
первого внедрения, а не набор templates. Предыдущее desk-завершение помечено
`superseded`; run возвращён на активный `S1_MARKET`. Rule24, КАДРА, Generic
AI-психолог и marketplace психосессий переведены из ошибочных terminal outcomes
в `parked`; terminal failed оставлен только двум ставкам с legal/platform
blocker.

## Следующий gate

Для Codex Project Starter найти минимум три независимые платные модели
AI-перехода/практического внедрения. По каждой должны быть видны плательщик,
клиентская трансформация, delivery и граница достоверности. До выполнения gate
S1 не считается пройденным.

## Проверка

`./scripts/check-local.sh` прошёл: active run `S1_MARKET`, registry — 28 идей,
factory consistency — успешно. `node --test` — 25/25, включая негативные
проверки thesis drift, readiness blocker и owner-less `passed_not_selected`.
`git diff --check` — без ошибок; `skills/niche-scoring` прошёл `quick_validate`.
