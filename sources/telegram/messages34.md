## My telegram message #34182
**Time:** 03.10.2019 11:43:32 UTC+05:00
**Link:** https://t.me/nest_ru/34182

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Коллеги, привет! Для упаковки микросервисов на NestJS на prod использую в основном Webpack. Docker образы благодаря этому становятся около 70mb. Основную боль составляют опциональные зависимости, которые можно игнорировать с помощью плагинов Webpack. В последнем обновлении NestJS снова пришлось дополнять этот список. Что вы используете для упаковки на prod? Так же все шло хорошо, до внедрения Sequalize в один из сервисов. Webpack не справился с упаковкой пакета pg-native. Может тоже сталкивались?

Main message:
А почему просто папку не запаковать?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А почему просто папку не запаковать?

--

## My telegram message #34186
**Time:** 03.10.2019 11:45:07 UTC+05:00
**Link:** https://t.me/nest_ru/34186

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- что значит не справился ?
- Если явно не включать pg, не запускается с ошибкой что не нашёл pg, если его явно включить, требует pg-native (так как использует его). Если явно поставить pg-native, скомпилировать, и включить в бандл, снова ругается что нет pg пакета
- А почему просто папку не запаковать?
- она пару гиг может весить

Main message:
Ну без дев депсов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну без дев депсов

--

## My telegram message #34188
**Time:** 03.10.2019 11:45:56 UTC+05:00
**Link:** https://t.me/nest_ru/34188

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А почему просто папку не запаковать?
- она пару гиг может весить
- Ну без дев депсов
- недавно уменьшил образ докера с ~670 в 2 раза это весь проект

Main message:
Оно по идее тоже самое должно выйти если без дев депсов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Оно по идее тоже самое должно выйти если без дев депсов

--

## My telegram message #34192
**Time:** 03.10.2019 11:47:18 UTC+05:00
**Link:** https://t.me/nest_ru/34192

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это проблемы npm пакетов, хрен знает что туда кидают

Main message:
Фильмы там хранят, малоли если удолять в инете а к тя хопс и в галпе все сезоны игры пристолов, удобно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фильмы там хранят, малоли если удолять в инете а к тя хопс и в галпе все сезоны игры пристолов, удобно

--

## My telegram message #34222
**Time:** 03.10.2019 12:02:06 UTC+05:00
**Link:** https://t.me/nest_ru/34222

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А ты его давно обновлял?
- Он короче хочет вернуть тупо product, что вроде как не подходит ... Есть идей как убрать этот Warning ?
- return !!product
- он хочет упростить условие просто

Main message:
return Boolean(product);

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

return Boolean(product);

--

## My telegram message #34230
**Time:** 03.10.2019 12:04:55 UTC+05:00
**Link:** https://t.me/nest_ru/34230

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а потом думай что там за тип должен быть или undefined или null или хз что
- это шторм меня к ним и приучил(
- Ого а так что можно было ? 😂 Спасибо господа, то что нужно, сразу ясно что будет там.
- хотя я бы предпочел более явное условие типа product !== null ну или undefined

Main message:
а может метод пусть падает если не смог найти и удалить по ид которое ему подсунули, нехер сувать то чего нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а может метод пусть падает если не смог найти и удалить по ид которое ему подсунули, нехер сувать то чего нет

--

## My telegram message #34234
**Time:** 03.10.2019 12:07:05 UTC+05:00
**Link:** https://t.me/nest_ru/34234

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я недавно задумывался насчет такой штуки как Maybe в js обрабатывать код без исключений

Main message:
дыр много будет так

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дыр много будет так

--

## My telegram message #34237
**Time:** 03.10.2019 12:07:34 UTC+05:00
**Link:** https://t.me/nest_ru/34237

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а может метод пусть падает если не смог найти и удалить по ид которое ему подсунули, нехер сувать то чего нет
- я недавно задумывался насчет такой штуки как Maybe в js обрабатывать код без исключений
- дыр много будет так
- подробнее

Main message:
обрабатывали всегда все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

обрабатывали всегда все

--

## My telegram message #34240
**Time:** 03.10.2019 12:09:25 UTC+05:00
**Link:** https://t.me/nest_ru/34240

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- подробнее

Main message:
ну вот в этом примере придется найти и толкьо потом удалить если есть, а вдруг там констрайт какой есть нужно и его найти, придется много всего учитывать и всяко че нить упустишь, пока будешь писать гору проверок, может так)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну вот в этом примере придется найти и толкьо потом удалить если есть, а вдруг там констрайт какой есть нужно и его найти, придется много всего учитывать и всяко че нить упустишь, пока будешь писать гору проверок, может так)

--

## My telegram message #34242
**Time:** 03.10.2019 12:10:55 UTC+05:00
**Link:** https://t.me/nest_ru/34242

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят а можете чутка помочь, с задачей по мулти-тред ? Есть у меня функция которая работает с fs смотрит если есть фото готовое или нужно резать, и хотелось бы сделать ее в несколько потоков, но я первый раз такое делаю, даже не знаю куда смотреть и с чего начать.
- Тоже интересует
- ну вот в этом примере придется найти и толкьо потом удалить если есть, а вдруг там констрайт какой есть нужно и его найти, придется много всего учитывать и всяко че нить упустишь, пока будешь писать гору проверок, может так)
- не понял ниче

