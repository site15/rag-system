## My telegram message #326131
**Time:** 19.11.2024 18:56:01 UTC+05:00
**Link:** https://t.me/nest_ru/326131

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Может кто-то подсказать Есть socketio + nestjs Есть сервис состояния, который хранит состояние сокетов в Map. Когда я из стороннего контроллера беру length этого состояния, мне все время приходит 0  private socketState = new Map<string, Socket[]>(); public getAll(): Socket[] { const all = []; this.socketState.forEach((sockets) => all.push(sockets)); return all; }

Main message:
попробуй свойство статичным сделать static socketState у тебя возможно разные инстансы сервиса, чет с диай намутил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

попробуй свойство статичным сделать static socketState у тебя возможно разные инстансы сервиса, чет с диай намутил

--

## My telegram message #326142
**Time:** 19.11.2024 19:17:12 UTC+05:00
**Link:** https://t.me/nest_ru/326142

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Может кто-то подсказать Есть socketio + nestjs Есть сервис состояния, который хранит состояние сокетов в Map. Когда я из стороннего контроллера беру length этого состояния, мне все время приходит 0  private socketState = new Map<string, Socket[]>(); public getAll(): Socket[] { const all = []; this.socketState.forEach((sockets) => all.push(sockets)); return all; }
- попробуй свойство статичным сделать static socketState у тебя возможно разные инстансы сервиса, чет с диай намутил
- ок, спасибо
- Век живи, век учись. Все равно дураком помрешь. Такое в ts есть?  😂

Main message:
эм, я про это  @Injectable() class StateService { static states: IState[] = []; addState(state: IState) { StateService.states.push(state); } getStates() { return StateService.states; } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эм, я про это  @Injectable() class StateService { static states: IState[] = []; addState(state: IState) { StateService.states.push(state); } getStates() { return StateService.states; } }

--

## My telegram message #326214
**Time:** 20.11.2024 11:22:31 UTC+05:00
**Link:** https://t.me/nest_ru/326214

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Слева подсчет всех фасетов для товаров. Справа подсчет отфильтрованных фасетов. Подскажите как переписать запрос справа, чтобы не попавшие в фильтр фасеты оставались в выборке с нулями ?

Main message:
может left join

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может left join

--

## My telegram message #326217
**Time:** 20.11.2024 11:24:28 UTC+05:00
**Link:** https://t.me/nest_ru/326217

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не работает ни left join ни left outer join результат тот же самый

Main message:
перенеси из where в верхний on

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

перенеси из where в верхний on

--

## My telegram message #326417
**Time:** 20.11.2024 23:15:34 UTC+05:00
**Link:** https://t.me/nest_ru/326417

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Global

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Global

--

## My telegram message #326422
**Time:** 20.11.2024 23:19:18 UTC+05:00
**Link:** https://t.me/nest_ru/326422

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А зач  @Inject ()?
- Global
- Видимо уже где-то находил вариант такой. Убрал, ничего не изменилось
- Покажи как убрал

Main message:
почему у тебя в разные модули сервис провайдится один и тот же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

почему у тебя в разные модули сервис провайдится один и тот же

--

## My telegram message #326427
**Time:** 20.11.2024 23:23:21 UTC+05:00
**Link:** https://t.me/nest_ru/326427

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Лучше сразу и Nest выкинуть

Main message:
не, в несте диай он не плоский а типа древовидный, народ из жс мира в принципе не понимает как с диай работать, а тут вообще древовидный, проще не юзать его в проектах где он не нужен, и юзать как обычный плоский диай джавы или шарпа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, в несте диай он не плоский а типа древовидный, народ из жс мира в принципе не понимает как с диай работать, а тут вообще древовидный, проще не юзать его в проектах где он не нужен, и юзать как обычный плоский диай джавы или шарпа

--

## My telegram message #326467
**Time:** 21.11.2024 10:58:49 UTC+05:00
**Link:** https://t.me/nest_ru/326467

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Здравствуйте ребята! Я фронт на Vue хочу потыкать бек более структурировано и глаз пал на родной JS, выбор между express и nest не легко дался среди всех друзей беков на node нет, а поиск по иннету так и не дал информации, о том какая из либ где чаще используется, слышал что на экспрессе обертки и прокси и всякий BFF движ, но поковырявшись в Nest задался вопросом, а чем он хуже для тех же целей? Или это просто две либы для одного и того же заточеные, но одна более открыта а другая про простоту из коробки? Скорее всего я чего-то не догоняю и между express и nest есть что-то еще отличительное кроме типов и сахара, прошу простить если вопрос глупый, всем кто поможет спасибо заранее)

Main message:
если чет не большое то можно на этом  https://trpc.io , если большая срм некая то nestjs но так как ты пишешь фронт на vue то значит у тебя чет небольшое и trpc норм подойдет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если чет не большое то можно на этом  https://trpc.io , если большая срм некая то nestjs но так как ты пишешь фронт на vue то значит у тебя чет небольшое и trpc норм подойдет

--

## My telegram message #326471
**Time:** 21.11.2024 11:15:17 UTC+05:00
**Link:** https://t.me/nest_ru/326471

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет, а ты юзал trpc где нибудь в проде, как полет?

Main message:
неа, не рискнул, дома потыкал прикольная штука, новичкам в бэк разработке норм с такой штуки начинать как раз

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа, не рискнул, дома потыкал прикольная штука, новичкам в бэк разработке норм с такой штуки начинать как раз

--

## My telegram message #326604
**Time:** 21.11.2024 19:46:31 UTC+05:00
**Link:** https://t.me/nest_ru/326604

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Все функции, включая репликацию выполняет - выполняет. Бесплатно. Отказоустойчиво. Душа радуется

Main message:
ты селфхост его юзаешь?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты селфхост его юзаешь?

--

## My telegram message #326797
**Time:** 22.11.2024 23:04:35 UTC+05:00
**Link:** https://t.me/nest_ru/326797

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В целом у меня трудностей меньше, чем с РЕСТом В след проект возьму обязательно
- на нест соответственно пишешь?
- Да
- Принял, спасибо

Main message:
мне норм, но я встречал тех кто прям воюет против граф, все зависит от команды с кем работаешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне норм, но я встречал тех кто прям воюет против граф, все зависит от команды с кем работаешь

--

## My telegram message #326801
**Time:** 22.11.2024 23:25:58 UTC+05:00
**Link:** https://t.me/nest_ru/326801

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А какие основные у них причины такой ненависти к графу?

Main message:
ну надо учить чет новое, и типа зачем если стандарт рест по миру, так они говорят)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну надо учить чет новое, и типа зачем если стандарт рест по миру, так они говорят)

--

## My telegram message #327267
**Time:** 27.11.2024 00:09:59 UTC+05:00
**Link:** https://t.me/nest_ru/327267

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- но сохраняется оно в utc всегда? with withTimezone же просто даёт возможность кверить с разными timezone?

Main message:
с тайм зон путаница там получается, лучше всегда приводи все в utc0

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с тайм зон путаница там получается, лучше всегда приводи все в utc0

--

