## My telegram message #156290
**Time:** 25.04.2022 12:56:33 UTC+05:00
**Link:** https://t.me/nest_ru/156290

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Возьми investify

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Возьми investify

--

## My telegram message #156295
**Time:** 25.04.2022 13:17:01 UTC+05:00
**Link:** https://t.me/nest_ru/156295

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Возьми investify
- https://kendaleiv.com/typescript-constructor-assignment-public-and-private-keywords/#:~:text=TypeScript%20includes%20a%20concise%20way,property%20from%20a%20constructor%20parameter.&text=The%20public%20keyword%20works%20in,property%20from%20outside%20the%20class .
- Хай, случаем ни кто не в курсе, как перечитать провайдеры в уже запущенном приложении? Скажем у меня есть фабрика, которая достает из БД конфиги и после добавления нового конфига я бы хотел посылать команду на повторное считывание настроек
- 👌

Main message:
а чем тебе нестовый диай не нравится?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а чем тебе нестовый диай не нравится?

--

## My telegram message #156300
**Time:** 25.04.2022 13:20:00 UTC+05:00
**Link:** https://t.me/nest_ru/156300

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
судя по доке так  @autoInjectable () class Bar { }  @autoInjectable () class Foo { constructor( @inject ("Bar") private bar: Bar) log() {  this.bar // undefined } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

судя по доке так  @autoInjectable () class Bar { }  @autoInjectable () class Foo { constructor( @inject ("Bar") private bar: Bar) log() {  this.bar // undefined } }

--

## My telegram message #156306
**Time:** 25.04.2022 13:26:51 UTC+05:00
**Link:** https://t.me/nest_ru/156306

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- так тоже пробовал, работает только так: constructor (private bar: Bar) { this._bar = bar }

Main message:
врешь)  import 'reflect-metadata'; import { autoInjectable, inject, container } from 'tsyringe'; @autoInjectable() class Bar { name = 'bar'; } @autoInjectable() class Foo { constructor(@inject(Bar) private bar: Bar) {} log() { return this.bar; } } const instance = container.resolve(Foo); console.log(instance.log());

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

врешь)  import 'reflect-metadata'; import { autoInjectable, inject, container } from 'tsyringe'; @autoInjectable() class Bar { name = 'bar'; } @autoInjectable() class Foo { constructor(@inject(Bar) private bar: Bar) {} log() { return this.bar; } } const instance = container.resolve(Foo); console.log(instance.log());

--

## My telegram message #156314
**Time:** 25.04.2022 13:40:52 UTC+05:00
**Link:** https://t.me/nest_ru/156314

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хм... а попробуй в бар какой-то метод создать
- Да, это только часть , надо сначала модули достать. Вот как сам Камиль делал, когда ему провайдеры нужны были из любого модуля в приложении 1. ModulesContainer  https://github.com/nestjs/cqrs/blob/5f4e1d4b87cd08fc9a6c085a4fd03203fd1af208/src/services/explorer.service.ts#L24 2. providers  https://github.com/nestjs/cqrs/blob/5f4e1d4b87cd08fc9a6c085a4fd03203fd1af208/src/services/explorer.service.ts#L45
- Спасибо, я позже ознакомлюсь, сделал через сервис, все работает))
- осталось понять где я косячу ((

Main message:
У тя кривой тсконфиг

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя кривой тсконфиг

--

## My telegram message #156316
**Time:** 25.04.2022 13:52:06 UTC+05:00
**Link:** https://t.me/nest_ru/156316

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо, я позже ознакомлюсь, сделал через сервис, все работает))
- осталось понять где я косячу ((
- У тя кривой тсконфиг
- в каком месте?

Main message:
Откуда я знаю нет же на скрине)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Откуда я знаю нет же на скрине)

--