Main message:
ну когда обрабатываешь ошибки проще же это, просто выципляешь ошибку базы данных например, утя 15 фк если делать без исключений то придется делать 15 поисков

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну когда обрабатываешь ошибки проще же это, просто выципляешь ошибку базы данных например, утя 15 фк если делать без исключений то придется делать 15 поисков

--

## My telegram message #34291
**Time:** 03.10.2019 20:28:24 UTC+05:00
**Link:** https://t.me/nest_ru/34291

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
монго это вообще про документы, создай поле версион и инкременть)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

монго это вообще про документы, создай поле версион и инкременть)

--

## My telegram message #34294
**Time:** 03.10.2019 20:29:43 UTC+05:00
**Link:** https://t.me/nest_ru/34294

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А где обновить
- В смысле ?
- монго это вообще про документы, создай поле версион и инкременть)
- Я просто хотел как-то сделать это локальными стретсвами, точнее ее timestamp-ом

Main message:
утя бэка время и бд могут по разному быть настроенны

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

утя бэка время и бд могут по разному быть настроенны

--

## My telegram message #34297
**Time:** 03.10.2019 20:30:29 UTC+05:00
**Link:** https://t.me/nest_ru/34297

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- монго это вообще про документы, создай поле версион и инкременть)
- Я просто хотел как-то сделать это локальными стретсвами, точнее ее timestamp-ом
- утя бэка время и бд могут по разному быть настроенны
- Они одинаковые, и чёт не понимаю привет это тут ?

Main message:
я когда с датами работаю тока одному источнику верю или бэку или бд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я когда с датами работаю тока одному источнику верю или бэку или бд

--

## My telegram message #34299
**Time:** 03.10.2019 20:30:48 UTC+05:00
**Link:** https://t.me/nest_ru/34299

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- утя бэка время и бд могут по разному быть настроенны
- Они одинаковые, и чёт не понимаю привет это тут ?
- я когда с датами работаю тока одному источнику верю или бэку или бд
- Мне просто нужно делать расчеты с веременем последнего изменения, а не тупо время.

Main message:
а

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а

--

## My telegram message #34301
**Time:** 03.10.2019 20:31:27 UTC+05:00
**Link:** https://t.me/nest_ru/34301

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Мне просто нужно делать расчеты с веременем последнего изменения, а не тупо время.

Main message:
запросом в бд нельзя эти расчеты сделать?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

запросом в бд нельзя эти расчеты сделать?

--

## My telegram message #34303
**Time:** 03.10.2019 20:32:53 UTC+05:00
**Link:** https://t.me/nest_ru/34303

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а
- 5сли разные сервера, то да. А тут как бы одно железо. Короче делать свое поле нужно и все.
- запросом в бд нельзя эти расчеты сделать?
- Нет

Main message:
а sql можно)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а sql можно)

--

## My telegram message #34305
**Time:** 03.10.2019 20:35:28 UTC+05:00
**Link:** https://t.me/nest_ru/34305

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- запросом в бд нельзя эти расчеты сделать?
- Нет
- а sql можно)
- Не люблю я его. Мне монго по душе

Main message:
монго для документов а не для данных

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

монго для документов а не для данных

--

## My telegram message #34310
**Time:** 03.10.2019 20:36:57 UTC+05:00
**Link:** https://t.me/nest_ru/34310

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а sql можно)
- Не люблю я его. Мне монго по душе
- монго для документов а не для данных
- За аналитику ты зря

Main message:
скан пдфа можно в монго хранить еще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

скан пдфа можно в монго хранить еще

--

## My telegram message #34313
**Time:** 03.10.2019 20:37:33 UTC+05:00
**Link:** https://t.me/nest_ru/34313

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- монго для документов а не для данных
- За аналитику ты зря
- скан пдфа можно в монго хранить еще
- Не спец в бд, и не могу сказать, но вроде она очень даже норм работает с релациями

Main message:
ну лан, не шарю в монго

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну лан, не шарю в монго

--

## My telegram message #34331
**Time:** 03.10.2019 23:38:11 UTC+05:00
**Link:** https://t.me/nest_ru/34331

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ага или s3 какой-нибудь
- Ага
- Я с 4й уже не работал прост
- Меня вот графа начинает бесить, чем тормозит зараза ... 40 товаров идут 120 МС

Main message:
замерь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

замерь

--

## My telegram message #34338
**Time:** 04.10.2019 11:47:16 UTC+05:00
**Link:** https://t.me/nest_ru/34338

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- замерь
- У меня сейчас хранилище на webdav. Изначально делал сервис со всем сразу и ftps с sftp. В итоге оставил только webdav. В этом и прелесть микросервисов модулей контейнеров и т.д. Один раз написал и пользуешься. Хранить в бд это немного для другого. Тоже самое касательно s3 который не такой уж дешевый.
- https://github.com/nestjs/nest/pull/3097
- привет, сообщество! я тут новенький, и есть довольно странный вопрос: как правильно надо смотреть на логотип неста? смотрю, и вижу кисю со сломанной нижней челюстью... это нормально, или есть ещё такие же? это у неё язык там торчит или что?

Main message:
Я раньше думал что это летучая мышь ребенок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я раньше думал что это летучая мышь ребенок

