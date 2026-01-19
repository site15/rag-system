## My telegram message #158633
**Time:** 06.05.2022 22:50:02 UTC+05:00
**Link:** https://t.me/nest_ru/158633

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #158719
**Time:** 07.05.2022 09:49:56 UTC+05:00
**Link:** https://t.me/nest_ru/158719

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да - все работает. Суть в другом. Тот модуль swagger nestjs - он создает страничку swagger ui, но не экспортит голый файл swagger- который мне и нужен

Main message:
​ ​const​ ​document​ ​=​ ​SwaggerModule​.​createDocument​(​app​,​ ​config​)​; ​ ​try​ ​{ ​ ​writeFileSync​(​'. /swagger .json'​,​ ​JSON​.​stringify​(​document​,​ ​null​,​ ​4​)​)​; ​ ​}​ ​catch​ ​(​error​)​ ​{ ​ ​Logger​.​error​(​error​,​ ​error​.​trace​)​; ​ ​} ​ ​SwaggerModule​.​setup​(​'api'​,​ ​app​,​ ​document​)​;

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

​ ​const​ ​document​ ​=​ ​SwaggerModule​.​createDocument​(​app​,​ ​config​)​; ​ ​try​ ​{ ​ ​writeFileSync​(​'. /swagger .json'​,​ ​JSON​.​stringify​(​document​,​ ​null​,​ ​4​)​)​; ​ ​}​ ​catch​ ​(​error​)​ ​{ ​ ​Logger​.​error​(​error​,​ ​error​.​trace​)​; ​ ​} ​ ​SwaggerModule​.​setup​(​'api'​,​ ​app​,​ ​document​)​;

--

## My telegram message #158739
**Time:** 07.05.2022 13:24:13 UTC+05:00
**Link:** https://t.me/nest_ru/158739

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Какой вариант удаления ресурса феншуйный при условии что нужно сначала проверить что ресурс принадлежит автору? Интересует именно эти варианты, а не те что описываются тригерами на события "удаления", "создания" записей в БД. Потому что я не смог это реализовать или это не подходит для меня или у меня мало опыта. Поэтому я пошел по более простому пути :) И так варианты 1) Найти ресурс, проверить что автор-ID из реквеста === автор-ID из самого ресурса(то есть я владелец ресурса) и начать удаление. 2) Удалить сразу без проверки, но по строгому условию  this.repository.delete({ user, id: carId, })  Второй вроде более проще

Main message:
До триггеров я делал для каждого контроллера с ресурсом метод без декорирования checkAccess(method: key of type of ControllerName, context) И там чекал Сам метод вызывал из специального Гарда Это псевдокод, с телефона пишу, может сейчас можно уже в ТС вытащить тип аргумента контроллера хз чтобы типизация была

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

До триггеров я делал для каждого контроллера с ресурсом метод без декорирования checkAccess(method: key of type of ControllerName, context) И там чекал Сам метод вызывал из специального Гарда Это псевдокод, с телефона пишу, может сейчас можно уже в ТС вытащить тип аргумента контроллера хз чтобы типизация была

--

## My telegram message #158773
**Time:** 07.05.2022 16:41:59 UTC+05:00
**Link:** https://t.me/nest_ru/158773

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Например здесь. Это вызывает неуверенность в коде.
- Так вас никто не обязывает делать это. Можете инициалирозвать свойства в каждой  dto , можете ставить  ! вместо инициализации
- Ещё беда когда фактические типы расходятся из описанными из-за недостаточно чесно поставленных декораторов class-validator
- Кто вам запрещает писать так?  сlass Dto { public readonly coolProperty!: number | null; }

Main message:
общение что там точно всегда будет значение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

общение что там точно всегда будет значение

--

## My telegram message #159036
**Time:** 08.05.2022 19:52:54 UTC+05:00
**Link:** https://t.me/nest_ru/159036

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Тогда придётся относительные пути писать, ладно

Main message:
https://docs.nestjs.com/cli/monorepo

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://docs.nestjs.com/cli/monorepo

--

## My telegram message #159253
**Time:** 09.05.2022 21:26:23 UTC+05:00
**Link:** https://t.me/nest_ru/159253

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Весь день убил - зря) Наверно придется отказаться от кастомного валидатора

