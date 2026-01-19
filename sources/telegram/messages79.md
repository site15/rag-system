## My telegram message #81188
**Time:** 04.12.2020 20:31:34 UTC+05:00
**Link:** https://t.me/nest_ru/81188

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- из без ошибок?
- Должен имеи
- Да там импортировал Body из nestjs/common
- Доброго, может кто делал inerceptor в котором можно было трансформировать сущность по DTO объекту через  plainToClass и возвращать сущность в формате  data: { data here } Форматировать получается, но вот если я хочу вернуть форматированные данные в виде объекта с полем дата, не выходит из за типов возвращемых данных

Main message:
не понятно что ты хочешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не понятно что ты хочешь

--

## My telegram message #81196
**Time:** 04.12.2020 22:14:31 UTC+05:00
**Link:** https://t.me/nest_ru/81196

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да там импортировал Body из nestjs/common
- Доброго, может кто делал inerceptor в котором можно было трансформировать сущность по DTO объекту через  plainToClass и возвращать сущность в формате  data: { data here } Форматировать получается, но вот если я хочу вернуть форматированные данные в виде объекта с полем дата, не выходит из за типов возвращемых данных
- не понятно что ты хочешь
- Ребят, а как запустить в development режиме через pm2 ecosystem Nestjs? Кто-то настраивал? Можете ли скинуть скрин как у вас, если не сложно? Не могу разобраться, к сожалению:( Issues проходил, там устаревшая инфа, что писать в скрипте

Main message:
а зачем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а зачем

--

## My telegram message #81200
**Time:** 04.12.2020 22:16:40 UTC+05:00
**Link:** https://t.me/nest_ru/81200

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят, а как запустить в development режиме через pm2 ecosystem Nestjs? Кто-то настраивал? Можете ли скинуть скрин как у вас, если не сложно? Не могу разобраться, к сожалению:( Issues проходил, там устаревшая инфа, что писать в скрипте
- а зачем
- Хотел просто запускать все приложения для дева командой и иметь при этом дашборд
- После того как пересел на dokku, о pm2 даже не вспоминаю.

Main message:
я в докку на пм2 запускал прод, норм все было

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я в докку на пм2 запускал прод, норм все было

--

## My telegram message #81203
**Time:** 04.12.2020 22:18:17 UTC+05:00
**Link:** https://t.me/nest_ru/81203

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Хотел просто запускать все приложения для дева командой и иметь при этом дашборд

Main message:
через доккер композ запускаю дев, прод в кубере, но есть и локальный кубер, правда пока без монтирования волюма, локальный прод так сказать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через доккер композ запускаю дев, прод в кубере, но есть и локальный кубер, правда пока без монтирования волюма, локальный прод так сказать

--

## My telegram message #81232
**Time:** 05.12.2020 16:26:28 UTC+05:00
**Link:** https://t.me/nest_ru/81232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 1. БД 2. Логика и так далее

Main message:
Бд сервис с приложения можно добрасывать через провайдер, чтобы модуль ниче не знал про базу и контроллеры

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Бд сервис с приложения можно добрасывать через провайдер, чтобы модуль ниче не знал про базу и контроллеры

--

## My telegram message #81234
**Time:** 05.12.2020 16:31:37 UTC+05:00
**Link:** https://t.me/nest_ru/81234

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 1. БД 2. Логика и так далее
- Норм если я отделю логику, которая нужна для контроллера и которую используют другие сервисы?
- Бд сервис с приложения можно добрасывать через провайдер, чтобы модуль ниче не знал про базу и контроллеры
- Нууу это мы так делаем. А человеку я не думаю что хочется так заморачиваться. Я предположил что не тот уровень приложения и знаний, могут быть не прав тут - да

Main message:
Ну хоть пусть знает что можно подругому)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну хоть пусть знает что можно подругому)

--

## My telegram message #81248
**Time:** 05.12.2020 23:10:04 UTC+05:00
**Link:** https://t.me/nest_ru/81248

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно этот шаг обойти?
- https://codesandbox.io/embed/ndse-hw-nest-backend-ufzs0?codemirror=1
- Щас гляну, спс
- Добрый вечер, я тут пытаюсь разобраться как сделать что то типа маршрутизатора между контроллерами или как это правильно выразится. Есть центральный эндпоинт(POST), исходя из полученого ответа необходимо перенаправлять на отдельные контроллеры и дальше уже работать. Пробовал вот так сделать но это я вно неправильно:  @Post() init(@Body() viberResponse: ViberResponseDto, @Res() res) { if (viberResponse.event === EventTypes.conversation) { return viberResponse.user; } res.status(HttpStatus.PERMANENT_REDIRECT).redirect('user/register'); } Куда копать? Забежал к вам с фронтенда)

Main message:
graphql

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

graphql

--

## My telegram message #81253
**Time:** 05.12.2020 23:20:44 UTC+05:00
**Link:** https://t.me/nest_ru/81253

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- graphql
- Решение всех проблем
- а стоковых решений в nest нету?
- Ну так тот же interceptor. Пусть смотрит что прилетело и дальше делает редирект.

Main message:
один ендойнт который перенаправляет по типу, это прям про граф так то)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

один ендойнт который перенаправляет по типу, это прям про граф так то)

--

## My telegram message #81264
**Time:** 05.12.2020 23:26:16 UTC+05:00
**Link:** https://t.me/nest_ru/81264

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну все же контроллеры это про веб…)
- Ага, сейчас попобую)
- Тут такая же логика как и в Angular. Контроллер / компонент должен быть достаточно простым (тупым) а вся логика в сервисах. И можно пере использовать, где хочется.
- Хорошо.

Main message:
пример старый не про нест и ангулвр, ну может пригодится ченить из этого кода, этот бот и ща работает  https://github.com/EndyKaufman/kaufman-bot

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пример старый не про нест и ангулвр, ну может пригодится ченить из этого кода, этот бот и ща работает  https://github.com/EndyKaufman/kaufman-bot

--

## My telegram message #81281
**Time:** 06.12.2020 01:32:27 UTC+05:00
**Link:** https://t.me/nest_ru/81281

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Так чем отличается это от интерфейса TypeScript
- уже обсуждалось
- О
- https://github.com/Denrox/nestjs-microservices-example это адекватный пример микросервисов на несте?

Main message:
Ну примеры хорошие кода

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну примеры хорошие кода

--

## My telegram message #81350
**Time:** 07.12.2020 01:18:19 UTC+05:00
**Link:** https://t.me/nest_ru/81350

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- т.е. все таки нужно сделать отдельный гард, который будет возвращать пользователя, либо null?
- Думаю guard не совсем подходит, т.к его единственная задача - защита ендпоинта. Для применения доп. логики обычно используются interceptor или middleware
- Ну так гард же как раз и парсит токен, если все ок - пускает пользователи и этого же пользователя в реквест кладет
- Это то да, но все таки основная цель гарда не допустить запрос до контроллера, в случае не соответствия. А у меня получается что надо пустить в любом случае, просто нужно добавить в request информацию о пользователе

