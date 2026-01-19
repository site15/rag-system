## My telegram message #232767
**Time:** 03.05.2023 00:21:21 UTC+05:00
**Link:** https://t.me/nest_ru/232767

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это точно бест практика...?

Main message:
все нормально на скрине

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все нормально на скрине

--

## My telegram message #232769
**Time:** 03.05.2023 00:24:33 UTC+05:00
**Link:** https://t.me/nest_ru/232769

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это точно бест практика...?
- монгобд и бест практикс...
- все нормально на скрине
- меня немного смутило тройной дискрайб и то что он мокает прототип класса, при этом в самом классе создается доп. метод constructorSpy который просто вызывается внутри constructor и нужен только для мока если так делать ок, то ок

Main message:
возможно этот спай конструктор ниже где то вызывается не весь скрин же тут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

возможно этот спай конструктор ниже где то вызывается не весь скрин же тут

--

## My telegram message #232976
**Time:** 03.05.2023 19:30:40 UTC+05:00
**Link:** https://t.me/nest_ru/232976

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет! подскажите пожалуйста как лучше всего задеплоить проект на nest.js

Main message:
https://dev.to/endykaufman/deploy-nestjs-project-to-vps-with-dokku-31c5

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://dev.to/endykaufman/deploy-nestjs-project-to-vps-with-dokku-31c5

--

## My telegram message #232994
**Time:** 03.05.2023 19:57:29 UTC+05:00
**Link:** https://t.me/nest_ru/232994

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А это докку годится для прод эксплуатации или только для петпроектов или лучше докер?

Main message:
Годится, для простой инфраструктуры где один монолит норм, если мс делать то они отдельными приложениями будут деплоится будут, докку это селфхост хероку, и там тоже доккер есть, можно докер файл самому написать, можно выбрать билд пак для ноджс приложений готовый

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Годится, для простой инфраструктуры где один монолит норм, если мс делать то они отдельными приложениями будут деплоится будут, докку это селфхост хероку, и там тоже доккер есть, можно докер файл самому написать, можно выбрать билд пак для ноджс приложений готовый

--

## My telegram message #232997
**Time:** 03.05.2023 20:36:48 UTC+05:00
**Link:** https://t.me/nest_ru/232997

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- база
- Годится, для простой инфраструктуры где один монолит норм, если мс делать то они отдельными приложениями будут деплоится будут, докку это селфхост хероку, и там тоже доккер есть, можно докер файл самому написать, можно выбрать билд пак для ноджс приложений готовый
- Спасибо.
- docker-compose.yml version: '3' services: rabbitmq: image: rabbitmq:3-management container_name: rabbitmq hostname: rabbitmq volumes: - /var/lib/rabbitmq ports: - '5672:5672' - '15672:15672' env_file: - .env auth: build: context: ./ dockerfile: ./apps/auth/Dockerfile env_file: - .env depends_on: - rabbitmq - postgres volumes: - .:/usr/src/app # any change to base folder should be reflected - /usr/src/app/node_modules command: npm run start:dev auth # overrides CMD from dockerfile api: build: context: ./ dockerfile: ./apps/api/Dockerfile ports: - '4000:5000' env_file: - .env depends_on: - rabbitmq - auth - presence volumes: - .:/usr/src/app # any change to base folder should be reflected - /usr/src/app/node_modules command: npm run start:dev api postgres: image: postgres env_file: - .env ports: - '5432:5432' volumes: - ./db/data:/var/lib/postgresql/data postgres_admin: image: dpage/pgadmin4 depends_on: - postgres env_file: - .env ports: - '15432:80' Dockerfile FROM node WORKDIR /usr/src/app COPY package*.json . RUN npm install COPY . . У меня есть nestjs микросервис, но при внесении каких-либо изменений в файлы(к примеру добавлении какого-то get маршрута) приложении не пересобирается, docker не видит(не вносит) изменения

Main message:
Ну да, копируешь же туда код

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну да, копируешь же туда код

--

