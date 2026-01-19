## My telegram message #119232
**Time:** 07.08.2021 16:56:58 UTC+05:00
**Link:** https://t.me/nest_ru/119232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет 👋🏻 Нужен совет. Если у меня уже в посгресе есть таблицы там users (с email, password), roles (admin, user, manager), и user_roles. И потом мне надо добавить в таблицу users, переменные username и fullname например. То как мне апдейтнуть саму таблицу через Nest , не снося ее в PGAdmin и запуская (перезаписывая) ещё раз ?

Main message:
Это Называется миграции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это Называется миграции

--

## My telegram message #119430
**Time:** 09.08.2021 13:27:38 UTC+05:00
**Link:** https://t.me/nest_ru/119430

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ребят есть какие нить задачи для неста для джунов ? пришел человек и надо дать че нить чтоб работал, но реальные проекты пока рано.

Main message:
пусть пройдет вот тут все  https://t.me/nest_ru/115089

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пусть пройдет вот тут все  https://t.me/nest_ru/115089

--

## My telegram message #119464
**Time:** 09.08.2021 21:19:08 UTC+05:00
**Link:** https://t.me/nest_ru/119464

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- подскажите пожалуйста какой использовать декоратор чтобы принимать xml текст? именно текст в raw - > xml, а не файлы
- Nest не поддерживает XML из коробки, для этого нужен кастомный middleware, например этот  https://github.com/fiznool/body-parser-xml
- спасибо, а есть пример использования с nest?
- Вряд ли, на ноде XML мало кто юзает 🤷‍♀️ Но я думаю, этот middleware просто распарсит XML и запишет его в  request.body , так что скорее всего его как обычно через декоратор  @Body можно получить

Main message:
через интерцептор можешь конвертить json в xml, просто найди либу которая дает тот xml который тебе нужен, xml Он же разный бывает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через интерцептор можешь конвертить json в xml, просто найди либу которая дает тот xml который тебе нужен, xml Он же разный бывает

--

## My telegram message #119655
**Time:** 11.08.2021 00:04:13 UTC+05:00
**Link:** https://t.me/nest_ru/119655

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну npm пакет
- Не понимаю тебя, ты собираешься запускать приложение на несте без неста?
- чтобы протестировать библиотеку, необходимо посмотреть на ее поведении в самом приложении
- Приблизительно понял как создать Валидатор Уникальности скажем для Юзера заинжектив сервис Юзера. А вот как создать Влаидатор Уникальности для любой Сущности? Или это не возможно, так как сервис передавать в него нужно будет в DTO

Main message:
Нормальные имена для индексов уникальности и составь словарь название уникального индекса=тест ошибки Потом напиши эксепшен фильтр, где будешь матчить из ошибки это название с текстом ошибки и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нормальные имена для индексов уникальности и составь словарь название уникального индекса=тест ошибки Потом напиши эксепшен фильтр, где будешь матчить из ошибки это название с текстом ошибки и все

--

## My telegram message #119660
**Time:** 11.08.2021 01:03:16 UTC+05:00
**Link:** https://t.me/nest_ru/119660

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- чтобы протестировать библиотеку, необходимо посмотреть на ее поведении в самом приложении
- Приблизительно понял как создать Валидатор Уникальности скажем для Юзера заинжектив сервис Юзера. А вот как создать Влаидатор Уникальности для любой Сущности? Или это не возможно, так как сервис передавать в него нужно будет в DTO
- Нормальные имена для индексов уникальности и составь словарь название уникального индекса=тест ошибки Потом напиши эксепшен фильтр, где будешь матчить из ошибки это название с текстом ошибки и все
- Спасибо

Main message:
Я такой конвеншен юзал в тайп орм чтобы определять UK_PRODUCTS__ORDER_ID__USER_ID конвертил в ошибку валидации полей orderId:'', userId:'' Ну ща у меня призма, она из базы сама все собирает по полям и конвеншен больше не нужен и генерит ошибки которые можно легко в валидационные конвертнуть без парсинга текста ошибок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я такой конвеншен юзал в тайп орм чтобы определять UK_PRODUCTS__ORDER_ID__USER_ID конвертил в ошибку валидации полей orderId:'', userId:'' Ну ща у меня призма, она из базы сама все собирает по полям и конвеншен больше не нужен и генерит ошибки которые можно легко в валидационные конвертнуть без парсинга текста ошибок

