## My telegram message #49787
**Time:** 28.01.2020 00:11:12 UTC+05:00
**Link:** https://t.me/nest_ru/49787

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну да, я понял, просто таким тоже не занимался и не могу подсказать) Вообще это надо экспрессу задавать вопросы, если охото разбираться почему так Но вон в ответах с SO другие варианты перечислены
- Эту статью я видел. Я впринципе делаю то же самое. Подписываюсь на req.on(‘data’ и выгребаю сырой запрос. Просто хотел переопределяться парсер и красиво засунуть результат в req.body. Но так не стартует контроллер. В итоге я подписался и выгребаю уже непосредственно в экшене неста, что вообще не ООП, но работает.
- Часто есть много роутов с одинаковым параметром, типа  @Get('users/:userId/blabla') controllerMethod(@Params() params) // param.userId  Можно сделать кастомный декоратор (знаю, аналог Params('userId'))  controllerMethod(@UserId() userId)  Но при этом почти всегда надо в таких случаях обрабатывать ситуацию, что такой юзер существует, либо вернуть 404. Насколько адекватная идея засунуть в этот декоратор такую проверку? Чтобы можно было сделать  controllerMethod(@User() user: User)  где user уже точно найден в БД, а если нет, прилетит 404, не пустив в сервис. "Лишний запрос" не очень беспокоит, а вот то, что это перенос логики на контроллер, и тестировать теперь надо в другом месте — беспокоит...

Main message:
В интерцепторе низя такое сделать?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В интерцепторе низя такое сделать?

--

## My telegram message #49792
**Time:** 28.01.2020 00:14:56 UTC+05:00
**Link:** https://t.me/nest_ru/49792

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
На rxjs пайп просто вписываешь и не много кода выходит of(params).pipe(this. checkUserExists(),this.otherLogic())

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На rxjs пайп просто вписываешь и не много кода выходит of(params).pipe(this. checkUserExists(),this.otherLogic())

--

## My telegram message #49794
**Time:** 28.01.2020 00:17:45 UTC+05:00
**Link:** https://t.me/nest_ru/49794

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно, но суть вопроса останется) Беспокоит, что эта часть логики выносится из сервиса
- как раз в сервисе остается только получение пользователя по ид. а как это обработать решает обвязка. а пайп для этого вполне норм месте. интерцептор вроде не умеет так декларативно в работу с параметрами
- На rxjs пайп просто вписываешь и не много кода выходит of(params).pipe(this. checkUserExists(),this.otherLogic())
- Ну в тесте сервиса уже нет params... или я что-то не так понял?)

Main message:
Pipe операторы пишешь и тестишь их

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Pipe операторы пишешь и тестишь их

--

## My telegram message #49800
**Time:** 28.01.2020 00:22:42 UTC+05:00
**Link:** https://t.me/nest_ru/49800

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну в тесте сервиса уже нет params... или я что-то не так понял?)
- Pipe операторы пишешь и тестишь их
- 🤟
- Ну т.е. лучше не оставлять такое на уровне "контроллера и до"?

Main message:
Все в сервис да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Все в сервис да

--

## My telegram message #49889
**Time:** 28.01.2020 10:30:46 UTC+05:00
**Link:** https://t.me/nest_ru/49889

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- В работе то разница как раз большая. Одно кидается через throw и потом где-нибудь (возможно) ловится через catch. Другое - возвращается как значение

Main message:
Разный тип ошибок и все через throw выплевывай, а как отобразить уже в фильтре решай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Разный тип ошибок и все через throw выплевывай, а как отобразить уже в фильтре решай

--

## My telegram message #49892
**Time:** 28.01.2020 10:33:56 UTC+05:00
**Link:** https://t.me/nest_ru/49892

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Грязный код )

Main message:
Да вроде нет, MegaCriticalError, MiniError Первый может ошибку вернуть хттп, второй просто код ошибки и мессадж и при это хттп еррор не будет Ниче не грязный

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да вроде нет, MegaCriticalError, MiniError Первый может ошибку вернуть хттп, второй просто код ошибки и мессадж и при это хттп еррор не будет Ниче не грязный

--

## My telegram message #50158
**Time:** 29.01.2020 11:55:44 UTC+05:00
**Link:** https://t.me/nest_ru/50158

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Чуваки, пиздец что нашёл.  https://www.graphile.org/postgraphile/ +  https://github.com/alex-ald/postgraphile-nest

