## My telegram message #33136
**Time:** 25.09.2019 21:26:21 UTC+05:00
**Link:** https://t.me/nest_ru/33136

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это чётко ложится в очереди
- Ну вот очередь в случаи неудачи вернет тебе ошибку задачу можно будет перезапустить или как то отрапортовать тоже самое и node cron а системным.. какие то костыли получаются
- Ну там тоже обёртки есть ) Велосипед с Кронос. Так то можно через setTimeout проверять
- Да я вообще хочу убедить что с системным кроном пора завязывать) Ну а на чет крона в данном случаи это глупости. Подписался на событие выполнил. Зачем линий раз дергать бд может там и заданий никаких нет)

Main message:
8 парсеров у меня запускаются в разное время и с разной переодичностью

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

8 парсеров у меня запускаются в разное время и с разной переодичностью

--

## My telegram message #33139
**Time:** 25.09.2019 21:26:48 UTC+05:00
**Link:** https://t.me/nest_ru/33139

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну там тоже обёртки есть ) Велосипед с Кронос. Так то можно через setTimeout проверять
- Да я вообще хочу убедить что с системным кроном пора завязывать) Ну а на чет крона в данном случаи это глупости. Подписался на событие выполнил. Зачем линий раз дергать бд может там и заданий никаких нет)
- 8 парсеров у меня запускаются в разное время и с разной переодичностью
- И как ты это делаешь ?

Main message:
9 кронов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

9 кронов

--

## My telegram message #33141
**Time:** 25.09.2019 21:27:04 UTC+05:00
**Link:** https://t.me/nest_ru/33141

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 8 парсеров у меня запускаются в разное время и с разной переодичностью
- И как ты это делаешь ?
- 9 кронов
- Это не тот случай

Main message:
Ок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ок

--

## My telegram message #33143
**Time:** 25.09.2019 21:27:22 UTC+05:00
**Link:** https://t.me/nest_ru/33143

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 9 кронов
- Это не тот случай
- Ок
- И 9 отдельных приложений ?

Main message:
Не

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не

--

## My telegram message #33146
**Time:** 25.09.2019 21:28:20 UTC+05:00
**Link:** https://t.me/nest_ru/33146

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- У тебя задачи не меняются. А тут может 100 задач и как они там будут работать хз И на логику они не влияют

Main message:
Там ципочку запускает каждый парсер, в ципочке уже дёргаются мс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там ципочку запускает каждый парсер, в ципочке уже дёргаются мс

--

## My telegram message #33154
**Time:** 25.09.2019 21:31:05 UTC+05:00
**Link:** https://t.me/nest_ru/33154

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Там ципочку запускает каждый парсер, в ципочке уже дёргаются мс
- Да, да. Нужно более правильно все это обдумать.
- https://github.com/agenda/agenda Во , она на Mongo может работать
- можешь события кидать и отправлять в очередь если что-то произошло

Main message:
Когда первое событие упадёт в кучу оно таймер обратного отсчёта пускает например 2 минут, если ещё прилетит событие то таймер сменится, старый прибрется

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Когда первое событие упадёт в кучу оно таймер обратного отсчёта пускает например 2 минут, если ещё прилетит событие то таймер сменится, старый прибрется

--

## My telegram message #33158
**Time:** 25.09.2019 21:35:44 UTC+05:00
**Link:** https://t.me/nest_ru/33158

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://github.com/agenda/agenda Во , она на Mongo может работать
- можешь события кидать и отправлять в очередь если что-то произошло
- Когда первое событие упадёт в кучу оно таймер обратного отсчёта пускает например 2 минут, если ещё прилетит событие то таймер сменится, старый прибрется
- https://github.com/anchan828/nest-bull/tree/master/packages/bull

Main message:
Ну или через нее, ну это надо разбираться, проще велосипед пульнуть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну или через нее, ну это надо разбираться, проще велосипед пульнуть

--

## My telegram message #33198
**Time:** 26.09.2019 00:33:13 UTC+05:00
**Link:** https://t.me/nest_ru/33198

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так все и рассматривается в куче. Никто не говорит что старые подходы это плохо. Но они не везде применимы. Ты просто усложняешь код получая не так много. Вот к примеру зачем тебе каскадное удаление если все используют softdelete? Жалко места на диске? Файлы ок раз в день пройдись по удаленным и удали с диска те которые уже месяц удалены. За что именно ты так переживаешь?

Main message:
не читал то что было ранее, но софт делет это один из способов, есть еще команд сорсинг когда у тя базы как таковой нету, у тя есть куча снимков которые наслаиваются, временные снимки в такой системе данные никогда не исчезнут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не читал то что было ранее, но софт делет это один из способов, есть еще команд сорсинг когда у тя базы как таковой нету, у тя есть куча снимков которые наслаиваются, временные снимки в такой системе данные никогда не исчезнут

--

## My telegram message #33204
**Time:** 26.09.2019 00:37:32 UTC+05:00
**Link:** https://t.me/nest_ru/33204

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да есть слабость) Если появится необходимость действительно что то проконтролировать и от этого многое будет зависить лучше написать запрос самому тут никакие орм не нужны
- То что нужно
- по идее тип инферится из самого массива
- Ну и бекапы. Бекапы наше все) Можно еще вести историю всех изменений прослушивать евент на обновление

Main message:
недавно тока находил, sql скрипт запускаешь в постгрее и у тя все таблицы текущие начинают логироватся сами)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

недавно тока находил, sql скрипт запускаешь в постгрее и у тя все таблицы текущие начинают логироватся сами)

--

## My telegram message #33211
**Time:** 26.09.2019 00:42:07 UTC+05:00
**Link:** https://t.me/nest_ru/33211

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну и бекапы. Бекапы наше все) Можно еще вести историю всех изменений прослушивать евент на обновление
- недавно тока находил, sql скрипт запускаешь в постгрее и у тя все таблицы текущие начинают логироватся сами)
- Нужно глянуть спс)
- сегодня видел это расширение, с исходников компилить нужно

Main message:
ну это пример, а есть еще просто скрипт, который почти тож самое делает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это пример, а есть еще просто скрипт, который почти тож самое делает

--

## My telegram message #33215
**Time:** 26.09.2019 00:42:58 UTC+05:00
**Link:** https://t.me/nest_ru/33215

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нужно глянуть спс)
- сегодня видел это расширение, с исходников компилить нужно
- ну это пример, а есть еще просто скрипт, который почти тож самое делает
- Так я скриптом по сути и делаю. Просто цепляюсь на .save()

Main message:
неа, именно в бд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа, именно в бд

--

## My telegram message #33218
**Time:** 26.09.2019 09:35:23 UTC+05:00
**Link:** https://t.me/nest_ru/33218

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну это пример, а есть еще просто скрипт, который почти тож самое делает
- Так я скриптом по сути и делаю. Просто цепляюсь на .save()
- неа, именно в бд
- ты про этот скрипт  https://wiki.postgresql.org/wiki/Audit_trigger ?

