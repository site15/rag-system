## My telegram message #173973
**Time:** 26.07.2022 12:34:37 UTC+05:00
**Link:** https://t.me/nest_ru/173973

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну тут уже на любителя) Не пробовал но запишу себе
- У него даже документация лучше. И он от авторов puppeteer. Там 2 разраба ушли из команды puppeteer в microsoft playwright. Очень похожими они вышли.
- а можно для bull установить уникальный ключ задачи, чтоб проверять, если задача уже есть в очереди, то пропускать ее?
- Привет! Есть провайдер подключения к ораклу (через офф либу node-oracledb). Его используют провайдеры-репозитории, реализующие вызовы хранимых процедур оракла. При запуске e2e тестов - все успешно отрабатывают. Но далее есть afterAll, который чистит созданные объекты в базе, предварительно коллектящиеся в массив(при выполнении каждого теста их создающего). По какой то причине удаляются все элементы кроме последнего добавленного в определенном describe. То есть, если я распологаю тесты в одном describe - не будет удаляться только один последний добавленный элемент. А если в нескольких describe - в каждом из них не будет удаляться последний добавленных. При этом массив для них общий. Удаление последнего элемента всегда валится с ошибкой закрытого пула соединений(это следующий стейтмент).  afterAll(async () => { //-----------Вариант 1-------------- for (let i = 0; i < objectsToDelete.length; i++) { const id = objectsToDelete[i]; await personsPkgRepository.personsDel(id); } //-----------Вариант 2-------------- for (const id of objectsToDelete) { await personsPkgRepository.personsDel(id); } //-----------Вариант 3-------------- const deletePerson = async id => await personsPkgRepository.personsDel(id); const promiseDeleteEverything = objectsToDelete.map(id => deletePerson(id)); await Promise.all(promiseDeleteEverything).catch(error => console.log(error)); await app.close(); });

Main message:
--runInBand?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

--runInBand?

--

## My telegram message #173975
**Time:** 26.07.2022 12:49:21 UTC+05:00
**Link:** https://t.me/nest_ru/173975

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а можно для bull установить уникальный ключ задачи, чтоб проверять, если задача уже есть в очереди, то пропускать ее?
- Привет! Есть провайдер подключения к ораклу (через офф либу node-oracledb). Его используют провайдеры-репозитории, реализующие вызовы хранимых процедур оракла. При запуске e2e тестов - все успешно отрабатывают. Но далее есть afterAll, который чистит созданные объекты в базе, предварительно коллектящиеся в массив(при выполнении каждого теста их создающего). По какой то причине удаляются все элементы кроме последнего добавленного в определенном describe. То есть, если я распологаю тесты в одном describe - не будет удаляться только один последний добавленный элемент. А если в нескольких describe - в каждом из них не будет удаляться последний добавленных. При этом массив для них общий. Удаление последнего элемента всегда валится с ошибкой закрытого пула соединений(это следующий стейтмент).  afterAll(async () => { //-----------Вариант 1-------------- for (let i = 0; i < objectsToDelete.length; i++) { const id = objectsToDelete[i]; await personsPkgRepository.personsDel(id); } //-----------Вариант 2-------------- for (const id of objectsToDelete) { await personsPkgRepository.personsDel(id); } //-----------Вариант 3-------------- const deletePerson = async id => await personsPkgRepository.personsDel(id); const promiseDeleteEverything = objectsToDelete.map(id => deletePerson(id)); await Promise.all(promiseDeleteEverything).catch(error => console.log(error)); await app.close(); });
- --runInBand?
- Не помогло. А если имелось ввиду пошагово пройтись - у меня не получается в режиме дебага установить коннект к ораклу, так что не вариант.

Main message:
Удаление сделай без промис алл а через фор и сам метод чекни удаления, возможно он не ждёт выполнения запроса

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Удаление сделай без промис алл а через фор и сам метод чекни удаления, возможно он не ждёт выполнения запроса

--

## My telegram message #173977
**Time:** 26.07.2022 12:57:40 UTC+05:00
**Link:** https://t.me/nest_ru/173977

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- --runInBand?
- Не помогло. А если имелось ввиду пошагово пройтись - у меня не получается в режиме дебага установить коннект к ораклу, так что не вариант.
- Удаление сделай без промис алл а через фор и сам метод чекни удаления, возможно он не ждёт выполнения запроса
- Удаление через for делал. Я о нем написал в первом примере(варианты 1 и 2). Именно благодаря for я выяснил что валится по причине закрытия пула(в promise.all ошибки не возвращаются:)). Метод ждет удаления.  public async personsDel(personId: number): Promise<boolean> { const sql = " \ BEGIN \ SI_PERSONS_PKG.SI_PERSONS_DEL( \ num_N_SUBJECT_ID => :subjectId \ ); \ END; "; const params = { subjectId: personId }; return this.oracle.simpleQueryWithoutRes(sql, params); }

Main message:
В модуль дестрой поставь лог на вход и выход Перед апп клоз и после поставь лог Перед клозом жди 10 сек и после 10 и логами обложи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В модуль дестрой поставь лог на вход и выход Перед апп клоз и после поставь лог Перед клозом жди 10 сек и после 10 и логами обложи

--

## My telegram message #173986
**Time:** 26.07.2022 13:11:04 UTC+05:00
**Link:** https://t.me/nest_ru/173986

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Удаление сделай без промис алл а через фор и сам метод чекни удаления, возможно он не ждёт выполнения запроса
- Удаление через for делал. Я о нем написал в первом примере(варианты 1 и 2). Именно благодаря for я выяснил что валится по причине закрытия пула(в promise.all ошибки не возвращаются:)). Метод ждет удаления.  public async personsDel(personId: number): Promise<boolean> { const sql = " \ BEGIN \ SI_PERSONS_PKG.SI_PERSONS_DEL( \ num_N_SUBJECT_ID => :subjectId \ ); \ END; "; const params = { subjectId: personId }; return this.oracle.simpleQueryWithoutRes(sql, params); }
- В модуль дестрой поставь лог на вход и выход Перед апп клоз и после поставь лог Перед клозом жди 10 сек и после 10 и логами обложи
- Так и есть. Только я не совсем понимаю как я мог его добавить 2 раза.  @Global() @Module({ providers: [OracleService], exports: [OracleService] }) export class OracleModule {} @Injectable() export class OracleService implements OnModuleDestroy, OnModuleInit {} @Injectable() export class SiPersonsPkgRepository { constructor( private readonly oracle: OracleService ) { } }

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #173991
**Time:** 26.07.2022 13:12:03 UTC+05:00
**Link:** https://t.me/nest_ru/173991

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Так и есть. Только я не совсем понимаю как я мог его добавить 2 раза.  @Global() @Module({ providers: [OracleService], exports: [OracleService] }) export class OracleModule {} @Injectable() export class OracleService implements OnModuleDestroy, OnModuleInit {} @Injectable() export class SiPersonsPkgRepository { constructor( private readonly oracle: OracleService ) { } }
- )
- Воу не знал. Я просто из мира спринга перекатываюсь только второй месяц. Там с di проще.
- даже иногда?)

Main message:
forwardRef, Global, ConfigModule - вот этих слов в проекте не должно быть, надо линтер сделать)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

forwardRef, Global, ConfigModule - вот этих слов в проекте не должно быть, надо линтер сделать)

--

## My telegram message #173996
**Time:** 26.07.2022 13:13:08 UTC+05:00
**Link:** https://t.me/nest_ru/173996

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а как forwardRef тогда избегать? если сервисы друг от друга зависят?

Main message:
третий сервис делай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

третий сервис делай

--

## My telegram message #173999
**Time:** 26.07.2022 13:13:31 UTC+05:00
**Link:** https://t.me/nest_ru/173999

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а что плохого в глобале и как с ним работать, если я его все таки добавил? Мне не нужно ничего инжектить?
- а как forwardRef тогда избегать? если сервисы друг от друга зависят?
- третий сервис делай
- который их в себя инджектит?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #174002
**Time:** 26.07.2022 13:16:04 UTC+05:00
**Link:** https://t.me/nest_ru/174002

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- который их в себя инджектит?
- да
- а методы просто ручками переписывать в него?
- ну это пример меня, не знающего нюансов. А как с ним работать, если он уже добавлен? Или я все правильно сделал, а он просто криво работает в этом фреймворке?

Main message:
я когда прихожу на проект начинаею эти слова выпиливать сразу, ну если разрешают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я когда прихожу на проект начинаею эти слова выпиливать сразу, ну если разрешают

--

## My telegram message #174006
**Time:** 26.07.2022 13:23:44 UTC+05:00
**Link:** https://t.me/nest_ru/174006

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а методы просто ручками переписывать в него?
- ну это пример меня, не знающего нюансов. А как с ним работать, если он уже добавлен? Или я все правильно сделал, а он просто криво работает в этом фреймворке?
- я когда прихожу на проект начинаею эти слова выпиливать сразу, ну если разрешают
- а есть пример репы с подобными практиками?

Main message:
не знаю, не искал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не знаю, не искал

--

