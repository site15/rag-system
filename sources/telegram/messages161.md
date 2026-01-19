## My telegram message #172759
**Time:** 20.07.2022 09:01:27 UTC+05:00
**Link:** https://t.me/nest_ru/172759

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy Вообщем, напилил скриптиков, терь есть 2 команды - yarn prisma:generate-client clientName DB_URL_ENV_VARIABLE - yarn prisma:pull clientName и оно генерит вот сюда

Main message:
👍 Почти как к у меня

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍 Почти как к у меня

--

## My telegram message #172761
**Time:** 20.07.2022 09:31:06 UTC+05:00
**Link:** https://t.me/nest_ru/172761

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребят, подскажите, интегрировал кто-то библиотеку  https://www.npmjs.com/package/file-type в Multer? Не могу придумать как мне проверить тип файла, в fileFilter нет пути до изображения

Main message:
Судя по коду, нужно сперва загрузить и потом сверить тока

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Судя по коду, нужно сперва загрузить и потом сверить тока

--

## My telegram message #172833
**Time:** 20.07.2022 15:05:55 UTC+05:00
**Link:** https://t.me/nest_ru/172833

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет, позволяет ли какая либо orm для nest писать фильтры и сортировки используя спецификации, которые можно потом переиспользовать? Что то типа такого:  spec = new Specification  ([   new By Some Ids  ( [1,2,3] , $this->getAlias  ())  , new NotDeleted  (  $this->getAlias  ()) ]

Main message:
Любая

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Любая

--

## My telegram message #172951
**Time:** 21.07.2022 10:43:03 UTC+05:00
**Link:** https://t.me/nest_ru/172951

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Коллеги, внезапный вопрос. Кто-нибудь знает, в каком порядке срабатывают lifecyсle хуки? Не в смысле, какой хук за каким, а в смысле на каких сущностях. Пример: есть модуль  A , от которого зависит модуль  B . В них обоих (или в соответствующих сервисах) есть onApplicationShutdown. Логично предположить, что хуки сработают в порядке определённом деревом зависимостей. То есть сначала закроется модуль B, как зависимый, потом модуль А. Но по факту происходит наоборот. Порядок неопределён? А что если чтобы корректно завершить работу в B, нам нужен живой А?

Main message:
Посмотри в каком порядке модули попадают в диай, не обязательно то как ты видишь порядок в апп модуле

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Посмотри в каком порядке модули попадают в диай, не обязательно то как ты видишь порядок в апп модуле

--

## My telegram message #172954
**Time:** 21.07.2022 10:46:23 UTC+05:00
**Link:** https://t.me/nest_ru/172954

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А не подскажите где явно закрывать можно соединения с бд? В приложениях на экспресс писали внутри process.on('exit')?
- Так я кастомный и пишу, просто я даже не могу сделать функцию, которая принимает неограниченное кол-во параметров и выдает саму "трубу". TS ругается
- Посмотри в каком порядке модули попадают в диай, не обязательно то как ты видишь порядок в апп модуле
- Они не на одном уровне иерархии

Main message:
Модуль дестрой не потходит?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Модуль дестрой не потходит?

--

## My telegram message #172969
**Time:** 21.07.2022 11:16:44 UTC+05:00
**Link:** https://t.me/nest_ru/172969

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Посмотри в каком порядке модули попадают в диай, не обязательно то как ты видишь порядок в апп модуле
- Они не на одном уровне иерархии
- Модуль дестрой не потходит?
- Ильшат, я честно говоря думал, что в курсе, как работает DI )) Но теперь не уверен )) Логи пишу, как обойти проблему, понятно. Вопрос в том, является ли это поведение фреймворка нормальным или это баг

Main message:
Сканирование происходит сверху вниз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сканирование происходит сверху вниз

--

