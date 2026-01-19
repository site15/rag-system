## My telegram message #157501
**Time:** 03.05.2022 23:20:35 UTC+05:00
**Link:** https://t.me/nest_ru/157501

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- У кого нибудь есть опыт валидирования данных пакетом class-validator (вне nest приложения), в обычном npm пакете на typescript.?

Main message:
validate().then И все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

validate().then И все

--

## My telegram message #157503
**Time:** 03.05.2022 23:22:40 UTC+05:00
**Link:** https://t.me/nest_ru/157503

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не, миграции тоже через typeorm
- У кого нибудь есть опыт валидирования данных пакетом class-validator (вне nest приложения), в обычном npm пакете на typescript.?
- validate().then И все
- В nest мы можем описать глобально pipe, использовать dto, а что делать в npm пакете?

Main message:
тоже самое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тоже самое

--

## My telegram message #157510
**Time:** 03.05.2022 23:25:23 UTC+05:00
**Link:** https://t.me/nest_ru/157510

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- validate().then И все
- В nest мы можем описать глобально pipe, использовать dto, а что делать в npm пакете?
- тоже самое
- А зачем {...err} ?)

Main message:
пример просто)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пример просто)

--

## My telegram message #157561
**Time:** 04.05.2022 00:25:15 UTC+05:00
**Link:** https://t.me/nest_ru/157561

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #157595
**Time:** 04.05.2022 00:50:26 UTC+05:00
**Link:** https://t.me/nest_ru/157595

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я хочу чтобы БД. мне это отдало
- а почему не .length метод на массиве?
- хочу чтобы БД мне отдавало такое, т.к если условно к постам отдавать сразу и комментарии. и лайки будет слишком большая нагрузка
- Декораторы для этого нужны какие-то? Флаги конфигурации ТС?

Main message:
у меня в последнее время вот такой тсконфиг  { "compileOnSave": false, "compilerOptions": { "rootDir": ".", "sourceMap": true, "declaration": false, "moduleResolution": "node", "emitDecoratorMetadata": true, "experimentalDecorators": true, "importHelpers": true, "target": "es2015", "module": "esnext", "lib": ["es2017", "dom"], "skipLibCheck": true, "skipDefaultLibCheck": true, "baseUrl": ".", "allowSyntheticDefaultImports": true, "strictNullChecks": true, "noImplicitOverride": true, "strictPropertyInitialization": true, "noImplicitReturns": true, "noFallthroughCasesInSwitch": true, "esModuleInterop": true, "noImplicitAny": false }, "exclude": ["node_modules", "tmp"] }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня в последнее время вот такой тсконфиг  { "compileOnSave": false, "compilerOptions": { "rootDir": ".", "sourceMap": true, "declaration": false, "moduleResolution": "node", "emitDecoratorMetadata": true, "experimentalDecorators": true, "importHelpers": true, "target": "es2015", "module": "esnext", "lib": ["es2017", "dom"], "skipLibCheck": true, "skipDefaultLibCheck": true, "baseUrl": ".", "allowSyntheticDefaultImports": true, "strictNullChecks": true, "noImplicitOverride": true, "strictPropertyInitialization": true, "noImplicitReturns": true, "noFallthroughCasesInSwitch": true, "esModuleInterop": true, "noImplicitAny": false }, "exclude": ["node_modules", "tmp"] }

--

## My telegram message #157597
**Time:** 04.05.2022 00:52:54 UTC+05:00
**Link:** https://t.me/nest_ru/157597

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хочу чтобы БД мне отдавало такое, т.к если условно к постам отдавать сразу и комментарии. и лайки будет слишком большая нагрузка
- Декораторы для этого нужны какие-то? Флаги конфигурации ТС?
- у меня в последнее время вот такой тсконфиг  { "compileOnSave": false, "compilerOptions": { "rootDir": ".", "sourceMap": true, "declaration": false, "moduleResolution": "node", "emitDecoratorMetadata": true, "experimentalDecorators": true, "importHelpers": true, "target": "es2015", "module": "esnext", "lib": ["es2017", "dom"], "skipLibCheck": true, "skipDefaultLibCheck": true, "baseUrl": ".", "allowSyntheticDefaultImports": true, "strictNullChecks": true, "noImplicitOverride": true, "strictPropertyInitialization": true, "noImplicitReturns": true, "noFallthroughCasesInSwitch": true, "esModuleInterop": true, "noImplicitAny": false }, "exclude": ["node_modules", "tmp"] }
- Там человек спрашивал о класс валидаторе вне Неста