--

## My telegram message #34573
**Time:** 05.10.2019 14:50:53 UTC+05:00
**Link:** https://t.me/nest_ru/34573

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Что бы разобраться обновляться или нет нужно проанализировать код разобраться как это повлияет на все остальное и т.д
- Нужно. А часто ты это делаешь?
- Так потому я и не пользуюсь маленькими либами что бы не смотреть. Если либа решает глобальные задачи которые всем нужны она востребована а если нет скорее всего куда то не туда пошел.. это как минимум повод задуматься.
- Мужики а можете поделится dockerfile-ом если есть у кого-то. Чет у меня получаются огромные images ...

Main message:
собираешь на сиай?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

собираешь на сиай?

--

## My telegram message #34586
**Time:** 05.10.2019 15:10:55 UTC+05:00
**Link:** https://t.me/nest_ru/34586

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Есть разные зависимости дев это то что для разработки на проде девы не нужно ставить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть разные зависимости дев это то что для разработки на проде девы не нужно ставить

--

## My telegram message #34677
**Time:** 07.10.2019 01:03:49 UTC+05:00
**Link:** https://t.me/nest_ru/34677

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не знал, спасибо Полетел делать
- В ангулар для этого есть мульти провайдер. В несте только некоторые провайдеры мульти. Я не помню точно, но кажется явно нельзя указать это
- та сделал проще, один единый сервис в модуле, который через  moduleRef цепляет необходимый класс
- всем привет! похоже я буду писать бек на NestJs (первый бек на ноде) уже начал изобретать велосипеды.. но похоже вовремя остановился :) очень интересно попробовать нест. посмотрел... вроде все, что надо есть даже mailer :)

Main message:
👍🏻

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍🏻

--

## My telegram message #34693
**Time:** 07.10.2019 13:25:58 UTC+05:00
**Link:** https://t.me/nest_ru/34693

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- mailer это вообще самая важная фишка, можно так сказать они его и изобрели)
- Доброе утро, в какую сторону копать не подскажете?
- покажи сервис
- Сто пудов не правильно называется в сервисе репа

Main message:
return Promise.resolve(null)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

return Promise.resolve(null)

--

## My telegram message #34728
**Time:** 07.10.2019 17:45:49 UTC+05:00
**Link:** https://t.me/nest_ru/34728

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Слишком много лишнего кода вызовет это Методов очень много, писать везде одно и то же как-то не круто

Main message:
Можно вынести в декораторы и через катюстомный репозиторий брать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Можно вынести в декораторы и через катюстомный репозиторий брать

--

## My telegram message #34737
**Time:** 07.10.2019 23:30:04 UTC+05:00
**Link:** https://t.me/nest_ru/34737

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Слишком много лишнего кода вызовет это Методов очень много, писать везде одно и то же как-то не круто
- делаю в сервисе как-то так  await this.policy.denyAccessUnlessGranted('canRead', job);
- Можно вынести в декораторы и через катюстомный репозиторий брать
- User(name, userId) - Account(token, accountId, userId) - Account(token, accountId, userId) - Account(token, accountId, userId) Вечер, подскажите typeorm тащит цикличекую стркутуру вот выше, это моя задача перед сериализацией ее обработать?

Main message:
у тя че за база

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя че за база

--

## My telegram message #34739
**Time:** 07.10.2019 23:30:52 UTC+05:00
**Link:** https://t.me/nest_ru/34739

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно вынести в декораторы и через катюстомный репозиторий брать
- User(name, userId) - Account(token, accountId, userId) - Account(token, accountId, userId) - Account(token, accountId, userId) Вечер, подскажите typeorm тащит цикличекую стркутуру вот выше, это моя задача перед сериализацией ее обработать?
- у тя че за база
- postgresql

Main message:
в реляционной бд просто есть fk поле

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в реляционной бд просто есть fk поле

--

## My telegram message #34742
**Time:** 08.10.2019 01:30:04 UTC+05:00
**Link:** https://t.me/nest_ru/34742

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя че за база
- postgresql
- в реляционной бд просто есть fk поле
- слои не сохраняются в билдере и толку нет от отдельныз RUN, чо делать?

Main message:
у меня на разных версиях ноды сортировка по разному работает, вот это вот баг так баг)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня на разных версиях ноды сортировка по разному работает, вот это вот баг так баг)

--

## My telegram message #34746
**Time:** 08.10.2019 01:34:48 UTC+05:00
**Link:** https://t.me/nest_ru/34746

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в реляционной бд просто есть fk поле
- слои не сохраняются в билдере и толку нет от отдельныз RUN, чо делать?
- у меня на разных версиях ноды сортировка по разному работает, вот это вот баг так баг)
- В 11 или 12 добавили stable sort

Main message:
да я 2 месяца назад пофиксил добавив доп условия, но оно опять сломалось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да я 2 месяца назад пофиксил добавив доп условия, но оно опять сломалось

--

## My telegram message #34755
**Time:** 08.10.2019 01:38:47 UTC+05:00
**Link:** https://t.me/nest_ru/34755

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В 11 или 12 добавили stable sort
- да я 2 месяца назад пофиксил добавив доп условия, но оно опять сломалось
- я на ноде больше не сортирую большие объемы как раз из-за этого
- До этого был quicksort