Main message:
Тебе нужна сущность разрешения, acl внедрять надо, либо гард который выкидывает ошибку неавторизованного и гард который не выкидывает а просто ложет user/null в req.user и использовать каждый по месту

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тебе нужна сущность разрешения, acl внедрять надо, либо гард который выкидывает ошибку неавторизованного и гард который не выкидывает а просто ложет user/null в req.user и использовать каждый по месту

--

## My telegram message #81356
**Time:** 07.12.2020 07:37:06 UTC+05:00
**Link:** https://t.me/nest_ru/81356

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Через квери билдер делал такое да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через квери билдер делал такое да

--

## My telegram message #81381
**Time:** 07.12.2020 17:32:43 UTC+05:00
**Link:** https://t.me/nest_ru/81381

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Добрый день, может кто сталкивался с ошибкой: RepositoryNotFoundError: No repository for "Accounts" was found. Looks like this entity is not registered in current "default" connection?
- может путь к энтити кривой
- ну не знаю… это шутка там?
- Выглядит адово

Main message:
примеры диай, я код особо не смотрел, как что куда провайдится, ток пробежался, вопрос был там про архитектуру же)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

примеры диай, я код особо не смотрел, как что куда провайдится, ток пробежался, вопрос был там про архитектуру же)

--

## My telegram message #81403
**Time:** 08.12.2020 01:23:24 UTC+05:00
**Link:** https://t.me/nest_ru/81403

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- привет всем. только-только начал знакомство с nestjs. я правильно думаю, что dto - это как interface в angular?

Main message:
Когда микрофронтенд попрёт (вангую через 1.5 года) , то в ангулар тоже будут дто, а так да чет тип того, просто у нас есть класс валидаторы и трансформаторы и работают они через декораторы, а декораторы не навесишь на интерфейс, так как интерфейса после компила тс в жс не существует и того что навестил тоже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Когда микрофронтенд попрёт (вангую через 1.5 года) , то в ангулар тоже будут дто, а так да чет тип того, просто у нас есть класс валидаторы и трансформаторы и работают они через декораторы, а декораторы не навесишь на интерфейс, так как интерфейса после компила тс в жс не существует и того что навестил тоже

--

## My telegram message #81438
**Time:** 08.12.2020 13:05:16 UTC+05:00
**Link:** https://t.me/nest_ru/81438

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну просто это все таки класс стоит ли так
- а в чем разница в данном случае?
- эмм, что, простите?
- я не в этом смысле)

Main message:
Я токены юзаю, от абстрактных ушёл их юзал когда часть методов есть а часть нужно докидывать, так разделял: Если весь класс добрасываю то токен Если часть методов переопределить то абстрактный класс - лучше декомпозировать, ато мешанина выходит, и в итоге все ушло в токены

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я токены юзаю, от абстрактных ушёл их юзал когда часть методов есть а часть нужно докидывать, так разделял: Если весь класс добрасываю то токен Если часть методов переопределить то абстрактный класс - лучше декомпозировать, ато мешанина выходит, и в итоге все ушло в токены

--

## My telegram message #81440
**Time:** 08.12.2020 13:06:02 UTC+05:00
**Link:** https://t.me/nest_ru/81440

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- эмм, что, простите?
- я не в этом смысле)
- Я токены юзаю, от абстрактных ушёл их юзал когда часть методов есть а часть нужно докидывать, так разделял: Если весь класс добрасываю то токен Если часть методов переопределить то абстрактный класс - лучше декомпозировать, ато мешанина выходит, и в итоге все ушло в токены
- что за токены?

Main message:
Как строка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Как строка

--

## My telegram message #81443
**Time:** 08.12.2020 13:06:22 UTC+05:00
**Link:** https://t.me/nest_ru/81443

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я токены юзаю, от абстрактных ушёл их юзал когда часть методов есть а часть нужно докидывать, так разделял: Если весь класс добрасываю то токен Если часть методов переопределить то абстрактный класс - лучше декомпозировать, ато мешанина выходит, и в итоге все ушло в токены
- что за токены?
- Как строка
- неста или тса?

Main message:
Неста

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Неста

--

## My telegram message #81446
**Time:** 08.12.2020 13:06:52 UTC+05:00
**Link:** https://t.me/nest_ru/81446

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как строка
- неста или тса?
- Неста
- ок спс

Main message:
Да так как тут нет интерфейсов как в яве и шарпе юзаю то как тут рекомендуют

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да так как тут нет интерфейсов как в яве и шарпе юзаю то как тут рекомендуют

--

## My telegram message #81448
**Time:** 08.12.2020 13:07:24 UTC+05:00
**Link:** https://t.me/nest_ru/81448

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Неста
- ок спс
- Да так как тут нет интерфейсов как в яве и шарпе юзаю то как тут рекомендуют
- символы надежнее

Main message:
Ушел от них, при мульти провайдинг чет не работает с ними

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ушел от них, при мульти провайдинг чет не работает с ними

--

## My telegram message #81451
**Time:** 08.12.2020 13:11:06 UTC+05:00
**Link:** https://t.me/nest_ru/81451

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- что за зверь?

Main message:
https://gist.github.com/EndyKaufman/2aec900716e722f1b6c6e8007be01a36

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://gist.github.com/EndyKaufman/2aec900716e722f1b6c6e8007be01a36

--

## My telegram message #81538
**Time:** 08.12.2020 21:50:29 UTC+05:00
**Link:** https://t.me/nest_ru/81538

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- nu kak obyasnit, naprimer s rabbit a message nazivayut event om, request model i nazivayut DTO, mojno li response ot external API nazvat dto?
- Ну я под DTO понимаю некий объект, в котором хранятся передаваемые данные. Но, мне кажется, DTO существует в рамках понятий одного конкретного сервиса. Ты же не можешь DTO куда-то передать, ты передаешь уже сериализованные из DTO данные
- Data transfer object
- как вы храните микросервисы на несте?

Main message:
nx

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

nx

--

## My telegram message #81540
**Time:** 08.12.2020 21:52:18 UTC+05:00
**Link:** https://t.me/nest_ru/81540

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Data transfer object
- как вы храните микросервисы на несте?
- nx
- или lerna если не nx

Main message:
Лерна там мухлеж с подменой сим линков вроде, каша какаята была когда я одно время юзал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Лерна там мухлеж с подменой сим линков вроде, каша какаята была когда я одно время юзал

--

## My telegram message #81543
**Time:** 08.12.2020 22:00:50 UTC+05:00
**Link:** https://t.me/nest_ru/81543

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Репы можешь как саб три добавить в глобальную репу с nx и этой глобальной только пользоваться, лучше все в один монорепозиторий пихнуть, если нужно чтобы отделы не видели часть проекта то тогда саб три и мелкие репы как либы и приложения nx подрубить и для каждого отдела глобальную репу с nx сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Репы можешь как саб три добавить в глобальную репу с nx и этой глобальной только пользоваться, лучше все в один монорепозиторий пихнуть, если нужно чтобы отделы не видели часть проекта то тогда саб три и мелкие репы как либы и приложения nx подрубить и для каждого отдела глобальную репу с nx сделать

