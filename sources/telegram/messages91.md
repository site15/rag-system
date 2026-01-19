## My telegram message #93385
**Time:** 19.02.2021 13:04:31 UTC+05:00
**Link:** https://t.me/nest_ru/93385

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @ValidateNested ()  @Type (() => ProfileDto) Должно работать
- Всем доброго дня! Столкнулся с такой проблемой в typeorm, что он ругается на пустой тип в колонке. Колонка объявлена как на скриншоте. Перепробовал разные способы явно указать тип, но ошибка не уходит. Текс ошибки "Data type "" in "PersonEntity.pty_id" is not supported by "postgres" database.". Просто втф?

Main message:
default: '0'

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

default: '0'

--

## My telegram message #93389
**Time:** 19.02.2021 13:22:21 UTC+05:00
**Link:** https://t.me/nest_ru/93389

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Возможно, тогда лучше сделать nullable: true и совать туда null, а не 0, когда нужно. Тогда и с FK работать будет.

Main message:
он скорее всего уже создал таблицу через синхронизацию, нужно будет писать миграцию для изменения, так как там данные уже есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он скорее всего уже создал таблицу через синхронизацию, нужно будет писать миграцию для изменения, так как там данные уже есть

--

## My telegram message #93393
**Time:** 19.02.2021 13:39:07 UTC+05:00
**Link:** https://t.me/nest_ru/93393

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да, но работать без внешних ключей - такой себе вариант. Ни гарантии целостности данных, ни каскада

Main message:
Разные мс могут быть и базы там фк нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Разные мс могут быть и базы там фк нет

--

## My telegram message #93400
**Time:** 19.02.2021 16:33:56 UTC+05:00
**Link:** https://t.me/nest_ru/93400

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тогда да
- Ты объект Blob’ом отправляешь с клиента?
- Привет, мб кто сталкивался: задеплоил React+Nest на сервер. Nest запускается через pm2 и если стучаться к нему через postman, то api работает. Но если стучаться к api через фронт, то после ожидания выскакивает net::ERR_CONNECTION_TIMED_OUT Я так понимаю, возможно, nginx не редиректит запрос на ноду, но как чинить - не понятно Конфиг в  /sites -enabled:
- Извини, не прочитал изначальный вопрос. Ты можешь не делать общую DTO, включающую поле с файлом. Включи только поля авторизации, а в контроллере напиши  @Body () profile: ProfileDTO Ну и  @UploadedFile () file: File У нас в проектах мы делаем так - работает  @noname_vs

Main message:
нашел наконец то, может кому нужно, все норм работает, в купе с nx если использовать вообще изи nx run-many --target=conventional-changelog Семантическое версионирование в монорепе для вложеных либ и приложений  https://github.com/conventional-changelog/conventional-changelog/issues/556  #semver  #changelog

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нашел наконец то, может кому нужно, все норм работает, в купе с nx если использовать вообще изи nx run-many --target=conventional-changelog Семантическое версионирование в монорепе для вложеных либ и приложений  https://github.com/conventional-changelog/conventional-changelog/issues/556  #semver  #changelog

--

## My telegram message #93445
**Time:** 19.02.2021 23:01:55 UTC+05:00
**Link:** https://t.me/nest_ru/93445

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Подскажите пожалуйста. Я фронтенд разработчик (React, RN, Vue). И часто при изучение материалов сталкиваюсь с ООП. Но ни в одном из используемых фреймворков, я почти ни как не могу практиковать ООП. Я слышал что NestJS использует ООП подходы. Подскажите, пожалуйста, насколько это правда!? Применяется ли ООП в написание программ на NestJS?
- Я бы, на самом деле, посоветовал какую-нибудь книжку почитать по самым азам js, где рассказывается про то, что такое prototype. Так сказать для полного понимания картины. Чтобы понять, что из себя представляет ООП в js где-то глубоко в недрах. "Я слышал что NestJS использует ООП подходы. Подскажите, пожалуйста, насколько это правда!? " - тебя не обманули
- Читал про прототипы, наследование, конструкторы и прочее и не раз. Потому меня это и интересует. Что со всех углов это слышно, а реально применить негде
- зато те кто собесят считают очень важным это

