## My telegram message #240873
**Time:** 23.06.2023 14:01:57 UTC+05:00
**Link:** https://t.me/nest_ru/240873

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Парни, пока вы тут с мока развлекаетесь, я вас отвлеку немного. Была цель получать значения из конфига, строго типизировав эти параметры. Что бы когда  config.get , а дальше список только определенных имен переменных. В основном модуле:  ConfigModule.forRoot({ validate }), AppConfigModule,  AppConfig.module  @Module({ imports: [ConfigModule], providers: [AppConfigService], exports: [AppConfigService], }) export class AppConfigModule {}  AppConfig.service  @Injectable() export class AppConfigService { constructor(private readonly config: ConfigService<EnvironmentVariables, true>) {} public get<K extends keyof EnvironmentVariables>(envProp: K): EnvironmentVariables[K] { return this.config.get(envProp, { infer: true }); } }  И все вроде бы работало до той поры пока я не решил опробовать DevTools А там есть Detect circular dependencies

Main message:
используй нест конфиг модуль только на уровне апп чисто как либа которая умеет читать енв файлы, в модулях юзай собственные конфигурации  https://t.me/nest_ru/202645

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

используй нест конфиг модуль только на уровне апп чисто как либа которая умеет читать енв файлы, в модулях юзай собственные конфигурации  https://t.me/nest_ru/202645

--

## My telegram message #240878
**Time:** 23.06.2023 14:07:39 UTC+05:00
**Link:** https://t.me/nest_ru/240878

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так я так вроде и делаю.

Main message:
ты хочешь конфиг модуль завернуть в свой апп конфиг модуль и его уже втыкать в левые модули и сервисы, тупа для типизации, такая штука уже есть в самом нест конфиге

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты хочешь конфиг модуль завернуть в свой апп конфиг модуль и его уже втыкать в левые модули и сервисы, тупа для типизации, такая штука уже есть в самом нест конфиге

--

## My telegram message #240881
**Time:** 23.06.2023 14:12:14 UTC+05:00
**Link:** https://t.me/nest_ru/240881

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Есть, но нужно в каждом классе писать  ConfigService<EnvironmentVariables, true> И get возвращает либо значение, либо undefined. А у меня там нет undefined

Main message:
там есть getOrThrow

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там есть getOrThrow

--

## My telegram message #240885
**Time:** 23.06.2023 14:15:55 UTC+05:00
**Link:** https://t.me/nest_ru/240885

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Есть, но нужно в каждом классе писать  ConfigService<EnvironmentVariables, true> И get возвращает либо значение, либо undefined. А у меня там нет undefined

Main message:
ты создай Тип и его пиши в классах  export type AppConfigService=ConfigService<EnvironmentVariables, true>

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты создай Тип и его пиши в классах  export type AppConfigService=ConfigService<EnvironmentVariables, true>

--

## My telegram message #240888
**Time:** 23.06.2023 14:18:52 UTC+05:00
**Link:** https://t.me/nest_ru/240888

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ильшат, а все же, вот что с ним не так? Почему нельзя его обернуть в какое-то свое решение?

Main message:
можно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно

--

## My telegram message #240899
**Time:** 23.06.2023 14:49:21 UTC+05:00
**Link:** https://t.me/nest_ru/240899

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну, не работает. У меня есть другие модули в приложении, где я этот конфиг дергаю

Main message:
export type AppConfigService=ConfigService<EnvironmentVariables, true>

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

export type AppConfigService=ConfigService<EnvironmentVariables, true>

--

## My telegram message #240903
**Time:** 23.06.2023 14:50:07 UTC+05:00
**Link:** https://t.me/nest_ru/240903

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я просто хочу понять как это все работает.
- export type AppConfigService=ConfigService<EnvironmentVariables, true>
- Именно!
- ну да, поэтому и нет цикличных зависимостей)

Main message:
constructor (@Inject(ConfigService) configService:AppConfigService)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

constructor (@Inject(ConfigService) configService:AppConfigService)

