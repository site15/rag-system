Create example of recursive contextable commands "first meeting" with store data in database for Telegram bot on NestJS

# Create example of recursive contextable commands "first meeting" with store data in database for Telegram bot on NestJS

Published: 2022-04-10T18:39:46.706Z
Tags: kaufmanbot, nestjs, recursive, postgres
[Original Article](https://dev.to/endykaufman/create-example-of-recursive-contextable-commands-first-meeting-with-store-data-in-database-for-telegram-bot-on-nestjs-4n9k)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Description of work

In this post I will am create recursive contextable commands

This is command will meeting with new users and save information about them in database and use these in later

## 

Create first meeting

--

### 

Create migrations for all need tables

migrations/V202204101203CreateFirstMeeting.pgsql

```
DO $$
BEGIN
CREATE TYPE "Gender" AS ENUM (
'Male',
'Female'
);
EXCEPTION
WHEN duplicate_object THEN
NULL;
END
$$;

DO $$
BEGIN
CREATE TYPE "FirstMeetingStatus" AS ENUM (
'StartMeeting',
'AskFirstname',
'AskLastname',
'AskGender',
'EndMeeting'
);
EXCEPTION
WHEN duplicate_object THEN
NULL;
END
$$;

CREATE TABLE IF NOT EXISTS "FirstMeeting" (
id uuid DEFAULT uuid_generate_v4 () NOT NULL,
"userId" uuid NOT NULL CONSTRAINT "FK_FIRST_MEETING__USER_ID" REFERENCES "User",
"status" "FirstMeetingStatus" NOT NULL,
"firstname" varchar(100) NOT NULL,
"lastname" varchar(100) NOT NULL,
"gender" "Gender" NOT NULL,
"createdAt" timestamp DEFAULT now() NOT NULL,
"updatedAt" timestamp DEFAULT now() NOT NULL,
CONSTRAINT "PK_FIRST_MEETING" PRIMARY KEY (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_FIRST_MEETING" ON "FirstMeeting" ("userId");

```

Enter fullscreen mode

Exit fullscreen mode

Apply migration in database

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
Successfully validated 5 migrations (execution time 00:00.017s)
Current version of schema "public": 202204030939
Migrating schema "public" to version 202204101203 - CreateFirstMeeting
Successfully applied 1 migration to schema "public" (execution time 00:00.043s)
```

Enter fullscreen mode

Exit fullscreen mode

Update prisma schema from exists database

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

✔ Introspected 4 models and wrote them into prisma/schema.prisma in 123ms

Run prisma generate to generate Prisma Client.

> kaufman-bot@0.0.0 prisma:generate
> npm run -- prisma generate

> kaufman-bot@0.0.0 prisma
> prisma "generate"

Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.11.1 | library) to ./node_modules/@prisma/client in 192ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

Enter fullscreen mode

Exit fullscreen mode

Prisma schema after run that command

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
FirstMeeting      FirstMeeting?
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

model FirstMeeting {
id        String             @id(map: "PK_FIRST_MEETING") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
userId    String             @unique(map: "UQ_FIRST_MEETING") @db.Uuid
status    FirstMeetingStatus
firstname String             @db.VarChar(100)
lastname  String             @db.VarChar(100)
gender    Gender
createdAt DateTime           @default(now()) @db.Timestamp(6)
updatedAt DateTime           @default(now()) @db.Timestamp(6)
User      User               @relation(fields: [userId], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "FK_FIRST_MEETING__USER_ID")
}

enum FirstMeetingStatus {
StartMeeting
AskFirstname
AskLastname
AskGender
EndMeeting
}

enum Gender {
Male
Female
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create nx lib

npm run -- nx g @nrwl/nest:lib first-meeting/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib first-meeting/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "first-meeting/server"

CREATE libs/first-meeting/server/README.md
CREATE libs/first-meeting/server/.babelrc
CREATE libs/first-meeting/server/src/index.ts
CREATE libs/first-meeting/server/tsconfig.json
CREATE libs/first-meeting/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/first-meeting/server/project.json
UPDATE workspace.json
CREATE libs/first-meeting/server/.eslintrc.json
CREATE libs/first-meeting/server/jest.config.js
CREATE libs/first-meeting/server/tsconfig.spec.json
CREATE libs/first-meeting/server/src/lib/first-meeting-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create config

libs/first-meeting/server/src/lib/first-meeting-config/first-meeting.config.ts

```
export const FIRST_MEETING_CONFIG = Symbol('FIRST_MEETING_CONFIG');

export interface FirstMeetingConfig {
title: string;
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

Create storage service

libs/first-meeting/server/src/lib/first-meeting-services/first-meeting.storage.ts

```
import { PrismaClientService } from '@kaufman-bot/core/server';
import { Injectable } from '@nestjs/common';
import { FirstMeeting } from '@prisma/client';

@Injectable()
export class FirstMeetingStorage {
private readonly firstMeetingOfUsers: Record<number, FirstMeeting> = {};

constructor(private readonly prismaClientService: PrismaClientService) {}

async getUserFirstMeeting({
telegramUserId,
}: {
telegramUserId: number;
}): Promise<FirstMeeting> {
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
} catch (error) {
databaseFirstMeetingOfUsers =
await this.prismaClientService.firstMeeting.create({
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
this.firstMeetingOfUsers[this.getKey({ telegramUserId })] =
databaseFirstMeetingOfUsers;

return this.firstMeetingOfUsers[this.getKey({ telegramUserId })];
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
const currentUserFirstMeeting = this.getUserFirstMeeting({
telegramUserId,
});

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

--

### 

Create service

libs/first-meeting/server/src/lib/first-meeting-services/first-meeting.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
OnAfterBotCommands,
OnBeforeBotCommands,
OnContextBotCommands,
} from '@kaufman-bot/core/server';
import { DEFAULT_LANGUAGE } from '@kaufman-bot/language-swither/server';
import { Inject, Injectable } from '@nestjs/common';
import { FirstMeeting } from '@prisma/client';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService, TranslatesStorage } from 'nestjs-translates';
import {
FirstMeetingConfig,
FIRST_MEETING_CONFIG,
} from '../first-meeting-config/first-meeting.config';
import { FirstMeetingStorage } from './first-meeting.storage';

@Injectable()
export class FirstMeetingService
implements
BotCommandsProvider,
OnAfterBotCommands,
OnContextBotCommands,
OnBeforeBotCommands
{
constructor(
@Inject(FIRST_MEETING_CONFIG)
private readonly firstMeetingConfig: FirstMeetingConfig,
private readonly botСommandsToolsService: BotСommandsToolsService,
private readonly translatesStorage: TranslatesStorage,
private readonly translatesService: TranslatesService,
private readonly firstMeetingStorage: FirstMeetingStorage
) {}

async onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<TMsg> {
if (msg.botStart) {
msg.text = 'meet start';
msg.botStart = false;
}
return msg;
}

async onContextBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
let locale = msg.from?.language_code;
if (
!locale ||
!Object.keys(this.translatesStorage.translates).find((key) =>
locale?.includes(key)
)
) {
locale = DEFAULT_LANGUAGE;
}
const contextFirstMeeting: Partial<FirstMeeting> =
msg.botCommandHandlerContext;

if (
this.botСommandsToolsService.checkCommands(
msg.text,
[this.firstMeetingConfig.name],
locale
) ||
Object.keys(contextFirstMeeting).length > 0
) {
if (
this.botСommandsToolsService.checkCommands(
msg.text,
[
getText('exit'),
getText('reset'),
getText('cancel'),
getText('stop'),
getText('end'),
],
locale
)
) {
await this.firstMeetingStorage.pathUserFirstMeeting({
telegramUserId: msg.from.id,
firstMeeting: {
...msg.botCommandHandlerContext,
status: 'EndMeeting',
},
});
return {
type: 'text',
text: this.translatesService.translate(
getText(`{{close}} Meeting canceled`),
locale,
{ close: '❌' }
),
message: msg,
context: { status: 'EndMeeting' },
};
}

if (contextFirstMeeting?.status === 'AskFirstname') {
return {
type: 'text',
text: this.translatesService.translate(
getText(`What is your last name?`),
locale
),
message: msg,
context: <Partial<FirstMeeting>>{
...msg.botCommandHandlerContext,
status: 'AskLastname',
firstname: this.prepareText(msg.text, locale) || 'Unknown',
},
};
}

if (contextFirstMeeting?.status === 'AskLastname') {
return {
type: 'text',
text: this.translatesService.translate(
getText(`What is your gender?`),
locale
),
message: msg,
context: <Partial<FirstMeeting>>{
...msg.botCommandHandlerContext,
status: 'AskGender',
lastname: this.prepareText(msg.text, locale),
},
};
}

if (contextFirstMeeting?.status === 'AskGender') {
const firstMeeting: Partial<FirstMeeting> = {
...contextFirstMeeting,
status: 'EndMeeting',
gender: this.botСommandsToolsService.checkCommands(
this.prepareText(msg.text, locale),
[getText('female'), getText('fm')],
locale
)
? 'Female'
: 'Male',
};
await this.firstMeetingStorage.pathUserFirstMeeting({
telegramUserId: msg.from.id,
firstMeeting,
});
return {
type: 'text',
text: this.translatesService.translate(
this.getRandomItem([
getText(
`Nice to meet you, {{meetGender}} {{firstname}} {{lastname}} {{vulcan}}`
),
getText(`Nice to meet you, {{firstname}} {{vulcan}}`),
]),
locale,
{
vulcan: '🖖',
...firstMeeting,
meetGender: this.mapGenderToMeetGender(firstMeeting, locale),
firstname: this.capitalizeFirstLetter(
firstMeeting.firstname,
locale
),
lastname: this.capitalizeFirstLetter(
firstMeeting.lastname,
locale
),
}
),
message: msg,
context: <Partial<FirstMeeting>>{ status: 'EndMeeting' },
};
}
}

return null;
}

async onAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
result: BotCommandsProviderActionResultType<TMsg>,
msg: TMsg
): Promise<{ result: BotCommandsProviderActionResultType<TMsg>; msg: TMsg }> {
if (msg.botStart) {
await this.firstMeetingStorage.removeUserFirstMeeting({
telegramUserId: msg.from.id,
});
}
if (result === null) {
msg.text = `${this.firstMeetingConfig.name} ${msg.text}`;
const newResult = await this.onMessage<TMsg>(msg);
if (newResult !== null) {
return { result: newResult, msg };
}
}
return { result, msg };
}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.firstMeetingConfig.name} ${BotCommandsEnum.help}`,
});
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
let locale = msg.from?.language_code;
if (
!locale ||
!Object.keys(this.translatesStorage.translates).find((key) =>
locale?.includes(key)
)
) {
locale = DEFAULT_LANGUAGE;
}

