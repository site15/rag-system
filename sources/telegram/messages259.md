## My telegram message #286292
**Time:** 27.02.2024 16:58:02 UTC+05:00
**Link:** https://t.me/nest_ru/286292

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- т.е request -> node.js -> kafka -> node.js consumer -> kafka -> CH

Main message:
как же легко это все на словах звучит)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как же легко это все на словах звучит)

--

## My telegram message #286299
**Time:** 27.02.2024 17:12:44 UTC+05:00
**Link:** https://t.me/nest_ru/286299

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- аргументы?))

Main message:
Он же нужен чтобы коннекты базы не кушать, если цель не экономия коннектов а нечто другое, то думаю кодом синк евентов в базу руками пилить, алгоритмы по месту писать такие которые нужны, явно как то будет, чем фоновая не явная синхронизация про которую могут забыть и кастомить сложно Имхо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Он же нужен чтобы коннекты базы не кушать, если цель не экономия коннектов а нечто другое, то думаю кодом синк евентов в базу руками пилить, алгоритмы по месту писать такие которые нужны, явно как то будет, чем фоновая не явная синхронизация про которую могут забыть и кастомить сложно Имхо

--

## My telegram message #286355
**Time:** 27.02.2024 23:43:14 UTC+05:00
**Link:** https://t.me/nest_ru/286355

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- господа Есть модуль авторизации. Есть модуль пользователей. По-хорошему, к какому модулю должно относиться создание юзера? К "регистрации" модуля Авторизации, или к "create user" модуля Юзеров?

Main message:
вот это себе воткнул  https://authorizer.dev/ , пока полет нормальный, кастом весь на моей стороне, база по реге и входе на ней

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот это себе воткнул  https://authorizer.dev/ , пока полет нормальный, кастом весь на моей стороне, база по реге и входе на ней

--

## My telegram message #286358
**Time:** 27.02.2024 23:45:42 UTC+05:00
**Link:** https://t.me/nest_ru/286358

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а чем, кстати, "сервисная" архитектура отличается от "микросервисной" ?
- Ну там возможны различные трактовки, но суть примерно, как в твоем примере: микросервис лежит на более низком уровне и предоставляет очень простые, атомарные операции, а сервис (SOA) реализует уже конкретные бизнес-фичи
- вот это себе воткнул  https://authorizer.dev/ , пока полет нормальный, кастом весь на моей стороне, база по реге и входе на ней
- бегло пробежался. Его можно развернуть в Докире как отдельный [микро]сервис у себя там же ?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #286361
**Time:** 27.02.2024 23:46:41 UTC+05:00
**Link:** https://t.me/nest_ru/286361

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот это себе воткнул  https://authorizer.dev/ , пока полет нормальный, кастом весь на моей стороне, база по реге и входе на ней
- бегло пробежался. Его можно развернуть в Докире как отдельный [микро]сервис у себя там же ?
- да
- регистрацию не делает?

Main message:
некий индус пилит ее на го бэк и фронт на реакт, вообщем легкая и дает базовые штуки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

некий индус пилит ее на го бэк и фронт на реакт, вообщем легкая и дает базовые штуки

--

## My telegram message #286363
**Time:** 27.02.2024 23:46:52 UTC+05:00
**Link:** https://t.me/nest_ru/286363

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- регистрацию не делает?

Main message:
рега и логин есть да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

рега и логин есть да

--

## My telegram message #286368
**Time:** 27.02.2024 23:48:53 UTC+05:00
**Link:** https://t.me/nest_ru/286368

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- некий индус пилит ее на го бэк и фронт на реакт, вообщем легкая и дает базовые штуки
- ну в смысле функционал регистрации юзера на себя не берёт?
- рега и логин есть да
- офуительно бум пробовац — я слышал ещё про  Auth0 и  Octa

Main message:
аутх платный, окта сложнее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

аутх платный, окта сложнее

--

