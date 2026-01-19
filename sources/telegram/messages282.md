## My telegram message #318225
**Time:** 10.10.2024 17:19:31 UTC+05:00
**Link:** https://t.me/nest_ru/318225

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! В app.module.ts нормальная ли практика делать так в imports? ...(process.env.TG_BOT_TOKEN ? [TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, })] : []), Мне надо, чтобы если я не указал параметр в .env, не подгружался модуль (я не хочу пользоваться тогда модулем) Если ненормально, подскажите, пожалуйста, как можно такое норм сделать?

Main message:
все норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все норм

--

## My telegram message #318232
**Time:** 10.10.2024 17:36:30 UTC+05:00
**Link:** https://t.me/nest_ru/318232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у него же енвы не подгрузятся в этот момент

Main message:
все енвы доступны уже при старте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все енвы доступны уже при старте

--

## My telegram message #318234
**Time:** 10.10.2024 17:39:24 UTC+05:00
**Link:** https://t.me/nest_ru/318234

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все норм
- у него же енвы не подгрузятся в этот момент
- все енвы доступны уже при старте
- А если я хочу вынести TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) из app.module.ts в telegram.module.ts, а в внутри app.module.ts просто в imports делать TelegramModule, как это сделать и делают ли так? Просто когда я тупо так сделал, у меня теперь ошибка, как если бы я просто закомментировал TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) внутри app.module.ts

Main message:
а зачем тебе то добавлять этот модуль то не добавлять?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а зачем тебе то добавлять этот модуль то не добавлять?

--

## My telegram message #318238
**Time:** 10.10.2024 17:44:14 UTC+05:00
**Link:** https://t.me/nest_ru/318238

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все енвы доступны уже при старте
- А если я хочу вынести TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) из app.module.ts в telegram.module.ts, а в внутри app.module.ts просто в imports делать TelegramModule, как это сделать и делают ли так? Просто когда я тупо так сделал, у меня теперь ошибка, как если бы я просто закомментировал TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) внутри app.module.ts
- а зачем тебе то добавлять этот модуль то не добавлять?
- Ну, у меня есть Notification сервис, в котором основная цель сейчас слать email'ы, но мне сказали сделать и Телеграм. Я сделал, но пока на проде не предусмотрен функционал с телегой. Может, конечно, можно тупо закомментировать) но я почему-то захотел динамически подгружать

Main message:
нужно все импортировать, просто сервис который занимается отправкой на емайл или телегу будет то работать то не работать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужно все импортировать, просто сервис который занимается отправкой на емайл или телегу будет то работать то не работать

--

## My telegram message #318240
**Time:** 10.10.2024 17:45:48 UTC+05:00
**Link:** https://t.me/nest_ru/318240

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Во, я так и хочу. Но, для этого мне надо как-то вынести в telegram.module.ts этот код TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) Потому что после того как я сделал в app.module.ts такое ...(process.env.TG_BOT_TOKEN ? [TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, })] : []), Telegraf ругается. Короче, так не выйдет

Main message:
так не нужно делать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так не нужно делать

--

## My telegram message #318247
**Time:** 10.10.2024 17:49:37 UTC+05:00
**Link:** https://t.me/nest_ru/318247

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Дело в том, что вот это TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) Грузит в Telegraf токен бота. Если он неверный (TEST_TOKEN, например), тогда ошибка 401 /app_erproom_notification/node_modules/.pnpm/telegraf@4.16.3/node_modules/telegraf/lib/core/network/client.js:290 throw new error_1.default({ ^ TelegramError: 401: Bot Token is required -- Если подставить пустую строку, другая ошибка. Если сделать так как выше с [], тогда он там начинает говорить, что ему надо BOT_NAME или что-то такое, короче Telegraf не нравится, что я ему не даю валидный токен бота

Main message:
напиши свой модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

напиши свой модуль

--

## My telegram message #318251
**Time:** 10.10.2024 17:52:13 UTC+05:00
**Link:** https://t.me/nest_ru/318251

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А в чем проблема просто не включать модуль, пока интеграций с телегой не завезли? Проблема из ничего
- Дело в том, что вот это TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) Грузит в Telegraf токен бота. Если он неверный (TEST_TOKEN, например), тогда ошибка 401 /app_erproom_notification/node_modules/.pnpm/telegraf@4.16.3/node_modules/telegraf/lib/core/network/client.js:290 throw new error_1.default({ ^ TelegramError: 401: Bot Token is required -- Если подставить пустую строку, другая ошибка. Если сделать так как выше с [], тогда он там начинает говорить, что ему надо BOT_NAME или что-то такое, короче Telegraf не нравится, что я ему не даю валидный токен бота
- напиши свой модуль
- Так и сделал. Но, как только я делаю это внутри него TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) И этот модуль импортирую в app.module.ts, приложение себя так ведет, как будто я этот код нигде не написал TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, })

