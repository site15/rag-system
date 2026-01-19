## My telegram message #188260
**Time:** 12.09.2022 11:35:54 UTC+05:00
**Link:** https://t.me/nest_ru/188260

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ага. Ты там держись. (с) медвед
- где можно посмотреть реальный микросервисный проект с использованием grpc ?
- На гитхабе
- отлично!! ссылку, пожалуйста🤘

Main message:
держи  http://github.com

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

держи  http://github.com

--

## My telegram message #188262
**Time:** 12.09.2022 11:39:39 UTC+05:00
**Link:** https://t.me/nest_ru/188262

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
вот репа Саши, одного из админов  https://github.com/AlexDaSoul/nestjs-grpc-angular

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот репа Саши, одного из админов  https://github.com/AlexDaSoul/nestjs-grpc-angular

--

## My telegram message #188265
**Time:** 12.09.2022 12:34:10 UTC+05:00
**Link:** https://t.me/nest_ru/188265

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- главное не используй это на фронте. между микросервисами ок, но есть нюансы: разные реализации GRPC

Main message:
Контракты нужно чтобы одни и теже были, поэтому приходится и на фронт тащить, либо прикручивать авто конвертер грпс в граф куэль для фронта

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Контракты нужно чтобы одни и теже были, поэтому приходится и на фронт тащить, либо прикручивать авто конвертер грпс в граф куэль для фронта

--

## My telegram message #188269
**Time:** 12.09.2022 12:37:29 UTC+05:00
**Link:** https://t.me/nest_ru/188269

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Давшахту посмотри. Он показывал как на несте гексагоналку готовить.
- главное не используй это на фронте. между микросервисами ок, но есть нюансы: разные реализации GRPC
- Контракты нужно чтобы одни и теже были, поэтому приходится и на фронт тащить, либо прикручивать авто конвертер грпс в граф куэль для фронта
- И получить 300 кб javascript кода он контрактов на фронте.

Main message:
Ну тут сам решаешь чем жертвовать, надёжность или быстрый старт фронта

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну тут сам решаешь чем жертвовать, надёжность или быстрый старт фронта

--

## My telegram message #188271
**Time:** 12.09.2022 12:39:07 UTC+05:00
**Link:** https://t.me/nest_ru/188271

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Контракты нужно чтобы одни и теже были, поэтому приходится и на фронт тащить, либо прикручивать авто конвертер грпс в граф куэль для фронта
- И получить 300 кб javascript кода он контрактов на фронте.
- Ну тут сам решаешь чем жертвовать, надёжность или быстрый старт фронта
- Посмотри его последнее выступление на яндекс сходке, где он говорит, что нест не нужен в экосистеме JS)))

Main message:
Никогда не нужно дублировать контракты на фронте, всегда нужно юзать то что с Бэка летит, либо по граф схеме генерить, либо по Сваггер спеке, либо по протникам грпс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Никогда не нужно дублировать контракты на фронте, всегда нужно юзать то что с Бэка летит, либо по граф схеме генерить, либо по Сваггер спеке, либо по протникам грпс

--

## My telegram message #188275
**Time:** 12.09.2022 12:39:41 UTC+05:00
**Link:** https://t.me/nest_ru/188275

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Там ещё есть ряд проблем, которых надо решить: дефолты, null, undef... ))

Main message:
Они всегда есть, всякие проблемы)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Они всегда есть, всякие проблемы)

--

## My telegram message #188277
**Time:** 12.09.2022 12:40:09 UTC+05:00
**Link:** https://t.me/nest_ru/188277

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну, взгляды меняются) Люди - они такие)
- Grpc лучше ложится на Рест. Не?
- Они всегда есть, всякие проблемы)
- GRPC идёт на фронт через эмуляцию.

Main message:
Ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ага

--

## My telegram message #188605
**Time:** 13.09.2022 10:06:18 UTC+05:00
**Link:** https://t.me/nest_ru/188605

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Global плохая практика, становится доступен всем. Как под капотом реализовано, не скажу. Возможно экземпляр помечается как инджектить во все, то-есть сразу при создании класс, автоматически добавляется зависимость, даже если ты ее не используешь. Более знающие, поправьте меня
- написать type? KEKW
- не актуально) спасибо))
- Всем привет! Кто может помочь? .env файл не читается в конфиг файле для миграции typeOrm CLI

