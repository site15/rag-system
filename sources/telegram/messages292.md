## My telegram message #335570
**Time:** 13.01.2025 13:07:01 UTC+05:00
**Link:** https://t.me/nest_ru/335570

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Помогите решить вопрос логгирования. У меня есть контроллер, внутри контроллера соответственность вызываются функции сервиса. Каждый роут описан с помощью декоратора ApiOperation и имеет свойство summary У меня есть логгер, который пишет в БД вызовы каждого из роутов контроллера. Вопрос: Могу ли я завернуть контроллер так, чтобы брать из контекста ApiOperation свойства и вызывать функцию для записи эвентов в бд? Если да, то как лучше это сделать? Я правильно понимаю что Interceptor подходит для этой задачи лучше всего?

Main message:
напиши свой кастомный декоратор который внутри навесит уже ApiOperation, и доп мета инфу еще добавит которую уже соборешь в интерцепторе, да интерцептор норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

напиши свой кастомный декоратор который внутри навесит уже ApiOperation, и доп мета инфу еще добавит которую уже соборешь в интерцепторе, да интерцептор норм

--

## My telegram message #335572
**Time:** 13.01.2025 13:09:39 UTC+05:00
**Link:** https://t.me/nest_ru/335572

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- огромное спасибо за фитбек, посмотрю и исправлю про лимиты имеется ввиду пагинация? я только на сами чаты ее не сделал, допилю по поводу числа, базовый код писал товарищ, я сейчас допиливаю и улучшаю, там код чтобы картинка была хоть какая-то, потому что недоделано про поиск чатов очень интересно, попробую разобраться и сделаю комменты по юзеру это для табов на фронте, я там вывожу все посты и все комментарии на его странице, а отдельный метод чтобы скроллом крутить удобно с последним я тоже согласен, даже позабыл об этом, большое спасибо
- Всем привет! Помогите решить вопрос логгирования. У меня есть контроллер, внутри контроллера соответственность вызываются функции сервиса. Каждый роут описан с помощью декоратора ApiOperation и имеет свойство summary У меня есть логгер, который пишет в БД вызовы каждого из роутов контроллера. Вопрос: Могу ли я завернуть контроллер так, чтобы брать из контекста ApiOperation свойства и вызывать функцию для записи эвентов в бд? Если да, то как лучше это сделать? Я правильно понимаю что Interceptor подходит для этой задачи лучше всего?
- напиши свой кастомный декоратор который внутри навесит уже ApiOperation, и доп мета инфу еще добавит которую уже соборешь в интерцепторе, да интерцептор норм
- Вот такой интерцептор получился. Жаль в доке напрямую не описано как называются поля  https://github.com/nestjs/swagger/blob/master/lib/constants.ts  @Injectable() export class LoggingInterceptor implements NestInterceptor { constructor(private reflector: Reflector) {} intercept(context: ExecutionContext, next: CallHandler): Observable<any> { const operation = this.reflector.get( 'swagger/apiOperation', context.getHandler(), ); if (operation) { console.log(operation) } return next.handle(); } }

Main message:
вот я и говорю не вешайся на свагер декораторы, так как у тебя есть и другие сервисы которые захочешь логировать, например вход по грпс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот я и говорю не вешайся на свагер декораторы, так как у тебя есть и другие сервисы которые захочешь логировать, например вход по грпс

--

## My telegram message #335574
**Time:** 13.01.2025 13:10:12 UTC+05:00
**Link:** https://t.me/nest_ru/335574

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- напиши свой кастомный декоратор который внутри навесит уже ApiOperation, и доп мета инфу еще добавит которую уже соборешь в интерцепторе, да интерцептор норм
- Вот такой интерцептор получился. Жаль в доке напрямую не описано как называются поля  https://github.com/nestjs/swagger/blob/master/lib/constants.ts  @Injectable() export class LoggingInterceptor implements NestInterceptor { constructor(private reflector: Reflector) {} intercept(context: ExecutionContext, next: CallHandler): Observable<any> { const operation = this.reflector.get( 'swagger/apiOperation', context.getHandler(), ); if (operation) { console.log(operation) } return next.handle(); } }
- вот я и говорю не вешайся на свагер декораторы, так как у тебя есть и другие сервисы которые захочешь логировать, например вход по грпс
- У меня грпс точно не будет

