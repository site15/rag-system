## My telegram message #32108
**Time:** 17.09.2019 18:12:01 UTC+05:00
**Link:** https://t.me/nest_ru/32108

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А он будет время показывать запросов, которые я через ахио кидаю в сервисе ?

Main message:
Интерцептор для аксиос напиши и юзай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Интерцептор для аксиос напиши и юзай

--

## My telegram message #32136
**Time:** 17.09.2019 19:41:09 UTC+05:00
**Link:** https://t.me/nest_ru/32136

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да можешь сделать в принципе
- Думаешь норм будет ?
- А все нашёл
- просто зависит от того что там у тебя, на сколько серьезные требования итд

Main message:
юзать микросервисы просто так, ради того чтобы их юзать, это херовая затея)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

юзать микросервисы просто так, ради того чтобы их юзать, это херовая затея)

--

## My telegram message #32139
**Time:** 17.09.2019 19:42:46 UTC+05:00
**Link:** https://t.me/nest_ru/32139

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А все нашёл
- просто зависит от того что там у тебя, на сколько серьезные требования итд
- юзать микросервисы просто так, ради того чтобы их юзать, это херовая затея)
- Ну я просто хочу подтянуть знание фрейма и что-нибудь написать для этого

Main message:
в несте монолит легко можно в микросеврисы переделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в несте монолит легко можно в микросеврисы переделать

--

## My telegram message #32148
**Time:** 17.09.2019 20:00:17 UTC+05:00
**Link:** https://t.me/nest_ru/32148

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в несте монолит легко можно в микросеврисы переделать
- Плюс переписать нагружённую часть какой-нибудь системы и сравнить
- Ильшат дело говорит)
- Банально push notifications для ИС

Main message:
в мс нужно выносить то что будешь скейлить, в основном так ну и когда много народу пилит, чтобы не ребутать и не стопоприть всю работу изза одного МУолодца

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в мс нужно выносить то что будешь скейлить, в основном так ну и когда много народу пилит, чтобы не ребутать и не стопоприть всю работу изза одного МУолодца

--

## My telegram message #32154
**Time:** 17.09.2019 20:48:35 UTC+05:00
**Link:** https://t.me/nest_ru/32154

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ильшат дело говорит)
- Банально push notifications для ИС
- в мс нужно выносить то что будешь скейлить, в основном так ну и когда много народу пилит, чтобы не ребутать и не стопоприть всю работу изза одного МУолодца
- дико соглашусь, это то для чего нужны микросервисы, самое главное это независимые команды - независимый деплой

Main message:
у меня была функция в одном файле, которую я решил масштабировать через мс, сейчас у меня 5 классов, 4 сервиса, 3 либы в рамках монорепы, 2 микросервиса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня была функция в одном файле, которую я решил масштабировать через мс, сейчас у меня 5 классов, 4 сервиса, 3 либы в рамках монорепы, 2 микросервиса

--

## My telegram message #32160
**Time:** 17.09.2019 20:57:18 UTC+05:00
**Link:** https://t.me/nest_ru/32160

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в мс нужно выносить то что будешь скейлить, в основном так ну и когда много народу пилит, чтобы не ребутать и не стопоприть всю работу изза одного МУолодца
- дико соглашусь, это то для чего нужны микросервисы, самое главное это независимые команды - независимый деплой
- у меня была функция в одном файле, которую я решил масштабировать через мс, сейчас у меня 5 классов, 4 сервиса, 3 либы в рамках монорепы, 2 микросервиса
- на самом деле это многим не нужно если у себя в коде нету разделение ответственности, то какие там мс

Main message:
ну я сначала разделил все, перед мс, и оно норм было, не трудно вносить изменения

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я сначала разделил все, перед мс, и оно норм было, не трудно вносить изменения

--

## My telegram message #32176
**Time:** 17.09.2019 21:28:58 UTC+05:00
**Link:** https://t.me/nest_ru/32176

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А чем собираете контракты для rmq? Ручками дублируется или есть мета, котрая собирается из кода в условно ямлики?
- Боль: - Одна задача часто затрагивает несколько (3 - 7) микросервисов и для каждого нужно создать ветку, внести изменения и отправить на ревью. плохо раздробили ответственности ?
- При выливке сервиса есть тесты, которые проверяют, что те кто их используют не сломались?
- Так контракты - NPM пакет. Очереди настраиваются автоматически с помощью  https://github.com/AlariCode/rabbitmq-messages

Main message:
у нас типа монорепы, ну через сим линк сабмодули гитовые, и контракты сразу подвязанны в рутовом проекте, тупа линт его не проходит, если чет не так

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у нас типа монорепы, ну через сим линк сабмодули гитовые, и контракты сразу подвязанны в рутовом проекте, тупа линт его не проходит, если чет не так

--

