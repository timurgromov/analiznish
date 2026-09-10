# 2026-09-10 — Операторский dashboard v2

## Intent

Сделать визуальный слой Niche Factory полезным для возврата в проект: показать
текущий checkpoint, путь от идей до денег, кандидатов последнего batch, историю
прогонов и существующий портфель без создания второй базы данных.

## Decision

Markdown остаётся источником содержания. Добавлен
`data/FACTORY_STATE.json` — небольшой проверяемый routing index, который
связывает current checkpoint, последний batch, кандидатов, статусы
тестируемости, run history и source paths. Score силы рынка и фактическая
готовность к дешёвому тесту не смешиваются в третью формулу.

Доменный run психологов остаётся `parked`. Dashboard показывает его как
последний проверенный batch, но общий current checkpoint требует отдельного
owner decision: начать новый широкий поиск либо явно возобновить P1/P2.

## Visible result

* первый экран начинается с `Сейчас`, а не с формул;
* отдельная rail показывает `21 → 8 → 2 → 0 → 0 → 0` и текущий gate реальных
  клиентов;
* восемь психологических моделей фильтруются по финалистам, резерву, парковке и
  отсеву;
* у каждой видны плательщик, деньги, риск, следующий gate, два score и
  testability status;
* история прогонов и обе портфельные линзы сохранены;
* формулы и 18 критериев перенесены в нижний сворачиваемый блок.

## Verification

* `node --check dashboard/app.js`
* `node scripts/validate-factory-state.mjs`
* `./scripts/check-local.sh`
* `git diff --check`
* локальный browser-check: current checkpoint, filter finalists, market tab
* responsive matrix: `390×844`, `559/560/561`, `660`, `759/760/761`,
  `768×1024`, `930×1024`, `1024×768`, `1099/1100/1101`, `1180×820`,
  `1366×768`, `1440×900`, `1984×1046`; horizontal overflow и console errors —
  отсутствуют

Production verification добавляется после GitHub Pages deploy.