## My telegram message #286382
**Time:** 28.02.2024 00:13:15 UTC+05:00
**Link:** https://t.me/nest_ru/286382

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- что-то Докера нету

Main message:
server-authorizer: image: "lakhansamani/authorizer:1.3.8" container_name: "server-authorizer" ports: - "8000:8080" networks: - "server-network" environment: REDIS_URL: "redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379" DATABASE_URL: "postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer" ADMIN_SECRET: "VfKSfPPljhHBXCEohnitursmgDxfAyiD" DATABASE_TYPE: "postgres" DATABASE_NAME: "authorizer" FEATURE_NAME: "authorizer" ORGANIZATION_NAME: "Station of bots" DEPENDS_ON_SERVICE_NAMES: "[object Object]" IMAGE: "lakhansamani/authorizer:1.3.8" EXTERNAL_CLIENT_PORT: "8000" ENV: "production" PORT: "8080" COOKIE_NAME: "authorizer" RESET_PASSWORD_URL: "/reset-password" DISABLE_PLAYGROUND: "true" ROLES: "user,admin" DEFAULT_ROLES: "user" JWT_ROLE_CLAIM: "role" ORGANIZATION_LOGO: "Authorizer Logo" ACCESS_TOKEN_EXPIRY_TIME: "30m" COUCHBASE_BUCKET: "authorizer" COUCHBASE_BUCKET_RAM_QUOTA: "1000" COUCHBASE_SCOPE: "_default" tty: true restart: "always" depends_on: server-postgre-sql: condition: "service_healthy" server-redis: condition: "service_healthy"

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

server-authorizer: image: "lakhansamani/authorizer:1.3.8" container_name: "server-authorizer" ports: - "8000:8080" networks: - "server-network" environment: REDIS_URL: "redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379" DATABASE_URL: "postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer" ADMIN_SECRET: "VfKSfPPljhHBXCEohnitursmgDxfAyiD" DATABASE_TYPE: "postgres" DATABASE_NAME: "authorizer" FEATURE_NAME: "authorizer" ORGANIZATION_NAME: "Station of bots" DEPENDS_ON_SERVICE_NAMES: "[object Object]" IMAGE: "lakhansamani/authorizer:1.3.8" EXTERNAL_CLIENT_PORT: "8000" ENV: "production" PORT: "8080" COOKIE_NAME: "authorizer" RESET_PASSWORD_URL: "/reset-password" DISABLE_PLAYGROUND: "true" ROLES: "user,admin" DEFAULT_ROLES: "user" JWT_ROLE_CLAIM: "role" ORGANIZATION_LOGO: "Authorizer Logo" ACCESS_TOKEN_EXPIRY_TIME: "30m" COUCHBASE_BUCKET: "authorizer" COUCHBASE_BUCKET_RAM_QUOTA: "1000" COUCHBASE_SCOPE: "_default" tty: true restart: "always" depends_on: server-postgre-sql: condition: "service_healthy" server-redis: condition: "service_healthy"

--