## My telegram message #174011
**Time:** 26.07.2022 13:31:06 UTC+05:00
**Link:** https://t.me/nest_ru/174011

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Призма модуль?

Main message:
import { DynamicModule, Module } from '@nestjs/common' import { CustomInjectorModule } from 'nestjs-custom-injector' import { PrismaClientConfig, PRISMA_CLIENT_CONFIG, } from './prisma-client.config' import { PrismaClientService } from './prisma-client.service' import { PrismaClientBootstrapService } from './prisma-client-bootstrap.service' export * from '@prisma/client' @Module({ imports: [CustomInjectorModule], providers: [PrismaClientService], exports: [CustomInjectorModule, PrismaClientService], }) class PrismaClientModuleCore {} @Module({ imports: [PrismaClientModuleCore], exports: [PrismaClientModuleCore], }) export class PrismaClientModule { static forRoot(config: PrismaClientConfig): DynamicModule { return { module: PrismaClientModule, providers: [ { provide: PRISMA_CLIENT_CONFIG, useValue: { ...config, }, }, PrismaClientBootstrapService ], } } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

import { DynamicModule, Module } from '@nestjs/common' import { CustomInjectorModule } from 'nestjs-custom-injector' import { PrismaClientConfig, PRISMA_CLIENT_CONFIG, } from './prisma-client.config' import { PrismaClientService } from './prisma-client.service' import { PrismaClientBootstrapService } from './prisma-client-bootstrap.service' export * from '@prisma/client' @Module({ imports: [CustomInjectorModule], providers: [PrismaClientService], exports: [CustomInjectorModule, PrismaClientService], }) class PrismaClientModuleCore {} @Module({ imports: [PrismaClientModuleCore], exports: [PrismaClientModuleCore], }) export class PrismaClientModule { static forRoot(config: PrismaClientConfig): DynamicModule { return { module: PrismaClientModule, providers: [ { provide: PRISMA_CLIENT_CONFIG, useValue: { ...config, }, }, PrismaClientBootstrapService ], } } }

--

## My telegram message #174017
**Time:** 26.07.2022 13:33:09 UTC+05:00
**Link:** https://t.me/nest_ru/174017

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Делаешь, условынй awsServices
- Там весь проект это api к стороннему сервису. И куча модулей разнесенных относительно пакетов хранимых процедур оракла.
- Но с Ильшатом не спорю, если говорит, что глобал херня - значит херня)
- а с конфиг модулем что не так?

Main message:
Писал вроде много раз уже, сейчас на работе полный ад с ним

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Писал вроде много раз уже, сейчас на работе полный ад с ним

--

## My telegram message #174022
**Time:** 26.07.2022 13:34:15 UTC+05:00
**Link:** https://t.me/nest_ru/174022

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Но с Ильшатом не спорю, если говорит, что глобал херня - значит херня)
- а с конфиг модулем что не так?
- Писал вроде много раз уже, сейчас на работе полный ад с ним
- Он только для джунов

Main message:
по всему проекту размазаны получение значений из енва через конфиг сервис, вообще не знаешь что нужно софту а что нет, если еще это все завернуть в нпм либы то даже поиском по коду не найдешь все что нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по всему проекту размазаны получение значений из енва через конфиг сервис, вообще не знаешь что нужно софту а что нет, если еще это все завернуть в нпм либы то даже поиском по коду не найдешь все что нужно

--

## My telegram message #174024
**Time:** 26.07.2022 13:34:56 UTC+05:00
**Link:** https://t.me/nest_ru/174024

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Писал вроде много раз уже, сейчас на работе полный ад с ним
- Он только для джунов
- по всему проекту размазаны получение значений из енва через конфиг сервис, вообще не знаешь что нужно софту а что нет, если еще это все завернуть в нпм либы то даже поиском по коду не найдешь все что нужно
- так. Маленькое уточнение. Мы про паттерн или про встроенный в нест? Просто у меня самописный config module(даже автокомплит на типах ts посторил).

Main message:
вот так видно PrismaClientModule.forRoot({....params}) вот так не видно PrismaClientModule

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот так видно PrismaClientModule.forRoot({....params}) вот так не видно PrismaClientModule

--

## My telegram message #174028
**Time:** 26.07.2022 13:35:37 UTC+05:00
**Link:** https://t.me/nest_ru/174028

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Посути все равно будет глобал

Main message:
я только конфиг и хуки импорчу из одного места

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я только конфиг и хуки импорчу из одного места

--

## My telegram message #174030
**Time:** 26.07.2022 13:35:52 UTC+05:00
**Link:** https://t.me/nest_ru/174030

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я только конфиг и хуки импорчу из одного места

Main message:
а достаю только сервис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а достаю только сервис

--

## My telegram message #174036
**Time:** 26.07.2022 13:37:13 UTC+05:00
**Link:** https://t.me/nest_ru/174036

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
глобал он проникает по всюду, то что из него экспортится будет везде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

глобал он проникает по всюду, то что из него экспортится будет везде

--

## My telegram message #174039
**Time:** 26.07.2022 13:37:55 UTC+05:00
**Link:** https://t.me/nest_ru/174039

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а что за хуки?
- Да, но сервис вшит через модуль в самый рутовый модуль
- глобал он проникает по всюду, то что из него экспортится будет везде
- А, понял, то есть если я зарегаю в глобал модуле провайдер какой то, то он автоматом будет доступен везде?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #174042
**Time:** 26.07.2022 13:38:10 UTC+05:00
**Link:** https://t.me/nest_ru/174042

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- глобал он проникает по всюду, то что из него экспортится будет везде
- А, понял, то есть если я зарегаю в глобал модуле провайдер какой то, то он автоматом будет доступен везде?
- да
- Даж без экспорта?

Main message:
и люди его юзают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и люди его юзают

--

## My telegram message #174046
**Time:** 26.07.2022 13:38:37 UTC+05:00
**Link:** https://t.me/nest_ru/174046

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- и люди его юзают

Main message:
в итоге все связывается в проекте как спагети

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в итоге все связывается в проекте как спагети

--

## My telegram message #174049
**Time:** 26.07.2022 13:39:21 UTC+05:00
**Link:** https://t.me/nest_ru/174049

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а что такое хуки то? какая то другая реализация контроллера или сокетов?

Main message:
onModuleInit

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

onModuleInit

--

## My telegram message #174054
**Time:** 26.07.2022 13:39:43 UTC+05:00
**Link:** https://t.me/nest_ru/174054

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- useState

Main message:
реакт головного мозга)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

реакт головного мозга)

--

## My telegram message #174060
**Time:** 26.07.2022 13:41:51 UTC+05:00
**Link:** https://t.me/nest_ru/174060

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как? Бойлерплейтишь?)

Main message:
https://t.me/nest_ru/174011

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/174011

--

## My telegram message #174068
**Time:** 26.07.2022 13:52:11 UTC+05:00
**Link:** https://t.me/nest_ru/174068

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну такое
- Блин, а в официальной документации неста призма без forRoot вроде. Переделать чтоли..
- Смех) Над ним пишется оберточка маленькая и все отлично, он часть геморроя снимает
- У меня тож обертка написана

Main message:
ну если вы не ловили багов таких как я это не значит что не поймаете, я то в ангулар моудльный диай юзал сперва и тут продолжил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну если вы не ловили багов таких как я это не значит что не поймаете, я то в ангулар моудльный диай юзал сперва и тут продолжил

--

## My telegram message #174076
**Time:** 26.07.2022 13:53:21 UTC+05:00
**Link:** https://t.me/nest_ru/174076

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну если вы не ловили багов таких как я это не значит что не поймаете, я то в ангулар моудльный диай юзал сперва и тут продолжил
- Жалко вот на фронте так же красиво не сделать, там для NODE_ENV например желательно инлайнить process.env чтобы бандлер статически разбирал
- У нас парень с фронта есть один
- Ад

Main message:
просто попозже прийдете к этому всему, когда более сложные архитектурные штуки будете мутить ну и тестирование естественно помогает быстрее к такому прийти)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто попозже прийдете к этому всему, когда более сложные архитектурные штуки будете мутить ну и тестирование естественно помогает быстрее к такому прийти)

--

## My telegram message #174089
**Time:** 26.07.2022 14:00:39 UTC+05:00
**Link:** https://t.me/nest_ru/174089

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Подскажите как отловить эту ошибку. Не могу понять что надо. Пробовал и объект передавать и строку json'a не помогает. Причем не понятно что выдает сервис или контроллер

Main message:
Циркулярки в либе

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Циркулярки в либе

--

## My telegram message #174092
**Time:** 26.07.2022 14:01:14 UTC+05:00
**Link:** https://t.me/nest_ru/174092

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- всем привет, вопрос чуть не в тематику чата - google oauth, кто-то знает можно ли на данный момент создать новое приложение без модерации так, чтобы рефреш-токен не гуфился раз в 7 дней? или может другой какой-то хак есть, как это поправить. модерка не реагирует 2+ недели уже...
- Ну там как jquery, но менее «кейсозависимое» ну или другое слово, которое сложно подобрать
- Циркулярки в либе
- а победить это можно?

