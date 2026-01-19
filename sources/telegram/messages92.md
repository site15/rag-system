## My telegram message #94557
**Time:** 25.02.2021 14:14:42 UTC+05:00
**Link:** https://t.me/nest_ru/94557

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ребят, а можно на разные эксепшены разные фильтры ставить? а то срабатывает на все подряд один и тот же фильтр
- В catch декоратор передай какой тебе эсепшен нужен
- спасибо!
- Привет, подскажите пожалуйста, в каких случаях нужно использовать  @Inject (), а в каких достаточно объявления провайдера в конструкторе класса?  @Injectable() export class ReferralsService { constructor( @Inject(PaymentsService) private readonly paymentsService: PaymentsService, private readonly userService: UserService ) { } }

Main message:
инжект, когда в провайдерах модуля нет сервиса и ты его добрасываешь через диай сверху

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

инжект, когда в провайдерах модуля нет сервиса и ты его добрасываешь через диай сверху

--

## My telegram message #94562
**Time:** 25.02.2021 15:51:02 UTC+05:00
**Link:** https://t.me/nest_ru/94562

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ребят, посоветуйте graphql клиент для nestjs? мне просто запросы делать и обрабатывать, а то в туториалах везде учат как серверную часть писать, а не запросы делать)

Main message:
пишу в плэйграунд запрос который нужен, сохраняю в файл, генерю из него сдк для ангулар, использую

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пишу в плэйграунд запрос который нужен, сохраняю в файл, генерю из него сдк для ангулар, использую

--

## My telegram message #94566
**Time:** 25.02.2021 15:55:17 UTC+05:00
**Link:** https://t.me/nest_ru/94566

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спасибо
- ребят, посоветуйте graphql клиент для nestjs? мне просто запросы делать и обрабатывать, а то в туториалах везде учат как серверную часть писать, а не запросы делать)
- пишу в плэйграунд запрос который нужен, сохраняю в файл, генерю из него сдк для ангулар, использую
- у меня все query уже написаны, типы из схемы сгенерировал. Мне просто транспорт нужен удобный, чтобы я не писал все через httpModule.

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #94614
**Time:** 25.02.2021 18:53:13 UTC+05:00
**Link:** https://t.me/nest_ru/94614

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Пишу сокеты на несте, пытаюсь в Guard-е получить название эвента, и на данный момент тщетно

Main message:
ушел в граф там проще все с вебсокетами

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ушел в граф там проще все с вебсокетами

--

## My telegram message #94625
**Time:** 25.02.2021 19:13:23 UTC+05:00
**Link:** https://t.me/nest_ru/94625

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Кафка это серьезный такой распределённый лог, который сложнее админить
- Скорее, nats - не лучшее про гарантию доставки)) Rabbitmq юзал, но он иногда задыхался от моих запросов, но я не юзал масштабирование
- А вот в кафке потерять что-то почти невозможно
- У меня вся логика будет завязана на микросервисах, поэтому гарантия доставки для меня очень важна, так же хочу использовать Pub/Sub (один микросервис подписывать на другой).

Main message:
Взял себе домой булл для очередей, и микросервисы на редис для мессадж патерн, декомпозирую так что нет прямых вызовов мс, тоесть не делаю тонны мс, а только когда надо, если будет прямой вызов возьму грпс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Взял себе домой булл для очередей, и микросервисы на редис для мессадж патерн, декомпозирую так что нет прямых вызовов мс, тоесть не делаю тонны мс, а только когда надо, если будет прямой вызов возьму грпс

--

## My telegram message #94630
**Time:** 25.02.2021 19:24:39 UTC+05:00
**Link:** https://t.me/nest_ru/94630

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Интересно, а вот подумал, на сколько изощренно будет использовать graphql для общения между микросервисами)

Main message:
Я так дела давно очень, не надо так делать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я так дела давно очень, не надо так делать

--

## My telegram message #94632
**Time:** 25.02.2021 19:25:04 UTC+05:00
**Link:** https://t.me/nest_ru/94632

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мне mqtt наоборот зашло лучше кролика с кафкой
- Интересно, а вот подумал, на сколько изощренно будет использовать graphql для общения между микросервисами)
- Я так дела давно очень, не надо так делать
- Какие подводные камни?

Main message:
Данных много, долго ходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Данных много, долго ходит

--

## My telegram message #94636
**Time:** 25.02.2021 19:27:15 UTC+05:00
**Link:** https://t.me/nest_ru/94636

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я так дела давно очень, не надо так делать
- Какие подводные камни?
- Данных много, долго ходит
- На сколько долго? Больше 2 секунд?

Main message:
Ну долго сериализация долгая у него еще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну долго сериализация долгая у него еще

--

## My telegram message #94638
**Time:** 25.02.2021 19:31:07 UTC+05:00
**Link:** https://t.me/nest_ru/94638

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Данных много, долго ходит
- На сколько долго? Больше 2 секунд?
- Ну долго сериализация долгая у него еще
- Это да, ладно, спасибо всем за советы, почитаю дополнительно, поизучаю

Main message:
Между мс чёткий контракт, там динамика графа не нужна, бинарного протокола строгого там достаточно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Между мс чёткий контракт, там динамика графа не нужна, бинарного протокола строгого там достаточно

--