Main message:
а если гарантия что терь все будет хорошо?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а если гарантия что терь все будет хорошо?

--

## My telegram message #34757
**Time:** 08.10.2019 01:39:23 UTC+05:00
**Link:** https://t.me/nest_ru/34757

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я на ноде больше не сортирую большие объемы как раз из-за этого
- До этого был quicksort
- а если гарантия что терь все будет хорошо?
- https://twitter.com/mathias/status/1036626116654637057?s=19

Main message:
у меня комп один, по работе 10, свои штуки на 11

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня комп один, по работе 10, свои штуки на 11

--

## My telegram message #34760
**Time:** 08.10.2019 01:39:40 UTC+05:00
**Link:** https://t.me/nest_ru/34760

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а если гарантия что терь все будет хорошо?
- https://twitter.com/mathias/status/1036626116654637057?s=19
- у меня комп один, по работе 10, свои штуки на 11
- Обновить до 12

Main message:
и nvm туду сюда переключать забываю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и nvm туду сюда переключать забываю

--

## My telegram message #34763
**Time:** 08.10.2019 01:40:58 UTC+05:00
**Link:** https://t.me/nest_ru/34763

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня комп один, по работе 10, свои штуки на 11
- Обновить до 12
- и nvm туду сюда переключать забываю
- А что за проект?)

Main message:
я с Саней работаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я с Саней работаю

--

## My telegram message #34769
**Time:** 08.10.2019 01:43:18 UTC+05:00
**Link:** https://t.me/nest_ru/34769

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и nvm туду сюда переключать забываю
- А что за проект?)
- я с Саней работаю
- Аа)

Main message:
просто мне придется свой прод даунгрейдить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто мне придется свой прод даунгрейдить

--

## My telegram message #34775
**Time:** 08.10.2019 01:45:09 UTC+05:00
**Link:** https://t.me/nest_ru/34775

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я с Саней работаю
- Аа)
- просто мне придется свой прод даунгрейдить
- Ниже stable TimSort

Main message:
ну да я поэтому у ся ее и юзаю, тут не получается, я пробовал чет все как то непошло))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну да я поэтому у ся ее и юзаю, тут не получается, я пробовал чет все как то непошло))

--

## My telegram message #34782
**Time:** 08.10.2019 01:47:04 UTC+05:00
**Link:** https://t.me/nest_ru/34782

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ниже stable TimSort
- ну да я поэтому у ся ее и юзаю, тут не получается, я пробовал чет все как то непошло))
- 😁👍 не пробовал)
- да, годно, но бывает не очень стабильно работает

Main message:
для фанатов жэтбрэйнс хз, скорее всего не подойдет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

для фанатов жэтбрэйнс хз, скорее всего не подойдет

--

## My telegram message #34786
**Time:** 08.10.2019 01:49:10 UTC+05:00
**Link:** https://t.me/nest_ru/34786

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 👍 вообще мне б так из метро кодить буду))

Main message:
неа)) метро отстой))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа)) метро отстой))

--

## My telegram message #34790
**Time:** 08.10.2019 01:50:45 UTC+05:00
**Link:** https://t.me/nest_ru/34790

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и ещё радует что при сборке пк не напрягается, а где-то там сервер за несколько тысяч километров
- 👍 вообще мне б так из метро кодить буду))
- неа)) метро отстой))
- Я ща кубер курс прохожу из метро))

Main message:
я пока видосы смарю по 4 раза чтобы понять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я пока видосы смарю по 4 раза чтобы понять

--

## My telegram message #34792
**Time:** 08.10.2019 01:50:53 UTC+05:00
**Link:** https://t.me/nest_ru/34792

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- неа)) метро отстой))
- Я ща кубер курс прохожу из метро))
- я пока видосы смарю по 4 раза чтобы понять
- Правда тренируюсь на работе ща как раз эра депдоя)

Main message:
нафиг оно надо когда есть композер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нафиг оно надо когда есть композер

--

## My telegram message #34796
**Time:** 08.10.2019 01:52:19 UTC+05:00
**Link:** https://t.me/nest_ru/34796

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я пока видосы смарю по 4 раза чтобы понять
- Правда тренируюсь на работе ща как раз эра депдоя)
- нафиг оно надо когда есть композер
- Ну тут все от задачи, и от компании итд. Но осознание что ты тупо можешь все контролировать не даёт мне покоя

Main message:
ты и в композере все контролишь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты и в композере все контролишь

--

## My telegram message #34802
**Time:** 08.10.2019 01:53:23 UTC+05:00
**Link:** https://t.me/nest_ru/34802

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нафиг оно надо когда есть композер
- Ну тут все от задачи, и от компании итд. Но осознание что ты тупо можешь все контролировать не даёт мне покоя
- ты и в композере все контролишь
- Мы в сварме раньше сидели

Main message:
это как прикол пунтосвитчера, люди так привыкают что в какойто момент уже пернестают знать что есть две раскладки - я видел таких людей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это как прикол пунтосвитчера, люди так привыкают что в какойто момент уже пернестают знать что есть две раскладки - я видел таких людей

--

