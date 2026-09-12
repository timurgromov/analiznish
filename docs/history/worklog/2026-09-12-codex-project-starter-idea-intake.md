# 2026-09-12 — Codex Project Starter: context inventory и приём идеи

## Intent

Заземлить идею цифрового продукта на базе существующего `Tamplates` и
авторского tech-бренда, не выдавая готовность внутренних активов за
подтверждённый спрос и не меняя hit parade до owner checkpoint.

## Реально прочитанный контекст

### `../Tamplates`

* `AGENTS.md`, `README.md`, `NEW_PROJECT_INSTRUCTIONS.md`, `PROJECT_SPEC.md`,
  `TASKS.md`;
* структура пакета: 135 файлов вне служебных каталогов, 34 reusable skills,
  шаблоны AGENTS/project memory/deploy/CI, personal plugin и 12 scripts;
* `project-bootstrap`, `github-private-launch` и `smart-vps-deploy` как
  фактический маршрут от пустого проекта к документации, GitHub и deploy.

Подтверждено: это рабочее внутреннее операторское ядро, а не готовый массовый
SKU. В папке нет Git-репозитория, customer onboarding, одного ограниченного
новичкового bundle и готового base-web skeleton; `TASKS.md` прямо оставляет
последний пункт optional.

### `../Контент-система`

* `AGENTS.md`, `README.md`, `PROJECT_SPEC.md`, `BRAND.md`, `MARKETING.md`,
  `CONTENT_SYSTEM.md`, `BLOG_PLAYBOOK.md`, `TASKS.md`, `PORTFOLIO.md`,
  `MEASUREMENT.md`, `UX.md`;
* project memory и briefs `AB-001`–`AB-003`.

Подтверждено: owner уже утвердил публичное имя `Тимур Громов`, роль
`создатель цифровых продуктов`, рубрику `Громов строит`, платформенный путь
YouTube/VK → Telegram и manual-first пилот. Но каналы, домен и сайт ещё не
созданы, ни один anchor не опубликован, audience baseline и продажи
отсутствуют.

## Решение

* Идея классифицирована как `concrete_bet`, режим `idea_inbox`.
* Предварительный класс: `B`, `baseScore: 68`, `E0: 0.25`; осторожный текущий
  рейтинг по формуле реестра — `55`.
* Сильная сторона — готовые founder-assets, реальные project proofs, низкий
  COGS и возможность проверить спрос без нового SaaS.
* Главный разрыв — слишком широкое обещание и отсутствие подтверждённого
  плательщика. Продавать нужно переход к первому работающему проекту, а не
  папку templates или общий курс «как пользоваться AI».
* `data/HIT_PARADE.md`, `data/ACTIVE_RUN.md` и завершённый B2B operations run
  не изменялись.

## Одна следующая проверка

Product-first разобрать пять реально платных русско- и англоязычных офферов с
обещанием `не разработчик → первый работающий проект через AI-агента`:
зафиксировать цену, deliverables, аудиторию, отзывы/результаты и канал продажи.
До этого не записывать полный курс, не строить платформу и не открывать новый
factory run.

## Verification

* `./scripts/check-local.sh` — passed: registry v2 содержит 28 идей в 13
  категориях, factory consistency passed.
* `git diff --check` — passed.
* `../Tamplates`: четыре канонических test suites passed — CI templates (3),
  UI workflow templates (8), pre-tool guard (11), rollout contract (2).
* `../Контент-система`: `./scripts/check-project.sh` —
  `content-system docs check: ok`; соседний repo не менялся.
* Production baseline до deploy: 27 идей, новой категории и карточки нет.
* Свежий локальный dashboard: 28 идей; поиск `Codex Project Starter` даёт одну
  строку с рейтингом 55, E0 / 25%, этапом `Чистилище`; раскрытие и переход на
  `project.html?id=codex-project-starter-product` показывают плательщика,
  результат, деньги, риск и следующую проверку.
* Browser viewports: `1440x900` для списка и `390x844` для карточки; console
  errors/warnings — 0/0.
