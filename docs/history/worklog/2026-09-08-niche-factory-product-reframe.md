# 2026-09-08 — Niche Factory как центральный продукт

## Intent

Не добавлять контур поиска как ещё одну функцию старой системы оценки, а
перестроить продуктовую иерархию: Niche Factory является главным workflow;
scoring, hit parade и dashboard обслуживают его.

## Changes

* `PROJECT_SPEC.md` переписан вокруг ролей, entry points, десяти фаз factory,
  evidence/investment gates и операционного Definition of Done.
* `TASKS.md` превращён из исторического списка в исполнимый roadmap NF-1/NF-2/NF-3.
* Отдельно сохранены recovery lane Sansara, очередь evidence существующего
  портфеля и hardening только после первого полного прохода.
* README, UX, AGENTS, workflow, current state и active decision синхронизированы
  с новой продуктовой иерархией.

## Verification

* `./scripts/check-local.sh` — passed: portfolio v0.7, 9 markets,
  7 executable bets; docs skeleton и secret scan прошли.
* `git diff --check` — passed.
* `node --check dashboard/app.js` — passed.
* `AGENTS.md` — 17 909 bytes, ниже принятого компактного лимита 18 KiB.
* Инварианты root workflow, internal scoring, `configured/validated`, NF-1/NF-2/NF-3
  и `recovery_discovery` найдены во всех применимых документах.
* Основная переработка зафиксирована commit `af6b82f`.

## Result

Документация теперь должна отвечать на один вопрос: как агент и пользователь
доходят от отсутствия идеи до доказанного решения `build`, `pivot`, `park` или
`kill`, не подменяя рынок скорингом или готовым кодом.

## Follow-up

Первый end-to-end factory-run остаётся операционной проверкой. До него статус
системы — `configured`, не `validated`.
