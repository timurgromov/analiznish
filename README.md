# Анализ Ниш — Niche Factory

Личная docs-first операционная система поиска, проверки и выбора бизнес-ниш.
Главный продукт проекта — управляемый агентом `niche_factory`: он начинает с
карты уже известных владельцу материалов и Jobs, затем находит или уточняет
направления, сокращает их до одной конкретной ставки и ведёт её через реальные
клиентские сигналы, действие и деньги до решения о build.

Второй вход — «чистилище идей»: любая новая идея фиксируется и получает
приблизительный класс `A/B/C/X` относительно цели устойчивой прибыли.
Повторяемый cashflow предпочтителен, а B2B-подписка `1 000–5 000 ₽/мес` и путь
к `100–1 000` плательщикам остаются benchmark micro-SaaS, но не hard filter. Это помогает не терять
идеи и не превращать каждую из них в новый проект.

Scoring, hit parade и dashboard — внутренние модули контура, а не сам продукт.
Они сравнивают рынки, показывают приоритет ставок и хранят решения, но не
разрешают разработку без CustDev, проверки оффера и денежного gate.

Система также принимает готовые идеи и существующие активы, включая Sansara:
они входят в тот же контур на соответствующем этапе и не получают обход gates.
Источник правды — Markdown-артефакты и project memory; dashboard остаётся
read-only операторским представлением checkpoint, воронки и портфеля.

## Быстрый сценарий

1. Новый чат сначала читает `data/ACTIVE_RUN.md`: если run активен, он
   продолжается с сохранённого этапа. Только если active run нет, фраза
   `Хочу искать нишу` начинает новый.
2. Агент сначала покажет, какие твои материалы и активы он прочитал, что из них уже известно и чего не хватает. До подтверждения этой карты он не создаёт новых ставок в рейтинге.
3. Если готовой идеи нет, агент ищет кандидатов по трём входам: pain-first
   (проблемы и спрос), product-first (готовые продукты/отзывы) и
   transaction-first (Acquire.com, Flippa, Microns и другие маркетплейсы
   бизнесов). Все кандидаты сначала попадают в чистилище; верхний batch 5–10
   проходит публичный `S · SCAN 0–3`.
4. До интервью обязателен ранний Portfolio Gate: 18 критериев, hard filters,
   приблизительная ёмкость, механизм денег, путь к прибыли и 1–2 финалиста.
5. Только финалист проходит глубокое исследование, реальный CustDev, тест оффера
   и paid-pilot gate.
6. Только после build gate допускается полноценный MVP.
7. Карточки, эксперименты, рейтинг и project memory обновляются по ходу цикла.

Сырую идею без обязательств записывай в `data/IDEA_INBOX.md`; правила порядка
описаны в `docs/IDEA_PURGATORY_PROTOCOL.md`.

Минимальный prompt для будущего чата:

```text
Хочу искать нишу. Запусти `niche_factory` по prompts/start-niche-factory.md.
```

## Ключевые файлы

| Файл | Назначение |
| --- | --- |
| `AGENTS.md` | Правила для Codex/агента внутри проекта |
| `PROJECT_SPEC.md` | Центральная архитектура Niche Factory, роли, этапы и Definition of Done |
| `docs/SCORING_MODEL.md` | Внутренняя математическая модель сравнения рынков и ставок |
| `docs/IDEA_PURGATORY_PROTOCOL.md` | Чистилище идей, классы A/B/C/X и ранний Portfolio Gate |
| `docs/WORKFLOW.md` | Маршрутизация режимов и операционный порядок работы |
| `docs/NICHE_DISCOVERY_LOOP.md` | Завод поиска: scan → CustDev → action → pay → repeat |
| `docs/SIGMA_EXECUTION_MODEL.md` | Исполняемый `S · SCAN`: точные 10 этапов `0–9`, переходы и обязательный статус каждого прохода |
| `docs/INSIGHT_EXECUTION_MODEL.md` | Исполняемый `I · INSIGHT`: public corpus, AI-синтез и обязательные real/action/pay gates |
| `docs/RAIL_PROTOCOL.md` | Правила удержания активного run и обязательный формат каждого checkpoint |
| `docs/REFERENCE_MINING_PROTOCOL.md` | Разбор готовых сервисов, альтернатив и отзывов без копирования продукта |
| `docs/MARKETPLACE_REVERSE_ENGINEERING_PROTOCOL.md` | Разбор продаваемых онлайн-бизнесов, seller claims, проверенных метрик и sold comparables |
| `docs/SIGMA_SOURCE_PLAYBOOK.md` | Проверенные источники SIGMA: где искать референсы, отзывы и голос клиента |
| `docs/CUSTDEV_PROTOCOL.md` | Реальные B2B-интервью и gates перед build |
| `docs/NICHE_QUESTIONNAIRE.md` | Полный обязательный опросник для объективной оценки |
| `docs/NICHE_INPUT_TEMPLATE.md` | Формат входных данных по новой идее |
| `docs/NICHE_REPORT_TEMPLATE.md` | Формат полноценного отчета по нише |
| `data/IDEA_INBOX.md` | Упорядоченное чистилище сырых идей до доказательного рейтинга |
| `data/ACTIVE_RUN.md` | Единственный оперативный источник правды: текущая phase, этап, работа и gate |
| `data/discovery/` | Контекстные карты, Jobs map, product/marketplace archaeology до оценки ставки |
| `data/HIT_PARADE.md` | Живой рейтинг ниш |
| `data/niches/` | Карточки отдельных ниш |
| `data/niches/INDEX.md` | Единый реестр карточек для dashboard и валидатора |
| `data/references/` | Архив конкурентных исследований, которые не являются отдельными активными объектами |
| `data/interviews/` | Обезличенные итоги CustDev |
| `data/experiments/` | Проверки оффера, канала, цены, пилотов и retention |
| `data/FACTORY_STATE.json` | Проверяемый routing index текущего checkpoint, batch и прогонов для dashboard |
| `dashboard/` | Операторский интерфейс: сейчас, воронка, кандидаты, прогоны, портфель и методология |
| `docs/history/` | Память проекта между чатами |
| `prompts/` | Готовые prompts для повторяемой работы |