Main message:
ну такой вот конфиг и в main.ts import 'reflect-metadata';

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну такой вот конфиг и в main.ts import 'reflect-metadata';

--

## My telegram message #157610
**Time:** 04.05.2022 01:03:38 UTC+05:00
**Link:** https://t.me/nest_ru/157610

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
я дефолт юзаю от nx  { "root": true, "ignorePatterns": ["**/*"], "plugins": ["@nrwl/nx"], "overrides": [ { "files": ["*.ts", "*.tsx", "*.js", "*.jsx"], "rules": { "@nrwl/nx/enforce-module-boundaries": [ "error", { "enforceBuildableLibDependency": true, "allow": [], "depConstraints": [ { "sourceTag": "*", "onlyDependOnLibsWithTags": ["*"] } ] } ] } }, { "files": ["*.ts", "*.tsx"], "extends": ["plugin:@nrwl/nx/typescript"], "rules": {} }, { "files": ["*.js", "*.jsx"], "extends": ["plugin:@nrwl/nx/javascript"], "rules": {} } ] }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я дефолт юзаю от nx  { "root": true, "ignorePatterns": ["**/*"], "plugins": ["@nrwl/nx"], "overrides": [ { "files": ["*.ts", "*.tsx", "*.js", "*.jsx"], "rules": { "@nrwl/nx/enforce-module-boundaries": [ "error", { "enforceBuildableLibDependency": true, "allow": [], "depConstraints": [ { "sourceTag": "*", "onlyDependOnLibsWithTags": ["*"] } ] } ] } }, { "files": ["*.ts", "*.tsx"], "extends": ["plugin:@nrwl/nx/typescript"], "rules": {} }, { "files": ["*.js", "*.jsx"], "extends": ["plugin:@nrwl/nx/javascript"], "rules": {} } ] }

--

