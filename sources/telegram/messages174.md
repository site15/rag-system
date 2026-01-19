## My telegram message #187578
**Time:** 09.09.2022 23:36:59 UTC+05:00
**Link:** https://t.me/nest_ru/187578

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я вместо коммандера выбрал себе  https://gitlab.com/aa900031/nestjs-command#readme мне он показался куда удобнее, рекомендую)

Main message:
https://www.npmjs.com/package/@squareboat/nest-console я это юзаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://www.npmjs.com/package/@squareboat/nest-console я это юзаю

--

## My telegram message #187580
**Time:** 09.09.2022 23:55:28 UTC+05:00
**Link:** https://t.me/nest_ru/187580

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://www.npmjs.com/package/@squareboat/nest-console я это юзаю

Main message:
сори промахнулся, вот что я юзаю  https://www.npmjs.com/package/nestjs-console )

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сори промахнулся, вот что я юзаю  https://www.npmjs.com/package/nestjs-console )

--

## My telegram message #187585
**Time:** 10.09.2022 00:59:44 UTC+05:00
**Link:** https://t.me/nest_ru/187585

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а так всё как всегда, делаешь экспорты сервисов
- https://www.npmjs.com/package/@squareboat/nest-console я это юзаю
- сори промахнулся, вот что я юзаю  https://www.npmjs.com/package/nestjs-console )
- привет, может кто-то сталкивался с подобным: хочу вынести контекст google drive'a в конструктор сервиса, для этого нужно получить user'a (чтобы забрать у него домен из email'a), для этого использую  @Inject (REQUEST) в google drive service, чтобы получить юзера при отправке запроса на сервер, но в итоге получается так, что service инициализируется раньше, чем controller, и соответственно user приходит undefined в constructor'e сервиса, и только уже при вызове методов из этого сервиса user приходит как нужно (для аутентификации user'a использую passport-jwt)

Main message:
все работает как нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все работает как нужно

--

## My telegram message #187589
**Time:** 10.09.2022 01:02:48 UTC+05:00
**Link:** https://t.me/nest_ru/187589

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сори промахнулся, вот что я юзаю  https://www.npmjs.com/package/nestjs-console )
- привет, может кто-то сталкивался с подобным: хочу вынести контекст google drive'a в конструктор сервиса, для этого нужно получить user'a (чтобы забрать у него домен из email'a), для этого использую  @Inject (REQUEST) в google drive service, чтобы получить юзера при отправке запроса на сервер, но в итоге получается так, что service инициализируется раньше, чем controller, и соответственно user приходит undefined в constructor'e сервиса, и только уже при вызове методов из этого сервиса user приходит как нужно (для аутентификации user'a использую passport-jwt)
- все работает как нужно
- да

Main message:
Скинь оба сервиса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Скинь оба сервиса

--

## My telegram message #187595
**Time:** 10.09.2022 01:19:13 UTC+05:00
**Link:** https://t.me/nest_ru/187595

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все работает как нужно
- да
- Скинь оба сервиса
- есть контроллер, с помощью которого идет запрос, и сейчас мы достаем домен отсюда (первый скриншот), но в идеале доставать этот домен в сервисе google drive'a, чтобы вынести контекст в конструктор (второй и третий скриншот)

Main message:
Всё должно работать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Всё должно работать

--

## My telegram message #187599
**Time:** 10.09.2022 01:22:45 UTC+05:00
**Link:** https://t.me/nest_ru/187599

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Скинь оба сервиса
- есть контроллер, с помощью которого идет запрос, и сейчас мы достаем домен отсюда (первый скриншот), но в идеале доставать этот домен в сервисе google drive'a, чтобы вынести контекст в конструктор (второй и третий скриншот)
- Всё должно работать
- если прологгировать контроллер и сервис, то получается такая картина: сервис отрабатывает раньше, чем контроллер, и из-за этого user получается undefined еще как вариант - контроллер не успевает его пропустить через  @UseGuards(AuthGuard(  JwtStrategyName  ))

Main message:
А зачем не хочешь по нормальному юзать, просто докидывать с контроллера? У тебя же память для скоупов кушается и проц

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А зачем не хочешь по нормальному юзать, просто докидывать с контроллера? У тебя же память для скоупов кушается и проц

--

## My telegram message #187603
**Time:** 10.09.2022 01:26:30 UTC+05:00
**Link:** https://t.me/nest_ru/187603

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всё должно работать
- если прологгировать контроллер и сервис, то получается такая картина: сервис отрабатывает раньше, чем контроллер, и из-за этого user получается undefined еще как вариант - контроллер не успевает его пропустить через  @UseGuards(AuthGuard(  JwtStrategyName  ))
- А зачем не хочешь по нормальному юзать, просто докидывать с контроллера? У тебя же память для скоупов кушается и проц
- сейчас я это делаю по запросу тех. лида из-за следующей проблемы: у нас загружаются файлы асинхронно, из-за этого при первой загрузке производятся параллельные проверки на наличие папок, все они отдадут результат о том, что папки нет, и в итоге создастся количество папок равносильное количеству файлов, но при этом все файлы загрузятся только в одну

Main message:
Вообще нужно через очередь гнать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вообще нужно через очередь гнать

--

## My telegram message #187608
**Time:** 10.09.2022 01:27:58 UTC+05:00
**Link:** https://t.me/nest_ru/187608

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А зачем не хочешь по нормальному юзать, просто докидывать с контроллера? У тебя же память для скоупов кушается и проц
- сейчас я это делаю по запросу тех. лида из-за следующей проблемы: у нас загружаются файлы асинхронно, из-за этого при первой загрузке производятся параллельные проверки на наличие папок, все они отдадут результат о том, что папки нет, и в итоге создастся количество папок равносильное количеству файлов, но при этом все файлы загрузятся только в одну
- Вообще нужно через очередь гнать
- Что через очередь гнать?)) гонишь?))

