# Project Design Context

## Product

`Анализ Ниш` — русский read-only operator dashboard на static HTML/CSS/JS.
Главная задача интерфейса — показать владельцу один следующий evidence gate,
не подменяя market validation score или готовностью legacy-кода.

## Sources

* Tokens: `dashboard/styles.css`
* UI: `dashboard/index.html`, `dashboard/app.js`
* Product contract: `UX.md`
* Instructions: `AGENTS.md`, `dashboard/AGENTS.md`

## Direction

Плотный спокойный бело-сине-зелёный cockpit. Первый экран — owner decision,
затем checkpoint-rail одного `factory_v2` run. Общая карта стадий вторична и
показывает только текущее положение. Действующий бизнес вынесен в отдельный
benchmark, потому что он не доказывает последовательный Factory-run.

## Constraints

* Dashboard остаётся read-only и Russian-first.
* Stage drill-down, filters, evidence caps и public allowlist сохраняются.
* Интервью-готовность не выводится из score.
* Не смешивать legacy и разные run в одну арифметическую воронку.
* Не добавлять React, Tailwind или новый UI framework.
* На `390px` не должно быть page overflow.

## Selected decision

2026-09-12: dashboard v5 использует связку `Экран решений + один batch`;
карта текущих стадий остаётся вторичной.
