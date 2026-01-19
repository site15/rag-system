## My telegram message #79057
**Time:** 17.11.2020 12:02:04 UTC+05:00
**Link:** https://t.me/nest_ru/79057

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мапу как токен - это даже звучит не очень

Main message:
Ну конфиг через токен передаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну конфиг через токен передаю

--

## My telegram message #79060
**Time:** 17.11.2020 12:02:28 UTC+05:00
**Link:** https://t.me/nest_ru/79060

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мапу как токен - это даже звучит не очень
- Ну конфиг через токен передаю
- токен это ключ в мапе по которой достают тебе зависимость а если ты хочешь мапу как ключ хз

Main message:
Не

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не

--

## My telegram message #79070
**Time:** 17.11.2020 14:23:12 UTC+05:00
**Link:** https://t.me/nest_ru/79070

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну конфиг через токен передаю
- токен это ключ в мапе по которой достают тебе зависимость а если ты хочешь мапу как ключ хз
- Не
- Не могу понять в чем причина: сделал редирект в гуарде, если юзер не залогинен. При каждом редиректе получаю ошибку заголовков

Main message:
может выкинуть ошибку кастомную  throw new NotAuthorized() потом в фильтре поймать ее и сделать редирект?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может выкинуть ошибку кастомную  throw new NotAuthorized() потом в фильтре поймать ее и сделать редирект?

--

## My telegram message #79073
**Time:** 17.11.2020 14:25:49 UTC+05:00
**Link:** https://t.me/nest_ru/79073

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не
- Не могу понять в чем причина: сделал редирект в гуарде, если юзер не залогинен. При каждом редиректе получаю ошибку заголовков
- может выкинуть ошибку кастомную  throw new NotAuthorized() потом в фильтре поймать ее и сделать редирект?
- В каком фильтре?

Main message:
ексепшен фильтре

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ексепшен фильтре

--

## My telegram message #79108
**Time:** 17.11.2020 17:06:54 UTC+05:00
**Link:** https://t.me/nest_ru/79108

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- к примеру создание нового криптокошелька, если не получится записать его в базу данных, то лучше все откатить
- так если не получиться создать то что откатывать то?
- Вставка статьи в таблицу, а потом последующий апдейт её slug с подстановкой pk
- если не получится сделать вставку именно в базу данных

Main message:
транзакции могут лочить таблицы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

транзакции могут лочить таблицы

--

## My telegram message #79111
**Time:** 17.11.2020 17:07:58 UTC+05:00
**Link:** https://t.me/nest_ru/79111

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если не получится сделать вставку именно в базу данных
- транзакции могут лочить таблицы
- И не только транзакции
- у меня такое флоу, что создается кошелек(состоит из приватного ключа и публичного), затем в случае успешного добавления в таблицу публичный ключ возвращается пользователю

Main message:
если чет не так пойдет у тя таблица зависнет если юзать транзакции и куча людей будет данные менять, и все зависнут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если чет не так пойдет у тя таблица зависнет если юзать транзакции и куча людей будет данные менять, и все зависнут

--

## My telegram message #79159
**Time:** 17.11.2020 21:01:29 UTC+05:00
**Link:** https://t.me/nest_ru/79159

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
глобально повесь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

глобально повесь

--

## My telegram message #79162
**Time:** 17.11.2020 21:05:00 UTC+05:00
**Link:** https://t.me/nest_ru/79162

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нет, не будет
- если хочется сделать своему серверу весело, берешь OracleDB, кладёшь в нее блоб на 84 Гб, и запрашиваешь...
- глобально повесь
- Глобально мне не подходит к сожалению, там разные разделы у меня есть. Для авторизированных и нет

Main message:
ну ты и запускай проверяй просто есть ли токен

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты и запускай проверяй просто есть ли токен

--

## My telegram message #79168
**Time:** 17.11.2020 21:06:31 UTC+05:00
**Link:** https://t.me/nest_ru/79168

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- глобально повесь
- Глобально мне не подходит к сожалению, там разные разделы у меня есть. Для авторизированных и нет
- ну ты и запускай проверяй просто есть ли токен
- Я кажись понял в чем дело. Там срабатывает редирект который перенаправляет с  companyName.project.com:3000 на  companyName.project.com:3000/

Main message:
я глобально всегда все делаю, чтобы сами модули фичи не знали про это все, они просто несут некую логику и больше ничего не знают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я глобально всегда все делаю, чтобы сами модули фичи не знали про это все, они просто несут некую логику и больше ничего не знают

--

## My telegram message #79171
**Time:** 17.11.2020 21:07:51 UTC+05:00
**Link:** https://t.me/nest_ru/79171

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну ты и запускай проверяй просто есть ли токен
- Я кажись понял в чем дело. Там срабатывает редирект который перенаправляет с  companyName.project.com:3000 на  companyName.project.com:3000/
- я глобально всегда все делаю, чтобы сами модули фичи не знали про это все, они просто несут некую логику и больше ничего не знают
- А что делать если нужно ексклюд повесить?

Main message:
декоратор свой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

декоратор свой

--

## My telegram message #79177
**Time:** 17.11.2020 21:10:00 UTC+05:00
**Link:** https://t.me/nest_ru/79177

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я глобально всегда все делаю, чтобы сами модули фичи не знали про это все, они просто несут некую логику и больше ничего не знают
- А что делать если нужно ексклюд повесить?
- декоратор свой
- Вот у меня такое же написан для екстенда роутов, хостов, гвардов итд

Main message:
ну почти  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/guards/access.guard.ts#L18

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну почти  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/guards/access.guard.ts#L18

--

## My telegram message #79180
**Time:** 17.11.2020 21:14:26 UTC+05:00
**Link:** https://t.me/nest_ru/79180

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- декоратор свой
- Вот у меня такое же написан для екстенда роутов, хостов, гвардов итд
- ну почти  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/guards/access.guard.ts#L18
- К нему же и фильтра добавить хочу

Main message:
нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет

--

## My telegram message #79186
**Time:** 17.11.2020 21:19:16 UTC+05:00
**Link:** https://t.me/nest_ru/79186

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну почти  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/guards/access.guard.ts#L18
- К нему же и фильтра добавить хочу
- нет
- В доках видел это

Main message:
у меня есть ядро которое дает декораторы  @Permission (чета стринговое)  @Feature (чета стринговое) остальные модули импортят это ядро, и юзают эти мета данные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня есть ядро которое дает декораторы  @Permission (чета стринговое)  @Feature (чета стринговое) остальные модули импортят это ядро, и юзают эти мета данные

--

## My telegram message #79195
**Time:** 17.11.2020 21:27:02 UTC+05:00
**Link:** https://t.me/nest_ru/79195

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет
- В доках видел это
- у меня есть ядро которое дает декораторы  @Permission (чета стринговое)  @Feature (чета стринговое) остальные модули импортят это ядро, и юзают эти мета данные
- Ну я разбил те модули что взаимодействуют с фронтом, и на отдельных группы модулей вешаются гуарды и все метаданные

Main message:
бэк не должен знать про роутинг с суб доменом

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

бэк не должен знать про роутинг с суб доменом

--

## My telegram message #79199
**Time:** 17.11.2020 21:31:15 UTC+05:00
**Link:** https://t.me/nest_ru/79199

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня есть ядро которое дает декораторы  @Permission (чета стринговое)  @Feature (чета стринговое) остальные модули импортят это ядро, и юзают эти мета данные
- Ну я разбил те модули что взаимодействуют с фронтом, и на отдельных группы модулей вешаются гуарды и все метаданные
- бэк не должен знать про роутинг с суб доменом
- Ну тут при регистрации компании рассчитывается что будет выдаваться субдомен, ну и логин только на определенную компанию.

Main message:
можно мапить название суб домена в хедар или куку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно мапить название суб домена в хедар или куку

--

## My telegram message #79203
**Time:** 17.11.2020 21:36:54 UTC+05:00
**Link:** https://t.me/nest_ru/79203

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- бэк не должен знать про роутинг с суб доменом
- Ну тут при регистрации компании рассчитывается что будет выдаваться субдомен, ну и логин только на определенную компанию.
- можно мапить название суб домена в хедар или куку
- Хорошо, а если случай как у меня, когда есть  subdomain.domain.com и  domain.com ? При это это разные страницы и контроллеры должны быть

Main message:
ну поддомен это просто папка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну поддомен это просто папка

--

## My telegram message #79209
**Time:** 17.11.2020 21:40:20 UTC+05:00
**Link:** https://t.me/nest_ru/79209

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно мапить название суб домена в хедар или куку
- Хорошо, а если случай как у меня, когда есть  subdomain.domain.com и  domain.com ? При это это разные страницы и контроллеры должны быть
- ну поддомен это просто папка
- Ну и домены динамические. Регистрируется компания - создается ее субдомен в бд

Main message:
у тя хтмл там рендерится на разных контроллерах?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя хтмл там рендерится на разных контроллерах?