## My telegram message #232999
**Time:** 03.05.2023 20:39:46 UTC+05:00
**Link:** https://t.me/nest_ru/232999

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо.
- docker-compose.yml version: '3' services: rabbitmq: image: rabbitmq:3-management container_name: rabbitmq hostname: rabbitmq volumes: - /var/lib/rabbitmq ports: - '5672:5672' - '15672:15672' env_file: - .env auth: build: context: ./ dockerfile: ./apps/auth/Dockerfile env_file: - .env depends_on: - rabbitmq - postgres volumes: - .:/usr/src/app # any change to base folder should be reflected - /usr/src/app/node_modules command: npm run start:dev auth # overrides CMD from dockerfile api: build: context: ./ dockerfile: ./apps/api/Dockerfile ports: - '4000:5000' env_file: - .env depends_on: - rabbitmq - auth - presence volumes: - .:/usr/src/app # any change to base folder should be reflected - /usr/src/app/node_modules command: npm run start:dev api postgres: image: postgres env_file: - .env ports: - '5432:5432' volumes: - ./db/data:/var/lib/postgresql/data postgres_admin: image: dpage/pgadmin4 depends_on: - postgres env_file: - .env ports: - '15432:80' Dockerfile FROM node WORKDIR /usr/src/app COPY package*.json . RUN npm install COPY . . У меня есть nestjs микросервис, но при внесении каких-либо изменений в файлы(к примеру добавлении какого-то get маршрута) приложении не пересобирается, docker не видит(не вносит) изменения
- Ну да, копируешь же туда код
- В плане?Типо у меня есть Dockerfile для каждого из приложений и каждое приложение описывается в docker-compose, но когда я запускаю docker-compose up, и вношу зименеия, то они должны работать в dev режиме и отображать изменеия, но ничего не происходит

Main message:
Есть прод режим, с сбилженным кодом, есть дев режим с ватч для разработки, тебе че надо?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть прод режим, с сбилженным кодом, есть дев режим с ватч для разработки, тебе че надо?

--

## My telegram message #233001
**Time:** 03.05.2023 20:40:09 UTC+05:00
**Link:** https://t.me/nest_ru/233001

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну да, копируешь же туда код
- В плане?Типо у меня есть Dockerfile для каждого из приложений и каждое приложение описывается в docker-compose, но когда я запускаю docker-compose up, и вношу зименеия, то они должны работать в dev режиме и отображать изменеия, но ничего не происходит
- Есть прод режим, с сбилженным кодом, есть дев режим с ватч для разработки, тебе че надо?
- дев

Main message:
https://github.com/site15/site15.ru/blob/develop/devops/docker/dev/docker-compose.yml

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/site15/site15.ru/blob/develop/devops/docker/dev/docker-compose.yml

--

## My telegram message #233028
**Time:** 03.05.2023 21:04:58 UTC+05:00
**Link:** https://t.me/nest_ru/233028

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребят, нужно сделать доступ к базе на уровне строк (RLS). Стек Nest - Sequelize - GraphQL - Postgres. Посоветуйте что нибудь, чёт в инетах не много инфы.

Main message:
Неа, нет таких задач

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Неа, нет таких задач

--

## My telegram message #233031
**Time:** 03.05.2023 21:11:32 UTC+05:00
**Link:** https://t.me/nest_ru/233031

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ммм... беда-беда... )) Пасиб! )

Main message:
https://github.com/franzon/postgres-rls-example У тя один коннект для одного юзера будет, ты готов к этому?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/franzon/postgres-rls-example У тя один коннект для одного юзера будет, ты готов к этому?

--

## My telegram message #233036
**Time:** 03.05.2023 21:18:40 UTC+05:00
**Link:** https://t.me/nest_ru/233036

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Делайте как в 1с, таблица ролей - админ, бухгалтер, модератор, кладовщик. Таблица профилей- бухгалтер с правами модератора (такой профиль содержит 2 роли админ и модератор), админ (содержит админ). Между профилями и ролями связь многие ко многим. Далее у юзера может быть несколько профилей. Между юзером и профилями тоже многие ко многим. Далее делаете таблицу с видами доступа - запись, чтение, редактирование. Между ролями и видами доступа тоже многие ко многим плюс колонку булево если истина значит у роли есть право на этот вид доступа. Далее если у юзера среди ролей профилей этого юзера хоть к чему-то есть доступ хоть в одной роли, значит доступ есть. Ну а далее дорабатываете все свои селеккты дополнительным where к выше описанной инфраструктуре.

Main message:
+

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

+

--

## My telegram message #233039
**Time:** 03.05.2023 21:28:16 UTC+05:00
**Link:** https://t.me/nest_ru/233039

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет! Пытаюсь задеплоить nestjs+ prisma на AWS Lambda. На всякий случай разбираюсь на пустом новом проекте. В целом hello world сработал. Сейчас пытаюсь засунуть prisma. Пришел к тому, что в логах все ок, но получаю timeout error.Выделил 30 сек и 1024 памяти. В чем может быть проблема?
- ну... пока готов... )) а там посмотрим ) Пасиб! А у меня через PgBounser бэк к базе ходит, может это поможет.. Но не вникал ещё что за способ
- +
- Коллеги, с CRUD и ролями у меня всё отлично, я casl юзаю. Мне несколько организаций в одну базу нужно завести.

