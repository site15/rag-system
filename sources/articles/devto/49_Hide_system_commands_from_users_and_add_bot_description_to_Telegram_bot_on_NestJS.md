Hide system commands from users and add bot description to Telegram bot on NestJS

# Hide system commands from users and add bot description to Telegram bot on NestJS

Published: 2022-04-13T12:52:13.991Z
Tags: kaufmanbot, nestjs, telegam, description
[Original Article](https://dev.to/endykaufman/hide-system-commands-from-users-and-add-bot-description-to-telegram-bot-on-nestjs-36op)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Add category property and usage with admins

--

### 

Append admin property to bot command config

libs/core/server/src/lib/bot-commands/bot-commands-config/bot-commands.config.ts

```
export const BOT_COMMANDS_CONFIG = Symbol('BOT_COMMANDS_CONFIG');

export interface BotCommandsConfig {
admins: string[];
maxRecursiveDepth?: number;
prepareCommandString?: (command: string) => string;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Append enum for basic types

libs/core/server/src/lib/bot-commands/bot-commands-types/bot-commands-enum.ts

```
import { getText } from 'class-validator-multi-lang';

export const BotCommandsEnum = {
help: getText('help'),
get: getText('get'),
state: getText('state'),
reset: getText('reset'),
};

export const BotCommandsCategory = {
system: getText('system'),
user: getText('user'),
};

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Append category property to help message interface

libs/core/server/src/lib/bot-commands/bot-commands-types/bot-commands-tools-types.interface.ts

```
export interface BotCommandsToolsGenerateHelpMessageOptions {
locale: string;
name: string;
descriptions: string;
usage: string[];
contextUsage?: string[];
customHelpFields?: { [field: string]: string[] };
category: string;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update bot command tools service

libs/core/server/src/lib/bot-commands/bot-commands-services/bot-commands-tools.service.ts

```
import { Injectable } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { isMatch } from 'micromatch';
import { render } from 'mustache';
import { CustomInject } from 'nestjs-custom-injector';
import { TranslatesService, TranslatesStorage } from 'nestjs-translates';
import {
BotCommandsConfig,
BOT_COMMANDS_CONFIG,
} from '../bot-commands-config/bot-commands.config';
import { BotCommandsCategory } from '../bot-commands-types/bot-commands-enum';
import { BotCommandsProviderActionMsg } from '../bot-commands-types/bot-commands-provider.interface';
import {
BotCommandsToolsInterceptor,
BOT_COMMANDS_TOOLS_INTERCEPTOR,
} from '../bot-commands-types/bot-commands-tools-interceptor.interface';
import { BotCommandsToolsGenerateHelpMessageOptions } from '../bot-commands-types/bot-commands-tools-types.interface';

@Injectable()
export class BotCommandsToolsService {
@CustomInject(BOT_COMMANDS_TOOLS_INTERCEPTOR, {
multi: true,
})
private botCommandsToolsInterceptors?: BotCommandsToolsInterceptor[];

@CustomInject(BOT_COMMANDS_CONFIG)
private botCommandsConfig?: BotCommandsConfig;

private lowerCaseTranslates?: TranslatesStorage['translates'];

constructor(
private readonly translatesStorage: TranslatesStorage,
private readonly translatesService: TranslatesService
) {}

isAdmin<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg) {
const admins =
this.botCommandsConfig?.admins.map((admin) =>
String(admin).trim().toLocaleLowerCase()
) || [];
return (
admins.includes(msg?.chat?.id.toString() || '') ||
admins.includes(msg?.from?.id.toString() || '')
);
}

generateHelpMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg, options: BotCommandsToolsGenerateHelpMessageOptions) {
const isAdmin = this.isAdmin(msg);

if (options.category === BotCommandsCategory.system && !isAdmin) {
return '';
}

if (
this.botCommandsToolsInterceptors &&
this.botCommandsToolsInterceptors.length > 0
) {
for (
let index = 0;
index < this.botCommandsToolsInterceptors.length;
index++
) {
const botCommandsToolsInterceptor =
this.botCommandsToolsInterceptors[index];
if (botCommandsToolsInterceptor?.interceptHelpMessageOptions) {
options =
botCommandsToolsInterceptor.interceptHelpMessageOptions(options);
}
}
}
const usageWithLocalized = Array.from(
new Set(
[
...options.usage,
...options.usage.map((u) =>
this.translatesService.translate(u, options.locale)
),
].filter(Boolean)
)
);
const contextUsageWithLocalized = options.contextUsage
? Array.from(
new Set(
[
...options.contextUsage,
...options.contextUsage.map((u) =>
this.translatesService.translate(u, options.locale)
),
].filter(Boolean)
)
)
: null;

const caption = options.name
? `__${this.translatesService.translate(options.name, options.locale)}${
!isAdmin && options.category === BotCommandsCategory.user
? ''
: ` \\(${this.translatesService.translate(
options.category,
options.locale
)}\\)`
}__`
: '';
const descriptions = options.descriptions
? this.translatesService.translate(options.descriptions, options.locale)
: '';
const usage =
usageWithLocalized.length > 0
? `${this.translatesService.translate(
getText('usage'),
options.locale
)}: ${usageWithLocalized.map((u) => `_${u}_`).join(', ')}`
: '';
const contextUsage =
contextUsageWithLocalized && contextUsageWithLocalized.length > 0
? `${this.translatesService.translate(
getText('usage with context'),
options.locale
)}: ${contextUsageWithLocalized.map((u) => `_${u}_`).join(', ')}`
: '';
const customHelpFields = Object.keys(options.customHelpFields || {}).map(
(customHelpFieldKey) =>
`${this.translatesService.translate(
customHelpFieldKey,
options.locale
)}: ${(options.customHelpFields?.[customHelpFieldKey] || [])
.map((u) => `_${u}_`)
.join(', ')}`
);

const replayHelpMessage = [
caption,
descriptions,
usage,
contextUsage,
...customHelpFields,
]
.filter(Boolean)
.join('\n');
return replayHelpMessage;
}

