## My telegram message #274183
**Time:** 19.12.2023 11:46:10 UTC+05:00
**Link:** https://t.me/nest_ru/274183

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот если saas, покупается подписки на модули программы, которые умеют в коммуникацию между собой, которые устанавливаются в отделы, подписку модуль можно купить отдельно.Нужны ли микросервисы?Я пришел к выводу, что без них никак в самом концепте, который описал
- микросервисы норм если их не много 😁
- С шуткой: а потом приложение становится реально большим, состоит из 500+ микросервисов. Каждый из которых качественно написан, понятен и легко рефакторится. Но уже никто не знает, как работает проект в целом и как эти микросервисы друг с другом зацеплены. Изменения в одном из них приводят к неожиданным падениям вообще в непредсказуемых местах. Компания берет яйца в кулак и скручивает свой проект обратно в монолит. Ну и ездит по конференциям с докладами на тему: "Как мы обошли грабли, которые сами и положили" 😊
- Всем привет, недавно нашел app.init() - в документации явной информации по нему не нашел. В чем его различие с app.listen() ? Сервер запускается, но без порта(то что сам вижу при запуске). Он запускает так же ноду, но не позволяет обращаться к себе

Main message:
Это для тестов больше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это для тестов больше

--

## My telegram message #274187
**Time:** 19.12.2023 12:03:21 UTC+05:00
**Link:** https://t.me/nest_ru/274187

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет, недавно нашел app.init() - в документации явной информации по нему не нашел. В чем его различие с app.listen() ? Сервер запускается, но без порта(то что сам вижу при запуске). Он запускает так же ноду, но не позволяет обращаться к себе
- Это для тестов больше
- Спасибо!
- а если у меня например телеграм бот (лонг поллинг), то тоже пойдет?

Main message:
Да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да

--

## My telegram message #274329
**Time:** 19.12.2023 22:22:53 UTC+05:00
**Link:** https://t.me/nest_ru/274329

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет, подскажите по websoket. У меня в service есть некоторая функция, которую cron запускает каждые 5 сек. Эта функция принимает некоторые данные по api. И есть функция в файле gateway  @SubscribeMessage ('events') onSentMessage(): Observable<WsResponse<number>> { } как сделать чтобы когда клиент подключается и попадает в функцию onSentMessage ему постоянно шли сообщения по сокету из той функции в service, которая делает запросы каждые 5 сек?

