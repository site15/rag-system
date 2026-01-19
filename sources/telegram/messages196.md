## My telegram message #212843
**Time:** 20.01.2023 20:36:29 UTC+05:00
**Link:** https://t.me/nest_ru/212843

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Put
- тогда у тебя проблема в том, что ты указал :id но не указал паттерн для его валидации, и ты в итогде попал в первый метод, где слово password выбо использовано к как userId
- А можно про паттерн поподробнее?
- https://docs.nestjs.com/controllers#route-wildcards ну или мб тебе проще будет понять тут  https://stackoverflow.com/questions/54958244/how-to-use-query-parameters-in-nest-js

Main message:
местами пусть поменяет и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

местами пусть поменяет и все

--

## My telegram message #212848
**Time:** 20.01.2023 21:41:48 UTC+05:00
**Link:** https://t.me/nest_ru/212848

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А можно про паттерн поподробнее?
- https://docs.nestjs.com/controllers#route-wildcards ну или мб тебе проще будет понять тут  https://stackoverflow.com/questions/54958244/how-to-use-query-parameters-in-nest-js
- местами пусть поменяет и все
- всем привет! подскажите, пожалуйста, делаю запрос из неста в другой серевис, и от неста во фронт хочу отдать уже читаемую ошибку делаю вот так, но с catchError throwError мои Record не работают как быть, что делать?

Main message:
pipe(map(r=>r),catchError(err=>throwError(err)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

pipe(map(r=>r),catchError(err=>throwError(err)))

--

## My telegram message #212853
**Time:** 20.01.2023 21:52:19 UTC+05:00
**Link:** https://t.me/nest_ru/212853

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
у меня все также и норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня все также и норм

--

## My telegram message #212858
**Time:** 20.01.2023 21:57:30 UTC+05:00
**Link:** https://t.me/nest_ru/212858

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- pipe(map(r=>r),catchError(err=>throwError(err)))
- я обычно так бросаю throw new BadRequestException({ status: HttpStatus.BAD_REQUEST, error: ‘mytext’, });
- у меня все также и норм
- Привет ребята, вот уже год пользуюсь Nest.js но всё так и не смог понять суть RxJS в эко системе, без него же тоже можно всё сделать?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #212861
**Time:** 20.01.2023 21:58:32 UTC+05:00
**Link:** https://t.me/nest_ru/212861

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- да ошибку то он показывает поля ток мои не добавляет

Main message:
фильтр напиши

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

фильтр напиши

--

## My telegram message #212964
**Time:** 21.01.2023 20:19:32 UTC+05:00
**Link:** https://t.me/nest_ru/212964

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А за это не дают ро?  @KaufmanEndy

Main message:
дк он шутит так то) создай docker-compose.yml  version: '3' networks: misha-network: ipam: config: - subnet: '172.6.0.0/16' services: misha-mongo: image: mongo:4.2.0 container_name: misha-mongo environment: - MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME} - MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD} hostname: misha-mongo networks: - misha-network ports: - '27017:27017' healthcheck: test: mongo --disableImplicitSessions --port 27017 --eval "db.adminCommand('ping')" interval: 30s timeout: 30s retries: 3 и пускани docker-compose

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дк он шутит так то) создай docker-compose.yml  version: '3' networks: misha-network: ipam: config: - subnet: '172.6.0.0/16' services: misha-mongo: image: mongo:4.2.0 container_name: misha-mongo environment: - MONGO_INITDB_ROOT_USERNAME=${MONGO_INITDB_ROOT_USERNAME} - MONGO_INITDB_ROOT_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD} hostname: misha-mongo networks: - misha-network ports: - '27017:27017' healthcheck: test: mongo --disableImplicitSessions --port 27017 --eval "db.adminCommand('ping')" interval: 30s timeout: 30s retries: 3 и пускани docker-compose

--

## My telegram message #212969
**Time:** 21.01.2023 20:23:35 UTC+05:00
**Link:** https://t.me/nest_ru/212969

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://habr.com/ru/news/t/656205/

Main message:
жесть какая

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

жесть какая

--

