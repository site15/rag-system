## My telegram message #153793
**Time:** 10.04.2022 22:30:30 UTC+05:00
**Link:** https://t.me/nest_ru/153793

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Именно монолит мне и нужен)
- я так же сначала vue ставил, фреймворк все равно полноценно работать так не сможет, я с next не работал, но наверняка работать сможешь только на уровне репозитория, без фич типа single file component и т д
- Я перепробовал многое и вот к чему пришел. Вытащил файл  ormconfig.ts конфигурации бд в папку src. Сделав обязательно экспорт конфигурации по умолчанию (и по желанию именованный), но само важно тут по дефолту экспортить.  import { config } from 'dotenv'; import { TypeOrmModuleOptions } from '@nestjs/typeorm'; config(); export const ormconfig: TypeOrmModuleOptions = { type: 'mysql', host: process.env.MYSQL_HOST, port: +process.env.MYSQL_PORT, username: process.env.MYSQL_USERNAME, password: process.env.MYSQL_PASSWORD, database: process.env.MYSQL_DATABASE_NAME, synchronize: process.env.NODE_ENV === 'development', entities: [ __dirname + './**/*.entity.ts', __dirname + './../dist/../**/*.entity.js', ], migrationsTableName: 'migrations-typeorm', migrations: [__dirname + './migrations/*{.ts,.js}'], cli: { entitiesDir: 'src', migrationsDir: 'db/migrations', }, charset: 'utf8mb4', }; export default ormconfig;  ===  package.json  "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --config src/ormconfig.ts", "typeorm:migrate": "npm run typeorm migration:generate -- -n", "typeorm:run": "npm run typeorm migration:run"
- @KaufmanEndy Немного уточню) В  AuthMiddleware нужно делать доп проверку на то что рефреш токен не в черном списке?

Main message:
я в гарде делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я в гарде делал

--

## My telegram message #153843
**Time:** 11.04.2022 18:25:52 UTC+05:00
**Link:** https://t.me/nest_ru/153843

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет, можно статью где можно прочитать о миграции в nestJS, TypeOrm. Как запускать, как создать.
- https://typeorm.io/migrations
- Привет! Есть какой-то вариант сделать систему оповещений через websocket gateway, похужую на graphql notifications? Нужно отправлять ивенты из rest api контроллеров, которые будут обрабатываться и отправляться через вебсокеты конкретному пользователю или группе. В gql это реализовано через абстракцию pubsub с async iterator. Я сейчас вижу вариант использовать redis/rabbitmq/EventEmitter и при подключении вебсокета сабскрайбиться на ивенты. Есть ли готовые решения для таких требований, чтобы не придумывать велосипед? Или какие-то статьи/видео?
- Любая шина + rxjs

Main message:
через ноде евент еммитер тоже можно, без ркс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через ноде евент еммитер тоже можно, без ркс

--

## My telegram message #153905
**Time:** 11.04.2022 22:58:49 UTC+05:00
**Link:** https://t.me/nest_ru/153905

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Транзакций точно нигде нет?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Транзакций точно нигде нет?

--

## My telegram message #153907
**Time:** 11.04.2022 22:59:05 UTC+05:00
**Link:** https://t.me/nest_ru/153907

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если вы инжектите сами через токен то должны руками создать провайдера через useFactory или useClass
- Привет, не подскажете как использовать один конфиг файл в монорепе, не хочется каждый файл тащить в каждый проект отдельно
- Транзакций точно нигде нет?
- есть

Main message:
Убери

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Убери

--

## My telegram message #153909
**Time:** 11.04.2022 23:00:11 UTC+05:00
**Link:** https://t.me/nest_ru/153909

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Убери

Main message:
Калькуляции и логики для которых юзал транзакции замени на Кафку

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Калькуляции и логики для которых юзал транзакции замени на Кафку

--

## My telegram message #153913
**Time:** 11.04.2022 23:01:12 UTC+05:00
**Link:** https://t.me/nest_ru/153913

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- cслегка не понимаю что вы подразумеваете под токеным, и как это делать НЕ самому ? Сейчас создаю модуль регистрации и по логику которую я хочу сделать, он не должен взаимодействовать с БД, только с UsersService
- Калькуляции и логики для которых юзал транзакции замени на Кафку
- если не самому то просто в провайдеры модуля передайте UserService  https://docs.nestjs.com/fundamentals/custom-providers
- так а гонки запросов?

Main message:
Отложенный ответ там будет в этих местах по веб сокету

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Отложенный ответ там будет в этих местах по веб сокету

--

## My telegram message #153915
**Time:** 11.04.2022 23:04:27 UTC+05:00
**Link:** https://t.me/nest_ru/153915

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Калькуляции и логики для которых юзал транзакции замени на Кафку