Main message:
А чего надо то?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А чего надо то?

--

## My telegram message #159255
**Time:** 09.05.2022 21:29:39 UTC+05:00
**Link:** https://t.me/nest_ru/159255

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да самому мысля пришла, попозже попробую сам тогда, у меня что-то похожее есть
- Весь день убил - зря) Наверно придется отказаться от кастомного валидатора
- А чего надо то?
- Да вот, кастомный валидатион пайп написал. А он не выкидывает неописанные поля из дто

Main message:
Дай его

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Дай его

--

## My telegram message #159257
**Time:** 09.05.2022 21:55:46 UTC+05:00
**Link:** https://t.me/nest_ru/159257

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Весь день убил - зря) Наверно придется отказаться от кастомного валидатора
- А чего надо то?
- Да вот, кастомный валидатион пайп написал. А он не выкидывает неописанные поля из дто
- Дай его

Main message:
и что не так?)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и что не так?)

--

## My telegram message #159260
**Time:** 09.05.2022 22:11:01 UTC+05:00
**Link:** https://t.me/nest_ru/159260

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да вот, кастомный валидатион пайп написал. А он не выкидывает неописанные поля из дто
- Дай его
- и что не так?)
- export class UpdateUserDto { @ApiProperty({ example: 'Andrew', description: 'Имя пользователя' }) @IsString() @Expose() readonly firstName: string; @ApiProperty({ example: 'Ivanov', description: 'Фамилия пользователя' }) @IsString() @Expose() readonly lastName: string; } console.log(updateUserDto);  //  { firstName: 'test', lastName: 'test', email: 'sky132010@gmail.com' }  почта не вырезалась

Main message:
{strategy: 'excludeAll'}

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

{strategy: 'excludeAll'}

--

## My telegram message #159263
**Time:** 09.05.2022 22:12:38 UTC+05:00
**Link:** https://t.me/nest_ru/159263

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А если залогать этот объект, то там и правда не будет почты  const object = plainToClass(metatype, value, { strategy: 'excludeAll', });

Main message:
и че не так?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и че не так?

--

## My telegram message #159266
**Time:** 09.05.2022 22:13:56 UTC+05:00
**Link:** https://t.me/nest_ru/159266

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- {strategy: 'excludeAll'}
- А если залогать этот объект, то там и правда не будет почты  const object = plainToClass(metatype, value, { strategy: 'excludeAll', });
- и че не так?
- Я так понял нужно не сухое value возвращать а результат  plainToClass  ?  const object = plainToClass(metatype, value, { strategy: 'excludeAll', });

Main message:
ну да)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну да)

--

## My telegram message #159283
**Time:** 09.05.2022 22:40:56 UTC+05:00
**Link:** https://t.me/nest_ru/159283

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Почему мои сообщения удаляет бот?(

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #159608
**Time:** 12.05.2022 07:19:13 UTC+05:00
**Link:** https://t.me/nest_ru/159608

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #159654
**Time:** 12.05.2022 13:42:54 UTC+05:00
**Link:** https://t.me/nest_ru/159654

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- как можно отправить сообщение сюда?

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #159715
**Time:** 12.05.2022 19:26:59 UTC+05:00
**Link:** https://t.me/nest_ru/159715

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо)
- та не за что
- Я почувствовал как это больно
- Всем привет, у меня на проекте решили привязать страйп для платежок, вроде все ок работает, и мне дали таску с выводом средст, так вот вопрос Как выводить средства на банковский акк в Stripe ? Может кто помочь?

Main message:
я там в доке находил такое апи, но мне не подошло так как нужно было на произольную карту выводить, а там только на акк страйпа, поищи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я там в доке находил такое апи, но мне не подошло так как нужно было на произольную карту выводить, а там только на акк страйпа, поищи

--

## My telegram message #159800
**Time:** 13.05.2022 00:49:02 UTC+05:00
**Link:** https://t.me/nest_ru/159800

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если у тебя там не офигеть какой функционал, я бы и реакт выкинул
- Микросервис это когда нужно чёт тяжёлое из монолита вынести
- Не слышал об этом, но вроде это лучше подходит. Т.к. реакта там будет 2-3 файла и они будут выводить данные из fetch
- Привет ребята

Main message:
Эс забыл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Эс забыл

--