Main message:
псевдокод  @Injectable() class EventService extends Subject{} class Gateway { constructor(private readonly eventService: EventService){} @SubscribeMessage('events') onSentMessage(): Observable<WsResponse<number>> { return this.eventService; } } @Injectable() class CronService { constructor(private readonly eventService: EventService){} @Cron(5MINUTE) runJob(){ this.eventService.next('DATA') } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

псевдокод  @Injectable() class EventService extends Subject{} class Gateway { constructor(private readonly eventService: EventService){} @SubscribeMessage('events') onSentMessage(): Observable<WsResponse<number>> { return this.eventService; } } @Injectable() class CronService { constructor(private readonly eventService: EventService){} @Cron(5MINUTE) runJob(){ this.eventService.next('DATA') } }

--

## My telegram message #274332
**Time:** 19.12.2023 23:07:30 UTC+05:00
**Link:** https://t.me/nest_ru/274332

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- как лучше всего реализовать кэширование каких то массивных данных вроде каталога товаров опредленного типа в телеграм боте?

Main message:
сперва весь софт до конца напиши и введи все возможные оптимизации в базе данных и в код, птом только кэш, кэш это самое последнее что нужно внедрять, так как ты им можешь нечайно скрыть проблемы в архитектуре или бд или логиках

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сперва весь софт до конца напиши и введи все возможные оптимизации в базе данных и в код, птом только кэш, кэш это самое последнее что нужно внедрять, так как ты им можешь нечайно скрыть проблемы в архитектуре или бд или логиках

--

## My telegram message #274334
**Time:** 19.12.2023 23:08:37 UTC+05:00
**Link:** https://t.me/nest_ru/274334

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- псевдокод  @Injectable() class EventService extends Subject{} class Gateway { constructor(private readonly eventService: EventService){} @SubscribeMessage('events') onSentMessage(): Observable<WsResponse<number>> { return this.eventService; } } @Injectable() class CronService { constructor(private readonly eventService: EventService){} @Cron(5MINUTE) runJob(){ this.eventService.next('DATA') } }
- как лучше всего реализовать кэширование каких то массивных данных вроде каталога товаров опредленного типа в телеграм боте?
- сперва весь софт до конца напиши и введи все возможные оптимизации в базе данных и в код, птом только кэш, кэш это самое последнее что нужно внедрять, так как ты им можешь нечайно скрыть проблемы в архитектуре или бд или логиках
- да весь софт вроде бы чудесно функционирует, индексы призмы подключил, за остальное не особо в курсах

Main message:
а кэш зачем? чет тормозит?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а кэш зачем? чет тормозит?

--

## My telegram message #274336
**Time:** 19.12.2023 23:08:57 UTC+05:00
**Link:** https://t.me/nest_ru/274336

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сперва весь софт до конца напиши и введи все возможные оптимизации в базе данных и в код, птом только кэш, кэш это самое последнее что нужно внедрять, так как ты им можешь нечайно скрыть проблемы в архитектуре или бд или логиках
- да весь софт вроде бы чудесно функционирует, индексы призмы подключил, за остальное не особо в курсах
- а кэш зачем? чет тормозит?
- заняться нечем

Main message:
девопс настрой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

девопс настрой

--

## My telegram message #274342
**Time:** 19.12.2023 23:10:44 UTC+05:00
**Link:** https://t.me/nest_ru/274342

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а кэш зачем? чет тормозит?
- заняться нечем
- девопс настрой
- у меня телеграм бот

Main message:
у меня тоже тг бот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня тоже тг бот

--

## My telegram message #274347
**Time:** 19.12.2023 23:16:14 UTC+05:00
**Link:** https://t.me/nest_ru/274347

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Записываешь клиента в Map, например subscribeClient Кроной запускаешь функцию которая достает из Map подписанных клиентов и отправляет им событие

Main message:
вот из этого можно взять токен и отдавать return this.eventService.filter(data=>data.userId===client.req.userId) псевдокод

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот из этого можно взять токен и отдавать return this.eventService.filter(data=>data.userId===client.req.userId) псевдокод

--

## My telegram message #274349
**Time:** 19.12.2023 23:18:17 UTC+05:00
**Link:** https://t.me/nest_ru/274349

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спасибо
- Записываешь клиента в Map, например subscribeClient Кроной запускаешь функцию которая достает из Map подписанных клиентов и отправляет им событие
- вот из этого можно взять токен и отдавать return this.eventService.filter(data=>data.userId===client.req.userId) псевдокод
- Так это один раз , а потом ?

Main message:
Это всегда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это всегда

--

## My telegram message #274352
**Time:** 19.12.2023 23:18:52 UTC+05:00
**Link:** https://t.me/nest_ru/274352

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот из этого можно взять токен и отдавать return this.eventService.filter(data=>data.userId===client.req.userId) псевдокод
- Так это один раз , а потом ?
- Это всегда
- Со стороны клиента что ли ?

Main message:
https://t.me/nest_ru/274329

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/274329

--

## My telegram message #274357
**Time:** 19.12.2023 23:33:38 UTC+05:00
**Link:** https://t.me/nest_ru/274357

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Может кто проконсультировать по поводу этой ошибки?

Main message:
нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет

--

## My telegram message #274368
**Time:** 20.12.2023 00:04:03 UTC+05:00
**Link:** https://t.me/nest_ru/274368

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Здравствуйте, подскажите из-за чего эта ошибка  [Nest] 57764 - 12/19/2023, 9:58:15 PM ERROR [ExceptionHandler] Nest can't resolve dependencies of the AppService (?). Please make sure that the argument "UsersRepository" at index [0] is available in the AppModule context. Potential solutions: - Is AppModule a valid NestJS module? - If "UsersRepository" is a provider, is it part of the current AppModule? - If "UsersRepository" is exported from a separate @Module, is that module imported within AppModule? @Module({ imports: [ /* the Module containing "UsersRepository" */ ] }) Error: Nest can't resolve dependencies of the AppService (?). Please make sure that the argument "UsersRepository" at index [0] is available in the AppModule context. Potential solutions: - Is AppModule a valid NestJS module? - If "UsersRepository" is a provider, is it part of the current AppModule? - If "UsersRepository" is exported from a separate @Module, is that module imported within AppModule? @Module({ imports: [ /* the Module containing "UsersRepository" */ ] })

Main message:
TypeOrm.forFeature([Users])

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

TypeOrm.forFeature([Users])

--

## My telegram message #274372
**Time:** 20.12.2023 00:28:26 UTC+05:00
**Link:** https://t.me/nest_ru/274372

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- TypeOrm.forFeature([Users])
- `Не ${за что}` ^^^ SyntaxError: Missing } in template expression
- Но только дав человеку леща, он начнет работать.
- Всем привет я плохо разбираюсь в бекенде но я короче раньше сохранял название файлов в бд и передавал через буффер А теперь хочу через урл  const imageUrl = `http://192.168.1.112:3000/uploaded-photos/${modifiedFilename}`; но почему-то когда я ссылку открываю 404

