# Current State — 2026-09-14

## Текущая точка

Desk research всех 25 concrete bets завершён. Run
`global-portfolio-gate-2026-09-13` припаркован на `S4_OWNER — план пакета
интервью`: исследовательской очереди нет, следующий шаг — выбрать рабочий пакет
из 1–3 desk-квалифицированных проектов и одну текущую работу внутри него.

Итоговая классификация 28 объектов:

* 20 concrete bets прошли S0–S5 и вошли в ранжированный desk-квалифицированный пул;
* 3 ставки требуют уточнить Thesis Contract: generic AI-психолог, marketplace
  психологических сессий и общий field-service ops;
* 2 hard failed exact-модели: AI YouTube Automation и ProfiWatcher;
* 3 действующих бизнеса или рыночных референса не участвуют в выборе.

Полный дайджест: `data/PORTFOLIO_CLOSURE.md`. Машинный источник:
`data/IDEA_REGISTRY.json`. Реальные интервью ещё не проведены; strongest
evidence двадцати desk-квалифицированных ставок остаётся E1.

## Что исправлено и проверено

* Устранена искусственная квота «три финалиста». Завершение desk research теперь
  означает прохождение S0–S5 без hard blocker, а не победу в рейтинге или
  фактическую готовность к интервью.
* Повторно исследованы 14 ранее остановленных ставок. Одиннадцать доведены до
  S5; по ним отсутствие WTP, switching reason, buyer access, канала или repeat
  признано вопросом интервью/эксперимента, а не основанием для desk-отсева.
* Три широкие/дублирующие ставки оставлены в `quick_scan` с точным условием
  уточнения. Это не отрицание рынка.
* Codex Project Starter остаётся одной канонической ставкой AI-перехода и
  первого измеримого внедрения. Templates, группа и сопровождение — компоненты,
  не отдельные продукты.
* Два hard blockers перепроверены по актуальным правилам платформ/источников.

## Исполняемая логика Factory

`competition state` отделён от стадии и gate outcome. Пул
`provisional_finalist` не имеет верхнего лимита. В `selected_for_interviews`
владелец может поместить 1–3 проекта, но `Selected focus IDs` содержит ровно
одну текущую работу. После её интервью фокус можно последовательно перевести на
следующий проект пакета.

`out_of_current_competition` теперь означает только «сначала уточнить границу
ставки/убрать дубль». `failed` требует явного `blockerCode` и проваленного
schema-критерия. Конкуренты, отсутствие готового канала, продукта, moat,
продаж, WTP или repeat не являются terminal filters новой идеи.

Для принесённой владельцем идеи обязателен Definition Interview и один
подтверждённый Thesis Contract. Сегменты, ICP, цена, канал и delivery не создают
новые продукты без отдельного owner authorization.

## Состояние системы

Niche Factory v2 имеет статус `configured`, но не `validated` полным
end-to-end циклом. Для этого хотя бы одна ставка должна пройти реальные
интервью, action, money, bounded build и repeat gate либо получить честный
terminal outcome.

Работает:

* машинный контракт `data/FACTORY_SCHEMA.json` schema v4;
* единый реестр `data/IDEA_REGISTRY.json` schema v5;
* active-run rail и consistency validators;
* scoring v0.7 и две независимые портфельные линзы;
* read-only dashboard с кликабельными группами `20/3/2/3`; двадцатка показывает
  ранжирование, базу, доверие и ограниченную сопоставимость E1-оценок;
* public allowlist build без внутренних source paths;
* локальный validation suite `./scripts/check-local.sh`.

## Runtime и release boundary

* Frontend: static dashboard в `dashboard/`.
* Backend/PostgreSQL отсутствуют; подробности в Markdown, индекс в JSON.
* Local: `http://127.0.0.1:8765/dashboard/` через Docker Compose/nginx.
* Production: `https://timurgromov.github.io/analiznish/dashboard/`.
* Branch `main`, origin `https://github.com/timurgromov/analiznish.git`.
* Dashboard read-only; решения меняются через источники и validators.

## Единственный следующий gate

Владелец выбирает пакет подготовки 1–3 проекта из двадцати desk-квалифицированных
и называет один текущим. Для него агент готовит I_E1-корпус, screener, гипотезы
и plan; только после I_E1 начинаются минимум пять реальных интервью. До этого
action, money и build не открыты.