Main message:
Ну или сделай мастер Нодувую сущность и юзай редис/натс/рабит мс, стейт мастер ноды храни в редис например

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну или сделай мастер Нодувую сущность и юзай редис/натс/рабит мс, стейт мастер ноды храни в редис например

--

## My telegram message #153921
**Time:** 11.04.2022 23:12:43 UTC+05:00
**Link:** https://t.me/nest_ru/153921

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Отложенный ответ там будет в этих местах по веб сокету
- либо так `{ provide: ‘USER_SERVICE, useClass: UserService, },`
- Ну или сделай мастер Нодувую сущность и юзай редис/натс/рабит мс, стейт мастер ноды храни в редис например
- так блин

Main message:
Иначе никак сорян братан

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Иначе никак сорян братан

--

## My telegram message #153924
**Time:** 11.04.2022 23:14:24 UTC+05:00
**Link:** https://t.me/nest_ru/153924

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Иначе никак сорян братан

Main message:
Есть вариант ещё управлять уровнями лока транзакций и юзать два коннекшена к базе одно для реал онли другое для врайт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть вариант ещё управлять уровнями лока транзакций и юзать два коннекшена к базе одно для реал онли другое для врайт

--

## My telegram message #153929
**Time:** 11.04.2022 23:17:19 UTC+05:00
**Link:** https://t.me/nest_ru/153929

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Попробовал этим методом, тогда происходит ошибка что
- а репозиторий тоже в провайдеры добавили?
- Есть вариант ещё управлять уровнями лока транзакций и юзать два коннекшена к базе одно для реал онли другое для врайт
- как я понял да

Main message:
Транзакции хороши в рамках организации банк бэк офис типа, где больше 1000 людей не сидит долбящих один и тот же роутер и таблицу, и то это прям сверх овер число

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Транзакции хороши в рамках организации банк бэк офис типа, где больше 1000 людей не сидит долбящих один и тот же роутер и таблицу, и то это прям сверх овер число

--

## My telegram message #153932
**Time:** 11.04.2022 23:20:41 UTC+05:00
**Link:** https://t.me/nest_ru/153932

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Есть вариант ещё управлять уровнями лока транзакций и юзать два коннекшена к базе одно для реал онли другое для врайт
- как я понял да
- Транзакции хороши в рамках организации банк бэк офис типа, где больше 1000 людей не сидит долбящих один и тот же роутер и таблицу, и то это прям сверх овер число
- я новичок конечно. Но я думаю нужно в импорты authModule добавить: TypeOrmModule.forFeature([UserEntity])

Main message:
20живых всё ок, 3робата - конекшенов не осталось и тоже тайп орм кстати с своим внутренним пуллом поверх пула дата базы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

20живых всё ок, 3робата - конекшенов не осталось и тоже тайп орм кстати с своим внутренним пуллом поверх пула дата базы

--

## My telegram message #153985
**Time:** 12.04.2022 10:49:50 UTC+05:00
**Link:** https://t.me/nest_ru/153985

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
На предыдущей работе чет похожее было и дома пилю петы и как то вышло чет замутить такое, прям доки такой не находил чтобы всё там было описано

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На предыдущей работе чет похожее было и дома пилю петы и как то вышло чет замутить такое, прям доки такой не находил чтобы всё там было описано

--

## My telegram message #153988
**Time:** 12.04.2022 10:53:07 UTC+05:00
**Link:** https://t.me/nest_ru/153988

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- насколько я помню, для  mongoose всё верно, он вызовет функцию в момент создания
- Коллеги, добрый день. У меня есть сущность категории  CategoryEntity: { children: CategiryEntity[] } И вложимость может быть бесконечной, то есть одни категории вложены в другие, а в них ещё. Далее делаю такой запрос:  const categories = await this.categoryRepository .createQueryBuilder('category') .leftJoinAndSelect('category.children', 'children') .getMany(); Но мне это даст только родителей и их первый уровень вложенности. А задача получить родителей, их вложенности и вложенности их детей и так далее. Есть в typeorm подобная реализация? Или тупо сделать .leftJoinAndSelect('category.children', 'children') 10 раз подряд и получу тогда все вложенности
- На предыдущей работе чет похожее было и дома пилю петы и как то вышло чет замутить такое, прям доки такой не находил чтобы всё там было описано
- @KaufmanEndy как там typeorm? Развивается? А то недавно видео релиз был у них

Main message:
Не знаю) я в призме)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не знаю) я в призме)

--

