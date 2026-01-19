Create a database for the application and create first migration via flyway

# Create a database for the application and create first migration via flyway

Published: 2022-03-26T06:51:43.865Z
Tags: kaufmanbot, postgres, flyway, migrations
[Original Article](https://dev.to/endykaufman/create-a-database-for-the-application-and-create-first-migration-via-flyway-4hjb)

**Description from API:**
Links   https://github.com/EndyKaufman/kaufman-bot - source code of...

## 

Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://telegram.me/DevelopKaufmanBot - current bot in telegram

https://flywaydb.org - flyway is an open-source database migration tool. It strongly favors simplicity and convention over configuration

https://www.npmjs.com/package/node-flywaydb - NodeJs wrapper for flywaydb cli

https://github.com/rucken/rucken - my little utilities for nx monorepositories 

## 

Install dependencies

Install the cross database tool for working with migrations

npm i --save-dev node-flywaydb

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save-dev node-flywaydb

added 14 packages, and audited 918 packages in 3s

115 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

Enter fullscreen mode

Exit fullscreen mode

Install a utility for parsing database connection strings

npm i --save connection-string

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save connection-string

up to date, audited 938 packages in 2s

115 packages are looking for funding
run `npm fund` for details

1 high severity vulnerability

To address all issues, run:
npm audit fix

Run `npm audit` for details.
```

Enter fullscreen mode

Exit fullscreen mode

Update or install the latest version of the utility for nx monorepositories, the latest version has a command to create a non-root application database

npm i --save-dev rucken@latest

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ npm i --save-dev rucken@latest

added 19 packages, changed 1 package, and audited 938 packages in 4s

115 packages are looking for funding
run `npm fund` for details

1 high severity vulnerability

To address all issues, run:
npm audit fix

Run `npm audit` for details.
```

Enter fullscreen mode

Exit fullscreen mode

## 

Connect flyway

--

### 

Update package.json

package.json

```
{
...
"flyway": "flyway -c .flyway.js",
"migrate": "npm run flyway -- migrate",
"migrate:local": "export $(xargs < ./.env.local) && npm run migrate"
...
}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Add configuration file for flyway

.flyway.js

```
const { ConnectionString } = require('connection-string');
const cs = new ConnectionString(
process.env.POSTGRES_URL || process.env.DATABASE_URL
);
const {
user: USERNAME,
password: PASSWORD,
HOST = cs.host,
DATABASE = cs.path && cs.path[0],
SCHEMA = cs.params && cs.params.schema,
SCHEMAS = cs.params && cs.params.schemas,
} = cs;

module.exports = {
flywayArgs: {
url: `jdbc:postgresql://${HOST}/${DATABASE}`,
schemas: SCHEMAS || SCHEMA,
defaultSchema: SCHEMA,
locations: `filesystem:migrations`,
user: USERNAME,
password: PASSWORD,
table: '__migrations',
sqlMigrationSuffixes: '.pgsql',
},
// Use to configure environment variables used by flyway
env: {
JAVA_ARGS: '-Djava.util.logging.config.file=./conf/logging.properties',
},
version: '6.3.2', // optional, empty or missing will download the latest
mavinPlugins: [
{
// optional, use to add any plugins (ie. logging)
groupId: 'org.slf4j',
artifactId: 'slf4j-api',
version: '1.7.25',
// This can be a specifc url to download that may be different then the auto generated url.
downloadUrl:
'https://repo1.maven.org/maven2/org/slf4j/slf4j-api/1.7.25/slf4j-api-1.7.25.jar',
},
{
groupId: 'org.slf4j',
artifactId: 'slf4j-jdk14',
version: '1.7.25',
},
],
downloads: {
storageDirectory: `${__dirname}/tmp`, // optional, the specific directory to store the flyway downloaded files. The directory must be writable by the node app process' user.
expirationTimeInMs: -1, // optional, -1 will never check for updates, defaults to 1 day.
},
};
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update env file

.env.local

```
TELEGRAM_BOT_TOKEN=1111111:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
ROOT_POSTGRES_USER=postgres
ROOT_POSTGRES_PASSWORD=postgres
ROOT_POSTGRES_URL=postgres://${ROOT_POSTGRES_USER}:${ROOT_POSTGRES_PASSWORD}@localhost:5432/postgres?schema=public
SERVER_POSTGRES_URL=postgres://admin_develop:password_develop@localhost:5432/kaufman_bot_develop?schema=public
```

Enter fullscreen mode

Exit fullscreen mode

## 

Add migrations

Let's create a migration to store the telegram user's language

migrations/V202203252131CreateUserTable.pgsql

```
CREATE TABLE IF NOT EXISTS "User" (
id uuid DEFAULT uuid_generate_v4 () NOT NULL,
"telegramId" varchar(64) NOT NULL,
"langCode" varchar(64) DEFAULT 'en' NOT NULL,
CONSTRAINT "PK_USERS" PRIMARY KEY (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_USERS__TELEGRAM_ID" ON "User" ("telegramId");
```

Enter fullscreen mode

Exit fullscreen mode

Add test data

migrations/V202203252144ExampleDataForUserTable.pgsql

```
INSERT INTO "User" ("telegramId")
VALUES ('testId')
ON CONFLICT ("telegramId")
DO NOTHING;
```

Enter fullscreen mode

Exit fullscreen mode

## 

Update dev infra

--

### 

Update docker compose config

docker/dev/docker-compose.yml

```
...
services:
kaufman-bot-postgres:
image: "endykaufman/postgres-default"
container_name: "kaufman-bot-postgres"
environment:
- POSTGRES_USER=${ROOT_POSTGRES_USER}
- POSTGRES_PASSWORD=${ROOT_POSTGRES_PASSWORD}
- POSTGRES_DB=postgres
env_file:
- ../../.env.local
ports:
- "5432:5432"
volumes:
- kaufman-bot-postgres-volume:/var/lib/postgresql/data
networks:
- kaufman-bot-network
healthcheck:
test: ["CMD-SHELL", "pg_isready -U postgres"]
interval: 5s
timeout: 5s
retries: 5
...
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
# Start only database
docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d kaufman-bot-postgres
# Wait ready datatbase
until docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") pg_isready -U postgres; do
echo "Waiting for postgres..."
sleep 2
done
# Create all need application databases by exists match evn key and nx app name
# for app: "server" - env: SERVER_POSTGRES_URL
# for app: "core-server" - env: CORE_SERVER_POSTGRES_URL
npm run rucken -- postgres
# Run migrate database for specific database
export DATABASE_URL=$SERVER_POSTGRES_URL && npm run migrate
# Start all services
docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d
```

Enter fullscreen mode

Exit fullscreen mode

For prod infra, we do the same thing only in other folders

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
/var/run/postgresql:5432 - no response
Waiting for postgres...
/var/run/postgresql:5432 - accepting connections

> kaufman-bot@0.0.0 rucken
> rucken "postgres"

> kaufman-bot@0.0.0 migrate
> npm run flyway -- migrate

> kaufman-bot@0.0.0 flyway
> flyway -c .flyway.js "migrate"

Flyway Community Edition 6.3.2 by Redgate
Database: jdbc:postgresql://localhost:5432/kaufman_bot_develop (PostgreSQL 13.3)
WARNING: Flyway upgrade recommended: PostgreSQL 13.3 is newer than this version of Flyway and support has not been tested. The latest supported version of PostgreSQL is 12.
Successfully validated 2 migrations (execution time 00:00.013s)
Creating Schema History table "public"."__migrations" ...
Current version of schema "public": << Empty Schema >>
Migrating schema "public" to version 202203252131 - CreateUserTable
Migrating schema "public" to version 202203252144 - ExampleDataForUserTable
Successfully applied 2 migrations to schema "public" (execution time 00:00.043s)
kaufman-bot-postgres is up-to-date
Creating kaufman-bot-server ... done
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Check database

Connect to container with database

docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") sh

Connect with psql to application database

set PGPASSWORD=password_develop&amp;&amp; psql -d kaufman_bot_develop -U admin_develop

Select telegram users

select * from "User";

```
endy@endy-virtual-machine:~/Projects/current/kaufman-bot$ docker exec -it $(docker ps -aqf "name=kaufman-bot-postgres") sh
# set PGPASSWORD=password_develop&& psql -d kaufman_bot_develop -U admin_develop
psql (13.3 (Debian 13.3-1.pgdg100+1))
Type "help" for help.

kaufman_bot_develop=> select * from "User";
id                  | telegramId | langCode 
--------------------------------------+------------+----------
c98e49b5-2fa5-4748-896d-1dbca9cc7112 | testId     | en
(1 row)
```

Enter fullscreen mode

Exit fullscreen mode

In the next post, we will create a database in dokku infra and set up migration from github

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