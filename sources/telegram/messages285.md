## My telegram message #322570
**Time:** 30.10.2024 23:38:05 UTC+05:00
**Link:** https://t.me/nest_ru/322570

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
глянь как это сделано в ларе и тоже самое тут напиши

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

глянь как это сделано в ларе и тоже самое тут напиши

--

## My telegram message #322573
**Time:** 30.10.2024 23:38:57 UTC+05:00
**Link:** https://t.me/nest_ru/322573

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- глянь как это сделано в ларе и тоже самое тут напиши
- В Ларе все готовое )

Main message:
ну в жс тоже все готово, просто нужно правильные слова писать в гугле

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну в жс тоже все готово, просто нужно правильные слова писать в гугле

--

## My telegram message #322683
**Time:** 31.10.2024 17:20:55 UTC+05:00
**Link:** https://t.me/nest_ru/322683

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://t.me/nestjs_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nestjs_jobs

--

## My telegram message #323182
**Time:** 03.11.2024 19:35:20 UTC+05:00
**Link:** https://t.me/nest_ru/323182

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, хотел бы узнать best practice по dockerfile в nestjs микросервисах Структура проекта:  /server  /apps  /api  /src dockerfile  /other -microservice:  /src dockerfile  /assets  /dist package.json tsconfig.json other configs Очень долго пытался настроить докер, чтобы он копировал все конфиги т .д., и пришёл к тому, что просто копируем весь проект, билдим и запускаем определённый микро сервис. Я так понимаю это не самый лучший вариант, т.к. увеличивается время билда и размер самого образа. Кто-то может помочь/подсказать? Все примеры которые находил засетаплены подругому и у каждый микросервис там это как отдельный nest проект. Снизу прекриплю свой dockerfile

Main message:
у меня много разных шагов на пути билдов доккеров, можешь глянуть там, вдруг ченить сможешь понять и себе взять  https://github.com/nestjs-mod/nestjs-mod-fullstack/blob/master/.docker/build-images.sh

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня много разных шагов на пути билдов доккеров, можешь глянуть там, вдруг ченить сможешь понять и себе взять  https://github.com/nestjs-mod/nestjs-mod-fullstack/blob/master/.docker/build-images.sh

--

## My telegram message #323184
**Time:** 03.11.2024 19:52:24 UTC+05:00
**Link:** https://t.me/nest_ru/323184

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет, подскажите пожалуйста nx monorepo workspace + nest js hot reload & watch режим не работают при сохранении файла в папке libs nest js библиотеки в рамках nx. nestjs перезапускается в режиме разработки только если сохранять файл в apps/<name nest js app>, а надо чтобы еще и в libs/<любое наименование либы> кто-то сталкивался?

Main message:
у меня работает норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня работает норм

--

## My telegram message #323186
**Time:** 03.11.2024 19:54:05 UTC+05:00
**Link:** https://t.me/nest_ru/323186

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- К сожалению у меня нет микросервисов
- у меня много разных шагов на пути билдов доккеров, можешь глянуть там, вдруг ченить сможешь понять и себе взять  https://github.com/nestjs-mod/nestjs-mod-fullstack/blob/master/.docker/build-images.sh
- у меня работает норм
- Поделитесь пожалуйста своими конфигурациями

Main message:
выше ссылка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

выше ссылка

--

## My telegram message #323448
**Time:** 05.11.2024 14:12:42 UTC+05:00
**Link:** https://t.me/nest_ru/323448

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребята, помогите может кто сталкивался: NestJS зависает рандомно. Просто перестаёт отвечать на любые запросы. Ошибок в логах нет. Помогает перезапуск контейнера с nestjs Стэнд: NestJS в докере PostgreSQL в докере (без ограничений в ресурсах) 1. Кэширование НЕ использую (redis). 2. За RAM и CPU слежу - не переполняются. 3. Ошибок в postgre запросах нет - логирую все запросы 4. Попробую мониторить метрики postgres, может там Не знаю в какую сторону дальше копать....

