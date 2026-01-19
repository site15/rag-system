## My telegram message #30065
**Time:** 28.08.2019 12:36:08 UTC+05:00
**Link:** https://t.me/nest_ru/30065

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а то сейчас понабегают с кубер вопросами, а как запустить, а где логи, а как команду в контейнера выполнить а шо с базой делать про какой кубер идет речь если он даже докер контейнеры люди не умеют запускать в проде
- @kubernetes_ru  @docker_ru
- знаю, я там есть а от вопросов которые бывают в докер чате волосы сидеют такую бредятину бывает втирают
- Навоял GraphQL api. Но пара мутаций должна быть закрыта для внешнего мира, только определённые сервисы могут их выполнять. Как их закрыть от всех, подскажите в какую сторону копать?

Main message:
getRequest(context: ExecutionContext) { const ctx = GqlExecutionContext.create(context); return ctx.getContext().req; }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

getRequest(context: ExecutionContext) { const ctx = GqlExecutionContext.create(context); return ctx.getContext().req; }

--

## My telegram message #30069
**Time:** 28.08.2019 12:43:25 UTC+05:00
**Link:** https://t.me/nest_ru/30069

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- знаю, я там есть а от вопросов которые бывают в докер чате волосы сидеют такую бредятину бывает втирают
- Навоял GraphQL api. Но пара мутаций должна быть закрыта для внешнего мира, только определённые сервисы могут их выполнять. Как их закрыть от всех, подскажите в какую сторону копать?
- getRequest(context: ExecutionContext) { const ctx = GqlExecutionContext.create(context); return ctx.getContext().req; }
- GqlExecutionContext.create(context).getContext().req undefined

Main message:
https://gist.github.com/EndyKaufman/2864fb73351b67770d8aff2bfca8adf6

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://gist.github.com/EndyKaufman/2864fb73351b67770d8aff2bfca8adf6

--

## My telegram message #30074
**Time:** 28.08.2019 13:49:07 UTC+05:00
**Link:** https://t.me/nest_ru/30074

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- GqlExecutionContext.create(context).getContext().req undefined
- https://gist.github.com/EndyKaufman/2864fb73351b67770d8aff2bfca8adf6
- 😩
- Кароч, чтобы .getContext() не возвращал undefined надо в конфигурации сделать магию (явно передать запрос в контекст):  GraphQLModule.forRoot({ installSubscriptionHandlers: true, autoSchemaFile: 'schema.gql', context: ({req}) => ({...req}), }),

Main message:
у меня вот так  GraphQLModule.forRootAsync({ imports: [CoreModule.forFeature()], useClass: GraphqlConfigService })   https://gist.github.com/EndyKaufman/0ce3ff31fda696f30534e47423d2e6e3

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня вот так  GraphQLModule.forRootAsync({ imports: [CoreModule.forFeature()], useClass: GraphqlConfigService })   https://gist.github.com/EndyKaufman/0ce3ff31fda696f30534e47423d2e6e3

--

## My telegram message #30117
**Time:** 28.08.2019 18:40:46 UTC+05:00
**Link:** https://t.me/nest_ru/30117

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да )
- да, оно, в доке разбито на 2 модуля, поэтому и подумал, что тот в котором вставили forFeature для репозитоирия якобы заменяет предыдущий forRoot))
- forRoot - для app модуля, гед указываются конфиг для коннекта к базе forFeature - для модулей, где есть entity, для того, чтобы собственно создать провайдер репозитория, который потом можно заинжектить
- еще один минус у typeorm, у внутренностях они сами загружают через dotenv  .env файл и выходит что я сначала у тестах загружаю  .env.test , а потом еще typeorm загружает  .env dotenv выдает варнинги, выходит что env переменные с  .env перезаписывают те которых нету в  .env.test

Main message:
в typeorm@next вроде чет подругому вроде, ну я сам еще не трогал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в typeorm@next вроде чет подругому вроде, ну я сам еще не трогал

--