## My telegram message #172974
**Time:** 21.07.2022 11:19:37 UTC+05:00
**Link:** https://t.me/nest_ru/172974

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Модуль дестрой не потходит?
- Ильшат, я честно говоря думал, что в курсе, как работает DI )) Но теперь не уверен )) Логи пишу, как обойти проблему, понятно. Вопрос в том, является ли это поведение фреймворка нормальным или это баг
- Сканирование происходит сверху вниз
- да я не жалуюсь ))

Main message:
Не решат

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не решат

--

## My telegram message #172981
**Time:** 21.07.2022 11:25:59 UTC+05:00
**Link:** https://t.me/nest_ru/172981

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Сканирование происходит сверху вниз
- да я не жалуюсь ))
- Не решат
- Если под динамик имеются ввиду DynamicModule, которые конструируются статическими методами, то что в них особенного в плане DI? Если я правильно понимаю, первым делом nest регистрирует модули (в порядке из объявления в импортах, полагаю), за одно составляя граф зависимостей. Потом начинает создавать и инициализировать модули и всё их содержимое, от листьев дерева к корню. При этом, по идее вызываются и хуки. И вот у нас есть дерево зависимостей - что мешает закрывать модули от корня к листьям "в ширину"?

Main message:
Много софта ещё написано в которых форвард рефы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Много софта ещё написано в которых форвард рефы

--

## My telegram message #172987
**Time:** 21.07.2022 11:28:07 UTC+05:00
**Link:** https://t.me/nest_ru/172987

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не решат
- Если под динамик имеются ввиду DynamicModule, которые конструируются статическими методами, то что в них особенного в плане DI? Если я правильно понимаю, первым делом nest регистрирует модули (в порядке из объявления в импортах, полагаю), за одно составляя граф зависимостей. Потом начинает создавать и инициализировать модули и всё их содержимое, от листьев дерева к корню. При этом, по идее вызываются и хуки. И вот у нас есть дерево зависимостей - что мешает закрывать модули от корня к листьям "в ширину"?
- Много софта ещё написано в которых форвард рефы
- да то, что проще - понятно..

Main message:
Трилион это не гугль, нет столько ресурсов чтобы диай стабильным сделать как в ангулар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Трилион это не гугль, нет столько ресурсов чтобы диай стабильным сделать как в ангулар

--

## My telegram message #172996
**Time:** 21.07.2022 11:36:11 UTC+05:00
**Link:** https://t.me/nest_ru/172996

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Много софта ещё написано в которых форвард рефы
- да то, что проще - понятно..
- Трилион это не гугль, нет столько ресурсов чтобы диай стабильным сделать как в ангулар
- К слову.. как считаете, есть реальный кейс, в котором нужны forwardRef? Мне любопытно потому что я никогда не пользовался, хотя кучу всякого на несте написал

Main message:
Ты юзаешь конфиг модуль?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты юзаешь конфиг модуль?

--

## My telegram message #172998
**Time:** 21.07.2022 11:36:55 UTC+05:00
**Link:** https://t.me/nest_ru/172998

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Трилион это не гугль, нет столько ресурсов чтобы диай стабильным сделать как в ангулар
- К слову.. как считаете, есть реальный кейс, в котором нужны forwardRef? Мне любопытно потому что я никогда не пользовался, хотя кучу всякого на несте написал
- Ты юзаешь конфиг модуль?
- у меня свой

Main message:
Ну я вот не юзаю его и никогда не юзал и считаю его не нужным

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну я вот не юзаю его и никогда не юзал и считаю его не нужным

--

## My telegram message #173003
**Time:** 21.07.2022 11:42:36 UTC+05:00
**Link:** https://t.me/nest_ru/173003

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Можешь, пожалуйста, подробнее рассказать чем он плох?

Main message:
ну ты его убери и напиши через токен провайдер и метод forRoot, как в тайп орм неста и других модулях что в инете валяются

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты его убери и напиши через токен провайдер и метод forRoot, как в тайп орм неста и других модулях что в инете валяются

--