## My telegram message #32185
**Time:** 17.09.2019 21:36:57 UTC+05:00
**Link:** https://t.me/nest_ru/32185

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- например
- Да, интеграционные тесты
- Общался с контрибьютором Скоро мб будет модуль cqrs для мс
- Так RMQ так же работает. Но к примеру если тебе нужно добавить новое поле, которые передаётся в этом эвенте, нужно чтобы о нём знали несколько микросервисов

Main message:
он не шарит)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он не шарит)

--

## My telegram message #32189
**Time:** 17.09.2019 21:49:37 UTC+05:00
**Link:** https://t.me/nest_ru/32189

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Так RMQ так же работает. Но к примеру если тебе нужно добавить новое поле, которые передаётся в этом эвенте, нужно чтобы о нём знали несколько микросервисов
- он не шарит)
- Именно)
- Все или под каждый провайдер?

Main message:
в гитхаб кто нить юзает уже пакеты?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в гитхаб кто нить юзает уже пакеты?

--

## My telegram message #32194
**Time:** 18.09.2019 00:44:40 UTC+05:00
**Link:** https://t.me/nest_ru/32194

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Used to pay $5/mo on a small instance for my personal site. Then I discovered Kubernetes and realized my site didn't scale! No canary deployments! So I upgraded and pay $200/mo now. Took weeks to configure. Millions of people can now read my resume. Damn, it's never looked better

Main message:
чуть не забанил, думал опять спам) а могу ли я забанить супер админа)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чуть не забанил, думал опять спам) а могу ли я забанить супер админа)

--

## My telegram message #32218
**Time:** 18.09.2019 13:17:35 UTC+05:00
**Link:** https://t.me/nest_ru/32218

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо!
- И ещё небольшой лафхак  https://github.com/nestjs/nest/network/dependents?package_id=UGFja2FnZS00NTI3NzIzMzQ%3D все репозитории на гитхабе, которые используют nestjs
- вот еще у Ильшата адская заготовка на все случаи в жизни  https://github.com/rucken/core-nestjs
- поставил ее. тут чисто бекенд апи я так понимаю? никакой веб морды не вижу  https://monosnap.com/file/XuEgFjPfSJ5FtrzdRYMMrwEL9Cn95p

Main message:
у меня есть морда и сваггер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня есть морда и сваггер

--

## My telegram message #32222
**Time:** 18.09.2019 13:18:40 UTC+05:00
**Link:** https://t.me/nest_ru/32222

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот еще у Ильшата адская заготовка на все случаи в жизни  https://github.com/rucken/core-nestjs
- поставил ее. тут чисто бекенд апи я так понимаю? никакой веб морды не вижу  https://monosnap.com/file/XuEgFjPfSJ5FtrzdRYMMrwEL9Cn95p
- у меня есть морда и сваггер
- а тут есть какаято веб морда?

Main message:
https://core-nestjs.rucken.io/swagger

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://core-nestjs.rucken.io/swagger

--

## My telegram message #32225
**Time:** 18.09.2019 13:19:31 UTC+05:00
**Link:** https://t.me/nest_ru/32225

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня есть морда и сваггер
- а тут есть какаято веб морда?
- https://core-nestjs.rucken.io/swagger
- ок щас попробую поставить

Main message:
https://web.rucken.io/ - это фронт на ангулар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://web.rucken.io/ - это фронт на ангулар

--

## My telegram message #32228
**Time:** 18.09.2019 13:21:02 UTC+05:00
**Link:** https://t.me/nest_ru/32228

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ок щас попробую поставить

Main message:
может не завестись, эти штуки они больше как примеры

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может не завестись, эти штуки они больше как примеры

--

## My telegram message #32230
**Time:** 18.09.2019 13:21:29 UTC+05:00
**Link:** https://t.me/nest_ru/32230

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://web.rucken.io/ - это фронт на ангулар
- брр)))
- может не завестись, эти штуки они больше как примеры
- в пыхе все и сразу а тут все по частям у вас)

Main message:
пыха это мвц

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пыха это мвц

--

## My telegram message #32232
**Time:** 18.09.2019 13:21:43 UTC+05:00
**Link:** https://t.me/nest_ru/32232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- может не завестись, эти штуки они больше как примеры
- в пыхе все и сразу а тут все по частям у вас)
- пыха это мвц
- это не тут, а в ноде

Main message:
а тут бэк, спа, мобила (у меня)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а тут бэк, спа, мобила (у меня)

--

## My telegram message #32239
**Time:** 18.09.2019 13:26:05 UTC+05:00
**Link:** https://t.me/nest_ru/32239

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну можна ж было сразу на основе експреса докрутить и морду ж? или я чтото не понимаю?

Main message:
раньше писали мвц, сейчас бэк и фронт отдельно пишут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

раньше писали мвц, сейчас бэк и фронт отдельно пишут

--