## My telegram message #34804
**Time:** 08.10.2019 01:54:14 UTC+05:00
**Link:** https://t.me/nest_ru/34804

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну тут все от задачи, и от компании итд. Но осознание что ты тупо можешь все контролировать не даёт мне покоя
- ты и в композере все контролишь
- Мы в сварме раньше сидели
- это как прикол пунтосвитчера, люди так привыкают что в какойто момент уже пернестают знать что есть две раскладки - я видел таких людей

Main message:
ну я флант меня смарю, так то тема

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я флант меня смарю, так то тема

--

## My telegram message #34807
**Time:** 08.10.2019 01:54:32 UTC+05:00
**Link:** https://t.me/nest_ru/34807

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мы в сварме раньше сидели
- это как прикол пунтосвитчера, люди так привыкают что в какойто момент уже пернестают знать что есть две раскладки - я видел таких людей
- ну я флант меня смарю, так то тема
- Куб позволяет тебе скейлиться изи

Main message:
но нужно обкатать сервано на своих, иначе непонятно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

но нужно обкатать сервано на своих, иначе непонятно

--

## My telegram message #34810
**Time:** 08.10.2019 01:54:56 UTC+05:00
**Link:** https://t.me/nest_ru/34810

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я флант меня смарю, так то тема
- Куб позволяет тебе скейлиться изи
- но нужно обкатать сервано на своих, иначе непонятно
- Канареечную раскатку

Main message:
ну блин копирни композ файлы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну блин копирни композ файлы

--

## My telegram message #34814
**Time:** 08.10.2019 01:55:57 UTC+05:00
**Link:** https://t.me/nest_ru/34814

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- но нужно обкатать сервано на своих, иначе непонятно
- Канареечную раскатку
- ну блин копирни композ файлы
- Кароче четкая тема

Main message:
ну пока я сам у ся не поюзаю не пойму профит, так то я все побырому на кубер перевел и оно работает, теперь хочу понят что я сделал)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну пока я сам у ся не поюзаю не пойму профит, так то я все побырому на кубер перевел и оно работает, теперь хочу понят что я сделал)

--

## My telegram message #34817
**Time:** 08.10.2019 01:56:35 UTC+05:00
**Link:** https://t.me/nest_ru/34817

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну блин копирни композ файлы
- Кароче четкая тема
- ну пока я сам у ся не поюзаю не пойму профит, так то я все побырому на кубер перевел и оно работает, теперь хочу понят что я сделал)
- Но я сам не против композа)

Main message:
да с этого и началось по туториалу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да с этого и началось по туториалу)

--

## My telegram message #34822
**Time:** 08.10.2019 01:58:15 UTC+05:00
**Link:** https://t.me/nest_ru/34822

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну пока я сам у ся не поюзаю не пойму профит, так то я все побырому на кубер перевел и оно работает, теперь хочу понят что я сделал)
- Но я сам не против композа)
- да с этого и началось по туториалу)
- Натренишься

Main message:
ты видел да игру про контейнеры?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты видел да игру про контейнеры?

--

## My telegram message #34825
**Time:** 08.10.2019 01:58:45 UTC+05:00
**Link:** https://t.me/nest_ru/34825

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да с этого и началось по туториалу)
- Натренишься
- ты видел да игру про контейнеры?
- Неа

Main message:
Просто  лучший клиент для докера  #docker  #инструменты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Просто  лучший клиент для докера  #docker  #инструменты

--

## My telegram message #34827
**Time:** 08.10.2019 01:59:42 UTC+05:00
**Link:** https://t.me/nest_ru/34827

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты видел да игру про контейнеры?
- Неа
- Просто  лучший клиент для докера  #docker  #инструменты
- Лол чекну завтра

Main message:
просто эта штука меня надоумила на платфору для ангулар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто эта штука меня надоумила на платфору для ангулар

--

## My telegram message #34830
**Time:** 08.10.2019 02:00:11 UTC+05:00
**Link:** https://t.me/nest_ru/34830

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Просто  лучший клиент для докера  #docker  #инструменты
- Лол чекну завтра
- просто эта штука меня надоумила на платфору для ангулар
- Что за платформу?

Main message:
ну кодить на анг под майнкрафт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну кодить на анг под майнкрафт

--

## My telegram message #34832
**Time:** 08.10.2019 02:00:23 UTC+05:00
**Link:** https://t.me/nest_ru/34832

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- просто эта штука меня надоумила на платфору для ангулар
- Что за платформу?
- ну кодить на анг под майнкрафт
- Аа

Main message:
рендер будт майнкрафт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

рендер будт майнкрафт

--

## My telegram message #34834
**Time:** 08.10.2019 02:00:59 UTC+05:00
**Link:** https://t.me/nest_ru/34834

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy ты же знаешь, что в какой-то версии ноды в сортировке поменялось тупо что надо возвращать. Тип раньше было больше, а теперь надо меньше

Main message:
эт походу ужен третяя смена

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эт походу ужен третяя смена

--

## My telegram message #34839
**Time:** 08.10.2019 02:02:31 UTC+05:00
**Link:** https://t.me/nest_ru/34839

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- рендер будт майнкрафт
- @KaufmanEndy ты же знаешь, что в какой-то версии ноды в сортировке поменялось тупо что надо возвращать. Тип раньше было больше, а теперь надо меньше
- эт походу ужен третяя смена
- https://github.com/nodejs/node/issues/24294

