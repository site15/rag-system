Publish all the libraries in Telegram bot on NestJS to the npm registry

# Publish all the libraries in Telegram bot on NestJS to the npm registry

Published: 2022-04-17T16:44:54.423Z
Tags: kaufmanbot, nestjs, npm, publish
[Original Article](https://dev.to/endykaufman/publish-all-the-libraries-in-telegram-bot-on-nestjs-to-the-npm-registry-2gj6)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Description of work

In this post, I publish all the libraries in the npm registry.

And I will show how to update the libraries to prepare them for publication, I will write the steps for only one of the libraries, the steps for the others are the same.

## 

Change names of libraries

Because npm register only works with two levels in the name path, we have to update all names for it.

Replace in all libarries

npx -y replace-in-files-cli --string=@kaufman-bot/core/server --replacement=@kaufman-bot/core './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/bot-in-groups/server --replacement=@kaufman-bot/bot-in-groups-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/currency-converter/server --replacement=@kaufman-bot/currency-converter-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/debug-messages/server --replacement=@kaufman-bot/debug-messages-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/dialogflow/server --replacement=@kaufman-bot/dialogflow-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/facts-generator/server --replacement=@kaufman-bot/facts-generator-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/first-meeting/server --replacement=@kaufman-bot/first-meeting-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/html-scraper/server --replacement=@kaufman-bot/html-scraper-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/jokes-generator/server --replacement=@kaufman-bot/jokes-generator-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/language-swither/server --replacement=@kaufman-bot/language-swither-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/prisma/server --replacement=@kaufman-bot/prisma-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/quotes-generator/server --replacement=@kaufman-bot/quotes-generator-server './libs/**'

npx -y replace-in-files-cli --string=@kaufman-bot/short-commands/server --replacement=@kaufman-bot/short-commands-server './libs/**'

Replace in all applications

npx -y replace-in-files-cli --string=@kaufman-bot/core/server --replacement=@kaufman-bot/core './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/bot-in-groups/server --replacement=@kaufman-bot/bot-in-groups-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/currency-converter/server --replacement=@kaufman-bot/currency-converter-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/debug-messages/server --replacement=@kaufman-bot/debug-messages-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/dialogflow/server --replacement=@kaufman-bot/dialogflow-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/facts-generator/server --replacement=@kaufman-bot/facts-generator-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/first-meeting/server --replacement=@kaufman-bot/first-meeting-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/html-scraper/server --replacement=@kaufman-bot/html-scraper-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/jokes-generator/server --replacement=@kaufman-bot/jokes-generator-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/language-swither/server --replacement=@kaufman-bot/language-swither-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/prisma/server --replacement=@kaufman-bot/prisma-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/quotes-generator/server --replacement=@kaufman-bot/quotes-generator-server './apps/**'

npx -y replace-in-files-cli --string=@kaufman-bot/short-commands/server --replacement=@kaufman-bot/short-commands-server './apps/**'

Replace in tsc config

npx -y replace-in-files-cli --string=@kaufman-bot/core/server --replacement=@kaufman-bot/core './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/bot-in-groups/server --replacement=@kaufman-bot/bot-in-groups-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/currency-converter/server --replacement=@kaufman-bot/currency-converter-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/debug-messages/server --replacement=@kaufman-bot/debug-messages-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/dialogflow/server --replacement=@kaufman-bot/dialogflow-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/facts-generator/server --replacement=@kaufman-bot/facts-generator-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/first-meeting/server --replacement=@kaufman-bot/first-meeting-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/html-scraper/server --replacement=@kaufman-bot/html-scraper-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/jokes-generator/server --replacement=@kaufman-bot/jokes-generator-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/language-swither/server --replacement=@kaufman-bot/language-swither-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/prisma/server --replacement=@kaufman-bot/prisma-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/quotes-generator/server --replacement=@kaufman-bot/quotes-generator-server './tsconfig.base.json'

npx -y replace-in-files-cli --string=@kaufman-bot/short-commands/server --replacement=@kaufman-bot/short-commands-server './tsconfig.base.json'

## 

Update source codes and all configs

--

### 

Update project json

Add build section
libs/core/server/project.json

```
{
"root": "libs/core/server",
"sourceRoot": "libs/core/server/src",
"projectType": "library",
"targets": {
"build": {
"executor": "@nrwl/node:package",
"outputs": ["{options.outputPath}"],
"options": {
"outputPath": "dist/libs/core/server",
"tsConfig": "libs/core/server/tsconfig.lib.json",
"packageJson": "libs/core/server/package.json",
"main": "libs/core/server/src/index.ts",
"assets": ["libs/core/server/*.md"],
"updateBuildableProjectDepsInPackageJson": false,
"deleteOutputPath": true
}
},
"lint": {
"executor": "@nrwl/linter:eslint",
"outputs": ["{options.outputFile}"],
"options": {
"lintFilePatterns": ["libs/core/server/\*\*/*.ts"]
}
},
"test": {
"executor": "@nrwl/jest:jest",
"outputs": ["coverage/libs/core/server"],
"options": {
"jestConfig": "libs/core/server/jest.config.js",
"passWithNoTests": true
}
}
},
"tags": []
}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update package.json