## My telegram message #156348
**Time:** 25.04.2022 17:33:56 UTC+05:00
**Link:** https://t.me/nest_ru/156348

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Приложение перестаёт отвечать на HTTP-запросы, если я пытаюсь подключить микросервисы. Делаю по доке, секция hybrid-application. Ошибок нет. Если убрать запуск сервисов - приложение работает правильно. Что не так и куда копать?
- Тут кто-то с RabbitMQ в NestJS работал? Он у меня теряет каждое второе сообщение с ошибкой There is no matching event handler defined in the remote service. Причём сообщение отправляется одно и то же. Время между сообщениями не влияет, хоть 1 секунда, хоть 5 минут В гугле ничего не вижу про потери сообщений
- проверь что точно 1 очередь (queue) подключена к нужному exchange
- в морде rabbitmq в queue только 1 очередь, да

Main message:
у меня рабит тоже терял сообщения, ща пробую натс streams пока потерь не было, но и проект другой и нагрузки меньше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня рабит тоже терял сообщения, ща пробую натс streams пока потерь не было, но и проект другой и нагрузки меньше

--

## My telegram message #156350
**Time:** 25.04.2022 17:34:29 UTC+05:00
**Link:** https://t.me/nest_ru/156350

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- проверь что точно 1 очередь (queue) подключена к нужному exchange
- в морде rabbitmq в queue только 1 очередь, да
- у меня рабит тоже терял сообщения, ща пробую натс streams пока потерь не было, но и проект другой и нагрузки меньше
- Увы, стек не от меня зависит, мне надо на rabbitmq

Main message:
на 10000 примерно терял несколько штук

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на 10000 примерно терял несколько штук

--

## My telegram message #156586
**Time:** 27.04.2022 02:20:24 UTC+05:00
**Link:** https://t.me/nest_ru/156586

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет! Стоит задача реализовать удаление чата, но с "эффектом" скрытия сообщений только для одного юзера, удалившего чат. Как это можно реализовать? Как лучше спроектировать бд для этого? Подскажите, пожалуйста, варианты Спасибо.
- fs.existsSync(path)
- В общем, если кто с подобным столкнётся - надо в конструкторе переопределить ClientProxy через ClientProxyFactory. Тогда заработает. Хз, баг или фича - нигде не описано, чудом на каком-то левом сайте подобный вариант нашёл, попробовал и заработало
- Всем привет. Посоветуйте плиз библиотеки/фрейморки для генерации статических сайтов в Node.js

Main message:
@Wacker  /trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@Wacker  /trust

--

## My telegram message #156588
**Time:** 27.04.2022 02:21:18 UTC+05:00
**Link:** https://t.me/nest_ru/156588

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В общем, если кто с подобным столкнётся - надо в конструкторе переопределить ClientProxy через ClientProxyFactory. Тогда заработает. Хз, баг или фича - нигде не описано, чудом на каком-то левом сайте подобный вариант нашёл, попробовал и заработало
- Всем привет. Посоветуйте плиз библиотеки/фрейморки для генерации статических сайтов в Node.js
- @Wacker  /trust
- привет всем! подскажите какой протокол для связи микросервисов самый быстрый и надёжный?

Main message:
быстрый grpc -прямой вызов мс надежный кафка - очередь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

быстрый grpc -прямой вызов мс надежный кафка - очередь

--

## My telegram message #156590
**Time:** 27.04.2022 02:21:39 UTC+05:00
**Link:** https://t.me/nest_ru/156590

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @Wacker  /trust
- привет всем! подскажите какой протокол для связи микросервисов самый быстрый и надёжный?
- быстрый grpc -прямой вызов мс надежный кафка - очередь
- а что-то между ними есть?

Main message:
нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет

--

## My telegram message #156593
**Time:** 27.04.2022 02:22:26 UTC+05:00
**Link:** https://t.me/nest_ru/156593

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- быстрый grpc -прямой вызов мс надежный кафка - очередь
- а что-то между ними есть?
- нет
- блин, чтобы быстрый и надёжный был бы..

Main message:
смотря какая задача у тя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

смотря какая задача у тя

--

## My telegram message #156598
**Time:** 27.04.2022 02:23:48 UTC+05:00
**Link:** https://t.me/nest_ru/156598

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет
- блин, чтобы быстрый и надёжный был бы..
- смотря какая задача у тя
- Это название либ?

Main message:
) нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) нет

--

