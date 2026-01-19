Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS

# Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS

Дата публикации: Thu, 25 Jan 2024 10:30:27 GMT
[Оригинал статьи](https://habr.com/ru/articles/788916/?utm_campaign=788916&amp;utm_source=habrahabr&amp;utm_medium=rss)

**Описание из RSS:**
![undefined](https://habrastorage.org/getpro/habr/upload_files/6f5/82a/fbe/6f582afbe8e664aba6ee08ad5cb01cba.png)Коллекция утилит NestJS-mod предназначена для унификации приложений и модулей NestJS, а также представляет новые логические возможности разделения обязанностей между модулями (System, Core, Feature, Integration, Infrastructure).

[Читать далее](https://habr.com/ru/articles/788916/?utm_campaign=788916&amp;utm_source=habrahabr&amp;utm_medium=rss#habracut)

[](/ru/users/kaufmanendy/)[kaufmanendy](/ru/users/kaufmanendy/)25  янв  2024 в 10:30# Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS

Уровень сложностиСреднийВремя на прочтение18 минОхват и читатели4.6K[Node.JS * ](/ru/hubs/nodejs/)[Проектирование API * ](/ru/hubs/api/)[TypeScript * ](/ru/hubs/typescript/)[NestJS * ](/ru/hubs/nestjs/)[Nx * ](/ru/hubs/nx/)Обзор[Из песочницы](/ru/sandbox/)![undefined](https://habrastorage.org/r/w1560/getpro/habr/post_images/d95/ad6/1ef/d95ad61ef2ee0b639bb7e0a1f4f8a0d7.png)## О себе

Всем привет, меня зовут Ильшат. Я пишу бэкенд на Typescript и NestJS уже 7 лет.

Помимо бэкэнда я пишу ещё и фронтенд на Angular, благодаря схожести NestJS и Angular я и выбрал его в качестве основного фреймворка для разработки бэкенда, соответственно Typescript стал моим основным языком программирования.

## Проблемы

NestJS — отличный фреймворк, и с его помощью можно делать замечательные вещи, но часто при разработке большого количества приложений в одной организации мы получаем разные архитектуры приложений, файловые структуры и множество дублированного кода.

Для унификации архитектуры приложений и разработки типовых модулей многие команды начали разрабатывать собственные решения, которые навешиваются поверх NestJS.

Помимо написания кода продукта, также есть необходимость в унифицированном процессе сборки и доставки этого кода непосредственно заказчику.

Когда продукт и команда одна, то нет проблем с разной кодовой базой, деплоем и доставкой, один раз настроил и работает как часы.

Но когда начинают появляться новые продукты или новые микросервисы в отдельных репозиториях, все настройки и код начинают разъезжаться.

Если в организации есть девопс специалист или целый отдел по автоматизации процесcов разработки, они могут работу по синхронизации настроек девопс взять на себя, но проблема синхронизации архитектур продуктов и архитектур модулей останется.

В дополнение к вышесказанному, ещё имеется необходимость генерировать отчёт по всей инфраструктуре проекта со всеми используемыми переменными окружения и их значениями, а также отчёт по всем опциям, которые использовались в модулях.

## Решения

Так-как я писал много разного кода на NestJS, я знаю типовые архитектурные решения которые чаще используются при разработке модулей, но для их использования приходилось писать много однотипного кода.

Постоянная настройка девопс под проекты с различными модулями также очень сильно напрягала.

Коллекция утилит NestJS-mod предназначена для унификации приложений и модулей, а также представляет новые логические возможности разделения обязанностей между модулями (System, Core, Feature, Integration, Infrastructure).

Поскольку все части приложения унифицированы, вы можете создать отчёт по всей инфраструктуре проекта.

Единым источником информации для работы, разворачивания, доставки и документирования служит само NestJS-mod приложение.

NestJS-mod модули сами генерируют все необходимые настройки и скрипты запуска различных инфраструктурных систем.

## Быстрый старт

```
# Создать пустой nx проект
npx --yes create-nx-workspace@19.5.3 --name=project-name --preset=apps --interactive=false --ci=skip

# Перейти в созданную папку
cd project-name

# Установить схематик для генерации NestJS-mod приложения
npm install --save-dev @nestjs-mod/schematics@latest

# Создать приложение NestJS-mod
./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/app-name --name=app-name --projectNameAndRootFormat=as-provided --strict=true

# Подготовить все файлы
npm run manual:prepare

# Запустить приложения в watch-режиме
npm run serve:dev:app-name
```
## Типы модулей

При создании модуля NestJS все существующие модули импортируются в одну опцию imports главного модуля приложения.

Когда все модули идут единым списком, то мы не можем сразу определить какой модуль является бизнес модулем, а какой несет общую логику по логированию.

NestJS-mod имеет не одну общую опцию для импорта модулей а несколько.

Такая декомпозиция модулей может помочь при построении отчёта по инфраструктуре, а также сразу отображает некий общий смысл модуля в рамках всего приложения, что помогает быстрее входить в контекст самой логики для чего этот модуль разработан.

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
Порядок обработки модулей: 1) system, 2) core, 3) feature, 4) integrations, 5) infrastructure

