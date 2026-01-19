## My telegram message #27840
**Time:** 01.08.2019 12:27:05 UTC+05:00
**Link:** https://t.me/nest_ru/27840

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Согласен, я делал все по доке. Вот смотри что сейчас:  @Inject (forwardRef(() => AuthService)) private readonly authService: AuthService

Main message:
логику определенную вынеси

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

логику определенную вынеси

--

## My telegram message #27842
**Time:** 01.08.2019 12:27:27 UTC+05:00
**Link:** https://t.me/nest_ru/27842

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Согласен, я делал все по доке. Вот смотри что сейчас:  @Inject (forwardRef(() => AuthService)) private readonly authService: AuthService
- логику определенную вынеси
- Но он так же говорит что не знает что это такое

Main message:
forwardRef это не нужно юзать, оно не решает проблему, оно запутывает тока все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

forwardRef это не нужно юзать, оно не решает проблему, оно запутывает тока все

--

## My telegram message #27844
**Time:** 01.08.2019 12:30:33 UTC+05:00
**Link:** https://t.me/nest_ru/27844

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- логику определенную вынеси
- Но он так же говорит что не знает что это такое
- forwardRef это не нужно юзать, оно не решает проблему, оно запутывает тока все
- Короче пойду я делать как обычно с sharedModule и все. Так быстрее и понятнее.

Main message:
например логика генерации хэша пароля, вынеси ее в сервис, у каждого модуля свой пустой сервис будет такой без реализации AuthPassHash UserPassHash, птом в аппе делаешь сервис с логикой и его инжектишь через провайдер обоим, идея такая, там можно через конфиг добросить или юзать фабрику, сам уже решай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

например логика генерации хэша пароля, вынеси ее в сервис, у каждого модуля свой пустой сервис будет такой без реализации AuthPassHash UserPassHash, птом в аппе делаешь сервис с логикой и его инжектишь через провайдер обоим, идея такая, там можно через конфиг добросить или юзать фабрику, сам уже решай

--

## My telegram message #27849
**Time:** 01.08.2019 12:33:46 UTC+05:00
**Link:** https://t.me/nest_ru/27849

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- forwardRef это не нужно юзать, оно не решает проблему, оно запутывает тока все
- Короче пойду я делать как обычно с sharedModule и все. Так быстрее и понятнее.
- например логика генерации хэша пароля, вынеси ее в сервис, у каждого модуля свой пустой сервис будет такой без реализации AuthPassHash UserPassHash, птом в аппе делаешь сервис с логикой и его инжектишь через провайдер обоим, идея такая, там можно через конфиг добросить или юзать фабрику, сам уже решай
- Секужночку. А немного не понимаю что такое фабрика если честно. А проблема то будет как не крути если мне нужно будет использовать этот AuthService в два отдельных модуля. Разве нет ?

Main message:
блин припмера в паблике нету )

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

блин припмера в паблике нету )

--

## My telegram message #27853
**Time:** 01.08.2019 12:35:20 UTC+05:00
**Link:** https://t.me/nest_ru/27853

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- например логика генерации хэша пароля, вынеси ее в сервис, у каждого модуля свой пустой сервис будет такой без реализации AuthPassHash UserPassHash, птом в аппе делаешь сервис с логикой и его инжектишь через провайдер обоим, идея такая, там можно через конфиг добросить или юзать фабрику, сам уже решай
- Секужночку. А немного не понимаю что такое фабрика если честно. А проблема то будет как не крути если мне нужно будет использовать этот AuthService в два отдельных модуля. Разве нет ?
- блин припмера в паблике нету )
- AuthService в BuyerService(BuyerModule) и UserService(UserModule)

Main message:
модули не должны друг в друга быть вложенны

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модули не должны друг в друга быть вложенны

--

## My telegram message #27855
**Time:** 01.08.2019 12:36:14 UTC+05:00
**Link:** https://t.me/nest_ru/27855

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- блин припмера в паблике нету )
- AuthService в BuyerService(BuyerModule) и UserService(UserModule)
- модули не должны друг в друга быть вложенны
- Это не так, они отдельно

Main message:
forwardRef это значит что у тя друг в друга вложенно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

forwardRef это значит что у тя друг в друга вложенно

--

## My telegram message #27858
**Time:** 01.08.2019 12:38:53 UTC+05:00
**Link:** https://t.me/nest_ru/27858

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
истанс может быть разный

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

истанс может быть разный

--

## My telegram message #27861
**Time:** 01.08.2019 12:41:05 UTC+05:00
**Link:** https://t.me/nest_ru/27861

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- forwardRef это значит что у тя друг в друга вложенно
- Хмм. Я сейчас попробовал, использовать AuthService в двух модулях и работает ... Я думал что нельзя такое делать.
- истанс может быть разный
- Блин так я ничего не понял. Как делать то правильно ?

Main message:
скажи что ты хочешь шарить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

скажи что ты хочешь шарить

--

## My telegram message #27865
**Time:** 01.08.2019 12:42:37 UTC+05:00
**Link:** https://t.me/nest_ru/27865

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- функцию

Main message:
через конфиг DI шарь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через конфиг DI шарь

--

## My telegram message #27868
**Time:** 01.08.2019 12:45:45 UTC+05:00
**Link:** https://t.me/nest_ru/27868

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- скажи что ты хочешь шарить
- функцию
- через конфиг DI шарь
- Понял, сейчас сделаю. Спасибо !

Main message:
тип того юзаешь потом constructor( @Inject (USER_FUCN_TOKEN) private readonly func: ()=>void) {}

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тип того юзаешь потом constructor( @Inject (USER_FUCN_TOKEN) private readonly func: ()=>void) {}

--

## My telegram message #27871
**Time:** 01.08.2019 12:47:09 UTC+05:00
**Link:** https://t.me/nest_ru/27871

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- через конфиг DI шарь
- Понял, сейчас сделаю. Спасибо !
- тип того юзаешь потом constructor( @Inject (USER_FUCN_TOKEN) private readonly func: ()=>void) {}
- да, да. Это я понял. Еще раз спасибо !

Main message:
если нужно класс шарить то это через фабрику, тоже функция которая будет уметь создавать класс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если нужно класс шарить то это через фабрику, тоже функция которая будет уметь создавать класс

--

## My telegram message #27873
**Time:** 01.08.2019 12:48:14 UTC+05:00
**Link:** https://t.me/nest_ru/27873

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тип того юзаешь потом constructor( @Inject (USER_FUCN_TOKEN) private readonly func: ()=>void) {}
- да, да. Это я понял. Еще раз спасибо !
- если нужно класс шарить то это через фабрику, тоже функция которая будет уметь создавать класс
- Пока до этого я не дошел еще.

Main message:
если начал шарить функцию то значит скорее весго скоро и до классов доберешся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если начал шарить функцию то значит скорее весго скоро и до классов доберешся

--

## My telegram message #27876
**Time:** 01.08.2019 14:47:27 UTC+05:00
**Link:** https://t.me/nest_ru/27876

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Пока до этого я не дошел еще.
- если начал шарить функцию то значит скорее весго скоро и до классов доберешся
- Думаю что так и будет. Спасибо если что еще по спрашиваю по поводу этого момента.
- привет. Как лучше всего Swagger Doc Module подключать только для девов? Просто через: if(process.env.NODE_ENV = 'dev'){ SwaggerModule.createDocument()... SwaggerModule.setup()... }

Main message:
лучше собирать без этого кода наверное

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше собирать без этого кода наверное

--

## My telegram message #27879
**Time:** 01.08.2019 14:49:11 UTC+05:00
**Link:** https://t.me/nest_ru/27879

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Думаю что так и будет. Спасибо если что еще по спрашиваю по поводу этого момента.
- привет. Как лучше всего Swagger Doc Module подключать только для девов? Просто через: if(process.env.NODE_ENV = 'dev'){ SwaggerModule.createDocument()... SwaggerModule.setup()... }
- лучше собирать без этого кода наверное
- Уточни, пожалуйста, что ты имеешь в виду?

Main message:
ну в прод поподает же жс собранный

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну в прод поподает же жс собранный

--

## My telegram message #27884
**Time:** 01.08.2019 14:51:19 UTC+05:00
**Link:** https://t.me/nest_ru/27884

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Уточни, пожалуйста, что ты имеешь в виду?
- ну в прод поподает же жс собранный
- нет, на проде не нужно
- Хорошая идей. А где это указывать что мол выпили это при build ?

Main message:
схематик неста вроде это может но не точно там веб пак китрый который енвы раскрывает при билде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

схематик неста вроде это может но не точно там веб пак китрый который енвы раскрывает при билде

--

## My telegram message #27887
**Time:** 01.08.2019 14:55:39 UTC+05:00
**Link:** https://t.me/nest_ru/27887

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет, на проде не нужно
- Хорошая идей. А где это указывать что мол выпили это при build ?
- схематик неста вроде это может но не точно там веб пак китрый который енвы раскрывает при билде
- Вот за что я обожаю WebStorm ! Реально я забыл указать там await, а он это увидел.

