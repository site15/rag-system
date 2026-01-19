## My telegram message #46822
**Time:** 29.12.2019 19:48:09 UTC+05:00
**Link:** https://t.me/nest_ru/46822

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребят, вопрос возник по пайпам. Нужно ли их прописывать в экспортах модуля? (все таки pipe - это провайдер, и его можно инжектить). но фишка в том, что даже без прописывания в экспортах все работает. про что говорю собственно:  @Module({ imports: [TypeOrmModule.forFeature([User])], providers: [ UsersService, UserExistsPipe, ], exports: [ UsersService, ], }) export class UsersModule {}  пример вызова в другом модуле  @Body( new ValidationPipe({ transform: true }), UserExistsPipe ) user: UserRegistrationDto,  - то есть нест сам создаст инстанс класса (new UserExistsPipe()). и ошибки не будет и это как-то странно, ведь я наружу из модуля не экспортил

Main message:
В несте диай не всегда правильно работает, может ты и прав

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В несте диай не всегда правильно работает, может ты и прав

--

## My telegram message #46934
**Time:** 31.12.2019 18:55:39 UTC+05:00
**Link:** https://t.me/nest_ru/46934

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ++ сколько я натрахался перед тем как к этому пришел
- я столько натрахался до как к этом пришел, а еще больше когда уходил
- так ты же сам сказал что системный не используешь?
- Нет

Main message:
Рабит наверное

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Рабит наверное

--

## My telegram message #46938
**Time:** 31.12.2019 18:56:46 UTC+05:00
**Link:** https://t.me/nest_ru/46938

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ваше здоровье:-)

Main message:
Взаимно!

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Взаимно!

--

## My telegram message #46943
**Time:** 31.12.2019 18:58:51 UTC+05:00
**Link:** https://t.me/nest_ru/46943

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Короче на базе proton ентити генерит тайп граф

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Короче на базе proton ентити генерит тайп граф

--

## My telegram message #46945
**Time:** 31.12.2019 18:59:45 UTC+05:00
**Link:** https://t.me/nest_ru/46945

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Почти) вчера граф по новой все подрубал и в анг и нест, прикольное стало, протон буду юзать для орм, след год

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Почти) вчера граф по новой все подрубал и в анг и нест, прикольное стало, протон буду юзать для орм, след год

--

## My telegram message #46953
**Time:** 31.12.2019 19:12:26 UTC+05:00
**Link:** https://t.me/nest_ru/46953

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- видно что ты гонишься за технологиями за хайпом
- Это называется постоянно эволюционировать и пытаться быть конкурентоспособным.
- и ни одну с технологий не выучить )
- А что значит выучить? Вот у меня есть проект в котором собранно все о чем я знаю, если я переписывал его на react vue angular и все это работало разве это не значит выучить?

Main message:
Тайп орм на работе, дома в пиве и сериалах этот год прошёл, без орм тоесть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тайп орм на работе, дома в пиве и сериалах этот год прошёл, без орм тоесть

--

## My telegram message #46995
**Time:** 31.12.2019 23:47:58 UTC+05:00
**Link:** https://t.me/nest_ru/46995

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- У меня нг через 15 минут

Main message:
+

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

+

--

## My telegram message #46999
**Time:** 01.01.2020 00:05:08 UTC+05:00
**Link:** https://t.me/nest_ru/46999

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У нас тут не политика
- У меня нг через 15 минут
- +
- Так в России часовых поясов сколько, там нг ещё утром был во владике

Main message:
СНГ!

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

СНГ!

--

## My telegram message #47027
**Time:** 01.01.2020 03:06:28 UTC+05:00
**Link:** https://t.me/nest_ru/47027

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
С новым годом!

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

С новым годом!

--

## My telegram message #47232
**Time:** 03.01.2020 18:21:25 UTC+05:00
**Link:** https://t.me/nest_ru/47232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребят, а кто как делит большие классы по файлам? Неприятно работать с сервисом в 1000+ строк кода, хочется разбить на части по разным файлам, в ноде с этим все еще проблемы, поэтому у кого какой подход прижился?

Main message:
В вскод можно выделять и рефакторить куски на методы, разбей все на функции одного класса, птом класс разбить на неск классов, птом раскидать по модулям, я так не давно делал, тоже 3000строк в методе было, в итоге на 4 микросервиса разбилось, мал по мало

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В вскод можно выделять и рефакторить куски на методы, разбей все на функции одного класса, птом класс разбить на неск классов, птом раскидать по модулям, я так не давно делал, тоже 3000строк в методе было, в итоге на 4 микросервиса разбилось, мал по мало

--