## My telegram message #94642
**Time:** 25.02.2021 19:42:57 UTC+05:00
**Link:** https://t.me/nest_ru/94642

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Это просто за то что он включен в приложении, можно даже не вызывать никакие функции с транзакциями, производительность сразу падает.

Main message:
тыдыщь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тыдыщь

--

## My telegram message #94653
**Time:** 25.02.2021 20:01:03 UTC+05:00
**Link:** https://t.me/nest_ru/94653

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Сырым делал бы, если былибы критичны транзакции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сырым делал бы, если былибы критичны транзакции

--

## My telegram message #94657
**Time:** 25.02.2021 22:21:24 UTC+05:00
**Link:** https://t.me/nest_ru/94657

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Сырым делал бы, если былибы критичны транзакции
- Там можно в сервисеБ задать открытие новой транзакции обязательное. Это все перекочевало из Java Spring
- Да, я прочитал. Я просто своё мнение высказал)
- https://ultimatecourses.com/ebooks/nestjs-quickstart-guide

Main message:
Чуть не удалил, думал спам))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Чуть не удалил, думал спам))

--

## My telegram message #94706
**Time:** 26.02.2021 17:28:12 UTC+05:00
**Link:** https://t.me/nest_ru/94706

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет. Недавно пишу на nest. Такой вопрос - существует необходимость валидировать одно поле кастомно, заглядывая в бд. Где лучше по методологии неста распологать проверку. В кастомном пайпе или в контроллере через сервис?
- Я не скажу, что мое частное мнение соответствует полностью методологии неста, но. Валидация - проверка данных на соответствие формату. Проверка на дубликаты это уже бизнес логика и проверять ее надо в сервисном слое и лучше средсвами бд
- +, валидация на дубликаты это другое
- +1 Я бы тоже это запихивал в бизнес-логику и кидал исключение. Но есть такой момент, который лично мне не нравится. Если API должно возвращать список ошибок с полями в свойстве  errors (например), то не получится разом кидать и ошибки валидации и ту ошибку, что от сервиса приходит в виде исключения. То есть получится так, что сначала юзер исправляет ошибки валидации, потом сабмитит форму и видит, что у него в каком-то поле ещё ошибка (та, которую сервис вернул)

Main message:
Метод отдельный для этого поля сделай в контроллере и на фронте кастомный асинхронный валидатор используй или че там у тя на фронте, ввели, фокус ушел с поля и пошла проверка отдельно от основной проверки формы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Метод отдельный для этого поля сделай в контроллере и на фронте кастомный асинхронный валидатор используй или че там у тя на фронте, ввели, фокус ушел с поля и пошла проверка отдельно от основной проверки формы

--

## My telegram message #94708
**Time:** 26.02.2021 17:29:27 UTC+05:00
**Link:** https://t.me/nest_ru/94708

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- +, валидация на дубликаты это другое
- +1 Я бы тоже это запихивал в бизнес-логику и кидал исключение. Но есть такой момент, который лично мне не нравится. Если API должно возвращать список ошибок с полями в свойстве  errors (например), то не получится разом кидать и ошибки валидации и ту ошибку, что от сервиса приходит в виде исключения. То есть получится так, что сначала юзер исправляет ошибки валидации, потом сабмитит форму и видит, что у него в каком-то поле ещё ошибка (та, которую сервис вернул)
- Метод отдельный для этого поля сделай в контроллере и на фронте кастомный асинхронный валидатор используй или че там у тя на фронте, ввели, фокус ушел с поля и пошла проверка отдельно от основной проверки формы
- Тоже вариант

Main message:
Типовое же, всегда так делали

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Типовое же, всегда так делали

--

## My telegram message #94710
**Time:** 26.02.2021 17:41:11 UTC+05:00
**Link:** https://t.me/nest_ru/94710

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Метод отдельный для этого поля сделай в контроллере и на фронте кастомный асинхронный валидатор используй или че там у тя на фронте, ввели, фокус ушел с поля и пошла проверка отдельно от основной проверки формы
- Тоже вариант
- Типовое же, всегда так делали
- А потом ты создаёшь и получаешь рейс кондишен

Main message:
в базе тригер на эту проверку создать можно, чтобы наверняка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в базе тригер на эту проверку создать можно, чтобы наверняка

--

## My telegram message #94719
**Time:** 26.02.2021 18:31:35 UTC+05:00
**Link:** https://t.me/nest_ru/94719

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А потом ты создаёшь и получаешь рейс кондишен
- в базе тригер на эту проверку создать можно, чтобы наверняка
- привет, а кто покупал официальный курс по несту? они дают приложение с возможностью закачки видео? есть плюсы по сравнению с курсами на юдеми и ютубе? кроме финансовой поддержки автора фреймворка?
- Привет, подскажите, есть несколько обектов typeorm (entity), для них есть универсальный метод, подскажите как в этом методе обозначить тип E (E - class extends BaseEntity)?

Main message:
<T extends BaseEntity>

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

<T extends BaseEntity>

--

## My telegram message #94722
**Time:** 26.02.2021 18:33:30 UTC+05:00
**Link:** https://t.me/nest_ru/94722

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- и E: T?

Main message:
yes

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

yes

--

## My telegram message #94725
**Time:** 26.02.2021 18:34:47 UTC+05:00
**Link:** https://t.me/nest_ru/94725

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Пробовал, тогда ругается на findOne

Main message:
ну он там должен быть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну он там должен быть

--

