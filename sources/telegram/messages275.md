## My telegram message #306347
**Time:** 09.07.2024 11:20:05 UTC+05:00
**Link:** https://t.me/nest_ru/306347

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребят, подскажите новичку)). Так, все таки ОРМ это зло или нет? Понятное дело, что от задач зависит. Как вообще относитесь к Тимуру Шамсутдинову? Он против ОРМ

Main message:
В raw можно допустить ошибку и никто не ругнется, только при запуске метода в рантайм словишь могут поля в БД поменяться и ты не найдешь быстро где ещё что нужно подправить, так как нет типизации, нужно искать строки Я за ОРМ в крудах всех, а там где нужно под запрос или некие агрегации типа сумм или оконные функции - raw Орм ускоряет разработку в несколько раз, и багов меньше так как типизирванно все Когда софт уже написан можно находить тормозные места писать на них тесты и переделывать на raw Любой raw должен иметь тест, так как он не защищён типизацией Квери билдеры это уже на любителя, в целом я против них и за raw+тесты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В raw можно допустить ошибку и никто не ругнется, только при запуске метода в рантайм словишь могут поля в БД поменяться и ты не найдешь быстро где ещё что нужно подправить, так как нет типизации, нужно искать строки Я за ОРМ в крудах всех, а там где нужно под запрос или некие агрегации типа сумм или оконные функции - raw Орм ускоряет разработку в несколько раз, и багов меньше так как типизирванно все Когда софт уже написан можно находить тормозные места писать на них тесты и переделывать на raw Любой raw должен иметь тест, так как он не защищён типизацией Квери билдеры это уже на любителя, в целом я против них и за raw+тесты

--

## My telegram message #306353
**Time:** 09.07.2024 11:49:05 UTC+05:00
**Link:** https://t.me/nest_ru/306353

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всём добрый день. Подскажите как правильно сделать. Есть авторизацонный сервис общий с базой юзеров. Когда заходишь на сайт какой-нибудь другой(назовем сайт_1), то он делает fetch/me и если пользователь не авторизован, то с сайта_1 редиректит на сайт авторизация, передавая в query callbackUrl, где пользователю нужно войти/зарегаться. Но понадобилось мне на одном из сайтов добавлять юзерам кастомные роли, котоыре нужны только для этого сайта и мне не совсем понятно как это грамотно сделать. Стучаться на бэк определенного сайта и на бэк авторизационый кажется странной идеей. Подскажите пожалуйста что почитать по этой теме, может есть примеры. спасибо

Main message:
Это только начало, дальше возможно будет еще больше какстома, можно сейчас подумать о написании собственного ссо, как решение можно в сайт1 бэке добавить таблицу роли_юзеров, и гард который после сверки токена добавит в реквест еще и роль для юзера из токена, круд для привязки нужно будет в бэке сайт1 сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это только начало, дальше возможно будет еще больше какстома, можно сейчас подумать о написании собственного ссо, как решение можно в сайт1 бэке добавить таблицу роли_юзеров, и гард который после сверки токена добавит в реквест еще и роль для юзера из токена, круд для привязки нужно будет в бэке сайт1 сделать

--

## My telegram message #306356
**Time:** 09.07.2024 12:31:52 UTC+05:00
**Link:** https://t.me/nest_ru/306356

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всём добрый день. Подскажите как правильно сделать. Есть авторизацонный сервис общий с базой юзеров. Когда заходишь на сайт какой-нибудь другой(назовем сайт_1), то он делает fetch/me и если пользователь не авторизован, то с сайта_1 редиректит на сайт авторизация, передавая в query callbackUrl, где пользователю нужно войти/зарегаться. Но понадобилось мне на одном из сайтов добавлять юзерам кастомные роли, котоыре нужны только для этого сайта и мне не совсем понятно как это грамотно сделать. Стучаться на бэк определенного сайта и на бэк авторизационый кажется странной идеей. Подскажите пожалуйста что почитать по этой теме, может есть примеры. спасибо
- Это только начало, дальше возможно будет еще больше какстома, можно сейчас подумать о написании собственного ссо, как решение можно в сайт1 бэке добавить таблицу роли_юзеров, и гард который после сверки токена добавит в реквест еще и роль для юзера из токена, круд для привязки нужно будет в бэке сайт1 сделать
- Хммм, спасибо!
- Для этого нужно писать в phpstorm, а так запросы к бд вынес в отдельную репозиторию(класс) и всё