## My telegram message #154094
**Time:** 12.04.2022 18:43:16 UTC+05:00
**Link:** https://t.me/nest_ru/154094

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кто нить хелп и мне)
- Всмысле записать?
- Всем привет. Сервер на NestJS и TypeORM падает при 10 одновременных запросах. Использую транзакции
- Бро как из призмы выташить данные из связанной таблицы не теряя текущии данные ото устал описывать всю бороду

Main message:
({where:{},include:{users:true}})

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

({where:{},include:{users:true}})

--

## My telegram message #154389
**Time:** 14.04.2022 22:30:12 UTC+05:00
**Link:** https://t.me/nest_ru/154389

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо всем больше за помощь))
- возвращаемое значение из контроллера можно перехватить интерсептором, внутри кода которого вызвать другой котроллер, но лично я тебе все же посоветую пересмотреть логику приложения, скорее всего, как сказал  @mogilevtsevdmitry , внутри сервиса который вызывает контроллер, тебе нужно просто вызвать метод другого сервиса, который предварительно нужно импортировать в модуль.
- Да я понял, буду делать как вы и посоветовали )
- Продакшн в призме?

Main message:
И да и нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

И да и нет

--

## My telegram message #154491
**Time:** 15.04.2022 11:30:28 UTC+05:00
**Link:** https://t.me/nest_ru/154491

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А можно как то иначе документацию создавать, а то слишком много декораторов, код тяжело читать потом ?
- Да
- Может кто кинуть примеры реализации валидации на dto с использованием joi. Никак не могу разобраться. в документации только пайп показано как реализовать, а саму схему не нашёл
- Делаю авторизацию/регистрацию через linkedin и отправлю фронту jwt, всё работает, но вопрос теперь как проверять, что пользователь отозвал доступ к своему аккаунту или время жизни токена истекло? Токен от oauth2 живёт 60 дней, после чего пользователь должен заного авторизоваться в linkedin. Пока вижу такие варинаты: 1. При каждой валидации jwt проверять доступ к аккаунту, если его нет, то отказываем 2. Делать тоже самое что и в п1, но только при рефреше jwt токена, что бы каждый раз не дёргать сторонее апи 3. Забить на проверку в linkedin, пока не понадобятся данные от него. Как обычно поступают в таких случаях?

Main message:
З

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

З

--

## My telegram message #154561
**Time:** 15.04.2022 19:49:47 UTC+05:00
**Link:** https://t.me/nest_ru/154561

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- syncronize в false поставить в проде
- https://github.com/typeorm/typeorm/blob/master/docs/migrations.md
- Спасибо!
- Монгу

Main message:
редис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

редис

--

## My telegram message #154564
**Time:** 15.04.2022 19:50:58 UTC+05:00
**Link:** https://t.me/nest_ru/154564

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо!
- Монгу
- редис
- Json файл

Main message:
ну я без шуток, персистент редис можно для небольшого взять а че бы нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я без шуток, персистент редис можно для небольшого взять а че бы нет

--

## My telegram message #154566
**Time:** 15.04.2022 19:52:07 UTC+05:00
**Link:** https://t.me/nest_ru/154566

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я с шутками, сорян)

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #154569
**Time:** 15.04.2022 21:31:28 UTC+05:00
**Link:** https://t.me/nest_ru/154569

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я без шуток, персистент редис можно для небольшого взять а че бы нет
- Я с шутками, сорян)
- )
- Ребят, нужна помощь с отправкой файла в telegram bot api. Сюда написал, т.к. мне кажется проблема с нестовским axios. Телеграм просит отправлять  form-data , мб я как-то не так ее собираю? Не понимаю, почему 400 ошибку получаю

Main message:
о спс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

о спс

--

## My telegram message #154571
**Time:** 15.04.2022 21:49:13 UTC+05:00
**Link:** https://t.me/nest_ru/154571

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )
- Ребят, нужна помощь с отправкой файла в telegram bot api. Сюда написал, т.к. мне кажется проблема с нестовским axios. Телеграм просит отправлять  form-data , мб я как-то не так ее собираю? Не понимаю, почему 400 ошибку получаю
- о спс
- привет. Никто не сталкивался с проблемами с CORS на хероку? Подозреваю что проблема из-за SSL в тайпорм конфиге. Можете скинуть пожалуйста как у вас настроено это? И в main.ts тоже если не сложно. Настройки корс имею ввиду. Спасибо

Main message:
отруби их

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

отруби их

--

## My telegram message #154577
**Time:** 15.04.2022 21:56:14 UTC+05:00
**Link:** https://t.me/nest_ru/154577

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- привет. Никто не сталкивался с проблемами с CORS на хероку? Подозреваю что проблема из-за SSL в тайпорм конфиге. Можете скинуть пожалуйста как у вас настроено это? И в main.ts тоже если не сложно. Настройки корс имею ввиду. Спасибо
- отруби их
- cors: false?
- А какая архитектура у неста? Читаю доку, похоже на ddd, но раскидано по модулям

