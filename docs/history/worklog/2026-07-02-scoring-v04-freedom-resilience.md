# 2026-07-02 — scoring v0.4 freedom and financial resilience

## Intent

Добавить в систему оценки факторы, которые пользователь считает важными для выбора ниш:

* растущий рынок;
* свобода от локации, дат и личного присутствия;
* финансовая устойчивость: валюта, география, не только Россия.

## Changes

* `docs/SCORING_MODEL.md` обновлен до v0.4.
* `Тренд / Wordstat` переименован в `Рост рынка / тренд` и оставлен внутри `Нишевого балла`.
* Добавлены отдельные score:
  * `freedom_score` / `Свобода`;
  * `financial_resilience_score` / `Фин. устойчивость`.
* Формула обновлена:

```text
overall_score = round((0.55 * niche_score + 0.20 * fast_money_score + 0.10 * freedom_score + 0.10 * financial_resilience_score + 0.05 * focus_score) * evidence_confidence)
```

* `data/HIT_PARADE.md` пересчитан под v0.4.
* Карточки текущих ниш обновлены в score-блоках и hit-parade rows.
* Dashboard обновлен: новые колонки отображаются как score bars и показываются в выбранной нише.

## Result

После добавления свободы и финансовой устойчивости рейтинг изменился:

1. Travel Radar — `59`
2. Timur Gromov Business System — `58`
3. PastLife AI / Sansara — `56`
4. AI YouTube Automation — `47`

Timur остается сильным денежным ядром, но снижается в общем рейтинге из-за привязки к Москве, датам, личному присутствию и рублевому локальному рынку.

## Verification

* Локальная проверка пройдена: `./scripts/check-local.sh` -> `project docs skeleton ok`.
* JS syntax check пройден: `node --check dashboard/app.js`.
* Проверена отдача `docs/SCORING_MODEL.md` через локальный сервер: v0.4, новая формула, `Свобода`, `Фин. устойчивость`, `Рост рынка / тренд`.