## My telegram message #286385
**Time:** 28.02.2024 00:14:36 UTC+05:00
**Link:** https://t.me/nest_ru/286385

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- недавно такая бодяга была, правда на 18 ноде, откатился до 18.18.2 и всё ок
- server-authorizer: image: "lakhansamani/authorizer:1.3.8" container_name: "server-authorizer" ports: - "8000:8080" networks: - "server-network" environment: REDIS_URL: "redis://:cgSOXCMczzNFkxAmDJAsoujJYpoMDuTT@server-redis:6379" DATABASE_URL: "postgres://Yk42KA4sOb:B7Ep2MwlRR6fAx0frXGWVTGP850qAxM6@server-postgre-sql:5432/authorizer" ADMIN_SECRET: "VfKSfPPljhHBXCEohnitursmgDxfAyiD" DATABASE_TYPE: "postgres" DATABASE_NAME: "authorizer" FEATURE_NAME: "authorizer" ORGANIZATION_NAME: "Station of bots" DEPENDS_ON_SERVICE_NAMES: "[object Object]" IMAGE: "lakhansamani/authorizer:1.3.8" EXTERNAL_CLIENT_PORT: "8000" ENV: "production" PORT: "8080" COOKIE_NAME: "authorizer" RESET_PASSWORD_URL: "/reset-password" DISABLE_PLAYGROUND: "true" ROLES: "user,admin" DEFAULT_ROLES: "user" JWT_ROLE_CLAIM: "role" ORGANIZATION_LOGO: "Authorizer Logo" ACCESS_TOKEN_EXPIRY_TIME: "30m" COUCHBASE_BUCKET: "authorizer" COUCHBASE_BUCKET_RAM_QUOTA: "1000" COUCHBASE_SCOPE: "_default" tty: true restart: "always" depends_on: server-postgre-sql: condition: "service_healthy" server-redis: condition: "service_healthy"
- а то есть мне надо перейти на node 18?
- спасибо, но где ты это взял?

Main message:
из дев режима пет проекта

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

из дев режима пет проекта

--

## My telegram message #286390
**Time:** 28.02.2024 00:29:59 UTC+05:00
**Link:** https://t.me/nest_ru/286390

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это же  sensitive data )))

Main message:
это дев я генерю их все время похер так что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это дев я генерю их все время похер так что

--

## My telegram message #286457
**Time:** 28.02.2024 13:26:24 UTC+05:00
**Link:** https://t.me/nest_ru/286457

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как быстро и эффективно доказать коллегам, что так делать не нужно?))

Main message:
https://t.me/nest_ru/183139

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/183139

--

## My telegram message #286461
**Time:** 28.02.2024 13:28:47 UTC+05:00
**Link:** https://t.me/nest_ru/286461

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Ну нужные тебе модули в рамках интеграционного теста собираешь и чекаешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну нужные тебе модули в рамках интеграционного теста собираешь и чекаешь

--

## My telegram message #286464
**Time:** 28.02.2024 13:29:15 UTC+05:00
**Link:** https://t.me/nest_ru/286464

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- всё остальное, что написано у вас в коде - это сделали вы сами, а не нест
- Про тесты только Ильшат думает, но он прав. Подменить СУБД так проще.
- Ну нужные тебе модули в рамках интеграционного теста собираешь и чекаешь
- я понимаю что такое запустить отдельный тест, но поднять часть приложения? Тип сбилдить ioc с определенными модулями?

Main message:
Часть приложения это я пишу про интеграционный тест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Часть приложения это я пишу про интеграционный тест

--

## My telegram message #286466
**Time:** 28.02.2024 13:29:35 UTC+05:00
**Link:** https://t.me/nest_ru/286466

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну нужные тебе модули в рамках интеграционного теста собираешь и чекаешь
- я понимаю что такое запустить отдельный тест, но поднять часть приложения? Тип сбилдить ioc с определенными модулями?
- Часть приложения это я пишу про интеграционный тест
- Я уже понял)

Main message:
Е2е я называю поднять всю аппу и чекать с аксиоса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Е2е я называю поднять всю аппу и чекать с аксиоса

--

## My telegram message #286474
**Time:** 28.02.2024 14:11:51 UTC+05:00
**Link:** https://t.me/nest_ru/286474

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет бекеры! У меня вчера был собес на стажера (фронта...). Мне задали вопросы про CORS, мол зачем он нужен. Ну я ответил, чтобы ограничивать доменов, который могут стучаться на бекенд. Мне ответили что это нет так. Рассудите, интервьюер прав или нет?