--

### Системные модули (System)

Модули для работы всего приложения.

Примеры: запуск приложения NestJS, запуск микросервисов и т. д. Совместимы только с NestJS-mod.

--

### Модули ядра (Core)

Модули с типом “Ядро” нужны для работы функциональных модулей и модулей интеграции.

Примеры: основной модуль с подключением к базе данных, основной модуль для подключения к aws и т. д. Совместимы с NestJS и NestJS-mod.

--

### Функциональные модули (Feature)

Функциональные (“фича”) модули с бизнес-логикой приложения.

Совместимы с NestJS и NestJS-mod.

--

### Модули интеграции (Integration)

“Интеграционные” модули для организации связи между разными функциональными, системными или модулями ядра.

Пример: после создания пользователя в модуле `UsersModule` у которого тип модуля “Feature” вам необходимо отправить ему письмо из модуля `NotificationsModule` с типом “Core”, при этом информацию о транспорте и способе отправки модуль юзеров не имеет как и явную связь с модулем нотификации, модуль юзеров имеет просто метод в конфигурации `afterCreateUser` реализация которого уже будет передана из некоего модуля интеграции. Совместимы с NestJS и NestJS-mod.

--

### Модули инфраструктуры (Infrastructure)

Модули для создания конфигурационных файлов различных внешних от приложения сервисов. Данные модули исключаются из итогового списка модулей которые будут загружены в NestJS.

Примеры: файл `docker-compose` для поднятия базы данных, конфигурационный файл `gitlab` для развертывания приложения. Совместимы только с NestJS-mod.

## Утилиты

--

### Конфигурация (Config model)

Декораторы `ConfigModel`, `ConfigModelProperty` для описания доступных настроек модуля и функция `configTransform` для его сериализации и проверки. Значения должны быть описаны в коде.

--

#### Пример обычного NestJS приложения с конфигурацией

```
import {
ConfigModel,
ConfigModelProperty,
configTransform,
} from "@nestjs-mod/common";
import { DynamicModule, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { IsNotEmpty } from "class-validator";

// Описываем класс конфигурации
@ConfigModel()
class AppConfig {
@ConfigModelProperty()
@IsNotEmpty()
option!: string;
}

// Описываем модуль который получает значения конфигурации при вызове метода forRoot
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

// Пробуем запустить приложение и при этом ничего не передаем в модуль
async function bootstrap1() {
const app = await NestFactory.create(AppModule.forRoot({}));
await app.listen(3000);
}

// Получаем ошибку валидации
// throw new ConfigModelValidationErrors(validateErrors);
// isNotEmpty: option should not be empty
bootstrap1();

// Пробуем запустить приложение и при этом передаем в модуль значения для конфигурации
async function bootstrap2() {
const app = await NestFactory.create(AppModule.forRoot({ option: "value1" }));
console.log(app.get(AppConfig)); // output: { option: 'value1' }
await app.listen(3000);
}

// Ошибки нет
bootstrap2();
```
### Переменные окружения (Env model)

Декораторы `EnvModel`, `EnvModelProperty` для описания переменных окружения модуля и функция `envTransform` для его сериализации и проверки. Значения могут быть автоматически прочитаны из `process.env` или других источников таких как https://www.vaultproject.io или https://developer.hashicorp.com/consul/docs/dynamic-app-config/kv.