Main message:
vscod тож самое может

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

vscod тож самое может

--

## My telegram message #27892
**Time:** 01.08.2019 15:00:25 UTC+05:00
**Link:** https://t.me/nest_ru/27892

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- схематик неста вроде это может но не точно там веб пак китрый который енвы раскрывает при билде
- Вот за что я обожаю WebStorm ! Реально я забыл указать там await, а он это увидел.
- vscod тож самое может
- Чет у меня так и не получилось нормально его настройти что бы он работал с типами, видел весь код так сказать.

Main message:
а вдруг я устроюсь в контору где нельзя воровать и покупать) и нужно будет переучиватся на вскод

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а вдруг я устроюсь в контору где нельзя воровать и покупать) и нужно будет переучиватся на вскод

--

## My telegram message #27896
**Time:** 01.08.2019 15:02:42 UTC+05:00
**Link:** https://t.me/nest_ru/27896

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- vscod тож самое может
- Чет у меня так и не получилось нормально его настройти что бы он работал с типами, видел весь код так сказать.
- а вдруг я устроюсь в контору где нельзя воровать и покупать) и нужно будет переучиватся на вскод
- я тоже не могу полноценно работать в vscode

Main message:
на вскод норм все, ваще нет проблем

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на вскод норм все, ваще нет проблем

--

## My telegram message #27906
**Time:** 01.08.2019 15:08:16 UTC+05:00
**Link:** https://t.me/nest_ru/27906

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да скорее всего
- Да тупо для себя купить и все. Он на много круче чем VSCode. Тот же CSS/SASS VsCode не сразу вижет что не так, не говорю уже про предлогать что будет дальше.
- ну в первую очередь vscode это редактор
- Господа, подскажите как лучше сделать. У меня на Users module стоит nestjsx/crud поставил туда авторизацию по jwt и все отлично работает. Но как мне сделать чтобы при записи, если есть поле password, то на него  bcrypt.hashSync делалось?

Main message:
@Entity({ name: 'users' }) export class User { ... @BeforeInsert() doBeforeInsertion() {

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@Entity({ name: 'users' }) export class User { ... @BeforeInsert() doBeforeInsertion() {

--

## My telegram message #27909
**Time:** 01.08.2019 15:10:51 UTC+05:00
**Link:** https://t.me/nest_ru/27909

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну в первую очередь vscode это редактор
- Господа, подскажите как лучше сделать. У меня на Users module стоит nestjsx/crud поставил туда авторизацию по jwt и все отлично работает. Но как мне сделать чтобы при записи, если есть поле password, то на него  bcrypt.hashSync делалось?
- @Entity({ name: 'users' }) export class User { ... @BeforeInsert() doBeforeInsertion() {
- а наружа это когда откуда?

Main message:
контроллер у меня например

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

контроллер у меня например

--

## My telegram message #27920
**Time:** 01.08.2019 15:13:43 UTC+05:00
**Link:** https://t.me/nest_ru/27920

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да мне энтити подойдет
- кстати ребят
- все обанкротились
- какая-нибудь статья или упоминание или доклад

Main message:
😄

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

😄

--

## My telegram message #27929
**Time:** 01.08.2019 15:14:32 UTC+05:00
**Link:** https://t.me/nest_ru/27929

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну или может у себя внутри
- Украинская компания использует насколько я знаю 😂
- да ладно XD
- 😁

Main message:
тут путь веры вроде, видно же что хорошая штука, это как ангулар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тут путь веры вроде, видно же что хорошая штука, это как ангулар

--

## My telegram message #27935
**Time:** 01.08.2019 15:20:20 UTC+05:00
**Link:** https://t.me/nest_ru/27935

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 😁
- тут путь веры вроде, видно же что хорошая штука, это как ангулар
- 👍🏻
- ну да

Main message:
кидай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кидай

--

## My telegram message #27939
**Time:** 01.08.2019 15:22:57 UTC+05:00
**Link:** https://t.me/nest_ru/27939

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 👍🏻
- ну да
- кидай
- во

Main message:
и то и то нетуже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и то и то нетуже

--

## My telegram message #27954
**Time:** 01.08.2019 15:26:44 UTC+05:00
**Link:** https://t.me/nest_ru/27954

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- где вариант "вообще не юзаю, в группе случайно"?

Main message:
кстати он прав и такие же есть)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кстати он прав и такие же есть)

--

## My telegram message #27963
**Time:** 01.08.2019 15:29:42 UTC+05:00
**Link:** https://t.me/nest_ru/27963

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
никогда не говори никогда, вдруг Вован с соседнего двора предложит проект совместный и как фулл замутишь с ним напару

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

никогда не говори никогда, вдруг Вован с соседнего двора предложит проект совместный и как фулл замутишь с ним напару

--

## My telegram message #27996
**Time:** 01.08.2019 15:42:12 UTC+05:00
**Link:** https://t.me/nest_ru/27996

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я могу сделать скрин. я же программист, править хтмл умею.
- Я тоже, и он норм нашёл
- почему нет? технология похожая.
- ну да есть в этом смысл

Main message:
rEact => nExt vUe => nUxt angular => angular

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

rEact => nExt vUe => nUxt angular => angular

--

## My telegram message #27999
**Time:** 01.08.2019 15:45:33 UTC+05:00
**Link:** https://t.me/nest_ru/27999

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- angUlar => Unversal

Main message:
про это я до сих пор не понимаю) назвалибы лучше  @angular /platform_nodejs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

про это я до сих пор не понимаю) назвалибы лучше  @angular /platform_nodejs

--

## My telegram message #28004
**Time:** 01.08.2019 16:24:50 UTC+05:00
**Link:** https://t.me/nest_ru/28004

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а не подскажите как мне еще в crud сделать чтобы я мог посмотреть какая роль у пользователя и если он не админ и редактирует не свою запись, то exсeption бросать?

Main message:
в круде не знаю, ну я вот так делаю  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L54

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в круде не знаю, ну я вот так делаю  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L54

--

## My telegram message #28007
**Time:** 01.08.2019 16:29:01 UTC+05:00
**Link:** https://t.me/nest_ru/28007

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не очень нужного
- иногда да
- в круде не знаю, ну я вот так делаю  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L54
- а я могу это в interceptor зафигачить? в круд можно interceptor подключать

Main message:
ты можешь переопределить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты можешь переопределить

--

## My telegram message #28023
**Time:** 01.08.2019 17:34:57 UTC+05:00
**Link:** https://t.me/nest_ru/28023

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Np
- @zMotivat0r и последний тупой вопрос на сегодня, я правильно понял что updateOneBase от replace отличается тем что replace создаст если не найдет?
- Верно, patch и put запросы
- Ребят, а как можно class-validator использовать для метода сервиса?

Main message:
обаснуй

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

обаснуй

--

## My telegram message #28025
**Time:** 01.08.2019 17:53:39 UTC+05:00
**Link:** https://t.me/nest_ru/28025

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Верно, patch и put запросы
- Ребят, а как можно class-validator использовать для метода сервиса?
- обаснуй
- Ну вот есть код  @Injectable() class Class { method(dto: SmthDto){} } Как сделать, что бы при вызове метода dto была провалидирована?

Main message:
декоратор можешь свой написать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

декоратор можешь свой написать

--

## My telegram message #28061
**Time:** 02.08.2019 16:00:54 UTC+05:00
**Link:** https://t.me/nest_ru/28061

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Подскажите как правильно валидацию на уникальность поля в БД делать лучше. Например приходит мне в api запрос на создание пользователя, мне надо проверить чтоб логин и почта уникальный были и ответ дать что то или то поле уже есть в БД?

Main message:
lowercase обоих и индексы на поля в бд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

lowercase обоих и индексы на поля в бд

--

## My telegram message #28064
**Time:** 02.08.2019 16:03:31 UTC+05:00
**Link:** https://t.me/nest_ru/28064

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мужики всем привет, помогите плиз немного, а то я туплю сегодня. Есть вот такая структура, и как бы мне указать в resolver так что бы молучить данные товара в Graphlq.
- Подскажите как правильно валидацию на уникальность поля в БД делать лучше. Например приходит мне в api запрос на создание пользователя, мне надо проверить чтоб логин и почта уникальный были и ответ дать что то или то поле уже есть в БД?
- lowercase обоих и индексы на поля в бд
- lowercase обоих это когда куда?

Main message:
на эти логин и почта

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на эти логин и почта

--

## My telegram message #28068
**Time:** 02.08.2019 16:06:10 UTC+05:00
**Link:** https://t.me/nest_ru/28068

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- спасибо, понял как выцеплять ошибку, но не понял для чего lowercase переменным делать

Main message:
значения приводи к ловер кейс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

значения приводи к ловер кейс

--

## My telegram message #28072
**Time:** 02.08.2019 16:07:55 UTC+05:00
**Link:** https://t.me/nest_ru/28072

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- на эти логин и почта
- спасибо, понял как выцеплять ошибку, но не понял для чего lowercase переменным делать
- значения приводи к ловер кейс
- аааааа, спасибо. никогда бы не додумался с первого раза)))))

