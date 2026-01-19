## My telegram message #216137
**Time:** 08.02.2023 17:19:46 UTC+05:00
**Link:** https://t.me/nest_ru/216137

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- господа и дамы пробую переделать авторизацию пользователя с username+password на email + password. Поменял везде "username" на "email", начиная от формы на фронте, заканчивая обращением к БД. Но вылетает ошибка от Guard-a "Missing credentials" В чём может быть дело? может, в passpors.js или ещё где прямо вшито слово user?

Main message:
https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/passport/local.strategy.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/passport/local.strategy.ts

--

## My telegram message #216152
**Time:** 08.02.2023 18:42:32 UTC+05:00
**Link:** https://t.me/nest_ru/216152

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет, а есть тут спецы по nestjs, postgres.. Нужно кое какой бэк сделать, а тут в самом начале уже проблема. Подключил в nestjs -> typeorm, вроде как написал нормально конфиг, создал entity, но в бд он не появляется, когда ввожу команду '\dt' .. ошибок тоже никаких
- Привет как лучше всего создать и занести данные в бд при запуске проекта? В файле миграции создать таблицу и поля со значениями?
- Это ооочень странно. Если из AppModule убрать все контроллеры, то все работает...Как это работает :)
- всем привет. развернул backend на nginx. как закрыть basic auth страницу со свагером? админ говорит, что на уровне приложения делать нужно

Main message:
это он с себя спихивает работу на тебя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это он с себя спихивает работу на тебя

--

## My telegram message #216156
**Time:** 08.02.2023 18:43:27 UTC+05:00
**Link:** https://t.me/nest_ru/216156

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это ооочень странно. Если из AppModule убрать все контроллеры, то все работает...Как это работает :)
- всем привет. развернул backend на nginx. как закрыть basic auth страницу со свагером? админ говорит, что на уровне приложения делать нужно
- это он с себя спихивает работу на тебя
- Ахахахах

Main message:
у меня так  location /admin { auth_basic "Enter your credentials"; auth_basic_user_file /etc/nginx/auth.basic; proxy_redirect off; try_files $uri $uri/ /usr/share/nginx/html/$uri /usr/share/nginx/html/$uri/ /admin/index.html; proxy_intercept_errors on; error_page 404 =200 /admin/index.html; root /usr/share/nginx/html; }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня так  location /admin { auth_basic "Enter your credentials"; auth_basic_user_file /etc/nginx/auth.basic; proxy_redirect off; try_files $uri $uri/ /usr/share/nginx/html/$uri /usr/share/nginx/html/$uri/ /admin/index.html; proxy_intercept_errors on; error_page 404 =200 /admin/index.html; root /usr/share/nginx/html; }

--

## My telegram message #216159
**Time:** 08.02.2023 18:43:45 UTC+05:00
**Link:** https://t.me/nest_ru/216159

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Не правильно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не правильно

--

## My telegram message #216161
**Time:** 08.02.2023 18:44:03 UTC+05:00
**Link:** https://t.me/nest_ru/216161

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня так  location /admin { auth_basic "Enter your credentials"; auth_basic_user_file /etc/nginx/auth.basic; proxy_redirect off; try_files $uri $uri/ /usr/share/nginx/html/$uri /usr/share/nginx/html/$uri/ /admin/index.html; proxy_intercept_errors on; error_page 404 =200 /admin/index.html; root /usr/share/nginx/html; }
- Которая будет пути эксклюдить
- Не правильно
- Убирай роуты и все

Main message:
бейсик это всегда не про приложение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

бейсик это всегда не про приложение

--

## My telegram message #216166
**Time:** 08.02.2023 18:44:45 UTC+05:00
**Link:** https://t.me/nest_ru/216166

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не правильно
- Убирай роуты и все
- бейсик это всегда не про приложение
- Я просто

Main message:
если куча юзеров тогда да там, если один некий админ юзер, то нет смысла затаскивать в бэк эту чепуху

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если куча юзеров тогда да там, если один некий админ юзер, то нет смысла затаскивать в бэк эту чепуху

--

