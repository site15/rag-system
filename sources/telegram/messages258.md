## My telegram message #285389
**Time:** 22.02.2024 00:56:53 UTC+05:00
**Link:** https://t.me/nest_ru/285389

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ребятки, привет! с т.з. "чистоты абстракций" и структуры кода в Несте, как поступить? —- Есть абстрактная функция в  app.service , которая работает с хостингом (создаёт, например, сервер). Она принимает параметр в виде имени хостинга, и в зависимости от имени вызывает функции того сервиса, который подпадает по имени. Например,  hetzner - значит,  hetznerService.createServer() ,  aws -  awsService.createServer() . Соответственно, под hetzner я создал отдельный модуль (без контороллера), под другой хостинг - другой модуль. Не лишканул ли я с количеством модулей? И могут ли они лежать на одном уровне в src, или это какое-то нарушение? —- p.s. на носу внедрение БД, и я выбрал Монгу. Вопрос тот же - если делать абстракцию  dbService.add() , то куда совать вспомогательные функции, которые будут отвечать за схему и логику Монги, а впоследствии (но вряд ли) - логику какой-нибудь Постгре? —- Надеюсь, +\- понятно объяснил...

Main message:
Всё что общее то статик методы, кастом уже новые методы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Всё что общее то статик методы, кастом уже новые методы

--

## My telegram message #285415
**Time:** 22.02.2024 01:11:20 UTC+05:00
**Link:** https://t.me/nest_ru/285415

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и у обоих сервисов, ответственных за разные хостинги, таки да - одинаковые методы
- почитай про DDD
- щас Ильшат выйдет, пояснит за ддд )))
- и в целом зачем и для чего нужен DI

Main message:
Тут не причём ддд и диай, кейс чисто оопшный

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тут не причём ддд и диай, кейс чисто оопшный

--

## My telegram message #285492
**Time:** 22.02.2024 08:58:16 UTC+05:00
**Link:** https://t.me/nest_ru/285492

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Удобно подменять экземпляры при внедрении зависимостей каких нибудь
- Как раз смотрю доку. 0 - это false )) Тебе надо true.
- Я уже поменял на rabbitmq
- будет ли корректно использовать интерцепторы для того что бы валидировать id сущностей из dto?

Main message:
https://docs.nestjs.com/techniques/validation

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://docs.nestjs.com/techniques/validation

--

## My telegram message #285502
**Time:** 22.02.2024 11:46:15 UTC+05:00
**Link:** https://t.me/nest_ru/285502

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А есть ли смысл анализировать данные, таким образом, что я ожидаю 2 параметра имя и фамилию. А он мне шлет еще возраст и еще 15 остальных. Но так как я вижу что то что мне нужно у меня есть я отдаю статус ок, или мне не принимать такой запрос?

Main message:
это конторы зависит, гдет например если будет попытка прислать кривые данные, бан ип можно получить сразу, ну по идее пох

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это конторы зависит, гдет например если будет попытка прислать кривые данные, бан ип можно получить сразу, ну по идее пох

--

## My telegram message #285506
**Time:** 22.02.2024 11:49:44 UTC+05:00
**Link:** https://t.me/nest_ru/285506

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- обычно всем пох)
- Спаибо)
- это конторы зависит, гдет например если будет попытка прислать кривые данные, бан ип можно получить сразу, ну по идее пох
- А еще вопрос, зачем мне  @query если есть @Req и я могу получить ...request.query гораздо удобнее?

Main message:
чтобы дто валидировалось и трансформировалось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чтобы дто валидировалось и трансформировалось

--

## My telegram message #285514
**Time:** 22.02.2024 11:57:30 UTC+05:00
**Link:** https://t.me/nest_ru/285514

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это конторы зависит, гдет например если будет попытка прислать кривые данные, бан ип можно получить сразу, ну по идее пох
- А еще вопрос, зачем мне  @query если есть @Req и я могу получить ...request.query гораздо удобнее?
- чтобы дто валидировалось и трансформировалось
- А все понял

Main message:
https://t.me/nest_ru/115089

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/115089

--

## My telegram message #285517
**Time:** 22.02.2024 11:59:50 UTC+05:00
**Link:** https://t.me/nest_ru/285517

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- чтобы дто валидировалось и трансформировалось
- А все понял
- https://t.me/nest_ru/115089
- Че то ты меня сильно откатил

Main message:
у тя еще милион вопросов возникнет просто) проще по этим постам сесть и все проделать за неделю и будешь как мидл нест разраб)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя еще милион вопросов возникнет просто) проще по этим постам сесть и все проделать за неделю и будешь как мидл нест разраб)

--