const firstMeeting = await this.firstMeetingStorage.getUserFirstMeeting({
telegramUserId: msg.from.id,
});
const spyWord = this.firstMeetingConfig.spyWords.find((spyWord) =>
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
message: msg,
markdown: this.botСommandsToolsService.generateHelpMessage({
locale,
name: this.firstMeetingConfig.title,
descriptions: this.firstMeetingConfig.descriptions,
usage: this.firstMeetingConfig.usage,
}),
};
}

if (
this.botСommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.reset],
locale
)
) {
await this.firstMeetingStorage.removeUserFirstMeeting({
telegramUserId: msg.from.id,
});

return {
type: 'text',
text: this.translatesService.translate(
this.getRandomItem([
getText('Your meeting information has been deleted {{unamused}}'),
getText('I forgot about your existence {{worried}}'),
]),
locale,
{
unamused: '😒',
worried: '😟',
}
),
message: msg,
};
}
}

if (
!this.botСommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.help],
locale
) &&
((spyWord &&
this.botСommandsToolsService.checkCommands(
msg.text,
[getText('start')],
locale
)) ||
firstMeeting?.status === 'StartMeeting')
) {
await this.firstMeetingStorage.pathUserFirstMeeting({
telegramUserId: msg.from.id,
firstMeeting: {
status: 'AskFirstname',
firstname: '',
lastname: '',
gender: 'Male',
},
});
return {
type: 'text',
text: this.translatesService.translate(
this.getRandomItem([
getText(`Hey! I'm Endy {{smile}}, what's your name?`),
getText(`Hey! what's your name?`),
]),
locale,
{ smile: '🙂' }
),
message: msg,
context: <Partial<FirstMeeting>>{ status: 'AskFirstname' },
};
}