Main message:
прикольно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

прикольно

--

## My telegram message #50196
**Time:** 29.01.2020 18:34:06 UTC+05:00
**Link:** https://t.me/nest_ru/50196

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- personService: PersonService; @Client({ transport: Transport.GRPC, options: { url: 'localhost:3001', package: 'genom', protoPath: join(__dirname, '../', '../', 'contracts', 'grpc', 'person-service.proto'), }, }) private readonly client: ClientGrpc; PersonService - класс, сгенерированный через pbjs + pbts, у него внутри есть, например, метод:  public getPersons(request: genom.IGetPersonsRequest): Promise<genom.GetPersonsResult> Возвращается Promise, но когда я использую этот сервис, как  this.personService.getPersons() Там на самом деле возвращается Observable, у кого-нибудь получалось корректно настроить автогенерацию типов, чтобы методы сервисов grpc возвращали Observable, а не promise?

Main message:
https://github.com/AlexDaSoul/nestjs-grpc-angular/blob/master/package.json#L10

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/AlexDaSoul/nestjs-grpc-angular/blob/master/package.json#L10

--

## My telegram message #50300
**Time:** 30.01.2020 21:55:36 UTC+05:00
**Link:** https://t.me/nest_ru/50300

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну так их можно как-то явно указывать ?
- поищи, там есть это точно
- Вооо, то что нужно
- В тайпорм

Main message:
в начале про нест было) или не было, я тока начал смареть, чувак с нестом типа работает фулстэк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в начале про нест было) или не было, я тока начал смареть, чувак с нестом типа работает фулстэк

--

## My telegram message #50301
**Time:** 30.01.2020 21:55:36 UTC+05:00
**Link:** https://t.me/nest_ru/50301

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- поищи, там есть это точно
- Вооо, то что нужно
- В тайпорм
- в начале про нест было) или не было, я тока начал смареть, чувак с нестом типа работает фулстэк

Main message:
#ru Прямая трансляция PiterJS #44 в офисе eLama прямо сейчас.  https://youtu.be/IEZmQCJFOog

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

#ru Прямая трансляция PiterJS #44 в офисе eLama прямо сейчас.  https://youtu.be/IEZmQCJFOog

--

## My telegram message #50316
**Time:** 30.01.2020 23:31:01 UTC+05:00
**Link:** https://t.me/nest_ru/50316

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- > явно указывать какие поля доставать из БД можешь подсказать как это правильно сделать?
- документацию почитай по typeorm не вижу как это непосредственно касается неста
- Вместо leftJoinAndSelect используешь leftJoin В  query.select добавляешь элементы типа  customer.name и так далее По-моему так
- я вчера лазил в доках на сайте их, там вообще инфы про select нет нормальной

Main message:
Авайты не нужны там

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Авайты не нужны там

--

## My telegram message #50318
**Time:** 30.01.2020 23:32:06 UTC+05:00
**Link:** https://t.me/nest_ru/50318

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вместо leftJoinAndSelect используешь leftJoin В  query.select добавляешь элементы типа  customer.name и так далее По-моему так
- я вчера лазил в доках на сайте их, там вообще инфы про select нет нормальной
- Авайты не нужны там
- спасибо, получилось ❤️

Main message:
Через дто проще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через дто проще

--

## My telegram message #50323
**Time:** 30.01.2020 23:33:30 UTC+05:00
**Link:** https://t.me/nest_ru/50323

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- там есть функции, для которых нужны await и для которых не нужно. считаю, что лучше везде проставить и не париться

Main message:
) ну ок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) ну ок

--

## My telegram message #50330
**Time:** 30.01.2020 23:41:27 UTC+05:00
**Link:** https://t.me/nest_ru/50330

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А можно как-то автоматизированно это обрезать?

Main message:
Я до графа так делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я до графа так делал

--

## My telegram message #50455
**Time:** 01.02.2020 18:38:27 UTC+05:00
**Link:** https://t.me/nest_ru/50455

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Понимаю что немного не по теме. Для фронта есть либы позволяющие писать в SQL/ORM стиле?  https://www.npmjs.com/package/jslinq Нашёл такую тему, но юзедж у либы маленький и она древняя

