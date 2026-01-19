## My telegram message #59172
**Time:** 04.04.2020 01:28:45 UTC+05:00
**Link:** https://t.me/nest_ru/59172

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- или делать observable toPromise или везде юзать Observable
- Спасибо! Не знал о возможности  observable toPromise , сейчас почитаем.
- И добрый веееечееер
- подскажите наиболее адекватный способ воткнуть seedы в typeorm

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #59175
**Time:** 04.04.2020 01:30:48 UTC+05:00
**Link:** https://t.me/nest_ru/59175

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
вот так добрасываю не тока сервис и модули

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот так добрасываю не тока сервис и модули

--

## My telegram message #59177
**Time:** 04.04.2020 01:31:32 UTC+05:00
**Link:** https://t.me/nest_ru/59177

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- да я тоже хотел, но потом подумал, что миграцию будет тяжело найти и она будет среди других миграций, которые типы данных меняют. пытаюсь настроить typeorm-seeding

Main message:
можешь папку для сеед миграций сделать, там же по всем папкам поиск идет в пути который указал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можешь папку для сеед миграций сделать, там же по всем папкам поиск идет в пути который указал

--

## My telegram message #59186
**Time:** 04.04.2020 11:17:49 UTC+05:00
**Link:** https://t.me/nest_ru/59186

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В отдельную папку
- https://medium.com/the-crowdlinker-chronicle/seeding-databases-using-nestjs-cd6634e8efc5
- я уже прихерачил typeorm-seeding и оно даже живое о_О
- Подскажите пожалуйста, почему  req.isAuthenticated() возвращает  false Реализую авторизацию через openid-client с сессиями. Аутентификация проходит нормально, а с авторизацией проблемы. При аутентификации user добавляется в request, А при авторизации его нет и соответственно isAuthenticated возвращает false. Все по идее есть: main.ts  async function bootstrap() { const app = await NestFactory.create(AppModule); const MongoStore = connectMongo(session); app.use(helmet()); app.enableCors(); app.use(cookieParser('secret')); app.use( session({ store: new MongoStore({ url: 'mongodb://localhost:27017/test-mongo' }), secret: 'secret', resave: false, saveUninitialized: false, rolling: true, cookie: { maxAge: 30 * 60 * 1000, // 30 минуты httpOnly: true, }, }), ); app.use(passport.initialize()); app.use(passport.session()); auth.module.ts  @Module({ imports: [ UserModule, TokenModule, HttpModule, PassportModule.register({ session: true }), ], providers: [OpenIdConnectStrategyFactory, SessionSerializer, AuthService], controllers: [AuthController], exports: [AuthService], }) export class AuthModule {} Стратегия  @Injectable() export class OpenIdConnectStrategy extends PassportStrategy(Strategy, 'oidc') { client: Client; constructor(private readonly configService: ConfigService, client: Client) { super({ client: client, params: { redirect_uri: configService.get<string>('KEYCLOAK_REDIRECT_URI'), scope: configService.get<string>('KEYCLOAK_SCOPE'), }, passReqToCallback: false, usePKCE: false, }); this.client = client; } async validate(tokenset: TokenSet): Promise<any> { const userinfo: UserinfoResponse = await this.client.userinfo(tokenset); try { const id_token = tokenset.id_token; const access_token = tokenset.access_token; const refresh_token = tokenset.refresh_token; const user = { id_token, access_token, refresh_token, userinfo, }; return user; } catch (err) { throw new UnauthorizedException(); } } } Гварда  @Injectable() export class AuthenticatedGuard implements CanActivate { async canActivate(context: ExecutionContext) { const request = context.switchToHttp().getRequest(); if (request.isAuthenticated()) { return true; } throw new UnauthorizedException(); } } Фабрика  const buildOpenIdClient = async (configService: ConfigService) => { const TrustIssuer = await Issuer.discover( configService.get<string>('KEYCLOAK_ISSUER') + 'auth/realms/' + configService.get<string>('KEYCLOAK_REALM') + '/.well-known/openid-configuration', ); const client = new TrustIssuer.Client({ client_id: configService.get<string>('KEYCLOAK_CLIENT_ID'), client_secret: configService.get<string>('KEYCLOAK_CLIENT_SECRET'), }); return client; }; export const OpenIdConnectStrategyFactory = { provide: 'OpenIdConnectStrategy', useFactory: async (configService: ConfigService) => { const client = await buildOpenIdClient(configService); return new OpenIdConnectStrategy(configService, client); }, inject: [ConfigService], }; Сори за лонгрид Подробнее можно в репо посмотреть  https://github.com/ieromanov/crm-back/tree/feature/auth

Main message:
На гитхаб не вижу как ты решаешь гарды

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На гитхаб не вижу как ты решаешь гарды

--

## My telegram message #59191
**Time:** 04.04.2020 11:20:18 UTC+05:00
**Link:** https://t.me/nest_ru/59191

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я уже прихерачил typeorm-seeding и оно даже живое о_О
- Подскажите пожалуйста, почему  req.isAuthenticated() возвращает  false Реализую авторизацию через openid-client с сессиями. Аутентификация проходит нормально, а с авторизацией проблемы. При аутентификации user добавляется в request, А при авторизации его нет и соответственно isAuthenticated возвращает false. Все по идее есть: main.ts  async function bootstrap() { const app = await NestFactory.create(AppModule); const MongoStore = connectMongo(session); app.use(helmet()); app.enableCors(); app.use(cookieParser('secret')); app.use( session({ store: new MongoStore({ url: 'mongodb://localhost:27017/test-mongo' }), secret: 'secret', resave: false, saveUninitialized: false, rolling: true, cookie: { maxAge: 30 * 60 * 1000, // 30 минуты httpOnly: true, }, }), ); app.use(passport.initialize()); app.use(passport.session()); auth.module.ts  @Module({ imports: [ UserModule, TokenModule, HttpModule, PassportModule.register({ session: true }), ], providers: [OpenIdConnectStrategyFactory, SessionSerializer, AuthService], controllers: [AuthController], exports: [AuthService], }) export class AuthModule {} Стратегия  @Injectable() export class OpenIdConnectStrategy extends PassportStrategy(Strategy, 'oidc') { client: Client; constructor(private readonly configService: ConfigService, client: Client) { super({ client: client, params: { redirect_uri: configService.get<string>('KEYCLOAK_REDIRECT_URI'), scope: configService.get<string>('KEYCLOAK_SCOPE'), }, passReqToCallback: false, usePKCE: false, }); this.client = client; } async validate(tokenset: TokenSet): Promise<any> { const userinfo: UserinfoResponse = await this.client.userinfo(tokenset); try { const id_token = tokenset.id_token; const access_token = tokenset.access_token; const refresh_token = tokenset.refresh_token; const user = { id_token, access_token, refresh_token, userinfo, }; return user; } catch (err) { throw new UnauthorizedException(); } } } Гварда  @Injectable() export class AuthenticatedGuard implements CanActivate { async canActivate(context: ExecutionContext) { const request = context.switchToHttp().getRequest(); if (request.isAuthenticated()) { return true; } throw new UnauthorizedException(); } } Фабрика  const buildOpenIdClient = async (configService: ConfigService) => { const TrustIssuer = await Issuer.discover( configService.get<string>('KEYCLOAK_ISSUER') + 'auth/realms/' + configService.get<string>('KEYCLOAK_REALM') + '/.well-known/openid-configuration', ); const client = new TrustIssuer.Client({ client_id: configService.get<string>('KEYCLOAK_CLIENT_ID'), client_secret: configService.get<string>('KEYCLOAK_CLIENT_SECRET'), }); return client; }; export const OpenIdConnectStrategyFactory = { provide: 'OpenIdConnectStrategy', useFactory: async (configService: ConfigService) => { const client = await buildOpenIdClient(configService); return new OpenIdConnectStrategy(configService, client); }, inject: [ConfigService], }; Сори за лонгрид Подробнее можно в репо посмотреть  https://github.com/ieromanov/crm-back/tree/feature/auth
- На гитхаб не вижу как ты решаешь гарды
- Я контроллер просто не коммитил нужный

Main message:
Надо гард глобально запилить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Надо гард глобально запилить

--

## My telegram message #59374
**Time:** 08.04.2020 01:44:39 UTC+05:00
**Link:** https://t.me/nest_ru/59374

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- какими сущностями владеет пользователь не относится к его конфигурации пермишенов
- вы все равно не знаете о том может он это делать или нет без запроса самой сущности, на сколько я понял. не знаю на сколько это по-nestовски, но: если речь об условном ownerId в groups, то вам все равно делать select-предзапрос на проверку (для унификации прав доступа), и nest здесь не сильно важен, поэтому в сервисе групп юзеров у вас должен быть async can(action: string, id: string), возвращающий boolean. вы этот can можете дернуть из гварда, или любого другого места
- тоесть дёрнуть метод из сервика с запросом в БД на уровне гварда - допустимо?
- 🤷 это вопрос к гуру идеологии

Main message:
Можно не удолять, а делать софт делет, тоесть инсерт с тру в поле делетед, и каждая запись каждой сущности должна иметь createdBy там будешь писать юзер ид, софт делет будет делать апдейт сущности и кидать текущего ющерид, в базе триггером проверяешь старый createdBy равен ли новому, если нет то выкидываешь ошибку и её на бэке обрабатываешь И не нужно выбирать данные для сравнения Если софт делет не нужны, то просто в фоне некий джоб переодически сносит все софт делеты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Можно не удолять, а делать софт делет, тоесть инсерт с тру в поле делетед, и каждая запись каждой сущности должна иметь createdBy там будешь писать юзер ид, софт делет будет делать апдейт сущности и кидать текущего ющерид, в базе триггером проверяешь старый createdBy равен ли новому, если нет то выкидываешь ошибку и её на бэке обрабатываешь И не нужно выбирать данные для сравнения Если софт делет не нужны, то просто в фоне некий джоб переодически сносит все софт делеты

--

## My telegram message #59378
**Time:** 08.04.2020 01:48:10 UTC+05:00
**Link:** https://t.me/nest_ru/59378

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тоесть дёрнуть метод из сервика с запросом в БД на уровне гварда - допустимо?
- 🤷 это вопрос к гуру идеологии
- Можно не удолять, а делать софт делет, тоесть инсерт с тру в поле делетед, и каждая запись каждой сущности должна иметь createdBy там будешь писать юзер ид, софт делет будет делать апдейт сущности и кидать текущего ющерид, в базе триггером проверяешь старый createdBy равен ли новому, если нет то выкидываешь ошибку и её на бэке обрабатываешь И не нужно выбирать данные для сравнения Если софт делет не нужны, то просто в фоне некий джоб переодически сносит все софт делеты
- Звучит как будто заплатка.

Main message:
Я такое делал несколько раз, подругому ты быструю работу не получишь и придётся фетчить данные перед их удалением

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я такое делал несколько раз, подругому ты быструю работу не получишь и придётся фетчить данные перед их удалением

--

## My telegram message #59401
**Time:** 08.04.2020 10:19:21 UTC+05:00
**Link:** https://t.me/nest_ru/59401

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Dto подкатывают данные с фронта и обвешаны валидацией, а потом если все ок, то я мапю Dto в Entity и сохраняю в бд?
- получается, что dto это только "фронт => бек" с валидацией? Судя по доке так, тк обратно entity просто трансформируется интерсептором, но не мапится в само dto?
- Доброй ночи ) Я новичок в NEST и хочу понять, как правильно сделать вот такую штуку: Нужно сделать контроллеры для обработки запросов по таким правилам для урлов /api/v1/(user|page|news) & /gateway/v1/(user|page|news), при этом эти контроллеры (модули) должны будут работать с одинаковыми сущностями базы данных типа user || page || news. Дайте дельный совет как такое организовать в NEST. Для  /api &  /gateway необходимо организовать разные способы авторизации/аутентификации ( разные протоколы )
- Подойдет ли вариант: создать модули gateway & api, модули user&page&news сделать без контроллеров (только сервисы) и в модулях gateway & api создать контроллеры которые и будут инкапсулировать логику работы с приложением используя модули user & page & news

Main message:
Можно и так, можно дженериковый базовый контроллер создать и наследоваться от него, чтобы не копипастить все, этот базовый фича контроллер хранить в фиче модуле, в папке, не в импортах модуля

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Можно и так, можно дженериковый базовый контроллер создать и наследоваться от него, чтобы не копипастить все, этот базовый фича контроллер хранить в фиче модуле, в папке, не в импортах модуля

--

## My telegram message #59409
**Time:** 08.04.2020 11:49:23 UTC+05:00
**Link:** https://t.me/nest_ru/59409

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy звучит солидно ) Знать бы как его напилить ... )))

Main message:
class BaseUserController<T>

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

class BaseUserController<T>

--

## My telegram message #59411
**Time:** 08.04.2020 11:50:17 UTC+05:00
**Link:** https://t.me/nest_ru/59411

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну все, спалились, осталось всего 9 человек до 1000.. и кто то будет проставляться.
- @KaufmanEndy звучит солидно ) Знать бы как его напилить ... )))
- class BaseUserController<T>
- https://discord.gg/cgXGM8

Main message:
Через женерик типы добрасывать если отличаются в каждой реализации

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через женерик типы добрасывать если отличаются в каждой реализации

--

## My telegram message #59414
**Time:** 08.04.2020 12:49:05 UTC+05:00
**Link:** https://t.me/nest_ru/59414

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- class BaseUserController<T>
- https://discord.gg/cgXGM8
- Через женерик типы добрасывать если отличаются в каждой реализации
- народ! как из одного gRPC сервиса дернуть другой gRPC сервис?

Main message:
также как в тестах это делается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

также как в тестах это делается

--

## My telegram message #59417
**Time:** 08.04.2020 13:24:27 UTC+05:00
**Link:** https://t.me/nest_ru/59417

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Можно как-то в несте сделать чтобы можно было принимтаь либо 1 енам в квери либо массив этих енамов?  @IsOptional ()  @IsEnum (GeographiesEnum) readonly geographies?: string; или надо собственный декоратор для такого писать?

Main message:
@IsEnum (GeographiesEnum, { each: true })

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@IsEnum (GeographiesEnum, { each: true })

--

## My telegram message #59427
**Time:** 08.04.2020 13:56:10 UTC+05:00
**Link:** https://t.me/nest_ru/59427

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Создал клиента, не понимаю что делать дальше onModuleInit() { this.mailService = this.client.getService('MailService') console.log(this.mailService) } ____ console.log(this.mailService) выдает { '$method_definitions': [Function (anonymous)], '$method_names': [Function (anonymous)], send: [Function (anonymous)] } то есть send объявленный в .proto подхватывает, но вот что с этим дальше делать?

Main message:
посмотри тесты по grpc  https://github.com/nestjs/nest/blob/master/integration/microservices/e2e/orders-grpc.spec.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

посмотри тесты по grpc  https://github.com/nestjs/nest/blob/master/integration/microservices/e2e/orders-grpc.spec.ts

--

## My telegram message #59471
**Time:** 09.04.2020 00:13:27 UTC+05:00
**Link:** https://t.me/nest_ru/59471

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 🤔 странно по умолчанию должен
- спасибо тебе добрый человек. скопировал твое решение и работает
- ☺️
- Ребят я тут нагрузочное тестирование проводил, да и решил глянуть что будет если у меня редис отвалится, сколько потянет монго. Так вот вопрос: Это нормально что она у меня больше чем 60 -80 запросов в сек не тянет, хотя она как минимум на SSD. ?

Main message:
Любишь ты усложнять, нашёл торзмоза улучшай, у нас у всех тормоза и мы улудшаем, оно также на всех языках, рано или поздно упирается и начинаешь улудшать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Любишь ты усложнять, нашёл торзмоза улучшай, у нас у всех тормоза и мы улудшаем, оно также на всех языках, рано или поздно упирается и начинаешь улудшать

--

## My telegram message #59509
**Time:** 09.04.2020 11:31:01 UTC+05:00
**Link:** https://t.me/nest_ru/59509

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- кто-нибудь курил такую штуку: есть shared на fronend и backend, тянется как npm модуль и не хотелось бы на фронт тянуть декораторы сваггера при указании в nest-cli.json  "compilerOptions": { "plugins": [ "@nestjs/swagger/plugin" ] } ничего не поисходит ввиду того, что компиляция не не затрагивает node_modules

Main message:
шаред компиль отдельно через tsc и там свой tsconfig

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

шаред компиль отдельно через tsc и там свой tsconfig

--

## My telegram message #59512
**Time:** 09.04.2020 11:35:45 UTC+05:00
**Link:** https://t.me/nest_ru/59512

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Екарный бабай. Всего лишь то надо было дальше покрутить 🤦🏼‍♂️
- всем привет есть идеи как прокинуть в регистрацию динамического модуля env-ы?
- шаред компиль отдельно через tsc и там свой tsconfig
- в таком случае не подтянешь как npm, как понимаю

Main message:
подтянешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

подтянешь

--

## My telegram message #59514
**Time:** 09.04.2020 11:59:50 UTC+05:00
**Link:** https://t.me/nest_ru/59514

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- шаред компиль отдельно через tsc и там свой tsconfig
- в таком случае не подтянешь как npm, как понимаю
- подтянешь
- тогда недопер как. 2 npm?

Main message:
билдишь через tsc на выходе у тя файлы жс, создаешь package.json указываешь все что нужно и публикуешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

билдишь через tsc на выходе у тя файлы жс, создаешь package.json указываешь все что нужно и публикуешь

--

## My telegram message #59517
**Time:** 09.04.2020 12:01:44 UTC+05:00
**Link:** https://t.me/nest_ru/59517

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- подтянешь
- тогда недопер как. 2 npm?
- билдишь через tsc на выходе у тя файлы жс, создаешь package.json указываешь все что нужно и публикуешь
- так в итоге получится же такой же засранный js

Main message:
ну а что ты хочешь?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну а что ты хочешь?

--

## My telegram message #59523
**Time:** 09.04.2020 12:08:22 UTC+05:00
**Link:** https://t.me/nest_ru/59523

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Предлагаю протестовать. Что бы мелкософт добавил опцию withSource и вообще могли бы в d.ts не только типи но и сам код оставлять.

Main message:
ну тогда бдудет дублирование, зачем) и зачем это на прод выкатывать твои исходники) когда ты прооект соберешь у тя будет жэс все твое, а все что внешнее через npm i доставится, все кроме дев депенденси, а если каждый будет туда исходники пихать оно же кучу места займет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну тогда бдудет дублирование, зачем) и зачем это на прод выкатывать твои исходники) когда ты прооект соберешь у тя будет жэс все твое, а все что внешнее через npm i доставится, все кроме дев депенденси, а если каждый будет туда исходники пихать оно же кучу места займет

