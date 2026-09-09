# 2026-09-09 — Первый Niche Factory run: B2B РПП

## Intent

Проверить Niche Factory на реальном поиске новой B2B-ставки, используя доступ
пользователя к психологам РПП и потенциальному экспертному дистрибьютору, но не
подменять этот доступ выдуманной готовностью платить.

## Context

Пользователь назвал жену-психолога РПП, её круг коллег и Ирину Ушкову как
потенциальный CustDev/distribution access. В портфеле уже был Rule24, но его
код и смежные practice-management референсы не дают оснований продолжать
разработку без спроса. Публичный scan показал несколько российских CRM и
AI-кабинетов психолога, поэтому общий CRM или общий AI-note taker исключены.

## Changes

* Зафиксированы constraints: B2B РФ, профессиональная РПП-вертикаль, hybrid
  research и доступ к early interviews; конкретные чек, sales cycle и бюджет
  остаются частью следующего owner checkpoint.
* Сформирован candidate universe: общий CRM, общий AI-копайлот, Rule24,
  RPP Practice Lab, RPP Supervision OS, RPP Between-Session Companion и
  смежные варианты. В quick scan оставлены три последние новые ставки.
* Добавлены три E1 quick-scan карточки и обновлены обе таблицы hit parade.
  Лидер новой вертикали — RPP Practice Lab (`64` market opportunity, `32`
  execution priority); это не build approval.
* Between-Session Companion припаркован: безопасность, специальные категории
  данных и ожидания пациента — hard risk до CustDev и отдельной проверки.
* Обнаружен и устранён системный дефект: dashboard и validator держали разные
  hardcoded inventory карточек. Добавлен `data/niches/INDEX.md`; dashboard
  загружает его, а validator использует его как единственный реестр.
* Обновлены README, TASKS и CURRENT_STATE под фактический checkpoint.

## Evidence

* Ирина Ушкова публично продаёт РПП-супервизию для психологов за 6 500 ₽ и
  профильные курсы: https://irinaushkova.ru/.
* Simterium и PsySim подтверждают рынок AI-тренажёров для психологов:
  https://simterium.ai/ и https://psysim.ru/.
* Recovery Record подтверждает clinician-linked журнал для РПП, но не доказывает
  спрос, legal fit или экономику в РФ: https://www.recoveryrecord.com/.
* Супер-Эго, Cue и Therapy Room подтверждают, что общий кабинет/CRM психолога
  уже конкурентный рынок: https://superego.pro/, https://cue-to.ru/industry/psychologists,
  https://therapy-room.ru/.

## Verification

* `node --check dashboard/app.js` — passed.
* `node scripts/validate-portfolio.mjs` — passed: 12 markets, 10 executable bets.
* `./scripts/check-local.sh` — passed.
* `git diff --check` — passed.
* Local dashboard `http://127.0.0.1:8765/dashboard/` — загрузил 12 строк и
  карточку RPP Practice Lab через новый реестр; проверены desktop и 390×844,
  console errors отсутствуют.
* Commit `b54034d` отправлен в `origin/main`.
* Published dashboard `https://timurgromov.github.io/analiznish/dashboard/` —
  после reload показал статус «Данные загружены», все 12 строк и открытую
  карточку RPP Practice Lab; console errors отсутствуют.

## Result

Фабрика прошла первый operational checkpoint от constraints до 3 quick scan и
выявила реальный архитектурный дефект учёта карточек. Следующее действие — не
design и не код: пять разговоров с организаторами/ведущими РПП-обучения о
прошлом поведении и один конкретный paid/budget-confirmed concierge-пилот.

## Risks / Follow-up

* Все новые оценки ограничены E1/0.55: публичные сайты не заменяют интервью,
  действие или оплату.
* Потенциальный доступ к Ирине Ушковой не является согласованным каналом до
  отдельного контакта и её добровольного решения.
* Перед любым клиентским контуром RPP Between-Session Companion требуется
  privacy/safety/legal review; до этого не собирать и не передавать данные
  клиентов.
* После завершения CustDev обновить одну карточку, hit parade и эту запись,
  затем провести ретроспективу factory-loop.
