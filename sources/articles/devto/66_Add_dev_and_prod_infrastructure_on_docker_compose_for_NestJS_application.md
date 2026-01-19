Add dev and prod infrastructure on docker compose for NestJS application

# Add dev and prod infrastructure on docker compose for NestJS application

Published: 2022-03-19T11:18:31.362Z
Tags: nestjs, kaufmanbot, docker, infrastructure
[Original Article](https://dev.to/endykaufman/add-dev-and-prod-infrastructure-on-docker-compose-for-nestjs-application-p6p)

**Description from API:**
In the future, various databases and other self-host solutions will be needed for the application to...

In the future, various databases and other self-host solutions will be needed for the application to work; in order not to experience problems with installing and running such services, you need to add developer infrastructure

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

## 

Installing the required software

I have an Ubuntu operating system and I describe all the solutions only for this operating system
For other operating systems, look for the instructions yourself

--

### 

Docker

https://docs.docker.com/engine/install/ubuntu/

```
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
dockerd-rootless-setuptool.sh install
sudo chown $USER /var/run/docker.sock
sudo systemctl restart docker
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Docker compose

https://docs.docker.com/compose/install/#install-compose

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version
```

Enter fullscreen mode

Exit fullscreen mode

## 

Prepare common files

--

### 

Create dockerignore file in root directory

.dockerignore

```
node_modules
tmp
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add additional scripts to packge.json

package.json

```
...
"docker:dev:down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-down.sh",
"docker:dev:restart": "npm run docker:dev:down && npm run docker:dev:up",
"docker:dev:up": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-up.sh",
"docker:prod:build-sources": "npm run build",
"docker:prod:down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/prod/docker-compose-down.sh",
"docker:prod:restart": "npm run docker:prod:down && npm run docker:prod:up",
"docker:prod:up": "export $(xargs < ./.env.local) > /dev/null 2>&1 && npm run docker:prod:build-sources && ./docker/prod/docker-compose-up.sh"
...
```

Enter fullscreen mode

Exit fullscreen mode

## 

Create developer infrastructure

--

### 

Add docker compose file

docker/dev/docker-compose.yml

```
version: "3"
networks:
kaufman-bot-network:
ipam:
config:
- subnet: "172.6.0.0/16"

services:
kaufman-bot-server:
image: node:16-alpine
user: ${CURRENT_UID}
container_name: "kaufman-bot-server"
environment:
- TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
- PORT=3000
ports:
- "3000:3000"
- "9229:9229"
working_dir: "/app"
volumes:
- ./../../:/app
networks:
- kaufman-bot-network
command: "npm run serve"
tty: true

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add up script file

docker/dev/docker-compose-up.sh

```
#!/bin/bash
#export UID=$(id -u)
#export GID=$(id -g)
export CURRENT_UID=$(id -u):$(id -g)
docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add down script file

docker/dev/docker-compose-down.sh

```
#!/bin/bash
#export UID=$(id -u)
#export GID=$(id -g)
export CURRENT_UID=$(id -u):$(id -g) 
docker-compose -f ./docker/dev/docker-compose.yml down
```

Enter fullscreen mode

Exit fullscreen mode

## 

Create production infrastructure

--

### 

Add docker compose file

docker/prod/docker-compose.yml

```
version: "3"
networks:
kaufman-bot-network:
ipam:
config:
- subnet: "172.6.0.0/16"

services:
kaufman-bot-server:
image: node:16-alpine
user: ${CURRENT_UID}
container_name: "kaufman-bot-server"
environment:
- TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
- PORT=3000
ports:
- "3000:3000"
- "9229:9229"
working_dir: "/app"
volumes:
- ./../../:/app
networks:
- kaufman-bot-network
command: "npm run start"
tty: true

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add up script file

docker/prod/docker-compose-up.sh

```
#!/bin/bash
#export UID=$(id -u)
#export GID=$(id -g)
export CURRENT_UID=$(id -u):$(id -g)
docker-compose -f ./docker/prod/docker-compose.yml --compatibility up -d
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add down script file

docker/prod/docker-compose-down.sh

```
#!/bin/bash
#export UID=$(id -u)
#export GID=$(id -g)
export CURRENT_UID=$(id -u):$(id -g) 
docker-compose -f ./docker/prod/docker-compose.yml down
```

Enter fullscreen mode

Exit fullscreen mode

## 

Run and test from telegram

--

### 

Start dev infra

npm run docker:dev:up

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run docker:dev:up

> kaufman-bot@0.0.0 docker:dev:up
> export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-up.sh

Creating network "dev_kaufman-bot-network" with the default driver
Creating kaufman-bot-server ... done

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Check status of created containers

docker status

```
CONTAINER ID   NAME                 CPU %     MEM USAGE / LIMIT     MEM %     NET I/O          BLOCK I/O     PIDS
ea93db120ed3   kaufman-bot-server   0.34%     304.4MiB / 13.57GiB   2.19%     3.67MB / 158kB   0B / 49.2kB   59
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Show all logs of containers

docker-compose  -f ./docker/dev/docker-compose.yml logs

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ docker-compose  -f ./docker/dev/docker-compose.yml logs
Attaching to kaufman-bot-server
kaufman-bot-server    | 
kaufman-bot-server    | > kaufman-bot@0.0.0 serve
kaufman-bot-server    | > npm run nx -- serve server
kaufman-bot-server    | 
kaufman-bot-server    | 
kaufman-bot-server    | > kaufman-bot@0.0.0 nx
kaufman-bot-server    | > nx "serve" "server"
kaufman-bot-server    | 
kaufman-bot-server    | 
kaufman-bot-server    | > nx run server:serve
kaufman-bot-server    | 
kaufman-bot-server    | chunk (runtime: main) main.js (main) 49.7 KiB [entry] [rendered]
kaufman-bot-server    | webpack compiled successfully (5a171399d4564c11)
kaufman-bot-server    | Debugger listening on ws://localhost:9229/78012d34-483b-4d11-ace7-7d4bd30708e9
kaufman-bot-server    | For help, see: https://nodejs.org/en/docs/inspector
kaufman-bot-server    | Issues checking in progress...
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [NestFactory] Starting Nest application...
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] TelegrafModule dependencies initialized +57ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] TranslatesModule dependencies initialized +1ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] LanguageSwitherModule dependencies initialized +0ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] LanguageSwitherModule dependencies initialized +0ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] DiscoveryModule dependencies initialized +1ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] CustomInjectorCoreModule dependencies initialized +0ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] TranslatesModuleCore dependencies initialized +0ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] TranslatesModule dependencies initialized +1ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] BotCommandsModule dependencies initialized +1ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] ScraperModule dependencies initialized +0ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] ScraperModule dependencies initialized +1ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] CustomInjectorModule dependencies initialized +0ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] FactsGeneratorModule dependencies initialized +1ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] CurrencyConverterModule dependencies initialized +0ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] AppModule dependencies initialized +1ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [InstanceLoader] TelegrafCoreModule dependencies initialized +292ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [RoutesResolver] AppController {/api}: +5ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [RouterExplorer] Mapped {/api, GET} route +2ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [TranslatesBootstrapService] onModuleInit
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [TranslatesStorage] Add 2 translates for locale: en
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [TranslatesStorage] Add 2 translates for locale: ru
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [NestApplication] Nest application successfully started +2ms
kaufman-bot-server    | [Nest] 57  - 03/19/2022, 10:57:17 AM     LOG [Application] ���� Application is running on: http://localhost:3000/api
kaufman-bot-server    | No issues found.
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Check work from telegram

--

### 

Stop dev infra

npm run docker:dev:down

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run docker:dev:down

> kaufman-bot@0.0.0 docker:dev:down
> export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-down.sh

Stopping kaufman-bot-server ... done
Removing kaufman-bot-server ... done
Removing network dev_kaufman-bot-network
```

Enter fullscreen mode

Exit fullscreen mode

The next post will be adding a database to dev infra and dokku infra...

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