## My telegram message #32249
**Time:** 18.09.2019 13:31:09 UTC+05:00
**Link:** https://t.me/nest_ru/32249

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- просто js однопоточный, и чтобы не блокировать рендер, апи делают отдельно, как вариант
- наверно
- не плохой тон, это культ карго как бы
- Чтото пошло не так  https://monosnap.com/file/TLlQamyy4TjQVVYkzfeFdttHAY32T8

Main message:
там когда ноду ставишь нужно галочку поставить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там когда ноду ставишь нужно галочку поставить

--

## My telegram message #32258
**Time:** 18.09.2019 13:35:40 UTC+05:00
**Link:** https://t.me/nest_ru/32258

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Чтото пошло не так  https://monosnap.com/file/TLlQamyy4TjQVVYkzfeFdttHAY32T8
- там когда ноду ставишь нужно галочку поставить
- написано что не хватает, читай внимательно
- все по чуть. последним phalcon был

Main message:
а для чего в ноду пошел?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а для чего в ноду пошел?

--

## My telegram message #32262
**Time:** 18.09.2019 13:37:53 UTC+05:00
**Link:** https://t.me/nest_ru/32262

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все по чуть. последним phalcon был
- а для чего в ноду пошел?
- та блин чуствую себя динозавром просто)))
- почему если ты на php ни одного фреймворка в полный рост не использовал, а тут что будет как думаешь ?

Main message:
на пхп норм чуваки пишут, он нормальный язык

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на пхп норм чуваки пишут, он нормальный язык

--

## My telegram message #32280
**Time:** 18.09.2019 13:49:51 UTC+05:00
**Link:** https://t.me/nest_ru/32280

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я вообще планировал найти минимальную заготовку рабочую на нативной ноде. минимальную имею виду несколько страниц сайта + подключение к бд + авторизация. С этим бы можна было бы понять как правильно строиться сайт на ноде и уже чтото писать

Main message:
Страниц нету у нас мы пишем апи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Страниц нету у нас мы пишем апи

--

## My telegram message #32285
**Time:** 18.09.2019 13:57:42 UTC+05:00
**Link:** https://t.me/nest_ru/32285

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет. Есть одна минутка? Можно в личку спрошу пару моментов?
- пиши, но может все таки тут вопрос задаешь, мб по теме будет всем полезно
- Страниц нету у нас мы пишем апи
- на на експресе ж строят

Main message:
нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет

--

## My telegram message #32291
**Time:** 18.09.2019 14:00:20 UTC+05:00
**Link:** https://t.me/nest_ru/32291

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Страниц нету у нас мы пишем апи
- на на експресе ж строят
- нет
- Не читал статью "как быть фронтэндером в 201х"?

Main message:
неа)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа)

--

## My telegram message #32293
**Time:** 18.09.2019 14:00:34 UTC+05:00
**Link:** https://t.me/nest_ru/32293

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет
- Не читал статью "как быть фронтэндером в 201х"?
- неа)
- так а че експрес идет в топку получается?

Main message:
он внутри юзается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он внутри юзается

--

## My telegram message #32297
**Time:** 18.09.2019 14:03:54 UTC+05:00
**Link:** https://t.me/nest_ru/32297

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- неа)
- так а че експрес идет в топку получается?
- он внутри юзается
- ща

Main message:
ну это не бэк) это больше фронт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это не бэк) это больше фронт

--

## My telegram message #32305
**Time:** 18.09.2019 19:14:55 UTC+05:00
**Link:** https://t.me/nest_ru/32305

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Учитывая что последняя функция которую мы вызовем это response.json а доступ к response у нас есть в мидлвере переопределить функцию не составит особого труда
- Делаю микросервис для общения со SpringBoot-приложением через RabbitMQ. Как из Nest в SpringBoot отправить сообщение, при этом нужно засеттить определенный exchange и routingKey. Пытаюсь использовать стандартный клиент. Методы send/emit шлют сообщение в никуда. Хотя из SpringBoot сообщение прилетают в Nest (это работает нормально). В доках не нашел ничего по этому поводу, может плохо искал, ткните пальцем? Или может тут не так все тривиально?
- посмотри тут -  https://github.com/Insidexa/nest-queues-examples/blob/master/src/sample.controller.ts#L33
- TokenError: Code is invalid or expired.  Сталкивался кто-то с перехватом ошибок при oauth2 авторизации с ВК ? В случае успешной авторизации callback срабатывает, а в случае ошибки тупо не хочет перехватывать (фильтр пока не хочется писать свой)

Main message:
http://www.passportjs.org/packages/passport-vkontakte/ ?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

http://www.passportjs.org/packages/passport-vkontakte/ ?

--

## My telegram message #32361
**Time:** 18.09.2019 21:43:02 UTC+05:00
**Link:** https://t.me/nest_ru/32361

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- На мой взгляд лучше в сервисе
- Вот и я ломаюсь
- https://emacsway.github.io/ru/anemic-domain-model/
- Все таки в сущности храню методы

Main message:
лучше в сервисе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше в сервисе

--