--

#### Пример NestJS приложения с различными способами использования переменных окружения

```
import { EnvModel, EnvModelProperty, envTransform } from "@nestjs-mod/common";
import { DynamicModule, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { IsNotEmpty } from "class-validator";

// Описываем класс для работы с переменными окружения
@EnvModel()
class AppEnv {
@EnvModelProperty()
@IsNotEmpty()
option!: string;
}

// Описываем модуль который получает значения переменных окружения при вызове метода forRoot
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

// Пробуем запустить приложение и при этом ничего не передаем в модуль и не имеем нужных переменных в process.env
async function bootstrap1() {
const app = await NestFactory.create(AppModule.forRoot({}));
await app.listen(3000);
}

// Получаем ошибку валидации
// throw new ConfigModelValidationErrors(validateErrors);
// isNotEmpty: option should not be empty
bootstrap1();

// Пробуем запустить приложение и при этом передаем вручную в модуль значения переменных окружения, process.env по прежнему пустой
async function bootstrap2() {
const app = await NestFactory.create(AppModule.forRoot({ option: "value1" }));
console.log(app.get(AppEnv)); // output: { option: 'value1' }
await app.listen(3000);
}

// Ошибки нет
bootstrap2();

// Пробуем запустить приложение и при этом не передаем в модуль значения переменных окружения, а ложим их в process.env
async function bootstrap3() {
process.env["OPTION"] = "value1";
const app = await NestFactory.create(AppModule.forRoot({}));
console.log(app.get(AppEnv)); // output: { option: 'value1' }
await app.listen(3000);
}

// Ошибки нет
bootstrap3();
```
#### Названия ключей полей формируются с помощью форматтеров (formatters).

Примеры:

- основной форматтер - трансформирует цепочку из наименований: приложения, контекста, модуля, свойства, которые формируется в процессе запуска создания приложения и модуля (пример: ). (код)

- кастомный форматтер - наследуется от основного трансформера и включает в цепочку наименований дополнительную статическую строку _STATIC_STRING) (код)

--

#### Значения переменных окружения получаются при помощи экстракторов (extractors), которые в своей работе используют названия ключей которые создали форматтеры.

Примеры:

- основной экстрактор - получает значение по ключу из обьекта который передали в функицю `configTransform` (код)

- `process.env` экстрактор - получает значения из окружения текущего процесса (код)

--

### Функция создания NestJS-mod модуля (createNestModule)

Функция `createNestModule` для создания динамического NestJS модуля с возможностью настройки через конфигурации или переменные окружения, а также предоставляющая возможность использовать часть сервисов модуля через метод `forFeature` или передавать часть конфигураций из фича модулей.

Все модули имеют возможность создания нескольких параллельных именованных экземпляров модуля с различными входными параметрами, для этого нужно передать название экземпляра в опцию `contextName`.

В отличии от NestJS модулей, NestJS-mod модули могут содержать дополнительные методы обертки которые будут вызваны при построении приложения NestJS.

--

### Пример создания нативного NestJS модуля с помощью функции createNestModule и передача различных видов конфигураций

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
#### Методы обертки

Эти методы вызывает функция `bootstrapNestApplication` при построении приложения NestJS-mod, они не будут вызываться, если модуль подключить в обычное NestJS приложение.

- preWrapApplication - вызывается у всех корневых модулей, тут мы можем создать ещё один дополнительный корневой модуль, конфигурация для которого будет динамически сформированна на основе оригинального модуля, например: установливаем новый префикс к названию ключей при работе с перемеными окружения (пример кода)

- wrapApplication - метод который может создать NestJS приложение или микросервис, возвращает инстанс созданного приложения. (пример кода)

- postWrapApplication - данный метод отрабатывает после создания приложения, например нужно запустить прослушку HTTP-порта (пример кода)

При создании модуля можно передать множество различных новых параметров, там есть как оригинальные опции NestJS так и расширенные.

Описания и примеры применения каждой из опций будет рассмотрено в отдельных постах, сейчас распишу только опции для настройки модуля.

--

#### Опции создания NestJS-mod модуля

environmentsModel