## My telegram message #173006
**Time:** 21.07.2022 11:52:57 UTC+05:00
**Link:** https://t.me/nest_ru/173006

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можешь, пожалуйста, подробнее рассказать чем он плох?
- Может ли это быть из-за конфигурации базы как провайдера ?
- ну ты его убери и напиши через токен провайдер и метод forRoot, как в тайп орм неста и других модулях что в инете валяются
- У вас сколько опыта с нестом?)

Main message:
с момента как чат появился

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с момента как чат появился

--

## My telegram message #173009
**Time:** 21.07.2022 12:12:52 UTC+05:00
**Link:** https://t.me/nest_ru/173009

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну ты его убери и напиши через токен провайдер и метод forRoot, как в тайп орм неста и других модулях что в инете валяются
- У вас сколько опыта с нестом?)
- с момента как чат появился
- Ее, крутой вы

Main message:
старый просто 👨🏽‍🦳

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

старый просто 👨🏽‍🦳

--

## My telegram message #173011
**Time:** 21.07.2022 12:15:29 UTC+05:00
**Link:** https://t.me/nest_ru/173011

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- с момента как чат появился
- Ее, крутой вы
- старый просто 👨🏽‍🦳
- вам сколько?

Main message:
37 и офтоп тут лучше)  https://t.me/nest_random

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

37 и офтоп тут лучше)  https://t.me/nest_random

--

## My telegram message #173018
**Time:** 21.07.2022 12:35:12 UTC+05:00
**Link:** https://t.me/nest_ru/173018

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Товары(ид, тип_товара_ид, название) Тип товаров(ид, название) Свойства товара машина (ид, ид товара, тип товара ид, цвет...) Можно так, можно свойства в одну таблицу запихать с кучей полей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Товары(ид, тип_товара_ид, название) Тип товаров(ид, название) Свойства товара машина (ид, ид товара, тип товара ид, цвет...) Можно так, можно свойства в одну таблицу запихать с кучей полей

--

## My telegram message #173020
**Time:** 21.07.2022 12:55:20 UTC+05:00
**Link:** https://t.me/nest_ru/173020

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Доброе утро! Подскажите пожалуйста чат в котором можно задать вопрос по проектированию SQL базы данных, если знаете
- qq all. кто то стыкался с такой проблемой?
- Товары(ид, тип_товара_ид, название) Тип товаров(ид, название) Свойства товара машина (ид, ид товара, тип товара ид, цвет...) Можно так, можно свойства в одну таблицу запихать с кучей полей
- Ок, спасибо. Наверное одну общую таблу сделать правильнее - нужна возможность добавлять новые товары , соответственно создавать новые таблицы не вариант

Main message:
смотри только не делай полей вида свойства (ид, тип свойства, название, значение_инт, значение_стринг) с этой штукой может и кажется меньше работы в плане кодинга, у тебя запросы большие получатся, на больших данных все запросы медленные станут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

смотри только не делай полей вида свойства (ид, тип свойства, название, значение_инт, значение_стринг) с этой штукой может и кажется меньше работы в плане кодинга, у тебя запросы большие получатся, на больших данных все запросы медленные станут

--

## My telegram message #173134
**Time:** 21.07.2022 18:36:32 UTC+05:00
**Link:** https://t.me/nest_ru/173134

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Там вроде достаточно указать String? То есть сделать поле со стринг необязательным

Main message:
+

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

+

--

## My telegram message #173140
**Time:** 21.07.2022 18:39:46 UTC+05:00
**Link:** https://t.me/nest_ru/173140

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- +
- Он генерирует в sql "refreshToken" TEXT NOT NULL,
- paymentId String? @map("payment_id") "payment_id" TEXT, у меня генерит так
- походу вся загвостка в вопросике)

Main message:
лучше из базы генерь схему проще знать просто sql чем и sql и диалект sdl призмы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше из базы генерь схему проще знать просто sql чем и sql и диалект sdl призмы

--