Main message:
Вот это находил  https://m.habr.com/ru/post/323618/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вот это находил  https://m.habr.com/ru/post/323618/

--

## My telegram message #33220
**Time:** 26.09.2019 09:47:34 UTC+05:00
**Link:** https://t.me/nest_ru/33220

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- неа, именно в бд
- ты про этот скрипт  https://wiki.postgresql.org/wiki/Audit_trigger ?
- Вот это находил  https://m.habr.com/ru/post/323618/
- они очень похожие

Main message:
Я в оракле похожую штуку делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я в оракле похожую штуку делал

--

## My telegram message #33259
**Time:** 26.09.2019 17:14:23 UTC+05:00
**Link:** https://t.me/nest_ru/33259

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет. Подскажите плиз как в nestjs правильно импортировать конфиги. В документации очень коротко написано и как для неподкованого в ангуляре - почти непонятно. Может у кого есть хороший пример, буду очень благодарен
- поищи в чате по поиску, уже не раз поднималась тема конфигов
- https://github.com/ye5no/studentsTest/ конфиги в src/tools/config (данные подставлются из .env в зависимости от среды - естественно он не запушен) в app.module.ts встраиваешь configService
- кто у нас тут nx workspace с нест юзает? наткнулся на ошибку - из node-builder всё собирает в один файл, а typeorm изза этого не может entity из файлов подтянуть. кто-то решал?

Main message:
Я решал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я решал

--

## My telegram message #33261
**Time:** 26.09.2019 17:18:19 UTC+05:00
**Link:** https://t.me/nest_ru/33261

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://github.com/ye5no/studentsTest/ конфиги в src/tools/config (данные подставлются из .env в зависимости от среды - естественно он не запушен) в app.module.ts встраиваешь configService
- кто у нас тут nx workspace с нест юзает? наткнулся на ошибку - из node-builder всё собирает в один файл, а typeorm изза этого не может entity из файлов подтянуть. кто-то решал?
- Я решал
- Как решал?

Main message:
)  https://github.com/rucken/cli/blob/generators-outputs/generators/angular.json

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)  https://github.com/rucken/cli/blob/generators-outputs/generators/angular.json

--

## My telegram message #33266
**Time:** 26.09.2019 18:30:32 UTC+05:00
**Link:** https://t.me/nest_ru/33266

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )  https://github.com/rucken/cli/blob/generators-outputs/generators/angular.json
- как-то там стремный конфиг  port: parseInt(process.env[`${prefix}TYPEORM_PORT`]), в ноде по прежнему нового стандарта по дефолту использующем десятичную систему в radix parseInt нету
- 👍
- An unhandled exception occurred: Could not find the implementation for builder @nrwl/builders:run-commands  не встречал такое?

Main message:
у тя видима отсутствует

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя видима отсутствует

--

## My telegram message #33270
**Time:** 26.09.2019 18:32:27 UTC+05:00
**Link:** https://t.me/nest_ru/33270

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 👍
- An unhandled exception occurred: Could not find the implementation for builder @nrwl/builders:run-commands  не встречал такое?
- у тя видима отсутствует
- а не, нашел. они там в 8 версии поменяли чутка. теперь оно в  @nrwl /workspace:run-commands

Main message:
ок,буду иметь ввиду

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ок,буду иметь ввиду

--

## My telegram message #33272
**Time:** 26.09.2019 21:09:25 UTC+05:00
**Link:** https://t.me/nest_ru/33272

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя видима отсутствует
- а не, нашел. они там в 8 версии поменяли чутка. теперь оно в  @nrwl /workspace:run-commands
- ок,буду иметь ввиду
- Спасибо тебе большое) все запустилось

Main message:
) незачто, я сам сначала свои билдеры делал для кастома всякого, птом наткнулся на эту штуку и дропнул свои велосипеды)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) незачто, я сам сначала свои билдеры делал для кастома всякого, птом наткнулся на эту штуку и дропнул свои велосипеды)

--

## My telegram message #33379
**Time:** 27.09.2019 22:15:21 UTC+05:00
**Link:** https://t.me/nest_ru/33379

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так я и не юзаю) экспорты в JS файле, а не TS

Main message:
Переведи в тс или тайпинги поищи или const gov=require('gov#o')

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Переведи в тс или тайпинги поищи или const gov=require('gov#o')

--

## My telegram message #33381
**Time:** 27.09.2019 22:19:56 UTC+05:00
**Link:** https://t.me/nest_ru/33381

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @ts_ru
- ага, спасибо
- Переведи в тс или тайпинги поищи или const gov=require('gov#o')
- Сайт правительства норвегии? 😂😂😂

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #33386
**Time:** 27.09.2019 22:24:30 UTC+05:00
**Link:** https://t.me/nest_ru/33386

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Переведи в тс или тайпинги поищи или const gov=require('gov#o')
- Сайт правительства норвегии? 😂😂😂
- )
- бери разер где куча ядер

Main message:
Я просто обоженный амд атлон, боюсь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я просто обоженный амд атлон, боюсь

--

## My telegram message #33390
**Time:** 27.09.2019 22:25:40 UTC+05:00
**Link:** https://t.me/nest_ru/33390

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Если что на amd не будет работать эмулятор Android

Main message:
Это критично да, мне эмули андро и айос нужны

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это критично да, мне эмули андро и айос нужны

--

## My telegram message #33392
**Time:** 27.09.2019 22:26:01 UTC+05:00
**Link:** https://t.me/nest_ru/33392

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я просто обоженный амд атлон, боюсь
- Если что на amd не будет работать эмулятор Android
- Это критично да, мне эмули андро и айос нужны
- с каких это пор хакинтоши на амд заводятся?

Main message:
Вот и думаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вот и думаю

--

## My telegram message #33397
**Time:** 27.09.2019 22:26:55 UTC+05:00
**Link:** https://t.me/nest_ru/33397

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://amd-osx.com
- Не работает
- ну хз
- Я на это попал, и ой как не удобно.

Main message:
Инет говорит что робит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Инет говорит что робит

--

## My telegram message #33403
**Time:** 27.09.2019 22:28:27 UTC+05:00
**Link:** https://t.me/nest_ru/33403

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хм.. не знал)
- Да блин сейчас Интел лучше, если выдает под 2000 тыс попугаев в cynebanch уже на 2 года хватит точно
- https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html
- Костыль ещё тот будет

Main message:
Мне даже не на хост машине а в виртуал хайпер ви, эту хрень пускануть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Мне даже не на хост машине а в виртуал хайпер ви, эту хрень пускануть

--

## My telegram message #33407
**Time:** 27.09.2019 22:29:04 UTC+05:00
**Link:** https://t.me/nest_ru/33407

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Хмм, я пробовал, писал что нельзя на Amd ...

Main message:
До райзена да не работало, вот щас хз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

До райзена да не работало, вот щас хз

--

## My telegram message #33410
**Time:** 27.09.2019 22:30:13 UTC+05:00
**Link:** https://t.me/nest_ru/33410

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я бы мак купил

