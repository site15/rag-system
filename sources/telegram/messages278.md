## My telegram message #311266
**Time:** 29.08.2024 14:18:59 UTC+05:00
**Link:** https://t.me/nest_ru/311266

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет, я подозреваю, что ты используешь этот гуард только в CurrencyController, следовательно он у тебя в модуле CurrencyModule, затем в самом гуарде у тебя есть AuthenticationService и UserSessionService, которые так же у тебя находятся в разных модулях UserSessionModule и AuthenticationModule соответственно. Чтобы гуард работал у тебя как ты планируешь, нужно импортировать UserSessionModule и AuthenticationModule в CurrencyModule, что подозреваю вызовет у тебя циклические зависимости, так что как вариант лучше переделать логику гуарда
- у меня гарда используется везде кроме двух контроллеров, один из которых авторизации и там он только в методе логаута, а во втором используются другая гарда
- di страдает у тебя, дружище, изучи поглубже
- Ну это сути не меняет, тут явно с DI проблемы, что тебе и писали

Main message:
удали все модули и запровайди в главный AppModule

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

удали все модули и запровайди в главный AppModule

--

## My telegram message #311270
**Time:** 29.08.2024 14:23:15 UTC+05:00
**Link:** https://t.me/nest_ru/311270

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у всех контроллеров и сервисов убрать модули и сделать один апп?

Main message:
ага, я там расписал когда нужны модули, если нет причин из этого списка, то и модули не нужны

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, я там расписал когда нужны модули, если нет причин из этого списка, то и модули не нужны

--

## My telegram message #311272
**Time:** 29.08.2024 14:26:56 UTC+05:00
**Link:** https://t.me/nest_ru/311272

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у всех контроллеров и сервисов убрать модули и сделать один апп?
- итак, я уже задавал тут вопросы про bybit api. Был послан гуглить (что я итак делал). Я потыкал всё апи. Вопрос такой: я так понимаю что апи предназначено только для владельца ключей. То есть нет каких то методов oauth, например для перевода между кошельками разных аккаунтов. Ни в апи ни в инете я эту инфу не нашёл, даже (простите меня) гпт говорит что апи не может делать так. Если кто то сталкивался с апишкой bybit, скажите пожалуйста, это так? Мой предварительный ответ - да так
- ага, я там расписал когда нужны модули, если нет причин из этого списка, то и модули не нужны
- а я думал архитекторно как сущности должны существовать модули...

Main message:
не должны, они созданы для решения конкретных проблем, если нет таких проблем то и нет смысла создавать модули ради модулей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не должны, они созданы для решения конкретных проблем, если нет таких проблем то и нет смысла создавать модули ради модулей

--

## My telegram message #311276
**Time:** 29.08.2024 14:30:17 UTC+05:00
**Link:** https://t.me/nest_ru/311276

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ага, я там расписал когда нужны модули, если нет причин из этого списка, то и модули не нужны
- а я думал архитекторно как сущности должны существовать модули...
- не должны, они созданы для решения конкретных проблем, если нет таких проблем то и нет смысла создавать модули ради модулей
- понял понял

Main message:
просто в идеальном мире кодинга, мы сперва пишем тесты и только потом код и в таком мире модуль сразу появляестя сам по себе из факта написания теста

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто в идеальном мире кодинга, мы сперва пишем тесты и только потом код и в таком мире модуль сразу появляестя сам по себе из факта написания теста

--

## My telegram message #311317
**Time:** 29.08.2024 17:00:14 UTC+05:00
**Link:** https://t.me/nest_ru/311317

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А что мешает уже сейчас сделать так? Допустим app1 выдал токен и его же использовать в app2?

Main message:
так нельзя делать, тогда лучше ссо запилить как третье приложение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так нельзя делать, тогда лучше ссо запилить как третье приложение

--

## My telegram message #311319
**Time:** 29.08.2024 17:00:43 UTC+05:00
**Link:** https://t.me/nest_ru/311319

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Это самый быстрый вариант, как много подводных камней в таком способе?

Main message:
быстрый вариант схлопнуть в одно приложение)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

быстрый вариант схлопнуть в одно приложение)

--

