Refactoring monolith application to modules with DI in Telegram bot on NestJS

# Refactoring monolith application to modules with DI in Telegram bot on NestJS

Published: 2022-04-16T09:03:08.262Z
Tags: kaufmanbot, nestjs, di, refactoring
[Original Article](https://dev.to/endykaufman/refactoring-monolith-application-to-modules-with-di-in-telegram-bot-on-nestjs-2llc)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

--

## 

Description of work

The current application is built as a monolith, but we want to publish all the code to the npm registry.

To do this, we need to convert and refactor all the sources step by step.

In this post, I will show you how to do it.

--

## 

Current state

npm run nx -- graph

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- graph

> kaufman-bot@2.0.0 nx
> nx "graph"

>  NX   Project graph started at http://127.0.0.1:4211
```

Enter fullscreen mode

Exit fullscreen mode

As we can see, more modules refer to the language switcher.
And we know that the main module works with the database through prisma, although we don't see it on the graph.

--

## 

Remove refer to the language swither

Main cause of more refer it is constant variable "DEFAULT_LANGUAGE"

We need remove it from language switcher
libs/language-swither/server/src/lib/language-swither-config/language-swither.config.ts

```
export const LANGUAGE_SWITHER_CONFIG = 'LANGUAGE_SWITHER_CONFIG';

export interface LanguageSwitherConfig {
title: string;
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
removeWords?: string[];
category: string;
}

```

Enter fullscreen mode

Exit fullscreen mode

After it, we broken many files in project

Now we mast replace DEFAULT_LANGUAGE to 'en'

Example on of file with replace
libs/facts-generator/server/src/lib/facts-generator-services/ru-facts-generator.service.ts

After all replace, wee see another graph

npm run nx -- graph

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- graph

> kaufman-bot@2.0.0 nx
> nx "graph"

>  NX   Project graph started at http://127.0.0.1:4211
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Move work with database from core to lib

Create new library

npm run -- nx g @nrwl/nest:lib prisma/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib prisma/server

> kaufman-bot@2.0.0 nx
> nx "g" "@nrwl/nest:lib" "prisma/server"

CREATE libs/prisma/server/README.md
CREATE libs/prisma/server/.babelrc
CREATE libs/prisma/server/src/index.ts
CREATE libs/prisma/server/tsconfig.json
CREATE libs/prisma/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/prisma/server/project.json
UPDATE workspace.json
CREATE libs/prisma/server/.eslintrc.json
CREATE libs/prisma/server/jest.config.js
CREATE libs/prisma/server/tsconfig.spec.json
CREATE libs/prisma/server/src/lib/prisma-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

Move prisma-client module to this library

mv libs/core/server/src/lib/prisma-client libs/prisma/server/src/lib
rm -rf libs/prisma/server/src/lib/prisma-server.module.ts
npm run generate

Replace all import where used PrismaClientService

Replace all import where used PrismaClientModule

After all replace, wee see another graph and see all refer to database

npm run nx -- graph

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- graph

> kaufman-bot@2.0.0 nx
> nx "graph"

>  NX   Project graph started at http://127.0.0.1:4211
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Remove usage of prisma from debug message commands

Update debug message storage
libs/debug-messages/server/src/lib/debug-messages-services/debug-messages.storage.ts

```
export const DEBUG_MESSAGES_STORAGE = 'DEBUG_MESSAGES_STORAGE';

export type DebugMessagesStorageProvider = Pick<
DebugMessagesStorage,
'getDebugModeOfUser' | 'setDebugModeOfUser'
>;

export class DebugMessagesStorage {
private readonly debugModeOfUsers: Record<number, boolean> = {};

async getDebugModeOfUser(telegramUserId: number): Promise<boolean> {
const currentDebugMode = this.debugModeOfUsers[telegramUserId];
if (currentDebugMode) {
return currentDebugMode;
}
return false;
}

async setDebugModeOfUser(userId: number, debugMode: boolean): Promise<void> {
this.debugModeOfUsers[userId] = debugMode;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update service
libs/debug-messages/server/src/lib/debug-messages-services/debug-messages.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
OnAfterBotCommands,
OnBeforeBotCommands,
} from '@kaufman-bot/core/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CustomInject } from 'nestjs-custom-injector';
import { TranslatesService } from 'nestjs-translates';
import {
DebugMessagesConfig,
DEBUG_MESSAGES_CONFIG,
} from '../debug-messages-config/debug-messages.config';
import { DebugMessagesCommandsEnum } from '../debug-messages-types/debug-messages-commands';
import {
DebugMessagesStorageProvider,
DEBUG_MESSAGES_STORAGE,
} from './debug-messages.storage';
import { DebugService } from './debug.service';

@Injectable()
export class DebugMessagesService
implements BotCommandsProvider, OnBeforeBotCommands, OnAfterBotCommands
{
private readonly logger = new Logger(DebugMessagesService.name);

@CustomInject(DEBUG_MESSAGES_STORAGE)
private readonly debugMessagesStorage!: DebugMessagesStorageProvider;

constructor(
@Inject(DEBUG_MESSAGES_CONFIG)
private readonly debugMessagesConfig: DebugMessagesConfig,
private readonly translatesService: TranslatesService,
private readonly commandToolsService: BotCommandsToolsService,
private readonly debugService: DebugService,
private readonly botCommandsToolsService: BotCommandsToolsService
) {}
...
```

Enter fullscreen mode

Exit fullscreen mode

Update module
libs/debug-messages/server/src/lib/debug-messages.module.ts

```
import {
BotCommandsCategory,
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
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
import {
DebugMessagesStorage,
DEBUG_MESSAGES_STORAGE,
} from './debug-messages-services/debug-messages.storage';
import { DebugService } from './debug-messages-services/debug.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
providers: [
{ provide: DEBUG_MESSAGES_STORAGE, useClass: DebugMessagesStorage },
DebugService,
],
exports: [
TranslatesModule,
BotCommandsModule,
DEBUG_MESSAGES_STORAGE,
DebugService,
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
title: getText('Debug messages'),
name: 'debug',
usage: [
getText('debug on'),
getText('debug off'),
getText('debug state'),
getText('debug help'),
],
descriptions: getText(
'Commands for enable and disable debug mode'
),
spyWords: [getText('debug')],
category: BotCommandsCategory.system,
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

--

## 

Add integration module prisma with debug messages

Create prisma integrations module in application
apps/server/src/app/integrations/prisma/prisma-integrations.module.ts

```
import { DEBUG_MESSAGES_STORAGE } from '@kaufman-bot/debug-messages/server';
import { PrismaClientModule } from '@kaufman-bot/prisma/server';
import { DynamicModule, Module } from '@nestjs/common';
import { PrismaDebugMessagesStorage } from './prisma-integrations/prisma-debug-messages.storage';
import { PrismaDialogflowStorage } from './prisma-integrations/prisma-dialogflow.storage';
import { PrismaFirstMeetingStorage } from './prisma-integrations/prisma-first-meeting.storage';
import { PrismaLanguageSwitherStorage } from './prisma-integrations/prisma-language-swither.storage';

@Module({})
export class PrismaIntegrationsModule {
static forRoot(): DynamicModule {
return {
module: PrismaIntegrationsModule,
imports: [PrismaClientModule],
providers: [
{
provide: DEBUG_MESSAGES_STORAGE,
useClass: PrismaDebugMessagesStorage,
},
],
exports: [
DEBUG_MESSAGES_STORAGE,
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Create implementations for DebugMessagesStorageProvider

```
import { DebugMessagesStorageProvider } from '@kaufman-bot/debug-messages/server';
import { PrismaClientService } from '@kaufman-bot/prisma/server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaDebugMessagesStorage
implements DebugMessagesStorageProvider
{
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

Update app module
apps/server/src/app/app.module.ts

```
...
import { PrismaIntegrationsModule } from './integrations/prisma/prisma-integrations.module';

const TELEGRAM_BOT_WEB_HOOKS_DOMAIN = env
.get('TELEGRAM_BOT_WEB_HOOKS_DOMAIN')
.asString();
const TELEGRAM_BOT_WEB_HOOKS_PATH = env
.get('TELEGRAM_BOT_WEB_HOOKS_PATH')
.asString();

const BOT_NAMES = env.get('BOT_NAMES').required().asArray();
const BOT_NAMES_RU = env.get('BOT_NAMES_RU').required().asArray();

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
PrismaIntegrationsModule.forRoot(),
...

```

Enter fullscreen mode

Exit fullscreen mode

After all replace, wee see another graph

npm run nx -- graph

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- graph

> kaufman-bot@2.0.0 nx
> nx "graph"

>  NX   Project graph started at http://127.0.0.1:4211
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Remove usage of prisma from language swither commands

Update storage service
libs/language-swither/server/src/lib/language-swither-services/language-swither.storage.ts

```
export const LANGUAGE_SWITHER_STORAGE = 'LANGUAGE_SWITHER_STORAGE';

export type LanguageSwitherStorageProvider = Pick<
LanguageSwitherStorage,
'getLanguageOfUser' | 'setLanguageOfUser'
>;

export class LanguageSwitherStorage {
private readonly languageOfUsers: Record<number, string> = {};

async getLanguageOfUser(telegramUserId: number): Promise<string | null> {
const currentLanguageCode = this.languageOfUsers[telegramUserId];
if (currentLanguageCode) {
return currentLanguageCode;
}
return null;
}

async setLanguageOfUser(
telegramUserId: number,
langCode: string
): Promise<void> {
this.languageOfUsers[telegramUserId] = langCode;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Create prisma integrations switch storage
apps/server/src/app/integrations/prisma/prisma-integrations-services/prisma-language-swither.storage.ts

```
import { LanguageSwitherStorageProvider } from '@kaufman-bot/language-swither/server';
import { PrismaClientService } from '@kaufman-bot/prisma/server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaLanguageSwitherStorage
implements LanguageSwitherStorageProvider
{
private readonly languageOfUsers: Record<number, string> = {};

constructor(private readonly prismaClientService: PrismaClientService) {}

async getLanguageOfUser(telegramUserId: number): Promise<string | null> {
const currentLanguageCode = this.languageOfUsers[telegramUserId];
if (currentLanguageCode) {
return currentLanguageCode;
}
try {
const currentLanguageCodeFromDatabase =
await this.prismaClientService.user.findFirst({
where: { telegramId: telegramUserId.toString() },
rejectOnNotFound: true,
});
this.languageOfUsers[telegramUserId] =
currentLanguageCodeFromDatabase.langCode;
return this.languageOfUsers[telegramUserId];
} catch (error) {
return null;
}
}

async setLanguageOfUser(
telegramUserId: number,
langCode: string
): Promise<void> {
await this.prismaClientService.user.upsert({
create: { telegramId: telegramUserId.toString(), langCode },
update: { langCode },
where: { telegramId: telegramUserId.toString() },
});
this.languageOfUsers[telegramUserId] = langCode;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Append PrismaLanguageSwitherStorage to PrismaIntegrationsModule
apps/server/src/app/integrations/prisma/prisma-integrations-services/prisma-integrations.module.ts

```
import { DEBUG_MESSAGES_STORAGE } from '@kaufman-bot/debug-messages/server';
import { LANGUAGE_SWITHER_STORAGE } from '@kaufman-bot/language-swither/server';
import { PrismaClientModule } from '@kaufman-bot/prisma/server';
import { DynamicModule, Module } from '@nestjs/common';
import { PrismaDebugMessagesStorage } from './prisma-integrations/prisma-debug-messages.storage';
import { PrismaDialogflowStorage } from './prisma-integrations/prisma-dialogflow.storage';
import { PrismaFirstMeetingStorage } from './prisma-integrations/prisma-first-meeting.storage';
import { PrismaLanguageSwitherStorage } from './prisma-integrations/prisma-language-swither.storage';

@Module({})
export class PrismaIntegrationsModule {
static forRoot(): DynamicModule {
return {
module: PrismaIntegrationsModule,
imports: [PrismaClientModule],
providers: [
{
provide: DEBUG_MESSAGES_STORAGE,
useClass: PrismaDebugMessagesStorage,
},
{
provide: LANGUAGE_SWITHER_STORAGE,
useClass: PrismaLanguageSwitherStorage,
},
],
exports: [
DEBUG_MESSAGES_STORAGE,
LANGUAGE_SWITHER_STORAGE,
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update service
libs/language-swither/server/src/lib/language-swither-services/language-swither.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
OnBeforeBotCommands,
} from '@kaufman-bot/core/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CustomInject } from 'nestjs-custom-injector';
import { TranslatesService, TranslatesStorage } from 'nestjs-translates';
import {
LanguageSwitherConfig,
LANGUAGE_SWITHER_CONFIG,
} from '../language-swither-config/language-swither.config';
import { LanguageSwitherCommandsEnum } from '../language-swither-types/language-swither-commands';
import {
LanguageSwitherStorage,
LANGUAGE_SWITHER_STORAGE,
} from './language-swither.storage';

@Injectable()
export class LanguageSwitherService
implements BotCommandsProvider, OnBeforeBotCommands
{
private readonly logger = new Logger(LanguageSwitherService.name);

@CustomInject(LANGUAGE_SWITHER_STORAGE)
private readonly languageSwitherStorage!: LanguageSwitherStorage;

constructor(
@Inject(LANGUAGE_SWITHER_CONFIG)
private readonly languageSwitherConfig: LanguageSwitherConfig,
private readonly translatesService: TranslatesService,
private readonly translatesStorage: TranslatesStorage,
private readonly botCommandsToolsService: BotCommandsToolsService
) {}
...
```

Enter fullscreen mode

Exit fullscreen mode

Update module
libs/language-swither/server/src/lib/language-swither.module.ts

```
import {
BotCommandsCategory,
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import { TranslatesModule } from 'nestjs-translates';
import {
LanguageSwitherConfig,
LANGUAGE_SWITHER_CONFIG,
} from './language-swither-config/language-swither.config';
import { LanguageSwitherService } from './language-swither-services/language-swither.service';
import {
LanguageSwitherStorage,
LANGUAGE_SWITHER_STORAGE,
} from './language-swither-services/language-swither.storage';

@Module({
imports: [TranslatesModule, BotCommandsModule],
providers: [
{ provide: LANGUAGE_SWITHER_STORAGE, useClass: LanguageSwitherStorage },
LanguageSwitherStorage,
],
exports: [TranslatesModule, BotCommandsModule, LANGUAGE_SWITHER_STORAGE],
})
...
```

Enter fullscreen mode

Exit fullscreen mode

After all replace, wee see another graph

npm run nx -- graph

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- graph

> kaufman-bot@2.0.0 nx
> nx "graph"

>  NX   Project graph started at http://127.0.0.1:4211
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Remove usage of prisma from dialogflow storage commands

Update DialogflowStorage
libs/dialogflow/server/src/lib/dialogflow-services/dialogflow.storage.ts

```
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
export const DIALOGFLOW_STORAGE = 'DIALOGFLOW_STORAGE';

export type DialogflowStorageProvider = Pick<
DialogflowStorage,
| 'getUserSession'
| 'appendToUserSession'
| 'resetUserSession'
| 'setUserSession'
>;

@Injectable()
export class DialogflowStorage {
private readonly sessionOfUsers: Record<number, SessionOfUsers> = {};

async getUserSession({
telegramUserId,
projectId,
}: {
telegramUserId: number;
projectId: string;
createIfNotExists?: boolean;
}): Promise<SessionOfUsers | null> {
const currentSessionOfUsers: SessionOfUsers =
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })];
if (currentSessionOfUsers) {
return currentSessionOfUsers;
}
return null;
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
const currentSessionOfUsers: SessionOfUsers =
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] || {};
currentSessionOfUsers.requestsMetadata = [
...(currentSessionOfUsers.requestsMetadata || []),
...(sessionOfUsers.requestsMetadata || []),
];
currentSessionOfUsers.responsesMetadata = [
...(currentSessionOfUsers.responsesMetadata || []),
...sessionOfUsers.responsesMetadata,
];

this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] = {
sessionId: sessionOfUsers.sessionId,
requestsMetadata: currentSessionOfUsers.requestsMetadata,
responsesMetadata: currentSessionOfUsers.responsesMetadata,
};
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
const currentSessionOfUsers: SessionOfUsers =
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] || {};
currentSessionOfUsers.requestsMetadata = [
...(sessionOfUsers?.requestsMetadata || []),
];
currentSessionOfUsers.responsesMetadata = [
...(sessionOfUsers.responsesMetadata || []),
];

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
try {
this.sessionOfUsers[this.getKey({ telegramUserId, projectId })] = {
sessionId: 'sessionId',
requestsMetadata: [],
responsesMetadata: [],
};
} catch (error) {
null;
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

Add PrismaDialogflowStorage
apps/server/src/app/integrations/prisma/prisma-integrations-services/prisma-dialogflow.storage.ts

```
import {
DialogflowStorageProvider,
SessionOfUsers,
} from '@kaufman-bot/dialogflow/server';
import { PrismaClientService } from '@kaufman-bot/prisma/server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaDialogflowStorage implements DialogflowStorageProvider {
private readonly sessionOfUsers: Record<number, SessionOfUsers> = {};

constructor(private readonly prismaClientService: PrismaClientService) {}

async getUserSession({
telegramUserId,
projectId,
}: {
telegramUserId: number;
projectId: string;
createIfNotExists?: boolean;
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
...(sessionOfUsers.requestsMetadata || []),
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
...(sessionOfUsers?.requestsMetadata || []),
];
currentSessionOfUsers.responsesMetadata = [
...(sessionOfUsers.responsesMetadata || []),
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
try {
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
} catch (error) {
null;
}
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

Update PrismaIntegrationsModule
apps/server/src/app/integrations/prisma/prisma-integrations.module.ts

```
import { DEBUG_MESSAGES_STORAGE } from '@kaufman-bot/debug-messages/server';
import { DIALOGFLOW_STORAGE } from '@kaufman-bot/dialogflow/server';
import { LANGUAGE_SWITHER_STORAGE } from '@kaufman-bot/language-swither/server';
import { PrismaClientModule } from '@kaufman-bot/prisma/server';
import { DynamicModule, Module } from '@nestjs/common';
import { PrismaDebugMessagesStorage } from './prisma-integrations/prisma-debug-messages.storage';
import { PrismaDialogflowStorage } from './prisma-integrations/prisma-dialogflow.storage';
import { PrismaFirstMeetingStorage } from './prisma-integrations/prisma-first-meeting.storage';
import { PrismaLanguageSwitherStorage } from './prisma-integrations/prisma-language-swither.storage';

@Module({})
export class PrismaIntegrationsModule {
static forRoot(): DynamicModule {
return {
module: PrismaIntegrationsModule,
imports: [PrismaClientModule],
providers: [
{
provide: DEBUG_MESSAGES_STORAGE,
useClass: PrismaDebugMessagesStorage,
},
{
provide: LANGUAGE_SWITHER_STORAGE,
useClass: PrismaLanguageSwitherStorage,
},
{
provide: DIALOGFLOW_STORAGE,
useClass: PrismaDialogflowStorage,
},
],
exports: [
DEBUG_MESSAGES_STORAGE,
LANGUAGE_SWITHER_STORAGE,
DIALOGFLOW_STORAGE,
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update DialogflowService
libs/dialogflow/server/src/lib/dialogflow-services/dialogflow.service.ts

```
import dialogflow, { protos } from '@google-cloud/dialogflow';
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
OnAfterBotCommands,
} from '@kaufman-bot/core/server';
import { DebugService } from '@kaufman-bot/debug-messages/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CustomInject } from 'nestjs-custom-injector';
import { v4 } from 'uuid';
import {
DialogflowConfig,
DIALOGFLOW_CONFIG,
} from '../dialogflow-config/dialogflow.config';
import { DialogflowStorage, DIALOGFLOW_STORAGE } from './dialogflow.storage';

export const DISABLE_DIALOGFLOW_COMMANDS = 'DISABLE_DIALOGFLOW_COMMANDS';

@Injectable()
export class DialogflowService
implements BotCommandsProvider, OnAfterBotCommands
{
private readonly logger = new Logger(DialogflowService.name);

@CustomInject(DIALOGFLOW_STORAGE)
private readonly dialogflowStorage!: DialogflowStorage;

constructor(
@Inject(DIALOGFLOW_CONFIG)
private readonly dialogflowConfig: DialogflowConfig,
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly debugService: DebugService
) {}
...
```

Enter fullscreen mode

Exit fullscreen mode

After all replace, wee see another graph

npm run nx -- graph

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- graph

> kaufman-bot@2.0.0 nx
> nx "graph"

>  NX   Project graph started at http://127.0.0.1:4211
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Remove usage of prisma from first meeting storage commands

Update storage
libs/first-meeting/server/src/lib/first-meeting-services/first-meeting.storage.ts

```
import { FirstMeeting } from '@prisma/client';

export const FIRST_MEETING_STORAGE = 'FIRST_MEETING_STORAGE';

export type FirstMeetingStorageProvider = Pick<
FirstMeetingStorage,
| 'createUserFirstMeeting'
| 'getUserFirstMeeting'
| 'pathUserFirstMeeting'
| 'removeUserFirstMeeting'
>;

export class FirstMeetingStorage {
private readonly firstMeetingOfUsers: Record<number, FirstMeeting> = {};

async getUserFirstMeeting({
telegramUserId,
}: {
telegramUserId: number;
}): Promise<FirstMeeting | null> {
const currentFirstMeetingOfUsers: FirstMeeting =
this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
if (currentFirstMeetingOfUsers) {
return currentFirstMeetingOfUsers;
}
return null;
}

async createUserFirstMeeting(telegramUserId: number) {
this.firstMeetingOfUsers[this.getKey({ telegramUserId })] = {
firstname: '',
lastname: '',
gender: 'Male',
status: 'StartMeeting',
};
return this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
}

async removeUserFirstMeeting({ telegramUserId }: { telegramUserId: number }) {
delete this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
}

async pathUserFirstMeeting({
telegramUserId,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
firstMeeting,
}: {
telegramUserId: number;
firstMeeting: Partial<FirstMeeting>;
}) {
let currentUserFirstMeeting = await this.getUserFirstMeeting({
telegramUserId,
});
if (!currentUserFirstMeeting) {
currentUserFirstMeeting = await this.createUserFirstMeeting(
telegramUserId
);
}

delete this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
this.firstMeetingOfUsers[this.getKey({ telegramUserId })] =
await this.getUserFirstMeeting({ telegramUserId });
}

private getKey({ telegramUserId }: { telegramUserId: number }) {
return telegramUserId.toString();
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update service
libs/first-meeting/server/src/lib/first-meeting-services/first-meeting.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
OnContextBotCommands,
} from '@kaufman-bot/core/server';
import { Inject, Injectable } from '@nestjs/common';
import { FirstMeeting } from '@prisma/client';
import { getText } from 'class-validator-multi-lang';
import { CustomInject } from 'nestjs-custom-injector';
import { TranslatesService } from 'nestjs-translates';
import {
FirstMeetingConfig,
FIRST_MEETING_CONFIG,
} from '../first-meeting-config/first-meeting.config';
import { FirstMeetingStorage } from './first-meeting.storage';

export const DISABLE_FIRST_MEETING_COMMANDS = 'DISABLE_FIRST_MEETING_COMMANDS';

@Injectable()
export class FirstMeetingService
implements BotCommandsProvider, OnContextBotCommands
{
@CustomInject(FirstMeetingStorage)
private readonly firstMeetingStorage!: FirstMeetingStorage;

constructor(
@Inject(FIRST_MEETING_CONFIG)
private readonly firstMeetingConfig: FirstMeetingConfig,
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly translatesService: TranslatesService
) {}
...
```

Enter fullscreen mode

Exit fullscreen mode

Update module
libs/first-meeting/server/src/lib/first-meeting.module.ts

```
import {
BotCommandsCategory,
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import {
FirstMeetingConfig,
FIRST_MEETING_CONFIG,
} from './first-meeting-config/first-meeting.config';
import { FirstMeetingService } from './first-meeting-services/first-meeting.service';
import {
FirstMeetingStorage,
FIRST_MEETING_STORAGE,
} from './first-meeting-services/first-meeting.storage';

@Module({
imports: [TranslatesModule, BotCommandsModule],
providers: [
{ provide: FIRST_MEETING_STORAGE, useClass: FirstMeetingStorage },
],
exports: [TranslatesModule, BotCommandsModule, FIRST_MEETING_STORAGE],
})
export class FirstMeetingModule {
...
```

Enter fullscreen mode

Exit fullscreen mode

Create implementations for FirstMeetingStorage
apps/server/src/app/integrations/prisma/prisma-integrations-services/prisma-first-meeting.storage.ts

```
import { FirstMeetingStorageProvider } from '@kaufman-bot/first-meeting/server';
import { PrismaClientService } from '@kaufman-bot/prisma/server';
import { Injectable } from '@nestjs/common';
import { FirstMeeting } from '@prisma/client';

@Injectable()
export class PrismaFirstMeetingStorage implements FirstMeetingStorageProvider {
private readonly firstMeetingOfUsers: Record<number, FirstMeeting> = {};

constructor(private readonly prismaClientService: PrismaClientService) {}

async getUserFirstMeeting({
telegramUserId,
}: {
telegramUserId: number;
}): Promise<FirstMeeting | null> {
const currentFirstMeetingOfUsers: FirstMeeting =
this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
if (currentFirstMeetingOfUsers) {
return currentFirstMeetingOfUsers;
}

let databaseFirstMeetingOfUsers: FirstMeeting | null = null;
try {
databaseFirstMeetingOfUsers =
await this.prismaClientService.firstMeeting.findFirst({
where: {
User: { telegramId: telegramUserId.toString() },
},
rejectOnNotFound: true,
});
this.firstMeetingOfUsers[this.getKey({ telegramUserId })] =
databaseFirstMeetingOfUsers;

return this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
} catch (error) {
return null;
}
}

async createUserFirstMeeting(telegramUserId: number) {
return await this.prismaClientService.firstMeeting.create({
data: {
firstname: '',
lastname: '',
gender: 'Male',
status: 'StartMeeting',
User: {
connectOrCreate: {
create: { telegramId: telegramUserId.toString() },
where: { telegramId: telegramUserId.toString() },
},
},
},
});
}

async removeUserFirstMeeting({ telegramUserId }: { telegramUserId: number }) {
delete this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
await this.prismaClientService.firstMeeting.deleteMany({
where: {
User: { telegramId: telegramUserId.toString() },
},
});
}

async pathUserFirstMeeting({
telegramUserId,
firstMeeting,
}: {
telegramUserId: number;
firstMeeting: Partial<FirstMeeting>;
}) {
let currentUserFirstMeeting = await this.getUserFirstMeeting({
telegramUserId,
});
if (!currentUserFirstMeeting) {
currentUserFirstMeeting = await this.createUserFirstMeeting(
telegramUserId
);
}

await this.prismaClientService.firstMeeting.updateMany({
data: {
...currentUserFirstMeeting,
...firstMeeting,
updatedAt: new Date(),
},
where: {
User: { telegramId: telegramUserId.toString() },
},
});

delete this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
this.firstMeetingOfUsers[this.getKey({ telegramUserId })] =
await this.getUserFirstMeeting({ telegramUserId });
}

private getKey({ telegramUserId }: { telegramUserId: number }) {
return telegramUserId.toString();
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update PrismaIntegrationsModule
apps/server/src/app/integrations/prisma/prisma-integrations.module.ts

```
import { DEBUG_MESSAGES_STORAGE } from '@kaufman-bot/debug-messages/server';
import { DIALOGFLOW_STORAGE } from '@kaufman-bot/dialogflow/server';
import { FIRST_MEETING_STORAGE } from '@kaufman-bot/first-meeting/server';
import { LANGUAGE_SWITHER_STORAGE } from '@kaufman-bot/language-swither/server';
import { PrismaClientModule } from '@kaufman-bot/prisma/server';
import { DynamicModule, Module } from '@nestjs/common';
import { PrismaDebugMessagesStorage } from './prisma-integrations/prisma-debug-messages.storage';
import { PrismaDialogflowStorage } from './prisma-integrations/prisma-dialogflow.storage';
import { PrismaFirstMeetingStorage } from './prisma-integrations/prisma-first-meeting.storage';
import { PrismaLanguageSwitherStorage } from './prisma-integrations/prisma-language-swither.storage';

@Module({})
export class PrismaIntegrationsModule {
static forRoot(): DynamicModule {
return {
module: PrismaIntegrationsModule,
imports: [PrismaClientModule],
providers: [
{
provide: DEBUG_MESSAGES_STORAGE,
useClass: PrismaDebugMessagesStorage,
},
{
provide: LANGUAGE_SWITHER_STORAGE,
useClass: PrismaLanguageSwitherStorage,
},
{
provide: DIALOGFLOW_STORAGE,
useClass: PrismaDialogflowStorage,
},
{
provide: FIRST_MEETING_STORAGE,
useClass: PrismaFirstMeetingStorage,
},
],
exports: [
DEBUG_MESSAGES_STORAGE,
LANGUAGE_SWITHER_STORAGE,
DIALOGFLOW_STORAGE,
FIRST_MEETING_STORAGE,
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

After all replace, wee see another graph

npm run nx -- graph

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- graph

> kaufman-bot@2.0.0 nx
> nx "graph"

>  NX   Project graph started at http://127.0.0.1:4211
```

Enter fullscreen mode

Exit fullscreen mode

As you can see, the prisma library for working with the database has no links to other libraries.

The project is now ready to be published to the npm registry.

In the next post, I will publish all the libraries in the npm registry...

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