## My telegram message #157613
**Time:** 04.05.2022 01:04:05 UTC+05:00
**Link:** https://t.me/nest_ru/157613

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Давай шото напишем после твоего пета?
- пробовал как и сказанно здесь, не помогает, не находит  https://stackoverflow.com/questions/37817808/counting-associated-entries-with-sequelize
- я дефолт юзаю от nx  { "root": true, "ignorePatterns": ["**/*"], "plugins": ["@nrwl/nx"], "overrides": [ { "files": ["*.ts", "*.tsx", "*.js", "*.jsx"], "rules": { "@nrwl/nx/enforce-module-boundaries": [ "error", { "enforceBuildableLibDependency": true, "allow": [], "depConstraints": [ { "sourceTag": "*", "onlyDependOnLibsWithTags": ["*"] } ] } ] } }, { "files": ["*.ts", "*.tsx"], "extends": ["plugin:@nrwl/nx/typescript"], "rules": {} }, { "files": ["*.js", "*.jsx"], "extends": ["plugin:@nrwl/nx/javascript"], "rules": {} } ] }
- {  "parser": "@typescript-eslint/parser",  "parserOptions": {  "project": "tsconfig.json",  "sourceType": "module"  },  "plugins": ["import", "@typescript-eslint/eslint-plugin", "typescript-sort-keys", "sort-destructure-keys"],  "extends": [  "plugin:@typescript-eslint/recommended",  "plugin:prettier/recommended",  "plugin:typescript-sort-keys/recommended"  ],  "root": true,  "env": {  "node": true,  "jest": true  },  "ignorePatterns": [".eslintrc.js"],  "rules": {  "@typescript-eslint/explicit-function-return-type": "off",  "@typescript-eslint/explicit-member-accessibility": [  "warn",  {   "overrides": {  "constructors": "no-public",  "methods": "explicit",  "properties": "off",  "parameterProperties": "explicit"  }   }  ],  "@typescript-eslint/explicit-module-boundary-types": "off",  "@typescript-eslint/interface-name-prefix": "off",  "@typescript-eslint/member-ordering": [  "warn",  {  "default": {  "memberTypes": [  "private-static-field",  "public-static-field",  "private-instance-field",  "public-instance-field",  "private-constructor",  "public-constructor",  "private-instance-method",  "protected-instance-method",  "public-instance-method"  ],  "order": "alphabetically"  }  }  ],  "@typescript-eslint/no-empty-interface": "off",  "@typescript-eslint/no-explicit-any": "off",  "arrow-parens": ["error", "always"],  "sort-destructure-keys/sort-destructure-keys": 2,  "sort-keys": "warn",  "typescript-sort-keys/interface": "warn",  "typescript-sort-keys/string-enum": "warn",  "import/order": [  "warn",  {  "alphabetize": {  "caseInsensitive": true,  "order": "asc"  },  "groups": [["builtin", "external"], "internal", "parent", "sibling", "index"],  "newlines-between": "always",  "pathGroups": [{ "group": "internal", "pattern": "@/**" }],  "pathGroupsExcludedImportTypes": []  }  ],  "import/prefer-default-export": "off",  "max-classes-per-file": ["error", 1],  "max-len": ["error", 130],  "no-console": "warn",  "no-duplicate-imports": "warn",  "no-empty-pattern": "warn",  "no-return-await": "error",  "no-trailing-spaces": "error",  "object-shorthand": "error",  "lines-between-class-members": [  "error",  "always",  { "exceptAfterSingleLine": true }  ],  "padding-line-between-statements": [  "error",  { "blankLine": "always", "next": "*", "prev": ["const", "let"] },  { "blankLine": "always", "next": "class", "prev": "*" },  { "blankLine": "always", "next": "export", "prev": "*" },  { "blankLine": "any", "next": "export", "prev": "export" },  { "blankLine": "always", "next": "for", "prev": "*" },  { "blankLine": "always", "next": "function", "prev": "*" },  { "blankLine": "always", "next": "if", "prev": "*" },  { "blankLine": "always", "next": "*", "prev": "if" },  { "blankLine": "always", "next": "return", "prev": "*" },  { "blankLine": "always", "next": "switch", "prev": "*" },  { "blankLine": "always", "next": "try", "prev": "*" },  { "blankLine": "always", "next": "while", "prev": "*" }, { "blankLine": "any", "next": ["const", "let"], "prev": ["const", "let"] } ] }, "settings": { "import/resolver": { "typescript": {} } } }

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #157617
**Time:** 04.05.2022 01:05:56 UTC+05:00
**Link:** https://t.me/nest_ru/157617

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
на прошлой работе тоже так тюнили, а ща чета решил вообще в эту штуку не лезть просто юзать ченить дефолт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на прошлой работе тоже так тюнили, а ща чета решил вообще в эту штуку не лезть просто юзать ченить дефолт

--

## My telegram message #157619
**Time:** 04.05.2022 01:06:39 UTC+05:00
**Link:** https://t.me/nest_ru/157619

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy работаел с sequilze, не знаешь как исправить ?

Main message:
я его юзал в жс до появления тс еще, не подскажу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я его юзал в жс до появления тс еще, не подскажу)

--

## My telegram message #157643
**Time:** 04.05.2022 01:33:06 UTC+05:00
**Link:** https://t.me/nest_ru/157643

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а там git-diff есть встроенный для cd?

Main message:
там аффектед запуск заданий и кэширование через похожую штуку сделано

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там аффектед запуск заданий и кэширование через похожую штуку сделано

--

## My telegram message #157646
**Time:** 04.05.2022 01:34:22 UTC+05:00
**Link:** https://t.me/nest_ru/157646

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а там git-diff есть встроенный для cd?
- Може и есть я его не тестил еще
- там аффектед запуск заданий и кэширование через похожую штуку сделано
- То есть, если цепляет импорт, то он трогает микросервис?

Main message:
да, если не циплять то нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да, если не циплять то нет

--

## My telegram message #157649
**Time:** 04.05.2022 01:34:37 UTC+05:00
**Link:** https://t.me/nest_ru/157649

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там аффектед запуск заданий и кэширование через похожую штуку сделано
- То есть, если цепляет импорт, то он трогает микросервис?
- да, если не циплять то нет
- Ну прикольно, в лерне эта херь сделана по дефолту

