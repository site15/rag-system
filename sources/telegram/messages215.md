## My telegram message #233862
**Time:** 09.05.2023 11:23:15 UTC+05:00
**Link:** https://t.me/nest_ru/233862

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Потому что Request это , наверное, тип у вас.
- А как называется тогда конкретный класс а не тип? Он импортируется из express
- Нужно прокидывать сущность req. Скорее вы неправильно спроектировали классы.
- да не думаю. вот полный базовый класс export class Base { constructor(  @InjectModel (ReisModel) protected readonly reisRepository?: typeof ReisModel,  @InjectModel (UserModel) protected readonly userRepository?: typeof UserModel,  @InjectModel (BusModel) protected readonly busRepository?: typeof BusModel ) {} } вот полный наследуемый export class MyClass extends Base implements AggregatorInterface { constructor() { super(ReisModel, UserModel, BusModel) } мне нужно сделать аналогично, но чтобы объект реквеста был доступен в дочерних опционально

Main message:
Явно докидыва

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Явно докидыва

--

## My telegram message #233911
**Time:** 10.05.2023 00:29:57 UTC+05:00
**Link:** https://t.me/nest_ru/233911

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- привет всем подскажите более элегантное решение этого. в особенности когда id был удален и метод findOneBy возвращает null

Main message:
Много ошибок, ну раз скинул скрином, то явное это про интернал, пусть это глобальный фильтр делает, остальные правки ещё терпимо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Много ошибок, ну раз скинул скрином, то явное это про интернал, пусть это глобальный фильтр делает, остальные правки ещё терпимо

--

## My telegram message #233913
**Time:** 10.05.2023 00:38:59 UTC+05:00
**Link:** https://t.me/nest_ru/233913

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спасибо
- Это я тут нашел  https://www.youtube.com/watch?v=x1W3FJ1RJlM&t=2s
- Много ошибок, ну раз скинул скрином, то явное это про интернал, пусть это глобальный фильтр делает, остальные правки ещё терпимо
- Возможно ли реализовать функцию загрузки нескольких файлов и при этом если один файл выкидывает ошибку (например уже есть такой), то чтоб на фронте я смог понять какой именно файл вернулся с ошибкой? Или подобные вещи делаются на фронте, просто функция загрузки файла вызывается неск раз

Main message:
Лучше на фронте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Лучше на фронте

--

## My telegram message #234230
**Time:** 10.05.2023 11:49:04 UTC+05:00
**Link:** https://t.me/nest_ru/234230

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Актуально и правдиво ли это решение? На каком моменте вы выделяете сервисы и контроллеры в модуль? Как вы понимаете, что именно эти сервисы и контроллеры нужно поместить в модуль? А если почти не пользуетесь модулями, то как выглядит ваша файловая структура?

Main message:
У меня много модулей, просто я не импортирую их друг в друга

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня много модулей, просто я не импортирую их друг в друга

--

## My telegram message #234236
**Time:** 10.05.2023 11:56:35 UTC+05:00
**Link:** https://t.me/nest_ru/234236

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
или так без левых либ  https://github.com/i-link-pro-team/ilink/blob/master/libs/nestjs-consul-kv-realtime/src/lib/nestjs-consul-kv-realtime.module.ts или так через левую либу  https://github.com/EndyKaufman/nestjs-custom-injector  @CustomInject(API_OPTIONS) private apiOptions!: ApiOptions;

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

или так без левых либ  https://github.com/i-link-pro-team/ilink/blob/master/libs/nestjs-consul-kv-realtime/src/lib/nestjs-consul-kv-realtime.module.ts или так через левую либу  https://github.com/EndyKaufman/nestjs-custom-injector  @CustomInject(API_OPTIONS) private apiOptions!: ApiOptions;

--

## My telegram message #234241
**Time:** 10.05.2023 12:21:18 UTC+05:00
**Link:** https://t.me/nest_ru/234241

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Сервис
- Почему?
- Потому что в энтити не должно быть бизнес логики
- А что подразумеваешь под "бизнес логикой", какого определение?

Main message:
пишем интеграционный тест для работы реги и там юзаем пароль как строку, тут нам не нужны лишние штуки которые аффектят пишем интеграционный тест для сервиса который умеет хэшить, чекаем правильно ли хэшит пишем интеграционный тест для проверки связи модуля реги и модуля хэшера пишем е2е для чека что рега работает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пишем интеграционный тест для работы реги и там юзаем пароль как строку, тут нам не нужны лишние штуки которые аффектят пишем интеграционный тест для сервиса который умеет хэшить, чекаем правильно ли хэшит пишем интеграционный тест для проверки связи модуля реги и модуля хэшера пишем е2е для чека что рега работает

--

## My telegram message #234245
**Time:** 10.05.2023 12:45:00 UTC+05:00
**Link:** https://t.me/nest_ru/234245

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Потому что в энтити не должно быть бизнес логики
- А что подразумеваешь под "бизнес логикой", какого определение?
- пишем интеграционный тест для работы реги и там юзаем пароль как строку, тут нам не нужны лишние штуки которые аффектят пишем интеграционный тест для сервиса который умеет хэшить, чекаем правильно ли хэшит пишем интеграционный тест для проверки связи модуля реги и модуля хэшера пишем е2е для чека что рега работает
- Не могу найти в доке, как с призмой подключиться к двум разным базам данных, подскажите как загуглить?

Main message:
Два клиента призмы нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Два клиента призмы нужно

--

## My telegram message #234266
**Time:** 10.05.2023 14:30:25 UTC+05:00
**Link:** https://t.me/nest_ru/234266

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как чекать правильно ли хешит? Верифом типо?

Main message:
да, хэшим через нест сервис, вериф уже в тесте используя тот же ключ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, хэшим через нест сервис, вериф уже в тесте используя тот же ключ

--

## My telegram message #234272
**Time:** 10.05.2023 16:35:13 UTC+05:00
**Link:** https://t.me/nest_ru/234272

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это IDE так импортирует. Скорее всего linter
- да, хэшим через нест сервис, вериф уже в тесте используя тот же ключ
- это самая частая бага вскода
- Добрый день! Подскажите, есть какое нибудь "эталонное" приложение на нест на гитхаб?

Main message:
Нету такого

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нету такого

--

## My telegram message #234355
**Time:** 10.05.2023 21:51:25 UTC+05:00
**Link:** https://t.me/nest_ru/234355

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет всем, есть люди которые пишут на NestJS/VueJS Заказ небольшой есть

Main message:
https://t.me/nestjs_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nestjs_jobs

--

## My telegram message #234496
**Time:** 11.05.2023 19:05:38 UTC+05:00
**Link:** https://t.me/nest_ru/234496

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- через какой-нибудь pipe takeUntil как в ангуляре? в ангуляре то с отписками проще, а вот тут для меня пока темный лес ссейчас кажется проще и вроде бы даже лучше сделать это завернув осервабл в промис и вернуть Async\await, ноне через toPromise а lastValueFrom

Main message:
в несте есть хуки onModuleDestroy тоже самое что в ануглар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в несте есть хуки onModuleDestroy тоже самое что в ануглар

--

## My telegram message #234498
**Time:** 11.05.2023 19:06:05 UTC+05:00
**Link:** https://t.me/nest_ru/234498

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- короче, тот Observable который тебе нужен, делаешь .subscribe() на конце - все, подписан на него. А при уничтожении класса надо уничтожить поток
- через какой-нибудь pipe takeUntil как в ангуляре? в ангуляре то с отписками проще, а вот тут для меня пока темный лес ссейчас кажется проще и вроде бы даже лучше сделать это завернув осервабл в промис и вернуть Async\await, ноне через toPromise а lastValueFrom
- в несте есть хуки onModuleDestroy тоже самое что в ануглар
- ща пример кину

Main message:
просто тут нету untilDestroyed поэтому нужно руками писать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто тут нету untilDestroyed поэтому нужно руками писать

--

## My telegram message #234501
**Time:** 11.05.2023 19:08:14 UTC+05:00
**Link:** https://t.me/nest_ru/234501

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- через какой-нибудь pipe takeUntil как в ангуляре? в ангуляре то с отписками проще, а вот тут для меня пока темный лес ссейчас кажется проще и вроде бы даже лучше сделать это завернув осервабл в промис и вернуть Async\await, ноне через toPromise а lastValueFrom
- в несте есть хуки onModuleDestroy тоже самое что в ануглар
- ща пример кину
- просто тут нету untilDestroyed поэтому нужно руками писать

Main message:
просто в несте нет выгрузки модулей тут все падает сразу)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто в несте нет выгрузки модулей тут все падает сразу)))

