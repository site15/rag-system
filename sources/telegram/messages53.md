## My telegram message #54071
**Time:** 24.02.2020 01:24:09 UTC+05:00
**Link:** https://t.me/nest_ru/54071

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Вообщем сабж, а нет возможности создать глобальный кастомный репозиторий для InjectRepository? Нужно добавить одну функция для всех репозиториев ( @nestjs /typeorm)

Main message:
наследуйся от оригинала добавь метод и юзай везде импорт своего

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

наследуйся от оригинала добавь метод и юзай везде импорт своего

--

## My telegram message #54075
**Time:** 24.02.2020 01:31:14 UTC+05:00
**Link:** https://t.me/nest_ru/54075

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вообщем сабж, а нет возможности создать глобальный кастомный репозиторий для InjectRepository? Нужно добавить одну функция для всех репозиториев ( @nestjs /typeorm)
- пасиб
- наследуйся от оригинала добавь метод и юзай везде импорт своего
- Что именно наследовать? Переопределить Repository не проблема, но мне ведь нужно переопределить не Repository a InjectRepository декоратор который добавляет nest

Main message:
ну да, я про это и говорил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну да, я про это и говорил

--

## My telegram message #54079
**Time:** 24.02.2020 01:34:20 UTC+05:00
**Link:** https://t.me/nest_ru/54079

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- наследуйся от оригинала добавь метод и юзай везде импорт своего
- Что именно наследовать? Переопределить Repository не проблема, но мне ведь нужно переопределить не Repository a InjectRepository декоратор который добавляет nest
- ну да, я про это и говорил
- Просто хочется что бы работало как то так) Один глобальный репозиторий  @InjectRepository(User) private readonly usersRepository: CustomRepository<User>

Main message:
тебе никто не мешает декор свой сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тебе никто не мешает декор свой сделать

--

## My telegram message #54676
**Time:** 26.02.2020 13:28:31 UTC+05:00
**Link:** https://t.me/nest_ru/54676

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят, такой вопрос по идеологии nest тк перешел с другого fw, nest в примерах из доки показывает валидацию через dto и ответ покрываеться интерфейсом. Если мне нужно использовать единые интерфейсы данных и на фронте тоже т.е все интерфейсы идут в отдельный npm тк они едины, получаеться у меня вмместо реквест интерфейсов dto, я вижу решение например ajv для валидации и просто писать интерфейсы, или можно пойти другим путем, надеюсь понятно описал вопрос.
- Можно переиспользовать, но валидатор на фронте будет ругаться
- Спасибо, за вариант решения)
- В npm можешь да выносить общее либо сабмодулем в проекте

Main message:
либо монорепу на фронт и бэк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

либо монорепу на фронт и бэк

--

## My telegram message #54680
**Time:** 26.02.2020 13:32:21 UTC+05:00
**Link:** https://t.me/nest_ru/54680

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо, за вариант решения)
- В npm можешь да выносить общее либо сабмодулем в проекте
- либо монорепу на фронт и бэк
- только предлагаемый class-validator для этого не очень подходит

Main message:
ну через декораторы удобно же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну через декораторы удобно же

--

## My telegram message #54683
**Time:** 26.02.2020 13:33:16 UTC+05:00
**Link:** https://t.me/nest_ru/54683

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- либо монорепу на фронт и бэк
- только предлагаемый class-validator для этого не очень подходит
- ну через декораторы удобно же
- только с декораторами непонятная ситуация и лучше уменьшить их проникновение в систему

Main message:
они там где они нужны, иначе у тя логика валидации поля размазатся может сильно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

они там где они нужны, иначе у тя логика валидации поля размазатся может сильно

--

## My telegram message #54723
**Time:** 27.02.2020 01:27:07 UTC+05:00
**Link:** https://t.me/nest_ru/54723

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
в тайп орм есть такое, в сиквелайз не помню, ну какие бы орм не юзал в разных языках, итог один - самые лучшие миграции это ручной sql

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в тайп орм есть такое, в сиквелайз не помню, ну какие бы орм не юзал в разных языках, итог один - самые лучшие миграции это ручной sql

--

## My telegram message #54727
**Time:** 27.02.2020 01:34:56 UTC+05:00
**Link:** https://t.me/nest_ru/54727

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Так я вас хочу подсадить, а то только жалобы на typeorm and sequelize ничего хорошего и не пробовали)
- в тайп орм есть такое, в сиквелайз не помню, ну какие бы орм не юзал в разных языках, итог один - самые лучшие миграции это ручной sql
- В кнекса шикарные миграции, тоже самое что ты в ручную пишешь но красиво оформленно в код, синхронизация с моделью это только для дева
- В sequelize есть sync из коробки при подключении, умеет и "дообновлять", и "с нуля переделывать", но нет сидеров. В итоге уже не работает даже для дева и тестов, если обязательно надо таблицу со значениями (aka enum table)

Main message:
все хорошо пока ты только добовляешь поля, когда начинаешь на проде добовлять фичи и перестаривать таблицы, разделять на две или три, удалять поля переименовывать поля

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все хорошо пока ты только добовляешь поля, когда начинаешь на проде добовлять фичи и перестаривать таблицы, разделять на две или три, удалять поля переименовывать поля

--

## My telegram message #54737
**Time:** 27.02.2020 01:37:33 UTC+05:00
**Link:** https://t.me/nest_ru/54737

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- На проде только миграции. А тут, я так понял, речь про дев была. Например, быстро прототипируешь, играешься со схемой, а уже потом пишешь миграции для того, что оставляешь)

Main message:
миграции застовляют думать а не просто поля так сяк разбрасывать и дропать, с миграциями ты сто раз подумаешь чтобы не писать кучу миграций которые изменят бд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

миграции застовляют думать а не просто поля так сяк разбрасывать и дропать, с миграциями ты сто раз подумаешь чтобы не писать кучу миграций которые изменят бд

--

## My telegram message #54742
**Time:** 27.02.2020 01:39:36 UTC+05:00
**Link:** https://t.me/nest_ru/54742

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вроде что-то нашёл alter параметр
- миграции застовляют думать а не просто поля так сяк разбрасывать и дропать, с миграциями ты сто раз подумаешь чтобы не писать кучу миграций которые изменят бд
- Только с enum что-то чудит SequelizeDatabaseError: type "enum_nodes_status" already exists
- У меня enum почти всегда отдельной таблицей, если это не мужской/женский)

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #54744
**Time:** 27.02.2020 01:49:49 UTC+05:00
**Link:** https://t.me/nest_ru/54744

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Только с enum что-то чудит SequelizeDatabaseError: type "enum_nodes_status" already exists
- У меня enum почти всегда отдельной таблицей, если это не мужской/женский)
- )
- Ну они ведь бывают очень нетривиальными, если структура где-то поменялась, и надо данные перераскидать в новую схему. Ещё бы обратную миграцию)

Main message:
ну это адок, че сказать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это адок, че сказать

--

## My telegram message #54757
**Time:** 27.02.2020 02:58:12 UTC+05:00
**Link:** https://t.me/nest_ru/54757

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну блек Джек у тебя есть, но вот шлюх не вижу
- Я вот думаю, может секцию с типо безопасностью запросов добавить, что б показать как легко это можно сделать в knex
- Йоу, ребят, очень сильно запутался, когда юзать DTO, когда I? Чем они отличаются?
- DTO – при создании и изменении. Интерфейсы – при получении и других случаях

Main message:
Интерфейс это контракт работы вообще, это контракт передачи данных, I можно нигде не ставить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Интерфейс это контракт работы вообще, это контракт передачи данных, I можно нигде не ставить

--