Main message:
я потом для билда куплю сейчас нехочу ради лого лишние 30тыщ отдавать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я потом для билда куплю сейчас нехочу ради лого лишние 30тыщ отдавать

--

## My telegram message #33412
**Time:** 27.09.2019 22:31:02 UTC+05:00
**Link:** https://t.me/nest_ru/33412

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- До райзена да не работало, вот щас хз
- у меня мак 13 года первый с ретин все еще работает все тянет. Сейчас вроде как и смысла нету столько платить я бы хиаоми взял и убунту поставил
- я потом для билда куплю сейчас нехочу ради лого лишние 30тыщ отдавать
- @KaufmanEndy ну все, сейчас тебя уничтожат

Main message:
на написание проги уйдет год, потом куплю мак для билда, тестить чисто ща

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на написание проги уйдет год, потом куплю мак для билда, тестить чисто ща

--

## My telegram message #33416
**Time:** 27.09.2019 22:32:24 UTC+05:00
**Link:** https://t.me/nest_ru/33416

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- на написание проги уйдет год, потом куплю мак для билда, тестить чисто ща
- У меня и Интел и threadripper есть
- хакинтош на виртуалке тормозит сколько ему не давай
- Да, да

Main message:
просто интел дорого блин) опять же брэнд, за эти деньги амд в 1,4 раз мощнее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто интел дорого блин) опять же брэнд, за эти деньги амд в 1,4 раз мощнее

--

## My telegram message #33423
**Time:** 27.09.2019 22:33:23 UTC+05:00
**Link:** https://t.me/nest_ru/33423

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у меня i7 8gen

Main message:
опа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

опа

--

## My telegram message #33426
**Time:** 27.09.2019 22:33:53 UTC+05:00
**Link:** https://t.me/nest_ru/33426

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- за мак ты переплачивать не хочешь, а за интел готов

Main message:
ну блин за слово интел тыщ 7 , за слово мак - 30 тыщ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну блин за слово интел тыщ 7 , за слово мак - 30 тыщ

--

## My telegram message #33430
**Time:** 27.09.2019 22:35:15 UTC+05:00
**Link:** https://t.me/nest_ru/33430

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 8 поколение отлично работает на хосте

Main message:
ща пересоберу в днс, текущий комп в 70тыщ рублей, думаю интел слобее выйдет и дороже в два раза)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ща пересоберу в днс, текущий комп в 70тыщ рублей, думаю интел слобее выйдет и дороже в два раза)))

--

## My telegram message #33432
**Time:** 27.09.2019 22:36:04 UTC+05:00
**Link:** https://t.me/nest_ru/33432

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
ну для тестов думал дома на вирт гонят а билдить в прод либо через онлайн да, либо купить бу на авито

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну для тестов думал дома на вирт гонят а билдить в прод либо через онлайн да, либо купить бу на авито

--

## My telegram message #33440
**Time:** 27.09.2019 22:42:06 UTC+05:00
**Link:** https://t.me/nest_ru/33440

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ща пересоберу в днс, текущий комп в 70тыщ рублей, думаю интел слобее выйдет и дороже в два раза)))
- за 60к спокойно 8400 влазит с 6 ядрами
- ну для тестов думал дома на вирт гонят а билдить в прод либо через онлайн да, либо купить бу на авито
- @KaufmanEndy а там у тебя старый райзен

Main message:
на два года чтобы хватил, потом буду менять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на два года чтобы хватил, потом буду менять

--

## My telegram message #33442
**Time:** 27.09.2019 22:42:32 UTC+05:00
**Link:** https://t.me/nest_ru/33442

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну для тестов думал дома на вирт гонят а билдить в прод либо через онлайн да, либо купить бу на авито
- @KaufmanEndy а там у тебя старый райзен
- на два года чтобы хватил, потом буду менять
- да УЖЕ два года комп меняешь😁😁😁😁

Main message:
супер дорогой не нужен, в 70тыщ надо уложится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

супер дорогой не нужен, в 70тыщ надо уложится

--

## My telegram message #33445
**Time:** 27.09.2019 23:10:56 UTC+05:00
**Link:** https://t.me/nest_ru/33445

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @KaufmanEndy а там у тебя старый райзен
- на два года чтобы хватил, потом буду менять
- да УЖЕ два года комп меняешь😁😁😁😁
- супер дорогой не нужен, в 70тыщ надо уложится

Main message:
вот собрал на интеле  https://www.dns-shop.ru/custompc/configuration/3815c658ff4ea26a/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот собрал на интеле  https://www.dns-shop.ru/custompc/configuration/3815c658ff4ea26a/

--

## My telegram message #33448
**Time:** 27.09.2019 23:12:29 UTC+05:00
**Link:** https://t.me/nest_ru/33448

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да УЖЕ два года комп меняешь😁😁😁😁
- супер дорогой не нужен, в 70тыщ надо уложится
- вот собрал на интеле  https://www.dns-shop.ru/custompc/configuration/3815c658ff4ea26a/
- А зачем тебе процессор? Тебе же не видосики монтировать не в игры играть топывый процессор уже давно не нужен вот оперативка да это другое дело. Тем более интеловская встроенная графика вполне нормальная на счет амд не знаю

Main message:
мне игры делать надо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне игры делать надо

--

## My telegram message #33452
**Time:** 27.09.2019 23:13:10 UTC+05:00
**Link:** https://t.me/nest_ru/33452

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот собрал на интеле  https://www.dns-shop.ru/custompc/configuration/3815c658ff4ea26a/
- А зачем тебе процессор? Тебе же не видосики монтировать не в игры играть топывый процессор уже давно не нужен вот оперативка да это другое дело. Тем более интеловская встроенная графика вполне нормальная на счет амд не знаю
- мне игры делать надо
- computeruniverse не зашёл ?

Main message:
скорее всего там математика проца тоже будет жратся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

скорее всего там математика проца тоже будет жратся

--

## My telegram message #33454
**Time:** 27.09.2019 23:13:20 UTC+05:00
**Link:** https://t.me/nest_ru/33454

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- computeruniverse не зашёл ?

Main message:
цеа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

цеа

--

## My telegram message #33459
**Time:** 27.09.2019 23:14:00 UTC+05:00
**Link:** https://t.me/nest_ru/33459

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- скорее всего там математика проца тоже будет жратся
- я год назад при сборке много сэкономил
- цеа
- Причём 8700к я брал за 20к, а тут 25)

Main message:
атипо магаз)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

атипо магаз)

--

## My telegram message #33462
**Time:** 27.09.2019 23:14:29 UTC+05:00
**Link:** https://t.me/nest_ru/33462

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- цеа
- Причём 8700к я брал за 20к, а тут 25)
- атипо магаз)
- А насчёт кулера ты уверен что он норм будет охлаждать 8700 ?

Main message:
да тоже чувак один говорил, хз вот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да тоже чувак один говорил, хз вот

--

## My telegram message #33465
**Time:** 27.09.2019 23:14:58 UTC+05:00
**Link:** https://t.me/nest_ru/33465

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- атипо магаз)
- А насчёт кулера ты уверен что он норм будет охлаждать 8700 ?
- да тоже чувак один говорил, хз вот
- be quiet глянь