Main message:
ага, пробелы еще пореж, я бы ваще запретил лишние символы вводить, резал и валидировал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, пробелы еще пореж, я бы ваще запретил лишние символы вводить, резал и валидировал

--

## My telegram message #28074
**Time:** 02.08.2019 16:14:27 UTC+05:00
**Link:** https://t.me/nest_ru/28074

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- значения приводи к ловер кейс
- аааааа, спасибо. никогда бы не додумался с первого раза)))))
- ага, пробелы еще пореж, я бы ваще запретил лишние символы вводить, резал и валидировал
- а если на эти поля зафигачить в mysql  utf8mb4_unicode_ci там тогда по идее не надо будет за case следить?

Main message:
ну это уже от базы зависит, если есть такой тип, то лучше его да, так быстрее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это уже от базы зависит, если есть такой тип, то лучше его да, так быстрее

--

## My telegram message #28079
**Time:** 02.08.2019 16:25:40 UTC+05:00
**Link:** https://t.me/nest_ru/28079

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а если на эти поля зафигачить в mysql  utf8mb4_unicode_ci там тогда по идее не надо будет за case следить?
- ну это уже от базы зависит, если есть такой тип, то лучше его да, так быстрее
- @alex_kulagin помоги плиз разобраться с резолвом для каждого элемента в массиве. Что только уже не пробовал, ничего не помогает.
- Не понял вопроса:-)

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #28084
**Time:** 02.08.2019 16:27:27 UTC+05:00
**Link:** https://t.me/nest_ru/28084

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Графкуэл?

Main message:
Ты же гуру

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты же гуру

--

## My telegram message #28101
**Time:** 02.08.2019 17:57:02 UTC+05:00
**Link:** https://t.me/nest_ru/28101

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Только хотел спросить
- Потому что то как работает схема и как тянет данные зависит от того как ты скул напишешь не ?
- а если данные тянутся из микросервисов?
- Конечно можно и так

Main message:
неа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа

--

## My telegram message #28106
**Time:** 02.08.2019 17:57:34 UTC+05:00
**Link:** https://t.me/nest_ru/28106

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Конечно можно и так
- неа
- Не помню кто уже говорил, даже не митапах разных его так и называли
- Причем тут вообще SQL ?

Main message:
граф ваще спека жеж

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

граф ваще спека жеж

--

## My telegram message #28112
**Time:** 02.08.2019 17:58:25 UTC+05:00
**Link:** https://t.me/nest_ru/28112

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy согласен?

Main message:
не углублялся, там эта новость тока вчера появилась)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не углублялся, там эта новость тока вчера появилась)

--

## My telegram message #28120
**Time:** 02.08.2019 18:14:58 UTC+05:00
**Link:** https://t.me/nest_ru/28120

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а реально валидатор сделать, который подключится к репозиторию и проверит запись на уникальность? Ильшат, твой метод работает, но он какой-то неправильный все-таки, ты сам как думаешь?

Main message:
можно и так и так, тот что предложил работает быстрее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно и так и так, тот что предложил работает быстрее

--

## My telegram message #28123
**Time:** 02.08.2019 18:16:11 UTC+05:00
**Link:** https://t.me/nest_ru/28123

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- БД
- Так а почему ты сразу не делаешь uniq: true ?
- можно и так и так, тот что предложил работает быстрее
- ну просто ловить эксепшен когда это валидация должна делать и красиво возвращать все во фронтенд

Main message:
https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/services/users.service.ts#L10

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/services/users.service.ts#L10

--

## My telegram message #28127
**Time:** 02.08.2019 18:17:51 UTC+05:00
**Link:** https://t.me/nest_ru/28127

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можно и так и так, тот что предложил работает быстрее
- ну просто ловить эксепшен когда это валидация должна делать и красиво возвращать все во фронтенд
- https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/services/users.service.ts#L10
- А как это может быть быстрее чем Index ? Это же еще один так сказать не нужный запрос в базу

Main message:
наоборот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

наоборот

--

## My telegram message #28134
**Time:** 02.08.2019 18:19:45 UTC+05:00
**Link:** https://t.me/nest_ru/28134

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну если бы у меня 100 логинов в секунду создавалось, то такая оптимизация была бы кстати

Main message:
оптимизация она всегда небольшая, там пару мс тут еще пару мс, в общем может сократишь 5 сек

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оптимизация она всегда небольшая, там пару мс тут еще пару мс, в общем может сократишь 5 сек

--

## My telegram message #28139
**Time:** 02.08.2019 18:21:10 UTC+05:00
**Link:** https://t.me/nest_ru/28139

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ты прям в точку. У меня такая история была. -150мс с ответа базы снял. А это как бы не шутки при нагрузке.

Main message:
да там если я посмарю своими дба глазами еще могу наверное тебе затюнить чегонить)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да там если я посмарю своими дба глазами еще могу наверное тебе затюнить чегонить)

--

## My telegram message #28144
**Time:** 02.08.2019 18:23:09 UTC+05:00
**Link:** https://t.me/nest_ru/28144

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
это нето

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это нето

--

## My telegram message #28148
**Time:** 02.08.2019 18:24:27 UTC+05:00
**Link:** https://t.me/nest_ru/28148

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну как не то

Main message:
https://github.com/typeorm/typeorm/blob/master/sample/sample14-errors-in-wrong-metdata/app.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/typeorm/typeorm/blob/master/sample/sample14-errors-in-wrong-metdata/app.ts

--

## My telegram message #28168
**Time:** 02.08.2019 18:35:24 UTC+05:00
**Link:** https://t.me/nest_ru/28168

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну можно и эксепшен ловить, просто у меня crud стоит. я думал не ломать ничего и не городить огород адский, а просто валидатор добавить и не париться.

Main message:
@zMotivat0r куда воткнуть кастомную логику при инсерте? 🧐

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@zMotivat0r куда воткнуть кастомную логику при инсерте? 🧐

--

## My telegram message #28182
**Time:** 02.08.2019 19:22:13 UTC+05:00
**Link:** https://t.me/nest_ru/28182

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Думал может у тебя есть генерация из **,graphql в graphql.ts
- Неа
- Мне надо проверить есть ли уже такая запись в БД, если есть то не записывать ее в БД. Например проверить есть ли уже такой логин в БД и если есть, то вернуть ошибку в апи чтобы ипользовали другой. Ильшат предложил ловить эксепшен по уникальному индексу в БД, я думал что это можно кастомным валидатором решить
- Для эксепшнов есть же фильтры, вот там как раз можно это делать

Main message:
Он так не хочет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Он так не хочет)

--

## My telegram message #28187
**Time:** 02.08.2019 19:51:04 UTC+05:00
**Link:** https://t.me/nest_ru/28187

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Помогите, пожалуйста, с логированием. Как перехвачивать абсолютно все ошибки в приложении? app.useGlobalInterceptors - перехвачивает только unhandled errors, а мне нужны в том числе и те, которые я обрабатываю.

Main message:
https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts

--

## My telegram message #28190
**Time:** 02.08.2019 23:09:07 UTC+05:00
**Link:** https://t.me/nest_ru/28190

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В доках есть про евенты. Тут все достаточно просто.
- https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts
- Спасибо, буду пробовать.
- ну как-то так получается, но все таки это красивее в валидаторе выглядеть будет чем такой костылек

Main message:
Ну в валидаторе низя жеж

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну в валидаторе низя жеж

--

## My telegram message #28192
**Time:** 02.08.2019 23:09:42 UTC+05:00
**Link:** https://t.me/nest_ru/28192

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо, буду пробовать.
- ну как-то так получается, но все таки это красивее в валидаторе выглядеть будет чем такой костылек
- Ну в валидаторе низя жеж
- ну почему нельзя то

Main message:
Там кучу всего нужно переписать в ядре чтоб получилось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там кучу всего нужно переписать в ядре чтоб получилось

--

## My telegram message #28196
**Time:** 02.08.2019 23:47:13 UTC+05:00
**Link:** https://t.me/nest_ru/28196

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну в валидаторе низя жеж
- ну почему нельзя то
- Там кучу всего нужно переписать в ядре чтоб получилось
- @sllavvicc я таки победил

Main message:
вроде нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вроде нет

--

## My telegram message #28200
**Time:** 03.08.2019 00:16:25 UTC+05:00
**Link:** https://t.me/nest_ru/28200

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Там кучу всего нужно переписать в ядре чтоб получилось
- @sllavvicc я таки победил
- вроде нет
- Ну а какая разница. Тоже самое, только там не массив

Main message:
ну типа третий уровень резолвера

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну типа третий уровень резолвера

--