## My telegram message #156600
**Time:** 27.04.2022 02:25:33 UTC+05:00
**Link:** https://t.me/nest_ru/156600

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- смотря какая задача у тя
- Это название либ?
- ) нет
- задача быстро и надёжно передавать 100 тыс. сообщений в секунду

Main message:
грпс стрим

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

грпс стрим

--

## My telegram message #156604
**Time:** 27.04.2022 02:26:23 UTC+05:00
**Link:** https://t.me/nest_ru/156604

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ) нет
- задача быстро и надёжно передавать 100 тыс. сообщений в секунду
- грпс стрим
- а кафка как будет?

Main message:
долго будет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

долго будет

--

## My telegram message #156607
**Time:** 27.04.2022 02:27:15 UTC+05:00
**Link:** https://t.me/nest_ru/156607

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- привет

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #156610
**Time:** 27.04.2022 02:31:04 UTC+05:00
**Link:** https://t.me/nest_ru/156610

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- долго будет
- привет
- /trust
- Стрелками указаны импорты. 1) Если использовать гард (красный), который не связан с модулем auth, происходит ошибка. 2) Помогает удаление импорта account.module из app.module 3) Помогает forwardRef(() => AccountModule 4) Если не использовать гард, то все нормально работает. Почему так происодит?

Main message:
Дело не в импортах

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Дело не в импортах

--

## My telegram message #156618
**Time:** 27.04.2022 02:34:41 UTC+05:00
**Link:** https://t.me/nest_ru/156618

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- /trust
- Стрелками указаны импорты. 1) Если использовать гард (красный), который не связан с модулем auth, происходит ошибка. 2) Помогает удаление импорта account.module из app.module 3) Помогает forwardRef(() => AccountModule 4) Если не использовать гард, то все нормально работает. Почему так происодит?
- Дело не в импортах
- я понимаю это, хотя в бойлерплэйтах на гитхабе его используют

Main message:
и не забывай про forRoot И forFeature

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и не забывай про forRoot И forFeature

--

## My telegram message #156620
**Time:** 27.04.2022 02:37:10 UTC+05:00
**Link:** https://t.me/nest_ru/156620

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Дело не в импортах
- я понимаю это, хотя в бойлерплэйтах на гитхабе его используют
- и не забывай про forRoot И forFeature
- судя по документации, правильной архитектурой будет такая, верно?

Main message:
ноу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ноу

--

## My telegram message #156627
**Time:** 27.04.2022 02:38:44 UTC+05:00
**Link:** https://t.me/nest_ru/156627

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и не забывай про forRoot И forFeature
- судя по документации, правильной архитектурой будет такая, верно?
- ноу
- я ожидал это нападения с 4-х точек

Main message:
у тя стрелки не в ту сторону

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя стрелки не в ту сторону

--

## My telegram message #156629
**Time:** 27.04.2022 02:39:12 UTC+05:00
**Link:** https://t.me/nest_ru/156629

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ноу
- я ожидал это нападения с 4-х точек
- у тя стрелки не в ту сторону
- что с этим делать?

Main message:
переименуй в core

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

переименуй в core

--

## My telegram message #156632
**Time:** 27.04.2022 02:39:29 UTC+05:00
**Link:** https://t.me/nest_ru/156632

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя стрелки не в ту сторону
- что с этим делать?
- переименуй в core
- касательно абстрактныз entity и реп

Main message:
да)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да)

--

## My telegram message #156634
**Time:** 27.04.2022 02:40:05 UTC+05:00
**Link:** https://t.me/nest_ru/156634

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- переименуй в core
- касательно абстрактныз entity и реп
- да)
- уважаю)

Main message:
ядро твоей архитектуры это называется а не как щас - общие штуковины

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ядро твоей архитектуры это называется а не как щас - общие штуковины

--

## My telegram message #156642
**Time:** 27.04.2022 02:53:00 UTC+05:00
**Link:** https://t.me/nest_ru/156642

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да)
- уважаю)
- ядро твоей архитектуры это называется а не как щас - общие штуковины
- согласен, неправильно стрелки нарисовал