Main message:
сделай свой декоратор который уже навесит свагер декоратор и попутно еще свою метадату в рефлект сунет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сделай свой декоратор который уже навесит свагер декоратор и попутно еще свою метадату в рефлект сунет

--

## My telegram message #335776
**Time:** 13.01.2025 23:33:35 UTC+05:00
**Link:** https://t.me/nest_ru/335776

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Столкнулся с проблемой отправки заголовков, или контента, использую стандартный res.writeHead или res.write и ни один не работает, хотя в голом express всё отрабатывает корректно. Кто-то сталкивался?

Main message:
Привет! В NestJS есть свои особенности работы с ответами на запросы, отличные от стандартного Express. Вместо использования  res.writeHead и  res.write , NestJS предоставляет встроенный механизм для управления ответами через контроллеры и декораторы. ### Решение: Вместо прямого доступа к объекту ответа ( res ), который вы могли бы использовать в чистом Express, в NestJS нужно возвращать данные из методов контроллера. Для этого используются специальные декоратора, такие как  @Res() . #### Пример:  import { Controller, Get, Res } from '@nestjs/common'; import { Response } from 'express'; // Импортируем тип Response @Controller('example') export class ExampleController { @Get() async getExample(@Res() res: Response) { // Устанавливаем заголовки res.setHeader('Content-Type', 'application/json'); // Отправляем тело ответа return res.send({ message: 'Hello World!' }); } } ### Объяснение: -  Декоратор `@Res()` позволяет получить доступ к объекту ответа Express. Через этот объект можно управлять заголовками и телом ответа. -  Метод `setHeader` используется для установки заголовка ответа. В примере мы устанавливаем заголовок  Content-Type для JSON-данных. -  Метод `send` отправляет тело ответа клиенту. ### Дополнительная информация: NestJS предоставляет несколько способов работы с ответами: 1.  Возврат данных напрямую : Если метод возвращает объект или строку, NestJS автоматически преобразует их в JSON и отправит клиенту.  @Get() getExample(): string { return 'Hello World!'; }  2.  Использование `Response` : Как показано выше, вы можете использовать объект  Response для полного контроля над ответом. 3.  Использование классов ответов : NestJS предлагает классы для различных типов ответов, таких как  HttpStatus.OK ,  HttpStatus.CREATED и другие.  import { HttpService, Injectable, Scope } from '@nestjs/common'; import { Observable } from 'rxjs'; @Injectable({ scope: Scope.REQUEST }) export class DataService { constructor(private readonly httpService: HttpService) {} findAll(): Observable<any[]> { return this.httpService.get('http://localhost:3000/data').pipe( map((response) => response.data), ); } }  ### Источники: - Официальная документация NestJS:  https://docs.nestjs.com/controllers#handling-request-scope - Примеры использования объектов ответа:  https://github.com/nestjs/nest/blob/master/sample/06-mvc/src/cats/cats.controller.ts Надеюсь, это поможет решить вашу проблему!

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Привет! В NestJS есть свои особенности работы с ответами на запросы, отличные от стандартного Express. Вместо использования  res.writeHead и  res.write , NestJS предоставляет встроенный механизм для управления ответами через контроллеры и декораторы. ### Решение: Вместо прямого доступа к объекту ответа ( res ), который вы могли бы использовать в чистом Express, в NestJS нужно возвращать данные из методов контроллера. Для этого используются специальные декоратора, такие как  @Res() . #### Пример:  import { Controller, Get, Res } from '@nestjs/common'; import { Response } from 'express'; // Импортируем тип Response @Controller('example') export class ExampleController { @Get() async getExample(@Res() res: Response) { // Устанавливаем заголовки res.setHeader('Content-Type', 'application/json'); // Отправляем тело ответа return res.send({ message: 'Hello World!' }); } } ### Объяснение: -  Декоратор `@Res()` позволяет получить доступ к объекту ответа Express. Через этот объект можно управлять заголовками и телом ответа. -  Метод `setHeader` используется для установки заголовка ответа. В примере мы устанавливаем заголовок  Content-Type для JSON-данных. -  Метод `send` отправляет тело ответа клиенту. ### Дополнительная информация: NestJS предоставляет несколько способов работы с ответами: 1.  Возврат данных напрямую : Если метод возвращает объект или строку, NestJS автоматически преобразует их в JSON и отправит клиенту.  @Get() getExample(): string { return 'Hello World!'; }  2.  Использование `Response` : Как показано выше, вы можете использовать объект  Response для полного контроля над ответом. 3.  Использование классов ответов : NestJS предлагает классы для различных типов ответов, таких как  HttpStatus.OK ,  HttpStatus.CREATED и другие.  import { HttpService, Injectable, Scope } from '@nestjs/common'; import { Observable } from 'rxjs'; @Injectable({ scope: Scope.REQUEST }) export class DataService { constructor(private readonly httpService: HttpService) {} findAll(): Observable<any[]> { return this.httpService.get('http://localhost:3000/data').pipe( map((response) => response.data), ); } }  ### Источники: - Официальная документация NestJS:  https://docs.nestjs.com/controllers#handling-request-scope - Примеры использования объектов ответа:  https://github.com/nestjs/nest/blob/master/sample/06-mvc/src/cats/cats.controller.ts Надеюсь, это поможет решить вашу проблему!