Main message:
оно там подбирает и фильтрует само в маuазе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оно там подбирает и фильтрует само в маuазе

--

## My telegram message #33469
**Time:** 27.09.2019 23:16:59 UTC+05:00
**Link:** https://t.me/nest_ru/33469

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да тоже чувак один говорил, хз вот
- be quiet глянь
- оно там подбирает и фильтрует само в маuазе
- Прост немного доплатив, можно получить пушку

Main message:
у тя интел хакинтош ставил?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя интел хакинтош ставил?

--

## My telegram message #33472
**Time:** 27.09.2019 23:18:04 UTC+05:00
**Link:** https://t.me/nest_ru/33472

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- оно там подбирает и фильтрует само в маuазе
- Прост немного доплатив, можно получить пушку
- у тя интел хакинтош ставил?
- так это ко мне вопрос ?

Main message:
так мне интел ваще нафиг не вперся) монополист ( не люблю таких)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так мне интел ваще нафиг не вперся) монополист ( не люблю таких)

--

## My telegram message #33477
**Time:** 27.09.2019 23:18:46 UTC+05:00
**Link:** https://t.me/nest_ru/33477

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя интел хакинтош ставил?
- так это ко мне вопрос ?
- так мне интел ваще нафиг не вперся) монополист ( не люблю таких)
- Не, не ставил

Main message:
ну просто хакинтош на интеле типа норм работает а на амд тупит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну просто хакинтош на интеле типа норм работает а на амд тупит

--

## My telegram message #33480
**Time:** 27.09.2019 23:20:03 UTC+05:00
**Link:** https://t.me/nest_ru/33480

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так мне интел ваще нафиг не вперся) монополист ( не люблю таких)
- Не, не ставил
- ну просто хакинтош на интеле типа норм работает а на амд тупит
- на интеле всё норм работает :)

Main message:
я там компаре процов скинул, как то блин жаба

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я там компаре процов скинул, как то блин жаба

--

## My telegram message #33485
**Time:** 27.09.2019 23:20:41 UTC+05:00
**Link:** https://t.me/nest_ru/33485

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну просто хакинтош на интеле типа норм работает а на амд тупит
- на интеле всё норм работает :)
- я там компаре процов скинул, как то блин жаба
- между какими ?

Main message:
https://www.dns-shop.ru/catalog/product/compare-by-codes/?cityId=34+++++&ids=1153673%2C1228160

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://www.dns-shop.ru/catalog/product/compare-by-codes/?cityId=34+++++&ids=1153673%2C1228160

--

## My telegram message #33492
**Time:** 27.09.2019 23:22:43 UTC+05:00
**Link:** https://t.me/nest_ru/33492

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я там компаре процов скинул, как то блин жаба
- между какими ?
- https://www.dns-shop.ru/catalog/product/compare-by-codes/?cityId=34+++++&ids=1153673%2C1228160
- https://cpu.userbenchmark.com/Compare/Intel-Core-i7-8700-vs-AMD-Ryzen-7-2700/3940vs3957

Main message:
да я в амд не сомневаюсь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да я в амд не сомневаюсь

--

## My telegram message #33497
**Time:** 27.09.2019 23:24:13 UTC+05:00
**Link:** https://t.me/nest_ru/33497

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://www.dns-shop.ru/catalog/product/compare-by-codes/?cityId=34+++++&ids=1153673%2C1228160
- https://cpu.userbenchmark.com/Compare/Intel-Core-i7-8700-vs-AMD-Ryzen-7-2700/3940vs3957
- да я в амд не сомневаюсь
- computeruniverse...

Main message:
да ща вот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да ща вот

--

## My telegram message #33499
**Time:** 27.09.2019 23:24:51 UTC+05:00
**Link:** https://t.me/nest_ru/33499

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да я в амд не сомневаюсь
- computeruniverse...
- да ща вот
- ну сурьезно сравни цены отдашь ты эти 30-40 евро за доставку и черт с ним выгода больше

Main message:
собираю)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

собираю)

--

## My telegram message #33502
**Time:** 27.09.2019 23:26:38 UTC+05:00
**Link:** https://t.me/nest_ru/33502

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да ща вот
- ну сурьезно сравни цены отдашь ты эти 30-40 евро за доставку и черт с ним выгода больше
- собираю)
- могу ошибаться но с CU я сэкономил около 10-13к чтоль

Main message:
ты из рашы?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты из рашы?

--

## My telegram message #33513
**Time:** 27.09.2019 23:30:57 UTC+05:00
**Link:** https://t.me/nest_ru/33513

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- +
- я вот присматривал обычный ксяоми не про он стоит копейки нормальный процессор два слота под оперативку два слота под диски
- В чём фишка ноутов сяоми ?
- цена качество

Main message:
6 лет на ноутах, устал, хочуч комп, там ваще было хоро раньше)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

6 лет на ноутах, устал, хочуч комп, там ваще было хоро раньше)

--

## My telegram message #33515
**Time:** 27.09.2019 23:31:13 UTC+05:00
**Link:** https://t.me/nest_ru/33515

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В чём фишка ноутов сяоми ?
- цена качество
- 6 лет на ноутах, устал, хочуч комп, там ваще было хоро раньше)
- https://hotline.ua/computer-noutbuki-netbuki/xiaomi-mi-notebook-lite-156-series/

Main message:
ноут только как тонкий клиент или командировка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ноут только как тонкий клиент или командировка

--

## My telegram message #33520
**Time:** 27.09.2019 23:36:03 UTC+05:00
**Link:** https://t.me/nest_ru/33520

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- могу ошибаться но с CU я сэкономил около 10-13к чтоль

Main message:
сайт у них не удобный, ну примерно тыщ 7 можно сэкономить на амд, ща интел буду смареть, ну это все не существенно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сайт у них не удобный, ну примерно тыщ 7 можно сэкономить на амд, ща интел буду смареть, ну это все не существенно

--

## My telegram message #33526
**Time:** 27.09.2019 23:52:28 UTC+05:00
**Link:** https://t.me/nest_ru/33526

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ноут только как тонкий клиент или командировка
- в прошку просто оперативку и диск не воткнешь
- сайт у них не удобный, ну примерно тыщ 7 можно сэкономить на амд, ща интел буду смареть, ну это все не существенно
- сайт да, не очень, тут не поспорить

Main message:
у меня есть ночь на принятие решения) сижу видосы смарю амд и интел

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня есть ночь на принятие решения) сижу видосы смарю амд и интел

--

## My telegram message #33536
**Time:** 28.09.2019 00:38:31 UTC+05:00
**Link:** https://t.me/nest_ru/33536

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а почему не накопить и взять макось ?

Main message:
временный комп, и в маке за брэнд 30-40тыщ тока, чет не в кайф)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

временный комп, и в маке за брэнд 30-40тыщ тока, чет не в кайф)

--