--

## My telegram message #59527
**Time:** 09.04.2020 12:09:32 UTC+05:00
**Link:** https://t.me/nest_ru/59527

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Предлагаю протестовать. Что бы мелкософт добавил опцию withSource и вообще могли бы в d.ts не только типи но и сам код оставлять.
- в shared висят dto для фронта и бека. и он билдится через tsc типо class A {  @ApiProperty () bar: string } это соберется и поедет на фронт с лишним кодом, чего хотелось бы избежать и технически, билдится при npm i, тянется с гита и автоматом выполняется prepare скрипт
- ну тогда бдудет дублирование, зачем) и зачем это на прод выкатывать твои исходники) когда ты прооект соберешь у тя будет жэс все твое, а все что внешнее через npm i доставится, все кроме дев депенденси, а если каждый будет туда исходники пихать оно же кучу места займет
- есть вариант в виде костыля: на фронт затягивать и через webpack резать декораторы, а затем неиспользуемые импорты

Main message:
у меня вообще граф декораторы не тока сваггер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня вообще граф декораторы не тока сваггер

--

## My telegram message #59530
**Time:** 09.04.2020 12:10:47 UTC+05:00
**Link:** https://t.me/nest_ru/59530

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- так это и не фреймворко зависимые, dto, вроде как общепринятая практика. просто смысл дублировать одинаковые данные, например, для логина

