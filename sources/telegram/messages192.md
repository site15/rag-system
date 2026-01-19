## My telegram message #207815
**Time:** 20.12.2022 22:32:07 UTC+05:00
**Link:** https://t.me/nest_ru/207815

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Копипащу я, для каждой бд свой призма сервис и модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Копипащу я, для каждой бд свой призма сервис и модуль

--

## My telegram message #207819
**Time:** 20.12.2022 23:38:51 UTC+05:00
**Link:** https://t.me/nest_ru/207819

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет! подскажите, как создаются админы в реальных проектах? пока у меня запускается createAdmins на onModuleInit, но из-за magic strings выглядит очень захардкожено, а куда их сохранить и надо ли вообще не знаю

Main message:
скрипт создания админов в базе запускает сиай перед деплоем, этот скрипт может быть и на жс а может быть как сид миграция и также только из сиай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

скрипт создания админов в базе запускает сиай перед деплоем, этот скрипт может быть и на жс а может быть как сид миграция и также только из сиай

--

## My telegram message #207920
**Time:** 21.12.2022 09:27:40 UTC+05:00
**Link:** https://t.me/nest_ru/207920

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- справедливо)
- Сообщение про актив рекорд и репозиторий все, что я смог из себя выжать адекватного
- а на неадекватном сможешь ?
- Тут вы на сам тип в Свагере влияете

Main message:
Внезапно смог победить проблему при сериализации выходных данных, тип беру из декоратора сваггера 😎 Короче кому надо тот поймет, давно просто парился и по разному решал и наконец-то небольшим кодом вышло (первая реализация, возможны проблемы, ну проект перевел, все тесты прошли успешно, все что лишнее норм режется)  import { ClassSerializerInterceptor, ClassSerializerInterceptorOptions, Injectable, PlainLiteralObject, } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; @Injectable() export class AppClassSerializerInterceptor extends ClassSerializerInterceptor { constructor( protected override readonly reflector: Reflector, defaultOptions?: ClassSerializerInterceptorOptions ) { super(reflector, defaultOptions); } protected override getContextOptions(context) { const responses = Reflect.getMetadata('swagger/apiResponse', context.getHandler()) || {}; const firstCode = Object.keys(responses).filter((key) => +key >= 200)[0]; if (firstCode && responses[firstCode.toString()]?.type) { return { ...this.defaultOptions, type: responses[firstCode.toString()].type, }; } return { ...this.defaultOptions }; } override transformToPlain(plainOrClass, options): PlainLiteralObject { if (options.type && !(plainOrClass instanceof options.type)) { return super.transformToPlain( Object.assign(new options.type(), plainOrClass), options ); } return super.transformToPlain(plainOrClass, options); } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Внезапно смог победить проблему при сериализации выходных данных, тип беру из декоратора сваггера 😎 Короче кому надо тот поймет, давно просто парился и по разному решал и наконец-то небольшим кодом вышло (первая реализация, возможны проблемы, ну проект перевел, все тесты прошли успешно, все что лишнее норм режется)  import { ClassSerializerInterceptor, ClassSerializerInterceptorOptions, Injectable, PlainLiteralObject, } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; @Injectable() export class AppClassSerializerInterceptor extends ClassSerializerInterceptor { constructor( protected override readonly reflector: Reflector, defaultOptions?: ClassSerializerInterceptorOptions ) { super(reflector, defaultOptions); } protected override getContextOptions(context) { const responses = Reflect.getMetadata('swagger/apiResponse', context.getHandler()) || {}; const firstCode = Object.keys(responses).filter((key) => +key >= 200)[0]; if (firstCode && responses[firstCode.toString()]?.type) { return { ...this.defaultOptions, type: responses[firstCode.toString()].type, }; } return { ...this.defaultOptions }; } override transformToPlain(plainOrClass, options): PlainLiteralObject { if (options.type && !(plainOrClass instanceof options.type)) { return super.transformToPlain( Object.assign(new options.type(), plainOrClass), options ); } return super.transformToPlain(plainOrClass, options); } }

--

## My telegram message #208314
**Time:** 23.12.2022 14:49:05 UTC+05:00
**Link:** https://t.me/nest_ru/208314

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну тогда ответ - нет. Платный аккаунт должен быть только один, остальные разработчики должны зарегестрироваться и им нужно дать пермишены
- @KaufmanEndy Привет, ты не думал на счет тредов? Очень большое количество новичков живет в чате, и вероятно было бы проще если бы чат был разделен не на 3 чата, а на 3 треда например) Один основной, второй для новичков и их зеленых вопросов, и третий флудилка)
- он и так разделен уже
- так новички не идут в beginers) они вопросы тут задают) поэтому вопрос про треды задал