Main message:
короче корс нужно делать на нгинкс, не на ноде,я точно не скажу как, просто не подрубай корс мидлвар вообще, так вроде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

короче корс нужно делать на нгинкс, не на ноде,я точно не скажу как, просто не подрубай корс мидлвар вообще, так вроде

--

## My telegram message #154583
**Time:** 15.04.2022 21:58:07 UTC+05:00
**Link:** https://t.me/nest_ru/154583

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- cors: false?
- А какая архитектура у неста? Читаю доку, похоже на ddd, но раскидано по модулям
- короче корс нужно делать на нгинкс, не на ноде,я точно не скажу как, просто не подрубай корс мидлвар вообще, так вроде
- А можете посоветовать почитать что-нибудь на эту тему? Ничего не нашел в гугле, почему именно в нгинкс надо делать корсы

Main message:
домен это сущность бизнеса и от нее все пляшет, не от бэка и не от базы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

домен это сущность бизнеса и от нее все пляшет, не от бэка и не от базы

--

## My telegram message #154587
**Time:** 15.04.2022 21:59:46 UTC+05:00
**Link:** https://t.me/nest_ru/154587

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- короче корс нужно делать на нгинкс, не на ноде,я точно не скажу как, просто не подрубай корс мидлвар вообще, так вроде
- А можете посоветовать почитать что-нибудь на эту тему? Ничего не нашел в гугле, почему именно в нгинкс надо делать корсы
- домен это сущность бизнеса и от нее все пляшет, не от бэка и не от базы
- Я думал, он реализовывается в коде( значит при внешних факторах и модульной архитектуре разработка может быть ддд?

Main message:
нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет

--

## My telegram message #154591
**Time:** 15.04.2022 22:03:09 UTC+05:00
**Link:** https://t.me/nest_ru/154591

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- домен это сущность бизнеса и от нее все пляшет, не от бэка и не от базы
- Я думал, он реализовывается в коде( значит при внешних факторах и модульной архитектуре разработка может быть ддд?
- нет
- Благодарю

Main message:
бизнес строит все связи и описывает сущность от и до, бизнес пишет тестовые кейсы, твое дело как разраба, просто написать код для этого

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

бизнес строит все связи и описывает сущность от и до, бизнес пишет тестовые кейсы, твое дело как разраба, просто написать код для этого

--

## My telegram message #154593
**Time:** 15.04.2022 22:09:43 UTC+05:00
**Link:** https://t.me/nest_ru/154593

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет
- Благодарю
- бизнес строит все связи и описывает сущность от и до, бизнес пишет тестовые кейсы, твое дело как разраба, просто написать код для этого
- убрал полностью, один фиг ругается

Main message:
cors:'*' не канает?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

cors:'*' не канает?

--

## My telegram message #154649
**Time:** 16.04.2022 00:55:45 UTC+05:00
**Link:** https://t.me/nest_ru/154649

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
че попало

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

че попало

--

## My telegram message #154659
**Time:** 16.04.2022 02:09:04 UTC+05:00
**Link:** https://t.me/nest_ru/154659

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- На локальный сторейжд и доп ресурсы тоже придутся растраты.

Main message:
ноу, раз в 100 дешевле

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ноу, раз в 100 дешевле

--

## My telegram message #154672
**Time:** 16.04.2022 13:08:27 UTC+05:00
**Link:** https://t.me/nest_ru/154672

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Подскажите, как деплоите проекты из разных репозиториев ? У меня проекты выглядят так - nestJs - strapi - nextJs - публичная часть - reactJs - закрытая, что-то типо админки В каждом проекте будет свой ci-cd.yml который билдит проект и пушит его в какой-нибудь реестр, например в aws. Создаётся ещё один репозиторий с одним общим docker-compose в котором будут использоваться изображения из реестра + nginx + traefik + db + redis. Когда отработает ci-cd одного проекта, он подключается к серверу и пулит новый образ. Описанное ваше выглядит как-то не очень, но другого способа не знаю и скорее всего есть какие-нибудь удобные инструменты для этого, но найти я их не смог. В идеале бы ещё предусмотреть, что каждый проект может быть на своём сервере, но тут уже не знаю как это делается.

Main message:
Меняй переменные енв в гитлаб и туда пихай ссылки на образы и потом запускай пайплайн, в репу общую ничего пушить не нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Меняй переменные енв в гитлаб и туда пихай ссылки на образы и потом запускай пайплайн, в репу общую ничего пушить не нужно

--

## My telegram message #154675
**Time:** 16.04.2022 13:28:11 UTC+05:00
**Link:** https://t.me/nest_ru/154675

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Cloudinary
- Это тебе, наверное, лучше у devops'ов поспрашивать
- Меняй переменные енв в гитлаб и туда пихай ссылки на образы и потом запускай пайплайн, в репу общую ничего пушить не нужно
- В общей репе не будет кода проектов, возможно я не правильно описал :) по сути в этой репе будут скрипты и настройки только для деплоя. Описанный пайплайн будет в какой-то общей репе или в каждом проекте ?

Main message:
ты пытаешся сделать гитопс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты пытаешся сделать гитопс

--

## My telegram message #154753
**Time:** 16.04.2022 23:13:50 UTC+05:00
**Link:** https://t.me/nest_ru/154753

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Нормально совмещать сокеты и rest (controller) в одном модуле?

Main message:
UsersEventsModule UsersModule

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

UsersEventsModule UsersModule

--

## My telegram message #154764
**Time:** 16.04.2022 23:24:09 UTC+05:00
**Link:** https://t.me/nest_ru/154764

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
ChatModule ChatEventsModule

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ChatModule ChatEventsModule

--

## My telegram message #154766
**Time:** 16.04.2022 23:25:48 UTC+05:00
**Link:** https://t.me/nest_ru/154766

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну так и называть
- Ну в все вместе в несте при генерации ето ресурс но не встречал чтоб так называли
- ChatModule ChatEventsModule
- А почему в одном нельзя вроде все нормально работает

Main message:
Декомпозиция

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Декомпозиция

--

## My telegram message #154799
**Time:** 17.04.2022 13:44:33 UTC+05:00
**Link:** https://t.me/nest_ru/154799

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вместо Request передать свой интерфейс же можно
- const a = GetComponent<Request>() as MyRequest
- Создать файл request.d.ts и там расширить стандартный реквест затем включить его в тсконфиг
- ребят меня мучает один вопрос в нестжс. это то что я описываю в entiry описание и в dto валидацию. и это похоже на двойную работу. может есть какой-то более продвинутый вариант? в будущем планирую использовать уже Joi

Main message:
в ентити ты описываешь не валидацию а свойства полей в базе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в ентити ты описываешь не валидацию а свойства полей в базе

--

## My telegram message #154803
**Time:** 17.04.2022 14:41:57 UTC+05:00
**Link:** https://t.me/nest_ru/154803

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Создать файл request.d.ts и там расширить стандартный реквест затем включить его в тсконфиг
- ребят меня мучает один вопрос в нестжс. это то что я описываю в entiry описание и в dto валидацию. и это похоже на двойную работу. может есть какой-то более продвинутый вариант? в будущем планирую использовать уже Joi
- в ентити ты описываешь не валидацию а свойства полей в базе
- cors разве не решает эту проблему? или это чёт другое и я путаю?

Main message:
csrf это когда форм шлет данные имея некий токен, который ранее получила, и после отправки этот токен уже другой, этот механизм юзали для mvc, сейчас я не знаю юзает ли кто то такое, есть токены авторизации и рефреши же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

csrf это когда форм шлет данные имея некий токен, который ранее получила, и после отправки этот токен уже другой, этот механизм юзали для mvc, сейчас я не знаю юзает ли кто то такое, есть токены авторизации и рефреши же

--

## My telegram message #154806
**Time:** 17.04.2022 14:54:34 UTC+05:00
**Link:** https://t.me/nest_ru/154806

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в ентити ты описываешь не валидацию а свойства полей в базе
- cors разве не решает эту проблему? или это чёт другое и я путаю?
- csrf это когда форм шлет данные имея некий токен, который ранее получила, и после отправки этот токен уже другой, этот механизм юзали для mvc, сейчас я не знаю юзает ли кто то такое, есть токены авторизации и рефреши же
- кто как юзает конфигурацию? как юзаете в тестах? мокаете или создаёте энв файл для этого?

Main message:
в каких тестах, е2е, юнит, интеграционных?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в каких тестах, е2е, юнит, интеграционных?

--

## My telegram message #154815
**Time:** 17.04.2022 15:41:29 UTC+05:00
**Link:** https://t.me/nest_ru/154815

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кто как юзает конфигурацию? как юзаете в тестах? мокаете или создаёте энв файл для этого?
- в каких тестах, е2е, юнит, интеграционных?
- node:internal/errors:464 ErrorCaptureStackTrace(err); ^ RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
- е2е

Main message:
через докер композ поднимаю бэк внунтри сиай и птом гоню на нем тесты через аксиос е2е

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через докер композ поднимаю бэк внунтри сиай и птом гоню на нем тесты через аксиос е2е

--

## My telegram message #154818
**Time:** 17.04.2022 15:44:50 UTC+05:00
**Link:** https://t.me/nest_ru/154818

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- node:internal/errors:464 ErrorCaptureStackTrace(err); ^ RangeError [ERR_HTTP_INVALID_STATUS_CODE]: Invalid status code: undefined
- е2е
- через докер композ поднимаю бэк внунтри сиай и птом гоню на нем тесты через аксиос е2е
- я хотел через globalstart врубать а через globalteardown вырубать

Main message:
я примерно так делаю - npm run docker:up - npm run test:e2e - npm run docker:down

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я примерно так делаю - npm run docker:up - npm run test:e2e - npm run docker:down

--

## My telegram message #154820
**Time:** 17.04.2022 15:45:28 UTC+05:00
**Link:** https://t.me/nest_ru/154820

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- через докер композ поднимаю бэк внунтри сиай и птом гоню на нем тесты через аксиос е2е
- я хотел через globalstart врубать а через globalteardown вырубать
- я примерно так делаю - npm run docker:up - npm run test:e2e - npm run docker:down
- ну мне там не только докер нужен а еще редис

Main message:
там докер композ поднимается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там докер композ поднимается

--

## My telegram message #154888
**Time:** 17.04.2022 17:26:52 UTC+05:00
**Link:** https://t.me/nest_ru/154888

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #154896
**Time:** 17.04.2022 17:47:55 UTC+05:00
**Link:** https://t.me/nest_ru/154896

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет. Делаю чат на сокетах, и мне нужно хранить пользователей, которые онлайн. В моей голове это звучит так: 1. Есть класс Singleton, в котором хранится состояние 2. В корневом шлюзе я импортирую класс, и при авторизации пользователя я сохраняю его в состояние 3. В любом другом шлюзе с каким-либо неймспейсом я имортирую тот же класс, и достаю состояние пользователя, и тем самым узнаю, онлайн он или нет. Сейчас проблема заключается в том, что на шаге 3, когда пользователь зашёл, я сохранил его в класс в корневом шлюзе, в другом шлюзе этот класс содержит в себе пустое состояние. Как я понял, при импорте этого класса в другом шлюзе создался новый инстанс этого класса, а не вернулся тот, который был в корневом. Подскажите, пожалуйста, что я делаю не так. 1 Скриншот - класс с состоянием 2 Скриншот - сохраняю в главном шлюзе юзера в состоянии 3 Скриншот - получаю пустое состояние Подскажите, пожалуйста, в чём может быть проблема?
- Попробуй файлом отправить
- зипом?
- /trust

Main message:
это так не работает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это так не работает

--

## My telegram message #154906
**Time:** 17.04.2022 17:59:30 UTC+05:00
**Link:** https://t.me/nest_ru/154906

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а как мне сделать на всё приложение?

Main message:
Никак

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Никак

--

## My telegram message #154910
**Time:** 17.04.2022 18:05:39 UTC+05:00
**Link:** https://t.me/nest_ru/154910

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а как мне сделать на всё приложение?
- может потому что неудачно обновил нестжс пакеты. ща сношу версии
- Никак
- А хранить стейт юзеров онлайн не получится?

Main message:
получится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

получится

--

## My telegram message #154915
**Time:** 17.04.2022 18:16:40 UTC+05:00
**Link:** https://t.me/nest_ru/154915

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Никак
- А хранить стейт юзеров онлайн не получится?
- получится
- не совсем понимаю. Мне кажется ты говоришь о другом, о токене. Или просто я не вкуриваю..

Main message:
да так и должно быть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да так и должно быть

--

## My telegram message #154918
**Time:** 17.04.2022 18:17:18 UTC+05:00
**Link:** https://t.me/nest_ru/154918

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- получится
- не совсем понимаю. Мне кажется ты говоришь о другом, о токене. Или просто я не вкуриваю..
- да так и должно быть
- А почему? Разве это не синглтон?

Main message:
синглтон в пределах приложения

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

синглтон в пределах приложения

--

## My telegram message #154922
**Time:** 17.04.2022 18:22:59 UTC+05:00
**Link:** https://t.me/nest_ru/154922

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да так и должно быть
- А почему? Разве это не синглтон?
- синглтон в пределах приложения
- да это понятно, но мне нужно, чтобы состояние было общим между гейтвеями. Первый гейтвей отрабатывает, когда пользователь зашёл в сеть, добавил юзера в состояние, а потом, на втором, когда юзер зашёл в список своих друзей нужно достать всех юзеров онлайн

Main message:
Тебе нужно 100 раз одно и тоже чтобы ты понял?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Тебе нужно 100 раз одно и тоже чтобы ты понял?

--

## My telegram message #154925
**Time:** 17.04.2022 18:24:55 UTC+05:00
**Link:** https://t.me/nest_ru/154925

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- синглтон в пределах приложения
- да это понятно, но мне нужно, чтобы состояние было общим между гейтвеями. Первый гейтвей отрабатывает, когда пользователь зашёл в сеть, добавил юзера в состояние, а потом, на втором, когда юзер зашёл в список своих друзей нужно достать всех юзеров онлайн
- Тебе нужно 100 раз одно и тоже чтобы ты понял?
- я понял, да, спасибо

Main message:
Используй евент еммитер или даже лучше rx subject

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Используй евент еммитер или даже лучше rx subject

--

## My telegram message #154994
**Time:** 18.04.2022 10:21:32 UTC+05:00
**Link:** https://t.me/nest_ru/154994

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Кода больше писать надо чем просто на Експрес, раза в 3

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Кода больше писать надо чем просто на Експрес, раза в 3

--

## My telegram message #154996
**Time:** 18.04.2022 10:22:13 UTC+05:00
**Link:** https://t.me/nest_ru/154996

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- парни, хочу в следующем проекте попробовать писать на нест
- Никак, только языком сверху которого фрейм написан
- Кода больше писать надо чем просто на Експрес, раза в 3
- а что я получу от нест взамен?

Main message:
Надёжность и чсв

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Надёжность и чсв

--

## My telegram message #154998
**Time:** 18.04.2022 10:23:11 UTC+05:00
**Link:** https://t.me/nest_ru/154998

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Кода больше писать надо чем просто на Експрес, раза в 3
- а что я получу от нест взамен?
- Надёжность и чсв
- а что за надëжность, ты имеешь в виду ts? На express он тоже есть

Main message:
Архитектура

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Архитектура

--

## My telegram message #155001
**Time:** 18.04.2022 10:26:33 UTC+05:00
**Link:** https://t.me/nest_ru/155001

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Надёжность и чсв
- а что за надëжность, ты имеешь в виду ts? На express он тоже есть
- Архитектура
- а что по поводу производительности, она идентична express?

Main message:
Нести это груба говоря горы функций над Експрес функциями

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нести это груба говоря горы функций над Експрес функциями

--

## My telegram message #155004
**Time:** 18.04.2022 10:29:37 UTC+05:00
**Link:** https://t.me/nest_ru/155004

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Архитектура
- а что по поводу производительности, она идентична express?
- Нести это груба говоря горы функций над Експрес функциями
- ну как я понял нест это просто визуально изменëнный express, который просто следит за архитектурой

Main message:
Почти, можно заменить Експрес на фастифай например

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Почти, можно заменить Експрес на фастифай например

--

## My telegram message #155007
**Time:** 18.04.2022 10:30:59 UTC+05:00
**Link:** https://t.me/nest_ru/155007

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нести это груба говоря горы функций над Експрес функциями
- ну как я понял нест это просто визуально изменëнный express, который просто следит за архитектурой
- Почти, можно заменить Експрес на фастифай например
- кстати да, тоже интересовал этот вопрос, можно ли движок без проблем заменить

Main message:
Официально тока два ща экспресс и фастифай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Официально тока два ща экспресс и фастифай

--

## My telegram message #155009
**Time:** 18.04.2022 10:31:35 UTC+05:00
**Link:** https://t.me/nest_ru/155009

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Почти, можно заменить Експрес на фастифай например
- кстати да, тоже интересовал этот вопрос, можно ли движок без проблем заменить
- Официально тока два ща экспресс и фастифай
- вроде где то что то слышал что можно, но не был уверен

Main message:
По графу аполо движ, и как будто тоже попытки идут по другому некому новому быстрому

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

По графу аполо движ, и как будто тоже попытки идут по другому некому новому быстрому

--

## My telegram message #155011
**Time:** 18.04.2022 10:32:20 UTC+05:00
**Link:** https://t.me/nest_ru/155011

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Официально тока два ща экспресс и фастифай
- вроде где то что то слышал что можно, но не был уверен
- По графу аполо движ, и как будто тоже попытки идут по другому некому новому быстрому
- а если я захочу приложение перенести на фастифай, мне много нужно будет переписывать? эти апи от nest никак не меняется в зависимости от движка?

Main message:
Да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да

--

## My telegram message #155013
**Time:** 18.04.2022 10:32:48 UTC+05:00
**Link:** https://t.me/nest_ru/155013

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- По графу аполо движ, и как будто тоже попытки идут по другому некому новому быстрому
- а если я захочу приложение перенести на фастифай, мне много нужно будет переписывать? эти апи от nest никак не меняется в зависимости от движка?
- Да
- что да?)

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #155016
**Time:** 18.04.2022 10:34:12 UTC+05:00
**Link:** https://t.me/nest_ru/155016

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- что да?)
- )
- "много переписывать" или "никак не меняется"?

