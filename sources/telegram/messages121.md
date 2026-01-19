## My telegram message #124507
**Time:** 21.09.2021 22:29:29 UTC+05:00
**Link:** https://t.me/nest_ru/124507

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Подскажите, как организовать Амазон для бизнеса (S3). Создаётся отдельный аккаунт?
- Вопрос по Postgres есть, стоит ли в колонке хранить объект? Хочу таблицу с настройками делать
- Jsonb есть в пг. Но если будет фильтрация или выборка по ним лучше перевести в плоскую.
- есть задача посмтроить бота на nest.js (не спрашивайте почему). Создал отдельнчй модуль для телеги, в сервисе написал этот код. Бот не работает, естественно, потому что nest слушает порт 3000. Как лучше сделать? Чтобы этот сервис из телеграм модуля заработал?

Main message:
Хук нужен в который телеграм сервер будет слать эмоджи, в доке по либе должен быть пример

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Хук нужен в который телеграм сервер будет слать эмоджи, в доке по либе должен быть пример

--

## My telegram message #124511
**Time:** 21.09.2021 22:32:34 UTC+05:00
**Link:** https://t.me/nest_ru/124511

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- просто у меня нет контроллера, может из-за этого не работает?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #124778
**Time:** 23.09.2021 21:27:22 UTC+05:00
**Link:** https://t.me/nest_ru/124778

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Понял. Интересное начало. Буду ждать продолжения.
- всем привет что за ошибка TypeError: OAuth2Strategy requires a clientID option?
- куда то в гугль лезешь? видимо забыл поле с ид клиента
- Всем привет Подскажите, можно как то получить имя модуля, внутри которого был вызыван метод сервиса ?

Main message:
из диай можешь выдернуть все и найти себя и глянуть в каком модуле ты сидишь вот отсюда выдери код  https://gist.github.com/EndyKaufman/2aec900716e722f1b6c6e8007be01a36

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

из диай можешь выдернуть все и найти себя и глянуть в каком модуле ты сидишь вот отсюда выдери код  https://gist.github.com/EndyKaufman/2aec900716e722f1b6c6e8007be01a36

--

## My telegram message #124781
**Time:** 23.09.2021 21:42:58 UTC+05:00
**Link:** https://t.me/nest_ru/124781

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- куда то в гугль лезешь? видимо забыл поле с ид клиента
- Всем привет Подскажите, можно как то получить имя модуля, внутри которого был вызыван метод сервиса ?
- из диай можешь выдернуть все и найти себя и глянуть в каком модуле ты сидишь вот отсюда выдери код  https://gist.github.com/EndyKaufman/2aec900716e722f1b6c6e8007be01a36
- Спасибо

Main message:
сверху твой класс, ниже модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сверху твой класс, ниже модуль

--

## My telegram message #124788
**Time:** 23.09.2021 22:12:15 UTC+05:00
**Link:** https://t.me/nest_ru/124788

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо
- сверху твой класс, ниже модуль
- ёмаё уто наворотил =)
- Получилось, спасибо А из прототип сервиса это никак нельзя достать ? У него же должна быть какая-то привязка

Main message:
нет привзяки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет привзяки

--

## My telegram message #124909
**Time:** 24.09.2021 16:23:47 UTC+05:00
**Link:** https://t.me/nest_ru/124909

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет Подскажите пж можно ли как то возвращать ответ на фронт до того как завершатся все операции, просто из-за одного действия ответ очень долго может не приходить
- как я понял, всё-таки объект респонса один, и если Header поставить над методом контроллера, то заголовок будет устанавливаться сразу и никуда уже не пропадёт. В итоге да, сделал так, что у меня сервисный метод возвращает сам буфер (файл), а не StreamableFile, либо выбрасывает исключение. В методе контроллера после вызова сервисного метода я уже устанавливаю заголовки через объект респонса, и потом делаю return new StreamableFile(<буфер>)
- Server sent events и шли во фронт что хочешь и когда хочешь
- Всем привет Подкажите, можно ли докинуть провайдер в уже существующий модуль? Нужно делать напрямую через DI или может есть какой-то другой способ?