## My telegram message #311323
**Time:** 29.08.2024 17:01:43 UTC+05:00
**Link:** https://t.me/nest_ru/311323

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так нельзя делать, тогда лучше ссо запилить как третье приложение
- почему нельзя?
- быстрый вариант схлопнуть в одно приложение)
- Ну это уже так, последствие

Main message:
распутывать будут годами потом эти хитросплетения

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

распутывать будут годами потом эти хитросплетения

--

## My telegram message #311331
**Time:** 29.08.2024 17:02:59 UTC+05:00
**Link:** https://t.me/nest_ru/311331

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Single Sign-In?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #311337
**Time:** 29.08.2024 17:05:22 UTC+05:00
**Link:** https://t.me/nest_ru/311337

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Чат предполагаю использовать и в других приложениях, так что идея монолита сразу откинул
- Вопрос обширный, без конкретной задачи, посоветовать будет что то трудно
- Ну, мне просто теории немного надо было услышать
- sso в целом такая тема, обьемная

Main message:
ссо начинается там где нужно в два разных сайта входить по одному логину

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ссо начинается там где нужно в два разных сайта входить по одному логину

--

## My telegram message #311343
**Time:** 29.08.2024 17:06:58 UTC+05:00
**Link:** https://t.me/nest_ru/311343

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да, все верно

Main message:
значит это не приложение а сервис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

значит это не приложение а сервис

--

## My telegram message #311347
**Time:** 29.08.2024 17:07:57 UTC+05:00
**Link:** https://t.me/nest_ru/311347

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- значит это не приложение а сервис
- Уффф, терминология
- Пазл начинает складываться, я сразу извинился за терминологию :)
- в целом возьми и сделай так, как будет быстрее - сейчас, дальше уже разберешься

Main message:
site.com/api/admin - монолит где авторизация  site.com/api/chat - сервис чатов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

site.com/api/admin - монолит где авторизация  site.com/api/chat - сервис чатов

--

## My telegram message #311358
**Time:** 29.08.2024 18:05:16 UTC+05:00
**Link:** https://t.me/nest_ru/311358

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Платные?

Main message:
я вот это втыкаю везде  https://authorizer.dev/ , на первое время для разработки фич и проработки логик норм, весь кастом с боку прикручиваю, по завершению уже оцениваю обьем кастома который будет нужен от сервера авторизации и уже принимаю решение брать чет готовое но более масштабнее, либо взять одно готовое нестовое из других проектов своих и воткнуть и обвешать кастомом на текущем проекте кастома на столько много, что ничего готового не вывезет, скорее всего придется свое внедрять, ну это уже перед продом, сейчас в момент написания фич и  https://authorizer.dev/ норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я вот это втыкаю везде  https://authorizer.dev/ , на первое время для разработки фич и проработки логик норм, весь кастом с боку прикручиваю, по завершению уже оцениваю обьем кастома который будет нужен от сервера авторизации и уже принимаю решение брать чет готовое но более масштабнее, либо взять одно готовое нестовое из других проектов своих и воткнуть и обвешать кастомом на текущем проекте кастома на столько много, что ничего готового не вывезет, скорее всего придется свое внедрять, ну это уже перед продом, сейчас в момент написания фич и  https://authorizer.dev/ норм

--

## My telegram message #311364
**Time:** 29.08.2024 18:37:01 UTC+05:00
**Link:** https://t.me/nest_ru/311364

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Без разницы, джава наверное дороже будет, что ваша тима знает, на том и пишитк

Main message:
На  https://www.jhipster.tech/ в разы быстрее сделаешь там и фронт и бэк сразу генерятся по ентити

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На  https://www.jhipster.tech/ в разы быстрее сделаешь там и фронт и бэк сразу генерятся по ентити

--

## My telegram message #311367
**Time:** 29.08.2024 18:44:03 UTC+05:00
**Link:** https://t.me/nest_ru/311367

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет, нужно будет писать с полного нуля под конкретные нужды
- Без разницы, джава наверное дороже будет, что ваша тима знает, на том и пишитк
- На  https://www.jhipster.tech/ в разы быстрее сделаешь там и фронт и бэк сразу генерятся по ентити
- Из минусов только то что он может сторчаться на середине проекта)