--

## My telegram message #119668
**Time:** 11.08.2021 12:01:41 UTC+05:00
**Link:** https://t.me/nest_ru/119668

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я кстати сделал чтоб работала инициализация на уровне запуска.
- а можно пример того, как выглядит ошибка уникальности у призмы?
- Почему ?
- а, да, я видимо еще не проснулся. Но если в форме нужно вывести, что именно уже занято?

Main message:
там можно конвертнуть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там можно конвертнуть

--

## My telegram message #119675
**Time:** 11.08.2021 14:57:34 UTC+05:00
**Link:** https://t.me/nest_ru/119675

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Почему ?
- а, да, я видимо еще не проснулся. Но если в форме нужно вывести, что именно уже занято?
- там можно конвертнуть
- Привет. Запускаю приложение в докере и получаю цикличный рестарт приложение. Под docker-compose все ок. Причем предыдущая версия приложения стартует без проблем. Версии немного отличаются бизнес-логикой, а так же структурой БД. Я грешу на косяк с миграциями, но в логах ничего нет (логирование typeorm включено). з.ы. в докере включен restart always, отсюда рестарт, но в чем причина падения? з.ы.ы. автозапуск миграций выключен, с включенным получаю лог на img.2, но ситуация та же.

Main message:
Отключи перезапусу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Отключи перезапусу

--

## My telegram message #119724
**Time:** 11.08.2021 20:53:12 UTC+05:00
**Link:** https://t.me/nest_ru/119724

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 1
- т.е. клиент у тебя может только единожды что-то купить
- в данной ситувции да
- ну значит, один к одному

Main message:
Фк является пК для второй таблиц Я так это вижу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фк является пК для второй таблиц Я так это вижу

--

## My telegram message #119804
**Time:** 12.08.2021 14:51:13 UTC+05:00
**Link:** https://t.me/nest_ru/119804

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да ничего)
- интересно, спасибо!
- +++ согласен с п.1 систему менеджмента логов нужно выносить на другие приложения например частая практика это pm2 из stdout/stderr ловит логи и пишет в файл (хз умеет ли в базу) также на основе внешней тулзы писать можно куда удобно, но сам апп не должен париться (если только апп и не заточен для работы с логами)
- Привет. class-validator не работает при patch/delete? Я решил принять роль дурака, и в поле name передать не string, а number. Он мне эксепшен не кинул)

Main message:
https://github.com/typestack/class-validator/blob/615931e2903cbd680bd8fe2256e8d37dd20aeb37/src/decorator/typechecker/IsString.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/typestack/class-validator/blob/615931e2903cbd680bd8fe2256e8d37dd20aeb37/src/decorator/typechecker/IsString.ts

--

## My telegram message #119811
**Time:** 12.08.2021 14:58:03 UTC+05:00
**Link:** https://t.me/nest_ru/119811

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Нет, не как строка. Все правильно. Он допустил запрос до сервисов

Main message:
выше нейм поставь  @Transform(({ value, key, obj, type }) => {console.log(`Это Вова: ${isNaN(value)}`);return value})

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

выше нейм поставь  @Transform(({ value, key, obj, type }) => {console.log(`Это Вова: ${isNaN(value)}`);return value})

--

## My telegram message #119813
**Time:** 12.08.2021 14:59:40 UTC+05:00
**Link:** https://t.me/nest_ru/119813

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нет, не как строка. Все правильно. Он допустил запрос до сервисов
- не, так он работать не будет
- выше нейм поставь  @Transform(({ value, key, obj, type }) => {console.log(`Это Вова: ${isNaN(value)}`);return value})
- Это Вова: 1

Main message:
я изменил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я изменил

--

## My telegram message #119815
**Time:** 12.08.2021 15:02:10 UTC+05:00
**Link:** https://t.me/nest_ru/119815

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- выше нейм поставь  @Transform(({ value, key, obj, type }) => {console.log(`Это Вова: ${isNaN(value)}`);return value})
- Это Вова: 1
- я изменил
- Это Вова: false

