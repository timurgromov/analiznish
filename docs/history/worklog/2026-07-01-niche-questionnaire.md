# 2026-07-01 — niche questionnaire

## Intent

Сделать оценку ниш более объективной: не по свободному рассказу пользователя, а по обязательному перечню вопросов.

## Context

Пользователь уточнил, что для оценки ниши нужен структурированный опросник: если данных не хватает, агент должен явно запросить недостающие ответы, а не оценивать идею по неполному описанию.

## Changes

* Добавлен `docs/NICHE_QUESTIONNAIRE.md` с уровнями заполнения, обязательным блоком A и подробными блоками B-K.
* Обновлены `AGENTS.md`, `docs/WORKFLOW.md`, `docs/NICHE_INPUT_TEMPLATE.md`, `docs/NICHE_REPORT_TEMPLATE.md`.
* Обновлены `README.md`, `PROJECT_SPEC.md`, `TASKS.md`, `skills/niche-scoring/SKILL.md`, `prompts/evaluate-niche.md`.
* `scripts/check-local.sh` теперь проверяет наличие questionnaire file.

## Verification

* Локально: `./scripts/check-local.sh` passed.
* Production/VPS/staging: не применимо.
* Тесты: runtime отсутствует, проект docs-only.

## Result

Для `deep_score` теперь обязателен блок A из `docs/NICHE_QUESTIONNAIRE.md`. Без него агент должен вернуть недостающие вопросы и не делать полноценную оценку.

## Risks / Follow-up

* После 3-5 реальных оценок нужно проверить, не слишком ли длинная анкета для практического использования.
* Возможно, понадобится короткая Google Sheets/CSV-версия опросника.

## Links

* Commit: none.
* PR: none.
* Deploy: none.
* Related decisions: `DEC-2026-07-01-QUESTIONNAIRE-GATE`.
