Add env-var, lint-staged and etc. for nx workspace

# Add env-var, lint-staged and etc. for nx workspace

Published: 2022-02-13T16:15:43.471Z
Tags: kaufmanbot, env, lintstaged, rucken
[Original Article](https://dev.to/endykaufman/add-env-var-lint-staged-and-etc-for-nx-workspace-1897)

**Description from API:**
Add env-var    npm i --save...

## 

Add env-var

npm i --save env-var

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save env-var

added 1 package, and audited 759 packages in 3s

77 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Add lint-staged

npx mrm@2 lint-staged

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npx mrm@2 lint-staged
Running lint-staged...
Update package.json
Installing lint-staged and husky...

added 30 packages, and audited 789 packages in 5s

92 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
husky - Git hooks installed
husky - created .husky/pre-commit
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Add rucken

npm i --save-dev rucken

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save-dev rucken

added 84 packages, removed 5 packages, and audited 868 packages in 21s

105 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Update package.json

Update scripts sections

```
"scripts": {
"rucken": "rucken",
"nx": "nx",
"start": "node dist/apps/server/main.js",
"build": "npm run nx -- build server",
"test": "nx test",
"serve": "npm run nx -- serve server",
"serve:local": "export $(xargs < ./.env.local) && npm run serve",
"prepare": "husky install",
"lint": "npm run tsc:lint && nx workspace-lint && npm run nx -- run-many --target=lint --all",
"lint:fix": "npm run tsc:lint && nx workspace-lint --fix && nx run-many --target=lint --all --fix && nx format:write --all",
"tsc:lint": "tsc --noEmit -p tsconfig.base.json",
"generate": "npm run rucken -- prepare && npm run lint:fix"
},
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Update lint-staged section

```
"lint-staged": {
"*.{js,ts}": "eslint --fix",
"*.{js,ts,css,scss,md}": "prettier --ignore-unknown --write"
}
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Update tsconfig.base.json

```
{
"compileOnSave": false,
"compilerOptions": {
"rootDir": ".",
"sourceMap": true,
"declaration": false,
"moduleResolution": "node",
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"importHelpers": true,
"target": "es2015",
"module": "esnext",
"lib": ["es2017", "dom"],
"skipLibCheck": true,
"skipDefaultLibCheck": true,
"baseUrl": ".",
"allowSyntheticDefaultImports": true,
"strictNullChecks": true,
"noImplicitOverride": true,
"strictPropertyInitialization": true,
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true,
"esModuleInterop": true,
"noImplicitAny": false,
"paths": {
"@kaufman-bot/core/server": ["libs/core/server/src/index.ts"]
}
},
"exclude": ["node_modules", "tmp"]
}
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Change work with env in code

Update main.ts

```
/**
* This is not a production server yet!
* This is only a minimal backend to get started.
*/

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import env from 'env-var';
import { AppModule } from './app/app.module';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
const globalPrefix = 'api';
app.setGlobalPrefix(globalPrefix);
const port = env.get('PORT').default(3333).asPortNumber();
await app.listen(port);
Logger.log(
`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
);
}

bootstrap();
```

Enter fullscreen mode

Exit fullscreen mode

Update app.module.ts

```
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
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Run generate

npm run generate

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run generate

> kaufman-bot@0.0.0 generate
> npm run rucken -- prepare && npm run lint:fix

> kaufman-bot@0.0.0 rucken
> rucken "prepare"

[2022-02-13T19:52:47.639] [INFO] MakeTsListService: prepare - Start create list files...
[2022-02-13T19:52:47.641] [INFO] MakeTsListService: prepare - Config: {"indexFileName":"index","excludes":["*node_modules*","*public_api.ts*","*.spec*","environment*","*test*","*e2e*","*.stories.ts","*.d.ts"]}
[2022-02-13T19:52:47.641] [DEBUG] MakeTsListService: prepare - Process library "core-server" in libs/core/server/src
[2022-02-13T19:52:47.642] [INFO] MakeTsListService: prepare - End of create list files...
[2022-02-13T19:52:47.643] [INFO] VersionUpdaterService: prepare - Start update versions...
[2022-02-13T19:52:47.643] [INFO] VersionUpdaterService: prepare - Config: {"updatePackageVersion":true}
[2022-02-13T19:52:47.643] [DEBUG] VersionUpdaterService: prepare - Process project "core-server" in libs/core/server
[2022-02-13T19:52:47.644] [INFO] VersionUpdaterService: prepare - Start for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"libs/core/server/package.json"}
[2022-02-13T19:52:47.645] [INFO] VersionUpdaterService: prepare - End of for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"libs/core/server/package.json"}
[2022-02-13T19:52:47.645] [DEBUG] VersionUpdaterService: prepare - Process project "server" in apps/server
[2022-02-13T19:52:47.645] [INFO] VersionUpdaterService: prepare - Start for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"apps/server/package.json"}
[2022-02-13T19:52:47.646] [INFO] VersionUpdaterService: prepare - Error Wrong body of file apps/server/package.json
[2022-02-13T19:52:47.646] [INFO] VersionUpdaterService: prepare - End of for {"rootConfigPath":"/home/endy/Projects/current/kaufman-bot/package.json","appConfigPath":"apps/server/package.json"}
[2022-02-13T19:52:47.646] [INFO] VersionUpdaterService: prepare - End of update versions...
[2022-02-13T19:52:47.646] [INFO] Extracti18nService: prepare - Start create translate files...
[2022-02-13T19:52:47.646] [INFO] Extracti18nService: prepare - Config: {"locales":["en"],"markers":["getText","dictionary"]}
[2022-02-13T19:52:47.647] [INFO] Extracti18nService: prepare - Process applications...
[2022-02-13T19:52:47.647] [DEBUG] Extracti18nService: prepare - server apps/server/src
[2022-02-13T19:52:48.765] [INFO] Extracti18nService: prepare - Process libraries...
[2022-02-13T19:52:48.766] [DEBUG] Extracti18nService: prepare - core-server libs/core/server/src
[2022-02-13T19:52:50.428] [INFO] Extracti18nService: prepare - End of create translate files...
[2022-02-13T19:52:50.429] [INFO] GettextService: prepare - Start create translate files...
[2022-02-13T19:52:50.429] [INFO] GettextService: prepare - Config: {"po2jsonOptions":{"format":"mf"},"pattern":"**/*.@(ts|js|tsx|jsx)","locales":["en"],"defaultLocale":"en","markers":["getText","dictionary"]}
[2022-02-13T19:52:50.430] [DEBUG] GettextService: prepare - core-server libs/core/server/src
[2022-02-13T19:52:50.468] [DEBUG] GettextService: prepare - server apps/server/src
[2022-02-13T19:52:50.506] [INFO] GettextService: prepare - End of create translate files...
[2022-02-13T19:52:50.507] [INFO] Extracti18nService: prepare - Start create translate files...
[2022-02-13T19:52:50.508] [INFO] Extracti18nService: prepare - Config: {"locales":["en"],"markers":["getText","dictionary"]}
[2022-02-13T19:52:50.509] [INFO] Extracti18nService: prepare - Process applications...
[2022-02-13T19:52:50.509] [DEBUG] Extracti18nService: prepare - server apps/server/src
[2022-02-13T19:52:51.640] [INFO] Extracti18nService: prepare - Process libraries...
[2022-02-13T19:52:51.640] [DEBUG] Extracti18nService: prepare - core-server libs/core/server/src
[2022-02-13T19:52:53.296] [INFO] Extracti18nService: prepare - End of create translate files...

> kaufman-bot@0.0.0 lint:fix
> npm run tsc:lint && nx workspace-lint --fix && nx run-many --target=lint --all --fix && nx format:write --all

> kaufman-bot@0.0.0 tsc:lint
> tsc --noEmit -p tsconfig.base.json

✔  nx run core-server:lint (1s)
✔  nx run server:lint  [local cache]

—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

>  NX   Successfully ran target lint for 2 projects (2s)

With additional flags:
--fix=true

Nx read the output from the cache instead of running the command for 1 out of 2 tasks.

>  NX   Running affected:* commands with --all can result in very slow builds.

--all is not meant to be used for any sizable project or to be used in CI.

Learn more about checking only what is affected: https://nx.dev/latest/angular/cli/affected#affected.

.eslintrc.json 26ms
.prettierrc 22ms
.vscode/extensions.json 3ms
apps/server/.eslintrc.json 6ms
apps/server/jest.config.js 14ms
apps/server/project.json 6ms
apps/server/src/app/app.controller.spec.ts 40ms
apps/server/src/app/app.controller.ts 11ms
apps/server/src/app/app.module.ts 9ms
apps/server/src/app/app.service.spec.ts 13ms
apps/server/src/app/app.service.ts 25ms
apps/server/src/assets/i18n/en.json 4ms
apps/server/src/assets/i18n/en.vendor.json 4ms
apps/server/src/environments/environment.prod.ts 4ms
apps/server/src/environments/environment.ts 5ms
apps/server/src/main.ts 21ms
apps/server/tsconfig.app.json 7ms
apps/server/tsconfig.json 4ms
apps/server/tsconfig.spec.json 4ms
jest.config.js 7ms
jest.preset.js 5ms
libs/core/server/.babelrc 3ms
libs/core/server/.eslintrc.json 5ms
libs/core/server/jest.config.js 5ms
libs/core/server/package.json 3ms
libs/core/server/project.json 6ms
libs/core/server/README.md 39ms
libs/core/server/src/i18n/en.json 2ms
libs/core/server/src/index.ts 4ms
libs/core/server/src/lib/core-server.module.ts 7ms
libs/core/server/tsconfig.json 3ms
libs/core/server/tsconfig.lib.json 3ms
libs/core/server/tsconfig.spec.json 4ms
migrations.json 6ms
nx.json 6ms
package-lock.json 352ms
package.json 42ms
README.md 36ms
STEPS.md 98ms
tools/tsconfig.tools.json 5ms
transloco.config.js 10ms
transloco.config.json 5ms
tsconfig.base.json 3ms
workspace.json 5ms
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Commit changes

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