Main message:
это да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это да

--

## My telegram message #93448
**Time:** 19.02.2021 23:02:32 UTC+05:00
**Link:** https://t.me/nest_ru/93448

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Читал про прототипы, наследование, конструкторы и прочее и не раз. Потому меня это и интересует. Что со всех углов это слышно, а реально применить негде
- зато те кто собесят считают очень важным это
- это да
- типа кто картошку в армии не чистил тот недостоен

Main message:
чиста ради этого только если знать, а так оно не нужно это все нутро жс по идее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чиста ради этого только если знать, а так оно не нужно это все нутро жс по идее

--

## My telegram message #93516
**Time:** 20.02.2021 12:05:23 UTC+05:00
**Link:** https://t.me/nest_ru/93516

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Все гораздо проще, в жс не было типов, а в пхп был var, ток из-за этого у этих двух языков плохая репутация, остальное уже там сишарп и явисты докрутили чтобы как то опровдать непонимание концепции, для чего так было сделано в жс и пхп

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Все гораздо проще, в жс не было типов, а в пхп был var, ток из-за этого у этих двух языков плохая репутация, остальное уже там сишарп и явисты докрутили чтобы как то опровдать непонимание концепции, для чего так было сделано в жс и пхп

--

## My telegram message #93588
**Time:** 20.02.2021 23:00:25 UTC+05:00
**Link:** https://t.me/nest_ru/93588

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не тяжело догодаться) надо было выпиливать, чтобы вопросов не было

Main message:
опа, у нас в городе есть команда модуль банка, я не знал что они на нест, там же шарп и реакт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

опа, у нас в городе есть команда модуль банка, я не знал что они на нест, там же шарп и реакт

--

## My telegram message #93590
**Time:** 20.02.2021 23:01:25 UTC+05:00
**Link:** https://t.me/nest_ru/93590

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 1 + '1' // 11 1 + 1 // 2 1 - '1' // 0 1 - 1 // 0
- а там нельзя сделать конвертацию ?
- опа, у нас в городе есть команда модуль банка, я не знал что они на нест, там же шарп и реакт
- Они не на несте)

Main message:
меня туда звали как то) я не пошел, на реакт звали

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

меня туда звали как то) я не пошел, на реакт звали

--

## My telegram message #93643
**Time:** 20.02.2021 23:59:42 UTC+05:00
**Link:** https://t.me/nest_ru/93643

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Зависит от того, что считать монолитом. Если ты пилишь API эндпоинтов на 200 (может и больше), то Go без проблем зайдёт. Вопрос в том как ты код организуешь
- А nest?
- Это в рамках самообучения. Пет-проектик запилил, его ковыряю. Но в рамках работы Nest, как и JS, не использую (если не считать 1 админку на Реакте)
- Когда фулстак, а если ещё и мобайл, я на nativescript хреначу с ангуляром, nest самый раз :)

Main message:
Ммм, че за ор, тут и не go и никто не поможет в рантайм если прилетит вместо 10 - BLA

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ммм, че за ор, тут и не go и никто не поможет в рантайм если прилетит вместо 10 - BLA

--

## My telegram message #93644
**Time:** 21.02.2021 00:00:55 UTC+05:00
**Link:** https://t.me/nest_ru/93644

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А nest?
- Это в рамках самообучения. Пет-проектик запилил, его ковыряю. Но в рамках работы Nest, как и JS, не использую (если не считать 1 админку на Реакте)
- Когда фулстак, а если ещё и мобайл, я на nativescript хреначу с ангуляром, nest самый раз :)
- Ммм, че за ор, тут и не go и никто не поможет в рантайм если прилетит вместо 10 - BLA

