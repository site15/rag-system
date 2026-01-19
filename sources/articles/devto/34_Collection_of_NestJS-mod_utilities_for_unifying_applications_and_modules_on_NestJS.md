Collection of NestJS-mod utilities for unifying applications and modules on NestJS

# Collection of NestJS-mod utilities for unifying applications and modules on NestJS

Published: 2024-01-24T20:46:48.877Z
Tags: nestjs, typescript, node, nestjsmod
[Original Article](https://dev.to/endykaufman/collection-of-nestjs-mod-utilities-for-unifying-applications-and-modules-on-nestjs-5256)

**Description from API:**
About Me   Hello everyone, my name is Ilshat. I've been writing backend in Typescript and...

# 

About Me

Hello everyone, my name is Ilshat.
I've been writing backend in Typescript and NestJS for 7 years.
In addition to the backend, I also write the frontend in Angular. Thanks to the similarities between NestJS and Angular, I chose it as the main framework for backend development, and Typescript has become my main programming language.

# 

Problems

NestJS is a great framework and you can do great things with it, but often when we develop many applications in one organization we end up with different application architectures, file structures, and a lot of duplicate code.

To unify application architecture and develop standard modules, many teams began to develop their own solutions that hang on top of NestJS.

In addition to writing product code, there is also a need for a unified process for building and delivering that code directly to the customer.

When the product and team are the same, then there are no problems with different code bases, deployment and delivery; you set it up once and it always works.

But when new products or new microservices start appearing in separate repositories, all the settings and code start to diverge.

If an organization has a devops specialist or an entire department dedicated to automating development processes, they can take on the work of synchronizing devops settings, but the problem of synchronizing product architectures and module architectures will remain.

In addition to the above, there is also a need to generate a report on the entire project infrastructure with all the environment variables used and their values, as well as a report on all the options that were used in the modules.

# 

Solutions

Since I wrote a lot of different code on NestJS, I know typical architectural solutions that are more often used when developing modules, but to use them I had to write a lot of the same type of code.

Constantly adjusting devops for projects with different modules was also very tiring.

The NestJS-mod collection of utilities is designed to unify applications and modules, and also introduces new logical possibilities for separating responsibilities between modules (System, Core, Feature, Integration, Infrastructure).

Since all parts of the application are unified, you can create a report on the entire project infrastructure.

The single source of information for operation, deployment, delivery and documentation is the NestJS-mod application itself.

NestJS-mod modules themselves generate all the necessary settings and scripts for launching various infrastructure systems.

# 

Fast start

```
# Create an empty nx project
npx --yes create-nx-workspace@19.5.3 --name=project-name --preset=apps --interactive=false --ci=skip

# Go to the created folder
cd project-name

# Install schematic for generating NestJS-mod application
npm install --save-dev @nestjs-mod/schematics@latest

# Create a NestJS-mod application
./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/app-name --name=app-name --projectNameAndRootFormat=as-provided --strict=true

# Prepare all files
npm run manual:prepare

# Launch applications in watch mode
npm run serve:dev:app-name
```

Enter fullscreen mode

Exit fullscreen mode

# 

Module types

When you create a NestJS module, all existing modules are imported into one imports option of the main application module.

When all the modules are in a single list, we cannot immediately determine which module is a business module and which carries the general logic for logging.

NestJS-mod has not one general option for importing modules, but several.

This decomposition of modules can help when building a report on the infrastructure, and also immediately displays a certain general meaning of the module within the entire application, which helps to quickly enter the context of the logic itself for which this module was designed.

```
import { bootstrapNestApplication } from "@nestjs-mod/common";

bootstrapNestApplication({
modules: {
system: [],
core: [],
feature: [],
integrations: [],
infrastructure: [],
},
});
```

Enter fullscreen mode

Exit fullscreen mode

Module processing order: 1) system, 2) core, 3) feature, 4) integrations, 5) infrastructure

## 

System modules (System)

Modules for the entire application.

Examples: running a NestJS application, running microservices, etc.
Compatible with NestJS-mod only.

## 

Core modules

Modules with the “Core” type are needed for the operation of functional modules and integration modules.

Examples: main module with database connection, main module with connection to aws, etc.
Compatible with NestJS and NestJS-mod.

## 

Feature modules

