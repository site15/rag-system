Create CurrencyConverterModule for telegram bot on NestJS using ScraperModule

# Create CurrencyConverterModule for telegram bot on NestJS using ScraperModule

Published: 2022-02-26T08:42:35.320Z
Tags: kaufmanbot, nestjs, modules, currency
[Original Article](https://dev.to/endykaufman/create-currencyconvertermodule-for-telegram-bot-on-nestjs-using-scrapermodule-605)

**Description from API:**
Create new library currency-converter   npm run -- nx g @nrwl/nest:lib...

Create new library currency-converter

npm run -- nx g @nrwl/nest:lib currency-converter/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib currency-converter/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "currency-converter/server"

CREATE libs/currency-converter/server/README.md
CREATE libs/currency-converter/server/.babelrc
CREATE libs/currency-converter/server/src/index.ts
CREATE libs/currency-converter/server/tsconfig.json
CREATE libs/currency-converter/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/currency-converter/server/project.json
UPDATE workspace.json
CREATE libs/currency-converter/server/.eslintrc.json
CREATE libs/currency-converter/server/jest.config.js
CREATE libs/currency-converter/server/tsconfig.spec.json
CREATE libs/currency-converter/server/src/lib/currency-converter-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

Create new library html-scraper

npm run -- nx g @nrwl/nest:lib html-scraper/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib html-scraper/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "html-scraper/server"

CREATE libs/html-scraper/server/README.md
CREATE libs/html-scraper/server/.babelrc
CREATE libs/html-scraper/server/src/index.ts
CREATE libs/html-scraper/server/tsconfig.json
CREATE libs/html-scraper/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/html-scraper/server/project.json
UPDATE workspace.json
CREATE libs/html-scraper/server/.eslintrc.json
CREATE libs/html-scraper/server/jest.config.js
CREATE libs/html-scraper/server/tsconfig.spec.json
CREATE libs/html-scraper/server/src/lib/html-scraper-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

Copy exists scraper module to libs/html-scraper/server

cp -Rf ./libs/plugins/server/src/lib/scraper/* ./libs/html-scraper/server/src/lib
rm -r ./libs/html-scraper/server/src/lib/html-scraper-server.module.ts
npm run generate

Change imports in apps/server/src/app/app.module.ts

```
import { ScraperModule } from '@kaufman-bot/html-scraper/server';
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
ScraperModule.forRoot({
contentSelector:
'#__next > div:nth-child(2) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > form > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.iGrAod',
help: 'Scraper help message',
spyWords: ['scraper'],
removeWords: ['to', 'convert', 'please'],
uri: 'https://www.xe.com/currencyconverter/convert/?Amount={{TEXT1}}&From={{TEXT2}}&To={{TEXT3}}',
}),
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

Change imports in apps/server/src/app/app.service.ts

```
import { ScraperService } from '@kaufman-bot/html-scraper/server';
import { Injectable, Logger } from '@nestjs/common';
import { Hears, Help, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
private readonly logger = new Logger(AppService.name);

constructor(private readonly scraperService: ScraperService) {}

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
const scraperReplayMessage = await this.scraperService.onMessage(msg);
return scraperReplayMessage;
} catch (err) {
this.logger.error(err, err.stack);
}
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Remove old library

npm run -- nx g @nrwl/workspace:remove plugins-server
npm run generate

Install needed libraries

npm i --save class-validator-multi-lang class-transformer-global-storage

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save class-validator-multi-lang class-transformer-global-storage

added 4 packages, and audited 888 packages in 4s

109 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

Create new service libs/currency-converter/server/src/lib/currency-converter-services/currency-converter.service.ts

```
import { ScraperService } from '@kaufman-bot/html-scraper/server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyConverterService {
constructor(private readonly scraperService: ScraperService) {}

async onMessage(msg) {
const result = await this.scraperService.onMessage(msg);
if (result && /^[.,0-9]+$/.test(result.split(' ')[0])) {
return result.split(' ')[0];
}
return result;
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Create new module libs/currency-converter/server/src/lib/currency-converter.module.ts

```
import { ScraperModule } from '@kaufman-bot/html-scraper/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CurrencyConverterService } from './currency-converter-services/currency-converter.service';

@Module({})
export class CurrencyConverterModule {
static forRoot(): DynamicModule {
return {
module: CurrencyConverterModule,
imports: [
ScraperModule.forRoot({
contentSelector:
'#__next > div:nth-child(2) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > form > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.iGrAod',
help: getText('Currency converter'),
spyWords: [getText('convert')],
removeWords: [getText('to'), getText('please')],
uri: 'https://www.xe.com/currencyconverter/convert/?Amount={{TEXT1}}&From={{TEXT2}}&To={{TEXT3}}',
}),
],
providers: [CurrencyConverterService],
exports: [ScraperModule, CurrencyConverterService],
};
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Add new files to index.ts in libraries and prepare translate words

npm run generate

Update apps/server/src/app/app.module.ts

```
import { CurrencyConverterModule } from '@kaufman-bot/currency-converter/server';
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
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

Update apps/server/src/app/app.service.ts

```
import { CurrencyConverterService } from '@kaufman-bot/currency-converter/server';
import { Injectable, Logger } from '@nestjs/common';
import { Hears, Help, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
private readonly logger = new Logger(AppService.name);

constructor(
private readonly currencyConverterService: CurrencyConverterService
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
const replayMessage = await this.currencyConverterService.onMessage(msg);
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