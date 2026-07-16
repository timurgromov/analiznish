# 2026-07-01 — project bootstrap

## Intent

Создать отдельный проект для оценки ниш, скоринга и живого хит-парада, чтобы быстро отсекать слабые идеи и фокусироваться на шансах получить деньги.

## Context

Пользователь принес транскрибацию видео Антона Власова и описал текущую проблему: много стартап-идей, распыление, недостаток быстрых денежных результатов.

## Changes

* Созданы проектные правила в `AGENTS.md`.
* Созданы `README.md`, `PROJECT_SPEC.md`, `TASKS.md`, `UX.md`, `.env.example`.
* Добавлены `docs/SCORING_MODEL.md`, `docs/WORKFLOW.md`, `docs/NICHE_INPUT_TEMPLATE.md`, `docs/NICHE_REPORT_TEMPLATE.md`.
* Добавлены `data/HIT_PARADE.md` и `data/niches/README.md`.
* Добавлена project memory структура в `docs/history/`.
* Добавлен локальный check script.

## Verification

* Локально: `./scripts/check-local.sh` passed.
* Production/VPS/staging: не применимо.
* Тесты: runtime отсутствует, проект docs-only.

## Result

Проект готов принимать первые реальные идеи для `quick_scan` и `deep_score`.

## Risks / Follow-up

* Нужно прогнать реальные идеи и откалибровать веса.
* Git пока не инициализирован.
* Нет автоматического пересчета hit parade.

## Links

* Commit: none.
* PR: none.
* Deploy: none.
* Related decisions:
  * `DEC-2026-07-01-SCORING-ARCHITECTURE`
  * `DEC-2026-07-01-EVIDENCE-FIRST`
  * `DEC-2026-07-01-DOCS-FIRST`