Functional (“feature”) modules with the business logic of the application.

Compatible with NestJS and NestJS-mod.

## 

Integration modules

“Integration” modules for organizing communication between different functional, system or core modules.

Example: after creating a user in the `UsersModule` module whose module type is “Feature”, you need to send him a letter from the `NotificationsModule` module with the “Core” type, while the user module does not have information about the transport and sending method, as well as an explicit connection with the notification module, the user module simply has a method in the `afterCreateUser` configuration, the implementation of which will already be transferred from a certain integration module.
Compatible with NestJS and NestJS-mod.

## 

Infrastructure modules

Modules for creating configuration files for various services external to the application. These modules are excluded from the final list of modules that will be loaded into NestJS.

Examples: `docker-compose` file for raising a database, `gitlab` configuration file for deploying an application.
Compatible with NestJS-mod only.

# 

Utilities

## 

Config model

Decorators `ConfigModel`, `ConfigModelProperty` to describe the available module settings and the `configTransform` function to serialize and check it. The values must be described in code.

--

### 

Example of a regular NestJS application with configuration

```
import {
ConfigModel,
ConfigModelProperty,
configTransform,
} from "@nestjs-mod/common";
import { DynamicModule, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { IsNotEmpty } from "class-validator";

// Describe the configuration class
@ConfigModel()
class AppConfig {
@ConfigModelProperty()
@IsNotEmpty()
option!: string;
}

// Describe a module that receives configuration values when calling the forRoot method
@Module({ providers: [AppConfig] })
class AppModule {
static forRoot(config: Partial<AppConfig>): DynamicModule {
return {
module: AppModule,
providers: [
{
provide: `${AppConfig.name}_loader`,
useFactory: async (emptyAppConfig: AppConfig) => {
if (config.constructor !== Object) {
Object.setPrototypeOf(emptyAppConfig, config);
}
const obj = await configTransform({
model: AppConfig,
data: config,
});
Object.assign(emptyAppConfig, obj.data);
},
inject: [AppConfig],
},
],
};
}
}

// We try to launch the application and do not pass anything to the module
async function bootstrap1() {
const app = await NestFactory.create(AppModule.forRoot({}));
await app.listen(3000);
}

// We get a validation error
// throw new ConfigModelValidationErrors(validateErrors);
// isNotEmpty: option should not be empty
bootstrap1();

// We try to launch the application and at the same time pass configuration values to the module
async function bootstrap2() {
const app = await NestFactory.create(AppModule.forRoot({ option: "value1" }));
console.log(app.get(AppConfig)); // output: { option: 'value1' }
await app.listen(3000);
}

// No error
bootstrap2();
```

Enter fullscreen mode

Exit fullscreen mode

## 

Environment variables (Env model)

Decorators `EnvModel`, `EnvModelProperty` for describing the module's environment variables and the `envTransform` function for its serialization and verification. Values can be automatically read from `process.env` or other sources such as https://www.vaultproject.io or https://developer.hashicorp.com/consul/docs/dynamic-app-config/kv.

--

### 

Example NestJS application with different ways to use environment variables

