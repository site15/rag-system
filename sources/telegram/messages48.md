## My telegram message #48769
**Time:** 20.01.2020 21:43:38 UTC+05:00
**Link:** https://t.me/nest_ru/48769

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Приветы. Начал учить nest час назад и возник такой вопрос: вот у меня есть dto (класс, а не интерфейс как и советуют в доке) и есть сущность в typeorm которая имеет те же поля что dto + еще другие которые с дефолтным значением. В dto у меня есть валидации полей, как мне лучше переиспользовать код валидации этих полей чтоб не описывать сущности по 2 раза? Я могу заэкстендить entity от dto, но тогда код будет не красивым так как хочется чтоб все поля описывались именно в этом файле. Как тут поступают по бест практике?

Main message:
можно описать валидацию отдельно и ее применять к ентити и к дто, но тогда файлы будут разные и если удалишь поле и при этом забудешь убрать валидацию из схемы - то получишь ошибку на несуществующее поле

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно описать валидацию отдельно и ее применять к ентити и к дто, но тогда файлы будут разные и если удалишь поле и при этом забудешь убрать валидацию из схемы - то получишь ошибку на несуществующее поле

--

## My telegram message #48775
**Time:** 20.01.2020 21:50:42 UTC+05:00
**Link:** https://t.me/nest_ru/48775

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Подскажите пожалуйста, почему у меня все поля в input UserInput - required?  https://i.imgur.com/UvTQCGz.png как сделать, чтобы было наоборот?

Main message:
покажи дто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

покажи дто

--

## My telegram message #48781
**Time:** 20.01.2020 21:53:58 UTC+05:00
**Link:** https://t.me/nest_ru/48781

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- dto -  https://i.imgur.com/eWtGNO3.png input -  https://i.imgur.com/FeQbIKu.png

Main message:
@Field ({ nullable: true })

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@Field ({ nullable: true })

--

## My telegram message #48784
**Time:** 20.01.2020 21:54:54 UTC+05:00
**Link:** https://t.me/nest_ru/48784

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- буду рад любой критике и советам, ибо первые часы, как пытаюсь освоить все это дело
- Тут. Правая стрелка
- @Field ({ nullable: true })
- Но я уже понял, что ты идешь не через схему, а через код

Main message:
https://typegraphql.ml/docs/types-and-fields.html

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://typegraphql.ml/docs/types-and-fields.html

--

## My telegram message #48789
**Time:** 20.01.2020 22:19:49 UTC+05:00
**Link:** https://t.me/nest_ru/48789

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://typegraphql.ml/docs/types-and-fields.html
- оно, спасибо!
- Ребят, а есть у кого-то ссылка на сертификаты нод разраба ?
- посоветуйте плз, что лучше выбрать для валидации с graphql?

Main message:
а чем тебе не нравится класс валидатор?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а чем тебе не нравится класс валидатор?

--

## My telegram message #48791
**Time:** 20.01.2020 22:20:22 UTC+05:00
**Link:** https://t.me/nest_ru/48791

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят, а есть у кого-то ссылка на сертификаты нод разраба ?
- посоветуйте плз, что лучше выбрать для валидации с graphql?
- а чем тебе не нравится класс валидатор?
- class-validator топ

Main message:
просто нужно обработчик ошибок для аполо на фронте написать чтобы считывать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто нужно обработчик ошибок для аполо на фронте написать чтобы считывать

--

## My telegram message #48818
**Time:** 21.01.2020 09:09:59 UTC+05:00
**Link:** https://t.me/nest_ru/48818

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Менеджить монорепу на TypeScript с помощью lerna - невыносимо тяжкая боль. Просто держу в курсе.

Main message:
Там же магия с подменой пакедж жсон, nrwl проще, а если надо чтобы отдельно собралось а не брал из рута все, просто пакедж жсон свой и тс конфиг создаешь и все, дев режим как моно репа, билд все по отдельности

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там же магия с подменой пакедж жсон, nrwl проще, а если надо чтобы отдельно собралось а не брал из рута все, просто пакедж жсон свой и тс конфиг создаешь и все, дев режим как моно репа, билд все по отдельности

--

## My telegram message #48821
**Time:** 21.01.2020 09:15:37 UTC+05:00
**Link:** https://t.me/nest_ru/48821

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- У нас же лерна зависимости решает с помощью симлинков. Если мы в модуле  A пишем  import { something } from 'B' То IDE думает, что мы запрашиваем уже скомпиилированную версию. Есть папка dist существует, то всё ок, если нет, то модуля не существует. Но это полбеды, основная беда - рефакторинг. Мы рефакторим в папке  src , а остальные модули следят за  dist , получается что абсолютно весь рефакторинг отмирает