Main message:
да оно надоедает, слишком все легко и типа нет интересных задач и народ сваливает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да оно надоедает, слишком все легко и типа нет интересных задач и народ сваливает

--

## My telegram message #311370
**Time:** 29.08.2024 19:25:04 UTC+05:00
**Link:** https://t.me/nest_ru/311370

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
когда попробуешь и поймешь офигеешь)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда попробуешь и поймешь офигеешь)

--

## My telegram message #311381
**Time:** 29.08.2024 19:31:08 UTC+05:00
**Link:** https://t.me/nest_ru/311381

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
я сам узнал когда чел с бэка предложил эту штуку, я в то время на фронте сидел и типа лидил команду, и неста еще не существовало, ну затащили и я потом сам даже чет там писал, ну вообщем очень легко все там, ну разраб должен быть повернут головою именно в спринг и именно в жехпситер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я сам узнал когда чел с бэка предложил эту штуку, я в то время на фронте сидел и типа лидил команду, и неста еще не существовало, ну затащили и я потом сам даже чет там писал, ну вообщем очень легко все там, ну разраб должен быть повернут головою именно в спринг и именно в жехпситер

--

## My telegram message #311386
**Time:** 29.08.2024 19:32:59 UTC+05:00
**Link:** https://t.me/nest_ru/311386

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
я себе нагенерил же фронт и бэк весь, и как бы все прототипы и типа можно сказать что круды готовы, но нет, куча работы появляется по логикам именно даже когда крудовой работы вообще нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я себе нагенерил же фронт и бэк весь, и как бы все прототипы и типа можно сказать что круды готовы, но нет, куча работы появляется по логикам именно даже когда крудовой работы вообще нет

--

## My telegram message #311403
**Time:** 30.08.2024 10:07:44 UTC+05:00
**Link:** https://t.me/nest_ru/311403

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Главный вопрос в том что нужно в конечном итоге заказчику. Одному готового решения за глаза, а на второго кастомить будешь дольше чем писать с нуля. CRM это слишком размытое понятие о том что нужно в итоге по бизнес модели
- Привет! Ребят создаю бекенд для сайта по типу КиноПоиск, нужна авторизация но такая чтобы можно потом и на телефон легко встроить. Что можете посоветовать? Слышал что есть сессии и jwt.
- делай jwt
- а жехипстер

Main message:
страпи это вроде четок не то

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

страпи это вроде четок не то

--

## My telegram message #311423
**Time:** 30.08.2024 13:25:05 UTC+05:00
**Link:** https://t.me/nest_ru/311423

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- страпи это вроде четок не то
- Всем привет! У меня есть сервис расписания, где можно: записаться, подтвердить запись и отменить её. Нужно реализовать уведомления в телеграмм боте на каждое из этих действий, чтобы оповещение приходило человеку, к которому была произведена запись. Пока в голове вижу только вариант, где в каждом из этих 3 ендпоинтов(запись, подтверждение, отмена), после удачной отработки запроса вызывать функцию которая будет посылать уведомление человеку, к которому была произведена запись. Но мне кажется это как-то не масштабируемо, возможно ли как это реализовать, условно, на уровне мидлвар, где будет происходить проверка на изменения в таблице, и уже на основании этого также вызывать функцию отправки уведомления? Надеюсь нормально объяснил...)
- Доменные Ивенты. После того как запись в бд произведена, создаешь ивент о том что такое то действие было сделано и публикуешь его. Модуль нотификаций (и вообще любой другой модуль) подписывается на этот ивент и реагирует так, как ему нужно (отправляет уведомление в твоем случае) Если надо не терять ивенты, то так же смотри outbox pattern
- а что скажешь про реализацию этого хипстера на несте? не доводилось работать?

Main message:
Фига, не, неискал даже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фига, не, неискал даже

--