--

## My telegram message #335779
**Time:** 13.01.2025 23:38:02 UTC+05:00
**Link:** https://t.me/nest_ru/335779

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну в целом да, операция не очень дорогая, так что можно потерпеть
- Всем привет. Столкнулся с проблемой отправки заголовков, или контента, использую стандартный res.writeHead или res.write и ни один не работает, хотя в голом express всё отрабатывает корректно. Кто-то сталкивался?
- Привет! В NestJS есть свои особенности работы с ответами на запросы, отличные от стандартного Express. Вместо использования  res.writeHead и  res.write , NestJS предоставляет встроенный механизм для управления ответами через контроллеры и декораторы. ### Решение: Вместо прямого доступа к объекту ответа ( res ), который вы могли бы использовать в чистом Express, в NestJS нужно возвращать данные из методов контроллера. Для этого используются специальные декоратора, такие как  @Res() . #### Пример:  import { Controller, Get, Res } from '@nestjs/common'; import { Response } from 'express'; // Импортируем тип Response @Controller('example') export class ExampleController { @Get() async getExample(@Res() res: Response) { // Устанавливаем заголовки res.setHeader('Content-Type', 'application/json'); // Отправляем тело ответа return res.send({ message: 'Hello World!' }); } } ### Объяснение: -  Декоратор `@Res()` позволяет получить доступ к объекту ответа Express. Через этот объект можно управлять заголовками и телом ответа. -  Метод `setHeader` используется для установки заголовка ответа. В примере мы устанавливаем заголовок  Content-Type для JSON-данных. -  Метод `send` отправляет тело ответа клиенту. ### Дополнительная информация: NestJS предоставляет несколько способов работы с ответами: 1.  Возврат данных напрямую : Если метод возвращает объект или строку, NestJS автоматически преобразует их в JSON и отправит клиенту.  @Get() getExample(): string { return 'Hello World!'; }  2.  Использование `Response` : Как показано выше, вы можете использовать объект  Response для полного контроля над ответом. 3.  Использование классов ответов : NestJS предлагает классы для различных типов ответов, таких как  HttpStatus.OK ,  HttpStatus.CREATED и другие.  import { HttpService, Injectable, Scope } from '@nestjs/common'; import { Observable } from 'rxjs'; @Injectable({ scope: Scope.REQUEST }) export class DataService { constructor(private readonly httpService: HttpService) {} findAll(): Observable<any[]> { return this.httpService.get('http://localhost:3000/data').pipe( map((response) => response.data), ); } }  ### Источники: - Официальная документация NestJS:  https://docs.nestjs.com/controllers#handling-request-scope - Примеры использования объектов ответа:  https://github.com/nestjs/nest/blob/master/sample/06-mvc/src/cats/cats.controller.ts Надеюсь, это поможет решить вашу проблему!
- лучше конечно клауде или чатгпт