## My telegram message #94731
**Time:** 26.02.2021 18:37:08 UTC+05:00
**Link:** https://t.me/nest_ru/94731

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как ты ставишь nest и дай скрин ошибки
- ну он там должен быть
- Уточню, я в select передаю не new A(), а непосредственно A
- это ошибка в любом файле когда заходишь в него

Main message:
я тебе ответил на твой вопрос, по новому вопросу нужен скрин, я не могу читать с удаленного экрана

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тебе ответил на твой вопрос, по новому вопросу нужен скрин, я не могу читать с удаленного экрана

--

## My telegram message #94742
**Time:** 26.02.2021 18:51:06 UTC+05:00
**Link:** https://t.me/nest_ru/94742

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
потомучто метод не в классе, это статический метод класса, а не внутренний

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

потомучто метод не в классе, это статический метод класса, а не внутренний

--

## My telegram message #94780
**Time:** 26.02.2021 20:40:22 UTC+05:00
**Link:** https://t.me/nest_ru/94780

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- app.setGlobalPrefix("api");
- Ого, благодарю
- в 8 версии будет нормальное версионирование :)
- Как зарегистрировать провайдер через moduleRef?  @KaufmanEndy особенно к тебе вопрос))

Main message:
oO не знаю, против этой штуки, нигде не юзаю)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

oO не знаю, против этой штуки, нигде не юзаю)

--

## My telegram message #94782
**Time:** 26.02.2021 21:16:11 UTC+05:00
**Link:** https://t.me/nest_ru/94782

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в 8 версии будет нормальное версионирование :)
- Как зарегистрировать провайдер через moduleRef?  @KaufmanEndy особенно к тебе вопрос))
- oO не знаю, против этой штуки, нигде не юзаю)
- У меня есть транзиент сервис, который инстанцируется в множестве экземпляров (своеобразные воркеры). И каждому экземпляру надо передать id задачи

Main message:
а зачем ты их в диай неста пихаешь? эти твои сервисы юзают сервисы из неста чтоли? и типа разное колличество может быть?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а зачем ты их в диай неста пихаешь? эти твои сервисы юзают сервисы из неста чтоли? и типа разное колличество может быть?

--

## My telegram message #94786
**Time:** 26.02.2021 22:46:57 UTC+05:00
**Link:** https://t.me/nest_ru/94786

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- oO не знаю, против этой штуки, нигде не юзаю)
- У меня есть транзиент сервис, который инстанцируется в множестве экземпляров (своеобразные воркеры). И каждому экземпляру надо передать id задачи
- а зачем ты их в диай неста пихаешь? эти твои сервисы юзают сервисы из неста чтоли? и типа разное колличество может быть?
- Ребят, кто работал с Casl? не могу добиться того же как в примере, если имя класса без new и данных, то policies не работает =\ ЧЯДНТ?

Main message:
Неа) какой-то оверхед

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Неа) какой-то оверхед

--

## My telegram message #94789
**Time:** 26.02.2021 23:16:58 UTC+05:00
**Link:** https://t.me/nest_ru/94789

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У меня есть транзиент сервис, который инстанцируется в множестве экземпляров (своеобразные воркеры). И каждому экземпляру надо передать id задачи
- а зачем ты их в диай неста пихаешь? эти твои сервисы юзают сервисы из неста чтоли? и типа разное колличество может быть?
- Ребят, кто работал с Casl? не могу добиться того же как в примере, если имя класса без new и данных, то policies не работает =\ ЧЯДНТ?
- Неа) какой-то оверхед

Main message:
@zzzMoti это успех)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@zzzMoti это успех)

--

## My telegram message #94791
**Time:** 26.02.2021 23:18:38 UTC+05:00
**Link:** https://t.me/nest_ru/94791

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят, кто работал с Casl? не могу добиться того же как в примере, если имя класса без new и данных, то policies не работает =\ ЧЯДНТ?
- Неа) какой-то оверхед
- @zzzMoti это успех)
- Та да ) просто с ним общался сегодня, он стар поставил и твитнул

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #94793
**Time:** 26.02.2021 23:24:53 UTC+05:00
**Link:** https://t.me/nest_ru/94793

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @zzzMoti это успех)
- Та да ) просто с ним общался сегодня, он стар поставил и твитнул
- )
- Я могу использовать и graphql резолверы и rest контроллеры в проекте nestjs?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #94806
**Time:** 27.02.2021 00:17:25 UTC+05:00
**Link:** https://t.me/nest_ru/94806

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
до rxjs это был единственный способ поймать ошибки тайп орм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

до rxjs это был единственный способ поймать ошибки тайп орм

--

## My telegram message #94812
**Time:** 27.02.2021 00:18:56 UTC+05:00
**Link:** https://t.me/nest_ru/94812

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ??

Main message:
unhandled promise если чет не так пойдет внутри тайп орм, ошибка никуда не улетает выше, просто ничего не показывается и метод при этом отвалился, сейчас у меня rxjs везде и нет тайп орм, так что таких трайкатч больше не пишу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

unhandled promise если чет не так пойдет внутри тайп орм, ошибка никуда не улетает выше, просто ничего не показывается и метод при этом отвалился, сейчас у меня rxjs везде и нет тайп орм, так что таких трайкатч больше не пишу

--