--

## My telegram message #240906
**Time:** 23.06.2023 14:54:14 UTC+05:00
**Link:** https://t.me/nest_ru/240906

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Именно!
- ну да, поэтому и нет цикличных зависимостей)
- constructor (@Inject(ConfigService) configService:AppConfigService)
- Да, ты прав... Но это вообще сейчас все приложение перелопатить :)

Main message:
а по счет твоего вопроса (почему и как?) ответ: создай модуль с твоим приложением и у этого модуля будет свой фор рут созданный через это  https://docs.nestjs.com/fundamentals/dynamic-modules#config-module-example потом этот модуль импортируй в апп модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а по счет твоего вопроса (почему и как?) ответ: создай модуль с твоим приложением и у этого модуля будет свой фор рут созданный через это  https://docs.nestjs.com/fundamentals/dynamic-modules#config-module-example потом этот модуль импортируй в апп модуль

--

## My telegram message #240908
**Time:** 23.06.2023 14:55:08 UTC+05:00
**Link:** https://t.me/nest_ru/240908

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- constructor (@Inject(ConfigService) configService:AppConfigService)
- Да, ты прав... Но это вообще сейчас все приложение перелопатить :)
- а по счет твоего вопроса (почему и как?) ответ: создай модуль с твоим приложением и у этого модуля будет свой фор рут созданный через это  https://docs.nestjs.com/fundamentals/dynamic-modules#config-module-example потом этот модуль импортируй в апп модуль
- Если не получится убрать зависимость, то тогда пойду по предложенному тобой пути

Main message:
обертку которую ты хочешь, это просто проксирование данных между сервисамми, лучше явно делать сразу сервис дергать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

обертку которую ты хочешь, это просто проксирование данных между сервисамми, лучше явно делать сразу сервис дергать

--

## My telegram message #240914
**Time:** 23.06.2023 14:59:57 UTC+05:00
**Link:** https://t.me/nest_ru/240914

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- обертку которую ты хочешь, это просто проксирование данных между сервисамми, лучше явно делать сразу сервис дергать
- Дело все в том, что я раньше так и делал. Но! У меня были проблемы с тестами. И ты меня разогнал с этим подходом
- я вообще дефолтные настройки юзаю и бед не знаю)
- Т.е. не делать вот так?  public get<K extends keyof EnvironmentVariables>(envProp: K): EnvironmentVariables[K] { return this.config.get(envProp, { infer: true }); } а чем тогда это отличается особо от  public get isProd() { return this.config.get('NODE_ENV') === 'production' }

Main message:
не ты один хочешь велики придумывать вместо того чтобы разбираться с проблемой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не ты один хочешь велики придумывать вместо того чтобы разбираться с проблемой

--

## My telegram message #240916
**Time:** 23.06.2023 15:01:04 UTC+05:00
**Link:** https://t.me/nest_ru/240916

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я вообще дефолтные настройки юзаю и бед не знаю)
- Т.е. не делать вот так?  public get<K extends keyof EnvironmentVariables>(envProp: K): EnvironmentVariables[K] { return this.config.get(envProp, { infer: true }); } а чем тогда это отличается особо от  public get isProd() { return this.config.get('NODE_ENV') === 'production' }
- не ты один хочешь велики придумывать вместо того чтобы разбираться с проблемой
- У меня там везде ключи доступа и соли для подписи данных. Они, конечно не из продакшена, но все же не хочется их в коде хранить.

Main message:
если тебе нужно не просто типизация а что то больше, типа дешефрация значений при входе, тогда да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если тебе нужно не просто типизация а что то больше, типа дешефрация значений при входе, тогда да

--

## My telegram message #240932
**Time:** 23.06.2023 15:03:52 UTC+05:00
**Link:** https://t.me/nest_ru/240932

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я не согласен. Я как раз пытаюсь разобраться как правильно и почему в данном случае обертка - это плохое решение.