Main message:
ну куда есть доступ то и юзаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну куда есть доступ то и юзаю

--

## My telegram message #336004
**Time:** 15.01.2025 10:45:09 UTC+05:00
**Link:** https://t.me/nest_ru/336004

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не люблю такое) Заеба много
- Там собственно ux вообще никак не отличается. Как будто все локально.
- Ну джетбрейнс я ради такого юзать не буду конечно В вскоде с гитхабом вроде тоже чет такое есть но я не любитель
- У меня докеры-шмокеры крутятся у меня же на ноуте, но он всё равно холодный, спасибо M процессору от яблока)

Main message:
когда нда они сами могут выделить сервер по идее, для сотрудников у кого слабые компы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда нда они сами могут выделить сервер по идее, для сотрудников у кого слабые компы

--

## My telegram message #336006
**Time:** 15.01.2025 10:45:51 UTC+05:00
**Link:** https://t.me/nest_ru/336006

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну джетбрейнс я ради такого юзать не буду конечно В вскоде с гитхабом вроде тоже чет такое есть но я не любитель
- У меня докеры-шмокеры крутятся у меня же на ноуте, но он всё равно холодный, спасибо M процессору от яблока)
- когда нда они сами могут выделить сервер по идее, для сотрудников у кого слабые компы
- Они просто выдали сотрудникам компы)

Main message:
в одной конторе так делал, сервак поднял с инфрой и кому надо бысто чет запилить туда подрубались

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в одной конторе так делал, сервак поднял с инфрой и кому надо бысто чет запилить туда подрубались

--

## My telegram message #336009
**Time:** 15.01.2025 10:47:07 UTC+05:00
**Link:** https://t.me/nest_ru/336009

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Они просто выдали сотрудникам компы)

Main message:
ну это бух учет надо вести, материальные активы, они же на балансе конторы, при увольнении отнимать, а так поднял на серваке вирт машину под разраба и дал ему ссш + впн и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это бух учет надо вести, материальные активы, они же на балансе конторы, при увольнении отнимать, а так поднял на серваке вирт машину под разраба и дал ему ссш + впн и все

--

## My telegram message #336422
**Time:** 17.01.2025 01:23:59 UTC+05:00
**Link:** https://t.me/nest_ru/336422

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Насчет дотнет - а в Linux на нем пишут что-нибудь? Слышал о mono, но интересно, пишут ли на нем, есть ли необходимые либы, и можно ли потом все это на Linux-сервере развернуть?
- .Net Core
- И насколько это нормальная практика или обязательно винду ставить?
- Вполне нормальная

Main message:
я короче свой мигратор для баз данных написал, ну это просто имплементация существующей утилиты для миграций, но возможно кому-то пригодится  https://habr.com/ru/articles/874028

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я короче свой мигратор для баз данных написал, ну это просто имплементация существующей утилиты для миграций, но возможно кому-то пригодится  https://habr.com/ru/articles/874028

--

## My telegram message #336425
**Time:** 17.01.2025 02:03:32 UTC+05:00
**Link:** https://t.me/nest_ru/336425

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вполне нормальная
- я короче свой мигратор для баз данных написал, ну это просто имплементация существующей утилиты для миграций, но возможно кому-то пригодится  https://habr.com/ru/articles/874028
- А компилить на mono или есть свой компилятор? Посмотрел, оказывается мелкомягкий официально дотнет и для некоторых дистров линукс поставляет. Интересно. Спасибо за ответы.
- По-моему декораторы на контроллеры это фишка nestjs, причем очень классная. Такое очень легко читается)

Main message:
это называется декларативное программирование

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это называется декларативное программирование

--

## My telegram message #336427
**Time:** 17.01.2025 02:04:05 UTC+05:00
**Link:** https://t.me/nest_ru/336427

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А компилить на mono или есть свой компилятор? Посмотрел, оказывается мелкомягкий официально дотнет и для некоторых дистров линукс поставляет. Интересно. Спасибо за ответы.
- По-моему декораторы на контроллеры это фишка nestjs, причем очень классная. Такое очень легко читается)
- это называется декларативное программирование
- Декоративное кодирование

