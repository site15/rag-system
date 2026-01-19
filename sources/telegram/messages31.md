## My telegram message #31214
**Time:** 10.09.2019 22:45:19 UTC+05:00
**Link:** https://t.me/nest_ru/31214

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ребята, кто делает миграции typeorm при старте докера? или как лучше делать?

Main message:
Я на сиай гнал миграции при деплое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я на сиай гнал миграции при деплое

--

## My telegram message #31223
**Time:** 11.09.2019 02:04:24 UTC+05:00
**Link:** https://t.me/nest_ru/31223

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @Controller() export class Ctr { @Get() public get( @Query(new ValidationPipe()) query // —-> Мне над обратиться к сервису в ValidationPipe )
- В документации есть такой пример, чтобы использовать DI при создании Pipe:  @Post() @UsePipes(ValidationPipe) async create(@Body() createCatDto: CreateCatDto) { this.catsService.create(createCatDto); }
- 🙏
- Привет. Использую  Sequelize Имеется сервайс контроллера, в котором есть методы возвращения юзера по username. Вопрос: как организовать unit тестирования используя jest, чтобы тесты были с использованием реальной БД? Если где-то есть семплы где юзают юнит тесты при работе с базой, поделитесь линкой.

Main message:
Для тестов базу тестовую подними, если у тя орм и базо не зависимые запросы и миграции то можно для разработки и тестов sqlite юзать, а в проде уже postgresql Ну я так делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Для тестов базу тестовую подними, если у тя орм и базо не зависимые запросы и миграции то можно для разработки и тестов sqlite юзать, а в проде уже postgresql Ну я так делал

--

## My telegram message #31231
**Time:** 11.09.2019 12:34:29 UTC+05:00
**Link:** https://t.me/nest_ru/31231

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Локально база поднята, но как заставить тесты джеста нормально использовать тестируемый сервайс не пойму Тесты для юзер-сервайса выглядят примерно так  import { Test, TestingModule } from '@nestjs/testing'; import { UserService } from './user.service'; describe('UserService', () => { let service: UserService; beforeEach(async () => { const module: TestingModule = await Test.createTestingModule({ providers: [UserService], }).compile(); service = module.get<UserService>(UserService); }); it('Get exists user', async () => { let user = await service.getByUsername('existsUser'); expect(user.username).toEqual('existsUser'); }); });
- Nestjs использует модульных подход во всем? В подключении бд, в добавлении вебсокетов В добаалении graphql И подключении протоколов для микросервисов
- все есть модуль.
- Привет У меня вопрос относительно тестов ... У меня есть Guard и я его не могу оверайдить ...

Main message:
const mockGuard=()=>({canActivate:()=>true}); ... .overrideGuard(JwtGuard) .useValue(new mockGuard())

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

const mockGuard=()=>({canActivate:()=>true}); ... .overrideGuard(JwtGuard) .useValue(new mockGuard())

--

## My telegram message #31241
**Time:** 11.09.2019 13:05:32 UTC+05:00
**Link:** https://t.me/nest_ru/31241

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
👍

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍

--

## My telegram message #31251
**Time:** 11.09.2019 14:04:55 UTC+05:00
**Link:** https://t.me/nest_ru/31251

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 403, тоесть сам  .overrideGuard(AuthGuard).useValue(authGuard); не работает

Main message:
попробуй контроллер не оверрайдить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

попробуй контроллер не оверрайдить

--

## My telegram message #31254
**Time:** 11.09.2019 17:21:08 UTC+05:00
**Link:** https://t.me/nest_ru/31254

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 403, тоесть сам  .overrideGuard(AuthGuard).useValue(authGuard); не работает
- попробуй контроллер не оверрайдить
- Хорошая статья  https://dev.to/nestjs/advanced-nestjs-dynamic-providers-1ee
- снова 401

Main message:
const mockGuard = jest.fn().mockImplementation( () => ({ canActivate(context: ExecutionContext): boolean { return true; } } as CanActivate) ); return Test.createTestingModule(metadata) .overrideGuard(JwtGuard) .useValue(new mockGuard()) .compile();

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

const mockGuard = jest.fn().mockImplementation( () => ({ canActivate(context: ExecutionContext): boolean { return true; } } as CanActivate) ); return Test.createTestingModule(metadata) .overrideGuard(JwtGuard) .useValue(new mockGuard()) .compile();

--

## My telegram message #31256
**Time:** 11.09.2019 17:49:36 UTC+05:00
**Link:** https://t.me/nest_ru/31256

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хорошая статья  https://dev.to/nestjs/advanced-nestjs-dynamic-providers-1ee
- снова 401
- const mockGuard = jest.fn().mockImplementation( () => ({ canActivate(context: ExecutionContext): boolean { return true; } } as CanActivate) ); return Test.createTestingModule(metadata) .overrideGuard(JwtGuard) .useValue(new mockGuard()) .compile();
- Можете пояснить, как работают микросервисы неста?

Main message:
как и везде есть некая шина и через нее гоняются события

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как и везде есть некая шина и через нее гоняются события

--

## My telegram message #31259
**Time:** 11.09.2019 17:49:56 UTC+05:00
**Link:** https://t.me/nest_ru/31259

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- const mockGuard = jest.fn().mockImplementation( () => ({ canActivate(context: ExecutionContext): boolean { return true; } } as CanActivate) ); return Test.createTestingModule(metadata) .overrideGuard(JwtGuard) .useValue(new mockGuard()) .compile();
- Можете пояснить, как работают микросервисы неста?
- как и везде есть некая шина и через нее гоняются события
- между собой общаются по шине

Main message:
или по порту друг друга дергают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

или по порту друг друга дергают

--

## My telegram message #31303
**Time:** 12.09.2019 11:12:43 UTC+05:00
**Link:** https://t.me/nest_ru/31303

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как вариант комбинировать потоки
- зачем кеш на все роуты ? я в целом не уверен что у вас там нагрузка насколько высокая что нужен кеш везде
- Я же выше написал, что не все, в рамках одного контроллера может пара роутов
- делаете 2 interceptor`a один который будет писать в кеш, а 2 будет обновлять точнее, создаете сервис для кеширования и инжектите его в interceptor`ы один вызывает методы для записи, а 2 для обновления

Main message:
а это не на уровне ngnix лучше делать?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а это не на уровне ngnix лучше делать?

--

## My telegram message #31567
**Time:** 13.09.2019 20:15:59 UTC+05:00
**Link:** https://t.me/nest_ru/31567

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем, привет, кто знает хорошие примеры angular+nest+graphql+postgres?
- Лучше всего самому это все сделать. Будешь знать точно что и как настраивается итд. А для начала хватит и доков и examples, по установке там достаточно
- Спасибо
- Да не за что

Main message:
Apollo graphql +angular Typegraphql +nestjs Гугли такие примеры на оф гитхабах все есть, примеры все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Apollo graphql +angular Typegraphql +nestjs Гугли такие примеры на оф гитхабах все есть, примеры все

--

## My telegram message #31582
**Time:** 14.09.2019 14:02:34 UTC+05:00
**Link:** https://t.me/nest_ru/31582

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну такое😂🌚
- не смотрел исходники этой либы, попробуй напиши issue, может сделают в скором времени фикс или решение предложат поспрашивай в чате на gitter или где там еще есть чаты
- Здаров, сейчас у меня тоже самое! Можешь отписаться что в итоге выбрал? Почему?
- страпи оч нестабильный, гост вызывает вопросы я выбрал писать свою cms на nest, так быстрее

Main message:
Быстрее на вордпресс)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Быстрее на вордпресс)