## My telegram message #94822
**Time:** 27.02.2021 02:02:04 UTC+05:00
**Link:** https://t.me/nest_ru/94822

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребят, не ткнете носом в доку, нужно сделать  reletion который может ссылаться на несколько сущностей в зависимости от данных  parent записи , понимаю что можно просто хранить строку и при необходимости обрабатывать JOIN и find так как необ-одимо, но было бы неплохо решить возможностями фреймворка. Никто не сталкивался с такой задачей?

Main message:
так нельзя сделать, убери тайп орм и иде в сторонку, открой датагрип и сделай таблицы для своих данных, когда получится чет более или менее похожее, заполни таблицы данными,потом попробуй написать sql запрос и выбрать данные которые тебе нужны, если не выйдет, то перепроектируй таблицы, и так до тех пор пока не сможешь получить то что тебе надо, после этого можешь открыть иде и создать сущности и замапать их на то что в базе перебором по идее можно написать, даже обезьяна сможет, просто времени много уйдет, лучше понять что такое данные и как они хранятся в твоей базе данных

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так нельзя сделать, убери тайп орм и иде в сторонку, открой датагрип и сделай таблицы для своих данных, когда получится чет более или менее похожее, заполни таблицы данными,потом попробуй написать sql запрос и выбрать данные которые тебе нужны, если не выйдет, то перепроектируй таблицы, и так до тех пор пока не сможешь получить то что тебе надо, после этого можешь открыть иде и создать сущности и замапать их на то что в базе перебором по идее можно написать, даже обезьяна сможет, просто времени много уйдет, лучше понять что такое данные и как они хранятся в твоей базе данных

--

## My telegram message #94824
**Time:** 27.02.2021 02:03:28 UTC+05:00
**Link:** https://t.me/nest_ru/94824

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Какого фреймворка? ORM не является частью NestJS, если речь об этом. Я бы на твоём месте сперва спроектировал таблицы в БД (на бумаге, или в редакторе каком-нибудь), а потом на основании этого Entity набросал. Обычно так это и делается.

Main message:
ты меня чуть было не обогнал))) хорошо что я решил сперва ответить потом курить пойти) а не на оборот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты меня чуть было не обогнал))) хорошо что я решил сперва ответить потом курить пойти) а не на оборот

--

## My telegram message #94827
**Time:** 27.02.2021 02:08:56 UTC+05:00
**Link:** https://t.me/nest_ru/94827

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так нельзя сделать, убери тайп орм и иде в сторонку, открой датагрип и сделай таблицы для своих данных, когда получится чет более или менее похожее, заполни таблицы данными,потом попробуй написать sql запрос и выбрать данные которые тебе нужны, если не выйдет, то перепроектируй таблицы, и так до тех пор пока не сможешь получить то что тебе надо, после этого можешь открыть иде и создать сущности и замапать их на то что в базе перебором по идее можно написать, даже обезьяна сможет, просто времени много уйдет, лучше понять что такое данные и как они хранятся в твоей базе данных
- Какого фреймворка? ORM не является частью NestJS, если речь об этом. Я бы на твоём месте сперва спроектировал таблицы в БД (на бумаге, или в редакторе каком-нибудь), а потом на основании этого Entity набросал. Обычно так это и делается.
- ты меня чуть было не обогнал))) хорошо что я решил сперва ответить потом курить пойти) а не на оборот
- Мог и обогнать, если б меня не отвлекли)))

Main message:
орм это хорошо и не нужно парится писать сырые запросы я всегда за орм, но без знания sql в орм лучше не суваться вторую часть иногда забываю людям говорить, так как всегда думаю - если пошел в бэк, то sql знаешь полюбому

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

орм это хорошо и не нужно парится писать сырые запросы я всегда за орм, но без знания sql в орм лучше не суваться вторую часть иногда забываю людям говорить, так как всегда думаю - если пошел в бэк, то sql знаешь полюбому

--

## My telegram message #94836
**Time:** 27.02.2021 02:23:12 UTC+05:00
**Link:** https://t.me/nest_ru/94836

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а посоветуйте пожалуйста какой-то краш-курс по SQL

Main message:
тупа давно программирую)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тупа давно программирую)

--

## My telegram message #94866
**Time:** 27.02.2021 16:31:42 UTC+05:00
**Link:** https://t.me/nest_ru/94866

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Кстати, а в чем преимущества использования RxJs в связке с nest, почему просто не использовать async, await?

Main message:
раньше думал что оно только во фронте удобнов, когда у тя куча разных евентов летит и нужно запускать то се 5ой десятое и гдето чет перезапускать, птом на несте попробовал и понял что тут тоже с ним гораздо проще, не знаю как описать) это просто нужно попробовать и больше уже от этого не уйдешь, асинк авайт сейчас использую в тестах и консольных мини прогах

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

раньше думал что оно только во фронте удобнов, когда у тя куча разных евентов летит и нужно запускать то се 5ой десятое и гдето чет перезапускать, птом на несте попробовал и понял что тут тоже с ним гораздо проще, не знаю как описать) это просто нужно попробовать и больше уже от этого не уйдешь, асинк авайт сейчас использую в тестах и консольных мини прогах

--