Main message:
у тебя походу евент луп ноды лочится, вот такую фигню воткни она показывает блокировки евент лупов  import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'; @Injectable() export class CoreBootstrapService implements OnModuleInit, OnModuleDestroy { private readonly logger = new Logger(CoreBootstrapService.name); private intervalRef: NodeJS.Timer; onModuleDestroy() { this.logger.log('onModuleDestroy'); if (this.intervalRef) { clearInterval(this.intervalRef); } } onModuleInit() { this.logger.log('onModuleInit'); let tmStart = new Date().getTime(); this.intervalRef = setInterval(() => { const endTime = new Date().getTime(); const diff = endTime - tmStart; if (diff >= 3000) { this.logger.error(`NodeJS event loop was frozen more than 3s. Freeze duration was: ${diff}ms.`); } tmStart = endTime; }, 1000); } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя походу евент луп ноды лочится, вот такую фигню воткни она показывает блокировки евент лупов  import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'; @Injectable() export class CoreBootstrapService implements OnModuleInit, OnModuleDestroy { private readonly logger = new Logger(CoreBootstrapService.name); private intervalRef: NodeJS.Timer; onModuleDestroy() { this.logger.log('onModuleDestroy'); if (this.intervalRef) { clearInterval(this.intervalRef); } } onModuleInit() { this.logger.log('onModuleInit'); let tmStart = new Date().getTime(); this.intervalRef = setInterval(() => { const endTime = new Date().getTime(); const diff = endTime - tmStart; if (diff >= 3000) { this.logger.error(`NodeJS event loop was frozen more than 3s. Freeze duration was: ${diff}ms.`); } tmStart = endTime; }, 1000); } }

--

## My telegram message #323452
**Time:** 05.11.2024 14:15:53 UTC+05:00
**Link:** https://t.me/nest_ru/323452

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
da, providers

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

da, providers

--

## My telegram message #323454
**Time:** 05.11.2024 14:20:19 UTC+05:00
**Link:** https://t.me/nest_ru/323454

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- (слева ) таблицы (справа) json который надо получить. Используется Prisma. Вопрос : Как это лучше сделать ? Можно ли это добиться за одно обращение привычными способом или надо получать данные отдельно и объединение вручную на js ? или тупо через rawQuery ?

Main message:
ну прям такой жсон не выйдет, ну одним призма запросом можно это все выдернуть, просто потом конвертнешь на выходе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну прям такой жсон не выйдет, ну одним призма запросом можно это все выдернуть, просто потом конвертнешь на выходе

--

## My telegram message #323456
**Time:** 05.11.2024 14:25:32 UTC+05:00
**Link:** https://t.me/nest_ru/323456

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- чет я не пойму как ? мне приходит в голову лишь отдельно получить атрибуты категории и вручну в цикле замапить их со списком опций, а уже потом полученый объект прицепить к объекту категории вручную и вернуть готовый ответ