## My telegram message #173148
**Time:** 21.07.2022 19:20:17 UTC+05:00
**Link:** https://t.me/nest_ru/173148

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну как вариант, пойти с хвоста)
- Когда в методах указываете return type сравниваются строгие типы или интерфейс типа с интерфейсом возвращаемого объекта?
- использую yandexS3 для хранения файлов. Кто нибудь сталкивался с такой проблемой?
- Сделай console.log(EasyYandexS3)

Main message:
EasyYandexS3.EasyYandexS3

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

EasyYandexS3.EasyYandexS3

--

## My telegram message #173268
**Time:** 22.07.2022 18:31:24 UTC+05:00
**Link:** https://t.me/nest_ru/173268

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Хосподи сколько же у вас страданий с тайпорм, прям сочувствую

Main message:
мидлвар юзаешь по полной в призме?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мидлвар юзаешь по полной в призме?

--

## My telegram message #173271
**Time:** 22.07.2022 18:32:40 UTC+05:00
**Link:** https://t.me/nest_ru/173271

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хосподи сколько же у вас страданий с тайпорм, прям сочувствую
- мидлвар юзаешь по полной в призме?
- Это как BDSM. Главное чтобы участникам процесса нравилось
- Да не особо вроде

Main message:
туда нырнешь вообще охереешь что можно мутить)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

туда нырнешь вообще охереешь что можно мутить)

--

## My telegram message #173279
**Time:** 22.07.2022 19:14:01 UTC+05:00
**Link:** https://t.me/nest_ru/173279

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это как BDSM. Главное чтобы участникам процесса нравилось
- Да не особо вроде
- туда нырнешь вообще охереешь что можно мутить)
- Я бы нырнул. Есть задача... У меня глобально данные приходят в формате X а хранятся в сущностях по другому (объекты, массивы, ключи временами другие). Преобразования можно сделать без потери инфы. Пока что придумал на коленке схему, dto <-> entity модификаторов, оно или в одну или в другую сторону меняет. И их можно чейнить modif1 -> modif2 -> modif3. При этом когда надо сделать обратное преобразование они вызываются в обратном порядке (и сама функция обратная) modif3 > modif2 > modif1

Main message:
Не, такое оверхед для ОРМ, это в интерцепторах надо делать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не, такое оверхед для ОРМ, это в интерцепторах надо делать

--

## My telegram message #173283
**Time:** 22.07.2022 19:40:51 UTC+05:00
**Link:** https://t.me/nest_ru/173283

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- туда нырнешь вообще охереешь что можно мутить)
- Я бы нырнул. Есть задача... У меня глобально данные приходят в формате X а хранятся в сущностях по другому (объекты, массивы, ключи временами другие). Преобразования можно сделать без потери инфы. Пока что придумал на коленке схему, dto <-> entity модификаторов, оно или в одну или в другую сторону меняет. И их можно чейнить modif1 -> modif2 -> modif3. При этом когда надо сделать обратное преобразование они вызываются в обратном порядке (и сама функция обратная) modif3 > modif2 > modif1
- Не, такое оверхед для ОРМ, это в интерцепторах надо делать
- Добрый вечер! Подскажите кратко , принцип работы поисковых движков типа эластик сеарч в связке с базой типа постгрес

Main message:
ну куски бьет предложение и нормализует под язык и строит векторные индексы и птом по полному вхождению слов ищет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну куски бьет предложение и нормализует под язык и строит векторные индексы и птом по полному вхождению слов ищет

--

## My telegram message #173296
**Time:** 22.07.2022 21:24:02 UTC+05:00
**Link:** https://t.me/nest_ru/173296

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А если скюл база гигов 30 - эластик все данные вытащит и в себе сохранит?

Main message:
эластик скорее всего еще больше будет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эластик скорее всего еще больше будет

--

## My telegram message #173304
**Time:** 23.07.2022 00:07:11 UTC+05:00
**Link:** https://t.me/nest_ru/173304

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Что за дискриминация по полу ?
- есть девушки, кому нужна помощь по установке ноды? желательно из моего города?
- Используй anydesk
- Ребята, а где в призме квери билдер? Чёт не могу нагуглить

Main message:
нет его)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет его)