## My telegram message #94868
**Time:** 27.02.2021 17:16:36 UTC+05:00
**Link:** https://t.me/nest_ru/94868

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @KaufmanEndy писал что-то насчёт удобства обработки ошибок в случае с Rxjs
- Пока не увидел, ошибки же надо так же перехватывать)
- раньше думал что оно только во фронте удобнов, когда у тя куча разных евентов летит и нужно запускать то се 5ой десятое и гдето чет перезапускать, птом на несте попробовал и понял что тут тоже с ним гораздо проще, не знаю как описать) это просто нужно попробовать и больше уже от этого не уйдешь, асинк авайт сейчас использую в тестах и консольных мини прогах
- Короче, это прочто удобно, да?

Main message:
да это как пересесть с рест на граф, как то меньше кода пишешь и не паришся по всякой чепухе, для решения кучи разных задач при которых в асинк авайт городим тонны кода, в rxjs есть лаконичные решения в пару строк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да это как пересесть с рест на граф, как то меньше кода пишешь и не паришся по всякой чепухе, для решения кучи разных задач при которых в асинк авайт городим тонны кода, в rxjs есть лаконичные решения в пару строк

--

## My telegram message #94872
**Time:** 27.02.2021 17:25:14 UTC+05:00
**Link:** https://t.me/nest_ru/94872

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- раньше думал что оно только во фронте удобнов, когда у тя куча разных евентов летит и нужно запускать то се 5ой десятое и гдето чет перезапускать, птом на несте попробовал и понял что тут тоже с ним гораздо проще, не знаю как описать) это просто нужно попробовать и больше уже от этого не уйдешь, асинк авайт сейчас использую в тестах и консольных мини прогах
- Короче, это прочто удобно, да?
- да это как пересесть с рест на граф, как то меньше кода пишешь и не паришся по всякой чепухе, для решения кучи разных задач при которых в асинк авайт городим тонны кода, в rxjs есть лаконичные решения в пару строк
- Ильшат, а можно репу example с тестами rxjs? какой подход посоветуешь? слышал про rxjs marbles, слишком уж экзотично =\

Main message:
марбел там именно когда с потоками сильно работаешь, это прям для фанатов rxjs, думаю у нас в России таких нет) в тестах делаю так как в самом фрейме советуют и у них на гихаб примеры есть, такой прям репы откуда брать не находил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

марбел там именно когда с потоками сильно работаешь, это прям для фанатов rxjs, думаю у нас в России таких нет) в тестах делаю так как в самом фрейме советуют и у них на гихаб примеры есть, такой прям репы откуда брать не находил

--

## My telegram message #94876
**Time:** 27.02.2021 17:40:24 UTC+05:00
**Link:** https://t.me/nest_ru/94876

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ильшат, а можно репу example с тестами rxjs? какой подход посоветуешь? слышал про rxjs marbles, слишком уж экзотично =\
- марбел там именно когда с потоками сильно работаешь, это прям для фанатов rxjs, думаю у нас в России таких нет) в тестах делаю так как в самом фрейме советуют и у них на гихаб примеры есть, такой прям репы откуда брать не находил
- я вот пытаюсь найти чтото дельное с  https://github.com/nestjs/nest/tree/master/sample не могу найти с тестами rxj
- Кто-нибудь использовал  zapatos вместо orm'мок ? Как ощущения?

Main message:
ну у меня в основном промисы в тестах, так как юниты же, но когда цепочки вызовов и чет нужно обработать то это все делаю на rx и птом в промис конверчу )) .toPromise() блок пайпа когда например в 200 строк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну у меня в основном промисы в тестах, так как юниты же, но когда цепочки вызовов и чет нужно обработать то это все делаю на rx и птом в промис конверчу )) .toPromise() блок пайпа когда например в 200 строк

--

## My telegram message #94946
**Time:** 28.02.2021 13:39:11 UTC+05:00
**Link:** https://t.me/nest_ru/94946

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Кто нибудь знает как примерно сделать как у nestjs компиляция ts и nodemon в одной консоли ? yarn dev типо

Main message:
https://github.com/EndyKaufman/nest-permissions-seed/blob/master/nodemon.json  "start:watch": "nodemon",

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/EndyKaufman/nest-permissions-seed/blob/master/nodemon.json  "start:watch": "nodemon",

--

## My telegram message #94948
**Time:** 28.02.2021 14:00:17 UTC+05:00
**Link:** https://t.me/nest_ru/94948

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Кто нибудь знает как примерно сделать как у nestjs компиляция ts и nodemon в одной консоли ? yarn dev типо
- concurrently должен помочь, вроде
- https://github.com/EndyKaufman/nest-permissions-seed/blob/master/nodemon.json  "start:watch": "nodemon",
- спасибо, помогло

Main message:
на nx ща сижу через него все запускаю и собираю, и ноду и нест,и ангулар и реакт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на nx ща сижу через него все запускаю и собираю, и ноду и нест,и ангулар и реакт

--

## My telegram message #94952
**Time:** 28.02.2021 14:13:25 UTC+05:00
**Link:** https://t.me/nest_ru/94952

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://github.com/EndyKaufman/nest-permissions-seed/blob/master/nodemon.json  "start:watch": "nodemon",
- спасибо, помогло
- на nx ща сижу через него все запускаю и собираю, и ноду и нест,и ангулар и реакт
- это что, типо продвинутая cli/пакетный менеджер ?

Main message:
nrwl nx для работы с монорепами, ну там много всего из коробки, сайт можешь пойти почитать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

nrwl nx для работы с монорепами, ну там много всего из коробки, сайт можешь пойти почитать

--