--

## My telegram message #31741
**Time:** 15.09.2019 17:56:44 UTC+05:00
**Link:** https://t.me/nest_ru/31741

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy а ты как решал это ?

Main message:
Я на работе тока, жрпс юзаю, стараюсь писать как все пишут, не углубляюсь, до меня тут уже науглублялись, для себя: хочу научится юзать на много людей фронт и бэк один контракт и работу с микросервисами в нест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я на работе тока, жрпс юзаю, стараюсь писать как все пишут, не углубляюсь, до меня тут уже науглублялись, для себя: хочу научится юзать на много людей фронт и бэк один контракт и работу с микросервисами в нест

--

## My telegram message #31749
**Time:** 15.09.2019 22:00:21 UTC+05:00
**Link:** https://t.me/nest_ru/31749

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я на работе тока, жрпс юзаю, стараюсь писать как все пишут, не углубляюсь, до меня тут уже науглублялись, для себя: хочу научится юзать на много людей фронт и бэк один контракт и работу с микросервисами в нест
- ребята, как вы убираете ненужные поля с entity когда возращаете респонс?
- Dto
- А ты контракты как-то фиксируешь/тестишь?

Main message:
Тайпинги генерятся и они юзаются в бэк и фронт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тайпинги генерятся и они юзаются в бэк и фронт