Main message:
А в сиай как проверять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А в сиай как проверять

--

## My telegram message #306361
**Time:** 09.07.2024 13:33:29 UTC+05:00
**Link:** https://t.me/nest_ru/306361

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Парни, привет. У кого-то есть опыт валидации протобафа?

Main message:
Тип того  https://stackoverflow.com/questions/72473029/nestjs-grpc-request-parameters-validation

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тип того  https://stackoverflow.com/questions/72473029/nestjs-grpc-request-parameters-validation

--

## My telegram message #306382
**Time:** 09.07.2024 20:49:31 UTC+05:00
**Link:** https://t.me/nest_ru/306382

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- всем привет, пытаюсь через typeorm посчитать количество relations с условием. почему-то условие игнорируется (unseenMessagesCount никогда не равен нулю, хотя должен быть, потому что message.seenBy ТОЧНО содержит caller'a). что делать?
- Смотреть генерируемый запрос.
- там вообще никаких намёков на message нет
- привет всем, подскажите плиз что не так я делаю?  app.module.ts  ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, }), CacheModule.registerAsync({ isGlobal: true, useFactory: (config: ConfigService) => ({ store: redisStore, url: config.get<string>('REDIS_URL'), }), inject: [ConfigService], }), и внутри проекта в guard использую  @Inject(CACHE_MANAGER) private cacheManager: Cache получаю такую ошибку

Main message:
гард не сувал в провайдеры нигде?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

гард не сувал в провайдеры нигде?

--

