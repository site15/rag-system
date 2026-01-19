Add support work in groups and use global bot name for that in Telegram bot on NestJS

# Add support work in groups and use global bot name for that in Telegram bot on NestJS

Published: 2022-04-12T15:56:32.290Z
Tags: kaufmanbot, nestjs, telegram, groups
[Original Article](https://dev.to/endykaufman/add-support-work-in-groups-and-use-global-bot-name-for-that-in-telegram-bot-on-nestjs-4116)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Description of work

In the current post, I will create a module for using the bot in groups, and in order not to flood, I will use the global name of the bot or the telegram nickname of the bot for this

## 

Create use in groups command

--

### 

Create nx lib

npm run -- nx g @nrwl/nest:lib bot-in-groups/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib bot-in-groups/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "bot-in-groups/server"

CREATE libs/bot-in-groups/server/README.md
CREATE libs/bot-in-groups/server/.babelrc
CREATE libs/bot-in-groups/server/src/index.ts
CREATE libs/bot-in-groups/server/tsconfig.json
CREATE libs/bot-in-groups/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/bot-in-groups/server/project.json
UPDATE workspace.json
CREATE libs/bot-in-groups/server/.eslintrc.json
CREATE libs/bot-in-groups/server/jest.config.js
CREATE libs/bot-in-groups/server/tsconfig.spec.json
CREATE libs/bot-in-groups/server/src/lib/bot-in-groups-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create config

libs/bot-in-groups/server/src/lib/bot-in-groups-config/bot-in-groups.config.ts

```
export const BOT_IN_GROUPS_CONFIG = Symbol('BOT_IN_GROUPS_CONFIG');

export interface BotInGroupsConfig {
title: string;
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
botNames: { [langCode: string]: string[] };
botMeetingInformation: { [langCode: string]: string[] };
botDoNotHaveFullAccess: { [langCode: string]: string[] };
botNowHaveFullAccess: { [langCode: string]: string[] };
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create service

libs/bot-in-groups/server/src/lib/bot-in-groups-services/bot-in-groups.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
OnBeforeBotCommands,
} from '@kaufman-bot/core/server';
import { DEFAULT_LANGUAGE } from '@kaufman-bot/language-swither/server';
import { Inject, Injectable } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import {
BotInGroupsConfig,
BOT_IN_GROUPS_CONFIG,
} from '../bot-in-groups-config/bot-in-groups.config';

@Injectable()
export class BotInGroupsService
implements BotCommandsProvider, OnBeforeBotCommands
{
constructor(
@Inject(BOT_IN_GROUPS_CONFIG)
private readonly botInGroupsConfig: BotInGroupsConfig,
private readonly botCommandsToolsService: BotCommandsToolsService
) {}

async onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<TMsg> {
const locale = this.botCommandsToolsService.getLocale(
msg,
DEFAULT_LANGUAGE
);
if (msg.from.id !== msg.chat.id) {
if (
this.botCommandsToolsService.checkCommands(
msg.text,
this.botInGroupsConfig.botNames[locale]
)
) {
msg.from.id = msg.chat.id;
msg.text = this.botCommandsToolsService.clearCommands(
msg.text,
this.botInGroupsConfig.botNames[locale],
locale
);
} else {
msg.botCommandHandlerBreak = true;
}
}
return msg;
}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.botInGroupsConfig.name} ${BotCommandsEnum.help}`,
});
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = this.botCommandsToolsService.getLocale(
msg,
DEFAULT_LANGUAGE
);

const spyWord = this.botInGroupsConfig.spyWords.find((spyWord) =>
this.botCommandsToolsService.checkCommands(msg.text, [spyWord], locale)
);
if (spyWord) {
if (
this.botCommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.help],
locale
)
) {
return {
type: 'markdown',
message: msg,
markdown: this.botCommandsToolsService.generateHelpMessage({
locale,
name: this.botInGroupsConfig.title,
descriptions: this.botInGroupsConfig.descriptions,
usage: this.botInGroupsConfig.usage,
}),
};
}
if (
this.botCommandsToolsService.checkCommands(
msg.text,
[getText('meet')],
locale
)
) {
return {
type: 'markdown',
message: msg,
markdown: this.botCommandsToolsService.getRandomItem(
this.botInGroupsConfig.botMeetingInformation[locale]
),
};
}
}

return null;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create processor service

libs/bot-in-groups/server/src/lib/bot-in-groups-services/bot-in-groups-processor.service.ts