--

## My telegram message #173462
**Time:** 23.07.2022 20:07:12 UTC+05:00
**Link:** https://t.me/nest_ru/173462

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- думаю стоит познакомиться
- Откуда там пароль? Ты чего делаешь?
- Так там же delete, но вообще странная ситуация
- delete удаляет на сервере уже

Main message:
он из базы вытащил юзера и положил в реквест, пароль тоже сфетчился

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он из базы вытащил юзера и положил в реквест, пароль тоже сфетчился

--

## My telegram message #173556
**Time:** 24.07.2022 16:00:13 UTC+05:00
**Link:** https://t.me/nest_ru/173556

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Не прибегая к API - собственным переводчиком.

Main message:
+

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

+

--

## My telegram message #173639
**Time:** 24.07.2022 22:42:56 UTC+05:00
**Link:** https://t.me/nest_ru/173639

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да у меня телега взбунтовадсь
- Привет Как можно отлавливать все ошибки которые попадают в catch глобавльно и возвращать их на клиент Пробовал globalExeption из доки неста, не получается
- Такие функции будут работать в основном потоке. Поэтому и рекомендуют использовать асинхронные варианты этих функций, чтобы не блокировать ивентлуп
- Народ, prisma or typeOrm?

Main message:
если хочешь работу по несту найти то тайп орм, если проект с нуля то призма

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если хочешь работу по несту найти то тайп орм, если проект с нуля то призма

--

## My telegram message #173644
**Time:** 24.07.2022 22:53:32 UTC+05:00
**Link:** https://t.me/nest_ru/173644

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если хочешь работу по несту найти то тайп орм, если проект с нуля то призма
- Ещё sequelize есть
- Prisma
- У призмы я так понял нет querybuilder по тип как в тайп орм или я недочитал?)

Main message:
пока нет да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пока нет да

--

## My telegram message #173649
**Time:** 24.07.2022 22:54:52 UTC+05:00
**Link:** https://t.me/nest_ru/173649

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
(в моих мечтах)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

(в моих мечтах)

--

## My telegram message #173654
**Time:** 24.07.2022 22:55:57 UTC+05:00
**Link:** https://t.me/nest_ru/173654

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- пока нет да
- Печаль
- (в моих мечтах)
- А сокет Ио это устаревшая технология по сравнению с ws?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #173656
**Time:** 24.07.2022 22:56:15 UTC+05:00
**Link:** https://t.me/nest_ru/173656

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- (в моих мечтах)
- А сокет Ио это устаревшая технология по сравнению с ws?
- да
- Спасибо.

Main message:
он не устаревшая, а больше комбинированная

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он не устаревшая, а больше комбинированная

--

## My telegram message #173658
**Time:** 24.07.2022 22:57:07 UTC+05:00
**Link:** https://t.me/nest_ru/173658

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- Спасибо.
- он не устаревшая, а больше комбинированная
- Да мне постгрес то только и нужен пока

Main message:
призма дает на всю базу типизированные запросы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

призма дает на всю базу типизированные запросы

--

## My telegram message #173662
**Time:** 24.07.2022 22:58:00 UTC+05:00
**Link:** https://t.me/nest_ru/173662

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- он не устаревшая, а больше комбинированная
- Да мне постгрес то только и нужен пока
- призма дает на всю базу типизированные запросы
- Жаль что нет джоина сущностей для чистогого sql

Main message:
это невозможно унифицировать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это невозможно унифицировать

--

