## My telegram message #254298
**Time:** 01.09.2023 14:18:04 UTC+05:00
**Link:** https://t.me/nest_ru/254298

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
я просто создаю апп по nx и все, и птом наполняю его сам

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я просто создаю апп по nx и все, и птом наполняю его сам

--

## My telegram message #254304
**Time:** 01.09.2023 14:36:30 UTC+05:00
**Link:** https://t.me/nest_ru/254304

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если без воды, могу так вопрос сформулировать: Допустимо ли переносить часть логики авторизации в целевые модули, содержащие сабжект, оставляя в auth модуле только базовые примитивы, гуарды и т.п.?
- Да
- я просто создаю апп по nx и все, и птом наполняю его сам
- сложно сложно...

Main message:
ага, делаешь как могешь)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, делаешь как могешь)

--

## My telegram message #254352
**Time:** 01.09.2023 21:41:33 UTC+05:00
**Link:** https://t.me/nest_ru/254352

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- типо интеграция какая то?
- Введи "онлайн чат с клиентом виджет" и получишь примерно 900 разных облачных решений. Спокойно продолжай пилить фичи продукта. Оставь маркетинг маркетолухам
- Мне понравился сервис Bachata )
- Опробовал, прикольная штука, осталось понять на какие параметры стоит опираться, и как правильно создавать эти нагрузочные тесты.

Main message:
1) Удали всё модули, оставь только один app.module 2) Разберись с диай неста 3) Используй форвард реф 4) Используй глобал декоратор

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

1) Удали всё модули, оставь только один app.module 2) Разберись с диай неста 3) Используй форвард реф 4) Используй глобал декоратор

--

## My telegram message #254357
**Time:** 01.09.2023 21:55:36 UTC+05:00
**Link:** https://t.me/nest_ru/254357

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мне понравился сервис Bachata )
- Опробовал, прикольная штука, осталось понять на какие параметры стоит опираться, и как правильно создавать эти нагрузочные тесты.
- 1) Удали всё модули, оставь только один app.module 2) Разберись с диай неста 3) Используй форвард реф 4) Используй глобал декоратор
- Предлагаю — убрать User из импортов AppModule — убрать UsersService из провайдеров AppModule — убрать UsersController из контроллеров AppModule — перетащить UserModule, чтобы в импорте был после TypeOrmModule

Main message:
скинь юзер модуль текстом, поправлю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

скинь юзер модуль текстом, поправлю

--

## My telegram message #254359
**Time:** 01.09.2023 21:56:53 UTC+05:00
**Link:** https://t.me/nest_ru/254359

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 1) Удали всё модули, оставь только один app.module 2) Разберись с диай неста 3) Используй форвард реф 4) Используй глобал декоратор
- Предлагаю — убрать User из импортов AppModule — убрать UsersService из провайдеров AppModule — убрать UsersController из контроллеров AppModule — перетащить UserModule, чтобы в импорте был после TypeOrmModule
- скинь юзер модуль текстом, поправлю
- import { Module } from '@nestjs/common'; import { UsersService } from './users.service'; import { TypeOrmModule } from '@nestjs/typeorm' import { UsersController } from './users.controller' import { User } from './users.entity' import { ConfigService } from '@nestjs/config' @Module({ imports: [], providers: [UsersService], controllers: [UsersController], }) export class UsersModule {}

Main message:
ентити где

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ентити где

--

## My telegram message #254361
**Time:** 01.09.2023 21:57:34 UTC+05:00
**Link:** https://t.me/nest_ru/254361

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- скинь юзер модуль текстом, поправлю
- import { Module } from '@nestjs/common'; import { UsersService } from './users.service'; import { TypeOrmModule } from '@nestjs/typeorm' import { UsersController } from './users.controller' import { User } from './users.entity' import { ConfigService } from '@nestjs/config' @Module({ imports: [], providers: [UsersService], controllers: [UsersController], }) export class UsersModule {}
- ентити где
- import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, BaseEntity } from 'typeorm'; @Entity({ name: 'users' }) export class User extends BaseEntity{ @PrimaryGeneratedColumn() id: number; @Column({ unique: true, }) username: string; @Column() socket_id: string; @Column() password: string; @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }) created_at: Date; @DeleteDateColumn() deleted_at: Date; }