Main message:
Пишут задачи нам, мы пишем тесты, решаем задача, тестировщиком проверяет, трудно не так сумму посчитать по идее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Пишут задачи нам, мы пишем тесты, решаем задача, тестировщиком проверяет, трудно не так сумму посчитать по идее

--

## My telegram message #93646
**Time:** 21.02.2021 00:01:38 UTC+05:00
**Link:** https://t.me/nest_ru/93646

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Когда фулстак, а если ещё и мобайл, я на nativescript хреначу с ангуляром, nest самый раз :)
- Ммм, че за ор, тут и не go и никто не поможет в рантайм если прилетит вместо 10 - BLA
- Пишут задачи нам, мы пишем тесты, решаем задача, тестировщиком проверяет, трудно не так сумму посчитать по идее
- Зато получишь краш, а не выполнение операции) Но за го тут никто не топил в этом смысле

Main message:
Есть либы для типизации рантайм в жс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть либы для типизации рантайм в жс

--

## My telegram message #93679
**Time:** 21.02.2021 00:28:38 UTC+05:00
**Link:** https://t.me/nest_ru/93679

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Нету минуса, нужно думать перед тем как разрабам давать задание, те кто поручают и птом ревертят или изменяют задания, будут учитывать что нужно еще и тесты исправить это как с миграциями, нужно писать их сразу а не синкать базу, чтобы потом впадлу было миграции для переделывания делать - приходится заранее многое продумать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нету минуса, нужно думать перед тем как разрабам давать задание, те кто поручают и птом ревертят или изменяют задания, будут учитывать что нужно еще и тесты исправить это как с миграциями, нужно писать их сразу а не синкать базу, чтобы потом впадлу было миграции для переделывания делать - приходится заранее многое продумать

--

## My telegram message #93681
**Time:** 21.02.2021 00:29:27 UTC+05:00
**Link:** https://t.me/nest_ru/93681

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну так бурление же по теме, рассуждаем о методах разработки, здоровая тема
- Так тесты у меня ж есть. Другое дело, что у меня не TDD, а я их позже пишу)
- Нету минуса, нужно думать перед тем как разрабам давать задание, те кто поручают и птом ревертят или изменяют задания, будут учитывать что нужно еще и тесты исправить это как с миграциями, нужно писать их сразу а не синкать базу, чтобы потом впадлу было миграции для переделывания делать - приходится заранее многое продумать
- это да

Main message:
все норм с тестами они дают замедление сейчас -1 час, но потом на решение бага дают +6 часов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все норм с тестами они дают замедление сейчас -1 час, но потом на решение бага дают +6 часов

--

## My telegram message #93685
**Time:** 21.02.2021 00:32:30 UTC+05:00
**Link:** https://t.me/nest_ru/93685

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так тесты у меня ж есть. Другое дело, что у меня не TDD, а я их позже пишу)

Main message:
если время не жалко и ты холостяк то можешь конечно писать тесты потом, и дома вместо того чтобы с семьей быть, искать злыебучий баг три дня)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если время не жалко и ты холостяк то можешь конечно писать тесты потом, и дома вместо того чтобы с семьей быть, искать злыебучий баг три дня)

--

## My telegram message #93687
**Time:** 21.02.2021 00:33:09 UTC+05:00
**Link:** https://t.me/nest_ru/93687

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Кто то знает зачем нужны standalone application ?

Main message:
консоль делал на нем одно время, птом ушел)) так как тяжелое это все, чет такое было помню давно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

консоль делал на нем одно время, птом ушел)) так как тяжелое это все, чет такое было помню давно

--

