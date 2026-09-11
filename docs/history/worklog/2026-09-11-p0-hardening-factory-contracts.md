# 2026-09-11 — P0-hardening контрактов Niche Factory

## Контекст

Контур имел статус configured, но одновременно использовал несколько
несовместимых lifecycle-схем, пропускал evidence-caps, дублировал parked run в
factory state и публиковал внутренние Markdown-каталоги в GitHub Pages.

## Что изменено

* `data/FACTORY_SCHEMA.json` стал машинным контрактом стадий, checkpoints,
  переходов, evidence-caps и readiness gates.
* `ACTIVE_RUN.md` переведён на schema v2 и оставлен parked на `S4_OWNER` без
  выбранного P1/P2. Исправление не возобновляет интервью.
* Реестр переведён на schema v2; active confidence ограничен E-level caps,
  исходные legacy-значения сохранены отдельно.
* Импортируемый validation-модуль проверяет active run, registry, factory
  state, их согласованность и публичный артефакт.
* Pages строится отдельным allowlist-script; внутренние каталоги и `source`
  реестра не публикуются.
* Participant-level интервью перенесены за публичную границу
  `.local/interviews/`; в Git разрешена только cohort synthesis.
* Dashboard показывает честный configured-статус, `Данные загружены`,
  legacy-пояснение и скрывает source-link, когда публичного пути нет.

## Проверки

До commit: `./scripts/check-local.sh`, `node --test`, `node --check` обоих
dashboard scripts, public build allowlist и `git diff --check` прошли.
Локальный dashboard и очищенный публичный артефакт проверены на `390x844` и
`1440x900`; полная responsive-матрица включает границы `559/560/561`,
`759/760/761`, `1099/1100/1101` и контрольные desktop/tablet размеры. Overflow
не найден; публичная карточка КАДРА показывает active `55%`, legacy `65%` и не
содержит source-ссылки. Production run и HTTP-проверки фиксируются как release
evidence после push и не требуют второго изменения репозитория.

## Решение

Архитектурные блокеры P0 устранены, но factory остаётся `configured`, а не
`validated`. Единственный следующий системный gate — выбрать один run для
первого end-to-end подтверждения. Психологический run остаётся parked.