Main message:
у тя на скрине фор фича была, а текстом нет уже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя на скрине фор фича была, а текстом нет уже

--

## My telegram message #254363
**Time:** 01.09.2023 21:57:48 UTC+05:00
**Link:** https://t.me/nest_ru/254363

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ентити где
- import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, BaseEntity } from 'typeorm'; @Entity({ name: 'users' }) export class User extends BaseEntity{ @PrimaryGeneratedColumn() id: number; @Column({ unique: true, }) username: string; @Column() socket_id: string; @Column() password: string; @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }) created_at: Date; @DeleteDateColumn() deleted_at: Date; }
- у тя на скрине фор фича была, а текстом нет уже
- Тут forFeature нет)

Main message:
добавь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

добавь

--

## My telegram message #254366
**Time:** 01.09.2023 21:59:07 UTC+05:00
**Link:** https://t.me/nest_ru/254366

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя на скрине фор фича была, а текстом нет уже
- Тут forFeature нет)
- добавь
- лол работаем)

Main message:
рано радуешся)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

рано радуешся)

--

## My telegram message #254378
**Time:** 01.09.2023 22:57:04 UTC+05:00
**Link:** https://t.me/nest_ru/254378

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- как лучше всего писать документацию к api?
- Ребят, вопрос про handlebars. можно как то указать путь для {{ > partial-template }} из какого то другого места, которое не прописано в конфиге что то типо вот такого {{ > ( lookup ../some/dir/ partial-template ) }}
- заюзай уж реакт
- перепробовал вариантов 8 наверное

Main message:
Ты же можешь туда свою функцию закинуть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты же можешь туда свою функцию закинуть

--

## My telegram message #254476
**Time:** 03.09.2023 17:36:37 UTC+05:00
**Link:** https://t.me/nest_ru/254476

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- извините что не по теме, но возможно есть такие же чаты, но по Express?

Main message:
https://t.me/nodejs_ru

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nodejs_ru

--

## My telegram message #254496
**Time:** 03.09.2023 21:06:39 UTC+05:00
**Link:** https://t.me/nest_ru/254496

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это звучит очень хрупко, лучше поясни проблему на доменном уровне, тебе подскажут как грамотней сделать
- всем привет. подключился к бд, создал ентити, а таблица в БД не создается.
- datEbase на database
- почти час уебал Спасибо огромное

Main message:
Этот тайп орм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Этот тайп орм

--

## My telegram message #254532
**Time:** 04.09.2023 00:02:23 UTC+05:00
**Link:** https://t.me/nest_ru/254532

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Этот тайп орм
- Всем привет, кто может помочь, разбираюсь с внешними и внутренними ключами, есть две таблицы, юзеры и компания, при создания юзеров я так же создаю компанию, добавил ключи но пишет ошибку Naming collision between attribute 'companyId' and association 'companyId' on model User. To remedy this, change either foreignKey or as in your association definition
- А чего у тебя в company есть Id и есть companyId?
- здраствуйте всем, я не очень опытный программист и у меня возникла кое какая проблема. И так расскажу хронологию событий и как я получил ошибку которую немогу исправить. Работаю я в nestjs, создал все таблицы круды, вдрун таблицы начали выдавать такую ошибку (фотка 1), и как было написано я добавил JwtService в каждый модуль провайдеров и все начало работать. НО когда я начал писать Guard все опять начало выдавать ошибку(фотка 2) и показывать что секретный ключ от environment не найдена хотя я указываю секрет прямо внутри jwtService.verify() Вот сам проект:  https://github.com/Savesh1508/clothes-shop-errors-help.git

Main message:
не так просто на это ответить, ну вот решения  https://t.me/nest_ru/254352

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не так просто на это ответить, ну вот решения  https://t.me/nest_ru/254352

