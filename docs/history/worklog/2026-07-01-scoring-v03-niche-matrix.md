# 2026-07-01 — scoring v0.3 niche matrix

## Intent

Исправить архитектуру скоринга после обратной связи пользователя: критерии из исходной методологии должны быть основной системой оценки, а не отдельным `Власов`-score рядом с дублирующим `Масштаб`.

## Changes

* `docs/SCORING_MODEL.md` обновлен до v0.3.
* `vlasov_score` заменен на `niche_score` / `Нишевой балл`.
* `scale_score` убран из итоговой формулы и hit parade.
* `Масштаб` перенесен внутрь `Нишевого балла` через критерии:
  * операционная масштабируемость;
  * канал роста.
* `data/HIT_PARADE.md` переведен на колонки: `Итог`, `Нишевой балл`, `Быстрые деньги`, `Фокус`, `Доверие`.
* `docs/NICHE_REPORT_TEMPLATE.md`, `docs/WORKFLOW.md`, `PROJECT_SPEC.md`, `README.md`, `AGENTS.md`, локальный skill и prompts синхронизированы под v0.3.

## Result

Актуальная формула:

```text
overall_score = round((0.65 * niche_score + 0.25 * fast_money_score + 0.10 * focus_score) * evidence_confidence)
```

Старая схема `Власов + Быстрые деньги + Масштаб + Фокус` больше не является активной.

## Verification

* Локальная проверка пройдена: `./scripts/check-local.sh` -> `project docs skeleton ok`.