## My telegram message #94986
**Time:** 28.02.2021 20:38:27 UTC+05:00
**Link:** https://t.me/nest_ru/94986

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- хм, ну ладно, буду тогда свою ормку и билдер писать. Своё хоть роднее.

Main message:
можно призму2 натравить на готовую постгрее и получить сдк для работы с базой, для круда нормально, для сложных запросов сырые запросы можно писать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно призму2 натравить на готовую постгрее и получить сдк для работы с базой, для круда нормально, для сложных запросов сырые запросы можно писать

--

## My telegram message #95012
**Time:** 28.02.2021 23:11:41 UTC+05:00
**Link:** https://t.me/nest_ru/95012

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy Привет, скажи плиз, как вы решали вопрос с boolean значениями, а именно, как отправить запрос с false ?

Main message:
класс трансформ если ундефайнд конвертит в false

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

класс трансформ если ундефайнд конвертит в false

--

## My telegram message #95014
**Time:** 28.02.2021 23:12:32 UTC+05:00
**Link:** https://t.me/nest_ru/95014

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- rest ?
- gRPC
- класс трансформ если ундефайнд конвертит в false
- А если его там реально нету ?

Main message:
не бывает такого

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не бывает такого

--

## My telegram message #95019
**Time:** 28.02.2021 23:13:47 UTC+05:00
**Link:** https://t.me/nest_ru/95019

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
все верно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все верно

--

## My telegram message #95021
**Time:** 28.02.2021 23:14:24 UTC+05:00
**Link:** https://t.me/nest_ru/95021

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так стой, если указать request.setActive(false), то поле active вообще не полетит в запросе.

Main message:
ага, ну говорю же класс трансформ его в фальш конвертнет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, ну говорю же класс трансформ его в фальш конвертнет

--

## My telegram message #95024
**Time:** 28.02.2021 23:16:53 UTC+05:00
**Link:** https://t.me/nest_ru/95024

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все верно
- Спасибо!
- ага, ну говорю же класс трансформ его в фальш конвертнет
- Это я понял, теперь представим что у нас есть запрос в котором вообще нету "active" поля, получается что мы получим {...data, ...{active: false}}. Я же правильно понимаю ? То есть если его реально нету, то мы его создадим, что не всегда нужно.

Main message:
в грпс все поля какбудто обязательные, там нет опшиналов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в грпс все поля какбудто обязательные, там нет опшиналов

--

## My telegram message #95030
**Time:** 28.02.2021 23:19:05 UTC+05:00
**Link:** https://t.me/nest_ru/95030

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ага, ну говорю же класс трансформ его в фальш конвертнет
- Это я понял, теперь представим что у нас есть запрос в котором вообще нету "active" поля, получается что мы получим {...data, ...{active: false}}. Я же правильно понимаю ? То есть если его реально нету, то мы его создадим, что не всегда нужно.
- в грпс все поля какбудто обязательные, там нет опшиналов
- На этом я уже попался блин ... Переделал все, потому что зараза не отсылал 0 :D

Main message:
у енам первое значение 0

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у енам первое значение 0

--

## My telegram message #95035
**Time:** 01.03.2021 00:10:41 UTC+05:00
**Link:** https://t.me/nest_ru/95035

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- На этом я уже попался блин ... Переделал все, потому что зараза не отсылал 0 :D
- у енам первое значение 0
- Так оно не отсылается, если указать enum: 0
- Поделись плиз, конфигом для реализаций такого, я походу устал уже ибо не получается заставить работать транформ этот

Main message:
дома не юзаю грпс, рабочий код шарить нельзя)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дома не юзаю грпс, рабочий код шарить нельзя)

--

## My telegram message #95042
**Time:** 01.03.2021 00:46:42 UTC+05:00
**Link:** https://t.me/nest_ru/95042

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- дома не юзаю грпс, рабочий код шарить нельзя)
- Подскажите пожалуйста, как апдейтить ManyToMany relation в TypeORM? Через сервис. Вот хотелось бы +/- что-то такое, но похоже придется как-то иначе расписывать?
- Я это делаю вручную - так надёжнее) Ну то есть в транзакции удаляю нужные связи и заново создаю
- В моих мыслях это как-то так могло бы выглядеть. Но в действительности - не работает? А как правильно я пока что не понял, кх. Был бы очень рад посмотреть какие-то листинги, если у кого-нибудь найдется)

Main message:
Где то тут есть дока про обновление мани ту мани  https://github.com/typeorm/typeorm/tree/master/docs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Где то тут есть дока про обновление мани ту мани  https://github.com/typeorm/typeorm/tree/master/docs

--

## My telegram message #95046
**Time:** 01.03.2021 00:50:18 UTC+05:00
**Link:** https://t.me/nest_ru/95046

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я это делаю вручную - так надёжнее) Ну то есть в транзакции удаляю нужные связи и заново создаю
- В моих мыслях это как-то так могло бы выглядеть. Но в действительности - не работает? А как правильно я пока что не понял, кх. Был бы очень рад посмотреть какие-то листинги, если у кого-нибудь найдется)
- Где то тут есть дока про обновление мани ту мани  https://github.com/typeorm/typeorm/tree/master/docs
- Благодарю! Вообще, возможно это правда работает. Но я примерно такое накидал. Да, это должно работать. В примере ManyToMany как-то так это указано: question.categories = [category1, category2];