Main message:
Либу изучай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Либу изучай

--

## My telegram message #174095
**Time:** 26.07.2022 14:10:09 UTC+05:00
**Link:** https://t.me/nest_ru/174095

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а победить это можно?
- Либу изучай
- окау
- я именно глобал и конфиг сервис юзаю. Как быть теперь

Main message:
ну ты новичек, поиграться можно, когда сам наступишь на грабли и поймешь что причина была в них, можешь выпиливать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты новичек, поиграться можно, когда сам наступишь на грабли и поймешь что причина была в них, можешь выпиливать

--

## My telegram message #174117
**Time:** 26.07.2022 14:18:45 UTC+05:00
**Link:** https://t.me/nest_ru/174117

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
руками маплю в нужный формат

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

руками маплю в нужный формат

--

## My telegram message #174132
**Time:** 26.07.2022 14:37:54 UTC+05:00
**Link:** https://t.me/nest_ru/174132

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- было бы логичнее, мне кажется, если бы это поле было опциональным, но все же присутствоавало
- Как то даж никогда не задумывался, что можно сделать как то иначе, не руками
- в нем же сразу сам описываешь тип, там все норм с этим
- @KaufmanEndy убрал для модуля оракла global. При старте приложения module init вызывается один раз. При старте тестов все равно два. У меня есть предположение что я как то неправильно получаю инстанс провайдера в beforeAll. Это случаем не второе создание инстанса?  beforeAll(async () => { const moduleFixture: TestingModule = await Test.createTestingModule( { imports: [AppModule], } ).compile(); app = moduleFixture.createNestApplication(); const config = app.get<MainConfigService>(MainConfigService); personsPkgRepository = app.get<SiPersonsPkgRepository>(SiPersonsPkgRepository); // <-- здесь второе создание инстанса? app.useGlobalPipes(new ValidationPipe({transform: true})); await app.listen(config.get('port')); await app.init(); });

Main message:
модуль в котором сервис с хуком, в скольки местах импортится?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модуль в котором сервис с хуком, в скольки местах импортится?

--

## My telegram message #174136
**Time:** 26.07.2022 14:39:40 UTC+05:00
**Link:** https://t.me/nest_ru/174136

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в нем же сразу сам описываешь тип, там все норм с этим
- @KaufmanEndy убрал для модуля оракла global. При старте приложения module init вызывается один раз. При старте тестов все равно два. У меня есть предположение что я как то неправильно получаю инстанс провайдера в beforeAll. Это случаем не второе создание инстанса?  beforeAll(async () => { const moduleFixture: TestingModule = await Test.createTestingModule( { imports: [AppModule], } ).compile(); app = moduleFixture.createNestApplication(); const config = app.get<MainConfigService>(MainConfigService); personsPkgRepository = app.get<SiPersonsPkgRepository>(SiPersonsPkgRepository); // <-- здесь второе создание инстанса? app.useGlobalPipes(new ValidationPipe({transform: true})); await app.listen(config.get('port')); await app.init(); });
- модуль в котором сервис с хуком, в скольки местах импортится?
- во всех остальных

Main message:
через мою поделку custom-injector

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через мою поделку custom-injector

--

## My telegram message #174138
**Time:** 26.07.2022 14:43:04 UTC+05:00
**Link:** https://t.me/nest_ru/174138

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- модуль в котором сервис с хуком, в скольки местах импортится?
- во всех остальных
- через мою поделку custom-injector
- звучит как какие то лютые костыли. Это реально так во всем фреймворке работает? И других вариантов нет?

Main message:
народ не пишет тесты и не парятся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

народ не пишет тесты и не парятся

--

## My telegram message #174140
**Time:** 26.07.2022 14:43:27 UTC+05:00
**Link:** https://t.me/nest_ru/174140

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- через мою поделку custom-injector
- звучит как какие то лютые костыли. Это реально так во всем фреймворке работает? И других вариантов нет?
- народ не пишет тесты и не парятся
- Ильшат написал костыль)

Main message:
ага

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ага

--

## My telegram message #174142
**Time:** 26.07.2022 14:43:48 UTC+05:00
**Link:** https://t.me/nest_ru/174142

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- народ не пишет тесты и не парятся
- Ильшат написал костыль)
- ага
- ахах)

Main message:
я добавил функциональности ангулар диай в нест диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я добавил функциональности ангулар диай в нест диай

--

## My telegram message #174145
**Time:** 26.07.2022 14:44:30 UTC+05:00
**Link:** https://t.me/nest_ru/174145

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ахах)
- я добавил функциональности ангулар диай в нест диай
- я ж без претензий. Просто после спринга - это все ужасно выглядит на уровне инструмента. Уже жалею что подписался на это...
- А чё в спринге?

Main message:
у спринга нет модульного диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у спринга нет модульного диай

--

## My telegram message #174147
**Time:** 26.07.2022 14:44:38 UTC+05:00
**Link:** https://t.me/nest_ru/174147

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я ж без претензий. Просто после спринга - это все ужасно выглядит на уровне инструмента. Уже жалею что подписался на это...
- А чё в спринге?
- у спринга нет модульного диай
- Там нет воли мысли

Main message:
там плоский диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там плоский диай

--

## My telegram message #174154
**Time:** 26.07.2022 14:45:09 UTC+05:00
**Link:** https://t.me/nest_ru/174154

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- куда хош туда и инжекти любой сервис

Main message:
да там тоже каша своя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да там тоже каша своя

--

## My telegram message #174157
**Time:** 26.07.2022 14:46:41 UTC+05:00
**Link:** https://t.me/nest_ru/174157

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- куда хош туда и инжекти любой сервис
- Что хочешь, то и юзай
- да там тоже каша своя
- там каждая папка - пакет. Тебе никто не запрещает побить все пакетами, так же как в Nest.

Main message:
а диай?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а диай?

--

## My telegram message #174160
**Time:** 26.07.2022 14:46:55 UTC+05:00
**Link:** https://t.me/nest_ru/174160

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да там тоже каша своя
- там каждая папка - пакет. Тебе никто не запрещает побить все пакетами, так же как в Nest.
- а диай?
- ну он плоский

Main message:
ну вот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну вот

--

## My telegram message #174162
**Time:** 26.07.2022 14:46:59 UTC+05:00
**Link:** https://t.me/nest_ru/174162

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а диай?
- ну он плоский
- ну вот
- но я не вижу в этом проблемы

Main message:
мне это не нравилось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне это не нравилось

--

## My telegram message #174164
**Time:** 26.07.2022 14:47:09 UTC+05:00
**Link:** https://t.me/nest_ru/174164

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну вот
- но я не вижу в этом проблемы
- мне это не нравилось
- это наоборот даже удобнее

Main message:
у меня ветвятся зависимости

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня ветвятся зависимости

--

## My telegram message #174167
**Time:** 26.07.2022 14:47:47 UTC+05:00
**Link:** https://t.me/nest_ru/174167

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мне это не нравилось
- это наоборот даже удобнее
- у меня ветвятся зависимости
- кстати, у вас есть примеры на unit и e2e тесты?

Main message:
с верху кинули к1 и он 4 модулях упал как к1 в 3 как к2 и в 6 как к4

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с верху кинули к1 и он 4 модулях упал как к1 в 3 как к2 и в 6 как к4

--

## My telegram message #174171
**Time:** 26.07.2022 14:48:26 UTC+05:00
**Link:** https://t.me/nest_ru/174171

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это наоборот даже удобнее

Main message:
вообщем то что хочешь шарить сделай глобалом, остальное нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вообщем то что хочешь шарить сделай глобалом, остальное нет

--

## My telegram message #174180
**Time:** 26.07.2022 14:50:29 UTC+05:00
**Link:** https://t.me/nest_ru/174180

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- так глобалом оно и было изначально. Могу вернуть. Но тогда мы вернулись к началу - почему во время тестов модуль оракла дважды инициализируется?

Main message:
у тебя хук срабатывает в разных местах в абсолюьно любом модуле может сработатть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя хук срабатывает в разных местах в абсолюьно любом модуле может сработатть

--

## My telegram message #174184
**Time:** 26.07.2022 14:51:51 UTC+05:00
**Link:** https://t.me/nest_ru/174184

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- На выходных можешь написать, пошарю код
- впрочем и без глобала тоже
- у тебя хук срабатывает в разных местах в абсолюьно любом модуле может сработатть
- То что здесь стрелкой указано - не еще один инстанс провайдера?

Main message:
в несте можно создать импорт модуля два раза

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в несте можно создать импорт модуля два раза

--

## My telegram message #174187
**Time:** 26.07.2022 14:52:19 UTC+05:00
**Link:** https://t.me/nest_ru/174187

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
и это будут разные модули

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и это будут разные модули

--

## My telegram message #174192
**Time:** 26.07.2022 14:53:25 UTC+05:00
**Link:** https://t.me/nest_ru/174192

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в несте можно создать импорт модуля два раза
- почему он тогда при старте приложения только один раз вызывается?
- и это будут разные модули
- так я так и написал в этом сообщении

Main message:
она касячит иногда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

она касячит иногда

--