Main message:
у тя декоратор фрэймворко зависимый, дто если хочешь шарить шарь тока его, класс валидатор + класс трансформ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя декоратор фрэймворко зависимый, дто если хочешь шарить шарь тока его, класс валидатор + класс трансформ

--

## My telegram message #59532
**Time:** 09.04.2020 12:12:30 UTC+05:00
**Link:** https://t.me/nest_ru/59532

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так это и не фреймворко зависимые, dto, вроде как общепринятая практика. просто смысл дублировать одинаковые данные, например, для логина
- Нет, не будет. Просто исходники будут лежать в отдельной папке, или будет лишний дтс который не нужен для прода. Притом кто захочет тот запустит npm i --withSource а кто не захочет скачает как обычно. ts npm принадлежать мелкософту они бы могли это сделать
- у тя декоратор фрэймворко зависимый, дто если хочешь шарить шарь тока его, класс валидатор + класс трансформ
- и мы вернулись к началу, в этом и был вопрос, мб кто-нибудь придумал как генерить описание dto на несте во внешнем модуле

Main message:
есть хак короче, ща поищу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть хак короче, ща поищу

--

## My telegram message #59538
**Time:** 09.04.2020 12:15:17 UTC+05:00
**Link:** https://t.me/nest_ru/59538

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
вот пример  https://github.com/divyenduz/ts-graphql-plugin , я эту штуку юзал когда мне нужно было на бэке чтобы декоратор был оригинальный, а на фронте чтобы урезался функционал, чтобы не тянуть туда всякое барахло бэковое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот пример  https://github.com/divyenduz/ts-graphql-plugin , я эту штуку юзал когда мне нужно было на бэке чтобы декоратор был оригинальный, а на фронте чтобы урезался функционал, чтобы не тянуть туда всякое барахло бэковое