## My telegram message #93689
**Time:** 21.02.2021 00:35:07 UTC+05:00
**Link:** https://t.me/nest_ru/93689

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если время не жалко и ты холостяк то можешь конечно писать тесты потом, и дома вместо того чтобы с семьей быть, искать злыебучий баг три дня)
- Кто то знает зачем нужны standalone application ?
- консоль делал на нем одно время, птом ушел)) так как тяжелое это все, чет такое было помню давно
- я как-то писал пет проект, подумал, ладно, напишу тесты потом, в конце, у меня там было штук 10 объектов со своими контроллерами, моделями и миграциями, через 2 недели открываю проект и понимаю, что вообще не помню где и с чем там связи были, у кого какие ассоциации и тд, в итоге повозился пару часов и подумал, что хрен с ним, проще переделать с нуля, а написал бы тесты сразу, то было б все норм

Main message:
а прикинь в продакшене 5 разарбов меняют код все время)) мы ваще не помним че и где и как рабоатает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а прикинь в продакшене 5 разарбов меняют код все время)) мы ваще не помним че и где и как рабоатает

--

## My telegram message #93691
**Time:** 21.02.2021 00:35:51 UTC+05:00
**Link:** https://t.me/nest_ru/93691

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- консоль делал на нем одно время, птом ушел)) так как тяжелое это все, чет такое было помню давно
- я как-то писал пет проект, подумал, ладно, напишу тесты потом, в конце, у меня там было штук 10 объектов со своими контроллерами, моделями и миграциями, через 2 недели открываю проект и понимаю, что вообще не помню где и с чем там связи были, у кого какие ассоциации и тд, в итоге повозился пару часов и подумал, что хрен с ним, проще переделать с нуля, а написал бы тесты сразу, то было б все норм
- а прикинь в продакшене 5 разарбов меняют код все время)) мы ваще не помним че и где и как рабоатает
- и это еще на руби, а на руби кода писать раза в 2 поменьше, чем на несте, на несте я бы даже ковыряться не стал

Main message:
еще же переписываем друг друга код, даже если помнишь чет, то птом уже когда приходишь обратно, то все подругому

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

еще же переписываем друг друга код, даже если помнишь чет, то птом уже когда приходишь обратно, то все подругому

--

## My telegram message #93694
**Time:** 21.02.2021 00:38:49 UTC+05:00
**Link:** https://t.me/nest_ru/93694

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Т.е. ты всегда с приёмочных тестов начинаешь?

Main message:
нет, я что идеальный разраб чтоли)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет, я что идеальный разраб чтоли)

--

## My telegram message #93700
**Time:** 21.02.2021 00:45:12 UTC+05:00
**Link:** https://t.me/nest_ru/93700

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну вот я тоже пришёл к выводу, что TDD работает только в идеальных условиях. Либо я криворукий ленивый разраб, я не знаю)))

Main message:
не тока, ты по пробуй. код другой получается, сильнее декомпозируешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не тока, ты по пробуй. код другой получается, сильнее декомпозируешь

--

## My telegram message #93702
**Time:** 21.02.2021 00:46:30 UTC+05:00
**Link:** https://t.me/nest_ru/93702

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
иногда нет времени на тесты да, но нужно понимать скилы разраба, если он шарит как кодить, типа опыта практического много, то он может и без тестов на 40% хороший код генерить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

иногда нет времени на тесты да, но нужно понимать скилы разраба, если он шарит как кодить, типа опыта практического много, то он может и без тестов на 40% хороший код генерить

--

## My telegram message #93707
**Time:** 21.02.2021 00:52:52 UTC+05:00
**Link:** https://t.me/nest_ru/93707

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- иногда нет времени на тесты да, но нужно понимать скилы разраба, если он шарит как кодить, типа опыта практического много, то он может и без тестов на 40% хороший код генерить
- Телеграмм бот например, работающий через long-polling
- Badge коверейджа налепи в README - будет мотивировать)))
- А если мы говорим не про банки, а про стартапчики, то там все должно так быстро меняться, что тесты будут постоянно неактуальными

Main message:
работал в стартапе, 6 раз переписывал то что сделал, в итоге выкинули фичу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

работал в стартапе, 6 раз переписывал то что сделал, в итоге выкинули фичу

--