Main message:
При разработке ссылки в тс патчах у меня ведут в src при билде меняю все на dist, и снизу вверх билжу, после этого, либы могу публиковать в нпм апликейшен

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

При разработке ссылки в тс патчах у меня ведут в src при билде меняю все на dist, и снизу вверх билжу, после этого, либы могу публиковать в нпм апликейшен

--

## My telegram message #48825
**Time:** 21.01.2020 09:18:41 UTC+05:00
**Link:** https://t.me/nest_ru/48825

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Кто до nestjs имел дело с Python+django? Есть ли у Неста библиотеки-аналоги lookup-ов? Пример: Отправили с фронта фильтр  name=Анна , он найдет все записи, где name=Анна. А если отправить фильтр  name__icontains=ан, то он найдет Анна, Анатолий, Анастасия, Иван.

Main message:
Ты кстати drf так и не пробовала с джанго, там ваще крутые фильтры были)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты кстати drf так и не пробовала с джанго, там ваще крутые фильтры были)

--

## My telegram message #48829
**Time:** 21.01.2020 09:20:11 UTC+05:00
**Link:** https://t.me/nest_ru/48829

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- При разработке ссылки в тс патчах у меня ведут в src при билде меняю все на dist, и снизу вверх билжу, после этого, либы могу публиковать в нпм апликейшен
- Когда с фронта приходит например car\archive=true, а на бэке идёт фильтрация {status=1 или status=2) и created < 05-07-2018
- Ты кстати drf так и не пробовала с джанго, там ваще крутые фильтры были)
- При этом этот фильтр может идти в группе с другими, например: document\?archive=true&name__icontains=doc

Main message:
https://github.com/nestjsx/crud

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/nestjsx/crud

--

## My telegram message #48831
**Time:** 21.01.2020 09:20:30 UTC+05:00
**Link:** https://t.me/nest_ru/48831

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да

--

## My telegram message #48836
**Time:** 21.01.2020 09:21:21 UTC+05:00
**Link:** https://t.me/nest_ru/48836

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так мы на нем и работаем

Main message:
Ну тогда про него и говори не про джанго, голый джанго он как нест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну тогда про него и говори не про джанго, голый джанго он как нест

--

## My telegram message #48838
**Time:** 21.01.2020 09:21:51 UTC+05:00
**Link:** https://t.me/nest_ru/48838

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- Так мы на нем и работаем
- Ну тогда про него и говори не про джанго, голый джанго он как нест
- А ок)

Main message:
И тут нет никого кроме меня кто с этим работал)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

И тут нет никого кроме меня кто с этим работал)

--

## My telegram message #48843
**Time:** 21.01.2020 09:37:03 UTC+05:00
**Link:** https://t.me/nest_ru/48843

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Берете ли вы юных падаванов на обучение?)

Main message:
Не) некогда)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не) некогда)

--

## My telegram message #48848
**Time:** 21.01.2020 11:32:12 UTC+05:00
**Link:** https://t.me/nest_ru/48848

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Берете ли вы юных падаванов на обучение?)
- Не) некогда)
- Ребята, помогите с декоратором разобраться. Есть метод в сервисе userRoleUpdate, перед ним написал декоратор, хочу туда другой метод (this.userRole) из этого-же сервиса передать. При запросе userRoleUpdate получаю ошибку в консоли TypeError: checkerFn is not a function ((( Чо делать, мущщины?
- Господа, короткий вариант вопроса, - функцию в декоратор как передать? :)

Main message:
Через метадату на поле-доп декор или аргумент внутрь твоего

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через метадату на поле-доп декор или аргумент внутрь твоего

--

## My telegram message #48850
**Time:** 21.01.2020 11:42:13 UTC+05:00
**Link:** https://t.me/nest_ru/48850

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ильшат, можно хоть кусочек кода или пример, как с аргументом это дело намутить, не пойму как это по правильному намутить. Как будет минутка свободная пожалуйста )

Main message:
За компом когда буду отпишу в личку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

За компом когда буду отпишу в личку

--

## My telegram message #48853
**Time:** 21.01.2020 12:22:54 UTC+05:00
**Link:** https://t.me/nest_ru/48853

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy привет, как у тебя с призмой ?

Main message:
все норм, репу делаю, хз когда выложу, там и фронт и бэк, ща во фронте тусю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все норм, репу делаю, хз когда выложу, там и фронт и бэк, ща во фронте тусю

--

## My telegram message #48865
**Time:** 21.01.2020 12:51:41 UTC+05:00
**Link:** https://t.me/nest_ru/48865

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Товарищи подскажите плиз, lifecycle hooks должны ли работать на классе Middleware implements NestMiddleware? Что-то не работает, может я чего не так делаю..
- наверно надо попробовать сделать middleware injectable и закинуть в провайдеры модуля
- так он и есть
- может и нету lifecycle для мидлвар

Main message:
давно как то поднимали этот вопрос, и вроде как я помню там это не работало

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

давно как то поднимали этот вопрос, и вроде как я помню там это не работало

--

## My telegram message #48871
**Time:** 21.01.2020 13:43:35 UTC+05:00
**Link:** https://t.me/nest_ru/48871

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- https://medium.com/ngx/nestjs-angular-grpc-f8eca5404fc7

Main message:
👍🏻

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍🏻

--

## My telegram message #48887
**Time:** 21.01.2020 16:11:13 UTC+05:00
**Link:** https://t.me/nest_ru/48887

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я не для неста

Main message:
я хочу следующую консольную тулзу на ангулар запилить)  https://t.me/angular_fox/200

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я хочу следующую консольную тулзу на ангулар запилить)  https://t.me/angular_fox/200