--

## My telegram message #59545
**Time:** 09.04.2020 12:36:39 UTC+05:00
**Link:** https://t.me/nest_ru/59545

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот пример  https://github.com/divyenduz/ts-graphql-plugin , я эту штуку юзал когда мне нужно было на бэке чтобы декоратор был оригинальный, а на фронте чтобы урезался функционал, чтобы не тянуть туда всякое барахло бэковое
- спасибо, покурю код
- Так а что мешает шарить ts в личный репозитории без компиляции?
- как и описывал выше, так и есть, затем это тянется через npm, который в свою очередь вызывает из package.json prepare, который билдит

Main message:
Для работы некоторых декораторов тянется файловая система и всякие тулзы ноды

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Для работы некоторых декораторов тянется файловая система и всякие тулзы ноды

--

## My telegram message #59633
**Time:** 10.04.2020 10:12:48 UTC+05:00
**Link:** https://t.me/nest_ru/59633

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в продолжение костыльнул вызовом makefile, который в postinstall проверяет локально установненный nest-cli и при его существовании билдит через него
- Парни, как убрать папку из списка отслеживаемых при npm run start:dev? Добавляю в exclude в tsconfjg.json - не работает
- tsconfig.build.json ?
- и главный и этот

Main message:
Это вроде для билда параметр, а отслеживание там надо смотреть как у тя работает, через нодемон или как стартует?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это вроде для билда параметр, а отслеживание там надо смотреть как у тя работает, через нодемон или как стартует?