Main message:
само

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

само

--

## My telegram message #157651
**Time:** 04.05.2022 01:34:57 UTC+05:00
**Link:** https://t.me/nest_ru/157651

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да, если не циплять то нет
- Ну прикольно, в лерне эта херь сделана по дефолту
- само
- Крутячок

Main message:
в лерне руками вроде нужно было описывать, там не было поиска по аст

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в лерне руками вроде нужно было описывать, там не было поиска по аст

--

## My telegram message #157653
**Time:** 04.05.2022 01:35:26 UTC+05:00
**Link:** https://t.me/nest_ru/157653

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- само
- Крутячок
- в лерне руками вроде нужно было описывать, там не было поиска по аст
- Да, там надо sh скриптик писать)

Main message:
ну в nx это не так легко настроить) даже я коекак это настроил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну в nx это не так легко настроить) даже я коекак это настроил

--

## My telegram message #157750
**Time:** 04.05.2022 11:34:03 UTC+05:00
**Link:** https://t.me/nest_ru/157750

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вроде как при ctrl+c идёт ожидаение завершение процесса за которым следит контейнер, поэтому это и занимает некоторое время, а при указании пустого --init у тебя может остаться висеть процесс даже после завершения работы контейнера
- у меня уже нет под рукой мака на интеле, но вроде как там контейнеры быстрее останавливались. а тут прям залипает, раздражает. что касается минусов - пока не заметил, но я с этим столкнулся неделю назад только. буду смотреть
- Ну так это только рост скорости чтения/записи, никак не относится к тому, что линукс нативно докер крутит, а мак в виртуалке
- Ну это да, с этим пока ничего не поделаешь

Main message:
У меня комп 64 гига, мало чета

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня комп 64 гига, мало чета

--

## My telegram message #158133
**Time:** 04.05.2022 21:30:23 UTC+05:00
**Link:** https://t.me/nest_ru/158133

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Посещаемость больше 2000 людей и база порядка 1гб
- 2000 чел?)
- да
- Не парься, проблем не будет

Main message:
Посещаемость упадёт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Посещаемость упадёт

--

## My telegram message #158141
**Time:** 04.05.2022 21:50:31 UTC+05:00
**Link:** https://t.me/nest_ru/158141

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Посещаемость упадёт
- А как вы по феншую проверяете что пользователь может делать с записью бд чиво угодно ЕСЛИ он автор этой записи? Я так понимаю нужно прежде вешать защитника по роли на контролер это раз(то что он не гость, а пользователь). И второе это брать из токена доступа идинтификатор пользователя и сравнивать его с полем "автор_айди" в записи которую он хочет CRUD-нуть?
- Ошибка фиксанулась?
- Ни как, первый раз буду проверять

Main message:
https://t.me/nest_ru/139208

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/139208

--

## My telegram message #158153
**Time:** 04.05.2022 22:04:46 UTC+05:00
**Link:** https://t.me/nest_ru/158153

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://t.me/nest_ru/139208
- Ну я бы сделал 2 роута, один для админа, второй для юзика
- Топчик, спасибо!
- Сложно как всегда

Main message:
не) тока хранимки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не) тока хранимки

--

## My telegram message #158156
**Time:** 04.05.2022 22:06:15 UTC+05:00
**Link:** https://t.me/nest_ru/158156

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Топчик, спасибо!
- Сложно как всегда
- не) тока хранимки
- Я на днях у тебя по репе гулял)

Main message:
ну код совсем другой получается, приходится мыслить простыми вещами

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну код совсем другой получается, приходится мыслить простыми вещами

--

## My telegram message #158161
**Time:** 04.05.2022 22:06:45 UTC+05:00
**Link:** https://t.me/nest_ru/158161

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не) тока хранимки
- Я на днях у тебя по репе гулял)
- ну код совсем другой получается, приходится мыслить простыми вещами
- Я просто не могу видеть это

Main message:
где ты нашел репу с rx) уменя нет в паблике большого бэка с rx

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

где ты нашел репу с rx) уменя нет в паблике большого бэка с rx

--

