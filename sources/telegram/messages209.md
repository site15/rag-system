## My telegram message #227289
**Time:** 08.04.2023 16:26:00 UTC+05:00
**Link:** https://t.me/nest_ru/227289

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А кто знает как class-validator'у сказать, что не нужно выкидывать и ошибку минимальной длины и ошибку поле обязательное? То есть если поле пустое, то только ошибку, что оно обязательное. Но не ошибку, что не менее 3 символов
- @IsNotEmpty (({message: 'Username is a required field'}))  @MinLength (3, {message: 'Username should have a minimum length of $constraint1'}) username: string; Типа такого. И в ошибках вижу { "username": "Username should have a minimum length of 3. Username is a required field" },
- местами менял декораторы?
- Поменял, все тоже самое..

Main message:
Но эмпти убери

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Но эмпти убери

--

## My telegram message #227293
**Time:** 08.04.2023 16:30:26 UTC+05:00
**Link:** https://t.me/nest_ru/227293

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- местами менял декораторы?
- Поменял, все тоже самое..
- Но эмпти убери
- а может просто сделать валидацию с условием ? типа валидируем длину только если поле существует?

Main message:
ValidateIf

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ValidateIf

--

## My telegram message #227301
**Time:** 08.04.2023 16:51:44 UTC+05:00
**Link:** https://t.me/nest_ru/227301

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ValidateIf
- Всем доброго дня, ребят может посоветовать книгу по микросервисам? Желательно с nest js
- А конкретно что интересует? Какие идеи за этим стоят? Или конкретная реализация?
- Есть проект нужно использовать микросервисы

Main message:
Я как тут пишу  https://dev.to/nestjs/integrate-nestjs-with-external-services-using-microservice-transporters-part-1-p3

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я как тут пишу  https://dev.to/nestjs/integrate-nestjs-with-external-services-using-microservice-transporters-part-1-p3

--