## My telegram message #174194
**Time:** 26.07.2022 14:53:58 UTC+05:00
**Link:** https://t.me/nest_ru/174194

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- почему он тогда при старте приложения только один раз вызывается?

Main message:
ты глянул лог именно в приложении?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты глянул лог именно в приложении?

--

## My telegram message #174198
**Time:** 26.07.2022 14:54:19 UTC+05:00
**Link:** https://t.me/nest_ru/174198

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- она касячит иногда
- так у меня ни разу не отработал нормально
- ты глянул лог именно в приложении?
- это проблема постоянная

Main message:
ну это круто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну это круто

--

## My telegram message #174200
**Time:** 26.07.2022 14:54:53 UTC+05:00
**Link:** https://t.me/nest_ru/174200

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты глянул лог именно в приложении?
- это проблема постоянная
- ну это круто
- в тестах 2 стабильно

Main message:
ну я делаю так как описал и у меня везде все норм)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну я делаю так как описал и у меня везде все норм)

--

## My telegram message #174206
**Time:** 26.07.2022 15:00:00 UTC+05:00
**Link:** https://t.me/nest_ru/174206

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну это круто
- в тестах 2 стабильно
- ну я делаю так как описал и у меня везде все норм)
- ну окей. Я добавляю импорт оракловского модуля в app. Как мне получить провайдера из этого модуля в другом модуле?

Main message:
Без кастом инжектора, нужно сервис юзать общий

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Без кастом инжектора, нужно сервис юзать общий

--

## My telegram message #174211
**Time:** 26.07.2022 15:05:56 UTC+05:00
**Link:** https://t.me/nest_ru/174211

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я не понимаю что значит общий. У меня есть модуль и провайдер oracle, и есть, например, модуль accounts, в котором много провайдеров(репозиториев), использующих провайдера oracle, для коннекта к базе. И таких модулей, как accounts, штук 20 в проекте. Что за промежуточный сервис мне нужен? А еще я не понимаю зачем? В инете везде пишут что провайдеры - синглтон по умолчанию. Так почему я не могу этот инстанс oracle, созданный при старте приложения, передать другим сервисам?

Main message:
У тебя то что в апп создаешь живёт паралельно тому где юзаешь, соседние ветки дерева

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тебя то что в апп создаешь живёт паралельно тому где юзаешь, соседние ветки дерева

--

## My telegram message #174214
**Time:** 26.07.2022 15:08:28 UTC+05:00
**Link:** https://t.me/nest_ru/174214

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я не понимаю что значит общий. У меня есть модуль и провайдер oracle, и есть, например, модуль accounts, в котором много провайдеров(репозиториев), использующих провайдера oracle, для коннекта к базе. И таких модулей, как accounts, штук 20 в проекте. Что за промежуточный сервис мне нужен? А еще я не понимаю зачем? В инете везде пишут что провайдеры - синглтон по умолчанию. Так почему я не могу этот инстанс oracle, созданный при старте приложения, передать другим сервисам?
- Есть те, кто шарит за typeorm? Есть очень интересный вопрос.
- У тебя то что в апп создаешь живёт паралельно тому где юзаешь, соседние ветки дерева
- так почему тогда у меня нет этих десятков параллельных инстансов при обычном старте приложения?

Main message:
модуль один раз импортнулся и дальше этот же инстанс модуля юзается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модуль один раз импортнулся и дальше этот же инстанс модуля юзается

--

## My telegram message #174224
**Time:** 26.07.2022 15:10:29 UTC+05:00
**Link:** https://t.me/nest_ru/174224

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У тебя то что в апп создаешь живёт паралельно тому где юзаешь, соседние ветки дерева
- так почему тогда у меня нет этих десятков параллельных инстансов при обычном старте приложения?
- модуль один раз импортнулся и дальше этот же инстанс модуля юзается
- Я могу привести тебе пример. Если я инжекчу в сторонние модули помимо модуля oracle еще и провайдера oracle - он реально создается(пытается во всяком случае) для каждого импорта. И оракл шлет мое приложение лесом, потому что у меня пул подключений один, он с алиасом и такой алиас уже занят. Но если не инжектить провайдеры, а только сам модуль - все нормально отрабатывает и я обращаюсь к инстансу синглтона, созданному при старте приложения.

Main message:
лан конфиг оставь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лан конфиг оставь

--

## My telegram message #174226
**Time:** 26.07.2022 15:10:46 UTC+05:00
**Link:** https://t.me/nest_ru/174226

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- модуль один раз импортнулся и дальше этот же инстанс модуля юзается
- Я могу привести тебе пример. Если я инжекчу в сторонние модули помимо модуля oracle еще и провайдера oracle - он реально создается(пытается во всяком случае) для каждого импорта. И оракл шлет мое приложение лесом, потому что у меня пул подключений один, он с алиасом и такой алиас уже занят. Но если не инжектить провайдеры, а только сам модуль - все нормально отрабатывает и я обращаюсь к инстансу синглтона, созданному при старте приложения.
- лан конфиг оставь
- но конфиг естественно базу не использует

Main message:
https://github.com/EndyKaufman/nestjs-translates/blob/develop/libs/nestjs-translates/src/lib/nestjs-translates.module.ts вот простой пример

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/EndyKaufman/nestjs-translates/blob/develop/libs/nestjs-translates/src/lib/nestjs-translates.module.ts вот простой пример

--

## My telegram message #174232
**Time:** 26.07.2022 15:18:11 UTC+05:00
**Link:** https://t.me/nest_ru/174232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- но конфиг естественно базу не использует
- https://github.com/EndyKaufman/nestjs-translates/blob/develop/libs/nestjs-translates/src/lib/nestjs-translates.module.ts вот простой пример
- Это ты все еще про свой кастом инжектор рассказываешь. А я пытаюсь понять как запустить тесты без него.
- Всем привет. Подскажите по RabbitMQ: -Есть монолит, который как паблишер шлет сообщение в очередь RMQ; -Есть микросервис, который слушает очередь и потом выполняет "дорогостоящие" операции. Вопрос следующий: как микросервису по завершению процесса отправить результат этого процесса паблишеру? На сколько я понимаю это параметр "Message acknowledgement" должен быть в ручном режиме, но в таком случае я не понимаю как захендлить этот процесс в паблишере, если lifecycle метода паблишера окончен как только я отправил нужные данные в очередь. Как реализовать некую подписку паблишере? Всем спасибо и хорошего дня.

Main message:
это я показываю как сделать через нест way

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это я показываю как сделать через нест way

--

## My telegram message #174240
**Time:** 26.07.2022 15:33:39 UTC+05:00
**Link:** https://t.me/nest_ru/174240

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет. Подскажите по RabbitMQ: -Есть монолит, который как паблишер шлет сообщение в очередь RMQ; -Есть микросервис, который слушает очередь и потом выполняет "дорогостоящие" операции. Вопрос следующий: как микросервису по завершению процесса отправить результат этого процесса паблишеру? На сколько я понимаю это параметр "Message acknowledgement" должен быть в ручном режиме, но в таком случае я не понимаю как захендлить этот процесс в паблишере, если lifecycle метода паблишера окончен как только я отправил нужные данные в очередь. Как реализовать некую подписку паблишере? Всем спасибо и хорошего дня.
- это я показываю как сделать через нест way
- mc1 => event to mc2 => mc2 process operation => event to mc1
- то есть по твоему проблема с двойной инициализацией модуля oracle заключается в глобальном модуле config?

Main message:
нет, потомучто у тебя модуль инит может срабатывать в любом модуле

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет, потомучто у тебя модуль инит может срабатывать в любом модуле

--

## My telegram message #174249
**Time:** 26.07.2022 15:53:57 UTC+05:00
**Link:** https://t.me/nest_ru/174249

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- mc1 => event to mc2 => mc2 process operation => event to mc1
- то есть по твоему проблема с двойной инициализацией модуля oracle заключается в глобальном модуле config?
- нет, потомучто у тебя модуль инит может срабатывать в любом модуле
- 1) То что у меня в app.module.ts import OracleModule прописан - это верно? 2) То что у меня в person.module.ts import OracleModule прописан - это верно? 3) То что в person.module.ts есть 2 провайдера(SiPersonsPkgRepository и SiVPersonsPrivateRepository) инжектящих OracleService - это верно?  @Module( { controllers: [ PersonController ], providers: [ PersonService, DataPersonService, SiPersonsPkgRepository, SiVPersonsPrivateRepository ], imports: [ OracleModule ], exports: [ DataPersonService ] } ) export class PersonModule {} @Module( { imports: [ LoggerModule.forRoot( { pinoHttp: { transport: { target: 'pino-pretty', options: { colorize: true, levelFirst: true, translateTime: 'SYS:mm/dd/yyyy, h:MM:ss TT Z o' } } } } ), CommonModule, ConfigModule.forRoot( { isGlobal: true, load: [configuration], } ), OracleModule, PersonModule ], providers: [ ], exports: [ ], controllers: [ ], } ) export class AppModule { } @Injectable() export class SiPersonsPkgRepository { constructor( private readonly oracle: OracleService ) { } } @Injectable() export class SiVPersonsPrivateRepository { constructor( private readonly oracle: OracleService ) { } }

