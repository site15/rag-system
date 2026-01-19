## My telegram message #178963
**Time:** 09.08.2022 08:06:40 UTC+05:00
**Link:** https://t.me/nest_ru/178963

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Чат, уже как-то писал тут, но не получил тогда ответа. У меня очень много опыта в построении GraphQL API, но я очень слабо шарю за best practices в классическом API. Кто может подсказать, какие вообще есть практики по маппингу данных, возвращаемых на бэк? Если у меня одна и та же сущность в разных местах нужна с разным набором вложенных данных? Неужели все это прям в полностью ручном режиме делается?

Main message:
В рест бьют по доменам типа, и так сервисы с данными ближе друг к другу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В рест бьют по доменам типа, и так сервисы с данными ближе друг к другу

--

## My telegram message #178965
**Time:** 09.08.2022 08:40:16 UTC+05:00
**Link:** https://t.me/nest_ru/178965

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- подскажи пож-та, а будешь обновлять? Не запускается с prisma client 3.15.1

Main message:
ща попробую, ну там уже 4.1.0 стоит в оригинале

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ща попробую, ну там уже 4.1.0 стоит в оригинале

--

## My telegram message #178967
**Time:** 09.08.2022 09:57:23 UTC+05:00
**Link:** https://t.me/nest_ru/178967

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у меня как раз будет повод обновится до 4 версии 🙂

Main message:
обновил, там короче терь работа с одним элементом изменилась, мутации поменялись  https://github.com/EndyKaufman/typegraphql-prisma-nestjs-example/commit/6eae305bc48033589bdd819e7529eb2e7e7d00b8#diff-f84be7f8aa8f07f047a30162ac829d67b99334baf31b1f763d8bfe75d28cf225R599

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

обновил, там короче терь работа с одним элементом изменилась, мутации поменялись  https://github.com/EndyKaufman/typegraphql-prisma-nestjs-example/commit/6eae305bc48033589bdd819e7529eb2e7e7d00b8#diff-f84be7f8aa8f07f047a30162ac829d67b99334baf31b1f763d8bfe75d28cf225R599

--

## My telegram message #178970
**Time:** 09.08.2022 10:20:04 UTC+05:00
**Link:** https://t.me/nest_ru/178970

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://prisma.typegraphql.com/docs/advanced/additional-decorators

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://prisma.typegraphql.com/docs/advanced/additional-decorators

--

## My telegram message #178973
**Time:** 09.08.2022 10:22:38 UTC+05:00
**Link:** https://t.me/nest_ru/178973

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- обновил, там короче терь работа с одним элементом изменилась, мутации поменялись  https://github.com/EndyKaufman/typegraphql-prisma-nestjs-example/commit/6eae305bc48033589bdd819e7529eb2e7e7d00b8#diff-f84be7f8aa8f07f047a30162ac829d67b99334baf31b1f763d8bfe75d28cf225R599
- круто, спасибо :)
- https://prisma.typegraphql.com/docs/advanced/additional-decorators
- Я понимаю, что не тему, ну коль вы про призму заговорили. Там можно как-то сделать поле, которое будет показывать номер версии записи? В TypeORM и MikroORM это делалось одним параметром

Main message:
дай ссылку на доку по тайп орм про такое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дай ссылку на доку по тайп орм про такое

--

## My telegram message #178975
**Time:** 09.08.2022 10:26:18 UTC+05:00
**Link:** https://t.me/nest_ru/178975

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://prisma.typegraphql.com/docs/advanced/additional-decorators
- Я понимаю, что не тему, ну коль вы про призму заговорили. Там можно как-то сделать поле, которое будет показывать номер версии записи? В TypeORM и MikroORM это делалось одним параметром
- дай ссылку на доку по тайп орм про такое
- @Property ({ default: 1, version: true })

Main message:
дай ссылку на доку, я не понимаю как орм собирается эту версию в базе хранить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дай ссылку на доку, я не понимаю как орм собирается эту версию в базе хранить

--

