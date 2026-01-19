Using Consul-KV in NestJS

# Using Consul-KV in NestJS

Published: 2022-10-17T14:59:21.446Z
Tags: nestjs, consul, node, typescript
[Original Article](https://dev.to/endykaufman/using-consul-kv-in-nestjs-dgd)

**Description from API:**
Easily work with Consul Key/Value Store          ...

Easily work with Consul Key/Value Store

# 

Links

https://developer.hashicorp.com/consul/docs/dynamic-app-config/kv - Key/Value (KV) Store

https://www.npmjs.com/package/ilink-console-tools - console. utility for upload/download env files to/from consul-kv

https://www.npmjs.com/package/nestjs-consul-kv-realtime - NestJS module for realtime work with Consul-KV

https://github.com/EndyKaufman/nestjs-consul-example - project with code from this post

# 

Steps to create a project using nest and consul

## 

1. Create NestJS project

--

### 

a) Create a new NestJS application with @nestjs/cli

```
npm i -g @nestjs/cli
nest new nestjs-consul-example
cd nestjs-consul-example
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

b) Install dependencies

```
npm i --save consul nestjs-consul-kv-realtime
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

c) Install devDependencies

```
npm i --save-dev ilink-console-tools @types/consul
```

Enter fullscreen mode

Exit fullscreen mode

## 

2. Add work with Docker-compose

--

### 

a) Install docker-compose

https://docs.docker.com/compose/install

--

### 

b) Create nestjs-consul-example/docker-compose.yml

```
version: "3"
networks:
nestjs-consul-example-network:
driver: bridge

services:
nestjs-consul-example:
image: bitnami/consul:latest
container_name: "nestjs-consul-example"
environment:
- CONSUL_HTTP_TOKEN=${CONSUL_TOKEN_MASTER}
networks:
- nestjs-consul-example-network
ports:
- "8300:8300"
- "8301:8301"
- "8301:8301/udp"
- "8500:8500"
- "8600:8600"
- "8600:8600/udp"
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

c) Create nestjs-consul-example/env.docker-compose

```
CONSUL_HTTP_TOKEN=e2999fc6-1fc1-4345-a56e-e9d27b34c1c1
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

d) Add new scripts to nestjs-consul-example/package.json

```
{
"scripts": {
"__________dev infra__________": "__________dev infra__________",
"docker:dev:restart": "npm run docker:dev:down && npm run docker:dev:up",
"docker:dev:up": "set -a && . ./env.docker-compose && set +a && export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker-compose.yml --compatibility up -d",
"docker:dev:down": "set -a && . ./env.docker-compose && set +a && export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker-compose.yml down"
}
}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

e) Start docker-compose

```
npm run docker:dev:restart
```

Enter fullscreen mode

Exit fullscreen mode

## 

3. Add default environment variables to consul

--

### 

a) Create nestjs-consul-example/env.default

```
HELLO_MESSAGE="Hello from ENV file!"
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

b) Add new script and update exist in nestjs-consul-example/package.json

```
{
"scripts": {
"__________dev infra__________": "__________dev infra__________",
"docker:dev:restart": "npm run docker:dev:down && npm run docker:dev:up && npm run docker:dev:fill-default-data",
"docker:dev:up": "set -a && . ./env.docker-compose && set +a && export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker-compose.yml --compatibility up -d",
"docker:dev:down": "set -a && . ./env.docker-compose && set +a && export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker-compose.yml down",
"docker:dev:fill-default-data": "set -a && . ./env.docker-compose && set +a && ilink-console-tools env-to-consul --path=./env.default --consul-token=$CONSUL_HTTP_TOKEN --consul-clear=true"
}
}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

c) Restart docker-compose

```
npm run docker:dev:restart
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

d) Navigate to http://localhost:8500/ui/dc1/kv/env/ and check data in UI

## 

4. Add NestjsConsulKvRealtimeModule to the application

--

### 

a) Update nestjs-consul-example/src/app.module.ts

```
import { Module } from '@nestjs/common';
import { NestjsConsulKvRealtimeModule } from 'nestjs-consul-kv-realtime';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
imports: [
NestjsConsulKvRealtimeModule.forRootAsync({
useFactory: async () => ({
port: '8500',
host: 'localhost',
defaults: {
token: process.env.CONSUL_HTTP_TOKEN,
},
}),
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

### 

b) Update nestjs-consul-example/src/app.controller.ts

```
import { Controller, Get } from '@nestjs/common';
import { ConsulKeyValue } from 'nestjs-consul-kv-realtime';
import { AppService } from './app.service';

@Controller()
export class AppController {
@ConsulKeyValue({
key: 'env',
})
consulEnvironments!: { HELLO_MESSAGE: string };

constructor(private readonly appService: AppService) {}

@Get()
getHello(): string {
return this.appService.getHello();
}

@Get('consul')
getConsulHello(): string {
return this.consulEnvironments.HELLO_MESSAGE;
}
}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

c) Update nestjs-consul-example/tsconfig.json

```
{
"compilerOptions": {
"module": "commonjs",
"declaration": true,
"removeComments": true,
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"allowSyntheticDefaultImports": true,
"target": "es2017",
"sourceMap": true,
"outDir": "./dist",
"baseUrl": "./",
"incremental": true,
"skipLibCheck": true,
"strictNullChecks": false,
"noImplicitAny": false,
"strictBindCallApply": false,
"forceConsistentCasingInFileNames": false,
"noFallthroughCasesInSwitch": false,
"esModuleInterop": true
}
}
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

d) Add new scripts to nestjs-consul-example/package.json

```
{
"scripts": {
"start:dev": "set -a && . ./env.docker-compose && set +a && nest start --watch",
"test": "npm run docker:dev:fill-default-data && set -a && . ./env.docker-compose && set +a && jest --forceExit",
}
}
```

Enter fullscreen mode

Exit fullscreen mode

## 

5. Update tests and test them

--

### 

a) Update exist test nestjs-consul-example/src/app.controller.spec.ts

```
import { Test, TestingModule } from '@nestjs/testing';
import Consul from 'consul';

import { NestjsConsulKvRealtimeModule } from 'nestjs-consul-kv-realtime';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
let appController: AppController;

beforeEach(async () => {
const app: TestingModule = await Test.createTestingModule({
imports: [
NestjsConsulKvRealtimeModule.forRootAsync({
useFactory: async () => ({
port: '8500',
host: 'localhost',
defaults: {
token: process.env.CONSUL_HTTP_TOKEN,
},
}),
}),
],
controllers: [AppController],
providers: [AppService],
}).compile();
await app.init();

appController = app.get<AppController>(AppController);
});

describe('root', () => {
it('should return "Hello World!"', () => {
expect(appController.getHello()).toBe('Hello World!');
});

it('should return "Hello from ENV file!"', async () => {
expect(appController.getConsulHello()).toBe('Hello from ENV file!');
});

it('should return "Hello from TEST!"', async () => {
const consul = new Consul({
port: '8500',
host: 'localhost',
defaults: {
token: process.env.CONSUL_HTTP_TOKEN,
},
});

await consul.kv.set('env/HELLO_MESSAGE', 'Hello from TEST!');

expect(appController.getConsulHello()).not.toBe('Hello from TEST!');

await new Promise((resolve) => setTimeout(resolve, 1500));

expect(appController.getConsulHello()).toBe('Hello from TEST!');
});
});
});

```

Enter fullscreen mode

Exit fullscreen mode

--

### 

b) Run tests

```
npm run test
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