clearCommands(text: string | undefined, commands: string[], locale: string) {
const words = (text || '').split(' ');
const lowerCasedWords = words.map((c) => c.toLowerCase());
const lowerCasedCommands = commands.map((c) => c.toLowerCase());
lowerCasedCommands.forEach((command) => {
lowerCasedWords.forEach((word, wordIndex) => {
if (command === word) {
words[wordIndex] = '';
}
if (`/${command}` === word) {
words[wordIndex] = '';
}
if (this.translateByLowerCase(command, locale) === word) {
words[wordIndex] = '';
}
if (`/${this.translateByLowerCase(command, locale)}` === word) {
words[wordIndex] = '';
}
});
});
return words.join(' ').split('  ').join(' ').trim();
}

checkCommands(text: string | undefined, commands: string[], locale?: string) {
const lowerCasedText = this.prepareCommandString(
(text || '').toLocaleLowerCase()
);
const lowerCasedCommands = commands
.map((c) => this.prepareCommandString(c).toLocaleLowerCase().split('|'))
.reduce((acc, val) => acc.concat(val), []);
if (
lowerCasedCommands.find(
(command) =>
lowerCasedText.includes(command) ||
lowerCasedText.includes(`/${command}`)
)
) {
return true;
}
if (
lowerCasedCommands.find(
(command) =>
lowerCasedText.includes(
this.prepareCommandString(
this.translateByLowerCase(command, locale)
)
) ||
lowerCasedText.includes(
`/${this.prepareCommandString(
this.translateByLowerCase(command, locale)
)}`
)
)
) {
return true;
}
return false;
}

checkMicromatchCommands(text: string | undefined, commands: string[]) {
const lowerCasedText = this.prepareCommandString(
(text || '').toLocaleLowerCase()
);
const lowerCasedCommands = commands
.map((c) => this.prepareCommandString(c.toLocaleLowerCase()).split('|'))
.reduce((acc, val) => acc.concat(val), []);
if (
lowerCasedCommands.find((command) =>
isMatch(lowerCasedText, `${command}`)
)
) {
return true;
}
return false;
}

prepareHelpString(text: string | undefined) {
return (text || '').split('*').join('\\*');
}

getRandomItem<T>(items: T[]) {
return items[Math.floor(Math.random() * items.length)];
}

capitalizeFirstLetter(text: string | undefined, locale: string) {
const [first, ...rest] = (text || '').trim();
return (first || '').toLocaleUpperCase(locale) + rest.join('');
}

getLocale<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg, defaultValue: string) {
let locale = msg?.from?.language_code;
if (
!locale ||
!Object.keys(this.translatesStorage.translates).find((key) =>
locale?.includes(key)
)
) {
locale = defaultValue;
}
return locale;
}