Готовые точки входа: `prompts/start-niche-factory.md` для поиска с нуля и
`prompts/run-custdev-cycle.md` для проверки выбранной B2B-ставки.

## Скоринг как внутренний модуль

Система не сводит всё к одному «лучшему бизнесу». Она разделяет силу рынка и приоритет нашей конкретной ставки:

```text
market_opportunity_score = round(0.60 * market_score + 0.40 * economics_score)

execution_priority_score = round(
  (0.40 * economics_score + 0.35 * moat_scale_score + 0.25 * personal_filter_score)
  * evidence_confidence
)
```

`market_opportunity_score` отвечает, сильны ли категория и модель заработка; он подходит и для чужого референса. `execution_priority_score` отвечает, стоит ли сейчас вкладывать 7–14 дней в **нашу** конкретную модель, поэтому не считается для конкурента, пока не выбраны наш сегмент, оффер и канал. Сначала применяются hard filters и красные флаги. Базовая оценка разложена на 4 блока: `Рынок`, `Экономика`, `Защита и масштаб`, `Личный фильтр`.

С v0.7 первые три блока детерминированы: рынок считается из 7 рыночных критериев, экономика — из LTV, маржи, cash cycle и реинвестирования, защита/масштаб — из moat, операционной масштабируемости и канала. `node scripts/validate-portfolio.mjs` проверяет карточки, формулы, обе таблицы и сортировку.

## Локальный dashboard

Dashboard читает проверяемый routing index и Markdown-файлы:

* `data/FACTORY_STATE.json`;
* `data/HIT_PARADE.md`;
* `docs/SCORING_MODEL.md`.

Запуск:

```bash
docker compose up -d dashboard
```

Открыть:

```text
http://127.0.0.1:8765/dashboard/
```

Контейнер использует `restart: unless-stopped`, поэтому dashboard остается доступен после закрытия Codex-сессии и перезапуска Docker Desktop. Dashboard read-only: чтобы изменить checkpoint, batch, рейтинг или критерии, обновляй проектные источники через workflow; JSON не является второй БД.

## Публичный dashboard

После включения GitHub Pages интерфейс доступен с любого устройства:

```text
https://timurgromov.github.io/analiznish/dashboard/
```

Workflow `.github/workflows/deploy-pages.yml` публикует только dashboard, папку `data/` и `docs/SCORING_MODEL.md`, который нужен для расшифровки критериев. Источник GitHub Pages уже настроен на `GitHub Actions`; каждый push изменений в них на `main` автоматически обновляет страницу.

Проверка статуса:

```bash
docker compose ps
```

Остановка, если понадобится:

```bash
docker compose down
```

## Проверка проекта

```bash
./scripts/check-local.sh
```

Проверка убеждается, что базовые документы на месте и в проект случайно не попали очевидные секреты.

## Текущее состояние

* Product status: `configured`, но не `validated` до первого полного factory-run.
* Git: репозиторий инициализирован на ветке `main`; origin подключен к `https://github.com/timurgromov/analiznish.git`.
* Runtime: локальный static dashboard через Docker Compose + nginx.
* Production deploy: read-only dashboard опубликован на GitHub Pages.
* GitHub: удалённый репозиторий создан пользователем как public; секреты и локальные артефакты остаются исключены через `.gitignore`. GitHub Pages публикует read-only dashboard после разового включения источника `GitHub Actions`.