## My telegram message #32385
**Time:** 18.09.2019 22:01:51 UTC+05:00
**Link:** https://t.me/nest_ru/32385

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- нерод неужели никто crud + swagger не тыркал?

Main message:
сам разработчик тут сидит так то) нужно игратся с конфигом и если в пример нет того что тебе надо, то скорее всего этого нету

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сам разработчик тут сидит так то) нужно игратся с конфигом и если в пример нет того что тебе надо, то скорее всего этого нету

--

## My telegram message #32387
**Time:** 18.09.2019 22:02:26 UTC+05:00
**Link:** https://t.me/nest_ru/32387

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Круд не нужон
- я вроде не в ишьюс а в местное комьюнити с вопросом заглянул
- сам разработчик тут сидит так то) нужно игратся с конфигом и если в пример нет того что тебе надо, то скорее всего этого нету
- Только с OpenAPI

Main message:
вопрос напиши полностью и что не получается, чтобы побыромы мы смогли сами сделать это

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вопрос напиши полностью и что не получается, чтобы побыромы мы смогли сами сделать это

--

## My telegram message #32394
**Time:** 18.09.2019 22:05:39 UTC+05:00
**Link:** https://t.me/nest_ru/32394

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сам разработчик тут сидит так то) нужно игратся с конфигом и если в пример нет того что тебе надо, то скорее всего этого нету
- Только с OpenAPI
- вопрос напиши полностью и что не получается, чтобы побыромы мы смогли сами сделать это
- даже разработчик тут , вот это везенье

Main message:
интерцепторами можешь конвертить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

интерцепторами можешь конвертить

--

## My telegram message #32399
**Time:** 18.09.2019 22:11:04 UTC+05:00
**Link:** https://t.me/nest_ru/32399

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вопрос напиши полностью и что не получается, чтобы побыромы мы смогли сами сделать это
- даже разработчик тут , вот это везенье
- интерцепторами можешь конвертить
- подожди давай синхронизуемся

Main message:
сложна

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сложна

--

## My telegram message #32401
**Time:** 18.09.2019 22:11:22 UTC+05:00
**Link:** https://t.me/nest_ru/32401

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- интерцепторами можешь конвертить
- подожди давай синхронизуемся
- сложна
- могу пример в личку накидать

Main message:
не

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не

--

## My telegram message #32404
**Time:** 18.09.2019 22:11:56 UTC+05:00
**Link:** https://t.me/nest_ru/32404

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сложна
- могу пример в личку накидать
- не
- я просто дико был удивлен что такая тема не дает возможности кастомить объекты дто для каждого метода отдельно

Main message:
разные дто на рзные методы круда надо?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

разные дто на рзные методы круда надо?

--

## My telegram message #32406
**Time:** 18.09.2019 22:12:12 UTC+05:00
**Link:** https://t.me/nest_ru/32406

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не
- я просто дико был удивлен что такая тема не дает возможности кастомить объекты дто для каждого метода отдельно
- разные дто на рзные методы круда надо?
- ну я бы и от этого однозначно не отказался

Main message:
ну юзая круд о кастоме можешь забыть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну юзая круд о кастоме можешь забыть

--

## My telegram message #32411
**Time:** 18.09.2019 22:14:19 UTC+05:00
**Link:** https://t.me/nest_ru/32411

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- разные дто на рзные методы круда надо?
- ну я бы и от этого однозначно не отказался
- ну юзая круд о кастоме можешь забыть
- самый кастыльный путь который я нашел это юзать оверлоад методов

Main message:
https://github.com/nestjsx/crud/wiki/Controllers#request-validation

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/nestjsx/crud/wiki/Controllers#request-validation

--

## My telegram message #32419
**Time:** 18.09.2019 22:18:41 UTC+05:00
**Link:** https://t.me/nest_ru/32419

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну юзая круд о кастоме можешь забыть
- самый кастыльный путь который я нашел это юзать оверлоад методов
- https://github.com/nestjsx/crud/wiki/Controllers#request-validation
- да да, я как раз и писал выше, что на 1 энтити ты класс валидатором группируешь

Main message:
я не очень шарю, ну может вот оно,  https://github.com/nestjsx/crud/wiki/Controllers#routes

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я не очень шарю, ну может вот оно,  https://github.com/nestjsx/crud/wiki/Controllers#routes

--

## My telegram message #32422
**Time:** 18.09.2019 22:19:21 UTC+05:00
**Link:** https://t.me/nest_ru/32422

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://github.com/nestjsx/crud/wiki/Controllers#request-validation
- да да, я как раз и писал выше, что на 1 энтити ты класс валидатором группируешь
- я не очень шарю, ну может вот оно,  https://github.com/nestjsx/crud/wiki/Controllers#routes
- это раздел декларативного анотирования методов

Main message:
можно свагер декоры туда заппихать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно свагер декоры туда заппихать

--