## My telegram message #33543
**Time:** 28.09.2019 01:04:58 UTC+05:00
**Link:** https://t.me/nest_ru/33543

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- десктоп на маке точно того не стоит.
- временный комп, и в маке за брэнд 30-40тыщ тока, чет не в кайф)
- 30-40) в пару раз больше
- Ребят, глупый вопрос по graphql, только начинаю, но чет завис на старте... Код такой  ... GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql', }) ... import { Field, Int, ObjectType } from 'type-graphql'; @ObjectType() export class Author { @Field(() => Int) id: number; @Field({ nullable: true }) firstName?: string; @Field({ nullable: true }) lastName?: string; } ... import { Query, Resolver } from 'type-graphql'; import { Author } from './models/author.model'; @Resolver(() => Author) export class AuthorResolver { @Query(() => Author, { name: 'author' }) getAuthor(): Author { return { id: 1, firstName: 'asd', lastName: 'asd', }; } }

Main message:
чет ты как будто смешал гарф куэль аполо с тайп графом

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чет ты как будто смешал гарф куэль аполо с тайп графом

--

## My telegram message #33548
**Time:** 28.09.2019 01:08:16 UTC+05:00
**Link:** https://t.me/nest_ru/33548

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 30-40) в пару раз больше
- Ребят, глупый вопрос по graphql, только начинаю, но чет завис на старте... Код такой  ... GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql', }) ... import { Field, Int, ObjectType } from 'type-graphql'; @ObjectType() export class Author { @Field(() => Int) id: number; @Field({ nullable: true }) firstName?: string; @Field({ nullable: true }) lastName?: string; } ... import { Query, Resolver } from 'type-graphql'; import { Author } from './models/author.model'; @Resolver(() => Author) export class AuthorResolver { @Query(() => Author, { name: 'author' }) getAuthor(): Author { return { id: 1, firstName: 'asd', lastName: 'asd', }; } }
- чет ты как будто смешал гарф куэль аполо с тайп графом
- Да, конечно, даже запускал первый, такая же лажа

Main message:
я тайп граф вязл и расширял просто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тайп граф вязл и расширял просто

--

## My telegram message #33553
**Time:** 28.09.2019 01:38:41 UTC+05:00
**Link:** https://t.me/nest_ru/33553

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ошибка выглядит так  { "errors": [ { "message": "Cannot return null for non-nullable field Recipe.id.", "locations": [ { "line": 3, "column": 5 } ], "path": [ "recipe", "id" ], "extensions": { "code": "INTERNAL_SERVER_ERROR", "exception": { "stacktrace": [ "Error: Cannot return null for non-nullable field Recipe.id.", " at completeValue (/home/innistry/Downloads/nest-master/sample/23-type-graphql/node_modules/graphql/execution/execute.js:560:13)", " at /home/innistry/Downloads/nest-master/sample/23-type-graphql/node_modules/graphql/execution/execute.js:492:16", " at process._tickCallback (internal/process/next_tick.js:68:7)" ] } } } ], "data": null }

Main message:
запрос с фронта покажи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

запрос с фронта покажи

--

## My telegram message #33557
**Time:** 28.09.2019 01:44:27 UTC+05:00
**Link:** https://t.me/nest_ru/33557

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ошибка выглядит так  { "errors": [ { "message": "Cannot return null for non-nullable field Recipe.id.", "locations": [ { "line": 3, "column": 5 } ], "path": [ "recipe", "id" ], "extensions": { "code": "INTERNAL_SERVER_ERROR", "exception": { "stacktrace": [ "Error: Cannot return null for non-nullable field Recipe.id.", " at completeValue (/home/innistry/Downloads/nest-master/sample/23-type-graphql/node_modules/graphql/execution/execute.js:560:13)", " at /home/innistry/Downloads/nest-master/sample/23-type-graphql/node_modules/graphql/execution/execute.js:492:16", " at process._tickCallback (internal/process/next_tick.js:68:7)" ] } } } ], "data": null }
- Здравствуйте! Подскажите, как правильно мне сделать проверку. У меня есть текущий пользователь в запросе. Я создаю новую сущность - статью - и хочу проверить, нет ли у текущего пользователя уже статьи с таким именем. Хотел написать кастомный валидатор, но оттуда не достучаться до запроса... Как быть?
- запрос с фронта покажи
- А я хотел валидатор в дтохе вешать на поля ))

Main message:
самый быстрый способ мне кажется это ловить ошибку базы, ну это лично мое мнение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

самый быстрый способ мне кажется это ловить ошибку базы, ну это лично мое мнение

--

## My telegram message #33559
**Time:** 28.09.2019 01:45:18 UTC+05:00
**Link:** https://t.me/nest_ru/33559

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А я хотел валидатор в дтохе вешать на поля ))

Main message:
да это как хуки у ентити, тока придется через type-di добрасывать репозиторий

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да это как хуки у ентити, тока придется через type-di добрасывать репозиторий

--

## My telegram message #33563
**Time:** 28.09.2019 01:46:40 UTC+05:00
**Link:** https://t.me/nest_ru/33563

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- самый быстрый способ мне кажется это ловить ошибку базы, ну это лично мое мнение
- Ага, можно чуть подробнее, как отловить конкретную ошибку из БД? Констрейнт уникальности по комбинации полей у меня в сущности уже есть
- да это как хуки у ентити, тока придется через type-di добрасывать репозиторий
- Так мне не репозиторий, мне ж именно текущего юзера надо

Main message:
и дальше гугли по счет перехвата ошибок в несте) я комп выбираю, некогда искать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и дальше гугли по счет перехвата ошибок в несте) я комп выбираю, некогда искать

--

## My telegram message #33565
**Time:** 28.09.2019 01:47:09 UTC+05:00
**Link:** https://t.me/nest_ru/33565

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так мне не репозиторий, мне ж именно текущего юзера надо

Main message:
через тайп ди можно добросить все что хочешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через тайп ди можно добросить все что хочешь

--

## My telegram message #33664
**Time:** 30.09.2019 00:58:41 UTC+05:00
**Link:** https://t.me/nest_ru/33664

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там можно юзать язык похожий на php для написание экстеншинов вот например zephir
- Ну это разумеется В эту сторону при работе с пхп я даже не смотрел Но тут область работы меняется и фундамент стека Пхп всегда имеет место быть, может какие-то не замысловатые микросервисы на нём и будут
- Привет Удавалось кому-то кастомизировать ошибки при использовании гвардов с passport-jwt ?
- @Post() @UsePipes(new JoiValidationPipe(createCatSchema)) async create(@Body() createCatDto: CreateCatDto) { this.catsService.create(createCatDto); } Ребят, а может кто подсказать откуда берется createCatSchema?

Main message:
где код взял

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

где код взял

--

## My telegram message #33668
**Time:** 30.09.2019 01:28:02 UTC+05:00
**Link:** https://t.me/nest_ru/33668

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @Post() @UsePipes(new JoiValidationPipe(createCatSchema)) async create(@Body() createCatDto: CreateCatDto) { this.catsService.create(createCatDto); } Ребят, а может кто подсказать откуда берется createCatSchema?
- где код взял
- https://docs.nestjs.com/pipes#binding-pipes
- Кто-нибудь знает как сделать mock такой функции?  https://prnt.sc/pcl1q4 ??

