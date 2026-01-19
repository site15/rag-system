## My telegram message #221124
**Time:** 08.03.2023 14:43:07 UTC+05:00
**Link:** https://t.me/nest_ru/221124

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Тем к не погрузился в пучину праздника, помогите разобраться. Пишу тесты. Есть у меня обертка над стандартным  @nestjs/config Выглядит это примерно так  @Module({ imports: [ConfigModule.forRoot({ validate })], providers: [AppConfigService], exports: [AppConfigService], }) export class AppConfigModule {} Как видно в конфиг модуле вызывается некая функция валидации. По сути она проверяет переменные окружения и в случае отсутствия переменной выкидывает ошибку. Так вот при любых тестах, даже там где нет никакого умоминания об модуле конфиг, все равно происходит его инициализация и эта функция валидации вызывается. Что у меня не так и как этого избежать?

Main message:
https://t.me/nest_ru/202645

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/202645

--

## My telegram message #221126
**Time:** 08.03.2023 14:49:16 UTC+05:00
**Link:** https://t.me/nest_ru/221126

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если несложно скинешь Линку на пример или статью
- Тем к не погрузился в пучину праздника, помогите разобраться. Пишу тесты. Есть у меня обертка над стандартным  @nestjs/config Выглядит это примерно так  @Module({ imports: [ConfigModule.forRoot({ validate })], providers: [AppConfigService], exports: [AppConfigService], }) export class AppConfigModule {} Как видно в конфиг модуле вызывается некая функция валидации. По сути она проверяет переменные окружения и в случае отсутствия переменной выкидывает ошибку. Так вот при любых тестах, даже там где нет никакого умоминания об модуле конфиг, все равно происходит его инициализация и эта функция валидации вызывается. Что у меня не так и как этого избежать?
- https://t.me/nest_ru/202645
- А можно немного пояснений? Я это все как бы вроде читал, но возможно упустил деталь. У меня запускается тест, где вообще нет никакой связи с DI. Внутренний класс не связанный с Nest. Почему при вызове теста создается модуль конфигурации?

Main message:
убери ConfigModule.forRoot и не будет он создаваться

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

убери ConfigModule.forRoot и не будет он создаваться

--

## My telegram message #221130
**Time:** 08.03.2023 14:52:33 UTC+05:00
**Link:** https://t.me/nest_ru/221130

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Откуда убрать? У меня вот такой тест  import { UuidUtils } from '@libs/share'; import { General } from './General'; describe('General', () => { describe('constructor', () => { it('should be match to input data', () => { const projectId = 1234; const transactionId = UuidUtils.create(); const instance = new General(projectId, transactionId); expect(instance).toMatchObject({ projectId, transactionId, }); }); }); }} Причем тут модули и Нест?

Main message:
ты разный код кидаешь, у тя в итоге конфиг модуль создается, хотя там неста нет вообще? или что?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты разный код кидаешь, у тя в итоге конфиг модуль создается, хотя там неста нет вообще? или что?

--

## My telegram message #221132
**Time:** 08.03.2023 14:54:08 UTC+05:00
**Link:** https://t.me/nest_ru/221132

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно ли зашивать email пользователя в access Token и слать его на фронт? безопасно ли это
- Откуда убрать? У меня вот такой тест  import { UuidUtils } from '@libs/share'; import { General } from './General'; describe('General', () => { describe('constructor', () => { it('should be match to input data', () => { const projectId = 1234; const transactionId = UuidUtils.create(); const instance = new General(projectId, transactionId); expect(instance).toMatchObject({ projectId, transactionId, }); }); }); }} Причем тут модули и Нест?
- ты разный код кидаешь, у тя в итоге конфиг модуль создается, хотя там неста нет вообще? или что?
- Да. В том то и дело.

Main message:
а как ты узнаешь что создается конфиг модуль если нет неста с его логами который бы показал что модуль создался

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а как ты узнаешь что создается конфиг модуль если нет неста с его логами который бы показал что модуль создался