## My telegram message #216172
**Time:** 08.02.2023 18:48:34 UTC+05:00
**Link:** https://t.me/nest_ru/216172

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- бейсик это всегда не про приложение
- Я просто
- если куча юзеров тогда да там, если один некий админ юзер, то нет смысла затаскивать в бэк эту чепуху
- Ааа

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #216175
**Time:** 08.02.2023 18:48:49 UTC+05:00
**Link:** https://t.me/nest_ru/216175

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если куча юзеров тогда да там, если один некий админ юзер, то нет смысла затаскивать в бэк эту чепуху
- Ааа
- да
- Аааа

Main message:
ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага

--

## My telegram message #216184
**Time:** 08.02.2023 18:49:57 UTC+05:00
**Link:** https://t.me/nest_ru/216184

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- Аааа
- ага
- Все, я понял

Main message:
для большинства проектов всякие роли не нужны, нужны юзеры и пару админских методов, чтобы не делать юзерам роли, просто так закрываю и все, в последнее время, кода меньше выходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

для большинства проектов всякие роли не нужны, нужны юзеры и пару админских методов, чтобы не делать юзерам роли, просто так закрываю и все, в последнее время, кода меньше выходит

--

## My telegram message #216192
**Time:** 08.02.2023 18:56:12 UTC+05:00
**Link:** https://t.me/nest_ru/216192

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сделать seed, если Prisma (из файла со значениями)
- забьавно если у тебя вебку не заюзают а запросом на какое-нить админское апи кинут вне роута)
- типа, в лоб зайдут?))
- ну постманом)

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #216199
**Time:** 08.02.2023 18:57:25 UTC+05:00
**Link:** https://t.me/nest_ru/216199

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
там можно настроить всякие способы в нгинкс у меня при каждом деплое меняется пароль и кидается в чат секретный)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там можно настроить всякие способы в нгинкс у меня при каждом деплое меняется пароль и кидается в чат секретный)

--

## My telegram message #216220
**Time:** 08.02.2023 19:00:03 UTC+05:00
**Link:** https://t.me/nest_ru/216220

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
тут прикол не в том что делать роли, то что теперь юзер любой может стать админом, хотя админ это как бы некто кто вне системы и им не так просто стать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тут прикол не в том что делать роли, то что теперь юзер любой может стать админом, хотя админ это как бы некто кто вне системы и им не так просто стать

--

## My telegram message #216229
**Time:** 08.02.2023 19:01:25 UTC+05:00
**Link:** https://t.me/nest_ru/216229

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- тут прикол не в том что делать роли, то что теперь юзер любой может стать админом, хотя админ это как бы некто кто вне системы и им не так просто стать

Main message:
возникают куча левых вопросов и документов по работе с системой, а пароль как на роутере заказчику в одном лице по шабашке гораздо понятнее)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

возникают куча левых вопросов и документов по работе с системой, а пароль как на роутере заказчику в одном лице по шабашке гораздо понятнее)

--

## My telegram message #216234
**Time:** 08.02.2023 19:02:15 UTC+05:00
**Link:** https://t.me/nest_ru/216234

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
можно, но оно не в моменте, удалится но когда не ясно)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно, но оно не в моменте, удалится но когда не ясно)

--

## My telegram message #216242
**Time:** 08.02.2023 19:03:24 UTC+05:00
**Link:** https://t.me/nest_ru/216242

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно, но оно не в моменте, удалится но когда не ясно)
- куча таблиц я бы не делал
- ну тут согласен, звучит костыльно очень и неинклюзивно
- но опять же в одну таблицу

Main message:
ему нужно поле просто завести userId в табличке и все)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ему нужно поле просто завести userId в табличке и все)

--

## My telegram message #216245
**Time:** 08.02.2023 19:03:51 UTC+05:00
**Link:** https://t.me/nest_ru/216245

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну тут согласен, звучит костыльно очень и неинклюзивно
- но опять же в одну таблицу
- ему нужно поле просто завести userId в табличке и все)
- ну хз чет ему не зашло

Main message:
молодой еще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

молодой еще

--

## My telegram message #216256
**Time:** 08.02.2023 19:05:11 UTC+05:00
**Link:** https://t.me/nest_ru/216256

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- но лить тысячи записей в 1 таблицу
- тысячи?)
- а потом чтобы её несколько юзеров дёргали и сортировали бесконечно
- я думал у тебя там 10млн+ и ты паришься)

Main message:
у тя индекс будет по юзерам, это как будто для 1000 юзеров свои таблицы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя индекс будет по юзерам, это как будто для 1000 юзеров свои таблицы

--