## My telegram message #178985
**Time:** 09.08.2022 10:31:18 UTC+05:00
**Link:** https://t.me/nest_ru/178985

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://mikro-orm.io/docs/decorators#property
- Это Optimistic Locking. Видел такое в DevExpress тоже
- Именно!
- В таком схеме lock на таблицу можно не делать официально. Но при этом контролируется затирание данных друг другом.

Main message:
где то давно видел такое тоже да)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

где то давно видел такое тоже да)

--

## My telegram message #178987
**Time:** 09.08.2022 10:32:00 UTC+05:00
**Link:** https://t.me/nest_ru/178987

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Именно!
- В таком схеме lock на таблицу можно не делать официально. Но при этом контролируется затирание данных друг другом.
- где то давно видел такое тоже да)
- Так вот вопрос и был, что в Prisma я такого не нашел

Main message:
ты можешь такое через мидл вар замутить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты можешь такое через мидл вар замутить

--

## My telegram message #178990
**Time:** 09.08.2022 10:32:28 UTC+05:00
**Link:** https://t.me/nest_ru/178990

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- где то давно видел такое тоже да)
- Так вот вопрос и был, что в Prisma я такого не нашел
- ты можешь такое через мидл вар замутить
- Уфф.. Там работы много )).

Main message:
да нет, все просто так то

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да нет, все просто так то

--

## My telegram message #178993
**Time:** 09.08.2022 10:33:21 UTC+05:00
**Link:** https://t.me/nest_ru/178993

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Уфф.. Там работы много )).
- да нет, все просто так то
- Это надо при INSERT тоже вставлять (ну или дефолт выставить). Каждый UPDATE проверять
- Да, могу... просто я думал, что я плохо смотрел

Main message:
мидл вар там общий на все сущности же и в мета дате есть название сущности и тип события делет апдейт или инсерт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мидл вар там общий на все сущности же и в мета дате есть название сущности и тип события делет апдейт или инсерт

--

## My telegram message #178995
**Time:** 09.08.2022 10:34:08 UTC+05:00
**Link:** https://t.me/nest_ru/178995

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это надо при INSERT тоже вставлять (ну или дефолт выставить). Каждый UPDATE проверять
- Да, могу... просто я думал, что я плохо смотрел
- мидл вар там общий на все сущности же и в мета дате есть название сущности и тип события делет апдейт или инсерт
- Сейчас речь про мидвар из призмы?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #178997
**Time:** 09.08.2022 10:35:14 UTC+05:00
**Link:** https://t.me/nest_ru/178997

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мидл вар там общий на все сущности же и в мета дате есть название сущности и тип события делет апдейт или инсерт
- Сейчас речь про мидвар из призмы?
- да
- Не, у меня еще не такое хорошее кунг-фу по ней. Я ее только один день смотрел. Почитаю, спасибо!\

Main message:
вот пример с софт делет  https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware , можно из мидл вар долбанутся в левую табличку через призма клиент и сделать че хочешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот пример с софт делет  https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware , можно из мидл вар долбанутся в левую табличку через призма клиент и сделать че хочешь

--

## My telegram message #179000
**Time:** 09.08.2022 10:46:57 UTC+05:00
**Link:** https://t.me/nest_ru/179000

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а там можно будет как-то получить доступ к di неста из AuthChecker? У меня некоторые права доступа связаны на отношениях сущностей между собой, например если сущность А вступала в контакт с сущностью Б, то только в этом случае разрешить получение определенного поля

Main message:
прям такого нет, есть возможность резать поля из коробки  https://prisma.typegraphql.com/docs/advanced/hiding-field ты можешь написать декоратор который модифицирует входные данные в метод и уберет лишние поля из выборки в зависимости от роли человека или других условий, и потом запустит оригинальный обработчик резолвера

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

прям такого нет, есть возможность резать поля из коробки  https://prisma.typegraphql.com/docs/advanced/hiding-field ты можешь написать декоратор который модифицирует входные данные в метод и уберет лишние поля из выборки в зависимости от роли человека или других условий, и потом запустит оригинальный обработчик резолвера