## My telegram message #93712
**Time:** 21.02.2021 00:58:55 UTC+05:00
**Link:** https://t.me/nest_ru/93712

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Badge коверейджа налепи в README - будет мотивировать)))
- А если мы говорим не про банки, а про стартапчики, то там все должно так быстро меняться, что тесты будут постоянно неактуальными
- работал в стартапе, 6 раз переписывал то что сделал, в итоге выкинули фичу
- почему?

Main message:
о) ты просто не работал в таких местах, 1/5 модуля просто берется и вся полностью перерабатывается, за собою таща изменения поо всему проекту

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

о) ты просто не работал в таких местах, 1/5 модуля просто берется и вся полностью перерабатывается, за собою таща изменения поо всему проекту

--

## My telegram message #93721
**Time:** 21.02.2021 01:02:06 UTC+05:00
**Link:** https://t.me/nest_ru/93721

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- работал в стартапе, 6 раз переписывал то что сделал, в итоге выкинули фичу
- почему?
- о) ты просто не работал в таких местах, 1/5 модуля просто берется и вся полностью перерабатывается, за собою таща изменения поо всему проекту
- ну я да, не писал стартапы, свой пишу полгодика уже как, на лайте

Main message:
не, в рамках фичи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, в рамках фичи

--

## My telegram message #93729
**Time:** 21.02.2021 01:03:59 UTC+05:00
**Link:** https://t.me/nest_ru/93729

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я да, не писал стартапы, свой пишу полгодика уже как, на лайте
- не, в рамках фичи
- +1 вот это жизненно
- ну да, это жестко

Main message:
у меня фича в прод не ушла, решили ее удалить)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня фича в прод не ушла, решили ее удалить)

--

## My telegram message #93756
**Time:** 21.02.2021 01:22:00 UTC+05:00
**Link:** https://t.me/nest_ru/93756

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а в несте разве нельзя просто взять и сменить связь?

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #93759
**Time:** 21.02.2021 01:24:52 UTC+05:00
**Link:** https://t.me/nest_ru/93759

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а в несте разве нельзя просто взять и сменить связь?

Main message:
сделай юзера с полем роль - табличку через миграцию, птом наполни ее данным потом вынеси роли в отдельную таблицу и через третью свяжи юзеров с ролями, данные удалять нельзя, все данные созданные на 1 шаге должны остатся при этом ответ на фронт и запрос на создание не меняется все также как и в самом начале а потом херакс и внедри сущность департамент которая обладает ролями, департамент привязан к компании, юзер числится в компании

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сделай юзера с полем роль - табличку через миграцию, птом наполни ее данным потом вынеси роли в отдельную таблицу и через третью свяжи юзеров с ролями, данные удалять нельзя, все данные созданные на 1 шаге должны остатся при этом ответ на фронт и запрос на создание не меняется все также как и в самом начале а потом херакс и внедри сущность департамент которая обладает ролями, департамент привязан к компании, юзер числится в компании

--

## My telegram message #93765
**Time:** 21.02.2021 01:25:50 UTC+05:00
**Link:** https://t.me/nest_ru/93765

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А при чём тут Нест?
- сделай юзера с полем роль - табличку через миграцию, птом наполни ее данным потом вынеси роли в отдельную таблицу и через третью свяжи юзеров с ролями, данные удалять нельзя, все данные созданные на 1 шаге должны остатся при этом ответ на фронт и запрос на создание не меняется все также как и в самом начале а потом херакс и внедри сущность департамент которая обладает ролями, департамент привязан к компании, юзер числится в компании
- Ага, и прод лежать не должен во время этого веселья)
- ну я захожу в рельсах в модель, вот у меня например есть модель User и Target у которых связь has_one, если я захочу убрать эту связь, я удалю ее из модели, и новой миграции уберу id из таблицы, и если захочу связать с user не target а репортс, то через новую миграцию добавлю в user reports_id а в target user_id и накачу на них связь в модели