Main message:
ну обертка не нужна если все из коробки нормально работает, ты еще напиши обертку над диай неста внедрив ДДД и слои его как некоторые умники)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну обертка не нужна если все из коробки нормально работает, ты еще напиши обертку над диай неста внедрив ДДД и слои его как некоторые умники)

--

## My telegram message #240942
**Time:** 23.06.2023 15:16:24 UTC+05:00
**Link:** https://t.me/nest_ru/240942

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я кста уже кидал как я делаю конфиг сервис
- Я видел
- всё элементарно в реализации
- Ну, вот нужно еще все же указывать тип переменной которую возвращает get

Main message:
Покажи енв файл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Покажи енв файл

--

## My telegram message #240947
**Time:** 23.06.2023 15:20:59 UTC+05:00
**Link:** https://t.me/nest_ru/240947

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я видел
- всё элементарно в реализации
- Ну, вот нужно еще все же указывать тип переменной которую возвращает get
- Покажи енв файл

Main message:
интерфес покажи на что мапишь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

интерфес покажи на что мапишь

--

## My telegram message #240970
**Time:** 23.06.2023 16:01:29 UTC+05:00
**Link:** https://t.me/nest_ru/240970

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тогда экспортируй сразу весь .env)
- Вот здесь возникает сложность, что этот энв нужно распространять между всеми разработчиками и дублировать в CI, иначе тесты не будут проходить
- так а зачем тебе вообще env в тестах?)
- 😁 Там такая длинная история тернистого пути.... Я сначала сделал эту обертку, но при ней тесты требовали наличия энва и без него просто при каждом тесте заново загружали все переменные и игнорили моки. Потом Ильшат мне сказал, что я не правильно импортирую конфиг модуль и он должен быть только в руте. Я все сделал как он сказал и обертка работала нормально до момента пока я не настроил ДевТулзы

Main message:
верни свой вариант и пофиг на циклы раз уже не можешь победить тип

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

верни свой вариант и пофиг на циклы раз уже не можешь победить тип

--

## My telegram message #240972
**Time:** 23.06.2023 16:02:17 UTC+05:00
**Link:** https://t.me/nest_ru/240972

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так а зачем тебе вообще env в тестах?)
- 😁 Там такая длинная история тернистого пути.... Я сначала сделал эту обертку, но при ней тесты требовали наличия энва и без него просто при каждом тесте заново загружали все переменные и игнорили моки. Потом Ильшат мне сказал, что я не правильно импортирую конфиг модуль и он должен быть только в руте. Я все сделал как он сказал и обертка работала нормально до момента пока я не настроил ДевТулзы
- верни свой вариант и пофиг на циклы раз уже не можешь победить тип
- Ну, в общем вот что получилось. Все запускатся, тесты работают

Main message:
модулей нету у тя?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модулей нету у тя?

--

## My telegram message #240976
**Time:** 23.06.2023 16:03:40 UTC+05:00
**Link:** https://t.me/nest_ru/240976

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- верни свой вариант и пофиг на циклы раз уже не можешь победить тип
- Ну, в общем вот что получилось. Все запускатся, тесты работают
- модулей нету у тя?
- В App.module

Main message:
ConfigModule.forRoot() - в аппе делай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ConfigModule.forRoot() - в аппе делай

--

## My telegram message #240981
**Time:** 23.06.2023 16:05:10 UTC+05:00
**Link:** https://t.me/nest_ru/240981

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- модулей нету у тя?
- В App.module
- ConfigModule.forRoot() - в аппе делай
- Ну, тогда ничего менять не нужно. Как было так и надо оставлять

Main message:
код дай того что выше я писал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

код дай того что выше я писал

--

## My telegram message #240983
**Time:** 23.06.2023 16:05:39 UTC+05:00
**Link:** https://t.me/nest_ru/240983

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ConfigModule.forRoot() - в аппе делай

Main message:
Module({  imports: [ConfigModule], providers: [AppConfigService], exports: [ConfigModule, AppConfigService], }) export class AppConfigModule {}

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Module({  imports: [ConfigModule], providers: [AppConfigService], exports: [ConfigModule, AppConfigService], }) export class AppConfigModule {}