--

## My telegram message #254536
**Time:** 04.09.2023 00:10:07 UTC+05:00
**Link:** https://t.me/nest_ru/254536

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- здраствуйте всем, я не очень опытный программист и у меня возникла кое какая проблема. И так расскажу хронологию событий и как я получил ошибку которую немогу исправить. Работаю я в nestjs, создал все таблицы круды, вдрун таблицы начали выдавать такую ошибку (фотка 1), и как было написано я добавил JwtService в каждый модуль провайдеров и все начало работать. НО когда я начал писать Guard все опять начало выдавать ошибку(фотка 2) и показывать что секретный ключ от environment не найдена хотя я указываю секрет прямо внутри jwtService.verify() Вот сам проект:  https://github.com/Savesh1508/clothes-shop-errors-help.git
- не так просто на это ответить, ну вот решения  https://t.me/nest_ru/254352
- Shared Module В корневом модуле закомментил, зато везде понапихал
- да я использовал и с ним

Main message:
У тебя скорее всего разные инстансы два сервиса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тебя скорее всего разные инстансы два сервиса

--

## My telegram message #254540
**Time:** 04.09.2023 00:13:22 UTC+05:00
**Link:** https://t.me/nest_ru/254540

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Shared Module В корневом модуле закомментил, зато везде понапихал
- да я использовал и с ним
- У тебя скорее всего разные инстансы два сервиса
- вот гит с офиц доки  https://github.com/nestjs/nest/tree/master/sample/19-auth-jwt/src

Main message:
Основная проблема как раз в диай, то что не понимаешь как он работает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Основная проблема как раз в диай, то что не понимаешь как он работает

--

## My telegram message #254600
**Time:** 04.09.2023 13:31:27 UTC+05:00
**Link:** https://t.me/nest_ru/254600

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Подскажите, в что значит ошибка? Она возникает при обращении к бд typeorm
- не запровайдил модель в forFeature
- Модель провайдить можно в модуле с сервисом?
- Всем привет,  throw new HttpException() ломает рантайм приложения? Если хочется этого избежать, то тогда заменяем на try-catch +  console.error() ?

Main message:
this.logger.error(err, err.stack)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

this.logger.error(err, err.stack)

--

## My telegram message #254603
**Time:** 04.09.2023 14:03:20 UTC+05:00
**Link:** https://t.me/nest_ru/254603

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Модель провайдить можно в модуле с сервисом?
- Всем привет,  throw new HttpException() ломает рантайм приложения? Если хочется этого избежать, то тогда заменяем на try-catch +  console.error() ?
- this.logger.error(err, err.stack)
- @KaufmanEndy Подскажи пожалуйста как можно корректно собрать модуль чтобы не было циркулярок Есть основной сервис src/module/main.service.ts Там обычный инжектабл сервис В его конструкторе создаются субсервисы таким образом constructor(){ this.subservice1 = new SubService1() this.subservice2 = new SubService2() } суб сервисы src/module/services/... Теперь мне нужно чтобы все субсервисы наследовались от главного сервиса, чтобы каждый субсервис имел доступ ко всем субсервисам. Типо такого (но это не работает) class SubService2 extends MainService { someMethod() { return this.subservice1.someMethodOfSvc1() } } Как такое правильно разрулить?

Main message:
лучше явно да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше явно да

--

## My telegram message #254605
**Time:** 04.09.2023 14:04:46 UTC+05:00
**Link:** https://t.me/nest_ru/254605

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- this.logger.error(err, err.stack)
- @KaufmanEndy Подскажи пожалуйста как можно корректно собрать модуль чтобы не было циркулярок Есть основной сервис src/module/main.service.ts Там обычный инжектабл сервис В его конструкторе создаются субсервисы таким образом constructor(){ this.subservice1 = new SubService1() this.subservice2 = new SubService2() } суб сервисы src/module/services/... Теперь мне нужно чтобы все субсервисы наследовались от главного сервиса, чтобы каждый субсервис имел доступ ко всем субсервисам. Типо такого (но это не работает) class SubService2 extends MainService { someMethod() { return this.subservice1.someMethodOfSvc1() } } Как такое правильно разрулить?
- лучше явно да
- Просто я пытаюсь сделать либу чтобы ее инжектить в модули бизнес логики