## My telegram message #173797
**Time:** 25.07.2022 16:28:21 UTC+05:00
**Link:** https://t.me/nest_ru/173797

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кто-то пользуется Intl.NumberFormat или есть другая функция какая?
- @webundsoehne/nest-fastify-file-upload
- Всем привет. Ловлю цыганские фокцусы с typeorm, когда пытаюсь сделать встроенную сущность, а именно поле info с типом FileInfoEntity. postgresqueryrunner выкидывает следующее:  QueryFailedError: there is no unique constraint matching given keys for referenced table "file_media_library_entity"  Основная сущность  export abstract class FileMediaLibraryEntity implements FileMediaLibrary, Rev { @Column({ type: 'int', nullable: true }) public abstract readonly id?: number; @PrimaryColumn({ type: 'varchar', length: 255 }) public abstract readonly uid: string; @Column({ type: 'varchar', length: 255 }) public abstract readonly filename: string; @Column({ type: 'varchar', length: 20 }) public abstract readonly extension: string; @Column({ type: 'varchar', length: 255 }) public abstract readonly mimetype: string; @Column({ type: 'text' }) public abstract readonly description: string; @Column({ type: 'text' }) public abstract readonly path: string; @Column({ type: 'bigint' }) public abstract readonly size: number; @ManyToMany(() => FileCollectionMediaLibraryEntity) @JoinTable() public abstract readonly collections: FileCollectionMediaLibraryEntity[]; @Column(() => FileInfoEntity) public abstract readonly info?: FileInfoEntity; @Column({ type: 'jsonb', nullable: true }) public abstract readonly options?: unknown; @CreateDateColumn() public abstract readonly created: Date; @CreateDateColumn() public abstract readonly modified: Date; @CreateDateColumn() public abstract readonly deleted: Date; @VersionColumn() public abstract readonly rev: number; }  Встроенная сущность  @Entity() export abstract class FileInfoEntity implements FileInfo { @PrimaryGeneratedColumn() public abstract readonly id: number; //@Column(() => FileInfoCollectionEntity) public abstract readonly collection?: FileInfoCollectionEntity[]; }  Буду рад любой помощи
- А abstract это мода такая новая?

Main message:
будет потом наследоваться и заменять свойства

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

будет потом наследоваться и заменять свойства

--

## My telegram message #173802
**Time:** 25.07.2022 17:08:05 UTC+05:00
**Link:** https://t.me/nest_ru/173802

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет. Ловлю цыганские фокцусы с typeorm, когда пытаюсь сделать встроенную сущность, а именно поле info с типом FileInfoEntity. postgresqueryrunner выкидывает следующее:  QueryFailedError: there is no unique constraint matching given keys for referenced table "file_media_library_entity"  Основная сущность  export abstract class FileMediaLibraryEntity implements FileMediaLibrary, Rev { @Column({ type: 'int', nullable: true }) public abstract readonly id?: number; @PrimaryColumn({ type: 'varchar', length: 255 }) public abstract readonly uid: string; @Column({ type: 'varchar', length: 255 }) public abstract readonly filename: string; @Column({ type: 'varchar', length: 20 }) public abstract readonly extension: string; @Column({ type: 'varchar', length: 255 }) public abstract readonly mimetype: string; @Column({ type: 'text' }) public abstract readonly description: string; @Column({ type: 'text' }) public abstract readonly path: string; @Column({ type: 'bigint' }) public abstract readonly size: number; @ManyToMany(() => FileCollectionMediaLibraryEntity) @JoinTable() public abstract readonly collections: FileCollectionMediaLibraryEntity[]; @Column(() => FileInfoEntity) public abstract readonly info?: FileInfoEntity; @Column({ type: 'jsonb', nullable: true }) public abstract readonly options?: unknown; @CreateDateColumn() public abstract readonly created: Date; @CreateDateColumn() public abstract readonly modified: Date; @CreateDateColumn() public abstract readonly deleted: Date; @VersionColumn() public abstract readonly rev: number; }  Встроенная сущность  @Entity() export abstract class FileInfoEntity implements FileInfo { @PrimaryGeneratedColumn() public abstract readonly id: number; //@Column(() => FileInfoCollectionEntity) public abstract readonly collection?: FileInfoCollectionEntity[]; }  Буду рад любой помощи
- А abstract это мода такая новая?
- будет потом наследоваться и заменять свойства
- ну а зачем явно создавать экземпляры инфраструктурного класса?))

Main message:
Абстракт для наследования юзают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Абстракт для наследования юзают

--

