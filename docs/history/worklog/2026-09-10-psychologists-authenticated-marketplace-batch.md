# 2026-09-10 — Авторизованный marketplace batch по психологии

## Intent

Проверить на реальной авторизованной выдаче Acquire.com, способен ли
transaction-first контур не просто перечислить приложения, а выдать
сопоставимый batch идей и ранний отсев до CustDev.

## What was checked

* В уже авторизованном Chrome выполнен read-only поиск Acquire по шести
  psychology/therapy/practice запросам.
* Собран корпус из 21 lead: 14 Acquire, 3 Flippa и 4 Microns.
* Пять релевантных Acquire listings открыты до доступных базовому аккаунту
  business model, customer и financial полей.
* Marketplace evidence пересечён с прежними российскими Jobs, конкурентами,
  Wordstat и новым App Store evidence по `I feel food`.

## Result

Создан
`data/discovery/2026-09-10-psychologists-authenticated-marketplace-batch.md`:

* нормализован корпус и противоречия seller claims;
* выделены шесть повторяющихся денежных паттернов;
* восемь конкретных моделей получили ранний score по 18 критериям;
* P1 `обращение → оплаченная первая консультация` и P2 `контролируемая
  психологом работа между сессиями в РПП` оставлены финалистами;
* employer outcome и couples app отмечены как сильные внешние рынки, но не как
  ближайшие ставки владельца;
* generic AI therapist, marketplace сессий и generic CRM не прошли ближайший
  gate.

## Evidence limits

* Финансы Acquire/Microns остаются seller-reported без P&L/Stripe diligence.
* Sold badge не раскрывает цену сделки.
* Российская готовность платить не подтверждена.
* Максимальный уровень — E1, поэтому build не разрешён.

## Portfolio decision

Hit parade и active run не изменены: нужен owner checkpoint между P1 и P2.
Припаркованный психологический run не возобновлялся.

## Verification

* `./scripts/check-local.sh`
* `git diff --check`