--

## My telegram message #79212
**Time:** 17.11.2020 21:42:04 UTC+05:00
**Link:** https://t.me/nest_ru/79212

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну поддомен это просто папка
- Ну и домены динамические. Регистрируется компания - создается ее субдомен в бд
- у тя хтмл там рендерится на разных контроллерах?
- Да

Main message:
тебе не нужны контроллеры

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тебе не нужны контроллеры

--

## My telegram message #79216
**Time:** 17.11.2020 21:42:30 UTC+05:00
**Link:** https://t.me/nest_ru/79216

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя хтмл там рендерится на разных контроллерах?
- Да
- тебе не нужны контроллеры
- Еще к этому нужно прилепить Реакт и сверстанный шаблон сайта

Main message:
и один контроллер который разбрасывает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и один контроллер который разбрасывает

--

## My telegram message #79220
**Time:** 17.11.2020 21:46:10 UTC+05:00
**Link:** https://t.me/nest_ru/79220

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тебе не нужны контроллеры
- Еще к этому нужно прилепить Реакт и сверстанный шаблон сайта
- и один контроллер который разбрасывает
- 🤔

Main message:
У тя метод сервиса вернёт хтмл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя метод сервиса вернёт хтмл

--

## My telegram message #79223
**Time:** 17.11.2020 21:46:53 UTC+05:00
**Link:** https://t.me/nest_ru/79223

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и один контроллер который разбрасывает
- 🤔
- У тя метод сервиса вернёт хтмл
- Ибо я только с Vue.js работал, там можно ставить компоненты на в сам темплейт и рендерить

Main message:
Дерево роутингов твое кастомное

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Дерево роутингов твое кастомное

--

## My telegram message #79229
**Time:** 17.11.2020 21:51:48 UTC+05:00
**Link:** https://t.me/nest_ru/79229

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У тя метод сервиса вернёт хтмл
- Ибо я только с Vue.js работал, там можно ставить компоненты на в сам темплейт и рендерить
- Дерево роутингов твое кастомное
- А есть где-то пример как это без контроллеров делать?

Main message:
Не, я сср юзал и кэшировал результат и сбрасывал когда данные в нем менялись

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не, я сср юзал и кэшировал результат и сбрасывал когда данные в нем менялись

--

## My telegram message #79231
**Time:** 17.11.2020 21:53:58 UTC+05:00
**Link:** https://t.me/nest_ru/79231

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Дерево роутингов твое кастомное
- А есть где-то пример как это без контроллеров делать?
- Не, я сср юзал и кэшировал результат и сбрасывал когда данные в нем менялись
- @react -ssr/nestjs-express?

Main message:
я на ангулар пишу для фронта

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я на ангулар пишу для фронта

--

## My telegram message #79278
**Time:** 18.11.2020 19:26:47 UTC+05:00
**Link:** https://t.me/nest_ru/79278

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В доках такого не вижу
- +-, APP_GUARD вешает на всю аппку, а мне б что-то типа MODULE_GUARD Не смог нагуглить, возможно, и нет такого
- Не, оно ж на всю аппку вешает, а мне нужно именно на весь модуль, а не все модули
- Так тут в примере на app module, ты пробовал конкретно на свой?

Main message:
оно так не работает, APP_ это глобально

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оно так не работает, APP_ это глобально

--

## My telegram message #79344
**Time:** 19.11.2020 18:20:54 UTC+05:00
**Link:** https://t.me/nest_ru/79344

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @pumano  @roksarr  @KaufmanEndy Господа добрый вечер, а что вы думаете на счет того что бы импортировать один сервис в другой ? Можно ли так делать или лучше логику общения двух сервисов оставлять в контроллере ?

Main message:
долго писать) делай как удобнее, для каждого конторллера сервис есть, вот он в себя подрубает другие сервисы и провайдеры и соединяет, сами сервисы не знают друг о друге, ну это всеи в идеальном мире, я сперва херачу как попало, птом когда есть время раскидываю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

долго писать) делай как удобнее, для каждого конторллера сервис есть, вот он в себя подрубает другие сервисы и провайдеры и соединяет, сами сервисы не знают друг о друге, ну это всеи в идеальном мире, я сперва херачу как попало, птом когда есть время раскидываю

--

## My telegram message #79347
**Time:** 19.11.2020 18:28:57 UTC+05:00
**Link:** https://t.me/nest_ru/79347

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @pumano  @roksarr  @KaufmanEndy Господа добрый вечер, а что вы думаете на счет того что бы импортировать один сервис в другой ? Можно ли так делать или лучше логику общения двух сервисов оставлять в контроллере ?
- Как по мне так лучше делать максимально тонкие контроллеры , и делать все внутри сервиса
- долго писать) делай как удобнее, для каждого конторллера сервис есть, вот он в себя подрубает другие сервисы и провайдеры и соединяет, сами сервисы не знают друг о друге, ну это всеи в идеальном мире, я сперва херачу как попало, птом когда есть время раскидываю
- Хмм, интересный метод, я даже не слышал про такой подход, делать общий сервис. Но мне это кажется не понятным решением, ибо получается что мы тоже самое что могли сделать в контроллере, делаем в сервисе, так сказать те же яйца только в профиль.

Main message:
контроллер знает про дто, сервис не всегда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

контроллер знает про дто, сервис не всегда

--

## My telegram message #79350
**Time:** 19.11.2020 18:49:23 UTC+05:00
**Link:** https://t.me/nest_ru/79350

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- долго писать) делай как удобнее, для каждого конторллера сервис есть, вот он в себя подрубает другие сервисы и провайдеры и соединяет, сами сервисы не знают друг о друге, ну это всеи в идеальном мире, я сперва херачу как попало, птом когда есть время раскидываю
- Хмм, интересный метод, я даже не слышал про такой подход, делать общий сервис. Но мне это кажется не понятным решением, ибо получается что мы тоже самое что могли сделать в контроллере, делаем в сервисе, так сказать те же яйца только в профиль.
- контроллер знает про дто, сервис не всегда
- Ок, этот момент вроде как я для себя прояснил, буду делать так: Если есть 3 или более зависимости тогда уже делаем что-то вроде ContentManager и туда уже логику общения между сервисами. Я хотел бы у тебя узнать еще на счет того чего ты пишешь в логи обычно ? Всегда борюсь с тем что бы ставить verbose на каждый шаг или ставить на начало выполнения запроса и на конец.

Main message:
начал применять интерестный потход, о котором давно говорил с джанго притащил - логами много чего крою, почти все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

начал применять интерестный потход, о котором давно говорил с джанго притащил - логами много чего крою, почти все

--

## My telegram message #79355
**Time:** 19.11.2020 18:52:53 UTC+05:00
**Link:** https://t.me/nest_ru/79355

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
из енв беру маску LOGGER_MASK='UsersService.*.start'

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

из енв беру маску LOGGER_MASK='UsersService.*.start'

--

## My telegram message #79359
**Time:** 19.11.2020 18:54:51 UTC+05:00
**Link:** https://t.me/nest_ru/79359

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- начал применять интерестный потход, о котором давно говорил с джанго притащил - логами много чего крою, почти все
- Не могу понять как настроить прокси что бы перенаправлять на разные порты есть в url есть субдомен или нету
- из енв беру маску LOGGER_MASK='UsersService.*.start'
- А как-то группируешь их, что бы было понятно когда началось выполнение и когда уже закончилось, что-то вроде  ${reqId}:UsersService.read.start ?

Main message:
'сервис.метод.внутри метода шляпа'

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

'сервис.метод.внутри метода шляпа'

--

## My telegram message #79366
**Time:** 19.11.2020 23:15:17 UTC+05:00
**Link:** https://t.me/nest_ru/79366

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не могу понять как настроить прокси что бы перенаправлять на разные порты есть в url есть субдомен или нету
- из енв беру маску LOGGER_MASK='UsersService.*.start'
- А как-то группируешь их, что бы было понятно когда началось выполнение и когда уже закончилось, что-то вроде  ${reqId}:UsersService.read.start ?
- 'сервис.метод.внутри метода шляпа'

