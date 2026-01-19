Append "botinfo" command for look deploy, server and user information in Telegram bot on NestJS

# Append "botinfo" command for look deploy, server and user information in Telegram bot on NestJS

Published: 2022-04-13T09:12:03.728Z
Tags: kaufmanbot, nestjs, telegram, botinfo
[Original Article](https://dev.to/endykaufman/append-botinfo-command-for-look-deploy-server-and-user-information-in-telegram-bot-on-nestjs-3242)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Update files

--

### 

Update config

libs/core/server/src/lib/bot-commands/bot-commands-config/bot-commands.config.ts

```
export const BOT_COMMANDS_CONFIG = Symbol('BOT_COMMANDS_CONFIG');

export interface BotCommandsConfig {
admins: string[];
version: string;
commit: string;
date: string;
maxRecursiveDepth?: number;
prepareCommandString?: (command: string) => string;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add service

libs/core/server/src/lib/bot-commands/bot-commands-services/bot-commands-botinfo.service.ts

```
import { Inject, Injectable } from '@nestjs/common';
import {
BotCommandsConfig,
BOT_COMMANDS_CONFIG,
} from '../bot-commands-config/bot-commands.config';
import { BotCommandsProviderActionResultType } from '../bot-commands-types/bot-commands-provider-action-result-type';
import {
BotCommandsProvider,
BotCommandsProviderActionMsg,
} from '../bot-commands-types/bot-commands-provider.interface';
import { BotCommandsToolsService } from './bot-commands-tools.service';

@Injectable()
export class BotCommandsBotinfoService implements BotCommandsProvider {
constructor(
@Inject(BOT_COMMANDS_CONFIG)
private readonly botCommandsConfig: BotCommandsConfig,
private readonly botCommandsToolsService: BotCommandsToolsService
) {}

async onHelp() {
return null;
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
if (
this.botCommandsToolsService.checkCommands(msg.text, ['botinfo'], 'en')
) {
const formatMemoryUsage = (data) =>
`${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

const memoryData = process.memoryUsage();

const markdown = [
...(this.botCommandsToolsService.isAdmin(msg)
? [
'__Server__',
`RSS: _${formatMemoryUsage(memoryData.rss)}_`,
`Heap total: _${formatMemoryUsage(memoryData.heapTotal)}_`,
`Heap used: _${formatMemoryUsage(memoryData.heapUsed)}_`,
`V8 external: _${formatMemoryUsage(memoryData.external)}_\n`,
]
: []),
`__Bot__`,
`Version: _${this.botCommandsConfig.version || 'unknown'}_`,
`Date: _${this.botCommandsConfig.date || 'unknown'}_`,
`Commit: _${this.botCommandsConfig.commit || 'unknown'}_\n`,
'__Chat__',
`ID: _${msg?.chat?.id || msg?.from?.id || 'unknown'}_`,
]
.join('\n')
.split('.')
.join('\\.')
.split('-')
.join('\\-');
return {
type: 'markdown',
message: msg,
markdown: markdown,
};
}
return null;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update module

libs/core/server/src/lib/bot-commands/bot-commands.module.ts

```
import { DynamicModule, Module } from '@nestjs/common';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import { TranslatesModule } from 'nestjs-translates';
import {
BotCommandsConfig,
BOT_COMMANDS_CONFIG,
} from './bot-commands-config/bot-commands.config';
import { BotCommandsBotinfoService } from './bot-commands-services/bot-commands-botinfo.service';
import { BotCommandsToolsService } from './bot-commands-services/bot-commands-tools.service';
import { BotCommandsService } from './bot-commands-services/bot-commands.service';
import { BOT_COMMANDS_PROVIDER } from './bot-commands-types/bot-commands-provider.interface';

@Module({
imports: [CustomInjectorModule, TranslatesModule],
providers: [BotCommandsToolsService, BotCommandsService],
exports: [
CustomInjectorModule,
TranslatesModule,
BotCommandsToolsService,
BotCommandsService,
],
})
export class BotCommandsModule {
static forRoot(config?: BotCommandsConfig): DynamicModule {
return {
module: BotCommandsModule,
providers: [
{
provide: BOT_COMMANDS_CONFIG,
useValue: <BotCommandsConfig>{
maxRecursiveDepth: 5,
...(config || {}),
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: BotCommandsBotinfoService,
},
],
exports: [BOT_COMMANDS_CONFIG],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update app module

apps/server/src/app/app.module.ts

```
import { BotInGroupsModule } from '@kaufman-bot/bot-in-groups/server';
import {
BotCommandsModule,
PrismaClientModule,
} from '@kaufman-bot/core/server';
import { CurrencyConverterModule } from '@kaufman-bot/currency-converter/server';
import { DebugMessagesModule } from '@kaufman-bot/debug-messages/server';
import { DialogflowModule } from '@kaufman-bot/dialogflow/server';
import { FactsGeneratorModule } from '@kaufman-bot/facts-generator/server';
import { FirstMeetingModule } from '@kaufman-bot/first-meeting/server';
import { JokesGeneratorModule } from '@kaufman-bot/jokes-generator/server';
import {
DEFAULT_LANGUAGE,
LanguageSwitherModule,
} from '@kaufman-bot/language-swither/server';
import { QuotesGeneratorModule } from '@kaufman-bot/quotes-generator/server';
import { ShortCommandsModule } from '@kaufman-bot/short-commands/server';
import { Module } from '@nestjs/common';
import env from 'env-var';
import { TelegrafModule } from 'nestjs-telegraf';
import {
getDefaultTranslatesModuleOptions,
TranslatesModule,
} from 'nestjs-translates';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
PrismaClientModule.forRoot({
databaseUrl: env.get('SERVER_POSTGRES_URL').required().asString(),
logging: 'long_queries',
maxQueryExecutionTime: 5000,
}),
TranslatesModule.forRoot(
getDefaultTranslatesModuleOptions({
localePaths: [
join(__dirname, 'assets', 'i18n'),
join(__dirname, 'assets', 'i18n', 'getText'),
join(__dirname, 'assets', 'i18n', 'class-validator-messages'),
],
vendorLocalePaths: [join(__dirname, 'assets', 'i18n')],
locales: [DEFAULT_LANGUAGE, 'ru'],
})
),
DebugMessagesModule.forRoot(),
BotCommandsModule.forRoot({
admins: env.get('TELEGRAM_BOT_ADMINS').default('').asArray(','),
prepareCommandString: (command?: string) =>
(command || '').split('ё').join('е'),
commit: env.get('DEPLOY_COMMIT').default('').asString(),
date: env.get('DEPLOY_DATE').default('').asString(),
version: env.get('DEPLOY_VERSION').default('').asString(),
}),
ShortCommandsModule.forRoot({
commands: {
en: {
'*joke*': `get jokes`,
'*quote*|*thought*|*wisdom*': 'get quotes',
'*fact*|history': 'get facts',
'forgot me': 'meet reset',
'*what you can do*|faq': 'help',
'disable debug': 'debug off',
'enable debug': 'debug on',
},
ru: {
'*joke*|*шутка|*шутку|*шутки|пошути*|шути|рассмеши|смешинки|смешинка':
'get jokes',
'*quote*|*thought|*wisdom*|цитата|дай цитату|цитируй|*мысль|*мудрость|*залечи*':
'get quotes',
'*fact*|history|история|*историю|*факты': 'get facts',
'forgot me|забудь меня': 'meet reset',
'*what you can do*|faq|*что ты умеешь*|справка': 'help',
'disable debug|выключи дебаг': 'debug off',
'enable debug|включи дебаг': 'debug on',
},
},
}),
BotInGroupsModule.forRoot({
botNames: {
en: ['Endy', 'Kaufman'],
ru: ['Энди', 'Endy', 'Kaufman', 'Енди', 'Кауфман'],
},
botMeetingInformation: {
en: [`Hello! I'm Endy 😉`, 'Hello!', 'Hello 🖖'],
ru: [`Всем привет! я Энди 😉`, `Всем привет!`, 'Всем привет 🖖'],
},
}),
LanguageSwitherModule.forRoot(),
CurrencyConverterModule.forRoot(),
FactsGeneratorModule.forRoot(),
QuotesGeneratorModule.forRoot(),
JokesGeneratorModule.forRoot(),
FirstMeetingModule.forRoot({ botName: { en: 'Endy', ru: 'Энди' } }),
DialogflowModule.forRoot({
projectId: env.get('DIALOGFLOW_PROJECT_ID').required().asString(),
}),
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update deploy script

.github/workflows/develop.deploy.yml

```
name: "deploy"

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
export DEPLOY_DATE=$(date +'%Y.%m.%d %H:%M:%S')
export DEPLOY_COMMIT=$GITHUB_SHA
export DEPLOY_VERSION=$(node -pe "require('./package.json')['version']")
dokku config:set --no-restart kaufman-bot SERVER_POSTGRES_URL=$SERVER_POSTGRES_URL
dokku config:set --no-restart --global POSTGRES_HOST=global-postgres
dokku config:set --no-restart kaufman-bot GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json
dokku config:set --no-restart kaufman-bot GOOGLE_CREDENTIALS=${{secrets.GOOGLE_CREDENTIALS}}
dokku config:set --no-restart kaufman-bot DIALOGFLOW_PROJECT_ID=${{secrets.DIALOGFLOW_PROJECT_ID}}
dokku config:set --no-restart kaufman-bot TELEGRAM_BOT_WEB_HOOKS_DOMAIN=${{secrets.TELEGRAM_BOT_WEB_HOOKS_DOMAIN}}
dokku config:set --no-restart kaufman-bot TELEGRAM_BOT_WEB_HOOKS_PATH=${{secrets.TELEGRAM_BOT_WEB_HOOKS_PATH}}
dokku config:set --no-restart kaufman-bot DEPLOY_DATE="$DEPLOY_DATE"
dokku config:set --no-restart kaufman-bot DEPLOY_COMMIT=$DEPLOY_COMMIT
dokku config:set --no-restart kaufman-bot DEPLOY_VERSION=$DEPLOY_VERSION

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
branch: "feature/73"
git_remote_url: "ssh://dokku@${{secrets.HOST}}:22/kaufman-bot"
ssh_private_key: ${{secrets.SSH_PRIVATE_KEY}}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Check from telegram

--

### 

Check from user chat

--

### 

Check from group chat

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