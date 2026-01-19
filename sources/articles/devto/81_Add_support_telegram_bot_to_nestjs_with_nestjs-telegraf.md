Add support telegram bot to nestjs with nestjs-telegraf

# Add support telegram bot to nestjs with nestjs-telegraf

Published: 2022-02-13T08:46:51.072Z
Tags: kaufmanbot, nestjs, telegram, nestjstelegraf
[Original Article](https://dev.to/endykaufman/add-support-telegram-bot-to-nestjs-with-nestjs-telegraf-2p3c)

**Description from API:**
Add library to application    npm i --save nestjs-telegraf...

## 

Add library to application

npm i --save nestjs-telegraf telegraf

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save nestjs-telegraf telegraf

added 12 packages, and audited 758 packages in 13s

77 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Create token for bot

Find user @botfather in telegram and create new bot

Create .env.local file in root folder and write this token

```
TELEGRAM_BOT_TOKEN=5.......................................g
```

Enter fullscreen mode

Exit fullscreen mode

Update .gitignore file

```
...
# Env files
*.env.*
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Add env to heroku dashboard

Go to https://dashboard.heroku.com/apps/kaufman-bot/settings

Open envs panel

Add token to env

--

## 

Write first code in nestjs application

Update app.module.ts file

```
import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
imports: [
TelegrafModule.forRoot({
token: process.env.TELEGRAM_BOT_TOKEN,
}),
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

Update app.service.ts file

```
import { Injectable } from '@nestjs/common';
import { Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class AppService {
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
}
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Update scripts for run application

```
"scripts": {
"nx": "nx",
"start": "node dist/apps/server/main.js",
"build": "npm run nx -- build server",
"test": "nx test",
"serve": "npm run nx -- serve server",
"serve:local": "export $(xargs < ./.env.local) && npm run serve"
}
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Run and test send message from telegram

npm run serve:local

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run serve:local

> kaufman-bot@0.0.0 serve:local
> export $(xargs < ./.env.local) && npm run serve

> kaufman-bot@0.0.0 serve
> npm run nx -- serve server

> kaufman-bot@0.0.0 nx
> nx "serve" "server"

> nx run server:serve

chunk (runtime: main) main.js (main) 5.13 KiB [entry] [rendered]
webpack compiled successfully (1cb24aed742cbdb9)
Starting inspector on localhost:9229 failed: address already in use
Issues checking in progress...
[Nest] 1495282  - 02/13/2022, 12:11:12 PM     LOG [NestFactory] Starting Nest application...
[Nest] 1495282  - 02/13/2022, 12:11:12 PM     LOG [InstanceLoader] TelegrafModule dependencies initialized +79ms
[Nest] 1495282  - 02/13/2022, 12:11:12 PM     LOG [InstanceLoader] DiscoveryModule dependencies initialized +3ms
[Nest] 1495282  - 02/13/2022, 12:11:12 PM     LOG [InstanceLoader] AppModule dependencies initialized +5ms
[Nest] 1495282  - 02/13/2022, 12:11:13 PM     LOG [InstanceLoader] TelegrafCoreModule dependencies initialized +287ms
[Nest] 1495282  - 02/13/2022, 12:11:13 PM     LOG [RoutesResolver] AppController {/api}: +6ms
[Nest] 1495282  - 02/13/2022, 12:11:13 PM     LOG [RouterExplorer] Mapped {/api, GET} route +4ms
[Nest] 1495282  - 02/13/2022, 12:11:13 PM     LOG [NestApplication] Nest application successfully started +4ms
[Nest] 1495282  - 02/13/2022, 12:11:13 PM     LOG 🚀 Application is running on: http://localhost:3333/api
No issues found.
```

Enter fullscreen mode

Exit fullscreen mode

Open telegram and find you bot

Click to start message

Test other feature

--

## 

Deploy to heroku and test

Commit all changes

Stop local version of bot

Remove vercel integrations if it exists

If application not deploy automatic, change settings in heroku and click to manual deploy

Wait...

Send message to bot

![pic](https://media2.dev.to/dynamic/image/width=256,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png)

[
Create template
](/settings/response-templates)
Templates let you quickly answer FAQs or store snippets for re-use.

Submit
Preview
[Dismiss](/404.html)

Collapse

Expand

[&nbsp;](undefined)

[

](https://dev.to/lonevetad)

[

Marco Ottina

](https://dev.to/lonevetad)

Marco Ottina

[

Marco Ottina

](/lonevetad)

Follow

- 

Joined

Sep 27, 2023

•

[

Sep 27 '23

](https://dev.to/endykaufman/add-support-telegram-bot-to-nestjs-with-nestjs-telegraf-2p3c#comment-29jid)

Dropdown menu

- [Copy link](https://dev.to/endykaufman/add-support-telegram-bot-to-nestjs-with-nestjs-telegraf-2p3c#comment-29jid)

- 

- 

Hide

- 

- 

- 

It does not seem very safe to upload the token onto dashboard.heroku.com/apps/kaufman-... , since the token will be used in a production environment.
Is there any workaround?

Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink.

Hide child comments as well

Confirm

For further actions, you may consider blocking this person and/or reporting abuse