Use nestjs-custom-injector to create dynamic handlers in NestJS when creating a telegram bot

# Use nestjs-custom-injector to create dynamic handlers in NestJS when creating a telegram bot

Published: 2022-03-13T10:27:13.668Z
Tags: nestjs, kaufmanbot, providers, multi
[Original Article](https://dev.to/endykaufman/use-nestjs-custom-injector-to-create-dynamic-handlers-in-nestjs-when-creating-a-telegram-bot-4lck)

**Description from API:**
...

## 

Links

https://dev.to/endykaufman/use-symbol-for-custom-injecting-logic-for-nestjs-with-multi-providing-28bi - use Symbol for custom injecting logic for NestJS with multi providing

https://github.com/EndyKaufman/nestjs-custom-injector - source code of nestjs-custom-injector

https://github.com/EndyKaufman/nestjs-translates - source code of nestjs-translates 

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Installation

npm i --save nestjs-custom-injector

## 

Create BotCommandsModule

Module with basic types and utilities, contains a launcher for processing bot commands

--

### 

Create an enum with basic commands

libs/core/server/src/lib/bot-commands/bot-commands-types/bot-commands-enum.ts

```
import { getText } from 'class-validator-multi-lang';

export const BotCommandsEnum = {
help: getText('help'),
get: getText('get'),
};

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create types of possible return values ​​for bot command handlers

libs/core/server/src/lib/bot-commands/bot-commands-types/bot-commands-provider-action-result-type.ts

```
export type BotCommandsProviderActionResultType<T> =
| { type: 'markdown'; markdown: string }
| { type: 'text'; text: string }
| { type: 'message'; message: T }
| null;

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create a common interface for providers with bot command handlers

libs/core/server/src/lib/bot-commands/bot-commands-types/bot-commands-provider.interface.ts

```
import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { BotCommandsProviderActionResultType } from './bot-commands-provider-action-result-type';

export const BOT_COMMANDS_PROVIDER = Symbol('BOT_COMMANDS_PROVIDER');

export type BotCommandsProviderActionMsg = Update.MessageUpdate['message'] & {
text: string;
};

export type BotCommandsProviderActionContext = Context<Update.MessageUpdate>;

export interface BotCommandsProvider {
onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<BotCommandsProviderActionResultType<TMsg>>;

onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<BotCommandsProviderActionResultType<TMsg>>;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Creating a hook interface for pre processing of bot commands

libs/core/server/src/lib/bot-commands/bot-commands-types/on-before-bot-commands.interface.ts

```
import {
BotCommandsProviderActionContext,
BotCommandsProviderActionMsg,
} from './bot-commands-provider.interface';

export interface OnBeforeBotCommands {
onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<TMsg>;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Creating a hook interface for post processing of bot commands

libs/core/server/src/lib/bot-commands/bot-commands-types/on-after-bot-commands.interface.ts

```
import { BotCommandsProviderActionResultType } from './bot-commands-provider-action-result-type';
import {
BotCommandsProviderActionContext,
BotCommandsProviderActionMsg,
} from './bot-commands-provider.interface';

export interface OnAfterBotCommands {
onAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg,
TResult extends BotCommandsProviderActionResultType<TMsg> = BotCommandsProviderActionResultType<TMsg>
>(
result: TResult,
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<{ result: TResult; msg: TMsg }>;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create a service with the main commands necessary in the process of the bot commands

libs/core/server/src/lib/bot-commands/bot-commands-services/bot-commands-tools.service.ts

```
import { Injectable } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { render } from 'mustache';
import { TranslatesService, TranslatesStorage } from 'nestjs-translates';

@Injectable()
export class BotСommandsToolsService {
private lowerCaseTranslates?: TranslatesStorage['translates'];

constructor(
private readonly translatesStorage: TranslatesStorage,
private readonly translatesService: TranslatesService
) {}

generateHelpMessage(
locale: string,
name: string,
descriptions: string,
usage: string[]
) {
const usageWithLocalized = Array.from(
new Set([
...usage,
...usage.map((u) => this.translatesService.translate(u, locale)),
])
);
const replayHelpMessage = [
`__${this.translatesService.translate(name, locale)}__`,
this.translatesService.translate(descriptions, locale),
`${this.translatesService.translate(
getText('usage'),
locale
)}: ${usageWithLocalized.map((u) => `_${u}_`).join(', ')}`,
].join('\n');
return replayHelpMessage;
}

private translateByLowerCase(
key: string,
locale?: string,
context: unknown = {}
) {
this.initLowerCaseTranslates();
const lowerCaseKey = key.toLowerCase();
if (!this.lowerCaseTranslates) {
throw new Error(`lowerCaseTranslates not set`);
}
const value =
(locale && this.lowerCaseTranslates?.[locale]?.[lowerCaseKey]) ||
lowerCaseKey;
return value ? render(value, context) : value;
}

private initLowerCaseTranslates() {
if (!this.lowerCaseTranslates) {
this.lowerCaseTranslates = {};
Object.keys(this.translatesStorage.translates).forEach(
(translateLocale) => {
if (!this.lowerCaseTranslates) {
throw new Error(`lowerCaseTranslates not set`);
}
this.lowerCaseTranslates[translateLocale] = {};
Object.keys(
this.translatesStorage.translates[translateLocale]
).forEach((translateKey) => {
if (!this.lowerCaseTranslates?.[translateLocale]) {
throw new Error(
`lowerCaseTranslates by locale "${translateLocale}" not set`
);
}
this.lowerCaseTranslates[translateLocale][
translateKey.toLowerCase()
] =
this.translatesStorage.translates[translateLocale][
translateKey
].toLowerCase();
});
}
);
}
}

clearCommands(text: string, commands: string[], locale: string) {
const words = text.split(' ');
const lowerCasedWords = words.map((c) => c.toLowerCase());
const lowerCasedCommands = commands.map((c) => c.toLowerCase());
lowerCasedCommands.forEach((command) => {
lowerCasedWords.forEach((word, wordIndex) => {
if (command === word) {
words[wordIndex] = '';
}
if (`/${command}` === word) {
words[wordIndex] = '';
}
if (this.translateByLowerCase(command, locale) === word) {
words[wordIndex] = '';
}
if (`/${this.translateByLowerCase(command, locale)}` === word) {
words[wordIndex] = '';
}
});
});
return words.join(' ').split('  ').join(' ');
}

checkCommands(text: string, commands: string[], locale?: string) {
const lowerCasedText = (text || '').toLowerCase();
const lowerCasedCommands = commands.map((c) => c.toLowerCase());
if (
lowerCasedCommands.find(
(command) =>
lowerCasedText.includes(command) ||
lowerCasedText.includes(`/${command}`)
)
) {
return true;
}
if (
lowerCasedCommands.find(
(command) =>
lowerCasedText.includes(this.translateByLowerCase(command, locale)) ||
lowerCasedText.includes(
`/${this.translateByLowerCase(command, locale)}`
)
)
) {
return true;
}
return false;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create a bot command launcher service

libs/core/server/src/lib/bot-commands/bot-commands-services/bot-commands.service.ts

```
import { Injectable } from '@nestjs/common';
import { CustomInject } from 'nestjs-custom-injector';
import { BotCommandsEnum } from '../bot-commands-types/bot-commands-enum';
import { BotCommandsProviderActionResultType } from '../bot-commands-types/bot-commands-provider-action-result-type';
import {
BotCommandsProvider,
BotCommandsProviderActionContext,
BotCommandsProviderActionMsg,
BOT_COMMANDS_PROVIDER,
} from '../bot-commands-types/bot-commands-provider.interface';
import { OnAfterBotCommands } from '../bot-commands-types/on-after-bot-commands.interface';
import { OnBeforeBotCommands } from '../bot-commands-types/on-before-bot-commands.interface';
import { BotСommandsToolsService } from './bot-commands-tools.service';
@Injectable()
export class BotСommandsService implements BotCommandsProvider {
@CustomInject(BOT_COMMANDS_PROVIDER, { multi: true })
private botCommandsProviders!: (BotCommandsProvider &
Partial<OnBeforeBotCommands> &
Partial<OnAfterBotCommands>)[];

constructor(
private readonly botСommandsToolsService: BotСommandsToolsService
) {}

async onHelp<TMsg extends BotCommandsProviderActionMsg>(
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<BotCommandsProviderActionResultType<TMsg>> {
const allResults: string[] = [];
const len = this.botCommandsProviders.length;
for (let i = 0; i < len; i++) {
const botCommandsProvider = this.botCommandsProviders[i];

const result = await botCommandsProvider.onHelp(msg, ctx);

if (result !== null && result.type === 'text') {
allResults.push(result.text);
}

if (result !== null && result.type === 'markdown') {
allResults.push(result.markdown);
}
}
return {
type: 'markdown',
markdown: allResults.join('\n\n'),
};
}

async onMessage<TMsg extends BotCommandsProviderActionMsg>(
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<BotCommandsProviderActionResultType<TMsg>> {
msg = await this.processOnBeforeBotCommands(msg, ctx);

const len = this.botCommandsProviders.length;
let result: BotCommandsProviderActionResultType<TMsg> = null;
for (let i = 0; i < len; i++) {
if (!result) {
const botCommandsProvider = this.botCommandsProviders[i];

result = await botCommandsProvider.onMessage(msg, ctx);
}
}

if (
result === null &&
this.botСommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.help],
msg.from.language_code
)
) {
return this.onHelp(msg, ctx);
}

const afterBotCommand = await this.processOnAfterBotCommands(
result,
msg,
ctx
);
return afterBotCommand.result;
}

async processOnBeforeBotCommands<TMsg extends BotCommandsProviderActionMsg>(
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<TMsg> {
const len = this.botCommandsProviders.length;
for (let i = 0; i < len; i++) {
const botCommandsProvider = this.botCommandsProviders[i];
if (botCommandsProvider.onBeforeBotCommands)
msg = await botCommandsProvider.onBeforeBotCommands(msg, ctx);
}
return msg;
}

async processOnAfterBotCommands<
TMsg extends BotCommandsProviderActionMsg,
TResult extends BotCommandsProviderActionResultType<TMsg> = BotCommandsProviderActionResultType<TMsg>
>(
result: TResult,
msg: TMsg,
ctx?: BotCommandsProviderActionContext
): Promise<{ result: TResult; msg: TMsg }> {
const len = this.botCommandsProviders.length;
for (let i = 0; i < len; i++) {
const botCommandsProvider = this.botCommandsProviders[i];
if (botCommandsProvider.onAfterBotCommands) {
const afterBotCommand = await botCommandsProvider.onAfterBotCommands<
TMsg,
TResult
>(result, msg, ctx);
result = afterBotCommand.result;
msg = afterBotCommand.msg;
}
}
return { result, msg };
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create a module BotCommandsModule

libs/core/server/src/lib/bot-commands/bot-commands.module.ts

```
import { Module } from '@nestjs/common';
import { TranslatesModule } from 'nestjs-translates';
import { BotСommandsToolsService } from './bot-commands-services/bot-commands-tools.service';
import { BotСommandsService } from './bot-commands-services/bot-commands.service';

@Module({
imports: [TranslatesModule],
providers: [BotСommandsToolsService, BotСommandsService],
exports: [TranslatesModule, BotСommandsToolsService, BotСommandsService],
})
export class BotCommandsModule {}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Remove the old module folder with utilities if it was

libs/core/server/src/lib/command-tools

--

### 

Let's start generating a list of files and extracting words for translation

npm run generate

## 

Update LanguageSwitherModule

Update the bot command files to work with localization

--

### 

Update enum with commands

libs/language-swither/server/src/lib/language-swither-types/language-swither-commands.ts

```
import { getText } from 'class-validator-multi-lang';

export const LanguageSwitherCommandsEnum = {
set: getText('set'),
change: getText('change'),
['quick change']: getText('quick change'),
my: getText('my'),
current: getText('current'),
};

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update the configuration file

libs/language-swither/server/src/lib/language-swither-config/language-swither.config.ts

```
export const LANGUAGE_SWITHER_CONFIG = 'LANGUAGE_SWITHER_CONFIG';

export const DEFAULT_LANGUAGE = 'en';

export interface LanguageSwitherConfig {
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
removeWords?: string[];
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update service to switch languages

Add the use of an interface to properly define class methods

Add the use of a pre-hook to determine and store the user's language

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
DEFAULT_LANGUAGE,
LanguageSwitherConfig,
LANGUAGE_SWITHER_CONFIG,
} from '../language-swither-config/language-swither.config';
import { LanguageSwitherCommandsEnum } from '../language-swither-types/language-swither-commands';

@Injectable()
export class LanguageSwitherService
implements BotCommandsProvider, OnBeforeBotCommands
{
private readonly logger = new Logger(LanguageSwitherService.name);

private readonly languageOfUsers: Record<number, string> = {};

constructor(
@Inject(LANGUAGE_SWITHER_CONFIG)
private readonly languageSwitherConfig: LanguageSwitherConfig,
private readonly translatesService: TranslatesService,
private readonly translatesStorage: TranslatesStorage,
private readonly commandToolsService: BotСommandsToolsService
) {}

async onBeforeBotCommands<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<TMsg> {
const locale =
this.languageOfUsers[msg.from?.id] ||
msg.from?.language_code ||
DEFAULT_LANGUAGE;
if (msg.from?.id && !this.languageOfUsers[msg.from?.id]) {
this.languageOfUsers[msg.from?.id] = locale;
} else {
if (locale) {
msg.from.language_code = locale;
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
const locale = this.languageOfUsers[msg.from?.id];
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
const currentLocale = this.languageOfUsers[msg.from?.id];
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
this.languageOfUsers[msg.from?.id] = inputLocale || locale;

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

--

### 

Update the module and add character token usage to add provider

libs/language-swither/server/src/lib/language-swither.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import { TranslatesModule } from 'nestjs-translates';
import {
LanguageSwitherConfig,
LANGUAGE_SWITHER_CONFIG,
} from './language-swither-config/language-swither.config';
import { LanguageSwitherService } from './language-swither-services/language-swither.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class LanguageSwitherModule {
static forRoot(): DynamicModule {
return {
module: LanguageSwitherModule,
imports: [
CustomInjectorModule.forFeature({
imports: [LanguageSwitherModule],
providers: [
{
provide: LANGUAGE_SWITHER_CONFIG,
useValue: <LanguageSwitherConfig>{
name: getText('Language swither'),
usage: [
getText('my locale'),
getText('change locale to ru'),
getText('locale help'),
],
descriptions: getText(
'Commands for setting and changing the current user language'
),
spyWords: [getText('lang'), getText('locale')],
removeWords: [
getText('change'),
getText('please'),
getText('to'),
],
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: LanguageSwitherService,
},
],
exports: [LANGUAGE_SWITHER_CONFIG],
}),
],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Update FactsGeneratorModule

--

### 

Update service

Add the use of an interface to properly define class methods

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
return await this.scraperService.onHelp(msg);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = msg.from?.language_code;
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

Update the module and add character token usage to add provider

libs/facts-generator/server/src/lib/facts-generator.module.ts

```
import {
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core/server';
import { ScraperModule } from '@kaufman-bot/html-scraper/server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import { FactsGeneratorService } from './facts-generator-services/facts-generator.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class FactsGeneratorModule {
static forRoot(): DynamicModule {
return {
module: FactsGeneratorModule,
imports: [
ScraperModule.forRoot({
name: getText('Facts generator'),
descriptions: getText('Command to generate text with a random fact'),
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
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Update CurrencyConverterModule

--

### 

Update service

Add the use of an interface to properly define class methods

libs/currency-converter/server/src/lib/currency-converter-services/currency-converter.service.ts

```
import {
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
} from '@kaufman-bot/core/server';
import { ScraperService } from '@kaufman-bot/html-scraper/server';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CurrencyConverterService implements BotCommandsProvider {
constructor(private readonly scraperService: ScraperService) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg) {
return await this.scraperService.onHelp(msg);
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const result = await this.scraperService.onMessage(msg);
if (
result?.type === 'text' &&
/^[.,0-9]+$/.test(result.text.split(' ')[0])
) {
return {
type: 'text',
text: result.text.split(' ')[0],
};
}
return result;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update the module and add character token usage to add provider

libs/currency-converter/server/src/lib/currency-converter.module.ts

```
import { BOT_COMMANDS_PROVIDER } from '@kaufman-bot/core/server';
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
name: getText('Currency converter'),
descriptions: getText('Command to convert one currency to another'),
usage: [getText('convert 1 usd to eur'), getText('converter help')],
contentSelector:
'#__next > div:nth-child(2) > div.fluid-container__BaseFluidContainer-qoidzu-0.gJBOzk > section > div:nth-child(2) > div > main > form > div:nth-child(2) > div:nth-child(1) > p.result__BigRate-sc-1bsijpp-1.iGrAod',
spyWords: [getText('convert'), getText('converter')],
removeWords: [getText('to'), getText('please')],
uri: 'https://www.xe.com/currencyconverter/convert/?Amount={{TEXT1}}&From={{TEXT2}}&To={{TEXT3}}',
}),
],
providers: [
{
provide: BOT_COMMANDS_PROVIDER,
useClass: CurrencyConverterService,
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

Generating a list of files and extracting words for translation

npm run generate

## 

Update application files

--

### 

Update app service

apps/server/src/app/app.service.ts

```
import {
BotCommandsProviderActionMsg,
BotСommandsService,
} from '@kaufman-bot/core/server';
import { Injectable, Logger } from '@nestjs/common';
import { Hears, On, Start, Update } from 'nestjs-telegraf';
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
await ctx.reply('Welcome');
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
async onMessage(ctx) {
let msg: BotCommandsProviderActionMsg = ctx.update.message;
const result = await this.botСommandsService.onMessage(msg);
if (result?.type === 'message') {
msg = result.message;
}
if (result?.type === 'markdown') {
ctx.reply(result.markdown, { parse_mode: 'MarkdownV2' });
return;
}
if (result?.type === 'text') {
ctx.reply(result.text);
return;
}
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update app module

apps/server/src/app/app.module.ts

```
import { BotCommandsModule } from '@kaufman-bot/core/server';
import { CurrencyConverterModule } from '@kaufman-bot/currency-converter/server';
import { FactsGeneratorModule } from '@kaufman-bot/facts-generator/server';
import {
DEFAULT_LANGUAGE,
LanguageSwitherModule,
} from '@kaufman-bot/language-swither/server';
import { Module } from '@nestjs/common';
import env from 'env-var';
import { TelegrafModule } from 'nestjs-telegraf';
import {
getDefaultTranslatesModuleOptions,
TranslatesModule,
} from 'nestjs-translates';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
imports: [
TelegrafModule.forRoot({
token: env.get('TELEGRAM_BOT_TOKEN').required().asString(),
}),
TranslatesModule.forRoot(
getDefaultTranslatesModuleOptions({
localePaths: [
join(__dirname, 'assets', 'i18n'),
join(__dirname, 'assets', 'i18n', 'class-validator-messages'),
],
vendorLocalePaths: [join(__dirname, 'assets', 'i18n')],
locales: [DEFAULT_LANGUAGE, 'ru'],
})
),
BotCommandsModule,
LanguageSwitherModule.forRoot(),
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

--

### 

Check all logic for correct work from telegram

In the next post there will be instructions on how to add dev infrastructure to docker compose...

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