```
import { EnvModel, EnvModelProperty, envTransform } from "@nestjs-mod/common";
import { DynamicModule, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { IsNotEmpty } from "class-validator";

// Describe a class for working with environment variables
@EnvModel()
class AppEnv {
@EnvModelProperty()
@IsNotEmpty()
option!: string;
}

// Describe a module that receives the values of environment variables when calling the forRoot method
@Module({ providers: [AppEnv] })
class AppModule {
static forRoot(env: Partial<AppEnv>): DynamicModule {
return {
module: AppModule,
providers: [
{
provide: `${AppEnv.name}_loader`,
useFactory: async (emptyAppEnv: AppEnv) => {
if (env.constructor !== Object) {
Object.setPrototypeOf(emptyAppEnv, env);
}
const obj = await envTransform({
model: AppEnv,
data: env,
});
Object.assign(emptyAppEnv, obj.data);
},
inject: [AppEnv],
},
],
};
}
}

// We try to run the application and at the same time we do not pass anything to the module and do not have the necessary variables in process.env
async function bootstrap1() {
const app = await NestFactory.create(AppModule.forRoot({}));
await app.listen(3000);
}

// We get a validation error
// throw new ConfigModelValidationErrors(validateErrors);
// isNotEmpty: option should not be empty
bootstrap1();

// We try to launch the application and manually transfer the values of environment variables to the module, process.env is still empty
async function bootstrap2() {
const app = await NestFactory.create(AppModule.forRoot({ option: "value1" }));
console.log(app.get(AppEnv)); // output: { option: 'value1' }
await app.listen(3000);
}

// No error
bootstrap2();

// We try to launch the application and do not pass the values of environment variables to the module, but put them in process.env
async function bootstrap3() {
process.env["OPTION"] = "value1";
const app = await NestFactory.create(AppModule.forRoot({}));
console.log(app.get(AppEnv)); // output: { option: 'value1' }
await app.listen(3000);
}

// No error
bootstrap3();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Field key names are formed using formatters.

Examples:

- main formatter - transforms the chain of names: application, context, module, properties, which are formed during the process of starting the creation of the application and module (example: ___&lt; PROPERTY_NAME&gt;). ([code](https://github.com/nestjs-mod/nestjs-mod/blob/master/libs/common/src/lib/env-model/formatters/dot-env-property-name.formatter.ts))

- custom formatter - inherited from the main transformer and includes in the naming chain an additional static string ___STATIC_STRING_) ([code](https://github.com/nestjs-mod/nestjs-mod-contrib/blob/master/libs/core/prisma/src/lib/formatters/dot-env-property-name.formatter.ts))

--

### 

The values of environment variables are obtained using extractors, which in their work use the names of the keys that the formatters created.

Examples:

- main extractor - gets the value by key from the object that was passed to the `configTransform` function ([code](https://github.com/nestjs-mod/nestjs-mod/blob/master/libs/common/src/lib/env-model/extractors/default-property-value.extractor.ts))

- 
`process.env` extractor - gets values from the environment of the current process ([code](https://github.com/nestjs-mod/nestjs-mod/blob/master/libs/common/src/lib/env-model/extractors/process-env-property-value.extractor.ts))

## 

Function for creating a NestJS-mod module (createNestModule)

The `createNestModule` function for creating a dynamic NestJS module with the ability to configure through configurations or environment variables, as well as providing the ability to use part of the module’s services through the `forFeature` method or transfer part of the configurations from the module feature.

All modules have the ability to create several parallel named instances of the module with different input parameters; to do this, you need to pass the name of the instance to the `contextName` option.

Unlike NestJS modules, NestJS-mod modules can contain additional wrapper methods that will be called when building a NestJS application.

## 

An example of creating a native NestJS module using the createNestModule function and passing various types of configurations

```
import {
ConfigModel,
ConfigModelProperty,
EnvModel,
EnvModelProperty,
createNestModule,
getNestModuleDecorators,
InjectableFeatureConfigurationType,
} from "@nestjs-mod/common";
import { Injectable } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { IsNotEmpty } from "class-validator";

// App1Module

const { InjectFeatures } = getNestModuleDecorators({
moduleName: "App1Module",
});

@ConfigModel()
class AppFeatureConfig {
@ConfigModelProperty()
@IsNotEmpty()
featureOptionConfig!: string;
}

@Injectable()
class AppFeaturesService {
constructor(
@InjectFeatures()
private readonly appFeatureConfigs: InjectableFeatureConfigurationType<AppFeatureConfig>[]
) {}

getFeatureConfigs() {
return this.appFeatureConfigs.map(
({ featureConfiguration }) => featureConfiguration
);
}
}

const { App1Module } = createNestModule({
moduleName: "App1Module",
sharedProviders: [AppFeaturesService],
featureConfigurationModel: AppFeatureConfig,
});

@ConfigModel()
class App2Config {
@ConfigModelProperty()
@IsNotEmpty()
option!: string;
}

@Injectable()
class App2Service {
constructor(
private readonly appFeaturesService: AppFeaturesService,
private readonly app2Config: App2Config
) {}

getFeatureConfigs() {
return this.appFeaturesService.getFeatureConfigs();
}

getConfig() {
return this.app2Config;
}
}

// App2Module