Main message:
у меня вышло через прокси пример замутить) дальше осталось только добить и расширить)  https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAEQJ5gIYFsYQDJwDmhApgE4AUANkaWQPwBciBx5AlIgN4BQiiZElBBkkoSLASIAPABVEJAB5QSYACYBnbojAkA7hQB0xjGUIbmGMKgDaAXXbMuAX0TOAfBT79EEBBqgyEGg4MmZZb05eb35BYVEdfUQABTI4RVQKPzAAoJCyABpuGJ9SKAooUzKigAc0mqiSn0QYYEQKOrgaxABePsQAck6oOChUGpIBxuaZxAAlEmAqEmhDOD0wAGkSVA0KBaWVqEMyiqqhWvr2dkNgUIBRDAgACwoAax3e92LZ2db2gCE+0Wy1Wp0qZguiE6DUQGC0VlQ7BsAAMAPpogAkXAAyoEYGBCO8duxnCiHD9frNgYcwUIzpCoJcupx4XDrMj0VjcfjCcSkWS7L12gdQcdwecmdCrnCERybB9UHYANxNKkikFHE70iHVaUs2XspEKnZCnqIcTQeBIIwmMwWI32abq2ZxERIKDPGAaVEY7F4sgEomK0nk22GKoaIo0NhkdhqqnOVUu-jOBM+ZzxxPpt0JUVaiWM5kNZMzNPNTOltNpngQKjwrSsOiUtQkABGICJagwlWY4DeYHWYGd-GyGjgy0MMYo3cqWbcPDTAAE0JgcPhaOQKLo9CxN5RrrX6xotABhACMlJql-NgRAJFLWCEzzganPFAw5+YuSD0f3TD3WMR0QGM6HoQxWw7IkuDhc9ai-RBPW9Qxrzcedqx4Wt-CgRAAEEb0SXcLwodhVXwlCCOADAqA0B8sJyCcSCnIgKHw+NyKfT1X3fAZ8KmTCxxw3CACZhR3RBiPY4SKOFKiaLosdGOYokRKkwxOJfN8KF44SBiKcSmy3a4gA

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня вышло через прокси пример замутить) дальше осталось только добить и расширить)  https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAEQJ5gIYFsYQDJwDmhApgE4AUANkaWQPwBciBx5AlIgN4BQiiZElBBkkoSLASIAPABVEJAB5QSYACYBnbojAkA7hQB0xjGUIbmGMKgDaAXXbMuAX0TOAfBT79EEBBqgyEGg4MmZZb05eb35BYVEdfUQABTI4RVQKPzAAoJCyABpuGJ9SKAooUzKigAc0mqiSn0QYYEQKOrgaxABePsQAck6oOChUGpIBxuaZxAAlEmAqEmhDOD0wAGkSVA0KBaWVqEMyiqqhWvr2dkNgUIBRDAgACwoAax3e92LZ2db2gCE+0Wy1Wp0qZguiE6DUQGC0VlQ7BsAAMAPpogAkXAAyoEYGBCO8duxnCiHD9frNgYcwUIzpCoJcupx4XDrMj0VjcfjCcSkWS7L12gdQcdwecmdCrnCERybB9UHYANxNKkikFHE70iHVaUs2XspEKnZCnqIcTQeBIIwmMwWI32abq2ZxERIKDPGAaVEY7F4sgEomK0nk22GKoaIo0NhkdhqqnOVUu-jOBM+ZzxxPpt0JUVaiWM5kNZMzNPNTOltNpngQKjwrSsOiUtQkABGICJagwlWY4DeYHWYGd-GyGjgy0MMYo3cqWbcPDTAAE0JgcPhaOQKLo9CxN5RrrX6xotABhACMlJql-NgRAJFLWCEzzganPFAw5+YuSD0f3TD3WMR0QGM6HoQxWw7IkuDhc9ai-RBPW9Qxrzcedqx4Wt-CgRAAEEb0SXcLwodhVXwlCCOADAqA0B8sJyCcSCnIgKHw+NyKfT1X3fAZ8KmTCxxw3CACZhR3RBiPY4SKOFKiaLosdGOYokRKkwxOJfN8KF44SBiKcSmy3a4gA

--

## My telegram message #79371
**Time:** 19.11.2020 23:55:34 UTC+05:00
**Link:** https://t.me/nest_ru/79371

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А как-то группируешь их, что бы было понятно когда началось выполнение и когда уже закончилось, что-то вроде  ${reqId}:UsersService.read.start ?
- 'сервис.метод.внутри метода шляпа'
- у меня вышло через прокси пример замутить) дальше осталось только добить и расширить)  https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAEQJ5gIYFsYQDJwDmhApgE4AUANkaWQPwBciBx5AlIgN4BQiiZElBBkkoSLASIAPABVEJAB5QSYACYBnbojAkA7hQB0xjGUIbmGMKgDaAXXbMuAX0TOAfBT79EEBBqgyEGg4MmZZb05eb35BYVEdfUQABTI4RVQKPzAAoJCyABpuGJ9SKAooUzKigAc0mqiSn0QYYEQKOrgaxABePsQAck6oOChUGpIBxuaZxAAlEmAqEmhDOD0wAGkSVA0KBaWVqEMyiqqhWvr2dkNgUIBRDAgACwoAax3e92LZ2db2gCE+0Wy1Wp0qZguiE6DUQGC0VlQ7BsAAMAPpogAkXAAyoEYGBCO8duxnCiHD9frNgYcwUIzpCoJcupx4XDrMj0VjcfjCcSkWS7L12gdQcdwecmdCrnCERybB9UHYANxNKkikFHE70iHVaUs2XspEKnZCnqIcTQeBIIwmMwWI32abq2ZxERIKDPGAaVEY7F4sgEomK0nk22GKoaIo0NhkdhqqnOVUu-jOBM+ZzxxPpt0JUVaiWM5kNZMzNPNTOltNpngQKjwrSsOiUtQkABGICJagwlWY4DeYHWYGd-GyGjgy0MMYo3cqWbcPDTAAE0JgcPhaOQKLo9CxN5RrrX6xotABhACMlJql-NgRAJFLWCEzzganPFAw5+YuSD0f3TD3WMR0QGM6HoQxWw7IkuDhc9ai-RBPW9Qxrzcedqx4Wt-CgRAAEEb0SXcLwodhVXwlCCOADAqA0B8sJyCcSCnIgKHw+NyKfT1X3fAZ8KmTCxxw3CACZhR3RBiPY4SKOFKiaLosdGOYokRKkwxOJfN8KF44SBiKcSmy3a4gA
- Да, я примерно в том же направление иду. Вроде как результат есть, но нужно чутка поправить что бы вообще динамика была и не думать уже про этот логинг.

Main message:
можно свой модуль кастомный сделать, он сам логгер будет вешать на все контроллеры, единственное что нужно будет, это описывать последний аргумент в методе контроллера  logger:?Logger и забрасывать его в сервис - без этого увы никак (ну или еще не придумал как) и у тя будет в сервисе логгер со всем маршрутом кто его вызывал, даже можно замутить для вызовов сервиса из сервиса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно свой модуль кастомный сделать, он сам логгер будет вешать на все контроллеры, единственное что нужно будет, это описывать последний аргумент в методе контроллера  logger:?Logger и забрасывать его в сервис - без этого увы никак (ну или еще не придумал как) и у тя будет в сервисе логгер со всем маршрутом кто его вызывал, даже можно замутить для вызовов сервиса из сервиса

--

## My telegram message #79376
**Time:** 20.11.2020 00:00:44 UTC+05:00
**Link:** https://t.me/nest_ru/79376

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня вышло через прокси пример замутить) дальше осталось только добить и расширить)  https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAEQJ5gIYFsYQDJwDmhApgE4AUANkaWQPwBciBx5AlIgN4BQiiZElBBkkoSLASIAPABVEJAB5QSYACYBnbojAkA7hQB0xjGUIbmGMKgDaAXXbMuAX0TOAfBT79EEBBqgyEGg4MmZZb05eb35BYVEdfUQABTI4RVQKPzAAoJCyABpuGJ9SKAooUzKigAc0mqiSn0QYYEQKOrgaxABePsQAck6oOChUGpIBxuaZxAAlEmAqEmhDOD0wAGkSVA0KBaWVqEMyiqqhWvr2dkNgUIBRDAgACwoAax3e92LZ2db2gCE+0Wy1Wp0qZguiE6DUQGC0VlQ7BsAAMAPpogAkXAAyoEYGBCO8duxnCiHD9frNgYcwUIzpCoJcupx4XDrMj0VjcfjCcSkWS7L12gdQcdwecmdCrnCERybB9UHYANxNKkikFHE70iHVaUs2XspEKnZCnqIcTQeBIIwmMwWI32abq2ZxERIKDPGAaVEY7F4sgEomK0nk22GKoaIo0NhkdhqqnOVUu-jOBM+ZzxxPpt0JUVaiWM5kNZMzNPNTOltNpngQKjwrSsOiUtQkABGICJagwlWY4DeYHWYGd-GyGjgy0MMYo3cqWbcPDTAAE0JgcPhaOQKLo9CxN5RrrX6xotABhACMlJql-NgRAJFLWCEzzganPFAw5+YuSD0f3TD3WMR0QGM6HoQxWw7IkuDhc9ai-RBPW9Qxrzcedqx4Wt-CgRAAEEb0SXcLwodhVXwlCCOADAqA0B8sJyCcSCnIgKHw+NyKfT1X3fAZ8KmTCxxw3CACZhR3RBiPY4SKOFKiaLosdGOYokRKkwxOJfN8KF44SBiKcSmy3a4gA
- Да, я примерно в том же направление иду. Вроде как результат есть, но нужно чутка поправить что бы вообще динамика была и не думать уже про этот логинг.
- можно свой модуль кастомный сделать, он сам логгер будет вешать на все контроллеры, единственное что нужно будет, это описывать последний аргумент в методе контроллера  logger:?Logger и забрасывать его в сервис - без этого увы никак (ну или еще не придумал как) и у тя будет в сервисе логгер со всем маршрутом кто его вызывал, даже можно замутить для вызовов сервиса из сервиса
- Я тебя сейчас чутка не понял. В смысле ты передавал прям ?where={test:'test'} в параметры запроса ?