--

## My telegram message #81567
**Time:** 09.12.2020 01:34:40 UTC+05:00
**Link:** https://t.me/nest_ru/81567

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- пол часа заняло чтоб это понять)
- Ручками написать в  @Entity ( {name: 'your-name'} )
- спасибо
- Я всегда ренеймлю. Так красивее.

Main message:
Я добовляю префикс название модуля где ентити в тайп орм так делал, для призмы просто в схеме модуля дописываю название модуля

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я добовляю префикс название модуля где ентити в тайп орм так делал, для призмы просто в схеме модуля дописываю название модуля

--

## My telegram message #81639
**Time:** 09.12.2020 15:05:19 UTC+05:00
**Link:** https://t.me/nest_ru/81639

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Типо этого у меня всегда.

Main message:
у меня так apps/backend - монолит бэка apps/frontend - монолит фронта apps/mobile - монолит мобилы - пустая папка :) apps/mail-sender-ms - мs apps/auth-ms - мs apps/auth-client - вебпак5 федерация микрофронтенд, начинаю только тыкать, название пока такое libs/mail-sender/server - либа бэка libs/auth/server - либа для бэка libs/auth/client - либа для фронта с логикой libs/auth/material - либа для фронта с гуи libs/auth/common - либа общая libs/auth/flutter - либа для мобилы - начинал тестово

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня так apps/backend - монолит бэка apps/frontend - монолит фронта apps/mobile - монолит мобилы - пустая папка :) apps/mail-sender-ms - мs apps/auth-ms - мs apps/auth-client - вебпак5 федерация микрофронтенд, начинаю только тыкать, название пока такое libs/mail-sender/server - либа бэка libs/auth/server - либа для бэка libs/auth/client - либа для фронта с логикой libs/auth/material - либа для фронта с гуи libs/auth/common - либа общая libs/auth/flutter - либа для мобилы - начинал тестово

--

## My telegram message #81643
**Time:** 09.12.2020 15:07:16 UTC+05:00
**Link:** https://t.me/nest_ru/81643

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Что ты выносишь в либы?

Main message:
почти все модули

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

почти все модули

--

## My telegram message #81645
**Time:** 09.12.2020 15:07:35 UTC+05:00
**Link:** https://t.me/nest_ru/81645

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- "вебпак5 федерация микрофронтенд " вот это прям очень хочу попробовать, не могу время найти ... Интересно как будет туда прикручивать Ангуляр. Хотя чет мне кажется что все придет в Svelte или что-то такое, что бы прям легкие фронты были.

Main message:
у нас своя система же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у нас своя система же

--

## My telegram message #81647
**Time:** 09.12.2020 15:08:34 UTC+05:00
**Link:** https://t.me/nest_ru/81647

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- почти все модули
- "вебпак5 федерация микрофронтенд " вот это прям очень хочу попробовать, не могу время найти ... Интересно как будет туда прикручивать Ангуляр. Хотя чет мне кажется что все придет в Svelte или что-то такое, что бы прям легкие фронты были.
- у нас своя система же
- Зачем? То есть в либах у тебя бизнес логика?

Main message:
в монолите только контроллеры/резолверы, сервисы все по модулям. модули по либам

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в монолите только контроллеры/резолверы, сервисы все по модулям. модули по либам

--

## My telegram message #81656
**Time:** 09.12.2020 15:13:08 UTC+05:00
**Link:** https://t.me/nest_ru/81656

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Хоть тут и бэк, но спрошу. Как и через что вы будет шарить инфу между фронтами ? То есть нужно же сделать общею шину как-то.

Main message:
думал делать фронтовые сабскрипшены для графа и юзать события локал стораджа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

думал делать фронтовые сабскрипшены для графа и юзать события локал стораджа

--

## My telegram message #81659
**Time:** 09.12.2020 15:13:54 UTC+05:00
**Link:** https://t.me/nest_ru/81659

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- И рулить все это еще через worker

Main message:
воркеры не юзал в жизни еще)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

воркеры не юзал в жизни еще)

--

## My telegram message #81661
**Time:** 09.12.2020 15:14:18 UTC+05:00
**Link:** https://t.me/nest_ru/81661

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- То есть, например, пользователей и авторизацию лучше засунуть в либы?

Main message:
да это разные либы не знают друг о друге ничего

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да это разные либы не знают друг о друге ничего

--

## My telegram message #81666
**Time:** 09.12.2020 15:15:55 UTC+05:00
**Link:** https://t.me/nest_ru/81666

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Очень крутая штука. Но ! - один раз ты его создал, больше ты его не можешь удалить у пользователя если чет накосячил. Ну то есть можно, но так костыли тот еще.

Main message:
а, для пва подрубал да) ну я не разбирался, но боль с кэшем помню))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а, для пва подрубал да) ну я не разбирался, но боль с кэшем помню))

--

## My telegram message #81672
**Time:** 09.12.2020 15:19:57 UTC+05:00
**Link:** https://t.me/nest_ru/81672

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
я акиту юзаю для кэшей, графовский не юзаю, чет перебор будет с технологиями), в идеале хочу чтобы можно было эти кэши и сабскрипшены легко потом перенести на бэк не меняя кода на фронте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я акиту юзаю для кэшей, графовский не юзаю, чет перебор будет с технологиями), в идеале хочу чтобы можно было эти кэши и сабскрипшены легко потом перенести на бэк не меняя кода на фронте

--

## My telegram message #81679
**Time:** 09.12.2020 15:28:42 UTC+05:00
**Link:** https://t.me/nest_ru/81679

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А лучше сразу в монорепу загнать все.
- У меня сейчас идёт: — . /Modules (modules / controllers) —-. /schemas —-. /sub -services-folder? ——*service —-*cotroller? —-*dtos —-*module —-*service
- Я тебе говорил главную идею. Сделать так что бы я мог просто взять модуль пользователя например или товара и у меня он сразу работал на другом проекте без особых изменений (желательно вообще без них). Вот прям, пришел - нажал CTRL + C  /CTRL + V и потому в app,module.ts воткнуть его в imports. Если ты можешь это предоставить, тогда у тебя достаточно нормальная структура проекта.
- Текущий модуль пользователя я думаю вынести в либу именно по этой причине, включая авторизацию которая идёт в одном с пользователем модуле.

Main message:
пользователь может отличатся на разных проектах, где-то инн поле есть, гдето да база пг, где то монга

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пользователь может отличатся на разных проектах, где-то инн поле есть, гдето да база пг, где то монга

--

## My telegram message #81685
**Time:** 09.12.2020 15:33:15 UTC+05:00
**Link:** https://t.me/nest_ru/81685

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- пользователь может отличатся на разных проектах, где-то инн поле есть, гдето да база пг, где то монга
- поправочка, Контроллеры подключают отдельные сервисы пользователя.
- :D ;D нормальный совет :D :D А потом мы придем и будем страдать. Хотя это и так всегда так получается.
- Вот так счастье писать такой код и не мучатся после этого)