--

## My telegram message #179006
**Time:** 09.08.2022 11:17:55 UTC+05:00
**Link:** https://t.me/nest_ru/179006

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Так и живем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Так и живем

--

## My telegram message #179008
**Time:** 09.08.2022 11:20:54 UTC+05:00
**Link:** https://t.me/nest_ru/179008

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так и живем

Main message:
Граф как раз же для этого и создавался, так в текущей реальности когда хитрые интерфейсы и ещё несколько типов устройств с разными экранами, рест тупа не вытягивает, это старинная херня, рано или поздно он окончательно умрет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Граф как раз же для этого и создавался, так в текущей реальности когда хитрые интерфейсы и ещё несколько типов устройств с разными экранами, рест тупа не вытягивает, это старинная херня, рано или поздно он окончательно умрет

--

## My telegram message #179026
**Time:** 09.08.2022 11:59:20 UTC+05:00
**Link:** https://t.me/nest_ru/179026

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не понимаю почему быстрый. Должно же быть медленнее, потому что еще дерево зависимостей пересоздается. Не остается side effect это что? Типа ты инжектишь какие-то объекты у которых есть состояние привязанное к http запросу и оно каждый раз сбрасывается?
- Потому что использую в связке с memoization. Да
- И чтобы каждый раз в куче сервисов не дергать бд, оно у тебя где-то закешировано в рамках запроса?
- Да

Main message:
нагрузочное сделай на 1000 запусков, у тя рухнет все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нагрузочное сделай на 1000 запусков, у тя рухнет все

--

## My telegram message #179030
**Time:** 09.08.2022 12:01:44 UTC+05:00
**Link:** https://t.me/nest_ru/179030

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Потому что использую в связке с memoization. Да
- И чтобы каждый раз в куче сервисов не дергать бд, оно у тебя где-то закешировано в рамках запроса?
- Да
- нагрузочное сделай на 1000 запусков, у тя рухнет все

Main message:
докер композ ап

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

докер композ ап

--

## My telegram message #179032
**Time:** 09.08.2022 12:02:03 UTC+05:00
**Link:** https://t.me/nest_ru/179032

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- нагрузочное сделай на 1000 запусков, у тя рухнет все
- докер композ ап
- на проде?

Main message:
ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага

--

## My telegram message #179035
**Time:** 09.08.2022 12:03:07 UTC+05:00
**Link:** https://t.me/nest_ru/179035

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- на проде?
- ага
- легче devops нанять пусть он docker-compose up делает
- на проде всякое бывает. но хлеб у девопсеров не отнимаем. пусь свои шнебернетесы крутят

Main message:
я сам себе девопс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я сам себе девопс

--

## My telegram message #179039
**Time:** 09.08.2022 12:03:56 UTC+05:00
**Link:** https://t.me/nest_ru/179039

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я сам себе девопс
- привык ты один. найди себе девопшеру.
- docker-compose down
- иначе от одиночества будет так ^^^

Main message:
занят девопсер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

занят девопсер

--

## My telegram message #179042
**Time:** 09.08.2022 12:05:49 UTC+05:00
**Link:** https://t.me/nest_ru/179042

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- как же iac?

Main message:
вот пример старинного продовского ямлика  https://github.com/site15/site15.ru/blob/develop/docker/prod/docker-compose.yml оно в коде и лежит все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот пример старинного продовского ямлика  https://github.com/site15/site15.ru/blob/develop/docker/prod/docker-compose.yml оно в коде и лежит все

--

## My telegram message #179044
**Time:** 09.08.2022 12:09:50 UTC+05:00
**Link:** https://t.me/nest_ru/179044

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- занят девопсер
- как же iac?
- вот пример старинного продовского ямлика  https://github.com/site15/site15.ru/blob/develop/docker/prod/docker-compose.yml оно в коде и лежит все
- Молодец - ты переизобрел graphql

Main message:
кстати такие свои мапперы у многих есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кстати такие свои мапперы у многих есть

--