Main message:
Я в одно время пробовал не вышло

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я в одно время пробовал не вышло

--

## My telegram message #124913
**Time:** 24.09.2021 16:29:27 UTC+05:00
**Link:** https://t.me/nest_ru/124913

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Server sent events и шли во фронт что хочешь и когда хочешь
- Всем привет Подкажите, можно ли докинуть провайдер в уже существующий модуль? Нужно делать напрямую через DI или может есть какой-то другой способ?
- Я в одно время пробовал не вышло
- Хочу избавиться от Global() в библиотеках Но остается одна проблема, как конфиг, который был прокинут в forRoot, кинуть в модули forChild (т.к. forChild инициализируются раньше) Думал, может уже после инициализии поменять у них провайдеры? Или может вообще не решать это через DI, а просто создать static переменную для конфига и оттуда тянуть?

Main message:
Через мой кастом инжектор выдерни конфиг в тот момент когда будешь его использовать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через мой кастом инжектор выдерни конфиг в тот момент когда будешь его использовать

--

## My telegram message #124999
**Time:** 25.09.2021 15:22:17 UTC+05:00
**Link:** https://t.me/nest_ru/124999

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хочу использовать github actions и то что еще требуется для этого
- Вот как раз в прошлом сообщении в конце и описал его в простейшем случае
- Так то да
- Когда VPS будешь брать, бери с KVM. Т.к. раньше (может и сейчас) на OpenVZ докер нефига не работал

Main message:
про сертификаты и бэкапы забыл и много доменов на одном хосте и тюнинг нгинкс для этого всего, веб сокеты еще нужно пробрасывать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

про сертификаты и бэкапы забыл и много доменов на одном хосте и тюнинг нгинкс для этого всего, веб сокеты еще нужно пробрасывать

--

## My telegram message #125056
**Time:** 25.09.2021 21:49:15 UTC+05:00
**Link:** https://t.me/nest_ru/125056

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можешь уточнить что ты хочешь получить?
- я уже решил просто хотел массивом все данные закинуть
- А потом я таким образом развернул проект с монгой, но на сервере то порты открыты наружу и злые фулюганы потёрли базу, благо что это песочница. А закрыть порт, учитывая что монга в докере оказалось квестом
- Есть ли смысл писать и модульные и E2E тесты? Или хватит только каких-то одних?

Main message:
Я пишу е2е всегда которые долбят бэк тестовый, юниты пишу только на алгоритмы и то для чего не шарится бэк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я пишу е2е всегда которые долбят бэк тестовый, юниты пишу только на алгоритмы и то для чего не шарится бэк

--

## My telegram message #125059
**Time:** 25.09.2021 22:00:12 UTC+05:00
**Link:** https://t.me/nest_ru/125059

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А потом я таким образом развернул проект с монгой, но на сервере то порты открыты наружу и злые фулюганы потёрли базу, благо что это песочница. А закрыть порт, учитывая что монга в докере оказалось квестом
- Есть ли смысл писать и модульные и E2E тесты? Или хватит только каких-то одних?
- Я пишу е2е всегда которые долбят бэк тестовый, юниты пишу только на алгоритмы и то для чего не шарится бэк
- хех, понял спасибо)

Main message:
Незачто, ещё один уровень есть, я их назвал смок тесты, это когда твой бэк с кем то интегрируется, смоки только на проде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Незачто, ещё один уровень есть, я их назвал смок тесты, это когда твой бэк с кем то интегрируется, смоки только на проде

--

## My telegram message #125061
**Time:** 25.09.2021 22:00:55 UTC+05:00
**Link:** https://t.me/nest_ru/125061

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А можете поделится как у вас это организованно? В смысле моки или реальная база, как запускается и всякое такое. А то что-то никак нагуглить не могу

Main message:
Е2е прям реальный бэк долбят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Е2е прям реальный бэк долбят

--