Main message:
я схлопнул auth и account в auth

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я схлопнул auth и account в auth

--

## My telegram message #156709
**Time:** 27.04.2022 15:04:03 UTC+05:00
**Link:** https://t.me/nest_ru/156709

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, подскажите, как использовать сервис с  @WebSocketGateway({ path: '/websocket' }) export class EventsGateway implements OnGatewayConnection {  в других сервисах? Для него есть модуль  @Module({ imports: [ JwtModule.registerAsync({ useFactory: (config: ConfigService) => { return { secret: config.get('JWT_SECRET_KEY'), signOptions: { expiresIn: config.get('JWT_EXPIRATION_TIME'), }, }; }, inject: [ConfigService], }), ], providers: [EventsGateway], }) export class EventsModule {}  я добавил, этот модуль в imports другого модуля, и хочу использовать его в сервисе, хочу вызвать  private readonly eventsGateway: EventsGateway,  но получаю такую ошибку (ниже) Сори, первый раз с нестом и декораторами. Не особо понимаю, как все работает

Main message:
через EventEmmitter Или Subject Rxjs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через EventEmmitter Или Subject Rxjs

--

## My telegram message #156713
**Time:** 27.04.2022 15:07:43 UTC+05:00
**Link:** https://t.me/nest_ru/156713

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем добрый день! Пишу bff на nestjs. Требуется на фронт отдавать данные в необходими форматировании. мне нужно на вход в контроллер и на выход везде поле idUnique преобразовывать в ключ id. Можно конечно 2 утилиты написать и везде их обарачивать. Но, хотеол узнать как это сделать лучше? Была мысль в интерцептере входи выход обрабатывать, но иногда нужно прям явно сказать что вот это поле клюсь или велью будет не idUnique, а id. Как это сделать? В DTO при помощи class-transformer ни как нельзя в декараторе это сделать? или ка лучше
- Всем привет, подскажите, как использовать сервис с  @WebSocketGateway({ path: '/websocket' }) export class EventsGateway implements OnGatewayConnection {  в других сервисах? Для него есть модуль  @Module({ imports: [ JwtModule.registerAsync({ useFactory: (config: ConfigService) => { return { secret: config.get('JWT_SECRET_KEY'), signOptions: { expiresIn: config.get('JWT_EXPIRATION_TIME'), }, }; }, inject: [ConfigService], }), ], providers: [EventsGateway], }) export class EventsModule {}  я добавил, этот модуль в imports другого модуля, и хочу использовать его в сервисе, хочу вызвать  private readonly eventsGateway: EventsGateway,  но получаю такую ошибку (ниже) Сори, первый раз с нестом и декораторами. Не особо понимаю, как все работает
- через EventEmmitter Или Subject Rxjs
- https://github.com/nestjs/nest/blob/master/sample/02-gateways/src/events/events.gateway.ts

Main message:
он докидывается до апп модуля

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он докидывается до апп модуля

--

## My telegram message #156780
**Time:** 27.04.2022 20:51:25 UTC+05:00
**Link:** https://t.me/nest_ru/156780

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Нормально

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нормально

--

## My telegram message #156790
**Time:** 27.04.2022 21:28:09 UTC+05:00
**Link:** https://t.me/nest_ru/156790

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- все еще не разобрался, не могу понять, как мне реализовать отправку сообщений с другого сервиса. Мне же нужно получить список соединений, которые есть в моем EventsGateway

Main message:
Не нужно, там есть мессаджи, фронт подписывается на них

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не нужно, там есть мессаджи, фронт подписывается на них

--

## My telegram message #156830
**Time:** 28.04.2022 11:15:31 UTC+05:00
**Link:** https://t.me/nest_ru/156830

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А подскажите кто, я в контроллере делаю  валидацию для  Dto класса через  class validator . Но если какие-то параметры не передавать, у них получается значение  undefined . Есть ли из коробки возможность исключать пропы из класса если у них нет значения?  class MyDto { @IsOptional() @IsString() name: string; // undefined если в запросе не был указан name }
- В  @nestjs/typeorm @8 изменился конфиг, куда теперь класть путь к папке с миграциями? раньше так было  cli: { migrationsDir: 'src/migrations', },
- Сам с этим столкнулся, написал функцию omitUndef, заюзал фильтрацию обьекта omit на isUndefined и результат отправляю из контроллера в сервис. Костыль но свои функции выполняет. Надо бы декоратор из этого сделать но не тестил
- А что лучше, typeorm или prisma? 😁 Только хочу начать работать с nestjs

Main message:
если пет проект то призма так как быстрее там вкатываешся, если работу хочешь найти с нестом то лучше тайп орм, так как везде тайп орм юзается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если пет проект то призма так как быстрее там вкатываешся, если работу хочешь найти с нестом то лучше тайп орм, так как везде тайп орм юзается

--

## My telegram message #156833
**Time:** 28.04.2022 11:19:30 UTC+05:00
**Link:** https://t.me/nest_ru/156833

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А что лучше, typeorm или prisma? 😁 Только хочу начать работать с nestjs
- если пет проект то призма так как быстрее там вкатываешся, если работу хочешь найти с нестом то лучше тайп орм, так как везде тайп орм юзается
- Спасибо 😁
- В тайпорм нужно долго вкатываться?

Main message:
Дольше да, так как только декораторы с релайшенами чего стоят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Дольше да, так как только декораторы с релайшенами чего стоят

--

## My telegram message #156835
**Time:** 28.04.2022 11:20:45 UTC+05:00
**Link:** https://t.me/nest_ru/156835

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо 😁
- В тайпорм нужно долго вкатываться?
- Дольше да, так как только декораторы с релайшенами чего стоят
- Плюс, неделю ковырял)

Main message:
Призму за 2 дня всю можно понять как с ней работать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Призму за 2 дня всю можно понять как с ней работать

--

## My telegram message #156878
**Time:** 28.04.2022 19:31:12 UTC+05:00
**Link:** https://t.me/nest_ru/156878

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://t.me/nestjs_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nestjs_jobs

--

## My telegram message #157102
**Time:** 30.04.2022 17:27:55 UTC+05:00
**Link:** https://t.me/nest_ru/157102

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Увы, не подходит. У меня postgres
- добавь в настройки Column  array: true
- Всем привет, задеплоил проект на хероку, появилась проблема с тем, что статика не раздается. Кто знает, как посмотреть файлы проекта которые задеплоены на хероку? Мне нужно узнать что в папке static там хранится
- Уточнение, когда делаю запрос на добавление новой картинки в статику - она появляется и ее даже можно получить к примеру по адресу  https://meetins.herokuapp.com/1651320723194.png Но через условных 15 минут по этому адресу уже ничего нет. Причину пока не могу найти

Main message:
Хероку каждые 30 минут уходит в сон

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Хероку каждые 30 минут уходит в сон

--

## My telegram message #157148
**Time:** 01.05.2022 16:38:32 UTC+05:00
**Link:** https://t.me/nest_ru/157148

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @mogilevtsevdmitry  @KaufmanEndy Парни help вы машины стопудово сталкивались с этим ))