--

## My telegram message #234504
**Time:** 11.05.2023 19:09:01 UTC+05:00
**Link:** https://t.me/nest_ru/234504

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ща пример кину
- просто тут нету untilDestroyed поэтому нужно руками писать
- просто в несте нет выгрузки модулей тут все падает сразу)))
- во во)))

Main message:
чтобы память не жрало, в нест весь процесс дохнет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чтобы память не жрало, в нест весь процесс дохнет)

--

## My telegram message #234507
**Time:** 11.05.2023 19:10:26 UTC+05:00
**Link:** https://t.me/nest_ru/234507

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- кстати, можно же подписаться и делать отписку на complete

Main message:
это тоже самое что ту промис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это тоже самое что ту промис

--

## My telegram message #234511
**Time:** 11.05.2023 19:11:44 UTC+05:00
**Link:** https://t.me/nest_ru/234511

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а он так работает? не встречал такого подхода

Main message:
так делали очень давно) когда только rxjs в мире фронта начал появлятся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так делали очень давно) когда только rxjs в мире фронта начал появлятся

--

## My telegram message #234550
**Time:** 11.05.2023 21:30:36 UTC+05:00
**Link:** https://t.me/nest_ru/234550

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- blog@blog-api:~/current/api$ pm2 start ./dist/src/main.js --name=blog-api --wait-ready так тоже не сработало, находилась в директории проекта