--

## My telegram message #59855
**Time:** 12.04.2020 14:51:06 UTC+05:00
**Link:** https://t.me/nest_ru/59855

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет, подскажите правильно ли я понял, что при юнит тестировании контроллера нет возможности одновременно проверить  @UsePipes (ValidationPipe) для DTO, а только в e2e ?

Main message:
Гарды и пайпы лучше глобально ставить, а на метода контроллера свои декораторы которые метадату будут содержать с необходимым описанием, и эту инфу юзаешь в гарде и пайпе и кастомизмруешь как хочешь, А в тестах можно глобальный пайп или гард менять логику

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Гарды и пайпы лучше глобально ставить, а на метода контроллера свои декораторы которые метадату будут содержать с необходимым описанием, и эту инфу юзаешь в гарде и пайпе и кастомизмруешь как хочешь, А в тестах можно глобальный пайп или гард менять логику

--

## My telegram message #59860
**Time:** 12.04.2020 15:43:33 UTC+05:00
**Link:** https://t.me/nest_ru/59860

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Возможно я аутист, но четырезначный код во всех записях одинаковый  @Column ({ nullable: false }) confirmationCode: string  @BeforeInsert () setConfirmationCode() { this.confirmationCode = randomId(4) } Я по разному пытался это делать, ставил default и даже в самом методе добавления сущности. Код один и тот же. В чем проблема?