Main message:
есть еще типа мердж, нужно поискать гдет было

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть еще типа мердж, нужно поискать гдет было

--

## My telegram message #95048
**Time:** 01.03.2021 00:54:56 UTC+05:00
**Link:** https://t.me/nest_ru/95048

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Где то тут есть дока про обновление мани ту мани  https://github.com/typeorm/typeorm/tree/master/docs
- Благодарю! Вообще, возможно это правда работает. Но я примерно такое накидал. Да, это должно работать. В примере ManyToMany как-то так это указано: question.categories = [category1, category2];
- есть еще типа мердж, нужно поискать гдет было
- Спасибо большое. Оказалось все не так страшно c':

Main message:
ммм, следи за ид у мани ту мани связей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ммм, следи за ид у мани ту мани связей

--

## My telegram message #95051
**Time:** 01.03.2021 01:19:29 UTC+05:00
**Link:** https://t.me/nest_ru/95051

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- есть еще типа мердж, нужно поискать гдет было
- Спасибо большое. Оказалось все не так страшно c':
- ммм, следи за ид у мани ту мани связей
- А в чем может возникнуть конфликт?

Main message:
у тя несколько раз связб может перепривязатся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя несколько раз связб может перепривязатся

--

## My telegram message #95053
**Time:** 01.03.2021 01:20:15 UTC+05:00
**Link:** https://t.me/nest_ru/95053

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ммм, следи за ид у мани ту мани связей
- А в чем может возникнуть конфликт?
- у тя несколько раз связб может перепривязатся
- Ох. А они при замене не очищаются?

Main message:
вот и проверь этот момент и следи за ид

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот и проверь этот момент и следи за ид

--

## My telegram message #95136
**Time:** 01.03.2021 17:49:11 UTC+05:00
**Link:** https://t.me/nest_ru/95136

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Хай всем. Может кто подсказать как в декоратор  @MinDate (date) передать динамический date ?

Main message:
https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va

--

## My telegram message #95141
**Time:** 01.03.2021 20:45:16 UTC+05:00
**Link:** https://t.me/nest_ru/95141

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хай всем. Может кто подсказать как в декоратор  @MinDate (date) передать динамический date ?
- https://stackoverflow.com/questions/60062318/how-to-inject-service-to-validator-constraint-interface-in-nestjs-using-class-va
- благодарю!
- @KaufmanEndy привет, слушай а какая версия прото у вас ? Получается что у proto3 нету вообще обязательных полей, у него все идет как optional.

Main message:
у меня эта

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня эта

--

## My telegram message #95143
**Time:** 01.03.2021 20:45:58 UTC+05:00
**Link:** https://t.me/nest_ru/95143

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- благодарю!
- @KaufmanEndy привет, слушай а какая версия прото у вас ? Получается что у proto3 нету вообще обязательных полей, у него все идет как optional.
- у меня эта
- Это не то, я про сам *.proto

Main message:
3 вроде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

3 вроде

--

## My telegram message #95146
**Time:** 01.03.2021 20:53:47 UTC+05:00
**Link:** https://t.me/nest_ru/95146

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня эта
- Это не то, я про сам *.proto
- 3 вроде
- Воообще тогда не понятно как вы достали из него поле которые не указали, ибо они вообще не идут через сеть. Весь иннет про это говорит в мире gRPC

Main message:
ну и пусть не идут через сеть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну и пусть не идут через сеть

--

## My telegram message #95239
**Time:** 02.03.2021 16:19:59 UTC+05:00
**Link:** https://t.me/nest_ru/95239

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- есть работенка на несте?

Main message:
https://t.me/javascript_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/javascript_jobs

--

## My telegram message #95250
**Time:** 02.03.2021 16:57:51 UTC+05:00
**Link:** https://t.me/nest_ru/95250

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет всем. Подскажите пожалуйста такую инфу. У нас в проекте есть несколько сервисов которые используют одинаковые интерцепторы, в итоге мы решили вынести эти интерцепторы в отдельный пакет. Внутри интерцептора кидается HttpExcetion. В чем проблема: когда интерцептор лежит локально, то он правильно отрабатывает и кидает нужный HttpException(400), а вот когда его же подключаешь через внешнюю зависимость - все валится и прилетает в ответ 500. При том что сам интерцептор отрабатывает. Дебаг показал что проблема возникает при отработке внутреннего BaseExceptionFilter в Nest-е. А именно когда Nest пытается выполнить строку  exception instanceof common_1.HttpException Хоть оба (текущий сервис и внешний пакет) используют Nest одинаковой версии и импортят одинаковый HttpException но instanceof не понимает что это одинаковый класс. Собственно вопрос - как правильно разрулить подобную ситуацию?

Main message:
вынеси сервис который юзаешь в интерцпеторе в пакет, и интерцпеторов лучше много не делать лучше в одном месте подрубить все бизнес обработчики ципочкой, тоесть интерцептор один на все приложение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вынеси сервис который юзаешь в интерцпеторе в пакет, и интерцпеторов лучше много не делать лучше в одном месте подрубить все бизнес обработчики ципочкой, тоесть интерцептор один на все приложение

--

