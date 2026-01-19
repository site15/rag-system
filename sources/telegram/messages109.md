## My telegram message #111943
**Time:** 19.06.2021 15:50:58 UTC+05:00
**Link:** https://t.me/nest_ru/111943

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А вы используете вообще ормки?

Main message:
Саму базу создавай например через flyway миграции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Саму базу создавай например через flyway миграции

--

## My telegram message #111945
**Time:** 19.06.2021 15:51:31 UTC+05:00
**Link:** https://t.me/nest_ru/111945

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А вы используете вообще ормки?
- Саму базу создавай например через flyway миграции
- Сложно уже пошло

Main message:
https://github.com/site15/site15.ru/blob/develop/migrations/V202008041000__Init.pgsql

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/site15/site15.ru/blob/develop/migrations/V202008041000__Init.pgsql

--

## My telegram message #111947
**Time:** 19.06.2021 15:51:51 UTC+05:00
**Link:** https://t.me/nest_ru/111947

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://github.com/site15/site15.ru/blob/develop/migrations/V202008041000__Init.pgsql

Main message:
Вот проект на призме

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вот проект на призме

--

## My telegram message #111950
**Time:** 19.06.2021 15:52:56 UTC+05:00
**Link:** https://t.me/nest_ru/111950

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я ща скажу как я делал, значит открываешь докер, там лежит мускул или пг, берём заходим в консоль и создаём все таблицы, потом при создании таблицы переносим этот кусочек кода в папочку скл

Main message:
Это и есть миграции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это и есть миграции

--

## My telegram message #111954
**Time:** 19.06.2021 15:53:47 UTC+05:00
**Link:** https://t.me/nest_ru/111954

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
С течением времени объекты в базе меняются и нужны доп скрипты, это доп миграции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

С течением времени объекты в базе меняются и нужны доп скрипты, это доп миграции

--

## My telegram message #111957
**Time:** 19.06.2021 15:54:11 UTC+05:00
**Link:** https://t.me/nest_ru/111957

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Потом сидим и описываем сами сущности , которые могут приходить с бд

Main message:
В призме не нужно это делать, она сама все сделает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В призме не нужно это делать, она сама все сделает

--

## My telegram message #111961
**Time:** 19.06.2021 15:54:42 UTC+05:00
**Link:** https://t.me/nest_ru/111961

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- С течением времени объекты в базе меняются и нужны доп скрипты, это доп миграции
- И все, потом просто пишешь запрос и вешаешь на него модель
- В призме не нужно это делать, она сама все сделает
- А призма это генератор таблиц ?

Main message:
Типа орм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Типа орм

--

## My telegram message #111972
**Time:** 19.06.2021 15:57:41 UTC+05:00
**Link:** https://t.me/nest_ru/111972

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Посмотреть тип как они это делали ?

Main message:
В нём все есть, что нужно, и мульти диай и парент диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В нём все есть, что нужно, и мульти диай и парент диай

--

## My telegram message #111975
**Time:** 19.06.2021 15:58:20 UTC+05:00
**Link:** https://t.me/nest_ru/111975

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- inversify, например, глянуть можно
- Посмотреть тип как они это делали ?
- В нём все есть, что нужно, и мульти диай и парент диай
- Не, мне нужно именно ручками все написать

Main message:
М, бесполезная работа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

М, бесполезная работа

--

## My telegram message #111984
**Time:** 19.06.2021 15:59:55 UTC+05:00
**Link:** https://t.me/nest_ru/111984

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нет, такое я могу сделать
- А так, вот видел от Мелихова тебе на эту тему, кратко  https://www.youtube.com/watch?v=u6gAVCEJjQ4
- Это я видел, ну я хотел именно реализацию под капотом
- Ну посмотри исходники неста или инверсифай, та и все) Вообще да, бесполезная работа)

Main message:
Нет работы глупее чем делать то что другие уже сделали

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нет работы глупее чем делать то что другие уже сделали

--