## My telegram message #285526
**Time:** 22.02.2024 12:01:54 UTC+05:00
**Link:** https://t.me/nest_ru/285526

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Пожалуйста объясните этот момент и я стану сеньором

Main message:
я не юзаю такое, даже хз че это за декоратор

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я не юзаю такое, даже хз че это за декоратор

--

## My telegram message #285534
**Time:** 22.02.2024 12:19:51 UTC+05:00
**Link:** https://t.me/nest_ru/285534

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я не юзаю такое, даже хз че это за декоратор
- https://docs.nestjs.com/techniques/session в чем сложность просто пойти сразу в доку сходить?
- если ты задаешься этим вопросом, значит 99%, что не надо. поэтому забей просто
- а как тогда валидировать id сущностей из dto? точнее где?

Main message:
зод не использую

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

зод не использую

--

## My telegram message #285537
**Time:** 22.02.2024 12:21:03 UTC+05:00
**Link:** https://t.me/nest_ru/285537

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если ты задаешься этим вопросом, значит 99%, что не надо. поэтому забей просто
- а как тогда валидировать id сущностей из dto? точнее где?
- зод не использую
- и че мне там сидеть мэтчить эти эксепшены?)

Main message:
ловишь ошибку базы и по названию вторичного ключа выкидываешь нормальную ошибку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ловишь ошибку базы и по названию вторичного ключа выкидываешь нормальную ошибку

--

## My telegram message #285540
**Time:** 22.02.2024 12:27:03 UTC+05:00
**Link:** https://t.me/nest_ru/285540

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Скажи пожалуйста, для тебя кто такой мидл бэк разраб

Main message:
3 года в команде с другими людьми писал некое большое приложение на несте - полумидл если писал >=3 приложений то мидл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

3 года в команде с другими людьми писал некое большое приложение на несте - полумидл если писал >=3 приложений то мидл

--

## My telegram message #285543
**Time:** 22.02.2024 12:29:31 UTC+05:00
**Link:** https://t.me/nest_ru/285543

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ловишь ошибку базы и по названию вторичного ключа выкидываешь нормальную ошибку
- Скажи пожалуйста, для тебя кто такой мидл бэк разраб
- 3 года в команде с другими людьми писал некое большое приложение на несте - полумидл если писал >=3 приложений то мидл
- Мне кажется годы тут не имеет смысла. Некоторые учится и тратить много. Есть человек который учить медленно но верно.

Main message:
там много факторов а не просто уметь писать на несте чет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там много факторов а не просто уметь писать на несте чет

--

## My telegram message #285545
**Time:** 22.02.2024 12:36:46 UTC+05:00
**Link:** https://t.me/nest_ru/285545

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 3 года в команде с другими людьми писал некое большое приложение на несте - полумидл если писал >=3 приложений то мидл
- Мне кажется годы тут не имеет смысла. Некоторые учится и тратить много. Есть человек который учить медленно но верно.
- там много факторов а не просто уметь писать на несте чет
- Если работал с эластик, подскажи как интегрировать посгре и эластик бд

Main message:
Очень давно работал, просто была джоба которая создаёт и обновляет индексы в этастике

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Очень давно работал, просто была джоба которая создаёт и обновляет индексы в этастике

--

## My telegram message #285548
**Time:** 22.02.2024 12:39:31 UTC+05:00
**Link:** https://t.me/nest_ru/285548

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там много факторов а не просто уметь писать на несте чет
- Если работал с эластик, подскажи как интегрировать посгре и эластик бд
- Очень давно работал, просто была джоба которая создаёт и обновляет индексы в этастике
- Что сейчас в вооружении по поиску?

Main message:
google

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

google

--

## My telegram message #285554
**Time:** 22.02.2024 13:05:15 UTC+05:00
**Link:** https://t.me/nest_ru/285554

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да, понял благодарю.

Main message:
общий вывод какой можно сделать, чем быстрее ты начнешь чет большое пилить в команде не важно что не так много платят, тем быстрее ты как спец качнешся, типа задел на будущее а если будешь пилить фрилансы в одного за много то кач будет слабым если сравнить через 5 лет этих двух тебя, то первый будет сильнее как разраб и получать больше, а второй будет по скилам такой же как сейчас и денег примерно столько же будет получать как сейчас ну имхо)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

общий вывод какой можно сделать, чем быстрее ты начнешь чет большое пилить в команде не важно что не так много платят, тем быстрее ты как спец качнешся, типа задел на будущее а если будешь пилить фрилансы в одного за много то кач будет слабым если сравнить через 5 лет этих двух тебя, то первый будет сильнее как разраб и получать больше, а второй будет по скилам такой же как сейчас и денег примерно столько же будет получать как сейчас ну имхо)

--