Main message:
ну контора такая, че тут еще сказать, им же нужно как то понять твои скилы, таких как ты в очереди 2милиона стоит) просто ищи дальше) я вечно заваливаю собесы где технические вопросы спрашивают) для типовых штук уже есть готовые инструменты, а то что нам не известно можно легко погуглить и написать тестик чтобы лучше понять как работает а для того чтобы в тренде быть, нужно видосы смотреть всяких конф там можно услышать новые слова

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну контора такая, че тут еще сказать, им же нужно как то понять твои скилы, таких как ты в очереди 2милиона стоит) просто ищи дальше) я вечно заваливаю собесы где технические вопросы спрашивают) для типовых штук уже есть готовые инструменты, а то что нам не известно можно легко погуглить и написать тестик чтобы лучше понять как работает а для того чтобы в тренде быть, нужно видосы смотреть всяких конф там можно услышать новые слова

--

## My telegram message #286481
**Time:** 28.02.2024 14:16:36 UTC+05:00
**Link:** https://t.me/nest_ru/286481

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну так кто прав, я или разраб который меня собесил?

Main message:
оба правы, он ищет того кто как он, ты ищешь такое место где такие как ты если долго искать то можно найти

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оба правы, он ищет того кто как он, ты ищешь такое место где такие как ты если долго искать то можно найти

--

## My telegram message #286484
**Time:** 28.02.2024 14:19:35 UTC+05:00
**Link:** https://t.me/nest_ru/286484

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну так кто прав, я или разраб который меня собесил?

Main message:
я бы вот так ответил: корс это политики проверки доступа на некий домен и я бы не прошел тудаже, это же не означает что я херовый спец, я знаю какой я спец и мне этого достаточно, не прошел туда пошел в дургое место стучать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я бы вот так ответил: корс это политики проверки доступа на некий домен и я бы не прошел тудаже, это же не означает что я херовый спец, я знаю какой я спец и мне этого достаточно, не прошел туда пошел в дургое место стучать

--

## My telegram message #286487
**Time:** 28.02.2024 14:24:06 UTC+05:00
**Link:** https://t.me/nest_ru/286487

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Верно говоришь. Просто первоначально я интересовался верностью своего ответа. Ну и хотел бы рил понять, это такие ща требования, знать многое вне фронта...?

Main message:
везде все по разному, кто то требует знание sql при наборе на фронт, а по требованиям есть же всякие доки с списком че нужно знать, можно по нему пройтись

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

везде все по разному, кто то требует знание sql при наборе на фронт, а по требованиям есть же всякие доки с списком че нужно знать, можно по нему пройтись

--

## My telegram message #286490
**Time:** 28.02.2024 14:29:05 UTC+05:00
**Link:** https://t.me/nest_ru/286490

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я бы вот так ответил: корс это политики проверки доступа на некий домен и я бы не прошел тудаже, это же не означает что я херовый спец, я знаю какой я спец и мне этого достаточно, не прошел туда пошел в дургое место стучать
- Верно говоришь. Просто первоначально я интересовался верностью своего ответа. Ну и хотел бы рил понять, это такие ща требования, знать многое вне фронта...?
- везде все по разному, кто то требует знание sql при наборе на фронт, а по требованиям есть же всякие доки с списком че нужно знать, можно по нему пройтись
- ангуляр ок но почему шарп или джава?

Main message:
Или

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Или

--

## My telegram message #286497
**Time:** 28.02.2024 14:32:08 UTC+05:00
**Link:** https://t.me/nest_ru/286497

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Чтобы был опыт с норм бэкендом)))
- Супер идентичные инструменты
- ++
- нестеры не тру бэкендеры?

Main message:
Весело когда народ с реакт приходит в нест и читает книги про проекты на джава и их подходы, тоесть боевой опыт мыслей сформировал реакт и он пытается по паттернам Бэка это всё посадить на нест, и проект например у него с нуля)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Весело когда народ с реакт приходит в нест и читает книги про проекты на джава и их подходы, тоесть боевой опыт мыслей сформировал реакт и он пытается по паттернам Бэка это всё посадить на нест, и проект например у него с нуля)

--