--

## My telegram message #240985
**Time:** 23.06.2023 16:08:18 UTC+05:00
**Link:** https://t.me/nest_ru/240985

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- код дай того что выше я писал
- @Module({ imports: [ConfigModule], providers: [AppConfigService], exports: [AppConfigService], }) export class AppConfigModule { public static register(global = false): DynamicModule { return { module: AppConfigModule, global, imports: [ConfigModule.forRoot({ validate, isGlobal: false, cache: true })], providers: [AppConfigService], exports: [AppConfigService], }; } }
- Module({  imports: [ConfigModule], providers: [AppConfigService], exports: [ConfigModule, AppConfigService], }) export class AppConfigModule {}
- А зачем экспорт ConfigModule?

Main message:
сообщаем наружу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сообщаем наружу

--

## My telegram message #240990
**Time:** 23.06.2023 16:16:21 UTC+05:00
**Link:** https://t.me/nest_ru/240990

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Module({  imports: [ConfigModule], providers: [AppConfigService], exports: [ConfigModule, AppConfigService], }) export class AppConfigModule {}
- А зачем экспорт ConfigModule?
- сообщаем наружу
- Ну, получается именно то вариант, с которого я начал. Экспорт только чуть изменился

Main message:
воткни в любой свой модуль апконфиг модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

воткни в любой свой модуль апконфиг модуль

--

## My telegram message #240993
**Time:** 23.06.2023 16:17:19 UTC+05:00
**Link:** https://t.me/nest_ru/240993

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сообщаем наружу
- Ну, получается именно то вариант, с которого я начал. Экспорт только чуть изменился
- воткни в любой свой модуль апконфиг модуль
- Импортнуть просто внутрь модуля?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #241000
**Time:** 23.06.2023 16:26:44 UTC+05:00
**Link:** https://t.me/nest_ru/241000

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- воткни в любой свой модуль апконфиг модуль
- Импортнуть просто внутрь модуля?
- да
- Вот тут начинается интересное.

Main message:
когда ты импортишь в себя чет глобальное

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда ты импортишь в себя чет глобальное

--

## My telegram message #241008
**Time:** 23.06.2023 16:28:53 UTC+05:00
**Link:** https://t.me/nest_ru/241008

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- Вот тут начинается интересное.
- когда ты импортишь в себя чет глобальное
- это платная?

Main message:
не важно что в опциях конфиг модуля есть глобал опция, она не влияет не на что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не важно что в опциях конфиг модуля есть глобал опция, она не влияет не на что

--

## My telegram message #241010
**Time:** 23.06.2023 16:29:05 UTC+05:00
**Link:** https://t.me/nest_ru/241010

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- когда ты импортишь в себя чет глобальное
- это платная?
- не важно что в опциях конфиг модуля есть глобал опция, она не влияет не на что
- Это, скажу я вам, сделать будет труднее... (с) кино Там же сервис перестанет работать. Но!

Main message:
он всегда глобал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

он всегда глобал

--

## My telegram message #241018
**Time:** 23.06.2023 16:32:10 UTC+05:00
**Link:** https://t.me/nest_ru/241018

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это, скажу я вам, сделать будет труднее... (с) кино Там же сервис перестанет работать. Но!
- он всегда глобал
- Вот эта штука не понимает, что модульглобальный и вот так генерит ошибку
- Я не говорил такого

Main message:
я говорил такое

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я говорил такое

--

## My telegram message #241027
**Time:** 23.06.2023 16:32:43 UTC+05:00
**Link:** https://t.me/nest_ru/241027

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я говорил такое
- я не говорил юзать какой то самопал
- Так у тебя же самописный :)
- всё нужно юзать, что из коробки

Main message:
ну у тя таже беда что у него

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну у тя таже беда что у него

--