## My telegram message #47447
**Time:** 06.01.2020 22:03:30 UTC+05:00
**Link:** https://t.me/nest_ru/47447

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да я сколько не пытался его ускорить, так и не получилось достать до уровня РЕСТ. Как не крути, проблема с тем что огромное количество методов кэширования не доступны для графа, не даст ему возможность достигнуть уровня РЕСТ.

Main message:
эээ) ты че, граф это протокол, если тормозную реализацию сделал, граф тут не причем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эээ) ты че, граф это протокол, если тормозную реализацию сделал, граф тут не причем

--

## My telegram message #47452
**Time:** 06.01.2020 22:06:40 UTC+05:00
**Link:** https://t.me/nest_ru/47452

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- эээ) ты че, граф это протокол, если тормозную реализацию сделал, граф тут не причем
- на самом деле я только на коленке граф юзал так чисто посмотреть но есть такая штука  https://github.com/krislefeber/nestjs-dataloader
- Может быть конечно и так. Как говорил  @alex_kulagin для того что бы было быстро, нужно руку набить.
- ну у меня пока тоже медленно, но я работаю над этим

Main message:
я запрос графа конвертил в запрос для орм и в итоге скорость таже, разницы нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я запрос графа конвертил в запрос для орм и в итоге скорость таже, разницы нет

--

## My telegram message #47455
**Time:** 06.01.2020 22:07:20 UTC+05:00
**Link:** https://t.me/nest_ru/47455

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Может быть конечно и так. Как говорил  @alex_kulagin для того что бы было быстро, нужно руку набить.
- ну у меня пока тоже медленно, но я работаю над этим
- я запрос графа конвертил в запрос для орм и в итоге скорость таже, разницы нет
- У меня при тыс элементов и вложенности 6-7 примерно под 2 сек идет запрос. Но это без лоадера.

Main message:
ну так, как написал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну так, как написал

--

## My telegram message #47457
**Time:** 06.01.2020 22:08:07 UTC+05:00
**Link:** https://t.me/nest_ru/47457

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я запрос графа конвертил в запрос для орм и в итоге скорость таже, разницы нет
- У меня при тыс элементов и вложенности 6-7 примерно под 2 сек идет запрос. Но это без лоадера.
- ну так, как написал
- а граф и есть orm, только она не к базе коннектится

Main message:
граф тебе просто жсон передает разной формы, а вот разбирать и запускать чета, ты уже сам решаешь как оно будет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

граф тебе просто жсон передает разной формы, а вот разбирать и запускать чета, ты уже сам решаешь как оно будет

--

## My telegram message #47460
**Time:** 06.01.2020 22:13:02 UTC+05:00
**Link:** https://t.me/nest_ru/47460

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Блин вроде как звучит просто, но нужно проверить как это будет работать по факту ...

Main message:
тыкаю ща призму

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тыкаю ща призму

--

## My telegram message #47463
**Time:** 06.01.2020 22:14:31 UTC+05:00
**Link:** https://t.me/nest_ru/47463

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- граф тебе просто жсон передает разной формы, а вот разбирать и запускать чета, ты уже сам решаешь как оно будет
- Блин вроде как звучит просто, но нужно проверить как это будет работать по факту ...
- тыкаю ща призму
- Вот на нее еще не смотрел ни разу.

Main message:
для типового круда, тока ентити нужно описать и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

для типового круда, тока ентити нужно описать и все

--

## My telegram message #47467
**Time:** 06.01.2020 22:19:41 UTC+05:00
**Link:** https://t.me/nest_ru/47467

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я думаю через полгода можно будет и в прод

Main message:
с базой жопа) хрень создает не оптимизированную и нельзя реальную бд юзать, нужно все пересоздавать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с базой жопа) хрень создает не оптимизированную и нельзя реальную бд юзать, нужно все пересоздавать

--

## My telegram message #47469
**Time:** 06.01.2020 22:20:53 UTC+05:00
**Link:** https://t.me/nest_ru/47469

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Круто все это конечно. Но меня все больше беспокоит вся вот это магия. Все меньше понимаешь что же там под капотом.

Main message:
все нормально там, магии 0, всякие скафолдеры генерят код при модификации схемы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все нормально там, магии 0, всякие скафолдеры генерят код при модификации схемы

--

## My telegram message #47471
**Time:** 06.01.2020 22:21:42 UTC+05:00
**Link:** https://t.me/nest_ru/47471

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- с базой жопа) хрень создает не оптимизированную и нельзя реальную бд юзать, нужно все пересоздавать
- Круто все это конечно. Но меня все больше беспокоит вся вот это магия. Все меньше понимаешь что же там под капотом.
- все нормально там, магии 0, всякие скафолдеры генерят код при модификации схемы
- И это проблема для новичков. Потому что если ему потом отобрать это все, он ничего не сможет написать.

Main message:
сами, ну можешь и свое все написать, и будет генерить как тебе именно надо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сами, ну можешь и свое все написать, и будет генерить как тебе именно надо