## My telegram message #306447
**Time:** 10.07.2024 18:31:44 UTC+05:00
**Link:** https://t.me/nest_ru/306447

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- помогите пожалуйста(

Main message:
там можно вернуть sql который создает орм, его изучи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там можно вернуть sql который создает орм, его изучи

--

## My telegram message #306454
**Time:** 10.07.2024 18:42:17 UTC+05:00
**Link:** https://t.me/nest_ru/306454

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 8
- помогите пожалуйста(
- там можно вернуть sql который создает орм, его изучи
- https://gist.github.com/ilyadreamix25/20af6b0df684b1ba65be9878e50e385a

Main message:
SELECT "message"."taskId" AS "parentId", sum(CASE WHEN "message_messageSeenBy"."messageEntityId" is not NULL THEN 1 ELSE 0 END) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" LEFT JOIN "user_entity" "messageSeenBy" ON "messageSeenBy"."id"="message_messageSeenBy"."userEntityId" WHERE "messageSeenBy"."id" IS NULL OR "messageSeenBy"."id" != $1 GROUP BY "message"."taskId"

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

SELECT "message"."taskId" AS "parentId", sum(CASE WHEN "message_messageSeenBy"."messageEntityId" is not NULL THEN 1 ELSE 0 END) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" LEFT JOIN "user_entity" "messageSeenBy" ON "messageSeenBy"."id"="message_messageSeenBy"."userEntityId" WHERE "messageSeenBy"."id" IS NULL OR "messageSeenBy"."id" != $1 GROUP BY "message"."taskId"

--

## My telegram message #306458
**Time:** 10.07.2024 18:45:26 UTC+05:00
**Link:** https://t.me/nest_ru/306458

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там можно вернуть sql который создает орм, его изучи
- https://gist.github.com/ilyadreamix25/20af6b0df684b1ba65be9878e50e385a
- SELECT "message"."taskId" AS "parentId", sum(CASE WHEN "message_messageSeenBy"."messageEntityId" is not NULL THEN 1 ELSE 0 END) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" LEFT JOIN "user_entity" "messageSeenBy" ON "messageSeenBy"."id"="message_messageSeenBy"."userEntityId" WHERE "messageSeenBy"."id" IS NULL OR "messageSeenBy"."id" != $1 GROUP BY "message"."taskId"
- нет, то же самое

Main message:
у тебя where должно быть в первом лефте я так понял

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя where должно быть в первом лефте я так понял

--

## My telegram message #306461
**Time:** 10.07.2024 18:47:40 UTC+05:00
**Link:** https://t.me/nest_ru/306461

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- SELECT "message"."taskId" AS "parentId", sum(CASE WHEN "message_messageSeenBy"."messageEntityId" is not NULL THEN 1 ELSE 0 END) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" LEFT JOIN "user_entity" "messageSeenBy" ON "messageSeenBy"."id"="message_messageSeenBy"."userEntityId" WHERE "messageSeenBy"."id" IS NULL OR "messageSeenBy"."id" != $1 GROUP BY "message"."taskId"
- нет, то же самое
- у тебя where должно быть в первом лефте я так понял
- он у меня всего один

Main message:
забей ты на орм, сперва в скл получи что хочешь, я не знаю какие там данные и какие структуры, на твоем месте я бы просто сидел и так сяк пробовал написать запрос

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

забей ты на орм, сперва в скл получи что хочешь, я не знаю какие там данные и какие структуры, на твоем месте я бы просто сидел и так сяк пробовал написать запрос

--

## My telegram message #306467
**Time:** 10.07.2024 19:02:51 UTC+05:00
**Link:** https://t.me/nest_ru/306467

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- он у меня всего один
- забей ты на орм, сперва в скл получи что хочешь, я не знаю какие там данные и какие структуры, на твоем месте я бы просто сидел и так сяк пробовал написать запрос
- И с помощью llm в том числе 😁
- я не понимаю что не так с моим запросом

Main message:
SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" LEFT JOIN "user_entity" "messageSeenBy" ON "messageSeenBy"."id"="message_messageSeenBy"."userEntityId" WHERE "messageSeenBy"."id" IS NULL OR "messageSeenBy"."id" != $1 GROUP BY "message"."taskId"

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" LEFT JOIN "user_entity" "messageSeenBy" ON "messageSeenBy"."id"="message_messageSeenBy"."userEntityId" WHERE "messageSeenBy"."id" IS NULL OR "messageSeenBy"."id" != $1 GROUP BY "message"."taskId"

--

## My telegram message #306471
**Time:** 10.07.2024 19:04:11 UTC+05:00
**Link:** https://t.me/nest_ru/306471

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я не понимаю что не так с моим запросом
- SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" LEFT JOIN "user_entity" "messageSeenBy" ON "messageSeenBy"."id"="message_messageSeenBy"."userEntityId" WHERE "messageSeenBy"."id" IS NULL OR "messageSeenBy"."id" != $1 GROUP BY "message"."taskId"
- Значит проблема в данных. Отдай запрос, данные в виде insert into и твою проблему ChatGPT.
- это тот запрос, который сейчас имеется

Main message:
ага, ты выводишь колво сообщений в нем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, ты выводишь колво сообщений в нем

--

## My telegram message #306473
**Time:** 10.07.2024 19:04:50 UTC+05:00
**Link:** https://t.me/nest_ru/306473

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Значит проблема в данных. Отдай запрос, данные в виде insert into и твою проблему ChatGPT.
- это тот запрос, который сейчас имеется
- ага, ты выводишь колво сообщений в нем
- возвращается количество всех сообщений в чате, а не только непрочитанных, в этом проблема

Main message:
ну да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну да

--

## My telegram message #306478
**Time:** 10.07.2024 19:06:33 UTC+05:00
**Link:** https://t.me/nest_ru/306478

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ага, ты выводишь колво сообщений в нем
- возвращается количество всех сообщений в чате, а не только непрочитанных, в этом проблема
- ну да
- что

Main message:
message_entity_seen_by_user_entity что тут лежит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

message_entity_seen_by_user_entity что тут лежит

--

## My telegram message #306480
**Time:** 10.07.2024 19:07:38 UTC+05:00
**Link:** https://t.me/nest_ru/306480

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну да
- что
- message_entity_seen_by_user_entity что тут лежит
- табличка с ID сообщений и пользователей которые его прочитали

Main message:
INER JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id"

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

INER JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id"

--

## My telegram message #306483
**Time:** 10.07.2024 19:09:09 UTC+05:00
**Link:** https://t.me/nest_ru/306483

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- message_entity_seen_by_user_entity что тут лежит
- табличка с ID сообщений и пользователей которые его прочитали
- INER JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id"
- то же самое

Main message:
убери строку с user_entity

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

убери строку с user_entity

--

## My telegram message #306486
**Time:** 10.07.2024 19:10:31 UTC+05:00
**Link:** https://t.me/nest_ru/306486

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- INER JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id"
- то же самое
- убери строку с user_entity
- а messageSeenBy откуда получать?

Main message:
убери из условия

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

убери из условия

--

## My telegram message #306490
**Time:** 10.07.2024 19:12:13 UTC+05:00
**Link:** https://t.me/nest_ru/306490

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Воувоу. Какой inner join, когда надо показывать не прочитанные.

Main message:
сперва бы показать те которые прочитаны

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сперва бы показать те которые прочитаны

--

## My telegram message #306492
**Time:** 10.07.2024 19:12:40 UTC+05:00
**Link:** https://t.me/nest_ru/306492

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- теперь возвращается количество всех записей в message_entity_seen_by_user_entity

Main message:
почему стало в два раза больше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

почему стало в два раза больше

--

## My telegram message #306495
**Time:** 10.07.2024 19:16:10 UTC+05:00
**Link:** https://t.me/nest_ru/306495

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сперва бы показать те которые прочитаны
- тогда вместо != нужно сделать =
- почему стало в два раза больше
- получается правильное число

Main message:
SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" GROUP BY "message"."taskId" этот запрос вернет те которые прочитали?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" GROUP BY "message"."taskId" этот запрос вернет те которые прочитали?

--

## My telegram message #306497
**Time:** 10.07.2024 19:17:01 UTC+05:00
**Link:** https://t.me/nest_ru/306497

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- почему стало в два раза больше
- получается правильное число
- SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" GROUP BY "message"."taskId" этот запрос вернет те которые прочитали?
- да, умноженное на два

Main message:
а тебе что нужно?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а тебе что нужно?

--

## My telegram message #306500
**Time:** 10.07.2024 19:23:37 UTC+05:00
**Link:** https://t.me/nest_ru/306500

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId"="message"."id" GROUP BY "message"."taskId" этот запрос вернет те которые прочитали?
- да, умноженное на два
- а тебе что нужно?
- https://gist.github.com/ilyadreamix25/cd530e1290cd8399a31fbb0ad59fa5e0 с горем пополам написал это, делает то, что надо, возвращает количество непрочитанных сообщений для пользователя $1

Main message:
SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" WHERE message."taskId" NOT IN ( SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId" = "message"."id" HAVING cnt > 1 GROUP BY "message"."taskId") GROUP BY "message"."taskId"

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" WHERE message."taskId" NOT IN ( SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId" = "message"."id" HAVING cnt > 1 GROUP BY "message"."taskId") GROUP BY "message"."taskId"