Main message:
блин уносит иногда меня) свой мирок)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

блин уносит иногда меня) свой мирок)

--

## My telegram message #79381
**Time:** 20.11.2020 00:05:36 UTC+05:00
**Link:** https://t.me/nest_ru/79381

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно свой модуль кастомный сделать, он сам логгер будет вешать на все контроллеры, единственное что нужно будет, это описывать последний аргумент в методе контроллера  logger:?Logger и забрасывать его в сервис - без этого увы никак (ну или еще не придумал как) и у тя будет в сервисе логгер со всем маршрутом кто его вызывал, даже можно замутить для вызовов сервиса из сервиса
- Я тебя сейчас чутка не понял. В смысле ты передавал прям ?where={test:'test'} в параметры запроса ?
- блин уносит иногда меня) свой мирок)
- Аааа, я подумал сделать пайп и передавать его в  @Param он в ответ создаст мне на базе класса объект который дальше смогу использовать. А что бы понять что фильтры а что доп. параметры просто буду передавать что-то вроде: flt_<param> и так пойму что нужно взять в пайп а что нет.

Main message:
блин

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

блин

--

## My telegram message #79389
**Time:** 20.11.2020 00:07:29 UTC+05:00
**Link:** https://t.me/nest_ru/79389

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- блин уносит иногда меня) свой мирок)
- Аааа, я подумал сделать пайп и передавать его в  @Param он в ответ создаст мне на базе класса объект который дальше смогу использовать. А что бы понять что фильтры а что доп. параметры просто буду передавать что-то вроде: flt_<param> и так пойму что нужно взять в пайп а что нет.
- блин
- А что если слать это все в base64 ? Что бы не видели параметры так явно

Main message:
так как движок сразу мапит для эластика

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так как движок сразу мапит для эластика

--

## My telegram message #79392
**Time:** 20.11.2020 00:09:26 UTC+05:00
**Link:** https://t.me/nest_ru/79392

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- блин
- А что если слать это все в base64 ? Что бы не видели параметры так явно
- так как движок сразу мапит для эластика
- Ребятушки , такой вот вопрос есть в graphql клёвая штука subscribes для того что бы можно было делать некий реалтайм , есть какие либы которые так же бы помогали следить за моделью данных если она меняется и рассылать всем изменения , я делал реалтайм приложение на базе сокет io и рассылал все руками , сейчас очень лень )))

Main message:
руками все делаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

руками все делаю

--

## My telegram message #79396
**Time:** 20.11.2020 01:57:31 UTC+05:00
**Link:** https://t.me/nest_ru/79396

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребятушки , такой вот вопрос есть в graphql клёвая штука subscribes для того что бы можно было делать некий реалтайм , есть какие либы которые так же бы помогали следить за моделью данных если она меняется и рассылать всем изменения , я делал реалтайм приложение на базе сокет io и рассылал все руками , сейчас очень лень )))
- руками все делаю
- Просто мб есть какие-то хорошие практики которые могли бы все это упростить
- Доброго времени всем. Вопрос по микросервисам. Возможно ли использовать такое при TCP?  @MessagePattern({ cmd: 'update_app', id: '*' }) Клиент говорит, что нет такого маршрута

Main message:
В доке такого нет, не понимаю о чем ты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В доке такого нет, не понимаю о чем ты

--

## My telegram message #79399
**Time:** 20.11.2020 02:22:35 UTC+05:00
**Link:** https://t.me/nest_ru/79399

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Просто мб есть какие-то хорошие практики которые могли бы все это упростить
- Доброго времени всем. Вопрос по микросервисам. Возможно ли использовать такое при TCP?  @MessagePattern({ cmd: 'update_app', id: '*' }) Клиент говорит, что нет такого маршрута
- В доке такого нет, не понимаю о чем ты
- Там есть такое, но для TCP не работает :(

Main message:
У тя же не так, да и зачем это?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя же не так, да и зачем это?

--

## My telegram message #79462
**Time:** 20.11.2020 17:19:57 UTC+05:00
**Link:** https://t.me/nest_ru/79462

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У тебя все так же остается возможность реализовывать микросервисы на разный технологиях , главное удачно подобрать шину для общения с ними
- Привет! Подскажите как сделать. Есть метод. GET  /pages НУжно для неавторизованных выводить все, а для админов только их. Так если мы на этот метод повесим гуард, то для гостей доступа не будет
- Спасибо. А какая шина считается наиболее удачной? У нас в конторе по http-запросам сервисы общаются, но мне это не кажется сильно надёжным. Есть мысль через Кафку это реализовать
- Здравствуйте коллеги Такой вопрос, хочу инжектнуть в контроллеры класс, унаследованный от интерфейса, и везде хочу писать инжект интерфейса, а уже в модуле определить какой класс будет представлен непосредственно К сожалению, нашел только 1 ужасный способ, использовать синтаксис  providers: [{ provide: 'IMapper', useValue: new SomeMapper() }] И затем использовать в контроллерах  @Inject('IMapper') private mapper IMapper Но мне не нравится то что интерфейс передается в качестве строки в нескольких местах и это вообще не проверяется на этапе компиляции Скажите, есть какие-то решения?

Main message:
константу юзаю я  export const MAIL_SENDER_MODULE_DEFAULT_OPTIONS: MailSenderModuleOptions = {}; export const MAIL_SENDER_MODULE_OPTIONS = 'MAIL_SENDER_MODULE_OPTIONS';

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

константу юзаю я  export const MAIL_SENDER_MODULE_DEFAULT_OPTIONS: MailSenderModuleOptions = {}; export const MAIL_SENDER_MODULE_OPTIONS = 'MAIL_SENDER_MODULE_OPTIONS';

--

## My telegram message #79465
**Time:** 20.11.2020 17:24:54 UTC+05:00
**Link:** https://t.me/nest_ru/79465

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо. А какая шина считается наиболее удачной? У нас в конторе по http-запросам сервисы общаются, но мне это не кажется сильно надёжным. Есть мысль через Кафку это реализовать
- Здравствуйте коллеги Такой вопрос, хочу инжектнуть в контроллеры класс, унаследованный от интерфейса, и везде хочу писать инжект интерфейса, а уже в модуле определить какой класс будет представлен непосредственно К сожалению, нашел только 1 ужасный способ, использовать синтаксис  providers: [{ provide: 'IMapper', useValue: new SomeMapper() }] И затем использовать в контроллерах  @Inject('IMapper') private mapper IMapper Но мне не нравится то что интерфейс передается в качестве строки в нескольких местах и это вообще не проверяется на этапе компиляции Скажите, есть какие-то решения?
- константу юзаю я  export const MAIL_SENDER_MODULE_DEFAULT_OPTIONS: MailSenderModuleOptions = {}; export const MAIL_SENDER_MODULE_OPTIONS = 'MAIL_SENDER_MODULE_OPTIONS';
- Да, это понятно Я думал нест может это обойти, это ведь так удобно

Main message:
против природы не попрешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

против природы не попрешь

--

## My telegram message #79568
**Time:** 21.11.2020 15:32:04 UTC+05:00
**Link:** https://t.me/nest_ru/79568

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://stackoverflow.com/questions/59140468/nest-bull-separate-process-for-queues-and-api
- Ну вот это тот самый костыль, который пришел в голову)))
- Ну других костылей не вижу тоже ))
- Привет, кто-то сталкивался с подобным:  Nest cannot create the FirebaseModule instance. The module at index [1] of the FirebaseModule "imports" array is undefined. Potential causes: - A circular dependency between modules. Use forwardRef() to avoid it. Read more: https://docs.nestjs.com/fundamentals/circular-dependency - The module at index [1] is of type "undefined". Check your import statements and the type of the module. Scope [AppModule -> AuthModule -> UserModule -> CategoryModule -> UserModule]

Main message:
Ну оно же пишет маршрут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну оно же пишет маршрут

--

## My telegram message #79573
**Time:** 21.11.2020 16:42:27 UTC+05:00
**Link:** https://t.me/nest_ru/79573

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
руками рисовал чтоли) в nx из коробки такое есть, в идеале не должно быть так запутанно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

руками рисовал чтоли) в nx из коробки такое есть, в идеале не должно быть так запутанно

--

