# 2026-09-11 — Карта этапов v3.3: компактная навигация и cache delivery

## Intent

Сделать карту этапов не отчётом, а компактной навигацией: при выборе этапа
список его идей уже раскрывается ниже на той же странице, поэтому самой карточке
не нужны повторяющиеся пояснения и строка количества.

## Changes

* Карточки этапов содержат только номер этапа, количество идей, название и
  отдельный `?` с определением.
* Высота desktop-карточки снижена с `94px` до `60px`; mobile-правило снижено с
  `78px` до `56px`.
* Нажатие `Первичная проверка` остаётся inline-сценарием: вкладка `Этапы` не
  меняется, под картой появляется список четырёх идей и его фильтры.
* После первой публикации commit `c76a543` production сохранил прежние
  `styles.css` и `app.js` с query `cabinet-v32`. Добавлен отдельный cache-key
  `cabinet-v33` в `dashboard/index.html` и опубликован commit `c845baa`.

## Verification

* `node --check dashboard/app.js` — прошёл;
* `./scripts/check-local.sh` — прошёл;
* `git diff --check` — прошёл;
* UI evidence validator — `PASS` для v3.3 и отдельного cache-delivery
  кандидата;
* локально в уже открытой вкладке Chrome, `1232×582`: у `.stage-jump` высота
  `60`, текст карточки — только номер/количество/название, выбор
  `Первичной проверки` оставляет `view=funnel` и раскрывает 4 идеи;
* GitHub Pages run `34533489340` для `c76a543` завершился `success`, но
  production-проверка выявила stale cache `v32` и не была принята;
* GitHub Pages run `34533662210` для `c845baa` завершился `success`;
* production URL:
  `https://timurgromov.github.io/analiznish/dashboard/?v=c845baa#funnel`;
* production загрузил `styles.css?v=20260911-cabinet-v33` и
  `app.js?v=20260911-cabinet-v33`; `.stage-jump` равен `60px`,
  `selectedStage=quick_scan`, `visibleIdeas=4`, `scrollWidth=innerWidth=1232`.

## Evidence limits

Проверка выполнена в текущей вкладке Chrome без создания отдельного browser
process. Текущий live viewport — `1232×582`; mobile-высота `56px` определена
CSS, но в этой сессии не эмулировалась отдельно.
