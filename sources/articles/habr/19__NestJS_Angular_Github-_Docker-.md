Ускорение деплоя NestJS и Angular с помощью общественных Github-раннеров и создания промежуточных Docker-образов

# Ускорение деплоя NestJS и Angular с помощью общественных Github-раннеров и создания промежуточных Docker-образов

Дата публикации: Sun, 08 Sep 2024 21:02:32 GMT
[Оригинал статьи](https://habr.com/ru/articles/841760/?utm_campaign=841760&amp;utm_source=habrahabr&amp;utm_medium=rss)

**Описание из RSS:**
![undefined](https://habrastorage.org/getpro/habr/upload_files/89e/145/93c/89e14593cd4e5c9dab7a0b27ea3e0008.png)В этом посте я настрою сборку Docker-образов: Билдер NestJS и Angular приложений; Мигратор баз данных с помощью Flyway; Тест-раннер для запуска фронтенд и бэкенд E2E-тестов; Nginx c встроенной статикой Angular приложения; NestJS приложение.

[Читать далее](https://habr.com/ru/articles/841760/?utm_campaign=841760&amp;utm_source=habrahabr&amp;utm_medium=rss#habracut)

[](/ru/users/kaufmanendy/)[kaufmanendy](/ru/users/kaufmanendy/)8  сен  2024 в 21:02# Ускорение деплоя NestJS и Angular с помощью общественных Github-раннеров и создания промежуточных Docker-образов

Время на прочтение42 минОхват и читатели681[Angular * ](/ru/hubs/angular/)[TypeScript * ](/ru/hubs/typescript/)[NestJS * ](/ru/hubs/nestjs/)[DevOps * ](/ru/hubs/devops/)[GitHub * ](/ru/hubs/github/)ТуториалПредыдущая статья: Добавляем CI/CD конфиг для деплоя на выделенный сервер с помощью GitHub Actions

В этом посте я настрою сборку Docker-образов:

- Билдер NestJS и Angular приложений;

- Мигратор баз данных с помощью Flyway;

- Тест-раннер для запуска фронтенд и бэкенд E2E-тестов;

- Nginx c встроенной статикой Angular приложения;

- NestJS приложение.

--

#### 1. Создаем Docker-образ со всеми зависимостями

В данном посте код и Docker-образа будут собираться на публичных раннерах, которые имеют лимит в месяц по общему времени выполнения и при интенсивной разработке этот лимит можно легко исчерпать, так что нужно быть готовыми переехать на собственный раннер.

В предыдущем посте зависимости устанавливались на хост машину в которой и происходила сборка кода, это было сделано в качестве примера того как можно, но так делать не нужно.

На хост машину нужно ставить минимальное количество программ и библиотек, так как любой сторонний софт может нести в себе вредоносное ПО, поэтому сборку кода нужно производить внутри специализированного Docker-контейнера.

Так как зависимости мы устанавливаем редко, то можно создать специальный Docker-образ который будет использоваться при сборке кода.

Папка с исходными файлами для сборки и папка для собранных файлов монтируется как `volume` в контейнер при запуске.

Пересборка данного Docker-образа будет происходить при смене версии корневого `package.json`.

Создаем файл `.docker/builder.Dockerfile`

```
FROM node:20.16.0-alpine AS builder
WORKDIR /usr/src/app

# Copy all files in repository to image
COPY --chown=node:node . .

# Install utils
RUN apk add dumb-init
# Clean up
RUN rm -rf /var/cache/apk/*
# Install deps
RUN npm install --prefer-offline --no-audit --progress=false
# Some utilities require a ".env" file
RUN echo '' > .env

FROM node:20.16.0-alpine
WORKDIR /usr/src/app

# Disable nx daemon
ENV NX_DAEMON=false
# Disable the statics server built into NestJS
ENV DISABLE_SERVE_STATIC=true

# Copy node_modules
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
# Copy utility for "To work as a PID 1"
COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init
# Copy the settings
COPY --from=builder /usr/src/app/.docker/.dockerignore /usr/src/app/.dockerignore
COPY --from=builder /usr/src/app/.docker/nx.json /usr/src/app/nx.json
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/rucken.json /usr/src/app/rucken.json
COPY --from=builder /usr/src/app/tsconfig.base.json /usr/src/app/tsconfig.base.json
COPY --from=builder /usr/src/app/.env /usr/src/app/.env
# Copy the settings for linting
COPY --from=builder /usr/src/app/.nxignore /usr/src/app/.nxignore
COPY --from=builder /usr/src/app/.eslintrc.json /usr/src/app/.eslintrc.json
COPY --from=builder /usr/src/app/.eslintignore /usr/src/app/.eslintignore
COPY --from=builder /usr/src/app/.prettierignore /usr/src/app/.prettierignore
COPY --from=builder /usr/src/app/.prettierrc /usr/src/app/.prettierrc
COPY --from=builder /usr/src/app/jest.config.ts /usr/src/app/jest.config.ts
COPY --from=builder /usr/src/app/jest.preset.js /usr/src/app/jest.preset.js

# Install java
RUN apk add openjdk11-jre
# Clean up
RUN rm -rf /var/cache/apk/*

# We build the source code as the "node" user
# and set permissions for new files: full access from outside the container
CMD npm run build:prod

```
Для сборки кода, необходимо запустить контейнер с данным образом и смонтировать директории `apps`, `libs` и `dist`.

Пример запуска:

```
docker run -v ./dist:/usr/src/app/dist -v ./apps:/usr/src/app/apps -v ./libs:/usr/src/app/libs ghcr.io/nestjs-mod/nestjs-mod-fullstack-builder:latest
```
#### 2. Создаем базовый Docker-образ для запуска NestJS-приложения

Данный образ будет включать зависимости используемые при работе NestJS-приложения, это необходимо для уменьшения итогового образа и для ускорения процесса деплоя.

Пересборка данного Docker-образа будет происходить при смене версии корневого `package.json`.

Создаем файл `.docker/base-server.Dockerfile`

```
FROM node:20.16.0-alpine AS builder
WORKDIR /usr/src/app

# Copy all files in repository to image
COPY --chown=node:node . .

# Install utils
RUN apk add jq dumb-init
# Clean up
RUN rm -rf /var/cache/apk/*
# Remove dev dependencies info
RUN echo $(cat package.json | jq 'del(.devDependencies)') > package.json
# Install deps
RUN npm install --prefer-offline --no-audit --progress=false
# Installing utilities to generate additional files
RUN npm install --prefer-offline --no-audit --progress=false --save-dev nx@19.5.3
RUN npm install --prefer-offline --no-audit --progress=false --save-dev prisma@5.18.0
RUN npm install --prefer-offline --no-audit --progress=false --save-dev prisma-class-generator@0.2.11
# Some utilities require a ".env" file
RUN echo '' > .env

FROM node:20.16.0-alpine
WORKDIR /usr/src/app

# Copy node_modules
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
# Copy utility for "To work as a PID 1"
COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init
# Copy the settings
COPY --from=builder /usr/src/app/.docker/.dockerignore /usr/src/app/.dockerignore
COPY --from=builder /usr/src/app/.docker/nx.json /usr/src/app/nx.json
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/rucken.json /usr/src/app/rucken.json
COPY --from=builder /usr/src/app/tsconfig.base.json /usr/src/app/tsconfig.base.json
COPY --from=builder /usr/src/app/.env /usr/src/app/.env

```
#### 3. Создаем Docker-образ для запуска NestJS-приложения

Так как установку зависимостей мы производим при создании "базового Docker-образа для запуска NestJS-приложения", а сборку кода производим через запуск "Docker-образа со всеми зависимостями", то теперь необходимо это все соединить вместе.

Пересборка данного Docker-образа будет происходить при смене версии `apps/server/package.json`.

Создаем файл `.docker/server.Dockerfile`

```
ARG BASE_SERVER_IMAGE_TAG=latest
ARG REGISTRY=ghcr.io
ARG BASE_SERVER_IMAGE_NAME=nestjs-mod/nestjs-mod-fullstack-base-server

FROM ${REGISTRY}/${BASE_SERVER_IMAGE_NAME}:${BASE_SERVER_IMAGE_TAG} AS builder
WORKDIR /usr/src/app

# Disable nx daemon
ENV NX_DAEMON=false

# Copy the generated code
COPY --chown=node:node ./dist ./dist
# Copy prisma schema files
COPY --chown=node:node ./apps ./apps
COPY --chown=node:node ./libs ./libs
# Copy the application's package.json file to use its information at runtime.
COPY --chown=node:node ./apps/server/package.json ./dist/apps/server/package.json

# Generating additional code
RUN npm run prisma:generate -- --verbose
# Remove unnecessary packages
RUN rm -rf /usr/src/app/node_modules/@nx && \
rm -rf /usr/src/app/node_modules/@prisma-class-generator && \
rm -rf /usr/src/app/node_modules/@angular  && \
rm -rf /usr/src/app/node_modules/@swc  && \
rm -rf /usr/src/app/node_modules/@babel  && \
rm -rf /usr/src/app/node_modules/@angular-devkit && \
rm -rf /usr/src/app/node_modules/@ngneat && \
rm -rf /usr/src/app/node_modules/@types && \
rm -rf /usr/src/app/node_modules/@ng-packagr && \
rm -rf /usr/src/app/apps && \
rm -rf /usr/src/app/libs

FROM node:20.16.0-alpine
WORKDIR /usr/src/app

# Set server port
ENV SERVER_PORT=8080

# Copy all project files
COPY --from=builder /usr/src/app/ /usr/src/app/
# Copy utility for "To work as a PID 1"
COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init

# Expose server port
EXPOSE 8080

# Run server
CMD ["dumb-init","node", "dist/apps/server/main.js"]

```
#### 4. Создаем Docker-образ для запуска миграций в базы данных

Так как мы не хотим ставить лишние зависимости на хост машине, то для запуска миграций собираем Docker-образ с необходимыми зависимостями.

В своих проектах я использую мигратор "Flyway", но для его работы нужно скачать дополнительные файлы которые сильно увеличивают итоговый образ, если взять другой мигратор, то образ будет меньше.

Файлы с миграциями не кладутся в сам образ, они лежат рядом с исходным кодом, который монтируется через `volume` в контейнер при старте.

Пересборка данного Docker-образа будет происходить при смене версии корневого `package.json`.

Создаем файл `.docker/migrations.Dockerfile`

```
FROM node:20-bullseye-slim AS builder
WORKDIR /usr/src/app

# Disable nx daemon
ENV NX_DAEMON=false

# Copy all files in repository to image
COPY --chown=node:node . .

# Copy the settings
COPY ./.docker/migrations-package.json package.json
COPY ./.docker/.dockerignore .dockerignore
COPY ./.docker/nx.json nx.json

# Install dependencies
RUN rm -rf package-lock.json && npm install --prefer-offline --no-audit --progress=false
# Some utilities require a ".env" file
RUN echo '' > .env

# Generate additional files
RUN ./node_modules/.bin/flyway -c ./.flyway.js info || echo 'skip flyway errors'

FROM node:20-bullseye-slim
WORKDIR /usr/src/app

# Copy node_modules
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
# Copy the settings
COPY --from=builder /usr/src/app/.docker/.dockerignore /usr/src/app/.dockerignore
COPY --from=builder /usr/src/app/.docker/nx.json /usr/src/app/nx.json
COPY --from=builder /usr/src/app/package.json /usr/src/app/package.json
COPY --from=builder /usr/src/app/rucken.json /usr/src/app/rucken.json
COPY --from=builder /usr/src/app/tsconfig.base.json /usr/src/app/tsconfig.base.json
COPY --from=builder /usr/src/app/.env /usr/src/app/.env
# Copy files for flyway
COPY --from=builder /usr/src/app/tmp /usr/src/app/tmp
COPY --from=builder /usr/src/app/.flyway.js /usr/src/app/.flyway.js

# Copy folders with migrations
# COPY --chown=node:node ./apps ./apps
# COPY --chown=node:node ./libs ./libs

CMD ["npm","run", "db:create-and-fill"]

```
Список зависимостей отличается от рутового списка это нужно для уменьшения итогового образа.

Создаем файл с необходимыми зависимостями `.docker/migrations-package.json`

```
{
"name": "@nestjs-mod-fullstack/source",
"version": "0.0.0",
"license": "MIT",
"scripts": {
"_____db_____": "_____db_____",
"db:create": "./node_modules/.bin/nx run-many -t=db-create",
"db:create-and-fill": "npm run db:create && npm run flyway:migrate",
"_____flyway_____": "_____flyway_____",
"flyway:migrate": "./node_modules/.bin/nx run-many -t=flyway-migrate"
},
"private": true,
"devDependencies": {
"node-flywaydb": "^3.0.7",
"nx": "19.5.3",
"rucken": "^4.8.1"
},
"dependencies": {
"dotenv": "^16.4.5"
}
}
```
#### 5. Создаем Docker-образ для запуска E2E-тестов

Так как мы не хотим ставить лишние зависимости на хост машине, то для запуска E2E-тестов собираем Docker-образ с необходимыми зависимостями..

Клиентские E2E-тесты запускаются через playwright и используют при работе браузерные движки: chromium, firefox и webkit, для их работы нужно скачать дополнительные файлы которые сильно увеличивают итоговый образ, если исключить часть движков или вообще отключить клиенсткие тесты, то образ будет меньше.

Файлы с тестами не кладутся в сам образ, они лежат рядом с исходным кодом, который монтируется через `volume` в контейнер при старте.

Пересборка данного Docker-образа будет происходить при смене версии корневого `package.json`.

Создаем файл `.docker/e2e-tests.Dockerfile`

```
FROM node:20-bullseye-slim
WORKDIR /usr/src/app

# Disable nx daemon
ENV NX_DAEMON=false
# Url with stage to run e2e tests
ENV BASE_URL=http://localhost:8080

# Copy all files in repository to image
COPY --chown=node:node . .

# Copy the settings
COPY ./.docker/e2e-tests-package.json package.json
COPY ./.docker/e2e-tests-nx.json nx.json
COPY ./.docker/.dockerignore .dockerignore

# Some utilities require a ".env" file
RUN echo '' > .env

# Install dependencies
RUN rm -rf package-lock.json && \
npm install --prefer-offline --no-audit --progress=false && \
# Install external utils
npx playwright install --with-deps && \
# Clear cache
npm cache clean --force

# Copy folders with migrations
# COPY --chown=node:node ./apps ./apps
# COPY --chown=node:node ./libs ./libs

CMD ["npm","run", "test:e2e"]

```
Список зависимостей отличается от рутового списка это нужно для уменьшения итогового образа.

Создаем файл с необходимыми зависимостями `.docker/e2e-tests-package.json`

```
{
"name": "@nestjs-mod-fullstack/source",
"version": "0.0.0",
"license": "MIT",
"scripts": {
"test:e2e": "./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=e2e --skip-nx-cache=true --output-style=stream-without-prefixes"
},
"private": true,
"devDependencies": {
"@nx/jest": "19.5.3",
"@nx/playwright": "19.5.3",
"@playwright/test": "^1.36.0",
"@types/jest": "^29.4.0",
"@types/node": "~18.16.9",
"jest": "^29.4.1",
"nx": "19.5.3",
"ts-jest": "^29.1.0"
},
"dependencies": {
"dotenv": "^16.4.5",
"rxjs": "^7.8.0",
"tslib": "^2.3.0"
}
}
```
Миграции запускаются с помощью nx, для полного запуска которого нужно ставить дополнительные зависимости.

Чтобы не увеличивать итоговый размер образа для запуска тестов, необходимо создать урезанный вариант nx конфига.

Создаем файл `.docker/e2e-tests-nx.json`

```
{
"$schema": "./node_modules/nx/schemas/nx-schema.json",
"namedInputs": {
"default": ["{projectRoot}/**/*", "sharedGlobals"],
"production": ["default", "!{projectRoot}/.eslintrc.json", "!{projectRoot}/eslint.config.js", "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)", "!{projectRoot}/tsconfig.spec.json", "!{projectRoot}/jest.config.[jt]s", "!{projectRoot}/src/test-setup.[jt]s", "!{projectRoot}/test-setup.[jt]s"],
"sharedGlobals": []
},
"plugins": [
{
"plugin": "@nx/playwright/plugin",
"options": {
"targetName": "e2e"
}
}
]
}
```
#### 6. Клиентский код отдается через Nginx, так что создаем Docker-образ с встроенным Nginx и статичными файлами

Часть параметров Nginx конфигурации должны быть переопределяемыми, так как будут несколько вариантов запуска инфраструктуры: Docker Compose и Kubernetes, в каждом варианте полное название сервисов в пределах сети инфраструктуры отличается.

Стартовой точкой данного образа будет не Nginx, а Bash-скрипт который предварительно пропатчить конфигурацию Nginx.

Создаем файл `.docker/nginx.Dockerfile`

```
FROM nginx:alpine

# Set server port
ENV SERVER_PORT=8080
# Set nginx port
ENV NGINX_PORT=8080

# Copy nginx config
COPY --chown=node:node ../.docker/nginx /etc/nginx/conf.d
# Copy frontend
COPY --chown=node:node ../dist/apps/client/browser /usr/share/nginx/html

# Install Bash Shell
RUN apk add --update bash
# Clean up
RUN rm -rf /var/cache/apk/*

# Add a startup script
COPY --chown=node:node ../.docker/nginx/start.sh /start.sh
RUN chmod 755 /start.sh

# Expose nginx port
EXPOSE 8080

CMD ["/start.sh"]

```
Обновляем файл c конфигурацией Nginx `.docker/nginx/nginx.conf`

```
map $sent_http_content_type $expires {
"text/html" epoch;
"text/html; charset=utf-8" epoch;
default off;
}

map $http_upgrade $connection_upgrade {
default upgrade;
'' close;
}

upstream nestjs-mod-fullstack-server {
# Dynamic name of the server container and the port it runs on
server ___SERVER_NAME___:___SERVER_PORT___;
}

server {
# Dynamic Nginx port that is shared externally
listen ___NGINX_PORT___;
server_name localhost;

gzip on;
gzip_proxied any;
gzip_types text/plain application/xml text/css application/javascript application/json;
gzip_min_length 1000;
gzip_vary on;
gzip_disable "MSIE [1-6]\.(?!.*SV1)";

client_max_body_size 50m;
proxy_connect_timeout 5m;
proxy_send_timeout 5m;
proxy_read_timeout 5m;
send_timeout 5m;

proxy_max_temp_file_size 0;

root /usr/share/nginx/html;
index index.html;

location /api {
proxy_pass http://nestjs-mod-fullstack-server;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;
proxy_set_header Host $host;
proxy_set_header Origin $http_origin;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

# kill cache
add_header Last-Modified $date_gmt;
add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
if_modified_since off;
expires off;
etag off;
}

location /swagger {
proxy_pass http://nestjs-mod-fullstack-server;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;
proxy_set_header Host $host;
proxy_set_header Origin $http_origin;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

# kill cache
add_header Last-Modified $date_gmt;
add_header Cache-Control 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
if_modified_since off;
expires off;
etag off;
}

location / {
expires $expires;
proxy_redirect off;
proxy_set_header Host $host;
proxy_set_header Origin $http_origin;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_read_timeout 1m;
proxy_connect_timeout 1m;
proxy_intercept_errors on;
error_page 404 =200 /index.html;
root /usr/share/nginx/html;
}
}

```
Создаем Bash-скрипт для пачтинга конфигурации Nginx и его запуск `.docker/nginx/start.sh`

```
#!/bin/bash

if [[ -z "${SERVER_PORT}" ]]; then
SERVER_PORT="8080"
else
SERVER_PORT="${SERVER_PORT}"
fi

if [[ -z "${SERVER_NAME}" ]]; then
SERVER_NAME="nestjs-mod-fullstack-server"
else
SERVER_NAME="${SERVER_NAME}"
fi

if [[ -z "${NGINX_PORT}" ]]; then
NGINX_PORT="8080"
else
NGINX_PORT="${NGINX_PORT}"
fi

# Replacing Nginx Dynamic Parameters
sed -i "s/___SERVER_NAME___/$SERVER_NAME/g" /etc/nginx/conf.d/nginx.conf
sed -i "s/___SERVER_PORT___/$SERVER_PORT/g" /etc/nginx/conf.d/nginx.conf
sed -i "s/___NGINX_PORT___/$NGINX_PORT/g" /etc/nginx/conf.d/nginx.conf

# Launch Nginx
/usr/sbin/nginx -g "daemon off;"
```
#### 7. Обновляем файлы для запуска в режиме "Docker Compose"

Часть переменных окружения для сборки и запуска образов будет формироваться в специальном Bash-скрипте и экспортироваться в активный процесс.

Создаем файл `.docker/set-env.sh`

```
#!/bin/bash
set -e

export REPOSITORY=nestjs-mod/nestjs-mod-fullstack
export REGISTRY=ghcr.io
export BASE_SERVER_IMAGE_NAME="${REPOSITORY}-base-server"
export BUILDER_IMAGE_NAME="${REPOSITORY}-builder"
export MIGRATIONS_IMAGE_NAME="${REPOSITORY}-migrations"
export SERVER_IMAGE_NAME="${REPOSITORY}-server"
export NGINX_IMAGE_NAME="${REPOSITORY}-nginx"
export E2E_TESTS_IMAGE_NAME="${REPOSITORY}-e2e-tests"
export COMPOSE_INTERACTIVE_NO_CLI=1
export NX_DAEMON=false
export NX_PARALLEL=1
export NX_SKIP_NX_CACHE=true
export DISABLE_SERVE_STATIC=true

export ROOT_VERSION=$(npm pkg get version --workspaces=false | tr -d \")
export SERVER_VERSION=$(cd ./apps/server && npm pkg get version --workspaces=false | tr -d \")

```
Обновляем файл `.docker/docker-compose-full.yml`

```
version: '3'
networks:
nestjs-mod-fullstack-network:
driver: 'bridge'
services:
nestjs-mod-fullstack-postgre-sql:
image: 'bitnami/postgresql:15.5.0'
container_name: 'nestjs-mod-fullstack-postgre-sql'
networks:
- 'nestjs-mod-fullstack-network'
healthcheck:
test:
- 'CMD-SHELL'
- 'pg_isready -U postgres'
interval: '5s'
timeout: '5s'
retries: 5
tty: true
restart: 'always'
environment:
POSTGRESQL_USERNAME: '${SERVER_POSTGRE_SQL_POSTGRESQL_USERNAME}'
POSTGRESQL_PASSWORD: '${SERVER_POSTGRE_SQL_POSTGRESQL_PASSWORD}'
POSTGRESQL_DATABASE: '${SERVER_POSTGRE_SQL_POSTGRESQL_DATABASE}'
volumes:
- 'nestjs-mod-fullstack-postgre-sql-volume:/bitnami/postgresql'
nestjs-mod-fullstack-postgre-sql-migrations:
image: 'ghcr.io/nestjs-mod/nestjs-mod-fullstack-migrations:${ROOT_VERSION}'
container_name: 'nestjs-mod-fullstack-postgre-sql-migrations'
networks:
- 'nestjs-mod-fullstack-network'
tty: true
environment:
NX_SKIP_NX_CACHE: 'true'
SERVER_ROOT_DATABASE_URL: '${SERVER_ROOT_DATABASE_URL}'
SERVER_APP_DATABASE_URL: '${SERVER_APP_DATABASE_URL}'
depends_on:
nestjs-mod-fullstack-postgre-sql:
condition: 'service_healthy'
working_dir: '/usr/src/app'
volumes:
- './../apps:/usr/src/app/apps'
- './../libs:/usr/src/app/libs'
nestjs-mod-fullstack-server:
image: 'ghcr.io/nestjs-mod/nestjs-mod-fullstack-server:${SERVER_VERSION}'
container_name: 'nestjs-mod-fullstack-server'
networks:
- 'nestjs-mod-fullstack-network'
healthcheck:
test: ['CMD-SHELL', 'npx -y wait-on --timeout= --interval=1000 --window --verbose --log http://localhost:${SERVER_PORT}/api/health']
interval: 30s
timeout: 10s
retries: 10
tty: true
environment:
SERVER_APP_DATABASE_URL: '${SERVER_APP_DATABASE_URL}'
SERVER_PORT: '${SERVER_PORT}'
restart: 'always'
depends_on:
nestjs-mod-fullstack-postgre-sql:
condition: service_healthy
nestjs-mod-fullstack-postgre-sql-migrations:
condition: service_completed_successfully
nestjs-mod-fullstack-nginx:
image: 'ghcr.io/nestjs-mod/nestjs-mod-fullstack-nginx:${SERVER_VERSION}'
container_name: 'nestjs-mod-fullstack-nginx'
networks:
- 'nestjs-mod-fullstack-network'
healthcheck:
test: ['CMD-SHELL', 'curl -so /dev/null http://localhost:${NGINX_PORT} || exit 1']
interval: 30s
timeout: 10s
retries: 10
environment:
SERVER_PORT: '${SERVER_PORT}'
NGINX_PORT: '${NGINX_PORT}'
restart: 'always'
depends_on:
nestjs-mod-fullstack-server:
condition: service_healthy
ports:
- '${NGINX_PORT}:${NGINX_PORT}'
nestjs-mod-fullstack-e2e-tests:
image: 'ghcr.io/nestjs-mod/nestjs-mod-fullstack-e2e-tests:${ROOT_VERSION}'
container_name: 'nestjs-mod-fullstack-e2e-tests'
networks:
- 'nestjs-mod-fullstack-network'
environment:
BASE_URL: 'http://nestjs-mod-fullstack-nginx:${NGINX_PORT}'
depends_on:
nestjs-mod-fullstack-nginx:
condition: service_healthy
working_dir: '/usr/src/app'
volumes:
- './../apps:/usr/src/app/apps'
- './../libs:/usr/src/app/libs'
nestjs-mod-fullstack-https-portal:
image: steveltn/https-portal:1
container_name: 'nestjs-mod-fullstack-https-portal'
networks:
- 'nestjs-mod-fullstack-network'
ports:
- '80:80'
- '443:443'
links:
- nestjs-mod-fullstack-nginx
restart: always
environment:
STAGE: '${HTTPS_PORTAL_STAGE}'
DOMAINS: '${SERVER_DOMAIN} -> http://nestjs-mod-fullstack-nginx:${NGINX_PORT}'
depends_on:
nestjs-mod-fullstack-nginx:
condition: service_healthy
volumes:
- nestjs-mod-fullstack-https-portal-volume:/var/lib/https-portal
volumes:
nestjs-mod-fullstack-postgre-sql-volume:
name: 'nestjs-mod-fullstack-postgre-sql-volume'
nestjs-mod-fullstack-https-portal-volume:
name: 'nestjs-mod-fullstack-https-portal-volume'
```
Обновляем файл с переменными окружения `.docker/docker-compose-full.env`

```
SERVER_PORT=9090
NGINX_PORT=8080
SERVER_ROOT_DATABASE_URL=postgres://postgres:postgres_password@nestjs-mod-fullstack-postgre-sql:5432/postgres?schema=public
SERVER_APP_DATABASE_URL=postgres://app:app_password@nestjs-mod-fullstack-postgre-sql:5432/app?schema=public
SERVER_POSTGRE_SQL_POSTGRESQL_USERNAME=postgres
SERVER_POSTGRE_SQL_POSTGRESQL_PASSWORD=postgres_password
SERVER_POSTGRE_SQL_POSTGRESQL_DATABASE=postgres
SERVER_DOMAIN=example.com
HTTPS_PORTAL_STAGE=local # local|stage|production
```
#### 8. Создаем Bash-скрипт для построения локальных Docker-образов

Для локального запуска в режиме "Docker Compose" необходимо предварительно построить все образа, это будем делать в отдельном Bash-скрипте, для того чтобы в будущем иметь возможность кастомизировать процесс сборки.

Создаем файл `.docker/build-images.sh`

```
#!/bin/bash
set -e

# We check the existence of a local image with the specified tag, if it does not exist, we start building the image
export IMG=${REGISTRY}/${BUILDER_IMAGE_NAME}:${ROOT_VERSION} && [ -n "$(docker images -q $IMG)" ] || docker build -t "${REGISTRY}/${BUILDER_IMAGE_NAME}:${ROOT_VERSION}" -t "${REGISTRY}/${BUILDER_IMAGE_NAME}:latest" -f ./.docker/builder.Dockerfile . --progress=plain

# We build all applications
docker run -v ./dist:/usr/src/app/dist -v ./apps:/usr/src/app/apps -v ./libs:/usr/src/app/libs ${REGISTRY}/${BUILDER_IMAGE_NAME}:${ROOT_VERSION}

# We check the existence of a local image with the specified tag, if it does not exist, we start building the image
export IMG=${REGISTRY}/${BASE_SERVER_IMAGE_NAME}:${ROOT_VERSION} && [ -n "$(docker images -q $IMG)" ] || docker build -t "${REGISTRY}/${BASE_SERVER_IMAGE_NAME}:${ROOT_VERSION}" -t "${REGISTRY}/${BASE_SERVER_IMAGE_NAME}:latest" -f ./.docker/base-server.Dockerfile . --progress=plain

# We check the existence of a local image with the specified tag, if it does not exist, we start building the image
export IMG=${REGISTRY}/${SERVER_IMAGE_NAME}:${SERVER_VERSION} && [ -n "$(docker images -q $IMG)" ] || docker build -t "${REGISTRY}/${SERVER_IMAGE_NAME}:${SERVER_VERSION}" -t "${REGISTRY}/${SERVER_IMAGE_NAME}:latest" -f ./.docker/server.Dockerfile . --progress=plain --build-arg=\"BASE_SERVER_IMAGE_TAG=${ROOT_VERSION}\"

# We check the existence of a local image with the specified tag, if it does not exist, we start building the image
export IMG=${REGISTRY}/${MIGRATIONS_IMAGE_NAME}:${ROOT_VERSION} && [ -n "$(docker images -q $IMG)" ] || docker build -t "${REGISTRY}/${MIGRATIONS_IMAGE_NAME}:${ROOT_VERSION}" -t "${REGISTRY}/${MIGRATIONS_IMAGE_NAME}:latest" -f ./.docker/migrations.Dockerfile . --progress=plain

# We check the existence of a local image with the specified tag, if it does not exist, we start building the image
export IMG=${REGISTRY}/${NGINX_IMAGE_NAME}:${SERVER_VERSION} && [ -n "$(docker images -q $IMG)" ] || docker build -t "${REGISTRY}/${NGINX_IMAGE_NAME}:${SERVER_VERSION}" -t "${REGISTRY}/${NGINX_IMAGE_NAME}:latest" -f ./.docker/nginx.Dockerfile . --progress=plain

# We check the existence of a local image with the specified tag, if it does not exist, we start building the image
export IMG=${REGISTRY}/${E2E_TESTS_IMAGE_NAME}:${ROOT_VERSION} && [ -n "$(docker images -q $IMG)" ] || docker build -t "${REGISTRY}/${E2E_TESTS_IMAGE_NAME}:${ROOT_VERSION}" -t "${REGISTRY}/${E2E_TESTS_IMAGE_NAME}:latest" -f ./.docker/e2e-tests.Dockerfile . --progress=plain

```
#### 9. Для запуска обновленного режима "Docker Compose" необходимо обновить все npm-скрипты

Обновляем файл `package.json`

```
{
"scripts": {
// ...
"_____pm2-full dev infra_____": "_____pm2-full dev infra_____",
"pm2-full:dev:start": "npm run generate && npm run docker-compose:start-prod:server && npm run db:create-and-fill && npm run pm2:dev:start",
"pm2-full:dev:stop": "npm run docker-compose:stop-prod:server && npm run pm2:dev:stop",
"pm2-full:dev:test:e2e": "npm run test:e2e",
// ...
"_____pm2-full prod infra_____": "_____pm2-full prod infra_____",
"pm2-full:prod:start": "npm run build:prod && npm run docker-compose:start-prod:server && npm run db:create-and-fill && npm run pm2:start",
"pm2-full:prod:stop": "npm run docker-compose:stop-prod:server && npm run pm2:stop",
"pm2-full:prod:test:e2e": "export BASE_URL=http://localhost:3000 && npm run test:e2e",
// ...
"_____prod infra_____": "_____prod infra_____",
"start": "./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=start",
"build": "npm run generate && ./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=build --skip-nx-cache=true",
"build:prod": "npm run generate && chmod -R augo+rw libs apps dist && ./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=build --skip-nx-cache=true -c production",
// ...
"_____docker-compose-full prod infra_____": "_____docker-compose-full prod infra_____",
"docker-compose-full:prod:build": ". .docker/set-env.sh && .docker/build-images.sh",
"docker-compose-full:prod:start": "npm run docker-compose-full:prod:build && npm run docker-compose-full:prod:only-start",
"docker-compose-full:prod:stop": ". .docker/set-env.sh && docker compose -f ./.docker/docker-compose-full.yml --env-file ./.docker/docker-compose-full.env --compatibility down",
"docker-compose-full:prod:only-start": ". .docker/set-env.sh && docker compose -f ./.docker/docker-compose-full.yml --env-file ./.docker/docker-compose-full.env --compatibility up -d",
"docker-compose-full:prod:test:e2e": ". .docker/set-env.sh && export BASE_URL=http://localhost:8080 && npm run test:e2e",
// ...
"_____db_____": "_____db_____",
"db:create": "./node_modules/.bin/nx run-many -t=db-create",
"db:create-and-fill": "npm run db:create && npm run flyway:migrate"
}
}
```
#### 10. Запускаем обновленный "Docker Compose" режим с встроеным запуском E2E-тестов

Команды

```
npm run docker-compose-full:prod:start
```
Вывод консоли
```

> @nestjs-mod-fullstack/source@0.0.0 docker-compose-full:prod:start
> npm run docker-compose-full:prod:build && npm run docker-compose-full:prod:only-start

> @nestjs-mod-fullstack/source@0.0.0 docker-compose-full:prod:build
> . .docker/set-env.sh && .docker/build-images.sh

> @nestjs-mod-fullstack/source@0.0.0 build:prod
> npm run generate && chmod -R augo+rw libs apps dist && ./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=build --skip-nx-cache=true -c production

> @nestjs-mod-fullstack/source@0.0.0 generate
> ./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=generate --skip-nx-cache=true && npm run make-ts-list && npm run lint:fix

NX   Running target generate for project server:

- server

> nx run server:generate

> ./node_modules/.bin/prisma generate --schema=./apps/server/src/prisma/app-schema.prisma

[2mEnvironment variables loaded from .env[22m
[2mPrisma schema loaded from apps/server/src/prisma/app-schema.prisma[22m
[36mprisma:info[39m [Prisma Class Generator]:Handler Registered.
[36mprisma:info[39m [Prisma Class Generator]:Generate /usr/src/app/apps/server/src/app/generated/rest/dto/app_demo.ts
[36mprisma:info[39m [Prisma Class Generator]:Generate /usr/src/app/apps/server/src/app/generated/rest/dto/migrations.ts

✔ Generated [1mPrisma Client[22m (v5.18.0, engine=binary)[2m to ./node_modules/@prisma/app-client[22m in 83ms

✔ Generated [1mPrisma Class Generator[22m[2m to ./apps/server/src/app/generated/rest/dto[22m in 88ms

Start by importing your Prisma Client (See: http://pris.ly/d/importing-client)

Tip: Want real-time updates to your database without manual polling? Discover how with Pulse: https://pris.ly/tip-0-pulse

> ./node_modules/.bin/rucken make-ts-list

> export NESTJS_MODE=infrastructure && ./node_modules/.bin/nx serve server --host=0.0.0.0 --watch=false --inspect=false

[2m> [22m[2mnx run[22m server:serve:development --host=0.0.0.0 --watch=false --inspect=false

chunk (runtime: main) [1m[32mmain.js[39m[22m (main) 12.8 KiB [1m[33m[entry][39m[22m [1m[32m[rendered][39m[22m
webpack compiled [1m[32msuccessfully[39m[22m (77fef9f77a8e1069)
[15:52:07.239] [32mINFO[39m (275): [36mStarting Nest application...[39m
context: "NestFactory"
[15:52:07.240] [32mINFO[39m (275): [36mDefaultNestApp dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mProjectUtilsSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mDefaultNestApplicationInitializerSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mDefaultNestApplicationInitializerShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mNestjsPinoLoggerModuleSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mNestjsPinoLoggerModuleShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mTerminusHealthCheckModuleSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mDefaultNestApplicationListenerSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mDefaultNestApplicationListenerShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mPrismaModuleSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mAppModuleSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mAppModuleShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mPrismaModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.240] [32mINFO[39m (275): [36mInfrastructureMarkdownReportGeneratorSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPm2Settings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPm2Shared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtils dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposeSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtils dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposePostgreSQLSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerCompose dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposePostgreSQL dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposePostgreSQLSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposePostgreSQLShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mFlywaySettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mFlywayShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPrismaModuleSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPrismaModuleShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtils dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportGeneratorSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtils dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportStorage dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportStorageSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtils dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerCompose dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mFlywaySettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mFlywayShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtils dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDefaultNestApplicationListenerSettings dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDefaultNestApplicationListenerShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposeShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportStorageShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtils dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDefaultNestApplicationInitializer dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDefaultNestApplicationListener dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPrismaModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportGenerator dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposePostgreSQL dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mFlyway dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDefaultNestApplicationListener dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mNestjsPinoLoggerModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mTerminusModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mTerminusModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mProjectUtilsShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportGeneratorShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPm2 dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerCompose dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposePostgreSQL dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPrismaModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportGeneratorShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mFlyway dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mInfrastructureMarkdownReportGenerator dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mLoggerModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mDockerComposePostgreSQLShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mPrismaModuleShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mTerminusHealthCheckModuleShared dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mTerminusHealthCheckModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.241] [32mINFO[39m (275): [36mAppModule dependencies initialized[39m
context: "InstanceLoader"
[15:52:07.285] [32mINFO[39m (275): [36mTerminusHealthCheckController {/api/health}:[39m
context: "RoutesResolver"
[15:52:07.287] [32mINFO[39m (275): [36mMapped {/api/health, GET} route[39m
context: "RouterExplorer"
[15:52:07.287] [32mINFO[39m (275): [36mAppController {/api}:[39m
context: "RoutesResolver"
[15:52:07.287] [32mINFO[39m (275): [36mMapped {/api, GET} route[39m
context: "RouterExplorer"
[15:52:07.287] [32mINFO[39m (275): [36mMapped {/api/demo, POST} route[39m
context: "RouterExplorer"
[15:52:07.288] [32mINFO[39m (275): [36mMapped {/api/demo/:id, GET} route[39m
context: "RouterExplorer"
[15:52:07.288] [32mINFO[39m (275): [36mMapped {/api/demo/:id, DELETE} route[39m
context: "RouterExplorer"
[15:52:07.288] [32mINFO[39m (275): [36mMapped {/api/demo, GET} route[39m
context: "RouterExplorer"
[15:52:07.292] [32mINFO[39m (275): [36mConnected to database![39m
context: "PrismaClient"
[15:52:07.329] [34mDEBUG[39m (275):
0: "SERVER_ROOT_DATABASE_URL: Description='Connection string for PostgreSQL with root credentials (example: postgres://postgres:postgres_password@localhost:5432/postgres?schema=public, username must be \"postgres\")', Original Name='rootDatabaseUrl'"
1: "SERVER_PORT: Description='The port on which to run the server.', Default='3000', Original Name='port'"
2: "SERVER_HOSTNAME: Description='Hostname on which to listen for incoming packets.', Original Name='hostname'"
3: "SERVER_APP_DATABASE_URL: Description='Connection string for PostgreSQL with module credentials (example: postgres://feat:feat_password@localhost:5432/feat?schema=public)', Original Name='databaseUrl'"
context: "All application environments"
[15:52:07.399] [32mINFO[39m (275): [36mNest application successfully started[39m
context: "NestApplication"

[0m[7m[1m[32m NX [39m[22m[27m[0m  [32mSuccessfully ran target serve for project server[39m

> rm -rf ./libs/sdk/app-angular-rest-sdk/src/lib && mkdir ./libs/sdk/app-angular-rest-sdk/src/lib && ./node_modules/.bin/openapi-generator-cli generate -i ./app-swagger.json -g typescript-angular -o ./libs/sdk/app-angular-rest-sdk/src/lib  --additional-properties=apiModulePrefix=RestClient,configurationPrefix=RestClient,fileNaming=kebab-case,modelFileSuffix=.interface,modelSuffix=Interface,enumNameSuffix=Type,enumPropertyNaming=original,serviceFileSuffix=-rest.service,serviceSuffix=RestService

[33mDownload 7.8.0 ...[39m
[32mDownloaded 7.8.0[39m
[32mDid set selected version to 7.8.0[39m
[main] INFO  o.o.codegen.DefaultGenerator - Generating with dryRun=false
[main] INFO  o.o.c.ignore.CodegenIgnoreProcessor - No .openapi-generator-ignore file found.
[main] INFO  o.o.codegen.DefaultGenerator - OpenAPI Generator: typescript-angular (client)
[main] INFO  o.o.codegen.DefaultGenerator - Generator 'typescript-angular' is considered stable.
[main] INFO  o.o.c.l.AbstractTypeScriptClientCodegen - Hint: Environment variable 'TS_POST_PROCESS_FILE' (optional) not defined. E.g. to format the source code, please try 'export TS_POST_PROCESS_FILE="/usr/local/bin/prettier --write"' (Linux/Mac)
[main] INFO  o.o.c.l.AbstractTypeScriptClientCodegen - Note: To enable file post-processing, 'enablePostProcessFile' must be set to `true` (--enable-post-process-file for CLI).
[main] WARN  o.o.codegen.DefaultCodegen - The value (generator's option) must be either boolean or string. Default to `false`.
[main] INFO  o.o.c.l.TypeScriptAngularClientCodegen - generating code for Angular 18.0.0 ...
[main] INFO  o.o.c.l.TypeScriptAngularClientCodegen -   (you can select the angular version by setting the additionalProperties (--additional-properties in CLI) ngVersion)
[main] INFO  o.o.codegen.InlineModelResolver - Inline schema created as TerminusHealthCheckController_check_200_response_info_value. To have complete control of the model name, set the `title` field or use the modelNameMapping option (e.g. --model-name-mappings TerminusHealthCheckController_check_200_response_info_value=NewModel,ModelA=NewModelA in CLI) or inlineSchemaNameMapping option (--inline-schema-name-mappings TerminusHealthCheckController_check_200_response_info_value=NewModel,ModelA=NewModelA in CLI).
[main] INFO  o.o.codegen.InlineModelResolver - Inline schema created as TerminusHealthCheckController_check_200_response. To have complete control of the model name, set the `title` field or use the modelNameMapping option (e.g. --model-name-mappings TerminusHealthCheckController_check_200_response=NewModel,ModelA=NewModelA in CLI) or inlineSchemaNameMapping option (--inline-schema-name-mappings TerminusHealthCheckController_check_200_response=NewModel,ModelA=NewModelA in CLI).
[main] INFO  o.o.codegen.InlineModelResolver - Inline schema created as TerminusHealthCheckController_check_503_response. To have complete control of the model name, set the `title` field or use the modelNameMapping option (e.g. --model-name-mappings TerminusHealthCheckController_check_503_response=NewModel,ModelA=NewModelA in CLI) or inlineSchemaNameMapping option (--inline-schema-name-mappings TerminusHealthCheckController_check_503_response=NewModel,ModelA=NewModelA in CLI).
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/model/./app-data.interface.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/model/./app-demo.interface.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/model/./terminus-health-check-controller-check200-response-info-value.interface.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/model/./terminus-health-check-controller-check200-response.interface.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/model/./terminus-health-check-controller-check503-response.interface.ts
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/api/default-rest.service.ts
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/model/models.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/api/api.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/index.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/api.module.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/configuration.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/variables.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/encoder.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/param.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/.gitignore
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/git_push.sh
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/README.md
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/.openapi-generator-ignore
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/.openapi-generator/VERSION
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-angular-rest-sdk/src/lib/.openapi-generator/FILES
################################################################################
# Thanks for using OpenAPI Generator.                                          #
# Please consider donation to help us maintain this project 🙏                 #
# https://opencollective.com/openapi_generator/donate                          #
################################################################################
> rm -rf ./libs/sdk/app-rest-sdk/src/lib && mkdir ./libs/sdk/app-rest-sdk/src/lib && ./node_modules/.bin/openapi-generator-cli generate -i ./app-swagger.json -g typescript-axios -o ./libs/sdk/app-rest-sdk/src/lib

[main] INFO  o.o.codegen.DefaultGenerator - Generating with dryRun=false
[main] INFO  o.o.c.ignore.CodegenIgnoreProcessor - No .openapi-generator-ignore file found.
[main] INFO  o.o.codegen.DefaultGenerator - OpenAPI Generator: typescript-axios (client)
[main] INFO  o.o.codegen.DefaultGenerator - Generator 'typescript-axios' is considered stable.
[main] INFO  o.o.c.l.AbstractTypeScriptClientCodegen - Hint: Environment variable 'TS_POST_PROCESS_FILE' (optional) not defined. E.g. to format the source code, please try 'export TS_POST_PROCESS_FILE="/usr/local/bin/prettier --write"' (Linux/Mac)
[main] INFO  o.o.c.l.AbstractTypeScriptClientCodegen - Note: To enable file post-processing, 'enablePostProcessFile' must be set to `true` (--enable-post-process-file for CLI).
[main] WARN  o.o.codegen.DefaultCodegen - The value (generator's option) must be either boolean or string. Default to `false`.
[main] INFO  o.o.codegen.InlineModelResolver - Inline schema created as TerminusHealthCheckController_check_200_response_info_value. To have complete control of the model name, set the `title` field or use the modelNameMapping option (e.g. --model-name-mappings TerminusHealthCheckController_check_200_response_info_value=NewModel,ModelA=NewModelA in CLI) or inlineSchemaNameMapping option (--inline-schema-name-mappings TerminusHealthCheckController_check_200_response_info_value=NewModel,ModelA=NewModelA in CLI).
[main] INFO  o.o.codegen.InlineModelResolver - Inline schema created as TerminusHealthCheckController_check_200_response. To have complete control of the model name, set the `title` field or use the modelNameMapping option (e.g. --model-name-mappings TerminusHealthCheckController_check_200_response=NewModel,ModelA=NewModelA in CLI) or inlineSchemaNameMapping option (--inline-schema-name-mappings TerminusHealthCheckController_check_200_response=NewModel,ModelA=NewModelA in CLI).
[main] INFO  o.o.codegen.InlineModelResolver - Inline schema created as TerminusHealthCheckController_check_503_response. To have complete control of the model name, set the `title` field or use the modelNameMapping option (e.g. --model-name-mappings TerminusHealthCheckController_check_503_response=NewModel,ModelA=NewModelA in CLI) or inlineSchemaNameMapping option (--inline-schema-name-mappings TerminusHealthCheckController_check_503_response=NewModel,ModelA=NewModelA in CLI).
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.utils.URLPathUtils - 'host' (OAS 2.0) or 'servers' (OAS 3.0) not defined in the spec. Default to [http://localhost] for server URL [http://localhost/]
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/index.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/base.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/common.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/api.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/configuration.ts
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/git_push.sh
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/.gitignore
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/.npmignore
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/.openapi-generator-ignore
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/.openapi-generator/VERSION
[main] INFO  o.o.codegen.TemplateManager - writing file /usr/src/app/./libs/sdk/app-rest-sdk/src/lib/.openapi-generator/FILES
################################################################################
# Thanks for using OpenAPI Generator.                                          #
# Please consider donation to help us maintain this project 🙏                 #
# https://opencollective.com/openapi_generator/donate                          #
################################################################################

NX   Successfully ran target generate for project server

> @nestjs-mod-fullstack/source@0.0.0 make-ts-list
> ./node_modules/.bin/rucken make-ts-list

> @nestjs-mod-fullstack/source@0.0.0 lint:fix
> npm run tsc:lint && ./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=lint --fix

> @nestjs-mod-fullstack/source@0.0.0 tsc:lint
> ./node_modules/.bin/tsc --noEmit -p tsconfig.base.json

NX   Running target lint for 4 projects:

- app-angular-rest-sdk
- server-e2e
- client
- server

With additional flags:
--fix=true

> nx run server-e2e:lint --fix

Linting "server-e2e"...

✔ All files pass linting

ESLint found too many warnings (maximum: -1).

> nx run app-angular-rest-sdk:lint --fix

Linting "app-angular-rest-sdk"...
[0m[0m
[0m[4m/usr/src/app/libs/sdk/app-angular-rest-sdk/src/test-setup.ts[24m[0m
[0m  [2m1:16[22m  [33mwarning[39m  Unexpected any. Specify a different type  [2m@typescript-eslint/no-explicit-any[22m[0m
[0m[0m
[0m[33m[1m✖ 1 problem (0 errors, 1 warning)[22m[39m[0m
[0m[33m[1m[22m[39m[0m
✖ 1 problem (0 errors, 1 warning)

ESLint found too many warnings (maximum: -1).

> nx run client:lint --fix

Linting "client"...
[0m[0m
[0m[4m/usr/src/app/apps/client/src/test-setup.ts[24m[0m
[0m  [2m1:16[22m  [33mwarning[39m  Unexpected any. Specify a different type  [2m@typescript-eslint/no-explicit-any[22m[0m
[0m[0m
[0m[33m[1m✖ 1 problem (0 errors, 1 warning)[22m[39m[0m
[0m[33m[1m[22m[39m[0m
✖ 1 problem (0 errors, 1 warning)

ESLint found too many warnings (maximum: -1).

> nx run server:lint --fix

Linting "server"...

✔ All files pass linting

ESLint found too many warnings (maximum: -1).

NX   Successfully ran target lint for 4 projects

NX   Running target build for 4 projects:

- app-angular-rest-sdk
- app-rest-sdk
- client
- server

> nx run app-rest-sdk:build

[1m[33mYour library compilation option specifies that the compiler external helper (tslib) is needed but it is not installed.[39m[22m
Compiling TypeScript files for project "app-rest-sdk"...
Done compiling TypeScript files for project "app-rest-sdk".

> nx run app-angular-rest-sdk:build:production

[34mBuilding Angular Package[39m
[37m[39m
[37m------------------------------------------------------------------------------[39m
[37mBuilding entry point '@nestjs-mod-fullstack/app-angular-rest-sdk'[39m
[37m------------------------------------------------------------------------------[39m
- Compiling with Angular sources in Ivy partial compilation mode.
[32m✔[39m Compiling with Angular sources in Ivy partial compilation mode.
[32m✔[39m Generating FESM bundles
- Copying assets
[32m✔[39m Copying assets
- Writing package manifest
[32m✔[39m Writing package manifest
[32m✔[39m Built @nestjs-mod-fullstack/app-angular-rest-sdk
[32m[39m
[32m------------------------------------------------------------------------------[39m
[32mBuilt Angular Package[39m
[32m - from: /usr/src/app/libs/sdk/app-angular-rest-sdk[39m
[32m - to:   /usr/src/app/dist/libs/sdk/app-angular-rest-sdk[39m
[32m------------------------------------------------------------------------------[39m
[37m[37m[39m[37m[39m
[37m[37mBuild at: [1m2024-09-08T15:52:28.701Z[22m - Time: [1m2306[22mms[39m[37m[39m
[37m[37m[39m[37m[39m

> nx run server:build:production

chunk (runtime: main) [1m[32mmain.js[39m[22m (main) 12.8 KiB [1m[33m[entry][39m[22m [1m[32m[rendered][39m[22m
webpack compiled [1m[32msuccessfully[39m[22m (77fef9f77a8e1069)

> nx run client:build:production

- Generating browser application bundles (phase: setup)...
[32m✔[39m Browser application bundle generation complete.
[32m✔[39m Browser application bundle generation complete.
- Copying assets...
[32m✔[39m Copying assets complete.
- Generating index html...
[32m✔[39m Index html generation complete.
[37m[0m[0m[39m
[37m[0m[1mInitial chunk files[22m          [2m | [22m[1mNames[22m        [2m | [22m [1mRaw size[22m[2m | [22m[1mEstimated transfer size[22m[0m[39m
[37m[0m[32mmain.7e68bd24636243f2.js[39m[37m     [2m | [22m[2mmain[22m         [2m | [22m[36m250.88 kB[39m[37m[2m | [22m               [36m65.65 kB[39m[37m[0m[39m
[37m[0m[32mpolyfills.b4ad6ba87a9b45cc.js[39m[37m[2m | [22m[2mpolyfills[22m    [2m | [22m [36m34.80 kB[39m[37m[2m | [22m               [36m11.36 kB[39m[37m[0m[39m
[37m[0m[32mstyles.1f9d21bffd1c8a8d.css[39m[37m  [2m | [22m[2mstyles[22m       [2m | [22m  [36m5.90 kB[39m[37m[2m | [22m                [36m1.46 kB[39m[37m[0m[39m
[37m[0m[32mruntime.a9340aa0e1064d4f.js[39m[37m  [2m | [22m[2mruntime[22m      [2m | [22m[36m890 bytes[39m[37m[2m | [22m              [36m504 bytes[39m[37m[0m[39m
[37m[0m[0m[39m
[37m[0m[1m [22m                            [2m | [22m[1mInitial total[22m[2m | [22m[1m292.46 kB[22m[2m | [22m               [1m78.97 kB[22m[0m[39m
[37m[0m[0m[39m
[37m[0mBuild at: [1m[37m2024-09-08T15:52:45.321Z[39m[37m[22m - Hash: [1m[37mcacf47df594708b3[39m[37m[22m - Time: [1m[37m16944[39m[37m[22mms[0m[39m

NX   Successfully ran target build for 4 projects

> @nestjs-mod-fullstack/source@0.0.0 docker-compose-full:prod:only-start
> . .docker/set-env.sh && docker compose -f ./.docker/docker-compose-full.yml --env-file ./.docker/docker-compose-full.env --compatibility up -d

WARN[0000] .docker/docker-compose-full.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion
[+] Running 21/2
✔ nestjs-mod-fullstack-postgre-sql Pulled 30.7s  92.33MB Pulling 30.6s
✔ nestjs-mod-fullstack-https-portal Pulled 27.0s ⣿⣿⣿⣿⣿⠀] Pulling 26.9s
[+] Running 9/9
✔ Network docker_nestjs-mod-fullstack-network            Created0.1s
✔ Volume "nestjs-mod-fullstack-https-portal-volume"      Created0.0s
✔ Volume "nestjs-mod-fullstack-postgre-sql-volume"       Created0.0s
✔ Container nestjs-mod-fullstack-postgre-sql             Healthy7.3s
✔ Container nestjs-mod-fullstack-postgre-sql-migrations  Exited10.0s
✔ Container nestjs-mod-fullstack-server                  Healthy41.2s
✔ Container nestjs-mod-fullstack-nginx                   Healthy71.9s
✔ Container nestjs-mod-fullstack-https-portal            Started72.2s
✔ Container nestjs-mod-fullstack-e2e-tests               Started72.2s
```
#### 11. Выводим список собранных образов и проверяем что они все собрались успешно

Команды

```
docker image list
```
Вывод консоли

```
$ docker image list
REPOSITORY                                            TAG       IMAGE ID       CREATED          SIZE
ghcr.io/nestjs-mod/nestjs-mod-fullstack-e2e-tests     0.0.0     0cfc73bba2ed   10 minutes ago   2.17GB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-e2e-tests     latest    0cfc73bba2ed   10 minutes ago   2.17GB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-nginx         0.0.1     d5502067f83f   12 minutes ago   47.6MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-nginx         latest    d5502067f83f   12 minutes ago   47.6MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-migrations    0.0.0     37854dd50cee   13 minutes ago   889MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-migrations    latest    37854dd50cee   13 minutes ago   889MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-server        0.0.1     0d97265cf4c3   14 minutes ago   406MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-server        latest    0d97265cf4c3   14 minutes ago   406MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-base-server   0.0.0     9375674299d4   14 minutes ago   423MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-base-server   latest    9375674299d4   14 minutes ago   423MB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-builder       0.0.0     7d97e169a196   16 minutes ago   1.46GB
ghcr.io/nestjs-mod/nestjs-mod-fullstack-builder       latest    7d97e169a196   16 minutes ago   1.46GB
steveltn/https-portal                                 1         0b78eab92499   8 days ago       295MB
bitnami/postgresql                                    15.5.0    47ef5063d3bc   7 months ago     275MB
```
#### 12. Выводим список запущенных контейнеров

Команды

```
docker stats
```
Вывод консоли

```
$ docker stats
CONTAINER ID   NAME                                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
7681c91d0da3   nestjs-mod-fullstack-https-portal   0.00%     11.09MiB / 15.59GiB   0.07%     19.9kB / 0B       0B / 127kB        18
45326f0c1f0d   nestjs-mod-fullstack-nginx          0.00%     11.21MiB / 15.59GiB   0.07%     60.9kB / 704kB    1.05MB / 8.19kB   8
8c2c76c87d12   nestjs-mod-fullstack-server         0.02%     84.41MiB / 15.59GiB   0.53%     339kB / 21.7kB    28.8MB / 4.1kB    23
ef5075938209   nestjs-mod-fullstack-postgre-sql    0.00%     52.74MiB / 15.59GiB   0.33%     62.8kB / 25.6kB   119kB / 54.1MB    7
```
#### 13. Проверяем результат запуска E2E-тестов

Команды

```
docker logs nestjs-mod-fullstack-e2e-tests
```
Вывод консоли

```
$ docker logs nestjs-mod-fullstack-e2e-tests

> @nestjs-mod-fullstack/source@0.0.0 test:e2e
> ./node_modules/.bin/nx run-many --exclude=@nestjs-mod-fullstack/source --all -t=e2e --skip-nx-cache=true --output-style=stream-without-prefixes

NX  Falling back to ts-node for local typescript execution. This may be a little slower.
- To fix this, ensure @swc-node/register and @swc/core have been installed

NX   Running target e2e for 2 projects:

- client-e2e
- server-e2e

> nx run client-e2e:e2e

> playwright test

Running 6 tests using 3 workers
6 passed (4.9s)

To open last HTML report run:

npx playwright show-report ../../dist/.playwright/apps/client-e2e/playwright-report

> nx run server-e2e:e2e

Setting up...
PASS   server-e2e  apps/server-e2e/src/server/server.spec.ts
GET /api
✓ should return a message (31 ms)
✓ should create and return a demo object (34 ms)
✓ should get demo object by id (9 ms)
✓ should get all demo object (7 ms)
✓ should delete demo object by id (7 ms)
✓ should get all demo object (5 ms)
Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        0.643 s
Ran all test suites.
Tearing down...

NX   Successfully ran target e2e for 2 projects
```
#### 14. Модифицируем CI/CD-конфигурацию для деплоя приложений на выделенный сервер

Конфигурация получилась очень большой, так как там учтены различные сценарии и этапы сборки образов с целью ускорить процесс деплоя.

Основные моменты я опишу ниже и в конце будет ссылка на полное содержимое CI/CD-конфигурации.

Проверка наличия базового образа

```
# ...
jobs:
# ...
check-base-server-image:
runs-on: ubuntu-latest
# Игнорируем ошибки которые могут возникать в процессе работы Job-ы
continue-on-error: true
steps:
# Скачиваем репозиторий
- name: Checkout repository
# Если в тексте коммита мы напишем [skip cache] то все проверки наличия образов будут проигнорированны и билд образов будет запущен
if: ${{ !contains(github.event.head_commit.message, '[skip cache]') }}
uses: actions/checkout@v4
# Формируем новые переменные окружения в рамках процесса работы Job-ы
- name: Set ENV vars
if: ${{ !contains(github.event.head_commit.message, '[skip cache]') }}
id: version
# Получаем версию проекта из package.json
run: |
echo "root_version="$(npm pkg get version --workspaces=false | tr -d \") >> "$GITHUB_OUTPUT"
# Проверяем наличие контейнера с определенной версией в Docker-регистре
- name: Check exists docker image
if: ${{ !contains(github.event.head_commit.message, '[skip cache]') }}
id: check-exists
# Для проверки мы сперва получаем токен авторизации в Docker-регистр, а затем проверяем наличие manifests-файла для определенной версии
run: |
export TOKEN=$(curl -u ${{ github.actor }}:${{ secrets.GITHUB_TOKEN }} https://${{ env.REGISTRY }}/token\?scope\="repository:${{ env.BASE_SERVER_IMAGE_NAME}}:pull" | jq -r .token)
curl --head --fail -H "Authorization: Bearer $TOKEN" https://${{ env.REGISTRY }}/v2/${{ env.BASE_SERVER_IMAGE_NAME}}/manifests/${{ steps.version.outputs.root_version }}
# Проверяем ответ запроса на наличие manifests-файла и если код ответа не 404, то значит что Docker-образ существует
- name: Store result of check exists docker image
id: store-check-exists
if: ${{ !contains(github.event.head_commit.message, '[skip cache]') && !contains(needs.check-exists.outputs.result, 'HTTP/2 404') }}
run: |
echo "conclusion=success" >> "$GITHUB_OUTPUT"
# Кладем результат запроса в выходной объект данной Job-ы
outputs:
result: ${{ steps.store-check-exists.outputs.conclusion }}
# ...
```
Сборка базового образа

```
# ...
jobs:
# ...
build-and-push-base-server-image:
runs-on: ubuntu-latest
# Текущая Job-а запустится только после прохождения Job-ы check-base-server-image
needs: [check-base-server-image]
# Запрашиваем разрешения для публикации Docker-образов в Docker-регистр Github-а
permissions:
contents: read
packages: write
attestations: write
id-token: write
steps:
# Скачиваем репозиторий
- name: Checkout repository
if: ${{ needs.check-base-server-image.outputs.result != 'success' || contains(github.event.head_commit.message, '[skip cache]') }}
uses: actions/checkout@v4
# Формируем новые переменные окружения в рамках процесса работы Job-ы
- name: Set ENV vars
if: ${{ needs.check-base-server-image.outputs.result != 'success' || contains(github.event.head_commit.message, '[skip cache]') }}
id: version
# Получаем версию проекта из package.json
run: |
echo "root_version="$(npm pkg get version --workspaces=false | tr -d \") >> "$GITHUB_OUTPUT"
# Авторизуемся в Docker-регистре
- name: Log in to the Container registry
if: ${{ needs.check-base-server-image.outputs.result != 'success' || contains(github.event.head_commit.message, '[skip cache]') }}
uses: docker/login-action@65b78e6e13532edd9afa3aa52ac7964289d1a9c1
with:
registry: ${{ env.REGISTRY }}
username: ${{ github.actor }}
password: ${{ secrets.GITHUB_TOKEN }}
# Собираем и публикуем Docker-образ
- name: Build and push Docker image
# Проверяем что проверка наличия образа не прошла, это означает что нам необходимо собрать и опубликовать образ,
# а также проверяем что проверка наличия образа не была проигнорирована
if: ${{ needs.check-base-server-image.outputs.result != 'success' || contains(github.event.head_commit.message, '[skip cache]') }}
id: push
uses: docker/build-push-action@f2a1d5e99d037542a71f64918e516c093c6f3fc4
with:
context: .
push: true
file: ./.docker/base-server.Dockerfile
# Собранный образ будет иметь тэг равный версии проекта, а также будет иметь тэг latest
tags: ${{ env.REGISTRY}}/${{ env.BASE_SERVER_IMAGE_NAME}}:${{ steps.version.outputs.root_version }},${{ env.REGISTRY}}/${{ env.BASE_SERVER_IMAGE_NAME}}:latest
# Указываем репозиторий для проверки существующих слоев, это нужно чтобы частично ускорить сборку
cache-from: type=registry,ref=${{ env.REGISTRY}}/${{ env.BASE_SERVER_IMAGE_NAME}}:${{ steps.version.outputs.root_version }}
cache-to: type=inline
# Формируем цифровую подпись образа
- name: Generate artifact attestation
# Игнорируем ошибки которые могут возникать в процессе работы
continue-on-error: true
if: ${{ needs.check-base-server-image.outputs.result != 'success' || contains(github.event.head_commit.message, '[skip cache]') }}
uses: actions/attest-build-provenance@v1
with:
subject-name: ${{ env.REGISTRY }}/${{ env.BASE_SERVER_IMAGE_NAME}}
subject-digest: ${{ steps.push.outputs.digest }}
push-to-registry: true
# ...
```
Файл с CI/CD-конфигурацией: https://github.com/nestjs-mod/nestjs-mod-fullstack/blob/master/.github/workflows/docker-compose.workflows.yml

--

#### 15. Коммитим обновления в репозиторий и смотрим результат работы в "Github"

Для текущего проекта рабочий процесс раннеров можно видеть вот тут: https://github.com/nestjs-mod/nestjs-mod-fullstack/actions

Текущее рабочий процесс раннера: https://github.com/nestjs-mod/nestjs-mod-fullstack/actions/runs/10762536037 Текущее время полного деплоя вместе с прогоном E2E-тестов: `6m 20s`

--

#### Заключение

Когда я начал писать этот пост, я планировал использовать классный инструмент для локального запуска Github-акшенов https://github.com/nektos/act и успешно смог через него запустить локально сборку и запуск всего проекта, но для этого пришлось выделить больший объем памяти и процессора, в итоге от https://github.com/nektos/act пришлось отказаться и написать небольшой Bash-скрипт для сборки образов.

Объемы образов мигратора и тест-раннера получились очень большими, но это не так критично, так как эти образа пересобираются только при изменении версии рутового package.json.

В данный момент нет автоматической пересборки образов после изменения кода или изменения зависимостей проекта, пересборка происходит только после ручной модификации версии рутового package.json или package.json приложения, в дальнейших постах появится автоматическое версионирование и в ручную менять ничего не нужно будет.

Хотя проект и использует nx, на данном этапе я не пользуюсь всеми его возможностями, так как сперва нужно внедрить обычные пути оптимизации и ускорения процесса сборки и деплоя образов.

--

#### Планы

В следующем посте я установлю Kubernetes на выделенный сервер и перенастрою CI/CD-конфигурацию проекта...

--

#### Ссылки

https://nestjs.com - официальный сайт фреймворка https://nestjs-mod.com - официальный сайт дополнительных утилит https://fullstack.nestjs-mod.com - сайт из поста https://github.com/nestjs-mod/nestjs-mod-fullstack - проект из поста https://github.com/nestjs-mod/nestjs-mod-fullstack/commit/6270febc23d50100133897630c1476b30b7e8751 - изменения

Теги:- [docker](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[docker])
- [github](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[github])
- [nestjsmod](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[nestjsmod])
- [fullstack](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[fullstack])

Хабы:- [Angular](/ru/hubs/angular/)
- [TypeScript](/ru/hubs/typescript/)
- [NestJS](/ru/hubs/nestjs/)
- [DevOps](/ru/hubs/devops/)
- [GitHub](/ru/hubs/github/)