Main message:
представь что у тебя не один контроллер а 150тысящ и это уже не так круто смотрится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

представь что у тебя не один контроллер а 150тысящ и это уже не так круто смотрится

--

## My telegram message #336429
**Time:** 17.01.2025 02:04:46 UTC+05:00
**Link:** https://t.me/nest_ru/336429

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это называется декларативное программирование
- Декоративное кодирование
- представь что у тебя не один контроллер а 150тысящ и это уже не так круто смотрится
- Я боюсь представить, как это круто будет смотреться, если бы не было декораторов

Main message:
все нужно использовать в меру и тогда когда оно нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все нужно использовать в меру и тогда когда оно нужно

--

## My telegram message #336431
**Time:** 17.01.2025 02:05:25 UTC+05:00
**Link:** https://t.me/nest_ru/336431

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я боюсь представить, как это круто будет смотреться, если бы не было декораторов

Main message:
у теяб былабы совсем другая архитектура, где нет контроллеров и дто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у теяб былабы совсем другая архитектура, где нет контроллеров и дто

--

## My telegram message #336435
**Time:** 17.01.2025 02:06:28 UTC+05:00
**Link:** https://t.me/nest_ru/336435

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все нужно использовать в меру и тогда когда оно нужно
- ну, хотя, больше 15 у меня в проектах не было
- у теяб былабы совсем другая архитектура, где нет контроллеров и дто
- А это как..? Контракты для микросервисов или что

Main message:
мир гораздо шире чем мы его видим

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мир гораздо шире чем мы его видим

--

## My telegram message #336441
**Time:** 17.01.2025 02:08:32 UTC+05:00
**Link:** https://t.me/nest_ru/336441

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у теяб былабы совсем другая архитектура, где нет контроллеров и дто
- А это как..? Контракты для микросервисов или что
- мир гораздо шире чем мы его видим
- а когда его надо ставить в таком случае?

Main message:
контекст утерян

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

контекст утерян

--

## My telegram message #336445
**Time:** 17.01.2025 02:09:41 UTC+05:00
**Link:** https://t.me/nest_ru/336445

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- когда нужно ставить graphql? Ну всм при насколько большой проекте там

Main message:
при любом

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

при любом

--

## My telegram message #336448
**Time:** 17.01.2025 02:10:54 UTC+05:00
**Link:** https://t.me/nest_ru/336448

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Попробуй вот так, по типам сходится  // const f: FindOperator<string>[] = categories.map(({ id }) => Equal(id)); const products = await this.productRepository.find({ where: { categories: { id: And(...categories.map(({ id }) => Equal(id))) }, }, relations: { categories: true }, });

Main message:
как же я "люблю" тайп орм)))))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как же я "люблю" тайп орм)))))

--

## My telegram message #336451
**Time:** 17.01.2025 02:17:22 UTC+05:00
**Link:** https://t.me/nest_ru/336451

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ещё там есть raw, можно сырой ALL попробовать дописать

Main message:
пусть все дернет и в бэке допом фильтранет, ну конечно если ему не нужна пагинация, если пагинация то тогда нужна вьюха

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пусть все дернет и в бэке допом фильтранет, ну конечно если ему не нужна пагинация, если пагинация то тогда нужна вьюха

--

## My telegram message #336454
**Time:** 17.01.2025 03:03:30 UTC+05:00
**Link:** https://t.me/nest_ru/336454

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ещё там есть raw, можно сырой ALL попробовать дописать
- пусть все дернет и в бэке допом фильтранет, ну конечно если ему не нужна пагинация, если пагинация то тогда нужна вьюха
- Мне кажется у меня были такие задачи и я решал их наоборот. Нужны все клиенты специалистов из списка. Ищем всех специалистов из списка с клиентами, примерно так  specRepo.find({ where: { id: In(ids), clients: clientsFilter } })
- Тогда вопрос. А как там дела с типизацией? Если я всё стараюсь максимально типизировать, но говорят, что временами поддержка типов ужасная

Main message:
будет получше чем сваггер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

будет получше чем сваггер

--

