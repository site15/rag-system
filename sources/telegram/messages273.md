## My telegram message #303790
**Time:** 21.06.2024 01:52:36 UTC+05:00
**Link:** https://t.me/nest_ru/303790

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://t.me/nestjs_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nestjs_jobs

--

## My telegram message #303835
**Time:** 21.06.2024 12:22:15 UTC+05:00
**Link:** https://t.me/nest_ru/303835

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну парсер ведь будет пробегаться по всей строке для того, чтобы буквально спарсить содержание каждого тега. Чтобы иммитирововать работу обычного js'а, например как с вызовом querySelector или childNodes, разве нет?

Main message:
https://cheerio.js.org/ найди нужный элемент через селектор  $('h2.title').text(); // "Hello world"

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://cheerio.js.org/ найди нужный элемент через селектор  $('h2.title').text(); // "Hello world"

--

## My telegram message #303859
**Time:** 21.06.2024 17:44:58 UTC+05:00
**Link:** https://t.me/nest_ru/303859

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет кто-то пробовал проектировать/писать приложения в таком стиле что весь модуль (контроллер/репозиторий/крон джобы и тд) завернуты в либу и само приложение просто импортит нужные модули и делает бутстрап

Main message:
я так делаю, называю это фича модулем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я так делаю, называю это фича модулем

--

## My telegram message #303863
**Time:** 21.06.2024 17:46:48 UTC+05:00
**Link:** https://t.me/nest_ru/303863

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- правильно понимаю что модуль содержит абсолютно все от этой фичи? очереди/крон и тд

Main message:
ага, все что домену/фиче этой нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, все что домену/фиче этой нужно

--

## My telegram message #303867
**Time:** 21.06.2024 17:49:01 UTC+05:00
**Link:** https://t.me/nest_ru/303867

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- и конечное приложение просто набор импортированых фич в app.module? и еще такой момент что делать если будет ситуация что фиче надо репозиторий например с другой фичи или подобные кейсы

Main message:
на уровне апп модуля создаю папку интеграции и там соединяю через сервис, который передаю как конфиг в модуль фичи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на уровне апп модуля создаю папку интеграции и там соединяю через сервис, который передаю как конфиг в модуль фичи

--

## My telegram message #303876
**Time:** 21.06.2024 17:51:35 UTC+05:00
**Link:** https://t.me/nest_ru/303876

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Крч, это обычный dynamicModule, тут нет никаких арх подходов великих

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #303882
**Time:** 21.06.2024 17:53:12 UTC+05:00
**Link:** https://t.me/nest_ru/303882

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- Просто каждый модуль регается не как обычно мы привыкли, а через Feature.register({ env1: true })
- Так а в чем преимущество?
- в доке почитай

Main message:
так как у меня много такого, я вообще свою версию динамик модулей сделал  https://habr.com/ru/articles/788916/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так как у меня много такого, я вообще свою версию динамик модулей сделал  https://habr.com/ru/articles/788916/

--

## My telegram message #303886
**Time:** 21.06.2024 17:56:47 UTC+05:00
**Link:** https://t.me/nest_ru/303886

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Все таки dynaicModule это как бы про core libs, хотя, если есть запрос шарить бизнес логику, то наверн это лучший подход

Main message:
изолированность сильная как кода так и базы, можно в любой момент фичу унести в микросервис или соседний проект, а как показывает практика при росте нагрузки полюбас фича уедит в мс, а если компания захочет штамповать софт и переиспользовать фичи то легко делаешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

изолированность сильная как кода так и базы, можно в любой момент фичу унести в микросервис или соседний проект, а как показывает практика при росте нагрузки полюбас фича уедит в мс, а если компания захочет штамповать софт и переиспользовать фичи то легко делаешь

--

## My telegram message #303900
**Time:** 21.06.2024 18:00:10 UTC+05:00
**Link:** https://t.me/nest_ru/303900

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Какая разница - у тебя модуль это 1 еденица логики отвечающая сама за себя

