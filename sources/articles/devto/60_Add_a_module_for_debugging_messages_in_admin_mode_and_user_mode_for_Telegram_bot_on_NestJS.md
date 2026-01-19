Add a module for debugging messages in admin mode and user mode for Telegram bot on NestJS

# Add a module for debugging messages in admin mode and user mode for Telegram bot on NestJS

Published: 2022-04-01T18:49:15.523Z
Tags: kaufmanbot, nestjs, debug, telegram
[Original Article](https://dev.to/endykaufman/add-a-module-for-debugging-messages-in-admin-mode-and-user-mode-for-telegram-bot-on-nestjs-ebm)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Add new field to user for store debug mode state

--

### 

Create migrations for append new user field

migrations/V202203310937AddDebugFieldToUserTable.pgsql

```
DO $$
BEGIN
ALTER TABLE "User"
ADD "debugMode" boolean DEFAULT FALSE;
EXCEPTION
WHEN duplicate_column THEN
NULL;
END
$$;
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Apply migrations

npm run migrate:local

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run migrate:local

> kaufman-bot@0.0.0 migrate:local
> export $(xargs < ./.env.local) > /dev/null 2>&1 && export DATABASE_URL=$SERVER_POSTGRES_URL && npm run migrate

> kaufman-bot@0.0.0 migrate
> npm run flyway -- migrate

> kaufman-bot@0.0.0 flyway
> flyway -c .flyway.js "migrate"

Flyway Community Edition 6.3.2 by Redgate
Database: jdbc:postgresql://localhost:5432/kaufman_bot_develop (PostgreSQL 13.3)
WARNING: Flyway upgrade recommended: PostgreSQL 13.3 is newer than this version of Flyway and support has not been tested. The latest supported version of PostgreSQL is 12.
Successfully validated 3 migrations (execution time 00:00.018s)
Current version of schema "public": 202203252144
Migrating schema "public" to version 202203310937 - AddDebugFieldToUserTable
Successfully applied 1 migration to schema "public" (execution time 00:00.032s)
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update prisma schema and sdk

npm run prisma:pull:local

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run prisma:pull:local

> kaufman-bot@0.0.0 prisma:pull:local
> export $(xargs < ./.env.local) > /dev/null 2>&1 && export DATABASE_URL=$SERVER_POSTGRES_URL && npm run -- prisma db pull && npm run prisma:generate

> kaufman-bot@0.0.0 prisma
> prisma "db" "pull"

Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "kaufman_bot_develop", schema "public" at "localhost:5432"

Introspecting based on datasource defined in prisma/schema.prisma …

✔ Introspected 2 models and wrote them into prisma/schema.prisma in 303ms

Run prisma generate to generate Prisma Client.

> kaufman-bot@0.0.0 prisma:generate
> npm run -- prisma generate

> kaufman-bot@0.0.0 prisma
> prisma "generate"

Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.11.1 | library) to ./node_modules/@prisma/client in 165ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```

Enter fullscreen mode

Exit fullscreen mode

Check prisma schema
prisma/schema.prisma

```
generator client {
provider      = "prisma-client-js"
binaryTargets = ["native", "linux-musl"]
}

datasource db {
provider = "postgresql"
url      = env("DATABASE_URL")
}

model User {
id         String  @id(map: "PK_USERS") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
telegramId String  @unique(map: "UQ_USERS__TELEGRAM_ID") @db.VarChar(64)
langCode   String  @default("en") @db.VarChar(64)
debugMode  Boolean @default(false)
}

model migrations {
installed_rank Int      @id(map: "__migrations_pk")
version        String?  @db.VarChar(50)
description    String   @db.VarChar(200)
type           String   @db.VarChar(20)
script         String   @db.VarChar(1000)
checksum       Int?
installed_by   String   @db.VarChar(100)
installed_on   DateTime @default(now()) @db.Timestamp(6)
execution_time Int
success        Boolean

@@index([success], map: "__migrations_s_idx")
@@map("__migrations")
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Update core logic for correct work all logic needed in debug command

--

### 

Update all interfaces

Before hook

libs/core/server/src/lib/bot-commands/bot-commands-types/on-before-bot-commands.interface.ts

```
import { BotCommandsProviderActionMsg } from './bot-commands-provider.interface';

export interface OnBeforeBotCommands {
onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
msg: TMsg,
ctx?
): Promise<TMsg>;
}

