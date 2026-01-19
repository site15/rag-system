## My telegram message #366531
**Time:** 17.06.2025 20:35:57 UTC+05:00
**Link:** https://t.me/nest_ru/366531

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если у него консистентность нарушена, то ему нужны локи. Если ему надо чтобы один и тот же запрос порождал одно действие, то идемпотентность
- так select for update гарантирует что единовременно только 1 транзакция получит доступ к row
- А если от хакеров защиться, то это вообще другое
- Но ему не нужно это гарантировать

Main message:
редлок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

редлок

--

## My telegram message #366732
**Time:** 18.06.2025 12:29:11 UTC+05:00
**Link:** https://t.me/nest_ru/366732

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- В общем повайбкодил тут либу. - со старта разработки до публикации 2 часа 30 минут. - ядро 1 час - тесты 1 час - разборки с нпм )) - 41 тест с помощью in-memory postgres pglite + (  @KaufmanEndy твоей либы)  https://www.npmjs.com/package/@nestjs-multitenant/typeorm  https://github.com/n0isy/nestjs-multitenant

Main message:
а че не заюзал AsyncLocalStorage, реквест скоуп же херовая штука

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а че не заюзал AsyncLocalStorage, реквест скоуп же херовая штука

--

## My telegram message #367265
**Time:** 25.06.2025 22:48:29 UTC+05:00
**Link:** https://t.me/nest_ru/367265

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Первый содержит протокол кодирования. Второй тело. Третий подпись

Main message:
у тебя наверное высшее образование есть по jwt

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя наверное высшее образование есть по jwt

--

## My telegram message #367580
**Time:** 30.06.2025 22:44:52 UTC+05:00
**Link:** https://t.me/nest_ru/367580

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Просто видел что-то такое в плюсах или типо того. Думал, мб в тс тоже есть нечто подобное)

Main message:
монада есть  https://gcanti.github.io/fp-ts/modules/Either.ts.html

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

монада есть  https://gcanti.github.io/fp-ts/modules/Either.ts.html

--

## My telegram message #367584
**Time:** 30.06.2025 22:47:28 UTC+05:00
**Link:** https://t.me/nest_ru/367584

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Имея отличный подход к исключениям пытаться родить такое г прям грусть

Main message:
там прикол что ты все видишь сразу, ошибки и код и у тебя нет выбора аля нечто глобальное и значит не проебешь баг 100%

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там прикол что ты все видишь сразу, ошибки и код и у тебя нет выбора аля нечто глобальное и значит не проебешь баг 100%

--

## My telegram message #367590
**Time:** 30.06.2025 22:56:18 UTC+05:00
**Link:** https://t.me/nest_ru/367590

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- монада есть  https://gcanti.github.io/fp-ts/modules/Either.ts.html
- Дичь какая-то, имхо. Я скорее про именование думаю, чем про замену хорошего try-catch
- там прикол что ты все видишь сразу, ошибки и код и у тебя нет выбора аля нечто глобальное и значит не проебешь баг 100%
- пробовал я ее добавлять в проект, не взлетело