## My telegram message #112166
**Time:** 21.06.2021 10:59:42 UTC+05:00
**Link:** https://t.me/nest_ru/112166

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А что не понятно то? Обновляй только те поля, которые пришли с фронта
- Ну смотри, ты делаешь dto для update в которой все поля будут с декоратором  @IsOptional () - в контролере сразу делаем проверку Object.keys(myUpdateDtoFromRequestBody).length и если будет false (послали пустой запрос), говорим пользователю что нужно хоть одно поле отправить для обновления. Потом этот самый myUpdateDtoFromRequestBody отдаем в сервис для обновления, не нужно его мапить руками - просто передай this.model.updateOne({_id: todo._id}, myUpdateDtoFromRequestBody) и все. Таким образом у тебя будут обновляться только те поля которые пользователь отправил с фронта.
- Не все. PK обязателен
- А нафига ты его вообще читаешь и только потом делаешь update ?

Main message:
Там же через квери билдер надо там есть метод SET

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там же через квери билдер надо там есть метод SET

--

## My telegram message #112445
**Time:** 21.06.2021 22:08:20 UTC+05:00
**Link:** https://t.me/nest_ru/112445

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Он и есть в отдельном модуле. Есть модуль с двумя сервисами A и B. Сервисов таких может быть хоть 500. Я нормально заинжектил модуль, прописал модуль A в провайдеры. Но он хочет все сервисы своего же модуля от которых звисит. Можно ли инжектить с уже подтянутыми зависимостями (наверняка да) и как это сделать правильно?
- Сделай экспорт
- А ты сервис А запровайдил в двух модулях?
- Сервис A заэкспорчен и его модуль в который я провайдил видит нормально. Но сервис от которого зависит сервис А он не видит.

Main message:
есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть

--

## My telegram message #112452
**Time:** 21.06.2021 22:12:01 UTC+05:00
**Link:** https://t.me/nest_ru/112452

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А в чем разница будет? Сам не знаю, интересно

Main message:
в ангулар тск пропатченный как бы, на этапе билда все собирает и строит дерево зависимостей, тут это в рантайм происходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в ангулар тск пропатченный как бы, на этапе билда все собирает и строит дерево зависимостей, тут это в рантайм происходит

--

## My telegram message #112458
**Time:** 21.06.2021 22:26:18 UTC+05:00
**Link:** https://t.me/nest_ru/112458

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это разве не странно? Был сервис 5000 строк, я напилил его на 10 сервисов по 500, чтобы заиспользовать метод должен все 10 в провайдеры забить?
- в ангулар тск пропатченный как бы, на этапе билда все собирает и строит дерево зависимостей, тут это в рантайм происходит
- https://stackoverflow.com/questions/51819504/inject-nestjs-service-from-another-module
- Мне кажется есть какая-то техника. Ладно. Если вдруг кто-то владеет названием - подскажите как гуглить плиз.

Main message:
нету, ты должен всегда экспортировать то что юзаешь, в ангулар оно подхватвыет само

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нету, ты должен всегда экспортировать то что юзаешь, в ангулар оно подхватвыет само

--

## My telegram message #112463
**Time:** 21.06.2021 22:34:55 UTC+05:00
**Link:** https://t.me/nest_ru/112463

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://stackoverflow.com/questions/51819504/inject-nestjs-service-from-another-module
- Мне кажется есть какая-то техника. Ладно. Если вдруг кто-то владеет названием - подскажите как гуглить плиз.
- нету, ты должен всегда экспортировать то что юзаешь, в ангулар оно подхватвыет само
- Не понял, что значит подхватывает само? Если есть три модуля А В и С и в каждом соответственно есть сервисы a, b и с, Сервисы a и b зависят от с Соответственно каждый сервис нужно запровайдить только в своём модуле, а сервис с заэкспортить. В модулях A и B импортнуть модуль С и использовать спокойно сервис с. По идее зависимости сервиса с должны быть запровайжены в самом модуле С, и при подключении его в других модулях нас не должно волновать что внутри него происходит.

Main message:
другой, в несте если ты экспортируешь сервис который юзает другой сервис, ты и другой должен экспортировать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

другой, в несте если ты экспортируешь сервис который юзает другой сервис, ты и другой должен экспортировать

--