Main message:
когда сильно декомпозируешь то тестировать меньше кейсов и мест для слома меньше, и код чище, можно один раз писать и забывать, даже потом когда я возвращаюсь к такому коду через 2 года, сразу понимаю что и где, а в петы где мвп каша когда через неделю прихожу то нихрена не понимаю как оно так работает, ну мое мнение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда сильно декомпозируешь то тестировать меньше кейсов и мест для слома меньше, и код чище, можно один раз писать и забывать, даже потом когда я возвращаюсь к такому коду через 2 года, сразу понимаю что и где, а в петы где мвп каша когда через неделю прихожу то нихрена не понимаю как оно так работает, ну мое мнение

--

## My telegram message #81687
**Time:** 09.12.2020 15:34:49 UTC+05:00
**Link:** https://t.me/nest_ru/81687

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- :D ;D нормальный совет :D :D А потом мы придем и будем страдать. Хотя это и так всегда так получается.
- Вот так счастье писать такой код и не мучатся после этого)
- когда сильно декомпозируешь то тестировать меньше кейсов и мест для слома меньше, и код чище, можно один раз писать и забывать, даже потом когда я возвращаюсь к такому коду через 2 года, сразу понимаю что и где, а в петы где мвп каша когда через неделю прихожу то нихрена не понимаю как оно так работает, ну мое мнение
- у вас на докере?

Main message:
вначале сложно делить сильно на куски, потом привыкаешь, на работе вот так не делим, трудно между таким и таким кодом переключатся, по разному думаешь)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вначале сложно делить сильно на куски, потом привыкаешь, на работе вот так не делим, трудно между таким и таким кодом переключатся, по разному думаешь)

--

## My telegram message #81689
**Time:** 09.12.2020 15:34:56 UTC+05:00
**Link:** https://t.me/nest_ru/81689

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у вас на докере?

Main message:
кубер, дома кубер и на работе кубер, доккер только для дев режима и там и там

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кубер, дома кубер и на работе кубер, доккер только для дев режима и там и там

--

## My telegram message #81694
**Time:** 09.12.2020 15:39:16 UTC+05:00
**Link:** https://t.me/nest_ru/81694

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А разве кубер это не инструмент для работы с множеством докеров?
- тогда уж для работы с множеством контейнеров, которые могут быть созданы с помощью докера
- Ну, да.
- я провобал разделить так же, но докерфайл сильно усложняется

Main message:
Докер композ же есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Докер композ же есть

--

## My telegram message #81696
**Time:** 09.12.2020 15:40:55 UTC+05:00
**Link:** https://t.me/nest_ru/81696

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну, да.
- я провобал разделить так же, но докерфайл сильно усложняется
- Докер композ же есть
- Без него вообще докер не настраиваю.

Main message:
я кубер файлы из тс генерю, думаю если сильно усложнится докер композ, то тоже из тс буду генерить, на основе структуры папок, ща кубер файлы так генерятся через тс используя папки, чтобы не заморачиватся с новыми мс, создал папку и погнал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я кубер файлы из тс генерю, думаю если сильно усложнится докер композ, то тоже из тс буду генерить, на основе структуры папок, ща кубер файлы так генерятся через тс используя папки, чтобы не заморачиватся с новыми мс, создал папку и погнал

--

## My telegram message #81700
**Time:** 09.12.2020 15:42:58 UTC+05:00
**Link:** https://t.me/nest_ru/81700

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не, докер композ есть, он ссылается на разные докерфайлы, в каждом докер файле приходится копировать зависимости которые нужны чтобы нормально собирались образы

Main message:
ну докер файлы пока не генерил через тс, ну если есть прям такая нужда то можно и их автоматизировать как то

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну докер файлы пока не генерил через тс, ну если есть прям такая нужда то можно и их автоматизировать как то

--

## My telegram message #81703
**Time:** 09.12.2020 15:45:51 UTC+05:00
**Link:** https://t.me/nest_ru/81703

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Писать генераторы понравилось?)

Main message:
ну оно не сложно, и с аст работа там была модификация кода тс интерестный вид работ, не бэк не фронт а чет такое непонятное)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну оно не сложно, и с аст работа там была модификация кода тс интерестный вид работ, не бэк не фронт а чет такое непонятное)

--

## My telegram message #81707
**Time:** 09.12.2020 16:17:01 UTC+05:00
**Link:** https://t.me/nest_ru/81707

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- из сваггера на фронт генерите типы? нормально получается?

Main message:
ну я генерил из жсон бэк, фронт, мобилу сейчас так не делаю, сейчас генерю только ямлы для деплоя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я генерил из жсон бэк, фронт, мобилу сейчас так не делаю, сейчас генерю только ямлы для деплоя

--

## My telegram message #81713
**Time:** 09.12.2020 18:30:26 UTC+05:00
**Link:** https://t.me/nest_ru/81713

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я генерил из жсон бэк, фронт, мобилу сейчас так не делаю, сейчас генерю только ямлы для деплоя
- А я вот хочу генерить шаблоны, желательно на разных языках.
- Привет. Помогите пожалуйста разобраться как правильно инициализировать сторонние сервисы, такие как GCP PubSub, в сервисах которые имеют scope: request? Соединение со сторонним сервисом должно быть только одно и инициалазироваться только 1 раз. Спасибо
- Оп, у меня тоже снова вопрос. Как мокнуть HttpService? Нужно имитировать ответ api

Main message:
Только сервис наверное, зачем внутрь то лезть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Только сервис наверное, зачем внутрь то лезть

--

## My telegram message #81716
**Time:** 09.12.2020 18:32:30 UTC+05:00
**Link:** https://t.me/nest_ru/81716

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А ответ как передавать? Или я что-то не понимаю?

Main message:
Тебе для теста или зачем)?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тебе для теста или зачем)?

--

## My telegram message #81718
**Time:** 09.12.2020 18:33:51 UTC+05:00
**Link:** https://t.me/nest_ru/81718

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Для теста поведения при разных условиях и разных ответах.

Main message:
Метод сервиса перебей в тесте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Метод сервиса перебей в тесте

--

## My telegram message #81721
**Time:** 09.12.2020 18:40:24 UTC+05:00
**Link:** https://t.me/nest_ru/81721

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Для теста поведения при разных условиях и разных ответах.
- Метод сервиса перебей в тесте
- Обращаться к mock host, и не изменять мокать HttpService?
- Возможно я не правильно сформулировал вопрос: у меня есть PubSub подписка в GCP. Мне нужно как дергать PubSub, так и ждать от него запросов и дергать другие сервисы. Если бы мне нужно было только делать запросы к PubSub - то Ваш вариант мне бы подошел, но в моем случае, после получения ивента от PubSub, мне нужно вызвать метод из другого сервиса, который инжектится в PubSub сервис. А сервис, метод которого нужно вызвать, является сервисом со scope: request и когда я делаю inject в PubSub сервис - то PubSub service тоже становится со scope: request. Но мне такой вариант не подходит

