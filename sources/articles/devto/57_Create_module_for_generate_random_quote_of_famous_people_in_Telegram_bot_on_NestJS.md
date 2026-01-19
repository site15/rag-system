Create module for generate random quote of famous people in Telegram bot on NestJS

# Create module for generate random quote of famous people in Telegram bot on NestJS

Published: 2022-04-06T05:49:11.731Z
Tags: kaufmanbot, nestjs, telegram, quotes
[Original Article](https://dev.to/endykaufman/create-module-for-generate-random-quote-of-famus-people-in-telegram-bot-on-nestjs-2cm4)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://www.forismatic.com/ - site for generate random quotes in English and Russian languages

## 

Description of work

If you describe the addition of two modules at once on people's quotes and jokes, a very large post will come out

I decided to split the work into two separate posts

This module is a copy of the fact generator, it just uses another site for data parsing and other settings

This module uses features of the scrapper module that have not been used before:
1) using the user's locale in the page address for parsing
2) multiple element selector
3) modification of pre-installed anti anti ddos headers

## 

Create QuoteModule

--

### 

Add new library plugins

npm run -- nx g @nrwl/nest:lib quotes-generator/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib quotes-generator/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "quotes-generator/server"

CREATE libs/quotes-generator/server/README.md
CREATE libs/quotes-generator/server/.babelrc
CREATE libs/quotes-generator/server/src/index.ts
CREATE libs/quotes-generator/server/tsconfig.json
CREATE libs/quotes-generator/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/quotes-generator/server/project.json
UPDATE workspace.json
CREATE libs/quotes-generator/server/.eslintrc.json
CREATE libs/quotes-generator/server/jest.config.js
CREATE libs/quotes-generator/server/tsconfig.spec.json
CREATE libs/quotes-generator/server/src/lib/quotes-generator-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add QuotesGeneratorService

libs/quotes-generator/server/src/lib/quotes-generator-services/quotes-generator.service.ts

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
export class QuotesGeneratorService implements BotCommandsProvider {
constructor(
private readonly scraperService: ScraperService,
private readonly botСommandsToolsService: BotСommandsToolsService
) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg) {
return await this.scraperService.onHelp(msg);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
let locale = msg.from?.language_code;
if (!locale?.includes('ru') || !locale?.includes('en')) {
locale = 'en';
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

Add QuotesGeneratorModule

libs/quotes-generator/server/src/lib/quotes-generator.module.ts

```
import {
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
name: getText('Quotes generator'),
descriptions: getText(
'Command to generate text with a random quotes'
),
usage: [getText('get quote'), getText('quotes help')],
contentSelector:
'forismatic > quote > quotetext, forismatic > quote > quoteauthor',
spyWords: [getText('quotes'), getText('quote')],
removeWords: [getText('get'), getText('please')],
uri: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=xml&lang={{locale}}',
contentCodepage: 'utf8',
headers: [{}],
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

Add QuotesGeneratorModule to AppModule

apps/server/src/app/app.module.ts

```
@Module({
imports: [
...
QuotesGeneratorModule.forRoot(),
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

Get quotes in English language

--

### 

Get quotes in Russian language

In the next post, I will add people jokes for English and Russian languages...

![pic](https://media2.dev.to/dynamic/image/width=256,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png)

[
Create template
](/settings/response-templates)
Templates let you quickly answer FAQs or store snippets for re-use.

Submit
Preview
[Dismiss](/404.html)

Collapse

Expand

[&nbsp;](undefined)

[

](https://dev.to/burakknewton66)

[

Buraak Newton

](https://dev.to/burakknewton66)

Buraak Newton

[

Buraak Newton

](/burakknewton66)

Follow

ONE DAY ALL DEATH

- 

Joined

Sep 26, 2023

•

[

Sep 26 '23

](https://dev.to/endykaufman/create-module-for-generate-random-quote-of-famus-people-in-telegram-bot-on-nestjs-2cm4#comment-29ibj)

Dropdown menu

- [Copy link](https://dev.to/endykaufman/create-module-for-generate-random-quote-of-famus-people-in-telegram-bot-on-nestjs-2cm4#comment-29ibj)

- 

- 

Hide

- 

- 

- 

In this guide, we'll explore the process of creating a Nest JS application for a Telegram bot that generates random quotes from famous people. We'll also focus on addressing the user's request for 'Need More Quotes.
Introduction to Nest JS: Introduction to Nest JS as a suitable framework for building Telegram bots.
Setting up the Application: Steps for configuring a Nest JS application, including dependencies and project structure.
Creating a Telegram Bot: Walkthrough of creating a Telegram bot using the Telegram Bot API.
Integration with Telegram: Integration of the Telegram Bot API into the Nest JS application.
Fetching Random Quotes: Methods for obtaining random quotes from famous figures.
Designing the Quote Generator Module: Design principles for a reusable quote generation module.
Implementing the Module: Step-by-step instructions and code examples for implementing the quote generator module.
Testing and Validation: The importance of testing and how to conduct tests.
Deployment: Options for deploying the Telegram bot for 24/7 availability.
Satisfying User Requests: How to configure the module to provide more quotes upon user requests.
Future Enhancements: Ideas for enhancing the bot's capabilities and user experience.
Conclusion: Summary of the benefits of using Nest JS for a Telegram bot that fulfills the user's request for more quotes.
By following this guide, developers can efficiently create a Telegram bot with Nest JS, integrate external data sources for generating quotes, and ensure user satisfaction by addressing their request for additional quotes.

Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink.

Hide child comments as well

Confirm

For further actions, you may consider blocking this person and/or reporting abuse