Main message:
это фича модуль, там прям кусок бизнес логики, с 25 таблицами

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это фича модуль, там прям кусок бизнес логики, с 25 таблицами

--

## My telegram message #303908
**Time:** 21.06.2024 18:03:21 UTC+05:00
**Link:** https://t.me/nest_ru/303908

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Возможно и так, какая разница скок таблиц зарегано в модуле

Main message:
я про код который для этого всего написан, если не разделять по доменам код и базу жестко сразу, то у тя перевяжется в проекте все на все и когда начнешь разделять сложно будет, а когда фича модули вся внешняя логика передается только через конфиг, и можно легко унести и потом докинуть в другом проекте иную реализацию

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я про код который для этого всего написан, если не разделять по доменам код и базу жестко сразу, то у тя перевяжется в проекте все на все и когда начнешь разделять сложно будет, а когда фича модули вся внешняя логика передается только через конфиг, и можно легко унести и потом докинуть в другом проекте иную реализацию

--

## My telegram message #303916
**Time:** 21.06.2024 18:04:54 UTC+05:00
**Link:** https://t.me/nest_ru/303916

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
хз, когда я писал на шарпе все по разному писали, как и в несте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хз, когда я писал на шарпе все по разному писали, как и в несте

--

## My telegram message #303922
**Time:** 21.06.2024 18:06:54 UTC+05:00
**Link:** https://t.me/nest_ru/303922

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Если тебе нужно мигрейтить фичу, то ты берешь и заворачиваешь эту фичу в нпм либу, кидаешь пир депсы, абстрагируешь енв и в бой

Main message:
в nx сразу либы паблишебл и сем вер и нпм паблишь, удобно, сразу публикуется даже когда не надо))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в nx сразу либы паблишебл и сем вер и нпм паблишь, удобно, сразу публикуется даже когда не надо))

--

## My telegram message #303925
**Time:** 21.06.2024 18:07:28 UTC+05:00
**Link:** https://t.me/nest_ru/303925

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если тебе нужно мигрейтить фичу, то ты берешь и заворачиваешь эту фичу в нпм либу, кидаешь пир депсы, абстрагируешь енв и в бой
- там миграции и тп лежат же еще
- в nx сразу либы паблишебл и сем вер и нпм паблишь, удобно, сразу публикуется даже когда не надо))
- Ладно, я вообще за уменьшение кол-ва кода в целом

Main message:
за связанностью

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

за связанностью

--

## My telegram message #303930
**Time:** 21.06.2024 18:08:22 UTC+05:00
**Link:** https://t.me/nest_ru/303930

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- наш подход и есть меньший бойлерплит, не ?

Main message:
я ща круды не пишу совсем) генерю, пишу только бизнес логики

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я ща круды не пишу совсем) генерю, пишу только бизнес логики

--

## My telegram message #303934
**Time:** 21.06.2024 18:11:39 UTC+05:00
**Link:** https://t.me/nest_ru/303934

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
ну конфиг он же шарит опции через которые я связываю фичу с другими штуками, тоесть эта абстракция используется сразу после создания

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну конфиг он же шарит опции через которые я связываю фичу с другими штуками, тоесть эта абстракция используется сразу после создания

--

## My telegram message #303940
**Time:** 21.06.2024 18:12:39 UTC+05:00
**Link:** https://t.me/nest_ru/303940

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Gql? Кастомное решение?

Main message:
https://www.npmjs.com/package/typegraphql-prisma-nestjs 100 раз скидывал)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://www.npmjs.com/package/typegraphql-prisma-nestjs 100 раз скидывал)

--

## My telegram message #303945
**Time:** 21.06.2024 18:14:50 UTC+05:00
**Link:** https://t.me/nest_ru/303945

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- но суть в том, что когда в AuthModule.forRoot начинают кидать реализации onAuth AuthModule.forRoot({ onAuth, onRefreshTokenUpdated })