```
import {
BotCommandsService,
BotCommandsToolsService,
} from '@kaufman-bot/core/server';
import { DISABLE_FIRST_MEETING_COMMANDS } from '@kaufman-bot/first-meeting/server';
import {
DEFAULT_LANGUAGE,
LanguageSwitherStorage,
} from '@kaufman-bot/language-swither/server';
import {
DISABLE_SHORT_COMMANDS__BEFORE_HOOK,
ShortCommandsToolsService,
} from '@kaufman-bot/short-commands/server';
import { Inject, Injectable } from '@nestjs/common';
import {
BotInGroupsConfig,
BOT_IN_GROUPS_CONFIG,
} from '../bot-in-groups-config/bot-in-groups.config';

@Injectable()
export class BotInGroupsProcessorService {
constructor(
@Inject(BOT_IN_GROUPS_CONFIG)
private readonly botCommandsConfig: BotInGroupsConfig,
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly botCommandsService: BotCommandsService,
private readonly languageSwitherStorage: LanguageSwitherStorage,
private readonly shortCommandsToolsService: ShortCommandsToolsService
) {}

async process(ctx, defaultHandler?: () => Promise<unknown>) {
const telegramUserId =
ctx.update?.message?.chat?.id || ctx?.update?.message?.from?.id;

const dbLocale = telegramUserId
? await this.languageSwitherStorage.getLanguageOfUser(telegramUserId)
: null;

const locale =
dbLocale ||
(ctx.update?.message?.chat?.id < 0
? DEFAULT_LANGUAGE
: this.botCommandsToolsService.getLocale(
ctx?.update?.message,
DEFAULT_LANGUAGE
));

const botName = this.botCommandsConfig.botNames[locale][0];

if (ctx.update?.message?.from?.language_code) {
ctx.update.message.from.language_code = locale;
}

if (ctx.update?.message?.chat?.id > 0) {
await this.botCommandsService.process(ctx, defaultHandler);
return;
}

if (ctx?.update?.message) {
if (!ctx.update.message.botContext) {
ctx.update.message.botContext = {};
}
ctx.update.message.botContext[DISABLE_FIRST_MEETING_COMMANDS] = true;
ctx.update.message.botContext[DISABLE_SHORT_COMMANDS__BEFORE_HOOK] = true;
if (ctx.update.message.text) {
const shortCommand =
this.shortCommandsToolsService.updateTextWithShortCommands(
locale,
this.botCommandsToolsService.clearCommands(
ctx.update.message.text,
this.botCommandsConfig.botNames[locale],
locale
)
);
if (
this.botCommandsToolsService.checkCommands(
ctx.update.message.text,
this.botCommandsConfig.botNames[locale],
locale
)
) {
ctx.update.message.text = `${botName} ${shortCommand}`;
} else {
ctx.update.message.text = shortCommand;
}
}
}

const admins = await ctx.getChatAdministrators();
const botIsAdmin =
admins.filter((admin) => admin.user.id === ctx.botInfo.id).length > 0;

if (
ctx.update?.message?.chat?.id < 0 &&
ctx.update?.message?.new_chat_member?.id === ctx.botInfo.id
) {
await ctx.reply(
this.botCommandsToolsService.getRandomItem(
this.botCommandsConfig.botMeetingInformation[locale]
)
);
if (!botIsAdmin) {
await ctx.reply(
this.botCommandsToolsService.getRandomItem(
this.botCommandsConfig.botDoNotHaveFullAccess[locale]
)
);
}
return;
}

if (
ctx.update.my_chat_member?.chat?.id < 0 &&
ctx.update.my_chat_member?.old_chat_member.user.id === ctx.botInfo.id &&
ctx.update.my_chat_member?.old_chat_member.status === 'left' &&
ctx.update.my_chat_member?.new_chat_member.user.id === ctx.botInfo.id &&
ctx.update.my_chat_member?.new_chat_member.status === 'administrator'
) {
await ctx.reply(
this.botCommandsToolsService.getRandomItem(
this.botCommandsConfig.botNowHaveFullAccess[locale]
)
);
return;
}

if (
ctx.update.my_chat_member?.chat?.id < 0 &&
ctx.update.my_chat_member?.old_chat_member.user.id === ctx.botInfo.id &&
ctx.update.my_chat_member?.old_chat_member.status === 'member' &&
ctx.update.my_chat_member?.new_chat_member.user.id === ctx.botInfo.id &&
ctx.update.my_chat_member?.new_chat_member.status === 'administrator'
) {
await ctx.reply(
this.botCommandsToolsService.getRandomItem(
this.botCommandsConfig.botNowHaveFullAccess[locale]
)
);
return;
}

if (
ctx.update?.message?.chat?.id < 0 &&
ctx.update?.message?.reply_to_message?.from?.id === ctx.botInfo.id
) {
ctx.update.message.text = `${botName} ${ctx.update.message.text}`;
await this.botCommandsService.process(ctx, defaultHandler);
return;
}

if (botIsAdmin) {
await this.botCommandsService.process(ctx, defaultHandler);
}
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create module

libs/bot-in-groups/server/src/lib/bot-in-groups.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { LanguageSwitherModule } from '@kaufman-bot/language-swither/server';
import { ShortCommandsModule } from '@kaufman-bot/short-commands/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import {
BotInGroupsConfig,
BOT_IN_GROUPS_CONFIG,
} from './bot-in-groups-config/bot-in-groups.config';
import { BotInGroupsProcessorService } from './bot-in-groups-services/bot-in-groups-processor.service';
import { BotInGroupsService } from './bot-in-groups-services/bot-in-groups.service';

@Module({
imports: [
TranslatesModule,
BotCommandsModule,
LanguageSwitherModule,
ShortCommandsModule,
],
exports: [
TranslatesModule,
BotCommandsModule,
LanguageSwitherModule,
ShortCommandsModule,
],
})
export class BotInGroupsModule {
static forRoot(
config: Pick<
BotInGroupsConfig,
| 'botNames'
| 'botMeetingInformation'
| 'botDoNotHaveFullAccess'
| 'botNowHaveFullAccess'
>
): DynamicModule {
return {
module: BotInGroupsModule,
providers: [
{
provide: BOT_IN_GROUPS_CONFIG,
useValue: <BotInGroupsConfig>{
...config,
title: getText('Bot in groups'),
name: 'groups',
descriptions: getText(
'Commands for support work the bot in groups'
),
usage: [getText('groups help'), getText('groups meet')],
spyWords: [getText('groups')],
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: BotInGroupsService,
},
BotInGroupsProcessorService,
],
exports: [BotInGroupsProcessorService],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Prepare all files

npm run generate

--

### 

Update translates

## 

Update application

--

### 

Update app service

apps/server/src/app/app.service.ts

```
import { BotInGroupsProcessorService } from '@kaufman-bot/bot-in-groups/server';
import { BotCommandsService } from '@kaufman-bot/core/server';
import { Injectable, Logger } from '@nestjs/common';
import { On, Start, Update, Use } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
private readonly logger = new Logger(AppService.name);