You should collect all used imports and add them to the dependencies section.

libs/core/server/package.json

```
{
"name": "@kaufman-bot/core-server",
"description": "Core commands and tools",
"license": "MIT",
"author": "EndyKaufman <admin@site15.ru>",
"keywords": [
"kaufman-bot",
"nx",
"nests",
"telegram",
"core"
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
"i18n": [
{
"scope": "core-server",
"path": "src/i18n",
"strategy": "join"
},
{
"scope": "core-server-getText",
"path": "src/i18n/getText",
"strategy": "join"
}
],
"version": "2.1.0",
"peerDependencies": {
"@nestjs/common": "^8.0.0",
"nestjs-custom-injector": "^1.0.1",
"nestjs-translates": "^1.0.3",
"class-validator-multi-lang": "^0.130.201",
"micromatch": "^4.0.5",
"mustache": "^4.2.0",
"telegraf": "^4.7.0"
}
}

```

Enter fullscreen mode

Exit fullscreen mode

You must apply these changes to all libraries.

## 

Update root files

--

### 

Update package.json

package.json

```
...
"scripts": {
...
"publish:core": "npm publish ./dist/libs/core/server",
"publish:bot-in-groups": "npm publish ./dist/libs/bot-in-groups/server",
"publish:currency-converter": "npm publish ./dist/libs/currency-converter/server",
"publish:debug-messages": "npm publish ./dist/libs/debug-messages/server",
"publish:dialogflow": "npm publish ./dist/libs/dialogflow/server",
"publish:facts-generator": "npm publish ./dist/libs/facts-generator/server",
"publish:first-meeting": "npm publish ./dist/libs/first-meeting/server",
"publish:html-scraper": "npm publish ./dist/libs/html-scraper/server",
"publish:jokes-generator": "npm publish ./dist/libs/jokes-generator/server",
"publish:language-swither": "npm publish ./dist/libs/language-swither/server",
"publish:quotes-generator": "npm publish ./dist/libs/quotes-generator/server",
"publish:short-commands": "npm publish ./dist/libs/short-commands/server",
"publish": "npm run publish:core && npm run publish:bot-in-groups && npm run publish:currency-converter && npm run publish:debug-messages && npm run publish:dialogflow && npm run publish:facts-generator && npm run publish:first-meeting && npm run publish:html-scraper && npm run publish:jokes-generator && npm run publish:language-swither && npm run publish:quotes-generator && npm run publish:short-commands"
},
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update publish config

.github/workflows/publish.yml

```
name: Publish

on:
push:
tags:
- v*

jobs:
publish:
runs-on: ubuntu-latest

steps:
- name: Checkout
uses: actions/checkout@v2

- name: Setup Node.js 16.x to publish to npmjs.org
uses: actions/setup-node@v1
with:
node-version: '16.x'
registry-url: 'https://registry.npmjs.org'

- name: Install Packages
run: npm i --force

- name: Build
run: npm run build

- name: Generate Release Body
run: npx extract-changelog-release > RELEASE_BODY.md

- name: Publish to NPM
run: npm run publish
env:
NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

- name: Create GitHub Release
uses: ncipollo/release-action@v1
with:
bodyFile: 'RELEASE_BODY.md'
token: ${{ secrets.GITHUB_TOKEN }}

```

Enter fullscreen mode

Exit fullscreen mode

## 

Add npm token to github actions environments

--

### 

Create token in npm

Navigate to https://www.npmjs.com/settings//tokens

Click to create token

Click to generate

After that you see generated token

--

### 

Append token to github envs

Go to https://github.com///settings/secrets/actions

Create common environment variable

## 

Check npm libraries

Go to https://www.npmjs.com/package/@kaufman-bot/core-server

In the next post, I will add schematics for create application from command line...

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