## My telegram message #30124
**Time:** 28.08.2019 23:08:33 UTC+05:00
**Link:** https://t.me/nest_ru/30124

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- forRoot - для app модуля, гед указываются конфиг для коннекта к базе forFeature - для модулей, где есть entity, для того, чтобы собственно создать провайдер репозитория, который потом можно заинжектить
- еще один минус у typeorm, у внутренностях они сами загружают через dotenv  .env файл и выходит что я сначала у тестах загружаю  .env.test , а потом еще typeorm загружает  .env dotenv выдает варнинги, выходит что env переменные с  .env перезаписывают те которых нету в  .env.test
- в typeorm@next вроде чет подругому вроде, ну я сам еще не трогал
- наконец-то не будет больше понятного  ? когда nest выдает ошибку что не смог найти зависимость для класса  https://github.com/nestjs/nest/pull/2725 версия 6.6.0

Main message:
Э, вроде по смыслу понятно все, по окружающим элементам

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Э, вроде по смыслу понятно все, по окружающим элементам

--

## My telegram message #30127
**Time:** 28.08.2019 23:10:15 UTC+05:00
**Link:** https://t.me/nest_ru/30127

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в typeorm@next вроде чет подругому вроде, ну я сам еще не трогал
- наконец-то не будет больше понятного  ? когда nest выдает ошибку что не смог найти зависимость для класса  https://github.com/nestjs/nest/pull/2725 версия 6.6.0
- Э, вроде по смыслу понятно все, по окружающим элементам
- так то да, но если можно лучше почему бы и нет

Main message:
Пулл реквест не смотрел, но это не так просто мне кажется, такого добится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Пулл реквест не смотрел, но это не так просто мне кажется, такого добится

--

## My telegram message #30144
**Time:** 29.08.2019 11:46:03 UTC+05:00
**Link:** https://t.me/nest_ru/30144

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это специфика тса и неста. в обычном монгусе все работает
- ванги в отпуске, надо больше информации, кода может кто-то поможет
- ну я поэтому и пишу в нест канал, а не нод)и очевидно что бинд контекста чаше встретится в тсе
- Мужики, обьясните на пальцах как работают отношения в typeorm? это нужно чтобы получить какие-то данные или запихнуть какие-то данные? есть примеры на русском?

Main message:
На гитхабе есть примеры и тесты, по или поизучай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На гитхабе есть примеры и тесты, по или поизучай

--

## My telegram message #30164
**Time:** 29.08.2019 13:53:34 UTC+05:00
**Link:** https://t.me/nest_ru/30164

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да не, мы отдельно его вызывать будем...

Main message:
я топлю за сиды в миграциях, так как сущности и сиды могут по времени размазанны быть, и например вчершние сиды и сегодняшние ентити не сядут в бд, упадет все и наоборот, если базу разворачивать с нуля это очень видно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я топлю за сиды в миграциях, так как сущности и сиды могут по времени размазанны быть, и например вчершние сиды и сегодняшние ентити не сядут в бд, упадет все и наоборот, если базу разворачивать с нуля это очень видно

--

## My telegram message #30391
**Time:** 01.09.2019 10:38:24 UTC+05:00
**Link:** https://t.me/nest_ru/30391

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 50% цпу висит. а что нест там делает хз
- все фигня что происходит с нодой включается с самого приложения  https://nodejs.org/api/tracing.html не видел я софта который бы подключился к ноде и сделал бы dump
- 👍
- Есть проблема с RxJS в связке с request запросами - а точнее утечка памяти , хоть убей не могу понять почему течет Был бы очень признателен если найдется добрая душа которая поможет ( RxJS6 используется в Backend (NestJS))

Main message:
Subscribe есть где нить?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Subscribe есть где нить?

--

## My telegram message #30405
**Time:** 01.09.2019 17:07:56 UTC+05:00
**Link:** https://t.me/nest_ru/30405

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @frct1 а подробнее ? как она от утечки спасет
- Что-то я сомневаюсь что в rxjs утечка, а не в вызываемых методах
- я сам в недоумении поверь ))
- Не, не должно

Main message:
Код где

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Код где

--

## My telegram message #30653
**Time:** 04.09.2019 15:17:53 UTC+05:00
**Link:** https://t.me/nest_ru/30653

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://github.com/rucken/core-nestjs/blob/develop/package.json#L62 Вот так пускаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/core-nestjs/blob/develop/package.json#L62 Вот так пускаю

--

## My telegram message #30665
**Time:** 04.09.2019 20:02:17 UTC+05:00
**Link:** https://t.me/nest_ru/30665

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это самый последний вариант, я склоняюсь к тому что бы прогнать код через ts ast и выстроить цепочку вызовов
- Ну стандартное сквозное логирование
- Возьми какой-нибудь трассировщик типа opentracing
- Подскажите, почему кастомные валидаторы всегда выполняются первыми? Типа  @isEmpty @isString @isExist(кастомный) email  В массиве ошибок выглядит как [ isExist, isEmpty, isString ]