Main message:
Ну проверку через очередь, а файлы грузить в темп, и потом по очереди раскидывать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну проверку через очередь, а файлы грузить в темп, и потом по очереди раскидывать

--

## My telegram message #187611
**Time:** 10.09.2022 01:28:32 UTC+05:00
**Link:** https://t.me/nest_ru/187611

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Что через очередь гнать?)) гонишь?))
- Ну проверку через очередь, а файлы грузить в темп, и потом по очереди раскидывать
- у нас проект не будет для такого огромного кол-ва пользователей, не думаю, что все поляжет
- В микросервисы идти надо когда понимаешь плюсы и минусы

Main message:
Нет тут микро сервисов я про очередь в монолите

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нет тут микро сервисов я про очередь в монолите

--

## My telegram message #187613
**Time:** 10.09.2022 01:29:26 UTC+05:00
**Link:** https://t.me/nest_ru/187613

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у нас проект не будет для такого огромного кол-ва пользователей, не думаю, что все поляжет
- В микросервисы идти надо когда понимаешь плюсы и минусы
- Нет тут микро сервисов я про очередь в монолите
- Если полтора админа заливают файл в гугл или из гугла, то ничего не рухнет

Main message:
Ну скоуп реквест тоже не круто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну скоуп реквест тоже не круто

--

## My telegram message #187616
**Time:** 10.09.2022 01:30:15 UTC+05:00
**Link:** https://t.me/nest_ru/187616

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нет тут микро сервисов я про очередь в монолите
- Если полтора админа заливают файл в гугл или из гугла, то ничего не рухнет
- Ну скоуп реквест тоже не круто
- А на чем очередь лепить?

Main message:
Может у него части разъехались из за скоупа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Может у него части разъехались из за скоупа

--

## My telegram message #187618
**Time:** 10.09.2022 01:30:31 UTC+05:00
**Link:** https://t.me/nest_ru/187618

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А на чем очередь лепить?

Main message:
Да хоть евент еммитер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да хоть евент еммитер

--

## My telegram message #187620
**Time:** 10.09.2022 01:31:01 UTC+05:00
**Link:** https://t.me/nest_ru/187620

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Может у него части разъехались из за скоупа
- А как ответ дать из реста?)) это надо генерить из фронта ожидание ответа...
- Да хоть евент еммитер
- Эм... Не похоже на очередь.

Main message:
Subject

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Subject

--