--

## My telegram message #47474
**Time:** 06.01.2020 22:25:11 UTC+05:00
**Link:** https://t.me/nest_ru/47474

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- имхо не стоит ожидать супер-оптимизированную схему субд от любой универсальной тулзы. В любом случае придётся руками подкручивать и это нормально

Main message:
да я хотел натарвить на бд и бд отдельно разрабатывать и миграции на flayway делать, но увы не выходит так(

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да я хотел натарвить на бд и бд отдельно разрабатывать и миграции на flayway делать, но увы не выходит так(

--

## My telegram message #47493
**Time:** 06.01.2020 22:49:43 UTC+05:00
**Link:** https://t.me/nest_ru/47493

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Удивительно, как ты настолько быстро перемещаешься по исходникам?)
- знаю что искать=)
- В смысле реактивный ? Тот что inMemory ?
- нет, то что подписки могут обновлять потоки из query. видел, что в доке это есть, но завести не смог и подумал, что бага где-то

Main message:
по призме кастом норм пишут)  https://github.com/prisma/specs/blob/raw-spec/photon-raw-api/Readme.md

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по призме кастом норм пишут)  https://github.com/prisma/specs/blob/raw-spec/photon-raw-api/Readme.md

--

## My telegram message #47495
**Time:** 06.01.2020 23:15:21 UTC+05:00
**Link:** https://t.me/nest_ru/47495

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- по призме кастом норм пишут)  https://github.com/prisma/specs/blob/raw-spec/photon-raw-api/Readme.md

Main message:
имена тоже можно давать свои, на счет фк и индексов еще ищу, если по ним найти, то полностью заменит тайп орм))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

имена тоже можно давать свои, на счет фк и индексов еще ищу, если по ним найти, то полностью заменит тайп орм))

--

## My telegram message #47509
**Time:** 07.01.2020 02:26:28 UTC+05:00
**Link:** https://t.me/nest_ru/47509

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да, именно так если кидать данные, то работает. Что примечательно, именно имя подписки, а не имя триггера. Но по идее паблишер вообще не должен знать, как там названа подписка в схеме. Как наименее кривой воркэраунд можно просто передавать фейк-resolve в каждый декоратор  @Subscription(() => Entity, { resolve: x => x }) Получается, что такая конструкция автоматически оборачивает payload в имя подписки. Но в любом случае выглядит так себе. Как будто конфликт аполло и type-graphql. Кто-нибудь ещё сталкивался с таким? Может это решается как-то более нормально?

Main message:
делал чисто по примерам, хочучки свои не включал, тоесть добился работы как надо - норм, а как оно в коде не важно уже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

делал чисто по примерам, хочучки свои не включал, тоесть добился работы как надо - норм, а как оно в коде не важно уже

--

## My telegram message #47513
**Time:** 07.01.2020 08:26:04 UTC+05:00
**Link:** https://t.me/nest_ru/47513

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Не понял, какой чувак в призму уходит? Который аполло делает? Аполло типа депрекейтед станет?

Main message:
Сорян, уходит это я громко сказал, ну он много написал для поддержки призмы усебя  https://github.com/MichalLytek/type-graphql/issues/476 Ты же то-же юзаешь эту либу?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сорян, уходит это я громко сказал, ну он много написал для поддержки призмы усебя  https://github.com/MichalLytek/type-graphql/issues/476 Ты же то-же юзаешь эту либу?

--

## My telegram message #47516
**Time:** 07.01.2020 13:05:56 UTC+05:00
**Link:** https://t.me/nest_ru/47516

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- делал чисто по примерам, хочучки свои не включал, тоесть добился работы как надо - норм, а как оно в коде не важно уже
- Не понял, какой чувак в призму уходит? Который аполло делает? Аполло типа депрекейтед станет?
- Сорян, уходит это я громко сказал, ну он много написал для поддержки призмы усебя  https://github.com/MichalLytek/type-graphql/issues/476 Ты же то-же юзаешь эту либу?
- @KaufmanEndy привет. У тебя есть публичный репозиторий с подкрученным графом для нормальной работы ?

Main message:
Неа, давно же делал, приват тока там игрульки ниче серьёзного

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Неа, давно же делал, приват тока там игрульки ниче серьёзного

--

## My telegram message #47521
**Time:** 07.01.2020 14:38:52 UTC+05:00
**Link:** https://t.me/nest_ru/47521

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Неа, давно же делал, приват тока там игрульки ниче серьёзного
- а что именно интересует? в strapi есть такой функционал, например
- Спасибо
- @KaufmanEndy Смотри ... Потыкал API одного нашего популярного сайта в стране. У них тоже Graphql и чет его скорость работы прям очень удивило меня. Получается что все таки Граф может работать быстро, просто нужно знать как его готовить. Тут 60 элементов в списке, вроде как без под вложений в другие таблицы. В качестве базы MongoDB.