Main message:
они же через OR какбы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

они же через OR какбы

--

## My telegram message #30671
**Time:** 04.09.2019 20:29:04 UTC+05:00
**Link:** https://t.me/nest_ru/30671

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Возьми какой-нибудь трассировщик типа opentracing
- Подскажите, почему кастомные валидаторы всегда выполняются первыми? Типа  @isEmpty @isString @isExist(кастомный) email  В массиве ошибок выглядит как [ isExist, isEmpty, isString ]
- они же через OR какбы
- А как сделать с порядком? Где почитать можно?

Main message:
не понимаю зачем?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не понимаю зачем?

--

## My telegram message #30672
**Time:** 04.09.2019 20:58:46 UTC+05:00
**Link:** https://t.me/nest_ru/30672

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Подскажите, почему кастомные валидаторы всегда выполняются первыми? Типа  @isEmpty @isString @isExist(кастомный) email  В массиве ошибок выглядит как [ isExist, isEmpty, isString ]
- они же через OR какбы
- А как сделать с порядком? Где почитать можно?
- не понимаю зачем?

Main message:
на фронте можешь пересортировать после получения

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на фронте можешь пересортировать после получения

--

## My telegram message #30679
**Time:** 04.09.2019 22:44:23 UTC+05:00
**Link:** https://t.me/nest_ru/30679

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Друзья подскажите какую статью или видео по тестированию нест?

Main message:
В гитхабе нест примеры есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В гитхабе нест примеры есть

--

## My telegram message #30704
**Time:** 05.09.2019 00:03:42 UTC+05:00
**Link:** https://t.me/nest_ru/30704

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://medium.com/better-programming/building-a-graphql-server-in-nestjs-f9ba34e773a3
- @amel_true Если я правильно понял твой вопрос в подкасте, то вот ссылка из доки про view  https://docs.nestjs.com/techniques/mvc
- Нест уже давно не обертка над экспрессом
- расскажи подробнее

Main message:
Ты в лучше на ангулар сделал рест и нагрузкой погоня нест и анг, вот это вот интересная тема

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты в лучше на ангулар сделал рест и нагрузкой погоня нест и анг, вот это вот интересная тема

--

## My telegram message #30759
**Time:** 05.09.2019 00:33:32 UTC+05:00
**Link:** https://t.me/nest_ru/30759

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В смысле поверх ничего)
- Большая часть, пока еще все равно отладка и настройка идет
- Тогда я не понял тут
- Ага, ну вот у нас есть задачи сращивания с текущей кодовой базой и нужно поддержать всё, что уже наработано. Кстати, express приложение на ура срастилось с nest, поделили просто по роутам

Main message:
я граф когда прикрутил, в режиме разработки в окончательном варианте у меня методы напрямую дергались сервиса, а в проде это все компилилось в микросервисы именно сервиса а не микросевриса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я граф когда прикрутил, в режиме разработки в окончательном варианте у меня методы напрямую дергались сервиса, а в проде это все компилилось в микросервисы именно сервиса а не микросевриса

--

## My telegram message #30761
**Time:** 05.09.2019 00:34:50 UTC+05:00
**Link:** https://t.me/nest_ru/30761

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
возьми граф лучше) у меня опыт с грпс не большой, ну граф реально проще))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

возьми граф лучше) у меня опыт с грпс не большой, ну граф реально проще))

--

## My telegram message #30763
**Time:** 05.09.2019 00:35:30 UTC+05:00
**Link:** https://t.me/nest_ru/30763

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я граф когда прикрутил, в режиме разработки в окончательном варианте у меня методы напрямую дергались сервиса, а в проде это все компилилось в микросервисы именно сервиса а не микросевриса
- да в этом плане, они совместимы абсолютно
- возьми граф лучше) у меня опыт с грпс не большой, ну граф реально проще))
- Граф у меня наружу торчит

Main message:
постман поддерживает теперь граф

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

постман поддерживает теперь граф

--

## My telegram message #30765
**Time:** 05.09.2019 00:36:10 UTC+05:00
**Link:** https://t.me/nest_ru/30765

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Граф у меня наружу торчит

Main message:
lа и между микросервсисами можно на графе тусить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

