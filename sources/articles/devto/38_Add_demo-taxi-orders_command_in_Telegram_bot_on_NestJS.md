Add "demo-taxi-orders" command in Telegram bot on NestJS

# Add "demo-taxi-orders" command in Telegram bot on NestJS

Published: 2022-11-06T08:35:16.321Z
Tags: kaufmanbot, nestjs, telegram, taxi
[Original Article](https://dev.to/endykaufman/add-demo-taxi-orders-command-in-telegram-bot-on-nestjs-55d5)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://github.com/EndyKaufman/kaufman-bot/tree/master/libs/demo-taxi-orders/server/src/lib - source code of command

https://telegram.me/KaufmanBot - current bot in telegram

## 

Usage example

## 

Create main files

## 

Types

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders.types.ts

```
export enum NavigationButtons {
Prev = 'Prev',
Next = 'Next',
Done = 'Done',
Cancel = 'Cancel',
}

export enum DemoTaxiOrdersSteps {
Start = 'Start',
Direction = 'Direction',
CountOfPassengers = 'CountOfPassengers',
ContactPhone = 'ContactPhone',
Complete = 'Complete',
End = 'End',
}

export enum Direction {
City = 'City',
Village = 'Village',
}

export enum CountOfPassengers {
P1 = '1',
P2 = '2',
P3 = '3',
P4 = '4',
}

export type DemoTaxiLocalContext = {
currentStep?: DemoTaxiOrdersSteps;
direction?: Direction;
countOfPassengers?: CountOfPassengers;
contactPhone?: string;
stateMessageId?: string;
contactPhoneMessageId?: string;
contact?: {
phone_number: string;
first_name: string;
user_id: number;
};
};

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Module options interface

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders.config.ts

```
import { BotCommandsProviderActionMsg } from '@kaufman-bot/core-server';
import { Telegram } from 'telegraf';

export const DEMO_TAXI_ORDERS_CONFIG = 'DEMO_TAXI_ORDERS_CONFIG';

export interface DemoTaxiOrdersConfig {
title: string;
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
botName: { [langCode: string]: string };
category: string;
onComplete?: <
TDemoTaxiLocalContext,
TMsg extends BotCommandsProviderActionMsg<TDemoTaxiLocalContext> = BotCommandsProviderActionMsg<TDemoTaxiLocalContext>
>(
msg: TMsg,
ctx: { telegram: Telegram },
message: string
) => Promise<unknown>;
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Module

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders.module.ts

```
import {
BotCommandsCategory,
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core-server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import { DemoTaxiOrders0CancelService } from './demo-taxi-orders-services/demo-taxi-orders-0-cancel.service';
import { DemoTaxiOrders1DirectionService } from './demo-taxi-orders-services/demo-taxi-orders-1-direction.service';
import { DemoTaxiOrders2CountOfPassengersService } from './demo-taxi-orders-services/demo-taxi-orders-2-count-of-passengers.service';
import { DemoTaxiOrders3ContactPhoneService } from './demo-taxi-orders-services/demo-taxi-orders-3-contact-phone.service';
import { DemoTaxiOrders4CompleteService } from './demo-taxi-orders-services/demo-taxi-orders-4-complete.service';
import { DemoTaxiOrdersRenderService } from './demo-taxi-orders-services/demo-taxi-orders-render.service';
import { DemoTaxiOrdersService } from './demo-taxi-orders-services/demo-taxi-orders.service';
import {
DemoTaxiOrdersConfig,
DEMO_TAXI_ORDERS_CONFIG,
} from './demo-taxi-orders.config';

@Module({
imports: [TranslatesModule, BotCommandsModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule, BotCommandsModule],
})
export class DemoTaxiOrdersModule {
static forRoot(
config?: Pick<DemoTaxiOrdersConfig, 'onComplete'>
): DynamicModule {
return {
module: DemoTaxiOrdersModule,
providers: [
{
provide: DEMO_TAXI_ORDERS_CONFIG,
useValue: <DemoTaxiOrdersConfig>{
title: getText('Demo taxi orders commands'),
name: 'taxi',
usage: [getText('get taxi'), getText('taxi help')],
descriptions: getText('Commands for demo taxi orders'),
spyWords: [getText('taxi')],
category: BotCommandsCategory.user,
...config,
},
},
DemoTaxiOrders0CancelService,
DemoTaxiOrders1DirectionService,
DemoTaxiOrders2CountOfPassengersService,
DemoTaxiOrders3ContactPhoneService,
DemoTaxiOrders4CompleteService,
DemoTaxiOrdersRenderService,
{
provide: BOT_COMMANDS_PROVIDER,
useClass: DemoTaxiOrdersService,
},
],
exports: [DEMO_TAXI_ORDERS_CONFIG],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Services

--

### 

Service for rendering keyboard and text to send to user

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders-services/demo-taxi-orders-render.service.ts

```
import { Injectable } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService } from 'nestjs-translates';
import { Markup } from 'telegraf';
import {
CountOfPassengers,
DemoTaxiLocalContext,
DemoTaxiOrdersSteps,
Direction,
NavigationButtons,
} from '../demo-taxi-orders.types';

@Injectable()
export class DemoTaxiOrdersRenderService {
constructor(private readonly translatesService: TranslatesService) {}

render(locale: string, localContext: DemoTaxiLocalContext) {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mainButtons: any[] = [];
if (localContext.currentStep === DemoTaxiOrdersSteps.Direction) {
mainButtons = [
Markup.button.callback(
'🌆 ' + this.getTranslatedDirectionTextByEnum(Direction.City, locale),
Direction.City
),
Markup.button.callback(
'🏡 ' +
this.getTranslatedDirectionTextByEnum(Direction.Village, locale),
Direction.Village
),
];
}

if (localContext.currentStep === DemoTaxiOrdersSteps.CountOfPassengers) {
mainButtons = [
Markup.button.callback('1️⃣', CountOfPassengers.P1),
Markup.button.callback('2️⃣', CountOfPassengers.P2),
Markup.button.callback('3️⃣', CountOfPassengers.P3),
Markup.button.callback('4️⃣', CountOfPassengers.P4),
];
}

if (
localContext.currentStep === DemoTaxiOrdersSteps.Complete ||
localContext.currentStep === DemoTaxiOrdersSteps.ContactPhone
) {
mainButtons = [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let navButtons: any[] = [];
if (localContext.currentStep === DemoTaxiOrdersSteps.Direction) {
navButtons = [
Markup.button.callback(
'❌ ' + this.translatesService.translate(getText('Cancel'), locale),
NavigationButtons.Cancel
),
Markup.button.callback(
'➡️ ' + this.translatesService.translate(getText('Skip'), locale),
NavigationButtons.Next
),
];
}

if (
localContext.currentStep === DemoTaxiOrdersSteps.CountOfPassengers ||
localContext.currentStep === DemoTaxiOrdersSteps.ContactPhone
) {
navButtons = [
Markup.button.callback(
'❌ ' + this.translatesService.translate(getText('Cancel'), locale),
NavigationButtons.Cancel
),
Markup.button.callback(
'⬅️ ' + this.translatesService.translate(getText('Prev'), locale),
NavigationButtons.Prev
),
Markup.button.callback(
'➡️ ' + this.translatesService.translate(getText('Skip'), locale),
NavigationButtons.Next
),
];
}

if (localContext.currentStep === DemoTaxiOrdersSteps.Complete) {
navButtons = [
Markup.button.callback(
'❌ ' + this.translatesService.translate(getText('Cancel'), locale),
NavigationButtons.Cancel
),
Markup.button.callback(
'⬅️ ' + this.translatesService.translate(getText('Prev'), locale),
NavigationButtons.Prev
),
Markup.button.callback(
'✅ ' + this.translatesService.translate(getText('Done'), locale),
NavigationButtons.Done
),
];
}
return {
text: [
this.getCompleteInfo(locale, localContext),
this.getDirectionInfo(localContext, locale),
this.getCountOfPassengersInfo(localContext, locale),
this.getContactPhone(localContext, locale),
]
.filter(Boolean)
.join('\n'),
custom: {
...Markup.inlineKeyboard([mainButtons, navButtons]),
},
context: localContext,
callback: async (result, context) => {
Object.assign(context, localContext);
},
};
}

private getDirectionInfo(localContext: DemoTaxiLocalContext, locale: string) {
let text = '';
if (localContext.currentStep === DemoTaxiOrdersSteps.Direction) {
if (localContext.direction) {
text = this.translatesService.translate(
getText(`Please choice direction (current: {value})`),
locale
);
} else {
text = this.translatesService.translate(
getText('Please choice direction'),
locale
);
}
} else {
if (localContext.direction) {
text = this.translatesService.translate(
getText(`Direction - {value}`),
locale
);
}
}
return text.replace(
'{value}',
this.getTranslatedDirectionTextByEnum(localContext.direction, locale)
);
}

private getCompleteInfo(locale: string, localContext: DemoTaxiLocalContext) {
if (localContext.currentStep === DemoTaxiOrdersSteps.Complete) {
return [
this.translatesService.translate(getText(`Taxi order:`), locale),
].join('\n');
}
if (localContext.currentStep === DemoTaxiOrdersSteps.End) {
return [
this.translatesService.translate(
getText(`Taxi order was completed`),
locale
),
this.translatesService.translate(getText(`Parameters:`), locale),
].join('\n');
}
return '';
}

private getContactPhone(localContext: DemoTaxiLocalContext, locale: string) {
let text = '';
if (localContext.currentStep === DemoTaxiOrdersSteps.ContactPhone) {
if (localContext.contactPhone) {
text = this.translatesService.translate(
getText(`Please send contact phone (current: {value})`),
locale
);
} else {
text = this.translatesService.translate(
getText('Please send contact phone'),
locale
);
}
} else {
if (localContext.contactPhone) {
text = this.translatesService.translate(
getText(`Contact phone - {value}`),
locale
);
}
}
return text.replace('{value}', localContext.contactPhone || '');
}

private getCountOfPassengersInfo(
localContext: DemoTaxiLocalContext,
locale: string
) {
let text = '';
if (localContext.currentStep === DemoTaxiOrdersSteps.CountOfPassengers) {
if (localContext.countOfPassengers) {
text = this.translatesService.translate(
getText(`Please choice count of passengers (current: {value})`),
locale
);
} else {
text = this.translatesService.translate(
getText('Please choice count of passengers'),
locale
);
}
} else {
if (localContext.countOfPassengers) {
text = this.translatesService.translate(
getText(`Count of passengers - {value}`),
locale
);
}
}
return text.replace('{value}', localContext.countOfPassengers || '');
}

private getTranslatedDirectionTextByEnum(
direction: Direction | undefined,
locale: string
) {
if (direction === Direction.City) {
return this.translatesService.translate(getText('City'), locale);
}
if (direction === Direction.Village) {
return this.translatesService.translate(getText('Village'), locale);
}
return '';
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Service for processing steps

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders-services/demo-taxi-orders.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
OnContextBotCommands,
} from '@kaufman-bot/core-server';
import { Inject, Injectable } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { Telegram } from 'telegraf';
import {
DemoTaxiOrdersConfig,
DEMO_TAXI_ORDERS_CONFIG,
} from '../demo-taxi-orders.config';
import {
DemoTaxiLocalContext,
DemoTaxiOrdersSteps,
NavigationButtons,
} from '../demo-taxi-orders.types';
import { DemoTaxiOrders0CancelService } from './demo-taxi-orders-0-cancel.service';
import { DemoTaxiOrders1DirectionService } from './demo-taxi-orders-1-direction.service';
import { DemoTaxiOrders2CountOfPassengersService } from './demo-taxi-orders-2-count-of-passengers.service';
import { DemoTaxiOrders3ContactPhoneService } from './demo-taxi-orders-3-contact-phone.service';
import { DemoTaxiOrders4CompleteService } from './demo-taxi-orders-4-complete.service';
import { DemoTaxiOrdersRenderService } from './demo-taxi-orders-render.service';

@Injectable()
export class DemoTaxiOrdersService
implements
BotCommandsProvider<DemoTaxiLocalContext>,
OnContextBotCommands<DemoTaxiLocalContext>
{
handlerId = DemoTaxiOrdersService.name;

constructor(
@Inject(DEMO_TAXI_ORDERS_CONFIG)
private readonly config: DemoTaxiOrdersConfig,
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly demoTaxiOrdersRenderService: DemoTaxiOrdersRenderService,
private readonly demoTaxiOrders0CancelProcessorService: DemoTaxiOrders0CancelService,
private readonly demoTaxiOrders1DirectionProcessorService: DemoTaxiOrders1DirectionService,
private readonly demoTaxiOrders2CountOfPassengersService: DemoTaxiOrders2CountOfPassengersService,
private readonly demoTaxiOrders3ContactPhoneService: DemoTaxiOrders3ContactPhoneService,
private readonly demoTaxiOrders4CompleteService: DemoTaxiOrders4CompleteService
) {}

async onContextBotCommands<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(
msg: TMsg,
ctx: { telegram: Telegram }
): Promise<BotCommandsProviderActionResultType<TMsg>> {
const currentStep = msg.context.currentStep;

if (currentStep === DemoTaxiOrdersSteps.End) {
return null;
}

if (
currentStep &&
Object.keys(DemoTaxiOrdersSteps).includes(currentStep) &&
msg.data === NavigationButtons.Cancel
) {
return await this.demoTaxiOrders0CancelProcessorService.process(msg, ctx);
}

if (currentStep === DemoTaxiOrdersSteps.Direction) {
return await this.demoTaxiOrders1DirectionProcessorService.process(
msg,
ctx
);
}

if (currentStep === DemoTaxiOrdersSteps.CountOfPassengers) {
return await this.demoTaxiOrders2CountOfPassengersService.process(
msg,
ctx
);
}

if (currentStep === DemoTaxiOrdersSteps.ContactPhone) {
return await this.demoTaxiOrders3ContactPhoneService.process(msg, ctx);
}

if (currentStep === DemoTaxiOrdersSteps.Complete) {
return await this.demoTaxiOrders4CompleteService.process(msg, ctx);
}
return null;
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
if (this.checkSpyWords({ msg })) {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');

if (
this.botCommandsToolsService.checkCommands(
msg.text,
[BotCommandsEnum.help],
locale
)
) {
return {
type: 'markdown',
message: msg,
markdown: this.botCommandsToolsService.generateHelpMessage(msg, {
locale,
name: this.config.title,
descriptions: this.config.descriptions,
usage: this.config.usage,
category: this.config.category,
}),
};
}

if (
this.botCommandsToolsService.checkCommands(
msg.text,
[getText('start'), getText('get')],
locale
)
) {
const currentStep =
msg.context.currentStep || DemoTaxiOrdersSteps.Start;
if (currentStep === DemoTaxiOrdersSteps.Start) {
return {
newState: true,
type: 'text',
...this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
currentStep: DemoTaxiOrdersSteps.Direction,
}),
message: msg,
};
}
}
}
return null;
}

async onHelp<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.config.name} ${BotCommandsEnum.help}`,
});
}

checkSpyWords({ msg }: { msg: BotCommandsProviderActionMsg }) {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');
return this.config.spyWords.find((spyWord) =>
this.botCommandsToolsService.checkCommands(msg.text, [spyWord], locale)
);
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Service for processing cancel step

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders-services/demo-taxi-orders-0-cancel.service.ts

```
import {
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Injectable } from '@nestjs/common';
import { Telegram } from 'telegraf';
import { DemoTaxiLocalContext } from '../demo-taxi-orders.types';

@Injectable()
export class DemoTaxiOrders0CancelService {
constructor(
private readonly botCommandsToolsService: BotCommandsToolsService
) {}

async process<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(
msg: TMsg,
ctx: { telegram: Telegram }
): Promise<BotCommandsProviderActionResultType<TMsg>> {
await ctx.telegram.deleteMessage(
this.botCommandsToolsService.getChatId(msg),
+this.botCommandsToolsService.getContextMessageId(msg)
);
msg.handlerStop = true;
return {
type: 'stop',
message: msg,
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Service for processing direction step

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders-services/demo-taxi-orders-1-direction.service.ts

```
import {
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Injectable } from '@nestjs/common';
import { Telegram } from 'telegraf';
import {
DemoTaxiLocalContext,
DemoTaxiOrdersSteps,
Direction,
} from '../demo-taxi-orders.types';
import { DemoTaxiOrdersRenderService } from './demo-taxi-orders-render.service';

@Injectable()
export class DemoTaxiOrders1DirectionService {
constructor(
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly demoTaxiOrdersRenderService: DemoTaxiOrdersRenderService
) {}

async process<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(
msg: TMsg,
ctx: { telegram: Telegram }
): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');
const renderedData = this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
currentStep: DemoTaxiOrdersSteps.CountOfPassengers,
direction: (Object.keys(Direction).includes(msg.data)
? msg.data || msg.context.direction
: undefined) as Direction,
});

await ctx.telegram.editMessageText(
this.botCommandsToolsService.getChatId(msg),
+this.botCommandsToolsService.getContextMessageId(msg),
undefined,
renderedData.text,
renderedData.custom
);

return {
type: 'message',
message: msg,
context: renderedData.context,
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Service for processing count-of-passengers step

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders-services/demo-taxi-orders-2-count-of-passengers.service.ts

```
import {
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Injectable } from '@nestjs/common';
import { Telegram } from 'telegraf';
import {
CountOfPassengers,
DemoTaxiLocalContext,
DemoTaxiOrdersSteps,
NavigationButtons,
} from '../demo-taxi-orders.types';
import { DemoTaxiOrdersRenderService } from './demo-taxi-orders-render.service';

@Injectable()
export class DemoTaxiOrders2CountOfPassengersService {
constructor(
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly demoTaxiOrdersRenderService: DemoTaxiOrdersRenderService
) {}

async process<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(
msg: TMsg,
ctx: { telegram: Telegram }
): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');
const renderedData =
msg.data === NavigationButtons.Prev
? this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
currentStep: DemoTaxiOrdersSteps.Direction,
})
: this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
currentStep: DemoTaxiOrdersSteps.ContactPhone,
stateMessageId:
this.botCommandsToolsService.getContextMessageId(msg),
countOfPassengers: (Object.values(CountOfPassengers).find(
(value) => +value === +msg.data
)
? msg.data || msg.context.countOfPassengers
: undefined) as CountOfPassengers,
});

await ctx.telegram.editMessageText(
this.botCommandsToolsService.getChatId(msg),
+this.botCommandsToolsService.getContextMessageId(msg),
undefined,
renderedData.text,
renderedData.custom
);

return {
type: 'message',
message: msg,
context: renderedData.context,
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Service for processing contact-phone step

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders-services/demo-taxi-orders-3-contact-phone.service.ts

```
import {
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Injectable } from '@nestjs/common';
import { Telegram } from 'telegraf';
import {
DemoTaxiLocalContext,
DemoTaxiOrdersSteps,
NavigationButtons,
} from '../demo-taxi-orders.types';
import { DemoTaxiOrdersRenderService } from './demo-taxi-orders-render.service';

@Injectable()
export class DemoTaxiOrders3ContactPhoneService {
constructor(
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly demoTaxiOrdersRenderService: DemoTaxiOrdersRenderService
) {}

async process<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(
msg: TMsg,
ctx: { telegram: Telegram }
): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');
let renderedData = this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
currentStep: DemoTaxiOrdersSteps.Complete,
contact: msg.contact,
contactPhone: !Object.keys(NavigationButtons).includes(msg.data)
? msg.text || msg.contact.phone_number
: msg.context.contactPhone,
contactPhoneMessageId:
msg.context.contactPhoneMessageId === undefined
? this.botCommandsToolsService.getContextMessageId(msg)
: msg.context.contactPhoneMessageId,
});

if (msg.data === NavigationButtons.Prev) {
renderedData = this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
currentStep: DemoTaxiOrdersSteps.CountOfPassengers,
});
}

if (renderedData.context.contactPhoneMessageId === undefined) {
await ctx.telegram.editMessageText(
this.botCommandsToolsService.getChatId(msg),
+this.botCommandsToolsService.getContextMessageId(msg),
undefined,
renderedData.text,
renderedData.custom
);

return {
type: 'message',
message: msg,
context: renderedData.context,
};
} else {
if (renderedData.context.stateMessageId) {
await ctx.telegram.editMessageText(
this.botCommandsToolsService.getChatId(msg),
+renderedData.context.stateMessageId,
undefined,
this.demoTaxiOrdersRenderService.render(locale, {
currentStep: DemoTaxiOrdersSteps.ContactPhone,
}).text
);
}

return {
type: 'text',
...this.demoTaxiOrdersRenderService.render(locale, {
...renderedData.context,
stateMessageId: undefined,
contactPhoneMessageId: undefined,
}),
message: msg,
};
}
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Service for processing complete step

libs/demo-taxi-orders/server/src/lib/demo-taxi-orders-services/demo-taxi-orders-4-complete.service.ts

```
import {
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Inject, Injectable } from '@nestjs/common';
import { Telegram } from 'telegraf';
import {
DemoTaxiOrdersConfig,
DEMO_TAXI_ORDERS_CONFIG,
} from '../demo-taxi-orders.config';
import {
DemoTaxiLocalContext,
DemoTaxiOrdersSteps,
NavigationButtons,
} from '../demo-taxi-orders.types';
import { DemoTaxiOrdersRenderService } from './demo-taxi-orders-render.service';

@Injectable()
export class DemoTaxiOrders4CompleteService {
constructor(
@Inject(DEMO_TAXI_ORDERS_CONFIG)
private readonly config: DemoTaxiOrdersConfig,
private readonly botCommandsToolsService: BotCommandsToolsService,
private readonly demoTaxiOrdersRenderService: DemoTaxiOrdersRenderService
) {}

async process<
TMsg extends BotCommandsProviderActionMsg<DemoTaxiLocalContext> = BotCommandsProviderActionMsg<DemoTaxiLocalContext>
>(
msg: TMsg,
ctx: { telegram: Telegram }
): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');
const renderedData =
msg.data === NavigationButtons.Prev
? this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
stateMessageId:
this.botCommandsToolsService.getContextMessageId(msg),
currentStep: DemoTaxiOrdersSteps.ContactPhone,
})
: this.demoTaxiOrdersRenderService.render(locale, {
...msg.context,
currentStep: DemoTaxiOrdersSteps.End,
});

await ctx.telegram.editMessageText(
this.botCommandsToolsService.getChatId(msg),
+this.botCommandsToolsService.getContextMessageId(msg),
undefined,
renderedData.text,
msg.data === NavigationButtons.Done ? undefined : renderedData.custom
);

if (this.config.onComplete) {
await this.config.onComplete(msg, ctx, renderedData.text);
}

return {
type: 'message',
message: msg,
context: renderedData.context,
};
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