Main message:
да я ща на 10 выставляю все, и тесты переписываю, просто время потратил на херню

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да я ща на 10 выставляю все, и тесты переписываю, просто время потратил на херню

--

## My telegram message #34854
**Time:** 08.10.2019 09:58:33 UTC+05:00
**Link:** https://t.me/nest_ru/34854

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Подскажите как заставить typeorm не подгружать вложенные сущности

Main message:
По дефолту не подгружает, если игоря выставить в тру, тогда подгрузит, через квери билдер грузит только то что указал, советую его юзать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

По дефолту не подгружает, если игоря выставить в тру, тогда подгрузит, через квери билдер грузит только то что указал, советую его юзать

--

## My telegram message #34888
**Time:** 08.10.2019 11:51:58 UTC+05:00
**Link:** https://t.me/nest_ru/34888

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и вы хотите написать клиент для бекенда ( nestjs ) на nestjs ?
- да, если это возможно
- ага, теперь понял в чем вопрос ) посмотрите на  https://docs.nestjs.com/application-context концепцию думаю придумаете для себя const sdk = new NestSDK(options); await sdk.init(); sdk.callSomeRoute(params); // sdk  class NestSDK { public async init() { this.app = await NestFactory.createApplicationContext(SDKApplicationModule); } public async callSomeRoute(params) { // use nestjs http client } }
- спасибо, почитаю

Main message:
Да ему походу просто модуль нужен который в нпм регистр можно поместить и людям давать тем кто юзает нест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да ему походу просто модуль нужен который в нпм регистр можно поместить и людям давать тем кто юзает нест

--

## My telegram message #34895
**Time:** 08.10.2019 11:53:40 UTC+05:00
**Link:** https://t.me/nest_ru/34895

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- клиент будет на nestjs который через http client лазит на бекенд

Main message:
Ну он же уточняет что бэк на несте, значит тесная интеграция, а это модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну он же уточняет что бэк на несте, значит тесная интеграция, а это модуль

--

## My telegram message #34912
**Time:** 08.10.2019 15:59:06 UTC+05:00
**Link:** https://t.me/nest_ru/34912

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- пиши тут вопрос)
- Привет. Слушай я тут начал работать с nx и у меня вопросы: 1. Нормально ли это что все проекты у меня в angular.json ? 2. Как мне првильно сейчас сделать деплой приложение по контейнерам ? Просто получается что есть один глобальный package.json а нест без ядра не хочет же работать в контейнере...
- 1. да, нормально 2. не очень понял проблему
- Мне приложения backend (из 4) нужно запускать каждую в свой контейнер. Так вот вопрос, получается что мне нужно сделать билб всего и после этого уже брать нужные мне куски из dist и переносить в контейнеры. Так ?

Main message:
в контейнер не должны попасть дев зависимости

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в контейнер не должны попасть дев зависимости

--

## My telegram message #34915
**Time:** 08.10.2019 16:06:20 UTC+05:00
**Link:** https://t.me/nest_ru/34915

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 1. да, нормально 2. не очень понял проблему
- Мне приложения backend (из 4) нужно запускать каждую в свой контейнер. Так вот вопрос, получается что мне нужно сделать билб всего и после этого уже брать нужные мне куски из dist и переносить в контейнеры. Так ?
- в контейнер не должны попасть дев зависимости
- Хммм. Тоже идея. А создавать в apps/backend нельзя package.json ?

Main message:
Ну там и лежало у меня

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну там и лежало у меня

--

## My telegram message #34920
**Time:** 08.10.2019 16:11:37 UTC+05:00
**Link:** https://t.me/nest_ru/34920

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в контейнер не должны попасть дев зависимости
- Хммм. Тоже идея. А создавать в apps/backend нельзя package.json ?
- Ну там и лежало у меня
- Сейчас сделаю перенос проекта на этот nx и когда буду собирать еще напишу. Вроде как понятно, но все таки ... Спасибо за ответы ребят.

Main message:
Руками делать, изучая примеры

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Руками делать, изучая примеры

--

## My telegram message #34925
**Time:** 08.10.2019 16:13:03 UTC+05:00
**Link:** https://t.me/nest_ru/34925

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну там и лежало у меня
- Сейчас сделаю перенос проекта на этот nx и когда буду собирать еще напишу. Вроде как понятно, но все таки ... Спасибо за ответы ребят.
- Руками делать, изучая примеры
- Да я чет смотрел в доках nx чет не особо там про это говорят ...

Main message:
https://rucken.io/cli

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://rucken.io/cli

--

## My telegram message #34930
**Time:** 08.10.2019 16:22:13 UTC+05:00
**Link:** https://t.me/nest_ru/34930

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Руками делать, изучая примеры
- Да я чет смотрел в доках nx чет не особо там про это говорят ...
- https://rucken.io/cli
- А как заставить WebStorm понимать эти libs ?

Main message:
Тспатчи же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тспатчи же

--

## My telegram message #34934
**Time:** 08.10.2019 16:22:43 UTC+05:00
**Link:** https://t.me/nest_ru/34934

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://rucken.io/cli
- А как заставить WebStorm понимать эти libs ?
- Тспатчи же
- "paths": { " @auction -workspace/interfaces": ["libs/interfaces/src/index.ts"] }