--

## My telegram message #31758
**Time:** 15.09.2019 22:08:17 UTC+05:00
**Link:** https://t.me/nest_ru/31758

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Dto
- А ты контракты как-то фиксируешь/тестишь?
- Тайпинги генерятся и они юзаются в бэк и фронт
- Не, я про то, случай когда у сервака например дропнулось поле, а клиент еще об этом не знает, но знает, что с ним работает. И тип чтобы не ловить ошибки в рантайме протестить, что сервак отвечает на все текущие требования всех клиентов

Main message:
Ааа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ааа

--

## My telegram message #31761
**Time:** 15.09.2019 22:08:59 UTC+05:00
**Link:** https://t.me/nest_ru/31761

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тайпинги генерятся и они юзаются в бэк и фронт
- Не, я про то, случай когда у сервака например дропнулось поле, а клиент еще об этом не знает, но знает, что с ним работает. И тип чтобы не ловить ошибки в рантайме протестить, что сервак отвечает на все текущие требования всех клиентов
- Ааа
- Когда команда распределенная и клиентов может быть много это маст хэв, кмк

Main message:
Я об этом лет 8 уже думаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я об этом лет 8 уже думаю

--

## My telegram message #31763
**Time:** 15.09.2019 22:09:13 UTC+05:00
**Link:** https://t.me/nest_ru/31763

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ааа
- Когда команда распределенная и клиентов может быть много это маст хэв, кмк
- Я об этом лет 8 уже думаю
- 😁😁😁

Main message:
Херня выхода нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Херня выхода нет

--

## My telegram message #31766
**Time:** 15.09.2019 22:09:35 UTC+05:00
**Link:** https://t.me/nest_ru/31766

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я об этом лет 8 уже думаю
- 😁😁😁
- Херня выхода нет
- Пакт смотрел?

Main message:
Неа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Неа

--

## My telegram message #31768
**Time:** 15.09.2019 22:09:59 UTC+05:00
**Link:** https://t.me/nest_ru/31768

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Херня выхода нет
- Пакт смотрел?
- Неа
- Чисто ради любопытсва поссотри что они обещают

Main message:
Если есть кейс когда получится сломать значит сломают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Если есть кейс когда получится сломать значит сломают

--

## My telegram message #31776
**Time:** 15.09.2019 22:11:40 UTC+05:00
**Link:** https://t.me/nest_ru/31776

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Неа
- Чисто ради любопытсва поссотри что они обещают
- Если есть кейс когда получится сломать значит сломают
- Ииии?

Main message:
Ответы и запросы сохраняют

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ответы и запросы сохраняют

--

## My telegram message #31781
**Time:** 15.09.2019 22:12:43 UTC+05:00
**Link:** https://t.me/nest_ru/31781

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если есть кейс когда получится сломать значит сломают
- Ииии?
- Ответы и запросы сохраняют
- А ну ты имеешь ввиду делают из них тестовые данные, которые гоняются при деплое? Не оч понимаю

Main message:
Да тип того

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да тип того

--

