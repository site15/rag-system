NestJS Telegram bot, fix error: 409: Conflict: terminated by other getUpdates request

# NestJS Telegram bot, fix error: 409: Conflict: terminated by other getUpdates request

Published: 2022-02-21T07:27:37.096Z
Tags: kaufmanbot, nestjstelegraf, errors
[Original Article](https://dev.to/endykaufman/nestjs-telegram-bot-fix-error-409-conflict-terminated-by-other-getupdates-request-22g8)

**Description from API:**
After deploy i have error on server   dokku logs kaufman-bot     root@vpsXXXX:~# dokku logs...

After deploy i have error on server

dokku logs kaufman-bot

```
root@vpsXXXX:~# dokku logs kaufman-bot
2022-02-21T04:47:54.805369331Z app[web.1]:
2022-02-21T04:47:54.805447585Z app[web.1]: > kaufman-bot@0.0.0 start /app
2022-02-21T04:47:54.805456814Z app[web.1]: > node dist/apps/server/main.js
2022-02-21T04:47:54.805462429Z app[web.1]:
2022-02-21T04:47:55.814014072Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:55 AM     LOG [NestFactory] Starting Nest application...
2022-02-21T04:47:55.879257923Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:55 AM     LOG [InstanceLoader] TelegrafModule dependencies initialized +102ms
2022-02-21T04:47:55.879823802Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:55 AM     LOG [InstanceLoader] ScraperModule dependencies initialized +1ms
2022-02-21T04:47:55.880439058Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:55 AM     LOG [InstanceLoader] DiscoveryModule dependencies initialized +0ms
2022-02-21T04:47:55.881300807Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:55 AM     LOG [InstanceLoader] AppModule dependencies initialized +1ms
2022-02-21T04:47:56.099608409Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:56 AM     LOG [InstanceLoader] TelegrafCoreModule dependencies initialized +219ms
2022-02-21T04:47:56.107084992Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:56 AM     LOG [RoutesResolver] AppController {/api}: +7ms
2022-02-21T04:47:56.111708653Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:56 AM     LOG [RouterExplorer] Mapped {/api, GET} route +5ms
2022-02-21T04:47:56.118433520Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:56 AM     LOG [NestApplication] Nest application successfully started +7ms
2022-02-21T04:47:56.122906904Z app[web.1]: [Nest] 189  - 02/21/2022, 4:47:56 AM     LOG 🚀 Application is running on: http://localhost:5000/api
2022-02-21T04:48:00.985747154Z app[web.1]: (node:189) UnhandledPromiseRejectionWarning: Error: 409: Conflict: terminated by other getUpdates request; make sure that only one bot instance is running
2022-02-21T04:48:00.985810814Z app[web.1]:     at Telegram.callApi (/app/node_modules/telegraf/lib/core/network/client.js:264:19)
2022-02-21T04:48:00.985819571Z app[web.1]:     at processTicksAndRejections (internal/process/task_queues.js:95:5)
2022-02-21T04:48:00.985826394Z app[web.1]:     at async Polling.[Symbol.asyncIterator] (/app/node_modules/telegraf/lib/core/network/polling.js:27:33)
2022-02-21T04:48:00.985849961Z app[web.1]:     at async Polling.loop (/app/node_modules/telegraf/lib/core/network/polling.js:70:30)
2022-02-21T04:48:00.985856303Z app[web.1]: (Use `node --trace-warnings ...` to show where the warning was created)
2022-02-21T04:48:00.985872448Z app[web.1]: (node:189) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
2022-02-21T04:48:00.985936312Z app[web.1]: (node:189) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

Enter fullscreen mode

Exit fullscreen mode

For solve this error change libs/plugins/server/src/lib/scraper/scraper-services/scraper.service.ts

```
import { Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import charset from 'charset';
import cheerio from 'cheerio';
import encoding from 'encoding';
import htmlToText from 'html-to-text';
import jschardet from 'jschardet';
import { render } from 'mustache';
import {
ScraperConfig,
SCRAPER_CONFIG,
} from '../scraper-config/scraper.config';
import { ScraperCommandsEnum } from '../scraper-types/scraper-commands';

@Injectable()
export class ScraperService {
private readonly logger = new Logger(ScraperService.name);

constructor(
@Inject(SCRAPER_CONFIG)
private readonly scraperConfig: ScraperConfig
) {}

async onMessage(msg) {
const locale = msg.from?.language_code || null;
const spyWord = this.scraperConfig.spyWords.find((spyWord) =>
msg.text.toLowerCase().includes(spyWord.toLowerCase())
);
if (spyWord) {
if (
msg.text.includes(`/${ScraperCommandsEnum.help}`) ||
msg.text.includes(ScraperCommandsEnum.help)
) {
const replayHelpMessage =
(locale && this.scraperConfig.helpLocale?.[locale]) ||
this.scraperConfig.help;
return replayHelpMessage;
}

const preparedText = msg.text
.split(spyWord)
.join('')
.split('  ')
.join('')
.trim();

const replayMessage = await this.scrap(locale, preparedText);

if (replayMessage) {
return replayMessage;
}

this.logger.warn(`Unhandled commands for text: "${msg.text}"`);
this.logger.debug(msg);
}
return null;
}

private async scrap(locale: string, text: string) {
/*const parsedVariables = parse(this.scraperConfig.uri)
.filter((arr) => arr[0] === 'name')
.map((arr) => arr[1]);
const otherText = text;*/

const replaceVariables = { text: encodeURIComponent(text.trim()), locale };
(this.scraperConfig.removeWords || []).forEach((removeWord: string) => {
text = text
.replace(new RegExp(removeWord, 'ig'), '')
.replace(new RegExp(' {2}', 'ig'), ' ')
.trim();
});
const textArray = text.split(' ');
if (textArray.length > 0) {
textArray.forEach((textArrayItem: string, textArrayIndex: number) => {
replaceVariables[`text ${textArrayIndex + 1}`] = textArrayItem;
});
textArray.forEach((textArrayItem: string, textArrayIndex: number) => {
replaceVariables[`text${textArrayIndex + 1}`] =
textArrayItem.toLowerCase();
});
textArray.forEach((textArrayItem: string, textArrayIndex: number) => {
replaceVariables[`TEXT${textArrayIndex + 1}`] =
textArrayItem.toUpperCase();
});
}
const repalcedUri = render(this.scraperConfig.uri, replaceVariables);
// const replacedText = render(text, replaceVariables);

const axiosInstance = axios.create({
timeout: this.scraperConfig.timeout,
responseEncoding: this.scraperConfig.contentCodepage || 'binary',
});

try {
const response = await axiosInstance.get(repalcedUri);

const $ = cheerio.load(response.data);
let content = this.scraperConfig.contentSelector
.split(',')
.map((selector: string) => htmlToText.fromString($(selector).html()))
.join('\n\n');

console.log(content);
const enc =
charset(response.headers, response.data) ||
jschardet.detect(response.data).encoding.toLowerCase();

if (enc !== 'utf8') {
content = encoding
.convert(Buffer.from(content, 'binary'), 'utf8', enc, true)
.toString('utf8');
}
return content;
} catch (err) {
this.logger.error(err, err.stack);
return err.toString();
}
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Change libs/plugins/server/src/lib/scraper/scraper.module.ts

```
import { DynamicModule, Module } from '@nestjs/common';
import { ScraperConfig, SCRAPER_CONFIG } from './scraper-config/scraper.config';
import { ScraperService } from './scraper-services/scraper.service';

@Module({})
export class ScraperModule {
static forRoot(config: ScraperConfig): DynamicModule {
return {
module: ScraperModule,
providers: [
{
provide: SCRAPER_CONFIG,
useValue: config,
},
ScraperService,
],
exports: [ScraperService],
};
}
}
```

Enter fullscreen mode

Exit fullscreen mode

And change apps/server/src/app/app.service.ts

```
import { ScraperService } from '@kaufman-bot/plugins/server';
import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update, Message } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
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
const scraperReplayMessage = await this.scraperService.onMessage(msg);
return scraperReplayMessage;
}
}
```

Enter fullscreen mode

Exit fullscreen mode

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