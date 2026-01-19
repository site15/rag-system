Add schematics for create empty kaufman-bot applications and library in Telegram bot on NestJS

# Add schematics for create empty kaufman-bot applications and library in Telegram bot on NestJS

Published: 2022-04-22T09:59:50.051Z
Tags: kaufmanbot, schematics, nx, nestjs
[Original Article](https://dev.to/endykaufman/add-schematics-for-create-empty-kaufman-bot-applications-and-library-in-telegram-bot-on-nestjs-4n1p)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/KaufmanBot - current bot in telegram

https://github.com/kaufman-bot/schematics-example - project generated with @kaufman-bot/schematics

## 

Description of work

In the current post, I'm copying the NestJS schemas for building apps and libraries, and after a lot of modifications, I'll make the schemas for building kaufman-bot apps and libraries.

## 

Create new libraries

--

### 

Create new library for schematics

npm run nx -- g lib schematics

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run nx -- g lib schematics

> kaufman-bot@2.2.2 nx
> nx "g" "lib" "schematics"

CREATE libs/schematics/README.md
CREATE libs/schematics/.babelrc
CREATE libs/schematics/src/index.ts
CREATE libs/schematics/tsconfig.json
CREATE libs/schematics/tsconfig.lib.json
UPDATE tsconfig.base.json
CREATE libs/schematics/project.json
UPDATE workspace.json
CREATE libs/schematics/.eslintrc.json
CREATE libs/schematics/jest.config.js
CREATE libs/schematics/tsconfig.spec.json
CREATE libs/schematics/src/lib/schematics.module.ts
```

Enter fullscreen mode

Exit fullscreen mode

## 

Append logic for schematics

--

### 

Remove not need files

rm -rf libs/schematics/src/lib

--

### 

Clone nrwl nx repository

git clone git@github.com:nrwl/nx.git

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ git clone git@github.com:nrwl/nx.git
Cloning into 'nx'...
remote: Enumerating objects: 94099, done.
remote: Counting objects: 100% (10/10), done.
remote: Compressing objects: 100% (10/10), done.
remote: Total 94099 (delta 0), reused 2 (delta 0), pack-reused 94089
Receiving objects: 100% (94099/94099), 69.44 MiB | 4.43 MiB/s, done.
Resolving deltas: 100% (64903/64903), done.
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Copy-past logic

Copy nest schematics to kaufman-bot libs

cp -Rf ./nx/packages/nest/** ./libs/schematics

Remove not need files

rm -rf libs/schematics/src/generators/class libs/schematics/src/generators/controller libs/schematics/src/generators/convert-tslint-to-eslint libs/schematics/src/generators/decorator libs/schematics/src/generators/filter libs/schematics/src/generators/gateway libs/schematics/src/generators/guard libs/schematics/src/generators/interceptor libs/schematics/src/generators/interface libs/schematics/src/generators/middleware libs/schematics/src/generators/module libs/schematics/src/generators/pipe libs/schematics/src/generators/provider libs/schematics/src/generators/resolver libs/schematics/src/generators/resource libs/schematics/src/generators/service libs/schematics/src/lib libs/schematics/src/migrations libs/schematics/README.md libs/schematics/migrations.spec.ts libs/schematics/migrations.json libs/schematics/index.ts nx libs/schematics/index.ts libs/schematics/src/generators/library/library.spec.ts libs/schematics/src/generators/library/snapshots libs/schematics/src/index.ts libs/schematics/src/generators/init/init.spec.ts libs/schematics/src/generators/utils/run-nest-schematic.spec.ts libs/schematics/src/generators/application/application.spec.ts libs/schematics/src/generators/application/files/app/app.controller.spec.ts_tmpl_ libs/schematics/src/generators/application/files/app/app.controller.ts_tmpl_ libs/schematics/src/generators/application/files/app/app.service.spec.ts_tmpl_ libs/schematics/src/generators/application/files/app/app.service.ts_tmpl_ libs/schematics/src/generators/library/snapshots/library.spec.ts.snap libs/schematics/src/generators/library/library.spec.ts libs/schematics/src/generators/utils/run-nest-schematic.spec.ts libs/schematics/src/index.ts libs/schematics/src/generators/library/files/controller/src/lib/fileName.controller.spec.ts_tmpl_ libs/schematics/src/generators/library/files/controller/src/lib/fileName.controller.ts_tmpl_ libs/schematics/src/generators/library/files/service/src/lib/fileName.service.spec.ts_tmpl_

Update generators list
libs/schematics/generators.json

```
{
"name": "nx/nest",
"version": "0.1",
"extends": ["@nrwl/workspace"],
"schematics": {
"application": {
"factory": "./src/generators/application/application#applicationSchematic",
"schema": "./src/generators/application/schema.json",
"aliases": ["app"],
"x-type": "application",
"description": "Create a KaufmanBot application."
},
"init": {
"factory": "./src/generators/init/init#initSchematic",
"schema": "./src/generators/init/schema.json",
"description": "Initialize the `@kaufman-bot/schematics` plugin.",
"aliases": ["ng-add"],
"hidden": true
},
"library": {
"factory": "./src/generators/library/library#librarySchematic",
"schema": "./src/generators/library/schema.json",
"aliases": ["lib"],
"x-type": "library",
"description": "Create a new KaufmanBot library."
}
},
"generators": {
"application": {
"factory": "./src/generators/application/application",
"schema": "./src/generators/application/schema.json",
"aliases": ["app"],
"x-type": "application",
"description": "Create a KaufmanBot application."
},
"init": {
"factory": "./src/generators/init/init",
"schema": "./src/generators/init/schema.json",
"description": "Initialize the `@kaufman-bot/schematics` plugin.",
"aliases": ["ng-add"],
"hidden": true
},
"library": {
"factory": "./src/generators/library/library",
"schema": "./src/generators/library/schema.json",
"aliases": ["lib"],
"x-type": "library",
"description": "Create a new KaufmanBot library."
}
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Replace all names

npx -y replace-in-files-cli --string="build/packages/nest" --replacement="dist/libs/schematics" './libs/schematics/**'
npx -y replace-in-files-cli --string="packages/nest" --replacement="libs/schematics" './libs/schematics/**'

Update template file of main
libs/schematics/src/generators/application/files/main.ts__tmpl__

```
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('source-map-support').install();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import env from 'env-var';
import { getBotToken } from 'nestjs-telegraf';
import { AppModule } from './app/app.module';

const logger = new Logger('Application');

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

async function bootstrap() {
const app = await NestFactory.create(AppModule);

const TELEGRAM_BOT_WEB_HOOKS_PATH = env
.get('TELEGRAM_BOT_WEB_HOOKS_PATH')
.asString();
if (TELEGRAM_BOT_WEB_HOOKS_PATH) {
const bot = app.get(getBotToken());
app.use(bot.webhookCallback(TELEGRAM_BOT_WEB_HOOKS_PATH));
}

const port = env.get('PORT').default(3333).asPortNumber();
await app.listen(port);
logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

try {
bootstrap().catch((err) => {
logger.error(err, err.stack);
});
} catch (err) {
logger.error(err, err.stack);
}

function exitHandler(options, exitCode) {
if (options.cleanup) {
logger.log('exit: clean');
}
if (exitCode || exitCode === 0) {
if (exitCode !== 0) {
logger.error(exitCode, exitCode.stack);
logger.log(`exit: code - ${exitCode}`);
} else {
logger.log(`exit: code - ${exitCode}`);
}
}
if (options.exit) {
process.exit();
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update template of service
libs/schematics/src/generators/application/files/app/app.service.ts__tmpl__

```
import { BotInGroupsProcessorService } from '@kaufman-bot/bot-in-groups-server';
import { BotCommandsService } from '@kaufman-bot/core-server';
import { Injectable, Logger } from '@nestjs/common';
import { On, Start, Update, Use } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
private readonly logger = new Logger(AppService.name);

constructor(
private readonly botCommandsService: BotCommandsService,
private readonly botInGroupsProcessorService: BotInGroupsProcessorService
) {}

@Start()
async startCommand(ctx: Context) {
await this.botCommandsService.start(ctx);
}

@Use()
async use(ctx) {
try {
await this.botInGroupsProcessorService.process(ctx);
} catch (err) {
this.logger.error(err, err.stack);
}
}

@On('sticker')
async onSticker(ctx) {
try {
await this.botCommandsService.process(ctx);
} catch (err) {
this.logger.error(err, err.stack);
}
}

@On('text')
async onMessage(ctx) {
try {
await this.botCommandsService.process(ctx);
} catch (err) {
this.logger.error(err, err.stack);
}
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update template of module
libs/schematics/src/generators/application/files/app/app.module.ts__tmpl__

```
import { BotInGroupsModule } from '@kaufman-bot/bot-in-groups-server';
import { BotCommandsModule } from '@kaufman-bot/core-server';
import { DebugMessagesModule } from '@kaufman-bot/debug-messages-server';
import { FactsGeneratorModule } from '@kaufman-bot/facts-generator-server';
import { LanguageSwitherModule } from '@kaufman-bot/language-swither-server';
import { ShortCommandsModule } from '@kaufman-bot/short-commands-server';
import { Module } from '@nestjs/common';
import env from 'env-var';
import { TelegrafModule } from 'nestjs-telegraf';
import {
getDefaultTranslatesModuleOptions,
TranslatesModule,
} from 'nestjs-translates';
import { join } from 'path';
import { AppService } from './app.service';

const TELEGRAM_BOT_WEB_HOOKS_DOMAIN = env
.get('TELEGRAM_BOT_WEB_HOOKS_DOMAIN')
.asString();
const TELEGRAM_BOT_WEB_HOOKS_PATH = env
.get('TELEGRAM_BOT_WEB_HOOKS_PATH')
.asString();

const BOT_NAMES = env.get('BOT_NAMES').required().asArray();

@Module({
imports: [
TelegrafModule.forRoot({
token: env.get('TELEGRAM_BOT_TOKEN').required().asString(),
launchOptions: {
dropPendingUpdates: true,
...(TELEGRAM_BOT_WEB_HOOKS_DOMAIN && TELEGRAM_BOT_WEB_HOOKS_PATH
? {
webhook: {
domain: TELEGRAM_BOT_WEB_HOOKS_DOMAIN,
hookPath: TELEGRAM_BOT_WEB_HOOKS_PATH,
},
}
: {}),
},
}),
TranslatesModule.forRoot(
getDefaultTranslatesModuleOptions({
localePaths: [
join(__dirname, 'assets', 'i18n'),
join(__dirname, 'assets', 'i18n', 'getText'),
join(__dirname, 'assets', 'i18n', 'class-validator-messages'),
],
vendorLocalePaths: [join(__dirname, 'assets', 'i18n')],
locales: ['en'],
})
),
DebugMessagesModule.forRoot(),
BotCommandsModule.forRoot({
admins: env.get('TELEGRAM_BOT_ADMINS').default('').asArray(','),
commit: env.get('DEPLOY_COMMIT').default('').asString(),
date: env.get('DEPLOY_DATE').default('').asString(),
version: env.get('DEPLOY_VERSION').default('').asString(),
}),
ShortCommandsModule.forRoot({
commands: {
en: {
'*fact*|history': 'get facts',
'*what you can do*|faq': 'help',
'disable debug': 'debug off',
'enable debug': 'debug on',
},
},
}),
BotInGroupsModule.forRoot({
botNames: {
en: BOT_NAMES,
},
botMeetingInformation: {
en: [`Hello! I'm ${BOT_NAMES[0]} 😉`, 'Hello!', 'Hello 🖖'],
},
}),
LanguageSwitherModule.forRoot(),
FactsGeneratorModule.forRoot(),
],
providers: [AppService],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