Main message:
Есть специфичные штуки фастифая он всетки урезанный поэтому и быстрый, но 80% кода скорее всего будет тож самое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Есть специфичные штуки фастифая он всетки урезанный поэтому и быстрый, но 80% кода скорее всего будет тож самое

--

## My telegram message #155018
**Time:** 18.04.2022 10:35:05 UTC+05:00
**Link:** https://t.me/nest_ru/155018

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )
- "много переписывать" или "никак не меняется"?
- Есть специфичные штуки фастифая он всетки урезанный поэтому и быстрый, но 80% кода скорее всего будет тож самое
- прикольно. понял, спасибо

Main message:
Я ещё не юзал сам фастифай, я скейлю просто нод приложение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я ещё не юзал сам фастифай, я скейлю просто нод приложение

--

## My telegram message #155024
**Time:** 18.04.2022 10:41:38 UTC+05:00
**Link:** https://t.me/nest_ru/155024

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Есть специфичные штуки фастифая он всетки урезанный поэтому и быстрый, но 80% кода скорее всего будет тож самое
- прикольно. понял, спасибо
- Я ещё не юзал сам фастифай, я скейлю просто нод приложение
- я далек от этой темы) это уже не апи а сервера какие то

Main message:
Ну как тока в прод выкатишь и зайдёт много людей будешь не очень далеко, так как бизнес скажет: мы вбухали тонны денег на рекламу и пригнали трафик а бэк не работает, ты чего офигел?)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну как тока в прод выкатишь и зайдёт много людей будешь не очень далеко, так как бизнес скажет: мы вбухали тонны денег на рекламу и пригнали трафик а бэк не работает, ты чего офигел?)