Main message:
У меня глянь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня глянь

--

## My telegram message #34940
**Time:** 08.10.2019 16:26:29 UTC+05:00
**Link:** https://t.me/nest_ru/34940

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тспатчи же
- "paths": { " @auction -workspace/interfaces": ["libs/interfaces/src/index.ts"] }
- У меня глянь
- А вот это entity entity to app ,что из себя представляют

Main message:
Там привязка гуи к аппе, разные аппы могут разными модулями обладать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там привязка гуи к аппе, разные аппы могут разными модулями обладать

--

## My telegram message #34944
**Time:** 08.10.2019 16:28:28 UTC+05:00
**Link:** https://t.me/nest_ru/34944

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну вот , отдельно от ангуляра

Main message:
Да я начинал реакт ещё прикручивать к этой штуке

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да я начинал реакт ещё прикручивать к этой штуке

--

## My telegram message #34948
**Time:** 08.10.2019 16:29:51 UTC+05:00
**Link:** https://t.me/nest_ru/34948

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Это описание сервисов для взаимодействия на фронте, вроде универсально должно быть

Main message:
Тут для ангулара, в варианте среактом там на редакс обзервабл делал, там кросс фрэймово получалось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тут для ангулара, в варианте среактом там на редакс обзервабл делал, там кросс фрэймово получалось

--

## My telegram message #34954
**Time:** 08.10.2019 16:38:31 UTC+05:00
**Link:** https://t.me/nest_ru/34954

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Я пишу export * from 'blah';

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я пишу export * from 'blah';

--

## My telegram message #34956
**Time:** 08.10.2019 16:39:04 UTC+05:00
**Link:** https://t.me/nest_ru/34956

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- typescript language server в шторме перезапусти
- Так еще есть вопрос. Почему он говорит что мол нету экспорта если он есть по факту ?
- а в lib/order.interface.ts что?
- Я пишу export * from 'blah';

Main message:
Index.ts не делай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Index.ts не делай

--

## My telegram message #34960
**Time:** 08.10.2019 16:39:54 UTC+05:00
**Link:** https://t.me/nest_ru/34960

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а в lib/order.interface.ts что?
- Я пишу export * from 'blah';
- Index.ts не делай
- не слушай дядю) в модуле только так и надо

Main message:
В рамках либы и аппы лучше такое не делать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В рамках либы и аппы лучше такое не делать

--

## My telegram message #34962
**Time:** 08.10.2019 16:40:17 UTC+05:00
**Link:** https://t.me/nest_ru/34962

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Index.ts не делай
- не слушай дядю) в модуле только так и надо
- В рамках либы и аппы лучше такое не делать
- у него это как раз либа

Main message:
Нетже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нетже

--

## My telegram message #34988
**Time:** 08.10.2019 18:18:05 UTC+05:00
**Link:** https://t.me/nest_ru/34988

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Я эту штуку в модуль инит пихал чтобы при старте создавались тайпинги

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я эту штуку в модуль инит пихал чтобы при старте создавались тайпинги

--

## My telegram message #35010
**Time:** 08.10.2019 19:45:25 UTC+05:00
**Link:** https://t.me/nest_ru/35010

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А пофиг куда ее пихать, я вот не могу понять, это прикол от модуля graphql или что-то не так понял этот nx...

Main message:
В nx можно делать генераторы схематик, вот они как бы компилятся перед запуском, ты пытаешся скрипт в генератор превратить?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В nx можно делать генераторы схематик, вот они как бы компилятся перед запуском, ты пытаешся скрипт в генератор превратить?

--

## My telegram message #35084
**Time:** 08.10.2019 21:57:53 UTC+05:00
**Link:** https://t.me/nest_ru/35084

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
если сср то куки да, а как еще то

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если сср то куки да, а как еще то

--

## My telegram message #35086
**Time:** 08.10.2019 21:58:34 UTC+05:00
**Link:** https://t.me/nest_ru/35086

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Так cloud и есть максимум
- шо ж вы такие ребята хаваете новомодные слова господи кубер это целая экосистема ты не бекендом тогда должен заниматься а только кубером
- если сср то куки да, а как еще то
- Хм, localstorage ?

Main message:
он локальный

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он локальный

--

## My telegram message #35147
**Time:** 08.10.2019 23:10:55 UTC+05:00
**Link:** https://t.me/nest_ru/35147

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мб вопрос немного не свойственный для конфы по несту
- Маленький сервер с бд в России, а вся мощь за бугром
- @sllavvicc пройди чуть вверх по треду. Там Ильшат подменил через что запускать. Работает лучше, возможно решит твою проблему
- Походу то что нужно. Я теперь понял что за прикол.

Main message:
есть же чета про нативную авторизацию я в нее верю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть же чета про нативную авторизацию я в нее верю

--

## My telegram message #35149
**Time:** 08.10.2019 23:11:28 UTC+05:00
**Link:** https://t.me/nest_ru/35149

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @sllavvicc пройди чуть вверх по треду. Там Ильшат подменил через что запускать. Работает лучше, возможно решит твою проблему
- Походу то что нужно. Я теперь понял что за прикол.
- есть же чета про нативную авторизацию я в нее верю
- а  @js_ru закрытая группа или меня только не пускает?