Main message:
какая то функциональная либа?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

какая то функциональная либа?

--

## My telegram message #254610
**Time:** 04.09.2023 14:09:17 UTC+05:00
**Link:** https://t.me/nest_ru/254610

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- лучше явно да
- Просто я пытаюсь сделать либу чтобы ее инжектить в модули бизнес логики
- какая то функциональная либа?
- Основной компонент бизнес логики который инициализируется как минимум в двух модулях БЛ и принимает конкретную конфигурацию

Main message:
свой диай в нест диай хочешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

свой диай в нест диай хочешь

--

## My telegram message #254621
**Time:** 04.09.2023 14:39:39 UTC+05:00
**Link:** https://t.me/nest_ru/254621

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Не знаю разницу между ними, чтобы сервисы работали только с той конфигурацией которая была создана при инициализации компонента, и при этом в системе может быть множество модулей которые используют этот компонент но каждый со свой конфигурацией.

Main message:
ФорФича статик метод сделай в модуле, и внутри создавай провайдер с рандомным значением, чтобы разные фор фича создавали свои экземпляры внутрянки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ФорФича статик метод сделай в модуле, и внутри создавай провайдер с рандомным значением, чтобы разные фор фича создавали свои экземпляры внутрянки

--

## My telegram message #254623
**Time:** 04.09.2023 14:46:21 UTC+05:00
**Link:** https://t.me/nest_ru/254623

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А зачем сервисы переиспользуешь? Ради предметной логики? Или ради апликационной?
- Не знаю разницу между ними, чтобы сервисы работали только с той конфигурацией которая была создана при инициализации компонента, и при этом в системе может быть множество модулей которые используют этот компонент но каждый со свой конфигурацией.
- ФорФича статик метод сделай в модуле, и внутри создавай провайдер с рандомным значением, чтобы разные фор фича создавали свои экземпляры внутрянки
- Можешь дать ссылку на пример кокойто?

Main message:
неа, когда нить я напишу пост про все возможные использования диай в несте, пока некогда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа, когда нить я напишу пост про все возможные использования диай в несте, пока некогда

--

## My telegram message #254625
**Time:** 04.09.2023 14:58:37 UTC+05:00
**Link:** https://t.me/nest_ru/254625

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- У сущности profile создала fk и потом при стягивании profile в ключе user вся сущность User. Это нормальная практика ? Просто привыкла на expresse что есть всего лишь userId и все

Main message:
этим можно управлять поищи про  typeorm eager

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

этим можно управлять поищи про  typeorm eager

--

## My telegram message #254925
**Time:** 06.09.2023 10:23:20 UTC+05:00
**Link:** https://t.me/nest_ru/254925

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Как и где принято хранить всякие файловые артефакты приложения (логи, бэкапы, etc) в контексте использования docker?

Main message:
Волюмы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Волюмы

--

## My telegram message #254929
**Time:** 06.09.2023 10:26:33 UTC+05:00
**Link:** https://t.me/nest_ru/254929

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так главное в постмане и в curl ошибка прилетает, а на реакт нейтив нет

Main message:
Там свой хттп клиент же, про него поищи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там свой хттп клиент же, про него поищи

--

## My telegram message #254932
**Time:** 06.09.2023 10:27:44 UTC+05:00
**Link:** https://t.me/nest_ru/254932

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Там свой хттп клиент же, про него поищи

Main message:
У меня рест был бэк при реакт нативе, там норм было, с графом не писал уже мобилки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня рест был бэк при реакт нативе, там норм было, с графом не писал уже мобилки

--