--

## My telegram message #48889
**Time:** 21.01.2020 16:34:35 UTC+05:00
**Link:** https://t.me/nest_ru/48889

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- наркоман 😳

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #48893
**Time:** 21.01.2020 16:39:17 UTC+05:00
**Link:** https://t.me/nest_ru/48893

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я хочу следующую консольную тулзу на ангулар запилить)  https://t.me/angular_fox/200
- наркоман 😳
- )
- Это получается в этой тулзе v8 будет под капотом или как?

Main message:
ну в8 так и так в ноде же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну в8 так и так в ноде же

--

## My telegram message #48906
**Time:** 21.01.2020 18:17:31 UTC+05:00
**Link:** https://t.me/nest_ru/48906

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- на сколько я знаю - нет такого
- а как быть? интерсптером можно выполнить первый запрос и полученные данные передать во второй?
- можешь думаю кастомный роут сделать и там уже объеденять все
- так а как объединить? я только начал с crud работать. как я понял в моделих описываются связи и они работат как JOIN, а вот как какую-то логику еще вставить не могу понять

Main message:
async method(){ returm await Promise.all([this.method1(),this.method2()]); }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

async method(){ returm await Promise.all([this.method1(),this.method2()]); }

--

## My telegram message #48909
**Time:** 21.01.2020 18:18:38 UTC+05:00
**Link:** https://t.me/nest_ru/48909

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- так а как объединить? я только начал с crud работать. как я понял в моделих описываются связи и они работат как JOIN, а вот как какую-то логику еще вставить не могу понять

Main message:
круд не про это, в нем тока типовое ито что в нем зашито ,реадми там есть примеры, если чета кастомное, то уже сам

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

круд не про это, в нем тока типовое ито что в нем зашито ,реадми там есть примеры, если чета кастомное, то уже сам

--

## My telegram message #48925
**Time:** 21.01.2020 21:51:35 UTC+05:00
**Link:** https://t.me/nest_ru/48925

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Кто-нибудь вешал корс на путь сваггера как миддлвер?

Main message:
там по идее это жсон который бэк выплевывает, можешь влезть в выплевывалку и всунуть свою логику

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там по идее это жсон который бэк выплевывает, можешь влезть в выплевывалку и всунуть свою логику

--

## My telegram message #48927
**Time:** 21.01.2020 22:53:17 UTC+05:00
**Link:** https://t.me/nest_ru/48927

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- обращайся 😉
- Всем привет. Кто-нибудь вешал корс на путь сваггера как миддлвер?
- там по идее это жсон который бэк выплевывает, можешь влезть в выплевывалку и всунуть свою логику
- Сейчас как раз этим занимаюсь, но может кто-то уже сталкивался и готов поделиться)

Main message:
на проде вырубают обычно все сваггер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на проде вырубают обычно все сваггер

--

## My telegram message #48930
**Time:** 21.01.2020 23:53:59 UTC+05:00
**Link:** https://t.me/nest_ru/48930

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там по идее это жсон который бэк выплевывает, можешь влезть в выплевывалку и всунуть свою логику
- Сейчас как раз этим занимаюсь, но может кто-то уже сталкивался и готов поделиться)
- на проде вырубают обычно все сваггер
- Это микросервис. Фронты просят оставлять документирование

Main message:
можно прибилде генерить свагер жсон

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно прибилде генерить свагер жсон

--