Main message:
С сиквелайз геморно будет это делать, там модели общий коннект юзают, если сменишь для одного реквеста оно сменит для всех

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

С сиквелайз геморно будет это делать, там модели общий коннект юзают, если сменишь для одного реквеста оно сменит для всех

--

## My telegram message #233044
**Time:** 03.05.2023 21:42:25 UTC+05:00
**Link:** https://t.me/nest_ru/233044

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так а всё равно ж один поток, ну пусть меняется коннект, работать то будет же? Просто видимо нихрена не эффективно, я так понимаю

Main message:
Ты хочешь разные коннекты с мульти танет иметь для разных оргов в одном приложении, и значит разные реквесты будут свой коннект юзать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты хочешь разные коннекты с мульти танет иметь для разных оргов в одном приложении, и значит разные реквесты будут свой коннект юзать

--

## My telegram message #233048
**Time:** 03.05.2023 21:51:30 UTC+05:00
**Link:** https://t.me/nest_ru/233048

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- подскажите, как можно сделать кастомную авторизацию через yandex?
- Так а всё равно ж один поток, ну пусть меняется коннект, работать то будет же? Просто видимо нихрена не эффективно, я так понимаю
- Ты хочешь разные коннекты с мульти танет иметь для разных оргов в одном приложении, и значит разные реквесты будут свой коннект юзать
- та вродь? ) Вообще цель завести вторую (3, 4..) организацию в базе

Main message:
Касл оверхед не нужный, и там проблем с оргами нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Касл оверхед не нужный, и там проблем с оргами нет

--

## My telegram message #233050
**Time:** 03.05.2023 21:53:00 UTC+05:00
**Link:** https://t.me/nest_ru/233050

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ты хочешь разные коннекты с мульти танет иметь для разных оргов в одном приложении, и значит разные реквесты будут свой коннект юзать
- та вродь? ) Вообще цель завести вторую (3, 4..) организацию в базе
- Касл оверхед не нужный, и там проблем с оргами нет
- да уж завёз, не выкидывать же )

Main message:
У тя затык в базе, я на 90% уверен что не выйдет как ты хочешь, прям на уровне дБ разграничить по оргам и ты сделаешь просто в приложении

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя затык в базе, я на 90% уверен что не выйдет как ты хочешь, прям на уровне дБ разграничить по оргам и ты сделаешь просто в приложении

--

## My telegram message #233052
**Time:** 03.05.2023 22:02:48 UTC+05:00
**Link:** https://t.me/nest_ru/233052

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну поле tenant_id я добавлю к каждой таблице, а потом, where к каждой таблице или декоратором.. но я чёт хз, работы ж ппц скока

Main message:
Не поможет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не поможет

--

## My telegram message #233055
**Time:** 03.05.2023 22:04:07 UTC+05:00
**Link:** https://t.me/nest_ru/233055

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У тя затык в базе, я на 90% уверен что не выйдет как ты хочешь, прям на уровне дБ разграничить по оргам и ты сделаешь просто в приложении
- ну поле tenant_id я добавлю к каждой таблице, а потом, where к каждой таблице или декоратором.. но я чёт хз, работы ж ппц скока
- Не поможет
- а в двух словах пожалуйста, что ты имел в виду? ...на уровне дБ разграничить по оргам и ты сделаешь просто в приложении

Main message:
Таннетид не ты пишешь в запросе а тянешь из базы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Таннетид не ты пишешь в запросе а тянешь из базы

--

## My telegram message #233057
**Time:** 03.05.2023 22:06:11 UTC+05:00
**Link:** https://t.me/nest_ru/233057

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://github.com/franzon/postgres-rls-example У тя один коннект для одного юзера будет, ты готов к этому?

Main message:
Вот видишь на он коннект мы в некую переменную ставим ид, и в запросе добавляем where t.tanetid = app.current_tannet

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вот видишь на он коннект мы в некую переменную ставим ид, и в запросе добавляем where t.tanetid = app.current_tannet

--