## My telegram message #311426
**Time:** 30.08.2024 13:36:12 UTC+05:00
**Link:** https://t.me/nest_ru/311426

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Доменные Ивенты. После того как запись в бд произведена, создаешь ивент о том что такое то действие было сделано и публикуешь его. Модуль нотификаций (и вообще любой другой модуль) подписывается на этот ивент и реагирует так, как ему нужно (отправляет уведомление в твоем случае) Если надо не терять ивенты, то так же смотри outbox pattern
- а что скажешь про реализацию этого хипстера на несте? не доводилось работать?
- Фига, не, неискал даже
- Для фронта не публиковал? Можно посмотреть?

Main message:
неа, он приватный, там куча всего и код не прикольный публиковать такое точно не буду, но месяца через 1,5 думал сделать урезанную версию в паблик

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа, он приватный, там куча всего и код не прикольный публиковать такое точно не буду, но месяца через 1,5 думал сделать урезанную версию в паблик

--

## My telegram message #311539
**Time:** 01.09.2024 00:29:16 UTC+05:00
**Link:** https://t.me/nest_ru/311539

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А зачем ты их ищешь ебаньк о
- Извинись
- Простите
- Спасибо

Main message:
даже удалять не буду, просто заблочил)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

даже удалять не буду, просто заблочил)))

--

## My telegram message #311770
**Time:** 03.09.2024 01:11:26 UTC+05:00
**Link:** https://t.me/nest_ru/311770

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- да все уже перезагружал) в какойто момент времени просто перестает выводить

Main message:
может у тя виснет прога просто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может у тя виснет прога просто

--

## My telegram message #311794
**Time:** 03.09.2024 11:23:48 UTC+05:00
**Link:** https://t.me/nest_ru/311794

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, Ребята, а как можно гарантировать доставку сообщений в сокетах? Можете понакидать идей, статьи какие-нибудь, может репозитория с реализацией.

Main message:
1) я кидал сообщение в базу с флагом доставлено=false, и уже некий хук слал по веб сокетам 2) при первом подключении к сайту через ресту получаем все записи которые с доставлено=false и после выдачи рест их все стаивт в доставлено=true 3) подписываемся на новые сообщения через веб сокет 4) по мере получения сообщения на фронте, дергаем рест метод который переводит полученное сообщение в доставлено=true

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

1) я кидал сообщение в базу с флагом доставлено=false, и уже некий хук слал по веб сокетам 2) при первом подключении к сайту через ресту получаем все записи которые с доставлено=false и после выдачи рест их все стаивт в доставлено=true 3) подписываемся на новые сообщения через веб сокет 4) по мере получения сообщения на фронте, дергаем рест метод который переводит полученное сообщение в доставлено=true

--

## My telegram message #311799
**Time:** 03.09.2024 11:32:50 UTC+05:00
**Link:** https://t.me/nest_ru/311799

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 1) я кидал сообщение в базу с флагом доставлено=false, и уже некий хук слал по веб сокетам 2) при первом подключении к сайту через ресту получаем все записи которые с доставлено=false и после выдачи рест их все стаивт в доставлено=true 3) подписываемся на новые сообщения через веб сокет 4) по мере получения сообщения на фронте, дергаем рест метод который переводит полученное сообщение в доставлено=true

Main message:
если поток прям вообще не прерывный то на фронте  concat(rest.getAllCurrentItems(),ws.subscribeToNewItems()).subscribe(alert)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если поток прям вообще не прерывный то на фронте  concat(rest.getAllCurrentItems(),ws.subscribeToNewItems()).subscribe(alert)

--

## My telegram message #311920
**Time:** 03.09.2024 16:41:09 UTC+05:00
**Link:** https://t.me/nest_ru/311920

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
+

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

+

--

## My telegram message #311950
**Time:** 03.09.2024 18:08:17 UTC+05:00
**Link:** https://t.me/nest_ru/311950

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
никто не хочет заниматся рутинными бизнес логиками, все хотят ускорять, оптимизировать, изучать микросервисы чтобы быстрее уволиться и на новую работу пойти и там козырять тем что изучил ранее, и в новой конторе делать все тоже самое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

никто не хочет заниматся рутинными бизнес логиками, все хотят ускорять, оптимизировать, изучать микросервисы чтобы быстрее уволиться и на новую работу пойти и там козырять тем что изучил ранее, и в новой конторе делать все тоже самое

--