constructor(
private readonly botCommandsService: BotCommandsService,
private readonly botInGroupsProcessorService: BotInGroupsProcessorService
) {}

getData(): { message: string } {
return { message: 'Welcome to server!' };
}

@Start()
async startCommand(ctx: Context) {
await this.botCommandsService.start(ctx);
}

@Use()
async use(ctx) {
try {
await this.botInGroupsProcessorService.process(ctx);
} catch (err) {
this.logger.error(err, err.stack);
}
}

@On('sticker')
async onSticker(ctx) {
try {
await this.botCommandsService.process(ctx);
} catch (err) {
this.logger.error(err, err.stack);
}
}

@On('text')
async onMessage(ctx) {
try {
await this.botCommandsService.process(ctx);
} catch (err) {
this.logger.error(err, err.stack);
}
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
en: [`Hello! \\'m Endy 😉`, 'Hello!', 'Hello 🖖'],
ru: [`Всем привет! я Энди 😉`, `Всем привет!`, 'Всем привет 🖖'],
},
botDoNotHaveFullAccess: {
en: [
`I not have access to read messages and process your commands 😢, please give me access 😉`,
],
ru: [
`У меня нет доступа на чтение ваших сообщений и обработки команд 😢, пожалуйста дайте мне доступ 😉`,
],
},
botNowHaveFullAccess: {
en: [`Now I have access, thanks 😉`],
ru: [`Теперь у меня есть доступ, спасибо 😉`],
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

## 

Check new logic in telegram bot

--

### 

Create new group

--

### 

Append bot as basic user

--

### 

After append a bot, he don't have access to read message

--

### 

Try get jokes without full access

--

### 

Add full access for give access to read messages

--

### 

Try get jokes with full access

--

### 

Work with Russian language

In next post I append a support to work telegram bot over web hook for speed up create answer to user in Telegram bot on NestJS...

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