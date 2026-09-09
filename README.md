# Анализ Ниш — Niche Factory

Личная docs-first операционная система поиска, проверки и выбора бизнес-ниш.
Главный продукт проекта — управляемый агентом `niche_factory`: он начинает с
карты уже известных владельцу материалов и Jobs, затем находит или уточняет
направления, сокращает их до одной конкретной ставки и ведёт её через реальные
клиентские сигналы, действие и деньги до решения о build.

Scoring, hit parade и dashboard — внутренние модули контура, а не сам продукт.
Они сравнивают рынки, показывают приоритет ставок и хранят решения, но не
разрешают разработку без CustDev, проверки оффера и денежного gate.

Система также принимает готовые идеи и существующие активы, включая Sansara:
они входят в тот же контур на соответствующем этапе и не получают обход gates.
Источник правды — Markdown-артефакты и project memory; dashboard остаётся
read-only представлением портфеля.

## Быстрый сценарий

1. Чтобы начать с нуля, открой новый чат и скажи: `Хочу искать нишу`.
2. Агент сначала покажет, какие твои материалы и активы он прочитал, что из них уже известно и чего не хватает. До подтверждения этой карты он не создаёт новых ставок в рейтинге.
3. Агент уточнит ограничения, построит карту регулярных Jobs и разберёт работающие сервисы, их альтернативы и публичный голос клиента.
4. После твоего checkpoint shortlist пройдёт hard filters, quick scan и deep research.
5. Одна ставка перейдёт через реальный CustDev, тест оффера и paid-pilot gate.
6. Только после build gate допускается полноценный MVP.
7. Карточки, эксперименты, рейтинг и project memory обновляются по ходу цикла.

Сырую идею без обязательств по-прежнему можно отдельно записать в
`data/IDEA_INBOX.md`.

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
| `docs/WORKFLOW.md` | Маршрутизация режимов и операционный порядок работы |
| `docs/NICHE_DISCOVERY_LOOP.md` | Завод поиска: scan → CustDev → action → pay → repeat |
| `docs/REFERENCE_MINING_PROTOCOL.md` | Разбор готовых сервисов, альтернатив и отзывов без копирования продукта |
| `docs/CUSTDEV_PROTOCOL.md` | Реальные B2B-интервью и gates перед build |
| `docs/NICHE_QUESTIONNAIRE.md` | Полный обязательный опросник для объективной оценки |
| `docs/NICHE_INPUT_TEMPLATE.md` | Формат входных данных по новой идее |
| `docs/NICHE_REPORT_TEMPLATE.md` | Формат полноценного отчета по нише |
| `data/IDEA_INBOX.md` | Низкофрикционный список сырых идей до оценки |
| `data/discovery/` | Контекстные карты, Jobs map и product archaeology до оценки ставки |
| `data/HIT_PARADE.md` | Живой рейтинг ниш |
| `data/niches/` | Карточки отдельных ниш |
| `data/niches/INDEX.md` | Единый реестр карточек для dashboard и валидатора |
| `data/references/` | Архив конкурентных исследований, которые не являются отдельными активными объектами |
| `data/interviews/` | Обезличенные итоги CustDev |
| `data/experiments/` | Проверки оффера, канала, цены, пилотов и retention |
| `dashboard/` | Локальный интерфейс для просмотра хит-парада и критериев |
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

Dashboard читает Markdown-файлы напрямую:

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

Контейнер использует `restart: unless-stopped`, поэтому dashboard остается доступен после закрытия Codex-сессии и перезапуска Docker Desktop. Dashboard read-only: чтобы изменить рейтинг или критерии, редактируй Markdown через проектный workflow.

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