Main message:
должно было работать, походу непонятный партиал может перебивает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

должно было работать, походу непонятный партиал может перебивает

--

## My telegram message #119819
**Time:** 12.08.2021 15:05:28 UTC+05:00
**Link:** https://t.me/nest_ru/119819

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я изменил
- Это Вова: false
- должно было работать, походу непонятный партиал может перебивает
- Все равно подпускает к сервисам

Main message:
а погоди дай то что в оригинальном

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а погоди дай то что в оригинальном

--

## My telegram message #119824
**Time:** 12.08.2021 15:06:36 UTC+05:00
**Link:** https://t.me/nest_ru/119824

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Все равно подпускает к сервисам
- а погоди дай то что в оригинальном
- подскажите плиз, как с помощью typeorm сделать сортировку прям в запросе? надо что бы при запросе в бд, возвращались объекты отсортированные по дате (от более новой, к более старой), дата в формате timestamptz
- То есть? Думаешь удалить PartialType?

Main message:
ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага

--

## My telegram message #119829
**Time:** 12.08.2021 15:12:59 UTC+05:00
**Link:** https://t.me/nest_ru/119829

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- То есть? Думаешь удалить PartialType?
- ага
- отсюда
- в его реализации наверно проблема, где-то ошибку пропускаешь

Main message:
https://github.com/rucken/core-nestjs/blob/39079cdec0932ae817b294a3972633fa7c68546e/libs/rucken/core-nestjs/src/pipes/validation.pipe.ts#L19  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/exceptions/custom-validation.error.ts  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts#L31 так делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/core-nestjs/blob/39079cdec0932ae817b294a3972633fa7c68546e/libs/rucken/core-nestjs/src/pipes/validation.pipe.ts#L19  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/exceptions/custom-validation.error.ts  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts#L31 так делал

--

## My telegram message #119832
**Time:** 12.08.2021 15:19:03 UTC+05:00
**Link:** https://t.me/nest_ru/119832

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а ты до сих пор так структурируешь проекты?

Main message:
да примерно так, ну больше либ, больше декомпозирую

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да примерно так, ну больше либ, больше декомпозирую

--

## My telegram message #119836
**Time:** 12.08.2021 15:21:11 UTC+05:00
**Link:** https://t.me/nest_ru/119836

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @Catch() export class AllExceptionsFilter implements ExceptionFilter { catch(exception: Exception, host: ArgumentsHost) { const ctx = host.switchToHttp(); const response = ctx.getResponse(); const request = ctx.getRequest(); const status = typesMap.get(exception.type) || typesMap.get('server'); response.status(status).json({ statusCode: status, message: exception.toString(), timestamp: new Date().toISOString(), path: request.url, }); } }
- а ты до сих пор так структурируешь проекты?
- да примерно так, ну больше либ, больше декомпозирую
- странное деление по ответственности

Main message:
вот фича например тудушек  https://github.com/rucken/todo-nestjs/tree/master/libs/rucken/todo-nestjs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот фича например тудушек  https://github.com/rucken/todo-nestjs/tree/master/libs/rucken/todo-nestjs

--

## My telegram message #119839
**Time:** 12.08.2021 15:24:29 UTC+05:00
**Link:** https://t.me/nest_ru/119839

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
сейчас модулей больше да стурктура примерно такая libs/core/core-translate libs/core/core-custom-injector libs/core/core-translate libs/core/core-prisma libs/auth/auth-strategies libs/auth/auth-prisma libs/auth/auth-controllers

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сейчас модулей больше да стурктура примерно такая libs/core/core-translate libs/core/core-custom-injector libs/core/core-translate libs/core/core-prisma libs/auth/auth-strategies libs/auth/auth-prisma libs/auth/auth-controllers

--

