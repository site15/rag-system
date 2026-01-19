Create short commands and example using recursive contextable work in Telegram bot on NestJS

# Create short commands and example using recursive contextable work in Telegram bot on NestJS

Published: 2022-04-08T19:38:02.548Z
Tags: kaufmanbot, nestjs, telegram, recursive
[Original Article](https://dev.to/endykaufman/create-short-commands-and-example-using-recursive-contextable-work-in-telegram-bot-on-nestjs-3gfo)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Description of work

In this post, I will describe the creation of the short commands module, it is needed for faster command call.

At the end of the post I will give an example of using recursive contextable work

## 

Add short commands

This command module need to use short versions for run other command handlers

--

### 

Create nx library

npm run -- nx g @nrwl/nest:lib short-commands/server

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run -- nx g @nrwl/nest:lib short-commands/server

> kaufman-bot@0.0.0 nx
> nx "g" "@nrwl/nest:lib" "short-commands/server"

CREATE libs/short-commands/server/README.md
CREATE libs/short-commands/server/.babelrc
CREATE libs/short-commands/server/src/index.ts
CREATE libs/short-commands/server/tsconfig.json
CREATE libs/short-commands/server/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/short-commands/server/project.json
UPDATE workspace.json
CREATE libs/short-commands/server/.eslintrc.json
CREATE libs/short-commands/server/jest.config.js
CREATE libs/short-commands/server/tsconfig.spec.json
CREATE libs/short-commands/server/src/lib/short-commands-server.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add ShortCommandsConfig

libs/short-commands/server/src/lib/short-commands-config/short-commands.config.ts

```
export const SHORT_COMMANDS_CONFIG = Symbol('SHORT_COMMANDS_CONFIG');

export interface ShortCommandsConfig {
title: string;
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
commands: { [langCode: string]: { [text: string]: string } };
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add ShortCommandsService

libs/short-commands/server/src/lib/short-commands-services/short-commands.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
OnBeforeBotCommands,
} from '@kaufman-bot/core/server';
import { DEFAULT_LANGUAGE } from '@kaufman-bot/language-swither/server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService, TranslatesStorage } from 'nestjs-translates';
import {
ShortCommandsConfig,
SHORT_COMMANDS_CONFIG,
} from '../short-commands-config/short-commands.config';

@Injectable()
export class ShortCommandsService
implements BotCommandsProvider, OnBeforeBotCommands
{
private readonly logger = new Logger(ShortCommandsService.name);

constructor(
@Inject(SHORT_COMMANDS_CONFIG)
private readonly shortCommandsConfig: ShortCommandsConfig,
private readonly botСommandsToolsService: BotСommandsToolsService,
private readonly translatesStorage: TranslatesStorage,
private readonly translatesService: TranslatesService
) {}

async onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<TMsg> {
const locale = msg.from.language_code;
const text = msg.text;
if (locale && this.shortCommandsConfig) {
const shortCommands = this.shortCommandsConfig.commands[locale] || {};
const matchedCommands = Object.keys(shortCommands)
.filter((commands) =>
this.botСommandsToolsService.checkCommands(text, commands.split('|'))
)
.map((commands) => shortCommands[commands]);
if (matchedCommands?.length > 0) {
msg.text = matchedCommands[0];
}
}
return msg;
}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.shortCommandsConfig.name} ${BotCommandsEnum.help}`,
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

const spyWord = this.shortCommandsConfig.spyWords.find((spyWord) =>
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
name: this.shortCommandsConfig.title,
descriptions: this.shortCommandsConfig.descriptions,
usage: this.shortCommandsConfig.usage,
}),
};
}

if (
this.botСommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.state],
locale
)
) {
const detectedLang =
Object.keys(this.shortCommandsConfig.commands).filter(
(langCode) =>
this.shortCommandsConfig.commands[langCode] && langCode === locale
)[0] || DEFAULT_LANGUAGE;
const commands = this.shortCommandsConfig.commands[detectedLang] || {};
const aliases = Object.keys(commands);

const markdown = [
`__${this.translatesService.translate(
getText('List of short commands:'),
locale
)}__`,
...aliases.map((alias) =>
locale
? [
`${this.translatesService.translate(
getText('alias'),
locale
)}: ${alias
.split('|')
.map((u) => `_${u}_`)
.join(', ')}`,
`${this.translatesService.translate(
getText('command'),
locale
)}: ${commands[alias]}\n`,
].join('\n')
: ''
),
]
.filter(Boolean)
.join('\n');
return {
type: 'markdown',
message: msg,
markdown,
};
}