Main message:
в апп не нужен

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в апп не нужен

--

## My telegram message #174252
**Time:** 26.07.2022 15:59:06 UTC+05:00
**Link:** https://t.me/nest_ru/174252

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- нет, потомучто у тебя модуль инит может срабатывать в любом модуле
- 1) То что у меня в app.module.ts import OracleModule прописан - это верно? 2) То что у меня в person.module.ts import OracleModule прописан - это верно? 3) То что в person.module.ts есть 2 провайдера(SiPersonsPkgRepository и SiVPersonsPrivateRepository) инжектящих OracleService - это верно?  @Module( { controllers: [ PersonController ], providers: [ PersonService, DataPersonService, SiPersonsPkgRepository, SiVPersonsPrivateRepository ], imports: [ OracleModule ], exports: [ DataPersonService ] } ) export class PersonModule {} @Module( { imports: [ LoggerModule.forRoot( { pinoHttp: { transport: { target: 'pino-pretty', options: { colorize: true, levelFirst: true, translateTime: 'SYS:mm/dd/yyyy, h:MM:ss TT Z o' } } } } ), CommonModule, ConfigModule.forRoot( { isGlobal: true, load: [configuration], } ), OracleModule, PersonModule ], providers: [ ], exports: [ ], controllers: [ ], } ) export class AppModule { } @Injectable() export class SiPersonsPkgRepository { constructor( private readonly oracle: OracleService ) { } } @Injectable() export class SiVPersonsPrivateRepository { constructor( private readonly oracle: OracleService ) { } }
- в апп не нужен
- Там больше ничего нет. Это максимально простое приложение дергающее из базы готовые процедуры, или строящее голые sql запросы. Модули не вызывают друг друга по большей части. И тестируемый модуль persons уж точно ничего не вызывает. Ты видишь это по импортам.

Main message:
) ты уже импортнул в другой модуль его

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) ты уже импортнул в другой модуль его

--

## My telegram message #174254
**Time:** 26.07.2022 16:01:43 UTC+05:00
**Link:** https://t.me/nest_ru/174254

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в апп не нужен
- Там больше ничего нет. Это максимально простое приложение дергающее из базы готовые процедуры, или строящее голые sql запросы. Модули не вызывают друг друга по большей части. И тестируемый модуль persons уж точно ничего не вызывает. Ты видишь это по импортам.
- ) ты уже импортнул в другой модуль его
- и что не так?

Main message:
не нужно все пихать в апп модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не нужно все пихать в апп модуль

--

## My telegram message #174257
**Time:** 26.07.2022 16:04:12 UTC+05:00
**Link:** https://t.me/nest_ru/174257

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ты реализовывал lazy loading модулей?

Main message:
динамику давно както пробывал, ответ скорее нет чем да)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

динамику давно както пробывал, ответ скорее нет чем да)

--

## My telegram message #174261
**Time:** 26.07.2022 16:09:03 UTC+05:00
**Link:** https://t.me/nest_ru/174261

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ты реализовывал lazy loading модулей?
- Где тогда должны быть импорты модулей и провайдеров, чтобы выполнить твое условие из этого сообщения?
- динамику давно както пробывал, ответ скорее нет чем да)
- убрал из app - не изменило ничего. Все так же 2 onModuleInit.

Main message:
😀

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

😀

--

## My telegram message #174263
**Time:** 26.07.2022 16:11:57 UTC+05:00
**Link:** https://t.me/nest_ru/174263

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- динамику давно както пробывал, ответ скорее нет чем да)
- убрал из app - не изменило ничего. Все так же 2 onModuleInit.
- 😀
- forRoot, о котором ты говорил, позволяет динамически конфигурировать модуль при иницализации. Мне не нужно конфигурировать модуль базы. Мне просто нужен синглтон :(

Main message:
как не нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как не нужно

--

## My telegram message #174269
**Time:** 26.07.2022 16:23:49 UTC+05:00
**Link:** https://t.me/nest_ru/174269

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 😀
- forRoot, о котором ты говорил, позволяет динамически конфигурировать модуль при иницализации. Мне не нужно конфигурировать модуль базы. Мне просто нужен синглтон :(
- как не нужно
- Так и делаю

Main message:
выпили конфиг модуль сделай как в примере у меня с переводами выше

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

выпили конфиг модуль сделай как в примере у меня с переводами выше

--

## My telegram message #174271
**Time:** 26.07.2022 16:24:49 UTC+05:00
**Link:** https://t.me/nest_ru/174271

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так и делаю

Main message:
так как конфиг модуль глобальный, то модуль в который он заимпорчен тоже становится почти глобальным

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так как конфиг модуль глобальный, то модуль в который он заимпорчен тоже становится почти глобальным

--

## My telegram message #174274
**Time:** 26.07.2022 16:28:26 UTC+05:00
**Link:** https://t.me/nest_ru/174274

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- выпили конфиг модуль сделай как в примере у меня с переводами выше
- Фонд цитат разработчиков nodejs
- так как конфиг модуль глобальный, то модуль в который он заимпорчен тоже становится почти глобальным
- легче дать ссылку)  https://12factor.net/ru/config

Main message:
надо когда нить почитать эти ваши книжки по информатике, можно в людей кидать цитатами птом и не рассказывать истории из моей жизни)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

надо когда нить почитать эти ваши книжки по информатике, можно в людей кидать цитатами птом и не рассказывать истории из моей жизни)

--

## My telegram message #174276
**Time:** 26.07.2022 16:30:21 UTC+05:00
**Link:** https://t.me/nest_ru/174276

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- так как конфиг модуль глобальный, то модуль в который он заимпорчен тоже становится почти глобальным
- легче дать ссылку)  https://12factor.net/ru/config
- надо когда нить почитать эти ваши книжки по информатике, можно в людей кидать цитатами птом и не рассказывать истории из моей жизни)
- А какой смысл тогда иметь глобальные модули, если их нельзя использовать?

Main message:
чтобы новички легко вкатывались в нест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чтобы новички легко вкатывались в нест

--

## My telegram message #174281
**Time:** 26.07.2022 16:31:42 UTC+05:00
**Link:** https://t.me/nest_ru/174281

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Понял:) ну выкатываться без тестов - такое себе:)

Main message:
в жс мире тесты в основном не пишут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в жс мире тесты в основном не пишут

--

## My telegram message #174283
**Time:** 26.07.2022 16:33:20 UTC+05:00
**Link:** https://t.me/nest_ru/174283

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
нет тестов - нет проблем с диай, тоесть проблемы есть просто люди не видят их так как нет тестов, а то что в несте это не сразу видно этот баг это уже другая история, ну это точно баг, поведение в тестах как раз правильное, а в несте не правильное

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет тестов - нет проблем с диай, тоесть проблемы есть просто люди не видят их так как нет тестов, а то что в несте это не сразу видно этот баг это уже другая история, ну это точно баг, поведение в тестах как раз правильное, а в несте не правильное

--

## My telegram message #174288
**Time:** 26.07.2022 16:56:40 UTC+05:00
**Link:** https://t.me/nest_ru/174288

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в жс мире тесты в основном не пишут
- это не только в мире js
- нет тестов - нет проблем с диай, тоесть проблемы есть просто люди не видят их так как нет тестов, а то что в несте это не сразу видно этот баг это уже другая история, ну это точно баг, поведение в тестах как раз правильное, а в несте не правильное
- Ребят, подскажите как правильно работать с entity (typeorm) на монолите и на микросервисе? Как-то не красиво entity хранить и там и там. Но если она нужна в обоих случаях? (Одна база)

Main message:
nx - libs/dao -  @org_name /dao просто - вынести в нпм пакет  @org_name /dao git - юзать саб трии или саб модули

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

nx - libs/dao -  @org_name /dao просто - вынести в нпм пакет  @org_name /dao git - юзать саб трии или саб модули

--

## My telegram message #174292
**Time:** 26.07.2022 17:25:39 UTC+05:00
**Link:** https://t.me/nest_ru/174292

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Заметил, что  @UseGuards(CustomGuard) создает каждый раз новый инстанс гарда. (Если несколько UseGuards в одном файле, то создаст один раз на файл). Это же неправильно? Можно как-то один раз инициализовать гард и потом его использовать? Пробовал запихнуть гард в модуль и подключать этот модуль, но все равно создаются инстансы гарда

Main message:
APP_GUARDS or useGlobal

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

APP_GUARDS or useGlobal

--

## My telegram message #174294
**Time:** 26.07.2022 17:27:09 UTC+05:00
**Link:** https://t.me/nest_ru/174294

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Library создай с таблицами
- Заметил, что  @UseGuards(CustomGuard) создает каждый раз новый инстанс гарда. (Если несколько UseGuards в одном файле, то создаст один раз на файл). Это же неправильно? Можно как-то один раз инициализовать гард и потом его использовать? Пробовал запихнуть гард в модуль и подключать этот модуль, но все равно создаются инстансы гарда
- APP_GUARDS or useGlobal
- Так это глобальный гард который на каждый роут будет? Или нет?