## My telegram message #79575
**Time:** 21.11.2020 16:43:19 UTC+05:00
**Link:** https://t.me/nest_ru/79575

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну оно же пишет маршрут
- всё нашёл, мой промах, есть цикличная зависимость между FirebaseModule и UserModule, исправил - всё заработало Спасибо
- руками рисовал чтоли) в nx из коробки такое есть, в идеале не должно быть так запутанно
- а что такое nx?

Main message:
nrwl nx

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

nrwl nx

--

## My telegram message #79619
**Time:** 21.11.2020 22:30:30 UTC+05:00
**Link:** https://t.me/nest_ru/79619

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- I did it, the problem was the body of my request ... I was putting email instead of username .. I had to customize the strategy

Main message:
you may see my old example  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/passport/local.strategy.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

you may see my old example  https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/passport/local.strategy.ts

--

## My telegram message #79650
**Time:** 22.11.2020 22:21:04 UTC+05:00
**Link:** https://t.me/nest_ru/79650

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- всем привет, а в каком месте лучше строки request.body трансвормить в Types.ObjectId ?
- Ку, ребят, кто как Grafana интегрирует, есть ли отдельный модульный пакет?
- Зачем интегрировать ее куда-то? Общий коллектор метрик на API GATEWAY и все
- Кхм

Main message:
Я когда хотел такое сделать, смотрел в сторону датасорса своего  https://grafana.com/tutorials/build-a-data-source-plugin/#1

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я когда хотел такое сделать, смотрел в сторону датасорса своего  https://grafana.com/tutorials/build-a-data-source-plugin/#1

--

## My telegram message #79670
**Time:** 23.11.2020 13:20:40 UTC+05:00
**Link:** https://t.me/nest_ru/79670

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Такж. Плюс имея схему можно сменить язык фреймворк
- https://github.com/nestjs/nest/issues/173#issuecomment-403298529 Там ниже и выше ещё примеры есть. Ещё вот этот вариант заинтересовал: You should be able to achieve that by injecting the request as @ Inject (REQUEST) +  @Injectable ({ scope: Scope.REQUEST }) Самому интересно, отпиши, пожалуйста, к какому варианту в итоге пришёл :)
- Ок, по итогу испытаний напишу
- Ребят используя nx столкнулся с "Circular dependency" у меня User -> Notification -> User. И как решать чет не могу понять, в nx.json уже поставил что есть "implicitDependencies" но это не помогает, предупреждение так и весит. Его можно игнорировать или как-то решить могу ?

Main message:
сделай либу 3

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сделай либу 3

--

## My telegram message #79675
**Time:** 23.11.2020 13:24:05 UTC+05:00
**Link:** https://t.me/nest_ru/79675

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ок, по итогу испытаний напишу
- Ребят используя nx столкнулся с "Circular dependency" у меня User -> Notification -> User. И как решать чет не могу понять, в nx.json уже поставил что есть "implicitDependencies" но это не помогает, предупреждение так и весит. Его можно игнорировать или как-то решить могу ?
- сделай либу 3
- Чет меня это уже чутка бесит ... У меня же граф, у меня все circular ... Я так начну делать либы для шаред либ и так далее

Main message:
ну я делаю кучу либ, оно же не сложно так то

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я делаю кучу либ, оно же не сложно так то

--

## My telegram message #79682
**Time:** 23.11.2020 13:30:38 UTC+05:00
**Link:** https://t.me/nest_ru/79682

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сделай либу 3
- Чет меня это уже чутка бесит ... У меня же граф, у меня все circular ... Я так начну делать либы для шаред либ и так далее
- ну я делаю кучу либ, оно же не сложно так то
- то есть user-dto, user-interfaces и так далее в разных либах ?

Main message:
libs/core/common libs/core/server libs/core/client libs/users/common libs/users/server libs/users/client libs/users/material libs/notification/common libs/notification/server libs/notification/client libs/notification/material apps/backend apps/frontend apps/users-ms apps/notification-ms

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

libs/core/common libs/core/server libs/core/client libs/users/common libs/users/server libs/users/client libs/users/material libs/notification/common libs/notification/server libs/notification/client libs/notification/material apps/backend apps/frontend apps/users-ms apps/notification-ms

--

## My telegram message #79685
**Time:** 23.11.2020 13:33:32 UTC+05:00
**Link:** https://t.me/nest_ru/79685

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я делаю кучу либ, оно же не сложно так то
- то есть user-dto, user-interfaces и так далее в разных либах ?
- libs/core/common libs/core/server libs/core/client libs/users/common libs/users/server libs/users/client libs/users/material libs/notification/common libs/notification/server libs/notification/client libs/notification/material apps/backend apps/frontend apps/users-ms apps/notification-ms
- так тут не получится что libs/notification/common -> libs/user/common -> libs/notification/common ?

Main message:
не получится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не получится

--

## My telegram message #79691
**Time:** 23.11.2020 13:34:51 UTC+05:00
**Link:** https://t.me/nest_ru/79691

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- libs/core/common libs/core/server libs/core/client libs/users/common libs/users/server libs/users/client libs/users/material libs/notification/common libs/notification/server libs/notification/client libs/notification/material apps/backend apps/frontend apps/users-ms apps/notification-ms
- так тут не получится что libs/notification/common -> libs/user/common -> libs/notification/common ?
- не получится
- Ну мне же нужно в user.dto.ts сказать что у него есть notifications: Notification[] (notification.dto.ts)

Main message:
дто сверху шлю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дто сверху шлю

--

## My telegram message #79699
**Time:** 23.11.2020 13:38:50 UTC+05:00
**Link:** https://t.me/nest_ru/79699

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не получится
- Ну мне же нужно в user.dto.ts сказать что у него есть notifications: Notification[] (notification.dto.ts)
- дто сверху шлю
- Либо голова не варит либо это костыль на костыле для того что бы исправить другой костыль ...

Main message:
ну либы вообще не должны о других либах ниче знать в идеале

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну либы вообще не должны о других либах ниче знать в идеале

--

## My telegram message #79704
**Time:** 23.11.2020 13:42:06 UTC+05:00
**Link:** https://t.me/nest_ru/79704

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- дто сверху шлю
- Либо голова не варит либо это костыль на костыле для того что бы исправить другой костыль ...
- ну либы вообще не должны о других либах ниче знать в идеале
- У меня все ms и потом делать перенос, это так же и изменение в сервисах + как ты говоришь время на это точно не будет

Main message:
1) пишу мвп в монолите 2) пишу тесты 3) переношу в либы )

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

1) пишу мвп в монолите 2) пишу тесты 3) переношу в либы )

--

## My telegram message #79709
**Time:** 23.11.2020 13:47:12 UTC+05:00
**Link:** https://t.me/nest_ru/79709

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну либы вообще не должны о других либах ниче знать в идеале
- У меня все ms и потом делать перенос, это так же и изменение в сервисах + как ты говоришь время на это точно не будет
- 1) пишу мвп в монолите 2) пишу тесты 3) переношу в либы )
- Я вот все еще не могу вкурить, как ты из app прописываешь что user.dto.ts будет иметь в себе еще и notification.dto.ts что бы сделать resolverField. Нужно же в user.dto.ts прописать  @Field () декоратор

Main message:
конкретно по нотификациями, они не знают про другие либы, есть контракт у него свой, и поле есть там context: Json

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

конкретно по нотификациями, они не знают про другие либы, есть контракт у него свой, и поле есть там context: Json

--

## My telegram message #79721
**Time:** 23.11.2020 15:48:57 UTC+05:00
**Link:** https://t.me/nest_ru/79721

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Видимо потому что к этому времени вся дата обработана и новые чанки не приходят
- Это же лисенер Это не так если что-то обработано то не прийдет Подписка по всю инфу идет
- это как сабжект из rx. если что-то пропустил, то уже всё
- @KaufmanEndy моя решать шеф ! Спасибо за идею, покурил, подумал, опять покурил и все получилось. 👍

Main message:
Круть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Круть

--

## My telegram message #79724
**Time:** 23.11.2020 15:56:15 UTC+05:00
**Link:** https://t.me/nest_ru/79724

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @KaufmanEndy моя решать шеф ! Спасибо за идею, покурил, подумал, опять покурил и все получилось. 👍
- Круть
- Утром я чет тебя вообще не понимал, а потом как понял :D :D
- привет, как вы валидируете тело запроса, если оно может быть 2 видов? union types? у меня есть например  PayloadDto , в котором кроме остальных полей, может быть либо поле  foo , либо  bar . Но если есть  foo , то вместе с ним еще идет другое поле, назовем  buzz . Делать 2 отдельных dto или писать  @ValidateIf() ? для валидации используется class-validator

Main message:
Кайнд поле нужно внедрять, и парент дто, класс валидатор глянь доки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Кайнд поле нужно внедрять, и парент дто, класс валидатор глянь доки

--