```

Enter fullscreen mode

Exit fullscreen mode

After hook

libs/core/server/src/lib/bot-commands/bot-commands-types/on-after-bot-commands.interface.ts

```
import { BotCommandsProviderActionResultType } from './bot-commands-provider-action-result-type';
import { BotCommandsProviderActionMsg } from './bot-commands-provider.interface';

export interface OnAfterBotCommands {
onAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg,
TResult extends BotCommandsProviderActionResultType<TMsg> = BotCommandsProviderActionResultType<TMsg>
>(
result: TResult,
msg: TMsg,
ctx?
): Promise<{ result: TResult; msg: TMsg }>;
}

```

Enter fullscreen mode

Exit fullscreen mode

Update provider interface

libs/core/server/src/lib/bot-commands/bot-commands-types/bot-commands-provider.interface.ts

```
import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { BotCommandsProviderActionResultType } from './bot-commands-provider-action-result-type';

export const BOT_COMMANDS_PROVIDER = Symbol('BOT_COMMANDS_PROVIDER');

export type BotCommandsProviderActionMsg = Update.MessageUpdate['message'] & {
text: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
botContext?: Record<string, any>;
};

export type BotCommandsProviderActionContext = Context<Update.MessageUpdate>;

export interface BotCommandsProvider {
onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
msg: TMsg,
ctx
): Promise<BotCommandsProviderActionResultType<TMsg>>;

onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
msg: TMsg,
ctx
): Promise<BotCommandsProviderActionResultType<TMsg>>;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update core service

Add main logic of work with telegram to service

libs/core/server/src/lib/bot-commands/bot-commands-services/bot-commands.service.ts