## My telegram message #32425
**Time:** 18.09.2019 22:19:38 UTC+05:00
**Link:** https://t.me/nest_ru/32425

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я не очень шарю, ну может вот оно,  https://github.com/nestjsx/crud/wiki/Controllers#routes
- это раздел декларативного анотирования методов
- можно свагер декоры туда заппихать
- именно методов

Main message:
ну тогда ждем  @zMotivat0r

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну тогда ждем  @zMotivat0r

--

## My telegram message #32428
**Time:** 18.09.2019 22:20:08 UTC+05:00
**Link:** https://t.me/nest_ru/32428

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно свагер декоры туда заппихать
- именно методов
- ну тогда ждем  @zMotivat0r
- то есть у тебя crudMethod(dto: Dto)

Main message:
я руками пишу все если что)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я руками пишу все если что)

--

## My telegram message #32432
**Time:** 18.09.2019 22:23:49 UTC+05:00
**Link:** https://t.me/nest_ru/32432

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну тогда ждем  @zMotivat0r
- то есть у тебя crudMethod(dto: Dto)
- я руками пишу все если что)
- я по русски то тему донести не могу, представь что будет на инглише

Main message:
routes: { getManyBase: { decorators:[ApiModelProperty(...)], },

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

routes: { getManyBase: { decorators:[ApiModelProperty(...)], },

--

## My telegram message #32445
**Time:** 18.09.2019 23:22:59 UTC+05:00
**Link:** https://t.me/nest_ru/32445

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- У меня между модулями есть циклические зависимости Это нормально?

Main message:
Нет, бей дальше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нет, бей дальше

--

## My telegram message #32449
**Time:** 18.09.2019 23:28:31 UTC+05:00
**Link:** https://t.me/nest_ru/32449

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- привет, отличная новость
- У меня между модулями есть циклические зависимости Это нормально?
- Нет, бей дальше
- Крч у меня есть модуль users и модуль auth В первом логика работы с пользователями, во втором аутентификация И в auth у меня есть graphql-auth.guard (как в доке NestJS) В каждом из них есть GraphQL-ресольверы, которые зависят от graphql-auth.guard Как это раздробить?

Main message:
Гуард глобально вешать можно же?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Гуард глобально вешать можно же?

--

## My telegram message #32552
**Time:** 20.09.2019 17:20:53 UTC+05:00
**Link:** https://t.me/nest_ru/32552

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Допустим веб фронту по ендпойнту api/drivers/:id
- ладно, мимо, оставь как есть DriverDto
- Ладно 🤷‍♂️
- Кстати, еще одна задумка есть

Main message:
Соедини их

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Соедини их

--

## My telegram message #32555
**Time:** 20.09.2019 17:23:34 UTC+05:00
**Link:** https://t.me/nest_ru/32555

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ладно 🤷‍♂️
- Кстати, еще одна задумка есть
- Соедини их
- Что ты имеешь в виду?

Main message:
Два декора в один схопни и свои параметры добавь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Два декора в один схопни и свои параметры добавь

--

## My telegram message #32569
**Time:** 20.09.2019 23:03:57 UTC+05:00
**Link:** https://t.me/nest_ru/32569

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- +
- У меня довольно быстро
- насколько долго
- 6 секунд

Main message:
Я чай наливаю пока стартует

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я чай наливаю пока стартует

--

## My telegram message #32586
**Time:** 22.09.2019 14:44:56 UTC+05:00
**Link:** https://t.me/nest_ru/32586

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребята, использует ли кто-то для тестирования функционала nest приложений jest?

Main message:
Da

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Da

--

## My telegram message #32920
**Time:** 25.09.2019 11:33:04 UTC+05:00
**Link:** https://t.me/nest_ru/32920

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- нету миграций изначально нету typescript потому и mikro)

Main message:
Я бы миграции отдельно делал, например на flyway, так часто специфичные штуки которые трудно программно нормально отследить и сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я бы миграции отдельно делал, например на flyway, так часто специфичные штуки которые трудно программно нормально отследить и сделать

--

## My telegram message #32927
**Time:** 25.09.2019 11:59:29 UTC+05:00
**Link:** https://t.me/nest_ru/32927

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я бы миграции отдельно делал, например на flyway, так часто специфичные штуки которые трудно программно нормально отследить и сделать
- Но без орм на чистом билдере тоже не очень в плане объема работы.
- в ноде нету норм orm, я бы давно уже переехал если были отдельные решения без orm но толкового нету ничего
- Нужно глянуть. я вот когда то db-migrate смотрел сейчас вроде 1.0 вышел но как то не то было хочу с коробки на базе модели с автогенерацией и т.д  https://github.com/db-migrate/node-db-migrate

Main message:
Автогенерируемые миграции для простых баз можно ещё юзать и когда редко меняется, когда куча таблиц и куча разрабов и куча тестовых стендов и продуктовых тестовых, то авто не вывозят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Автогенерируемые миграции для простых баз можно ещё юзать и когда редко меняется, когда куча таблиц и куча разрабов и куча тестовых стендов и продуктовых тестовых, то авто не вывозят

--

## My telegram message #32931
**Time:** 25.09.2019 12:02:55 UTC+05:00
**Link:** https://t.me/nest_ru/32931

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в ноде нету норм orm, я бы давно уже переехал если были отдельные решения без orm но толкового нету ничего
- Нужно глянуть. я вот когда то db-migrate смотрел сейчас вроде 1.0 вышел но как то не то было хочу с коробки на базе модели с автогенерацией и т.д  https://github.com/db-migrate/node-db-migrate
- Автогенерируемые миграции для простых баз можно ещё юзать и когда редко меняется, когда куча таблиц и куча разрабов и куча тестовых стендов и продуктовых тестовых, то авто не вывозят
- В djange все вывозится и все работает. Заменил значение в МОДЕЛИ миграция создалась ты ее проверил если все ок запустил

Main message:
ну ты сравнил кончено)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты сравнил кончено)