Main message:
https://docs.nestjs.com/recipes/serve-static

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://docs.nestjs.com/recipes/serve-static

--

## My telegram message #274469
**Time:** 21.12.2023 00:04:15 UTC+05:00
**Link:** https://t.me/nest_ru/274469

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- они всеравно же в конечном итоге респонс выдают
- Через spyon
- Вопрос, господа нестеровы. Есть проект с PrismaORM + Posgres. И одна из сущностей - Заказ - оч сложная (много полей, вложенные таблицы и т.п.). На фронтенде ожидается сделать кучу разных фильтров этого заказа, и кол-во возможных полей этого фильтра, похоже, бесконечно. Я написал несколько функций пока на 5 возможных полей. Но я чувствую, что этот подход - неправильный. Явно в каком-нибудь OZON (или ином сложном магазине, где куча параметров) делают иначе. Подскажете, в какую сторону копать ?
- скажем, у него 15 собственных полей, плюс связанные таблицы штук 5, у которых свои связанные таблицы и т.п. Дерево такое сложное.

Main message:
Придумай как сделать проще, из призма клиента ты можешь вытащить инфу о таблицах

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Придумай как сделать проще, из призма клиента ты можешь вытащить инфу о таблицах

--

## My telegram message #274472
**Time:** 21.12.2023 00:07:44 UTC+05:00
**Link:** https://t.me/nest_ru/274472

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вопрос, господа нестеровы. Есть проект с PrismaORM + Posgres. И одна из сущностей - Заказ - оч сложная (много полей, вложенные таблицы и т.п.). На фронтенде ожидается сделать кучу разных фильтров этого заказа, и кол-во возможных полей этого фильтра, похоже, бесконечно. Я написал несколько функций пока на 5 возможных полей. Но я чувствую, что этот подход - неправильный. Явно в каком-нибудь OZON (или ином сложном магазине, где куча параметров) делают иначе. Подскажете, в какую сторону копать ?
- скажем, у него 15 собственных полей, плюс связанные таблицы штук 5, у которых свои связанные таблицы и т.п. Дерево такое сложное.
- Придумай как сделать проще, из призма клиента ты можешь вытащить инфу о таблицах
- ну вот я и думаю что-то динамическое мутить, типа "приходит запрос а-ля  {'finished_date':['15-12-2023', '17-12-2023']} , и я как-то динамически ищу во всей связанной древесной структуре этого заказа подходящие поля и фильтрую по значению"

Main message:
Ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ага

--

## My telegram message #274477
**Time:** 21.12.2023 00:13:10 UTC+05:00
**Link:** https://t.me/nest_ru/274477

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- скажем, у него 15 собственных полей, плюс связанные таблицы штук 5, у которых свои связанные таблицы и т.п. Дерево такое сложное.
- Придумай как сделать проще, из призма клиента ты можешь вытащить инфу о таблицах
- ну вот я и думаю что-то динамическое мутить, типа "приходит запрос а-ля  {'finished_date':['15-12-2023', '17-12-2023']} , и я как-то динамически ищу во всей связанной древесной структуре этого заказа подходящие поля и фильтрую по значению"
- Ага