Main message:
https://github.com/typeorm/browser-example

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/typeorm/browser-example

--

## My telegram message #50550
**Time:** 04.02.2020 02:43:27 UTC+05:00
**Link:** https://t.me/nest_ru/50550

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Лучше в реакт залети, думаю, там быстрее ответ поймаешь
- Есть реакт чат на 9к рыл, а ты пишешь сюда?)  https://t.me/react_js
- есть причины не писать туда))
- Сорян, написал в react чатик :)

Main message:
Ранее я вбрасывал, народ лайкнул и пр зашел и его влили, сейчас почти тож самое но не пр, а ишью, пр чет я не нашел, ну хотябы ишью лайкнуть уже неплохо былобы, нам очень интерсетные возможности откроются) мульти провайдинг -  https://github.com/nestjs/nest/issues/770

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ранее я вбрасывал, народ лайкнул и пр зашел и его влили, сейчас почти тож самое но не пр, а ишью, пр чет я не нашел, ну хотябы ишью лайкнуть уже неплохо былобы, нам очень интерсетные возможности откроются) мульти провайдинг -  https://github.com/nestjs/nest/issues/770

--

## My telegram message #50554
**Time:** 04.02.2020 02:45:42 UTC+05:00
**Link:** https://t.me/nest_ru/50554

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Сорян, написал в react чатик :)
- Ранее я вбрасывал, народ лайкнул и пр зашел и его влили, сейчас почти тож самое но не пр, а ишью, пр чет я не нашел, ну хотябы ишью лайкнуть уже неплохо былобы, нам очень интерсетные возможности откроются) мульти провайдинг -  https://github.com/nestjs/nest/issues/770
- тут сыглы давно они чёт тянут
- Так провайдеры же вроде и без multi стакаются? Или нет?

Main message:
там с мульти свои приколы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там с мульти свои приколы

--

## My telegram message #50556
**Time:** 04.02.2020 02:45:52 UTC+05:00
**Link:** https://t.me/nest_ru/50556

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тут сыглы давно они чёт тянут
- Так провайдеры же вроде и без multi стакаются? Или нет?
- там с мульти свои приколы
- Например APP_FILTER можно провайдить несколько раз

Main message:
это тока для ядровых

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это тока для ядровых

--

## My telegram message #50559
**Time:** 04.02.2020 02:46:35 UTC+05:00
**Link:** https://t.me/nest_ru/50559

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там с мульти свои приколы
- Например APP_FILTER можно провайдить несколько раз
- это тока для ядровых
- Ааа

Main message:
ну это очень крутая шутка для динамики

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это очень крутая шутка для динамики

--

## My telegram message #50563
**Time:** 04.02.2020 02:47:38 UTC+05:00
**Link:** https://t.me/nest_ru/50563

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это тока для ядровых
- Ааа
- ну это очень крутая шутка для динамики
- там последняя работа по этому коммиту в августе велась и все стихло

Main message:
я там посарел пр

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я там посарел пр

--

## My telegram message #50567
**Time:** 04.02.2020 02:50:11 UTC+05:00
**Link:** https://t.me/nest_ru/50567

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну это очень крутая шутка для динамики
- там последняя работа по этому коммиту в августе велась и все стихло
- я там посарел пр
- Я поставил все возможные позитивные смайлики, но ты теперь должен мне объяснить какой юз-кейс для этого)

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #50573
**Time:** 04.02.2020 02:52:41 UTC+05:00
**Link:** https://t.me/nest_ru/50573

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я там посарел пр
- Я поставил все возможные позитивные смайлики, но ты теперь должен мне объяснить какой юз-кейс для этого)
- )
- Я человек простой, зашёл и апнул все реакции, которые были

Main message:
каждый новый алгоритм подрубается так imports:[CustomHasher1,CustomHasher2]

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

каждый новый алгоритм подрубается так imports:[CustomHasher1,CustomHasher2]

--

## My telegram message #50576
**Time:** 04.02.2020 02:54:24 UTC+05:00
**Link:** https://t.me/nest_ru/50576

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )
- Я человек простой, зашёл и апнул все реакции, которые были
- каждый новый алгоритм подрубается так imports:[CustomHasher1,CustomHasher2]
- Ну все, теперь точно сделают