## My telegram message #28206
**Time:** 03.08.2019 00:21:06 UTC+05:00
**Link:** https://t.me/nest_ru/28206

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вроде нет
- Ну а какая разница. Тоже самое, только там не массив
- ну типа третий уровень резолвера
- А это уже делается отдельный резолвер для вложенного типа и он сам резолвит

Main message:
👍🏻 я в последнее время ничего не изучаю, забил на все, переделкой занимаюсь своего джанго mvc на анг2+ с нест, ваще скучно, через немогу делаю)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍🏻 я в последнее время ничего не изучаю, забил на все, переделкой занимаюсь своего джанго mvc на анг2+ с нест, ваще скучно, через немогу делаю)

--

## My telegram message #28208
**Time:** 03.08.2019 00:49:05 UTC+05:00
**Link:** https://t.me/nest_ru/28208

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну типа третий уровень резолвера
- А это уже делается отдельный резолвер для вложенного типа и он сам резолвит
- 👍🏻 я в последнее время ничего не изучаю, забил на все, переделкой занимаюсь своего джанго mvc на анг2+ с нест, ваще скучно, через немогу делаю)
- а я больше процессами. просто немного технологический разворот будет в том числе микросервисы и графкуэль как способ ихсвязать

Main message:
я это сделал уже давно)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я это сделал уже давно)

--

## My telegram message #28213
**Time:** 03.08.2019 00:55:18 UTC+05:00
**Link:** https://t.me/nest_ru/28213

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 👍🏻 я в последнее время ничего не изучаю, забил на все, переделкой занимаюсь своего джанго mvc на анг2+ с нест, ваще скучно, через немогу делаю)
- а я больше процессами. просто немного технологический разворот будет в том числе микросервисы и графкуэль как способ ихсвязать
- я это сделал уже давно)
- под grpc есть врапер который возвращает observabl, но под angular я не нашел (

Main message:
Надо потыкать grpc, может в нем сила, граф не дал того что я хотел(

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Надо потыкать grpc, может в нем сила, граф не дал того что я хотел(

--

## My telegram message #28218
**Time:** 03.08.2019 01:14:25 UTC+05:00
**Link:** https://t.me/nest_ru/28218

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
спс, после завтр попробую потыкатся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

спс, после завтр попробую потыкатся

--

## My telegram message #28273
**Time:** 04.08.2019 12:54:11 UTC+05:00
**Link:** https://t.me/nest_ru/28273

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Поздравьте меня, я перешел на typeorm. Теперь придется тоже ее хвалить)
- Говоря о TypeORM, у меня есть вопросик. Я запрашиваю данные со стороннего ресурса и на их получение создаю новую сущность и сохраняю к себе в базу через  Repository.save . Это сохранение должно создать новую запись, либо обновить (если существует). Так вот, по каким параметрам определяется, существует сущность или нет ? ID ?
- Primary key
- Можно же установить Primary key на name (Название всегда уникальное) и тогда он будет сравнивать эти свойства ? 🤔

Main message:
Сколько так делал всегда говном оборачивалось такое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сколько так делал всегда говном оборачивалось такое

--

## My telegram message #28284
**Time:** 04.08.2019 16:06:20 UTC+05:00
**Link:** https://t.me/nest_ru/28284

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так мой кейс такой, что те данные, которые я запрашиваю со стороннего АПИ не имеют айдишки, как ORM будет знать, когда обновлять, а когда создавать сущность ? На каждый элемент обращаться к базе и проверять существует ли с таким именем или нет - ещё больший бред. Как тогда быть?(

Main message:
Вешаешь уник индекс на поле свое типа ид которое Пытаешся вставить данные и при этом ловишь ошибку, если ошибка индекса уник, то запускаешь апдейт по своему полю Если ошибки нет, то данные в ставились норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вешаешь уник индекс на поле свое типа ид которое Пытаешся вставить данные и при этом ловишь ошибку, если ошибка индекса уник, то запускаешь апдейт по своему полю Если ошибки нет, то данные в ставились норм

--

## My telegram message #28286
**Time:** 04.08.2019 16:23:55 UTC+05:00
**Link:** https://t.me/nest_ru/28286

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/auth.module.ts#L32 Там конфигать надо еще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/auth-nestjs/src/auth.module.ts#L32 Там конфигать надо еще

--

## My telegram message #28313
**Time:** 04.08.2019 20:20:50 UTC+05:00
**Link:** https://t.me/nest_ru/28313

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Проверка name и name hash в md5, если сходиться тогда update
- Не, всё что может, то и беру)) А как Вы предлагаете сравнивать ? Я с TypeORM не сильно знаком, по этому базовый пример был бы кстати. Вы же не имеете ввиду  find({nameHash}) ?
- Под рукой нету на чем написать и проверить
- Схематично рассказать?) Просто мне не до конца понятно, как и когда это сравнивание происходит, по этому я и спрашивал про PK на другое поле

Main message:
В монго не шарю 🤷‍♂

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В монго не шарю 🤷‍♂

--

## My telegram message #28344
**Time:** 05.08.2019 08:45:15 UTC+05:00
**Link:** https://t.me/nest_ru/28344

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Есть возможность в typeORM сделать foreinkey - null?
- Укажи для колонки nullable: true и через joinColumn имя водставь  @Column({ nullable: true }) parentId!: number; @ManyToOne(type => User, user => user.subordinates, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) @JoinColumn({ name: 'parentId' }) public readonly creator!: User;
- Спасибо, щас попытаюсь)
- Можно ли вызывать методы другого сервиса в сервисах?

Main message:
Можно но это не круто, я в контроллере вызываю два метода разных сервисов Можно ещё через это сделать  https://docs.nestjs.com/recipes/cqrs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Можно но это не круто, я в контроллере вызываю два метода разных сервисов Можно ещё через это сделать  https://docs.nestjs.com/recipes/cqrs

--

## My telegram message #28346
**Time:** 05.08.2019 09:00:22 UTC+05:00
**Link:** https://t.me/nest_ru/28346

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо, щас попытаюсь)
- Можно ли вызывать методы другого сервиса в сервисах?
- Можно но это не круто, я в контроллере вызываю два метода разных сервисов Можно ещё через это сделать  https://docs.nestjs.com/recipes/cqrs
- Правильно через cqrs делать?

Main message:
Каждый сам решает что правильно, если сервисы в одном модуле, то можно один из другого

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Каждый сам решает что правильно, если сервисы в одном модуле, то можно один из другого

--

## My telegram message #28349
**Time:** 05.08.2019 12:47:29 UTC+05:00
**Link:** https://t.me/nest_ru/28349

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно но это не круто, я в контроллере вызываю два метода разных сервисов Можно ещё через это сделать  https://docs.nestjs.com/recipes/cqrs
- Правильно через cqrs делать?
- Каждый сам решает что правильно, если сервисы в одном модуле, то можно один из другого
- Товарищи подскажите, столкнулся с такой проблемой: У меня объявлено 2 одинаковых сервиса в разных namespace: CdrLogger: в модуле я их импортирую как: ... import { CdrLogger as ExtCdrLogger } from '. /agi -modules/external/cdr-logger'; import { CdrLogger as IntCdrLogger } from '. /agi -modules/internal/cdr-logger'; ... providers: [ ExtCdrLogger, IntCdrLogger ] Точно также импортирую эти сервисы внутри другого сервиса: import { CdrLogger as ExtCdrLogger } from '. /agi -modules/external/cdr-logger'; import { CdrLogger as IntCdrLogger } from '. /agi -modules/internal/cdr-logger'; ... constructor( private readonly intCdrLogger: IntCdrLogger, private readonly extCdrLogger: ExtCdrLogger, ){} И при этом у меня выходит что intCdrLogger === extCdrLogger. (или наоборот. Инициируется и попадает в DI только тот класс, который последним указан в providers модуля.) !!!! Почему так? Или лучше не использовать одинаковые имена классов и все?

Main message:
у тя же не namespace а классы просто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя же не namespace а классы просто

--

## My telegram message #28354
**Time:** 05.08.2019 12:54:39 UTC+05:00
**Link:** https://t.me/nest_ru/28354

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
тоесть если попытаешся использовать useClass то у тя ниче не выйдет) так как имена одинаковые, значит и без useClass не выйдет инжектнуть имена должны быть разные а если у тя нет доступа можно еще сделать модуль обертку который уже будет иметь в себе класс с другим именем который через useClass подменить класс вложенного модуля

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тоесть если попытаешся использовать useClass то у тя ниче не выйдет) так как имена одинаковые, значит и без useClass не выйдет инжектнуть имена должны быть разные а если у тя нет доступа можно еще сделать модуль обертку который уже будет иметь в себе класс с другим именем который через useClass подменить класс вложенного модуля

--

