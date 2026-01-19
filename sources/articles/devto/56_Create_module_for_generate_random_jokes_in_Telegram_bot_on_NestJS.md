Create module for generate random jokes in Telegram bot on NestJS

# Create module for generate random jokes in Telegram bot on NestJS

Published: 2022-04-07T14:05:35.639Z
Tags: kaufmanbot, nestjs, telegram, jokes
[Original Article](https://dev.to/endykaufman/create-module-for-generate-random-jokes-in-telegram-bot-on-nestjs-488c)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://jokeapi.dev/ - site for generate random jokes in English language

https://randstuff.ru/joke/ - site for generate random jokes in Russian language

## 

Description of work

In this example, we are using the previously created code for the command to generate jokes for different languages.

The difference is only in the page address and parsing options, plus the hardcode with the Russian language was removed from the service for default work in English.

## 

Create jokes module

--

### 

Add new library plugins

npm run -- nx g @nrwl/nest:lib jokes-generator/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib jokes-generator/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "jokes-generator/server"

CREATE libs/jokes-generator/server/README.md
CREATE libs/jokes-generator/server/.babelrc
CREATE libs/jokes-generator/server/src/index.ts
CREATE libs/jokes-generator/server/tsconfig.json
CREATE libs/jokes-generator/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/jokes-generator/server/project.json
UPDATE workspace.json
CREATE libs/jokes-generator/server/.eslintrc.json
CREATE libs/jokes-generator/server/jest.config.js
CREATE libs/jokes-generator/server/tsconfig.spec.json
CREATE libs/jokes-generator/server/src/lib/jokes-generator-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add JokesGeneratorService

libs/jokes-generator/server/src/lib/jokes-generator-services/jokes-generator.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
} from '@kaufman-bot/core/server';
import { ScraperService } from '@kaufman-bot/html-scraper/server';
import { DEFAULT_LANGUAGE } from '@kaufman-bot/language-swither/server';
import { Injectable } from '@nestjs/common';
import { TranslatesStorage } from 'nestjs-translates';

@Injectable()
export class JokesGeneratorService implements BotCommandsProvider {
constructor(
private readonly scraperService: ScraperService,
private readonly botСommandsToolsService: BotСommandsToolsService,
private readonly translatesStorage: TranslatesStorage
) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg) {
const locale = msg.from?.language_code;
if (
Object.keys(this.translatesStorage.translates).find((key) =>
locale?.includes(key)
) &&
!locale?.includes(DEFAULT_LANGUAGE)
) {
return null;
}
return await this.scraperService.onHelp(msg);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code;
if (
Object.keys(this.translatesStorage.translates).find((key) =>
locale?.includes(key)
) &&
!locale?.includes(DEFAULT_LANGUAGE)
) {
return null;
}
if (
this.botСommandsToolsService.checkCommands(
msg.text,
[...Object.keys(BotCommandsEnum)],
locale
)
) {
const result = await this.scraperService.onMessage(msg);
try {
if (result?.type === 'text') {
return {
type: 'text',
text: result.text.split('\\"').join('"').split('\n').join(' '),
};
}
return result;
} catch (err) {
console.debug(result);
console.error(err, err.stack);
throw err;
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

Add RuJokesGeneratorService

libs/jokes-generator/server/src/lib/jokes-generator-services/ru-jokes-generator.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
} from '@kaufman-bot/core/server';
import { ScraperService } from '@kaufman-bot/html-scraper/server';
import { Injectable } from '@nestjs/common';

const RUSSIAN_LANGUAGE = 'ru';

@Injectable()
export class RuJokesGeneratorService implements BotCommandsProvider {
constructor(
private readonly scraperService: ScraperService,
private readonly botСommandsToolsService: BotСommandsToolsService
) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg) {
const locale = msg.from?.language_code;
if (!locale?.includes(RUSSIAN_LANGUAGE)) {
return null;
}
return await this.scraperService.onHelp(msg);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code;
if (!locale?.includes(RUSSIAN_LANGUAGE)) {
return null;
}
if (
this.botСommandsToolsService.checkCommands(
msg.text,
[...Object.keys(BotCommandsEnum)],
locale
)
) {
const result = await this.scraperService.onMessage(msg);
try {
if (result?.type === 'text') {
return {
type: 'text',
text: result.text.split('\\"').join('"').split('\n').join(' '),
};
}
return result;
} catch (err) {
console.debug(result);
console.error(err, err.stack);
throw err;
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

Add JokesGeneratorModule

libs/jokes-generator/server/src/lib/jokes-generator.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { ScraperModule } from '@kaufman-bot/html-scraper/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import { TranslatesModule } from 'nestjs-translates';
import { JokesGeneratorService } from './jokes-generator-services/jokes-generator.service';
import { RuJokesGeneratorService } from './jokes-generator-services/ru-jokes-generator.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class JokesGeneratorModule {
static forRoot(): DynamicModule {
return {
module: JokesGeneratorModule,
imports: [
CustomInjectorModule.forFeature({
imports: [
ScraperModule.forRoot({
name: getText('Jokes generator'),
descriptions: getText(
'Command to generate text with a random jokes'
),
usage: [getText('get joke'), getText('jokes help')],
contentSelector: '#joke > table > tbody > tr > td',
spyWords: [getText('jokes'), getText('joke')],
removeWords: [getText('get'), getText('please')],
uri: 'https://randstuff.ru/joke/',
contentCodepage: 'utf8',
}),
],
providers: [
{
provide: BOT_COMMANDS_PROVIDER,
useClass: RuJokesGeneratorService,
},
],
exports: [ScraperModule],
}),
CustomInjectorModule.forFeature({
imports: [
ScraperModule.forRoot({
name: getText('Jokes generator'),
descriptions: getText(
'Command to generate text with a random jokes'
),
usage: [getText('get joke'), getText('jokes help')],
contentSelector: 'data > joke',
spyWords: [getText('jokes'), getText('joke')],
removeWords: [getText('get'), getText('please')],
uri: 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&format=xml',
contentCodepage: 'utf8',
}),
],
providers: [
{
provide: BOT_COMMANDS_PROVIDER,
useClass: JokesGeneratorService,
},
],
exports: [ScraperModule],
}),
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Prepare files

npm run generate

--

### 

Translate all words with po editor

Look list of all dictionaries

Append all needed translates

--

### 

Prepare files for convert po dictionaries to json

npm run generate

--

### 

Add JokesGeneratorModule to AppModule

apps/server/src/app/app.module.ts

```
@Module({
imports: [
...
JokesGeneratorModule.forRoot(),
...
],
...
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

## 

Check new logic in telegram bot

--

### 

Common help message

--

### 

Get jokes in English language

--

### 

Get jokes in Russian language

In the nest post I will create recursive command handler for create shortcodes for run any other commands of bot, and I will use previouse answer for work active process...

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