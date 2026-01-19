Create facts generator for telegram bot with NestJS

# Create facts generator for telegram bot with NestJS

Published: 2022-02-26T11:09:44.921Z
Tags: kaufmanbot, facts, generator, nestjs
[Original Article](https://dev.to/endykaufman/create-facts-generator-for-telegram-bot-with-nestjs-cl)

**Description from API:**
You need to go to google and find a site with a free joke generator, the site must not be a...

You need to go to google and find a site with a free joke generator, the site must not be a SPA

https://www.google.com/search?q=random+fact+generator

I chose the second

Create new library facts-generator

npm run -- nx g @nrwl/nest:lib facts-generator/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib facts-generator/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "facts-generator/server"

CREATE libs/facts-generator/server/README.md
CREATE libs/facts-generator/server/.babelrc
CREATE libs/facts-generator/server/src/index.ts
CREATE libs/facts-generator/server/tsconfig.json
CREATE libs/facts-generator/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/facts-generator/server/project.json
UPDATE workspace.json
CREATE libs/facts-generator/server/.eslintrc.json
CREATE libs/facts-generator/server/jest.config.js
CREATE libs/facts-generator/server/tsconfig.spec.json
CREATE libs/facts-generator/server/src/lib/facts-generator-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

Go to the site and define a selector for fact text

Go to developer console panel and check selector

Create file libs/facts-generator/server/src/lib/facts-generator-services/facts-generator.service.ts

```
import { ScraperService } from '@kaufman-bot/html-scraper/server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FactsGeneratorService {
constructor(private readonly scraperService: ScraperService) {}

async onMessage(msg) {
let result = await this.scraperService.onMessage(msg);
if (result !== null) {
result = result.replace('\n\nTweet [http://twitter.com/share]', '');
}
return result;
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Create file libs/facts-generator/server/src/lib/facts-generator.module.ts

```
import { ScraperModule } from '@kaufman-bot/html-scraper/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { FactsGeneratorService } from './facts-generator-services/facts-generator.service';

@Module({})
export class FactsGeneratorModule {
static forRoot(): DynamicModule {
return {
module: FactsGeneratorModule,
imports: [
ScraperModule.forRoot({
contentSelector: '#z',
help: getText('Random facts generator'),
spyWords: [getText('facts')],
removeWords: [getText('get'), getText('please')],
uri: 'http://randomfactgenerator.net/',
}),
],
providers: [FactsGeneratorService],
exports: [ScraperModule, FactsGeneratorService],
};
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Run generate all needed files

npm run generate

Update file apps/server/src/app/app.module.ts

```
import { CurrencyConverterModule } from '@kaufman-bot/currency-converter/server';
import { FactsGeneratorModule } from '@kaufman-bot/facts-generator/server';
import { Module } from '@nestjs/common';
import env from 'env-var';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
imports: [
TelegrafModule.forRoot({
token: env.get('TELEGRAM_BOT_TOKEN').required().asString(),
}),
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

Update file apps/server/src/app/app.service.ts

```
import { CurrencyConverterService } from '@kaufman-bot/currency-converter/server';
import { FactsGeneratorService } from '@kaufman-bot/facts-generator/server';
import { Injectable, Logger } from '@nestjs/common';
import { Hears, Help, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
private readonly logger = new Logger(AppService.name);

constructor(
private readonly currencyConverterService: CurrencyConverterService,
private readonly factsGeneratorService: FactsGeneratorService
) {}

getData(): { message: string } {
return { message: 'Welcome to server!' };
}

@Start()
async startCommand(ctx: Context) {
await ctx.reply('Welcome');
}

@Help()
async helpCommand(ctx: Context) {
await ctx.reply('Send me a sticker');
}

@On('sticker')
async onSticker(ctx: Context) {
await ctx.reply('👍');
}

@Hears('hi')
async hearsHi(ctx: Context) {
await ctx.reply('Hey there');
}

@On('text')
async onMessage(@Message() msg) {
try {
let replayMessage = await this.currencyConverterService.onMessage(msg);
if (replayMessage === null) {
replayMessage = this.factsGeneratorService.onMessage(msg);
}
return replayMessage;
} catch (err) {
this.logger.error(err, err.stack);
}
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Test from telegram

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