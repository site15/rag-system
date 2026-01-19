## My telegram message #179243
**Time:** 09.08.2022 22:18:37 UTC+05:00
**Link:** https://t.me/nest_ru/179243

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- На этапе разработки, когда над проектом занимаешься не только лишь ты один.
- На этапе поддержки, когда модели базы устоялись и надо только добавлять фичи
- Понял. Спасибо.
- Два мнения тебе. Все зависит от проекта, размера команды и тд

Main message:
Всегда, чтобы привыкнуть думать перед тем как создавать таблицы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Всегда, чтобы привыкнуть думать перед тем как создавать таблицы

--

## My telegram message #179246
**Time:** 09.08.2022 22:27:45 UTC+05:00
**Link:** https://t.me/nest_ru/179246

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Два мнения тебе. Все зависит от проекта, размера команды и тд
- Всегда, чтобы привыкнуть думать перед тем как создавать таблицы
- а вот интересно, вот есть у меня ci/cd, который делает деплой на несколько продакшн серверов. база данных одна. как поступать, чтобы ничего не упало?
- Так вроде миграции для этого и нужны чтобы поддержать консистентность данных. При написании миграции ты должен учитывать особенности текущей структуры данных, чтобы ничего не потерять и следовательно чтобы потом ничего не упало.

Main message:
Нужно делать через деприкат

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нужно делать через деприкат

--

## My telegram message #179248
**Time:** 09.08.2022 22:28:31 UTC+05:00
**Link:** https://t.me/nest_ru/179248

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а вот интересно, вот есть у меня ci/cd, который делает деплой на несколько продакшн серверов. база данных одна. как поступать, чтобы ничего не упало?
- Так вроде миграции для этого и нужны чтобы поддержать консистентность данных. При написании миграции ты должен учитывать особенности текущей структуры данных, чтобы ничего не потерять и следовательно чтобы потом ничего не упало.
- Нужно делать через деприкат
- Делаешь дамп, пишешь миграцию, проверяешь что все ок и ничего не потерялось, и катишь в прод

Main message:
Новая база должна работать и на новом коде и на старом, на один релиз назад обратно совместимо делать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Новая база должна работать и на новом коде и на старом, на один релиз назад обратно совместимо делать

--

## My telegram message #179258
**Time:** 09.08.2022 22:34:01 UTC+05:00
**Link:** https://t.me/nest_ru/179258

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Миграции делаются типо чтобы прод базу себе стянуть?
- Нет, делаются для того чтобы при изменении структуры тебе орм не снесла данные в проде
- Хм, миграция - передача соостояния БД
- та я другое имел ввиду

Main message:
Миграции гонятся до деплоя кода

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Миграции гонятся до деплоя кода

--

## My telegram message #179268
**Time:** 09.08.2022 22:37:31 UTC+05:00
**Link:** https://t.me/nest_ru/179268

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- та я другое имел ввиду
- Миграции гонятся до деплоя кода
- так
- prisma-graphql это ваша либа чтоли?

Main message:
нет у меня форк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет у меня форк

--

## My telegram message #179270
**Time:** 09.08.2022 22:40:05 UTC+05:00
**Link:** https://t.me/nest_ru/179270

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так
- prisma-graphql это ваша либа чтоли?
- нет у меня форк
- аа, принял

Main message:
в моем форке более тесная интеграция с нестом, оригинал часть фич неста не поддерживает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в моем форке более тесная интеграция с нестом, оригинал часть фич неста не поддерживает

--

## My telegram message #179289
**Time:** 10.08.2022 10:48:04 UTC+05:00
**Link:** https://t.me/nest_ru/179289

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Может не до конца понял про что речь. Сделал так: форкнул sequelize-auto - он генерит сущности из БД со всеми связями, допилил его чтобы он ещё и базовые dto генерил на основе сущностей. Свагер нестовский где-то настраивается какие файлы ему смотреть. Получается уже имеем какую-то свагерскую документацию, когда на основе сгенерированных dto делаем новые. Ну и модели и связи руками не писать.. Sequelize-auto еще комменты к полям из pg подтягивает, хотел допилить чтобы на основе этих комментов свагеровские description генерились, но руки не дошли.. Но это подойдёт наверно на проектах где база первична, а не в процессе создаётся )

Main message:
ради прикола поискал, вот есть рест круд на призме с нестом  https://kepelrs.github.io/nestjs-prisma-crud/ может кому то нужно будет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ради прикола поискал, вот есть рест круд на призме с нестом  https://kepelrs.github.io/nestjs-prisma-crud/ может кому то нужно будет)

--

## My telegram message #179539
**Time:** 10.08.2022 17:02:45 UTC+05:00
**Link:** https://t.me/nest_ru/179539

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Такая ситуация: Есть модуль отвечающий за рассылку смс В зависимости от окржения мне надо рассылать смс различными способами В итоге у меня в модуле есть несколкьо сервисов реализующих один и тот же интерфейс. Как мне динамичесик экспоритровать из модуля необходимый сервис в зависимости от условий? Читал доку о динамических модулях, но походу это не то, либо же я туплю. Буду благодарен любой наводке или примеру

Main message:
Я для себя такое написал, там в редми как раз две реализации  https://github.com/EndyKaufman/nestjs-custom-injector

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я для себя такое написал, там в редми как раз две реализации  https://github.com/EndyKaufman/nestjs-custom-injector

--