## My telegram message #179066
**Time:** 09.08.2022 14:15:15 UTC+05:00
**Link:** https://t.me/nest_ru/179066

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет не могу понять, что за мапер и как он настраивается есть пример?
- мапинг - это просто фсопоставление полей) А мапер, делает это автоматически на основе созданых тобой правил вот как раз человек и хотел найти бестпрактикс, чтобы взять лучшее для своего проекта, но покачто ничего не найдено)
- plainToInstance
- а кстати, совсем забыл, есть прекрасный мапер для микросервисов  https://www.krakend.io/

Main message:
POST: http://host/users { create:{username:'name',roleId:'222sdsdsd'}, select:{username:true,role:{name:true}} }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

POST: http://host/users { create:{username:'name',roleId:'222sdsdsd'}, select:{username:true,role:{name:true}} }

--

## My telegram message #179068
**Time:** 09.08.2022 14:17:19 UTC+05:00
**Link:** https://t.me/nest_ru/179068

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- plainToInstance
- а кстати, совсем забыл, есть прекрасный мапер для микросервисов  https://www.krakend.io/
- POST: http://host/users { create:{username:'name',roleId:'222sdsdsd'}, select:{username:true,role:{name:true}} }
- Хм А класс-трансформер подходит а этот отряд?

Main message:
маппер не классов а правил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

маппер не классов а правил

--

## My telegram message #179076
**Time:** 09.08.2022 14:53:07 UTC+05:00
**Link:** https://t.me/nest_ru/179076

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Есть индивидуумы, которые начинают джоинить все вложенности в резолве квери, чтобы типа достать все данные, нужные для дерева)0) Типа не резолвить все зависимости по потребности клиента, используя даталоадеры для оптимизации, а просто пытаться всегда все джоинить

Main message:
я так делаю) сперва через просто резолвер полей, потом когда нужно ускорить иду и пишу запрос)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я так делаю) сперва через просто резолвер полей, потом когда нужно ускорить иду и пишу запрос)

--

## My telegram message #179081
**Time:** 09.08.2022 14:56:34 UTC+05:00
**Link:** https://t.me/nest_ru/179081

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Есть индивидуумы, которые начинают джоинить все вложенности в резолве квери, чтобы типа достать все данные, нужные для дерева)0) Типа не резолвить все зависимости по потребности клиента, используя даталоадеры для оптимизации, а просто пытаться всегда все джоинить
- я так делаю) сперва через просто резолвер полей, потом когда нужно ускорить иду и пишу запрос)
- добрый день, поднял в докере pg, пустая база пытаюсь через sequelize использовать методы, но модели, кажется, не загружаются. делал по примеру доки в nest. Чего может не хватать?
- Одним общим запросом ты скорее не ускоришь, а замедлить все можешь, поэтому не стоит

Main message:
я смотрю поля которые нужны фронту и меняю запрос, лишнего не запрашивается) резолверы полей под кэшем так что оно все быстро было, иногда просто приходилось запрос реально менять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я смотрю поля которые нужны фронту и меняю запрос, лишнего не запрашивается) резолверы полей под кэшем так что оно все быстро было, иногда просто приходилось запрос реально менять

--

## My telegram message #179091
**Time:** 09.08.2022 15:32:49 UTC+05:00
**Link:** https://t.me/nest_ru/179091

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- привет, как решить такой момент - использую призму сделал dto  export class UpdateCompanyLegalInfoDto { @IsEnum() subjectType: string; } но в базе subjectType у меня enum и в схеме он прописан: можно ли как-то его вытащить в dto из prismaService?

Main message:
где то там import {anyEnum} from ' @prisma /client'

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

где то там import {anyEnum} from ' @prisma /client'

--

## My telegram message #179098
**Time:** 09.08.2022 15:54:50 UTC+05:00
**Link:** https://t.me/nest_ru/179098

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- прошел в 1 контору на мида, сказали что немного неста и призмы будет. Ну и Go

Main message:
Чекни плиз призму на го, интересен фид бак

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Чекни плиз призму на го, интересен фид бак

--