## My telegram message #28357
**Time:** 05.08.2019 12:58:16 UTC+05:00
**Link:** https://t.me/nest_ru/28357

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- доброе утро! что-то не могу найти какие в typeorm naming conventions. Поля - snake case, а таблицы?
- тоесть если попытаешся использовать useClass то у тя ниче не выйдет) так как имена одинаковые, значит и без useClass не выйдет инжектнуть имена должны быть разные а если у тя нет доступа можно еще сделать модуль обертку который уже будет иметь в себе класс с другим именем который через useClass подменить класс вложенного модуля
- в доке все таблицы в ед. числе, а сам он создает таблицу migrations для миграций. все равно получается?
- Не, доступ есть, изменить название - не проблема. Просто хотелось бы понять суть проблемы.

Main message:
вот суть: тоесть если попытаешся использовать useClass то у тя ниче не выйдет) так как имена одинаковые, значит и без useClass не выйдет инжектнуть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот суть: тоесть если попытаешся использовать useClass то у тя ниче не выйдет) так как имена одинаковые, значит и без useClass не выйдет инжектнуть

--

## My telegram message #28367
**Time:** 05.08.2019 15:57:31 UTC+05:00
**Link:** https://t.me/nest_ru/28367

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет, с graphql subscriptions кто-нибудь работал? Подскажите есть ли возможность ловить тригер unsubscribe ??
- ребят, какая у вас практика именования папок модулей, в частности состоящих из нескольких слов?
- Через -
- Мужики всем добрый день. А кто-то в курсе есть ли лимиты как програмный так и физические железа, на количество одновременых подписок в GraphQL ? Момент такой что у меня ~ 7000 пользователей в мин и у каждого могут быть максимум 40 подписок = 28 тыс подписок...

Main message:
а не пофигу ли? тыже можешь скелить приложение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а не пофигу ли? тыже можешь скелить приложение

--

## My telegram message #28369
**Time:** 05.08.2019 16:01:07 UTC+05:00
**Link:** https://t.me/nest_ru/28369

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Через -
- Мужики всем добрый день. А кто-то в курсе есть ли лимиты как програмный так и физические железа, на количество одновременых подписок в GraphQL ? Момент такой что у меня ~ 7000 пользователей в мин и у каждого могут быть максимум 40 подписок = 28 тыс подписок...
- а не пофигу ли? тыже можешь скелить приложение
- Да, но на сколько я знаю у железа есть лимиты на подключения. Там конечно много, но лимит если я првильно помню близок к моему количеству.

Main message:
порты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

порты

--

## My telegram message #28373
**Time:** 05.08.2019 16:05:17 UTC+05:00
**Link:** https://t.me/nest_ru/28373

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а не пофигу ли? тыже можешь скелить приложение
- Да, но на сколько я знаю у железа есть лимиты на подключения. Там конечно много, но лимит если я првильно помню близок к моему количеству.
- порты
- Не думаю что прикол в портах. Он один и тот же будет. Сейчас глянул доки, там все идет через Websoket нужно глянуть что у него по лимитам.

Main message:
ага, просто я думал что веб сокет это как обычный сокет, типа клиент долбится на бэк и спрашивает дай мне свободный сокет для мессаг, бэк, такой: на и клент на этот порт коннектится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага, просто я думал что веб сокет это как обычный сокет, типа клиент долбится на бэк и спрашивает дай мне свободный сокет для мессаг, бэк, такой: на и клент на этот порт коннектится

--

## My telegram message #28377
**Time:** 05.08.2019 16:06:10 UTC+05:00
**Link:** https://t.me/nest_ru/28377

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
TCP

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

TCP

--

## My telegram message #28381
**Time:** 05.08.2019 16:07:12 UTC+05:00
**Link:** https://t.me/nest_ru/28381

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ага, просто я думал что веб сокет это как обычный сокет, типа клиент долбится на бэк и спрашивает дай мне свободный сокет для мессаг, бэк, такой: на и клент на этот порт коннектится
- Вот в этом и прикол что у железа есть ограничения по сокетам. Это точно. Вот только не помню сколько их там.
- TCP
- Нет, один порт несколько сокетов то есть socketslimit * portslimit

Main message:
не копал вот чет пишут  https://superuser.com/questions/251596/is-there-a-hard-limit-of-65536-open-tcp-connections-per-ip-address-on-linux

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не копал вот чет пишут  https://superuser.com/questions/251596/is-there-a-hard-limit-of-65536-open-tcp-connections-per-ip-address-on-linux

--

## My telegram message #28387
**Time:** 05.08.2019 16:52:09 UTC+05:00
**Link:** https://t.me/nest_ru/28387

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- подскажите пожалуйста, в 5-ой версии неста можно было в AppModule делать  imports: [ SomeModule.forRootAsync({ userFactory: (userService) => ... inject: [UserService] ), UserModule ]
- А если UserModule выше поднять?
- пробовал, не катит
- Вот тут по 50к ws соединений на каждый порт  https://goroutines.com/10m

Main message:
ваще не шарю, все может быть, слишком низкоуровнево 😎

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ваще не шарю, все может быть, слишком низкоуровнево 😎

--

## My telegram message #28389
**Time:** 05.08.2019 16:52:56 UTC+05:00
**Link:** https://t.me/nest_ru/28389

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- пробовал, не катит
- Вот тут по 50к ws соединений на каждый порт  https://goroutines.com/10m
- ваще не шарю, все может быть, слишком низкоуровнево 😎
- Что за приложение такое, поисковик гугла?

Main message:
мобила наверное, там очень быстро можно получить такую нагрузку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мобила наверное, там очень быстро можно получить такую нагрузку

--

## My telegram message #28396
**Time:** 05.08.2019 17:12:19 UTC+05:00
**Link:** https://t.me/nest_ru/28396

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мобила наверное, там очень быстро можно получить такую нагрузку
- Интернет магазин. Но там прикол в том что нужно в лайве показывать если товар кто-то купил или нет.
- я всегда думал что это от фонаря делается на сайтах)) типа “этот отель только что забронировало 5 человек”
- Обычно так и делают.

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #28401
**Time:** 05.08.2019 17:18:06 UTC+05:00
**Link:** https://t.me/nest_ru/28401

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я всегда думал что это от фонаря делается на сайтах)) типа “этот отель только что забронировало 5 человек”
- Обычно так и делают.
- )
- АГА

Main message:
🙃

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

🙃

--

## My telegram message #28405
**Time:** 05.08.2019 17:19:23 UTC+05:00
**Link:** https://t.me/nest_ru/28405

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )
- АГА
- 🙃
- 😂

Main message:
на каждый фильтр подписка своя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на каждый фильтр подписка своя

--

## My telegram message #28411
**Time:** 05.08.2019 17:22:09 UTC+05:00
**Link:** https://t.me/nest_ru/28411

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 🙃
- 😂
- на каждый фильтр подписка своя
- Я тебе больше скажу. Сами же Apollo гоняют сейчас все по сокетам.

Main message:
имею ввидду данные об изменениях тока гоняю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

имею ввидду данные об изменениях тока гоняю

--

## My telegram message #28418
**Time:** 05.08.2019 18:24:42 UTC+05:00
**Link:** https://t.me/nest_ru/28418

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мужики, как в class-validator указать что endDate должна быть больше чем startDate? В ишьюсах нашел что все декораторы принимают только статические параметры. Фигня какая-то в том же joi такое сделать вообще не проблема.  @IsDate() startDate: Date; @IsDate() endDate: Date;
- Custom validation decorators в ридми
- Круто, спасибо, упустил.
- чо делать если не работает скрипт start:dev с typeorm?

Main message:
нужен код, залей репу в гитхаб

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужен код, залей репу в гитхаб

--

## My telegram message #28460
**Time:** 06.08.2019 15:21:43 UTC+05:00
**Link:** https://t.me/nest_ru/28460

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
верно говоришь , я сначала сделал, а потом через несколько дней тока понял чот я сделал)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

верно говоришь , я сначала сделал, а потом через несколько дней тока понял чот я сделал)

--

## My telegram message #28462
**Time:** 06.08.2019 15:22:06 UTC+05:00
**Link:** https://t.me/nest_ru/28462

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну ты попробуй сессии замутить без жвт

Main message:
без паспорта можно руками все сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

без паспорта можно руками все сделать

--

## My telegram message #28468
**Time:** 06.08.2019 15:22:53 UTC+05:00
**Link:** https://t.me/nest_ru/28468

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- без паспорта можно руками все сделать
- Думаю руками ничего сложного поидее
- я пытаюсь всё из экспресса подтянуть и как-то с этими guardами мозг идет набекрень
- Один раз запили хорошо и все

Main message:
я прикрутил паспорт просто чтобы типа подрубать кастомы легко всякие

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я прикрутил паспорт просто чтобы типа подрубать кастомы легко всякие

--

## My telegram message #28480
**Time:** 06.08.2019 15:27:48 UTC+05:00
**Link:** https://t.me/nest_ru/28480

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я прикрутил паспорт просто чтобы типа подрубать кастомы легко всякие
- Как сделаешь залей на гитхаб ради интереса ))
- о, я паспорт планирую к демке подрубить через какое-то время
- Бля, как же жиза

Main message:
))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

))

--

