Create scraper plugin for telegram bot on nestjs

# Create scraper plugin for telegram bot on nestjs

Published: 2022-02-20T16:27:17.842Z
Tags: kaufmanbot, nestjs, scraper, currency
[Original Article](https://dev.to/endykaufman/create-scraper-plugin-for-telegram-bot-on-nestjs-3n7c)

**Description from API:**
Create empty plugin   Add new library plugins   npm run -- nx g @nrwl/nest:lib...

## 

Create empty plugin

Add new library plugins

npm run -- nx g @nrwl/nest:lib plugins/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib plugins/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "plugins/server"

CREATE libs/plugins/server/README.md
CREATE libs/plugins/server/.babelrc
CREATE libs/plugins/server/src/index.ts
CREATE libs/plugins/server/tsconfig.json
CREATE libs/plugins/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/plugins/server/project.json
UPDATE workspace.json
CREATE libs/plugins/server/.eslintrc.json
CREATE libs/plugins/server/jest.config.js
CREATE libs/plugins/server/tsconfig.spec.json
CREATE libs/plugins/server/src/lib/plugins-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

Create config interface file ./libs/plugin/server/src/lib/scraper/scraper-config/scraper.config.ts

```
export const SCRAPER_CONFIG = 'SCRAPER_CONFIG';

export interface ScraperConfig {
uri: string;
timeout?: number;
contentSelector: string;
contentLength?: number;
contentCodepage?: string;
spyWords: string[];
removeWords?: string[];
help: string;
helpLocale?: { [locale: string]: string };
}
```

Enter fullscreen mode

Exit fullscreen mode

Add enum commands for work plugin libs/plugin/server/src/lib/scraper/scraper-types/scraper-commands.ts

```
export enum ScraperCommandsEnum {
help = 'help',
}
```

Enter fullscreen mode

Exit fullscreen mode

Add plugin service without logic libs/plugins/server/src/lib/scraper/scraper-services/scraper.service.ts

```
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Message as Msg, On, Update } from 'nestjs-telegraf';
import {
ScraperConfig,
SCRAPER_CONFIG,
} from '../scraper-config/scraper.config';
import { ScraperCommandsEnum } from '../scraper-types/scraper-commands';

@Update()
@Injectable()
export class ScraperService {
private readonly logger = new Logger(ScraperService.name);

constructor(
@Inject(SCRAPER_CONFIG)
private readonly scraperConfig: ScraperConfig
) {}

@On('text')
async onMessage(@Msg() msg) {
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

const replayMessage = await this.scrap(preparedText);

if (replayMessage) {
return replayMessage;
}

this.logger.warn(`Unhandled commands for text: "${msg.text}"`);
this.logger.debug(msg);
}
return null;
}

private scrap(text: string) {
return Promise.resolve(text);
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Update module file, add service libs/plugins/server/src/lib/scraper/scraper.module.ts

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
};
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Generate all need files for include lib to app

npm run generate

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run generate

> kaufman-bot@0.0.0 generate
> npm run rucken -- prepare && npm run lint:fix

> kaufman-bot@0.0.0 rucken
> rucken "prepare"

[2022-02-20T15:17:21.816] [INFO] MakeTsListService: prepare - Start create list files...
[2022-02-20T15:17:21.818] [INFO] MakeTsListService: prepare - Config: {"indexFileName":"index","excludes":["*node_modules*","*public_api.ts*","*.spec*","environment*","*test*","*e2e*","*.stories.ts","*.d.ts"]}
[2022-02-20T15:17:21.819] [DEBUG] MakeTsListService: prepare - Process library "core-server" in libs/core/server/src
[2022-02-20T15:17:21.819] [DEBUG] MakeTsListService: prepare - Process library "plugins-server" in libs/plugins/server/src
[2022-02-20T15:17:21.819] [INFO] MakeTsListService: prepare - End of create list files...
[2022-02-20T15:17:21.819] [INFO] VersionUpdaterService: prepare - Start update versions...
[2022-02-20T15:17:21.820] [INFO] VersionUpdaterService: prepare - Config: {"updatePackageVersion":true}
[2022-02-20T15:17:21.820] [DEBUG] VersionUpdaterService: prepare - Process project "core-server" in libs/core/server
[2022-02-20T15:17:21.820] [INFO] VersionUpdaterService: prepare - Start for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"libs/core/server/package.json"}
[2022-02-20T15:17:21.821] [INFO] VersionUpdaterService: prepare - End of for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"libs/core/server/package.json"}
[2022-02-20T15:17:21.821] [DEBUG] VersionUpdaterService: prepare - Process project "plugins-server" in libs/plugins/server
[2022-02-20T15:17:21.821] [INFO] VersionUpdaterService: prepare - Start for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"libs/plugins/server/package.json"}
[2022-02-20T15:17:21.822] [INFO] VersionUpdaterService: prepare - End of for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"libs/plugins/server/package.json"}
[2022-02-20T15:17:21.822] [DEBUG] VersionUpdaterService: prepare - Process project "server" in apps/server
[2022-02-20T15:17:21.822] [INFO] VersionUpdaterService: prepare - Start for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"apps/server/package.json"}
[2022-02-20T15:17:21.822] [INFO] VersionUpdaterService: prepare - Error Wrong body of file apps/server/package.json
[2022-02-20T15:17:21.823] [INFO] VersionUpdaterService: prepare - End of for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"apps/server/package.json"}
[2022-02-20T15:17:21.823] [INFO] VersionUpdaterService: prepare - End of update versions...
[2022-02-20T15:17:21.823] [INFO] Extracti18nService: prepare - Start create translate files...
[2022-02-20T15:17:21.823] [INFO] Extracti18nService: prepare - Config: {"locales":["en"],"markers":["getText","dictionary"]}
[2022-02-20T15:17:21.823] [INFO] Extracti18nService: prepare - Process applications...
[2022-02-20T15:17:21.823] [DEBUG] Extracti18nService: prepare - server apps/server/src
[2022-02-20T15:17:22.757] [INFO] Extracti18nService: prepare - Process libraries...
[2022-02-20T15:17:22.758] [DEBUG] Extracti18nService: prepare - core-server libs/core/server/src
[2022-02-20T15:17:23.651] [DEBUG] Extracti18nService: prepare - plugins-server libs/plugins/server/src
[2022-02-20T15:17:24.987] [INFO] Extracti18nService: prepare - End of create translate files...
[2022-02-20T15:17:24.987] [INFO] GettextService: prepare - Start create translate files...
[2022-02-20T15:17:24.987] [INFO] GettextService: prepare - Config: {"po2jsonOptions":{"format":"mf"},"pattern":"**/*.@(ts|js|tsx|jsx)","locales":["en"],"defaultLocale":"en","markers":["getText","dictionary"]}
[2022-02-20T15:17:24.988] [DEBUG] GettextService: prepare - core-server libs/core/server/src
[2022-02-20T15:17:25.011] [DEBUG] GettextService: prepare - plugins-server libs/plugins/server/src
[2022-02-20T15:17:25.037] [DEBUG] GettextService: prepare - server apps/server/src
[2022-02-20T15:17:25.057] [INFO] GettextService: prepare - End of create translate files...
[2022-02-20T15:17:25.057] [INFO] Extracti18nService: prepare - Start create translate files...
[2022-02-20T15:17:25.057] [INFO] Extracti18nService: prepare - Config: {"locales":["en"],"markers":["getText","dictionary"]}
[2022-02-20T15:17:25.058] [INFO] Extracti18nService: prepare - Process applications...
[2022-02-20T15:17:25.058] [DEBUG] Extracti18nService: prepare - server apps/server/src
[2022-02-20T15:17:25.961] [INFO] Extracti18nService: prepare - Process libraries...
[2022-02-20T15:17:25.961] [DEBUG] Extracti18nService: prepare - core-server libs/core/server/src
[2022-02-20T15:17:26.716] [DEBUG] Extracti18nService: prepare - plugins-server libs/plugins/server/src
[2022-02-20T15:17:28.030] [INFO] Extracti18nService: prepare - End of create translate files...

> kaufman-bot@0.0.0 lint:fix
> npm run tsc:lint && nx workspace-lint --fix && nx run-many --target=lint --all --fix && nx format:write --all

> kaufman-bot@0.0.0 tsc:lint
> tsc --noEmit -p tsconfig.base.json

✔  nx run plugins-server:lint (1s)
✔  nx run core-server:lint (1s)
✔  nx run server:lint  [local cache]

————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  NX   Successfully ran target lint for 3 projects (2s)

With additional flags:
--fix=true

Nx read the output from the cache instead of running the command for 1 out of 3 tasks.

>  NX   Running affected:* commands with --all can result in very slow builds.

--all is not meant to be used for any sizable project or to be used in CI.

Learn more about checking only what is affected: https://nx.dev/latest/angular/cli/affected#affected.

.eslintrc.json 17ms
.prettierrc 16ms
.vscode/extensions.json 2ms
apps/server/.eslintrc.json 5ms
apps/server/jest.config.js 11ms
apps/server/project.json 6ms
apps/server/src/app/app.controller.spec.ts 29ms
apps/server/src/app/app.controller.ts 8ms
apps/server/src/app/app.module.ts 9ms
apps/server/src/app/app.service.spec.ts 9ms
apps/server/src/app/app.service.ts 19ms
apps/server/src/assets/i18n/en.json 2ms
apps/server/src/assets/i18n/en.vendor.json 3ms
apps/server/src/environments/environment.prod.ts 4ms
apps/server/src/environments/environment.ts 4ms
apps/server/src/main.ts 16ms
apps/server/tsconfig.app.json 6ms
apps/server/tsconfig.json 4ms
apps/server/tsconfig.spec.json 4ms
jest.config.js 5ms
jest.preset.js 2ms
libs/core/server/.babelrc 3ms
libs/core/server/.eslintrc.json 2ms
libs/core/server/jest.config.js 5ms
libs/core/server/package.json 3ms
libs/core/server/project.json 3ms
libs/core/server/README.md 22ms
libs/core/server/src/i18n/en.json 1ms
libs/core/server/src/index.ts 3ms
libs/core/server/src/lib/core-server.module.ts 3ms
libs/core/server/tsconfig.json 3ms
libs/core/server/tsconfig.lib.json 3ms
libs/core/server/tsconfig.spec.json 3ms
libs/plugins/server/.babelrc 2ms
libs/plugins/server/.eslintrc.json 2ms
libs/plugins/server/jest.config.js 5ms
libs/plugins/server/package.json 2ms
libs/plugins/server/project.json 6ms
libs/plugins/server/README.md 6ms
libs/plugins/server/src/i18n/en.json 1ms
libs/plugins/server/src/index.ts 2ms
libs/plugins/server/src/lib/plugins-server.module.ts 7ms
libs/plugins/server/src/lib/scraper/scraper-config/scraper.config.ts 5ms
libs/plugins/server/src/lib/scraper/scraper-services/scraper.service.ts 20ms
libs/plugins/server/src/lib/scraper/scraper-types/scraper-commands.ts 3ms
libs/plugins/server/src/lib/scraper/scraper.module.ts 5ms
libs/plugins/server/tsconfig.json 3ms
libs/plugins/server/tsconfig.lib.json 3ms
libs/plugins/server/tsconfig.spec.json 3ms
migrations.json 5ms
nx.json 3ms
package-lock.json 227ms
package.json 2ms
README.md 44ms
STEPS.md 105ms
tools/tsconfig.tools.json 4ms
transloco.config.js 11ms
transloco.config.json 4ms
tsconfig.base.json 4ms
workspace.json 4ms
```

Enter fullscreen mode

Exit fullscreen mode

Add ScraperModule to main AppModule

```
import { ScraperModule } from '@kaufman-bot/plugins/server';
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
contentCodepage: '',
contentLength: 0,
contentSelector: '',
help: 'Scraper help message',
spyWords: ['scraper'],
timeout: 0,
uri: '',
}),
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

Test from telegram

```
IL'shat Khamitov, [20.02.2022 18:28]
scraper /help

KaufmanBotDevelop, [20.02.2022 18:28]
Scraper help message

IL'shat Khamitov, [20.02.2022 18:29]
scraper help

KaufmanBotDevelop, [20.02.2022 18:29]
Scraper help message

IL'shat Khamitov, [20.02.2022 18:29]
scraper trim message please

KaufmanBotDevelop, [20.02.2022 18:29]
trim message please
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Add logic for scrap and use it for get rate for USD/EUR

Install all need deps

npm install --save axios cheerio html-to-text jschardet encoding charset mustache

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm install --save axios cheerio html-to-text jschardet encoding charset mustache

added 15 packages, and audited 883 packages in 6s

109 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

Update service libs/plugins/server/src/lib/scraper/scraper-services/scraper.service.ts

```
import { Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import charset from 'charset';
import cheerio from 'cheerio';
import encoding from 'encoding';
import htmlToText from 'html-to-text';
import jschardet from 'jschardet';
import { render } from 'mustache';
import { Message as Msg, On, Update } from 'nestjs-telegraf';
import {
ScraperConfig,
SCRAPER_CONFIG,
} from '../scraper-config/scraper.config';
import { ScraperCommandsEnum } from '../scraper-types/scraper-commands';

@Update()
@Injectable()
export class ScraperService {
private readonly logger = new Logger(ScraperService.name);

constructor(
@Inject(SCRAPER_CONFIG)
private readonly scraperConfig: ScraperConfig
) {}

@On('text')
async onMessage(@Msg() msg) {
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

Update app module

```
import { ScraperModule } from '@kaufman-bot/plugins/server';
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