## My telegram message #241030
**Time:** 23.06.2023 16:32:55 UTC+05:00
**Link:** https://t.me/nest_ru/241030

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Так у тебя же самописный :)
- всё нужно юзать, что из коробки
- ну у тя таже беда что у него
- Какая?

Main message:
с диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с диай

--

## My telegram message #241034
**Time:** 23.06.2023 16:33:14 UTC+05:00
**Link:** https://t.me/nest_ru/241034

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну у тя таже беда что у него
- Какая?
- с диай
- У меня один конфиг модуль

Main message:
ну да глобал потому что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну да глобал потому что

--

## My telegram message #241061
**Time:** 23.06.2023 16:43:35 UTC+05:00
**Link:** https://t.me/nest_ru/241061

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
ты просто завернул глобал доступ прямой до констант на нест конфиг) просто импортни конфиг как константу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты просто завернул глобал доступ прямой до констант на нест конфиг) просто импортни конфиг как константу

--

## My telegram message #241064
**Time:** 23.06.2023 16:43:51 UTC+05:00
**Link:** https://t.me/nest_ru/241064

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну, все кроме этого практически один в один.
- Ну так без этого типы откуда появятся то
- ты просто завернул глобал доступ прямой до констант на нест конфиг) просто импортни конфиг как константу
- Да, потому, что без вот этой строки public get<ConfigKey extends keyof Config>(parameter: ConfigKey): Config[ConfigKey]; get нормально тип не отдает

Main message:
раз всеравно сделал его глобалом и все связал в прриложении

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

раз всеравно сделал его глобалом и все связал в прриложении

--

## My telegram message #241073
**Time:** 23.06.2023 16:45:15 UTC+05:00
**Link:** https://t.me/nest_ru/241073

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты просто завернул глобал доступ прямой до констант на нест конфиг) просто импортни конфиг как константу
- Да, потому, что без вот этой строки public get<ConfigKey extends keyof Config>(parameter: ConfigKey): Config[ConfigKey]; get нормально тип не отдает
- раз всеравно сделал его глобалом и все связал в прриложении
- Ну да

Main message:
@lutik_iz_rivii выкини все что написал и внедри  https://www.npmjs.com/package/env-var и создай файл config.ts и в нем export config={port: env.get('PORT').default('5432').asPortNumber()}

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@lutik_iz_rivii выкини все что написал и внедри  https://www.npmjs.com/package/env-var и создай файл config.ts и в нем export config={port: env.get('PORT').default('5432').asPortNumber()}

--

## My telegram message #241076
**Time:** 23.06.2023 16:45:35 UTC+05:00
**Link:** https://t.me/nest_ru/241076

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @lutik_iz_rivii выкини все что написал и внедри  https://www.npmjs.com/package/env-var и создай файл config.ts и в нем export config={port: env.get('PORT').default('5432').asPortNumber()}

Main message:
все что у него создано это тоже что и тут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все что у него создано это тоже что и тут

--

## My telegram message #241080
**Time:** 23.06.2023 16:45:48 UTC+05:00
**Link:** https://t.me/nest_ru/241080

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я тоже не понял
- Вы хотите ограничивать модуль, что бы у него доступ ток до своих переменных?
- все что у него создано это тоже что и тут
- Зачем?

Main message:
так как тестировать невозможно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так как тестировать невозможно

--

## My telegram message #241082
**Time:** 23.06.2023 16:45:55 UTC+05:00
**Link:** https://t.me/nest_ru/241082

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все что у него создано это тоже что и тут
- Зачем?
- так как тестировать невозможно
- Выкинул

Main message:
нужно процесс енв внедрять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужно процесс енв внедрять

--

## My telegram message #241089
**Time:** 23.06.2023 16:46:52 UTC+05:00
**Link:** https://t.me/nest_ru/241089

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- У меня тесты в параллель

Main message:
ну ты меняешь в разных тестах опции, например 20 тестов каждая юзает свой вариант базы с свои конфигом и набором данных

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты меняешь в разных тестах опции, например 20 тестов каждая юзает свой вариант базы с свои конфигом и набором данных