--

## My telegram message #306503
**Time:** 10.07.2024 19:24:52 UTC+05:00
**Link:** https://t.me/nest_ru/306503

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" WHERE message."taskId" NOT IN ( SELECT "message"."taskId" AS "parentId", COUNT(*) AS "cnt" FROM "message_entity" "message" LEFT JOIN "message_entity_seen_by_user_entity" "message_messageSeenBy" ON "message_messageSeenBy"."messageEntityId" = "message"."id" HAVING cnt > 1 GROUP BY "message"."taskId") GROUP BY "message"."taskId"

Main message:
а не, херня так не выйдет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а не, херня так не выйдет)

--

## My telegram message #306761
**Time:** 12.07.2024 19:36:28 UTC+05:00
**Link:** https://t.me/nest_ru/306761

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- есть какой то список идей для api?

Main message:
сервер авторизации с фронтом сразу и чтобы опен сорс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сервер авторизации с фронтом сразу и чтобы опен сорс

--

## My telegram message #306763
**Time:** 12.07.2024 19:37:15 UTC+05:00
**Link:** https://t.me/nest_ru/306763

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- проблема оказалась в том, что везде нужно было CacheModule.register(), у меня это было в главном модуле, в остальных просто CacheModule
- есть какой то список идей для api?
- сервер авторизации с фронтом сразу и чтобы опен сорс
- может еще ченить