Main message:
const load = require('dotenv').load; const fs = require('fs'); const envName = process.env.NODE_ENV || 'develop'; try { fs.accessSync(`${envName}.env`); load({ path: `${envName}.env` }); console.log(`env file: ${envName}.env`); } catch (error) { console.log(`error on get env file: ${envName}.env`); try { fs.accessSync(`.env`); load(); console.log(`env file: .env`); } catch (error) { console.log(`error on get env file: .env`); } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

const load = require('dotenv').load; const fs = require('fs'); const envName = process.env.NODE_ENV || 'develop'; try { fs.accessSync(`${envName}.env`); load({ path: `${envName}.env` }); console.log(`env file: ${envName}.env`); } catch (error) { console.log(`error on get env file: ${envName}.env`); try { fs.accessSync(`.env`); load(); console.log(`env file: .env`); } catch (error) { console.log(`error on get env file: .env`); } }

--

## My telegram message #188608
**Time:** 13.09.2022 10:26:16 UTC+05:00
**Link:** https://t.me/nest_ru/188608

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не актуально) спасибо))
- Всем привет! Кто может помочь? .env файл не читается в конфиг файле для миграции typeOrm CLI
- const load = require('dotenv').load; const fs = require('fs'); const envName = process.env.NODE_ENV || 'develop'; try { fs.accessSync(`${envName}.env`); load({ path: `${envName}.env` }); console.log(`env file: ${envName}.env`); } catch (error) { console.log(`error on get env file: ${envName}.env`); try { fs.accessSync(`.env`); load(); console.log(`env file: .env`); } catch (error) { console.log(`error on get env file: .env`); } }
- Вроде надо вызывать метод config у dotenv чтобы подгрузить

Main message:
ну я так грузил, ща может чет в либе и сменилось  https://github.com/rucken/core-nestjs/blob/develop/ormconfig.js#L14

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я так грузил, ща может чет в либе и сменилось  https://github.com/rucken/core-nestjs/blob/develop/ormconfig.js#L14

--

## My telegram message #188636
**Time:** 13.09.2022 17:07:46 UTC+05:00
**Link:** https://t.me/nest_ru/188636

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- как использовать Redis в NestJS, используя cache-manager или можно ли использовать  @nestjs -modules/ioredis напрямую?

Main message:
ну смотря что тебе нужно, напрямую мало смысла обычно, или для кэша юзаем или для евентов микросервисных

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну смотря что тебе нужно, напрямую мало смысла обычно, или для кэша юзаем или для евентов микросервисных

--

## My telegram message #188644
**Time:** 13.09.2022 18:06:31 UTC+05:00
**Link:** https://t.me/nest_ru/188644

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Есть класс Middleware в конструктор который подключается userService. Я хочу протестировать что в методе use() запускается один из методов userService. Для этого создал моковый модуль через Test.createTestingModule() и подлючил Middleware в качестве провайдера и указал переписать провайдер UserService на свою реализацию. Проблема в том, что он по каким-то причинам не использует мою реализацию UserService, а подключает оригинальный класс, а там обламывается из-за невозможности подключить прочие вещи используемые в UserService. Как сделать чтобы он использовал мою реализацию UserService?

Main message:
через это пробни  https://docs.nestjs.com/fundamentals/testing#auto-mocking

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через это пробни  https://docs.nestjs.com/fundamentals/testing#auto-mocking

--

## My telegram message #188646
**Time:** 13.09.2022 18:07:49 UTC+05:00
**Link:** https://t.me/nest_ru/188646

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спасибо
- Всем привет! Есть класс Middleware в конструктор который подключается userService. Я хочу протестировать что в методе use() запускается один из методов userService. Для этого создал моковый модуль через Test.createTestingModule() и подлючил Middleware в качестве провайдера и указал переписать провайдер UserService на свою реализацию. Проблема в том, что он по каким-то причинам не использует мою реализацию UserService, а подключает оригинальный класс, а там обламывается из-за невозможности подключить прочие вещи используемые в UserService. Как сделать чтобы он использовал мою реализацию UserService?
- через это пробни  https://docs.nestjs.com/fundamentals/testing#auto-mocking
- Ага, сейчас.

Main message:
конкретно то что у тебя, я делаю сразу переопределяемым через forRootAsync если не передают ничего, то юзается дефолтная реализация

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

конкретно то что у тебя, я делаю сразу переопределяемым через forRootAsync если не передают ничего, то юзается дефолтная реализация