## My telegram message #286501
**Time:** 28.02.2024 14:33:42 UTC+05:00
**Link:** https://t.me/nest_ru/286501

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Ну такой проект отличается от проекта который бы написал бэк с опытом боя на шарпе или джава

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну такой проект отличается от проекта который бы написал бэк с опытом боя на шарпе или джава

--

## My telegram message #286604
**Time:** 29.02.2024 21:32:04 UTC+05:00
**Link:** https://t.me/nest_ru/286604

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, подскажите пожалуйста по следующему вопросу - необходимо регистрировать пользователя, но загвоздка в том, что есть некий профиль, который регистрируется на все системы компании (можно провести аналогию с входом через гугл), но вот только помимо создание этого самого профиля мне необходимо в том же самом запросе создавать новую сущность агента или упарвляющего, соответсвенно у них разный набор полей. как это лучше сделать? есть вариант, чтобы фронт прокидывал а кого в общем-то мы хотим создать, но тогда все равно остается вопрос проверки нужного набора полей для создания той или иной сущности

Main message:
https://github.com/typestack/class-transformer?tab=readme-ov-file#providing-more-than-one-type-option

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/typestack/class-transformer?tab=readme-ov-file#providing-more-than-one-type-option

--

## My telegram message #286619
**Time:** 29.02.2024 23:18:10 UTC+05:00
**Link:** https://t.me/nest_ru/286619

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Может кто поделится опытом со swagger, как лучше всего его интегрировать? В самом коде описывать, тли через yaml фаилы?
- через nestjs-swagger он формируется автоматически
- В каком смысле автоматически?
- в прямом, вытягивается из описания dto и списка контроллеров

Main message:
без свагера ваще не круто делать, через свагер спеку клиент генерит себе клиента для работы с бэком, и он всегда актуальный, без сваггер рукописные запросы же, которые разьедутся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

без свагера ваще не круто делать, через свагер спеку клиент генерит себе клиента для работы с бэком, и он всегда актуальный, без сваггер рукописные запросы же, которые разьедутся

--

## My telegram message #286622
**Time:** 29.02.2024 23:20:02 UTC+05:00
**Link:** https://t.me/nest_ru/286622

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В каком смысле автоматически?
- в прямом, вытягивается из описания dto и списка контроллеров
- без свагера ваще не круто делать, через свагер спеку клиент генерит себе клиента для работы с бэком, и он всегда актуальный, без сваггер рукописные запросы же, которые разьедутся
- Видел вакансии где писали что без OpenApi)) почему-то

Main message:
ну бардак там значит и контора в какой то момент развалится)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну бардак там значит и контора в какой то момент развалится)

--

## My telegram message #286624
**Time:** 29.02.2024 23:33:55 UTC+05:00
**Link:** https://t.me/nest_ru/286624

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- без свагера ваще не круто делать, через свагер спеку клиент генерит себе клиента для работы с бэком, и он всегда актуальный, без сваггер рукописные запросы же, которые разьедутся
- Видел вакансии где писали что без OpenApi)) почему-то
- ну бардак там значит и контора в какой то момент развалится)
- По вебсокетам есть подобное?

Main message:
чет видел

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чет видел

--