Main message:
клон вот этого хочу  https://authorizer.dev/ только на несте, фронт прям их можно взять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

клон вот этого хочу  https://authorizer.dev/ только на несте, фронт прям их можно взять

--

## My telegram message #307078
**Time:** 15.07.2024 15:13:10 UTC+05:00
**Link:** https://t.me/nest_ru/307078

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- export const BlazeErrorHandler = (exception: HttpException) => { let errorCode = 500; let errorMessageCode = 4008; if(exception instanceof ModelNotFoundError) { console.log('Сюда исключение не попадает') } if (exception instanceof SignatureInvalidError) { console.log('Здесь все отрабаывает корректно') errorCode = 401; errorMessageCode = 4004; } const errorMessage = { message: errorMessageCode, code: BlazeErrorMessages[errorMessageCode], }; return { errorCode, errorMessage, }; }; Всем привет, кто-то сталкивался с таким поведением instanceof, когда он не отлавливает ошибку, хотя она является правильной? У меня в функции есть два if. Тот, который проверяет SignatureInvalid, отрабатывает правильно, а тот, что проверяет ModelNotFound, нет. Хотя и та, и другая ошибки являются подклассами HttpException из Nest.js с той лиш разницей, что SignatureInvalid расширяется от BadRequestException ( что тоже является подклассом HttpException ), а ModelNotFound расширяется NotFoundчто-то там (что тоже является подклассом HttpException ) Я где-то вычитал? что это может быть связано с ошибками конкретно тайпскрипта версий es5 и es3, но у меня в проекте стоят другие версии. Пробовал даже при создании класса ModelNotFound в конструктор передать  Object.setPrototypeOf(this, ModelNotFound.prototype )

Main message:
Покажи сам фильтр и что ты ловишь в catch

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Покажи сам фильтр и что ты ловишь в catch

--