Main message:
на каждый

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на каждый

--

## My telegram message #174297
**Time:** 26.07.2022 17:28:54 UTC+05:00
**Link:** https://t.me/nest_ru/174297

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- APP_GUARDS or useGlobal
- Так это глобальный гард который на каждый роут будет? Или нет?
- на каждый
- А мне надо выборочно на некоторые роуты. Но мне кажется создание инстансов этого гарда каждый раз это неправильным

Main message:
в апп модуль попробуй в провайдеры его запихать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в апп модуль попробуй в провайдеры его запихать

--

## My telegram message #174301
**Time:** 26.07.2022 17:31:22 UTC+05:00
**Link:** https://t.me/nest_ru/174301

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- на каждый
- А мне надо выборочно на некоторые роуты. Но мне кажется создание инстансов этого гарда каждый раз это неправильным
- в апп модуль попробуй в провайдеры его запихать
- а как быть с роутами типа  /sign -in которые точно не будут авторизованы? Или просто optionalGuard, типа либо есть юзер либо null

Main message:
декоратор пишу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

декоратор пишу

--

## My telegram message #174306
**Time:** 26.07.2022 17:35:41 UTC+05:00
**Link:** https://t.me/nest_ru/174306

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а как быть с роутами типа  /sign -in которые точно не будут авторизованы? Или просто optionalGuard, типа либо есть юзер либо null
- декоратор пишу
- Понял, спасибо
- Обновил зависимости - не помогло. Я кстати неправильно прочитал. Я не импортил когфиг модуль. Только его провайдера. В любом случае, я убрал конфиг провайдера из оракла и прописал настройки напрямую. Толку 0. Те же 2 init'a

Main message:
в несте также?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в несте также?

--

## My telegram message #174309
**Time:** 26.07.2022 17:36:36 UTC+05:00
**Link:** https://t.me/nest_ru/174309

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Понял, спасибо
- Обновил зависимости - не помогло. Я кстати неправильно прочитал. Я не импортил когфиг модуль. Только его провайдера. В любом случае, я убрал конфиг провайдера из оракла и прописал настройки напрямую. Толку 0. Те же 2 init'a
- в несте также?
- да

Main message:
оракл покажи

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оракл покажи

--

## My telegram message #174316
**Time:** 26.07.2022 17:38:49 UTC+05:00
**Link:** https://t.me/nest_ru/174316

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в несте также?
- да
- оракл покажи
- ?

Main message:
проблема модуль инита который может сработать в любом место осталась же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

проблема модуль инита который может сработать в любом место осталась же

--

## My telegram message #174320
**Time:** 26.07.2022 17:39:19 UTC+05:00
**Link:** https://t.me/nest_ru/174320

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- оракл покажи
- ?
- проблема модуль инита который может сработать в любом место осталась же
- У меня нет хука на инит. Только на дестрой

Main message:
м

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

м

--

## My telegram message #174322
**Time:** 26.07.2022 17:39:52 UTC+05:00
**Link:** https://t.me/nest_ru/174322

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- проблема модуль инита который может сработать в любом место осталась же
- У меня нет хука на инит. Только на дестрой
- м
- инит добавлял только для лога, как ты просил

Main message:
не поможет апп бутстрап тогда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не поможет апп бутстрап тогда

--

## My telegram message #174329
**Time:** 26.07.2022 17:55:10 UTC+05:00
**Link:** https://t.me/nest_ru/174329

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- м
- инит добавлял только для лога, как ты просил
- не поможет апп бутстрап тогда
- @KaufmanEndy Мне кажется мы роем куда то не туда. Это проблема не архитектуры приложения, а тестов. Вот эта строка  app.get<SiPersonsPkgRepository>(SiPersonsPkgRepository); про которую я неоднократно спрашивал - по идее создает свой инстанс, помимо того что создает  await app.init();

Main message:
Не

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не

--

## My telegram message #174331
**Time:** 26.07.2022 17:55:17 UTC+05:00
**Link:** https://t.me/nest_ru/174331

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не поможет апп бутстрап тогда
- @KaufmanEndy Мне кажется мы роем куда то не туда. Это проблема не архитектуры приложения, а тестов. Вот эта строка  app.get<SiPersonsPkgRepository>(SiPersonsPkgRepository); про которую я неоднократно спрашивал - по идее создает свой инстанс, помимо того что создает  await app.init();
- Не
- beforeAll(async () => { const moduleFixture: TestingModule = await Test.createTestingModule( { imports: [AppModule], } ).compile(); app = moduleFixture.createNestApplication(); const config = app.get<MainConfigService>(MainConfigService); personsPkgRepository = app.get<SiPersonsPkgRepository>(SiPersonsPkgRepository); app.useGlobalPipes(new ValidationPipe({transform: true})); await app.listen(config.get('port')); await app.init(); });

Main message:
Она выдергивает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Она выдергивает

--

## My telegram message #174343
**Time:** 26.07.2022 18:00:27 UTC+05:00
**Link:** https://t.me/nest_ru/174343

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- beforeAll(async () => { const moduleFixture: TestingModule = await Test.createTestingModule( { imports: [AppModule], } ).compile(); app = moduleFixture.createNestApplication(); const config = app.get<MainConfigService>(MainConfigService); personsPkgRepository = app.get<SiPersonsPkgRepository>(SiPersonsPkgRepository); app.useGlobalPipes(new ValidationPipe({transform: true})); await app.listen(config.get('port')); await app.init(); });
- Она выдергивает
- нет
- Да и у меня приложение не стартануло бы, если бы я не выдернул нужный инстанс. А у меня все отрабатывает, только последние id созданные в describe не удаляются

Main message:
c listen ищу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

c listen ищу

--

## My telegram message #174345
**Time:** 26.07.2022 18:16:48 UTC+05:00
**Link:** https://t.me/nest_ru/174345

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да и у меня приложение не стартануло бы, если бы я не выдернул нужный инстанс. А у меня все отрабатывает, только последние id созданные в describe не удаляются

Main message:
У тя конекшен может прибивается этот

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У тя конекшен может прибивается этот

--

## My telegram message #174354
**Time:** 26.07.2022 18:28:42 UTC+05:00
**Link:** https://t.me/nest_ru/174354

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да и у меня приложение не стартануло бы, если бы я не выдернул нужный инстанс. А у меня все отрабатывает, только последние id созданные в describe не удаляются
- c listen ищу
- У тя конекшен может прибивается этот
- Забавно. Конструктор выполнился один раз, а init 2.

Main message:
а сколько раз дестрой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а сколько раз дестрой

--

## My telegram message #174356
**Time:** 26.07.2022 18:53:21 UTC+05:00
**Link:** https://t.me/nest_ru/174356

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У тя конекшен может прибивается этот
- Забавно. Конструктор выполнился один раз, а init 2.
- а сколько раз дестрой
- как ни странно - 0. Но он точно отрабатывает, потому что у меня сессии в оракле не подвисают.

Main message:
тайп орм за тебя может гасит конекшены

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тайп орм за тебя может гасит конекшены

--

## My telegram message #174363
**Time:** 26.07.2022 19:02:23 UTC+05:00
**Link:** https://t.me/nest_ru/174363

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Насколько правильно статус подписки засовывать в jwt? Время жизни 15 минут, в целом это некритично если юзер будет пользоваться полным функционалом еще 15 минут после окончания подписки. И плюс в том, что мне не надо на каждый запрос лезть в базу и проверять его статус. Но мб тут есть еще минусы?

Main message:
в редис кэш пихни

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в редис кэш пихни

--

## My telegram message #174365
**Time:** 26.07.2022 19:11:52 UTC+05:00
**Link:** https://t.me/nest_ru/174365

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- нет, потому что было время, когда я не использовал хуки и как раз была проблема с сессиями. Там помимо оракловских есть еще внутренние самого проприетарного проекта.  async onModuleDestroy(): Promise<void> { console.log('Oracle destroy start'); const sql = " \ BEGIN \ MAIN.CLEAR_CONTEXT(); \ // <----- закрытие внутренней сессии END; "; const establishedConnection = await this.connection; if (typeof establishedConnection !== 'boolean') { try { await establishedConnection.execute(sql); await getPool(this.POOL_ALIAS).close(2); this.logger.warn('Oracle connection and pool closed'); } catch (error) { this.logger.error(`Close error: ${error}`); } } console.log('Oracle destroy end'); }

Main message:
сделай как у меня в транслайте, все тоже самое конекшен будешь хранить просто в сервисе специальном ConnectionsService{mainConnection:Connection}

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сделай как у меня в транслайте, все тоже самое конекшен будешь хранить просто в сервисе специальном ConnectionsService{mainConnection:Connection}

--

## My telegram message #174367
**Time:** 26.07.2022 19:14:41 UTC+05:00
**Link:** https://t.me/nest_ru/174367

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в редис кэш пихни
- о, точно
- сделай как у меня в транслайте, все тоже самое конекшен будешь хранить просто в сервисе специальном ConnectionsService{mainConnection:Connection}
- @KaufmanEndy а ты когда работать успеваешь?)