## My telegram message #119843
**Time:** 12.08.2021 15:32:31 UTC+05:00
**Link:** https://t.me/nest_ru/119843

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот фича например тудушек  https://github.com/rucken/todo-nestjs/tree/master/libs/rucken/todo-nestjs
- как по мне такое структурирование более удачное
- сейчас модулей больше да стурктура примерно такая libs/core/core-translate libs/core/core-custom-injector libs/core/core-translate libs/core/core-prisma libs/auth/auth-strategies libs/auth/auth-prisma libs/auth/auth-controllers
- а зачем выносить бизнес-логику в либу?

Main message:
фича либа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

фича либа

--

## My telegram message #119847
**Time:** 12.08.2021 15:34:16 UTC+05:00
**Link:** https://t.me/nest_ru/119847

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сейчас модулей больше да стурктура примерно такая libs/core/core-translate libs/core/core-custom-injector libs/core/core-translate libs/core/core-prisma libs/auth/auth-strategies libs/auth/auth-prisma libs/auth/auth-controllers
- а зачем выносить бизнес-логику в либу?
- фича либа
- ну все равно, разделение идет не по домену, а по ответственности

Main message:
либы между собою не связаны

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

либы между собою не связаны

--

## My telegram message #119852
**Time:** 12.08.2021 15:37:13 UTC+05:00
**Link:** https://t.me/nest_ru/119852

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- фича либа
- ну все равно, разделение идет не по домену, а по ответственности
- либы между собою не связаны
- есть контроллеры, есть энтити, есть еще что-то, и ты постоянно это в папках ищешь?

Main message:
я по папкам не хожу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я по папкам не хожу)

--

## My telegram message #119855
**Time:** 12.08.2021 15:37:57 UTC+05:00
**Link:** https://t.me/nest_ru/119855

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
и либы это не папки, эта штуки которые можно скопилить и опубликолвать в нпм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и либы это не папки, эта штуки которые можно скопилить и опубликолвать в нпм

--

## My telegram message #119862
**Time:** 12.08.2021 15:40:47 UTC+05:00
**Link:** https://t.me/nest_ru/119862

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я по папкам не хожу)
- @KaufmanEndy Привет, ты не в курсе на счет подписок в Typeorm если они сработают если в таблицу, запишет кто-то из вне ?
- и либы это не папки, эта штуки которые можно скопилить и опубликолвать в нпм
- Через какой драйвер ?

Main message:
блин хз, это вообще было давно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

блин хз, это вообще было давно

--

## My telegram message #119869
**Time:** 12.08.2021 15:48:29 UTC+05:00
**Link:** https://t.me/nest_ru/119869

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- блин хз, это вообще было давно
- Видимо, глобальный эксепшен фильтр глушит просто эксепшены валидатора, перехватывая их
- Чуствую опять упустил какуюто мелочь  @Get()   async   index( @Query() paginatedQueryDto: PaginatedQueryDto, ) в  PaginatedQueryDto прописал  @ApiProperty Но в Свагере Query - нет, не могу понять что не сделал еще?
- всем привет, такой вопрос. связи в бд где рисуете для иллюстрации? Желательно онлайн

Main message:
Я давно генерил из базы, софт не помню делал для оракл базы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я давно генерил из базы, софт не помню делал для оракл базы

--

## My telegram message #119876
**Time:** 12.08.2021 15:51:39 UTC+05:00
**Link:** https://t.me/nest_ru/119876

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я давно генерил из базы, софт не помню делал для оракл базы
- ну я начинаю проект, хочу сначала визуализировать таблицы и их связи, а потом уже код писать
- можно в воркбэнче такое сделать, ну и рисовать)
- https://dbdiagram.io/d тут удобно

Main message:
Базу создавай и запросы пиши которые у тя будут примерные в Софте, по пути переделывай базу, когда все возможный запросы которые планируешь сделать, выйдет сделать, генерь из базы тайп орм сущности или призму сдк и пиши уже бэк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Базу создавай и запросы пиши которые у тя будут примерные в Софте, по пути переделывай базу, когда все возможный запросы которые планируешь сделать, выйдет сделать, генерь из базы тайп орм сущности или призму сдк и пиши уже бэк

--