Main message:
ну смотри че там тебе по типам подсказывает, чет типа того  this.prismaClient.category.findMany({ include:{categoryFilters:{include:{attributes:true,options:true}} })

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну смотри че там тебе по типам подсказывает, чет типа того  this.prismaClient.category.findMany({ include:{categoryFilters:{include:{attributes:true,options:true}} })

--

## My telegram message #323458
**Time:** 05.11.2024 14:28:12 UTC+05:00
**Link:** https://t.me/nest_ru/323458

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну прям такой жсон не выйдет, ну одним призма запросом можно это все выдернуть, просто потом конвертнешь на выходе
- чет я не пойму как ? мне приходит в голову лишь отдельно получить атрибуты категории и вручну в цикле замапить их со списком опций, а уже потом полученый объект прицепить к объекту категории вручную и вернуть готовый ответ
- ну смотри че там тебе по типам подсказывает, чет типа того  this.prismaClient.category.findMany({ include:{categoryFilters:{include:{attributes:true,options:true}} })
- да, но там будут повторятся атрибуты. Их надо сгрупировать по id, а их опции объеденить в массив.

Main message:
и?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и?

--

## My telegram message #323463
**Time:** 05.11.2024 14:32:26 UTC+05:00
**Link:** https://t.me/nest_ru/323463

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну смотри че там тебе по типам подсказывает, чет типа того  this.prismaClient.category.findMany({ include:{categoryFilters:{include:{attributes:true,options:true}} })
- да, но там будут повторятся атрибуты. Их надо сгрупировать по id, а их опции объеденить в массив.
- и?
- да. я и думаю об этом. Может тогда лучше отдельно достать категорию и отдельно categoryFilters, перемапить их и подсунуть категории, без удаления предыдущих объектов

Main message:
призма по идее отдельно все это дернет и сформирует некую структуру, тоесть что ты руками будешь все дергать что призма, скорость забора данных с бд одна и таже будет, просто если ты сам руками писать будешь то сразу мапнешь в свой формат, а если призма - то нужно будет ее вывод переделать в твой формат я вообще ответы призмы прям на фронт шлю) пофигу, так как я сам фрон и бэк пишу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

призма по идее отдельно все это дернет и сформирует некую структуру, тоесть что ты руками будешь все дергать что призма, скорость забора данных с бд одна и таже будет, просто если ты сам руками писать будешь то сразу мапнешь в свой формат, а если призма - то нужно будет ее вывод переделать в твой формат я вообще ответы призмы прям на фронт шлю) пофигу, так как я сам фрон и бэк пишу

--

## My telegram message #323465
**Time:** 05.11.2024 14:34:10 UTC+05:00
**Link:** https://t.me/nest_ru/323465

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- да. я и думаю об этом. Может тогда лучше отдельно достать категорию и отдельно categoryFilters, перемапить их и подсунуть категории, без удаления предыдущих объектов

Main message:
ааа, я понял че ты спрашиваешь) у тя как будто в базе не правильно спроектированно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ааа, я понял че ты спрашиваешь) у тя как будто в базе не правильно спроектированно

--

## My telegram message #323475
**Time:** 05.11.2024 14:58:15 UTC+05:00
**Link:** https://t.me/nest_ru/323475

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- К сожалению не выявилось. Уже 2 раза зависал - в логах не написал

Main message:
поставь 1 сек

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

поставь 1 сек

--

## My telegram message #323480
**Time:** 05.11.2024 15:03:14 UTC+05:00
**Link:** https://t.me/nest_ru/323480

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- поставил интервал 500ms и срабатывание если больше 1 сек

Main message:
после срабатывания зависает намертво? вообщем локов не должно быть, если они есть то он могут в ряд несколько запустится и вообще все виснет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

после срабатывания зависает намертво? вообщем локов не должно быть, если они есть то он могут в ряд несколько запустится и вообще все виснет

--

## My telegram message #323483
**Time:** 05.11.2024 15:06:42 UTC+05:00
**Link:** https://t.me/nest_ru/323483

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да, намертво виснет

Main message:
локально добейся поведения этого

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

локально добейся поведения этого

--

## My telegram message #323486
**Time:** 05.11.2024 15:08:05 UTC+05:00
**Link:** https://t.me/nest_ru/323486

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- после срабатывания зависает намертво? вообщем локов не должно быть, если они есть то он могут в ряд несколько запустится и вообще все виснет
- Да, намертво виснет
- локально добейся поведения этого
- сам воспроизвести не могу, только когда на проде люди сидят

Main message:
причины в основном вот какие у меня были: 1) работа с файлами 2) транзакции 3) вызов внешних либ 4) использование Promise.all

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

причины в основном вот какие у меня были: 1) работа с файлами 2) транзакции 3) вызов внешних либ 4) использование Promise.all

--

