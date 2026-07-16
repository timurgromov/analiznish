# 2026-07-01 — AI YouTube automation score

## Intent

Оценить идею автоматизированного англоязычного YouTube-канала на базе AI и добавить в хит-парад.

## Context

Пользователь дал конспект кейса: AI workflow через Claude Code / Mythos, VidIQ, Nano Banana Pro, Veo, CapCut and AI voiceover; заявлены кейсы 142K subscribers, 15M views and ~$24.5K/month.

## Checks

* Проверены official YouTube pages:
  * channel monetization policies;
  * YPP eligibility;
  * GenAI disclosure.
* Ключевые риски:
  * mass-produced / templated AI content is monetization-risky;
  * reused content / transcript-derived content can remove monetization at channel level;
  * YouTube says Russia-based AdSense for YouTube accounts cannot monetize and creators in Russia cannot complete new YPP sign-ups;
  * case-study income claims are unverified.

## Changes

* Добавлена карточка `data/niches/2026-07-01-ai-youtube-automation.md`.
* Обновлён `data/HIT_PARADE.md`.

## Result

AI YouTube Automation получил initial score:

* Итог: 42
* Власов: 64
* Быстрые деньги: 48
* Масштаб: 62
* Фокус: 50
* Доверие к оценке: 0.74
* Вердикт: `Парковка / микро-тест`

## Rescore

После уточнения пользователя иностранный канал/AdSense/payment setup не считается главным блокером: пользователь может использовать купленный зарубежный канал или канал через родственника за границей.

Оценка повышена с 36 до 42. Главный риск изменен: вместо `нет прямой монетизации из РФ` теперь главный риск — `reused/inauthentic AI content при копировании успешных каналов`. Механика копирования winning patterns может быть полезной для теста, но должна превращаться в оригинальный ролик, а не в близкий пересказ транскрипта/визуального стиля.

## Verification

* Локальная проверка пройдена: `./scripts/check-local.sh` -> `project docs skeleton ok`.