Main message:
@Column ({ nullable: false, transformer: {to:()=>randomId(4) })

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@Column ({ nullable: false, transformer: {to:()=>randomId(4) })

--

## My telegram message #59876
**Time:** 12.04.2020 21:22:34 UTC+05:00
**Link:** https://t.me/nest_ru/59876

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- автор ид точно стринг?
- К проекту подключено 2 модуля: passport, mikroorm. mikroorm модуль регистрирует мидлвар. в bootstrap также регистрируются мидлвары паспорта через  app.use(passport.initialize()); app.use(passport.session()); Возникают некоторые проблемы из-за того, что мидлвар пасспорта срабатывает раньше, чем мидлвар ормки. Как-то можно это контролировать?
- Эммм, но там ведь должно всё по очереди идти,  next() же
- Возможно, это как-то связано с тем, что мидлвары пасспорта подключаются в bootstrap

Main message:
А зачем мидл вар? Чет на динамике чтоли?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А зачем мидл вар? Чет на динамике чтоли?

--

## My telegram message #59903
**Time:** 13.04.2020 01:16:15 UTC+05:00
**Link:** https://t.me/nest_ru/59903

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 🎉🎉🎉
- @val3rii поздравляю вы 1000 участник, по правилам этого чата 1000 участник проставляется. Место и время выберите сами ))))
- @val3rii Остался только стул с пиками, первый я занял
- Кто-то из вас пользуется postgresSQL?

Main message:
🥳🍾

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

🥳🍾

--

## My telegram message #60102
**Time:** 14.04.2020 14:49:46 UTC+05:00
**Link:** https://t.me/nest_ru/60102

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://github.com/svtslv/nestjs-objection
- Мини ормка
- возможно в typeorm можно указать что то типа select([' joinedTable.id ']) попробуй
- @KaufmanEndy ping. Ты вроде как-то делал такое.

Main message:
я тут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тут

--

## My telegram message #60111
**Time:** 14.04.2020 14:55:18 UTC+05:00
**Link:** https://t.me/nest_ru/60111

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Отлично, привет. Смотри у меня есть отножение поста к категорий. И вот я делаю у постов  .leftJoinAndSelect('post.category', 'category')  что бы достать категорию, вот только мне нафиг не нужен весь объект, а только его id или значение из categoryId. Понимаешь ?

Main message:
.leftJoin('post.category', 'category').addSelect(' category.id ') такое может проконает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

.leftJoin('post.category', 'category').addSelect(' category.id ') такое может проконает

--