this.logger.warn(`Unhandled commands for text: "${msg.text}"`);
this.logger.debug(msg);
}
return null;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

ShortCommandsModule

libs/short-commands/server/src/lib/short-commands.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import {
ShortCommandsConfig,
SHORT_COMMANDS_CONFIG,
} from './short-commands-config/short-commands.config';
import { ShortCommandsService } from './short-commands-services/short-commands.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class ShortCommandsModule {
static forRoot(config: Pick<ShortCommandsConfig, 'commands'>): DynamicModule {
return {
module: ShortCommandsModule,
providers: [
{
provide: SHORT_COMMANDS_CONFIG,
useValue: <ShortCommandsConfig>{
title: getText('Short commands'),
name: 'scmd',
usage: [getText('scmd state'), getText('scmd help')],
descriptions: getText(
'Shortened versions of commands for quick launch'
),
spyWords: [getText('scmd')],
commands: config.commands,
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: ShortCommandsService,
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

Prepare files

npm run generate

--

### 

Translate all words with po editor

--

### 

Prepare files for convert po dictionaries to json

npm run generate

--

### 

Add ShortCommandsModule to AppModule

apps/server/src/app/app.module.ts

```
@Module({
imports: [
...
BotCommandsModule.forRoot(),
LanguageSwitherModule.forRoot(),
DebugMessagesModule.forRoot(),
ShortCommandsModule.forRoot({
commands: {
en: {
joke: 'get jokes',
'quote|thought|wisdom': 'get quotes',
'facts|fact|history': 'get facts',
},
ru: {
'joke|jokes|шутка|шутки|пошути|шути|рассмеши|смешинки|смешинка':
'get jokes',
'quote|thought|wisdom|цитата|цитаты|цитируй|мысль|мудрость|залечи':
'get quotes',
'facts|fact|history|факт|факты|история': 'get facts',
},
},
}),
...
],
...
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Check new logic in telegram bot

Common help message

Get state of short commands

Try usage one of short command

## 

Recursive contextable work

I am not write all process of create this logic, because that have very more code, I write about only usage on simple example on jokes commands

--

### 

Update JokesGeneratorService

libs/jokes-generator/server/src/lib/jokes-generator-services/jokes-generator.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotСommandsToolsService,
OnContextBotCommands,
} from '@kaufman-bot/core/server';
import { ScraperService, ScraperConfig,
SCRAPER_CONFIG, } from '@kaufman-bot/html-scraper/server';
import { DEFAULT_LANGUAGE } from '@kaufman-bot/language-swither/server';
import { Injectable } from '@nestjs/common';
import { TranslatesStorage } from 'nestjs-translates';

@Injectable()
export class JokesGeneratorService
implements BotCommandsProvider, OnContextBotCommands
{
constructor(
@Inject(SCRAPER_CONFIG)
private readonly scraperConfig: ScraperConfig,
private readonly scraperService: ScraperService,
private readonly botСommandsToolsService: BotСommandsToolsService,
private readonly translatesStorage: TranslatesStorage
) {}

async onContextBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code;
if (
this.botСommandsToolsService.checkCommands(
msg.text,
[getText('more'), getText('next')],
locale
)
) {
msg.text = `${BotCommandsEnum.get} ${this.scraperConfig.name}`;
return {
type: 'message',
message: msg,
};
}
return null;
}

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
message: msg,
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

Update JokesGeneratorModule

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
title: getText('Jokes generator'),
name: 'jokes',
descriptions: getText(
'Command to generate text with a random jokes'
),
usage: [getText('get joke'), getText('jokes help')],
contextUsage: [getText('more'), getText('next')],
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
title: getText('Jokes generator'),
name: 'jokes',
descriptions: getText(
'Command to generate text with a random jokes'
),
usage: [getText('get joke'), getText('jokes help')],
contextUsage: [getText('more'), getText('next')],
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

Check new logic in telegram bot

Example with save information of last active commands and use it for generate response

Words for use in context mode your may see in help text

In next post I am append simple commands module with example recursive work with include "if else" logics...

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