## My telegram message #179547
**Time:** 10.08.2022 18:49:36 UTC+05:00
**Link:** https://t.me/nest_ru/179547

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно ли  @Body(new ParseArrayPipe({ items: Dto })) data: Dto | Dto[] чтобы принимал не только массив но и 1 объект?
- Салют всем, мейби кто знает сервисы с норм апишкой для авторизации по номеру телефона ? заранее спасибо
- мы покупали у МТСа сервис по отправке СМС
- в сербии банки сделали достаточно просто у них токен выдается прямо в приложении если нет пушей а код приходит только впервый раз по sms

Main message:
это аутентификатор) а в первый раз это секрет по которому в дальнейшем интервалами генерятся коды

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это аутентификатор) а в первый раз это секрет по которому в дальнейшем интервалами генерятся коды

--

## My telegram message #179770
**Time:** 11.08.2022 01:49:14 UTC+05:00
**Link:** https://t.me/nest_ru/179770

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет, а подскажите что лучше юзать и почему TypeORM или Sequelize? Заметил, что по Sequelize гораздо больше туторов различных

Main message:
Потому что сиквелайз старая либа, а тайп ОРМ новее, есть ещё более новее призма и микро орм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Потому что сиквелайз старая либа, а тайп ОРМ новее, есть ещё более новее призма и микро орм

--

## My telegram message #179772
**Time:** 11.08.2022 01:49:40 UTC+05:00
**Link:** https://t.me/nest_ru/179772

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это шутка про то, что TypeORM и Sequelize - это всё ORM.
- Тебе под какие нужды?
- Потому что сиквелайз старая либа, а тайп ОРМ новее, есть ещё более новее призма и микро орм
- @yoh_akura , ну бек для платформы написать надо, связей много будет и т.п., на первый взгляд по Sequilize больше инфы, а по TypeORM складывается ощущение, что более свежая либа по ней этого всего меньше)

Main message:
Через год ещё новен чет выйдет всяко

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через год ещё новен чет выйдет всяко

--

## My telegram message #179777
**Time:** 11.08.2022 01:52:25 UTC+05:00
**Link:** https://t.me/nest_ru/179777

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Я бы взял убунту при любых возможных вариантах)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я бы взял убунту при любых возможных вариантах)

--

## My telegram message #179779
**Time:** 11.08.2022 01:52:50 UTC+05:00
**Link:** https://t.me/nest_ru/179779

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можешь просто реплаить без тегов.
- 10 буду юзать, хорошо буду смотреть в сторону TypeORM, спасибо)
- Я бы взял убунту при любых возможных вариантах)
- Если мы говорим про линукс системы, то тогда уже Fedora.

Main message:
Тоесть призму если в контексте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тоесть призму если в контексте

--

## My telegram message #179781
**Time:** 11.08.2022 01:53:52 UTC+05:00
**Link:** https://t.me/nest_ru/179781

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я бы взял убунту при любых возможных вариантах)
- Если мы говорим про линукс системы, то тогда уже Fedora.
- Тоесть призму если в контексте
- Я сам сижу на линуксе, про "окна" - так для аналогии.

Main message:
А я на винде))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А я на винде))

--

## My telegram message #179783
**Time:** 11.08.2022 01:54:09 UTC+05:00
**Link:** https://t.me/nest_ru/179783

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тоесть призму если в контексте
- Я сам сижу на линуксе, про "окна" - так для аналогии.
- А я на винде))
- А я на двух стульях.)

Main message:
Убунту в вирт машине для кода

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Убунту в вирт машине для кода

--

## My telegram message #179786
**Time:** 11.08.2022 01:55:03 UTC+05:00
**Link:** https://t.me/nest_ru/179786

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А я на двух стульях.)
- Убунту в вирт машине для кода
- Через дуал бут.)
- лучше уже просто ubuntu

Main message:
Раньше комп месяцами не ребутал, мне дуал не вар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Раньше комп месяцами не ребутал, мне дуал не вар

--

## My telegram message #179788
**Time:** 11.08.2022 01:55:37 UTC+05:00
**Link:** https://t.me/nest_ru/179788

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Через дуал бут.)
- лучше уже просто ubuntu
- Раньше комп месяцами не ребутал, мне дуал не вар
- Ага, а если в игрульки хочешь погамать?

Main message:
Максимум 8 месяцев вроде было

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Максимум 8 месяцев вроде было

--

## My telegram message #179807
**Time:** 11.08.2022 10:03:57 UTC+05:00
**Link:** https://t.me/nest_ru/179807

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- На Windows всем советую wsl2 и ubuntu.
- А как можно обновить пакеты до 9 версии nest
- скорее всего из за этого проблемы, но я бы для начала просто перенес TEMP на C:
- У моего напарника имя юзера тоже на русском ,но все ок

Main message:
https://github.com/rgl/postgresql-windows-vagrant

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rgl/postgresql-windows-vagrant

--

## My telegram message #180186
**Time:** 11.08.2022 22:44:15 UTC+05:00
**Link:** https://t.me/nest_ru/180186

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Здравствуйте, я присоединил onetomany и назад к статьям +автор. Когда я создаю статью, то ответ приходит хороший, с автором, все работает. Но я не понимаю, как просто взять отдельную статью, где прицепится автор
- relations где ?
- не получается что-то через него, сделал через QueryBuilder
- всем привет - подскажите можно ли как то передать массив пакетов и paths ? или каждый пакет по одному нужно добавлять ? transport: Transport.GRPC, options: { package: 'hero', protoPath: join(__dirname, 'hero/hero.proto'), },  https://docs.nestjs.com/microservices/grpc

Main message:
Мы на работе форк делали свой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Мы на работе форк делали свой

--