Класс и его свойства помечены декораторами типа “Переменные окружения” (Env model), в нем содержатся свойства с примитивными типами, используемые в модуле, значения которых можно получить из различных источников, таких как: `process.env` или `consul-kv`.

configurationModel

Класс и его свойства помечены декораторами типа “Конфигурация” (Config model), свойства примитивных и сложных типов, которые используются в модуле, значения для них необходимо передавать при подключении модуля к приложению, описываются в коде.

staticEnvironmentsModel

Класс “Переменных окружения” (Env model) со статическими свойствами примитивного типа, могут использоваться в момент генерации метаданных модуля, значения можно получить из различных источников, например: `process.env` или `consul-kv`.

Пример: различные условия импортов в зависимости от переменных окружения, динамические роуты для контроллеров REST.

staticConfigurationModel

Класс конфигурации с статическими свойствами примитивного и сложного типов, которые могут использоваться в момент генерации метаданных модуля (импорты, контроллеры), значения для них необходимо передавать при подключении модуля к приложению.

featureEnvironmentsModel

Переменные окружения “фича” модулей с примитивными типами, значения которых можно получить из различных источников, таких как: `process.env` или `consul-kv`.

Пример: название переменной окружения для подключения к базе данных фича модуля отличается от названия переменной окружения рутового коннекшена.

featureConfigurationModel

Класс для “фича” модулей, переменные примитивного и сложного типов, которые можно добавить в текущий модуль из других модулей.

Пример: транспорт для отправки сообщения можно определить как продуктовый “фича” функционал, но основная реализация обхода адресатов и отправка будет являться “ядром” или “интеграционным” модулем.

--

#### Создание основного динамического модуля и передача асинхронной конфигурации

Когда конфигурация модуля заранее неизвестна мы можем передавать её с помощью асинхронной фабрики, если для ее работы нужны другие модули, мы можем передать их через опцию `imports`, так же как в обычном NestJS.

Помимо асинхронной фабрики, можно также использовать класс и передачу по значению, все как и в обычном NestJS.

В NestJS-mod есть ещё один способ передачи конфигурации, это передача Observable потока с значениями этой конфигурации. Данный способ нужен когда значения могут меняться с течением времени.

Пример: модуль ядра для динамической смены адреса и кредов прокси сервера при блокировании текущего, фича модуль может не вызывать дополнительный метод для получения актуального адреса и кредов, он просто использует инстанс конфигурации который был подключен через конструктор, как если бы это была статическая конфигурация.

--

#### Работа с опциями которые были переданы из других модулей (фича конфигурации)

Так как в момент инициализации NestJS модулей, порядок подгрузки (резолвинга) может отличатся, однозначно в момент старта мы можем получить все “фича конфигурации” только в NestJS хуке `onApplicationBootstrap`.

Для получения нужно использовать декоратор `InjectFeatures`. В запущенном приложении (рантайм) проблем с доступом ко всем конфигурациям уже нет.

--

#### Декораторы для работы с сущностями модуля

Так-как использование декораторов это статичный код и его нельзя менять в реальном времени, декораторы для каждого модуля нужно создавать вручную через функцию `getNestModuleDecorators`

--

#### Типы декораторов:

InjectService

Для подключения провайдера по инжектируемому токену или классу.

Пример: если в приложении несколько инстансов одного и того же модуля, но с разным названием контекста, то в декоратор можно передать название этого контекста.

InjectFeatures

Для подключения массива со всеми конфигурациями полученным из различных модулей.

Пример: Есть “систем” модуль доступности сайта и есть фича конфигурация через которую модуль “ядра” для работы с БД сможет оповещать о работоспособности базы данных. На основе этого списка “систем” модуль принимает решение - можно ли пускать людей на бэкенд.

InjectAllFeatures

Если в приложении существует несколько инстансов модуля с разными контекстами то для получения всех “фича конфигураций” нужно использовать этот декоратор.

InjectFeatureEnvironments

Помимо конфигураций можно также получить все переменные окружения которые использовали фича модули.

Пример: некое консольное приложение которое при старте создаст все нужные баз данных на сервере баз данных, строку подключения к базе данных с рутовыми правами получаем с “систем” модуля, а строку подключения к базе данных фича модулей передаем с самих фича модулей и при этом всем названия ключей отличается и должно быть провалидированно при старте приложения.