Main message:
ну ты же запускаешь подключение к телеграм, вот и не запускай его если токен не передал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты же запускаешь подключение к телеграм, вот и не запускай его если токен не передал

--

## My telegram message #318256
**Time:** 10.10.2024 18:01:20 UTC+05:00
**Link:** https://t.me/nest_ru/318256

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
я тебе и сказал напиши свой модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тебе и сказал напиши свой модуль

--

## My telegram message #318258
**Time:** 10.10.2024 18:01:49 UTC+05:00
**Link:** https://t.me/nest_ru/318258

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну ты же запускаешь подключение к телеграм, вот и не запускай его если токен не передал
- В моем случае вот так получилось в app.module.ts в imports ...( process.env.TG_BOT_TOKEN ? [ TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }), TelegramModule, ] : [] ), Теперь работает. Как-то выглядит не очень, как по мне, но работает. За помощь всё равно большое спасибо! -- P.S.: Так а в итоге так не делают, что я выше спросил? можно ли все эти .forRoot вынести как-то внутрь модулей? Вот в моем случае TelegrafModule.forRoot({ token: process.env.TG_BOT_TOKEN as string, }) убрать внутрь TelegramModule (telegram.module.ts) ?
- я тебе и сказал напиши свой модуль
- Окей, теперь понял)

Main message:
и в нем если нет токена то не подключайся к телеге, если есть то подключайся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и в нем если нет токена то не подключайся к телеге, если есть то подключайся

--

## My telegram message #318713
**Time:** 11.10.2024 17:11:07 UTC+05:00
**Link:** https://t.me/nest_ru/318713

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Получается так)

Main message:
тут не причем правила декорирования, декораторы класс валидатора сохраняют инфу о свойстве в метадата сторадж  getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async)); потом при вызове валидации уже происходит работы с этим метадата сторадж

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тут не причем правила декорирования, декораторы класс валидатора сохраняют инфу о свойстве в метадата сторадж  getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async)); потом при вызове валидации уже происходит работы с этим метадата сторадж

--

## My telegram message #318715
**Time:** 11.10.2024 17:11:52 UTC+05:00
**Link:** https://t.me/nest_ru/318715

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да не, я из любопытства, не решаю задачу. Просто интересно было, а можно ли на ноде получать бигинты из бд без приведения к строке) Но полагаю, это не нужно, если уж дело дошло до гигантских чисел, пара кастов туда-сюда погоды не испортят.
- А есть ли у Вас вообще живой пример, где bigint на js используется в рамках Неста?)
- тут не причем правила декорирования, декораторы класс валидатора сохраняют инфу о свойстве в метадата сторадж  getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async)); потом при вызове валидации уже происходит работы с этим метадата сторадж
- Хороший поинт)

Main message:
так что проще пускануть и чекнуть что раньше отработает, так как точно сказать сложно) есть разные типы валидаторов еще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так что проще пускануть и чекнуть что раньше отработает, так как точно сказать сложно) есть разные типы валидаторов еще

--

## My telegram message #318728
**Time:** 11.10.2024 17:33:02 UTC+05:00
**Link:** https://t.me/nest_ru/318728

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Кто может подсказать удобный сервис для создания схем баз данных? Требования: - удобство - бесплатно (или можно развернуть бесплатно на своем сервере) - чтобы один вносил изменения, а другие сразу это видели (ща пользуемся  https://drawdb.vercel.app/ так там после каждого изменения надо новую ссылку создавать чтобы его увидели)

Main message:
обычно один человек проектирует базу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

обычно один человек проектирует базу

--

## My telegram message #318731
**Time:** 11.10.2024 17:34:48 UTC+05:00
**Link:** https://t.me/nest_ru/318731

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Если он проектирует её с JSON, то он сам берет на себя такие риски. Да? И это же не последний новенький человек в команде.

Main message:
на счет жсон сюда  https://t.me/react_js

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на счет жсон сюда  https://t.me/react_js

--

## My telegram message #318733
**Time:** 11.10.2024 17:35:51 UTC+05:00
**Link:** https://t.me/nest_ru/318733

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я в курсе. Просто проблема конкретно в том, что он проектирует, а чтобы я видел изменения надо постоянно ему шерить, копировать ссылку, скидывать ее. По старым ссылкам старые версии только

Main message:
ну вот он пусть миграцию создаст и ее всевремя меняет и в репу скидывает, а ты репу принимай и базу пересоздавай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну вот он пусть миграцию создаст и ее всевремя меняет и в репу скидывает, а ты репу принимай и базу пересоздавай

--