--

## My telegram message #221135
**Time:** 08.03.2023 14:56:38 UTC+05:00
**Link:** https://t.me/nest_ru/221135

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты разный код кидаешь, у тя в итоге конфиг модуль создается, хотя там неста нет вообще? или что?
- Да. В том то и дело.
- а как ты узнаешь что создается конфиг модуль если нет неста с его логами который бы показал что модуль создался
- Но вот пример теста с модулями Неста  describe('DefaultUserValidateService', () => { let service: DefaultUserValidateService; beforeEach(async () => { const FakeConfigService = { provide: ConfigService, useValue: { get: jest.fn((Key: string, DefaultValue: string) => { switch (Key) { case 'FILES': return './fakedata/'; case 'PORT': return '9999'; default: return DefaultValue; } }), }, }; const moduleRef = await Test.createTestingModule({ providers: [FakeConfigService, DefaultUserValidateService], }) .overrideProvider(ConfigService) .useValue({}) .overrideProvider(AppConfigService) .useValue({}) .useMocker(token => { if (token === AppConfigService) { return { get: jest.fn().mockReturnValue('test') }; } // if (typeof token === 'function') { // return createMock<token>(); // } if (typeof token === 'object') { return createMock<typeof token>(); } return; }) .compile(); service = moduleRef.get(DefaultUserValidateService); }); Я все замокал, как эта функция валидации вызывается?

Main message:
хватит кидать разный не связанный код

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хватит кидать разный не связанный код

--

## My telegram message #221139
**Time:** 08.03.2023 14:58:48 UTC+05:00
**Link:** https://t.me/nest_ru/221139

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
запусти чисто только его

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

запусти чисто только его

--

## My telegram message #221141
**Time:** 08.03.2023 14:59:22 UTC+05:00
**Link:** https://t.me/nest_ru/221141

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
откуда ты узнал что валидация конфига сработала?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

откуда ты узнал что валидация конфига сработала?

--

## My telegram message #221145
**Time:** 08.03.2023 15:00:17 UTC+05:00
**Link:** https://t.me/nest_ru/221145

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Откуда убрать? У меня вот такой тест  import { UuidUtils } from '@libs/share'; import { General } from './General'; describe('General', () => { describe('constructor', () => { it('should be match to input data', () => { const projectId = 1234; const transactionId = UuidUtils.create(); const instance = new General(projectId, transactionId); expect(instance).toMatchObject({ projectId, transactionId, }); }); }); }} Причем тут модули и Нест?

Main message:
где эта функция тут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

где эта функция тут

--

## My telegram message #221147
**Time:** 08.03.2023 15:00:41 UTC+05:00
**Link:** https://t.me/nest_ru/221147

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- откуда ты узнал что валидация конфига сработала?
- Еще раз. Функция валидации запускается, не находит переменной и выкидывает исключение
- где эта функция тут
- Ее там нет

Main message:
а как ты узнал что она запускается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а как ты узнал что она запускается

--

## My telegram message #221149
**Time:** 08.03.2023 15:00:59 UTC+05:00
**Link:** https://t.me/nest_ru/221149

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- где эта функция тут
- Ее там нет
- а как ты узнал что она запускается
- Суслика видишь? А он существует.

Main message:
удали все тесты оставь один

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

удали все тесты оставь один

--

## My telegram message #221151
**Time:** 08.03.2023 15:01:12 UTC+05:00
**Link:** https://t.me/nest_ru/221151

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а как ты узнал что она запускается
- Суслика видишь? А он существует.
- удали все тесты оставь один
- Еще раз. Функция валидации запускается, не находит переменной и выкидывает исключение

Main message:
нет у теяб этой функции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет у теяб этой функции

--

## My telegram message #221153
**Time:** 08.03.2023 15:01:51 UTC+05:00
**Link:** https://t.me/nest_ru/221153

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- удали все тесты оставь один
- Еще раз. Функция валидации запускается, не находит переменной и выкидывает исключение
- нет у теяб этой функции
- Нет... Я тоже ее не вижу, а она запускается.

Main message:
describe('General', () => { describe('constructor', () => { it('should be match to input data', () => { expect({true:true}).toMatchObject({true:true}); }); }); }}

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

describe('General', () => { describe('constructor', () => { it('should be match to input data', () => { expect({true:true}).toMatchObject({true:true}); }); }); }}

--

## My telegram message #221158
**Time:** 08.03.2023 15:06:05 UTC+05:00
**Link:** https://t.me/nest_ru/221158

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет у теяб этой функции
- Нет... Я тоже ее не вижу, а она запускается.
- describe('General', () => { describe('constructor', () => { it('should be match to input data', () => { expect({true:true}).toMatchObject({true:true}); }); }); }}
- Сейчас попробую

Main message:
значит копай в  import { UuidUtils } from '@libs/share'; import { General } from './General';

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

значит копай в  import { UuidUtils } from '@libs/share'; import { General } from './General';

--

## My telegram message #221164
**Time:** 08.03.2023 15:14:16 UTC+05:00
**Link:** https://t.me/nest_ru/221164

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- describe('General', () => { describe('constructor', () => { it('should be match to input data', () => { expect({true:true}).toMatchObject({true:true}); }); }); }}
- Сейчас попробую
- значит копай в  import { UuidUtils } from '@libs/share'; import { General } from './General';
- А так запускается. И я думаю потому, что в одном из файлов есть ссылка на Нест import { BadRequestException, Logger } from ' @nestjs /common'; Сейчас проверю

Main message:
не так может нужно запускать один тест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не так может нужно запускать один тест

--

## My telegram message #221167
**Time:** 08.03.2023 15:15:01 UTC+05:00
**Link:** https://t.me/nest_ru/221167

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- значит копай в  import { UuidUtils } from '@libs/share'; import { General } from './General';
- А так запускается. И я думаю потому, что в одном из файлов есть ссылка на Нест import { BadRequestException, Logger } from ' @nestjs /common'; Сейчас проверю
- не так может нужно запускать один тест
- он

Main message:
npm test -- -t General

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

npm test -- -t General

--

## My telegram message #221171
**Time:** 08.03.2023 15:16:48 UTC+05:00
**Link:** https://t.me/nest_ru/221171

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не так может нужно запускать один тест
- он
- npm test -- -t General
- А вот если выброс ошибки в функции убрать, то один тест проходит нормально

Main message:
-i

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

-i

--

## My telegram message #221177
**Time:** 08.03.2023 15:22:41 UTC+05:00
**Link:** https://t.me/nest_ru/221177

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
нет, я шарю между тестами некоторые обьекты, чтобы много раз их не создавать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет, я шарю между тестами некоторые обьекты, чтобы много раз их не создавать

--

## My telegram message #221181
**Time:** 08.03.2023 15:29:38 UTC+05:00
**Link:** https://t.me/nest_ru/221181

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вот те же яйца
- Кста, вопрос
- нет, я шарю между тестами некоторые обьекты, чтобы много раз их не создавать
- В общем, где искать не понятно.

Main message:
у тебя сейчас все тесты запускаются

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя сейчас все тесты запускаются

--

## My telegram message #221188
**Time:** 08.03.2023 15:32:22 UTC+05:00
**Link:** https://t.me/nest_ru/221188

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В общем, где искать не понятно.
- у тебя сейчас все тесты запускаются
- Да как бы вроде и не запукаются
- А если один тест трогает контекст другого?)

Main message:
у меня призма сервис в каждом интеграционном создавался

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня призма сервис в каждом интеграционном создавался

--

## My telegram message #221194
**Time:** 08.03.2023 15:34:10 UTC+05:00
**Link:** https://t.me/nest_ru/221194

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да как бы вроде и не запукаются
- А если один тест трогает контекст другого?)
- у меня призма сервис в каждом интеграционном создавался
- Так параллельно можно запустить всё

Main message:
Он просто под процесс создает же, и таких дохера становилось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Он просто под процесс создает же, и таких дохера становилось

--

## My telegram message #221198
**Time:** 08.03.2023 15:35:15 UTC+05:00
**Link:** https://t.me/nest_ru/221198

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
мне нужно было чтобы одна база и один призма клиент на все тесты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне нужно было чтобы одна база и один призма клиент на все тесты

--

## My telegram message #221205
**Time:** 08.03.2023 15:37:03 UTC+05:00
**Link:** https://t.me/nest_ru/221205

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Хорошо, а если пойти другим путем. Если я замокал этот сервис конфигурации, то почему он все равно вызывает функцию валидации?

Main message:
модуль точно нигде не импортируется?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модуль точно нигде не импортируется?

--

## My telegram message #221207
**Time:** 08.03.2023 15:38:23 UTC+05:00
**Link:** https://t.me/nest_ru/221207

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хорошо, а если пойти другим путем. Если я замокал этот сервис конфигурации, то почему он все равно вызывает функцию валидации?
- а там условно тест касается 10 энтитей в бд
- модуль точно нигде не импортируется?
- А как он может быть импортирован? Может я здесь что-то не понимаю?

Main message:
вот такого слова в проекте и тестах нигде нет?  ConfigModule

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот такого слова в проекте и тестах нигде нет?  ConfigModule

--

## My telegram message #221212
**Time:** 08.03.2023 16:06:36 UTC+05:00
**Link:** https://t.me/nest_ru/221212

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- модуль точно нигде не импортируется?
- А как он может быть импортирован? Может я здесь что-то не понимаю?
- вот такого слова в проекте и тестах нигде нет?  ConfigModule
- В одно единственном файле, который показал в самом начале

Main message:
Фор Рут нужно вызывать только в апп модуле и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фор Рут нужно вызывать только в апп модуле и все

--

## My telegram message #221215
**Time:** 08.03.2023 16:07:28 UTC+05:00
**Link:** https://t.me/nest_ru/221215

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот такого слова в проекте и тестах нигде нет?  ConfigModule
- В одно единственном файле, который показал в самом начале
- Фор Рут нужно вызывать только в апп модуле и все
- А как тогда сделать, если он мне нужен только во вложенном модуле?

Main message:
Ты хочешь сделать конфиг сервис для своего модуля, его и делай зачем тебе конфиг модуль неста

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты хочешь сделать конфиг сервис для своего модуля, его и делай зачем тебе конфиг модуль неста

--

## My telegram message #221221
**Time:** 08.03.2023 16:11:30 UTC+05:00
**Link:** https://t.me/nest_ru/221221

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Фор Рут нужно вызывать только в апп модуле и все
- А как тогда сделать, если он мне нужен только во вложенном модуле?
- Ты хочешь сделать конфиг сервис для своего модуля, его и делай зачем тебе конфиг модуль неста
- конфиг модуль неста норм

Main message:
его юзают не правильно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

его юзают не правильно

--

## My telegram message #221224
**Time:** 08.03.2023 16:11:51 UTC+05:00
**Link:** https://t.me/nest_ru/221224

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ты хочешь сделать конфиг сервис для своего модуля, его и делай зачем тебе конфиг модуль неста
- конфиг модуль неста норм
- его юзают не правильно
- Согласен, что то, что он работает внутри ди

Main message:
вот как надо  https://t.me/nest_ru/202645

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот как надо  https://t.me/nest_ru/202645

--

## My telegram message #221227
**Time:** 08.03.2023 16:12:38 UTC+05:00
**Link:** https://t.me/nest_ru/221227

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Согласен, что то, что он работает внутри ди
- вот как надо  https://t.me/nest_ru/202645
- а так в целом норм
- А как правильно? Я не понимаю.

Main message:
прочти сообщение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

прочти сообщение

--

## My telegram message #221229
**Time:** 08.03.2023 16:12:41 UTC+05:00
**Link:** https://t.me/nest_ru/221229

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а так в целом норм
- А как правильно? Я не понимаю.
- прочти сообщение
- в доке тож фуфло полное написано

Main message:
глаза есть?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

глаза есть?

--

## My telegram message #221231
**Time:** 08.03.2023 16:13:24 UTC+05:00
**Link:** https://t.me/nest_ru/221231

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- get('name')

Main message:
это только на уровне апп модуля

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это только на уровне апп модуля

--

## My telegram message #221233
**Time:** 08.03.2023 16:13:34 UTC+05:00
**Link:** https://t.me/nest_ru/221233

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в доке тож фуфло полное написано
- глаза есть?
- get('name')
- это только на уровне апп модуля

Main message:
в модулях нельзя такое юзать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в модулях нельзя такое юзать

--

## My telegram message #221236
**Time:** 08.03.2023 16:13:49 UTC+05:00
**Link:** https://t.me/nest_ru/221236

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- get('name')
- это только на уровне апп модуля
- в модулях нельзя такое юзать
- Посмотри как всё красиво

Main message:
говно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

говно

--

## My telegram message #221254
**Time:** 08.03.2023 16:17:11 UTC+05:00
**Link:** https://t.me/nest_ru/221254

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А как тогда сделать, если он мне нужен только во вложенном модуле?

Main message:
вот пример  https://github.com/EndyKaufman/kaufman-bot/blob/develop/libs/bot-in-groups/server/src/lib/bot-in-groups-config/bot-in-groups.config.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот пример  https://github.com/EndyKaufman/kaufman-bot/blob/develop/libs/bot-in-groups/server/src/lib/bot-in-groups-config/bot-in-groups.config.ts

--

## My telegram message #221261
**Time:** 08.03.2023 16:18:10 UTC+05:00
**Link:** https://t.me/nest_ru/221261

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- То, что я вижу здесть - это написание своего собственно модуля конфигурации.

Main message:
это написание модуля с опциями которые ты хочешь в него передать с рута

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это написание модуля с опциями которые ты хочешь в него передать с рута

--

## My telegram message #221266
**Time:** 08.03.2023 16:19:41 UTC+05:00
**Link:** https://t.me/nest_ru/221266

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это написание модуля с опциями которые ты хочешь в него передать с рута

Main message:
а как в руте ты эту переменные получши из  @nestjs /config или process.env или через либу env-var, я юзаю env-var, ну это не суть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а как в руте ты эту переменные получши из  @nestjs /config или process.env или через либу env-var, я юзаю env-var, ну это не суть

--

## My telegram message #221270
**Time:** 08.03.2023 16:20:48 UTC+05:00
**Link:** https://t.me/nest_ru/221270

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
раньше не было такой фичи что я скидываю это в нест9 появилось, а либы писались до этого, у них легаси потход, каждый как мог так и пилил, сейчас нужно так как я описал и как в несте описано

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

раньше не было такой фичи что я скидываю это в нест9 появилось, а либы писались до этого, у них легаси потход, каждый как мог так и пилил, сейчас нужно так как я описал и как в несте описано

--

## My telegram message #221272
**Time:** 08.03.2023 16:22:14 UTC+05:00
**Link:** https://t.me/nest_ru/221272

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
нифига не одинаково, в либе не нужно юзать nestjs/config это прост прослойка для работы с process.env, тоесть по сути ты используя nestjs/config в модулях - используешь process.env в модулях, просто через обертку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нифига не одинаково, в либе не нужно юзать nestjs/config это прост прослойка для работы с process.env, тоесть по сути ты используя nestjs/config в модулях - используешь process.env в модулях, просто через обертку

--

## My telegram message #221279
**Time:** 08.03.2023 16:23:13 UTC+05:00
**Link:** https://t.me/nest_ru/221279

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так в либе ты и не юзаешь

Main message:
народ юзает конфигсервис от конфиг модуля неста в либах

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

народ юзает конфигсервис от конфиг модуля неста в либах

--

## My telegram message #221331
**Time:** 08.03.2023 17:04:07 UTC+05:00
**Link:** https://t.me/nest_ru/221331

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну значит я не прав
- то в контексте ноды
- так адаптируй под призму
- Спасибо, Ильшат. В общем проблема была только в одном похоже.  ConfigModule.forRoot мы вызываем только рутовом модуле, далее, в остальные модули мы его либо импортируем  imports: [ConfigModule] , либо просто можем сделать глобальным. Я не знаю как для остальных модулей (я уже буду обращать на это внимание), но для конфига forRoot не может быть вызван во вложенном модуле.

Main message:
ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага

--

## My telegram message #221334
**Time:** 08.03.2023 17:09:40 UTC+05:00
**Link:** https://t.me/nest_ru/221334

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так адаптируй под призму
- Спасибо, Ильшат. В общем проблема была только в одном похоже.  ConfigModule.forRoot мы вызываем только рутовом модуле, далее, в остальные модули мы его либо импортируем  imports: [ConfigModule] , либо просто можем сделать глобальным. Я не знаю как для остальных модулей (я уже буду обращать на это внимание), но для конфига forRoot не может быть вызван во вложенном модуле.
- ага
- Вот теперь бы разобраться что именно так отличает forRoot и forFeature. Тут у меня пока пробел

Main message:
NameModule.forRoot - некие настройки передаются с рута - настройки к бд в тайп орм NameModule.forFeature - некие доп параметры помимо того что передали с рута, можно разные передавать в разных модулях - ентити описывать в тайп орм NameModule - некоторые общие штуки, sql парсер например

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

NameModule.forRoot - некие настройки передаются с рута - настройки к бд в тайп орм NameModule.forFeature - некие доп параметры помимо того что передали с рута, можно разные передавать в разных модулях - ентити описывать в тайп орм NameModule - некоторые общие штуки, sql парсер например

--

## My telegram message #221336
**Time:** 08.03.2023 17:30:53 UTC+05:00
**Link:** https://t.me/nest_ru/221336

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ага
- Вот теперь бы разобраться что именно так отличает forRoot и forFeature. Тут у меня пока пробел
- NameModule.forRoot - некие настройки передаются с рута - настройки к бд в тайп орм NameModule.forFeature - некие доп параметры помимо того что передали с рута, можно разные передавать в разных модулях - ентити описывать в тайп орм NameModule - некоторые общие штуки, sql парсер например
- Как? Он не шарится никак, джест запускает тесты в отдельных процессах. А если ему это запретить, то все равно чистит память перед новыми тестами от файла к файлу

Main message:
хз у меня вышло как то

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хз у меня вышло как то

--

## My telegram message #221340
**Time:** 08.03.2023 19:01:28 UTC+05:00
**Link:** https://t.me/nest_ru/221340

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- forRoot модуля вызвать можно на любом уровне, он гарантирует лишь, что все провайдеры, экспортированные из модуля перезапишут или не будут перезаписаны при других инициализациях. forFeature провайдеры могут быть перезаписаны провайдерами нижнего уровня.

Main message:
Это не работает, оно не перезаписывает ниже, оно создаёт новый провайдер, старый как жил так и будет жить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это не работает, оно не перезаписывает ниже, оно создаёт новый провайдер, старый как жил так и будет жить

--

## My telegram message #221344
**Time:** 08.03.2023 19:13:01 UTC+05:00
**Link:** https://t.me/nest_ru/221344

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Вообще Nest перезаписывает провайдер, когда его токен идентичен. Провайдер в уровне зависит только от последовательности импортов/последовательности провайдеров/последовательности экспортов – это я расписал по «приоритету»

Main message:
Не перезаписывает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не перезаписывает

--

## My telegram message #221347
**Time:** 08.03.2023 19:13:47 UTC+05:00
**Link:** https://t.me/nest_ru/221347

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это не работает, оно не перезаписывает ниже, оно создаёт новый провайдер, старый как жил так и будет жить
- Вообще Nest перезаписывает провайдер, когда его токен идентичен. Провайдер в уровне зависит только от последовательности импортов/последовательности провайдеров/последовательности экспортов – это я расписал по «приоритету»
- Не перезаписывает
- Ниже ничего не может быть перезаписано не из-за неста, а из-за замыкания на модуле. Ты фактически в модуль нижнего уровня не можешь ничего засунуть, иначе будут циклические зависимости

Main message:
Если перезаписывает я был бы очень рад(

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Если перезаписывает я был бы очень рад(

--

## My telegram message #221350
**Time:** 08.03.2023 19:20:32 UTC+05:00
**Link:** https://t.me/nest_ru/221350

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Этот ты на одном уровне

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Этот ты на одном уровне

--

## My telegram message #221357
**Time:** 08.03.2023 19:28:19 UTC+05:00
**Link:** https://t.me/nest_ru/221357

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Сделай вместо useValue, useFactory чтобы глянуть сколько раз в диай положим значение и выведи имя, чтобы отличит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сделай вместо useValue, useFactory чтобы глянуть сколько раз в диай положим значение и выведи имя, чтобы отличит

--

## My telegram message #221361
**Time:** 08.03.2023 19:59:57 UTC+05:00
**Link:** https://t.me/nest_ru/221361

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Ты пробнул?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты пробнул?

--

## My telegram message #221366
**Time:** 08.03.2023 20:04:45 UTC+05:00
**Link:** https://t.me/nest_ru/221366

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Сделай вместо useValue, useFactory чтобы глянуть сколько раз в диай положим значение и выведи имя, чтобы отличит
- Перечитал ещё раз и понял. Объясню. На этапе сборки контейнера и построения графа, NestContainer увидит 2 провайдера, в разных контекстах. Они будут жить и существовать каждый в своём контексте. Дальше у тебя начинается этап резолвов, когда Injectы по токенам диктует кому и сколько надо. Вот тут и начнётся эпопея. Провайдеры сбилжены, НО! Если у тебя уже есть провайдер с таким токеном в контексте, то он будет перезаписан "новопришедшим", т.к. он, типа, "новее".
- Ты пробнул?
- Я скрины выше скинул. Я не говорю, что у тебя в нижнем уровне ссылка поменяется. Nest в такое не умеет, он тупой как пробка

Main message:
Я себе такое запилил, он делает примерно то что я и хочу  https://github.com/EndyKaufman/nestjs-custom-injector

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я себе такое запилил, он делает примерно то что я и хочу  https://github.com/EndyKaufman/nestjs-custom-injector

--

## My telegram message #221372
**Time:** 08.03.2023 22:28:24 UTC+05:00
**Link:** https://t.me/nest_ru/221372

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я скрины выше скинул. Я не говорю, что у тебя в нижнем уровне ссылка поменяется. Nest в такое не умеет, он тупой как пробка
- Я себе такое запилил, он делает примерно то что я и хочу  https://github.com/EndyKaufman/nestjs-custom-injector
- Подскажите, пожалуйста, где почитать, как подключиться по ssh-туннелю в Nestjs к хостингу, на котором крутится MongoDb?
- люди добрые, приветствую. существует проект, в котором требуется прибегнуть к подключению cli плагина nestjs/swagger. при корректном его подключении, а я смотрю и на документацию, и на 11 пример в репозитории nest, он все также не функционирует должным образом

Main message:
Вход или выход дто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вход или выход дто

--

## My telegram message #221378
**Time:** 08.03.2023 22:29:33 UTC+05:00
**Link:** https://t.me/nest_ru/221378

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- люди добрые, приветствую. существует проект, в котором требуется прибегнуть к подключению cli плагина nestjs/swagger. при корректном его подключении, а я смотрю и на документацию, и на 11 пример в репозитории nest, он все также не функционирует должным образом
- Вход или выход дто
- и в том и другом случае результат нулевой
- у меня все четко работает

Main message:
Выход хитрость, вход на 8мом пашет, 9 не помню

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Выход хитрость, вход на 8мом пашет, 9 не помню

--

## My telegram message #221383
**Time:** 08.03.2023 22:40:24 UTC+05:00
**Link:** https://t.me/nest_ru/221383

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- такой вопрос насколько адекватно написать небольшой монолит - а уже потом разбивать его на разыне микросервисы ? вообще такая практика как ?

Main message:
Я так делаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я так делаю

--

## My telegram message #221388
**Time:** 08.03.2023 22:44:36 UTC+05:00
**Link:** https://t.me/nest_ru/221388

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- такой вопрос насколько адекватно написать небольшой монолит - а уже потом разбивать его на разыне микросервисы ? вообще такая практика как ?
- Я так делаю
- понял приянл! спасибо
- Слушай , а деплой неста на что делаешь? Через github actions?

Main message:
Так как в начале мы не знаем что у нас будет тормозить и что именно нужно в мс выносить, и какой это будет мс, с скейлингом или нет А когда люди пытаются разбивать мс по доменам бизнеса - выходит запутанный моносервис с обратными запросами, тоже самое как циклические зависимости в нест модулях

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Так как в начале мы не знаем что у нас будет тормозить и что именно нужно в мс выносить, и какой это будет мс, с скейлингом или нет А когда люди пытаются разбивать мс по доменам бизнеса - выходит запутанный моносервис с обратными запросами, тоже самое как циклические зависимости в нест модулях

--

## My telegram message #221393
**Time:** 08.03.2023 22:52:57 UTC+05:00
**Link:** https://t.me/nest_ru/221393

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну я наслышан уже и увидел море примеров в интернете Как делают интернет магазин с микросервисами) где карзина один сервис юезр второй ццена 3ий звучит как идиотизм у меня тут скорее проще вопрос выносить ли авторизацию и регистрацию в отедельынй сервис и платежки но думаю я поступлю так как ты поисал смысл заниматся оптимизацией ) когда проект еще недописан) спасибо

Main message:
Про модулями таже тема, не всём нужны тонны модулей Модули ещё нужно уметь готовить  https://t.me/nest_ru/183139

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Про модулями таже тема, не всём нужны тонны модулей Модули ещё нужно уметь готовить  https://t.me/nest_ru/183139

--

## My telegram message #221515
**Time:** 09.03.2023 17:53:25 UTC+05:00
**Link:** https://t.me/nest_ru/221515

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Подскажите Как вы рассчитываете Железняки под свой сервер ? К примеру рассвет на 5-10т юзеров активных в день Как мне понять какое железо оптимально Если 80% это будут данные с кэша И у каждого юзера будет где-то каждую секунду запись в бд одна

Main message:
Запускаю е2е в колве сколько хочу юзеров чтобы было

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Запускаю е2е в колве сколько хочу юзеров чтобы было

--

## My telegram message #221523
**Time:** 09.03.2023 18:18:02 UTC+05:00
**Link:** https://t.me/nest_ru/221523

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Разве хорошая практика выносить в микросервис с целью скейлить? Сколько не читал фанговских и других гуру все говорят, что микросервисы нужны только при разделении на команды с разными подходами/языками. Микросервисы это не про технические решения изначально, а про социальные

Main message:
я про это писал войс в флуде) ну мое мнение чисто, можешь сходить поискать, сюда не буду кидать (че попало ибо)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я про это писал войс в флуде) ну мое мнение чисто, можешь сходить поискать, сюда не буду кидать (че попало ибо)

--