## My telegram message #323507
**Time:** 05.11.2024 15:53:37 UTC+05:00
**Link:** https://t.me/nest_ru/323507

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ура! Кажется нашёл в какую сторону копать. В общем добавил следующее в TypeOrmModule:  ... connectTimeoutMS: 10000, poolErrorHandler: (err: any) => { logger.error({ context: 'DB', message: 'Database pool error', labels: { db: 'pool', type: 'error', }, error: err, }); }, ... после этого перед зависание увидел в консоли  [Application] - 05-11-2024, 15:42:06.184 ERROR [system_event] action=system subject=error description='timeout exceeded when trying to connect' - { stack: 'Error: timeout exceeded when trying to connect\n' + ' at Timeout._onTimeout (/app/node_modules/pg-pool/index.js:205:27)\n' + ' at listOnTimeout (node:internal/timers:581:17)\n' + ' at process.processTimers (node:internal/timers:519:7)', type: 'Error', extra: 'timeout exceeded when trying to connect', path: '/api/v1/app/entity-route?entity=buildings' } +236ms [Application] - 05-11-2024, 15:42:10.471 ERROR [system_event] action=system subject=error description='timeout exceeded when trying to connect' - { stack: 'Error: timeout exceeded when trying to connect\n' + ' at Timeout._onTimeout (/app/node_modules/pg-pool/index.js:205:27)\n' + ' at listOnTimeout (node:internal/timers:581:17)\n' + ' at process.processTimers (node:internal/timers:519:7)', type: 'Error', extra: 'timeout exceeded when trying to connect', path: '/api/v1/network/wired/segments?filter[]=network_type.id%7C%7C$eq%7C%7C1&join[]=branch&join[]=cable_layout_type&join[]=cable_model&join[]=cable_route&join[]=network_type&join[]=section&limit=5&page=1' } +4s думаю что сработала настройка  connectTimeoutMS: 10000 Получается что дело в БД. В какой-то момент перестаёт отвечать. Может быть количество соединений увеличить?

Main message:
ты не трогал настройки постгре? и колво соединений точно 10?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты не трогал настройки постгре? и колво соединений точно 10?

--

## My telegram message #323511
**Time:** 05.11.2024 15:56:25 UTC+05:00
**Link:** https://t.me/nest_ru/323511

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо, буду рыться в коде
- Ура! Кажется нашёл в какую сторону копать. В общем добавил следующее в TypeOrmModule:  ... connectTimeoutMS: 10000, poolErrorHandler: (err: any) => { logger.error({ context: 'DB', message: 'Database pool error', labels: { db: 'pool', type: 'error', }, error: err, }); }, ... после этого перед зависание увидел в консоли  [Application] - 05-11-2024, 15:42:06.184 ERROR [system_event] action=system subject=error description='timeout exceeded when trying to connect' - { stack: 'Error: timeout exceeded when trying to connect\n' + ' at Timeout._onTimeout (/app/node_modules/pg-pool/index.js:205:27)\n' + ' at listOnTimeout (node:internal/timers:581:17)\n' + ' at process.processTimers (node:internal/timers:519:7)', type: 'Error', extra: 'timeout exceeded when trying to connect', path: '/api/v1/app/entity-route?entity=buildings' } +236ms [Application] - 05-11-2024, 15:42:10.471 ERROR [system_event] action=system subject=error description='timeout exceeded when trying to connect' - { stack: 'Error: timeout exceeded when trying to connect\n' + ' at Timeout._onTimeout (/app/node_modules/pg-pool/index.js:205:27)\n' + ' at listOnTimeout (node:internal/timers:581:17)\n' + ' at process.processTimers (node:internal/timers:519:7)', type: 'Error', extra: 'timeout exceeded when trying to connect', path: '/api/v1/network/wired/segments?filter[]=network_type.id%7C%7C$eq%7C%7C1&join[]=branch&join[]=cable_layout_type&join[]=cable_model&join[]=cable_route&join[]=network_type&join[]=section&limit=5&page=1' } +4s думаю что сработала настройка  connectTimeoutMS: 10000 Получается что дело в БД. В какой-то момент перестаёт отвечать. Может быть количество соединений увеличить?
- ты не трогал настройки постгре? и колво соединений точно 10?
- listen_addresses='*' max_connections=100 shared_buffers=1GB effective_cache_size=4GB work_mem=16MB maintenance_work_mem=512MB random_page_cost=1.1 temp_file_limit=10GB log_min_duration_statement=200ms idle_in_transaction_session_timeout=10s lock_timeout=1s statement_timeout=600s shared_preload_libraries='pg_stat_statements' pg_stat_statements.max=10000 pg_stat_statements.track=all timezone=UTC log_timezone=UTC log_destination='stderr'