--

## My telegram message #155027
**Time:** 18.04.2022 10:43:26 UTC+05:00
**Link:** https://t.me/nest_ru/155027

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я ещё не юзал сам фастифай, я скейлю просто нод приложение
- я далек от этой темы) это уже не апи а сервера какие то
- Ну как тока в прод выкатишь и зайдёт много людей будешь не очень далеко, так как бизнес скажет: мы вбухали тонны денег на рекламу и пригнали трафик а бэк не работает, ты чего офигел?)
- ну если в приложение не на вебсокетах и грамотно написано, то упереться в железо очень сложно, мне кажется

Main message:
Не сложно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не сложно

--

## My telegram message #155034
**Time:** 18.04.2022 10:45:43 UTC+05:00
**Link:** https://t.me/nest_ru/155034

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну как тока в прод выкатишь и зайдёт много людей будешь не очень далеко, так как бизнес скажет: мы вбухали тонны денег на рекламу и пригнали трафик а бэк не работает, ты чего офигел?)
- ну если в приложение не на вебсокетах и грамотно написано, то упереться в железо очень сложно, мне кажется
- Не сложно
- я 3 года назад когда только начинал кодить и ещё не знал что такое базы данных, хранил 10к+ юзеров в обычном json файле. и все ок было😂😂