Main message:
да, это уже модули ради модулей, слишком сильно бьют

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, это уже модули ради модулей, слишком сильно бьют

--

## My telegram message #303951
**Time:** 21.06.2024 18:15:58 UTC+05:00
**Link:** https://t.me/nest_ru/303951

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Получается есть абстракция что сделать после авторизации и вроде все ок

Main message:
если евент то норм о факте входа, если реализация входа то не норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если евент то норм о факте входа, если реализация входа то не норм

--

## My telegram message #303958
**Time:** 21.06.2024 18:19:06 UTC+05:00
**Link:** https://t.me/nest_ru/303958

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я пробовал так когда надо тянуть много разных модулей это становится больно

Main message:
слишком мелкие модули ибо были

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

слишком мелкие модули ибо были

--

## My telegram message #303972
**Time:** 21.06.2024 18:22:10 UTC+05:00
**Link:** https://t.me/nest_ru/303972

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я же говорю, я просто явно сделаю вот так AuthModule.forRoot({ accessTokenSecret: '123312' }) // auth.service.ts async signUp() { // sign-up this.onSignUp(); } private async onSignUp() { this.mailService.send(); }

Main message:
такой вид модулей я называю корами, такое нет смысла передавать через конфиг, про емайл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

такой вид модулей я называю корами, такое нет смысла передавать через конфиг, про емайл

--

## My telegram message #303994
**Time:** 21.06.2024 18:25:34 UTC+05:00
**Link:** https://t.me/nest_ru/303994

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- но то что мы прокидываем депсы снаружи я не считаю болерплит

Main message:
не всегда нужно их докидывать, пример с нотификациями Никиты, там не нужно, до тех по пока еще не прилетит подобная таска на афтер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не всегда нужно их докидывать, пример с нотификациями Никиты, там не нужно, до тех по пока еще не прилетит подобная таска на афтер

--

## My telegram message #304011
**Time:** 21.06.2024 18:32:42 UTC+05:00
**Link:** https://t.me/nest_ru/304011

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- так все мсы и есть по сути как цельное приложение надо копия всего этого)

Main message:
Есть лёгкое решение - ветка под другой бизнес, и через некую енву переключаешь режим апа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть лёгкое решение - ветка под другой бизнес, и через некую енву переключаешь режим апа

--

## My telegram message #304014
**Time:** 21.06.2024 18:38:20 UTC+05:00
**Link:** https://t.me/nest_ru/304014

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так все мсы и есть по сути как цельное приложение надо копия всего этого)
- Всем привет! Когда я создаю микросервис на RabbitMQ, у меня в итоге видно 2 подключения. Делал по офф доке + использовал  https://www.npmjs.com/package/@golevelup/nestjs-rabbitmq 1ое подключение (main.ts):  async function bootstrap() { const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, configuration().rabbitMq); await app.listen(); }  2ое подключение (topic.service.ts):  @RabbitSubscribe({ routingKey: 'user.suggest.register', exchange: 'topic.test', queue: 'queue.notifications', }) public handler1(msg: {}) { console.log(`Received message from EXCHANGE topic: ${JSON.stringify(msg)}`); }  Всё работает. Но мне почему-то кажется, что 1 подключение было бы логичнее. Я не знаю, как так сделать, и вообще правильно ли это будет. Можете подсказать, кто знает?
- Есть лёгкое решение - ветка под другой бизнес, и через некую енву переключаешь режим апа
- та я уже думал в рамках nx чтоб шарить либы сделать как я уже кидал вчера  /apps /app1 /ms-1 /ms-2 ... /app2 /ms-1 /ms-2 ... /libs /ms-1 /ms-2 /shared

Main message:
про ветки это не только ветки, это история где есть сабтрии гита, можно в разные места одну и туже репу саб три воткнуть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

про ветки это не только ветки, это история где есть сабтрии гита, можно в разные места одну и туже репу саб три воткнуть

--