Main message:
ну у тебя ошибка как раз о том что база зависла, так как ты чет там понастраивал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну у тебя ошибка как раз о том что база зависла, так как ты чет там понастраивал

--

## My telegram message #323521
**Time:** 05.11.2024 16:04:00 UTC+05:00
**Link:** https://t.me/nest_ru/323521

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Можно увеличить пул в конфиге TypeORM - PoolSize сделать например 100. Если приложение зависать стало позже чем обычно, т.е выдерживает больше запросов чем раньше, то просто надо поправить код и завершать сессии

Main message:
у него база виснет от нагрузки, если он увеличит пулл в тайп орм то еще быстрее все зависнет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у него база виснет от нагрузки, если он увеличит пулл в тайп орм то еще быстрее все зависнет

--

## My telegram message #324173
**Time:** 08.11.2024 12:42:17 UTC+05:00
**Link:** https://t.me/nest_ru/324173

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
корзина сбрасывается при f5, если не авторизован

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

корзина сбрасывается при f5, если не авторизован

--

## My telegram message #324176
**Time:** 08.11.2024 12:44:33 UTC+05:00
**Link:** https://t.me/nest_ru/324176

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Любая подойдет. Проще всего сделать вьюшку с нужными данными, и её тупо грузить в Мантикору.
- корзина сбрасывается при f5, если не авторизован
- Это так задумано
- Требования заказчика))

Main message:
ну ок)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ок)

--

## My telegram message #324983
**Time:** 13.11.2024 10:07:21 UTC+05:00
**Link:** https://t.me/nest_ru/324983

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет - появилась нетривиальная задачка. Используется в качестве логгера pino-nest, в целом все устраивает, путем определения мидлвары назначаем reqId как UUID и через конфиг pinoHttp поределили доп. поля для записи в лог. Но тут возникла необходимость записывать в лог время, прошедшее с момента поступления запроса (не общее время между request-response - это как раз сделано просто "по бумажке", а именно в каждой записи в лог в промежутке). Для модификации данных можно определить в конфиге обработчик formatters.log - но проблема в том, что в него падает только набор данных для записи в лог при вызовах методов, но вот как-то получить из него время начала запроса не удается. Может существует какой-то нестандартный способ определения логгера, может есть какой-то форк/плагин над пино, который это позволит сделать, в крайнем случае другой логгер, который даст такую возможность. Буду признателен за любую помощь (просьба только отдельный трейсинг не предлагать - нет возможности поднять подобное + перелопатить кучу кода для добавления работы на уровне спанов).

Main message:
если изучишь как работает телеметрия и спаны, то можешь сам подобное сделать на аскинк локал сторадж нужно при старте нест приложения выдернуть из диай все сервисы и контроллеры и оборачиваешь все методы в доп обертки которые будут цепочки в асинк локал сторадже делать а вообще спаны телеметрии как раз это все и решают так то, поднимается эта вся чепуха не так уж и сложно, я бы в эту сторону смотрел

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если изучишь как работает телеметрия и спаны, то можешь сам подобное сделать на аскинк локал сторадж нужно при старте нест приложения выдернуть из диай все сервисы и контроллеры и оборачиваешь все методы в доп обертки которые будут цепочки в асинк локал сторадже делать а вообще спаны телеметрии как раз это все и решают так то, поднимается эта вся чепуха не так уж и сложно, я бы в эту сторону смотрел

--

## My telegram message #324986
**Time:** 13.11.2024 10:12:12 UTC+05:00
**Link:** https://t.me/nest_ru/324986

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Звучит интересно. Есть что почитать на эту тему?