## My telegram message #125064
**Time:** 25.09.2021 22:04:02 UTC+05:00
**Link:** https://t.me/nest_ru/125064

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Незачто, ещё один уровень есть, я их назвал смок тесты, это когда твой бэк с кем то интегрируется, смоки только на проде
- А можете поделится как у вас это организованно? В смысле моки или реальная база, как запускается и всякое такое. А то что-то никак нагуглить не могу
- Е2е прям реальный бэк долбят
- т.е. используют "живую" базу. А не возникает ли проблем со связностью в таком случае? (что тесты могут ломать или просто влиять друг на друга?

Main message:
для этого юниты (или интеграционные)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

для этого юниты (или интеграционные)

--

## My telegram message #125067
**Time:** 25.09.2021 22:05:30 UTC+05:00
**Link:** https://t.me/nest_ru/125067

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Е2е прям реальный бэк долбят
- т.е. используют "живую" базу. А не возникает ли проблем со связностью в таком случае? (что тесты могут ломать или просто влиять друг на друга?
- для этого юниты (или интеграционные)
- А, т.е. каждый ран е2е это отдельная "вселенная", внутри него все может быть связанно, но после рана, база чистится?

Main message:
вот сделали фичу и иду через сваггер ее тестить, вот я в этот момент не иду в сваггер а пишу е2е который это за меня сделает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот сделали фичу и иду через сваггер ее тестить, вот я в этот момент не иду в сваггер а пишу е2е который это за меня сделает

--

## My telegram message #125072
**Time:** 25.09.2021 22:07:51 UTC+05:00
**Link:** https://t.me/nest_ru/125072

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- для этого юниты (или интеграционные)
- А, т.е. каждый ран е2е это отдельная "вселенная", внутри него все может быть связанно, но после рана, база чистится?
- вот сделали фичу и иду через сваггер ее тестить, вот я в этот момент не иду в сваггер а пишу е2е который это за меня сделает
- да, но вот пример, есть круд, есть на него е2е (на все методы), а потом, оказывается, что это поле связанно с каким-то другим, и когда мы сделали update или delete мы сломали другой тест

Main message:
у меня прям регистрация происходит и емайл чекается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня прям регистрация происходит и емайл чекается

--

## My telegram message #125075
**Time:** 25.09.2021 22:08:48 UTC+05:00
**Link:** https://t.me/nest_ru/125075

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот сделали фичу и иду через сваггер ее тестить, вот я в этот момент не иду в сваггер а пишу е2е который это за меня сделает
- да, но вот пример, есть круд, есть на него е2е (на все методы), а потом, оказывается, что это поле связанно с каким-то другим, и когда мы сделали update или delete мы сломали другой тест
- у меня прям регистрация происходит и емайл чекается
- аа, ну я это и имел ввиду под "отдельная вселенная", что тесты сами и готовят данные и проверяют их

Main message:
юниты вот не покажут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

юниты вот не покажут

--

## My telegram message #125079
**Time:** 25.09.2021 22:09:09 UTC+05:00
**Link:** https://t.me/nest_ru/125079

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- аа, ну я это и имел ввиду под "отдельная вселенная", что тесты сами и готовят данные и проверяют их

Main message:
да, свои чисто данные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, свои чисто данные

--

## My telegram message #125083
**Time:** 25.09.2021 22:11:21 UTC+05:00
**Link:** https://t.me/nest_ru/125083

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У кого-то есть опыт работы с автомаппером?
- да, свои чисто данные
- Очень захотелось затащить в проект - если кто-то юзал, подскажите какие подводные, пожалуйста
- Я вот сейчас начал разбираться с е2е тестами для бека, и хочется что-то типа mirage js, но такого нет, и все почему-то юзают реальные базы

Main message:
все хотят писать идеальный код, но он сжирает время

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все хотят писать идеальный код, но он сжирает время

--

## My telegram message #125086
**Time:** 25.09.2021 22:13:29 UTC+05:00
**Link:** https://t.me/nest_ru/125086

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Очень захотелось затащить в проект - если кто-то юзал, подскажите какие подводные, пожалуйста
- Я вот сейчас начал разбираться с е2е тестами для бека, и хочется что-то типа mirage js, но такого нет, и все почему-то юзают реальные базы
- все хотят писать идеальный код, но он сжирает время
- А если sequelize ))