## My telegram message #28482
**Time:** 06.08.2019 15:27:56 UTC+05:00
**Link:** https://t.me/nest_ru/28482

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- о, я паспорт планирую к демке подрубить через какое-то время
- Бля, как же жиза
- ))
- Так и не сделал по итогу

Main message:
вот мое без паспорта  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/guards/access.guard.ts

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот мое без паспорта  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/guards/access.guard.ts

--

## My telegram message #28485
**Time:** 06.08.2019 15:28:59 UTC+05:00
**Link:** https://t.me/nest_ru/28485

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ))
- Так и не сделал по итогу
- вот мое без паспорта  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/guards/access.guard.ts
- мне через полтора часа сдавать проект

Main message:
глянь у меня

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

глянь у меня

--

## My telegram message #28494
**Time:** 06.08.2019 15:31:27 UTC+05:00
**Link:** https://t.me/nest_ru/28494

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот мое без паспорта  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/guards/access.guard.ts
- мне через полтора часа сдавать проект
- глянь у меня
- Да забей тогда кастомку делай

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #28501
**Time:** 06.08.2019 15:32:38 UTC+05:00
**Link:** https://t.me/nest_ru/28501

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да забей тогда кастомку делай
- )
- После МЛа скучно писать бэки)))
- ???

Main message:
UsersModule экспорта наверное нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

UsersModule экспорта наверное нет

--

## My telegram message #28505
**Time:** 06.08.2019 15:39:20 UTC+05:00
**Link:** https://t.me/nest_ru/28505

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- вот мое без паспорта  https://github.com/rucken/core-nestjs/blob/0.2.0/src/libs/core/guards/access.guard.ts

Main message:
вот это глянь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот это глянь

--

## My telegram message #28507
**Time:** 06.08.2019 15:42:58 UTC+05:00
**Link:** https://t.me/nest_ru/28507

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в туторе неста есть две части авторизации - passport-local и passport-jwt без жвт можно обойтись вообще?
- Можно
- вот это глянь
- я там мало что понял, честно говоря там жвт

Main message:
ну ладно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ладно

--

## My telegram message #28510
**Time:** 06.08.2019 16:34:29 UTC+05:00
**Link:** https://t.me/nest_ru/28510

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Можно но это не круто, я в контроллере вызываю два метода разных сервисов Можно ещё через это сделать  https://docs.nestjs.com/recipes/cqrs

Main message:
👆🏼

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👆🏼

--

## My telegram message #28513
**Time:** 06.08.2019 16:39:01 UTC+05:00
**Link:** https://t.me/nest_ru/28513

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну ладно
- Парни, а сервис в сервис плохая практика совать ? У меня есть calendar и price сервисы. При добавлении в calendar нужно добавить так же данные и в price. Если я price "заижекчу" в calendar - это нормально или нужно оба в отдельный сервис выносить ?
- 👆🏼
- А если эти 2 метода должны быть в одной транзакции, то транзакцию мне тоже в контроллере запускать, коммитить и передавать каждому из методов сервиса ?

Main message:
с этим не помогу трнзакции не юзал тут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с этим не помогу трнзакции не юзал тут

--

## My telegram message #28516
**Time:** 06.08.2019 17:32:18 UTC+05:00
**Link:** https://t.me/nest_ru/28516

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А если эти 2 метода должны быть в одной транзакции, то транзакцию мне тоже в контроллере запускать, коммитить и передавать каждому из методов сервиса ?
- с этим не помогу трнзакции не юзал тут
- понял, спасибо
- ребят кто по front-end state management шарит?

Main message:
в чат напиши своего фронта)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в чат напиши своего фронта)

--

## My telegram message #28518
**Time:** 06.08.2019 17:32:45 UTC+05:00
**Link:** https://t.me/nest_ru/28518

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- понял, спасибо
- ребят кто по front-end state management шарит?
- в чат напиши своего фронта)
- здесь родня, мало ли :D

Main message:
их же дофига стэйтов и фрэймов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

их же дофига стэйтов и фрэймов

--

## My telegram message #28522
**Time:** 06.08.2019 17:34:48 UTC+05:00
**Link:** https://t.me/nest_ru/28522

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в чат напиши своего фронта)
- здесь родня, мало ли :D
- их же дофига стэйтов и фрэймов
- ну вопрос, в принципе следующий. приходит с Nest api response коллекция, назовем Items [ {product_id: string} ]

Main message:
а как подургому

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а как подургому

--

## My telegram message #28526
**Time:** 06.08.2019 17:36:03 UTC+05:00
**Link:** https://t.me/nest_ru/28526

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну вопрос, в принципе следующий. приходит с Nest api response коллекция, назовем Items [ {product_id: string} ]
- а как подургому
- может стоит отдельно хранить в Store данные о Products, и использовать геттеры?
- Плохая идея, у тебя может быть такое что пользователь удали Localstorage

Main message:
а че с бэка не отправишь все что нужно фронту? жалко чтоли

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а че с бэка не отправишь все что нужно фронту? жалко чтоли

--

## My telegram message #28529
**Time:** 06.08.2019 17:37:38 UTC+05:00
**Link:** https://t.me/nest_ru/28529

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
неееее))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неееее))

--

## My telegram message #28531
**Time:** 06.08.2019 17:37:58 UTC+05:00
**Link:** https://t.me/nest_ru/28531

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а че с бэка не отправишь все что нужно фронту? жалко чтоли
- в Store в смысле State management (Vuex). не localstorage
- неееее))
- а как тогда?)

Main message:
один запрос в бд и все данные получаешь join

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

один запрос в бд и все данные получаешь join

--

## My telegram message #28536
**Time:** 06.08.2019 17:38:31 UTC+05:00
**Link:** https://t.me/nest_ru/28536

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- mongo 😯

Main message:
ну это ты сам выбрал, гугли как там делать это

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это ты сам выбрал, гугли как там делать это

--

## My telegram message #28552
**Time:** 06.08.2019 17:51:57 UTC+05:00
**Link:** https://t.me/nest_ru/28552

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- И я ответил человеку )

Main message:
Я еще не ответил человеку, но могу ответить если надо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я еще не ответил человеку, но могу ответить если надо

--

## My telegram message #28555
**Time:** 06.08.2019 17:54:19 UTC+05:00
**Link:** https://t.me/nest_ru/28555

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Может кто знает как настроить Logger что бы все сохранялось в файле?

Main message:
просто сделай свой сервис экстенди его от базового и напиши внутри  import * as fs from 'fs'; fs.appendFileSync('custom-logger.txt', 'данные для логирования');

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто сделай свой сервис экстенди его от базового и напиши внутри  import * as fs from 'fs'; fs.appendFileSync('custom-logger.txt', 'данные для логирования');

--

## My telegram message #28562
**Time:** 06.08.2019 18:01:40 UTC+05:00
**Link:** https://t.me/nest_ru/28562

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- блять) populate мощная штука оказывается 😆 можно ведь сразу populate на бакенде и без всяких геттеров на фронте :)

Main message:
когда на бэке реляционная бд все время так и делаем, фронт не занимается агрегацией данных

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда на бэке реляционная бд все время так и делаем, фронт не занимается агрегацией данных

--

## My telegram message #28636
**Time:** 07.08.2019 12:17:39 UTC+05:00
**Link:** https://t.me/nest_ru/28636

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- saveUninitialized: false, resave: false когда они у меня в false, то не отправляется заголовок Set-Cookie куда глядеть?
- а вот и ответ  https://stackoverflow.com/questions/33913758/express-session-isnt-setting-session-cookie-while-using-with-socket-io
- Плюсую, такой же вопрос
- ребяты, кто-нибудь пользуется type-graphql?

Main message:
юзал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

юзал

--

## My telegram message #28638
**Time:** 07.08.2019 12:26:51 UTC+05:00
**Link:** https://t.me/nest_ru/28638

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Плюсую, такой же вопрос
- ребяты, кто-нибудь пользуется type-graphql?
- юзал
- пытаюсь запилить typegraphql guard (не nest guard), чтобы вешать его на поля в user entity, не могу понять какого типа контекст передаётся в typegraphql

Main message:
я нестовый jwt юзал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я нестовый jwt юзал

--

## My telegram message #28641
**Time:** 07.08.2019 12:34:48 UTC+05:00
**Link:** https://t.me/nest_ru/28641

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
делаю руками, не копал может ли сам тайп орм незнаю, скорее это как то базоспецифично

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

делаю руками, не копал может ли сам тайп орм незнаю, скорее это как то базоспецифично

--

## My telegram message #28645
**Time:** 07.08.2019 12:39:15 UTC+05:00
**Link:** https://t.me/nest_ru/28645

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я нестовый jwt юзал
- буду дублировать свой вопрос кажый час. чтобы он не ушел на совсем вверх
- делаю руками, не копал может ли сам тайп орм незнаю, скорее это как то базоспецифично
- руками как ? сравнивать старый и новый массив и создавать/удалять записть для добавленого/удаленного элемента ? но еще надо обновить и те, что остались, но изменились. Блин