## My telegram message #307082
**Time:** 15.07.2024 15:25:53 UTC+05:00
**Link:** https://t.me/nest_ru/307082

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Напишите через querybuilder
- export const BlazeErrorHandler = (exception: HttpException) => { let errorCode = 500; let errorMessageCode = 4008; if(exception instanceof ModelNotFoundError) { console.log('Сюда исключение не попадает') } if (exception instanceof SignatureInvalidError) { console.log('Здесь все отрабаывает корректно') errorCode = 401; errorMessageCode = 4004; } const errorMessage = { message: errorMessageCode, code: BlazeErrorMessages[errorMessageCode], }; return { errorCode, errorMessage, }; }; Всем привет, кто-то сталкивался с таким поведением instanceof, когда он не отлавливает ошибку, хотя она является правильной? У меня в функции есть два if. Тот, который проверяет SignatureInvalid, отрабатывает правильно, а тот, что проверяет ModelNotFound, нет. Хотя и та, и другая ошибки являются подклассами HttpException из Nest.js с той лиш разницей, что SignatureInvalid расширяется от BadRequestException ( что тоже является подклассом HttpException ), а ModelNotFound расширяется NotFoundчто-то там (что тоже является подклассом HttpException ) Я где-то вычитал? что это может быть связано с ошибками конкретно тайпскрипта версий es5 и es3, но у меня в проекте стоят другие версии. Пробовал даже при создании класса ModelNotFound в конструктор передать  Object.setPrototypeOf(this, ModelNotFound.prototype )
- Покажи сам фильтр и что ты ловишь в catch
- Флоу следующий: ошибка попадает в catch абстрактного гарда ( первый скрин ), и уже после ее перехватывает глобальный catch ( второй скрин ) где передает exception в функцию обработчик ( на примере можно увидеть v13ErrorHandler, мой обработчик работает по такому же принципу, просто принимает exception )

Main message:
Попробуй проверят не по хттп експешен, а тот который ты реально используешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Попробуй проверят не по хттп експешен, а тот который ты реально используешь

--

## My telegram message #307085
**Time:** 15.07.2024 15:27:10 UTC+05:00
**Link:** https://t.me/nest_ru/307085

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Покажи сам фильтр и что ты ловишь в catch
- Флоу следующий: ошибка попадает в catch абстрактного гарда ( первый скрин ), и уже после ее перехватывает глобальный catch ( второй скрин ) где передает exception в функцию обработчик ( на примере можно увидеть v13ErrorHandler, мой обработчик работает по такому же принципу, просто принимает exception )
- Попробуй проверят не по хттп експешен, а тот который ты реально используешь
- Если нужно еще доп информация, скажите, проект не очень маленький и в двух скринах все не покажешь, а коллеги на отдыхе

Main message:
Да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да

--

## My telegram message #307087
**Time:** 15.07.2024 15:28:27 UTC+05:00
**Link:** https://t.me/nest_ru/307087

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Попробуй проверят не по хттп експешен, а тот который ты реально используешь
- Если нужно еще доп информация, скажите, проект не очень маленький и в двух скринах все не покажешь, а коллеги на отдыхе
- Да
- Просто что интересно, SignatureIvalid в своей сути является такой же кастомной ошибкой, но с ним проблем не возникает и он хорошо проходит по всему флоу

Main message:
Чет я никогда походу не пробовал использовать инстанс оф для уровней наследования больше одного) так что не уверен что такое работает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Чет я никогда походу не пробовал использовать инстанс оф для уровней наследования больше одного) так что не уверен что такое работает

--

## My telegram message #307090
**Time:** 15.07.2024 15:29:40 UTC+05:00
**Link:** https://t.me/nest_ru/307090

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Просто что интересно, SignatureIvalid в своей сути является такой же кастомной ошибкой, но с ним проблем не возникает и он хорошо проходит по всему флоу

Main message:
Может причина его работы вообще в другом, пробни всё виды Перехватывать, либо откажись от многоуровневых наследований

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Может причина его работы вообще в другом, пробни всё виды Перехватывать, либо откажись от многоуровневых наследований

--

## My telegram message #307099
**Time:** 15.07.2024 15:45:25 UTC+05:00
**Link:** https://t.me/nest_ru/307099

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- От многоуровневых наследований я отказаться точно не могу, там так добрая половина ошибок написана. Да и +, не такая и глубокая степень вложености, HttpException => BadRequestException => (мой кастомный)SignatureInvalid

Main message:
Я не использую хттп эксепшен в рамках модулей, глобальный фильтр ошибки разных модулей уже конвертит в транспортную ошибку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я не использую хттп эксепшен в рамках модулей, глобальный фильтр ошибки разных модулей уже конвертит в транспортную ошибку

--