--

## My telegram message #32934
**Time:** 25.09.2019 12:03:36 UTC+05:00
**Link:** https://t.me/nest_ru/32934

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Автогенерируемые миграции для простых баз можно ещё юзать и когда редко меняется, когда куча таблиц и куча разрабов и куча тестовых стендов и продуктовых тестовых, то авто не вывозят
- В djange все вывозится и все работает. Заменил значение в МОДЕЛИ миграция создалась ты ее проверил если все ок запустил
- ну ты сравнил кончено)
- Всё? Или только самые примитивные типа доавления таблицы / столбца?

Main message:
вот пример  https://github.com/rucken/todo-django/blob/master/rucken_todo/migrations/0005_add_new_fields_to_change_model.py

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот пример  https://github.com/rucken/todo-django/blob/master/rucken_todo/migrations/0005_add_new_fields_to_change_model.py

--

## My telegram message #32936
**Time:** 25.09.2019 12:04:32 UTC+05:00
**Link:** https://t.me/nest_ru/32936

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну ты сравнил кончено)
- Всё? Или только самые примитивные типа доавления таблицы / столбца?
- вот пример  https://github.com/rucken/todo-django/blob/master/rucken_todo/migrations/0005_add_new_fields_to_change_model.py
- А что еще может быть?? Мне этого хватает

Main message:
апдейт словарей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

апдейт словарей

--

## My telegram message #32940
**Time:** 25.09.2019 12:05:34 UTC+05:00
**Link:** https://t.me/nest_ru/32940

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот пример  https://github.com/rucken/todo-django/blob/master/rucken_todo/migrations/0005_add_new_fields_to_change_model.py
- А что еще может быть?? Мне этого хватает
- апдейт словарей
- Изменение структуры, которое требует иногда сложные изменения сузествующих данных, чтобы сохранить всю целостность

Main message:
да куча кейсов, на простых базах народ ваще этого не видет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да куча кейсов, на простых базах народ ваще этого не видет)

--

## My telegram message #32944
**Time:** 25.09.2019 12:06:12 UTC+05:00
**Link:** https://t.me/nest_ru/32944

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Изменение структуры, которое требует иногда сложные изменения сузествующих данных, чтобы сохранить всю целостность
- да куча кейсов, на простых базах народ ваще этого не видет)
- Ну что то сложное уже можно и руками написать
- Доавление триггеров в бд)

Main message:
это вроде есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это вроде есть

--

## My telegram message #32946
**Time:** 25.09.2019 12:06:47 UTC+05:00
**Link:** https://t.me/nest_ru/32946

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну что то сложное уже можно и руками написать
- Доавление триггеров в бд)
- это вроде есть
- А примитивное и руками за быстро делается

Main message:
я руками пишу запросы но использую либу тайпорма для этого, простые вещи ноорм вроде получаются

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я руками пишу запросы но использую либу тайпорма для этого, простые вещи ноорм вроде получаются

--

## My telegram message #32948
**Time:** 25.09.2019 12:07:21 UTC+05:00
**Link:** https://t.me/nest_ru/32948

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это вроде есть
- А примитивное и руками за быстро делается
- я руками пишу запросы но использую либу тайпорма для этого, простые вещи ноорм вроде получаются
- Ну.. можно и забыть.. да и смысл. Автомиграции неплохая фишка)

Main message:
https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/migrations/1537203425057-AddProjectTable.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/migrations/1537203425057-AddProjectTable.ts

--

## My telegram message #32950
**Time:** 25.09.2019 12:07:44 UTC+05:00
**Link:** https://t.me/nest_ru/32950

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну.. можно и забыть.. да и смысл. Автомиграции неплохая фишка)

Main message:
если это джанго то да, иначе нет) нигде еще не видел нормального

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если это джанго то да, иначе нет) нигде еще не видел нормального

--