## My telegram message #304017
**Time:** 21.06.2024 18:49:28 UTC+05:00
**Link:** https://t.me/nest_ru/304017

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Когда я создаю микросервис на RabbitMQ, у меня в итоге видно 2 подключения. Делал по офф доке + использовал  https://www.npmjs.com/package/@golevelup/nestjs-rabbitmq 1ое подключение (main.ts):  async function bootstrap() { const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, configuration().rabbitMq); await app.listen(); }  2ое подключение (topic.service.ts):  @RabbitSubscribe({ routingKey: 'user.suggest.register', exchange: 'topic.test', queue: 'queue.notifications', }) public handler1(msg: {}) { console.log(`Received message from EXCHANGE topic: ${JSON.stringify(msg)}`); }  Всё работает. Но мне почему-то кажется, что 1 подключение было бы логичнее. Я не знаю, как так сделать, и вообще правильно ли это будет. Можете подсказать, кто знает?

Main message:
главное чтобы консоль лог один раз отрабатывал, стандартный нест потход не потходит чтоли? зачем левую либу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

главное чтобы консоль лог один раз отрабатывал, стандартный нест потход не потходит чтоли? зачем левую либу

--

## My telegram message #304022
**Time:** 21.06.2024 18:55:22 UTC+05:00
**Link:** https://t.me/nest_ru/304022

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- С этим норм, отрабатывает 1 раз. Та либа нужна, потому что мне надо заюзать тип exchange topic, я не понял, как это сделать из коробки. Я еще это сделал ручками в amqplib в соседнем файле service, но мне чёт не очень понравилось, как это написано. Хотя это помогло хоть немного разобраться, что я вообще делаю (я только начал в брокеры сообщений и в нест в принципе)

Main message:
тут нету чтоли?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тут нету чтоли?

--

## My telegram message #304024
**Time:** 21.06.2024 18:56:41 UTC+05:00
**Link:** https://t.me/nest_ru/304024

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Нету чего? Topic? Ну я не понял, как это можно тут указать. Ты знаешь? Можешь подсказать, как?

Main message:
у меня сейчас на проектах нет рмк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня сейчас на проектах нет рмк

--

## My telegram message #304026
**Time:** 21.06.2024 19:04:34 UTC+05:00
**Link:** https://t.me/nest_ru/304026

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Понял, жаль 🙁 Ну ладно, мне подойдёт и так, пожалуй. Я просто хотел разобраться, никак не пойму, почему там 2 подключения. Их, кстати, также 2 если использовать только то, что в доке. Но при этом отрабатывает всё 1 раз (грубо говоря, 1 раз нажал — 1 раз отправил — 1 раз получил). А вот именно 1 раз подключиться удалось только с amqp, но там я только отправляю в exchange. Наверное 1 подключение — на sub, второе — на pub, может как-то так это работает... Ладно, в любом случае, спасибо!

Main message:
да в рмк из коробки не стрима/рпц это эмулируется через второе подключение, я когда рмк юзал, на этом сидел  https://github.com/AlariCode/nestjs-rmq если что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да в рмк из коробки не стрима/рпц это эмулируется через второе подключение, я когда рмк юзал, на этом сидел  https://github.com/AlariCode/nestjs-rmq если что

--

## My telegram message #304029
**Time:** 21.06.2024 19:08:54 UTC+05:00
**Link:** https://t.me/nest_ru/304029

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ты о каких стримах?

Main message:
https://docs.nats.io/nats-concepts/jetstream/streams  https://habr.com/ru/articles/747658/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://docs.nats.io/nats-concepts/jetstream/streams  https://habr.com/ru/articles/747658/

--

## My telegram message #304032
**Time:** 21.06.2024 19:10:08 UTC+05:00
**Link:** https://t.me/nest_ru/304032

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Есть в рмк

Main message:
раньше не было, не слежу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

раньше не было, не слежу

--