Main message:
Что такое gcp

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Что такое gcp

--

## My telegram message #81723
**Time:** 09.12.2020 18:40:58 UTC+05:00
**Link:** https://t.me/nest_ru/81723

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Обращаться к mock host, и не изменять мокать HttpService?
- Возможно я не правильно сформулировал вопрос: у меня есть PubSub подписка в GCP. Мне нужно как дергать PubSub, так и ждать от него запросов и дергать другие сервисы. Если бы мне нужно было только делать запросы к PubSub - то Ваш вариант мне бы подошел, но в моем случае, после получения ивента от PubSub, мне нужно вызвать метод из другого сервиса, который инжектится в PubSub сервис. А сервис, метод которого нужно вызвать, является сервисом со scope: request и когда я делаю inject в PubSub сервис - то PubSub service тоже становится со scope: request. Но мне такой вариант не подходит
- Что такое gcp
- google cloud platform

Main message:
Скоуп сервисы убери

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Скоуп сервисы убери

--

## My telegram message #81729
**Time:** 09.12.2020 19:17:50 UTC+05:00
**Link:** https://t.me/nest_ru/81729

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Что такое gcp
- google cloud platform
- Скоуп сервисы убери
- убрать не могу.

Main message:
Реквест скоуп это для быстрой победы, между созданными инстансами чтобы общатся нужно некий паб саб иметь внутренний, но если у тя хттп то у тя все время связь будет рваться, для веб сокетов ещё можно такое использовать, но там опять придётся с потоками разруливать и лучше через рксжс это делать, думаю объем кода чуть меньше выйдет но гораздо запутан её чем просто отказатся от реквест скоупов ну это чисто для веб сокетов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Реквест скоуп это для быстрой победы, между созданными инстансами чтобы общатся нужно некий паб саб иметь внутренний, но если у тя хттп то у тя все время связь будет рваться, для веб сокетов ещё можно такое использовать, но там опять придётся с потоками разруливать и лучше через рксжс это делать, думаю объем кода чуть меньше выйдет но гораздо запутан её чем просто отказатся от реквест скоупов ну это чисто для веб сокетов

--

## My telegram message #81731
**Time:** 09.12.2020 19:35:11 UTC+05:00
**Link:** https://t.me/nest_ru/81731

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Скоуп сервисы убери
- убрать не могу.
- Реквест скоуп это для быстрой победы, между созданными инстансами чтобы общатся нужно некий паб саб иметь внутренний, но если у тя хттп то у тя все время связь будет рваться, для веб сокетов ещё можно такое использовать, но там опять придётся с потоками разруливать и лучше через рксжс это делать, думаю объем кода чуть меньше выйдет но гораздо запутан её чем просто отказатся от реквест скоупов ну это чисто для веб сокетов
- Делаете ли вы разные типы ошибок для обработки результата работы сервиса в контроллере, или высылаете готовый ответ из сервиса?

Main message:
Кастомные ошибки и фильтр для их отображения если отличается формат от кастомных ошибок ядра, если формат совпадает то только кастомная ошибка и енам с типами ошибок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Кастомные ошибки и фильтр для их отображения если отличается формат от кастомных ошибок ядра, если формат совпадает то только кастомная ошибка и енам с типами ошибок

--

## My telegram message #81735
**Time:** 09.12.2020 19:55:37 UTC+05:00
**Link:** https://t.me/nest_ru/81735

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Реквест скоуп это для быстрой победы, между созданными инстансами чтобы общатся нужно некий паб саб иметь внутренний, но если у тя хттп то у тя все время связь будет рваться, для веб сокетов ещё можно такое использовать, но там опять придётся с потоками разруливать и лучше через рксжс это делать, думаю объем кода чуть меньше выйдет но гораздо запутан её чем просто отказатся от реквест скоупов ну это чисто для веб сокетов
- Делаете ли вы разные типы ошибок для обработки результата работы сервиса в контроллере, или высылаете готовый ответ из сервиса?
- Кастомные ошибки и фильтр для их отображения если отличается формат от кастомных ошибок ядра, если формат совпадает то только кастомная ошибка и енам с типами ошибок
- Разумно. То есть Если ошибка сводится к коду 400 - возвращать не Error а HttpException?

Main message:
хттп еррор вообще не нужно возвращать, кастомные возвращай и превращай их во что хочешь через фильтр ошибок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хттп еррор вообще не нужно возвращать, кастомные возвращай и превращай их во что хочешь через фильтр ошибок

--

## My telegram message #81738
**Time:** 09.12.2020 19:56:40 UTC+05:00
**Link:** https://t.me/nest_ru/81738

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Разумно. То есть Если ошибка сводится к коду 400 - возвращать не Error а HttpException?
- хттп еррор вообще не нужно возвращать, кастомные возвращай и превращай их во что хочешь через фильтр ошибок
- Перехватываю эксепшн из сервиса в контроллере и выбрасываю HttpException с нужным статус-кодом
- Вот вот.

Main message:
лучше фильтр для модуля делать который это конвертнет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше фильтр для модуля делать который это конвертнет

--

## My telegram message #81740
**Time:** 09.12.2020 19:56:55 UTC+05:00
**Link:** https://t.me/nest_ru/81740

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Перехватываю эксепшн из сервиса в контроллере и выбрасываю HttpException с нужным статус-кодом
- Вот вот.
- лучше фильтр для модуля делать который это конвертнет
- Фильтр ошибок? Глобальный pipe?

Main message:
чтобы в контроллере мапингом не заниматся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чтобы в контроллере мапингом не заниматся

--

## My telegram message #81745
**Time:** 09.12.2020 20:02:23 UTC+05:00
**Link:** https://t.me/nest_ru/81745

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Фильтр ошибок? Глобальный pipe?
- чтобы в контроллере мапингом не заниматся
- Ок, посмотрю на этот способ
- Я примерно вот так делаю:  @UseGuards(JwtAuthOptionalGuard) @UsePipes(new JsonValidationPipe()) @HttpCode(201) @Post('/nicknames') async nicknamesOffer(@Body() dto: NicknameOfferDto, @Req() request): Promise<HttpResponse<null, null>> { try { await this.commonService.saveNickname(dto, Status.draft, request.user?request.user.id:null); } catch (AlreadyExistsException) { throw new HttpException(ResponseFactory.error({ nickname: 'nicknameAlreadyExists' }), HttpStatus.BAD_REQUEST) } return ResponseFactory.success(null); } Ну и также есть ExceptionFilter, который умеет переводить ошибки, а если исключение не HttpException, то формирует общую ошибку типа "что-то пошло не так"

Main message:
сделал бы кастомную ошибку для сервиса new UserError(UserErrorEnum.AlreadyExists,'nicknameAlreadyExists')

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сделал бы кастомную ошибку для сервиса new UserError(UserErrorEnum.AlreadyExists,'nicknameAlreadyExists')