## My telegram message #216265
**Time:** 08.02.2023 19:06:57 UTC+05:00
**Link:** https://t.me/nest_ru/216265

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тогда ОК Ильшат WINS
- кликхаус ту же самую реализацию требует что и другие реляционки
- ну потом можно прикрутить, для красоты что типа знаком с этой бедой
- кому это знакомство интересно

Main message:
клик это боль, туда лучше не лезь ваще никогда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

клик это боль, туда лучше не лезь ваще никогда

--

## My telegram message #216273
**Time:** 08.02.2023 19:07:59 UTC+05:00
**Link:** https://t.me/nest_ru/216273

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- клик это боль, туда лучше не лезь ваще никогда
- работодатель может сказать а давайте завтра прикрутим какой-нить тарантул и пофиг знает его команда или нет
- или что там ещё новое модное
- ну я скажу что аэроспайк мне понравился

Main message:
модное  https://trpc.io/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модное  https://trpc.io/

--

## My telegram message #216277
**Time:** 08.02.2023 19:08:50 UTC+05:00
**Link:** https://t.me/nest_ru/216277

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ты серьезно?

Main message:
Он типа мега быстрый, как нить хочу пробнуть, можно выкинуть в него ченить из мсов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Он типа мега быстрый, как нить хочу пробнуть, можно выкинуть в него ченить из мсов

--

## My telegram message #216282
**Time:** 08.02.2023 19:10:11 UTC+05:00
**Link:** https://t.me/nest_ru/216282

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- редис уже попса)
- Он типа мега быстрый, как нить хочу пробнуть, можно выкинуть в него ченить из мсов
- а что есть поновее, получше?))
- смотря для чего)

Main message:
стоп, это же не флуд чат)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

стоп, это же не флуд чат)

--

## My telegram message #216287
**Time:** 08.02.2023 19:15:52 UTC+05:00
**Link:** https://t.me/nest_ru/216287

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://github.com/trpc/trpc/discussions/1504#discussioncomment-4218180 тут пример как внедряли в нест, можно любой код норм в стиле ангулар сделать, я так из реакт ангулар в свое время делал, камиль из экспреса сделал ангулар на ноде - нест, так что можно и trpc как нить дотюнить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/trpc/trpc/discussions/1504#discussioncomment-4218180 тут пример как внедряли в нест, можно любой код норм в стиле ангулар сделать, я так из реакт ангулар в свое время делал, камиль из экспреса сделал ангулар на ноде - нест, так что можно и trpc как нить дотюнить

--

## My telegram message #216289
**Time:** 08.02.2023 19:16:38 UTC+05:00
**Link:** https://t.me/nest_ru/216289

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- стоп, это же не флуд чат)
- да толку плодить чаты
- https://github.com/trpc/trpc/discussions/1504#discussioncomment-4218180 тут пример как внедряли в нест, можно любой код норм в стиле ангулар сделать, я так из реакт ангулар в свое время делал, камиль из экспреса сделал ангулар на ноде - нест, так что можно и trpc как нить дотюнить
- а нафига это надо?

Main message:
скорость

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

скорость

--

## My telegram message #216291
**Time:** 08.02.2023 19:17:04 UTC+05:00
**Link:** https://t.me/nest_ru/216291

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://github.com/trpc/trpc/discussions/1504#discussioncomment-4218180 тут пример как внедряли в нест, можно любой код норм в стиле ангулар сделать, я так из реакт ангулар в свое время делал, камиль из экспреса сделал ангулар на ноде - нест, так что можно и trpc как нить дотюнить
- а нафига это надо?
- скорость
- вот сижу ищу у них на сайте а что это?

Main message:
когда ендпойнт должен например милиард в сек держать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда ендпойнт должен например милиард в сек держать

--

## My telegram message #216331
**Time:** 09.02.2023 09:27:21 UTC+05:00
**Link:** https://t.me/nest_ru/216331

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy подскажи хранить тесты внутри nest package хуета?

Main message:
Главное писать, там по ходу дела разберешся, перемещать никто не мешает же, в либах не должны использоваться process.env и nestjs/config

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Главное писать, там по ходу дела разберешся, перемещать никто не мешает же, в либах не должны использоваться process.env и nestjs/config

--

## My telegram message #216575
**Time:** 10.02.2023 16:40:06 UTC+05:00
**Link:** https://t.me/nest_ru/216575

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- мне кажется или рендерить нестом чёт такая себе затея