## My telegram message #158170
**Time:** 04.05.2022 22:46:45 UTC+05:00
**Link:** https://t.me/nest_ru/158170

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
нет, можно использовать енам базы данных для кодов ошибок

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет, можно использовать енам базы данных для кодов ошибок

--

## My telegram message #158177
**Time:** 04.05.2022 23:06:23 UTC+05:00
**Link:** https://t.me/nest_ru/158177

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну тут скрины были
- goto на стероидах с DI и компилятором
- нет, можно использовать енам базы данных для кодов ошибок
- Я так понял нужно юзать  @EventSubscriber ? Но не очень понятно от куда там возьмется id создателя в методе  afterInsert() там же в аргументах метода будет сущность которую создали, а сам создатель где то за бортом)  fterInsert(event) { event.entity }

Main message:
тригер бд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тригер бд

--

## My telegram message #158181
**Time:** 04.05.2022 23:08:59 UTC+05:00
**Link:** https://t.me/nest_ru/158181

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет, можно использовать енам базы данных для кодов ошибок
- Я так понял нужно юзать  @EventSubscriber ? Но не очень понятно от куда там возьмется id создателя в методе  afterInsert() там же в аргументах метода будет сущность которую создали, а сам создатель где то за бортом)  fterInsert(event) { event.entity }
- тригер бд
- Ааа, я в орм полез..

Main message:
При обновлении опять передавай юзер ид но в поле апдейтов бай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

При обновлении опять передавай юзер ид но в поле апдейтов бай

--

## My telegram message #158185
**Time:** 04.05.2022 23:09:58 UTC+05:00
**Link:** https://t.me/nest_ru/158185

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тригер бд
- Ааа, я в орм полез..
- При обновлении опять передавай юзер ид но в поле апдейтов бай
- А зачем понадобиться может updateBy? Не хватает ли createBy для того что бы понять можен чел crud делать ли нет?

Main message:
Общий

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Общий

--

## My telegram message #158189
**Time:** 04.05.2022 23:11:56 UTC+05:00
**Link:** https://t.me/nest_ru/158189

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- При обновлении опять передавай юзер ид но в поле апдейтов бай
- А зачем понадобиться может updateBy? Не хватает ли createBy для того что бы понять можен чел crud делать ли нет?
- Общий
- Кроме него обновлять ресурс ни кто не может

Main message:
Можно назвать modifiedBy тогда тока одно поле будет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Можно назвать modifiedBy тогда тока одно поле будет

--

## My telegram message #158195
**Time:** 04.05.2022 23:16:48 UTC+05:00
**Link:** https://t.me/nest_ru/158195

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Общий
- Кроме него обновлять ресурс ни кто не может
- Можно назвать modifiedBy тогда тока одно поле будет
- Ну ясненько,  updateBy может понадобиться если захочется что то сделать с пользователем который обновил ресурс. А так конкретно если для детекта может\не может обновлять ресурс хватит  createBy

Main message:
лучше называй как надо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше называй как надо

--

## My telegram message #158201
**Time:** 04.05.2022 23:32:17 UTC+05:00
**Link:** https://t.me/nest_ru/158201

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно назвать modifiedBy тогда тока одно поле будет
- Ну ясненько,  updateBy может понадобиться если захочется что то сделать с пользователем который обновил ресурс. А так конкретно если для детекта может\не может обновлять ресурс хватит  createBy
- лучше называй как надо
- Ну так если чо меняй аватарку, картинку.

Main message:
не могу) многие по ней меня только и узнают, я нарисовал эту картинку в 2006ом году если что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не могу) многие по ней меня только и узнают, я нарисовал эту картинку в 2006ом году если что

--

## My telegram message #158203
**Time:** 04.05.2022 23:39:58 UTC+05:00
**Link:** https://t.me/nest_ru/158203

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- лучше называй как надо
- Ну так если чо меняй аватарку, картинку.
- не могу) многие по ней меня только и узнают, я нарисовал эту картинку в 2006ом году если что
- Ребрендинг (зачеркнуто) - жениться тебе пора!

Main message:
хм, потестю неделю реальный фейс)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хм, потестю неделю реальный фейс)

--

