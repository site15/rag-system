Append standard-version and create changelog with released features and fixes in Telegram bot on NestJS

# Append standard-version and create changelog with released features and fixes in Telegram bot on NestJS

Published: 2022-04-13T13:55:13.465Z
Tags: kaufmanbot, nestjs, changelog, semver
[Original Article](https://dev.to/endykaufman/append-standard-version-and-create-changelog-with-released-features-and-fixes-in-telegram-bot-on-nestjs-1hh)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Install devDependencies

npm i --save-dev cp-cli standard-version

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save-dev cp-cli standard-version

added 181 packages, and audited 1168 packages in 9s

120 packages are looking for funding
run `npm fund` for details

13 vulnerabilities (3 moderate, 10 high)

To address all issues (including breaking changes), run:
npm audit fix --force

Run `npm audit` for details.
```

Enter fullscreen mode

Exit fullscreen mode

## 

Update files

--

### 

Create config for semver

.versionrc

```
{
"bumpFiles": [
{
"filename": "./package.json",
"type": "json"
}
]
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update scripts in package.json

package.json

```
{
"name": "kaufman-bot",
"version": "1.4.0-alpha.13",
"description": "Example of simple bot for telegram",
"keywords": [
"telegram",
"telegram-bot",
"nestjs",
"custom-injector"
],
"license": "MIT",
"author": "EndyKaufman <admin@site15.ru>",
"engines": {
"node": ">=16",
"npm": ">=7"
},
"bugs": {
"url": "https://github.com/EndyKaufman/kaufman-bot/issues"
},
"homepage": "https://github.com/EndyKaufman/kaufman-bot",
"repository": {
"type": "git",
"url": "git+https://github.com/EndyKaufman/kaufman-bot.git"
},
"maintainers": [
{
"name": "EndyKaufman",
"email": "admin@site15.ru"
}
],
"scripts": {
"rucken": "rucken",
"nx": "nx",
"start": "echo $GOOGLE_CREDENTIALS | base64 --decode > ./$GOOGLE_APPLICATION_CREDENTIALS && node dist/apps/server/main.js",
"build": "npm run nx -- build server",
"test": "nx test",
"serve": "npm run nx -- serve server",
"serve:local": "export $(xargs < ./.env.local) > /dev/null 2>&1 && npm run serve",
"prepare": "husky install",
"lint": "npm run tsc:lint && nx workspace-lint && npm run nx -- run-many --target=lint --all",
"lint:fix": "npm run tsc:lint && nx workspace-lint --fix && nx run-many --target=lint --all --fix && nx format:write --all",
"tsc:lint": "tsc --noEmit -p tsconfig.base.json",
"generate": "npm run prisma:generate && npm run rucken -- prepare --locales=en,ru && npm run lint:fix",
"docker:dev:down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-down.sh",
"docker:dev:restart": "npm run docker:dev:down && npm run docker:dev:up",
"docker:dev:up": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-up.sh",
"docker:dev:clean-down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-clean-down.sh",
"docker:dev:clean-restart": "npm run docker:dev:clean-down && npm run docker:dev:up",
"docker:prod:build-sources": "npm run build",
"docker:prod:down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/prod/docker-compose-down.sh",
"docker:prod:restart": "npm run docker:prod:down && npm run docker:prod:up",
"docker:prod:up": "export $(xargs < ./.env.local) > /dev/null 2>&1 && npm run docker:prod:build-sources && ./docker/prod/docker-compose-up.sh",
"docker:prod:clean-down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/prod/docker-compose-clean-down.sh",
"docker:prod:clean-restart": "npm run docker:prod:clean-down && npm run docker:prod:up",
"flyway": "flyway -c .flyway.js",
"migrate": "npm run flyway -- migrate",
"migrate:local": "export $(xargs < ./.env.local) > /dev/null 2>&1 && export DATABASE_URL=$SERVER_POSTGRES_URL && npm run migrate",
"prisma": "prisma",
"prisma:pull": "npm run -- prisma db pull && npm run prisma:generate",
"prisma:pull:local": "export $(xargs < ./.env.local) > /dev/null 2>&1 && export DATABASE_URL=$SERVER_POSTGRES_URL && npm run -- prisma db pull && npm run prisma:generate",
"prisma:generate": "npm run -- prisma generate",
"postinstall": "npm run generate",
"app:build": "npm run generate && npm run build && npm run app:build-changelog",
"app:release": "standard-version",
"app:create-release": "npm run app:build && npm run app:release && git push --follow-tags origin feature/73",
"app:build-changelog": "./node_modules/.bin/cp-cli ./CHANGELOG.md ./dist/libs/kaufman-bot/CHANGELOG.md"
},
"private": true,
"devDependencies": {
"@nestjs/schematics": "^8.0.0",
"@nestjs/testing": "^8.0.0",
"@nrwl/cli": "13.8.1",
"@nrwl/eslint-plugin-nx": "13.8.1",
"@nrwl/jest": "13.8.1",
"@nrwl/linter": "13.8.1",
"@nrwl/nest": "13.8.1",
"@nrwl/node": "13.8.1",
"@nrwl/tao": "13.8.1",
"@nrwl/workspace": "13.8.1",
"@types/jest": "27.0.2",
"@types/micromatch": "^4.0.2",
"@types/mustache": "^4.1.2",
"@types/node": "14.14.33",
"@types/uuid": "^8.3.4",
"@typescript-eslint/eslint-plugin": "~5.10.0",
"@typescript-eslint/parser": "~5.10.0",
"cp-cli": "^2.0.0",
"eslint": "~8.7.0",
"eslint-config-prettier": "8.1.0",
"husky": "^7.0.4",
"jest": "27.2.3",
"lint-staged": "^12.3.3",
"node-flywaydb": "^3.0.7",
"prettier": "2.5.1",
"prisma": "^3.11.1",
"rucken": "^3.5.3",
"standard-version": "^9.3.2",
"ts-jest": "27.0.5",
"typescript": "~4.3.5"
},
"dependencies": {
"@google-cloud/dialogflow": "^4.7.0",
"@nestjs/common": "^8.0.0",
"@nestjs/core": "^8.0.0",
"@nestjs/platform-express": "^8.0.0",
"@prisma/client": "^3.11.1",
"axios": "^0.26.0",
"charset": "^1.0.1",
"cheerio": "^1.0.0-rc.10",
"class-transformer": "^0.5.1",
"class-transformer-global-storage": "^0.4.1-1",
"class-validator-multi-lang": "^0.130.201",
"connection-string": "^4.3.5",
"encoding": "^0.1.13",
"env-var": "^7.1.1",
"html-to-text": "^8.1.0",
"jschardet": "^3.0.0",
"micromatch": "^4.0.5",
"mustache": "^4.2.0",
"nestjs-custom-injector": "^1.0.1",
"nestjs-telegraf": "^2.4.0",
"nestjs-translates": "^1.0.3",
"pg": "^8.7.3",
"pg-promise": "^10.11.1",
"reflect-metadata": "^0.1.13",
"rxjs": "^7.0.0",
"telegraf": "^4.7.0",
"tslib": "^2.0.0",
"uuid": "^8.3.2"
},
"lint-staged": {
"*.{js,ts}": "eslint --fix",
"*.{js,ts,css,scss,md,yml,yaml,prisma}": "prettier --ignore-unknown --write"
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create publish yml

.github/workflows/publish.yml

```
name: Publish

on:
push:
tags:
- v*

jobs:
publish:
runs-on: ubuntu-latest

steps:
- name: Checkout
uses: actions/checkout@v2

- name: Setup Node.js 16.x to publish to npmjs.org
uses: actions/setup-node@v1
with:
node-version: '16.x'
registry-url: 'https://registry.npmjs.org'

- name: Install Packages
run: npm i --force

- name: Build
run: npm run build

- name: Generate Release Body
run: npx extract-changelog-release > RELEASE_BODY.md

- name: Create GitHub Release
uses: ncipollo/release-action@v1
with:
bodyFile: 'RELEASE_BODY.md'
token: ${{ secrets.GITHUB_TOKEN }}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Format files

npm run generate

## 

Create test feature release

npm run app:create-release

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run app:create-release

> kaufman-bot@1.4.0-alpha.13 app:create-release
> npm run app:build && npm run app:release && git push --follow-tags origin feature/73

> kaufman-bot@1.4.0-alpha.13 app:build
> npm run generate && npm run build && npm run app:build-changelog

> kaufman-bot@1.4.0-alpha.13 generate
> npm run prisma:generate && npm run rucken -- prepare --locales=en,ru && npm run lint:fix

> kaufman-bot@1.4.0-alpha.13 prisma:generate
> npm run -- prisma generate

> kaufman-bot@1.4.0-alpha.13 prisma
> prisma "generate"

Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.11.1 | library) to ./node_modules/@prisma/client in 163ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

> kaufman-bot@1.4.0-alpha.13 rucken
> rucken "prepare" "--locales=en,ru"

> kaufman-bot@1.4.0-alpha.13 lint:fix
> npm run tsc:lint && nx workspace-lint --fix && nx run-many --target=lint --all --fix && nx format:write --all

> kaufman-bot@1.4.0-alpha.13 tsc:lint
> tsc --noEmit -p tsconfig.base.json

✔  nx run currency-converter-server:lint (1s)
✔  nx run language-swither-server:lint (1s)
✔  nx run quotes-generator-server:lint (1s)
✔  nx run facts-generator-server:lint (1s)
✔  nx run jokes-generator-server:lint (1s)
✔  nx run debug-messages-server:lint (1s)
✔  nx run short-commands-server:lint (1s)
✔  nx run bot-in-groups-server:lint (1s)
✔  nx run first-meeting-server:lint (1s)
✔  nx run html-scraper-server:lint (1s)
✔  nx run dialogflow-server:lint (1s)
✔  nx run core-server:lint (1s)
✔  nx run server:lint (1s)

—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  NX   Successfully ran target lint for 13 projects (15s)

With additional flags:
--fix=true

>  NX   Running affected:* commands with --all can result in very slow builds.

--all is not meant to be used for any sizable project or to be used in CI.

Learn more about checking only what is affected: https://nx.dev/latest/angular/cli/affected#affected.

...

> kaufman-bot@1.4.0-alpha.13 build
> npm run nx -- build server

> kaufman-bot@1.4.0-alpha.13 nx
> nx "build" "server"

> nx run server:build

chunk (runtime: main) main.js (main) 189 KiB [entry] [rendered]
webpack compiled successfully (f16ca16fefb98d2f)

—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  NX   Successfully ran target build for project server (6s)

> kaufman-bot@1.4.0-alpha.13 app:build-changelog
> ./node_modules/.bin/cp-cli ./CHANGELOG.md ./dist/libs/kaufman-bot/CHANGELOG.md

> kaufman-bot@1.4.0-alpha.13 app:release
> standard-version

✔ bumping version in ./package.json from 1.4.0-alpha.13 to 1.4.0
✔ outputting changes to CHANGELOG.md
✔ committing ./package.json and CHANGELOG.md
[STARTED] Preparing lint-staged...
[SUCCESS] Preparing lint-staged...
[STARTED] Running tasks for staged files...
[STARTED] package.json — 2 files
[STARTED] *.{js,ts} — 0 file
[STARTED] *.{js,ts,css,scss,md,yml,yaml,prisma} — 1 file
[SKIPPED] *.{js,ts} — no files
[STARTED] prettier --ignore-unknown --write
[SUCCESS] prettier --ignore-unknown --write
[SUCCESS] *.{js,ts,css,scss,md,yml,yaml,prisma} — 1 file
[SUCCESS] package.json — 2 files
[SUCCESS] Running tasks for staged files...
[STARTED] Applying modifications from tasks...
[SUCCESS] Applying modifications from tasks...
[STARTED] Cleaning up temporary files...
[SUCCESS] Cleaning up temporary files...

✔ tagging release v1.4.0
ℹ Run `git push --follow-tags origin feature/73` to publish
Enumerating objects: 88, done.
Counting objects: 100% (88/88), done.
Delta compression using up to 4 threads
Compressing objects: 100% (45/45), done.
Writing objects: 100% (57/57), 33.04 KiB | 2.20 MiB/s, done.
Total 57 (delta 31), reused 0 (delta 0)
remote: Resolving deltas: 100% (31/31), completed with 15 local objects.
remote: 
remote: GitHub found 1 vulnerability on EndyKaufman/kaufman-bot's default branch (1 high). To find out more, visit:
remote:      https://github.com/EndyKaufman/kaufman-bot/security/dependabot/1
remote: 
To github.com:EndyKaufman/kaufman-bot.git
0a26e99..870ea57  feature/73 -> feature/73
* [new tag]         v1.4.0 -> v1.4.0
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Look release notes

Navigate to https://github.com/EndyKaufman/kaufman-bot/releases

--

### 

Check new version in telegram bot

In next post I create release and deploy bot to new stage for activate bot in production mode...

![pic](https://media2.dev.to/dynamic/image/width=256,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png)

[
Create template
](/settings/response-templates)
Templates let you quickly answer FAQs or store snippets for re-use.

Submit
Preview
[Dismiss](/404.html)

Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink.

Hide child comments as well

Confirm

For further actions, you may consider blocking this person and/or reporting abuse