## My telegram message #254958
**Time:** 06.09.2023 14:05:27 UTC+05:00
**Link:** https://t.me/nest_ru/254958

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Я использую NestJS и  Socket.io , а так же модуль cluster для масштабирования нод. После handshake сокет падает с ошибкой "Session ID unknown». Я понимаю что причина скорее всего в том, что после хенджшейка создается сессия например на ноде 1, а дальше устанавливается WS соединение с нодой 2. И я в лютом затупе как это исправить. В доке сокета указано что нужно включить sticky-session но я что-то дико запутался

Main message:
я такую штуку не масштабирую, можно ее вытащить в мс и не масштабировать, а монолит смасштабировать, связь между мс и монолитом через очередь пока не дошли проекты до момента когда нужно масштабировать вс сервер)) дойдут буду думать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я такую штуку не масштабирую, можно ее вытащить в мс и не масштабировать, а монолит смасштабировать, связь между мс и монолитом через очередь пока не дошли проекты до момента когда нужно масштабировать вс сервер)) дойдут буду думать

--

## My telegram message #254962
**Time:** 06.09.2023 14:07:08 UTC+05:00
**Link:** https://t.me/nest_ru/254962

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно и nginx да, на проде как трафик на прилу будет идти, не напрямую же? Еще как вариант, насколько я знаю в docker-compose есть скейлинг и балансер
- я такую штуку не масштабирую, можно ее вытащить в мс и не масштабировать, а монолит смасштабировать, связь между мс и монолитом через очередь пока не дошли проекты до момента когда нужно масштабировать вс сервер)) дойдут буду думать
- Просто чтобы не держать балансировку на уровне приложения, в любом случае потом придется унести, если трафик пойдет хороший
- Дело в том что это и задумывается как МС. Это сервис нотификаций который читает шины и отсылает юзеру сообщения

Main message:
ну пусть в одном будет, или уже нагрузка есть?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну пусть в одном будет, или уже нагрузка есть?

--

## My telegram message #254965
**Time:** 06.09.2023 14:08:22 UTC+05:00
**Link:** https://t.me/nest_ru/254965

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Дело в том что это и задумывается как МС. Это сервис нотификаций который читает шины и отсылает юзеру сообщения
- ну пусть в одном будет, или уже нагрузка есть?
- Еще до прода не дошел, но к сожалению четко поставили задачу о масштабировании.
- о каких цифрах речь?

Main message:
ему не важно, таска же, нужно решать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ему не важно, таска же, нужно решать

--

## My telegram message #254968
**Time:** 06.09.2023 14:12:45 UTC+05:00
**Link:** https://t.me/nest_ru/254968

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Еще до прода не дошел, но к сожалению четко поставили задачу о масштабировании.
- о каких цифрах речь?
- ему не важно, таска же, нужно решать
- Так что решать то, одно дело если там будет 100 юзеров в пике, другое когда 100к

Main message:
через кубер можно решить и пробы, чтобы поды забивались и не принимали новые подключения, и новые коннекты пойдут на следующий под

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через кубер можно решить и пробы, чтобы поды забивались и не принимали новые подключения, и новые коннекты пойдут на следующий под

--

## My telegram message #254971
**Time:** 06.09.2023 14:14:23 UTC+05:00
**Link:** https://t.me/nest_ru/254971

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну по сути если у тебя ивенты прилетает через какой то брокер, то у тебя поднимится 4 инстанса твоего nestjs с вебсокетами и все они будут слушать одну и ту же очередь брокера. Человек будет делать подписку на 1 вебсокет эндпоинт через nginx, а сам nginx будет делать балансировку на твои бекенды через upstream websocket_backend { least_conn; server 1; server 2; }

Main message:
у него рукопожатие не проходит, так как запросы к разным инстансам летят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у него рукопожатие не проходит, так как запросы к разным инстансам летят

--

## My telegram message #254977
**Time:** 06.09.2023 14:32:31 UTC+05:00
**Link:** https://t.me/nest_ru/254977

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у него рукопожатие не проходит, так как запросы к разным инстансам летят
- Но в этом и суть, сделать 1 единый эндпоинт, а не коннектится к каждому инстансу отдельно
- Отличный план, осталось только понять как сообщения из брокера будут попадать на нужный инстанс где конекшен щас висит
- Вот я тоже не делал это с ВС еще. и столкнулся с такой проблемой