Main message:
я репу создавал чтобы баг один прочекать, ну там есть поднятие инфраструктуры для опентелеметрии и ее интеграция в нест и дальше уже смотришь через дашборд графаны цепочку вызовов  https://github.com/EndyKaufman/opentelemetry-nest-test/blob/main/dev-infra.sh тут коммит с включенной опен телеметрией  https://github.com/EndyKaufman/opentelemetry-nest-test/tree/0f5d458653e6a1ec766f0f52c59fcdfda87b247c почитать хз, нужно искать )

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я репу создавал чтобы баг один прочекать, ну там есть поднятие инфраструктуры для опентелеметрии и ее интеграция в нест и дальше уже смотришь через дашборд графаны цепочку вызовов  https://github.com/EndyKaufman/opentelemetry-nest-test/blob/main/dev-infra.sh тут коммит с включенной опен телеметрией  https://github.com/EndyKaufman/opentelemetry-nest-test/tree/0f5d458653e6a1ec766f0f52c59fcdfda87b247c почитать хз, нужно искать )

--

## My telegram message #325088
**Time:** 13.11.2024 15:52:08 UTC+05:00
**Link:** https://t.me/nest_ru/325088

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- import { DynamicModule, Global, InternalServerErrorException, Module, ModuleMetadata, Provider, Type } from '@nestjs/common'; export const M_OPTIONS_TOKEN = Symbol.for('M_OPTIONS_TOKEN'); export type MModuleOptions = { secretKey: string; }; export interface MModuleOptionsFactory { createOptions(): Promise<MModuleOptions> | MModuleOptions; } export interface MModuleAsyncOptions extends ModuleMetadata { inject?: any[]; useClass?: Type<MModuleOptionsFactory>; useExisting?: Type<MModuleOptionsFactory>; useFactory?: (...args: any[]) => Promise<MModuleOptions> | MModuleOptions; } @Global() @Module({ controllers: [], exports: [], imports: [], providers: [], }) export class MModule { public static registerAsync(options: MModuleAsyncOptions): DynamicModule { return { exports: [], imports: options.imports || [], module: MModule, providers: this.createAsyncProviders(options), }; } private static createAsyncProviders(options: MModuleAsyncOptions): Provider[] { if (options.useExisting || options.useFactory) { return [this.createAsyncOptionsProvider(options)]; } if (!options.useClass) { throw new InternalServerErrorException('.useClass, .useFactory or .useExisting should be defined!'); } return [ this.createAsyncOptionsProvider(options), { provide: options.useClass, useClass: options.useClass, }, ]; } private static createAsyncOptionsProvider(options: MModuleAsyncOptions): Provider { if (options.useFactory) { return { inject: options.inject || [], provide: M_OPTIONS_TOKEN, useFactory: options.useFactory, }; } const use = options.useExisting || options.useClass; if (!use) { throw new InternalServerErrorException('.useClass or .useExisting should be defined!'); } return { inject: [use], provide: M_OPTIONS_TOKEN, useFactory: async (optionsFactory: MModuleOptionsFactory) => optionsFactory.createOptions(), }; } }
- получется нельзя использовать new ConfigurableModuleBuilder<QueueModuleOptions>().build(); как указано в офф документации для создания модулей?
- Это тоже самое, просто в доке абстракция над этим
- Господа, а не подскажите по Prisma, как там enum проверить в includes ?  src/dumps/usecases/list.dumps.uc.ts:21:73 - error TS2345: Argument of type 'UserRole' is not assignable to parameter of type '"administrator" | "operator"'. Type '"customer"' is not assignable to type '"administrator" | "operator"'.

Main message:
as string

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

as string

--

## My telegram message #325115
**Time:** 13.11.2024 17:21:17 UTC+05:00
**Link:** https://t.me/nest_ru/325115

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Вопрос по Swagger: сделал глобальный query param в main.ts  const config = new DocumentBuilder() .addGlobalParameters({ name: 'user-status', in: 'query', required: true, example: 1, description: 'Параметр, указывающий на статус активности пользователя в системе', })  Теперь я хочу, чтобы у меня в случае предоставления любого значение, которое не 1, выпадало 403 Могу ли я каким-то образом также глобально навесить это на все контроллеры, чтобы не дублировать везде  @ApiResponse ()? Если да, подскажите, пожалуйста, как именно?

Main message:
function main (){ for (const ctrl of [Controller1, Controller2]) { ApiResponse({.....})(ctrl); } //... }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

function main (){ for (const ctrl of [Controller1, Controller2]) { ApiResponse({.....})(ctrl); } //... }

--