Update library service template
libs/schematics/src/generators/library/files/service/src/lib/__fileName__.service.ts__tmpl__

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService } from 'nestjs-translates';

export const <%= constantName %>_CONFIG = '<%= constantName %>_CONFIG';

export interface <%= className %>Config {
title: string;
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
category: string;
}

@Injectable()
export class <%= className %>Service implements BotCommandsProvider {
private readonly logger = new Logger(<%= className %>Service.name);

constructor(
@Inject(<%= constantName %>_CONFIG)
private readonly <%= propertyName %>Config: <%= className %>Config,
private readonly translatesService: TranslatesService,
private readonly commandToolsService: BotCommandsToolsService,
private readonly botCommandsToolsService: BotCommandsToolsService
) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.<%= propertyName %>Config.name} ${BotCommandsEnum.help}`,
});
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');

const spyWord = this.<%= propertyName %>Config.spyWords.find((spyWord) =>
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
message: msg,
markdown: this.commandToolsService.generateHelpMessage(msg, {
locale,
name: this.<%= propertyName %>Config.title,
descriptions: this.<%= propertyName %>Config.descriptions,
usage: this.<%= propertyName %>Config.usage,
category: this.<%= propertyName %>Config.category,
}),
};
}

const processedMsg = await this.process(msg, locale);

if (typeof processedMsg === 'string') {
return {
type: 'text',
message: msg,
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
>(msg: TMsg, locale: string) {
if (
this.commandToolsService.checkCommands(
msg.text,
[getText('ping')],
locale
)
) {
return this.translatesService.translate(
getText('pong'),
locale
);
}
return null;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update library module template
libs/schematics/src/generators/library/files/common/src/lib/__fileName__.module.ts__tmpl__

```
import {
BotCommandsCategory,
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core-server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import {
<%= className %>Service,
<%= className %>Config,
<%= constantName %>_CONFIG,
} from './<%= fileName %>.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class <%= className %>Module {
static forRoot(): DynamicModule {
return {
module: <%= className %>Module,
providers: [
{
provide: <%= constantName %>_CONFIG,
useValue: <<%= className %>Config>{
title: getText('<%= TitleName %> commands'),
name: '<%= propertyName %>',
usage: [
getText('<%= propertyName %> ping'),
getText('<%= propertyName %> help'),
],
descriptions: getText(
'Commands for <%= titleName %>'
),
spyWords: [getText('<%= propertyName %>')],
category: BotCommandsCategory.user,
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: <%= className %>Service,
},
],
exports: [<%= constantName %>_CONFIG],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Add custom schematics helpers
libs/schematics/src/generators/init/lib/add-custom.ts

```
import type { Tree } from '@nrwl/devkit';
import { updateJson } from '@nrwl/devkit';

export function updateTsConfig(tree: Tree) {
if (tree.exists('tsconfig.base.json')) {
updateJson(tree, 'tsconfig.base.json', (json) => {
json['compilerOptions'] = {
...json['compilerOptions'],
allowSyntheticDefaultImports: true,
strictNullChecks: true,
noImplicitOverride: true,
strictPropertyInitialization: true,
noImplicitReturns: true,
noFallthroughCasesInSwitch: true,
esModuleInterop: true,
noImplicitAny: false,
};
return json;
});
}
}

export function addScript(tree: Tree, projectName: string) {
updateJson(tree, 'package.json', (json) => {
json['scripts'] = {
...json['scripts'],
rucken: 'rucken',
nx: 'nx',
};
if (!json['scripts'][`serve:${projectName}-local`]) {
json['scripts'][
`serve:${projectName}-local`
] = `export $(xargs < ./.env.local) > /dev/null 2>&1 && npm run nx -- serve ${projectName}`;
}
return json;
});
}

export function addGitIgnoreEntry(host: Tree) {
if (host.exists('.gitignore')) {
let content = host.read('.gitignore', 'utf-8');

if (!content?.includes('*.env.*')) {
content = `${content}\n*.env.*\n`;
}
host.write('.gitignore', content);
} else {
host.write('.gitignore', `*.env.*\n`);
}
}

export function addEnvFilesEntry(host: Tree, botName: string) {
append('.env.local');
append('.env-example.local');

function append(filename: string) {
let content = '';
if (host.exists(filename)) {
content = host.read(filename, 'utf-8') || '';
}
const contentRows = content.split('\n');
const newRows: string[] = [];
const rows = [
`TELEGRAM_BOT_TOKEN=`,
`TELEGRAM_BOT_WEB_HOOKS_DOMAIN=`,
`TELEGRAM_BOT_WEB_HOOKS_PATH=`,
`TELEGRAM_BOT_ADMINS=`,
`BOT_NAMES=${botName}`,
];
for (
let contentRowindex = 0;
contentRowindex < contentRows.length;
contentRowindex++
) {
const contentRow = contentRows[contentRowindex];
for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
const row = rows[rowIndex];
if ((contentRow || '').split('=')[0] !== (row || '').split('=')[0]) {
newRows.push(row);
}
}
}
host.write(
filename,
[
...(contentRows.length === 1 && !contentRows[0] ? [] : contentRows),
...newRows,
].join('\n')
);
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update index file of init generator
libs/schematics/src/generators/init/lib/index.ts

```
export * from './add-custom';
export * from './add-dependencies';
export * from './normalize-options';

```

Enter fullscreen mode

Exit fullscreen mode

Update versions file
libs/schematics/src/utils/versions.ts

```
export const nxVersion = '*';

export const nestJsVersion7 = '^7.0.0';
export const nestJsVersion8 = '^8.0.0';

export const nestJsSchematicsVersion = '^8.0.0';

export const rxjsVersion6 = '~6.6.3';
export const rxjsVersion7 = '^7.0.0';

export const reflectMetadataVersion = '^0.1.13';

export const kaufmanBotVersion = '^2.2.2';

```

Enter fullscreen mode

Exit fullscreen mode

Update dependencies helper
libs/schematics/src/generators/init/lib/add-dependencies.ts

```
import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import { addDependenciesToPackageJson, readJson } from '@nrwl/devkit';
import { satisfies } from 'semver';
import {
kaufmanBotVersion,
nestJsSchematicsVersion,
nestJsVersion7,
nestJsVersion8,
nxVersion,
reflectMetadataVersion,
rxjsVersion6,
rxjsVersion7,
} from '../../../utils/versions';

export function addDependencies(tree: Tree): GeneratorCallback {
// Old nest 7 and rxjs 6 by default
let NEST_VERSION = nestJsVersion7;
let RXJS = rxjsVersion6;

const packageJson = readJson(tree, 'package.json');

if (packageJson.dependencies['@angular/core']) {
let rxjs = packageJson.dependencies['rxjs'];

if (rxjs.startsWith('~') || rxjs.startsWith('^')) {
rxjs = rxjs.substring(1);
}

if (satisfies(rxjs, rxjsVersion7)) {
NEST_VERSION = nestJsVersion8;
RXJS = packageJson.dependencies['rxjs'];
}
} else {
NEST_VERSION = nestJsVersion8;
RXJS = rxjsVersion7;
}

return addDependenciesToPackageJson(
tree,
{
'@nestjs/common': NEST_VERSION,
'@nestjs/core': NEST_VERSION,
'@nestjs/platform-express': NEST_VERSION,
'reflect-metadata': reflectMetadataVersion,
'@kaufman-bot/bot-in-groups-server': kaufmanBotVersion,
'@kaufman-bot/core-server': kaufmanBotVersion,
'@kaufman-bot/debug-messages-server': kaufmanBotVersion,
'@kaufman-bot/language-swither-server': kaufmanBotVersion,
'@kaufman-bot/short-commands-server': kaufmanBotVersion,
'@kaufman-bot/html-scraper-server': kaufmanBotVersion,
'@kaufman-bot/facts-generator-server': kaufmanBotVersion,
'@ngneat/transloco': '^4.0.0',
'@ngneat/transloco-locale': '^4.0.0',
'class-validator-multi-lang': '^0.130.201',
'class-transformer': '^0.5.1',
'class-transformer-global-storage': '^0.4.1-1',
'env-var': '^7.1.1',
'nestjs-telegraf': '^2.4.0',
'nestjs-translates': '^1.0.3',
rxjs: RXJS,
tslib: '^2.0.0',
},
{
'@nestjs/schematics': nestJsSchematicsVersion,
'@nestjs/testing': NEST_VERSION,
'@nrwl/nest': nxVersion,
'@ngneat/transloco-keys-manager': '^3.4.1',
"source-map-support": "^0.5.21",
rucken: '^3.5.3',
}
);
}

```

Enter fullscreen mode

Exit fullscreen mode

Update application generator helper
libs/schematics/src/generators/application/application.ts

```
import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import { convertNxGenerator, formatFiles } from '@nrwl/devkit';
import { applicationGenerator as nodeApplicationGenerator } from '@nrwl/node';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { initGenerator } from '../init/init';
import { addScript } from '../init/lib';
import {
createFiles,
normalizeOptions,
toNodeApplicationGeneratorOptions,
updateTsConfig,
} from './lib';
import type { ApplicationGeneratorOptions } from './schema';

export async function applicationGenerator(
tree: Tree,
rawOptions: ApplicationGeneratorOptions
): Promise<GeneratorCallback> {
const options = normalizeOptions(tree, rawOptions);
addScript(tree, rawOptions.name);
const initTask = await initGenerator(tree, {
botName: options.botName,
unitTestRunner: options.unitTestRunner,
skipFormat: true,
});
const nodeApplicationTask = await nodeApplicationGenerator(tree, {
...toNodeApplicationGeneratorOptions(options),
});
createFiles(tree, options);
updateTsConfig(tree, options);

if (!options.skipFormat) {
await formatFiles(tree);
}

return runTasksInSerial(initTask, nodeApplicationTask);
}

export default applicationGenerator;

export const applicationSchematic = convertNxGenerator(applicationGenerator);

```

Enter fullscreen mode

Exit fullscreen mode

Update init helper
libs/schematics/src/generators/init/init.ts

```
import type { GeneratorCallback, Tree } from '@nrwl/devkit';
import { convertNxGenerator, formatFiles } from '@nrwl/devkit';
import { initGenerator as nodeInitGenerator } from '@nrwl/node';
import { runTasksInSerial } from '@nrwl/workspace/src/utilities/run-tasks-in-serial';
import { setDefaultCollection } from '@nrwl/workspace/src/utilities/set-default-collection';
import {
addDependencies,
addEnvFilesEntry,
addGitIgnoreEntry,
normalizeOptions,
updateTsConfig,
} from './lib';
import type { InitGeneratorOptions } from './schema';

export async function initGenerator(
tree: Tree,
rawOptions: InitGeneratorOptions
): Promise<GeneratorCallback> {
const options = normalizeOptions(rawOptions);
setDefaultCollection(tree, '@kaufman-bot/schematics');
updateTsConfig(tree);
addGitIgnoreEntry(tree);
addEnvFilesEntry(tree, options.botName);
const nodeInitTask = await nodeInitGenerator(tree, options);
const installPackagesTask = addDependencies(tree);

if (!options.skipFormat) {
await formatFiles(tree);
}

return runTasksInSerial(nodeInitTask, installPackagesTask);
}

export default initGenerator;

export const initSchematic = convertNxGenerator(initGenerator);

```

Enter fullscreen mode

Exit fullscreen mode

Create public.ts
libs/schematics/src/public.ts

```
export { applicationGenerator } from './generators/application/application';
export { initGenerator } from './generators/init/init';
export { libraryGenerator } from './generators/library/library';

```

Enter fullscreen mode

Exit fullscreen mode

Update package.json
libs/schematics/package.json

```
{
"name": "@kaufman-bot/schematics",
"description": "The Nx Plugin for Nest that contains executors and generators for allowing your workspace to create KaufmanBot APIs.",
"license": "MIT",
"author": "EndyKaufman <admin@site15.ru>",
"keywords": [
"Monorepo",
"Node",
"Nest",
"CLI",
"kaufman-bot",
"nx",
"schematics",
"nests",
"telegram"
],
"bugs": {
"url": "https://github.com/EndyKaufman/kaufman-bot/issues"
},
"homepage": "https://github.com/EndyKaufman/kaufman-bot",
"repository": {
"type": "git",
"url": "git+https://github.com/EndyKaufman/kaufman-bot.git"
},
"maintainers": [
{
"name": "EndyKaufman",
"email": "admin@site15.ru"
}
],
"readme": "README.md",
"main": "./index.js",
"typings": "./index.d.ts",
"schematics": "./generators.json",
"dependencies": {
"@nrwl/devkit": "13.8.1",
"@nrwl/linter": "13.8.1",
"@nrwl/node": "13.8.1",
"@nrwl/js": "^13.10.2",
"@nrwl/jest": "13.8.1",
"@nestjs/schematics": "^8.0.0"
},
"version": "2.2.2",
"i18n": [
{
"scope": "schematics",
"path": "src/i18n",
"strategy": "join"
}
]
}

```

Enter fullscreen mode

Exit fullscreen mode

Update project.json file
libs/schematics/project.json

```
{
"root": "libs/schematics",
"sourceRoot": "libs/schematics",
"projectType": "library",
"targets": {
"test": {
"executor": "@nrwl/jest:jest",
"options": {
"jestConfig": "libs/schematics/jest.config.js",
"passWithNoTests": true
},
"outputs": ["coverage/libs/schematics"]
},
"build": {
"executor": "@nrwl/js:tsc",
"options": {
"outputPath": "dist/libs/schematics",
"tsConfig": "libs/schematics/tsconfig.lib.json",
"main": "libs/schematics/index.ts",
"updateBuildableProjectDepsInPackageJson": false,
"assets": [
{
"input": "libs/schematics",
"glob": "**/files/**",
"output": "/"
},
{
"input": "libs/schematics",
"glob": "**/files/**/.gitkeep",
"output": "/"
},
{
"input": "libs/schematics",
"glob": "**/*.json",
"ignore": ["**/tsconfig*.json", "project.json"],
"output": "/"
},
{
"input": "libs/schematics",
"glob": "**/*.js",
"ignore": ["**/jest.config.js"],
"output": "/"
},
{
"input": "libs/schematics",
"glob": "**/*.d.ts",
"output": "/"
},
{
"input": "",
"glob": "LICENSE",
"output": "/"
},
{
"input": "libs/schematics",
"glob": "**/*.md",
"output": "/"
}
]
},
"outputs": ["{options.outputPath}"]
},
"lint": {
"executor": "@nrwl/linter:eslint",
"options": {
"lintFilePatterns": [
"libs/schematics/**/*.ts",
"libs/schematics/**/*.spec.ts",
"libs/schematics/**/*_spec.ts",
"libs/schematics/**/*.spec.tsx",
"libs/schematics/**/*.spec.js",
"libs/schematics/**/*.spec.jsx",
"libs/schematics/**/*.d.ts"
]
},
"outputs": ["{options.outputFile}"]
}
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Install need dependencies in root project

npm i --save-dev @nrwl/js @nrwl/devkit

Add custom config for rucken tools for exclude folders from generated index file
rucken.json

```
{
"makeTsList": {
"indexFileName": "index",
"excludes": [
"*node_modules*",
"*public_api.ts*",
"*.spec*",
"environment*",
"*test*",
"*e2e*",
"*.stories.ts",
"*.d.ts",
"*files*",
"*generators*",
"*utils*"
]
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Update options of init generator
libs/schematics/src/generators/init/lib/normalize-options.ts

```
import type { InitGeneratorOptions } from '../schema';

export function normalizeOptions(
options: InitGeneratorOptions
): InitGeneratorOptions & Pick<Required<InitGeneratorOptions>, 'botName'> {
return {
...options,
unitTestRunner: options.unitTestRunner ?? 'jest',
botName: options.botName ?? 'Bot',
};
}

```

Enter fullscreen mode

Exit fullscreen mode

Update schema types of init generator
libs/schematics/src/generators/init/schema.d.ts

```
import { UnitTestRunner } from '../utils';

export interface InitGeneratorOptions {
botName?: string;
skipFormat?: boolean;
unitTestRunner?: UnitTestRunner;
}

```

Enter fullscreen mode

Exit fullscreen mode

Update schema json on init generator
libs/schematics/src/generators/init/schema.json

```
{
"$schema": "http://json-schema.org/schema",
"$id": "NxNestInitGenerator",
"title": "Init Nest Plugin",
"description": "Init Nest Plugin.",
"cli": "nx",
"type": "object",
"properties": {
"botName": {
"description": "Bot name.",
"type": "string",
"default": "Bot"
},
"unitTestRunner": {
"description": "Adds the specified unit test runner.",
"type": "string",
"enum": ["jest", "none"],
"default": "jest"
},
"skipFormat": {
"description": "Skip formatting files.",
"type": "boolean",
"default": false
}
},
"additionalProperties": false,
"required": []
}

```

Enter fullscreen mode

Exit fullscreen mode

Update application options
libs/schematics/src/generators/application/lib/normalize-options.ts

```
import type { Tree } from '@nrwl/devkit';
import { getWorkspaceLayout, joinPathFragments, names } from '@nrwl/devkit';
import { Linter } from '@nrwl/linter';
import type { Schema as NodeApplicationGeneratorOptions } from '@nrwl/node/src/generators/application/schema';
import type { ApplicationGeneratorOptions, NormalizedOptions } from '../schema';

export function normalizeOptions(
tree: Tree,
options: ApplicationGeneratorOptions
): NormalizedOptions {
const appDirectory = options.directory
? `${names(options.directory).fileName}/${names(options.name).fileName}`
: names(options.name).fileName;

const appProjectRoot = joinPathFragments(
getWorkspaceLayout(tree).appsDir,
appDirectory
);

return {
...options,
appProjectRoot,
linter: options.linter ?? Linter.EsLint,
unitTestRunner: options.unitTestRunner ?? 'jest',
botName: options.botName,
};
}

export function toNodeApplicationGeneratorOptions(
options: NormalizedOptions
): NodeApplicationGeneratorOptions {
return {
name: options.name,
directory: options.directory,
frontendProject: options.frontendProject,
linter: options.linter,
skipFormat: true,
skipPackageJson: options.skipPackageJson,
standaloneConfig: options.standaloneConfig,
tags: options.tags,
unitTestRunner: options.unitTestRunner,
setParserOptionsProject: options.setParserOptionsProject,
};
}

```

Enter fullscreen mode

Exit fullscreen mode

Update application schema type
libs/schematics/src/generators/application/schema.d.ts

```
import { Linter } from '@nrwl/linter';
import { UnitTestRunner } from '../../utils/test-runners';

export interface ApplicationGeneratorOptions {
name: string;
directory?: string;
frontendProject?: string;
linter?: Exclude<Linter, Linter.TsLint>;
skipFormat?: boolean;
skipPackageJson?: boolean;
standaloneConfig?: boolean;
tags?: string;
unitTestRunner?: UnitTestRunner;
setParserOptionsProject?: boolean;
botName?: string;
}

interface NormalizedOptions extends ApplicationGeneratorOptions {
appProjectRoot: Path;
}

```

Enter fullscreen mode

Exit fullscreen mode

Update application schema json
libs/schematics/src/generators/application/schema.json

```
{
"$schema": "http://json-schema.org/schema",
"$id": "NxNestKaufmanBotApplicationGenerator",
"title": "Nx Nest KaufmanBot Application Options Schema",
"description": "Nx Nest KaufmanBot Application Options Schema.",
"cli": "nx",
"type": "object",
"properties": {
"name": {
"description": "The name of the application.",
"type": "string",
"$default": {
"$source": "argv",
"index": 0
},
"x-prompt": "What name would you like to use for the node application?"
},
"botName": {
"description": "Bot name.",
"type": "string",
"default": "Bot"
},
"directory": {
"description": "The directory of the new application.",
"type": "string"
},
"skipFormat": {
"description": "Skip formatting files.",
"type": "boolean",
"default": false
},
"skipPackageJson": {
"description": "Do not add dependencies to `package.json`.",
"type": "boolean",
"default": false
},
"linter": {
"description": "The tool to use for running lint checks.",
"type": "string",
"enum": ["eslint", "none"],
"default": "eslint"
},
"unitTestRunner": {
"description": "Test runner to use for unit tests.",
"type": "string",
"enum": ["jest", "none"],
"default": "jest"
},
"tags": {
"description": "Add tags to the application (used for linting).",
"type": "string"
},
"frontendProject": {
"description": "Frontend project that needs to access this application. This sets up proxy configuration.",
"type": "string"
},
"standaloneConfig": {
"description": "Split the project configuration into `<projectRoot>/project.json` rather than including it inside `workspace.json`.",
"type": "boolean"
},
"setParserOptionsProject": {
"type": "boolean",
"description": "Whether or not to configure the ESLint `parserOptions.project` option. We do not do this by default for lint performance reasons.",
"default": false
}
},
"additionalProperties": false,
"required": ["name"]
}
```

Enter fullscreen mode

Exit fullscreen mode

Update export to barrel
libs/schematics/src/generators/library/lib/add-exports-to-barrel.ts

```
import type { Tree } from '@nrwl/devkit';
import {
addGlobal,
removeChange,
} from '@nrwl/workspace/src/utilities/ast-utils';
import * as ts from 'typescript';
import type { NormalizedOptions } from '../schema';

export function addExportsToBarrelFile(
tree: Tree,
options: NormalizedOptions
): void {
const indexPath = `${options.projectRoot}/src/index.ts`;
const indexContent = tree.read(indexPath, 'utf-8');
let sourceFile = ts.createSourceFile(
indexPath,
indexContent || '',
ts.ScriptTarget.Latest,
true
);

sourceFile = removeChange(
tree,
sourceFile,
indexPath,
0,
`export * from './lib/${options.fileName}';`
);

sourceFile = addGlobal(
tree,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
sourceFile,
indexPath,
`export * from './lib/${options.fileName}.module';`
);
}

```

Enter fullscreen mode

Exit fullscreen mode

Update create files
libs/schematics/src/generators/library/lib/create-files.ts

```
import type { Tree } from '@nrwl/devkit';
import {
generateFiles,
joinPathFragments,
names,
offsetFromRoot,
} from '@nrwl/devkit';
import type { NormalizedOptions } from '../schema';

function capitalizeFirstLetter(text: string | undefined, locale: string) {
const [first, ...rest] = (text || '').trim();
return (first || '').toLocaleUpperCase(locale) + rest.join('');
}

export function createFiles(tree: Tree, options: NormalizedOptions): void {
const substitutions = {
...options,
...names(options.projectName),
titleName: names(options.projectName).fileName.split('-').join(' '),
TitleName: capitalizeFirstLetter(
names(options.projectName).fileName.split('-').join(' '),
'en'
),
tmpl: '',
offsetFromRoot: offsetFromRoot(options.projectRoot),
};
generateFiles(
tree,
joinPathFragments(__dirname, '..', 'files', 'common'),
options.projectRoot,
substitutions
);

generateFiles(
tree,
joinPathFragments(__dirname, '..', 'files', 'service'),
options.projectRoot,
substitutions
);
}

```

Enter fullscreen mode

Exit fullscreen mode

Update options
libs/schematics/src/generators/library/lib/normalize-options.ts

```
import type { Tree } from '@nrwl/devkit';
import {
generateFiles,
joinPathFragments,
names,
offsetFromRoot,
} from '@nrwl/devkit';
import type { NormalizedOptions } from '../schema';

function capitalizeFirstLetter(text: string | undefined, locale: string) {
const [first, ...rest] = (text || '').trim();
return (first || '').toLocaleUpperCase(locale) + rest.join('');
}

export function createFiles(tree: Tree, options: NormalizedOptions): void {
const substitutions = {
...options,
...names(options.projectName),
titleName: names(options.projectName).fileName.split('-').join(' '),
TitleName: capitalizeFirstLetter(
names(options.projectName).fileName.split('-').join(' '),
'en'
),
tmpl: '',
offsetFromRoot: offsetFromRoot(options.projectRoot),
};
generateFiles(
tree,
joinPathFragments(__dirname, '..', 'files', 'common'),
options.projectRoot,
substitutions
);

generateFiles(
tree,
joinPathFragments(__dirname, '..', 'files', 'service'),
options.projectRoot,
substitutions
);
}

```

Enter fullscreen mode

Exit fullscreen mode

Update library schema types
libs/schematics/src/generators/library/schema.d.ts

```
import { Linter } from '@nrwl/linter';
import { UnitTestRunner } from '../utils';

export interface LibraryGeneratorOptions {
name: string;
buildable?: boolean;
directory?: string;
importPath?: string;
linter?: Exclude<Linter, Linter.TsLint>;
publishable?: boolean;
skipFormat?: boolean;
skipTsConfig?: boolean;
strict?: boolean;
tags?: string;
target?:
| 'es5'
| 'es6'
| 'esnext'
| 'es2015'
| 'es2016'
| 'es2017'
| 'es2018'
| 'es2019'
| 'es2020';
testEnvironment?: 'jsdom' | 'node';
unitTestRunner?: UnitTestRunner;
standaloneConfig?: boolean;
setParserOptionsProject?: boolean;
}

export interface NormalizedOptions extends LibraryGeneratorOptions {
fileName: string;
parsedTags: string[];
prefix: string;
projectDirectory: string;
projectName: string;
projectRoot: Path;
}

```

Enter fullscreen mode

Exit fullscreen mode

Update all index files and translate

npm run  generate

## 

Check logic of work with @kaufman-bot/schematics

--

### 

Create empty nx project

npx -y create-nx-workspace@13.8.1 --name=kaufman-bot-generated --preset=empty --interactive=false --nx-cloud=false

```
endy@endy-virtual-machine:~/Projects/current$ npx -y create-nx-workspace@13.8.1 --name=kaufman-bot-generated --preset=empty --interactive=false --nx-cloud=false

>  NX   Nx is creating your v13.8.1 workspace.

To make sure the command works reliably in all environments, and that the preset is applied correctly,
Nx will run "npm install" several times. Please wait.

✔ Installing dependencies with npm
✔ Nx has successfully created the workspace.

———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  NX   First time using Nx? Check out this interactive Nx tutorial.

https://nx.dev/getting-started/nx-core
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Go to created project

cd kaufman-bot-generated

--

### 

Add all need schematics

npm install -D @nrwl/nest@13.8.1 @kaufman-bot/schematics@2.4.0

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npm install -D @nrwl/nest@13.8.1 @kaufman-bot/schematics@2.4.0

added 162 packages, and audited 567 packages in 12s

54 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create kaufman-bot application

npx -y nx@13.8.1 g @kaufman-bot/schematics:app adam-bot --bot-name adam

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npx -y nx@13.8.1 g @kaufman-bot/schematics:app adam-bot --bot-name adam
UPDATE package.json
UPDATE nx.json
UPDATE tsconfig.base.json
UPDATE .gitignore
CREATE .env.local
CREATE .env-example.local
CREATE jest.config.js
CREATE jest.preset.js
UPDATE .vscode/extensions.json
CREATE apps/adam-bot/src/app/.gitkeep
CREATE apps/adam-bot/src/assets/.gitkeep
CREATE apps/adam-bot/src/environments/environment.prod.ts
CREATE apps/adam-bot/src/environments/environment.ts
CREATE apps/adam-bot/src/main.ts
CREATE apps/adam-bot/tsconfig.app.json
CREATE apps/adam-bot/tsconfig.json
CREATE apps/adam-bot/project.json
UPDATE workspace.json
CREATE .eslintrc.json
CREATE apps/adam-bot/.eslintrc.json
CREATE apps/adam-bot/jest.config.js
CREATE apps/adam-bot/tsconfig.spec.json
CREATE apps/adam-bot/src/app/app.module.ts
CREATE apps/adam-bot/src/app/app.service.ts

added 343 packages, removed 1 package, changed 1 package, and audited 909 packages in 37s

102 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities

up to date, audited 909 packages in 2s

102 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create telegram bot in @botfather

--

### 

Append token to env file

.env.local

```
TELEGRAM_BOT_TOKEN=5384981645:AAEKAfqNpZmoN1w5eQL2QxJtvY5h3O-71Zs
TELEGRAM_BOT_WEB_HOOKS_DOMAIN=
TELEGRAM_BOT_WEB_HOOKS_PATH=
TELEGRAM_BOT_ADMINS=
BOT_NAMES=adam
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Check from telegram

npm run serve:adam-bot-local

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npm run serve:adam-bot-local

> kaufman-bot-generated@0.0.0 serve:adam-bot-local
> export $(xargs < ./.env.local) > /dev/null 2>&1 && npm run nx -- serve adam-bot

> kaufman-bot-generated@0.0.0 nx
> nx "serve" "adam-bot"

> nx run adam-bot:serve

chunk (runtime: main) main.js (main) 10.1 KiB [entry] [rendered]
webpack compiled successfully (3e915c7195348378)
Debugger listening on ws://localhost:9229/045c9820-61d9-42b1-a3b5-57dc00299eea
For help, see: https://nodejs.org/en/docs/inspector
Issues checking in progress...
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [NestFactory] Starting Nest application...
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] TelegrafModule dependencies initialized +49ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] DebugMessagesModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] DebugMessagesModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] TranslatesModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] CustomInjectorModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] LanguageSwitherModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] LanguageSwitherModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] FactsGeneratorModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] DiscoveryModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] CustomInjectorCoreModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] TranslatesModuleCore dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] TranslatesModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] BotCommandsModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] BotCommandsModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] ShortCommandsModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] ScraperModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] ScraperModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] CustomInjectorModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] CustomInjectorModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] ShortCommandsModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] BotInGroupsModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] CustomInjectorModule dependencies initialized +0ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] CustomInjectorModule dependencies initialized +1ms
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [InstanceLoader] AppModule dependencies initialized +0ms
No issues found.
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [InstanceLoader] TelegrafCoreModule dependencies initialized +2985ms
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [TranslatesBootstrapService] onModuleInit
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [TranslatesStorage] Add 1 translates for locale: en
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [NestApplication] Nest application successfully started +2ms
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [Application] 🚀 Application is running on: http://localhost:3333
```

Enter fullscreen mode

Exit fullscreen mode

Search new bot

Start work with bot

Example of run commands

--

### 

Create new command

npm run nx -- g @kaufman-bot/schematics:lib super

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npm run nx -- g @kaufman-bot/schematics:lib super

> kaufman-bot-generated@0.0.0 nx
> nx "g" "@kaufman-bot/schematics:lib" "super"

CREATE libs/super/README.md
CREATE libs/super/src/index.ts
CREATE libs/super/tsconfig.json
CREATE libs/super/tsconfig.lib.json
CREATE libs/super/project.json
UPDATE workspace.json
UPDATE tsconfig.base.json
CREATE libs/super/.eslintrc.json
CREATE libs/super/jest.config.js
CREATE libs/super/tsconfig.spec.json
CREATE libs/super/src/lib/super.module.ts
CREATE libs/super/src/lib/super.service.ts
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update app module

apps/adam-bot/src/app/app.module.ts

```
import { SuperModule } from '@kaufman-bot-generated/super';
...

@Module({
imports: [
...
SuperModule.forRoot(),
],
providers: [AppService],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Restart application and check work in telegram

--

### 

Generated commands service

libs/super/src/lib/super.service.ts

```
import {
BotCommandsEnum,
BotCommandsProvider,
BotCommandsProviderActionMsg,
BotCommandsProviderActionResultType,
BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService } from 'nestjs-translates';

export const SUPER_CONFIG = 'SUPER_CONFIG';

export interface SuperConfig {
title: string;
name: string;
descriptions: string;
usage: string[];
spyWords: string[];
category: string;
}

@Injectable()
export class SuperService implements BotCommandsProvider {
private readonly logger = new Logger(SuperService.name);

constructor(
@Inject(SUPER_CONFIG)
private readonly superConfig: SuperConfig,
private readonly translatesService: TranslatesService,
private readonly commandToolsService: BotCommandsToolsService,
private readonly botCommandsToolsService: BotCommandsToolsService
) {}

async onHelp<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
return await this.onMessage({
...msg,
text: `${this.superConfig.name} ${BotCommandsEnum.help}`,
});
}

async onMessage<
TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
>(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
const locale = this.botCommandsToolsService.getLocale(msg, 'en');

const spyWord = this.superConfig.spyWords.find((spyWord) =>
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
message: msg,
markdown: this.commandToolsService.generateHelpMessage(msg, {
locale,
name: this.superConfig.title,
descriptions: this.superConfig.descriptions,
usage: this.superConfig.usage,
category: this.superConfig.category,
}),
};
}

const processedMsg = await this.process(msg, locale);

if (typeof processedMsg === 'string') {
return {
type: 'text',
message: msg,
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
>(msg: TMsg, locale: string) {
if (
this.commandToolsService.checkCommands(
msg.text,
[getText('ping')],
locale
)
) {
return this.translatesService.translate(getText('pong'), locale);
}
return null;
}
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Generated commands module

libs/super/src/lib/super.module.ts

```
import {
BotCommandsCategory,
BotCommandsModule,
BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core-server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import { SuperService, SuperConfig, SUPER_CONFIG } from './super.service';

@Module({
imports: [TranslatesModule, BotCommandsModule],
exports: [TranslatesModule, BotCommandsModule],
})
export class SuperModule {
static forRoot(): DynamicModule {
return {
module: SuperModule,
providers: [
{
provide: SUPER_CONFIG,
useValue: <SuperConfig>{
title: getText('Super commands'),
name: 'super',
usage: [getText('super ping'), getText('super help')],
descriptions: getText('Commands for super'),
spyWords: [getText('super')],
category: BotCommandsCategory.user,
},
},
{
provide: BOT_COMMANDS_PROVIDER,
useClass: SuperService,
},
],
exports: [SUPER_CONFIG],
};
}
}

```

Enter fullscreen mode

Exit fullscreen mode

Generated files your may look in https://github.com/kaufman-bot/schematics-example

In next post I append menu for quick run commands for bot...

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