Main message:
да, так как граф это спека, реализация полностью твоя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, так как граф это спека, реализация полностью твоя

--

## My telegram message #47524
**Time:** 07.01.2020 14:45:43 UTC+05:00
**Link:** https://t.me/nest_ru/47524

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Сейчас у меня вопрос только в том, может ли js дать такую скорость... У них я точно знаю что работает либо python либо Go.

Main message:
да поидее возможно, базу нужно тюнить и кэшами обложить все, все также как и в ресте, жэс всеголишь запустит запрос к базе и отдаст данные, там просадка может только в сериализаторе быть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да поидее возможно, базу нужно тюнить и кэшами обложить все, все также как и в ресте, жэс всеголишь запустит запрос к базе и отдаст данные, там просадка может только в сериализаторе быть

--

## My telegram message #47527
**Time:** 07.01.2020 14:57:56 UTC+05:00
**Link:** https://t.me/nest_ru/47527

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Сейчас у меня вопрос только в том, может ли js дать такую скорость... У них я точно знаю что работает либо python либо Go.
- еще кстате если сложная схема знаю что чуваки даже парсер писали под граф используя готовый, оптимизировали т .д. решали еще этим проблему n+1 что бы запоминало схему
- да поидее возможно, базу нужно тюнить и кэшами обложить все, все также как и в ресте, жэс всеголишь запустит запрос к базе и отдаст данные, там просадка может только в сериализаторе быть
- Мдаааа, я то думал у меня проблемы ... Протестировал я значит работу проекта но базу поставил локально. Как я и думал, огромное количество времени идет тупо на то что бы сгонять в Гераманию и потом обратно отдать данные.

Main message:
База и бэк в одной сети должны быть, рядом тоесть, бэк для этого и придумали так как конекшен жрет трафик и гонять через мир долго

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

База и бэк в одной сети должны быть, рядом тоесть, бэк для этого и придумали так как конекшен жрет трафик и гонять через мир долго

--

## My telegram message #47529
**Time:** 07.01.2020 14:59:43 UTC+05:00
**Link:** https://t.me/nest_ru/47529

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да поидее возможно, базу нужно тюнить и кэшами обложить все, все также как и в ресте, жэс всеголишь запустит запрос к базе и отдаст данные, там просадка может только в сериализаторе быть
- Мдаааа, я то думал у меня проблемы ... Протестировал я значит работу проекта но базу поставил локально. Как я и думал, огромное количество времени идет тупо на то что бы сгонять в Гераманию и потом обратно отдать данные.
- База и бэк в одной сети должны быть, рядом тоесть, бэк для этого и придумали так как конекшен жрет трафик и гонять через мир долго
- Это я понимаю, но что интересно у меня на сервере сидят в докере база и отдельно бэк и скорость как не крути где-то 200 мс но ходят то они локально в сети.

Main message:
Запрос смотри отдельно от бэка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Запрос смотри отдельно от бэка

--

## My telegram message #47534
**Time:** 07.01.2020 15:40:17 UTC+05:00
**Link:** https://t.me/nest_ru/47534

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- База и бэк в одной сети должны быть, рядом тоесть, бэк для этого и придумали так как конекшен жрет трафик и гонять через мир долго
- Это я понимаю, но что интересно у меня на сервере сидят в докере база и отдельно бэк и скорость как не крути где-то 200 мс но ходят то они локально в сети.
- Запрос смотри отдельно от бэка
- Интересно это хорошо или очень плохо ?

Main message:
нужно смотреть запросы в базу, на этом уровне добиваешся скоростей, и птом дальше уже смотришь че там в бэке

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужно смотреть запросы в базу, на этом уровне добиваешся скоростей, и птом дальше уже смотришь че там в бэке

--

## My telegram message #47706
**Time:** 10.01.2020 13:19:59 UTC+05:00
**Link:** https://t.me/nest_ru/47706

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Так не выйдет) подумай сам как он должен понять кто в контексте))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Так не выйдет) подумай сам как он должен понять кто в контексте))

--

## My telegram message #47714
**Time:** 10.01.2020 13:32:03 UTC+05:00
**Link:** https://t.me/nest_ru/47714

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Я делаю createdBy и при удалении модификации проверяю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я делаю createdBy и при удалении модификации проверяю

--

## My telegram message #47718
**Time:** 10.01.2020 13:35:12 UTC+05:00
**Link:** https://t.me/nest_ru/47718

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- День добрый. Подскажите пожалуйста, где можно почитать про вебсокеты в несте, но с примерами не  socket.io , а именно websocket/ws?

Main message:
Оф сайт гитхаб, там есть тесты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Оф сайт гитхаб, там есть тесты

--