## My telegram message #119882
**Time:** 12.08.2021 16:02:35 UTC+05:00
**Link:** https://t.me/nest_ru/119882

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Базу создавай и запросы пиши которые у тя будут примерные в Софте, по пути переделывай базу, когда все возможный запросы которые планируешь сделать, выйдет сделать, генерь из базы тайп орм сущности или призму сдк и пиши уже бэк
- спасибо за совет) а в реале как обычно происходит?
- ну просто очень мало времени на полноценное проектирование) а так когда потребуют документацию подготовить по проекту, придется (где-то требуют) делать все равно)
- всем спасибо

Main message:
все зависит от проекта, свои петы декопмозирую сильно, если комуто, то не сильно, так как там не все такие как я

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все зависит от проекта, свои петы декопмозирую сильно, если комуто, то не сильно, так как там не все такие как я

--

## My telegram message #119898
**Time:** 12.08.2021 16:43:26 UTC+05:00
**Link:** https://t.me/nest_ru/119898

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- поменяй настройки линта?) ведь линт и сваггер независимо работают.
- Ну это то да, просто чем дальше углубляюсь в nest тем больше нравится lara, когда все из коробки и голова не болит ни о каких настройках
- добро пожаловать в мир жс, это ещё не все приколы, которыми мы можем тебя порадовать
- Ну не знаю в 19 году писал проект на express вроде, но там не нужен был ни свагер не валидация и эксепшены и норм было

Main message:
До сих пор так некоторые пишут и в пхп и в ноде и в шарпе и в джава

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

До сих пор так некоторые пишут и в пхп и в ноде и в шарпе и в джава

--

## My telegram message #119903
**Time:** 12.08.2021 16:46:13 UTC+05:00
**Link:** https://t.me/nest_ru/119903

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Он угорает)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Он угорает)

--

## My telegram message #119905
**Time:** 12.08.2021 16:47:01 UTC+05:00
**Link:** https://t.me/nest_ru/119905

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а зачем были шарпы/джава/плюсы если был кобол?)
- человек пишет что было норм, а нест типа усложненный
- Он угорает)
- настройки != головная боль (точнее не всегда), а гибкость! а если нужно бойлерплэйт, так настрой 1 раз, закинь в гитхаб и оттуда тяни как стартер кит для всех проектов

Main message:
Модно нест юзать больше нет причин почему нужен нест😁

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Модно нест юзать больше нет причин почему нужен нест😁

--

## My telegram message #120023
**Time:** 13.08.2021 22:52:28 UTC+05:00
**Link:** https://t.me/nest_ru/120023

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- го в войс в ноде)

Main message:
у меня все спят, я в режиме уши)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня все спят, я в режиме уши)

--

## My telegram message #120106
**Time:** 15.08.2021 21:12:59 UTC+05:00
**Link:** https://t.me/nest_ru/120106

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- вы напугали деда  @KaufmanEndy

Main message:
Ваще я гружу из процесс енва) и не юзаю конфиг модуль, в апп модуле передаю вытаскиая из процесс енва

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ваще я гружу из процесс енва) и не юзаю конфиг модуль, в апп модуле передаю вытаскиая из процесс енва

--

## My telegram message #120110
**Time:** 15.08.2021 21:17:44 UTC+05:00
**Link:** https://t.me/nest_ru/120110

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тебе нужно подгрузить переменные из .env через configService
- благодарю
- Ваще я гружу из процесс енва) и не юзаю конфиг модуль, в апп модуле передаю вытаскиая из процесс енва
- а кто там топил по "по конфигу на сервис"

Main message:
По своему конфигу на свой модуль, я за такое Через токен диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

По своему конфигу на свой модуль, я за такое Через токен диай

--

## My telegram message #120136
**Time:** 16.08.2021 15:42:50 UTC+05:00
**Link:** https://t.me/nest_ru/120136

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет можешь кратко рассказать правильную архитектуру глобальной 'отловки ' ошибок. Я создал глобальный ExceptionFilter. Но как мне отправлять определенный набор данных в зависимости от метода контролера ?

Main message:
const requestHandler = context.getHandler(); внутри этой штуки гдет должен быть метод который дергаешь но лучше делать декоратор и его вешать на методы птом вытаскивать из рефлектора инфу по нему const handlerДата = this.reflector.get<Тип того что внутрь декоратора запихал>(Токен по которому достанешь, requestHandler) || [];

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

