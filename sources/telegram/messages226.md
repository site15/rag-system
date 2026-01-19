## My telegram message #247699
**Time:** 01.08.2023 00:58:01 UTC+05:00
**Link:** https://t.me/nest_ru/247699

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy Ильшат, привет, такой вопросик к тебе, подскажи пожалуйста. У меня есть репозиторий typeorm, который модуль тайпорма инжектит под каким то токеном(под вот таким getRepositoryToken(Entity)), я же хочу под этим токеном заинжектить свой токен. Но по сути получаю такое, что токены тайпорма не оверрайдятся моими, можно как то задать приоритет токенам или зарегать мои репозитории после инициализации тайпорма?

Main message:
решил?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

решил?

--

## My telegram message #247703
**Time:** 01.08.2023 00:58:31 UTC+05:00
**Link:** https://t.me/nest_ru/247703

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я выше тебе сказал, что сделать
- ок попробую
- решил?
- Не

Main message:
тебе нужно перебить то ранее было добавлено?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тебе нужно перебить то ранее было добавлено?

--

## My telegram message #247706
**Time:** 01.08.2023 01:01:13 UTC+05:00
**Link:** https://t.me/nest_ru/247706

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- решил?
- Не
- тебе нужно перебить то ранее было добавлено?
- +++

Main message:
providers:[{provide:'override',useFactory:(typoRep)=>Object.assign(typoRep,{newField:true}),inject:[getRepositoryToken(Entity)]}]

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

providers:[{provide:'override',useFactory:(typoRep)=>Object.assign(typoRep,{newField:true}),inject:[getRepositoryToken(Entity)]}]

--

## My telegram message #247710
**Time:** 01.08.2023 01:06:40 UTC+05:00
**Link:** https://t.me/nest_ru/247710

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тебе нужно перебить то ранее было добавлено?
- +++
- providers:[{provide:'override',useFactory:(typoRep)=>Object.assign(typoRep,{newField:true}),inject:[getRepositoryToken(Entity)]}]
- Я ща это покручу, я понял

Main message:
можно конструктор перебить если мало просто assign  consy t=new TypoRep2(); Object.setPrototypeOf(typoRep, t)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно конструктор перебить если мало просто assign  consy t=new TypoRep2(); Object.setPrototypeOf(typoRep, t)

--

## My telegram message #247713
**Time:** 01.08.2023 01:07:06 UTC+05:00
**Link:** https://t.me/nest_ru/247713

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
не, оверрайд это просто так рандомная строка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, оверрайд это просто так рандомная строка

--

## My telegram message #247715
**Time:** 01.08.2023 01:07:36 UTC+05:00
**Link:** https://t.me/nest_ru/247715

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно конструктор перебить если мало просто assign  consy t=new TypoRep2(); Object.setPrototypeOf(typoRep, t)
- по сути она будет доступна по другому токену
- не, оверрайд это просто так рандомная строка
- ну да, что бы саму функцию юзФактори выполнить, что бы она ссылку перетерла

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #247717
**Time:** 01.08.2023 01:07:46 UTC+05:00
**Link:** https://t.me/nest_ru/247717

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не, оверрайд это просто так рандомная строка
- ну да, что бы саму функцию юзФактори выполнить, что бы она ссылку перетерла
- да
- решение топовое на самом деле

Main message:
выше с конструктором тоже глянь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

выше с конструктором тоже глянь

--

## My telegram message #247811
**Time:** 01.08.2023 13:10:48 UTC+05:00
**Link:** https://t.me/nest_ru/247811

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо))) пойду читать))
- Всем привет. Может кто сталкивался с такой проблемой с микросервисами: У меня есть приложение nestjs(gateway) и tcp сервис(passport). Хотелось бы, чтобы эти сервисы работали независимо, но по итогу, если сервис не запущен, то приложение отказывается даже запускаться. Результат, который я хочу: чтобы при запуске приложение запускалось независимо, а ошибка подключения возникала именно в момент обращения к сервису. Плюс надо, чтобы он возвращал 502 ошибку, а не стопил всё приложение (но это уже совсем другая история с exception handler’ами)
- 12
- Почему все удалили?))

Main message:
баг телеги походу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

баг телеги походу

--

## My telegram message #247940
**Time:** 02.08.2023 11:32:59 UTC+05:00
**Link:** https://t.me/nest_ru/247940

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- можно ли в несте как-то заменить ENV vars на запрос к какому-либо хранилищу секретов? ну, то есть, запрос-то сделать, понятно, можно. но вот у меня, например, есть сервис, в который инжектится ConfigService, и в конструкторе я использую переменные из конфига ( config.get('MY_VAR) ) синхронно а если делать запрос куда-то в хранилище секретов, это будет асинхронный запрос, в конструкторе так не получится. кто-нибудь может предложить решение, или хотя бы куда копать?

Main message:
https://dev.to/endykaufman/using-consul-kv-in-nestjs-dgd

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://dev.to/endykaufman/using-consul-kv-in-nestjs-dgd

--

## My telegram message #247944
**Time:** 02.08.2023 11:39:18 UTC+05:00
**Link:** https://t.me/nest_ru/247944

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Неа это другая либа
- можно ли в несте как-то заменить ENV vars на запрос к какому-либо хранилищу секретов? ну, то есть, запрос-то сделать, понятно, можно. но вот у меня, например, есть сервис, в который инжектится ConfigService, и в конструкторе я использую переменные из конфига ( config.get('MY_VAR) ) синхронно а если делать запрос куда-то в хранилище секретов, это будет асинхронный запрос, в конструкторе так не получится. кто-нибудь может предложить решение, или хотя бы куда копать?
- https://dev.to/endykaufman/using-consul-kv-in-nestjs-dgd
- гм, ну там свой модуль используется, у него есть forRootAsync :)

Main message:
Домой приду скину пример, с useObservable

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Домой приду скину пример, с useObservable

--