Main message:
я заливаю тестовые данные и сравниваю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я заливаю тестовые данные и сравниваю

--

## My telegram message #33672
**Time:** 30.09.2019 01:31:09 UTC+05:00
**Link:** https://t.me/nest_ru/33672

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://docs.nestjs.com/pipes#binding-pipes
- Кто-нибудь знает как сделать mock такой функции?  https://prnt.sc/pcl1q4 ??
- я заливаю тестовые данные и сравниваю
- мне нужно иметь 100% покрытие е2е и юнит тестов(ну или стремиться к этому). на е2е это оттестировано, там проблем нет

Main message:
а коверайдж разве не использует результат е2е и юнитов?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а коверайдж разве не использует результат е2е и юнитов?

--

## My telegram message #33675
**Time:** 30.09.2019 01:35:42 UTC+05:00
**Link:** https://t.me/nest_ru/33675

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я заливаю тестовые данные и сравниваю
- мне нужно иметь 100% покрытие е2е и юнит тестов(ну или стремиться к этому). на е2е это оттестировано, там проблем нет
- а коверайдж разве не использует результат е2е и юнитов?
- е2е покрыто. Ну даже если не в процентом покрытии дело. Есть такая проблема, что я не могу покрыть это юнитом, не люблю когда есть что-то, что я не сделал, потому что не разобрался, другой вопрос если это не возможно.... Если у кого есть идеи, было бы хорошо узнать

Main message:
ты сервис покрыл?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты сервис покрыл?

--

## My telegram message #33680
**Time:** 30.09.2019 01:39:59 UTC+05:00
**Link:** https://t.me/nest_ru/33680

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а коверайдж разве не использует результат е2е и юнитов?
- е2е покрыто. Ну даже если не в процентом покрытии дело. Есть такая проблема, что я не могу покрыть это юнитом, не люблю когда есть что-то, что я не сделал, потому что не разобрался, другой вопрос если это не возможно.... Если у кого есть идеи, было бы хорошо узнать
- ты сервис покрыл?
- вот весь describe функции. Все покрыто получается

Main message:
я тайп орм не тестю, так сегодня он, завтра другое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тайп орм не тестю, так сегодня он, завтра другое

--

## My telegram message #33682
**Time:** 30.09.2019 01:40:25 UTC+05:00
**Link:** https://t.me/nest_ru/33682

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты сервис покрыл?
- вот весь describe функции. Все покрыто получается
- я тайп орм не тестю, так сегодня он, завтра другое
- а через что ты на несте запросы делаешь?

Main message:
я тестю сервис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тестю сервис

--

## My telegram message #33693
**Time:** 30.09.2019 01:45:35 UTC+05:00
**Link:** https://t.me/nest_ru/33693

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я тайп орм не тестю, так сегодня он, завтра другое
- а через что ты на несте запросы делаешь?
- я тестю сервис
- ну у меня заказчик после индусов параноит на баги, так я раз написал тесты, юнит и е2е, и вообще любой баг просто исключен

Main message:
да я понимаю плюсы тестов)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да я понимаю плюсы тестов)

--

## My telegram message #33720
**Time:** 30.09.2019 14:44:33 UTC+05:00
**Link:** https://t.me/nest_ru/33720

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Парни, перенес  @nestjs/cqrs  на ангуляр теперь работает и с ssr  https://www.npmjs.com/package/ngx-cqrs

Main message:
👍

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍

--

## My telegram message #33740
**Time:** 01.10.2019 12:21:23 UTC+05:00
**Link:** https://t.me/nest_ru/33740

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У меня есть вот такой код public async sendProxy() { await  request.post (proxyUrl).auth(basicAuthUsername || '', basicAuthPassword || ''); this.logger.log('POST', proxyUrl); } Подскажите, как сделать красиво retry? Типа если не получили ответ, то делаем 5 попыток с интервалом в минуту В самом конце просто выйти из приложения process.exit(1)
- надо бы погуглить -  https://stackoverflow.com/a/53012640/3945261
- А как это будет в моем коде?
- return this.http .get('http://localhost:3000/api/asd') .pipe( map(() => { console.log('ok') return 1; }), retryWhen(errors => errors.pipe(delay(1000), take(5), concat(throwError("Giving up Retry.!")))), catchError((err) => { console.error('fck', err) return throwError(err); })); 5 запросов каждую секунду

Main message:
можно последовательно вызвать 5 промисов и проверять отработал ли предыдущий или нет  let req; try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ } } } } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно последовательно вызвать 5 промисов и проверять отработал ли предыдущий или нет  let req; try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ } } } } }

--

## My telegram message #33743
**Time:** 01.10.2019 12:24:08 UTC+05:00
**Link:** https://t.me/nest_ru/33743

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А как это будет в моем коде?
- return this.http .get('http://localhost:3000/api/asd') .pipe( map(() => { console.log('ok') return 1; }), retryWhen(errors => errors.pipe(delay(1000), take(5), concat(throwError("Giving up Retry.!")))), catchError((err) => { console.error('fck', err) return throwError(err); })); 5 запросов каждую секунду
- можно последовательно вызвать 5 промисов и проверять отработал ли предыдущий или нет  let req; try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ } } } } }
- лучше не надо так ) точнее не надо так делать вообще

Main message:
ну можно же, вдруг девушка не хочет учиться программировать а просто работает кодером временно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну можно же, вдруг девушка не хочет учиться программировать а просто работает кодером временно

--

## My telegram message #33745
**Time:** 01.10.2019 12:25:08 UTC+05:00
**Link:** https://t.me/nest_ru/33745

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно последовательно вызвать 5 промисов и проверять отработал ли предыдущий или нет  let req; try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ try{ req=await request();}catch(e){ } } } } }
- лучше не надо так ) точнее не надо так делать вообще
- ну можно же, вдруг девушка не хочет учиться программировать а просто работает кодером временно
- а если надо будет 30 вызовов ? тоже так ctrl c + v ?)

Main message:
а почему нет, в индии за это раньше деньги норм людям платили

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а почему нет, в индии за это раньше деньги норм людям платили

--

## My telegram message #33857
**Time:** 01.10.2019 23:10:51 UTC+05:00
**Link:** https://t.me/nest_ru/33857

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Т.е. не использовать Joi?
- забей на Joi (по крайней мере для валидации ДТО и сущностей)
- А почему если не секрет? Удобная же штука
- Можно юзать и joi вместо class validator

Main message:
в класс трансформ вроде оже можно описать схему

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в класс трансформ вроде оже можно описать схему

--

## My telegram message #33860
**Time:** 01.10.2019 23:12:11 UTC+05:00
**Link:** https://t.me/nest_ru/33860

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А почему если не секрет? Удобная же штука
- Можно юзать и joi вместо class validator
- в класс трансформ вроде оже можно описать схему
- Да класс валидатор по мне вещь удобнее