## My telegram message #112619
**Time:** 23.06.2021 00:27:55 UTC+05:00
**Link:** https://t.me/nest_ru/112619

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят, всем привет. Меня зовут Руслан. Хотел задать вопрос. Буду благодарен за ответ. Как получить ответ в MySQL синхронно, допустим в том же цикле. Выполнил запрос следом записал в массив и в конце вернуть этот массив.
- Всем привет! Есть две связанные сущности Product и Category. На данный момент при удалении категории удаляются и все связанные с этой категорией продукты. Как с помощью typeorm избежать этого? Хочу, чтобы у продуктов с удаленной категорией было указано  category: null
- cascade false вроде
- не сработало(

Main message:
У тя уже в базе сгенерило каскадом значит, иди смотри что в базе и сделай миграцию которая отрубит каскад

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя уже в базе сгенерило каскадом значит, иди смотри что в базе и сделай миграцию которая отрубит каскад

--

## My telegram message #112656
**Time:** 23.06.2021 13:07:42 UTC+05:00
**Link:** https://t.me/nest_ru/112656

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а с keycloac кто работал?

Main message:
Я пробовал, пришел к тому что это не нужный оверхед какой-то, руками проще можно все сделать и быстрее, чем разбираться с ним

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я пробовал, пришел к тому что это не нужный оверхед какой-то, руками проще можно все сделать и быстрее, чем разбираться с ним

--

## My telegram message #112818
**Time:** 25.06.2021 12:16:58 UTC+05:00
**Link:** https://t.me/nest_ru/112818

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- День добрый, есть менторы по nestJS, нужна консультация по некоторым вопросам можно платно, напишите в лс

Main message:
вот тут куча примеров всякого разного, пройди все, может и вопросы все исчезнут  https://wanago.io/courses/api-with-nestjs/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот тут куча примеров всякого разного, пройди все, может и вопросы все исчезнут  https://wanago.io/courses/api-with-nestjs/

--

## My telegram message #112840
**Time:** 25.06.2021 14:28:47 UTC+05:00
**Link:** https://t.me/nest_ru/112840

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- речь про e2e тесты — они все приложение поднимают, насколько я понимаю

Main message:
поэтому нужно бить на мелкие фича модули, чтобы поднять только то что нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

поэтому нужно бить на мелкие фича модули, чтобы поднять только то что нужно

--

## My telegram message #112842
**Time:** 25.06.2021 14:32:29 UTC+05:00
**Link:** https://t.me/nest_ru/112842

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- о. выглядит просто. спасибо) попробую сейчас)
- Не уверен что сработает, нужно добавить перед тестами )
- поэтому нужно бить на мелкие фича модули, чтобы поднять только то что нужно
- А как тестировать стык двух модулей?)

Main message:
я делаю юнит тесты для модулей, и е2е для поднятого бэка, через фронтовые запросы к бэку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я делаю юнит тесты для модулей, и е2е для поднятого бэка, через фронтовые запросы к бэку

--

## My telegram message #112994
**Time:** 29.06.2021 12:06:18 UTC+05:00
**Link:** https://t.me/nest_ru/112994

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Почему при запуске e2e тестов игнорируется глобальный ValidationPipe? Когда руками дергаю запросы — валидация отрабатывает, из тестов — не отрабатывает. Если укажу пайп для конкретного метода контроллера — то все хорошо

Main message:
через APP_PIPES выставляешь или через use

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через APP_PIPES выставляешь или через use

--

## My telegram message #113015
**Time:** 29.06.2021 19:35:39 UTC+05:00
**Link:** https://t.me/nest_ru/113015

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну вроде того, да
- что то оно не позволяет так делать,
- Пришли плиз в лс как ты все это инжектишь и импортируешь/экспортируешь модули
- всем привет, есть ли в несте метод для перезагрузки всего сервиса?

Main message:
Здравствуйте, друзья! Хочу пригласить вас на доклад, о перспективном node.js фреймворке  NestJS . А расскажет нам о нем  Никита Галкин - человек, который знает очень много о бекенде на node.js и охотно делится с миром своими знаниями! Никита ведет telegram канал -  @node_recipes , подписывайтесь и вы найдете большое количество качественных материалов о  node.js . Подробности доклада и регистрация -  https://mathrandom.com/webinar01072021  Дата: 1 июля 18:00  #nodejs  #nestjs  #event  #stream  #nikitagalkin

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Здравствуйте, друзья! Хочу пригласить вас на доклад, о перспективном node.js фреймворке  NestJS . А расскажет нам о нем  Никита Галкин - человек, который знает очень много о бекенде на node.js и охотно делится с миром своими знаниями! Никита ведет telegram канал -  @node_recipes , подписывайтесь и вы найдете большое количество качественных материалов о  node.js . Подробности доклада и регистрация -  https://mathrandom.com/webinar01072021  Дата: 1 июля 18:00  #nodejs  #nestjs  #event  #stream  #nikitagalkin

--