lа и между микросервсисами можно на графе тусить

--

## My telegram message #30767
**Time:** 05.09.2019 00:36:34 UTC+05:00
**Link:** https://t.me/nest_ru/30767

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да, но зачем? Есть же плейграунд)

Main message:
ну зато есть, в грпс нету ничего такого)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну зато есть, в грпс нету ничего такого)

--

## My telegram message #30769
**Time:** 05.09.2019 00:37:02 UTC+05:00
**Link:** https://t.me/nest_ru/30769

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Зачем? Это же даунгрейд по производительности

Main message:
чем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чем

--

## My telegram message #30772
**Time:** 05.09.2019 00:38:13 UTC+05:00
**Link:** https://t.me/nest_ru/30772

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy граф застафить работат через get это моветон?

Main message:
я не шарю, код пишу чтобы работал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я не шарю, код пишу чтобы работал

--

## My telegram message #30774
**Time:** 05.09.2019 00:38:45 UTC+05:00
**Link:** https://t.me/nest_ru/30774

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- GraphQL достаточно медленный на ноде.

Main message:
ну оптимизация она всегда есть, на чем бы ты не писал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну оптимизация она всегда есть, на чем бы ты не писал

--

## My telegram message #30778
**Time:** 05.09.2019 00:40:22 UTC+05:00
**Link:** https://t.me/nest_ru/30778

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
ато можно закопаться в терминах и к октябрю не выктаить релиз :)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ато можно закопаться в терминах и к октябрю не выктаить релиз :)

--

## My telegram message #30831
**Time:** 05.09.2019 10:38:36 UTC+05:00
**Link:** https://t.me/nest_ru/30831

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это же да
- Про такое не слышал даже
- ^^^
- @KaufmanEndy Ильшат эт че такое ? ^^

Main message:
ну там типа не рационально между сервисами общатся текстовым протоколом) лучше юзать чета бинарное, например грпс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну там типа не рационально между сервисами общатся текстовым протоколом) лучше юзать чета бинарное, например грпс

--

## My telegram message #30835
**Time:** 05.09.2019 10:41:16 UTC+05:00
**Link:** https://t.me/nest_ru/30835

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ^^^
- @KaufmanEndy Ильшат эт че такое ? ^^
- ну там типа не рационально между сервисами общатся текстовым протоколом) лучше юзать чета бинарное, например грпс
- Ну тут знаешь, если начинается такая экономия на спичках, то явно где-то просчет

Main message:
граф удобнее чем грпс, приятнее код писать и понятнее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

граф удобнее чем грпс, приятнее код писать и понятнее

--

## My telegram message #30886
**Time:** 05.09.2019 16:56:54 UTC+05:00
**Link:** https://t.me/nest_ru/30886

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Кстати немного удивлён, что HTTPService построен поверх  axios
- Да, пропустил про микросервисы, как вариант, сделать логирующий микросервис, нет?) У нас просто есть отдельный сервис, который просто принимает данные с запросом и отправляет дальше, когда запрос залогировался
- есть еще такая штука как istio, создается sidecar контейнер и можно ложить или секьюрить контейнер и т.д. но для каждого микросервиса отжирает ~500mb памяти надо ли такое ? хз
- Ого, что там такое монструозное, что так много ест

Main message:
Может оно просто на яве

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Может оно просто на яве

--

## My telegram message #30918
**Time:** 06.09.2019 22:25:35 UTC+05:00
**Link:** https://t.me/nest_ru/30918

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вообще работает не так как saga pattern
- ThomRick#4509 в дискорде по несту обратись Хороший парнишка, мне помог разобраться с сагами в моём кейсе
- Привет) использую crud typeorm і mongodb
- Не підкажеш як це пофіксити??? crud mongodb

Main message:
никак)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

никак)

--

## My telegram message #30920
**Time:** 06.09.2019 22:26:22 UTC+05:00
**Link:** https://t.me/nest_ru/30920

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет) использую crud typeorm і mongodb
- Не підкажеш як це пофіксити??? crud mongodb
- никак)
- Оу?

Main message:
@zMotivat0r у тя могет монго?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@zMotivat0r у тя могет монго?

--

## My telegram message #30925
**Time:** 06.09.2019 23:50:09 UTC+05:00
**Link:** https://t.me/nest_ru/30925

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Оу?
- @zMotivat0r у тя могет монго?
- Нет, typeorm там только queryBuilder для sql
- Кто-то пишет на js с бабелем? Или все TS используют?