Main message:
сейчас девопса много, пока билд идет или пайплайн я тут тусю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сейчас девопса много, пока билд идет или пайплайн я тут тусю

--

## My telegram message #174374
**Time:** 26.07.2022 19:25:00 UTC+05:00
**Link:** https://t.me/nest_ru/174374

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Проблемка интересная встала. Допустим есть некий модуль с динамическими провайдерами в forFeature. И вот есть некий модуль С, который импортирует модули А и Б, при этом в контексте модуля А и модуля Б импортируется наш модуль с forFeature с одинаковыми именами провайдеров. А потом мы хотим в тестах вытащить их модуля С провайдеры, чтобы замокать. Проблема тут в том, что модуль возвращает только провайдер из контекста одного из модулей, а провайдера фактически два, второй не замокать

Main message:
Здарова колега)  https://github.com/EndyKaufman/nestjs-custom-injector или сам через Discovery он внутри и юзается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Здарова колега)  https://github.com/EndyKaufman/nestjs-custom-injector или сам через Discovery он внутри и юзается

--

## My telegram message #174382
**Time:** 26.07.2022 19:57:05 UTC+05:00
**Link:** https://t.me/nest_ru/174382

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет. Решил Fastify подрубить вместо Express и столкнулся с такой инфой в доке: By default, Fastify listens only on the localhost  127.0.0.1 interface (read more). If you want to accept connections on other hosts, you should specify ' 0.0.0.0 ' in the listen() call Не могу понять че это значит на практике. Подскажите, пожалуйста.
- просто забей
- Ладушки, спасибо
- Блен, не совсем то. С инжектами проблем нет, проблема в том, что извлечь потом через module.get/module.resolve все динамические провайдеры, даже среди пересекающихся по providerKey

Main message:
Примеры дай что есть и что нужно дёрнуть, кажется понял но нужно убедиться

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Примеры дай что есть и что нужно дёрнуть, кажется понял но нужно убедиться

--

## My telegram message #174400
**Time:** 26.07.2022 20:17:24 UTC+05:00
**Link:** https://t.me/nest_ru/174400

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ладушки, спасибо
- Блен, не совсем то. С инжектами проблем нет, проблема в том, что извлечь потом через module.get/module.resolve все динамические провайдеры, даже среди пересекающихся по providerKey
- Примеры дай что есть и что нужно дёрнуть, кажется понял но нужно убедиться
- Хахахахахха

Main message:
Сорян

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Сорян

--

## My telegram message #174404
**Time:** 26.07.2022 20:53:50 UTC+05:00
**Link:** https://t.me/nest_ru/174404

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Например, есть в модуле А провайдер, который инжектит по  atmz.web.internal.auth.VerificationCodesService , а ещё точно такой же есть в контексте модуля Б. Далее оба модуля импортируются в модуль С. Теперь мы пишем интеграционки на модуль С и хотим замокать методы сервиса  atmz.web.internal.auth.VerificationCodesService , тока проблема в том, что фактически существует 2 инстанса этого сервиса в контексте модуля С, и чтобы замокать надо получить оба, но module.get возвращает только какой-то 1

Main message:
ну ты все провайдеры выдерни из диай и у всех мутируй метод

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты все провайдеры выдерни из диай и у всех мутируй метод

--

## My telegram message #174413
**Time:** 26.07.2022 21:32:31 UTC+05:00
**Link:** https://t.me/nest_ru/174413

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят подскажите а как лучше взять с джвт токена инфу и положить ее в реквест чтоб дергать где нужно потом?
- Bull не должен автоматически удалять данные из redis после выполнения задач?
- JwtStrategy посмотри, в доке неста есть пример
- Если заменить хук на onApplicationBootstrap - ситуация повторяется. То есть приложение тоже инициализируется дважды.

Main message:
модуля две штуки походу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модуля две штуки походу

--

## My telegram message #174416
**Time:** 26.07.2022 21:42:53 UTC+05:00
**Link:** https://t.me/nest_ru/174416

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- JwtStrategy посмотри, в доке неста есть пример
- Если заменить хук на onApplicationBootstrap - ситуация повторяется. То есть приложение тоже инициализируется дважды.
- модуля две штуки походу
- их не может быть 2. Вот поиск по всему проекту

Main message:
вотки ты forRoot и не парься

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вотки ты forRoot и не парься

--

## My telegram message #174419
**Time:** 26.07.2022 21:43:25 UTC+05:00
**Link:** https://t.me/nest_ru/174419

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- модуля две штуки походу
- их не может быть 2. Вот поиск по всему проекту
- вотки ты forRoot и не парься
- воткнул - не работает)

Main message:
не верю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не верю

--

## My telegram message #174454
**Time:** 27.07.2022 02:00:41 UTC+05:00
**Link:** https://t.me/nest_ru/174454

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет) видел твою статью по боту на телеграфjs, подскажи ты юзал сцены? Можно ли заходя в сцену передать какие либо данные?

Main message:
Не юзаю сцены, я свою реализацию для этого написал, чтобы телега не была целевой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не юзаю сцены, я свою реализацию для этого написал, чтобы телега не была целевой

--

## My telegram message #174539
**Time:** 27.07.2022 14:30:30 UTC+05:00
**Link:** https://t.me/nest_ru/174539

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет! Так проблема в том и была, что из DI не выдернуть разные инстансы провайдеров, которые лежат по одному ключу в разных контекстах модулей импортированных) В итоге решил проблему кешированием ссылок на сбилженные провайдеры, чтобы по одному имени всегда возвращать тот же самый инстанс, а на стороне тестов просто достаю все эти ссылки через module.get(providerKey, { strict: false}), чтобы вне контекста в любом случае получить ссылку на провайдер конкретный и уже его мокать спокойно

Main message:
как не выдернуть то, я со всех модулей выдергиваю все провайдеры вообще, и даже по одному токену когда они идут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как не выдернуть то, я со всех модулей выдергиваю все провайдеры вообще, и даже по одному токену когда они идут

--

## My telegram message #174541
**Time:** 27.07.2022 14:32:22 UTC+05:00
**Link:** https://t.me/nest_ru/174541

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо большое, заработало)
- Привет! Так проблема в том и была, что из DI не выдернуть разные инстансы провайдеров, которые лежат по одному ключу в разных контекстах модулей импортированных) В итоге решил проблему кешированием ссылок на сбилженные провайдеры, чтобы по одному имени всегда возвращать тот же самый инстанс, а на стороне тестов просто достаю все эти ссылки через module.get(providerKey, { strict: false}), чтобы вне контекста в любом случае получить ссылку на провайдер конкретный и уже его мокать спокойно
- как не выдернуть то, я со всех модулей выдергиваю все провайдеры вообще, и даже по одному токену когда они идут
- Ну вот у тебя есть условный AppModule, который содержит модули А, Б и С. каждый из которых внутри себя по токену 'E' содержит разные инстансы провайдера. Как имея на руках только модуль AppModule получить ссылки на все 3 инстанса провайдера по одному ключу Е?

Main message:
через DiscoveryModule

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через DiscoveryModule

--

## My telegram message #174548
**Time:** 27.07.2022 14:35:35 UTC+05:00
**Link:** https://t.me/nest_ru/174548

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну вот у тебя есть условный AppModule, который содержит модули А, Б и С. каждый из которых внутри себя по токену 'E' содержит разные инстансы провайдера. Как имея на руках только модуль AppModule получить ссылки на все 3 инстанса провайдера по одному ключу Е?
- через DiscoveryModule
- Пример кода, пожалуйста) Понимать кто чей не надо, а вот есть у тебя  let module = Test.createTestingModule({...blablabla}).compile(); Что надо дёрнуть у module, чтобы выдернуть все провайдеры по одному ключу?
- https://github.com/nestjs/nest/blob/master/packages/core/discovery/discovery-service.ts - вот этот?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #174550
**Time:** 27.07.2022 14:36:35 UTC+05:00
**Link:** https://t.me/nest_ru/174550

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Пример кода, пожалуйста) Понимать кто чей не надо, а вот есть у тебя  let module = Test.createTestingModule({...blablabla}).compile(); Что надо дёрнуть у module, чтобы выдернуть все провайдеры по одному ключу?
- https://github.com/nestjs/nest/blob/master/packages/core/discovery/discovery-service.ts - вот этот?
- да
- Ага, а так уже интереснее) А чтобы фильтрануть по "токену" надо проверять на  component.name ?

Main message:
да у меня есть там пример

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да у меня есть там пример

--

## My telegram message #174552
**Time:** 27.07.2022 14:37:18 UTC+05:00
**Link:** https://t.me/nest_ru/174552

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да
- Ага, а так уже интереснее) А чтобы фильтрануть по "токену" надо проверять на  component.name ?
- да у меня есть там пример
- А, у него и свойство token имеется. Хм, а это прикольно, надо будет попробовать) Спасибо!

Main message:
там разные способы для разных типов провайдеров, с абстрактом не вышло я просто зацепился за слово abstract

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там разные способы для разных типов провайдеров, с абстрактом не вышло я просто зацепился за слово abstract