Main message:
все пока, увидемся через пол года  @captain_jakk

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все пока, увидемся через пол года  @captain_jakk

--

## My telegram message #93767
**Time:** 21.02.2021 01:27:07 UTC+05:00
**Link:** https://t.me/nest_ru/93767

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ага, и прод лежать не должен во время этого веселья)
- ну я захожу в рельсах в модель, вот у меня например есть модель User и Target у которых связь has_one, если я захочу убрать эту связь, я удалю ее из модели, и новой миграции уберу id из таблицы, и если захочу связать с user не target а репортс, то через новую миграцию добавлю в user reports_id а в target user_id и накачу на них связь в модели
- все пока, увидемся через пол года  @captain_jakk
- ORM не является ядром NestJS, как в ROR (судя по всему)

Main message:
так то код не причем в этих штуках

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так то код не причем в этих штуках

--

## My telegram message #93772
**Time:** 21.02.2021 01:28:18 UTC+05:00
**Link:** https://t.me/nest_ru/93772

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все пока, увидемся через пол года  @captain_jakk
- ORM не является ядром NestJS, как в ROR (судя по всему)
- так то код не причем в этих штуках
- А, об этом речь? Ну код тоже надо будет, конечно, поменять, но это процентов 5% работы

Main message:
да просто миграции писать на все эти конвертации тущу времени уйдет и всяко чет забудешь и прод ляжет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да просто миграции писать на все эти конвертации тущу времени уйдет и всяко чет забудешь и прод ляжет)

--

## My telegram message #93776
**Time:** 21.02.2021 01:29:41 UTC+05:00
**Link:** https://t.me/nest_ru/93776

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну и данные в миграциях, вроде, не мигрируют

Main message:
мигрируют, трансформация данных

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мигрируют, трансформация данных

--

## My telegram message #93781
**Time:** 21.02.2021 01:31:06 UTC+05:00
**Link:** https://t.me/nest_ru/93781

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- сделай юзера с полем роль если под поле роль создать отдельный абстрактный класс, то не сложно будет вынести ( в рельсах ) в новую таблицу и сохранить данные так то, примерно как я и показал

Main message:
не, убери код, миграции гоним отдельно от него

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, убери код, миграции гоним отдельно от него

--

## My telegram message #93786
**Time:** 21.02.2021 01:32:17 UTC+05:00
**Link:** https://t.me/nest_ru/93786

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мигрируют, трансформация данных
- сделай юзера с полем роль если под поле роль создать отдельный абстрактный класс, то не сложно будет вынести ( в рельсах ) в новую таблицу и сохранить данные так то, примерно как я и показал
- не, убери код, миграции гоним отдельно от него
- Ну вот создал ты миграцию, которая добавляет столбец с дефолтным значением. Таблица огромная, проект под трафом. Знаешь же, что будет?

Main message:
нет а ты)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет а ты)

--

## My telegram message #93789
**Time:** 21.02.2021 01:33:07 UTC+05:00
**Link:** https://t.me/nest_ru/93789

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну вот создал ты миграцию, которая добавляет столбец с дефолтным значением. Таблица огромная, проект под трафом. Знаешь же, что будет?
- нет а ты)
- Перенос данных может занимать час) Миграция столько будет применяться?)
- а зачем мы переносим данные

Main message:
как будешь переносить трилион записей попутно еще трилион создается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как будешь переносить трилион записей попутно еще трилион создается

--

## My telegram message #93791
**Time:** 21.02.2021 01:33:13 UTC+05:00
**Link:** https://t.me/nest_ru/93791

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Перенос данных может занимать час) Миграция столько будет применяться?)
- а зачем мы переносим данные
- как будешь переносить трилион записей попутно еще трилион создается
- Залочишь таблицу на чтение и запись на всё это время. А это не моментальная операция)

Main message:
у тя конца переноса нет же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя конца переноса нет же

--