Main message:
нужно голосовалку может на это

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужно голосовалку может на это

--

## My telegram message #208332
**Time:** 23.12.2022 16:17:32 UTC+05:00
**Link:** https://t.me/nest_ru/208332

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо, буду пробовать
- Если бы перед вами стояла задача раз в 6 минут что-то делать и при этом это должно быть расширяемым горизонтально, что бы вы использовали?
- mongodb :D
- Ну да если нужно будет скажите - сделаю

Main message:
Пусть всё выхи постоит опрос, в пн можно включить если что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Пусть всё выхи постоит опрос, в пн можно включить если что

--

## My telegram message #208347
**Time:** 23.12.2022 17:30:52 UTC+05:00
**Link:** https://t.me/nest_ru/208347

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я создаю телеграмм бота на  @nestjs /telegraf - у меня производится запрос на стороннее API для получения данных и их вывода. При нажатие на каждую кнопку я проверяю токен который юзер ввёл в начале и этот Bearer Token служит для запроса к другому API. Вопрос - как я могу не дублируя код проверки токена для каждой кнопки, вынести это в одно общее место где проверяется токен для запросов?
- проще мне кажется репозиторий приватный на гитхабе сделать и шэрить его
- Мы репо в гитлабе юзаем в node_modules, и не паримся
- Всем привет! Столкнулся с непонятным поведением приложения при попытке подключиться к новой БД в новом окружении. Буквально пытаюсь подключиться с новыми параметрами доступа и получаю подвисшее на этапе подключения приложение, которое невозможно остановить дебаггером и от которого невозможно получить какой либо аутпут. Может кто-то сталкивался с подобным?

Main message:
евент луп повис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

евент луп повис

--

## My telegram message #208350
**Time:** 23.12.2022 17:31:54 UTC+05:00
**Link:** https://t.me/nest_ru/208350

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мы репо в гитлабе юзаем в node_modules, и не паримся
- Всем привет! Столкнулся с непонятным поведением приложения при попытке подключиться к новой БД в новом окружении. Буквально пытаюсь подключиться с новыми параметрами доступа и получаю подвисшее на этапе подключения приложение, которое невозможно остановить дебаггером и от которого невозможно получить какой либо аутпут. Может кто-то сталкивался с подобным?
- евент луп повис
- Едва ли это поможет, потому что вне зависимости от БД и параметров подключения такое поведение ненормально, но БД от Яндекс Облака, а приложение пробую запускать как локально, так и в поде в облаке

Main message:
ну а че нет то) коннекшен устанавливает некая сишная штука, вот она и зависла

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну а че нет то) коннекшен устанавливает некая сишная штука, вот она и зависла

--

## My telegram message #208612
**Time:** 25.12.2022 16:59:02 UTC+05:00
**Link:** https://t.me/nest_ru/208612

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет, чяднт? почему то не может подключиться к базе postgres в docker, econnreset, база стартует на  0.0.0.0:5432 судя по логам

Main message:
Хост базы db

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Хост базы db

--

## My telegram message #208617
**Time:** 25.12.2022 17:01:05 UTC+05:00
**Link:** https://t.me/nest_ru/208617

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- всем привет, чяднт? почему то не может подключиться к базе postgres в docker, econnreset, база стартует на  0.0.0.0:5432 судя по логам
- Почитай про network в докере. У тебя контейнеры изолированы друг от друга
- Хост базы db
- да

Main message:
хост базы укажи не localhost а db

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хост базы укажи не localhost а db

--