--

## My telegram message #241092
**Time:** 23.06.2023 16:47:50 UTC+05:00
**Link:** https://t.me/nest_ru/241092

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну ты меняешь в разных тестах опции, например 20 тестов каждая юзает свой вариант базы с свои конфигом и набором данных

Main message:
или некий моудуль который разные опции имеет конфигурирования и мы все 300 кейсов перебераем в тестах паралельно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

или некий моудуль который разные опции имеет конфигурирования и мы все 300 кейсов перебераем в тестах паралельно

--

## My telegram message #241098
**Time:** 23.06.2023 16:48:25 UTC+05:00
**Link:** https://t.me/nest_ru/241098

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
причем тут одинаково, если нужно разное

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

причем тут одинаково, если нужно разное

--

## My telegram message #241103
**Time:** 23.06.2023 16:49:27 UTC+05:00
**Link:** https://t.me/nest_ru/241103

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
всмысле зачем, ну так надо, разные тесты создают себе данные и чтобы другие даные им не мешали чисто физически разные базы у всех

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

всмысле зачем, ну так надо, разные тесты создают себе данные и чтобы другие даные им не мешали чисто физически разные базы у всех

--

## My telegram message #241107
**Time:** 23.06.2023 16:49:44 UTC+05:00
**Link:** https://t.me/nest_ru/241107

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
это как пример

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это как пример

--

## My telegram message #241111
**Time:** 23.06.2023 16:50:12 UTC+05:00
**Link:** https://t.me/nest_ru/241111

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну так у тебя поднимается 10 баз данных

Main message:
неа) одна бд физическая и в нее 500 IT-ов создают себе базы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа) одна бд физическая и в нее 500 IT-ов создают себе базы

--

## My telegram message #241114
**Time:** 23.06.2023 16:50:51 UTC+05:00
**Link:** https://t.me/nest_ru/241114

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это как пример
- каждый воркер берет свою бд
- неа) одна бд физическая и в нее 500 IT-ов создают себе базы
- какие ресурсы?

Main message:
железо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

железо

--

## My telegram message #241116
**Time:** 23.06.2023 16:51:12 UTC+05:00
**Link:** https://t.me/nest_ru/241116

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- неа) одна бд физическая и в нее 500 IT-ов создают себе базы
- какие ресурсы?
- железо
- у тебя воркеры едут

Main message:
короче не буду спорить, надо к этому просто прийти

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

короче не буду спорить, надо к этому просто прийти

--

## My telegram message #241119
**Time:** 23.06.2023 16:51:34 UTC+05:00
**Link:** https://t.me/nest_ru/241119

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- железо
- у тебя воркеры едут
- короче не буду спорить, надо к этому просто прийти
- в каждом it создание базы?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #241129
**Time:** 23.06.2023 16:52:25 UTC+05:00
**Link:** https://t.me/nest_ru/241129

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
миграции гонишь туда и все, две строчик: создать базу, накатить миграции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

миграции гонишь туда и все, две строчик: создать базу, накатить миграции

--

## My telegram message #241334
**Time:** 25.06.2023 20:51:53 UTC+05:00
**Link:** https://t.me/nest_ru/241334

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Кикните этого клоуна
- @KaufmanEndy ударь его палкой
- Так и запишем, генератор рандома сломался в неправильную сторону
- нет, это наш кореш, он больно бьет палкой по ногам и по рукам

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #241336
**Time:** 25.06.2023 20:52:12 UTC+05:00
**Link:** https://t.me/nest_ru/241336

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- @KaufmanEndy ударь его палкой
- Так и запишем, генератор рандома сломался в неправильную сторону
- нет, это наш кореш, он больно бьет палкой по ногам и по рукам
- )

Main message:
ушел бот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ушел бот

--

## My telegram message #241375
**Time:** 25.06.2023 20:57:59 UTC+05:00
**Link:** https://t.me/nest_ru/241375

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Жесть ты наркоман
- Я просто не могу идти одновременно писать, поэтому т9 дописывает некоторые слова
- я бы всех вас перебанил
- аххаха