## My telegram message #32956
**Time:** 25.09.2019 12:09:38 UTC+05:00
**Link:** https://t.me/nest_ru/32956

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если это джанго то да, иначе нет) нигде еще не видел нормального
- Про автомиграции в пхп не слышал... Про ОРМ в джанге (сам не юзал), кстати, тоже только негативное слышал, как минус джанге
- Учитывая что связями я не пользуюсь а простой запрос к таблице сопоставить с моделей не проблема.. для меня миграции это главное)
- Чем-чем не пользуешься? ._.

Main message:
fk мб)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

fk мб)

--

## My telegram message #32963
**Time:** 25.09.2019 12:13:33 UTC+05:00
**Link:** https://t.me/nest_ru/32963

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- РБД без связей? ._. ._, ._.
- Связями в орм)
- Зачем тогда ОРМ? Простая выбора на кверибиллдере делается отлично, как и сериализация. Проблемы идут, когда надо сериализовать со связями
- Так вот и я о том же. Для меня это модели и миграции. Без связей и модульность лучше и закешировать всегда можно. Связи это зло

Main message:
ну, ващето нет) связи это валидация на уровне бд, левое ид не засунишь, и лишнее не удалишь, бд не даст

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну, ващето нет) связи это валидация на уровне бд, левое ид не засунишь, и лишнее не удалишь, бд не даст

--

## My telegram message #32967
**Time:** 25.09.2019 12:14:50 UTC+05:00
**Link:** https://t.me/nest_ru/32967

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Зачем тогда ОРМ? Простая выбора на кверибиллдере делается отлично, как и сериализация. Проблемы идут, когда надо сериализовать со связями
- Так вот и я о том же. Для меня это модели и миграции. Без связей и модульность лучше и закешировать всегда можно. Связи это зло
- ну, ващето нет) связи это валидация на уровне бд, левое ид не засунишь, и лишнее не удалишь, бд не даст
- Опять же если б это был не нест а ларка тогда ок там уже устоявшаяся орм.. А на счет левого.. от кривых рук нет приема)

Main message:
ну оно работает так то)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну оно работает так то)

--

## My telegram message #32971
**Time:** 25.09.2019 12:18:13 UTC+05:00
**Link:** https://t.me/nest_ru/32971

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну, ващето нет) связи это валидация на уровне бд, левое ид не засунишь, и лишнее не удалишь, бд не даст
- Опять же если б это был не нест а ларка тогда ок там уже устоявшаяся орм.. А на счет левого.. от кривых рук нет приема)
- ну оно работает так то)
- На маленьких проектах? Вот припустим мне везде нужен юзер с геолокацией с онлайн статусом с аватаркой и т.д зачем мне постоянно его дергать если это проще закешировать?

Main message:
дк а зачем юзать реляционную если документоориентированная дает то что тебе надо из коробки?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дк а зачем юзать реляционную если документоориентированная дает то что тебе надо из коробки?

--

## My telegram message #32974
**Time:** 25.09.2019 12:22:19 UTC+05:00
**Link:** https://t.me/nest_ru/32974

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну оно работает так то)
- На маленьких проектах? Вот припустим мне везде нужен юзер с геолокацией с онлайн статусом с аватаркой и т.д зачем мне постоянно его дергать если это проще закешировать?
- дк а зачем юзать реляционную если документоориентированная дает то что тебе надо из коробки?
- В монге вообще не вижу смысла. постгрес изначально все умеет и мускл все уже умеет..

Main message:
я выход 3е1 тайп орм жду, думал на базе нее модульность для неста сделать, типа джанго как раз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я выход 3е1 тайп орм жду, думал на базе нее модульность для неста сделать, типа джанго как раз

--

## My telegram message #32991
**Time:** 25.09.2019 12:38:11 UTC+05:00
**Link:** https://t.me/nest_ru/32991

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это типа 2 колонки ?  body_en ,  body_ru да лучше так не делать никогда

Main message:
а чем это плохо? ты в селекте указываешь какие именно поля брать и рпо скорости работает как с одним полем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а чем это плохо? ты в селекте указываешь какие именно поля брать и рпо скорости работает как с одним полем

--

## My telegram message #32996
**Time:** 25.09.2019 12:39:16 UTC+05:00
**Link:** https://t.me/nest_ru/32996

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В mysql и pg без проблем можно сохранять json искать по нему сортировать и т.д
- а чем это плохо? ты в селекте указываешь какие именно поля брать и рпо скорости работает как с одним полем
- проще, но это фиговая затея performance теряется
- Аааа. Ну эт не то немного, имо. В монге же кайф в основном это aggregation pipeline

Main message:
если делать копию таблицы под каждый язык, там сиквенсы разьедутся и нужно кучу кода держдать чтобы реляционные свзяи контролировать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если делать копию таблицы под каждый язык, там сиквенсы разьедутся и нужно кучу кода держдать чтобы реляционные свзяи контролировать

--

