## My telegram message #294746
**Time:** 27.04.2024 12:36:36 UTC+05:00
**Link:** https://t.me/nest_ru/294746

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Такой вопрос, если у меня есть 2 модуля, auth и users, для тобо чтобы зарегистрировать пользователя нужно использовать user service, который находится в модуле users, как лучше, импортировать весь модуль в auth модуль или только user service ?

Main message:
не делай модули вообще, просто один app.module и все и не будет проблем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не делай модули вообще, просто один app.module и все и не будет проблем

--

## My telegram message #294776
**Time:** 27.04.2024 15:54:38 UTC+05:00
**Link:** https://t.me/nest_ru/294776

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- какие способы есть заинжектить сервис модуля в гвард, не делая модуль глобальным?

Main message:
гард передаешь через APP_GUARDS и на уровне AppModule провайдишь сервис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

гард передаешь через APP_GUARDS и на уровне AppModule провайдишь сервис

--

## My telegram message #294916
**Time:** 28.04.2024 14:42:56 UTC+05:00
**Link:** https://t.me/nest_ru/294916

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- перекатиться с монолита (25 модулей+-) на микросервисы, это вообще реально?

Main message:
чтобы хвастаться хочешь перекатиться?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чтобы хвастаться хочешь перекатиться?

--

## My telegram message #294920
**Time:** 28.04.2024 14:46:39 UTC+05:00
**Link:** https://t.me/nest_ru/294920

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
если: модули сильно декомпозированны у каждой своя база данных система миграции бд не зависимая от ноды (flyway например) на все есть е2е и интеграционные тесты то можно в любой момент переводить любой модуль в микросервис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если: модули сильно декомпозированны у каждой своя база данных система миграции бд не зависимая от ноды (flyway например) на все есть е2е и интеграционные тесты то можно в любой момент переводить любой модуль в микросервис

--

## My telegram message #294922
**Time:** 28.04.2024 14:47:37 UTC+05:00
**Link:** https://t.me/nest_ru/294922

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- если: модули сильно декомпозированны у каждой своя база данных система миграции бд не зависимая от ноды (flyway например) на все есть е2е и интеграционные тесты то можно в любой момент переводить любой модуль в микросервис

Main message:
это значит что модули не должны импортировать другие модули, связь между модулями делается через опции forRoot модуля

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это значит что модули не должны импортировать другие модули, связь между модулями делается через опции forRoot модуля

--

## My telegram message #294926
**Time:** 28.04.2024 14:51:00 UTC+05:00
**Link:** https://t.me/nest_ru/294926

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всё реально, если можно себе представить. Вопрос в экономической обоснованности
- это значит что модули не должны импортировать другие модули, связь между модулями делается через опции forRoot модуля
- где можно почитать про такой подход?
- Можешь привести пример пожалуйста

Main message:
я тут все время вкидываю, специально не искал) ну вот есть пример, некий модуль про дебаг, но сам модуль не знает где именно этот флаг будет хранится, мы эти знания докидываем через интеграцию, таким образов все связи с другими модулями докидываем сверху  https://github.com/EndyKaufman/kaufman-bot/blob/develop/apps/server/src/app/integrations/prisma/prisma-integrations-services/prisma-debug-messages.storage.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тут все время вкидываю, специально не искал) ну вот есть пример, некий модуль про дебаг, но сам модуль не знает где именно этот флаг будет хранится, мы эти знания докидываем через интеграцию, таким образов все связи с другими модулями докидываем сверху  https://github.com/EndyKaufman/kaufman-bot/blob/develop/apps/server/src/app/integrations/prisma/prisma-integrations-services/prisma-debug-messages.storage.ts

--

## My telegram message #295557
**Time:** 01.05.2024 13:44:30 UTC+05:00
**Link:** https://t.me/nest_ru/295557

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- серьезно?

Main message:
О привет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

О привет)

--

## My telegram message #295566
**Time:** 01.05.2024 13:58:08 UTC+05:00
**Link:** https://t.me/nest_ru/295566

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
веб разработчик

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

веб разработчик

--

## My telegram message #295568
**Time:** 01.05.2024 13:58:46 UTC+05:00
**Link:** https://t.me/nest_ru/295568

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я бы id сделал number но это дело индивидуальное)
- там просто и number и стринги все вместе приходят
- веб разработчик
- сертифицированный хотя бы?

Main message:
jquery + php, да серт от 1С получил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

jquery + php, да серт от 1С получил

--

## My telegram message #295585
**Time:** 01.05.2024 14:56:53 UTC+05:00
**Link:** https://t.me/nest_ru/295585

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не знаю как отловить этот момент, вместо expection прописал throw new Error, так же. А в запросе в постмане приходит { "statusCode": 500, "message": "Internal server error" }

Main message:
Можно глобальный фильтр сделать на вообще всё виды ошибок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Можно глобальный фильтр сделать на вообще всё виды ошибок

--