InjectAllFeatureEnvironments

Тоже самое что и `InjectFeatureEnvironments` только собирает информацию по всем инстансам модуля.

InjectModuleSettings

Иногда нужно получить все метаданные классов конфигураций и классов для переменных окружения модуля, это декоратор для этого.

Пример: приложение собирает все значения конфигураций переменных окружения с названиями ключей и формирует некий отчёт .

InjectAllModuleSettings

Контекстно независимое получение всех метаданных конфигураций модуля.

--

### Функция для создания NestJS-mod приложения

Это наверное самая простая функция `bootstrapNestApplication`, она просто пробегается по объекту с массивом модулей и вызывает враппер методы.

--

#### Пример приложения

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
`? Application is running on: http://${
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
## Схематики

Целевой тип приложений для использования NestJS-mod это монорепозиторий на https://nx.dev.

Так-как шаблон NestJS-mod немного отличается от nx, имеются дополнительные правила проверки качества кода и более строгие правила тайпскрипт конфига, для более быстрого старта разработки приложений на данной архитектуре были разработаны наборы схематиков @nestjs-mod/schematics для генерирования кода.

--

### Схематик для создание базового приложения

--

#### Команды для создания пустого NestJS-mod приложения

```
# Создать пустой nx проект
npx --yes create-nx-workspace@17.2.8 --name=project-name --preset=empty --interactive=false --nx-cloud=false

# Перейти в созданную папку
cd project-name

# Установить схематик для генерации NestJS-mod приложения
npm install --save-dev @nestjs-mod/schematics@latest

# Создать приложение NestJS-mod
./node_modules/.bin/nx g @nestjs-mod/schematics:application --directory=apps/app-name --name=app-name --projectNameAndRootFormat=as-provided --strict=true
```
Пример сгенерированного приложения: https://github.com/nestjs-mod/nestjs-mod-example/tree/master/apps/app-name

--

#### Запуск созданного приложения в режиме разработки

```
# Подготовить все файлы
npm run manual:prepare

# Запустить приложения в watch-режиме
npm run serve:dev:app-name
```
#### Сборка и запуск приложения в продакшен режиме

```
## Собрать приложения
npm run build:prod:app-name

