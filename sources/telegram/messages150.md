## My telegram message #159949
**Time:** 13.05.2022 22:42:52 UTC+05:00
**Link:** https://t.me/nest_ru/159949

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- теги это отдельная табличка, но с видео связана она через многое ко многим. вот пример из миграции export function up(knex) { return Promise.all([ knex.schema.createTable(tables.tag, (table) => { table.uuid('id').primary(); table.string('title').notNullable().unique(); table.enum('status', [STATUS.draft, STATUS.published]).defaultTo(STATUS.draft); table.timestamps(true, true); }), ]); }
- короче можно одним запросом, но написать сейчас не смогу, вот идея: получить по видео список текущих тегов и сложить в переменную таблицы, сложить новые теги в другую таблицу, затем выполнить truncate текущих тегов в бд и insert с помощью union из двух таблиц. Это такое, топорное решение на коленках)
- Всем привет! Очень давно слушал какой-то подкаст и там говорилось о том, что в несте можно визуализировать структуру проекта очень просто (в моем понимании это что-то наподобие диаграммы классов). Никто о таком не слышал? По первым запросам в гугле все мимо
- Вот

Main message:
еще можно через  https://docs.nestjs.com/recipes/documentation

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

еще можно через  https://docs.nestjs.com/recipes/documentation

--

## My telegram message #159985
**Time:** 14.05.2022 13:10:35 UTC+05:00
**Link:** https://t.me/nest_ru/159985

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #160336
**Time:** 15.05.2022 12:45:54 UTC+05:00
**Link:** https://t.me/nest_ru/160336

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Покажите скрины
- скрины чего?)
- Как вы запускаете и как оно не запускается
- Так, пауза. До этого я запускал всегда приложение через лаунч конфиг IDE:  { "configurations": [ { "name": "start:dev", "request": "launch", "runtimeArgs": [ "run-script", "start:dev" ], "runtimeExecutable": "npm", "skipFiles": [ "<node_internals>/**" ], "type": "node" } ] }  Таким образом в консоль не выводилось ничего кроме:  > nest_snapfactory_api@0.0.1 start:dev > nest start --watch  Посмотрел что под капотом у скрипта  start:dev - там  nest start --watch . Запустил через эту команду приложение в консоли - получил ошибку(якобы он не может найти какой-то модуль. Сейчас буду смотреть что и почему). Из этого возникает другой вопрос: а нельзя разве как-то использовать для запуска launch конфиг IDE, при этом чтобы логи в консоли выводились?

Main message:
Нужно прицепится к процессу который выводит логи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нужно прицепится к процессу который выводит логи

--

## My telegram message #160341
**Time:** 15.05.2022 13:21:27 UTC+05:00
**Link:** https://t.me/nest_ru/160341

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нужно прицепится к процессу который выводит логи
- Возможно они выводятся не в обычную консоль, а в консоль связанную с запуском скриптов из IDE
- Всем привет, подскажите, почему юзеру в теле ответа не приходит ничего? Статус ответа 201
- может, все-таки, нужно как-то использовать переменную  response ?

Main message:
не дебажу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не дебажу

--

## My telegram message #160538
**Time:** 15.05.2022 22:11:38 UTC+05:00
**Link:** https://t.me/nest_ru/160538

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Почему сообщение удалилось?

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #160556
**Time:** 15.05.2022 23:44:46 UTC+05:00
**Link:** https://t.me/nest_ru/160556

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у меня тоже удалялось

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #160559
**Time:** 15.05.2022 23:51:08 UTC+05:00
**Link:** https://t.me/nest_ru/160559

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Понял, спасибо.
- у меня тоже удалялось
- /trust
- А если хочется сваггер юзать, то обязательно писать entities руками для  @ApiResponse .type? Или есть какая-то либа для автоматизации этого процесса? Просто не хотелось бы дублировать код

Main message:
есть плагин там

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть плагин там

--

