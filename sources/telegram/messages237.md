## My telegram message #260713
**Time:** 18.10.2023 10:24:41 UTC+05:00
**Link:** https://t.me/nest_ru/260713

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
я вот это юзаю  https://www.npmjs.com/package/telegram-test-api при рефакторинге и слежу чтобы тесты старые работали, но итоговый перед деплоем, все-равно проверяю руками один раз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я вот это юзаю  https://www.npmjs.com/package/telegram-test-api при рефакторинге и слежу чтобы тесты старые работали, но итоговый перед деплоем, все-равно проверяю руками один раз

--

## My telegram message #260723
**Time:** 18.10.2023 11:44:27 UTC+05:00
**Link:** https://t.me/nest_ru/260723

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет всем! А кто использует с nestjs rxjs? Есть такие? Я сколько раз пытался - сталкиваюсь с проблемами. Вот сейчас - крайний раз - утечка памяти... Ищу. В конструкторе такая штука:  this.ami.eventPipe.subscribe(event => { this.newInternalEvent(event); })  Т. е. постоянно идут события из eventpipe и обрабатываются. Тут может быть причина в утечке?

Main message:
да, может событие само в себя влетает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, может событие само в себя влетает

--

## My telegram message #260726
**Time:** 18.10.2023 11:48:57 UTC+05:00
**Link:** https://t.me/nest_ru/260726

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а это как? я просто в одном месте делаю:  this.eventPipe.next({ type: 'LocalBridge', data: amiData })  а в другом подписан на эти события (1 точка, выше код) и всё.

Main message:
может тебе не нужен rxjs а нужен  https://docs.nestjs.com/techniques/events ?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может тебе не нужен rxjs а нужен  https://docs.nestjs.com/techniques/events ?

--

## My telegram message #260729
**Time:** 18.10.2023 11:55:18 UTC+05:00
**Link:** https://t.me/nest_ru/260729

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет всем! А кто использует с nestjs rxjs? Есть такие? Я сколько раз пытался - сталкиваюсь с проблемами. Вот сейчас - крайний раз - утечка памяти... Ищу. В конструкторе такая штука:  this.ami.eventPipe.subscribe(event => { this.newInternalEvent(event); })  Т. е. постоянно идут события из eventpipe и обрабатываются. Тут может быть причина в утечке?

Main message:
у тебя тут newInternalEvent это промис или что? просто влетит у тебя лям в Subject этот лям и запустится сразу на обработку, очереди то нету, если напишешь this.ami.eventPipe.pipe(cancatMap(event=>from(this.newInternalEvent(event))).subscribe() то влетит лям но обработка будет последовательной но не забывай что сервак может упасть и прервется обработка, лучше разнести через очередь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя тут newInternalEvent это промис или что? просто влетит у тебя лям в Subject этот лям и запустится сразу на обработку, очереди то нету, если напишешь this.ami.eventPipe.pipe(cancatMap(event=>from(this.newInternalEvent(event))).subscribe() то влетит лям но обработка будет последовательной но не забывай что сервак может упасть и прервется обработка, лучше разнести через очередь

--

## My telegram message #260935
**Time:** 19.10.2023 13:29:26 UTC+05:00
**Link:** https://t.me/nest_ru/260935

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет всем! Что скажите про  MikroORM ? Есть ли смысл мигрировать с  TypeORM в  MikroORM ?

Main message:
я один день посидел и понял что нужно учить новые микро орм правила :( в итоге проект на тайп орм перенес, ну как проект) 3 метода

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я один день посидел и понял что нужно учить новые микро орм правила :( в итоге проект на тайп орм перенес, ну как проект) 3 метода

--

## My telegram message #260938
**Time:** 19.10.2023 14:57:10 UTC+05:00
**Link:** https://t.me/nest_ru/260938

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А кто-нибудь может написать конкретный пример, с которым проблема возникает в typeorm, но не возникает в призме? Вижу хейт и абстрактные рассуждения. Хочу понять надо ли мне париться и мигрировать на призму. Просто пока ни одной проблемы с тайпом не нашёл.

Main message:
там типизация подсказывает тебе все, не нужно в доку ходить (ну основные моменты)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там типизация подсказывает тебе все, не нужно в доку ходить (ну основные моменты)

--

## My telegram message #260944
**Time:** 19.10.2023 14:59:59 UTC+05:00
**Link:** https://t.me/nest_ru/260944

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- звучит как "надо переписать на rust" :D

Main message:
прям сейчас сижу смотрю на код раста) точно не надо)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

прям сейчас сижу смотрю на код раста) точно не надо)

--

## My telegram message #260947
**Time:** 19.10.2023 15:00:52 UTC+05:00
**Link:** https://t.me/nest_ru/260947

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А какой там синтаксис, ммм

Main message:
как будто на питон смотрю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как будто на питон смотрю

--

## My telegram message #260958
**Time:** 19.10.2023 15:09:51 UTC+05:00
**Link:** https://t.me/nest_ru/260958

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Мы начали сносить на одном проекте тайпорм, но в пользу raw запросов вообще, т.к. очень много сложной логики накопилось, и хотелось бы избавиться от кучи циклов и фильтраций внутри кода, делегируя всю аггрегацию SQL, тайпорм теперь будет для самых простых селектов и крадиков (коих в проекте почти и нет). До этого момента пытались обходиться queryBuilder-ом, но когда начали появляться методы на несколько экранов - пришлось задуматься)))