## Запустить собранное приложения
npm run start:prod:app-name
```
#### Интегрированы:

- Pino - логгер для потоковго логирования логов, сайт: https://github.com/pinojs/pino.

- Terminus - для получения статуса приложения, сайт: https://docs.nestjs.com/recipes/terminus.

- InfrastructureMarkdownReportGenerator - генератор документации по инфраструктуре (пример).

- PM2 - генератор скриптов для запуска приложения, сайт: https://pm2.keymetrics.io/

--

### Схематик для создания типовой библиотеки NestJS-mod

--

#### Команда для создание пустой библиотеки

```
# Создание NestJS-mod библиотеки
./node_modules/.bin/nx g @nestjs-mod/schematics:library feature-name --buildable --publishable --directory=libs/feature-name --simpleName=true --projectNameAndRootFormat=as-provided --strict=true
```
Пример сгенерированной библиотеки: https://github.com/nestjs-mod/nestjs-mod-example/tree/master/libs/feature-name

--

#### Интегрированы:

- Команды для создания релизов для Github - action: https://github.com/TheUnderScorer/nx-semantic-release.

- Пустые классы конфигурации и переменных окружения - пример: https://github.com/nestjs-mod/nestjs-mod-example/tree/master/libs/feature-name/src/lib.

--

### Реализованные на данный момент NestJS и NestJS-mod модули

--

#### Системные модули

- DefaultNestApplicationInitializer - Инициализатор приложения NestJS по умолчанию (краткое описание).

- DefaultNestApplicationListener - Прослушиватель приложений NestJS по умолчанию (краткое описание).

- ProjectUtils - Утилиты для настройки глобальных параметров приложения, таких как имя проекта, описание и параметры валидации переменных окружения и переменных конфигурации модулей и приложения (краткое описание).

- NestjsPinoLogger - Pino логер (Обертка для https://www.npmjs.com/package/nestjs-pino, (краткое описание).

- TerminusHealthCheck - Обертка над NestJS модулем для проверки доступности приложения (краткое описание).

- DefaultTestNestApplicationCreate - Модуль для создания тестового приложения NestJS (краткое описание).

- DefaultTestNestApplicationInitializer - Модуль для запуска тестового приложения на NestJS (краткое описание).

--

#### Модули ядра

- PrismaModule - модуль для работы с Prisma-орм (краткое описание).

--

#### Модули инфраструктуры

- DockerCompose - Модуль для генерации docker compose файла (краткое описание).

- DockerComposePostgreSQL - Модуль для описания docker compose сервиса с базой данных postgres, будет использован DockerCompose модулем при генерации итогового compose файла (краткое описание).

- Pm2 - Модуль для генерации конфигурации необходимой для запуска приложения через PM2 (краткое описание).

- NestjsModAllReadmeGenerator - модуль для генерации документации по всей инфраструктуре (краткое описание).

--

### Планы на будущее

- Нужно будет декомпозировать код и типизацию улучшить - так-как при разработке данного проекта я поставил себе некий дедлайн, в который успешно смог вписаться, качество кода при этом сильно пострадало.

- Написать больше тестов на основной функционал - тесты есть не на все возможные ситуации, некоторые параметры при использовании утилит проверялись вручную, а не автоматизировано через тесты. Модули которые лежат в репозитории https://github.com/nestjs-mod/nestjs-mod-contrib вообще не имеют тестов, все проверялось вручную.

- Расширить генератор документации по инфраструктуре.

- Добавить примеры использования для всех модулей и утилит - сейчас работу с ними можно изучить только через прочтение тестов, а нужно чтобы документация была в readme файле.

- Добавить больше модулей оберток или написать свои реализации для типовых вещёй (работа с Redis, работа с Nodemailer и так далее).

- Добавить модули для генерации пайплайн конфигураций gitlab-ci, bitbucket, jenkins

- Добавить генератор для сборки докер образов и генерацию скриптов для разворачивания приложения в Kubernetes.

- Написать консольное приложение для более удобной работы с схематиками.

- Добавить возможность сохранять метаинформацию по модулям и их конфигурации в package.json и возможность развернуть всю кодовую базу и параметры развертывания и доставки имея всего лишь два файла package.json и .env файл.

- Сделать облачное решение которое позволит визуально собирать приложение и включать в него все необходимые модули и группы модулей, которое можно развернуть в любом месте.

--

### Заключение

Я не знаю на сколько такая архитектура приложения и утилиты которые в ней имеются смогут войти в реальный мир разработки на NestJS, но я сам все собственные проекты начал переводить на NestJS-mod, так-что проект точно не умрет ?

--

### Ссылки

- https://github.com/nestjs-mod/nestjs-mod - Коллекция NestJS-mod утилит для унификации приложений и модулей NestJS.

- https://github.com/nestjs-mod/nestjs-mod-contrib - Репозиторий с различными NestJS и NestJS-mod модулями и модулями врапперами

- https://github.com/nestjs-mod/nestjs-mod-example - Пример сгенерированного через @nestjs-mod/schematics приложения

--

### P.S.

Не судите строго за качество кода, в приоритете был скорейший выпуск в открытый доступ некой MVP версии данного проекта.

Проект в open source и если есть желание и время то я буду очень рад новым пулл реквестам и новым контребьютерам.

Хочу сказать спасибо https://github.com/ArgoN1ck за иконку проекта ? и спасибо https://github.com/AleksandrAlyokhin за конструктивные замечания по тексту данной статьи ?

Теги:- [nestjs](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[nestjs])
- [nodejs](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[nodejs])
- [typescript](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[typescript])
- [архитектура](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0])
- [модули](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B8])
- [шаблон](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD])
- [new](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[new])
- [nestjsmod](/ru/search/?target_type=posts&amp;order=relevance&amp;q=[nestjsmod])

Хабы:- [Node.JS](/ru/hubs/nodejs/)
- [Проектирование API](/ru/hubs/api/)
- [TypeScript](/ru/hubs/typescript/)
- [NestJS](/ru/hubs/nestjs/)
- [Nx](/ru/hubs/nx/)