## My telegram message #48941
**Time:** 22.01.2020 02:42:41 UTC+05:00
**Link:** https://t.me/nest_ru/48941

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно прибилде генерить свагер жсон
- Да нет, рабочий сваггер на проде это стандартная политика, если API публичное
- А если не твои то зачем им свагер
- Для удобной документации публичного апи

Main message:
Я там описал как отдать именно свагер а не бэк со свагером, пусть берут и юзают как хотят это жсон

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я там описал как отдать именно свагер а не бэк со свагером, пусть берут и юзают как хотят это жсон

--

## My telegram message #49228
**Time:** 25.01.2020 23:58:49 UTC+05:00
**Link:** https://t.me/nest_ru/49228

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Ммм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ммм

--

## My telegram message #49230
**Time:** 26.01.2020 00:01:43 UTC+05:00
**Link:** https://t.me/nest_ru/49230

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Прометеус
- всё равно оверхэдом кажется
- Ммм
- Класс

Main message:
Ну я подожду ангулара переход)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну я подожду ангулара переход)

--

## My telegram message #49232
**Time:** 26.01.2020 00:03:53 UTC+05:00
**Link:** https://t.me/nest_ru/49232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я думал,нест не раньше ангулара переходить будет

Main message:
Аналогично

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Аналогично

--

## My telegram message #49234
**Time:** 26.01.2020 00:05:36 UTC+05:00
**Link:** https://t.me/nest_ru/49234

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да мы там старый пулл подняли и он видимо решил зашевелиться  https://github.com/nestjs/typescript-starter/pull/150#event-2960788958

Main message:
Ангулара релиз сдвинулся до 21 года)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ангулара релиз сдвинулся до 21 года)))

--

## My telegram message #49236
**Time:** 26.01.2020 00:06:10 UTC+05:00
**Link:** https://t.me/nest_ru/49236

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Аналогично
- Да мы там старый пулл подняли и он видимо решил зашевелиться  https://github.com/nestjs/typescript-starter/pull/150#event-2960788958
- Ангулара релиз сдвинулся до 21 года)))
- 2121

Main message:
Так что нест сам по себе) походу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Так что нест сам по себе) походу)

--

## My telegram message #49239
**Time:** 26.01.2020 00:06:33 UTC+05:00
**Link:** https://t.me/nest_ru/49239

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а такой вопрос, я из мира фронта, там в основном логгируются какие-то ошибки. А как в беке принято? Нормальным ли логгировать каждый чих, вроде срабатывания контроллера или запроса в БД?

Main message:
Логирую ошибки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Логирую ошибки

--

## My telegram message #49250
**Time:** 26.01.2020 00:11:58 UTC+05:00
**Link:** https://t.me/nest_ru/49250

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- есть же кейсы когда у тебя все работает но результат не верный тут лог нужен всего что происходит

Main message:
Это баги, тесты писать надо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это баги, тесты писать надо

--

## My telegram message #49252
**Time:** 26.01.2020 00:17:57 UTC+05:00
**Link:** https://t.me/nest_ru/49252

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- тесты не решают многих проблем я видел как пишут тесты на "отвалите от меня" чтобы были ну и не все тесты тестируют логику работы

Main message:
Там если писать, то в итоге все покрывается, и норм в итоге

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там если писать, то в итоге все покрывается, и норм в итоге

--

## My telegram message #49599
**Time:** 27.01.2020 14:18:32 UTC+05:00
**Link:** https://t.me/nest_ru/49599

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy а ты в призме второй пробовал из постгри jsonb вытягивать?

Main message:
не, я так и не заюзал еще нигде jsonb )

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, я так и не заюзал еще нигде jsonb )

--

## My telegram message #49621
**Time:** 27.01.2020 16:54:36 UTC+05:00
**Link:** https://t.me/nest_ru/49621

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну как бы то ни было, если бы нода была лучше на го бы не переезжали так ведь?)

Main message:
Оно же быстрее работает раз в 10 как говорят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Оно же быстрее работает раз в 10 как говорят

--

## My telegram message #49624
**Time:** 27.01.2020 16:55:00 UTC+05:00
**Link:** https://t.me/nest_ru/49624

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Что быстрее ?

Main message:
Го быстрее жэс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Го быстрее жэс

--

## My telegram message #49628
**Time:** 27.01.2020 16:55:17 UTC+05:00
**Link:** https://t.me/nest_ru/49628

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Го быстрее жэс

Main message:
Вот и переходят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вот и переходят

--

## My telegram message #49630
**Time:** 27.01.2020 16:55:35 UTC+05:00
**Link:** https://t.me/nest_ru/49630

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Но не быстрее ноды

Main message:
Не знаю ноду

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не знаю ноду

--