Main message:
Я обычно всё пишу через призму, потом когда готов проект, то иду смотреть че проседает и там на сырые запросы переписываю и чекаю время, если стало хуже то откатываю на призму

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я обычно всё пишу через призму, потом когда готов проект, то иду смотреть че проседает и там на сырые запросы переписываю и чекаю время, если стало хуже то откатываю на призму

--

## My telegram message #260961
**Time:** 19.10.2023 15:11:51 UTC+05:00
**Link:** https://t.me/nest_ru/260961

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А что именно? В typeorm тоже ж типизация работает. Не то поле в селекте или релейшенс не пропишешь. Или она там в квери билдере работает?

Main message:
Если небольшое чет напишешь, птом в тайп ОРМ не захочется идти уже, я хз как описать, как экспресс и нест может если сравнивать впечатления человеческие

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Если небольшое чет напишешь, птом в тайп ОРМ не захочется идти уже, я хз как описать, как экспресс и нест может если сравнивать впечатления человеческие

--

## My telegram message #260963
**Time:** 19.10.2023 15:13:45 UTC+05:00
**Link:** https://t.me/nest_ru/260963

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я обычно всё пишу через призму, потом когда готов проект, то иду смотреть че проседает и там на сырые запросы переписываю и чекаю время, если стало хуже то откатываю на призму

Main message:
Я ещё сейчас практикую генерацию крудов на гкл, скорость разработки вобще выросла, типа генерить круд, дорабатывать фичу, птом рефачитьь круд генеренный на ручной) ну это всё дома только

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я ещё сейчас практикую генерацию крудов на гкл, скорость разработки вобще выросла, типа генерить круд, дорабатывать фичу, птом рефачитьь круд генеренный на ручной) ну это всё дома только

--

## My telegram message #260976
**Time:** 19.10.2023 15:23:34 UTC+05:00
**Link:** https://t.me/nest_ru/260976

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я также делал - при просадках дебажил что там генерится, но задолбался вставлять эти .getQueryAndParameters, чтобы просто получить готовый запрос, да и ориентироваться в функциях на несколько экранов (а с query builder-ом по другому не получится, когда много разных фильтров) очень неудобно. Теперь я тупо захожу в файлик с запросом и вижу его почти весь в сыром виде, отсутствуют только ORDER BY и пагинация (т.к. их вроде как не получится опциональными сделать на основе входящих параметров)

Main message:
я это на этапе тех долга уже все пилю, сперва мвп в каком нить виде сделать и к нему фронт, птом замерить нагрузки и рефачить под нагрузки, птом запускать и устранять тех долг параллельно с фичами

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я это на этапе тех долга уже все пилю, сперва мвп в каком нить виде сделать и к нему фронт, птом замерить нагрузки и рефачить под нагрузки, птом запускать и устранять тех долг параллельно с фичами

--

## My telegram message #260987
**Time:** 19.10.2023 16:18:37 UTC+05:00
**Link:** https://t.me/nest_ru/260987

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Можно ли как то сделать, чтоб queryparams парсились не по &, а по &nextparam=? потому что мне нужно, чтоб параметры вида ?a=b & c&d=e превратились в a = «b & c» и d = «e»

Main message:
ты закодируй символ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты закодируй символ

--

## My telegram message #260989
**Time:** 19.10.2023 16:19:53 UTC+05:00
**Link:** https://t.me/nest_ru/260989

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не могу. Это не я запросы делаю, а клиенты. И они ни в какую не хотят.

Main message:
может в мидл варь или интерцептор можно, чекни

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может в мидл варь или интерцептор можно, чекни

--

## My telegram message #261010
**Time:** 19.10.2023 16:34:47 UTC+05:00
**Link:** https://t.me/nest_ru/261010

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Брр...)))
- я ж выше писал, тайпорм
- Орм?
- понял

Main message:
Ну аналитику чтобы на ОРМ написать или не получится в самом ОРМ или будет куча ЖС кода или будет не оптимизированный запрос На аналитику в виде скл приятнее смотреть так как букв мало и она понятнее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну аналитику чтобы на ОРМ написать или не получится в самом ОРМ или будет куча ЖС кода или будет не оптимизированный запрос На аналитику в виде скл приятнее смотреть так как букв мало и она понятнее

--

## My telegram message #261012
**Time:** 19.10.2023 16:35:07 UTC+05:00
**Link:** https://t.me/nest_ru/261012

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Орм?
- понял
- Ну аналитику чтобы на ОРМ написать или не получится в самом ОРМ или будет куча ЖС кода или будет не оптимизированный запрос На аналитику в виде скл приятнее смотреть так как букв мало и она понятнее
- согласен

Main message:
Тесты не нужно забывать писать для них всегда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тесты не нужно забывать писать для них всегда

--

## My telegram message #261016
**Time:** 19.10.2023 16:37:21 UTC+05:00
**Link:** https://t.me/nest_ru/261016

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Или будет кверибилдер на тыщу строк

Main message:
Ага, ну это подмножество кучи ЖС кода

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ага, ну это подмножество кучи ЖС кода

--

## My telegram message #261020
**Time:** 19.10.2023 16:47:51 UTC+05:00
**Link:** https://t.me/nest_ru/261020

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- есть вопрос смотри
- Или будет кверибилдер на тыщу строк
- Ага, ну это подмножество кучи ЖС кода
- я написал декоратор чтобы я задавал что надо чтобы пропускал import { SetMetadata } from ' @nestjs /common'; export const PERMISSION_KEYS = 'permissions'; export const Permissions = (...permissions: string[]) => SetMetadata(PERMISSION_KEYS, permissions);

Main message:
выглядит все норм, хз)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

выглядит все норм, хз)

--

