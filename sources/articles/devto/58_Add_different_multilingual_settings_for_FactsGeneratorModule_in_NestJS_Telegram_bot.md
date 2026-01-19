Add different multilingual settings for FactsGeneratorModule in NestJS Telegram bot

# Add different multilingual settings for FactsGeneratorModule in NestJS Telegram bot

Published: 2022-04-05T10:16:34.436Z
Tags: kaufmanbot, nestjs, telegram, facts
[Original Article](https://dev.to/endykaufman/add-different-multilingual-settings-for-factsgeneratormodule-in-nestjs-telegram-bot-102i)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://dev.to/endykaufman/series/17029 - series about custom injector

## 

Description of work

The fact generator is based on the ScraperModule, we will not introduce the logic of supporting different configurations for different languages into this module.

For different options for working for different languages, we will add a duplicate ScraperModule import with a different configuration and create a language-specific command handler.

In order for the logic of two different ScraperModules not to overlap, we will wrap its import in CustomInjectorModule.forFeature.

## 

Update facts-generator

--

### 

Create new service for Russian language

libs/facts-generator/server/src/lib/facts-generator-services/ru-facts-generator.service.ts

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

@Injectable()
export class RuFactsGeneratorService implements BotCommandsProvider {
constructor(
private readonly scraperService: ScraperService,
private readonly botСommandsToolsService: BotСommandsToolsService
) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg) {
const locale = msg.from?.language_code;
if (!locale?.includes('ru')) {
return null;
}
return await this.scraperService.onHelp(msg);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code;
if (!locale?.includes('ru')) {
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

Update old service for English language

libs/facts-generator/server/src/lib/facts-generator-services/facts-generator.service.ts

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

@Injectable()
export class FactsGeneratorService implements BotCommandsProvider {
constructor(
private readonly scraperService: ScraperService,
private readonly botСommandsToolsService: BotСommandsToolsService
) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg) {
const locale = msg.from?.language_code;
if (locale?.includes('ru')) {
return null;
}
return await this.scraperService.onHelp(msg);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code;
if (locale?.includes('ru')) {
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
text: result.text
.replace('\n\nTweet [http://twitter.com/share]', '')
.split('\\"')
.join('"')
.split('\n')
.join(' '),
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

Update FactsGeneratorModule

libs/facts-generator/server/src/lib/facts-generator.module.ts

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
import { FactsGeneratorService } from './facts-generator-services/facts-generator.service';
import { RuFactsGeneratorService } from './facts-generator-services/ru-facts-generator.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class FactsGeneratorModule {
static forRoot(): DynamicModule {
return {
module: FactsGeneratorModule,
imports: [
CustomInjectorModule.forFeature({
imports: [
ScraperModule.forRoot({
name: getText('Facts generator'),
descriptions: getText(
'Command to generate text with a random fact'
),
usage: [getText('get facts'), getText('facts help')],
contentSelector: '#z',
spyWords: [getText('facts')],
removeWords: [getText('get'), getText('please')],
uri: 'http://randomfactgenerator.net/',
}),
],
providers: [
{
provide: BOT_COMMANDS_PROVIDER,
useClass: FactsGeneratorService,
},
],
exports: [ScraperModule],
}),
CustomInjectorModule.forFeature({
imports: [
ScraperModule.forRoot({
name: getText('Facts generator'),
descriptions: getText(
'Command to generate text with a random fact'
),
usage: [getText('get facts'), getText('facts help')],
contentSelector: '#fact > table > tbody > tr > td',
spyWords: [getText('facts')],
removeWords: [getText('get'), getText('please')],
uri: 'https://randstuff.ru/fact/',
contentCodepage: 'utf8',
}),
],
providers: [
{
provide: BOT_COMMANDS_PROVIDER,
useClass: RuFactsGeneratorService,
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

## 

Prepare files and append translates if need

npm run generate

Because nothing to changed, we may commit code and test it from telegram

## 

Check new logic in telegram bot

--

### 

Common help message

--

### 

Common help message in Russian language

--

### 

Get fact in English language

--

### 

Get fact in Russian language

In the next post, I will add people quotes and jokes for English and Russian languages...

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