if (
firstMeeting.status === 'EndMeeting' &&
this.botСommandsToolsService.checkCommands(
msg.text,
[getText('hi'), getText('hello'), getText('hey')],
locale
)
) {
return {
type: 'markdown',
markdown: this.translatesService
.translate(
this.getRandomItem([
getText(
`Hello {{meetGender}} {{firstname}} {{lastname}} {{vulcan}}`
),
getText(`Hello {{firstname}} {{lastname}} {{handsplayed}}`),
getText(`I'm glad to see you {{firstname}} {{wink}}`),
getText(`Hi {{firstname}} {{vulcan}}`),
]),
locale,
{
vulcan: '🖖',
handsplayed: '🖐',
wink: '😉',
...firstMeeting,
meetGender: this.mapGenderToMeetGender(firstMeeting, locale),
firstname: this.capitalizeFirstLetter(
firstMeeting.firstname,
locale
),
lastname: this.capitalizeFirstLetter(
firstMeeting.lastname,
locale
),
}
)
.split('  ')
.join(' ')
.split('  ')
.join(' '),
message: msg,
context: {},
};
}

return null;
}

private mapGenderToMeetGender(
firstMeeting: Partial<FirstMeeting>,
locale: string
) {
return this.translatesService.translate(
firstMeeting.gender === 'Female' ? getText('Madam') : getText('Sir'),
locale
);
}