Main message:
вот эти юзеры я так понял сами создаются и привязки сами удаляются при удалении связи  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L66

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот эти юзеры я так понял сами создаются и привязки сами удаляются при удалении связи  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L66

--

## My telegram message #28650
**Time:** 07.08.2019 12:46:01 UTC+05:00
**Link:** https://t.me/nest_ru/28650

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- делаю руками, не копал может ли сам тайп орм незнаю, скорее это как то базоспецифично
- руками как ? сравнивать старый и новый массив и создавать/удалять записть для добавленого/удаленного элемента ? но еще надо обновить и те, что остались, но изменились. Блин
- вот эти юзеры я так понял сами создаются и привязки сами удаляются при удалении связи  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L66
- при создании и удалении это просто. но вот как обновлять массив зависимых сущностей не понятно, т.е я присылаю резюме с новым массивом работ и надо понять, что в нем было добавленно/изменено/удалено. и проделать тоже самое с соответствующими энтити.

Main message:
сами данные в работах меняются?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сами данные в работах меняются?

--

## My telegram message #28654
**Time:** 07.08.2019 12:47:59 UTC+05:00
**Link:** https://t.me/nest_ru/28654

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот эти юзеры я так понял сами создаются и привязки сами удаляются при удалении связи  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L66
- при создании и удалении это просто. но вот как обновлять массив зависимых сущностей не понятно, т.е я присылаю резюме с новым массивом работ и надо понять, что в нем было добавленно/изменено/удалено. и проделать тоже самое с соответствующими энтити.
- сами данные в работах меняются?
- могут измениться поля, могут добавиться целиком новая работа или быть удалена. Я сделал одну сплошную форму на клиенте для всего сразу

Main message:
если добавление, удаление новых работ это логика сама должна работать (про создание точно не скажу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если добавление, удаление новых работ это логика сама должна работать (про создание точно не скажу)

--

## My telegram message #28658
**Time:** 07.08.2019 14:19:08 UTC+05:00
**Link:** https://t.me/nest_ru/28658

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сами данные в работах меняются?
- могут измениться поля, могут добавиться целиком новая работа или быть удалена. Я сделал одну сплошную форму на клиенте для всего сразу
- если добавление, удаление новых работ это логика сама должна работать (про создание точно не скажу)
- Короче все оказалось проще чем казалось ORM сама всё разруливает по id шникам ) добавляет объект, если id 0, изменяет если id существует, удаляет если объект отсутствует

Main message:
супер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

супер

--

## My telegram message #28670
**Time:** 07.08.2019 22:03:40 UTC+05:00
**Link:** https://t.me/nest_ru/28670

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- нужна помощь коллективного разума с тем, что бы подружить 2 микросервиса через rmq дело в том, что аппликуха подключается к клауду, создает очередь, если той нет, но не пушит туда сообщения, и не потребляет те что уже есть

Main message:
Через редис работает или тсп?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через редис работает или тсп?

--

## My telegram message #28672
**Time:** 07.08.2019 22:06:40 UTC+05:00
**Link:** https://t.me/nest_ru/28672

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нужна помощь коллективного разума с тем, что бы подружить 2 микросервиса через rmq дело в том, что аппликуха подключается к клауду, создает очередь, если той нет, но не пушит туда сообщения, и не потребляет те что уже есть
- All привет - objection не удаляет с Postgres на доккере?
- Через редис работает или тсп?
- Не пробовал, мне важно через rmq это сделать Уже создал локальный инстанс, но там проблема та же: очередь создается, но сообщения не отправляются

Main message:
Я на редис сам, но тестил на тсп сначала

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я на редис сам, но тестил на тсп сначала

--

## My telegram message #28676
**Time:** 07.08.2019 22:24:07 UTC+05:00
**Link:** https://t.me/nest_ru/28676

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не пробовал, мне важно через rmq это сделать Уже создал локальный инстанс, но там проблема та же: очередь создается, но сообщения не отправляются
- Я на редис сам, но тестил на тсп сначала
- Я использовал транспорт Реббит между двумя Нест апликухами. Кидай код, помого чем смогу
- что в несте используется в качестве, так называемой шины событий? внутри приложения

Main message:
Cqrs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Cqrs

--

## My telegram message #28681
**Time:** 07.08.2019 22:27:35 UTC+05:00
**Link:** https://t.me/nest_ru/28681

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- что в несте используется в качестве, так называемой шины событий? внутри приложения
- Cqrs
- Привет, всем что там у вас с этими сервисами ? Я уже запустил у себя на проде.
- нет, нужно для начала стараюсь хотя бы локально запустить

Main message:
Мне лень руками делать, ищу образ доккер, если нету то руками, обычно есть 😁

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Мне лень руками делать, ищу образ доккер, если нету то руками, обычно есть 😁

--

## My telegram message #28693
**Time:** 07.08.2019 22:32:13 UTC+05:00
**Link:** https://t.me/nest_ru/28693

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Сек, сейчас покажу как у меня идёт по tcp.
- очередь создает, но сообщения до rmq не доходят
- Или тебе нужно только amqp ?
- очень желательно

Main message:
В офф доке название нужно еще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В офф доке название нужно еще

--

## My telegram message #28699
**Time:** 07.08.2019 22:34:14 UTC+05:00
**Link:** https://t.me/nest_ru/28699

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Или тебе нужно только amqp ?
- очень желательно
- В офф доке название нужно еще
- так название в объекте определено

Main message:
У тя нет названия очереди

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя нет названия очереди

--

## My telegram message #28704
**Time:** 07.08.2019 22:35:23 UTC+05:00
**Link:** https://t.me/nest_ru/28704

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В офф доке название нужно еще
- так название в объекте определено
- У тя нет названия очереди
- вот оно, определено

Main message:
Выстави

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Выстави

--

## My telegram message #28709
**Time:** 07.08.2019 22:37:54 UTC+05:00
**Link:** https://t.me/nest_ru/28709

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У тя нет названия очереди
- вот оно, определено
- Выстави
- сделал, как и до этого - результат один: очередь с этим именем создана, но сообщение не отправляется

Main message:
А зачем в тик обернул?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А зачем в тик обернул?

--

## My telegram message #28715
**Time:** 07.08.2019 22:40:25 UTC+05:00
**Link:** https://t.me/nest_ru/28715

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Выстави
- сделал, как и до этого - результат один: очередь с этим именем создана, но сообщение не отправляется
- А зачем в тик обернул?
- pubSub = new PubSub(); constructor(private readonly productService: ProductService, private readonly categoryService: CategoryService,  @Inject ('STATISTICS_SERVICE') private readonly client: ClientProxy) { }  @Query ('product') async product( @Args ('id') id: string): Promise<Product> { const product = await this.productService.getOne(id); this.client.emit<string>('product_view', {entityType: 'product', entity: product}).toPromise(); return await product; }

Main message:
У него самопал, может криво рабит поднял

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У него самопал, может криво рабит поднял

--

## My telegram message #28719
**Time:** 07.08.2019 22:42:39 UTC+05:00
**Link:** https://t.me/nest_ru/28719

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- pubSub = new PubSub(); constructor(private readonly productService: ProductService, private readonly categoryService: CategoryService,  @Inject ('STATISTICS_SERVICE') private readonly client: ClientProxy) { }  @Query ('product') async product( @Args ('id') id: string): Promise<Product> { const product = await this.productService.getOne(id); this.client.emit<string>('product_view', {entityType: 'product', entity: product}).toPromise(); return await product; }
- У него самопал, может криво рабит поднял
- Да слать бы по tcp и все, зачем делать новое колесо.
- пробую и локально, и на клауде

Main message:
Хм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Хм

--

## My telegram message #28729
**Time:** 07.08.2019 23:27:07 UTC+05:00
**Link:** https://t.me/nest_ru/28729

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
👆🏿

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👆🏿

--

## My telegram message #28732
**Time:** 07.08.2019 23:28:15 UTC+05:00
**Link:** https://t.me/nest_ru/28732

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 😏

Main message:
че как сам?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

че как сам?

--

## My telegram message #28741
**Time:** 07.08.2019 23:32:50 UTC+05:00
**Link:** https://t.me/nest_ru/28741

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 😏
- че как сам?
- спасибо
- Так как сранный веник , проектов на брал, ещё и коммандировке 2

Main message:
👍🏻

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍🏻

--

## My telegram message #28751
**Time:** 08.08.2019 07:10:55 UTC+05:00
**Link:** https://t.me/nest_ru/28751

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну, так или иначе - это доп. команда в чейне, которая не указана

Main message:
Как странно, в тестах у них нет такого  https://github.com/nestjs/nest/blob/master/integration/microservices/src/mqtt/mqtt.controller.ts#L54  https://github.com/nestjs/nest/blob/master/integration/microservices/src/rmq/rmq.controller.ts#L81

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Как странно, в тестах у них нет такого  https://github.com/nestjs/nest/blob/master/integration/microservices/src/mqtt/mqtt.controller.ts#L54  https://github.com/nestjs/nest/blob/master/integration/microservices/src/rmq/rmq.controller.ts#L81