const { App2Module } = createNestModule({
moduleName: "App2Module",
imports: [
App1Module.forFeature({
featureModuleName: "App2Module",
featureConfiguration: { featureOptionConfig: "featureOptionConfig-app2" },
}),
],
providers: [App2Service],
configurationModel: App2Config,
});

@EnvModel()
class App3Env {
@EnvModelProperty()
@IsNotEmpty()
option!: string;
}

@Injectable()
class App3Service {
constructor(
private readonly appFeaturesService: AppFeaturesService,
private readonly app3Env: App3Env
) {}

getFeatureConfigs() {
return this.appFeaturesService.getFeatureConfigs();
}

getEnv() {
return this.app3Env;
}
}

const { App3Module } = createNestModule({
moduleName: "App3Module",
imports: [
App1Module.forFeature({
featureModuleName: "App2Module",
featureConfiguration: { featureOptionConfig: "featureOptionConfig-app3" },
}),
],
providers: [App3Service],
environmentsModel: App3Env,
});

// Test

const { AppModule } = createNestModule({
moduleName: "AppModule",
imports: [
App1Module.forRoot(),
App2Module.forRoot({ configuration: { option: "appConfig3value" } }),
App3Module.forRoot({ environments: { option: "appEnv2value" } }),
],
});

async function bootstrap() {
const app = await NestFactory.create(AppModule.forRoot());
const appFeatureScannerService = app.get(AppFeaturesService);
const app2Service = app.get(App2Service);
const app3Service = app.get(App3Service);

console.log(appFeatureScannerService.getFeatureConfigs()); // output: [{ featureOptionConfig: 'featureOptionConfig-app2' }, { featureOptionConfig: 'featureOptionConfig-app3' }]
console.log(app2Service.getFeatureConfigs()); // output: [{ featureOptionConfig: 'featureOptionConfig-app2' }, { featureOptionConfig: 'featureOptionConfig-app3' }]
console.log(app3Service.getFeatureConfigs()); // output: [{ featureOptionConfig: 'featureOptionConfig-app2' }, { featureOptionConfig: 'featureOptionConfig-app3' }]
console.log(app2Service.getConfig()); // output: { option: 'appConfig3value' }
console.log(app3Service.getEnv()); // output: { option: 'appEnv2value' }
}

bootstrap();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Wrapper methods