Main message:
если софт на динамике построен весь, нет смысла на декораторы смареть) да там и кода как такового нету

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если софт на динамике построен весь, нет смысла на декораторы смареть) да там и кода как такового нету

--

## My telegram message #33864
**Time:** 01.10.2019 23:13:23 UTC+05:00
**Link:** https://t.me/nest_ru/33864

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в класс трансформ вроде оже можно описать схему
- Да класс валидатор по мне вещь удобнее
- если софт на динамике построен весь, нет смысла на декораторы смареть) да там и кода как такового нету
- Joi гуд для js

Main message:
таджик делает всетки)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

таджик делает всетки)

--

## My telegram message #33866
**Time:** 01.10.2019 23:13:30 UTC+05:00
**Link:** https://t.me/nest_ru/33866

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если софт на динамике построен весь, нет смысла на декораторы смареть) да там и кода как такового нету
- Joi гуд для js
- таджик делает всетки)
- Попробую завтра с class-validador заюзать

Main message:
наш чувак)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

наш чувак)

--

## My telegram message #33872
**Time:** 01.10.2019 23:31:17 UTC+05:00
**Link:** https://t.me/nest_ru/33872

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- таджик делает всетки)
- Попробую завтра с class-validador заюзать
- наш чувак)
- Класс валидатор?

Main message:
ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага

--

## My telegram message #33878
**Time:** 01.10.2019 23:41:16 UTC+05:00
**Link:** https://t.me/nest_ru/33878

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Класс валидатор?
- ага
- Неа
- нет, joi лучше подходит когда у тебя правила валидации сложные

Main message:
я их юзаю потомучто шарю код между анг и нест, удобно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я их юзаю потомучто шарю код между анг и нест, удобно

--

## My telegram message #33885
**Time:** 01.10.2019 23:43:06 UTC+05:00
**Link:** https://t.me/nest_ru/33885

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Вижу код на React и хочется вырвать себе глаза

Main message:
там от разраба зависит все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там от разраба зависит все

--

## My telegram message #33888
**Time:** 01.10.2019 23:43:45 UTC+05:00
**Link:** https://t.me/nest_ru/33888

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну кстати норм, ща на нем пишу, доволен

Main message:
балин вот хз, смесь анг1 и реакт, если хочется чегото нового и острыхь ощущений всем советую stencil

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

балин вот хз, смесь анг1 и реакт, если хочется чегото нового и острыхь ощущений всем советую stencil

--

## My telegram message #33890
**Time:** 01.10.2019 23:44:27 UTC+05:00
**Link:** https://t.me/nest_ru/33890

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Либо он принимает, либо нет😂😂
- 😂👍
- балин вот хз, смесь анг1 и реакт, если хочется чегото нового и острыхь ощущений всем советую stencil
- На Вью можно писать норм на классах и декораторах и тс

Main message:
ну вуй прям ваще нет), да он удобен как и был удоьен анг1, да он компонентный как реакт, ну блин етьс реакт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну вуй прям ваще нет), да он удобен как и был удоьен анг1, да он компонентный как реакт, ну блин етьс реакт

--

## My telegram message #33899
**Time:** 01.10.2019 23:45:46 UTC+05:00
**Link:** https://t.me/nest_ru/33899

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если бы переходил с ангуляра, то взял бы vue, нафиг реакт )
- Ага
- Мне не нравится, что все в одном файле смешивания
- Ангуляр единственный будет ООП

Main message:
вуй как поехать в свой старый город и подойти к своей старой школе а она обшита и асфальт везде и ты такой о клева наверное тут теперь учится, а по факту хер))) все тоже самое просто скин другой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вуй как поехать в свой старый город и подойти к своей старой школе а она обшита и асфальт везде и ты такой о клева наверное тут теперь учится, а по факту хер))) все тоже самое просто скин другой

--

## My telegram message #33906
**Time:** 01.10.2019 23:47:40 UTC+05:00
**Link:** https://t.me/nest_ru/33906

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Там можно разделить я быстро привык кстати) но лучше ангуляра имхо ничего нет

Main message:
я два часа на вуй потратил и блин уже понимал как ваще на нем писать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я два часа на вуй потратил и блин уже понимал как ваще на нем писать

--

## My telegram message #33914
**Time:** 01.10.2019 23:49:26 UTC+05:00
**Link:** https://t.me/nest_ru/33914

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я два часа на вуй потратил и блин уже понимал как ваще на нем писать
- После ангуляра на Вью изи, так же я знакомому посоветовал Вью как первый фрейм и он сразу въехал в ангуляр потом
- Аналогично. Но после анг это гораздо меньше времени тратит
- 😁

Main message:
просто я то понимаю что анг фрэйм для всего (наверное тока я один это и понимаю), а вуй это рендор фронта с биндингом двухсторонним

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто я то понимаю что анг фрэйм для всего (наверное тока я один это и понимаю), а вуй это рендор фронта с биндингом двухсторонним

--

## My telegram message #33919
**Time:** 01.10.2019 23:50:47 UTC+05:00
**Link:** https://t.me/nest_ru/33919

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- просто я то понимаю что анг фрэйм для всего (наверное тока я один это и понимаю), а вуй это рендор фронта с биндингом двухсторонним
- Ну там устоявшаяся тематика - vuex, vue router
- Не один. Я после терминального дашбоарда от Никиты думал как бы втащить ангулар на бэк. Но решил, что это слишком:-)
- Поэтому вилосипедов по минимуму, на реакте хуже

Main message:
блин я потыка redux observble и axios на этих штуках можно кросфрэйм логику норм писать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

блин я потыка redux observble и axios на этих штуках можно кросфрэйм логику норм писать

--

## My telegram message #33921
**Time:** 01.10.2019 23:51:36 UTC+05:00
**Link:** https://t.me/nest_ru/33921

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не один. Я после терминального дашбоарда от Никиты думал как бы втащить ангулар на бэк. Но решил, что это слишком:-)
- Поэтому вилосипедов по минимуму, на реакте хуже
- блин я потыка redux observble и axios на этих штуках можно кросфрэйм логику норм писать
- Redux sagas redux observable, redux, mobx

Main message:
не, без саги

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, без саги

--

## My telegram message #33924
**Time:** 01.10.2019 23:51:49 UTC+05:00
**Link:** https://t.me/nest_ru/33924

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- блин я потыка redux observble и axios на этих штуках можно кросфрэйм логику норм писать
- Redux sagas redux observable, redux, mobx
- не, без саги
- Репктщику сложно быть

Main message:
это да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это да

--

## My telegram message #33927
**Time:** 01.10.2019 23:52:18 UTC+05:00
**Link:** https://t.me/nest_ru/33927

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Можно даже без axios. Есть же rxjs/ajax и rxjs/websocket

Main message:
там вроде нету интнерцепторов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там вроде нету интнерцепторов

--

