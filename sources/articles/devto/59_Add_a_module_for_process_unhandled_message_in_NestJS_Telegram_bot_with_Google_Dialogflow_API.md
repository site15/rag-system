Add a module for process unhandled message in NestJS Telegram bot with Google Dialogflow API

# Add a module for process unhandled message in NestJS Telegram bot with Google Dialogflow API

Published: 2022-04-03T13:21:26.191Z
Tags: kaufmanbot, nestjs, telegram, dialogflow
[Original Article](https://dev.to/endykaufman/add-a-module-for-process-unhandled-message-in-nestjs-telegram-bot-with-google-dialogflow-api-50nb)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://cloud.google.com/dialogflow/docs/support/getting-support - official docs

https://github.com/googleapis/nodejs-dialogflow - node library for work with dialogflow

## 

Install dependecies

npm i --save @google-cloud/dialogflow uuid

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save-dev @google-cloud/dialogflow uuid

added 42 packages, and audited 984 packages in 8s

115 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

npm i --save-dev @types/uuid

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save-dev @types/uuid

added 1 package, and audited 985 packages in 2s

115 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

## 

Setup dialogflow

--

### 

Create project

Navigate to https://dialogflow.cloud.google.com/

Create new agent

After create you see two default intents

Test welcome intent from UI

Response for answer was selected from default responses

--

### 

Settings of authorizations

Navigate to project list
https://console.cloud.google.com/projectselector/iam-admin/serviceaccounts/create?supportedpurview=project

Select your project

In the Service account description field, enter a description. For example, Service account for quickstart.

Select role with Dialogflow and click continue

Click done

After click done you see list of accounts

Click Keys

Click Add key, then click Create new key

Click Create

A JSON key file is downloaded to your computer, click Close

Copy downloaded file to root folder of application and add it file name to .gitignore

## 

Update core source for correct work dialogflow logic

--

### 

Update OnAfterBotCommands

libs/core/server/src/lib/bot-commands/bot-commands-types/on-after-bot-commands.interface.ts

```
import { BotCommandsProviderActionResultType } from './bot-commands-provider-action-result-type';
import { BotCommandsProviderActionMsg } from './bot-commands-provider.interface';

export interface OnAfterBotCommands {
onAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
result: BotCommandsProviderActionResultType<TMsg>,
msg: TMsg,
ctx?,
defaultHandler?: () => Promise<unknown>
): Promise<{ result: BotCommandsProviderActionResultType<TMsg>; msg: TMsg }>;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update BotСommandsService

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
ctx,
defaultHandler
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

async processOnAfterBotCommands<TMsg extends BotCommandsProviderActionMsg>(
result: BotCommandsProviderActionResultType<TMsg>,
msg: TMsg,
ctx?: BotCommandsProviderActionContext,
defaultHandler?: () => Promise<unknown>
): Promise<{ result: BotCommandsProviderActionResultType<TMsg>; msg: TMsg }> {
const len = this.botCommandsProviders.length;
for (let i = 0; i < len; i++) {
const botCommandsProvider = this.botCommandsProviders[i];
if (botCommandsProvider.onAfterBotCommands) {
const afterBotCommand =
await botCommandsProvider.onAfterBotCommands<TMsg>(
result,
msg,
ctx,
defaultHandler
);
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

Update debug-messages modules files for reuse it in other libs

--

### 

Create DebugService

libs/debug-messages/server/src/lib/debug-messages-services/debug.service.ts

```
import { BotCommandsProviderActionMsg } from '@kaufman-bot/core/server';
import { Injectable, Logger } from '@nestjs/common';

const DEBUG_MODE = 'debugMode';

@Injectable()
export class DebugService {
private readonly logger = new Logger(DebugService.name);

setDebugMode<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg, value: boolean) {
if (!msg.botContext) {
msg.botContext = {};
}
msg.botContext[DEBUG_MODE] = value;
return msg;
}

sendDebugInfo<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
msg: TMsg,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ctx: any,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
data: any,
context: string
) {
if (msg.botContext?.[DEBUG_MODE]) {
ctx.reply(
[
`*${context} \\(${+new Date()}\\):*`,
'```

',
JSON.stringify(data, undefined, 4),
'

```',
].join('\n'),
{
parse_mode: 'MarkdownV2',
}
);
}
this.logger.debug(data, context);
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update DebugMessagesService

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
import { DebugService } from './debug.service';

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
private readonly commandToolsService: BotСommandsToolsService,
private readonly debugService: DebugService
) {}

async onAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
result: BotCommandsProviderActionResultType<TMsg>,
msg: TMsg,
ctx
): Promise<{ result: BotCommandsProviderActionResultType<TMsg>; msg: TMsg }> {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { botContext, ...debugData } = msg;
this.debugService.sendDebugInfo(
msg,
ctx,
debugData,
this.debugMessagesConfig.name
);
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
return this.debugService.setDebugMode(msg, debugMode);
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
{ debugMode: debugMode ? getText('enabled') : getText('disabled') }
);
}
return null;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update DebugMessagesModule

libs/debug-messages/server/src/lib/debug-messages.module.ts

```
...
import { DebugService } from './debug-messages-services/debug.service';

@Module({
imports: [TranslatesModule, PrismaClientModule, BotCommandsModule],
providers: [DebugMessagesStorage, DebugService],
exports: [
TranslatesModule,
PrismaClientModule,
BotCommandsModule,
DebugMessagesStorage,
DebugService,
],
})
export class DebugMessagesModule {
...

```

Enter fullscreen mode

Exit fullscreen mode

## 

Create DialogFlowModule

--

### 

Create table for store metadata with user activity

Create migration

migrations/V202204030939__CreateDialogflowTable.pgsql

```
CREATE TABLE IF NOT EXISTS "DialogflowSession" (
id uuid DEFAULT uuid_generate_v4 () NOT NULL,
"userId" uuid NOT NULL CONSTRAINT "FK_DIALOGFLOW_SESSION__USER_ID" REFERENCES "User",
"projectId" varchar(512) NOT NULL,
"sessionId" uuid NOT NULL,
"requestsMetadata" jsonb DEFAULT '[]' NOT NULL,
"responsesMetadata" jsonb DEFAULT '[]' NOT NULL,
"createdAt" timestamp DEFAULT now() NOT NULL,
"updatedAt" timestamp DEFAULT now() NOT NULL,
CONSTRAINT "PK_DIALOGFLOW_SESSION" PRIMARY KEY (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_DIALOGFLOW_SESSION" ON "DialogflowSession" ("userId", "projectId", "sessionId");

```

Enter fullscreen mode

Exit fullscreen mode

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
Successfully validated 4 migrations (execution time 00:00.020s)
Current version of schema "public": 202203310937
Migrating schema "public" to version 202204030939 - CreateDialogflowTable
Successfully applied 1 migration to schema "public" (execution time 00:00.051s)
```

Enter fullscreen mode

Exit fullscreen mode

Pull database to prisma schema and regenerate prisma client

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

✔ Introspected 3 models and wrote them into prisma/schema.prisma in 212ms

Run prisma generate to generate Prisma Client.

> kaufman-bot@0.0.0 prisma:generate
> npm run -- prisma generate

> kaufman-bot@0.0.0 prisma
> prisma "generate"

Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.11.1 | library) to ./node_modules/@prisma/client in 205ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

Enter fullscreen mode

Exit fullscreen mode

New version of prisma schema
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
id                String              @id(map: "PK_USERS") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
telegramId        String              @unique(map: "UQ_USERS__TELEGRAM_ID") @db.VarChar(64)
langCode          String              @default("en") @db.VarChar(64)
debugMode         Boolean             @default(false)
DialogflowSession DialogflowSession[]
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

model DialogflowSession {
id                String   @id(map: "PK_DIALOGFLOW_SESSION") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
userId            String   @db.Uuid
projectId         String   @db.VarChar(512)
sessionId         String   @db.Uuid
requestsMetadata  Json     @default("[]")
responsesMetadata Json     @default("[]")
createdAt         DateTime @default(now()) @db.Timestamp(6)
updatedAt         DateTime @default(now()) @db.Timestamp(6)
User              User     @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "FK_DIALOGFLOW_SESSION__USER_ID")

@@unique([userId, projectId, sessionId], map: "UQ_DIALOGFLOW_SESSION")
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create nx lib

npm run -- nx g @nrwl/nest:lib dialogflow/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib dialogflow/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "dialogflow/server"

CREATE libs/dialogflow/server/README.md
CREATE libs/dialogflow/server/.babelrc
CREATE libs/dialogflow/server/src/index.ts
CREATE libs/dialogflow/server/tsconfig.json
CREATE libs/dialogflow/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/dialogflow/server/project.json
UPDATE workspace.json
CREATE libs/dialogflow/server/.eslintrc.json
CREATE libs/dialogflow/server/jest.config.js
CREATE libs/dialogflow/server/tsconfig.spec.json
CREATE libs/dialogflow/server/src/lib/dialogflow-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add types

All work with dialogflow store in database, and it clear if user start work with another commands

libs/dialogflow/server/src/lib/dialogflow-types/dialogflow-session-metadata.ts

```
import { protos } from '@google-cloud/dialogflow';

export type DialogflowSessionRequestsMetadata = {
ts: number;
request: protos.google.cloud.dialogflow.v2.IDetectIntentRequest;
}[];

export type DialogflowSessionResponsesMetadata = {
ts: number;
response: protos.google.cloud.dialogflow.v2.IDetectIntentResponse;
}[];

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add config interface

libs/dialogflow/server/src/lib/dialogflow-config/dialogflow.config.ts

```
export const DIALOGFLOW_CONFIG = 'DIALOGFLOW_CONFIG';

export interface DialogflowConfig {
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
projectId: string;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add storage service

libs/dialogflow/server/src/lib/dialogflow-services/dialogflow.storage.ts

```
import { PrismaClientService } from '@kaufman-bot/core/server';
import { Injectable } from '@nestjs/common';
import {
DialogflowSessionRequestsMetadata,
DialogflowSessionResponsesMetadata,
} from '../dialogflow-types/dialogflow-session-metadata';

export type SessionOfUsers = {
sessionId: string;
responsesMetadata: DialogflowSessionResponsesMetadata;
requestsMetadata: DialogflowSessionRequestsMetadata;
};

@Injectable()
export class DialogflowStorage {
private readonly sessionOfUsers: Record<number, SessionOfUsers> = {};

constructor(private readonly prismaClientService: PrismaClientService) {}

async getUserSession({
telegramUserId,
projectId,
}: {
telegramUserId: number;
projectId: string;
}): Promise<SessionOfUsers | null> {
const currentSessionOfUsers: SessionOfUsers =
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })];
if (currentSessionOfUsers) {
return currentSessionOfUsers;
}
try {
const currentFromDatabase =
await this.prismaClientService.dialogflowSession.findFirst({
where: {
User: { telegramId: telegramUserId.toString() },
projectId,
},
rejectOnNotFound: true,
});
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] = {
sessionId: currentFromDatabase.sessionId,
requestsMetadata: currentFromDatabase.requestsMetadata,
responsesMetadata: currentFromDatabase.responsesMetadata,
};
return this.sessionOfUsers[this.getKey({ telegramUserId, projectId })];
} catch (error) {
return null;
}
}

async appendToUserSession({
telegramUserId,
projectId,
sessionOfUsers,
}: {
telegramUserId: number;
projectId: string;
sessionOfUsers: SessionOfUsers;
}): Promise<void> {
const user = await this.getUser(telegramUserId);

const currentSessionOfUsers: SessionOfUsers =
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] || {};
currentSessionOfUsers.requestsMetadata = [
...(currentSessionOfUsers.requestsMetadata || []),
...sessionOfUsers.requestsMetadata,
];
currentSessionOfUsers.responsesMetadata = [
...(currentSessionOfUsers.responsesMetadata || []),
...sessionOfUsers.responsesMetadata,
];

await this.prismaClientService.dialogflowSession.upsert({
create: {
userId: user.id,
projectId,
sessionId: sessionOfUsers.sessionId,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
requestsMetadata: currentSessionOfUsers.requestsMetadata as any,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
responsesMetadata: currentSessionOfUsers.responsesMetadata as any,
},
update: {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
requestsMetadata: currentSessionOfUsers.requestsMetadata as any,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
responsesMetadata: currentSessionOfUsers.responsesMetadata as any,
},
where: {
userId_projectId_sessionId: {
projectId,
userId: user.id,
sessionId: sessionOfUsers.sessionId,
},
},
});
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] = {
sessionId: sessionOfUsers.sessionId,
requestsMetadata: currentSessionOfUsers.requestsMetadata,
responsesMetadata: currentSessionOfUsers.responsesMetadata,
};
}

private async getUser(telegramUserId: number) {
let user;
try {
user = await this.prismaClientService.user.findFirst({
select: { id: true },
where: { telegramId: telegramUserId.toString() },
rejectOnNotFound: true,
});
} catch (error) {
user = await this.prismaClientService.user.create({
data: { telegramId: telegramUserId.toString() },
});
}
return user;
}

async setUserSession({
telegramUserId,
projectId,
sessionOfUsers,
}: {
telegramUserId: number;
projectId: string;
sessionOfUsers: SessionOfUsers;
}): Promise<void> {
const user = await this.getUser(telegramUserId);

const currentSessionOfUsers: SessionOfUsers =
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] || {};
currentSessionOfUsers.requestsMetadata = [
...sessionOfUsers.requestsMetadata,
];
currentSessionOfUsers.responsesMetadata = [
...sessionOfUsers.responsesMetadata,
];

await this.prismaClientService.dialogflowSession.upsert({
create: {
userId: user.id,
projectId,
sessionId: sessionOfUsers.sessionId,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
requestsMetadata: currentSessionOfUsers.requestsMetadata as any,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
responsesMetadata: currentSessionOfUsers.responsesMetadata as any,
},
update: {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
requestsMetadata: currentSessionOfUsers.requestsMetadata as any,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
responsesMetadata: currentSessionOfUsers.responsesMetadata as any,
},
where: {
userId_projectId_sessionId: {
projectId,
userId: user.id,
sessionId: sessionOfUsers.sessionId,
},
},
});
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] = {
sessionId: sessionOfUsers.sessionId,
requestsMetadata: currentSessionOfUsers.requestsMetadata,
responsesMetadata: currentSessionOfUsers.responsesMetadata,
};
}

async resetUserSession({
telegramUserId,
projectId,
}: {
telegramUserId: number;
projectId: string;
}) {
const defaultUserSession =
await this.prismaClientService.dialogflowSession.findFirst({
where: {
User: { telegramId: telegramUserId.toString() },
projectId,
},
});
if (defaultUserSession) {
await this.prismaClientService.dialogflowSession.updateMany({
data: {
requestsMetadata: [],
responsesMetadata: [],
},
where: {
sessionId: defaultUserSession.sessionId,
projectId,
},
});
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] = {
sessionId: defaultUserSession.sessionId,
requestsMetadata: [],
responsesMetadata: [],
};
}
}

private getKey({
telegramUserId,
projectId,
}: {
telegramUserId: number;
projectId: string;
}) {
return `${telegramUserId}_${projectId}`;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add service with command logics

libs/dialogflow/server/src/lib/dialogflow-services/dialogflow.service.ts

```
import dialogflow, { protos } from '@google-cloud/dialogflow';
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
OnAfterBotCommands,
} from '@kaufman-bot/core/server';
import { DebugService } from '@kaufman-bot/debug-messages/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';
import {
DialogflowConfig,
DIALOGFLOW_CONFIG,
} from '../dialogflow-config/dialogflow.config';
import { DialogflowStorage } from './dialogflow.storage';

@Injectable()
export class DialogflowService
implements BotCommandsProvider, OnAfterBotCommands
{
private readonly logger = new Logger(DialogflowService.name);

constructor(
@Inject(DIALOGFLOW_CONFIG)
private readonly dialogflowConfig: DialogflowConfig,
private readonly dialogflowStorage: DialogflowStorage,
private readonly botСommandsToolsService: BotСommandsToolsService,
private readonly debugService: DebugService
) {}

async onAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
result: BotCommandsProviderActionResultType<TMsg>,
msg: TMsg,
ctx?,
defaultHandler?: () => Promise<unknown>
): Promise<{ result: BotCommandsProviderActionResultType<TMsg>; msg: TMsg }> {
if (!defaultHandler && result === null) {
msg.text = `dialog ${msg.text}`;
const dialogResult = await this.onMessage<TMsg>(msg, ctx);
if (dialogResult !== null) {
return { result: dialogResult, msg };
}
}

if (result !== null) {
this.debugService.sendDebugInfo(
msg,
ctx,
`call:resetUserSession`,
this.dialogflowConfig.name
);
// reset last session if unhandled with dialog commands
await this.dialogflowStorage.resetUserSession({
telegramUserId: msg.from.id,
projectId: this.dialogflowConfig.projectId,
});
}

return { result, msg };
}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg, ctx): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage(
{
...msg,
text: `${this.dialogflowConfig.name} ${BotCommandsEnum.help}`,
},
ctx
);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg, ctx): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code || 'en';

const spyWord = this.dialogflowConfig.spyWords.find((spyWord) =>
this.botСommandsToolsService.checkCommands(msg.text, [spyWord], locale)
);
if (spyWord) {
if (
this.botСommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.help],
locale
)
) {
return {
type: 'markdown',
markdown: this.botСommandsToolsService.generateHelpMessage(
locale,
this.dialogflowConfig.name,
this.dialogflowConfig.descriptions,
this.dialogflowConfig.usage
),
};
}

const preparedText = this.botСommandsToolsService.clearCommands(
msg.text,
[spyWord],
locale
);

const processedMsg = await this.process(msg, ctx, locale, preparedText);

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
>(msg: TMsg, ctx, locale: string, text: string) {
const ts = +new Date();
const current = await this.dialogflowStorage.getUserSession({
telegramUserId: msg.from.id,
projectId: this.dialogflowConfig.projectId,
});
const sessionId = current ? current.sessionId : v4();
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.projectAgentSessionPath(
this.dialogflowConfig.projectId,
sessionId
);

const request: protos.google.cloud.dialogflow.v2.IDetectIntentRequest = {
session: sessionPath,
queryInput: {
text: {
text: text,
languageCode: locale,
},
},
};

const responses = await sessionClient.detectIntent(request);
this.debugService.sendDebugInfo(
msg,
ctx,
'Detected intent',
this.dialogflowConfig.name
);
const result = responses[0].queryResult;
if (!result) {
this.debugService.sendDebugInfo(
msg,
ctx,
`Result not set`,
this.dialogflowConfig.name
);
return null;
}
this.debugService.sendDebugInfo(
msg,
ctx,
{
Query: result.queryText,
Response: result.fulfillmentText,
},
this.dialogflowConfig.name
);
if (result.intent) {
if (current) {
this.debugService.sendDebugInfo(
msg,
ctx,
`call:appendToUserSession`,
this.dialogflowConfig.name
);
await this.dialogflowStorage.appendToUserSession({
telegramUserId: msg.from.id,
projectId: this.dialogflowConfig.projectId,
sessionOfUsers: {
sessionId,
requestsMetadata: [{ ts, request }],
responsesMetadata: [{ ts, response: responses[0] }],
},
});
} else {
this.debugService.sendDebugInfo(
msg,
ctx,
`call:setUserSession`,
this.dialogflowConfig.name
);
await this.dialogflowStorage.setUserSession({
telegramUserId: msg.from.id,
projectId: this.dialogflowConfig.projectId,
sessionOfUsers: {
sessionId,
requestsMetadata: [{ ts, request }],
responsesMetadata: [{ ts, response: responses[0] }],
},
});
}
this.debugService.sendDebugInfo(
msg,
ctx,
`Intent: ${result.intent.displayName}`,
this.dialogflowConfig.name
);
} else {
this.debugService.sendDebugInfo(
msg,
ctx,
'No intent matched.',
this.dialogflowConfig.name
);
}
return result.fulfillmentText;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Add module

libs/dialogflow/server/src/lib/dialogflow.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
PrismaClientModule,
} from '@kaufman-bot/core/server';
import { DebugMessagesModule } from '@kaufman-bot/debug-messages/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import { TranslatesModule } from 'nestjs-translates';
import {
DialogflowConfig,
DIALOGFLOW_CONFIG,
} from './dialogflow-config/dialogflow.config';
import { DialogflowService } from './dialogflow-services/dialogflow.service';
import { DialogflowStorage } from './dialogflow-services/dialogflow.storage';

@Module({
imports: [
TranslatesModule,
PrismaClientModule,
BotCommandsModule,
DebugMessagesModule,
],
providers: [DialogflowStorage],
exports: [
TranslatesModule,
PrismaClientModule,
BotCommandsModule,
DebugMessagesModule,
DialogflowStorage,
],
})
export class DialogflowModule {
static forRoot(config: Pick<DialogflowConfig, 'projectId'>): DynamicModule {
return {
module: DialogflowModule,
imports: [
CustomInjectorModule.forFeature({
imports: [DialogflowModule],
providers: [
{
provide: DIALOGFLOW_CONFIG,
useValue: <DialogflowConfig>{
name: getText('Dialogflow'),
usage: [
getText('dialog hello'),
getText('ai hello'),
getText('debug help'),
getText('ai help'),
],
descriptions: getText(
'Commands for process request with dialogflow intents'
),
spyWords: [getText('dialog'), getText('ai')],
...config,
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: DialogflowService,
},
],
exports: [DIALOGFLOW_CONFIG],
}),
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Update application files

--

### 

Update AppService

apps/server/src/app/app.service.ts

```
import { BotСommandsService } from '@kaufman-bot/core/server';
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
await this.botСommandsService.process(ctx);
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update AppModule

apps/server/src/app/app.module.ts

```
import {
BotCommandsModule,
PrismaClientModule,
} from '@kaufman-bot/core/server';
import { CurrencyConverterModule } from '@kaufman-bot/currency-converter/server';
import { DebugMessagesModule } from '@kaufman-bot/debug-messages/server';
import { DialogflowModule } from '@kaufman-bot/dialogflow/server';
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

Update .env.local

.env.local

```
TELEGRAM_BOT_TOKEN=1111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
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

Update all ts files and translates

npm run generate

Update all dictionaries with po editor

Convert all po files to json

npm run generate

## 

Add environments and file with google-credentials to github

--

### 

Add google-credentials.json

Because file is multiline, you must convert it to base 64 string

echo $(cat google-credentials.json | base64 -w0)

Set string in github env

--

### 

Add project id

--

### 

View all envs

## 

Update for deploy

--

### 

Update github action config

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
dokku config:set --no-restart kaufman-bot SERVER_POSTGRES_URL=$SERVER_POSTGRES_URL
dokku config:set --no-restart --global POSTGRES_HOST=global-postgres
dokku config:set --no-restart kaufman-bot GOOGLE_APPLICATION_CREDENTIALS=google-credentials.json
dokku config:set --no-restart kaufman-bot GOOGLE_CREDENTIALS=${{secrets.GOOGLE_CREDENTIALS}}
dokku config:set --no-restart kaufman-bot DIALOGFLOW_PROJECT_ID=${{secrets.DIALOGFLOW_PROJECT_ID}}

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

--

### 

Update start sections in package.json

package.json

```
...
"scripts": {
...
"start": "echo $GOOGLE_CREDENTIALS | base64 --decode > ./$GOOGLE_APPLICATION_CREDENTIALS && node dist/apps/server/main.js",
...
}
...
```

Enter fullscreen mode

Exit fullscreen mode

## 

Check new logic in telegram bot

Common help message

Help message for dialogflow command

Check work command with use spy word

Check work global handler for all unhandled messages

Check disabled work global handler if set default application handler

Check logic in Russia language

Show debug information of process

In the next post, I will add different multilingual settings for facts commands...

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