## My telegram message #160561
**Time:** 15.05.2022 23:51:32 UTC+05:00
**Link:** https://t.me/nest_ru/160561

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- /trust
- А если хочется сваггер юзать, то обязательно писать entities руками для  @ApiResponse .type? Или есть какая-то либа для автоматизации этого процесса? Просто не хотелось бы дублировать код
- есть плагин там
- не подскажите, какой?)

Main message:
https://docs.nestjs.com/openapi/cli-plugin

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://docs.nestjs.com/openapi/cli-plugin

--

## My telegram message #160593
**Time:** 16.05.2022 11:57:54 UTC+05:00
**Link:** https://t.me/nest_ru/160593

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я хочу онли контроллеры иметь, без сервайсов но только вкатываюсь, и не знаю как это влияет на декоратор модуле

Main message:
ну и пиши все в контроллерах) никто не запрещает же, а сервис создавай когда нужно будет между двумя контроллерами одну и туже логику иметь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну и пиши все в контроллерах) никто не запрещает же, а сервис создавай когда нужно будет между двумя контроллерами одну и туже логику иметь

--

## My telegram message #160619
**Time:** 16.05.2022 14:11:04 UTC+05:00
**Link:** https://t.me/nest_ru/160619

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- когда нужно переиспользовать выношу в lib/** или в features/entities
- У нас там свои особенности. Думаю вам это на нужно. Мы локально не запускаем в докере. Но думаю, надо порт для дебага прокинь. Я не могу сказать какой.
- не затерялся ли линк у кого-нибудь на такой проект?
- А чем нестовая архитектура не нравится?

Main message:
мне кажется чувак из реакт просто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне кажется чувак из реакт просто

--

## My telegram message #160621
**Time:** 16.05.2022 14:12:39 UTC+05:00
**Link:** https://t.me/nest_ru/160621

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не затерялся ли линк у кого-нибудь на такой проект?
- А чем нестовая архитектура не нравится?
- мне кажется чувак из реакт просто
- я больше по фронту, но на беке использовал только экспресс хотелось бы что-то более разгруженнее по структуре

Main message:
в ангулар все также как и тут, только кода больше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в ангулар все также как и тут, только кода больше

--

## My telegram message #160628
**Time:** 16.05.2022 14:14:38 UTC+05:00
**Link:** https://t.me/nest_ru/160628

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- на беке?

Main message:
ну например 3 часа на бэк в несте, птом фронт 15 часов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну например 3 часа на бэк в несте, птом фронт 15 часов

--

## My telegram message #160637
**Time:** 16.05.2022 14:46:41 UTC+05:00
**Link:** https://t.me/nest_ru/160637

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а я соглашусь с мнением, что в доке неста хорошие примеры
- Просто они из другой вселенной. Чтобы их понимать, надо распечатать доки, свернуть в трубочку и скурить.
- возможно))
- Я бы поспорил, ну да ладно)

Main message:
еще есть  https://typegraphql.com/ если что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

еще есть  https://typegraphql.com/ если что

--

## My telegram message #160640
**Time:** 16.05.2022 14:49:24 UTC+05:00
**Link:** https://t.me/nest_ru/160640

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
диай там еще простой если что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

диай там еще простой если что

--

## My telegram message #160642
**Time:** 16.05.2022 14:51:32 UTC+05:00
**Link:** https://t.me/nest_ru/160642

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Просто экспресс дает фулл кастомизируемость это одновременно и плюс и минус, т.к приходится нужное прикручивать самому/через сторонние либы А в нестжс много нужного встроенно, но боюсь что это когда-то это ограничит разраба в действиях

Main message:
нест дает тебе время, тоесть ты не тратишь время на низкоуровневые и архитектурные решения, просто сразу начинаешь решать задачу, тож самое что в ангулар, и ограничений нет никаких

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нест дает тебе время, тоесть ты не тратишь время на низкоуровневые и архитектурные решения, просто сразу начинаешь решать задачу, тож самое что в ангулар, и ограничений нет никаких

--

## My telegram message #160644
**Time:** 16.05.2022 14:52:02 UTC+05:00
**Link:** https://t.me/nest_ru/160644

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- диай там еще простой если что
- подскажите пожалуйста, при иницилизации модуля я создаю файл и записываю в него ключи, однако в дист они не записываются, тк компиляци происходит позже, не могу понять как работать с файлами в рантайме?
- нест дает тебе время, тоесть ты не тратишь время на низкоуровневые и архитектурные решения, просто сразу начинаешь решать задачу, тож самое что в ангулар, и ограничений нет никаких
- что в ангуляре вместо реактовского редакса?

Main message:
ничего

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ничего

--

## My telegram message #160648
**Time:** 16.05.2022 14:55:10 UTC+05:00
**Link:** https://t.me/nest_ru/160648

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- подскажите пожалуйста, при иницилизации модуля я создаю файл и записываю в него ключи, однако в дист они не записываются, тк компиляци происходит позже, не могу понять как работать с файлами в рантайме?

Main message:
путь должен быть от корня проекта а не от исходников, проверь пути в дев режиме и сбилженном

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

путь должен быть от корня проекта а не от исходников, проверь пути в дев режиме и сбилженном

--

## My telegram message #160727
**Time:** 17.05.2022 00:09:18 UTC+05:00
**Link:** https://t.me/nest_ru/160727

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хорошая статья
- https://docs.nestjs.com/techniques/file-upload step one
- Главное не записывать картинки в 2 места: в базу. И внутрь контейнера (такое может случится в продакшине, если настроить сохранение рядом с беком по относительному пути)
- есть возможность передать провайдер в декоратор? Дело в том что я должен сделать запрос в базу данных и в casl метод can передать не тип класса а сам обьект, для проверки выполнения условия.

Main message:
class ManagerService { static instance:ManagerService; constructor(){ ManagerService.instance=this; } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

class ManagerService { static instance:ManagerService; constructor(){ ManagerService.instance=this; } }

--

## My telegram message #160735
**Time:** 17.05.2022 08:14:30 UTC+05:00
**Link:** https://t.me/nest_ru/160735

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Скажите, а каким образом можно добавить перехватчик для HttpService, если нужно на каждый запрос сделанный HttpService специальный хедер выставлять? Хедер для разных запросов разный. По сути хочется как-то к axios подлезть и выставлять через него заголовки

Main message:
https://axios-http.com/docs/interceptors

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://axios-http.com/docs/interceptors

--

## My telegram message #160750
**Time:** 17.05.2022 14:28:39 UTC+05:00
**Link:** https://t.me/nest_ru/160750

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- угу, уже увидел. Возникает вопрос: если это действие выполняется на каждый вопрос, насколько это просаживает производительность? или предполагается, что это вообще не сказывается?

Main message:
Это вызов функции так то, не сильно просадит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это вызов функции так то, не сильно просадит

--

## My telegram message #160752
**Time:** 17.05.2022 14:39:40 UTC+05:00
**Link:** https://t.me/nest_ru/160752

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- угу, уже увидел. Возникает вопрос: если это действие выполняется на каждый вопрос, насколько это просаживает производительность? или предполагается, что это вообще не сказывается?
- Всем привет, подскажите почему может не работать валидатор  @IsOptional () ? Когда я делаю put запрос , то одно из значений может быть undefined. Если не ubdefined, то идёт валидация дальше  @IsUrl ()
- Это вызов функции так то, не сильно просадит
- Ребята, какие подводные камни могут быть у автоматического перезапуска приложения? Например произошла фатальная ошибка - и приложение рестартнулось само

Main message:
это нужно только когда у тебя есть логирование всего, например в графане loki

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это нужно только когда у тебя есть логирование всего, например в графане loki

--

## My telegram message #160755
**Time:** 17.05.2022 14:40:06 UTC+05:00
**Link:** https://t.me/nest_ru/160755

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это вызов функции так то, не сильно просадит
- Ребята, какие подводные камни могут быть у автоматического перезапуска приложения? Например произошла фатальная ошибка - и приложение рестартнулось само
- это нужно только когда у тебя есть логирование всего, например в графане loki
- это все есть

Main message:
ну тогда норм)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну тогда норм)

--

## My telegram message #160759
**Time:** 17.05.2022 14:42:36 UTC+05:00
**Link:** https://t.me/nest_ru/160759

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это нужно только когда у тебя есть логирование всего, например в графане loki
- это все есть
- ну тогда норм)
- у меня логируются даже репозитории)

Main message:
жизнь заставила сменить аву)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

жизнь заставила сменить аву)

--

## My telegram message #160761
**Time:** 17.05.2022 14:44:13 UTC+05:00
**Link:** https://t.me/nest_ru/160761

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну тогда норм)
- у меня логируются даже репозитории)
- жизнь заставила сменить аву)
- Вроде как чат просил, получается чат - это твоя жизнь?)

Main message:
ну чат помог обратить внимание на это)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну чат помог обратить внимание на это)

--

## My telegram message #160767
**Time:** 17.05.2022 15:30:51 UTC+05:00
**Link:** https://t.me/nest_ru/160767

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не совсем понял как демонизация ноды с логированием связаны, при крите в рантайме nodejs же в любом случае может инфу откинуть, у pm2 точно должен быть специальный пылесос логов с консоли на такой случай
- если без лого - то контекст ошибки будет таким FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
- Отбой, это я тупой(
- Мой девиз по жизни

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #160850
**Time:** 17.05.2022 20:25:16 UTC+05:00
**Link:** https://t.me/nest_ru/160850

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если у тебя DBA хороший, то можно сделать таблицу root_id ALL_CHILDRENS_id, но там всё равно надо индекс на root_id.
- подскажите, почему class-validator не хочет отрабатывать для загружаемого файла?
- потому что это так не работает
- Всем прив. А в нестжс существуют какие-то еще паттерны для typeorm, кроме как репозитория?

Main message:
https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper

--

## My telegram message #160853
**Time:** 17.05.2022 21:07:58 UTC+05:00
**Link:** https://t.me/nest_ru/160853

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- потому что это так не работает
- Всем прив. А в нестжс существуют какие-то еще паттерны для typeorm, кроме как репозитория?
- https://orkhan.gitbook.io/typeorm/docs/active-record-data-mapper
- а преимущественно используют дата маппер?

Main message:
aga

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

aga

--

## My telegram message #160857
**Time:** 17.05.2022 21:44:15 UTC+05:00
**Link:** https://t.me/nest_ru/160857

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- aga
- Указываю 2 параметром {fields: { files: 1 } } - ему пофигу
- А можно также dto указать на реквест? Чтобы возвращать лишь те поля, что мне нужно? Не нашел ничего по этому.
- Используйте  @Exlude ()

Main message:
@UseInterceptors (ClassSerializerInterceptor)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@UseInterceptors (ClassSerializerInterceptor)

--

## My telegram message #160861
**Time:** 17.05.2022 22:15:37 UTC+05:00
**Link:** https://t.me/nest_ru/160861

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Используйте  @Exlude ()
- @UseInterceptors (ClassSerializerInterceptor)
- И его можно глобально повесить
- Всем привет! Подскажите, плиз, если метод задекорирован @Get(":id"), контроллер  @Controller ('orderfiles'). То почему когда я делаю get:  http://domain.name/orderfiles/abrakadabra , у меня id андефинед. Как id туда передать?

Main message:
@Param

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@Param

--

## My telegram message #160867
**Time:** 17.05.2022 23:28:13 UTC+05:00
**Link:** https://t.me/nest_ru/160867

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @Param
- https://docs.nestjs.com/controllers#route-parameters
- Мерси)
- Решил не брать тот пакет, а сам написать простеньний фильтр.  export class GetConsumablesFilterQueryDto { @Transform(({ value }: { value: string }) => { if (!value.match(/\d+/g)) { return null; } return value.match(/\d+/g).map(Number) as number[]; }) @IsNumber({}, { each: true }) @IsOptional() public cars: number[]; @Transform(({ value }: { value: string }) => parseInt(value)) @IsNumber() @IsOptional() public take: number; @Transform(({ value }: { value: string }) => parseInt(value)) @IsNumber() @IsOptional() public skip: number; } async getConsumablesWthFilterQuery( getConsumablesFilterQueryDto: GetConsumablesFilterQueryDto, ): Promise<ConsumableEntity[]> { const { cars, skip, take } = getConsumablesFilterQueryDto; const consumables = await this.consumableRepository.find({ where: { ...(cars && { car: In(cars) }), }, take: take, skip: skip, }); return consumables; }  Вроде норм получилось? Какой нейминг используется для таких вещей подскажете? -  GetConsumablesFilterQueryDto придумать смог

Main message:
GetConsumablesFilterArgs так пишу) GetConsumablesFilterResponse Dto постфикс даю объектам сущностям то есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

GetConsumablesFilterArgs так пишу) GetConsumablesFilterResponse Dto постфикс даю объектам сущностям то есть

--

## My telegram message #160870
**Time:** 18.05.2022 00:21:39 UTC+05:00
**Link:** https://t.me/nest_ru/160870

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Решил не брать тот пакет, а сам написать простеньний фильтр.  export class GetConsumablesFilterQueryDto { @Transform(({ value }: { value: string }) => { if (!value.match(/\d+/g)) { return null; } return value.match(/\d+/g).map(Number) as number[]; }) @IsNumber({}, { each: true }) @IsOptional() public cars: number[]; @Transform(({ value }: { value: string }) => parseInt(value)) @IsNumber() @IsOptional() public take: number; @Transform(({ value }: { value: string }) => parseInt(value)) @IsNumber() @IsOptional() public skip: number; } async getConsumablesWthFilterQuery( getConsumablesFilterQueryDto: GetConsumablesFilterQueryDto, ): Promise<ConsumableEntity[]> { const { cars, skip, take } = getConsumablesFilterQueryDto; const consumables = await this.consumableRepository.find({ where: { ...(cars && { car: In(cars) }), }, take: take, skip: skip, }); return consumables; }  Вроде норм получилось? Какой нейминг используется для таких вещей подскажете? -  GetConsumablesFilterQueryDto придумать смог
- GetConsumablesFilterArgs так пишу) GetConsumablesFilterResponse Dto постфикс даю объектам сущностям то есть
- Добрый вечер, подскажите что за параметры транзакции? Использую typeorm-transactional-cls-hooked
- Всем прив. Можно линк на обсуждение, в котором обсужалось файлы внутри модуля example принято называть с префиксом example:  example.controller.ts example.service.ts а не обычно:  controller.ts service.ts

Main message:
по папкам не ходим, через шорт кад поиск по всем файлам

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по папкам не ходим, через шорт кад поиск по всем файлам

--

## My telegram message #160875
**Time:** 18.05.2022 00:23:05 UTC+05:00
**Link:** https://t.me/nest_ru/160875

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Добрый вечер, подскажите что за параметры транзакции? Использую typeorm-transactional-cls-hooked
- Всем прив. Можно линк на обсуждение, в котором обсужалось файлы внутри модуля example принято называть с префиксом example:  example.controller.ts example.service.ts а не обычно:  controller.ts service.ts
- по папкам не ходим, через шорт кад поиск по всем файлам
- как лучше делать upload image с валидацией через призму?

Main message:
лучше грузить файлы в минио

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше грузить файлы в минио

--

## My telegram message #160881
**Time:** 18.05.2022 00:27:28 UTC+05:00
**Link:** https://t.me/nest_ru/160881

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а через кебаб плохо будет?

Main message:
Ну это дефолт с ангулар сюда пришел

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну это дефолт с ангулар сюда пришел

--