## My telegram message #304034
**Time:** 21.06.2024 19:10:22 UTC+05:00
**Link:** https://t.me/nest_ru/304034

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://docs.nats.io/nats-concepts/jetstream/streams  https://habr.com/ru/articles/747658/
- Есть в рмк
- раньше не было, не слежу
- https://www.rabbitmq.com/docs/streams

Main message:
там была эмуляция через код

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там была эмуляция через код

--

## My telegram message #304039
**Time:** 21.06.2024 19:11:20 UTC+05:00
**Link:** https://t.me/nest_ru/304039

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, тут есть кто берет заказы по nest.js. Мы небольшой стартап)

Main message:
https://t.me/nestjs_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nestjs_jobs

--

## My telegram message #304218
**Time:** 25.06.2024 11:00:09 UTC+05:00
**Link:** https://t.me/nest_ru/304218

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всём привет)) ребята подскажите, второй день бьюсь над реализацией микросервисов под паттерн event bus, в качестве брокера использую kafka. Если у кого то есть код, чтоб показать на примере поделитесь пожалуйста) или подскажите как у вас это на практике решалось)

Main message:
что это такое?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

что это такое?

--

## My telegram message #304222
**Time:** 25.06.2024 11:51:22 UTC+05:00
**Link:** https://t.me/nest_ru/304222

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да опечтался просто )

Main message:
сам себе таску такую придумал или кто-то дал?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сам себе таску такую придумал или кто-то дал?

--

## My telegram message #304226
**Time:** 25.06.2024 11:52:52 UTC+05:00
**Link:** https://t.me/nest_ru/304226

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- на работе)

Main message:
на каждой работе с микросервисами по разному работают, если у вас уже есть практики работы с кафка то изучи их код

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на каждой работе с микросервисами по разному работают, если у вас уже есть практики работы с кафка то изучи их код

--

## My telegram message #304228
**Time:** 25.06.2024 11:56:30 UTC+05:00
**Link:** https://t.me/nest_ru/304228

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сам себе таску такую придумал или кто-то дал?
- на работе)
- на каждой работе с микросервисами по разному работают, если у вас уже есть практики работы с кафка то изучи их код
- так если бы он был) я первопроходец в каком-то смысле )

Main message:
позапускай все примеры отсюда  https://github.com/nestjs/nest/tree/master/integration/microservices и разберись че как работает, может тебе не кафка нужна а булл, или натс, или рмк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

позапускай все примеры отсюда  https://github.com/nestjs/nest/tree/master/integration/microservices и разберись че как работает, может тебе не кафка нужна а булл, или натс, или рмк

--

## My telegram message #304230
**Time:** 25.06.2024 12:05:34 UTC+05:00
**Link:** https://t.me/nest_ru/304230

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Какой инструмент используете для фоновых задач в рантайме? Bull ?

Main message:
У меня сейчас мвп этап, поэтому нест шедуля тупа, потом возможно поищу чет готовое, в плане готовый мс для кронджобов и просто буду там таски создавать и указывать веб хук

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня сейчас мвп этап, поэтому нест шедуля тупа, потом возможно поищу чет готовое, в плане готовый мс для кронджобов и просто буду там таски создавать и указывать веб хук

--

## My telegram message #304263
**Time:** 25.06.2024 16:53:41 UTC+05:00
**Link:** https://t.me/nest_ru/304263

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
каждый отвечает когда хочет, нет правила общего) по корсам например я когда спотыкаюсь - просто иду гуглю или смотрю в соседнем проекте, решаю и дальше иду когда я не могу найти ответ больше 2х дней я уже пишу сюда)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

каждый отвечает когда хочет, нет правила общего) по корсам например я когда спотыкаюсь - просто иду гуглю или смотрю в соседнем проекте, решаю и дальше иду когда я не могу найти ответ больше 2х дней я уже пишу сюда)

--