## My telegram message #79726
**Time:** 23.11.2020 16:05:27 UTC+05:00
**Link:** https://t.me/nest_ru/79726

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Утром я чет тебя вообще не понимал, а потом как понял :D :D
- привет, как вы валидируете тело запроса, если оно может быть 2 видов? union types? у меня есть например  PayloadDto , в котором кроме остальных полей, может быть либо поле  foo , либо  bar . Но если есть  foo , то вместе с ним еще идет другое поле, назовем  buzz . Делать 2 отдельных dto или писать  @ValidateIf() ? для валидации используется class-validator
- Кайнд поле нужно внедрять, и парент дто, класс валидатор глянь доки
- kind?

Main message:
https://github.com/typestack/class-transformer#providing-more-than-one-type-option

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/typestack/class-transformer#providing-more-than-one-type-option

--

## My telegram message #79730
**Time:** 23.11.2020 17:18:53 UTC+05:00
**Link:** https://t.me/nest_ru/79730

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- kind?
- https://github.com/typestack/class-transformer#providing-more-than-one-type-option
- спасибо, похоже то, что нужно, попробую щас
- а что делать, если названия филдов разные?

Main message:
Каких

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Каких

--

## My telegram message #79732
**Time:** 23.11.2020 17:20:25 UTC+05:00
**Link:** https://t.me/nest_ru/79732

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спасибо, похоже то, что нужно, попробую щас
- а что делать, если названия филдов разные?
- Каких
- нашел это  https://github.com/typestack/class-validator/issues/245

Main message:
Трансфором можешь делать или валидат иф, ну самое норм через кайнд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Трансфором можешь делать или валидат иф, ну самое норм через кайнд

--

## My telegram message #79740
**Time:** 23.11.2020 17:33:51 UTC+05:00
**Link:** https://t.me/nest_ru/79740

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Каких
- нашел это  https://github.com/typestack/class-validator/issues/245
- Трансфором можешь делать или валидат иф, ну самое норм через кайнд
- я не понял как через кайнд 2 разных взаимозаменяемых типа валидировать и что под кайнд вообще имеется ввиду? discriminator?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #79742
**Time:** 23.11.2020 17:34:43 UTC+05:00
**Link:** https://t.me/nest_ru/79742

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Трансфором можешь делать или валидат иф, ну самое норм через кайнд
- я не понял как через кайнд 2 разных взаимозаменяемых типа валидировать и что под кайнд вообще имеется ввиду? discriminator?
- да
- а есть где-нибудь пример для моего кейса? или может какая-то хорошая статья какие можно с ним проблемы решать

Main message:
просто в примере в класс валидаторе там написанно type поля для понимания что за тип, обычно для этого используют поле Kind

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто в примере в класс валидаторе там написанно type поля для понимания что за тип, обычно для этого используют поле Kind

--

## My telegram message #79748
**Time:** 23.11.2020 18:01:31 UTC+05:00
**Link:** https://t.me/nest_ru/79748

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- а есть где-нибудь пример для моего кейса? или может какая-то хорошая статья какие можно с ним проблемы решать
- просто в примере в класс валидаторе там написанно type поля для понимания что за тип, обычно для этого используют поле Kind
- ща

Main message:
Тут у тя между мс обмен

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тут у тя между мс обмен

--

## My telegram message #79752
**Time:** 23.11.2020 18:03:47 UTC+05:00
**Link:** https://t.me/nest_ru/79752

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- просто в примере в класс валидаторе там написанно type поля для понимания что за тип, обычно для этого используют поле Kind
- ща
- Тут у тя между мс обмен
- да, но на этом не надо зацикливаться

Main message:
Не нужно или или, сделай одну сущность и все эти три поля сделай опшинал для класс валидатора

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не нужно или или, сделай одну сущность и все эти три поля сделай опшинал для класс валидатора

--

## My telegram message #79757
**Time:** 23.11.2020 18:05:26 UTC+05:00
**Link:** https://t.me/nest_ru/79757

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тут у тя между мс обмен
- да, но на этом не надо зацикливаться
- Не нужно или или, сделай одну сущность и все эти три поля сделай опшинал для класс валидатора
- архитекторы написали спеку, что поля должны быть required

Main message:
У тя разные дто, просто они от одного крупного наследуются

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя разные дто, просто они от одного крупного наследуются

--

## My telegram message #79763
**Time:** 23.11.2020 18:07:27 UTC+05:00
**Link:** https://t.me/nest_ru/79763

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не нужно или или, сделай одну сущность и все эти три поля сделай опшинал для класс валидатора
- архитекторы написали спеку, что поля должны быть required
- У тя разные дто, просто они от одного крупного наследуются
- Всем привет. Хочу задеплоить бек, его я упокавал в докер, а бд Psql Вопрос: Если мне нужно после деплоя на прод, чтобы там был создана запись с юзером, как можно сделать?

Main message:
Миграцией

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Миграцией

--

## My telegram message #79767
**Time:** 23.11.2020 18:16:05 UTC+05:00
**Link:** https://t.me/nest_ru/79767

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Миграцией
- хмм
- Миграция
- а с или или есть какой-то вариант? :D только тот, что был  здесь ? мне говорили попробовать с одним дто, так хоть отвечу почему стоит от этого отказаться

Main message:
да спеку на такое когда напишешь и читаешь то какая то фигня метод1:дто1 метод2:дто2 метод3:дто3|дто4 - это вот с кайндом метод5:дто5 но в нем поле1 обьязательно когда поле2 нет и когда полнолуние, иначе поле3 игнрируем - вот такой мусор мешает, один раз такое допустишь и потом повсюду такое будет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да спеку на такое когда напишешь и читаешь то какая то фигня метод1:дто1 метод2:дто2 метод3:дто3|дто4 - это вот с кайндом метод5:дто5 но в нем поле1 обьязательно когда поле2 нет и когда полнолуние, иначе поле3 игнрируем - вот такой мусор мешает, один раз такое допустишь и потом повсюду такое будет

--

## My telegram message #79770
**Time:** 23.11.2020 18:35:42 UTC+05:00
**Link:** https://t.me/nest_ru/79770

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Миграция
- а с или или есть какой-то вариант? :D только тот, что был  здесь ? мне говорили попробовать с одним дто, так хоть отвечу почему стоит от этого отказаться
- да спеку на такое когда напишешь и читаешь то какая то фигня метод1:дто1 метод2:дто2 метод3:дто3|дто4 - это вот с кайндом метод5:дто5 но в нем поле1 обьязательно когда поле2 нет и когда полнолуние, иначе поле3 игнрируем - вот такой мусор мешает, один раз такое допустишь и потом повсюду такое будет
- @KaufmanEndy ты как с ошибками делаешь для фронта ? Мне не подходит присылать текст сразу на фронт ибо может быть ссылки в нем и так далее, я надумал сделать тут enum и с ним уже работать на фронте. Что скажешь ?

Main message:
Так не делал ещё никогда)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Так не делал ещё никогда)

--

## My telegram message #79774
**Time:** 23.11.2020 18:43:59 UTC+05:00
**Link:** https://t.me/nest_ru/79774

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да спеку на такое когда напишешь и читаешь то какая то фигня метод1:дто1 метод2:дто2 метод3:дто3|дто4 - это вот с кайндом метод5:дто5 но в нем поле1 обьязательно когда поле2 нет и когда полнолуние, иначе поле3 игнрируем - вот такой мусор мешает, один раз такое допустишь и потом повсюду такое будет
- @KaufmanEndy ты как с ошибками делаешь для фронта ? Мне не подходит присылать текст сразу на фронт ибо может быть ссылки в нем и так далее, я надумал сделать тут enum и с ним уже работать на фронте. Что скажешь ?
- Так не делал ещё никогда)
- Ну вот клиент пытается войти в систему, и тут сразу несколько ошибок: 1. нет такого пользователя 2. Не правильный пароль 3. Пользователь не подтверждён И на это все получается что ошибка будет 401. А сообщения на фронте выводится примерно как: 'Что-то не так, давай обратно на <a href="auth">авторизацию</a>'

Main message:
там разные коды, ну я в ресте на это все выдавал 400, и внутри имел код в виде енам, фронт смотрел этот енам и редиректил на урл, бэку нафиг не упали фронтовые урлы) я даже в емайл о подтверждении кидаю не ссылку куда то а код енам фронт уже сам принимает решение куда редеректнуть AUTH-001 AUTH-002 AUTH-003

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там разные коды, ну я в ресте на это все выдавал 400, и внутри имел код в виде енам, фронт смотрел этот енам и редиректил на урл, бэку нафиг не упали фронтовые урлы) я даже в емайл о подтверждении кидаю не ссылку куда то а код енам фронт уже сам принимает решение куда редеректнуть AUTH-001 AUTH-002 AUTH-003

--