## My telegram message #336461
**Time:** 17.01.2025 03:33:31 UTC+05:00
**Link:** https://t.me/nest_ru/336461

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мне кажется у меня были такие задачи и я решал их наоборот. Нужны все клиенты специалистов из списка. Ищем всех специалистов из списка с клиентами, примерно так  specRepo.find({ where: { id: In(ids), clients: clientsFilter } })
- Тогда вопрос. А как там дела с типизацией? Если я всё стараюсь максимально типизировать, но говорят, что временами поддержка типов ужасная
- будет получше чем сваггер
- В чужом коде повсеместно только тайпорм встречал. :(

Main message:
Ни кто не мешает дома юзать чет другое, и потом показать и обговорить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ни кто не мешает дома юзать чет другое, и потом показать и обговорить

--

## My telegram message #336463
**Time:** 17.01.2025 03:34:12 UTC+05:00
**Link:** https://t.me/nest_ru/336463

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- будет получше чем сваггер
- В чужом коде повсеместно только тайпорм встречал. :(
- Ни кто не мешает дома юзать чет другое, и потом показать и обговорить
- ну вот ща проект закончу и буду пробовать на микроорм писать

Main message:
Не надо его

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не надо его

--

## My telegram message #336737
**Time:** 17.01.2025 19:49:51 UTC+05:00
**Link:** https://t.me/nest_ru/336737

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy

Main message:
ничего страшного не вижу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ничего страшного не вижу

--

## My telegram message #336754
**Time:** 17.01.2025 19:55:55 UTC+05:00
**Link:** https://t.me/nest_ru/336754

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- По этому и спрашиваю, нужен ли тут турбо, наверное от него не будет смысла если shared кода не много и сервисы надо запускать отдельно

Main message:
у монореп свои плючы и минусы есть у каждого, тебе подойдет и обычная нест монорепа, а зависимости во все контейнеры одни и теже поставь просто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у монореп свои плючы и минусы есть у каждого, тебе подойдет и обычная нест монорепа, а зависимости во все контейнеры одни и теже поставь просто

--

## My telegram message #336756
**Time:** 17.01.2025 19:56:51 UTC+05:00
**Link:** https://t.me/nest_ru/336756

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А ведь им стоит только чуть занюхнуть шарпа и у них сразу бабочки в животе появятся)) Сами сразу же нест выкинут)) Вместе с нодой

Main message:
нет такого, тайпскрипт приятнее шарпа и тут дженерики прикольнее чем в шарпе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет такого, тайпскрипт приятнее шарпа и тут дженерики прикольнее чем в шарпе

--

## My telegram message #336762
**Time:** 17.01.2025 19:58:28 UTC+05:00
**Link:** https://t.me/nest_ru/336762

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Монорепы в жсе нравятся? А вес нод модулей? А время сборки?

Main message:
причем тут нравится или нет, каждый что хочет то и выбирает, я писал на шарпе ушел в тс и мне по кайфу, кто то до сих пор не пронимает зачем нужен тс и пишет все на жс, все люди разные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

причем тут нравится или нет, каждый что хочет то и выбирает, я писал на шарпе ушел в тс и мне по кайфу, кто то до сих пор не пронимает зачем нужен тс и пишет все на жс, все люди разные

--

## My telegram message #336766
**Time:** 17.01.2025 19:59:36 UTC+05:00
**Link:** https://t.me/nest_ru/336766

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Кто то любит спринг

Main message:
и на нем я писал и тоже оттуда ушел, на он поприятнее был чем шарп

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и на нем я писал и тоже оттуда ушел, на он поприятнее был чем шарп

--

## My telegram message #336774
**Time:** 17.01.2025 20:01:35 UTC+05:00
**Link:** https://t.me/nest_ru/336774

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А как же http3 и quic))) Нода доси не умеет в это и не научится)) А как же многопоточность)) Нода тоже не умеет

Main message:
ну не бери ноду если чет не устраивает в ней, тебя же не заставляют ее юзать и нито тм более не заставляет юзать нест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну не бери ноду если чет не устраивает в ней, тебя же не заставляют ее юзать и нито тм более не заставляет юзать нест

--