## My telegram message #158205
**Time:** 04.05.2022 23:49:22 UTC+05:00
**Link:** https://t.me/nest_ru/158205

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не могу) многие по ней меня только и узнают, я нарисовал эту картинку в 2006ом году если что
- Ребрендинг (зачеркнуто) - жениться тебе пора!
- хм, потестю неделю реальный фейс)
- админские привелегии)

Main message:
риски есть, так как я просто админ а не сверх админ)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

риски есть, так как я просто админ а не сверх админ)

--

## My telegram message #158209
**Time:** 04.05.2022 23:51:42 UTC+05:00
**Link:** https://t.me/nest_ru/158209

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хм, потестю неделю реальный фейс)
- админские привелегии)
- риски есть, так как я просто админ а не сверх админ)
- у меня несколько твоих авок заблерены)

Main message:
я снес, слишком близко было, ctrl+f5

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я снес, слишком близко было, ctrl+f5

--

## My telegram message #158213
**Time:** 04.05.2022 23:53:21 UTC+05:00
**Link:** https://t.me/nest_ru/158213

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- риски есть, так как я просто админ а не сверх админ)
- у меня несколько твоих авок заблерены)
- я снес, слишком близко было, ctrl+f5
- помогает публичность в поиске работы? я имею в виду публикации статей

Main message:
в текущей реальности нет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в текущей реальности нет)

--

## My telegram message #158216
**Time:** 04.05.2022 23:56:53 UTC+05:00
**Link:** https://t.me/nest_ru/158216

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- помогает публичность в поиске работы? я имею в виду публикации статей
- в текущей реальности нет)
- уже хотел скинуть ссылку на чат nestjs_jobs, а потом прочитал ник... вот это ребрендинг)
- а ты не знаешь, что по несту поопенсорсить можно? интересует чисто в карьерный целях

Main message:
сейчас я уже вообще не знаю что можно такое запилить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сейчас я уже вообще не знаю что можно такое запилить

--

## My telegram message #158219
**Time:** 04.05.2022 23:58:26 UTC+05:00
**Link:** https://t.me/nest_ru/158219

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
у меня куча идей но они все фулстек, тебе не зайдет и это  офтоп уже)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня куча идей но они все фулстек, тебе не зайдет и это  офтоп уже)

--

## My telegram message #158271
**Time:** 05.05.2022 00:35:13 UTC+05:00
**Link:** https://t.me/nest_ru/158271

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Сейчас Данил появится)

Main message:
Я к нему уже ходил)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я к нему уже ходил)

--

## My telegram message #158278
**Time:** 05.05.2022 00:36:32 UTC+05:00
**Link:** https://t.me/nest_ru/158278

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Golang?
- Да
- Я к нему уже ходил)
- А ко мне не пойдёш потому что у меня галера или есть желание?

Main message:
Ага через ремут, завтра давай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ага через ремут, завтра давай

--

## My telegram message #158280
**Time:** 05.05.2022 00:37:12 UTC+05:00
**Link:** https://t.me/nest_ru/158280

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я к нему уже ходил)
- А ко мне не пойдёш потому что у меня галера или есть желание?
- Ага через ремут, завтра давай
- Через ремут?

Main message:
Удаленке онли у меня же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Удаленке онли у меня же

--

## My telegram message #158286
**Time:** 05.05.2022 00:49:24 UTC+05:00
**Link:** https://t.me/nest_ru/158286

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А чего, не понравилось?))

Main message:
ДК я тебе не пошёл же, дырявая ты голова

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ДК я тебе не пошёл же, дырявая ты голова

--

## My telegram message #158303
**Time:** 05.05.2022 10:19:19 UTC+05:00
**Link:** https://t.me/nest_ru/158303

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- так и просиходит, в супер передаётся текст для перевода, только мне не понятно как именно он технически там переведётся

Main message:
Через фильтр можно Перехватывать ошибки и переводить мессадж

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через фильтр можно Перехватывать ошибки и переводить мессадж

--

## My telegram message #158306
**Time:** 05.05.2022 10:24:33 UTC+05:00
**Link:** https://t.me/nest_ru/158306

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну так передавай в super текст, который хочешь выводить через i18n и все Или я не так поянл вопрос
- так и просиходит, в супер передаётся текст для перевода, только мне не понятно как именно он технически там переведётся
- Через фильтр можно Перехватывать ошибки и переводить мессадж
- А это можно как-то супер централизовано сделать? Потому что эксепшенов у меня около 100, мест в коде, где они используются уже больше 1000. Поэтому для меня норм вариант поправить как -то эксепшены, но идеальнл вообще в одном месте где-то донастроить и чтоб всё работало