## My telegram message #286629
**Time:** 29.02.2024 23:37:02 UTC+05:00
**Link:** https://t.me/nest_ru/286629

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
import { WorkspaceSdk, Subscription } from '@workspace/sdk'; import { tap } from 'rxjs'; import { setTimeout } from 'timers/promises'; import { fetch } from 'undici'; import * as WebSocket from 'ws'; describe('Тестирование транспорта graphql и основных типов данных которые ходят через транспорт (e2e)', () => { jest.setTimeout(60 * 1000); let workspaceCmdSdk: WorkspaceSdk; beforeAll(() => { const host = process.env.SERVER_HOST ?? 'localhost'; const port = process.env.SERVER_PORT ?? '3000'; workspaceCmdSdk = new WorkspaceSdk({ url: `http://${host}:${port}/graphql`, fetch, wsOptions: { webSocketImpl: WebSocket }, }); }); it('Проверка работы Query', async () => { const statusResult = await workspaceCmdSdk.asyncQuery({ status: { __scalar: true }, }); expect(statusResult.status.status).toEqual('ok'); }); it('Проверка работы Subscription', async () => { const datetimes: { server: Date; client: Date }[] = []; const changeCurrentDateTimeRef = workspaceCmdSdk .subscribe<Subscription['ChangeCurrentDateTime']>({ ChangeCurrentDateTime: { __scalar: true }, }) .pipe( tap((result) => datetimes.push({ server: new Date(result.datetime), client: new Date(), }) ) ) .subscribe(); await setTimeout(9000); changeCurrentDateTimeRef.unsubscribe(); expect(datetimes.filter((d) => d.client >= d.server)).toHaveLength( datetimes.length ); expect( datetimes.filter( (v) => v.server instanceof Date && !isNaN(v.server.getTime()) ) ).toHaveLength(datetimes.length); expect( datetimes.filter((d) => d.client >= d.server).length ).toBeGreaterThanOrEqual(2); }); });

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

import { WorkspaceSdk, Subscription } from '@workspace/sdk'; import { tap } from 'rxjs'; import { setTimeout } from 'timers/promises'; import { fetch } from 'undici'; import * as WebSocket from 'ws'; describe('Тестирование транспорта graphql и основных типов данных которые ходят через транспорт (e2e)', () => { jest.setTimeout(60 * 1000); let workspaceCmdSdk: WorkspaceSdk; beforeAll(() => { const host = process.env.SERVER_HOST ?? 'localhost'; const port = process.env.SERVER_PORT ?? '3000'; workspaceCmdSdk = new WorkspaceSdk({ url: `http://${host}:${port}/graphql`, fetch, wsOptions: { webSocketImpl: WebSocket }, }); }); it('Проверка работы Query', async () => { const statusResult = await workspaceCmdSdk.asyncQuery({ status: { __scalar: true }, }); expect(statusResult.status.status).toEqual('ok'); }); it('Проверка работы Subscription', async () => { const datetimes: { server: Date; client: Date }[] = []; const changeCurrentDateTimeRef = workspaceCmdSdk .subscribe<Subscription['ChangeCurrentDateTime']>({ ChangeCurrentDateTime: { __scalar: true }, }) .pipe( tap((result) => datetimes.push({ server: new Date(result.datetime), client: new Date(), }) ) ) .subscribe(); await setTimeout(9000); changeCurrentDateTimeRef.unsubscribe(); expect(datetimes.filter((d) => d.client >= d.server)).toHaveLength( datetimes.length ); expect( datetimes.filter( (v) => v.server instanceof Date && !isNaN(v.server.getTime()) ) ).toHaveLength(datetimes.length); expect( datetimes.filter((d) => d.client >= d.server).length ).toBeGreaterThanOrEqual(2); }); });

--