private translateByLowerCase(
key: string,
locale?: string,
context: unknown = {}
) {
this.initLowerCaseTranslates();
const lowerCaseKey = key.toLowerCase();
if (!this.lowerCaseTranslates) {
throw new Error(`lowerCaseTranslates not set`);
}
const value =
(locale && this.lowerCaseTranslates?.[locale]?.[lowerCaseKey]) ||
lowerCaseKey;
return value ? render(value, context) : value;
}

private prepareCommandString(command: string): string {
if (this.botCommandsConfig?.prepareCommandString) {
return this.botCommandsConfig.prepareCommandString(command);
}
return command || '';
}

private initLowerCaseTranslates() {
if (!this.lowerCaseTranslates) {
this.lowerCaseTranslates = {};
Object.keys(this.translatesStorage.translates).forEach(
(translateLocale) => {
if (!this.lowerCaseTranslates) {
throw new Error(`lowerCaseTranslates not set`);
}
this.lowerCaseTranslates[translateLocale] = {};
Object.keys(
this.translatesStorage.translates[translateLocale]
).forEach((translateKey) => {
if (!this.lowerCaseTranslates?.[translateLocale]) {
throw new Error(
`lowerCaseTranslates by locale "${translateLocale}" not set`
);
}
this.lowerCaseTranslates[translateLocale][
translateKey.toLowerCase()
] =
this.translatesStorage.translates[translateLocale][
translateKey
].toLowerCase();
});
}
);
}
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Append category property to all commands as example of quotes

libs/quotes-generator/server/src/lib/quotes-generator.module.ts

```
import {
BotCommandsCategory,
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { ScraperModule } from '@kaufman-bot/html-scraper/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import { QuotesGeneratorService } from './quotes-generator-services/quotes-generator.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class QuotesGeneratorModule {
static forRoot(): DynamicModule {
return {
module: QuotesGeneratorModule,
imports: [
ScraperModule.forRoot({
title: getText('Quotes generator'),
name: 'quotes',
descriptions: getText(
'Command to generate text with a random quotes'
),
usage: [
getText('get quote'),
getText('get quotes'),
getText('quotes help'),
],
contextUsage: [getText('more'), getText('next')],
contentSelector:
'forismatic > quote > quotetext, forismatic > quote > quoteauthor',
spyWords: [getText('quotes'), getText('quote')],
removeWords: [getText('get'), getText('please')],
uri: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=xml&lang={{locale}}',
contentCodepage: 'utf8',
headers: [{}],
category: BotCommandsCategory.user,
}),
],
providers: [
{
provide: BOT_COMMANDS_PROVIDER,
useClass: QuotesGeneratorService,
},
],
exports: [ScraperModule],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update app module for use admin from envs

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

Append TELEGRAM_BOT_ADMINS to env file

.env.local

```
TELEGRAM_BOT_TOKEN=1111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
TELEGRAM_BOT_WEB_HOOKS_DOMAIN=kaufman-bot.site15.ru
TELEGRAM_BOT_WEB_HOOKS_PATH=/webhook
TELEGRAM_BOT_ADMINS=102375526
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

Prepare files and translate dictionaries

npm run generate

--

### 

Translate all need words

--

### 

Convert po translate dictionaries files to json

npm run generate

--

### 

Commit changes, wait end of deploy, for test without admin role

--

### 

Check from telegram, we must see only user commands

--

### 

Append description of bot with @botfather

Show bot info

Set description

```
Currency converter
convert 1 usd to eur, converter help

Facts generator
get facts, get fact, facts help

Quotes generator
get quote, get quotes, quotes help

Jokes generator
get joke, get jokes, jokes help
```

Enter fullscreen mode

Exit fullscreen mode

Result

Set about text

Result

Set avatar

--

### 

Check from telegram

First open bot

Show bot info

Send help commands

## 

Add admin id to env

--

### 

Get your id

--

### 

Append env with this id to github settings

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
dokku config:set --no-restart kaufman-bot TELEGRAM_BOT_ADMINS=${{secrets.TELEGRAM_BOT_ADMINS}}
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
branch: 'feature/73'
git_remote_url: 'ssh://dokku@${{secrets.HOST}}:22/kaufman-bot'
ssh_private_key: ${{secrets.SSH_PRIVATE_KEY}}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Check new logic in telegram bot

--

### 

Show botinfo in personal user chat

--

### 

Show botinfo in groups chat

--

### 

Show help in personal chat

--

### 

Show help in groups chat

In next post I append semver and create changelog with released features and fixes, and maybe I close issue https://github.com/EndyKaufman/kaufman-bot/issues/73...

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