Main message:
Фильтр и интерцептор как раз и есть одно место

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фильтр и интерцептор как раз и есть одно место

--

## My telegram message #158342
**Time:** 05.05.2022 13:43:00 UTC+05:00
**Link:** https://t.me/nest_ru/158342

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всю таблицу
- хочу вернутся к этому вопросу) возможно ли сделать так чтобы он брал данные из соседней таблицы ? дело в том что в соседней таблице у меня хранятся лайки и я хочу отправлять их количествоъ
- А у вас есть миграции?
- Да но мне надо дробнуть конкретные таблицы и туда загрузить новые данные в одной тразакции

Main message:
Миграцию с переименованием сделай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Миграцию с переименованием сделай

--

## My telegram message #158378
**Time:** 05.05.2022 17:35:05 UTC+05:00
**Link:** https://t.me/nest_ru/158378

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 👍такое работает примерно раз в полгода. Но если ты действительно нужен. А то пожмут руку и уволят 🤣
- да, я сам не ожидал, но повторять пока не буду😂
- Мы так провожали одного человека. Босс сказал потенциальному новому работодателю, что лучше человека вы не найдете. Перекрестился и сказал, хоть бы его быстрее отсюда забрали!
- помогите пожалуйста

Main message:
const username =await firstValueFrom(this.userServiceClient.send({ cmd: 'find-username' }, signupData.username));

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

const username =await firstValueFrom(this.userServiceClient.send({ cmd: 'find-username' }, signupData.username));

--

## My telegram message #158469
**Time:** 06.05.2022 10:47:57 UTC+05:00
**Link:** https://t.me/nest_ru/158469

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- На несидж посмотри реализацию вебсокетов
- а я хочу чтобы только при вызове sendMessageIntoChat брать из БД сообщения и кидать их в ответ
- Доброго времени суток. Подскажите пожалуйста, как сделать Redirect без ошибки? По аналогии  res.params = { message: 'Теперь Вы можете успешно зайти на сайт' }; return res.redirect(process.env.CLIENT_URL);

Main message:
просто редирект не работает чтоли?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто редирект не работает чтоли?

--

## My telegram message #158476
**Time:** 06.05.2022 11:16:32 UTC+05:00
**Link:** https://t.me/nest_ru/158476

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а как в параметрах передать сообщение?  res.params = { message: 'Теперь Вы можете успешно зайти на сайт' };

Main message:
какое сообщение, у тя бэк отдаст хедар редиректа и урл куда идти прям в браузер, фронт не увидит ничего что ты там пошлешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

какое сообщение, у тя бэк отдаст хедар редиректа и урл куда идти прям в браузер, фронт не увидит ничего что ты там пошлешь

--

## My telegram message #158479
**Time:** 06.05.2022 11:20:38 UTC+05:00
**Link:** https://t.me/nest_ru/158479

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня стоит мултер который должен загрузить трек на сервер, то есть роут выглядит так  router.post("/track/create", passport.auntificate("jwt", {session: false}), multer.single("track", {maxCount: 1}), trackController.createTrack) но прикол в том, что мне же сначала создать трек, чтобы правильно создать путь в которой будет храниться трек включив в путь айди трека в базе данных, ну то есть  path.resolve(__dirname, "static", " tracks", track_id, track.mp3) Но я не могу включить в путь айди трека потому что у меня миддлвар multer стоит до контроллера, как быть, если в контроллере и происходит создание трека?
- не по теме неста, извините, но возможно вы знаете
- какое сообщение, у тя бэк отдаст хедар редиректа и урл куда идти прям в браузер, фронт не увидит ничего что ты там пошлешь
- в Express можно же делать редирект

Main message:
когда ты шлешь хедар с редиректом, то браузер его сразу отрабатывает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда ты шлешь хедар с редиректом, то браузер его сразу отрабатывает

--