Main message:
Е2е тесты, там это не нужно, если режим работы модуля меняю то админка для этого и из е2е вызываю, когда крайние случаи для пользователей то уже не е2е тест а интеграционный и в нём меняю логику для проверки крайних случаев Я решил не внедрять доп слои для подмены логик в работе юзера

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Е2е тесты, там это не нужно, если режим работы модуля меняю то админка для этого и из е2е вызываю, когда крайние случаи для пользователей то уже не е2е тест а интеграционный и в нём меняю логику для проверки крайних случаев Я решил не внедрять доп слои для подмены логик в работе юзера

--

## My telegram message #157153
**Time:** 01.05.2022 18:01:49 UTC+05:00
**Link:** https://t.me/nest_ru/157153

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Е2е тесты, там это не нужно, если режим работы модуля меняю то админка для этого и из е2е вызываю, когда крайние случаи для пользователей то уже не е2е тест а интеграционный и в нём меняю логику для проверки крайних случаев Я решил не внедрять доп слои для подмены логик в работе юзера
- Я имею ввиду не тесты. А к беку подключается другой бек я выпукскаю для него токен и они просят грубо говоря включить тестовый режим или для определенных параметров вернуть определенный ответ
- там и обычного урла хватит
- как я могу найти книгу к примеру по title, просто в призме findUnique ищет токо по id