--

## My telegram message #81752
**Time:** 09.12.2020 20:10:45 UTC+05:00
**Link:** https://t.me/nest_ru/81752

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
по модулям бить надо, и у каждого модуля свои фильтры, на каждый модуль один контроллер, по идее не должно слишком много выйти, если выходит, значит еще нужно дробить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по модулям бить надо, и у каждого модуля свои фильтры, на каждый модуль один контроллер, по идее не должно слишком много выйти, если выходит, значит еще нужно дробить

--

## My telegram message #81755
**Time:** 09.12.2020 20:16:21 UTC+05:00
**Link:** https://t.me/nest_ru/81755

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Имеешь в виду, чтобы в контроллере не ловить? Тоже вариант. Но я считаю, что в контроллере ловить ошибки сервисов - хорошая практика. По крайней мере, в том смысле, что я сразу вижу, какие внештатные ситуации обрабатываются
- Смотря как ловить.
- по модулям бить надо, и у каждого модуля свои фильтры, на каждый модуль один контроллер, по идее не должно слишком много выйти, если выходит, значит еще нужно дробить
- А есть на github пример с лучшими практиками?

Main message:
неа)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа)

--

## My telegram message #81852
**Time:** 10.12.2020 11:56:11 UTC+05:00
**Link:** https://t.me/nest_ru/81852

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, подскажите какой-нибудь модуль или функцию из nest-пакетов, чтобы создать чистую копию entity с чистыми полями, изначально там огромное количество декораторов над полями. из  @Entity () class Abc {  @IsOptional ()  @Exclude () abc: number } получить  @Entity () class Abc { abc: number }

Main message:
они регаются для этого класса в глобале, можешь руками этот глобал модифицировать, хоть накинуть чета хоть убрать, декораторы класс трансформ и класс валидатор не модифицируют проперти

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

они регаются для этого класса в глобале, можешь руками этот глобал модифицировать, хоть накинуть чета хоть убрать, декораторы класс трансформ и класс валидатор не модифицируют проперти

--

## My telegram message #81876
**Time:** 10.12.2020 16:22:29 UTC+05:00
**Link:** https://t.me/nest_ru/81876

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не знаю на счет юридической стороны, но вам нужен какой-то сервис с ключами. У нас в компании есть такой и мы при старте получаем из него ключи. Там настройка такая, что только с конкретных IP можно получить эти данные
- Это конечно можно сделать, но я как-то очень сильно переживаю на счет того что бы не мог кто-то узнать данные пользователей. Я тут думаю на счет того что бы ключи разделать на несколько частей и что бы только все люди вместе могли собрать полный ключ.
- Ну я вашей ситуации не знаю. И чем сложнее схема, тем сложнее ее взломать. А так единственное, что может защитить на 100% - это не хранить ни каких данных 😊
- Это да. Как говорится нету багов у того кто не пишет код ))

Main message:
На клиенте можно шифровать паролем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На клиенте можно шифровать паролем

--

## My telegram message #81880
**Time:** 10.12.2020 16:24:03 UTC+05:00
**Link:** https://t.me/nest_ru/81880

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну я вашей ситуации не знаю. И чем сложнее схема, тем сложнее ее взломать. А так единственное, что может защитить на 100% - это не хранить ни каких данных 😊
- Это да. Как говорится нету багов у того кто не пишет код ))
- На клиенте можно шифровать паролем
- Привет, то есть ты про то что бы передавать данные прям до клиента в шифре и уже сам клиент пусть делает расшифровку ?

Main message:
Дп

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Дп

--

## My telegram message #81882
**Time:** 10.12.2020 16:28:00 UTC+05:00
**Link:** https://t.me/nest_ru/81882

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- На клиенте можно шифровать паролем
- Привет, то есть ты про то что бы передавать данные прям до клиента в шифре и уже сам клиент пусть делает расшифровку ?
- Дп
- Нуу, если честно так себе идея: 1. Клиент может быть очень слабым и при большом количестве сообщений умрет нафиг. 2. У нас есть ssl так что данные до клиента и так прилетят в шифре, а уже сам драйвер сети пусть делает расшифровку (точнее он ее и так делает).

Main message:
я так в одном фрилансе давно делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я так в одном фрилансе давно делал

--

## My telegram message #81885
**Time:** 10.12.2020 17:12:34 UTC+05:00
**Link:** https://t.me/nest_ru/81885

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Дп
- Нуу, если честно так себе идея: 1. Клиент может быть очень слабым и при большом количестве сообщений умрет нафиг. 2. У нас есть ssl так что данные до клиента и так прилетят в шифре, а уже сам драйвер сети пусть делает расшифровку (точнее он ее и так делает).
- я так в одном фрилансе давно делал
- Немного не в тему, но сколько оперативки у тебя кубер сам по себе жрёт? Без контейнеров

Main message:
хз) на 2 гиговом впс у меня все зависло

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хз) на 2 гиговом впс у меня все зависло

--

## My telegram message #81889
**Time:** 10.12.2020 17:14:29 UTC+05:00
**Link:** https://t.me/nest_ru/81889

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я так в одном фрилансе давно делал
- Немного не в тему, но сколько оперативки у тебя кубер сам по себе жрёт? Без контейнеров
- хз) на 2 гиговом впс у меня все зависло
- Во, это отличная инфа, спасибо. А то я как раз хотел его потыкать в своём пет-проекте на 2-гиговом впс)))

Main message:
ну ты всеравно пробни может у меня проц тупой был

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты всеравно пробни может у меня проц тупой был

--

## My telegram message #81905
**Time:** 10.12.2020 18:55:44 UTC+05:00
**Link:** https://t.me/nest_ru/81905

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет! Подскажите, декоратор  @UpdateDateColumn создает запись даже при инсерте. Это какойто сокральный смысл?

Main message:
нулайбл поля только реально которые по тз такими должны быть надо делать, а всякие пк, фк, креатедАт, упдатедАт, креатедЮзер, упдатедЮзер они всегда должны быть не нулэйбл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нулайбл поля только реально которые по тз такими должны быть надо делать, а всякие пк, фк, креатедАт, упдатедАт, креатедЮзер, упдатедЮзер они всегда должны быть не нулэйбл

--

## My telegram message #81910
**Time:** 10.12.2020 18:58:53 UTC+05:00
**Link:** https://t.me/nest_ru/81910

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нулайбл поля только реально которые по тз такими должны быть надо делать, а всякие пк, фк, креатедАт, упдатедАт, креатедЮзер, упдатедЮзер они всегда должны быть не нулэйбл
- Интересная мысль..
- Хочешь ты вывести список отсортированный по дате. Как сделаешь сорт?
- по какой дате?

Main message:
если нужно узнать что запись еще не обновлялась пиши select * from table where createdAt=updatedAt

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если нужно узнать что запись еще не обновлялась пиши select * from table where createdAt=updatedAt

--