## My telegram message #158482
**Time:** 06.05.2022 11:29:40 UTC+05:00
**Link:** https://t.me/nest_ru/158482

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет! Подскажите, нормальная практика смешивать на несте restful с MVC (отдавать статику) для 2-5 страниц? Или отдельный проект поднимать на экспрессе?

Main message:
сделай два приложения неста apps/server apps/mvc

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сделай два приложения неста apps/server apps/mvc

--

## My telegram message #158490
**Time:** 06.05.2022 11:44:45 UTC+05:00
**Link:** https://t.me/nest_ru/158490

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- пользователь в сообщении переходит по ссылке на уникальную страницу и мне нужно сделать редирект на на страницу логина (на 4200). На NodeJs я делал так..  res.params = { message: 'Теперь Вы можете успешно зайти на сайт' }; return res.redirect(process.env.CLIENT_URL);  Как сделать на NestJS?

Main message:
1 тыкаем в ссылку из емайл http://host?verificationCode=XXXX 2 она ведет на фронт 4200 3 фронт передает в апи этот код 4 апи сверяет код и авторизует юзера и возвращает токены авторизации или куки не суть, тоже самое что и при логине короче 5 фронт запускает у себя логику которая стоит после логина

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

1 тыкаем в ссылку из емайл http://host?verificationCode=XXXX 2 она ведет на фронт 4200 3 фронт передает в апи этот код 4 апи сверяет код и авторизует юзера и возвращает токены авторизации или куки не суть, тоже самое что и при логине короче 5 фронт запускает у себя логику которая стоит после логина

--

## My telegram message #158493
**Time:** 06.05.2022 11:45:48 UTC+05:00
**Link:** https://t.me/nest_ru/158493

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не, ты используешь мультер просто ставишь параметр чтобы он сохранял не в DiskStorage, а в MemoryStorage Мультер ты по факту используешь чтобы не **** со стримами с файлом + с метаинформацией
- ну вообще, я потом на клиент буду стримом передавать трек
- 1 тыкаем в ссылку из емайл http://host?verificationCode=XXXX 2 она ведет на фронт 4200 3 фронт передает в апи этот код 4 апи сверяет код и авторизует юзера и возвращает токены авторизации или куки не суть, тоже самое что и при логине короче 5 фронт запускает у себя логику которая стоит после логина
- +++

Main message:
и птом уже показываем сообщение что успешно авторизовали, это на фронте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и птом уже показываем сообщение что успешно авторизовали, это на фронте

--

## My telegram message #158497
**Time:** 06.05.2022 12:25:10 UTC+05:00
**Link:** https://t.me/nest_ru/158497

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и птом уже показываем сообщение что успешно авторизовали, это на фронте
- у меня пункт 2 ведет на бэк, затем я устанавливаю поле isActivated = true и делаю редирект на 4200. .Получается под ссылку для email должен быть создать отдельный роут со страницей на фронте. Спасибо попробую
- Сделал монорепу! Круто! Спасибо!
- Всем привет, такой вопрос, с моего сервера нужно отсылать запросы к другому апи, чтобы использовать нужную информацию оттуда. В связи с этим мне интересно как правильно в нест это оформить? Создать отдельный сервис из которого как раз и слать эти запросы к апи с помощью какой-то http библиотеки? Или есть варианты лучше.

Main message:
Отдельный модуль и в нем юзать HttpModule

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Отдельный модуль и в нем юзать HttpModule

--

## My telegram message #158538
**Time:** 06.05.2022 17:58:25 UTC+05:00
**Link:** https://t.me/nest_ru/158538

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 🤨 Напиши нужный pipe?
- я просто хотел уточнить если кто-то сталкивался будет ли оно работать как стрим? не в плане все выгребсти а именно построчно
- Привет всем. Подскажите, пожалуйста, как лучше разрабатывать проект. Сначала писать монолит, а потом разбивать на микросервисы или с самого начала микросервисы?
- первый вариант

Main message:
Третий

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Третий

--

## My telegram message #158545
**Time:** 06.05.2022 18:11:41 UTC+05:00
**Link:** https://t.me/nest_ru/158545

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Это какой?

Main message:
ну чтобы можно было запустить 10 копий и все исправно работало

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну чтобы можно было запустить 10 копий и все исправно работало

--