Main message:
я вспомнил, делал я такую штуку но у меня там не сокет ио был, а просто вс, проблем с рукопожатием не было, возможно проблема с сокет ио

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я вспомнил, делал я такую штуку но у меня там не сокет ио был, а просто вс, проблем с рукопожатием не было, возможно проблема с сокет ио

--

## My telegram message #255000
**Time:** 06.09.2023 14:55:01 UTC+05:00
**Link:** https://t.me/nest_ru/255000

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так фильтр не ловит
- ну так у тебя все вводные есть же для реализации
- Ну можно в своём сервисе сделать так как выше. я поставил определение функции
- вот я сделал фильтр:  @Catch(AxiosError) export class AxiosExceptionFilter implements ExceptionFilter { catch(exception: AxiosError, host: ArgumentsHost) { console.log(`Поймал AxiosError`); } } AxiosError не поймал

Main message:
Интерцептор для аксиос напиши и пусть он выкидывает ошибку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Интерцептор для аксиос напиши и пусть он выкидывает ошибку

--

## My telegram message #255004
**Time:** 06.09.2023 14:56:35 UTC+05:00
**Link:** https://t.me/nest_ru/255004

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Интерцептор для аксиос напиши и пусть он выкидывает ошибку
- а, понял. переопределить реквест
- Ага. Потому что он, это не он. Попробуй как выше. catch (e: any) { if (axios.isAxiosError(e)) {
- это лучше, чем переопределить реквест?

Main message:
ну а зачем придумывать то что уже есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну а зачем придумывать то что уже есть

--

## My telegram message #255008
**Time:** 06.09.2023 14:57:36 UTC+05:00
**Link:** https://t.me/nest_ru/255008

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://dev.to/blminami/nestjs-intercept-axios-responses-and-throw-built-in-http-errors-for-the-exception-filter-1dd3 вот это?

Main message:
о даже пост есть, да чет похожее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

о даже пост есть, да чет похожее

--

## My telegram message #255014
**Time:** 06.09.2023 15:00:58 UTC+05:00
**Link:** https://t.me/nest_ru/255014

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- up

Main message:
не юзаю монгу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не юзаю монгу

--

## My telegram message #255104
**Time:** 07.09.2023 07:30:07 UTC+05:00
**Link:** https://t.me/nest_ru/255104

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Коллеги подскажите как правильнее строить rest api? Есть сущности - Provider (поствщик услуг) - Service (услуга) - Form (форма) У провайдера может быть множество услуг. У услуги может быть множество форм. Как правильно строить ендпоинты например для форм? Например чтобы создать форму можно делать так:  POST /api/providers/{providerId}/services/{serviceId}/forms  или вот так:  POST /api/forms  и передавать в  body параметры  serviceId и  providerId . Начал делать по первому шаблону, а потом уперся в проблему - если надо просто получить форму, надо делать такой ендпоинт:  GET /api/providers/{providerId}/services/{serviceId}/forms/{formId}  В этом случае параметры  providerId и  serviceId являются избыточными, т.к. для получения формы достаточно знать только  id этой самой формы. Подскажите кто как строит такие ендпоинты?

Main message:
Каждый пилит как хочет, рест он в каждом проекте по разному воспринимается, пиши так чтобы было удобно работать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Каждый пилит как хочет, рест он в каждом проекте по разному воспринимается, пиши так чтобы было удобно работать

--

## My telegram message #255448
**Time:** 09.09.2023 19:38:19 UTC+05:00
**Link:** https://t.me/nest_ru/255448

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну думаю да, подойдет и хероку, там вряд ли будет сильная нагрузка на бэк
- Привет всем а какой метод лучше с сессии или jwt?
- сессии гибче жвт проще
- Сесси в андроиде есть?

Main message:
да, они есть и в айось 😐

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, они есть и в айось 😐

--