Main message:
проверяешь по кайнд или имени с тем что пришло в конфиг и запускаешь метод из нужного сервиса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

проверяешь по кайнд или имени с тем что пришло в конфиг и запускаешь метод из нужного сервиса

--

## My telegram message #50583
**Time:** 04.02.2020 03:01:15 UTC+05:00
**Link:** https://t.me/nest_ru/50583

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- каждый новый алгоритм подрубается так imports:[CustomHasher1,CustomHasher2]
- Ну все, теперь точно сделают
- проверяешь по кайнд или имени с тем что пришло в конфиг и запускаешь метод из нужного сервиса
- а можешь пример показать?

Main message:
сейчас с анг9 пытваюсь замутить, чтобы ываще левый компонент загрузить, ну в несте по работе у девченки в коде куча ифов и можно былобы через мульти провайдинг замутить, вот и вбросил)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сейчас с анг9 пытваюсь замутить, чтобы ываще левый компонент загрузить, ну в несте по работе у девченки в коде куча ифов и можно былобы через мульти провайдинг замутить, вот и вбросил)

--

## My telegram message #50586
**Time:** 04.02.2020 03:02:19 UTC+05:00
**Link:** https://t.me/nest_ru/50586

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а жаль, звучит интересно

Main message:
надеюсь выложу, там сложно все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

надеюсь выложу, там сложно все

--

## My telegram message #50589
**Time:** 04.02.2020 03:10:33 UTC+05:00
**Link:** https://t.me/nest_ru/50589

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- чувак умеет, могёт)

Main message:
🚀

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

🚀

--

## My telegram message #50591
**Time:** 04.02.2020 03:11:46 UTC+05:00
**Link:** https://t.me/nest_ru/50591

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а жаль, звучит интересно
- надеюсь выложу, там сложно все
- чувак умеет, могёт)
- 🚀

Main message:
о чувак, че когда GDE

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

о чувак, че когда GDE

--

## My telegram message #50593
**Time:** 04.02.2020 03:15:41 UTC+05:00
**Link:** https://t.me/nest_ru/50593

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- скоро)

Main message:
круть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

круть

--

## My telegram message #50608
**Time:** 04.02.2020 10:01:28 UTC+05:00
**Link:** https://t.me/nest_ru/50608

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как это нет мультиdi? Там же резолверы на этом работают

Main message:
А ну ок не заметил)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А ну ок не заметил)

--

## My telegram message #50610
**Time:** 04.02.2020 14:20:26 UTC+05:00
**Link:** https://t.me/nest_ru/50610

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Там две строчки поправить.
- И за обновлениями следить и консистентность соблюдать
- А ну ок не заметил)
- всем утра. Подскажите пж, не могу понять как сделать. Пользователь на клиенте проходит авторизацию и вводит неверные данные, должен ли я изменять HttpStatus при ответе?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #50612
**Time:** 04.02.2020 14:27:33 UTC+05:00
**Link:** https://t.me/nest_ru/50612

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- спасибо

Main message:
тип того  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/services/account.service.ts#L74 - выкидываешь ошибку  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/exceptions/custom-exception.filter.ts#L40 - в фильтре превращаешь уже в ответ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тип того  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/services/account.service.ts#L74 - выкидываешь ошибку  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/exceptions/custom-exception.filter.ts#L40 - в фильтре превращаешь уже в ответ

--

## My telegram message #50616
**Time:** 04.02.2020 14:49:50 UTC+05:00
**Link:** https://t.me/nest_ru/50616

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ток не советую 400 код юзать, это неправильно) Вообще лучше возвращать при ошибках 200, а 400-599 коды только когда сервер не смог обработать запрос по какой-то причине

Main message:
это сугубо твое мнение)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это сугубо твое мнение)

--

## My telegram message #50618
**Time:** 04.02.2020 14:50:50 UTC+05:00
**Link:** https://t.me/nest_ru/50618

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Нет, это не просто мое мнение

Main message:
есть разные практики, все по разному делают нет серебрянной пули

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть разные практики, все по разному делают нет серебрянной пули

--

## My telegram message #50623
**Time:** 04.02.2020 14:52:59 UTC+05:00
**Link:** https://t.me/nest_ru/50623

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нет, это не просто мое мнение
- есть разные практики, все по разному делают нет серебрянной пули
- 400-599 коды только для случаев когда сервер основной запрос не обработал, это вроде в спеке хттп даже написано
- да будет холивар!