## My telegram message #93793
**Time:** 21.02.2021 01:33:26 UTC+05:00
**Link:** https://t.me/nest_ru/93793

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Залочишь таблицу на чтение и запись на всё это время. А это не моментальная операция)

Main message:
сервак вырубить можно еще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сервак вырубить можно еще

--

## My telegram message #93795
**Time:** 21.02.2021 01:33:37 UTC+05:00
**Link:** https://t.me/nest_ru/93795

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя конца переноса нет же
- почему условно role просто не переасоциаровать в другую таблицу, это вроде не сложно будет сделать
- сервак вырубить можно еще
- Ровно до тех пор, пока ты не задеплоишь код с новой логикой

Main message:
и пошли все лям долларов и премия нафиг

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и пошли все лям долларов и премия нафиг

--

## My telegram message #93798
**Time:** 21.02.2021 01:34:27 UTC+05:00
**Link:** https://t.me/nest_ru/93798

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну пока пронесло)

Main message:
я встрявал на деньги кстати так

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я встрявал на деньги кстати так

--

## My telegram message #93801
**Time:** 21.02.2021 01:36:30 UTC+05:00
**Link:** https://t.me/nest_ru/93801

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Прямо выплатить заставили?

Main message:
история тупая я тогда адимином был, и прогу на делфи написал которая проверяет почту каждые 5 минут, письма забирает и чет ищет в них, оказалось траф был платный))) 60тыщ за три дня накапало в 2009 году, я охерел просто, не платил, прогу изменил чтобы сносило письма после выгрузки на комп ну подумывал уволится(((

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

история тупая я тогда адимином был, и прогу на делфи написал которая проверяет почту каждые 5 минут, письма забирает и чет ищет в них, оказалось траф был платный))) 60тыщ за три дня накапало в 2009 году, я охерел просто, не платил, прогу изменил чтобы сносило письма после выгрузки на комп ну подумывал уволится(((

--

## My telegram message #93803
**Time:** 21.02.2021 01:38:12 UTC+05:00
**Link:** https://t.me/nest_ru/93803

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну вот например у нас есть абстрактный класс user, у него есть id, name и по логике должна быть роль, на начальном этапе роль можно вынести в отдельный абстрактный класс типа item и связать ее через has_many с user'ом, если у юзера должно быть много ролей, а связь сделать через id, и когда понадобится такая операция, что нам роль надо убрать у юзера и добавить админу, мы просто накатываем миграцию, которая убирает id роли у юзера и добавляет ее админу, а у роли убираем айди юзера и добавляем айди админа, а саму ассоциацию меняем с has many user на has many admin , вроде всё

Main message:
ты попробуй это все сделать, говорить м ывсе можем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты попробуй это все сделать, говорить м ывсе можем

--

## My telegram message #93806
**Time:** 21.02.2021 01:38:25 UTC+05:00
**Link:** https://t.me/nest_ru/93806

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- история тупая я тогда адимином был, и прогу на делфи написал которая проверяет почту каждые 5 минут, письма забирает и чет ищет в них, оказалось траф был платный))) 60тыщ за три дня накапало в 2009 году, я охерел просто, не платил, прогу изменил чтобы сносило письма после выгрузки на комп ну подумывал уволится(((
- данные сохранятся
- ты попробуй это все сделать, говорить м ывсе можем
- ну в РОР будет вот так

Main message:
попробуй в рор

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

попробуй в рор

--

## My telegram message #93809
**Time:** 21.02.2021 01:38:49 UTC+05:00
**Link:** https://t.me/nest_ru/93809

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты попробуй это все сделать, говорить м ывсе можем
- ну в РОР будет вот так
- попробуй в рор
- Жесть) А у меня был прикол, когда я в MsSQL случайно нажал DropAndCreate. В итоге выпилил таблицу с подпиской юзеров на платные фичи. Спасло то, что юзеров было очень мало, и все эти права оказались в кеше браузера у коллеги, который только что эту страницу открыл))

Main message:
)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)))

--