Main message:
все так начинали

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все так начинали

--

## My telegram message #216638
**Time:** 10.02.2023 21:10:46 UTC+05:00
**Link:** https://t.me/nest_ru/216638

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- есть еще вопросик господа насклько допустима такая черная магия в несте)  export function TestDecorator(options: { }): MethodDecorator { return function decorator( target: any, _propertyKey: string, descriptor: PropertyDescriptor, ): void { Inject('MATH_SERVICE')(target, 'service'); const method = descriptor.value; descriptor.value = async function wrapper(...args: any[]) { return await method.apply(this, args); }; }; }

Main message:
не проще ли так  https://t.me/nest_ru/160727

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не проще ли так  https://t.me/nest_ru/160727

--

## My telegram message #216652
**Time:** 10.02.2023 21:45:17 UTC+05:00
**Link:** https://t.me/nest_ru/216652

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем ку, кто нибудь apple auth реализовывал на нест?

Main message:
я нет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я нет)

--

## My telegram message #216656
**Time:** 10.02.2023 21:47:16 UTC+05:00
**Link:** https://t.me/nest_ru/216656

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну и я со спринга свалил на го, а потом на ноду. Не вижу ньюансов в этом. Что на яве видел откровенный говнокод, что на го, что либы на ноде приходится просматривать.

Main message:
прослойка между компом и стулом решает да всегда, но на ноду косо еще лет 7 будут сомтреть, очень сложно в джава проекте ноду затащить где 10 джавистов уже 10 лет писали код

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

прослойка между компом и стулом решает да всегда, но на ноду косо еще лет 7 будут сомтреть, очень сложно в джава проекте ноду затащить где 10 джавистов уже 10 лет писали код

--

## My telegram message #216676
**Time:** 10.02.2023 22:02:12 UTC+05:00
**Link:** https://t.me/nest_ru/216676

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #216679
**Time:** 10.02.2023 22:04:16 UTC+05:00
**Link:** https://t.me/nest_ru/216679

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо большое, а условно если использовать di подход самого неста, я в сервисах обращаюсь к призме и достаю данные, передаю в контроллер, а там уже они идут пользователю?
- инжектить ты имел в виду?)
- )
- ну если у тебя круд, то в целом без разницы, но когда не круд, не нужно тащить бизнес логику в контроллеры)

Main message:
я тут чета про призму болтаю по пьяне  https://t.me/nest_random/33671

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тут чета про призму болтаю по пьяне  https://t.me/nest_random/33671

--

## My telegram message #216684
**Time:** 10.02.2023 22:05:11 UTC+05:00
**Link:** https://t.me/nest_ru/216684

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну если у тебя круд, то в целом без разницы, но когда не круд, не нужно тащить бизнес логику в контроллеры)

Main message:
не факт что я в войс это озвучил, ну смысл в том что выносить в сервис только когда это реально нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не факт что я в войс это озвучил, ну смысл в том что выносить в сервис только когда это реально нужно

--

## My telegram message #216688
**Time:** 10.02.2023 22:54:49 UTC+05:00
**Link:** https://t.me/nest_ru/216688

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Не согласен, я просто хорошо помню 2009-10 г js-сёрам сказали, вот мол вам нода - теперь вы на бэке можете быдлокодить и все такие "уря-я", а так как фронтендеров примерно половина из всех прогеров на свете, вот она и попёрла.

Main message:
ты же вообще фронт разраб) ты ща на ангулар или в нест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты же вообще фронт разраб) ты ща на ангулар или в нест

--

## My telegram message #216694
**Time:** 10.02.2023 22:55:30 UTC+05:00
**Link:** https://t.me/nest_ru/216694

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- посмотри в доке неста, как делается импорт модуля и как инжектятся его провайдеры Тебе нужно импортировать модуль призмы, затем заинжектить провайдер, и с ним уже общаться так как будто ты с призмой общаешься
- Не согласен, я просто хорошо помню 2009-10 г js-сёрам сказали, вот мол вам нода - теперь вы на бэке можете быдлокодить и все такие "уря-я", а так как фронтендеров примерно половина из всех прогеров на свете, вот она и попёрла.
- ты же вообще фронт разраб) ты ща на ангулар или в нест
- Я фуллстэк

Main message:
все захотели веб сокеты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все захотели веб сокеты

--

