Add Prisma ORM to KaufmanBot (NestJS telegram bot application)

# Add Prisma ORM to KaufmanBot (NestJS telegram bot application)

Published: 2022-03-26T15:46:38.155Z
Tags: kaufmanbot, nestjs, prisma, github
[Original Article](https://dev.to/endykaufman/add-prisma-orm-to-kaufmanbot-nestjs-telegram-bot-application-3e8b)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://www.prisma.io - next-generation Node.js and TypeScript ORM

## 

Install dependencies

npm install prisma --save-dev

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm install prisma --save-dev

added 2 packages, and audited 940 packages in 10s

115 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

For correct work with postgres in prod mode, need install pg deps

npm install pg pg-promise --save

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm install pg pg-promise --save

up to date, audited 942 packages in 3s

115 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Init prisma

npx prisma init

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
You can now open it in your favorite editor.

warn You already have a .gitignore. Don't forget to exclude .env to not commit any secret.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver or mongodb (Preview).
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Remove created .env file

rm -rf .env

--

### 

Update prisma schema

prisma/schema.prisma

```
generator client {
provider        = "prisma-client-js"
binaryTargets   = ["native", "linux-musl"]
}

datasource db {
provider = "postgresql"
url      = env("DATABASE_URL")
}
```

Enter fullscreen mode

Exit fullscreen mode

## 

Fill prisma schema from exists database

--

### 

Add additional scripts to packge.json

package.json

```
...
"prisma": "prisma",
"prisma:pull": "npm run -- prisma db pull && npm run prisma:generate",
"prisma:pull:local": "export $(xargs < ./.env.local) > /dev/null 2>&1 && export DATABASE_URL=$SERVER_POSTGRES_URL && npm run -- prisma db pull && npm run prisma:generate",
"prisma:generate": "npm run -- prisma generate",
"postinstall": "npm run generate"
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update exists scripts in packge.json

package.json

```
...
"generate": "npm run prisma:generate && npm run rucken -- prepare --locales=en,ru && npm run lint:fix"
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Run introspection for database

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

✔ Introspected 2 models and wrote them into prisma/schema.prisma in 121ms

Run prisma generate to generate Prisma Client.

> kaufman-bot@0.0.0 prisma:generate
> npm run -- prisma generate

> kaufman-bot@0.0.0 prisma
> prisma "generate"

Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.11.1 | library) to ./node_modules/@prisma/client in 200ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Schema after pull command

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
id         String @id(map: "PK_USERS") @default(dbgenerated("uuid_generate_v4()")) @db.Uuid
telegramId String @unique(map: "UQ_USERS__TELEGRAM_ID") @db.VarChar(64)
langCode   String @default("en") @db.VarChar(64)
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

Add NestJS module for work with prisma

--

### 

Add config file

libs/core/server/src/lib/prisma-client/prisma-client.config.ts

```
export const PRISMA_CLIENT_CONFIG = Symbol('PRISMA_CLIENT_CONFIG');

export interface PrismaClientConfig {
databaseUrl: string;
logging: 'all_queries' | 'long_queries';
maxQueryExecutionTime: number;
}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add service

libs/core/server/src/lib/prisma-client/prisma-client.service.ts

```
import {
Injectable,
Logger,
OnModuleDestroy,
OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CustomInject, CustomInjectorService } from 'nestjs-custom-injector';
import {
PrismaClientConfig,
PRISMA_CLIENT_CONFIG,
} from './prisma-client.config';

