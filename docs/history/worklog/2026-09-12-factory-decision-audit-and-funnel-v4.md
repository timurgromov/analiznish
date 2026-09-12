# 2026-09-12 — Аудит решений и dashboard funnel v4

## Что проверено

Сверены исходное правило конкуренции, commits с ошибочными operational outcomes,
актуальные ACTIVE_RUN, реестр, три source board, Portfolio Closure, factory state,
hit parade, schema, validator и публичная граница Pages.

## Решение

Ошибочные competition-based terminal outcomes отменены. Радарыч возвращён в
финалисты, Sansara и Cycle припаркованы до evidence, семь B2B-гипотез прошли S1
и ждут S2. Валидные hard/economics blockers пяти exact-ставок сохранены.

Schema и registry расширены явным audit trail. Dashboard перестроен из списка
текущих полок в сквозную воронку решений и подробную проверяемую карточку.

## Что нельзя забыть

* конкуренты подтверждают рынок, но не гарантируют выбор нашей ставки;
* unknown даёт parked, а не failed;
* следующий исследовательский gate — S2 для семи B2B-кандидатов;
* до owner choice и I_E1 реальные интервью не открыты;
* контур остаётся configured и не подтверждён end-to-end.

## Проверка

* `./scripts/check-local.sh` — все registry/run/state/docs contracts проходят;
* `node --test` — 19/19, включая негативные fixtures конкуренции, blocker и
  обязательного раннего Portfolio Gate;
* `node --check` для обоих dashboard scripts и `git diff --check` — проходят;
* public build — 12 allowlisted файлов; schema build-contract, factory-state
  source и registry source-paths удалены;
* local candidate и очищенный public artifact проверены в Playwright на 16
  ширинах от 390 до 1984 px: 8 stages, default funnel, нулевой page overflow,
  полностью видимые tabs и ноль console errors;
* мобильная карточка Радарыча: 6 decision facts, 4 фактических критерия,
  14 checkpoints с раскрываемыми gate criteria, current `S4_OWNER`, конкуренция
  подтверждает рынок.

Production Pages проверяется отдельно после push; локальные результаты не
выдаются за live deploy.