--

## My telegram message #188648
**Time:** 13.09.2022 18:30:50 UTC+05:00
**Link:** https://t.me/nest_ru/188648

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- через это пробни  https://docs.nestjs.com/fundamentals/testing#auto-mocking
- Ага, сейчас.
- конкретно то что у тебя, я делаю сразу переопределяемым через forRootAsync если не передают ничего, то юзается дефолтная реализация
- Поведение не изменилось.

Main message:
зачем ты так делаешь?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

зачем ты так делаешь?

--

## My telegram message #188653
**Time:** 13.09.2022 18:48:18 UTC+05:00
**Link:** https://t.me/nest_ru/188653

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я через этот Middleware проверяю наличие токена, запрашиваю пользователя и ставлю в request.user. Я думаю Middleware тут подходит полностью. Думаете с перехватчиком таких проблем не будет? Попробую через него.

Main message:
Я просто не уверен что мидл вар как то с диай общается это экспрессовая штука, она до и после Неста, не В

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я просто не уверен что мидл вар как то с диай общается это экспрессовая штука, она до и после Неста, не В

--

## My telegram message #188655
**Time:** 13.09.2022 19:07:24 UTC+05:00
**Link:** https://t.me/nest_ru/188655

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я через этот Middleware проверяю наличие токена, запрашиваю пользователя и ставлю в request.user. Я думаю Middleware тут подходит полностью. Думаете с перехватчиком таких проблем не будет? Попробую через него.
- гвард нужен или интерцептор, что в данном случае +- похоже
- Я просто не уверен что мидл вар как то с диай общается это экспрессовая штука, она до и после Неста, не В
- Он декорирован через  @Injectable() , поэтому должен общаться как обычный сервис.

Main message:
в тестовом модуле не все работает по диай как в обычном ди нест приложения

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в тестовом модуле не все работает по диай как в обычном ди нест приложения

--

## My telegram message #188712
**Time:** 13.09.2022 21:22:18 UTC+05:00
**Link:** https://t.me/nest_ru/188712

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Получается мне нужно писать файловый интерцептор который будет загружать файл не на локальный сервер а напрямую в с3

Main message:
Не нужно, грузи сразу в с3

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не нужно, грузи сразу в с3

--

## My telegram message #188714
**Time:** 13.09.2022 21:23:34 UTC+05:00
**Link:** https://t.me/nest_ru/188714

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- посмотри возможность рестрима
- Перехватчики срабатывают после стражников. Поэтому не получится в перехватчике сохранить данные о пользователе в объект запроса, а в стражнике проверять есть ли эти данные чтобы пустить запрос в обработчик. Вы ещё советовали писать получение данных пользователя в стражнике, но с ним такая же беда при тестировании: невозможность сделать мок внедрённого сервиса. По крайней мере у меня не получилось. Поэтому оставлю логику получения данных пользователя в Middleware, а тесты на него писать не буду.
- Не нужно, грузи сразу в с3
- +

Main message:
Бэк отдаёт ссылку на аплоад фронту, фронт по ней грузит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Бэк отдаёт ссылку на аплоад фронту, фронт по ней грузит

--

## My telegram message #188717
**Time:** 13.09.2022 21:24:27 UTC+05:00
**Link:** https://t.me/nest_ru/188717

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не нужно, грузи сразу в с3
- +
- Бэк отдаёт ссылку на аплоад фронту, фронт по ней грузит
- так, после загрузки какая логика работы?

Main message:
На выдачу также создаешь ссылку на выдачу через СДК и отдаешь фронту

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На выдачу также создаешь ссылку на выдачу через СДК и отдаешь фронту

--

## My telegram message #188723
**Time:** 13.09.2022 21:25:44 UTC+05:00
**Link:** https://t.me/nest_ru/188723

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так, после загрузки какая логика работы?
- На выдачу также создаешь ссылку на выдачу через СДК и отдаешь фронту
- фронт отправляе5т сам файл, после загрузки дергает метод бэка
- вайкер? Оо

Main message:
Да это ты)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да это ты)

--

## My telegram message #188735
**Time:** 13.09.2022 21:28:20 UTC+05:00
**Link:** https://t.me/nest_ru/188735

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну ладно)
- А как если мне нужно конвертацию формата или сжатие, или изменить размер
- Новый
- Понял