const requestHandler = context.getHandler(); внутри этой штуки гдет должен быть метод который дергаешь но лучше делать декоратор и его вешать на методы птом вытаскивать из рефлектора инфу по нему const handlerДата = this.reflector.get<Тип того что внутрь декоратора запихал>(Токен по которому достанешь, requestHandler) || [];

--

## My telegram message #120140
**Time:** 16.08.2021 15:55:11 UTC+05:00
**Link:** https://t.me/nest_ru/120140

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет! Подскажите, как вы разделяете ответственность за проброс ошибок? Если, например, ошибка на этапе исполнения метода shared сервиса, вы делаете throw new Error, ловите в контроллере и пробрасываете дальше HttpException? Или сразу пробрасываете HttpException? Использовать Error, кажется, не очень надёжным, если не описать его обработку на этапе вызова метода. А обрабатывать на каждом вызове выглядит как overhead. Склоняюсь к решению: где сломалось, там и посылай HttpException. Остальные компоненты системы пусть полагаются на то что метод отрабатывает верно либо пробрасывает ошибку. Но у меня еще по сокету идут обращения к этим методам и пробрасывать туда HttpException кажется не логичным. Слушать там ошибки и переделывать их в WsException? Буду благодарен за ваше мнение и ссылки по теме)

Main message:
долго писать, вкратце у меня фичи со своими фильтрами идут и ловят свои ошибки, есть общий фильтр для других ошибок, выше на картинке как раз он на скрине, там сейчас только тайп еррор в варианте с глобальным фильтром я делал через мульти диай, каждый модуль регал свой обработчик для ошибок CoreErrorModule.forFeature((err)=>err instanceOf AuthError?new CoreError(err.code,AUTH_ERROR_TITLES[err.code]):err), и глоабльный пытался найти ошибки в провайдерах, если нет то стандартный механизм включал по обработке

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

долго писать, вкратце у меня фичи со своими фильтрами идут и ловят свои ошибки, есть общий фильтр для других ошибок, выше на картинке как раз он на скрине, там сейчас только тайп еррор в варианте с глобальным фильтром я делал через мульти диай, каждый модуль регал свой обработчик для ошибок CoreErrorModule.forFeature((err)=>err instanceOf AuthError?new CoreError(err.code,AUTH_ERROR_TITLES[err.code]):err), и глоабльный пытался найти ошибки в провайдерах, если нет то стандартный механизм включал по обработке

--

## My telegram message #120235
**Time:** 17.08.2021 12:59:02 UTC+05:00
**Link:** https://t.me/nest_ru/120235

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет Посоветуйте как лучше реализовать фичу У юзера есть баланс который меняется каждую секунду в зависимоти от процента. Нужно чтобы на фронте юзер видел как меняется баланс каждую секунду. Понимаю что менятm каждую секунду баланс в бд это неправильно. Может есть какието решения для этого?

Main message:
Зачем баланс меняется каждую секунду? Что за кейс такой? Баланс меняется когда происходят операции транзакции всякие

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Зачем баланс меняется каждую секунду? Что за кейс такой? Баланс меняется когда происходят операции транзакции всякие

--

## My telegram message #120237
**Time:** 17.08.2021 12:59:26 UTC+05:00
**Link:** https://t.me/nest_ru/120237

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://docs.nestjs.com/techniques/server-sent-events
- Websocket
- Зачем баланс меняется каждую секунду? Что за кейс такой? Баланс меняется когда происходят операции транзакции всякие
- крипта может какая-нибудь

Main message:
Там также

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там также

--

## My telegram message #120239
**Time:** 17.08.2021 12:59:39 UTC+05:00
**Link:** https://t.me/nest_ru/120239

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Зачем баланс меняется каждую секунду? Что за кейс такой? Баланс меняется когда происходят операции транзакции всякие
- крипта может какая-нибудь
- Там также
- в зависимости от курса баланс скачет, почему нет

Main message:
Сам по себе баланс не меняется

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сам по себе баланс не меняется

--