Main message:
Типа редиса у тебя было

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Типа редиса у тебя было

--

## My telegram message #155037
**Time:** 18.04.2022 10:47:16 UTC+05:00
**Link:** https://t.me/nest_ru/155037

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не сложно
- я 3 года назад когда только начинал кодить и ещё не знал что такое базы данных, хранил 10к+ юзеров в обычном json файле. и все ок было😂😂
- Типа редиса у тебя было
- я не знаю че у меня там было, но это был бот в вк, который по счастливым обстоятельствам обрел нихуевый такой поток пользователей

Main message:
Всё через это проходили) я в 2007 так делал тоже, в ини файлах хранил данные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Всё через это проходили) я в 2007 так делал тоже, в ини файлах хранил данные

--

## My telegram message #155042
**Time:** 18.04.2022 10:54:51 UTC+05:00
**Link:** https://t.me/nest_ru/155042

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я не знаю че у меня там было, но это был бот в вк, который по счастливым обстоятельствам обрел нихуевый такой поток пользователей
- Всё через это проходили) я в 2007 так делал тоже, в ини файлах хранил данные
- и ни разу ниче не падало, что очень странно. хотя ща смотрю на этот код, и там такой пиздец
- а вот как ты думаешь, если я захочу сделать приложение с помощью webRTC, анонимный голосовой чат, где в 1 комнате будут по 2 человека, и предположительно в приложение одновременно будут сидеть 3к человек, справится ли с этой задачей nest с  socket.io ?

Main message:
Незнаю, надо изучать, готовые же есть решения

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Незнаю, надо изучать, готовые же есть решения

--