Main message:
Можно image proxy подрубить он сам умеет типовые вещи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Можно image proxy подрубить он сам умеет типовые вещи

--

## My telegram message #188739
**Time:** 13.09.2022 21:30:33 UTC+05:00
**Link:** https://t.me/nest_ru/188739

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну там будет в квери задаваться надо ли делать оптимизации или нет

Main message:
Да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да

--

## My telegram message #188757
**Time:** 13.09.2022 23:24:56 UTC+05:00
**Link:** https://t.me/nest_ru/188757

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Понял
- У меня есть таблица Юзеров с первичным ключом и есть таблица настроек с внешним ключом на таблицу юзеров в отношении один к одному. В таблице настроек все поля идут по дефолту. Я хочу что бы при сохранении юзера у меня создавалась запись в таблице настроек с айди юзера и соответственно когда я достаю юзера у меня так же подтягивались настройки. Это юзер, тут я сделал абстрацию что бы добавить касккад и иагер  @OneToOne(() => Settings, (settings: Settings) => settings.user_id, { eager: true, cascade: true }) public settings: Settings;  А это сущность настроек:  @OneToOne(() => User) @JoinColumn({ name: 'user_id' }) public user_id: User;  но он почему то всё равно ничего не сохраняет при инсёрте
- Ребят подскажите почему метод может вызываться 2 раза. Установил  @nestjs /event-emitter Сделал настройку в app.module стандартную как указано в доке Далее вызываю метод в контроллере  @UseInterceptors(ClassSerializerInterceptor) @Post('/register') async register(@Body() userDto: UserCreateDto): Promise<UserDto> { return new UserEntity(await this.userService.create(userDto)); }  Который вызывает метод в сервисе (скрин) и так же накинул на нужный декоратор, на метод который нужно вызвать По итогу вижу, что в консоли показывает 1 мой консоль лог и то что метод отправки почты срабатывает 2 раза. Посмотрел, вроде все по доке сделано, попытался погуглить в чем проблема, но ничего конкретного. Мб кто сталкивался с такой проблемой, в какую сторону смотреть?
- Всем привет! Уже все что только можно перепробовал, последняя надежда на ваш чат, я пытаюсь подключить к NestJS Minio, я пробовал разные либы ( nestjs-minio-client ,  nestjs-minio ), пытался напрямую с  minio ( private readonly   minioClient =   new   Minio.Client({}) ) работать, но все это всегда приводит к ошибке Error: getaddrinfo ENOTFOUND minio когда запускается метод  putObject . Сам Minio запустил через docker-compose, image: minio/minio:RELEASE.2022-09-07T22-25-02Z Я честно весть гугл перерыл и такое ощущение что только у одного меня такая проблема вылезла, заранее спасибо за помощь!

Main message:
Localhost

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Localhost

--

## My telegram message #188974
**Time:** 15.09.2022 14:51:14 UTC+05:00
**Link:** https://t.me/nest_ru/188974

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Oneof нужно использовать
- кто то знает?
- npmjs.com/package/form-data
- Привет всем! Посоветуйте пожалуйста минималистичную либу для миграций типо  этой , но что бы рабочую)

Main message:
я flyway юзаю но она не такая минималистическая) для ее работы нужна джава

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я flyway юзаю но она не такая минималистическая) для ее работы нужна джава

--

## My telegram message #188978
**Time:** 15.09.2022 14:53:41 UTC+05:00
**Link:** https://t.me/nest_ru/188978

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- npmjs.com/package/form-data
- Привет всем! Посоветуйте пожалуйста минималистичную либу для миграций типо  этой , но что бы рабочую)
- я flyway юзаю но она не такая минималистическая) для ее работы нужна джава
- понял, пасиба) Стоит попробовать

Main message:
ну миграции сам пишешь все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну миграции сам пишешь все

--

## My telegram message #188980
**Time:** 15.09.2022 14:55:06 UTC+05:00
**Link:** https://t.me/nest_ru/188980

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я flyway юзаю но она не такая минималистическая) для ее работы нужна джава
- понял, пасиба) Стоит попробовать
- ну миграции сам пишешь все
- Понял, спасибо, пойду пробовать, если что – вернусь с вопросами сюда)

Main message:
вот пример использования тут посари  https://github.com/site15/site15.ru/blob/develop/package.json#L13

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот пример использования тут посари  https://github.com/site15/site15.ru/blob/develop/package.json#L13

--

