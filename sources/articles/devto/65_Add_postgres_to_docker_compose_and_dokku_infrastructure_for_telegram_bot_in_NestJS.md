Add postgres to docker compose and dokku infrastructure for telegram bot in NestJS

# Add postgres to docker compose and dokku infrastructure for telegram bot in NestJS

Published: 2022-03-19T14:48:12.570Z
Tags: nestjs, kaufmanbot, docker, postgres
[Original Article](https://dev.to/endykaufman/add-postgres-to-docker-compose-and-dokku-infrastructure-for-telegram-bot-in-nestjs-23ih)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://github.com/dokku/dokku-postgres - dokku-postgres plugin for docker compose

https://github.com/EndyKaufman/postgres-default - 13 postgres with enabled extensions

## 

Add postgres to dev and prod infrastructure

Setting up a database for prod and dev infra is the same, I describe only for dev infra

--

### 

Update docker compose file

docker/dev/docker-compose.yml

```
version: "3"
networks:
kaufman-bot-network:
ipam:
config:
- subnet: "172.6.0.0/16"

volumes:
kaufman-bot-postgres-volume:
external: true

services:
kaufman-bot-postgres:
image: 'endykaufman/postgres-default'
container_name: 'kaufman-bot-postgres'
environment:
- POSTGRES_USER=${ROOT_POSTGRES_USER}
- POSTGRES_PASSWORD=${ROOT_POSTGRES_PASSWORD}
- POSTGRES_DB=postgres
env_file:
- ../../.env.local
ports:
- '5432:5432'
volumes:
- kaufman-bot-postgres-volume:/var/lib/postgresql/data
networks:
- kaufman-bot-network

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
depends_on:
- kaufman-bot-postgres

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update you env file

.env.local

```
TELEGRAM_BOT_TOKEN=1111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
ROOT_POSTGRES_USER=postgres
ROOT_POSTGRES_PASSWORD=postgres
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update up script

docker/dev/docker-compose-up.sh

```
#!/bin/bash
#export UID=$(id -u)
#export GID=$(id -g)
export CURRENT_UID=$(id -u):$(id -g)
docker volume create --name=kaufman-bot-postgres-volume --label=kaufman-bot-postgres-volume
docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add second down script with drop volume

docker/dev/docker-compose-clean-down.sh

```
#!/bin/bash
#export UID=$(id -u)
#export GID=$(id -g)
export CURRENT_UID=$(id -u):$(id -g) 
docker-compose -f ./docker/dev/docker-compose.yml down
docker volume rm kaufman-bot-postgres-volume --force
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

For prod infra, we do the same thing only in other folders

--

### 

Add new scripts to package.json

package.json

```
...
"docker:dev:clean-down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-clean-down.sh",
"docker:dev:clean-restart": "npm run docker:dev:clean-down && npm run docker:dev:up",
"docker:prod:clean-down": "export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/prod/docker-compose-clean-down.sh",
"docker:prod:clean-restart": "npm run docker:prod:clean-down && npm run docker:prod:up"
...
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Restart dev infra

npm run docker:dev:clean-restart

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm run docker:dev:clean-restart

> kaufman-bot@0.0.0 docker:dev:clean-restart
> npm run docker:dev:clean-down && npm run docker:dev:up

> kaufman-bot@0.0.0 docker:dev:clean-down
> export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-clean-down.sh

Stopping kaufman-bot-server   ... done
Stopping kaufman-bot-postgres ... done
Removing kaufman-bot-server   ... done
Removing kaufman-bot-postgres ... done
Removing network dev_kaufman-bot-network
kaufman-bot-postgres-volume

> kaufman-bot@0.0.0 docker:dev:up
> export $(xargs < ./.env.local) > /dev/null 2>&1 && ./docker/dev/docker-compose-up.sh

kaufman-bot-postgres-volume
Creating network "dev_kaufman-bot-network" with the default driver
Creating kaufman-bot-postgres ... done
Creating kaufman-bot-server   ... done
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Check database

Connect to container with database

docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") sh

Switch user

su postgres

Run psql mode

psql

Select database name

SELECT current_database();

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") sh
# su postgres
postgres@48966265f189:/$ psql
psql (13.3 (Debian 13.3-1.pgdg100+1))
Type "help" for help.

postgres=# SELECT current_database();
current_database 
------------------
postgres
(1 row)

postgres=# 
```

Enter fullscreen mode

Exit fullscreen mode

## 

Add postgres to dokku infrastructure (on server)

--

### 

Install dokku-postgres

Now we connect via ssh to our server on Ubuntu and set up work with postgres

sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres

```
root@vps17825:~# sudo dokku plugin:install https://github.com/dokku/dokku-postgres.git postgres
-----> Cloning plugin repo https://github.com/dokku/dokku-postgres.git to /var/lib/dokku/plugins/available/postgres
Cloning into 'postgres'...
remote: Enumerating objects: 2356, done.
remote: Counting objects: 100% (417/417), done.
remote: Compressing objects: 100% (276/276), done.
remote: Total 2356 (delta 244), reused 267 (delta 118), pack-reused 1939
Receiving objects: 100% (2356/2356), 483.24 KiB | 3.48 MiB/s, done.
Resolving deltas: 100% (1580/1580), done.
-----> Plugin postgres enabled
Adding user dokku to group adm
Starting nginx (via systemctl): nginx.service.
14.1: Pulling from library/postgres
5eb5b503b376: Pull complete 
daa0467a6c48: Pull complete 
7cf625de49ef: Pull complete 
bb8afcc973b2: Pull complete 
c74bf40d29ee: Pull complete 
2ceaf201bb22: Pull complete 
1255f255c0eb: Pull complete 
d27501cd0cca: Pull complete 
ff5b6d09a5d0: Pull complete 
f635aec27645: Pull complete 
a165c6729250: Pull complete 
b0aa4f86b611: Pull complete 
9efc4664d9d2: Pull complete 
Digest: sha256:3162a6ead070474b27289f09eac4c865e75f93847a2d7098f718ee5a721637c4
Status: Downloaded newer image for postgres:14.1
docker.io/library/postgres:14.1
1.31.1-uclibc: Pulling from library/busybox
76df9210b28c: Pull complete 
Digest: sha256:cd421f41ebaab52ae1ac91a8391ddbd094595264c6e689954b79b3d24ea52f88
Status: Downloaded newer image for busybox:1.31.1-uclibc
docker.io/library/busybox:1.31.1-uclibc
0.3.3: Pulling from dokku/ambassador
aad63a933944: Pull complete 
2888dfab2eb5: Pull complete 
51ccf60e0642: Pull complete 
Digest: sha256:87c0214e190e7f6975953027157a8933701596b4b864ff66dd3cc3f6ead5c38d
Status: Downloaded newer image for dokku/ambassador:0.3.3
docker.io/dokku/ambassador:0.3.3
0.10.3: Pulling from dokku/s3backup
aad63a933944: Already exists 
6654c5b7b2dc: Pull complete 
26abcd9faf98: Pull complete 
d1a36cd3ba61: Pull complete 
9517d44e685b: Pull complete 
32e8b2c4797f: Pull complete 
Digest: sha256:3651f8ef12000206df55fec8ad4860d6f26b2b5af1308c0e2358253641626024
Status: Downloaded newer image for dokku/s3backup:0.10.3
docker.io/dokku/s3backup:0.10.3
0.4.3: Pulling from dokku/wait
aad63a933944: Already exists 
3409ea528c35: Pull complete 
88e35d065209: Pull complete 
Digest: sha256:5eb9da766abdd5e8cedbde9870acd4b54c1c7e63e72c99e338b009d06f808f04
Status: Downloaded newer image for dokku/wait:0.4.3
docker.io/dokku/wait:0.4.3
-----> Priming bash-completion cache
root@vps17825:~# 
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create database service

I am using my custom build with UUID extension enabled https://hub.docker.com/r/endykaufman/postgres-default

dokku postgres:create global-postgres --image "endykaufman/postgres-default" --image-version latest --root-password=ROOT_PASSWORD --password=ADMIN_PASSWORD

```
root@vps17825:~# dokku postgres:create global-postgres --image "endykaufman/postgres-default" --root-password=ROOT_PASSWORD --password=ADMIN_PASSWORD
/var/lib/dokku/plugins/enabled/postgres/subcommands/create: illegal option -- -
/var/lib/dokku/plugins/enabled/postgres/subcommands/create: illegal option -- -
Error response from daemon: manifest for endykaufman/postgres-default:14.1 not found: manifest unknown: manifest unknown
!     Postgres image endykaufman/postgres-default:14.1 pull failed
root@vps17825:~# dokku postgres:create global-postgres --image "endykaufman/postgres-default" --image-version latest --root-password=ROOT_PASSWORD --password=ADMIN_PASSWORD
/var/lib/dokku/plugins/enabled/postgres/subcommands/create: illegal option -- -
/var/lib/dokku/plugins/enabled/postgres/subcommands/create: illegal option -- -
latest: Pulling from endykaufman/postgres-default
b4d181a07f80: Pull complete 
46ca1d02c28c: Pull complete 
a756866b5565: Pull complete 
36c49e539e90: Pull complete 
664019fbcaff: Pull complete 
727aeee9c480: Pull complete 
796589e6b223: Pull complete 
6664992e747d: Pull complete 
0f933aa7ccec: Pull complete 
99b5e5d88b32: Pull complete 
a901b82e6004: Pull complete 
625fd35fd0f3: Pull complete 
9e37bf358a5d: Pull complete 
8c5f37d7fa57: Pull complete 
Digest: sha256:a3d342741451f717b79b2404e88363ea902a769d45a0bd7dbbbeeb73bb443f93
Status: Downloaded newer image for endykaufman/postgres-default:latest
docker.io/endykaufman/postgres-default:latest
!     Specified password may not be as secure as the auto-generated password
Waiting for container to be ready
Creating container database
Securing connection to database
=====> Postgres container created: global-postgres
=====> global-postgres postgres service information
Config dir:          /var/lib/dokku/services/postgres/global-postgres/data
Config options:                               
Data dir:            /var/lib/dokku/services/postgres/global-postgres/data
Dsn:                 postgres://postgres:assword=ADMIN_PASSWORD@dokku-postgres-global-postgres:5432/global_postgres
Exposed ports:       -                        
Id:                  50dbeaef39b80ca97823ad35ac771b241c2214eb3bd5cd81564f9dee546ae783
Internal ip:         172.17.0.5               
Links:               -                        
Service root:        /var/lib/dokku/services/postgres/global-postgres
Status:              running                  
Version:             endykaufman/postgres-default:latest
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

List all postgres services

dokku postgres:list

--

### 

Check database

Connect to database

dokku postgres:connect global-postgres

Select database name

SELECT current_database();

```
root@vps17825:~# dokku postgres:connect global-postgres
psql (13.3 (Debian 13.3-1.pgdg100+1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

global_postgres=# SELECT current_database();
current_database 
------------------
global_postgres
(1 row)

global_postgres=# 
```

Enter fullscreen mode

Exit fullscreen mode

In the next post, we will create a database for the application and the first migration via flyway

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