## My telegram message #233059
**Time:** 03.05.2023 22:06:41 UTC+05:00
**Link:** https://t.me/nest_ru/233059

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Таннетид не ты пишешь в запросе а тянешь из базы
- ну я ж могу по токену определять пользователя и из него его Орг`и
- Вот видишь на он коннект мы в некую переменную ставим ид, и в запросе добавляем where t.tanetid = app.current_tannet
- так так

Main message:
Есть конекшен пулл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть конекшен пулл

--

## My telegram message #233071
**Time:** 03.05.2023 23:56:12 UTC+05:00
**Link:** https://t.me/nest_ru/233071

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
тогда лучше уж призму взять вот оверхедный пример  https://zenstack.dev/blog/multi-tenant

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тогда лучше уж призму взять вот оверхедный пример  https://zenstack.dev/blog/multi-tenant

--

## My telegram message #233075
**Time:** 04.05.2023 00:01:11 UTC+05:00
**Link:** https://t.me/nest_ru/233075

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- !
- берешь их доки
- --build чтобы image пересобирался
- тогда лучше уж призму взять вот оверхедный пример  https://zenstack.dev/blog/multi-tenant

Main message:
если мне таска упадет на такую штуку я прям это и возьму, это реальная rls

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если мне таска упадет на такую штуку я прям это и возьму, это реальная rls

--

## My telegram message #233077
**Time:** 04.05.2023 00:02:30 UTC+05:00
**Link:** https://t.me/nest_ru/233077

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- --build чтобы image пересобирался
- тогда лучше уж призму взять вот оверхедный пример  https://zenstack.dev/blog/multi-tenant
- если мне таска упадет на такую штуку я прям это и возьму, это реальная rls
- Мне упала. ссылка есть?

Main message:
https://zenstack.dev/blog/multi-tenant#single-database

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://zenstack.dev/blog/multi-tenant#single-database

--

## My telegram message #233081
**Time:** 04.05.2023 00:05:22 UTC+05:00
**Link:** https://t.me/nest_ru/233081

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
тут под тайп орм, суть таже самая) ща вот сидел изучал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тут под тайп орм, суть таже самая) ща вот сидел изучал

--

## My telegram message #233094
**Time:** 04.05.2023 00:08:02 UTC+05:00
**Link:** https://t.me/nest_ru/233094

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://zenstack.dev/blog/multi-tenant#single-database
- Перепишу под тайпорм 😂
- тут под тайп орм, суть таже самая) ща вот сидел изучал
- А что вы делаете?

Main message:
ну есть такой кейс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну есть такой кейс

--

## My telegram message #233097
**Time:** 04.05.2023 00:08:33 UTC+05:00
**Link:** https://t.me/nest_ru/233097

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тут под тайп орм, суть таже самая) ща вот сидел изучал
- А что вы делаете?
- ну есть такой кейс
- Это не RLS. В RLS всё за тебя будет делать Postgres

Main message:
это в первом потходе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это в первом потходе

--

## My telegram message #233101
**Time:** 04.05.2023 00:08:48 UTC+05:00
**Link:** https://t.me/nest_ru/233101

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
когда много баз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда много баз

--

## My telegram message #233103
**Time:** 04.05.2023 00:08:53 UTC+05:00
**Link:** https://t.me/nest_ru/233103

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну, призма сама по себе немного продуктивнее, чем type or
- Кста, тенантов тож касается
- когда много баз
- Бери водки

Main message:
а если база одна

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а если база одна

--

## My telegram message #233113
**Time:** 04.05.2023 00:09:57 UTC+05:00
**Link:** https://t.me/nest_ru/233113

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так и делается. Ещё раз попинай бота на счёт RLS Postgres.

Main message:
нет у меня бота

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет у меня бота

--

## My telegram message #233118
**Time:** 04.05.2023 00:11:59 UTC+05:00
**Link:** https://t.me/nest_ru/233118

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так и делается. Ещё раз попинай бота на счёт RLS Postgres.

Main message:
вот там как раз есть описание

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот там как раз есть описание

--

## My telegram message #233120
**Time:** 04.05.2023 00:12:35 UTC+05:00
**Link:** https://t.me/nest_ru/233120

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ты что. Из анекдота - "Мужики, я вам тут колесо изобрел", "Нам некогда, мы тушу мамонта тащим".
- Почему опен апи через жопу работают?
- вот там как раз есть описание
- Нативности там нет. Но привыкнуть можно. Попробуй убрать декораторы лишние.

Main message:
первый способ танет это бд, второй это RLS

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

первый способ танет это бд, второй это RLS

--

## My telegram message #233127
**Time:** 04.05.2023 00:14:34 UTC+05:00
**Link:** https://t.me/nest_ru/233127

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- юзали для того, что бы тянуть транзакционный контекст по все цепочке вызова функций??

Main message:
да в одной конторе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да в одной конторе

--

## My telegram message #233477
**Time:** 06.05.2023 20:23:50 UTC+05:00
**Link:** https://t.me/nest_ru/233477

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребят, у меня др, пожелайте чё-нибудь

Main message:
Здоровья, любви, удачи!

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Здоровья, любви, удачи!

--