## My telegram message #81921
**Time:** 10.12.2020 19:30:50 UTC+05:00
**Link:** https://t.me/nest_ru/81921

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как в nest + graphql поменять тело ошибки которая возвращается после валидации? я добавил кастомный пайп для валидации, но запрос до него не доходит, что-то другое перехватывает его и выплевывает ошибку

Main message:
граф куэл и перехватывает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

граф куэл и перехватывает

--

## My telegram message #81926
**Time:** 10.12.2020 19:31:27 UTC+05:00
**Link:** https://t.me/nest_ru/81926

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можешь подсказать в каком разделе искать? Overview?
- граф куэл и перехватывает
- https://docs.nestjs.com/interceptors
- вот я так и думал, но на каком этапе?

Main message:
у меня не вышло и я как то забил), всеравно на фронте валидирую

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня не вышло и я как то забил), всеравно на фронте валидирую

--

## My telegram message #81929
**Time:** 10.12.2020 19:32:08 UTC+05:00
**Link:** https://t.me/nest_ru/81929

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот я так и думал, но на каком этапе?
- у меня не вышло и я как то забил), всеравно на фронте валидирую
- и как его перебить
- Ну не увидев логов мало чем можно помочь

Main message:
главное что бэк защищен ато что некрасиво ругается не суть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

главное что бэк защищен ато что некрасиво ругается не суть

--

## My telegram message #81932
**Time:** 10.12.2020 19:33:05 UTC+05:00
**Link:** https://t.me/nest_ru/81932

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну не увидев логов мало чем можно помочь
- главное что бэк защищен ато что некрасиво ругается не суть
- нам нужно чтобы было красиво и не было лишних (verbose) строк :(
- +++

Main message:
как вариант можно для граф куэл все поля пометить нулэйбл, и оно пропустит дальше, а дальше стоит пайп валидации енста он должен ругнутся нормально

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как вариант можно для граф куэл все поля пометить нулэйбл, и оно пропустит дальше, а дальше стоит пайп валидации енста он должен ругнутся нормально

--

## My telegram message #81936
**Time:** 10.12.2020 19:39:15 UTC+05:00
**Link:** https://t.me/nest_ru/81936

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а долго вы искали нормальный способ, перед тем как сдаться?

Main message:
4 часа примерно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

4 часа примерно

--

## My telegram message #81940
**Time:** 10.12.2020 19:41:34 UTC+05:00
**Link:** https://t.me/nest_ru/81940

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вербозы можно отрубить когда графкл модуль подключается. В конфиге указывается
- а долго вы искали нормальный способ, перед тем как сдаться?
- 4 часа примерно
- а я 4 часа сижу и ищу где я не так пайп добавляю :D

Main message:
попробуй как я говорю, чтобы граф пропустил дальше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

попробуй как я говорю, чтобы граф пропустил дальше

--

## My telegram message #81944
**Time:** 10.12.2020 19:51:30 UTC+05:00
**Link:** https://t.me/nest_ru/81944

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 4 часа примерно
- а я 4 часа сижу и ищу где я не так пайп добавляю :D
- попробуй как я говорю, чтобы граф пропустил дальше
- тогда придется и типы убрать

Main message:
@sllavvicc как победил это?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@sllavvicc как победил это?

--

## My telegram message #81949
**Time:** 10.12.2020 19:57:11 UTC+05:00
**Link:** https://t.me/nest_ru/81949

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- попробуй как я говорю, чтобы граф пропустил дальше
- тогда придется и типы убрать
- @sllavvicc как победил это?
- о, нашел че-то близкое к нужному в доках Apollo

Main message:
это нето, там на каждое поле строка с ошибкой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это нето, там на каждое поле строка с ошибкой

--

## My telegram message #81953
**Time:** 10.12.2020 20:09:12 UTC+05:00
**Link:** https://t.me/nest_ru/81953

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @sllavvicc как победил это?
- о, нашел че-то близкое к нужному в доках Apollo
- это нето, там на каждое поле строка с ошибкой
- а есть способ получить названия параметров в этих ошибках?

Main message:
я парсил строку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я парсил строку

--

## My telegram message #81956
**Time:** 10.12.2020 20:13:37 UTC+05:00
**Link:** https://t.me/nest_ru/81956

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это нето, там на каждое поле строка с ошибкой
- а есть способ получить названия параметров в этих ошибках?
- я парсил строку
- из чего?

Main message:
сам капай, я не смог решить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сам капай, я не смог решить

--

## My telegram message #81960
**Time:** 10.12.2020 21:44:36 UTC+05:00
**Link:** https://t.me/nest_ru/81960

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- из чего?
- сам капай, я не смог решить
- понимаю :D и на этом спасибо
- Что именно ? Чет Контекс потерял

Main message:
ща тестану, может оно и работает ) давно не тестил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ща тестану, может оно и работает ) давно не тестил

--

## My telegram message #81961
**Time:** 10.12.2020 22:27:16 UTC+05:00
**Link:** https://t.me/nest_ru/81961

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сам капай, я не смог решить
- понимаю :D и на этом спасибо
- Что именно ? Чет Контекс потерял
- ща тестану, может оно и работает ) давно не тестил

Main message:
не, не пашет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, не пашет

--

## My telegram message #81964
**Time:** 10.12.2020 22:28:44 UTC+05:00
**Link:** https://t.me/nest_ru/81964

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Что именно ? Чет Контекс потерял
- ща тестану, может оно и работает ) давно не тестил
- не, не пашет
- Ааа так это легко. Сейчас гляну у себя, там в модуле графа нужно чутка поменять.

Main message:
как?)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как?)

--

## My telegram message #81966
**Time:** 10.12.2020 22:29:12 UTC+05:00
**Link:** https://t.me/nest_ru/81966

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не, не пашет
- Ааа так это легко. Сейчас гляну у себя, там в модуле графа нужно чутка поменять.
- как?)
- Дай мне 10 достать ноут

Main message:
ок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ок

--

## My telegram message #81968
**Time:** 10.12.2020 22:39:50 UTC+05:00
**Link:** https://t.me/nest_ru/81968

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- как?)
- Дай мне 10 достать ноут
- ок
- Слушай я сейчас попробовал и все работает нормально без настроек лишних. Или я вас не понял

Main message:
ну у тя ошибки дто класс валидатора выходят?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну у тя ошибки дто класс валидатора выходят?

--

## My telegram message #81970
**Time:** 10.12.2020 22:40:15 UTC+05:00
**Link:** https://t.me/nest_ru/81970

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ок
- Слушай я сейчас попробовал и все работает нормально без настроек лишних. Или я вас не понял
- ну у тя ошибки дто класс валидатора выходят?
- Аааа, не, стоп. Я понял

Main message:
когда мутацию делаем чтобы ругалось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда мутацию делаем чтобы ругалось

--