## My telegram message #79779
**Time:** 23.11.2020 18:49:03 UTC+05:00
**Link:** https://t.me/nest_ru/79779

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там разные коды, ну я в ресте на это все выдавал 400, и внутри имел код в виде енам, фронт смотрел этот енам и редиректил на урл, бэку нафиг не упали фронтовые урлы) я даже в емайл о подтверждении кидаю не ссылку куда то а код енам фронт уже сам принимает решение куда редеректнуть AUTH-001 AUTH-002 AUTH-003
- Вот и я про это же. Буду делать енум, точнее уже делаю
- спасибо, что расписал, но вот все равно не врубаюсь как с кайндами можно это сделать. поля ведь не вложенные, а названия у них разные. Т.е. вместо  topPhoto из примера у меня могут быть или или.
- Выглядит похожем на то что я сейчас делаю. Только у меня локалки не будет

Main message:
она для фронта нужна и логов бэка, чтобы не искать коды

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

она для фронта нужна и логов бэка, чтобы не искать коды

--

## My telegram message #79783
**Time:** 23.11.2020 18:55:48 UTC+05:00
**Link:** https://t.me/nest_ru/79783

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- окей, но они будут относиться только к  topPhoto ? имеется ввиду, что в теле запросе  topPhoto всегда называется  topPhoto .

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #79785
**Time:** 23.11.2020 19:32:06 UTC+05:00
**Link:** https://t.me/nest_ru/79785

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- окей, но они будут относиться только к  topPhoto ? имеется ввиду, что в теле запросе  topPhoto всегда называется  topPhoto .
- Всем доброго вечера, мб кто то сталкивался с такой проблемой  "Unknown flag: --ts_proto_opt"   SRC_DIR="libs/proto-schemes/src/proto/*.proto" DEST_DIR="libs/proto-schemes/src" PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts_proto"   protoc \ --plugin=${PROTOC_GEN_TS_PATH} \ --ts_proto_out=${DEST_DIR} ${SRC_DIR} \ --ts_proto_opt=outputEncodeMethods=true  ——————-  libprotoc 3.0.0
- да
- А где у тебя этот енум ? Я так понимаю в front. Я сейчас столкнулся с тем что если импортировать енум из libs то ангуляр ой как начинает жаловаться ибо пытается что-то из nestjs достать почему. У тебя такое бывало ?

Main message:
в коммон

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в коммон

--

## My telegram message #79787
**Time:** 23.11.2020 19:32:30 UTC+05:00
**Link:** https://t.me/nest_ru/79787

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- libs/core/common libs/core/server libs/core/client libs/users/common libs/users/server libs/users/client libs/users/material libs/notification/common libs/notification/server libs/notification/client libs/notification/material apps/backend apps/frontend apps/users-ms apps/notification-ms

Main message:
👆🏿

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👆🏿

--

## My telegram message #79792
**Time:** 23.11.2020 19:34:57 UTC+05:00
**Link:** https://t.me/nest_ru/79792

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в коммон
- Ну он у меня там же ...
- 👆🏿
- Так в этом и прикол что у меня он тоже не знает, а почему-то таскает нест

Main message:
м хз, у меня все норм, проблема на вашей стороне

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

м хз, у меня все норм, проблема на вашей стороне

--

## My telegram message #79794
**Time:** 23.11.2020 19:35:36 UTC+05:00
**Link:** https://t.me/nest_ru/79794

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А вот и виновник ...

Main message:
это я делаю в сервер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это я делаю в сервер

--

## My telegram message #79799
**Time:** 23.11.2020 20:27:20 UTC+05:00
**Link:** https://t.me/nest_ru/79799

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
ммм, я бы не стал палить код наружу, те кто имеет спеку пусть знают что и про что, а левым - пусть разбираются и гадают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ммм, я бы не стал палить код наружу, те кто имеет спеку пусть знают что и про что, а левым - пусть разбираются и гадают

--

## My telegram message #79985
**Time:** 25.11.2020 15:08:13 UTC+05:00
**Link:** https://t.me/nest_ru/79985

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- но он же по сути у вас обязательный параметр
- хотелось бы сделать необязательным
- https://github.com/nestjs/swagger/issues/30
- господа, ща будет тупой вопрос... Есть запрос, к примеру такой DECLARE p_key VARCHAR2(255); BEGIN insert into TOYS (TOY_ID, TOY_NAME, COLOUR) VALUES (17, 'Train', 'Red') RETURNING TOY_ID INTO p_key; END; но при выполнении p_key не возвращается. Его как-то нужно запросом просить?

Main message:
О оракл) ну смотри доки по драйверу для оракла

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

О оракл) ну смотри доки по драйверу для оракла

--

## My telegram message #79991
**Time:** 25.11.2020 16:13:26 UTC+05:00
**Link:** https://t.me/nest_ru/79991

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
почему через nginx не делаешь?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

почему через nginx не делаешь?

--

## My telegram message #79993
**Time:** 25.11.2020 16:27:09 UTC+05:00
**Link:** https://t.me/nest_ru/79993

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это хороший вопрос да у меня деплоится все в dokku, там желательно одним контейнером

Main message:
там можно два билдпака юзать, один для ноды, второй для статики, делал давно, чет не могу найти, тип того  https://johnfraney.ca/posts/2019/03/01/build-deploy-static-site-dokku/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там можно два билдпака юзать, один для ноды, второй для статики, делал давно, чет не могу найти, тип того  https://johnfraney.ca/posts/2019/03/01/build-deploy-static-site-dokku/

--

## My telegram message #80007
**Time:** 25.11.2020 18:28:32 UTC+05:00
**Link:** https://t.me/nest_ru/80007

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как лучше заменеджирить миграции и сиды для бд в экосистеме nest.js ? Как отдельную приложеньку? Как просто набор sql файликов? Как часть проекта? Как там на реальных проектах?
- https://github.com/w3tecch/typeorm-seeding - сиды миграции -  https://typeorm.io/#/migrations/how-migrations-work
- Вот сейчас именно эти библиотеки. Но смотрю на них, и выглядит как-то инородно
- @KaufmanEndy привет, слушай ты как-то смог решить вопрос с тем что контейнеры получаются огромными когда nx ? Получаются под 500мб и это как бы понятно почему, там куча всего и от такого же Angular...

Main message:
У меня тоже почти также, ну я пакедж джсоны свои имею для бэковых мс и апп, дист копирую в имадж и птом смотрю че там нужно ещё для запуска, пока не сильно напрягает так как пет, ну порой когда часто деплою, ждать долго не очень нравится пока образ закачается время проходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня тоже почти также, ну я пакедж джсоны свои имею для бэковых мс и апп, дист копирую в имадж и птом смотрю че там нужно ещё для запуска, пока не сильно напрягает так как пет, ну порой когда часто деплою, ждать долго не очень нравится пока образ закачается время проходит

--

## My telegram message #80010
**Time:** 25.11.2020 18:42:43 UTC+05:00
**Link:** https://t.me/nest_ru/80010

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вот сейчас именно эти библиотеки. Но смотрю на них, и выглядит как-то инородно
- @KaufmanEndy привет, слушай ты как-то смог решить вопрос с тем что контейнеры получаются огромными когда nx ? Получаются под 500мб и это как бы понятно почему, там куча всего и от такого же Angular...
- У меня тоже почти также, ну я пакедж джсоны свои имею для бэковых мс и апп, дист копирую в имадж и птом смотрю че там нужно ещё для запуска, пока не сильно напрягает так как пет, ну порой когда часто деплою, ждать долго не очень нравится пока образ закачается время проходит
- Нужно как-то сделать что бы ставились только пакеты которые используются. Хотя чет мне кажется будет занимать много времени проверка этих зависимостей для каждого пакета

Main message:
Ну я все убрал зависимости, запустил и начал добавлять все что не хватает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну я все убрал зависимости, запустил и начал добавлять все что не хватает

--

## My telegram message #80014
**Time:** 25.11.2020 18:49:32 UTC+05:00
**Link:** https://t.me/nest_ru/80014

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У меня тоже почти также, ну я пакедж джсоны свои имею для бэковых мс и апп, дист копирую в имадж и птом смотрю че там нужно ещё для запуска, пока не сильно напрягает так как пет, ну порой когда часто деплою, ждать долго не очень нравится пока образ закачается время проходит
- Нужно как-то сделать что бы ставились только пакеты которые используются. Хотя чет мне кажется будет занимать много времени проверка этих зависимостей для каждого пакета
- Ну я все убрал зависимости, запустил и начал добавлять все что не хватает
- Ну вообще да, тоже можно, даже сделать отдельный packages.json сделать чисто для билда.

Main message:
я нест кли пробовал тоже самое так же приходится добрасывать зависимости и выростает все до 750)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я нест кли пробовал тоже самое так же приходится добрасывать зависимости и выростает все до 750)

--

## My telegram message #80016
**Time:** 25.11.2020 19:18:37 UTC+05:00
**Link:** https://t.me/nest_ru/80016

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну я все убрал зависимости, запустил и начал добавлять все что не хватает
- Ну вообще да, тоже можно, даже сделать отдельный packages.json сделать чисто для билда.
- я нест кли пробовал тоже самое так же приходится добрасывать зависимости и выростает все до 750)
- Так зайди в контейнер и через  du -hs * | sort -rh | head -5 глянь кто там из пакетов такие злые