```
import { Injectable } from '@nestjs/common';
import { CustomInject } from 'nestjs-custom-injector';
import { BotCommandsEnum } from '../bot-commands-types/bot-commands-enum';
import { BotCommandsProviderActionResultType } from '../bot-commands-types/bot-commands-provider-action-result-type';
import {
BotCommandsProvider,
BotCommandsProviderActionContext,
BotCommandsProviderActionMsg,
BOT_COMMANDS_PROVIDER,
} from '../bot-commands-types/bot-commands-provider.interface';
import { OnAfterBotCommands } from '../bot-commands-types/on-after-bot-commands.interface';
import { OnBeforeBotCommands } from '../bot-commands-types/on-before-bot-commands.interface';
import { BotСommandsToolsService } from './bot-commands-tools.service';
@Injectable()
export class BotСommandsService implements BotCommandsProvider {
@CustomInject(BOT_COMMANDS_PROVIDER, { multi: true })
private botCommandsProviders!: (BotCommandsProvider &
Partial<OnBeforeBotCommands> &
Partial<OnAfterBotCommands>)[];

constructor(
private readonly botСommandsToolsService: BotСommandsToolsService
) {}

async process(ctx, defaultHandler?: () => Promise<unknown>) {
let msg: BotCommandsProviderActionMsg = ctx.update.message;
const result = await this.onMessage(msg, ctx, defaultHandler);
if (result?.type === 'message') {
msg = result.message;
}
if (result?.type === 'markdown') {
await ctx.reply(result.markdown, { parse_mode: 'MarkdownV2' });
return;
}
if (result?.type === 'text') {
await ctx.reply(result.text);
return;
}
}

async onHelp<TMsg extends BotCommandsProviderActionMsg>(
msg: TMsg,
ctx: BotCommandsProviderActionContext
): Promise<BotCommandsProviderActionResultType<TMsg>> {
const allResults: string[] = [];
const len = this.botCommandsProviders.length;
for (let i = 0; i < len; i++) {
const botCommandsProvider = this.botCommandsProviders[i];

const result = await botCommandsProvider.onHelp(msg, ctx);

if (result !== null && result.type === 'text') {
allResults.push(result.text);
}

if (result !== null && result.type === 'markdown') {
allResults.push(result.markdown);
}
}
return {
type: 'markdown',
markdown: allResults.join('\n\n'),
};
}

async onMessage<TMsg extends BotCommandsProviderActionMsg>(
msg: TMsg,
ctx: BotCommandsProviderActionContext,
defaultHandler?: () => Promise<unknown>
): Promise<BotCommandsProviderActionResultType<TMsg>> {
msg = await this.processOnBeforeBotCommands(msg, ctx);

const len = this.botCommandsProviders.length;
let result: BotCommandsProviderActionResultType<TMsg> = null;
for (let i = 0; i < len; i++) {
if (!result) {
const botCommandsProvider = this.botCommandsProviders[i];

result = await botCommandsProvider.onMessage(msg, ctx);
}
}

if (
result === null &&
this.botСommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.help],
msg.from.language_code
)
) {
return this.onHelp(msg, ctx);
}

const afterBotCommand = await this.processOnAfterBotCommands(
result,
msg,
ctx
);

if (defaultHandler) {
await defaultHandler();
}

return afterBotCommand.result;
}

async processOnBeforeBotCommands<TMsg extends BotCommandsProviderActionMsg>(
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<TMsg> {
const len = this.botCommandsProviders.length;
for (let i = 0; i < len; i++) {
const botCommandsProvider = this.botCommandsProviders[i];
if (botCommandsProvider.onBeforeBotCommands)
msg = await botCommandsProvider.onBeforeBotCommands(msg, ctx);
}
return msg;
}

async processOnAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg,
TResult extends BotCommandsProviderActionResultType<TMsg> = BotCommandsProviderActionResultType<TMsg>
>(
result: TResult,
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<{ result: TResult; msg: TMsg }> {
const len = this.botCommandsProviders.length;
for (let i = 0; i < len; i++) {
const botCommandsProvider = this.botCommandsProviders[i];
if (botCommandsProvider.onAfterBotCommands) {
const afterBotCommand = await botCommandsProvider.onAfterBotCommands<
TMsg,
TResult
>(result, msg, ctx);
result = afterBotCommand.result;
msg = afterBotCommand.msg;
}
}
return { result, msg };
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Create DebugMessagesModule

--

### 

Create new nx lib debug-messages

npm run -- nx g @nrwl/nest:lib debug-messages/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib debug-messages/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "debug-messages/server"

CREATE libs/debug-messages/server/README.md
CREATE libs/debug-messages/server/.babelrc
CREATE libs/debug-messages/server/src/index.ts
CREATE libs/debug-messages/server/tsconfig.json
CREATE libs/debug-messages/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/debug-messages/server/project.json
UPDATE workspace.json
CREATE libs/debug-messages/server/.eslintrc.json
CREATE libs/debug-messages/server/jest.config.js
CREATE libs/debug-messages/server/tsconfig.spec.json
CREATE libs/debug-messages/server/src/lib/debug-messages-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create config file

libs/debug-messages/server/src/lib/debug-messages-config/debug-messages.config.ts

```
export const DEBUG_MESSAGES_CONFIG = 'DEBUG_MESSAGES_CONFIG';