## My telegram message #188987
**Time:** 15.09.2022 15:02:18 UTC+05:00
**Link:** https://t.me/nest_ru/188987

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет. Не знаю как реализовать. Задача такая : Сделать провести группировку по дням посчитать сумму и количество запросов типа 1 и типа 2 для каждого дня. Orm: Prisma

Main message:
я сырым такие запросы пишу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я сырым такие запросы пишу

--

## My telegram message #188990
**Time:** 15.09.2022 15:06:44 UTC+05:00
**Link:** https://t.me/nest_ru/188990

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Благодарю!
- всем привет. Не знаю как реализовать. Задача такая : Сделать провести группировку по дням посчитать сумму и количество запросов типа 1 и типа 2 для каждого дня. Orm: Prisma
- я сырым такие запросы пишу
- А что думаете по поводу Liquibase? Пишут что она может все тоже самое и немного лучше вроде как и тоже опенсорс

Main message:
мне флайвей норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне флайвей норм

--

## My telegram message #188992
**Time:** 15.09.2022 15:06:56 UTC+05:00
**Link:** https://t.me/nest_ru/188992

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я сырым такие запросы пишу
- А что думаете по поводу Liquibase? Пишут что она может все тоже самое и немного лучше вроде как и тоже опенсорс
- мне флайвей норм
- предлагаешь составить классическую инструкцию SQL и скормить ее ?

Main message:
все что нужно мне, там есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все что нужно мне, там есть

--

## My telegram message #189001
**Time:** 15.09.2022 15:45:35 UTC+05:00
**Link:** https://t.me/nest_ru/189001

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо , посмотрю что получится в этом ключе )
- ?
- сколько вас открытий чудных ждёт на пути proto ещё ))
- gauge_params = 3 digital_params = 4 Proto строго типизированный, это тебе не ts с его возможностью схавать что угодно)

Main message:
на грпс всегда искал коде ферст либу для неста, чет так и не нашел)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на грпс всегда искал коде ферст либу для неста, чет так и не нашел)

--

## My telegram message #189008
**Time:** 15.09.2022 15:47:25 UTC+05:00
**Link:** https://t.me/nest_ru/189008

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
все так делают)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все так делают)

--

## My telegram message #189014
**Time:** 15.09.2022 15:53:26 UTC+05:00
**Link:** https://t.me/nest_ru/189014

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
некоторые люди так говорят про сваггер спеку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

некоторые люди так говорят про сваггер спеку

--

## My telegram message #189021
**Time:** 15.09.2022 15:56:22 UTC+05:00
**Link:** https://t.me/nest_ru/189021

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- некоторые люди так говорят про сваггер спеку
- Тоже вариант ))
- ну во тмне нравятся подобные реализации) пару строк кода и у тебя уже поднят сервер окторый полностью соблюдает контракт
- Доведи проект до продакшина с контрактами более полтора метода. Там и поговорим.

Main message:
я думаю схема ферст только в двух случаях оправдан: когда общаются между собою системы на разных языка, или две сильно разграниченные системы (две команды которые не знают о существовании друг друга)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я думаю схема ферст только в двух случаях оправдан: когда общаются между собою системы на разных языка, или две сильно разграниченные системы (две команды которые не знают о существовании друг друга)

--

## My telegram message #189028
**Time:** 15.09.2022 15:59:48 UTC+05:00
**Link:** https://t.me/nest_ru/189028

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну во тмне нравятся подобные реализации) пару строк кода и у тебя уже поднят сервер окторый полностью соблюдает контракт

Main message:
ну вот на ноде простой пример, пишешь контракт и генеришь тайпинги и стартуешь бэк на ноде  https://github.com/grpc/grpc/blob/master/examples/node/static_codegen/greeter_server.js

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну вот на ноде простой пример, пишешь контракт и генеришь тайпинги и стартуешь бэк на ноде  https://github.com/grpc/grpc/blob/master/examples/node/static_codegen/greeter_server.js

--

## My telegram message #189032
**Time:** 15.09.2022 16:02:03 UTC+05:00
**Link:** https://t.me/nest_ru/189032

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- вы просто не научились нормально готовить на нест :)

Main message:
он говорит что переносят успешно, такое могут только те кто научился готовить нест) модульно и зоны ответственности четко разделены

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он говорит что переносят успешно, такое могут только те кто научился готовить нест) модульно и зоны ответственности четко разделены

--