Main message:
Индекса нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Индекса нет

--

## My telegram message #157157
**Time:** 01.05.2022 18:05:40 UTC+05:00
**Link:** https://t.me/nest_ru/157157

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я имею ввиду не тесты. А к беку подключается другой бек я выпукскаю для него токен и они просят грубо говоря включить тестовый режим или для определенных параметров вернуть определенный ответ

Main message:
Рядом с методом например getUsers создай метод getUsersExample Через интерцептор смотри юзер какой режим сейчас включил, демо режим с моками или прод И вызывай нужный метод

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Рядом с методом например getUsers создай метод getUsersExample Через интерцептор смотри юзер какой режим сейчас включил, демо режим с моками или прод И вызывай нужный метод

--

## My telegram message #157159
**Time:** 01.05.2022 18:07:14 UTC+05:00
**Link:** https://t.me/nest_ru/157159

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Рядом с методом например getUsers создай метод getUsersExample Через интерцептор смотри юзер какой режим сейчас включил, демо режим с моками или прод И вызывай нужный метод

Main message:
Конвеншен сделай на постфикс Example

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Конвеншен сделай на постфикс Example

--

## My telegram message #157163
**Time:** 01.05.2022 18:17:12 UTC+05:00
**Link:** https://t.me/nest_ru/157163

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- -

Main message:
Пере генерировал клиента?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Пере генерировал клиента?

--

## My telegram message #157308
**Time:** 02.05.2022 21:37:46 UTC+05:00
**Link:** https://t.me/nest_ru/157308

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- На фронте обновление пользователя только в личном кабинете, id пользователя подкреплять к payload только на бэке вытягивая id из токена Как вариант
- Аааа, вот оно как, спасибо большое
- Повторяюсь, под пивом😄
- Если бы не работа поддержал бы вас

Main message:
я кодю сижу тож так то)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я кодю сижу тож так то)

--

## My telegram message #157312
**Time:** 02.05.2022 21:48:46 UTC+05:00
**Link:** https://t.me/nest_ru/157312

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А я на завтра готовлюсь)) перед работой, так сказать))

Main message:
клева) в этот вых планирую шашлык да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

клева) в этот вых планирую шашлык да

--

## My telegram message #157336
**Time:** 03.05.2022 10:42:58 UTC+05:00
**Link:** https://t.me/nest_ru/157336

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Насколько щас нормально юзать graphql на беке

Main message:
Тут больше вопрос к фронту, они поймут ли как нужно с ним работать, смогут ли писать запросы сами и не ждать готовой спеки, теперь ведь и фронт будет участвовать в принятии решения какие данные откуда будут летать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тут больше вопрос к фронту, они поймут ли как нужно с ним работать, смогут ли писать запросы сами и не ждать готовой спеки, теперь ведь и фронт будет участвовать в принятии решения какие данные откуда будут летать

--

## My telegram message #157418
**Time:** 03.05.2022 16:10:30 UTC+05:00
**Link:** https://t.me/nest_ru/157418

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- товарищи эксперты, докажите что микросервисы могут быть как и в одном проекте, так и по отдельности, и все это дело вкусовщины. каждый дрочит как он хочет

Main message:
Шарить контракты сложнее если разные репы, нужно юзать либо нпм пакеты либо саб три гита либо саб модули и там часто разъезжаются версии, в рамках одной репы проще всё, даже если микросервисы на разных языках, они могут быть в одном nx монорепозитории

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Шарить контракты сложнее если разные репы, нужно юзать либо нпм пакеты либо саб три гита либо саб модули и там часто разъезжаются версии, в рамках одной репы проще всё, даже если микросервисы на разных языках, они могут быть в одном nx монорепозитории

--

## My telegram message #157437
**Time:** 03.05.2022 20:30:25 UTC+05:00
**Link:** https://t.me/nest_ru/157437

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