## My telegram message #93814
**Time:** 21.02.2021 01:39:32 UTC+05:00
**Link:** https://t.me/nest_ru/93814

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Жесть) А у меня был прикол, когда я в MsSQL случайно нажал DropAndCreate. В итоге выпилил таблицу с подпиской юзеров на платные фичи. Спасло то, что юзеров было очень мало, и все эти права оказались в кеше браузера у коллеги, который только что эту страницу открыл))

Main message:
дропнул табличку, спасло что в пл скл девелопере вкладка была с селектом этих данных)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дропнул табличку, спасло что в пл скл девелопере вкладка была с селектом этих данных)

--

## My telegram message #93817
**Time:** 21.02.2021 01:40:27 UTC+05:00
**Link:** https://t.me/nest_ru/93817

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- как будет на миллион строк не знаю

Main message:
милион не нужно, создай 4 записи и прогони через круги ада которые я описал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

милион не нужно, создай 4 записи и прогони через круги ада которые я описал

--

## My telegram message #93827
**Time:** 21.02.2021 01:44:40 UTC+05:00
**Link:** https://t.me/nest_ru/93827

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тоже стрём)))
- милион не нужно, создай 4 записи и прогони через круги ада которые я описал
- А как на 100-200 млн?
- да мне кажется нормально

Main message:
у юзера может быть много ролей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у юзера может быть много ролей

--

## My telegram message #93857
**Time:** 21.02.2021 02:01:05 UTC+05:00
**Link:** https://t.me/nest_ru/93857

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у меня так сразу после запуска одна баба обновила профиль и все пользователи стали ей. благо только запустились и перезалили пользователей. а так какой-то агент смит

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #93870
**Time:** 21.02.2021 02:07:30 UTC+05:00
**Link:** https://t.me/nest_ru/93870

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- извините(
- ой, я смайлик забыл поставить)
- я не хотел токсично, просто реально хз, как отвечать на "Не могу понять почему MQTT Explorer не видет клиент , брокер и вообще", ну он же смотрит на код и не может понять, а мы то как сможем понять))
- @hackp0int у тебя эксплорер  https://mqtt-explorer.com/ этот?

Main message:
я даже не знаю что это такое)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я даже не знаю что это такое)

--

## My telegram message #93872
**Time:** 21.02.2021 02:09:01 UTC+05:00
**Link:** https://t.me/nest_ru/93872

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я не хотел токсично, просто реально хз, как отвечать на "Не могу понять почему MQTT Explorer не видет клиент , брокер и вообще", ну он же смотрит на код и не может понять, а мы то как сможем понять))
- @hackp0int у тебя эксплорер  https://mqtt-explorer.com/ этот?
- я даже не знаю что это такое)
- я тоже) просто загуглил. какой-то протокол. встроен в кролика с третьей версии в виде плагина

Main message:
я булл пробую когда синхрон нужен и один раз, когда куче людей через редис там чета евентная мс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я булл пробую когда синхрон нужен и один раз, когда куче людей через редис там чета евентная мс

--

## My telegram message #93881
**Time:** 21.02.2021 02:12:35 UTC+05:00
**Link:** https://t.me/nest_ru/93881

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Даже не знаю что хуже: холивар на тему того, какое говно докер или jwt)
- ой ля
- это боль всех
- я пока пытался вкурить, что такое jwt нашел 5 вариантов решения этой пробелмы на рельсах ,и 3 на несте, и все разные, а как понять, что использовать вообще хз

Main message:
прям сейчас сижу кейклоак мучаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

прям сейчас сижу кейклоак мучаю

--

## My telegram message #93922
**Time:** 21.02.2021 02:32:25 UTC+05:00
**Link:** https://t.me/nest_ru/93922

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- cc4cc - ID контейнера с твоего скрина
- Пусто
- Хм, очень странно. У меня идеи кончились)
- Спасибо в любом случае 🙏🏻

Main message:
предлагаю ребутнуть комп

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

предлагаю ребутнуть комп

--

