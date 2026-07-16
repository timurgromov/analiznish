# 2026-07-17 — GitHub Pages для dashboard

## Intent

Сделать read-only dashboard доступным с телефона и любого браузера, не публикуя весь проект и не меняя локальный Docker runtime.

## Context

До изменения dashboard был доступен только локально через Docker Compose на `127.0.0.1:8765`. GitHub Pages для `timurgromov/analiznish` не был включён.

## Changes

- Добавлен workflow `.github/workflows/deploy-pages.yml`.
- Workflow собирает Pages artifact из `dashboard/`, `data/` и одного нужного интерфейсу файла `docs/SCORING_MODEL.md`.
- Публичный URL интерфейса: `https://timurgromov.github.io/analiznish/dashboard/`.
- README, tasks и current state синхронизированы с новым способом просмотра.

## Verification

- Локальный dashboard продолжает использовать исходные относительные пути `dashboard/../data/` и `dashboard/../docs/SCORING_MODEL.md`; в Pages artifact сохраняется та же структура.
- Workflow использует официальный contract GitHub Pages: `configure-pages`, `upload-pages-artifact`, `deploy-pages`, `pages: write` и `id-token: write`.
- В `Settings` → `Pages` выбран `GitHub Actions` как Source.
- Первый run был перезапущен после включения Pages и завершился успешно.
- Публичный URL вернул `HTTP 200`; в browser проверены состояние «Данные загружены», семь строк рейтинга и детальные карточки.

## Result

GitHub Pages опубликован по адресу `https://timurgromov.github.io/analiznish/dashboard/`. Новый push изменений dashboard, данных или модели скоринга в `main` автоматически обновляет мобильную публичную страницу. Markdown остаётся source of truth, интерфейс остаётся read-only.

## Risks / Follow-up

- Репозиторий и страница public: не добавлять в `data/` личные данные, секреты или приватные исследовательские заметки.
- Действие `actions/configure-pages@v5` предупредило о legacy Node 20, но GitHub принудительно запустил его на Node 24; deployment завершился успешно. Обновить action можно при следующей совместимой major-версии.
