# 2026-09-09 — I · INSIGHT и active-run rails

## Intent

Полностью встроить материал COMANDOS AI про AI-CustDev и устранить системную
причину, по которой чат мог забывать текущий этап, перескакивать к новым идеям
или снова объяснять метод вместо выполнения.

## Context

Владелец дал публичную страницу
`https://comandos.ai/blog/kak-sdelat-castdev-cherez-ai` и потребовал, чтобы
Niche Factory всегда возвращал разговор к последовательному протоколу. До
изменения текущая работа была распределена между current state, discovery board
и chat context; единого active pointer не существовало.

## Source findings

* Страница и встроенный интерактивный гайд проверены полностью.
* Ядро авторского `I · INSIGHT`: собрать 20–50 наблюдений из семи типов
  публичных источников; извлечь боли, страхи, желания и триггеры; сформировать
  контекст/JTBD; создать персонажей и anti-segment; провести synthetic
  interview; получить варианты позиционирования.
* Сам источник отмечает ограничения synthetic respondents для B2B со сложным
  принятием решений и регионального контекста.
* Числовые claims автора сохранены только как source claims и не приняты за
  evidence конкретной ниши.

## Changes

* Добавлен machine-checked `data/ACTIVE_RUN.md`; текущая точка — психологи,
  `S · SCAN 2 — Разведка`.
* Добавлен `docs/RAIL_PROTOCOL.md` с правилами продолжения после нового чата,
  model switch, compaction, методологической ссылки и побочной идеи.
* Добавлен `docs/INSIGHT_EXECUTION_MODEL.md`: авторские public/synthetic шаги
  отделены от real problem/action/pay gates.
* Добавлен шаблон E1 insight-run с provenance, противоречиями, anti-segment и
  synthetic stress test.
* Правила агента, Cursor rule, project-local skill, central spec, workflow, UX,
  prompts, tasks, README и project memory синхронизированы.
* Добавлен `scripts/validate-active-run.mjs` и подключён к `check-local.sh`.

## Verification

* `node scripts/validate-active-run.mjs` — passed: активный run и этап 2 найдены.
* `./scripts/check-local.sh` — passed: portfolio, active run, docs skeleton и
  secret scan.
* `git diff --check` — passed.

## Result

Контур теперь имеет одну восстанавливаемую точку исполнения, а не только набор
методических документов. Интеграция нового источника не изменила текущий этап:
следующая работа остаётся `S · SCAN 2` по трём Jobs психологов.

## Risks / Follow-up

* Rail исполняется правилами агента и валидатором структуры; фактическое качество
  ответов проверится на следующих шагах живого run.
* Public/synthetic INSIGHT остаётся E1 и не должен сократить реальные gates.
* Материалы автора для `G`, `M` и `A` пока не предоставлены и не реконструируются
  из догадок.