## My telegram message #307171
**Time:** 16.07.2024 17:29:16 UTC+05:00
**Link:** https://t.me/nest_ru/307171

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Здравствуйте, ребят, хотел поинтересоваться есть ли у кого какие-то справочники или источники по типу курса или просто интенсивов по Nest качественных? только-только знакомлюсь с фреймворком, надеюсь на вашу помощь

Main message:
https://t.me/nest_ru/115089

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/115089

--

## My telegram message #307262
**Time:** 17.07.2024 02:12:37 UTC+05:00
**Link:** https://t.me/nest_ru/307262

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- добрый вечер. Подскажите пожалуйста, есть ли способ использовать class-transformer и class-validator вместе? Когда использую их вместе (AmountToCents это мой кастомный трансформер), трансформер отрабатывает перед валидациец. Порядок вообще не влияет.

Main message:
там порядок такой  https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts , можешь кастомный написать и изменить под себя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там порядок такой  https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts , можешь кастомный написать и изменить под себя

--

## My telegram message #307264
**Time:** 17.07.2024 02:17:48 UTC+05:00
**Link:** https://t.me/nest_ru/307264

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Звучит как план 😁
- добрый вечер. Подскажите пожалуйста, есть ли способ использовать class-transformer и class-validator вместе? Когда использую их вместе (AmountToCents это мой кастомный трансформер), трансформер отрабатывает перед валидациец. Порядок вообще не влияет.
- там порядок такой  https://github.com/nestjs/nest/blob/master/packages/common/pipes/validation.pipe.ts , можешь кастомный написать и изменить под себя
- понял. А просто такой трансформер и дефолтный валидатор не работает, да?

Main message:
ну ты создал декоратор трансформера

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты создал декоратор трансформера

--

## My telegram message #307524
**Time:** 21.07.2024 01:26:11 UTC+05:00
**Link:** https://t.me/nest_ru/307524

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://github.com/softkitit/softkit-core/tree/main/libs/file-storage мы недавно в либу для себя обернули работу с s3, можешь посмотреть, там есть интеграционые тесты на localstack, и дефолтный сервис + контроллер для presign url на download & upload через post если будет полезно будем благодарны звездочке )

Main message:
нужно экспортировать токен а не весь обьект

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужно экспортировать токен а не весь обьект

--

## My telegram message #307712
**Time:** 24.07.2024 00:24:44 UTC+05:00
**Link:** https://t.me/nest_ru/307712

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Расскажу притчу из динозавровой эпохи: Шифрование в старом pkzip было устроено просто. Пароль превращался в повторяющуюся последовательность, допустим ab123 в ab123ab123ab123... и это всё XORилось. Так как алгоритм приватный был, алгоритма никто без реверс инжиниринга не знал. Первое время. И пароль 55555 был равен паролю 5. Как узнали, был шок у сообщества. Это называлось security by obscurity: безопасность, основанная на неизвестном алгоритме. Вот uuid это тоже security by obscurity. Допустим хакер получит доступ к nginx логам вида GET /my/private/data/UUIDs... И тогда сможет сделать эти же запросы, забрав данные.

Main message:
чуть не забанил)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чуть не забанил)

--

## My telegram message #307872
**Time:** 26.07.2024 01:14:13 UTC+05:00
**Link:** https://t.me/nest_ru/307872

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет, у меня есть три сервиса. WorkdayService, NotificationService и ReminderService. у ReminderService есть cron: он периодически пробегается по напоминаниям в базе данных и решает нужно ли для каждого отправлять пользователю уведомление (по FCM). прикол в том, что при отправке напоминания также проверяется одно важное условие - ReminderService обращается к WorkdayService и узнаёт входит ли текущее время в рабочие дни. если входит, то пользователям отправляются уведомления (по FCM), если нет, то через NotificationService создаётся запись о том, что нужно сделать уведомление как только наступит рабочий день. у NotificationService тоже есть cron, он периодически проверяет входит ли текущее время в рабочий день, и если да, то ему нужно как-то заставить ReminderService уведомить пользователей о напоминании. но в таком случае получается, что ReminderService зависит от NotificationService, a NotificationService зависит от ReminderService. создаётся циклическая зависимость, их я стараюсь везде избегать. вопрос, как мне сделать так, чтобы NotificationService мог достучаться до ReminderService? пока что в голову лезет только создать внутри NotificationService Observable в который будут эмититься айдишники напоминаний, а сам ReminderService будет его слушать и выполнять свою работу. может есть ещё варианты какие-то?