Main message:
Нам за это платят деньги так то)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нам за это платят деньги так то)

--

## My telegram message #274496
**Time:** 21.12.2023 08:10:33 UTC+05:00
**Link:** https://t.me/nest_ru/274496

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Там тоже говнокод, сперва всегда говнокод выходит, после 4 переписываний проекта может чет нормальное выйти уже, я вообще не видел проект который бы сразу писался идеальным, если пытатся так делать, то разработка будет длится вечно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там тоже говнокод, сперва всегда говнокод выходит, после 4 переписываний проекта может чет нормальное выйти уже, я вообще не видел проект который бы сразу писался идеальным, если пытатся так делать, то разработка будет длится вечно

--

## My telegram message #274503
**Time:** 21.12.2023 11:24:13 UTC+05:00
**Link:** https://t.me/nest_ru/274503

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Если новый проект делается в монорепе с отработанными подходами то сразу делается нормально :)

Main message:
От конторы к конторе эти подходы отличаются, даже в рамках одной конторы может быть 6 разных стилей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

От конторы к конторе эти подходы отличаются, даже в рамках одной конторы может быть 6 разных стилей

--

## My telegram message #274505
**Time:** 21.12.2023 11:24:56 UTC+05:00
**Link:** https://t.me/nest_ru/274505

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если новый проект делается в монорепе с отработанными подходами то сразу делается нормально :)
- Всем бы так
- От конторы к конторе эти подходы отличаются, даже в рамках одной конторы может быть 6 разных стилей
- Тогда это не монорепа)

Main message:
Монорепы тоже всё разные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Монорепы тоже всё разные

--

## My telegram message #274525
**Time:** 21.12.2023 12:20:44 UTC+05:00
**Link:** https://t.me/nest_ru/274525

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да много чего есть  https://monorepo.tools/#monorepo-tools

Main message:
можно было сайт назвать,  nx-is-the-best-of-the-bests-monorepo.tools 😁

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно было сайт назвать,  nx-is-the-best-of-the-bests-monorepo.tools 😁

--

## My telegram message #274527
**Time:** 21.12.2023 12:22:32 UTC+05:00
**Link:** https://t.me/nest_ru/274527

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Потому что тулинг хороший :) и исторически заточен на тайпскрипт кодовую базу
- С keycloak работали ? Норм тема или есть что-то проще ?
- можно было сайт назвать,  nx-is-the-best-of-the-bests-monorepo.tools 😁
- там еще moon в конкурентах)

Main message:
я о панте чет задумался, надо изучить, у него есть галка которой нет нигде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я о панте чет задумался, надо изучить, у него есть галка которой нет нигде

--

## My telegram message #274569
**Time:** 22.12.2023 00:40:21 UTC+05:00
**Link:** https://t.me/nest_ru/274569

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ничего, всё в базу упрётся всё равно
- А как быть?
- Масштабировать горизонтально
- 👌

Main message:
Фастифай скрывает тормозные моменты, без него ты будешь думать что код кривой и оптимизировать его или работу с БД, с ним ты не будешь думать об этом, считая что имеешь максимум

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фастифай скрывает тормозные моменты, без него ты будешь думать что код кривой и оптимизировать его или работу с БД, с ним ты не будешь думать об этом, считая что имеешь максимум

--

## My telegram message #274574
**Time:** 22.12.2023 00:47:42 UTC+05:00
**Link:** https://t.me/nest_ru/274574

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Масштабировать горизонтально
- 👌
- Фастифай скрывает тормозные моменты, без него ты будешь думать что код кривой и оптимизировать его или работу с БД, с ним ты не будешь думать об этом, считая что имеешь максимум
- всего несколько словосочетаний, а столько боли в глазах

Main message:
Нест даёт обёртку над транспортом, и можно в любой момент внедрить фастифай Нест даёт диай и можно в любой момент подменить реализацию Эти вещи можно внедрить в любой момент Главное грамотная разбивка зон ответственности и е2е

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нест даёт обёртку над транспортом, и можно в любой момент внедрить фастифай Нест даёт диай и можно в любой момент подменить реализацию Эти вещи можно внедрить в любой момент Главное грамотная разбивка зон ответственности и е2е

--

