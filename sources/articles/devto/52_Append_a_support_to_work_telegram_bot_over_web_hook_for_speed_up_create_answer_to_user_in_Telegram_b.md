Append a support to work telegram bot over web hook for speed up create answer to user in Telegram bot on NestJS

# Append a support to work telegram bot over web hook for speed up create answer to user in Telegram bot on NestJS

Published: 2022-04-12T16:04:03.073Z
Tags: kaufmanbot, telegram, nestjs, webhook
[Original Article](https://dev.to/endykaufman/append-a-support-to-work-telegram-bot-over-web-hook-for-speed-up-create-answer-to-user-in-telegram-bot-on-nestjs-8fi)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Update files in project

--

### 

Update env file

.env.local

```
TELEGRAM_BOT_TOKEN=1111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
TELEGRAM_BOT_WEB_HOOKS_DOMAIN=
TELEGRAM_BOT_WEB_HOOKS_PATH=
ROOT_POSTGRES_USER=postgres
ROOT_POSTGRES_PASSWORD=postgres
ROOT_POSTGRES_URL=postgres://${ROOT_POSTGRES_USER}:${ROOT_POSTGRES_PASSWORD}@localhost:5432/postgres?schema=public
SERVER_POSTGRES_URL=postgres://admin_develop:password_develop@localhost:5432/kaufman_bot_develop?schema=public
GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json
DIALOGFLOW_PROJECT_ID=service-account-urui
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update deploy config

.github/workflows/develop.deploy.yml

```
name: 'deploy'

# yamllint disable-line rule:truthy
on:
push:
branches:
- feature/73

jobs:
migrate:
runs-on: [self-hosted, develop-vps]
environment: dev
steps:
- name: Cloning repo
uses: actions/checkout@v2
with:
fetch-depth: 0

- name: Apply migrations
run: |
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
. ~/.nvm/nvm.sh
nvm --version
nvm install v16.13.2
nvm use v16.13.2
npm i --force
export POSTGRES_HOST=$(dokku postgres:info global-postgres --internal-ip)
export ROOT_POSTGRES_URL=postgres://postgres:${{secrets.ROOT_POSTGRES_PASSWORD}}@${POSTGRES_HOST}:5432/postgres?schema=public
export SERVER_POSTGRES_URL=${{secrets.SERVER_POSTGRES_URL}}
npm run rucken -- postgres
export DATABASE_URL=$SERVER_POSTGRES_URL && npm run migrate
dokku config:set --no-restart kaufman-bot SERVER_POSTGRES_URL=$SERVER_POSTGRES_URL
dokku config:set --no-restart --global POSTGRES_HOST=global-postgres
dokku config:set --no-restart kaufman-bot GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json
dokku config:set --no-restart kaufman-bot GOOGLE_CREDENTIALS=${{secrets.GOOGLE_CREDENTIALS}}
dokku config:set --no-restart kaufman-bot DIALOGFLOW_PROJECT_ID=${{secrets.DIALOGFLOW_PROJECT_ID}}
dokku config:set --no-restart kaufman-bot TELEGRAM_BOT_WEB_HOOKS_DOMAIN=${{secrets.TELEGRAM_BOT_WEB_HOOKS_DOMAIN}}
dokku config:set --no-restart kaufman-bot TELEGRAM_BOT_WEB_HOOKS_PATH=${{secrets.TELEGRAM_BOT_WEB_HOOKS_PATH}}

deploy:
needs: [migrate]
runs-on: ubuntu-latest
environment: dev
steps:
- name: Cloning repo
uses: actions/checkout@v2
with:
fetch-depth: 0

- name: Push to dokku
uses: dokku/github-action@master
with:
branch: 'feature/73'
git_remote_url: 'ssh://dokku@${{secrets.HOST}}:22/kaufman-bot'
ssh_private_key: ${{secrets.SSH_PRIVATE_KEY}}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update add module

apps/server/src/app/app.module.ts

```

const TELEGRAM_BOT_WEB_HOOKS_DOMAIN = env
.get('TELEGRAM_BOT_WEB_HOOKS_DOMAIN')
.asString();
const TELEGRAM_BOT_WEB_HOOKS_PATH = env
.get('TELEGRAM_BOT_WEB_HOOKS_PATH')
.asString();

@Module({
imports: [
TelegrafModule.forRoot({
token: env.get('TELEGRAM_BOT_TOKEN').required().asString(),
launchOptions: {
dropPendingUpdates: true,
...(TELEGRAM_BOT_WEB_HOOKS_DOMAIN && TELEGRAM_BOT_WEB_HOOKS_PATH
? {
webhook: {
domain: TELEGRAM_BOT_WEB_HOOKS_DOMAIN,
hookPath: TELEGRAM_BOT_WEB_HOOKS_PATH,
},
}
: {}),
},
}),
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update main file

apps/server/src/main.ts

```
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import env from 'env-var';
import { getBotToken } from 'nestjs-telegraf';
import { AppModule } from './app/app.module';

const logger = new Logger('Application');

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

async function bootstrap() {
const app = await NestFactory.create(AppModule);

const TELEGRAM_BOT_WEB_HOOKS_PATH = env
.get('TELEGRAM_BOT_WEB_HOOKS_PATH')
.asString();
if (TELEGRAM_BOT_WEB_HOOKS_PATH) {
const bot = app.get(getBotToken());
app.use(bot.webhookCallback(TELEGRAM_BOT_WEB_HOOKS_PATH));
}

const port = env.get('PORT').default(3333).asPortNumber();
await app.listen(port);
logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

try {
bootstrap().catch((err) => {
logger.error(err, err.stack);
});
} catch (err) {
logger.error(err, err.stack);
}

function exitHandler(options, exitCode) {
if (options.cleanup) {
logger.log('exit: clean');
}
if (exitCode || exitCode === 0) {
if (exitCode !== 0) {
logger.error(exitCode, exitCode.stack);
logger.log(`exit: code - ${exitCode}`);
} else {
logger.log(`exit: code - ${exitCode}`);
}
}
if (options.exit) {
process.exit();
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Append new env on github actions

Add domain

```
TELEGRAM_BOT_WEB_HOOKS_DOMAIN=kaufman-bot.site15.ru
```

Enter fullscreen mode

Exit fullscreen mode

Add hook path

```
TELEGRAM_BOT_WEB_HOOKS_PATH=/webhook
```

Enter fullscreen mode

Exit fullscreen mode

List all env

## 

Setup domain in telegram @botfather

In the next post, I will hide system commands from all users and show them only to bot admins, and append bot descriptions...

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