--

## My telegram message #28754
**Time:** 08.08.2019 09:16:52 UTC+05:00
**Link:** https://t.me/nest_ru/28754

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я говорил с ними. Они это скоро сделают. И да, можно тупо поставить toPromise()
- ну, так или иначе - это доп. команда в чейне, которая не указана
- Как странно, в тестах у них нет такого  https://github.com/nestjs/nest/blob/master/integration/microservices/src/mqtt/mqtt.controller.ts#L54  https://github.com/nestjs/nest/blob/master/integration/microservices/src/rmq/rmq.controller.ts#L81
- Я про это тогда и говорил. Что в доках ничего нету, и не работает ...

Main message:
эээ

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эээ

--

## My telegram message #28764
**Time:** 08.08.2019 09:25:48 UTC+05:00
**Link:** https://t.me/nest_ru/28764

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как странно, в тестах у них нет такого  https://github.com/nestjs/nest/blob/master/integration/microservices/src/mqtt/mqtt.controller.ts#L54  https://github.com/nestjs/nest/blob/master/integration/microservices/src/rmq/rmq.controller.ts#L81
- Я про это тогда и говорил. Что в доках ничего нету, и не работает ...
- эээ
- Это так и будет работать. Вот только мы же обычно ставим всю логику в сервис, а про это они не говорят ничего.

Main message:
ааа, похоже да, или чувак мало пишет на тс, мы то привыкли к тайпскрипту и видим кто что возвращает и как с этим работать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ааа, похоже да, или чувак мало пишет на тс, мы то привыкли к тайпскрипту и видим кто что возвращает и как с этим работать

--

## My telegram message #28766
**Time:** 08.08.2019 09:28:16 UTC+05:00
**Link:** https://t.me/nest_ru/28766

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- эээ
- Это так и будет работать. Вот только мы же обычно ставим всю логику в сервис, а про это они не говорят ничего.
- ааа, похоже да, или чувак мало пишет на тс, мы то привыкли к тайпскрипту и видим кто что возвращает и как с этим работать
- Зато потом его будет не оттащить

Main message:
это да, станет женериковым тс маньячиной 😄

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это да, станет женериковым тс маньячиной 😄

--

## My telegram message #28771
**Time:** 08.08.2019 16:46:52 UTC+05:00
**Link:** https://t.me/nest_ru/28771

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- вот эти юзеры я так понял сами создаются и привязки сами удаляются при удалении связи  https://github.com/rucken/todo-nestjs/blob/master/libs/rucken/todo-nestjs/src/services/projects.service.ts#L66

Main message:
👆🏼

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👆🏼

--

## My telegram message #28775
**Time:** 08.08.2019 16:48:41 UTC+05:00
**Link:** https://t.me/nest_ru/28775

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет всем. Кто то работал с Easypay Api. Есть пару вопросов. Спасибо
- Всем привет. Подскажите пожалуйста, как каскадное обновление записей делать? Вот есть у меня две сущности {  @PrimaryGeneratedColumn ('uuid') id: string;  @Column () name: string;  @OneToMany (type => AddressGroupItem, item =>  item.group , { cascade: true }) items: AddressGroupItem[]; } {  @PrimaryGeneratedColumn ('uuid') id: string;  @Column () numberType: string;  @Column () number: string;  @ManyToOne (type => AddressGroup, group => group.items) group: AddressGroup; } когда дёргаю create и передаю объект вида { name: 'some name', items: [ { numberType: 'email', number: ' 123@ee.com '}] } то создаётся и объект группы и запись в таблице с items. а когда пытаюсь сделать update [ExceptionsHandler] No entity column "items" was found. +40447ms EntityColumnNotFound: No entity column "items" was found.
- 👆🏼
- Благодарю =)

Main message:
🤙🤝

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

🤙🤝

--

## My telegram message #28778
**Time:** 08.08.2019 17:40:45 UTC+05:00
**Link:** https://t.me/nest_ru/28778

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 👆🏼
- Благодарю =)
- 🤙🤝
- Всем доброго для. Подскажите плз как сделать в контроллере два одинаковых ендпоинта но с разными guard'ами так чтобы например реализовать в зависимости от наличия токена в запросе отдавать разные данные.  @Get('roles') @UseGuards(AuthGuard('bearer')) getRoles() { return AppRolesAll; } @Get('roles') getRolesPublic() { return AppRolesPublic; }

Main message:
Внутри метода бери юзера из реквеста и если он есть то одно делай, если нет другое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Внутри метода бери юзера из реквеста и если он есть то одно делай, если нет другое

--

## My telegram message #28784
**Time:** 08.08.2019 22:36:23 UTC+05:00
**Link:** https://t.me/nest_ru/28784

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Внутри метода бери юзера из реквеста и если он есть то одно делай, если нет другое
- это понятно, я думал может есть красивое решение
- кто нибудь может мне объяснить как работает скоуп  TRANSIENT у провайдеров ?
- Чёт я вижу каждый попадает на эти грабли по докам и потом делает отдельный шаред модуль 🤔😀

Main message:
через фабрику нужно все ентити, дто, сервисы создавать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через фабрику нужно все ентити, дто, сервисы создавать

--

## My telegram message #28796
**Time:** 09.08.2019 00:30:22 UTC+05:00
**Link:** https://t.me/nest_ru/28796

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- дело в том что при версионности приложения все равно придётся назвать модули одним и тем же именем

Main message:
Не понял

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не понял

--

## My telegram message #28801
**Time:** 09.08.2019 00:32:48 UTC+05:00
**Link:** https://t.me/nest_ru/28801

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- дело в том что при версионности приложения все равно придётся назвать модули одним и тем же именем
- Не понял
- 🤨
- то есть есть версия V1 и внем есть модуль UserModule то во второй версии тоже нужен этот модуль, но он уже не подгрузится

Main message:
Это будет UserModuleV2

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это будет UserModuleV2

--

## My telegram message #28803
**Time:** 09.08.2019 00:33:03 UTC+05:00
**Link:** https://t.me/nest_ru/28803

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- похоже придётся в каждой версии, каждый модуль назвать V1DeviceModule

Main message:
Yes

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Yes

--

## My telegram message #28807
**Time:** 09.08.2019 00:34:09 UTC+05:00
**Link:** https://t.me/nest_ru/28807

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это будет UserModuleV2
- похоже придётся в каждой версии, каждый модуль назвать V1DeviceModule
- Yes
- а это не плохая практика?

Main message:
Я делал сервис в2

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я делал сервис в2

--

## My telegram message #28812
**Time:** 09.08.2019 00:37:05 UTC+05:00
**Link:** https://t.me/nest_ru/28812

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Yes
- а это не плохая практика?
- Я делал сервис в2
- понятно, спасибо за помощь

Main message:
Ты обдумай всеже, просто смена версии апи это тяжело, если софт не в проде, то лучше без версий

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты обдумай всеже, просто смена версии апи это тяжело, если софт не в проде, то лучше без версий

--

## My telegram message #28870
**Time:** 10.08.2019 11:03:50 UTC+05:00
**Link:** https://t.me/nest_ru/28870

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- вот весь метод

Main message:
Вообще криминала не вижу, обычная гора кастома, явное лучше не явного, если команда знает rx то можно операторы создать на все проверки или тут все проверки вынести в какой нить ProfileValidateService, чтобы если что логику подменить с апп модуля или для тестов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Вообще криминала не вижу, обычная гора кастома, явное лучше не явного, если команда знает rx то можно операторы создать на все проверки или тут все проверки вынести в какой нить ProfileValidateService, чтобы если что логику подменить с апп модуля или для тестов

--

## My telegram message #28872
**Time:** 10.08.2019 11:32:55 UTC+05:00
**Link:** https://t.me/nest_ru/28872

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- FindOneAndUpdate(ID, {$set: data}, {new: true} )
- Как минимум все связанные с http ошибки убрать из сервиса
- Вообще криминала не вижу, обычная гора кастома, явное лучше не явного, если команда знает rx то можно операторы создать на все проверки или тут все проверки вынести в какой нить ProfileValidateService, чтобы если что логику подменить с апп модуля или для тестов
- Я бы засунул всю проверку в interceptor, можно будет переиспользовать, да и код будет чище.

Main message:
Не явно будет, другой разраб не сразу поймёт че происходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не явно будет, другой разраб не сразу поймёт че происходит

--

## My telegram message #28887
**Time:** 10.08.2019 13:46:33 UTC+05:00
**Link:** https://t.me/nest_ru/28887

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну это надо быть слепым тогда чтоб декоратор незаметить. вряд ли он вообще тогда что поймет, не соглашусь с тобой

Main message:
Я про глобальный интерцептор имел ввииду

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я про глобальный интерцептор имел ввииду

--