--

## My telegram message #174556
**Time:** 27.07.2022 14:44:18 UTC+05:00
**Link:** https://t.me/nest_ru/174556

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да у меня есть там пример
- А, у него и свойство token имеется. Хм, а это прикольно, надо будет попробовать) Спасибо!
- там разные способы для разных типов провайдеров, с абстрактом не вышло я просто зацепился за слово abstract
- Не, у нас табу на либы, которые можно написать самим :)

Main message:
я помню, первую версию я из дома туда и затащил же тогда еще)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я помню, первую версию я из дома туда и затащил же тогда еще)

--

## My telegram message #174568
**Time:** 27.07.2022 16:42:14 UTC+05:00
**Link:** https://t.me/nest_ru/174568

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, в коде нет циклической зависимости, я использую файлы о бочонках (то есть index.ts), я думаю, что это вызывает ошибки, как показано ниже:  Error: Nest can't resolve dependencies of the CommentService (?, ...otherInjections.... ). Please make sure that the argument at index [0] is available in the AppModule context.  Кто знает, как использовать файлы index.ts для очистки кода при импорте выше каждого файла? Я использую этот index.ts, который экспортирует внутри него множество файлов, как в следующем примере:  export * from './file1' export * from './file2' .... export * from './fileN'

Main message:
лучше не использовать такие файлы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше не использовать такие файлы

--

## My telegram message #174576
**Time:** 27.07.2022 17:11:53 UTC+05:00
**Link:** https://t.me/nest_ru/174576

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- если я не использую эти файлы, количество импортов увеличивается. В результате код не будет чистым. Таким образом, я спрашиваю.

Main message:
Чистота кода это не про импорты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Чистота кода это не про импорты

--

## My telegram message #174579
**Time:** 27.07.2022 17:14:10 UTC+05:00
**Link:** https://t.me/nest_ru/174579

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Используй nx и выноси код в либы, ссылки на либы будут короче

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Используй nx и выноси код в либы, ссылки на либы будут короче

--

## My telegram message #174727
**Time:** 27.07.2022 19:51:07 UTC+05:00
**Link:** https://t.me/nest_ru/174727

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
В два контроллера, проще на один роут посадить и гард повесить, а сервисы могут и там и там одни и теже быть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В два контроллера, проще на один роут посадить и гард повесить, а сервисы могут и там и там одни и теже быть

--

## My telegram message #174918
**Time:** 28.07.2022 13:33:40 UTC+05:00
**Link:** https://t.me/nest_ru/174918

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет всем! Не так давно работаю с Нестом и столкнулся с такой проблемой. Хочу задействовать AsyncLocalStorage для коммита транзакций. Проблема в том, что чтобы я не записывал в Стор, оно все очищается, когда я проваливаюсь в обработчик. Нашел какие-то сообщения, что якобы некорректно бодипарсер работает. Никто не знает как это победить?

Main message:
ждем когда нест официально скажет что поддерживает AsyncLocalStorage, до тех пор это просто эксперементальная технология, лучше не юзать это, так как будет шататься диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ждем когда нест официально скажет что поддерживает AsyncLocalStorage, до тех пор это просто эксперементальная технология, лучше не юзать это, так как будет шататься диай

--

## My telegram message #174930
**Time:** 28.07.2022 15:46:45 UTC+05:00
**Link:** https://t.me/nest_ru/174930

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- +
- Можно ли как-то запретить указывать "null" в объекте на уровне схемы graphql в подходе "сначала код" Это почему-то не работает  @Field(() => Boolean, {  description:  '1opt'  defaultValue: true,  nullable: false, <—-  })
- Привет. Кто-то может посоветовать инструмент ORM для комфортной работы с mssql, и методом выполнения SQL процедур на борту?
- prisma умеет же

Main message:
может он хочет типизацию при работе с хранимками

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может он хочет типизацию при работе с хранимками

--

## My telegram message #174933
**Time:** 28.07.2022 15:48:20 UTC+05:00
**Link:** https://t.me/nest_ru/174933

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет. Кто-то может посоветовать инструмент ORM для комфортной работы с mssql, и методом выполнения SQL процедур на борту?
- prisma умеет же
- может он хочет типизацию при работе с хранимками
- Чего?

Main message:
чтобы тс ругнулся на кривой запрос вызова хранимки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

чтобы тс ругнулся на кривой запрос вызова хранимки

--

## My telegram message #174935
**Time:** 28.07.2022 15:50:05 UTC+05:00
**Link:** https://t.me/nest_ru/174935

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- может он хочет типизацию при работе с хранимками
- Чего?
- чтобы тс ругнулся на кривой запрос вызова хранимки
- Вот ты додумываешь за человека))

Main message:
) я тоже такую штуку искал как то просто)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) я тоже такую штуку искал как то просто)

--

## My telegram message #174940
**Time:** 28.07.2022 15:54:07 UTC+05:00
**Link:** https://t.me/nest_ru/174940

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Моя задача: У меня есть сущность юзера и он должен иметь возможность добавить себе язык для обучения(он может добавлять несколько языков). У каждого языка для юзера должен быть прогресс. Для решения этой задачи я сделал вот такую схему(фото1). У Меня есть расписанные сущности, связи и сервис вот в этом вопросе на stackoverflow( https://stackoverflow.com/questions/73151412/i-cannot-get-full-model-from-database-typeorm ). Моя цель такова, что бы у меня при вытаскивании пользователя был такой ответ: Юзер: //Поля юзера languages: [{ languageName flagImage progress: [ days points difficultlyLevel ] }, { languageName flagImage progress: [ days points difficultlyLevel ] } ]

Main message:
молодец

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

молодец

--

## My telegram message #174950
**Time:** 28.07.2022 15:57:09 UTC+05:00
**Link:** https://t.me/nest_ru/174950

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://github.com/typeorm/typeorm/tree/master/sample

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/typeorm/typeorm/tree/master/sample

--

## My telegram message #174984
**Time:** 28.07.2022 16:08:36 UTC+05:00
**Link:** https://t.me/nest_ru/174984

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Тред? Расскажи что это.

Main message:
Thread

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Thread

--

## My telegram message #174986
**Time:** 28.07.2022 16:09:15 UTC+05:00
**Link:** https://t.me/nest_ru/174986

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тред? Расскажи что это.
- Это сторителлинг
- Thread
- Поток сообщений?

Main message:
да стрим некий между людьми

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да стрим некий между людьми

--

## My telegram message #174988
**Time:** 28.07.2022 16:14:33 UTC+05:00
**Link:** https://t.me/nest_ru/174988

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Thread
- Поток сообщений?
- да стрим некий между людьми
- Привет всем! Товарищи, помогите мне пожалайста найти ошибку в этом коде.  let {id} = req.params await dataSource .createQueryBuilder() .update(Task) .set({ started: true }) .where("id = :id", {id: parseInt(id)}) .execute() logger.good(`Task ${id} started to execute!`)  Этот код должен менять значение параметра "started" на true при вызове, но значение остаётся всегдла false, так что этот код не работает Ошибок, варнов нет, всё что есть -- это вот этот вот лог от typeorm:  query: UPDATE "Task" SET "started" = $1 WHERE "id" = $2 -- PARAMETERS: [1,1]  Как я понимаю, данный query запрос должен установить значение true для колонки started в таблице Task для строки айди который совпадает с  req.params.id , верно? Но оно не работает, значение в колонке "started" остаётся false. Вот entity "Task":  @Entity('Task') export class Task { @PrimaryGeneratedColumn() id: number @Column() task: string @Column() started: boolean @Column() result: string }  Я использую postgres как субд.

Main message:
напрямую в базе запусти этот запрос

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

напрямую в базе запусти этот запрос

--

## My telegram message #174994
**Time:** 28.07.2022 16:15:33 UTC+05:00
**Link:** https://t.me/nest_ru/174994

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет всем! Товарищи, помогите мне пожалайста найти ошибку в этом коде.  let {id} = req.params await dataSource .createQueryBuilder() .update(Task) .set({ started: true }) .where("id = :id", {id: parseInt(id)}) .execute() logger.good(`Task ${id} started to execute!`)  Этот код должен менять значение параметра "started" на true при вызове, но значение остаётся всегдла false, так что этот код не работает Ошибок, варнов нет, всё что есть -- это вот этот вот лог от typeorm:  query: UPDATE "Task" SET "started" = $1 WHERE "id" = $2 -- PARAMETERS: [1,1]  Как я понимаю, данный query запрос должен установить значение true для колонки started в таблице Task для строки айди который совпадает с  req.params.id , верно? Но оно не работает, значение в колонке "started" остаётся false. Вот entity "Task":  @Entity('Task') export class Task { @PrimaryGeneratedColumn() id: number @Column() task: string @Column() started: boolean @Column() result: string }  Я использую postgres как субд.
- напрямую в базе запусти этот запрос
- Да, ещё это не нест, а просто последний тайпорм. Пишу в чат по несту потому что в других никто не отвечает, а я не понимаю что не так
- Платная лицензия

Main message:
не не суть, дв вер можно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не не суть, дв вер можно

--