## My telegram message #275053
**Time:** 25.12.2023 00:30:05 UTC+05:00
**Link:** https://t.me/nest_ru/275053

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- привет, есть след код:  import { Module } from "@nestjs/common"; import { TypeOrmModule } from "@nestjs/typeorm"; import { AuthModule } from "./modules/auth/auth.module"; import { ChatService } from "./modules/chat/chat.service"; import { ChatController } from "./modules/chat/chat.controller"; import { ChatModule } from "./modules/chat/chat.module"; import { AuthService } from "./modules/auth/auth.service"; import { JwtModule } from "@nestjs/jwt"; import { AuthController } from "./modules/auth/auth.controller"; import { User } from "./database/models/user"; import { Chat } from "./database/models/chat"; @Module({ imports: [ TypeOrmModule.forRoot({ type: "mysql", host: "localhost", port: 3306, username: "root", password: "", database: "test", entities: [User,Chat], synchronize: true }), AuthModule, ChatModule, JwtModule, ], controllers: [AuthController, ChatController], providers: [AuthService, ChatService, ], }) export class AppModule {}  import { Module } from "@nestjs/common"; import { AuthController } from "./auth.controller"; import { AuthService } from "./auth.service"; import { PassportModule } from "@nestjs/passport"; import { JwtModule } from "@nestjs/jwt"; import { JwtStrategy } from "./jwt.strategy"; import { TypeOrmModule } from "@nestjs/typeorm"; import { User } from "src/database/models/user"; @Module({ imports: [ PassportModule, JwtModule.register({ secret: "qwerty123", signOptions: { expiresIn: "60s" }, }), TypeOrmModule.forFeature([User]) ], providers: [AuthService, JwtStrategy], exports: [AuthService, PassportModule, JwtModule], }) export class AuthModule {}  import { BadRequestException, ConflictException, Injectable, UnauthorizedException, } from "@nestjs/common"; import { RegisterAccountDTO } from "./DTO/registerAccountDTO"; import { JwtService } from "@nestjs/jwt"; import { LoginAccountDTO } from "./DTO/loginAccountDTO"; import * as bcrypt from "bcrypt"; import { UsersRepository } from "src/database/repositories"; import { Repository } from "typeorm"; import { InjectRepository } from "@nestjs/typeorm"; import { User } from "src/database/models/user"; @Injectable() export class AuthService { constructor( @InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) {} public async Login(loginAccountDto: LoginAccountDTO) { const user = await this.userRepository.findOne({ where: { login: loginAccountDto.login, }, }); if (!user) { throw new BadRequestException("Invalid credentials"); } const isPasswordMatching = await bcrypt.compare( loginAccountDto.password, user.password, ); if (!isPasswordMatching) { return; } const payload = { login: user.login, user_id: user.id }; return { accessToken: this.jwtService.sign(payload, { secret: "qwerty123", }), }; } public async Register(registerAccountDTO: RegisterAccountDTO) { let user = await this.userRepository.findOne({ where: { login: registerAccountDTO.login, }, }); if (user) { throw new ConflictException("User with presented login already exist"); } try { const hashedPassword = await bcrypt.hash(registerAccountDTO.password, 10); user = UsersRepository.create({ firstName: registerAccountDTO.firstName, lastName: registerAccountDTO.lastName, login: registerAccountDTO.login, username: "123", password: hashedPassword, }); await this.userRepository.save(user); return { Code: 201, Message: "User Created Succefully", }; } catch (error) { throw new BadRequestException("Something went wrong"); } } } при запуске получаю след ошибку:
- Ну написано же, JwtService не находит твой authservice
- так прикол не в нем, если убрать инжект репы typeorm то все ок

Main message:
Typeorm for feature в экспорт добавь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Typeorm for feature в экспорт добавь

--

## My telegram message #275055
**Time:** 25.12.2023 00:31:01 UTC+05:00
**Link:** https://t.me/nest_ru/275055

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну написано же, JwtService не находит твой authservice
- так прикол не в нем, если убрать инжект репы typeorm то все ок
- Typeorm for feature в экспорт добавь
- жесткий ты тип, конечно

Main message:
Аутх сервис убери из апп

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Аутх сервис убери из апп

--