Main message:
у тя на фронте придется иф писать, а если вернуть ошибку то утя на фронте попадет сразу в метод обработки ошибок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя на фронте придется иф писать, а если вернуть ошибку то утя на фронте попадет сразу в метод обработки ошибок

--

## My telegram message #50626
**Time:** 04.02.2020 14:54:14 UTC+05:00
**Link:** https://t.me/nest_ru/50626

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- да будет холивар!

Main message:
реакт - не нужен!

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

реакт - не нужен!

--

## My telegram message #50631
**Time:** 04.02.2020 14:59:16 UTC+05:00
**Link:** https://t.me/nest_ru/50631

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я фронтендер в основном, и заявляю что так в разы удобнее - пишется одна прокладка над апишкой, и ты в ней разделяешь ответы на успешные, логические ошибки и ошибки сервера А в случае когда отправляешь 400+ коды ошибки сервера и логические ошибки все в куче

Main message:
емберовцы топили за 200 в те древние времена, там фронт либа подругому не могла и они думали что это типа бест практик такой))))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

емберовцы топили за 200 в те древние времена, там фронт либа подругому не могла и они думали что это типа бест практик такой))))

--

## My telegram message #50659
**Time:** 04.02.2020 15:09:02 UTC+05:00
**Link:** https://t.me/nest_ru/50659

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребята, подскажите, пожалуйста, можно ли кешировать предыдущие ответы клиенту? Например, коллекцию документов, которая отдается клиенту в JSON. Только начал изучать Node.js и NestJS в частности, может неправильно задаю вопросы. Сейчас клиент (браузер) делает GET c  If-None-Match с маркером, сервер отвечает 200 с этим же маркером в  ETag , но ресурс грузится заново, а не берется из кеша. Почему так может быть?

Main message:
это для статики обычно юзают, а не для данных, данных кэшируем на уровне приложения, в редис напримпер ложим после того как отдали, и при след запросе берем оттуда, а если нужно чтоб фронт не запрашивал, то на фронте ложим данные в локал сторадж

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это для статики обычно юзают, а не для данных, данных кэшируем на уровне приложения, в редис напримпер ложим после того как отдали, и при след запросе берем оттуда, а если нужно чтоб фронт не запрашивал, то на фронте ложим данные в локал сторадж

--

## My telegram message #50671
**Time:** 04.02.2020 15:18:00 UTC+05:00
**Link:** https://t.me/nest_ru/50671

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кароче спека 401
- https://itnext.io/api-calls-and-http-status-codes-e0240f78f585
- вообще если бы все прочли спеку сначала а потом спорили проблем было бы меньше
- Тут автор не очень понимает что значит 200 с ошибкой

Main message:
я как-то с ембер разрабом в 2014 году часа два спорил на счет кодов этих) в итоге каждый остался при своем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я как-то с ембер разрабом в 2014 году часа два спорил на счет кодов этих) в итоге каждый остался при своем

--

## My telegram message #50674
**Time:** 04.02.2020 15:19:44 UTC+05:00
**Link:** https://t.me/nest_ru/50674

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вообще если бы все прочли спеку сначала а потом спорили проблем было бы меньше
- Тут автор не очень понимает что значит 200 с ошибкой
- я как-то с ембер разрабом в 2014 году часа два спорил на счет кодов этих) в итоге каждый остался при своем
- Ну с апишкой с кастомными кодами ошибок одно удовольствие работать на фронте, все кейсы идеально покрываются

Main message:
рест не юзаю больше) одно удовольствие и на фронте и на бэке

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

рест не юзаю больше) одно удовольствие и на фронте и на бэке

--

## My telegram message #50677
**Time:** 04.02.2020 15:21:21 UTC+05:00
**Link:** https://t.me/nest_ru/50677

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я как-то с ембер разрабом в 2014 году часа два спорил на счет кодов этих) в итоге каждый остался при своем
- Ну с апишкой с кастомными кодами ошибок одно удовольствие работать на фронте, все кейсы идеально покрываются
- рест не юзаю больше) одно удовольствие и на фронте и на бэке
- Тебе не надо определять, пользовательская это ошибка или нет, там очень явный флоу - есть errorCode - сразу отдаешь ошибку из словаря, нет errorCode - отдаешь стандартный текст ошибки по статусу, тоже по словарю