Main message:
м, хорошая команда, после работы потещу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

м, хорошая команда, после работы потещу)

--

## My telegram message #80023
**Time:** 25.11.2020 20:46:22 UTC+05:00
**Link:** https://t.me/nest_ru/80023

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Подскажите, как сделать валидацию по типам. сейчас я делаю так  @IsInt() count: number я не хочу каждый раз писать IsInt, так можно?

Main message:
можешь написать тулзу которая через ast. для всех файлов по маске "*.dto.ts" внутри к намберам добавит этот декоратор, часов 5 займет если совсем не понимаешь что такое ast, если шаришь. то часа два может вот тут я всем переменным ставлю "= undefined" чтобы они были в рантайм и некоторым классам добавляю декоратор свой, и все массово работает на папку и все файлы внутри, можешь поизучать как пример  https://github.com/EndyKaufman/ngx-bind-io-cli код не очень, писал чтобы работало просто)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можешь написать тулзу которая через ast. для всех файлов по маске "*.dto.ts" внутри к намберам добавит этот декоратор, часов 5 займет если совсем не понимаешь что такое ast, если шаришь. то часа два может вот тут я всем переменным ставлю "= undefined" чтобы они были в рантайм и некоторым классам добавляю декоратор свой, и все массово работает на папку и все файлы внутри, можешь поизучать как пример  https://github.com/EndyKaufman/ngx-bind-io-cli код не очень, писал чтобы работало просто)

--

## My telegram message #80026
**Time:** 25.11.2020 21:59:10 UTC+05:00
**Link:** https://t.me/nest_ru/80026

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy ты пробовал использовать github actions ? Если да может знаешь как заставить работать такую конструкцию как на фото.

Main message:
использую, не знаю что это за патчи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

использую, не знаю что это за патчи

--

## My telegram message #80028
**Time:** 25.11.2020 22:02:45 UTC+05:00
**Link:** https://t.me/nest_ru/80028

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А как ты тогда делаешь билды только одной app-ы ?

Main message:
у меня самопал, не чарты, модифицирую версию в деплоймент для того апа у кого исходники сменились и имадж тоже пересобираю при смене исходников, оно все пока не до конца настроено, девопсом мало занимаюсь ща

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня самопал, не чарты, модифицирую версию в деплоймент для того апа у кого исходники сменились и имадж тоже пересобираю при смене исходников, оно все пока не до конца настроено, девопсом мало занимаюсь ща

--

## My telegram message #80042
**Time:** 26.11.2020 00:50:07 UTC+05:00
**Link:** https://t.me/nest_ru/80042

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вся суть работы с микро-сервисами... Ох и долго они все собирались, зря походу запускал параллельно
- О! Портраинер?
- Ага
- Здравствуйте! С фронта отправляю FormData, как мне получить это на бэке? Файлы получается получить, а вот другие данные — нет

Main message:
Microk8s

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Microk8s

--

## My telegram message #80069
**Time:** 26.11.2020 00:57:49 UTC+05:00
**Link:** https://t.me/nest_ru/80069

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А оно поддерживаемое? Ну типа конфигушрировать под свои цели в будущем?

Main message:
Ну это кубер для одного, мне удобно хз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну это кубер для одного, мне удобно хз

--

## My telegram message #80073
**Time:** 26.11.2020 01:03:21 UTC+05:00
**Link:** https://t.me/nest_ru/80073

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Сколько нод у тебя в кластере? Диски шаришь между нодами? Балансёр? Где хостишь?

Main message:
Сложные вопросы) у меня пет, одна нода, ну и все вытикающее из этого, микрок8с это тот же кубер, просто сносить и ставить проще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сложные вопросы) у меня пет, одна нода, ну и все вытикающее из этого, микрок8с это тот же кубер, просто сносить и ставить проще

--

## My telegram message #80075
**Time:** 26.11.2020 01:04:03 UTC+05:00
**Link:** https://t.me/nest_ru/80075

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я вот думаю взять его для home может на месяц, потыкать чисто, эксперименты
- Сколько нод у тебя в кластере? Диски шаришь между нодами? Балансёр? Где хостишь?
- Сложные вопросы) у меня пет, одна нода, ну и все вытикающее из этого, микрок8с это тот же кубер, просто сносить и ставить проще
- Тогда не интересно, мне как минимум нужна работа без простоев

Main message:
Тупа снап все делает)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тупа снап все делает)

--

## My telegram message #80077
**Time:** 26.11.2020 01:04:47 UTC+05:00
**Link:** https://t.me/nest_ru/80077

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Тогда не интересно, мне как минимум нужна работа без простоев

Main message:
Я не до рос до этого, когда несколько нод будет напишу сюда)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я не до рос до этого, когда несколько нод будет напишу сюда)

--

## My telegram message #80080
**Time:** 26.11.2020 01:08:47 UTC+05:00
**Link:** https://t.me/nest_ru/80080

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тупа снап все делает)
- не думал про serverless ?
- Я не до рос до этого, когда несколько нод будет напишу сюда)
- Думал да, звучит вкусно, но на деле куча дрочева добавляется. Есть например боты в телеге, они должны максимально быстро работать, а там холодный старт, который раздувается с размером кода. А если делаем меньше кода и микросервисы, то добавляется проблема с администрированием. Плюс в AWS нужно ещё дрочиться с правами, а в GCP холодный старт сильно дольше)

Main message:
Ты реально эти проблемы ща имеешь, или предполгаешь тока?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты реально эти проблемы ща имеешь, или предполгаешь тока?

--

## My telegram message #80084
**Time:** 26.11.2020 01:11:50 UTC+05:00
**Link:** https://t.me/nest_ru/80084

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Реально имею

Main message:
Свой сервер лесс сделай тогда и сам управляй и расширяй кластер и работы через ноды сам запили, думаю неделя уйдёт, без кубера и сварм на доккерах все, как быстрая победа, потом найдёшь нормальное решение, ну мое мнение хз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Свой сервер лесс сделай тогда и сам управляй и расширяй кластер и работы через ноды сам запили, думаю неделя уйдёт, без кубера и сварм на доккерах все, как быстрая победа, потом найдёшь нормальное решение, ну мое мнение хз

--

## My telegram message #80087
**Time:** 26.11.2020 01:12:22 UTC+05:00
**Link:** https://t.me/nest_ru/80087

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вроде есть какие-то +- норм решения для постоянного прогрева лямбды Ну а права это норм, без них нельзя, мин. привилегий
- Реально имею
- Свой сервер лесс сделай тогда и сам управляй и расширяй кластер и работы через ноды сам запили, думаю неделя уйдёт, без кубера и сварм на доккерах все, как быстрая победа, потом найдёшь нормальное решение, ну мое мнение хз
- А в чем тогда профит с использования лямбды? Ведь если прогреваешь - приложение работает постоянно

Main message:
Тогда не критично

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тогда не критично

--

## My telegram message #80090
**Time:** 26.11.2020 01:16:11 UTC+05:00
**Link:** https://t.me/nest_ru/80090

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну финансово никто не страдает, это правда)

Main message:
Значит пофигу, пили фичи и поднимай на одной ноде куак инстансов и просто меняй тариф когда начнёт не вывозить и поднимай ещё больше инстансов, если бизнес не на накроется и ресурсы кончатся тогда и думай, там же виртуализация на впс, у тя куча процов и жёстких участвует, для тебя может и будет одна нода, а по факту куча железа там под капотом

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Значит пофигу, пили фичи и поднимай на одной ноде куак инстансов и просто меняй тариф когда начнёт не вывозить и поднимай ещё больше инстансов, если бизнес не на накроется и ресурсы кончатся тогда и думай, там же виртуализация на впс, у тя куча процов и жёстких участвует, для тебя может и будет одна нода, а по факту куча железа там под капотом

--

## My telegram message #80094
**Time:** 26.11.2020 01:17:49 UTC+05:00
**Link:** https://t.me/nest_ru/80094

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тогда не критично
- Ну финансово никто не страдает, это правда)
- Значит пофигу, пили фичи и поднимай на одной ноде куак инстансов и просто меняй тариф когда начнёт не вывозить и поднимай ещё больше инстансов, если бизнес не на накроется и ресурсы кончатся тогда и думай, там же виртуализация на впс, у тя куча процов и жёстких участвует, для тебя может и будет одна нода, а по факту куча железа там под капотом
- Это что за провайдер? Как-то слишком уж дёшево

Main message:
И дома агенты ещё есть на компе))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

И дома агенты ещё есть на компе))

--

## My telegram message #80099
**Time:** 26.11.2020 01:19:39 UTC+05:00
**Link:** https://t.me/nest_ru/80099

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Что-то слишком дёшево)

Main message:
Завтра скажу точно, ушел била и тела смотреть, пока всем)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Завтра скажу точно, ушел била и тела смотреть, пока всем)

--