## My telegram message #33930
**Time:** 01.10.2019 23:52:52 UTC+05:00
**Link:** https://t.me/nest_ru/33930

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- В несте саги есть в cqrs вроде тоже

Main message:
чувак же наш сделал сагу на нест cqrs для ангулар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чувак же наш сделал сагу на нест cqrs для ангулар

--

## My telegram message #33934
**Time:** 01.10.2019 23:53:48 UTC+05:00
**Link:** https://t.me/nest_ru/33934

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Возможно. Так глубоко не копал

Main message:
просто это же крутая фича, там вся сериализация происходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто это же крутая фича, там вся сериализация происходит

--

## My telegram message #33936
**Time:** 01.10.2019 23:54:16 UTC+05:00
**Link:** https://t.me/nest_ru/33936

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- чувак же наш сделал сагу на нест cqrs для ангулар
- Видимо я пропустил)
- просто это же крутая фича, там вся сериализация происходит
- На днях

Main message:
👇🏾

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👇🏾

--

## My telegram message #33937
**Time:** 01.10.2019 23:54:16 UTC+05:00
**Link:** https://t.me/nest_ru/33937

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Видимо я пропустил)
- просто это же крутая фича, там вся сериализация происходит
- На днях
- 👇🏾

Main message:
Парни, перенес  @nestjs/cqrs  на ангуляр теперь работает и с ssr  https://www.npmjs.com/package/ngx-cqrs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Парни, перенес  @nestjs/cqrs  на ангуляр теперь работает и с ssr  https://www.npmjs.com/package/ngx-cqrs

--

## My telegram message #33942
**Time:** 02.10.2019 00:15:46 UTC+05:00
**Link:** https://t.me/nest_ru/33942

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Парни, перенес  @nestjs/cqrs  на ангуляр теперь работает и с ssr  https://www.npmjs.com/package/ngx-cqrs
- 👍
- если по говнокоду определять уровень инструмента то далеко не уедешь)
- Я не хейчу, просто это опубликовано как статя

Main message:
ну это и не говно, обычный жэс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это и не говно, обычный жэс

--

## My telegram message #33945
**Time:** 02.10.2019 00:16:21 UTC+05:00
**Link:** https://t.me/nest_ru/33945

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если по говнокоду определять уровень инструмента то далеко не уедешь)
- Я не хейчу, просто это опубликовано как статя
- ну это и не говно, обычный жэс
- Ну меня смущает, что это не функция класса

Main message:
с функцией класса там вроде еще хуже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с функцией класса там вроде еще хуже

--

## My telegram message #33949
**Time:** 02.10.2019 00:18:29 UTC+05:00
**Link:** https://t.me/nest_ru/33949

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну это и не говно, обычный жэс
- Ну меня смущает, что это не функция класса
- с функцией класса там вроде еще хуже
- Надо, но все равно это лучше. А если сделать не метод, а свойство-стрелочная функция, то и биндить не надо

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #33955
**Time:** 02.10.2019 00:22:35 UTC+05:00
**Link:** https://t.me/nest_ru/33955

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- с функцией класса там вроде еще хуже
- Надо, но все равно это лучше. А если сделать не метод, а свойство-стрелочная функция, то и биндить не надо
- )
- Мне тут ещё недавно axios произнесли как экшиис. Долго не мог понять о чем речь

Main message:
это какой то сеньер мне привил, я раньше говорил фалсе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это какой то сеньер мне привил, я раньше говорил фалсе

--

## My telegram message #33959
**Time:** 02.10.2019 00:25:42 UTC+05:00
**Link:** https://t.me/nest_ru/33959

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )
- Мне тут ещё недавно axios произнесли как экшиис. Долго не мог понять о чем речь
- это какой то сеньер мне привил, я раньше говорил фалсе
- 😂😂😂 соберись, тряпка

Main message:
комп 6 раз перезаказал, ща на этом остановился  https://www.dns-shop.ru/custompc/configuration/24c31c8bb1e26736/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

комп 6 раз перезаказал, ща на этом остановился  https://www.dns-shop.ru/custompc/configuration/24c31c8bb1e26736/

--

## My telegram message #33967
**Time:** 02.10.2019 06:32:16 UTC+05:00
**Link:** https://t.me/nest_ru/33967

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 😂😂😂 соберись, тряпка
- комп 6 раз перезаказал, ща на этом остановился  https://www.dns-shop.ru/custompc/configuration/24c31c8bb1e26736/
- А он удаляет лишние поля?
- подскажите, как можно реализовать потоковую передачу данных обратно на клиент пример на серере я получаю данные так  https://mongoosejs.com/docs/api/query.html#query_Query-cursor и клиенту необходимо так же в потоке их отдавать, по мере выюорки данных

Main message:
По веб сокетам, клиент начинает слушать поток

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

По веб сокетам, клиент начинает слушать поток

--

## My telegram message #33980
**Time:** 02.10.2019 12:06:54 UTC+05:00
**Link:** https://t.me/nest_ru/33980

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Господа, киньте, пожалуйста, в меня примером правильного конфига подключения базы данных через переменные окружения и модуль dotenv. Или, если в Nest принято использовать какой-то другой подход, тоже прошу пример. Сейчас реализовал конфиг примерно вот так, но мне кажется, что это неправильное использование DI.  https://gist.github.com/joseluisq/b82716f76ab76eee071f53bdd8356530

Main message:
у меня типа свой потход есть, это может и н правильно, но я так юзаю  https://github.com/rucken/core-nestjs/blob/develop/apps/demo/src/main.ts у каждого модуля свой конфиг токен, значения можно передавать как через провайдеры так и через модуль и метод forRoot(параметры), тайп орм конфигурирую через ormconfig.js, через модуль тока ентити добрасываю все конфиги устанавливаются в майне

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня типа свой потход есть, это может и н правильно, но я так юзаю  https://github.com/rucken/core-nestjs/blob/develop/apps/demo/src/main.ts у каждого модуля свой конфиг токен, значения можно передавать как через провайдеры так и через модуль и метод forRoot(параметры), тайп орм конфигурирую через ormconfig.js, через модуль тока ентити добрасываю все конфиги устанавливаются в майне

--

## My telegram message #33984
**Time:** 02.10.2019 12:16:08 UTC+05:00
**Link:** https://t.me/nest_ru/33984

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://devblogs.microsoft.com/typescript/announcing-typescript-3-7-beta/

Main message:
оу, уже типна можно переключаться?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оу, уже типна можно переключаться?

--

## My telegram message #34005
**Time:** 02.10.2019 12:27:54 UTC+05:00
**Link:** https://t.me/nest_ru/34005

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- этот блок в доке не менялся вот года два точно, там нужно вносить предложения, которые актуальны на сегодняшний день
- А для разработки локально пойдет и dotenv
- да эт ладно. вот assert-ы хороши
- да локально-то фиг с ним, можно придумать миллион способов как это сделать +- адекватно, а вот как быть с продакшеном… пока какого-то вау-решения я не придумал, хотя уже 2 вечера на это убил.

Main message:
на проде из енв берется же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на проде из енв берется же

--