Main message:
не знаю)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не знаю)

--

## My telegram message #125090
**Time:** 25.09.2021 22:21:15 UTC+05:00
**Link:** https://t.me/nest_ru/125090

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
в доке все есть и тестах сиди изучай, тут в основном народ на класс трансформ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в доке все есть и тестах сиди изучай, тут в основном народ на класс трансформ

--

## My telegram message #125093
**Time:** 25.09.2021 22:25:45 UTC+05:00
**Link:** https://t.me/nest_ru/125093

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо, видимо и правда придется брать sqlite или вообще не выделываться и делать как принято)
- наверное тупой вопрос, но не погу понять, что надо ещё сделать? Мой findAll метод ожидает возврата Promise<User[]> User - ентити
- в доке все есть и тестах сиди изучай, тут в основном народ на класс трансформ
- я так пробовал, то теперь говорит, что в обьекте нету методов sequelize я так понимаю

Main message:
кури тесты секвилайза

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кури тесты секвилайза

--

## My telegram message #125214
**Time:** 26.09.2021 18:53:47 UTC+05:00
**Link:** https://t.me/nest_ru/125214

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а как это работает?

Main message:
не используй женерик если не понимаешь зачем он

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не используй женерик если не понимаешь зачем он

--

## My telegram message #125217
**Time:** 26.09.2021 18:55:06 UTC+05:00
**Link:** https://t.me/nest_ru/125217

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а как это работает?
- Зайди в исходник класа Model и посмотри где используется T(предположительно)
- не используй женерик если не понимаешь зачем он
- да я в туториале смотрю, думал это необходимость

Main message:
оно для типизации нужно чтобы одно и тоже не писать в разных местах просто передал тип как переменную якобы и юзаешь где хочешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оно для типизации нужно чтобы одно и тоже не писать в разных местах просто передал тип как переменную якобы и юзаешь где хочешь

--

## My telegram message #125462
**Time:** 27.09.2021 22:01:56 UTC+05:00
**Link:** https://t.me/nest_ru/125462

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- посоветуйте хороший курс по nest js

Main message:
ты уже все прошел вот тут?  https://t.me/nest_ru/115089

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты уже все прошел вот тут?  https://t.me/nest_ru/115089

--

## My telegram message #125514
**Time:** 28.09.2021 17:36:30 UTC+05:00
**Link:** https://t.me/nest_ru/125514

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- смотри я не видел твой код но предволагаю что у тебя классик код как в доке - анемичная модель, вся логика в методах сервиса, антипаттерн если мы говорим про ооп, так же такой код плохо подходит для сложной логики я предлагаю логику из сервиса вынести в модель, это облегчит тестирование, понимание кода, сделает код более выразительным в моделе не будет коллабораторов ( например репозиториев, логгеров, очередей и тд ) это коллабораторы будут в сервисе у сервиса раньше было 2 ответственности - логика и сайд еффекты ( сохранить в базу например ), а сейчас сервис будет оркестрировать моделями ( например загрузить с базы-> применить обновление-> сохранить )
- А что значит большие? 200 функций в одном сервисе или 200 Мб один файл?
- не, 300+ строк кода в некоторых сервисах есть
- Всем привет, скажите вотздесь  https://wanago.io/2020/09/21/api-nestjs-refresh-tokens-jwt/ предлагается и сам jwt и рефреш токен в куки передавать которое хттп онли. Но есть альтернативный вариант сам jwt хранить в памяти и только если токена в памяти нет или он истек использовать рефреш токен который уже в куки. Какой из вариантов более правильный? Сторонники варианта с зранением в памяти апелируют к тому что если добавлять в куки переизобретаешь сессию

Main message:
Рефрешь только на одном из роутов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Рефрешь только на одном из роутов

--