## My telegram message #208620
**Time:** 25.12.2022 17:01:48 UTC+05:00
**Link:** https://t.me/nest_ru/208620

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
разные базы сделай и разные клиенты для каждой базы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

разные базы сделай и разные клиенты для каждой базы

--

## My telegram message #208622
**Time:** 25.12.2022 17:02:48 UTC+05:00
**Link:** https://t.me/nest_ru/208622

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хост базы укажи не localhost а db
- руками можно , архитектура это ручное ограничение
- разные базы сделай и разные клиенты для каждой базы
- плохой совет, констрейны идут лесом с ним, проблемы транхакционных изменений туда же

Main message:
ну он хочет разграничить же, это нужно начинать с уровня базы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну он хочет разграничить же, это нужно начинать с уровня базы

--

## My telegram message #208625
**Time:** 25.12.2022 17:03:05 UTC+05:00
**Link:** https://t.me/nest_ru/208625

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Правилами линтера можешь запретить.

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #208627
**Time:** 25.12.2022 17:03:27 UTC+05:00
**Link:** https://t.me/nest_ru/208627

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну он хочет разграничить же, это нужно начинать с уровня базы
- Правилами линтера можешь запретить.
- )
- архитекрута это некое соглашение

Main message:
я разграничение начинаю с базы делать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я разграничение начинаю с базы делать

--

## My telegram message #208633
**Time:** 25.12.2022 17:05:00 UTC+05:00
**Link:** https://t.me/nest_ru/208633

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
если цель разграничить то и фк не будут уже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если цель разграничить то и фк не будут уже

--

## My telegram message #208639
**Time:** 25.12.2022 17:09:40 UTC+05:00
**Link:** https://t.me/nest_ru/208639

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- лучше задаться вопросом а как быть когда нет орм и ты строишь нативные селекты
- если цель разграничить то и фк не будут уже
- поставил TYPEORM_HOST=db, вроде такие же логи
- ты же включаешь голову и описываешь каждый селект в нужном классе по тому паттерну архитекуры который для себя принял

Main message:
можно еще две схемы призмы сделать и сгенерить два разных призма клиента, они будут смотреть на одну базу, но видеть только часть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно еще две схемы призмы сделать и сгенерить два разных призма клиента, они будут смотреть на одну базу, но видеть только часть

--

## My telegram message #208642
**Time:** 25.12.2022 17:10:25 UTC+05:00
**Link:** https://t.me/nest_ru/208642

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- поставил TYPEORM_HOST=db, вроде такие же логи
- ты же включаешь голову и описываешь каждый селект в нужном классе по тому паттерну архитекуры который для себя принял
- можно еще две схемы призмы сделать и сгенерить два разных призма клиента, они будут смотреть на одну базу, но видеть только часть
- и плодить схемы по числу таблиц)

Main message:
но через raw всеравно будет доступ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

но через raw всеравно будет доступ

--

## My telegram message #208644
**Time:** 25.12.2022 17:10:40 UTC+05:00
**Link:** https://t.me/nest_ru/208644

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно еще две схемы призмы сделать и сгенерить два разных призма клиента, они будут смотреть на одну базу, но видеть только часть
- и плодить схемы по числу таблиц)
- но через raw всеравно будет доступ
- но какая цель я хз

Main message:
да, мутная фигня это все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, мутная фигня это все

--

## My telegram message #208646
**Time:** 25.12.2022 17:10:54 UTC+05:00
**Link:** https://t.me/nest_ru/208646

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- но через raw всеравно будет доступ
- но какая цель я хз
- да, мутная фигня это все
- хочешь порядок в коде - соблюдай

Main message:
хочешь рзделить, раздели нормально через базы или схемы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хочешь рзделить, раздели нормально через базы или схемы

--

## My telegram message #208648
**Time:** 25.12.2022 17:12:10 UTC+05:00
**Link:** https://t.me/nest_ru/208648

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- хочешь порядок в коде - соблюдай

Main message:
ты соблюдаешь но остальные 25 разрабов которые меняются каждые 2 месяца не соблюдают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты соблюдаешь но остальные 25 разрабов которые меняются каждые 2 месяца не соблюдают

--