## My telegram message #95257
**Time:** 02.03.2021 17:03:21 UTC+05:00
**Link:** https://t.me/nest_ru/95257

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет всем. Подскажите пожалуйста такую инфу. У нас в проекте есть несколько сервисов которые используют одинаковые интерцепторы, в итоге мы решили вынести эти интерцепторы в отдельный пакет. Внутри интерцептора кидается HttpExcetion. В чем проблема: когда интерцептор лежит локально, то он правильно отрабатывает и кидает нужный HttpException(400), а вот когда его же подключаешь через внешнюю зависимость - все валится и прилетает в ответ 500. При том что сам интерцептор отрабатывает. Дебаг показал что проблема возникает при отработке внутреннего BaseExceptionFilter в Nest-е. А именно когда Nest пытается выполнить строку  exception instanceof common_1.HttpException Хоть оба (текущий сервис и внешний пакет) используют Nest одинаковой версии и импортят одинаковый HttpException но instanceof не понимает что это одинаковый класс. Собственно вопрос - как правильно разрулить подобную ситуацию?
- Практически наверняка проблема в том, что HttpException внутри пакета, где у вас интерцепторы и снаружи (где exception-фильры) импортируются из разных папочек в node_modules
- вынеси сервис который юзаешь в интерцпеторе в пакет, и интерцпеторов лучше много не делать лучше в одном месте подрубить все бизнес обработчики ципочкой, тоесть интерцептор один на все приложение
- в монорепе тоже может быть такое

Main message:
ну лерну вообще нельзя юзать) это старое же из времен ембера и жеквери

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну лерну вообще нельзя юзать) это старое же из времен ембера и жеквери

--

## My telegram message #95260
**Time:** 02.03.2021 17:09:51 UTC+05:00
**Link:** https://t.me/nest_ru/95260

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в монорепе тоже может быть такое
- ну лерну вообще нельзя юзать) это старое же из времен ембера и жеквери
- я тоже смотрю в сторону NX, но только потому, что у лерны с поддержкой плохо совсем.. так-то сам инструмент вполне
- Привет. Подскажите как можно использовать  ConfigService внутри класса с монго схемой? У меня такой кейс: В схеме есть виртуальный геттер  public get image() { return `${config.get("images.prefix")}/${this._id}.png`; }  Не понимаю как мне получить доступ к конфигу из своего класса.

Main message:
Синглтон ом его сделай в рамках всей ноды

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Синглтон ом его сделай в рамках всей ноды

--

## My telegram message #95262
**Time:** 02.03.2021 17:10:19 UTC+05:00
**Link:** https://t.me/nest_ru/95262

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я тоже смотрю в сторону NX, но только потому, что у лерны с поддержкой плохо совсем.. так-то сам инструмент вполне
- Привет. Подскажите как можно использовать  ConfigService внутри класса с монго схемой? У меня такой кейс: В схеме есть виртуальный геттер  public get image() { return `${config.get("images.prefix")}/${this._id}.png`; }  Не понимаю как мне получить доступ к конфигу из своего класса.
- Синглтон ом его сделай в рамках всей ноды
- ++

Main message:
Нетока нест синглтон а вообще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нетока нест синглтон а вообще

--

## My telegram message #95265
**Time:** 02.03.2021 17:14:20 UTC+05:00
**Link:** https://t.me/nest_ru/95265

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Синглтон ом его сделай в рамках всей ноды
- ++
- Нетока нест синглтон а вообще
- Мне кажется, что в синглтон-конфигурации нет ничего плохого, т. к. она immutable

Main message:
Глобал это всегда значит ты чет делаешь не так, обычно используют когда времени мало, чтобы перепроектиррвать, но я и сам юзаю)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Глобал это всегда значит ты чет делаешь не так, обычно используют когда времени мало, чтобы перепроектиррвать, но я и сам юзаю)))

--

## My telegram message #95268
**Time:** 02.03.2021 18:31:32 UTC+05:00
**Link:** https://t.me/nest_ru/95268

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 4-5 дня борьбы, НЕпонимание логики и я поборол этот gRPC :D

Main message:
ты просто прогнуля под протокол, как и все) не мы имеем grpc а он нас)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты просто прогнуля под протокол, как и все) не мы имеем grpc а он нас)

--

## My telegram message #95275
**Time:** 02.03.2021 19:20:36 UTC+05:00
**Link:** https://t.me/nest_ru/95275

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Это точно

Main message:
кстати у призмы есть какойто генератор для грпс, пока не понял че это, ну как мне кажется, на основе базы оно создаст бэк на грпс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кстати у призмы есть какойто генератор для грпс, пока не понял че это, ну как мне кажется, на основе базы оно создаст бэк на грпс

--

## My telegram message #95277
**Time:** 02.03.2021 19:22:11 UTC+05:00
**Link:** https://t.me/nest_ru/95277

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можешь создать класс который экстендит репозиторий и его инжектить
- Спасибо! Пришёл к тому, что лучше создать сервис, который инжектит репозиторий и предоставляет методы для работы с ним
- кстати у призмы есть какойто генератор для грпс, пока не понял че это, ну как мне кажется, на основе базы оно создаст бэк на грпс
- Я тут как раз хотел тебе написать. Поставил я значит:  oneof active { bool is_active = 6; bool not_active = 7; }; и теперь с фронта отсылаю req.setIsActive(true); На что бэк выдает мол, RangeError: index out of range: 34 + 10 > 34 '. Инфы по поводу этого чет вообще не могу найти ....

Main message:
не юзаем это

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не юзаем это

--