Main message:
тока что зашел норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тока что зашел норм

--

## My telegram message #35166
**Time:** 09.10.2019 11:12:13 UTC+05:00
**Link:** https://t.me/nest_ru/35166

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Че за файлы такие, ты не тайп графом пользуешся чтоли?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Че за файлы такие, ты не тайп графом пользуешся чтоли?

--

## My telegram message #35170
**Time:** 09.10.2019 11:17:18 UTC+05:00
**Link:** https://t.me/nest_ru/35170

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет) __dirnme это путь к папке, где файл текущий файл лежит
- Правильно. Я делаю console.log в main.ts который в apps/backend/main
- Че за файлы такие, ты не тайп графом пользуешся чтоли?
- Так проблема не только в том что я работаю с graphlq но и в том что у меня есть сервис который отдает статику, и тут тоже проблема потому что мне нужно отдавить файлы из workspace/apps/backend/main/public а он блин видет workspace/dist/apps/backend/main/public

Main message:
Статик файлы бэка типа?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Статик файлы бэка типа?

--

## My telegram message #35174
**Time:** 09.10.2019 11:18:02 UTC+05:00
**Link:** https://t.me/nest_ru/35174

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не, там тупо фотки

Main message:
Сдн подними и урл абсолютный дай им

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сдн подними и урл абсолютный дай им

--

## My telegram message #35178
**Time:** 09.10.2019 11:19:20 UTC+05:00
**Link:** https://t.me/nest_ru/35178

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не, там тупо фотки

Main message:
И у меня не было проблем с путями, я билдю не веб паком а tsc

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

И у меня не было проблем с путями, я билдю не веб паком а tsc

--

## My telegram message #35182
**Time:** 09.10.2019 11:22:14 UTC+05:00
**Link:** https://t.me/nest_ru/35182

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В смысле дефолтный который
- Только мне кажется что это целые костыли для того что бы тупо шарить одну либу между бэком и фронтом ?
- И у меня не было проблем с путями, я билдю не веб паком а tsc
- Я к тому что вроде как и прикольный этот nx, но в то же время я понимаю что походу столько проблем с ним могут быть что просто ужас... Если я тупо не могу работать с файлами, то что будет потом ? Даже не хочу предстовлять 😭😭😭

Main message:
Там енв подменялись я поэтому отказался от веб пака

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там енв подменялись я поэтому отказался от веб пака

--

## My telegram message #35186
**Time:** 09.10.2019 11:37:53 UTC+05:00
**Link:** https://t.me/nest_ru/35186

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- И у меня не было проблем с путями, я билдю не веб паком а tsc
- Я к тому что вроде как и прикольный этот nx, но в то же время я понимаю что походу столько проблем с ним могут быть что просто ужас... Если я тупо не могу работать с файлами, то что будет потом ? Даже не хочу предстовлять 😭😭😭
- Там енв подменялись я поэтому отказался от веб пака
- Так эту проблему можно как-то решить ? Или лучше отказаться от него и работать себе как и всегда ...

Main message:
тебе Кулагин скидывал мой конфиг уже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тебе Кулагин скидывал мой конфиг уже

--

## My telegram message #35193
**Time:** 09.10.2019 13:22:02 UTC+05:00
**Link:** https://t.me/nest_ru/35193

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 😂😂😂😂😂😂😂😂😂😂😂😂😂😂😂 Когда ты решил посмотреть что же там в nestjs monorepo и он не заработал ... Короче мне походу не везет с этими monorepo.

Main message:
сыну всегда говорю: если долго мучиться, что-нить получится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сыну всегда говорю: если долго мучиться, что-нить получится

--

## My telegram message #35195
**Time:** 09.10.2019 13:23:08 UTC+05:00
**Link:** https://t.me/nest_ru/35195

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нет, у меня там бэк
- ошибка прсто стандартная когда не правильно импортишь через require
- сыну всегда говорю: если долго мучиться, что-нить получится
- Ага ... Вот только можно сломать пару мониторов по дороге ... 😂😂😂

Main message:
да он уже у телефона стекло прокусил так, и клава смарю покусанная)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да он уже у телефона стекло прокусил так, и клава смарю покусанная)

--

## My telegram message #35197
**Time:** 09.10.2019 13:24:51 UTC+05:00
**Link:** https://t.me/nest_ru/35197

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сыну всегда говорю: если долго мучиться, что-нить получится
- Ага ... Вот только можно сломать пару мониторов по дороге ... 😂😂😂
- да он уже у телефона стекло прокусил так, и клава смарю покусанная)
- 😂😂😂😂 что-то его сильно бесит видимо. Может тоже пытается запустить nx ?

Main message:
nx по сути это просто монорепа ангулара

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

nx по сути это просто монорепа ангулара

--

## My telegram message #35202
**Time:** 09.10.2019 13:25:38 UTC+05:00
**Link:** https://t.me/nest_ru/35202

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да он уже у телефона стекло прокусил так, и клава смарю покусанная)
- 😂😂😂😂 что-то его сильно бесит видимо. Может тоже пытается запустить nx ?
- nx по сути это просто монорепа ангулара
- Вот тут и проблема.

Main message:
ну я тока командный билдер юзаю и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я тока командный билдер юзаю и все

--