Main message:
настырный)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

настырный)

--

## My telegram message #241401
**Time:** 25.06.2023 21:03:39 UTC+05:00
**Link:** https://t.me/nest_ru/241401

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Че происходит?
- админу стало скучно
- зато по жизни кайф ловлю
- Это админ нас троллит?

Main message:
делать больше нечего админам)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

делать больше нечего админам)

--

## My telegram message #241648
**Time:** 27.06.2023 13:35:14 UTC+05:00
**Link:** https://t.me/nest_ru/241648

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy Ильшат, привет, можешь пожалуйста дать линку на свою репу, где ты с призмой воркаешь?

Main message:
тут простой пример  https://github.com/site15/site15.ru/tree/develop/libs/prisma/server/src/lib/prisma-client

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тут простой пример  https://github.com/site15/site15.ru/tree/develop/libs/prisma/server/src/lib/prisma-client

--

## My telegram message #241650
**Time:** 27.06.2023 13:37:36 UTC+05:00
**Link:** https://t.me/nest_ru/241650

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
это не юзаю так как это нужно когда грейсфул шотдаун есть и есть деплой без простоев это нужно все писать и настраивать сами по себе хуки ноды/неста/орм не гарантируют что операция не будет прервана, нужно код шамнить и работу с бд и даже на фронте вводить код для поддержки не прерывного деплоя у меня тупа там пример работы и все обычно продуктам пофигу на это все и нет времени на такой тюнинг, нужно фичи вчера сдавать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это не юзаю так как это нужно когда грейсфул шотдаун есть и есть деплой без простоев это нужно все писать и настраивать сами по себе хуки ноды/неста/орм не гарантируют что операция не будет прервана, нужно код шамнить и работу с бд и даже на фронте вводить код для поддержки не прерывного деплоя у меня тупа там пример работы и все обычно продуктам пофигу на это все и нет времени на такой тюнинг, нужно фичи вчера сдавать

--

## My telegram message #241652
**Time:** 27.06.2023 13:39:32 UTC+05:00
**Link:** https://t.me/nest_ru/241652

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Ну я к этому же, не уверен, что это вообще надо

Main message:
я делал как то такую штуку ну частично, очень давно, там кода больше нужно писать и везде предусматривать эту фичи с деплоями

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я делал как то такую штуку ну частично, очень давно, там кода больше нужно писать и везде предусматривать эту фичи с деплоями

--

## My telegram message #241656
**Time:** 27.06.2023 13:40:50 UTC+05:00
**Link:** https://t.me/nest_ru/241656

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это не юзаю так как это нужно когда грейсфул шотдаун есть и есть деплой без простоев это нужно все писать и настраивать сами по себе хуки ноды/неста/орм не гарантируют что операция не будет прервана, нужно код шамнить и работу с бд и даже на фронте вводить код для поддержки не прерывного деплоя у меня тупа там пример работы и все обычно продуктам пофигу на это все и нет времени на такой тюнинг, нужно фичи вчера сдавать
- Ну я к этому же, не уверен, что это вообще надо
- я делал как то такую штуку ну частично, очень давно, там кода больше нужно писать и везде предусматривать эту фичи с деплоями
- Чё это?

Main message:
ну я эту херь тащу уже сто лет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я эту херь тащу уже сто лет)

--

## My telegram message #241658
**Time:** 27.06.2023 13:41:05 UTC+05:00
**Link:** https://t.me/nest_ru/241658

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я делал как то такую штуку ну частично, очень давно, там кода больше нужно писать и везде предусматривать эту фичи с деплоями
- Чё это?
- ну я эту херь тащу уже сто лет)
- как же это проклято выглядит

Main message:
и в тайп орм так делал и сиквелайз и в призме

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и в тайп орм так делал и сиквелайз и в призме

--