@Injectable()
export class PrismaClientService
extends PrismaClient
implements OnModuleInit, OnModuleDestroy
{
private logger = new Logger(PrismaClientService.name);

@CustomInject(PRISMA_CLIENT_CONFIG)
private readonly prismaClientConfig!: PrismaClientConfig;

constructor(customInjectorService: CustomInjectorService) {
super({
datasources: {
db: {
url: customInjectorService.getProviders<PrismaClientConfig>(
PRISMA_CLIENT_CONFIG
).databaseUrl,
},
},
rejectOnNotFound: true,
log: [
{
emit: 'event',
level: 'query',
},
{
emit: 'event',
level: 'error',
},
],
});
}

async onModuleInit(): Promise<void> {
this.logger.log('onModuleInit');
try {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(this as any).$on('query', (e) => {
if (this.prismaClientConfig.logging === 'all_queries') {
if (e.query !== 'SELECT 1') {
this.logger.log(
`query: ${e.query}, params: ${e.params}, duration: ${e.duration}`
);
}
}
if (this.prismaClientConfig.logging === 'long_queries') {
if (e.duration >= this.prismaClientConfig.maxQueryExecutionTime) {
this.logger.warn(
`query is slow: ${e.query}, params: ${e.params}, execution time: ${e.duration}`
);
}
}
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(this as any).$on('error', (e) => {
this.logger.error(`target: ${e.target}, message: ${e.message}`);
});
await this.$connect();
setInterval(
() =>
this.$queryRaw`SELECT 1`.catch((err) =>
this.logger.error(err, err.stack)
),
5 * 60000
);
} catch (err) {
this.logger.error(err, err.stack);
}
}

async onModuleDestroy(): Promise<void> {
this.logger.log('onModuleDestroy');
await this.$disconnect();
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add module

libs/core/server/src/lib/prisma-client/prisma-client.module.ts

```
import { DynamicModule, Module } from '@nestjs/common';
import env from 'env-var';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import {
PrismaClientConfig,
PRISMA_CLIENT_CONFIG,
} from './prisma-client.config';
import { PrismaClientService } from './prisma-client.service';

@Module({
imports: [CustomInjectorModule],
providers: [PrismaClientService],
exports: [PrismaClientService],
})
class PrismaClientModuleCore {}

@Module({
imports: [PrismaClientModuleCore],
exports: [PrismaClientModuleCore],
})
export class PrismaClientModule {
static forRoot(config: PrismaClientConfig): DynamicModule {
return {
module: PrismaClientModule,
providers: [
{
provide: PRISMA_CLIENT_CONFIG,
useValue: {
...config,
databaseUrl: config.databaseUrl
.replace(
'${POSTGRES_HOST}',
env.get('POSTGRES_HOST').default('').asString()
)
.replace(
'localhost',
env.get('POSTGRES_HOST').default('').asString()
),
},
},
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update index.ts files in libs

npm run generate

## 

Add PrismaClientModule to application

--

### 

Update AppModule

apps/server/src/app/app.module.ts

```
...
@Module({
imports: [
...
PrismaClientModule.forRoot({
databaseUrl: env.get('SERVER_POSTGRES_URL').required().asString(),
logging: 'long_queries',
maxQueryExecutionTime: 5000,
}),
...
]
...
})
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update LanguageSwitherModule

libs/language-swither/server/src/lib/language-swither.module.ts

```
import {
...
PrismaClientModule,
} from '@kaufman-bot/core/server';

...

@Module({
imports: [TranslatesModule, PrismaClientModule, BotCommandsModule],
providers: [LanguageSwitherStorage],
exports: [
TranslatesModule,
PrismaClientModule,
BotCommandsModule,
LanguageSwitherStorage,
],
})
export class LanguageSwitherModule {
...
}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create LanguageSwitherStorage

libs/language-swither/server/src/lib/language-swither-services/language-swither.storage.ts

```
import { PrismaClientService } from '@kaufman-bot/core/server';
import { Injectable } from '@nestjs/common';
import { DEFAULT_LANGUAGE } from '../language-swither-config/language-swither.config';

@Injectable()
export class LanguageSwitherStorage {
private readonly languageOfUsers: Record<number, string> = {};

constructor(private readonly prismaClientService: PrismaClientService) {}

async getLanguageOfUser(
userId: number,
defaultLangCode?: string
): Promise<string> {
const currentLanguageCode = this.languageOfUsers[userId];
if (currentLanguageCode) {
return currentLanguageCode;
}
try {
const currentLanguageCodeFromDatabase =
await this.prismaClientService.user.findFirst({
where: { telegramId: userId.toString() },
rejectOnNotFound: true,
});
this.languageOfUsers[userId] = currentLanguageCodeFromDatabase.langCode;
return this.languageOfUsers[userId];
} catch (error) {
return defaultLangCode || DEFAULT_LANGUAGE;
}
}

async setLanguageOfUser(userId: number, langCode: string): Promise<void> {
await this.prismaClientService.user.upsert({
create: { telegramId: userId.toString(), langCode },
update: { langCode },
where: { telegramId: userId.toString() },
});
this.languageOfUsers[userId] = langCode;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update LanguageSwitherService

libs/language-swither/server/src/lib/language-swither-services/language-swither.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
OnBeforeBotCommands,
} from '@kaufman-bot/core/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService, TranslatesStorage } from 'nestjs-translates';
import {
LanguageSwitherConfig,
LANGUAGE_SWITHER_CONFIG,
} from '../language-swither-config/language-swither.config';
import { LanguageSwitherCommandsEnum } from '../language-swither-types/language-swither-commands';
import { LanguageSwitherStorage } from './language-swither.storage';

@Injectable()
export class LanguageSwitherService
implements BotCommandsProvider, OnBeforeBotCommands
{
private readonly logger = new Logger(LanguageSwitherService.name);

constructor(
@Inject(LANGUAGE_SWITHER_CONFIG)
private readonly languageSwitherConfig: LanguageSwitherConfig,
private readonly translatesService: TranslatesService,
private readonly translatesStorage: TranslatesStorage,
private readonly languageSwitherStorage: LanguageSwitherStorage,
private readonly commandToolsService: BotСommandsToolsService
) {}

async onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<TMsg> {
const locale = await this.languageSwitherStorage.getLanguageOfUser(
msg.from?.id
);
const detectedLocale = await this.languageSwitherStorage.getLanguageOfUser(
msg.from?.id,
msg.from?.language_code
);
if (msg.from?.id && !locale) {
await this.languageSwitherStorage.setLanguageOfUser(
msg.from?.id,
detectedLocale
);
} else {
if (detectedLocale) {
msg.from.language_code = detectedLocale;
}
}
return msg;
}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.languageSwitherConfig.name} ${BotCommandsEnum.help}`,
});
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = await this.languageSwitherStorage.getLanguageOfUser(
msg.from?.id
);
const spyWord = this.languageSwitherConfig.spyWords.find((spyWord) =>
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
this.languageSwitherConfig.name,
this.languageSwitherConfig.descriptions,
this.languageSwitherConfig.usage
),
};
}

const preparedText = this.commandToolsService.clearCommands(
msg.text,
[
spyWord,
...Object.keys(LanguageSwitherCommandsEnum),
...(this.languageSwitherConfig.removeWords || []),
],
locale
);

const processedMsg = await this.process(msg, locale, preparedText);

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
>(msg: TMsg, locale: string, text: string) {
if (
this.commandToolsService.checkCommands(
msg.text,
[
LanguageSwitherCommandsEnum.set,
LanguageSwitherCommandsEnum.change,
LanguageSwitherCommandsEnum['quick change'],
],
locale
)
) {
if (
!Object.keys(this.translatesStorage.translates)
.map((key) => key.toLowerCase())
.includes(text.trim().toLowerCase())
) {
const currentLocale =
await this.languageSwitherStorage.getLanguageOfUser(msg.from?.id);
return this.translatesService.translate(
getText(
`locale "{{locale}}" not founded, current locale: "{{currentLocale}}"`
),
currentLocale,
{
locale: text.trim().toLowerCase(),
currentLocale,
}
);
}
const inputLocale =
Object.keys(this.translatesStorage.translates).find((lang) =>
text
.split(' ')
.find((key) => key.toLowerCase() === lang.toLowerCase())
) || locale;
locale = inputLocale || locale;
msg.from.language_code = inputLocale || locale;

await this.languageSwitherStorage.setLanguageOfUser(
msg.from?.id,
inputLocale || locale
);

return this.translatesService.translate(
getText(`locale changed, current locale: "{{locale}}"`),
locale,
{
locale,
}
);
}
if (
this.commandToolsService.checkCommands(
msg.text,
[LanguageSwitherCommandsEnum.my, LanguageSwitherCommandsEnum.current],
locale
)
) {
return this.translatesService.translate(
getText(`you locale: {{locale}}`),
locale,
{ locale }
);
}
return msg;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Update dev infra

--

### 

Update docker-compose

docker/dev/docker-compose.yml

```
...
kaufman-bot-server:
image: node:16-alpine
user: ${CURRENT_UID}
container_name: 'kaufman-bot-server'
environment:
- TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
- SERVER_POSTGRES_URL=${SERVER_POSTGRES_URL}
- POSTGRES_HOST=${POSTGRES_HOST}
- PORT=3000
ports:
- '3000:3000'
- '9229:9229'
working_dir: '/app'
volumes:
- ./../../:/app
networks:
- kaufman-bot-network
command: 'npm run serve'
tty: true
depends_on:
- kaufman-bot-postgres
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update up script

docker/dev/docker-compose-up.sh

```
#!/bin/bash
#export UID=$(id -u)
#export GID=$(id -g)
export CURRENT_UID=$(id -u):$(id -g)
docker volume create --name=kaufman-bot-postgres-volume --label=kaufman-bot-postgres-volume
# Start only database
docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d kaufman-bot-postgres
# Wait ready datatbase
until docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") pg_isready -U postgres; do
echo "Waiting for postgres..."
sleep 2
done
# Create all need application databases by exists match evn key and nx app name
# for app: "server" - env: SERVER_POSTGRES_URL
# for app: "core-server" - env: CORE_SERVER_POSTGRES_URL
npm run rucken -- postgres
# Run migrate database for specific database
export DATABASE_URL=$SERVER_POSTGRES_URL && npm run migrate
# Change database host for applications
export POSTGRES_HOST=kaufman-bot-postgres
# Update all egnerated files
npm run generate
# Start all services
docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Restart dev infra

npm run docker:dev:clean-restart

## 

Check new logic

--

### 

Send change locale command in telegram bot

--

### 

Check database

Connect to container with database

docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") sh

Connect with psql to application database

set PGPASSWORD=password_develop&amp;&amp; psql -d kaufman_bot_develop -U admin_develop

Select telegram users

select * from "User";

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") sh
# set PGPASSWORD=password_develop&& psql -d kaufman_bot_develop -U admin_develop
psql (13.3 (Debian 13.3-1.pgdg100+1))
Type "help" for help.

kaufman_bot_develop=> select * from "User";
id                  | telegramId | langCode 
--------------------------------------+------------+----------
b659808e-35a8-4c93-a40a-96858b352779 | testId     | en
25e4a306-a977-4536-bf05-73ce96a94b73 | 102375526  | en
(2 rows)
```

Enter fullscreen mode

Exit fullscreen mode

## 

Update github deploy config

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

Check database in vps server

Connect to database

dokku postgres:connect global-postgres

Switch database

\connect kaufman_bot_develop

Select telegram users

select * from "User";

```
root@vps17825:~# dokku postgres:connect global-postgres
psql (13.3 (Debian 13.3-1.pgdg100+1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

global_postgres=# \connect kaufman_bot_develop
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
You are now connected to database "kaufman_bot_develop" as user "postgres".
kaufman_bot_develop=# select * from "User";
id                  | telegramId | langCode 
--------------------------------------+------------+----------
7fa21a25-60a9-4d69-86d9-13770bd467fd | testId     | en
99ea4d90-04a9-4d69-9a74-0eff06823f3a | 102375526  | ru
(2 rows)
```

Enter fullscreen mode

Exit fullscreen mode

In the next post, I will add a module for debugging messages in admin mode and user mode...

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