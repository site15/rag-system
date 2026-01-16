Lite-версия мигратора Flyway для PostgreSQL на TypeScript

# Lite-версия мигратора Flyway для PostgreSQL на TypeScript

Дата публикации: Thu, 16 Jan 2025 07:04:28 GMT
[Оригинал статьи](https://habr.com/ru/articles/874028/?utm_campaign=874028&amp;utm_source=habrahabr&amp;utm_medium=rss)

**Описание из RSS:**
![undefined](https://habrastorage.org/getpro/habr/upload_files/67f/130/3f3/67f1303f35882f1d9e46aac398430828.png)Так как я активно использую возможности `Flyway`, такие как `repeatable migrations` и `callbacks`, и не хочу от них отказываться, а аналогов этих функций в других системах миграции нет, я решил написать собственный лёгкий клон `Flyway` на `Node.js` для `PostgreSQL`.

[Читать далее](https://habr.com/ru/articles/874028/?utm_campaign=874028&amp;utm_source=habrahabr&amp;utm_medium=rss#habracut)

[](/ru/users/kaufmanendy/)[kaufmanendy](/ru/users/kaufmanendy/)16  янв   в 07:04# Lite-версия мигратора Flyway для PostgreSQL на TypeScript

Уровень сложностиСреднийВремя на прочтение4 минОхват и читатели767[TypeScript * ](/ru/hubs/typescript/)[PostgreSQL * ](/ru/hubs/postgresql/)[Базы данных * ](/ru/hubs/db_admins/)[Node.JS * ](/ru/hubs/nodejs/)Туториал### Описание

В своих проектах для управления миграциями баз данных я всегда использую Flyway, включая некоторые важные компоненты его экосистемы:

- Versioned migrations — это стандартные миграции, которые применяются последовательно друг за другом.

- Repeatable migrations — это повторяемые миграции, например, скрипты для создания процедур. Они позволяют отслеживать историю изменений с помощью Git.

- Callbacks — это различные хуки, которые срабатывают в определённое время. Например, можно создать скрипт `beforeMigrate__init_types.sql`, в котором описаны все кастомные типы, используемые в базе данных. Мигратор сначала выполняет этот скрипт, а затем остальные операции.

Я бэкенд разработчик на `Node.js` и стараюсь использовать консольные утилиты написанные под `Node.js`, в случаи с `Flyway` использую `Node.js`-обёртку — node-flywaydb.

Этот инструмент очень прост в использовании: при запуске он скачивает оригинальную `Java`-утилиту и запускает её, поэтому для работы требуется наличие `JVM` на машине.

### Проблема

Когда мы создаем `Docker`-образы, предназначенные для запуска миграций базы данных, нам приходится включать в них `JVM`, что значительно увеличивает размер образа и замедляет весь `CI/CD`-процесс.

### Возможные решения

- Использовать `Node.js`-миграторы (например: `db-migrate`, `umzug`, `pg-migrate`).

- Использовать миграторы, встроенные в `ORM`, применяемую в проекте (например: `prisma`, `typeorm`).

- Написать лёгкий клон `Flyway` на `Node.js` для одного типа базы данных (`PostgreSQL`).

### Принятое решение

Поскольку я активно использую возможности `Flyway`, такие как `repeatable migrations` и `callbacks`, и не хочу отказываться от них, так как аналоги этих функций отсутствуют в других системах миграции, оптимальным решением стало создание собственного легкого клона `Flyway` на `Node.js` для работы с `PostgreSQL`.

### Этапы разработки

- Versioned migrations — выполнено.

- Repeatable migrations — выполнено.

- Callbacks — частично выполнено, только для `versioned`.

- Flyway schema history table — частично выполнена, только для `versioned` и `repeatable`.

- Migration Command Dry Runs — выполнено.

- Baseline migrations — не выполнено.

- Undo migrations — не выполнено.

- Script migrations — не выполнено.

- Migration transaction handling — не выполнено.

Там у них действительно много интересных возможностей, я перечислил только те, которые были наиболее полезными в моей практике.

### Пример использования

--

#### Запуск базы данных

Для запуска базы данных выполните следующую команду:

```
curl -fsSL https://raw.githubusercontent.com/EndyKaufman/pg-tools/refs/heads/master/docker-compose.yml -o docker-compose.yml
docker compose up -d
```
Результатом будет успешный запуск контейнера PostgreSQL:

```
[+] Running 3/3
✔ Network pg-tools_default              Created                         0.1s
✔ Volume "pg-tools-postgre-sql-volume"  Created                         0.0s
✔ Container pg-tools-postgre-sql        Started                         0.2s
```
#### Создание миграции

Для создания первой миграции выполните следующую команду:

```
npx pg-flyway create --name=Init --version=1
echo "CREATE TABLE \"User\"(id uuid NOT NULL DEFAULT uuid_generate_v4() constraint PK_USER primary key,email varchar(20));" > migrations/V1__Init.sql
```
Результатом будет успешное создание миграции:

```
[2025-01-15T23:23:53.903] [INFO] create - Name: Init
[2025-01-15T23:23:53.904] [INFO] create - Locations: migrations
[2025-01-15T23:23:53.914] [INFO] create - Migration "migrations/V1__Init.sql" was created successfully!
```
#### Применение миграции

Для применения созданной миграции выполните следующую команду:

```
npx pg-flyway migrate --database-url=postgres://pgtoolsusername:pgtoolspassword@localhost:5432/pgtoolsdatabase?schema=public
```
Результатом будет успешное выполнение миграции:

```
[2025-01-16T00:08:39.052] [INFO] migrate - Locations: migrations
[2025-01-16T00:08:39.053] [INFO] migrate - HistoryTable: __migrations
[2025-01-16T00:08:39.053] [INFO] migrate - DatabaseUrl: postgres://pgtoolsusername:pgtoolspassword@localhost:5432/pgtoolsdatabase?schema=public
[2025-01-16T00:08:39.074] [INFO] migrate - Migrations: 1
```
#### Просмотр списка выполненных миграций

Для просмотра списка выполненных миграций выполните следующую команду:

```
npx pg-flyway info --database-url=postgres://pgtoolsusername:pgtoolspassword@localhost:5432/pgtoolsdatabase?schema=public
```
Результатом будет таблица с информацией о выполненных миграциях:

```
[2025-01-16T09:15:34.007] [INFO] info - HistoryTable: __migrations
[2025-01-16T09:15:34.008] [INFO] info - DatabaseUrl: postgres://pgtoolsusername:pgtoolspassword@localhost:5432/pgtoolsdatabase?schema=public
[2025-01-16T09:15:34.057] [INFO] info - Migrations: 1
┌───────────┬─────────┬─────────────┬──────┬─────────────────────┬─────────┬──────────┐
│  Category │ Version │ Description │ Type │        Installed On │   State │ Undoable │
├───────────┼─────────┼─────────────┼──────┼─────────────────────┼─────────┼──────────┤
│ Versioned │       1 │        Init │  SQL │ 2025-01-15 20:08:39 │ Success │       No │
└───────────┴─────────┴─────────────┴──────┴─────────────────────┴─────────┴──────────┘
```
#### Остановка базы данных

Для остановки базы данных выполните следующую команду:

```
docker compose down
```
### Планы

Основные функции `Flyway` уже перенесены в `Typescript`-код, что обеспечивает необходимый функционал для большинства сценариев при работе с миграциями.

Остальные не портированные функции я планирую переносить по мере наличия свободного времени.

Буду рад `pull`-реквестам с новыми функциями и исправлением багов.

### Ссылки

- https://github.com/EndyKaufman/pg-tools - Репозиторий проекта

- https://www.npmjs.com/package/pg-flyway - Утилита на NPM

- https://www.npmjs.com/package/node-flywaydb - Враппер для `Flyway` (`Java`) на `NodeJS`

- https://documentation.red-gate.com/flyway-concepts-271583830.html - Документация `Flyway`

Теги:- [flyway](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[flyway])
- [database](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[database])
- [postgres](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[postgres])
- [migrations](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[migrations])
- [nodejs](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[nodejs])
- [миграции](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[%D0%BC%D0%B8%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%B8])
- [постгрес](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[%D0%BF%D0%BE%D1%81%D1%82%D0%B3%D1%80%D0%B5%D1%81])
- [sql](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[sql])
- [консольная утилита](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[%D0%BA%D0%BE%D0%BD%D1%81%D0%BE%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F+%D1%83%D1%82%D0%B8%D0%BB%D0%B8%D1%82%D0%B0])

Хабы:- [TypeScript](/ru/hubs/typescript/)
- [PostgreSQL](/ru/hubs/postgresql/)
- [Базы данных](/ru/hubs/db_admins/)
- [Node.JS](/ru/hubs/nodejs/)