- preWrapApplication - called for all root modules, here we can create another additional root module, the configuration for which will be dynamically generated based on the original module, for example: set a new prefix to the name of the keys when working with environment variables ([code example](//https%20://github.com/nestjs-mod/nestjs-mod/blob/8ab5dc5a340215bdba8cea63e004dea2c3676e95/libs/common/src/lib/modules/system/project-utils/project-utils.module.ts#L50))

- wrapApplication - a method that can create a NestJS application or microservice, returns an instance of the created application. ([code example](https://github.com/nestjs-mod/nestjs-mod/blob/8ab5dc5a340215bdba8cea63e004dea2c3676e95/libs/common/src/lib/modules/system/default-nest-application/default-nest-application-%20initializer.ts#L106))

- postWrapApplication - this method works after the application is created, for example, you need to start listening on the HTTP port ([code example](https://github.com/nestjs-mod/nestjs-mod/blob/8ab5dc5a340215bdba8cea63e004dea2c3676e95/libs/common/src/lib%20/modules/system/default-nest-application/default-nest-application-listener.ts#L79))

When creating a module, you can pass many different new parameters, there are both original NestJS options and extended ones.

Descriptions and examples of using each option will be discussed in separate posts; now I will only describe the options for configuring the module.

--

### 

Options for creating a NestJS-mod module

environmentsModel

The class and its properties are marked with decorators of the type “Environment Variables” (Env model), it contains properties with primitive types used in the module, the values of which can be obtained from various sources, such as: `process.env` or `consul-kv` .

configurationModel

The class and its properties are marked with decorators of the “Config model” type; the properties of primitive and complex types that are used in the module, the values for which must be passed when connecting the module to the application, are described in the code.

staticEnvironmentsModel

The “Environment Variables” class (Env model) with static properties of a primitive type can be used at the time of generating module metadata; values can be obtained from various sources, for example: `process.env` or `consul-kv`.

Example: different import conditions depending on environment variables, dynamic routes for REST controllers.

staticConfigurationModel

A configuration class with static properties of primitive and complex types that can be used when generating module metadata (imports, controllers); values for them must be passed when connecting the module to the application.

featureEnvironmentsModel

Environment variables are a “feature” of modules with primitive types, the values of which can be obtained from various sources, such as: `process.env` or `consul-kv`.

Example: the name of the environment variable for connecting to the database feature of the module differs from the name of the environment variable of the root connection.

featureConfigurationModel

A class for the “feature” of modules, variables of primitive and complex types that can be added to the current module from other modules.

Example: the transport for sending a message can be defined as a product “feature” functionality, but the main implementation of bypassing recipients and sending will be a “core” or “integration” module.

--

### 

Create the main dynamic module and pass the asynchronous configuration

When the configuration of a module is unknown in advance, we can pass it using an asynchronous factory; if other modules are needed for its operation, we can pass them through the `imports` option, just like in regular NestJS.

In addition to the asynchronous factory, you can also use class and pass by value, just like in regular NestJS.

NestJS-mod has another way of passing a configuration, this is passing an Observable stream with the values of this configuration. This method is needed when values may change over time.

Example: core module for dynamically changing the address and credentials of a proxy server when the current one is blocked, the module feature may not call an additional method to obtain the current address and credentials, it simply uses the configuration instance that was connected through the constructor, as if it were a static configuration.

--

### 

Working with options that were passed from other modules (configuration feature)

Since at the time of initialization of NestJS modules, the order of loading (resolving) may differ, definitely at the moment of start we can get all the “configuration features” only in the NestJS `onApplicationBootstrap` hook.

To obtain it you need to use the `InjectFeatures` decorator.
When the application is running (runtime), there are no longer any problems with access to all configurations.

--

### 

Decorators for working with module entities

Since the use of decorators is static code and cannot be changed in real time, decorators for each module must be created manually using the `getNestModuleDecorators` function

--

### 

Types of decorators:

InjectService

To connect a provider using an injected token or class.

Example: if an application has several instances of the same module, but with different context names, then the name of this context can be passed to the decorator.

InjectFeatures

To connect an array with all configurations obtained from various modules.

Example: There is a “systems” website accessibility module and there is a configuration feature through which the “core” module for working with the database can notify about the functionality of the database. Based on this list of “systems,” the module decides whether people can be allowed into the backend.

InjectAllFeatures

If the application has several instances of a module with different contexts, then to get all the “feature configurations” you need to use this decorator.

InjectFeatureEnvironments

In addition to configurations, you can also get all the environment variables that the feature modules used.

Example: a certain console application that, at startup, will create all the necessary databases on the database server, we receive the connection string to the database with root rights from the “systems” of the module, and the connection string to the database of the feature modules themselves is passed from the feature modules themselves and at the same time All key names are different and must be validated when starting the application.

InjectAllFeatureEnvironments

The same as `InjectFeatureEnvironments` only collects information on all instances of the module.

InjectModuleSettings

Sometimes you need to get all the metadata of configuration classes and classes for module environment variables, this is a decorator for that.

Example: the application collects all configuration values of environment variables with the names of the keys and generates a report.

InjectAllModuleSettings

Context-independent retrieval of all module configuration metadata.

## 

Function for creating a NestJS-mod application

This is probably the simplest `bootstrapNestApplication` function, it simply traverses an object with an array of modules and calls the wrapper methods.

--

### 

Sample application

```
import {
DefaultNestApplicationInitializer,
DefaultNestApplicationListener,
EnvModel,
EnvModelProperty,
bootstrapNestApplication,
createNestModule,
} from "@nestjs-mod/common";
import { Injectable, Logger } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";

@EnvModel()
class AppEnv {
@EnvModelProperty()
@IsNotEmpty()
option!: string;
}

@Injectable()
class AppService {
constructor(private readonly appEnv: AppEnv) {}

getEnv() {
return this.appEnv;
}
}

const { AppModule } = createNestModule({
moduleName: "AppModule",
environmentsModel: AppEnv,
providers: [AppService],
});

process.env["OPTION"] = "value1";

const globalPrefix = "api";

bootstrapNestApplication({
modules: {
system: [
DefaultNestApplicationInitializer.forRoot(),
DefaultNestApplicationListener.forRoot({
staticEnvironments: { port: 3000 },
staticConfiguration: {
preListen: async ({ app }) => {
if (app) {
const appService = app.get(AppService);
console.log(appService.getEnv()); // output: { option: 'value1' }
app.setGlobalPrefix(globalPrefix);
}
},
postListen: async ({ current }) => {
Logger.log(
`🚀 Application is running on: http://${
current.staticEnvironments?.hostname ?? "localhost"
}:${current.staticEnvironments?.port}/${globalPrefix}`
);
},
},
}),
],
feature: [AppModule.forRoot()],
},
});
```

Enter fullscreen mode

Exit fullscreen mode

# 

Schematics

The target application type for using NestJS-mod is the monorepository at https://nx.dev.

Since the NestJS-mod template is slightly different from nx, there are additional rules for checking code quality and more strict typescript config rules, for a faster start to developing applications on this architecture, sets of schematics were developed https://www.npmjs.com/package/@nestjs-mod/schematics for code generation.

## 

Schematic for creating a basic application

--

### 

Commands for creating an empty NestJS-mod application

```
# Create an empty nx project
npx --yes create-nx-workspace@17.2.8 --name=project-name --preset=empty --interactive=false --nx-cloud=false

# Go to the created folder
cd project-name

# Install schematic for generating NestJS-mod application
npm install --save-dev @nestjs-mod/schematics@latest

# Create a NestJS-mod application
./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/app-name --name=app-name --projectNameAndRootFormat=as-provided --strict=true
```

Enter fullscreen mode

Exit fullscreen mode

Example of the generated application: https://github.com/nestjs-mod/nestjs-mod-example/tree/master/apps/app-name

--

### 

Run the created application in development mode

```
# Prepare all files
npm run manual:prepare

# Launch applications in watch mode
npm run serve:dev:app-name
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Building and running the application in production mode

```
## Collect applications
npm run build:prod:app-name

## Launch the assembled application
npm run start:prod:app-name
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Integrated:

- Pino - logger for streaming logs, website: [https://github.com/pinojs/pino](https://github.com/pinojs/pino).

- Terminus - to obtain the status of the application, website: [https://docs.nestjs.com/recipes/terminus](https://docs.nestjs.com/recipes/terminus).

- InfrastructureMarkdownReportGenerator - infrastructure documentation generator ([example](https://github.com/nestjs-mod/nestjs-mod-example/blob/master/apps/app-name/INFRASTRUCTURE.MD)).

- PM2 - script generator for launching the application, website: [https://pm2.keymetrics.io/](https://pm2.keymetrics.io/)

## 

Schematic for creating a typical NestJS-mod library

--

### 

Command to create an empty library

```
# Creating NestJS-mod library
./node_modules/.bin/nx g @nestjs-mod/schematics:library feature-name --buildable --publishable --directory=libs/feature-name --simpleName=true --projectNameAndRootFormat=as-provided --strict =true
```

Enter fullscreen mode

Exit fullscreen mode

Example of the generated library: https://github.com/nestjs-mod/nestjs-mod-example/tree/master/libs/feature-name

--

### 

Integrated:

- Commands for creating releases for Github - action: [https://github.com/TheUnderScorer/nx-semantic-release](https://github.com/TheUnderScorer/nx-semantic-release).

- Empty configuration and environment variable classes - example: [https://github.com/nestjs-mod/nestjs-mod-example/tree/master/libs/feature-name/src/lib](https://github.com/nestjs-mod/nestjs-mod-example/tree/master/libs/feature-name/src/lib).

## 

Currently implemented NestJS and NestJS-mod modules

--

### 

System modules

- DefaultNestApplicationInitializer - Default NestJS application initializer ([short description](https://www.npmjs.com/package/@nestjs-mod/common#defaultnestapplicationinitializer)).

- DefaultNestApplicationListener - Default NestJS application listener ([short description](https://www.npmjs.com/package/@nestjs-mod/common#defaultnestapplicationlistener)).

- ProjectUtils - Utilities for setting global application parameters, such as the project name, description and validation parameters for environment variables and module and application configuration variables ([short description](https://www.npmjs.com/package/@nestjs-mod/%20common#projectutils)).

- NestjsPinoLogger - Pino logger (Wrapper for [https://www.npmjs.com/package/nestjs-pino](https://www.npmjs.com/package/nestjs-pino), ([short description](https://www.npmjs.com/package/@nestjs-mod/pino#nestjspinologger)).

- TerminusHealthCheck - A wrapper over the NestJS module for checking the availability of the application ([short description](https://www.npmjs.com/package/@nestjs-mod/terminus#terminushealthcheck)).

- DefaultTestNestApplicationCreate - Module for creating a NestJS test application ([short description](https://www.npmjs.com/package/@nestjs-mod/testing#defaulttestnestapplicationcreate)).

- DefaultTestNestApplicationInitializer - Module for launching a test application on NestJS ([short description](https://www.npmjs.com/package/@nestjs-mod/testing#defaulttestnestapplicationinitializer)).

--

### 

Core modules

- PrismaModule - a module for working with Prisma-form ([brief description](https://www.npmjs.com/package/@nestjs-mod/prisma#prismamodule)).

--

### 

Infrastructure modules

- DockerCompose - Module for generating a docker compose file ([short description](https://www.npmjs.com/package/@nestjs-mod/docker-compose#dockercompose)).

- DockerComposePostgreSQL - A module for describing the docker compose service with a postgres database, will be used by the DockerCompose module when generating the final compose file ([brief description](https://www.npmjs.com/package/@nestjs-mod/docker-compose#%20dockercomposepostgresql)).

- Pm2 - Module for generating the configuration necessary to run the application via PM2 ([short description](https://www.npmjs.com/package/@nestjs-mod/pm2#pm2)).

- NestjsModAllReadmeGenerator - a module for generating documentation for the entire infrastructure ([short description](https://www.npmjs.com/package/@nestjs-mod/reports#nestjsmodallreadmegenerator)).

## 

Future plans

- It will be necessary to decompose the code and improve the typing - since during the development of this project I set myself a certain deadline, which I was able to successfully meet, but the quality of the code suffered greatly.

- Write more tests for the main functionality - there are not tests for all possible situations; some parameters when using utilities were checked manually, and not automated through tests. The modules that are in the repository [https://github.com/nestjs-mod/nestjs-mod-contrib](https://github.com/nestjs-mod/nestjs-mod-contrib) do not have tests at all, everything was checked manually.

- Expand the infrastructure documentation generator.

- Add examples of use for all modules and utilities - now working with them can only be learned by reading the tests, but the documentation must be in the readme file.

- Add more wrapper modules or write your own implementations for typical things (working with Redis, working with Nodemailer, and so on).

- Add modules for generating pipeline configurations gitlab-ci, bitbucket, jenkins

- Add a generator for building docker images and generating scripts for deploying an application in Kubernetes.

- Write a console application for more convenient work with schematics.

- Add the ability to save meta information on modules and their configuration in package.json and the ability to deploy the entire code base and deployment and delivery parameters with just two files package.json and .env file.

- Create a cloud solution that will allow you to visually assemble the application and include all the necessary modules and groups of modules, which can be deployed anywhere.

## 

Conclusion

I don’t know to what extent this application architecture and the utilities that it contains will be able to enter the real world of development on NestJS, but I myself have begun to transfer all my own projects to NestJS-mod, so the project will definitely not die 😉

## 

Links

- 
[https://github.com/nestjs-mod/nestjs-mod](https://github.com/nestjs-mod/nestjs-mod) - NestJS-mod collection of utilities for unifying NestJS applications and modules.

- 
[https://github.com/nestjs-mod/nestjs-mod-contrib](https://github.com/nestjs-mod/nestjs-mod-contrib) - Repository with various NestJS and NestJS-mod modules and wrapper modules

- 
[https://github.com/nestjs-mod/nestjs-mod-example](https://github.com/nestjs-mod/nestjs-mod-example) - Example generated via [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master%20/libs/schematics) applications

- 
[https://habr.com/ru/articles/788916](https://habr.com/ru/articles/788916) - Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS

## 

P.S.

Don’t judge strictly the quality of the code; the priority was the speedy release into open access of a certain MVP version of this project.

The project is open source and if you have the desire and time, then I will be very happy with new pull requests and new contributors.

I would like to say thank you to https://github.com/ArgoN1ck for the project icon 🔥 and thank you to https://github.com/AleksandrAlyokhin for constructive comments on the text of this article 😎

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