export interface DebugMessagesConfig {
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create commands enum

libs/debug-messages/server/src/lib/debug-messages-types/debug-messages-commands.ts

```
import { getText } from 'class-validator-multi-lang';

export const DebugMessagesCommandsEnum = {
on: getText('on'),
off: getText('off'),
current: getText('state'),
};

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create storage service for store user settings

libs/debug-messages/server/src/lib/debug-messages-services/debug-messages.storage.ts

```
import { PrismaClientService } from '@kaufman-bot/core/server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DebugMessagesStorage {
private readonly debugModeOfUsers: Record<number, boolean> = {};

constructor(private readonly prismaClientService: PrismaClientService) {}

async getDebugModeOfUser(telegramUserId: number): Promise<boolean> {
const currentDebugMode = this.debugModeOfUsers[telegramUserId];
if (currentDebugMode) {
return currentDebugMode;
}
try {
const currentDebugModeFromDatabase =
await this.prismaClientService.user.findFirst({
where: { telegramId: telegramUserId.toString() },
rejectOnNotFound: true,
});
this.debugModeOfUsers[telegramUserId] =
currentDebugModeFromDatabase.debugMode;
return this.debugModeOfUsers[telegramUserId];
} catch (error) {
return false;
}
}

async setDebugModeOfUser(userId: number, debugMode: boolean): Promise<void> {
await this.prismaClientService.user.upsert({
create: { telegramId: userId.toString(), debugMode },
update: { debugMode },
where: { telegramId: userId.toString() },
});
this.debugModeOfUsers[userId] = debugMode;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create service with main logic of bot command

libs/debug-messages/server/src/lib/debug-messages-services/debug-messages.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
OnAfterBotCommands,
OnBeforeBotCommands,
} from '@kaufman-bot/core/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService } from 'nestjs-translates';
import {
DebugMessagesConfig,
DEBUG_MESSAGES_CONFIG,
} from '../debug-messages-config/debug-messages.config';
import { DebugMessagesCommandsEnum } from '../debug-messages-types/debug-messages-commands';
import { DebugMessagesStorage } from './debug-messages.storage';

const DEBUG_MODE = 'debugMode';

@Injectable()
export class DebugMessagesService
implements BotCommandsProvider, OnBeforeBotCommands, OnAfterBotCommands
{
private readonly logger = new Logger(DebugMessagesService.name);

constructor(
@Inject(DEBUG_MESSAGES_CONFIG)
private readonly debugMessagesConfig: DebugMessagesConfig,
private readonly translatesService: TranslatesService,
private readonly debugMessagesStorage: DebugMessagesStorage,
private readonly commandToolsService: BotСommandsToolsService
) {}

async onAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg,
TResult extends BotCommandsProviderActionResultType<TMsg> = BotCommandsProviderActionResultType<TMsg>
>(result: TResult, msg: TMsg, ctx): Promise<{ result: TResult; msg: TMsg }> {
const { botContext, ...debugData } = msg;
if (botContext?.[DEBUG_MODE] && ctx) {
ctx.reply(
['```

', JSON.stringify(debugData, undefined, 4), '

```'].join('\n'),
{
parse_mode: 'MarkdownV2',
}
);
}
return {
msg,
result,
};
}

async onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<TMsg> {
const debugMode = await this.debugMessagesStorage.getDebugModeOfUser(
msg.from?.id
);
if (!msg.botContext) {
msg.botContext = {};
}
msg.botContext[DEBUG_MODE] = debugMode;
return msg;
}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.debugMessagesConfig.name} ${BotCommandsEnum.help}`,
});
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code || 'en';

const spyWord = this.debugMessagesConfig.spyWords.find((spyWord) =>
this.commandToolsService.checkCommands(msg.text, [spyWord], locale)
);
if (spyWord) {
if (
this.commandToolsService.checkCommands(
msg.text,
[BotCommandsEnum.help],
locale
)
) {
return {
type: 'markdown',
markdown: this.commandToolsService.generateHelpMessage(
locale,
this.debugMessagesConfig.name,
this.debugMessagesConfig.descriptions,
this.debugMessagesConfig.usage
),
};
}

const processedMsg = await this.process(msg, locale);

if (typeof processedMsg === 'string') {
return {
type: 'text',
text: processedMsg,
};
}
if (processedMsg) {
return { type: 'message', message: processedMsg };
}

this.logger.warn(`Unhandled commands for text: "${msg.text}"`);
this.logger.debug(msg);
}
return null;
}

private async process<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg, locale: string) {
const debugMode = await this.debugMessagesStorage.getDebugModeOfUser(
msg.from?.id
);
if (
this.commandToolsService.checkCommands(
msg.text,
[DebugMessagesCommandsEnum.on],
locale
)
) {
if (!debugMode) {
await this.debugMessagesStorage.setDebugModeOfUser(msg.from?.id, true);
return this.translatesService.translate(
getText(`debug enabled`),
locale,
{
locale,
}
);
} else {
return this.translatesService.translate(
getText(`debug already enabled`),
locale,
{
locale,
}
);
}
}
if (
this.commandToolsService.checkCommands(
msg.text,
[DebugMessagesCommandsEnum.off],
locale
)
) {
if (debugMode) {
await this.debugMessagesStorage.setDebugModeOfUser(msg.from?.id, false);
return this.translatesService.translate(
getText(`debug disabled`),
locale,
{
locale,
}
);
} else {
return this.translatesService.translate(
getText(`debug already disabled`),
locale,
{
locale,
}
);
}
}
if (
this.commandToolsService.checkCommands(
msg.text,
[DebugMessagesCommandsEnum.current],
locale
)
) {
return this.translatesService.translate(
getText(`debug: {{debugMode}}`),
locale,
{ debugMode: debugMode ? 'enable' : 'disable' }
);
}
return msg;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create module

libs/debug-messages/server/src/lib/debug-messages.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
PrismaClientModule,
} from '@kaufman-bot/core/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import { TranslatesModule } from 'nestjs-translates';
import {
DebugMessagesConfig,
DEBUG_MESSAGES_CONFIG,
} from './debug-messages-config/debug-messages.config';
import { DebugMessagesService } from './debug-messages-services/debug-messages.service';
import { DebugMessagesStorage } from './debug-messages-services/debug-messages.storage';

@Module({
imports: [TranslatesModule, PrismaClientModule, BotCommandsModule],
providers: [DebugMessagesStorage],
exports: [
TranslatesModule,
PrismaClientModule,
BotCommandsModule,
DebugMessagesStorage,
],
})
export class DebugMessagesModule {
static forRoot(): DynamicModule {
return {
module: DebugMessagesModule,
imports: [
CustomInjectorModule.forFeature({
imports: [DebugMessagesModule],
providers: [
{
provide: DEBUG_MESSAGES_CONFIG,
useValue: <DebugMessagesConfig>{
name: getText('Debug messages'),
usage: [
getText('debug on'),
getText('debug off'),
getText('debug state'),
],
descriptions: getText(
'Commands for enable and disable debug mode'
),
spyWords: [getText('debug')],
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: DebugMessagesService,
},
],
exports: [DEBUG_MESSAGES_CONFIG],
}),
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Update application

--

### 

Update app service

apps/server/src/app/app.service.ts

```
import {
BotCommandsProviderActionMsg,
BotСommandsService,
} from '@kaufman-bot/core/server';
import { Injectable, Logger } from '@nestjs/common';
import { Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
private readonly logger = new Logger(AppService.name);

constructor(private readonly botСommandsService: BotСommandsService) {}

getData(): { message: string } {
return { message: 'Welcome to server!' };
}

@Start()
async startCommand(ctx: Context) {
await this.botСommandsService.process(ctx, () => ctx.reply('Welcome'));
}

@On('sticker')
async onSticker(ctx) {
await this.botСommandsService.process(ctx, () => ctx.reply('👍'));
}

@Hears('hi')
async hearsHi(ctx: Context) {
await this.botСommandsService.process(ctx, () => ctx.reply('Hey there'));
}

@On('text')
async onMessage(ctx) {
let msg: BotCommandsProviderActionMsg = ctx.update.message;
const result = await this.botСommandsService.onMessage(msg, ctx);
if (result?.type === 'message') {
msg = result.message;
}
if (result?.type === 'markdown') {
await ctx.reply(result.markdown, { parse_mode: 'MarkdownV2' });
return;
}
if (result?.type === 'text') {
await ctx.reply(result.text);
return;
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
import {
BotCommandsModule,
PrismaClientModule,
} from '@kaufman-bot/core/server';
import { CurrencyConverterModule } from '@kaufman-bot/currency-converter/server';
import { DebugMessagesModule } from '@kaufman-bot/debug-messages/server';
import { FactsGeneratorModule } from '@kaufman-bot/facts-generator/server';
import {
DEFAULT_LANGUAGE,
LanguageSwitherModule,
} from '@kaufman-bot/language-swither/server';
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

@Module({
imports: [
TelegrafModule.forRoot({
token: env.get('TELEGRAM_BOT_TOKEN').required().asString(),
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
join(__dirname, 'assets', 'i18n', 'class-validator-messages'),
],
vendorLocalePaths: [join(__dirname, 'assets', 'i18n')],
locales: [DEFAULT_LANGUAGE, 'ru'],
})
),
BotCommandsModule,
LanguageSwitherModule.forRoot(),
DebugMessagesModule.forRoot(),
CurrencyConverterModule.forRoot(),
FactsGeneratorModule.forRoot(),
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Translate all dictionaries

--

### 

Run generate all need files

npm run generate

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run generate

> kaufman-bot@0.0.0 generate
> npm run prisma:generate && npm run rucken -- prepare --locales=en,ru && npm run lint:fix

> kaufman-bot@0.0.0 prisma:generate
> npm run -- prisma generate

> kaufman-bot@0.0.0 prisma
> prisma "generate"

Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.11.1 | library) to ./node_modules/@prisma/client in 193ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
```

Enter fullscreen mode

Exit fullscreen mode

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```

> kaufman-bot@0.0.0 rucken
> rucken "prepare" "--locales=en,ru"

> kaufman-bot@0.0.0 lint:fix
> npm run tsc:lint && nx workspace-lint --fix && nx run-many --target=lint --all --fix && nx format:write --all

> kaufman-bot@0.0.0 tsc:lint
> tsc --noEmit -p tsconfig.base.json

✔  nx run currency-converter-server:lint  [local cache]
✔  nx run language-swither-server:lint  [local cache]
✔  nx run facts-generator-server:lint  [local cache]
✔  nx run debug-messages-server:lint (1s)
✔  nx run html-scraper-server:lint  [local cache]
✔  nx run core-server:lint (1s)
✔  nx run server:lint (1s)

——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  NX   Successfully ran target lint for 7 projects (4s)

With additional flags:
--fix=true

Nx read the output from the cache instead of running the command for 4 out of 7 tasks.

>  NX   Running affected:* commands with --all can result in very slow builds.

--all is not meant to be used for any sizable project or to be used in CI.

Learn more about checking only what is affected: https://nx.dev/latest/angular/cli/affected#affected.
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add translate for all empty words

View list of dictionaries for translate

Add translates in ru language

Run generate for generate json dictionaries from po files

npm run generate

## 

Check new logic in telegram bot

Common help message

Help message for debug command

Enable debug mode and check work it

Change user locale with show debug info

Common help message on Russia locale

Example of debug emoji

Send

Debug

```
{
"message_id": 822,
"from": {
"id": 102375526,
"is_bot": false,
"first_name": "IL'shat",
"last_name": "Khamitov",
"username": "KaufmanEndy",
"language_code": "ru"
},
"chat": {
"id": 102375526,
"first_name": "IL'shat",
"last_name": "Khamitov",
"username": "KaufmanEndy",
"type": "private"
},
"date": 1648837576,
"sticker": {
"width": 512,
"height": 512,
"emoji": "😥",
"set_name": "PeopleMemes",
"is_animated": true,
"is_video": false,
"thumb": {
"file_id": "AAMCAgADGQEAAgM2YkdDyN-EhN0TaqqYga12aOy6N3EAApoUAALJ5JFJ6q9bB_WLS2YBAAdtAAMjBA",
"file_unique_id": "AQADmhQAAsnkkUly",
"file_size": 6304,
"width": 128,
"height": 128
},
"file_id": "CAACAgIAAxkBAAIDNmJHQ8jfhITdE2qqmIGtdmjsujdxAAKaFAACyeSRSeqvWwf1i0tmIwQ",
"file_unique_id": "AgADmhQAAsnkkUk",
"file_size": 29792
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Answer

For emoji used top app handler

In the next post, I will add a module for process unhandled message with Dialogflow API...

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