## My telegram message #304307
**Time:** 25.06.2024 17:17:13 UTC+05:00
**Link:** https://t.me/nest_ru/304307

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- можно и так, но это дольше. ответчику легче кинуть тебе строчку кода, чем объяснять ещё в добавок как это работает. если он объяснит, то, конечно, это круто. у него же нет времени. поэтому он кидает тебе код, а ты разбираешься.

Main message:
https://t.me/nest_random

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_random

--

## My telegram message #304478
**Time:** 26.06.2024 01:02:03 UTC+05:00
**Link:** https://t.me/nest_ru/304478

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy , предлагаю очистить чат до этого сообщения  https://t.me/nest_ru/304355

Main message:
Потомкам оставил, никого не баню, не вижу причин, если что флудить тут  https://t.me/nest_random

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Потомкам оставил, никого не баню, не вижу причин, если что флудить тут  https://t.me/nest_random

--

## My telegram message #304515
**Time:** 26.06.2024 19:53:40 UTC+05:00
**Link:** https://t.me/nest_ru/304515

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Понял. Ты хочешь модель прокидывать нижележащую. Сам я так не делаю. Если что - или форкай генератор под себя, или PR. Не знаю как это правильно реализовывать. Допустим туда надо UpdateCards? CreateCards? а если удалить хочется? А если приходят частично объекты, те что не в списке удалять? В общем каждый решает для себя сам. Как вариант, я бы предложил оставить папки интерфейсов и классов как есть (автосоздаваемые). Создать ещё папки с ручными, и дообгрейдить: export interface UpdateTourWithCardInterface extends UpdateFileInterface { cards?: CardInterface[]; }

Main message:
я у себя вот  такую штуку воткнул как раз для таких кейсов  @TypeGraphQL.optional(input: ["create", "update"])

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я у себя вот  такую штуку воткнул как раз для таких кейсов  @TypeGraphQL.optional(input: ["create", "update"])

--

## My telegram message #304523
**Time:** 26.06.2024 21:30:39 UTC+05:00
**Link:** https://t.me/nest_ru/304523

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- #вакансия  Формат работы:   #удаленка Занятость:  #полная (начинаем со сдельной работы, один заказ) Зарплатная вилка: от 400$ до 800$ (в зависимости от навыков во фронте) Контакты:  https://t.me/denterukorn  Описание вакансии:  Необходим frontend с навыками next.js + tailwind.css + nest.js (для подключения по API) разработчик для того чтобы доработать телеграм-приложение. Нужен на постоянную основу, сначала доработаем приложение - после нужно еще переписать многое и заложить архитектуру для следующих апдейтов.

Main message:
https://t.me/nestjs_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nestjs_jobs

--

## My telegram message #304526
**Time:** 27.06.2024 00:53:51 UTC+05:00
**Link:** https://t.me/nest_ru/304526

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- кто то работал с  prisma.io

Main message:
https://t.me/prisma_ru

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/prisma_ru

--

## My telegram message #304747
**Time:** 27.06.2024 21:20:25 UTC+05:00
**Link:** https://t.me/nest_ru/304747

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy у тебя что-то было на несте в бигдату? сколько выдавало?

Main message:
у меня была симуляция, непомню уже, я е2е гнал в 100тыщ потоках

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня была симуляция, непомню уже, я е2е гнал в 100тыщ потоках

--

## My telegram message #304749
**Time:** 27.06.2024 21:22:36 UTC+05:00
**Link:** https://t.me/nest_ru/304749

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сколько на один процесс рпс должен быть?
- @KaufmanEndy у тебя что-то было на несте в бигдату? сколько выдавало?
- у меня была симуляция, непомню уже, я е2е гнал в 100тыщ потоках
- А на один процесс сколько вытягивал?

Main message:
вообще хз, я просто знал что мне нужно скейлить и оптимизировать и куда можно воткнуть кэш, и просто из 7 одновременных е2е, смог до 100тыщ дотянуть чтобы бэк не глох и не падал на том же железо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вообще хз, я просто знал что мне нужно скейлить и оптимизировать и куда можно воткнуть кэш, и просто из 7 одновременных е2е, смог до 100тыщ дотянуть чтобы бэк не глох и не падал на том же железо

