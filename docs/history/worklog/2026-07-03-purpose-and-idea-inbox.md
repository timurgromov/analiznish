# 2026-07-03 — purpose and idea inbox

## Intent

Зафиксировать исходную причину проекта: пользователь создал систему не только для оценки ниш, но и для разгрузки потока идей, которые иначе превращаются в незавершенные дела и распыляют фокус.

## Context

Пользователь уточнил, что за последние месяцы накопилось много AI-assisted прототипов и идей, но часть не доведена до результата. Цель проекта — безопасно складывать идеи, пропускать их через фильтр и выбирать то, что сейчас лучше всего подходит для заработка и вовлеченности в дело.

## Changes

* В `README.md` и `PROJECT_SPEC.md` добавлен origin/purpose проекта: idea overload, снижение ментального шума, выбор фокуса.
* Добавлен режим `idea_inbox` в `UX.md`, `docs/WORKFLOW.md`, `AGENTS.md` и `docs/NICHE_INPUT_TEMPLATE.md`.
* Создан `data/IDEA_INBOX.md` как буфер сырых идей без score и без обязательства попадать в hit parade.
* `TASKS.md` дополнен задачей загрузить оставшиеся идеи в inbox.
* `docs/NICHE_REPORT_TEMPLATE.md` и `skills/niche-scoring/SKILL.md` синхронизированы с текущей моделью v0.5.
* В старую карточку `AI YouTube Automation` добавлена явная пометка, что это historical card only и она не входит в активный hit parade.
* В `docs/history/DECISIONS.md` зафиксированы активные решения по v0.5 и idea inbox; v0.4 помечена как superseded.
* `docs/history/CURRENT_STATE.md` обновлен под новую цель и наличие inbox.

## Result

Система остается docs-first и не превращается в приложение. Главное изменение — разделение "идея просто сохранена" и "идея оценена". Это должно снизить давление от сырого backlog и не загрязнять hit parade непроверенными мыслями.

## Verification

* `./scripts/check-local.sh` прошел: `project docs skeleton ok`.
* Проверено, что `data/HIT_PARADE.md` по-прежнему содержит только три активные ниши: Timur Gromov Business System, Travel Radar, PastLife AI / Sansara.
* AI YouTube Automation остался вне активного hit parade и помечен как historical card only.