## My telegram message #81973
**Time:** 10.12.2020 22:56:54 UTC+05:00
**Link:** https://t.me/nest_ru/81973

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну у тя ошибки дто класс валидатора выходят?
- Аааа, не, стоп. Я понял
- когда мутацию делаем чтобы ругалось
- Слушай да ты прав, я попробовал сделать nullable: false и правда срабатывает сразу граф... Но чем мне кажется это правильным.

Main message:
а когда нулайбл тру то дто да?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а когда нулайбл тру то дто да?

--

## My telegram message #81976
**Time:** 10.12.2020 22:58:04 UTC+05:00
**Link:** https://t.me/nest_ru/81976

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- когда мутацию делаем чтобы ругалось
- Слушай да ты прав, я попробовал сделать nullable: false и правда срабатывает сразу граф... Но чем мне кажется это правильным.
- а когда нулайбл тру то дто да?
- ага

Main message:
с нулом все понтяно, затык именно если вложенный обьект не правильный например и он не пройдет граф валидации и покажет текстовую ошибку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с нулом все понтяно, затык именно если вложенный обьект не правильный например и он не пройдет граф валидации и покажет текстовую ошибку

--

## My telegram message #81982
**Time:** 10.12.2020 23:50:40 UTC+05:00
**Link:** https://t.me/nest_ru/81982

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ага
- с нулом все понтяно, затык именно если вложенный обьект не правильный например и он не пройдет граф валидации и покажет текстовую ошибку
- Пока что пофиг, не нужно было ни разу пока что что бы nest раньше проверял
- 😂

Main message:
можно метадаты которые декораторы навешивают нестовые вытащить и в настройках графа при установке контекста достать пайлоад который передаем и метод, птом по вытащенным метадатам найти метод мутации который дергаем и взять дто класс и внутри установки контекста произвести валидацию

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно метадаты которые декораторы навешивают нестовые вытащить и в настройках графа при установке контекста достать пайлоад который передаем и метод, птом по вытащенным метадатам найти метод мутации который дергаем и взять дто класс и внутри установки контекста произвести валидацию

--

## My telegram message #82049
**Time:** 11.12.2020 18:31:33 UTC+05:00
**Link:** https://t.me/nest_ru/82049

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Обрабатывается ли param[subparam] как param.subparam, или как "param[subparam]"
- как?
- https://typeorm.io/#/select-query-builder/using-subqueries
- вот вот. Нашел для селекта. const posts = await connection .createQueryBuilder() .select(" post.id ", "id") .addSelect(subQuery => { return subQuery .select(" user.name ", "name") .from(User, "user") .limit(1); }, "name") .from(Post, "post") .getRawMany();

Main message:
https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/entities/project.entity.ts#L77  https://github.com/rucken/todo-nestjs/blob/e8ac45dd1ccaf76d2dce0cbc6174364ca046427a/libs/rucken/todo-nestjs/src/services/projects.service.ts#L115

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/entities/project.entity.ts#L77  https://github.com/rucken/todo-nestjs/blob/e8ac45dd1ccaf76d2dce0cbc6174364ca046427a/libs/rucken/todo-nestjs/src/services/projects.service.ts#L115

--

## My telegram message #82082
**Time:** 11.12.2020 19:16:12 UTC+05:00
**Link:** https://t.me/nest_ru/82082

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
в то время было нет, сейчас может и да, но раньше асинк авайт когда юзаешь всегда надо было в тай катч оборачивать, если несколько авайтов то каждый чтобы понять че да как, это одна из главных причин почему ушел на rxjs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в то время было нет, сейчас может и да, но раньше асинк авайт когда юзаешь всегда надо было в тай катч оборачивать, если несколько авайтов то каждый чтобы понять че да как, это одна из главных причин почему ушел на rxjs

--

## My telegram message #82090
**Time:** 11.12.2020 19:25:29 UTC+05:00
**Link:** https://t.me/nest_ru/82090

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Согласен на повод контроллеров и сервисов.
- +
- в то время было нет, сейчас может и да, но раньше асинк авайт когда юзаешь всегда надо было в тай катч оборачивать, если несколько авайтов то каждый чтобы понять че да как, это одна из главных причин почему ушел на rxjs
- Ах вот, ***, в чем дело. Я и думаю, почему у меня асинхронные вызовы исключения не кидают

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #82095
**Time:** 11.12.2020 19:28:03 UTC+05:00
**Link:** https://t.me/nest_ru/82095

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в то время было нет, сейчас может и да, но раньше асинк авайт когда юзаешь всегда надо было в тай катч оборачивать, если несколько авайтов то каждый чтобы понять че да как, это одна из главных причин почему ушел на rxjs
- Ах вот, ***, в чем дело. Я и думаю, почему у меня асинхронные вызовы исключения не кидают
- да
- Мда...

Main message:
в шарпе также вроде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в шарпе также вроде

--

## My telegram message #82100
**Time:** 11.12.2020 19:28:45 UTC+05:00
**Link:** https://t.me/nest_ru/82100

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- Мда...
- в шарпе также вроде
- Это ж в коде как-то так себе выглядит весьма

Main message:
ну трай катч в яве писал всегда и везде)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну трай катч в яве писал всегда и везде)))

--

## My telegram message #82104
**Time:** 11.12.2020 19:30:24 UTC+05:00
**Link:** https://t.me/nest_ru/82104

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в шарпе также вроде
- Это ж в коде как-то так себе выглядит весьма
- ну трай катч в яве писал всегда и везде)))
- А я на js/ts не пишу) Пет-проект один запилил и всё. Я на php и go пилю.

Main message:
на пхп вроде нет асинк авайт, го вообще странный язык, там вообще ничего нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на пхп вроде нет асинк авайт, го вообще странный язык, там вообще ничего нет

--

## My telegram message #82119
**Time:** 11.12.2020 19:38:05 UTC+05:00
**Link:** https://t.me/nest_ru/82119

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Работа с сторонними сервисами в множественном числе. Обработка очень множественного числа прайсов поставщиков. Обработка очень большого числа товаров из 1с...
- Вот как раз всё подобное молотилово я на Go пилю
- Демонами?
- Да, но не только. На Go можно некоторые эндпоинты реализовывать, если нужно

Main message:
через крон жоб делал это на пхп, контроллер просто кидал в базу данные, по крону запускался метод и обрабатывал данные, факт запуска в майскл хранил чтобы два обработчик не тусили

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через крон жоб делал это на пхп, контроллер просто кидал в базу данные, по крону запускался метод и обрабатывал данные, факт запуска в майскл хранил чтобы два обработчик не тусили

--

## My telegram message #82145
**Time:** 11.12.2020 20:51:00 UTC+05:00
**Link:** https://t.me/nest_ru/82145

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А где про это почитать можно?

Main message:
хз, руками напоролся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хз, руками напоролся

--

## My telegram message #82154
**Time:** 11.12.2020 21:01:56 UTC+05:00
**Link:** https://t.me/nest_ru/82154

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Плохо

Main message:
ну как будто нормально все ща, с тайпорм помню были именно баги с этим трай катч

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну как будто нормально все ща, с тайпорм помню были именно баги с этим трай катч

--