private prepareText(text: string, locale: string) {
if (
this.botСommandsToolsService.checkCommands(
text,
[getText('skip'), getText('next')],
locale
)
) {
return '';
}
return this.botСommandsToolsService
.clearCommands(
text,
[
getText('I'),
getText('hi'),
getText('hello'),
getText('hey'),
getText('am'),
getText('my'),
getText('is'),
getText('name'),
getText('lastname'),
getText('firstname'),
getText('last'),
getText('first'),
],
locale
)
.trim();
}

private getRandomItem(items: string[]) {
return items[Math.floor(Math.random() * items.length)];
}
private capitalizeFirstLetter(text: string | undefined, locale: string) {
const [first, ...rest] = (text || '').trim();
return (first || '').toLocaleUpperCase(locale) + rest.join('');
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create module

libs/first-meeting/server/src/lib/first-meeting.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
PrismaClientModule,
} from '@kaufman-bot/core/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import {
FirstMeetingConfig,
FIRST_MEETING_CONFIG,
} from './first-meeting-config/first-meeting.config';
import { FirstMeetingService } from './first-meeting-services/first-meeting.service';
import { FirstMeetingStorage } from './first-meeting-services/first-meeting.storage';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class FirstMeetingModule {
static forRoot(): DynamicModule {
return {
module: FirstMeetingModule,
imports: [PrismaClientModule],
providers: [
FirstMeetingStorage,
{
provide: FIRST_MEETING_CONFIG,
useValue: <FirstMeetingConfig>{
title: getText('First meeting'),
name: 'meet',
descriptions: getText(
'Example of recursive contextable commands "first meeting"'
),
usage: [
getText('meet start'),
getText('meet reset'),
getText('meet help'),
],
spyWords: [getText('meet')],
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: FirstMeetingService,
},
],
exports: [PrismaClientModule],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add FirstMeetingModule to AppModule

apps/server/src/app/app.module.ts

```
...
@Module({
imports: [
...
ShortCommandsModule.forRoot({
commands: {
en: {
joke: `get jokes`,
'quote|thought|wisdom': 'get quotes',
'facts|fact|history': 'get facts',
'forgot me': 'meet reset',
'what you can do|faq': 'help',
},
ru: {
'joke|jokes|шутка|дай шутку|шутки|пошути|шути|рассмеши|смешинки|смешинка':
'get jokes',
'quote|thought|wisdom|цитата|дай цитату|цитаты|цитируй|мысль|мудрость|залечи':
'get quotes',
'facts|fact|history|дай факт|факты|история': 'get facts',
'forgot me|забудь меня': 'meet reset',
'what you can do|faq|что ты умеешь|справка': 'help',
},
},
}),
CurrencyConverterModule.forRoot(),
FactsGeneratorModule.forRoot(),
QuotesGeneratorModule.forRoot(),
JokesGeneratorModule.forRoot(),
FirstMeetingModule.forRoot(),
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

Update AppService

apps/server/src/app/app.service.ts

```
import { BotСommandsService } from '@kaufman-bot/core/server';
import { Injectable, Logger } from '@nestjs/common';
import { On, Start, Update } from 'nestjs-telegraf';
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
await this.botСommandsService.start(ctx);
}

@On('sticker')
async onSticker(ctx) {
await this.botСommandsService.process(ctx);
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

Prepare files for convert po dictionaries to json

npm run generate

--

### 

Translate all words with po editor

## 

Check new logic in telegram bot

--

### 

Help message

--

### 

First write to a bot

--

### 

Second write to a bot

--

### 

Remove user information

--

### 

In Russian language

In next post I am add support work in groups and use global bot name for that...

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