Main message:
Локально через pm2 работает?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Локально через pm2 работает?

--

## My telegram message #234610
**Time:** 12.05.2023 00:32:19 UTC+05:00
**Link:** https://t.me/nest_ru/234610

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- don’t use nestjs’ cache module for redis

Main message:
Почему)?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Почему)?

--

## My telegram message #234612
**Time:** 12.05.2023 00:32:46 UTC+05:00
**Link:** https://t.me/nest_ru/234612

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- esModuleInterop: true мб
- don’t use nestjs’ cache module for redis
- Почему)?
- мб потому что диприкейт

Main message:
херасе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

херасе

--

## My telegram message #234615
**Time:** 12.05.2023 00:33:30 UTC+05:00
**Link:** https://t.me/nest_ru/234615

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да какой-то он кривой (как минимум его нельзя глобально зарегистрировать, нужно костылить свой), еще и кучу модулей надо ставить дополнительных для редиски

Main message:
спокойно глобал опция там втыкается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

спокойно глобал опция там втыкается

--

## My telegram message #234618
**Time:** 12.05.2023 00:34:12 UTC+05:00
**Link:** https://t.me/nest_ru/234618

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- херасе
- Да какой-то он кривой (как минимум его нельзя глобально зарегистрировать, нужно костылить свой), еще и кучу модулей надо ставить дополнительных для редиски
- спокойно глобал опция там втыкается
- Жесть, не знал, но я его последний раз использовал в 2021

Main message:
то чувство когда ненавидишь глобал и радуешся его работе в кэше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

то чувство когда ненавидишь глобал и радуешся его работе в кэше

--

## My telegram message #234620
**Time:** 12.05.2023 00:34:47 UTC+05:00
**Link:** https://t.me/nest_ru/234620

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спокойно глобал опция там втыкается
- Жесть, не знал, но я его последний раз использовал в 2021
- то чувство когда ненавидишь глобал и радуешся его работе в кэше
- Тупо удобнее использовать сторонние

Main message:
мне и оно норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне и оно норм

--

## My telegram message #234624
**Time:** 12.05.2023 00:37:45 UTC+05:00
**Link:** https://t.me/nest_ru/234624

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- то чувство когда ненавидишь глобал и радуешся его работе в кэше
- Тупо удобнее использовать сторонние
- мне и оно норм
- видели бы вы мой редис

Main message:
idi im pokazi  https://t.me/nodejs_ru

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

idi im pokazi  https://t.me/nodejs_ru

--

## My telegram message #234809
**Time:** 13.05.2023 09:04:08 UTC+05:00
**Link:** https://t.me/nest_ru/234809

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
У тебя наверное и в нгинкс ставится хедер и в приложении, убери в нгинкс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тебя наверное и в нгинкс ставится хедер и в приложении, убери в нгинкс

--

## My telegram message #234820
**Time:** 13.05.2023 09:19:30 UTC+05:00
**Link:** https://t.me/nest_ru/234820

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а если это планируется как опен рест апи не опасно разве так делать?

Main message:
Вписать надо правила в приложении с ИП адресами

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вписать надо правила в приложении с ИП адресами

--

## My telegram message #234824
**Time:** 13.05.2023 10:05:24 UTC+05:00
**Link:** https://t.me/nest_ru/234824

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 😌
- а если это планируется как опен рест апи не опасно разве так делать?
- Вписать надо правила в приложении с ИП адресами
- такой вопрос тогда ради любознательности. почему этой проблемы не было когда домены были разными? сейчас же домен один и тот же просто под рест я выделил доп домент третьего уровня

Main message:
Может домен третьего уровня менее надёжный чем второго

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Может домен третьего уровня менее надёжный чем второго

--