## My telegram message #31786
**Time:** 15.09.2019 22:16:42 UTC+05:00
**Link:** https://t.me/nest_ru/31786

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ответы и запросы сохраняют
- А ну ты имеешь ввиду делают из них тестовые данные, которые гоняются при деплое? Не оч понимаю
- Да тип того
- А, это я где то видел. Но это как бы не очень решает проблему нарушения контрактов, не?

Main message:
Ну все эти запросы могут запускать в сиай и проверять ответы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну все эти запросы могут запускать в сиай и проверять ответы

--

## My telegram message #31792
**Time:** 15.09.2019 22:19:20 UTC+05:00
**Link:** https://t.me/nest_ru/31792

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да тип того
- А, это я где то видел. Но это как бы не очень решает проблему нарушения контрактов, не?
- Ну все эти запросы могут запускать в сиай и проверять ответы
- Вот о чём я говорю это как часть регрессионки. Типа, что все что работало продожает работать

Main message:
Да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да

--

## My telegram message #31795
**Time:** 15.09.2019 22:19:57 UTC+05:00
**Link:** https://t.me/nest_ru/31795

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну все эти запросы могут запускать в сиай и проверять ответы
- Вот о чём я говорю это как часть регрессионки. Типа, что все что работало продожает работать
- Да
- Ого. А дай ссылку? Я может там еще не смотрел)

Main message:
В итоге сырого графа ваще не было

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В итоге сырого графа ваще не было

--

## My telegram message #31799
**Time:** 15.09.2019 22:20:53 UTC+05:00
**Link:** https://t.me/nest_ru/31799

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- Ого. А дай ссылку? Я может там еще не смотрел)
- В итоге сырого графа ваще не было
- Ааа ой) лан, завтра тыркну. Ок?

Main message:
Ок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ок

--

## My telegram message #31805
**Time:** 15.09.2019 22:24:51 UTC+05:00
**Link:** https://t.me/nest_ru/31805

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В итоге сырого графа ваще не было
- Ааа ой) лан, завтра тыркну. Ок?
- Ок
- Ты про рест или гкл?

Main message:
Да хоть что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да хоть что

--

## My telegram message #31808
**Time:** 15.09.2019 22:25:15 UTC+05:00
**Link:** https://t.me/nest_ru/31808

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ок
- Ты про рест или гкл?
- Да хоть что
- Я не оч представляю себе как его версионивать. Только если префиксы к кверям и прочему добру

Main message:
Методы другие да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Методы другие да

--

## My telegram message #31813
**Time:** 15.09.2019 22:26:40 UTC+05:00
**Link:** https://t.me/nest_ru/31813

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да хоть что
- Я не оч представляю себе как его версионивать. Только если префиксы к кверям и прочему добру
- Методы другие да
- Ну это как раз фигня. Как это в схеме выглядит?

Main message:
С течением времени они помрут лишние

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

С течением времени они помрут лишние

--

## My telegram message #31817
**Time:** 15.09.2019 22:28:22 UTC+05:00
**Link:** https://t.me/nest_ru/31817

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Методы другие да
- Ну это как раз фигня. Как это в схеме выглядит?
- С течением времени они помрут лишние
- User { login email } UserV2 { username }

Main message:
Если расширяешь то остаётся старое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Если расширяешь то остаётся старое

--

## My telegram message #31827
**Time:** 15.09.2019 22:44:37 UTC+05:00
**Link:** https://t.me/nest_ru/31827

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- С течением времени они помрут лишние
- User { login email } UserV2 { username }
- Если расширяешь то остаётся старое
- Ну вот это крикнули мне и не нравится и хочется автоматизировать

Main message:
Ну это руками тока

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну это руками тока

--

## My telegram message #31830
**Time:** 15.09.2019 22:51:23 UTC+05:00
**Link:** https://t.me/nest_ru/31830

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если расширяешь то остаётся старое
- Ну вот это крикнули мне и не нравится и хочется автоматизировать
- Ну это руками тока
- Просто если кому-то забыли крикнуть, то он не обновится. А если кто-то продолжает использовать, а ты выпилил, то привет бубух

Main message:
Не

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не

--