Main message:
я на ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я на ts

--

## My telegram message #30928
**Time:** 07.09.2019 00:01:14 UTC+05:00
**Link:** https://t.me/nest_ru/30928

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Кто-то пишет на js с бабелем? Или все TS используют?
- я на ts
- я тоже, удобнее
- Всем привет Можно ли как-то в typeorm вернуть через leftJoin не вложенный объект, а конкретное свойство?

Main message:
непонятно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

непонятно

--

## My telegram message #30934
**Time:** 07.09.2019 00:13:11 UTC+05:00
**Link:** https://t.me/nest_ru/30934

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я тоже, удобнее
- Всем привет Можно ли как-то в typeorm вернуть через leftJoin не вложенный объект, а конкретное свойство?
- непонятно
- Есть 2 связанные таблицы Мне нужно по Id с 1 таблицы, вытащить значение со второй

Main message:
конкретнее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

конкретнее

--

## My telegram message #30936
**Time:** 07.09.2019 00:30:34 UTC+05:00
**Link:** https://t.me/nest_ru/30936

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет Можно ли как-то в typeorm вернуть через leftJoin не вложенный объект, а конкретное свойство?
- непонятно
- Есть 2 связанные таблицы Мне нужно по Id с 1 таблицы, вытащить значение со второй
- конкретнее

Main message:
если просто знаечние то addSelect

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если просто знаечние то addSelect

--

## My telegram message #30938
**Time:** 07.09.2019 00:33:56 UTC+05:00
**Link:** https://t.me/nest_ru/30938

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Есть 2 связанные таблицы Мне нужно по Id с 1 таблицы, вытащить значение со второй
- конкретнее
- если просто знаечние то addSelect
- SELECT persons.birthDate, persons.typeId, persons.nationalityId, persons.userId, persons.changeTime, type.typeName FROM persons INNER JOIN type ON persons.typeId = type.id WHERE persons.id = 1

Main message:
посмотри вот на это  https://github.com/typeorm/typeorm/blob/c8dbf099ba991c25d236790ab6fa903cfdc0b57c/docs/select-query-builder.md#joining-and-mapping-functionality  https://github.com/typeorm/typeorm/blob/c8dbf099ba991c25d236790ab6fa903cfdc0b57c/docs/select-query-builder.md#using-subqueries

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

посмотри вот на это  https://github.com/typeorm/typeorm/blob/c8dbf099ba991c25d236790ab6fa903cfdc0b57c/docs/select-query-builder.md#joining-and-mapping-functionality  https://github.com/typeorm/typeorm/blob/c8dbf099ba991c25d236790ab6fa903cfdc0b57c/docs/select-query-builder.md#using-subqueries

--

## My telegram message #30944
**Time:** 07.09.2019 00:39:36 UTC+05:00
**Link:** https://t.me/nest_ru/30944

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если просто знаечние то addSelect
- SELECT persons.birthDate, persons.typeId, persons.nationalityId, persons.userId, persons.changeTime, type.typeName FROM persons INNER JOIN type ON persons.typeId = type.id WHERE persons.id = 1
- посмотри вот на это  https://github.com/typeorm/typeorm/blob/c8dbf099ba991c25d236790ab6fa903cfdc0b57c/docs/select-query-builder.md#joining-and-mapping-functionality  https://github.com/typeorm/typeorm/blob/c8dbf099ba991c25d236790ab6fa903cfdc0b57c/docs/select-query-builder.md#using-subqueries
- Спасибо большое

Main message:
ага, не зачто, вот живой пример  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L196

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, не зачто, вот живой пример  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L196

--

## My telegram message #30967
**Time:** 09.09.2019 00:45:22 UTC+05:00
**Link:** https://t.me/nest_ru/30967

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так нет, но можно либо поправить и пересобрать, либо завести issue, я как руки дойдут добавлю.
- Привет, не подскажете, есть ли возможность выводить стек трейс сразу на ts файлы?
- для dev — запускай через ts-node
- Привет, есть провайдер (конфиг-провайдер который тащит асинхронно данные с внешнего источника), который объявлен через асинхронную  useFactory :  providers: [ { provide: ConfigService, useFactory: async () => envVariablesFactory(process.env.NODE_ENV), }, ]