## My telegram message #241660
**Time:** 27.06.2023 13:41:44 UTC+05:00
**Link:** https://t.me/nest_ru/241660

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я эту херь тащу уже сто лет)
- как же это проклято выглядит
- и в тайп орм так делал и сиквелайз и в призме
- Ни разу не рвался

Main message:
везде все рвется и сам реконект время занимает который обычно из коробки, проще долбать таймером чтобы не рвалось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

везде все рвется и сам реконект время занимает который обычно из коробки, проще долбать таймером чтобы не рвалось

--

## My telegram message #241665
**Time:** 27.06.2023 13:42:23 UTC+05:00
**Link:** https://t.me/nest_ru/241665

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
обычно под капотом рвестя и реконектится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

обычно под капотом рвестя и реконектится

--

## My telegram message #241679
**Time:** 27.06.2023 13:44:24 UTC+05:00
**Link:** https://t.me/nest_ru/241679

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- В любом нормальном приложении должен быть грейсфул шутдаун, что бы как минимум запросы в работе не отваливались отработав на какую-то часть

Main message:
обычно в них делают просто вызов закрытия коннектов к базе а не ожидание что все конекты отработают, так как при этом приходят новые запросы которые также лочат факт того что коннекты отработали

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

обычно в них делают просто вызов закрытия коннектов к базе а не ожидание что все конекты отработают, так как при этом приходят новые запросы которые также лочат факт того что коннекты отработали

--

## My telegram message #241686
**Time:** 27.06.2023 13:45:13 UTC+05:00
**Link:** https://t.me/nest_ru/241686

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
оно не нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оно не нужно

--

## My telegram message #241692
**Time:** 27.06.2023 13:46:46 UTC+05:00
**Link:** https://t.me/nest_ru/241692

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @lutik_iz_rivii ,  @KaufmanEndy ,  @x1gluck1x , как вы считаете друзья?

Main message:
не вижу криминала

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не вижу криминала

--

## My telegram message #241729
**Time:** 27.06.2023 13:51:17 UTC+05:00
**Link:** https://t.me/nest_ru/241729

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Смотря какой проект и тд, в целом я тут ничего страшного не вижу. Я с подходами как тут пишу проекты -  https://github.com/Sairyss/domain-driven-hexagon

Main message:
это нужно когда у тебя много вариантов бэка: nest, koa, typegraphql, express чтобы унифицировать все если у тебя один фрейм то это все не нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это нужно когда у тебя много вариантов бэка: nest, koa, typegraphql, express чтобы унифицировать все если у тебя один фрейм то это все не нужно

--

## My telegram message #241819
**Time:** 27.06.2023 14:11:53 UTC+05:00
**Link:** https://t.me/nest_ru/241819

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хм
- фиг знает
- Окей, спасибо большое)
- Могут и дать дерево писать

Main message:
Говоришь им что проектировал системы большие, а они нужен лайвкодинг сортировки пузырьком - как не умеете, вы нам не подходите

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Говоришь им что проектировал системы большие, а они нужен лайвкодинг сортировки пузырьком - как не умеете, вы нам не подходите

--

## My telegram message #241825
**Time:** 27.06.2023 14:15:43 UTC+05:00
**Link:** https://t.me/nest_ru/241825

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Окей, спасибо большое)
- Могут и дать дерево писать
- Говоришь им что проектировал системы большие, а они нужен лайвкодинг сортировки пузырьком - как не умеете, вы нам не подходите
- Да даж просто задизайнить таблички

Main message:
я на этом тоже валюсь) в голове не держу же все время, сел спроектировал базу, основные запросы напсиал чтобы чекнуть что все что нужно создал в базе и пошел код писать и уже забыл про базу, до тех пор пока не поймаю нагрузку где нить и перевожу там в сырой запрос и я опять базист

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я на этом тоже валюсь) в голове не держу же все время, сел спроектировал базу, основные запросы напсиал чтобы чекнуть что все что нужно создал в базе и пошел код писать и уже забыл про базу, до тех пор пока не поймаю нагрузку где нить и перевожу там в сырой запрос и я опять базист

--