Main message:
да нужно сделать евент сервисы просто для хранения сабжекта или евент еммиттера  class SomeEventService { notify$=new BehaviorSubject() otherNotify$=new BehaviorSubject() } и сервисы не будут к друг другу ходить, они будут только инжектить евент сервисы и или слать евент или слушать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да нужно сделать евент сервисы просто для хранения сабжекта или евент еммиттера  class SomeEventService { notify$=new BehaviorSubject() otherNotify$=new BehaviorSubject() } и сервисы не будут к друг другу ходить, они будут только инжектить евент сервисы и или слать евент или слушать

--

## My telegram message #307954
**Time:** 26.07.2024 11:28:36 UTC+05:00
**Link:** https://t.me/nest_ru/307954

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Angular

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Angular

--

## My telegram message #307976
**Time:** 26.07.2024 12:01:10 UTC+05:00
**Link:** https://t.me/nest_ru/307976

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет админ, почему ты забанил мой первый аккаунт?

Main message:
ты тот китаец что-ли?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты тот китаец что-ли?

--

## My telegram message #307980
**Time:** 26.07.2024 12:03:19 UTC+05:00
**Link:** https://t.me/nest_ru/307980

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет админ, почему ты забанил мой первый аккаунт?
- ты тот китаец что-ли?
- Я не понял, что это за китайский
- Нет, я не китаец ;)

Main message:
скинь в личку акк который заблокирован, возможно бот залочил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

скинь в личку акк который заблокирован, возможно бот залочил

--

## My telegram message #307985
**Time:** 26.07.2024 12:09:31 UTC+05:00
**Link:** https://t.me/nest_ru/307985

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Есть ли бесплатный сервер для проекта? Посоветуйте, пожалуйста, что-то кроме Google aws azure

Main message:
дешевые можно найти, я тут покупаю, в месяц стоит как пачка сигарет  https://ztv.su/aff.php?aff=526

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дешевые можно найти, я тут покупаю, в месяц стоит как пачка сигарет  https://ztv.su/aff.php?aff=526

--

## My telegram message #307989
**Time:** 26.07.2024 12:18:14 UTC+05:00
**Link:** https://t.me/nest_ru/307989

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Спасибо, бро ))

Main message:
по пути скину, там через гитхаб все делалось: тут как раз я описывал как поставить туда dokku и в него задеплоить приложение -  https://dev.to/endykaufman/deploy-nestjs-project-to-vps-with-dokku-31c5 тут как подключить бд к проекту локально и в dokku -  https://dev.to/endykaufman/add-postgres-to-docker-compose-and-dokku-infrastructure-for-telegram-bot-in-nestjs-23ih тут про миграции -  https://dev.to/endykaufman/create-a-database-in-dokku-infra-and-set-up-run-flyway-migration-from-github-runner-3p06

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по пути скину, там через гитхаб все делалось: тут как раз я описывал как поставить туда dokku и в него задеплоить приложение -  https://dev.to/endykaufman/deploy-nestjs-project-to-vps-with-dokku-31c5 тут как подключить бд к проекту локально и в dokku -  https://dev.to/endykaufman/add-postgres-to-docker-compose-and-dokku-infrastructure-for-telegram-bot-in-nestjs-23ih тут про миграции -  https://dev.to/endykaufman/create-a-database-in-dokku-infra-and-set-up-run-flyway-migration-from-github-runner-3p06

--