Main message:
Вроде так можно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вроде так можно

--

## My telegram message #30971
**Time:** 09.09.2019 00:46:57 UTC+05:00
**Link:** https://t.me/nest_ru/30971

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- для dev — запускай через ts-node
- Привет, есть провайдер (конфиг-провайдер который тащит асинхронно данные с внешнего источника), который объявлен через асинхронную  useFactory :  providers: [ { provide: ConfigService, useFactory: async () => envVariablesFactory(process.env.NODE_ENV), }, ]
- Вроде так можно
- видел я уже этот пример... а как нест поймёт что сервис уже подгрузил что нужно?

Main message:
В глобал положи и в фактор сервиса возьми из глобал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В глобал положи и в фактор сервиса возьми из глобал

--

## My telegram message #30980
**Time:** 09.09.2019 09:32:16 UTC+05:00
**Link:** https://t.me/nest_ru/30980

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- видел я уже этот пример... а как нест поймёт что сервис уже подгрузил что нужно?
- В глобал положи и в фактор сервиса возьми из глобал
- какое же оно бахнутое....  @KaufmanEndy я пытаюсь через это сделать  https://docs.nestjs.com/fundamentals/async-providers
- Вопрос такой Пишу тесты на сервис работы с пользователями Используется mongoose Я подключил модуль mongo-memory-server И в тестах делаю так:  const module: TestingModule = await Test.createTestingModule({ imports: [ MongooseMemoryServerModule, MongooseModule.forFeature([ { name: USER_MODEL, schema: UserSchema, }, ]), ], providers: [UsersService], }).compile(); MongooseMemoryServerModule это обертка над MongooseModule, которая запускает mongo-memory-server (через useFactory) Это костыль или нормально?

Main message:
Кто нить юзает  https://github.com/cartant/rxjs-marbles ? Тесты для rxjs кода

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Кто нить юзает  https://github.com/cartant/rxjs-marbles ? Тесты для rxjs кода

--

## My telegram message #30996
**Time:** 09.09.2019 16:07:47 UTC+05:00
**Link:** https://t.me/nest_ru/30996

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а ну у меня в bootstrap грузится с dotenv дальше до старта неста все уже готово внутри Config еще валидация есть
- попробуй любопытсва ради сделать через асинхронную фабрику что-то реально асинхронное и куда-то это заинжектить я на скорую руку не разобрался и временно забил болт
- { provide: Config, useFactory: async () => { const buffer = await fsPromisify.readFile('package.json'); return JSON.parse(buffer.toString()); }, }, в контроллере  constructor(private packageJson: Config) {}  @Get('test') public test() { return this.packageJson; } выводит package.json
- Коллеги, подскажите, как вы поступаете с авторизацией? Классический вариант, который предлагает nest: миддлвара делает авторизацию, гарда закрывает ресурсы. Но это значит обработку авторизации на каждый запрос, что может быть излишне и вносит оверхед. Пока в голову приходит только всю логику авторизации положить в гарду и избавиться от миддлвары.

Main message:
там тока жвт смотришь, оно не тяжелое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там тока жвт смотришь, оно не тяжелое

--

## My telegram message #30998
**Time:** 09.09.2019 16:08:46 UTC+05:00
**Link:** https://t.me/nest_ru/30998

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- { provide: Config, useFactory: async () => { const buffer = await fsPromisify.readFile('package.json'); return JSON.parse(buffer.toString()); }, }, в контроллере  constructor(private packageJson: Config) {}  @Get('test') public test() { return this.packageJson; } выводит package.json
- Коллеги, подскажите, как вы поступаете с авторизацией? Классический вариант, который предлагает nest: миддлвара делает авторизацию, гарда закрывает ресурсы. Но это значит обработку авторизации на каждый запрос, что может быть излишне и вносит оверхед. Пока в голову приходит только всю логику авторизации положить в гарду и избавиться от миддлвары.
- там тока жвт смотришь, оно не тяжелое
- Зависит от того, какая у тебя схема авторизации.

Main message:
ну токен всегда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну токен всегда

--

## My telegram message #31000
**Time:** 09.09.2019 16:09:03 UTC+05:00
**Link:** https://t.me/nest_ru/31000

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там тока жвт смотришь, оно не тяжелое
- Зависит от того, какая у тебя схема авторизации.
- ну токен всегда
- нет

Main message:
ну лан

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну лан

--