## My telegram message #286634
**Time:** 29.02.2024 23:40:35 UTC+05:00
**Link:** https://t.me/nest_ru/286634

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- import { WorkspaceSdk, Subscription } from '@workspace/sdk'; import { tap } from 'rxjs'; import { setTimeout } from 'timers/promises'; import { fetch } from 'undici'; import * as WebSocket from 'ws'; describe('Тестирование транспорта graphql и основных типов данных которые ходят через транспорт (e2e)', () => { jest.setTimeout(60 * 1000); let workspaceCmdSdk: WorkspaceSdk; beforeAll(() => { const host = process.env.SERVER_HOST ?? 'localhost'; const port = process.env.SERVER_PORT ?? '3000'; workspaceCmdSdk = new WorkspaceSdk({ url: `http://${host}:${port}/graphql`, fetch, wsOptions: { webSocketImpl: WebSocket }, }); }); it('Проверка работы Query', async () => { const statusResult = await workspaceCmdSdk.asyncQuery({ status: { __scalar: true }, }); expect(statusResult.status.status).toEqual('ok'); }); it('Проверка работы Subscription', async () => { const datetimes: { server: Date; client: Date }[] = []; const changeCurrentDateTimeRef = workspaceCmdSdk .subscribe<Subscription['ChangeCurrentDateTime']>({ ChangeCurrentDateTime: { __scalar: true }, }) .pipe( tap((result) => datetimes.push({ server: new Date(result.datetime), client: new Date(), }) ) ) .subscribe(); await setTimeout(9000); changeCurrentDateTimeRef.unsubscribe(); expect(datetimes.filter((d) => d.client >= d.server)).toHaveLength( datetimes.length ); expect( datetimes.filter( (v) => v.server instanceof Date && !isNaN(v.server.getTime()) ) ).toHaveLength(datetimes.length); expect( datetimes.filter((d) => d.client >= d.server).length ).toBeGreaterThanOrEqual(2); }); });

Main message:
вот код че чекаю, может кому надо, в догонку  import { GraphQLISODateTime } from '@nestjs/graphql'; import { OnModuleDestroy } from '@nestjs/common'; import { Field, ObjectType, Query, Resolver, Subscription, } from '@nestjs/graphql'; import { PubSub } from 'graphql-subscriptions'; import { interval, map, tap } from 'rxjs'; @ObjectType() export class Status { @Field() status!: string; } @ObjectType() export class CurrentDateTime { @Field(() => GraphQLISODateTime) datetime!: Date; } const CHANGE_CURRENT_DATETIME = 'ChangeCurrentDateTime'; @Resolver() export class AppResolver extends PubSub implements OnModuleDestroy { currentDateTimeSubscriptionRef = interval(3000) .pipe( map(() => ({ datetime: new Date() } as CurrentDateTime)), tap((date) => this.publish(CHANGE_CURRENT_DATETIME, date)) ) .subscribe(); onModuleDestroy() { this.currentDateTimeSubscriptionRef.unsubscribe(); } @Query(() => Status) status() { return { status: 'ok' }; } @Subscription(() => CurrentDateTime, { name: CHANGE_CURRENT_DATETIME, nullable: true, resolve: (payload: CurrentDateTime) => { return payload; }, }) [CHANGE_CURRENT_DATETIME]() { return this.asyncIterator(CHANGE_CURRENT_DATETIME); } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот код че чекаю, может кому надо, в догонку  import { GraphQLISODateTime } from '@nestjs/graphql'; import { OnModuleDestroy } from '@nestjs/common'; import { Field, ObjectType, Query, Resolver, Subscription, } from '@nestjs/graphql'; import { PubSub } from 'graphql-subscriptions'; import { interval, map, tap } from 'rxjs'; @ObjectType() export class Status { @Field() status!: string; } @ObjectType() export class CurrentDateTime { @Field(() => GraphQLISODateTime) datetime!: Date; } const CHANGE_CURRENT_DATETIME = 'ChangeCurrentDateTime'; @Resolver() export class AppResolver extends PubSub implements OnModuleDestroy { currentDateTimeSubscriptionRef = interval(3000) .pipe( map(() => ({ datetime: new Date() } as CurrentDateTime)), tap((date) => this.publish(CHANGE_CURRENT_DATETIME, date)) ) .subscribe(); onModuleDestroy() { this.currentDateTimeSubscriptionRef.unsubscribe(); } @Query(() => Status) status() { return { status: 'ok' }; } @Subscription(() => CurrentDateTime, { name: CHANGE_CURRENT_DATETIME, nullable: true, resolve: (payload: CurrentDateTime) => { return payload; }, }) [CHANGE_CURRENT_DATETIME]() { return this.asyncIterator(CHANGE_CURRENT_DATETIME); } }

--