--

## My telegram message #304760
**Time:** 27.06.2024 21:39:36 UTC+05:00
**Link:** https://t.me/nest_ru/304760

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вообще хз, я просто знал что мне нужно скейлить и оптимизировать и куда можно воткнуть кэш, и просто из 7 одновременных е2е, смог до 100тыщ дотянуть чтобы бэк не глох и не падал на том же железо
- это очень много
- Чёт кажется тоже ту матч даже для стресса
- если все 100_000 ломанутся на сервер, то там можешь все что хочешь делать - сервер упадет

Main message:
я нагрузу чекал чтобы бэк вообще смог все отработать не важно ак быстро

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я нагрузу чекал чтобы бэк вообще смог все отработать не важно ак быстро

--

## My telegram message #304764
**Time:** 27.06.2024 21:40:25 UTC+05:00
**Link:** https://t.me/nest_ru/304764

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если все 100_000 ломанутся на сервер, то там можешь все что хочешь делать - сервер упадет
- я нагрузу чекал чтобы бэк вообще смог все отработать не важно ак быстро
- Ну… смотря какая базовая нагрузка :) может и этого мало будет
- тут уже обычным сервером не отделаешься

Main message:
вот, там и транзы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот, там и транзы

--

## My telegram message #304766
**Time:** 27.06.2024 21:40:39 UTC+05:00
**Link:** https://t.me/nest_ru/304766

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну… смотря какая базовая нагрузка :) может и этого мало будет
- тут уже обычным сервером не отделаешься
- вот, там и транзы
- Нада мощная база + max_connections_pool в 1000 думаю

Main message:
вот это все чтобы не втсало колом

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот это все чтобы не втсало колом

--

## My telegram message #304769
**Time:** 27.06.2024 21:41:01 UTC+05:00
**Link:** https://t.me/nest_ru/304769

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Нада мощная база + max_connections_pool в 1000 думаю

Main message:
не, без увелечения конекшенов иначе база встает колом

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, без увелечения конекшенов иначе база встает колом

--

## My telegram message #304772
**Time:** 27.06.2024 21:42:38 UTC+05:00
**Link:** https://t.me/nest_ru/304772

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот это все чтобы не втсало колом
- Крч, не, точно встанет колом
- не, без увелечения конекшенов иначе база встает колом
- без увеличения коннекшенов ты начнешь ловить ошибки по таймауту от бд

Main message:
если транзакций нет, то оно шустрее работает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если транзакций нет, то оно шустрее работает

--

## My telegram message #304776
**Time:** 27.06.2024 21:43:42 UTC+05:00
**Link:** https://t.me/nest_ru/304776

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не, без увелечения конекшенов иначе база встает колом
- без увеличения коннекшенов ты начнешь ловить ошибки по таймауту от бд
- если транзакций нет, то оно шустрее работает
- Ну если все на редис локах, то да, но все равно, даже так умрет)

Main message:
если быстро отдавать не умирает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если быстро отдавать не умирает

--

## My telegram message #304784
**Time:** 27.06.2024 21:47:25 UTC+05:00
**Link:** https://t.me/nest_ru/304784

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
кстати да, там без ран ин банд было)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кстати да, там без ран ин банд было)

--

## My telegram message #304790
**Time:** 27.06.2024 21:49:15 UTC+05:00
**Link:** https://t.me/nest_ru/304790

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
ну я так и делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я так и делал

--

## My telegram message #304800
**Time:** 27.06.2024 21:53:38 UTC+05:00
**Link:** https://t.me/nest_ru/304800

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кстати да, там без ран ин банд было)
- Если ты запускаешь тесты, то там не запустится в параллель 100_000
- ну я так и делал
- ну это ни на что не влияет