Main message:
граф

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

граф

--

## My telegram message #50680
**Time:** 04.02.2020 15:21:41 UTC+05:00
**Link:** https://t.me/nest_ru/50680

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- рест не юзаю больше) одно удовольствие и на фронте и на бэке
- Тебе не надо определять, пользовательская это ошибка или нет, там очень явный флоу - есть errorCode - сразу отдаешь ошибку из словаря, нет errorCode - отдаешь стандартный текст ошибки по статусу, тоже по словарю
- граф
- Ааа, ну да

Main message:
на работе протобаф

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на работе протобаф

--

## My telegram message #50683
**Time:** 04.02.2020 15:22:36 UTC+05:00
**Link:** https://t.me/nest_ru/50683

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- граф
- Ааа, ну да
- на работе протобаф
- Коллеги, всем привет. Сделал загрузку файла с помощью FileInterceptor и multer. Появилась необходимость сжимать изображение перед сохранением. Как это лучше реализовать? Можно, конечно, прямо в методе контроллера вызвать сжатие уже сохраненного файла, но есть подозрение, что существует более элегантное решение

Main message:
я бы как нить очередью отложенно сжимал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я бы как нить очередью отложенно сжимал

--

## My telegram message #50687
**Time:** 04.02.2020 15:23:40 UTC+05:00
**Link:** https://t.me/nest_ru/50687

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- на работе протобаф
- Коллеги, всем привет. Сделал загрузку файла с помощью FileInterceptor и multer. Появилась необходимость сжимать изображение перед сохранением. Как это лучше реализовать? Можно, конечно, прямо в методе контроллера вызвать сжатие уже сохраненного файла, но есть подозрение, что существует более элегантное решение
- я бы как нить очередью отложенно сжимал
- очередью норм будет

Main message:
кинули файл сохранил в фс, в очередь кинул мессадж что типа вот файл и нужно его сжать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кинули файл сохранил в фс, в очередь кинул мессадж что типа вот файл и нужно его сжать

--

## My telegram message #50689
**Time:** 04.02.2020 15:24:07 UTC+05:00
**Link:** https://t.me/nest_ru/50689

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я бы как нить очередью отложенно сжимал
- очередью норм будет
- кинули файл сохранил в фс, в очередь кинул мессадж что типа вот файл и нужно его сжать
- Хочется всё же до сохранения

Main message:
у тя так засрется память

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя так засрется память

--

## My telegram message #50691
**Time:** 04.02.2020 15:24:22 UTC+05:00
**Link:** https://t.me/nest_ru/50691

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кинули файл сохранил в фс, в очередь кинул мессадж что типа вот файл и нужно его сжать
- Хочется всё же до сохранения
- у тя так засрется память
- Нагрузка из пустоты возникнет, плохая затея

Main message:
а если 100тыщ людей сразу кинут)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а если 100тыщ людей сразу кинут)

--

## My telegram message #50694
**Time:** 04.02.2020 15:25:24 UTC+05:00
**Link:** https://t.me/nest_ru/50694

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя так засрется память
- Нагрузка из пустоты возникнет, плохая затея
- а если 100тыщ людей сразу кинут)
- s3 выдержит а вот сервер отдельный нет

Main message:
ну я ему писал, забыл привязать сообщение)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я ему писал, забыл привязать сообщение)

--

## My telegram message #50696
**Time:** 04.02.2020 15:27:56 UTC+05:00
**Link:** https://t.me/nest_ru/50696

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а если 100тыщ людей сразу кинут)
- s3 выдержит а вот сервер отдельный нет
- ну я ему писал, забыл привязать сообщение)
- Не кинут. Там ещё другой замут в том, что из сохраненной пожатой картинки по запросу генерится картинка произвольного размера. С очередью может выйти так, что кропаная создастся раньше, чем в очереди оригинал пожмется

Main message:
ты по сокету кинь юзеру инфу о маленьких версиях, на фронте прилетит мессадж и все встанет куда надо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты по сокету кинь юзеру инфу о маленьких версиях, на фронте прилетит мессадж и все встанет куда надо

--

