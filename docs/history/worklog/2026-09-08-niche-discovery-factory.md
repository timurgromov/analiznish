# 2026-09-08 — Niche Discovery Factory v1.0

## Intent

Превратить проект из системы оценки уже принесённых идей в управляемый завод
поиска и проверки B2B AI-ниш, который можно запускать в новом чате фразой
«Хочу искать нишу».

## Context

Пользователь построил технологически сильный PastLife AI / Sansara до проведения
полноценного CustDev и исследования ниши. Два видео о SIGMA предложили полезную
структуру market scan и AI-assisted review mining, но содержали неподтверждённые
числовые заявления и смешивали synthetic research с реальным CustDev.

Рабочее дерево до задачи содержало отдельный завершённый июльский пакет. Он был
проверен и зафиксирован commit `d307b13`, чтобы не смешивать прошлые исследования
с новой методологией.

## Changes

* Добавлен десятиэтапный `docs/NICHE_DISCOVERY_LOOP.md`.
* Добавлен `docs/CUSTDEV_PROTOCOL.md` с problem/offer/build/scale gates.
* Введены `validation_stage` и evidence ladder E0–E5.
* Определён диалоговый режим `niche_factory` и разделение agent/user work.
* Добавлены шаблоны `data/interviews/` и `data/experiments/`.
* Обновлены AGENTS, Cursor rule, project-local skill, workflow, questionnaire,
  report template, README, spec, tasks и prompts.
* Сохранён source-grounded разбор двух роликов; внешние утверждения отделены от
  принятых правил и проверены по независимым методологическим источникам.
* Для Sansara описан recovery mode: один B2B-сегмент, реальные интервью,
  2–3 оффера и paid pilot до новой большой разработки.

## Verification

* `./scripts/check-local.sh` — passed: portfolio v0.7, 9 markets,
  7 executable bets; docs skeleton и secret scan прошли.
* `git diff --check` — passed.
* `node --check dashboard/app.js` — passed.
* Routing-фраза, `niche_factory`, E0–E5 и build gate проверяются в
  `scripts/check-local.sh` — passed.
* Commit `efecdda` отправлен в `origin/main`.
* GitHub Pages run `34275935196` — `success`; публичный dashboard открылся,
  показал «Данные загружены», OnSud/автомобильный reference и новый E0–E5
  доступны в опубликованных Markdown-артефактах.

## Result

Контур методологически собран. Следующий операционный тест — первый полный
factory-cycle для B2B AI-направлений и отдельный recovery discovery sprint для
Sansara.

## Risks / Follow-up

* Evidence caps и gates ещё не откалиброваны на реальных factory-runs.
* Автоматический массовый парсинг не добавлен: сначала нужен повторяемый ручной
  процесс и проверка прав/ограничений конкретных источников.
* Telegram mini app автора 2026-09-08 был недоступен пользователю; система не
  зависит от доступа к этому материалу и использует только публичные видео и
  независимые источники.