Main message:
напиши псевдокод с использованием этой монады для функции: получем на вход логин и пасс, пытаемся создать юзера, если ошибка то ищем его по переданному емайл, если ошибок нет то создаем, в конце функции возвращаем юзера Вот псевдокод с использованием монады  Either на основе твоей логики:  function registerOrFindUser(login: string, pass: string): Either<string, User> { return flatMap( tryCreateUser(login, pass), // Either<string, User> userOrError => isRight(userOrError) ? right(userOrError.right) // Успешное создание : findUserByEmail(login) // Если ошибка, пробуем найти по email ); } Альтернативный вариант — развернутый в стиле  pipe :  function registerOrFindUser(login: string, pass: string): Either<string, User> { const created = tryCreateUser(login, pass); // Either<string, User> if (isRight(created)) { return created; } return findUserByEmail(login); // Either<string, User> } Или в функциональном стиле (если используешь  fp-ts , например):  pipe( tryCreateUser(login, pass), orElse(() => findUserByEmail(login)) ); ### Примечания: *  tryCreateUser(login, pass) и  findUserByEmail(login) должны возвращать  Either<string, User> . * Если хочешь, могу показать реализацию  tryCreateUser и  findUserByEmail в стиле  Either .

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

напиши псевдокод с использованием этой монады для функции: получем на вход логин и пасс, пытаемся создать юзера, если ошибка то ищем его по переданному емайл, если ошибок нет то создаем, в конце функции возвращаем юзера Вот псевдокод с использованием монады  Either на основе твоей логики:  function registerOrFindUser(login: string, pass: string): Either<string, User> { return flatMap( tryCreateUser(login, pass), // Either<string, User> userOrError => isRight(userOrError) ? right(userOrError.right) // Успешное создание : findUserByEmail(login) // Если ошибка, пробуем найти по email ); } Альтернативный вариант — развернутый в стиле  pipe :  function registerOrFindUser(login: string, pass: string): Either<string, User> { const created = tryCreateUser(login, pass); // Either<string, User> if (isRight(created)) { return created; } return findUserByEmail(login); // Either<string, User> } Или в функциональном стиле (если используешь  fp-ts , например):  pipe( tryCreateUser(login, pass), orElse(() => findUserByEmail(login)) ); ### Примечания: *  tryCreateUser(login, pass) и  findUserByEmail(login) должны возвращать  Either<string, User> . * Если хочешь, могу показать реализацию  tryCreateUser и  findUserByEmail в стиле  Either .

--

## My telegram message #367595
**Time:** 30.06.2025 23:14:23 UTC+05:00
**Link:** https://t.me/nest_ru/367595

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- О. Ты слез с гигачада? ))

Main message:
не, для экзотики чатгпт, для понятных вещей гигачат

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, для экзотики чатгпт, для понятных вещей гигачат

--

## My telegram message #367599
**Time:** 30.06.2025 23:16:35 UTC+05:00
**Link:** https://t.me/nest_ru/367599

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- try catch сильно отличается от простого return. правда же?

Main message:
ну прикол именно в глобальности, если мы выкидываем ошибку это параллельный флоу который можно ловить в разных местах а с either мы всегда можем ловить ошибку только в месте ее возникновения, это удобнов тупых языках типа раст, го, с

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну прикол именно в глобальности, если мы выкидываем ошибку это параллельный флоу который можно ловить в разных местах а с either мы всегда можем ловить ошибку только в месте ее возникновения, это удобнов тупых языках типа раст, го, с

--

## My telegram message #367748
**Time:** 06.07.2025 01:01:01 UTC+05:00
**Link:** https://t.me/nest_ru/367748

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как создать кастомные команды для nest cli через schematics?

Main message:
я скопировал у nx  https://github.com/nrwl/nx/tree/master/packages/nest и переделал под себя  https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я скопировал у nx  https://github.com/nrwl/nx/tree/master/packages/nest и переделал под себя  https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics

--

## My telegram message #367750
**Time:** 06.07.2025 01:07:52 UTC+05:00
**Link:** https://t.me/nest_ru/367750

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- имхо, лучше k6
- Как создать кастомные команды для nest cli через schematics?
- я скопировал у nx  https://github.com/nrwl/nx/tree/master/packages/nest и переделал под себя  https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics
- всем привет, можете пожалуйста прояснить как работает lazy-load и как сервер должен отдавать под него инфу? я так понимаю стоит end-point который отдает по limit, offset а на фронте отправляются запросы на получение доп инфы когда скролл закончится и инфа добавляются в список? или бек отдает полностью весь список и уже на фронте все режется на кусочки?

Main message:
это инфинити скрол, матаем мышкой на фронте и когда приближаемся к низу, фронт дозапрашивает по офсет доп данные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это инфинити скрол, матаем мышкой на фронте и когда приближаемся к низу, фронт дозапрашивает по офсет доп данные

--

## My telegram message #367821
**Time:** 07.07.2025 12:13:33 UTC+05:00
**Link:** https://t.me/nest_ru/367821

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- С текущими сервисами фреймворками и гавном от них я бы вообще остался на php. Сделал бы микросервисы в узких местах. Щас перейдешь на новый фрем гавна отзватишь больше чем было на легаси.
- Бери kysely
- да там дефолтыч цмска ничего особо сложного, просто больше мнение интересует о ормках среди бывалых, я до этого в основном на тайпорме двигался но в основном итак везде делаю на квери билдерах и файлы репы растут и растут и уже какт устал
- Опять срач за ОРМ наклелывается

Main message:
если привык квери билдеры использовать то дризл, если типовые круды без хитрых запросов то призма

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если привык квери билдеры использовать то дризл, если типовые круды без хитрых запросов то призма

--

## My telegram message #367840
**Time:** 07.07.2025 12:19:13 UTC+05:00
**Link:** https://t.me/nest_ru/367840

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Пишите на чем вам удобнее и не слушайте никого
- во во
- Или на том что просит бизнес
- меня уже от квери билдера тайпормовского колбасит, к примеру  async findAllWithPagination({ filterOptions, paginationOptions, }: { filterOptions?: FilterProductDto | null; paginationOptions: IPaginationOptions; }): Promise<{ products: Product[]; totalCount: number }> { const { page, limit } = paginationOptions; const offset = (page - 1) * limit; const qb = this.productRepository .createQueryBuilder('product') .leftJoinAndSelect('product.remains', 'remains') .leftJoinAndSelect('product.parameterValues', 'pv') .leftJoinAndSelect('product.model', 'model') .leftJoinAndSelect('product.category', 'category') .leftJoinAndSelect('pv.parameter', 'param') .leftJoinAndSelect('model.vendor', 'vendor') .leftJoinAndSelect('model.media', 'media') .where('remains.status = :status', { status: RemainsStatus.ACTIVE, }); if (filterOptions?.label) { qb.andWhere('product.labelId = :labelId', { labelId: filterOptions.label.id, }); } if (filterOptions?.category) { qb.andWhere('category.id = :categoryId', { categoryId: filterOptions.category.id, }); } if (filterOptions?.parameters?.length) { filterOptions.parameters.forEach(({ parameter, parameterValue }, idx) => { if (parameter === 'brand') { qb.andWhere('vendor.urlRelative = :brand', { brand: parameterValue.toLowerCase(), }); return; } if (parameter === 'price_from') { const from = parseFloat(parameterValue); if (!isNaN(from)) { qb.andWhere('remains.price >= :priceFrom', { priceFrom: from }); } return; } if (parameter === 'price_to') { const to = parseFloat(parameterValue); if (!isNaN(to)) { qb.andWhere('remains.price <= :priceTo', { priceTo: to }); } return; } // NOTE: can we do it better? qb.andWhere( new Brackets((qb2) => { qb2.where( ` EXISTS ( SELECT 1 FROM products_parameter_values AS pp JOIN parameter_value AS pv2 ON pv2.id = pp."parameterValueId" JOIN parameter AS param2 ON param2.id = pv2."parameterId" WHERE pp."productId" = product.id AND param2."urlRelative" = :param${idx} AND pv2."urlRelative" = :value${idx} ) `, { [`param${idx}`]: parameter, [`value${idx}`]: parameterValue, }, ); }), ); }); } const [entities, totalCount] = await qb .skip(offset) .take(limit) .getManyAndCount(); const products = entities.map((entity) => ProductMapper.toDomain(entity)); return { products, totalCount }; }  я тут упоролся сразу в несколько приколов: 1. не могу обычный фильтр по параметрам накинуть без этой шизы что щас (тайпорм мне какие то вообще рандомные ошибки кидает) 2. при попытке ордер сделать по лейблу к примеру - опять какая то ошибка (вроде по ишусам нашел что то с метадатой но чет не особо понятно что делать дальше)

Main message:
я бы переводил пхп проект на ноду только в одном случаи - нужно внедрить кучу реалтайма на веб сокетах

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я бы переводил пхп проект на ноду только в одном случаи - нужно внедрить кучу реалтайма на веб сокетах

--

## My telegram message #367851
**Time:** 07.07.2025 12:22:44 UTC+05:00
**Link:** https://t.me/nest_ru/367851

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А можно перевести просто чтобы было лучше На деньги бизнеса и риски пох думаю

Main message:
ты ошибся в словах, вот я поправил  А можно перевести просто чтобы было лучше программистам по зп На деньги бизнеса и риски пох думаю, а че бы нет, взять за пол года одно говно на дургое переписать и взять деньги с бизнеса на это, они любят деньги кидать на ветер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты ошибся в словах, вот я поправил  А можно перевести просто чтобы было лучше программистам по зп На деньги бизнеса и риски пох думаю, а че бы нет, взять за пол года одно говно на дургое переписать и взять деньги с бизнеса на это, они любят деньги кидать на ветер

--

## My telegram message #367853
**Time:** 07.07.2025 12:24:54 UTC+05:00
**Link:** https://t.me/nest_ru/367853

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- там просто все забито на yii2 и весь фронт тоже вшит в сервак через штмльки джсы и кссы, там не отдельный сервер на пэхе

Main message:
ну вот для начала разнести бы фронт и бэк, если есть сео оптимизация в проекте под поисковики, то фронт нужно тюнить под это это все можно сделать и при пхп может при разделении вы поймете что идея вся говно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну вот для начала разнести бы фронт и бэк, если есть сео оптимизация в проекте под поисковики, то фронт нужно тюнить под это это все можно сделать и при пхп может при разделении вы поймете что идея вся говно

--

## My telegram message #367859
**Time:** 07.07.2025 12:27:43 UTC+05:00
**Link:** https://t.me/nest_ru/367859

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты ошибся в словах, вот я поправил  А можно перевести просто чтобы было лучше программистам по зп На деньги бизнеса и риски пох думаю, а че бы нет, взять за пол года одно говно на дургое переписать и взять деньги с бизнеса на это, они любят деньги кидать на ветер
- ля ты крыса конечно
- ну вот для начала разнести бы фронт и бэк, если есть сео оптимизация в проекте под поисковики, то фронт нужно тюнить под это это все можно сделать и при пхп может при разделении вы поймете что идея вся говно
- Тоже верно

Main message:
ну если проект большой и тем более это cms то переписывание может занять несколько лет, так как cms обычно генерит все сам на лету, а если с нуля то придется писать генерилки бэка, и фронта, тоесть то что на cms можно сделать за 3 дня, с нулевой разроботкой бэка и фронта будут пистаь 1,5 месяца

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну если проект большой и тем более это cms то переписывание может занять несколько лет, так как cms обычно генерит все сам на лету, а если с нуля то придется писать генерилки бэка, и фронта, тоесть то что на cms можно сделать за 3 дня, с нулевой разроботкой бэка и фронта будут пистаь 1,5 месяца

--

## My telegram message #367863
**Time:** 07.07.2025 12:31:44 UTC+05:00
**Link:** https://t.me/nest_ru/367863

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну вот для начала разнести бы фронт и бэк, если есть сео оптимизация в проекте под поисковики, то фронт нужно тюнить под это это все можно сделать и при пхп может при разделении вы поймете что идея вся говно
- Тоже верно
- ну если проект большой и тем более это cms то переписывание может занять несколько лет, так как cms обычно генерит все сам на лету, а если с нуля то придется писать генерилки бэка, и фронта, тоесть то что на cms можно сделать за 3 дня, с нулевой разроботкой бэка и фронта будут пистаь 1,5 месяца
- Да там полу кмс полу фронт все намешано говнокодом и кастылями Еще и данные с основной базы тянуться на 5 разных сайтов, вообщем вся архитектура изначально была выстроена очень криво да и нет желания особого в пшп глубоко лезть, я условно за пару дней раскидал по модулям все и сам Кор функционал не такой уж большой так что наверное имеет смысл все равно по человечески написать и дать молодым поддерживать чем искать пхпшников

Main message:
нужно итеративно все делать, а не как сумашедшие джуны (пришел удалил и начал писать все с нуля, через 3 месяца задолбался и уволился, бизнес удалил проект)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужно итеративно все делать, а не как сумашедшие джуны (пришел удалил и начал писать все с нуля, через 3 месяца задолбался и уволился, бизнес удалил проект)

--

## My telegram message #367866
**Time:** 07.07.2025 12:32:39 UTC+05:00
**Link:** https://t.me/nest_ru/367866

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Кстати, это все таки я тут бот или это реальная проблема квери билдера?

Main message:
орм используется всегда и везде только для крудов типовых, все что за рамками лучше делать сырыми запросами + тесты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

орм используется всегда и везде только для крудов типовых, все что за рамками лучше делать сырыми запросами + тесты

--

## My telegram message #367869
**Time:** 07.07.2025 12:34:50 UTC+05:00
**Link:** https://t.me/nest_ru/367869

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нужно итеративно все делать, а не как сумашедшие джуны (пришел удалил и начал писать все с нуля, через 3 месяца задолбался и уволился, бизнес удалил проект)
- Кстати, это все таки я тут бот или это реальная проблема квери билдера?
- орм используется всегда и везде только для крудов типовых, все что за рамками лучше делать сырыми запросами + тесты
- Спасибо кстати, в основном что пугает что в дризле что они еще до v1 не дошли даже

Main message:
а вот если типовой круд то призма там норм

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а вот если типовой круд то призма там норм

--

## My telegram message #367874
**Time:** 07.07.2025 12:38:00 UTC+05:00
**Link:** https://t.me/nest_ru/367874

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну в идеале квери билдеры должны хотя бы типы выводить

Main message:
у тебя например на выходе 6 полей с разными типами, и ты решил юзать квери билдер чтобы типы подтянулись, но сам запрос в 4тыщи строк в перемешку сырой sql + квери билдер + Promise.all не проще ли написать один sql и потом просто типы кастовать если вдруг не устроил тип который в результе драйвера бд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя например на выходе 6 полей с разными типами, и ты решил юзать квери билдер чтобы типы подтянулись, но сам запрос в 4тыщи строк в перемешку сырой sql + квери билдер + Promise.all не проще ли написать один sql и потом просто типы кастовать если вдруг не устроил тип который в результе драйвера бд

--

## My telegram message #367904
**Time:** 07.07.2025 12:51:01 UTC+05:00
**Link:** https://t.me/nest_ru/367904

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Не проблема это написать, проблема что потом когда кто-то поменяет sql, но забудет поменять типы и приложение пойдет в прод с ошибкой

Main message:
я тесты пишу на сырые запросы, при старте приложения они все запускаются, если поля сломаны то приложение не стартует у меня в режиме разработки и я чиню все что сломалось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тесты пишу на сырые запросы, при старте приложения они все запускаются, если поля сломаны то приложение не стартует у меня в режиме разработки и я чиню все что сломалось

--

## My telegram message #367906
**Time:** 07.07.2025 12:51:52 UTC+05:00
**Link:** https://t.me/nest_ru/367906

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Просто яйца
- Там один бедный сисадмин сидит поддерживающий раз в месяц что-то, основная проблема что тормозит все и запросы по 5 секунд отдает в моментах А те бойцы что изначально на пэхе написали еще в 19м году ливнули
- я тесты пишу на сырые запросы, при старте приложения они все запускаются, если поля сломаны то приложение не стартует у меня в режиме разработки и я чиню все что сломалось
- Ну тогда удачи Явно дешевле будет взять готовый конструктор ИМ Благо их как грибов после дождя Писать с 0 ИМ - тупо Только если готовых решений не хватает Ну или нужно скрыть бухгалтерию из паблик поля

Main message:
эти тесты прям в коде, я так и в пхп и шарпе и джаве и делфи делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эти тесты прям в коде, я так и в пхп и шарпе и джаве и делфи делал

--

## My telegram message #367912
**Time:** 07.07.2025 12:53:47 UTC+05:00
**Link:** https://t.me/nest_ru/367912

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А есть то чего ты не знаешь ?

Main message:
го раст руби

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

го раст руби

--