Main message:
я не знаю как оно под копотом работает по ядрам, получил падение на 100тыщ, начал уменьшать и потом после оптимизаций в обратку увеличивать, да там были некие проблемы с хттп, как то решил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я не знаю как оно под копотом работает по ядрам, получил падение на 100тыщ, начал уменьшать и потом после оптимизаций в обратку увеличивать, да там были некие проблемы с хттп, как то решил

--

## My telegram message #304804
**Time:** 27.06.2024 22:11:52 UTC+05:00
**Link:** https://t.me/nest_ru/304804

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я так и делал
- ну это ни на что не влияет
- я не знаю как оно под копотом работает по ядрам, получил падение на 100тыщ, начал уменьшать и потом после оптимизаций в обратку увеличивать, да там были некие проблемы с хттп, как то решил
- Уважаемые, как вы пишите модульные тесты? Для контроллера мокаете сервис и проверяете что сервис отдает ожидаемые для него данные? А как тестируете сервис? Мокаете репозиторий и делаете тесты чисто на бизнес логику?

Main message:
если у тебя контроллер как прокси просто, то его нет смысла тестировать, а если есть некие гарды то для них в рамках теста создаешь контроллер и чекаешь работу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если у тебя контроллер как прокси просто, то его нет смысла тестировать, а если есть некие гарды то для них в рамках теста создаешь контроллер и чекаешь работу

--

## My telegram message #304834
**Time:** 28.06.2024 12:35:53 UTC+05:00
**Link:** https://t.me/nest_ru/304834

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- но я же все равно должен буду использовать бдшные транзакции при обновлении группы сущностей редис локи же по сути конкаренси аксесс только дает
- Lf
- аа, все, спасибо) обнял
- Но я говорил про строгий уровень изоляции

Main message:
Лефт джойны кстати увеличивают время работы запросов в БД, если параллельно долбануть, оперативка на машине с базой растёт и база медленее работает, и может встать колом вообще Такой кейс был ещё по оптимизации, этот затык решил перевод с тайп ОРМ на призму этих кусков кода которые тормозили

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Лефт джойны кстати увеличивают время работы запросов в БД, если параллельно долбануть, оперативка на машине с базой растёт и база медленее работает, и может встать колом вообще Такой кейс был ещё по оптимизации, этот затык решил перевод с тайп ОРМ на призму этих кусков кода которые тормозили

--

## My telegram message #304842
**Time:** 28.06.2024 12:46:49 UTC+05:00
**Link:** https://t.me/nest_ru/304842

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- какой кстати размер пула стоит ставить на приложуху с предпологаемым колличеством пользователей активных - 1к? но что бы и не обвалилось оно если там чуть больше зайдет

Main message:
Есть формула по железу на сервере БД по ней и ставишь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть формула по железу на сервере БД по ней и ставишь

--

## My telegram message #304845
**Time:** 28.06.2024 12:50:21 UTC+05:00
**Link:** https://t.me/nest_ru/304845

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну тут же смотря куда ты делаешь left join
- какой кстати размер пула стоит ставить на приложуху с предпологаемым колличеством пользователей активных - 1к? но что бы и не обвалилось оно если там чуть больше зайдет
- Есть формула по железу на сервере БД по ней и ставишь
- ?

Main message:
Сходу не скажу, я этот параметр меняю очень редко, на текущем у меня мвп, ещё предстоят работы по оптимизации и только после них и после выбора сервера и после понимания сколько нужно макс онлайн держать буду смотреть стоит ли железо на БД увеличить или пулл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сходу не скажу, я этот параметр меняю очень редко, на текущем у меня мвп, ещё предстоят работы по оптимизации и только после них и после выбора сервера и после понимания сколько нужно макс онлайн держать буду смотреть стоит ли железо на БД увеличить или пулл

--

## My telegram message #304869
**Time:** 28.06.2024 13:05:08 UTC+05:00
**Link:** https://t.me/nest_ru/304869

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а она есть

Main message:
выруби, пока занимаешся оптимизацией

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

выруби, пока занимаешся оптимизацией

--