## My telegram message #33000
**Time:** 25.09.2019 12:39:38 UTC+05:00
**Link:** https://t.me/nest_ru/33000

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- проще, но это фиговая затея performance теряется
- Аааа. Ну эт не то немного, имо. В монге же кайф в основном это aggregation pipeline
- если делать копию таблицы под каждый язык, там сиквенсы разьедутся и нужно кучу кода держдать чтобы реляционные свзяи контролировать
- зачем каждую таблицу под язык ?? кто это придумал

Main message:
что такое перфоманс тогда?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

что такое перфоманс тогда?

--

## My telegram message #33005
**Time:** 25.09.2019 12:40:20 UTC+05:00
**Link:** https://t.me/nest_ru/33005

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если делать копию таблицы под каждый язык, там сиквенсы разьедутся и нужно кучу кода держдать чтобы реляционные свзяи контролировать
- зачем каждую таблицу под язык ?? кто это придумал
- что такое перфоманс тогда?
- это еще хуже чем с колонками

Main message:
есть еще и бинари жсон колонка на все языки)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть еще и бинари жсон колонка на все языки)

--

## My telegram message #33009
**Time:** 25.09.2019 12:41:21 UTC+05:00
**Link:** https://t.me/nest_ru/33009

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- что такое перфоманс тогда?
- это еще хуже чем с колонками
- есть еще и бинари жсон колонка на все языки)
- это как раз одна ответственность

Main message:
у тя какой варинт?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя какой варинт?

--

## My telegram message #33015
**Time:** 25.09.2019 12:42:48 UTC+05:00
**Link:** https://t.me/nest_ru/33015

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- есть еще и бинари жсон колонка на все языки)
- это как раз одна ответственность
- у тя какой варинт?
- одна таблица

Main message:
ну я все варианты поюзал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я все варианты поюзал

--

## My telegram message #33022
**Time:** 25.09.2019 12:44:15 UTC+05:00
**Link:** https://t.me/nest_ru/33022

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя какой варинт?
- одна таблица
- ну я все варианты поюзал
- Был у меня помню проект на дле под лям в сутки вытаскивал на простеньком серваке так там вообще обычное поле и поля разделены | правда никакой сортировки ничего)

Main message:
не нужно джойнить с теробайт непонятной чуши которая не имеет нормальных ключей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не нужно джойнить с теробайт непонятной чуши которая не имеет нормальных ключей

--

## My telegram message #33026
**Time:** 25.09.2019 12:51:24 UTC+05:00
**Link:** https://t.me/nest_ru/33026

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я все варианты поюзал
- Был у меня помню проект на дле под лям в сутки вытаскивал на простеньком серваке так там вообще обычное поле и поля разделены | правда никакой сортировки ничего)
- не нужно джойнить с теробайт непонятной чуши которая не имеет нормальных ключей
- поля с _ добавлять не удобно. потому и используют отдельную таблицу но с приходом nosql смысла нет

Main message:
если можно в запросе указать чтобы не весь джсон этот из поля дергался а только чета конкретное, тогда норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если можно в запросе указать чтобы не весь джсон этот из поля дергался а только чета конкретное, тогда норм

--

## My telegram message #33029
**Time:** 25.09.2019 12:52:11 UTC+05:00
**Link:** https://t.me/nest_ru/33029

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не нужно джойнить с теробайт непонятной чуши которая не имеет нормальных ключей
- поля с _ добавлять не удобно. потому и используют отдельную таблицу но с приходом nosql смысла нет
- если можно в запросе указать чтобы не весь джсон этот из поля дергался а только чета конкретное, тогда норм
- можно. и не только это еще и искать по полю можно и сортировать и многое другое

Main message:
select  t.id , t.name ,t.locale_name.ru from dictionary t

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

select  t.id , t.name ,t.locale_name.ru from dictionary t

--

## My telegram message #33034
**Time:** 25.09.2019 12:55:28 UTC+05:00
**Link:** https://t.me/nest_ru/33034

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно. и не только это еще и искать по полю можно и сортировать и многое другое
- select  t.id , t.name ,t.locale_name.ru from dictionary t
- https://dev.mysql.com/doc/refman/8.0/en/json-search-functions.html
- в postgres 12 впили кучу фич для работы с json можно вытянуть поля -  https://medium.com/hackernoon/how-to-query-jsonb-beginner-sheet-cheat-4da3aa5082a3 3 пункт

Main message:
клева

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

клева

--

## My telegram message #33036
**Time:** 25.09.2019 12:56:10 UTC+05:00
**Link:** https://t.me/nest_ru/33036

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://dev.mysql.com/doc/refman/8.0/en/json-search-functions.html
- в postgres 12 впили кучу фич для работы с json можно вытянуть поля -  https://medium.com/hackernoon/how-to-query-jsonb-beginner-sheet-cheat-4da3aa5082a3 3 пункт
- клева
- в мускуле по сравнению с pg слабый функционал для работы с json ну и индексы на jsonb можно повесить в pg

Main message:
о это ваще круто)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

о это ваще круто)

--

