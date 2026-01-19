Create a database in dokku infra and set up run flyway migration from github runner

# Create a database in dokku infra and set up run flyway migration from github runner

Published: 2022-03-26T11:23:08.193Z
Tags: kaufmanbot, postgres, github, migrations
[Original Article](https://dev.to/endykaufman/create-a-database-in-dokku-infra-and-set-up-run-flyway-migration-from-github-runner-3p06)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://docs.github.com/en/actions/hosting-your-own-runners/adding-self-hosted-runners - instruction for github runners

## 

Add self host runner in vps

Navigate to https://github.com/YOU_NAME/YOU_REPOSITORY_NAME/settings/actions/runners/new?arch=x64&amp;os=linux and read about install steps

```
mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.288.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.288.1/actions-runner-linux-x64-2.288.1.tar.gz
echo "CUSTOM_NUMBERS  actions-runner-linux-x64-2.288.1.tar.gz" | shasum -a 256 -c
tar xzf ./actions-runner-linux-x64-2.288.1.tar.gz
export RUNNER_ALLOW_RUNASROOT=true && ./config.sh --url https://github.com/EndyKaufman/kaufman-bot --token TOKEN_FOR_RUNNER
```

Enter fullscreen mode

Exit fullscreen mode

Result

```
root@vps17825:~/actions-runner# ./config.sh --url https://github.com/EndyKaufman/kaufman-bot --token TOKEN_FOR_RUNNER

--------------------------------------------------------------------------------
|        ____ _ _   _   _       _          _        _   _                      |
|       / ___(_) |_| | | |_   _| |__      / \   ___| |_(_) ___  _ __  ___      |
|      | |  _| | __| |_| | | | | '_ \    / _ \ / __| __| |/ _ \| '_ \/ __|     |
|      | |_| | | |_|  _  | |_| | |_) |  / ___ \ (__| |_| | (_) | | | \__ \     |
|       \____|_|\__|_| |_|\__,_|_.__/  /_/   \_\___|\__|_|\___/|_| |_|___/     |
|                                                                              |
|                       Self-hosted runner registration                        |
|                                                                              |
--------------------------------------------------------------------------------

# Authentication

√ Connected to GitHub

# Runner Registration

Enter the name of the runner group to add this runner to: [press Enter for Default] 

Enter the name of runner: [press Enter for vps17825] develop-vps

This runner will have the following labels: 'self-hosted', 'Linux', 'X64' 
Enter any additional labels (ex. label-1,label-2): [press Enter to skip] develop-vps

√ Runner successfully added
√ Runner connection is good

# Runner settings

Enter name of work folder: [press Enter for _work] 

√ Settings Saved.

root@vps17825:~/actions-runner# 
```

Enter fullscreen mode

Exit fullscreen mode

Configuring the self-hosted runner application as a service

```
sudo ./svc.sh install
sudo ./svc.sh start
```

Enter fullscreen mode

Exit fullscreen mode

Result

```
root@vps17825:~/actions-runner# sudo ./svc.sh install
Creating launch runner in /etc/systemd/system/actions.runner.EndyKaufman-kaufman-bot.develop-vps.service
Run as user: root
Run as uid: 0
gid: 0
Created symlink /etc/systemd/system/multi-user.target.wants/actions.runner.EndyKaufman-kaufman-bot.develop-vps.service → /etc/systemd/system/actions.runner.EndyKaufman-kaufman-bot.develop-vps.service.
root@vps17825:~/actions-runner# sudo ./svc.sh start

/etc/systemd/system/actions.runner.EndyKaufman-kaufman-bot.develop-vps.service
● actions.runner.EndyKaufman-kaufman-bot.develop-vps.service - GitHub Actions Runner (EndyKaufman-kaufman-bot.develop-vps)
Loaded: loaded (/etc/systemd/system/actions.runner.EndyKaufman-kaufman-bot.develop-vps.service; enabled; vendor preset: enabled)
Active: active (running) since Sat 2022-03-26 12:06:28 MSK; 21ms ago
Main PID: 2266387 (runsvc.sh)
Tasks: 2 (limit: 2253)
Memory: 784.0K
CGroup: /system.slice/actions.runner.EndyKaufman-kaufman-bot.develop-vps.service
├─2266387 /bin/bash /root/actions-runner/runsvc.sh
└─2266397 ./externals/node16/bin/node ./bin/RunnerService.js

Mar 26 12:06:28 vps17825 systemd[1]: Started GitHub Actions Runner (EndyKaufman-kaufman-bot.develop-vps).
Mar 26 12:06:28 vps17825 runsvc.sh[2266387]: .path=/root/.vscode-server/bin/c722ca6c7eed3d7987c0d5c3df5c45f6b15e77d1/bin/remote-cli:/usr/local/sbin:/usr/local/bin:/usr/s…ames:/snap/bin
Hint: Some lines were ellipsized, use -l to show in full.
```

Enter fullscreen mode

Exit fullscreen mode

View created runner in Github UI

## 

Add support apply migration on vps database

--

### 

Append new env value in github

Add password for root user of data base

```
ROOT_POSTGRES_PASSWORD=postgres
```

Enter fullscreen mode

Exit fullscreen mode

Add connection strings for all need applications

```
SERVER_POSTGRES_URL=postgres://admin_develop:password_develop@${POSTGRES_HOST}:5432/kaufman_bot_develop?schema=public
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update deploy script

.github/workflows/develop.deploy.yml

```
name: "deploy"

# yamllint disable-line rule:truthy
on:
push:
branches:
- feature/73

jobs:
migrate:
runs-on: [self-hosted, develop-vps]
environment: dev
steps:
- name: Cloning repo
uses: actions/checkout@v2
with:
fetch-depth: 0

- name: Apply migrations
run: |
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
. ~/.nvm/nvm.sh
nvm --version
nvm install v16.13.2
nvm use v16.13.2
npm i --force
export POSTGRES_HOST=$(dokku postgres:info global-postgres --internal-ip)
export ROOT_POSTGRES_URL=postgres://postgres:${{secrets.ROOT_POSTGRES_PASSWORD}}@${POSTGRES_HOST}:5432/postgres?schema=public
export SERVER_POSTGRES_URL=${{secrets.SERVER_POSTGRES_URL}}
npm run rucken -- postgres
export DATABASE_URL=$SERVER_POSTGRES_URL && npm run migrate

deploy:
needs: [migrate]
runs-on: ubuntu-latest
environment: dev
steps:
- name: Cloning repo
uses: actions/checkout@v2
with:
fetch-depth: 0

- name: Push to dokku
uses: dokku/github-action@master
with:
branch: "feature/73"
git_remote_url: "ssh://dokku@${{secrets.HOST}}:22/kaufman-bot"
ssh_private_key: ${{secrets.SSH_PRIVATE_KEY}}

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update flyway config for support change host name

.flyway.js

```
...
const cs = new ConnectionString(
(process.env.POSTGRES_URL || process.env.DATABASE_URL).replace(
'${POSTGRES_HOST}',
process.env['POSTGRES_HOST']
)
);
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Check deploy in Github UI

After apply migartions and deploy you see result in Github UI

https://github.com/EndyKaufman/kaufman-bot/actions/runs/2044314338

For see complete of migrations expand needed step of job

https://github.com/EndyKaufman/kaufman-bot/runs/5702849615?check_suite_focus=true

## 

Check database in vps server

Connect to database

dokku postgres:connect global-postgres

Switch database

\connect kaufman_bot_develop

Select telegram users

select * from "User";

```
root@vps17825:~# dokku postgres:connect global-postgres
psql (13.3 (Debian 13.3-1.pgdg100+1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

global_postgres=# \connect kaufman_bot_develop
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
You are now connected to database "kaufman_bot_develop" as user "postgres".
kaufman_bot_develop=# select * from "User";
id                  | telegramId | langCode 
--------------------------------------+------------+----------
7fa21a25-60a9-4d69-86d9-13770bd467fd | testId     | en
(1 row)
```

Enter fullscreen mode

Exit fullscreen mode

In the next post, I will add prisma to the project to save the user's language to the database...

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