## My telegram message #128722
**Time:** 21.10.2021 12:57:46 UTC+05:00
**Link:** https://t.me/nest_ru/128722

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Немного не в тему, есть ли возможность у класс-валидатора использовать условие ИЛИ? Типа {personId: string, organisationId: string} что бы обязательно присутствовало любое из этих полей?

Main message:
ValidateIf

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ValidateIf

--

## My telegram message #128730
**Time:** 21.10.2021 13:03:08 UTC+05:00
**Link:** https://t.me/nest_ru/128730

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Мне получается создать сервис UserEventsService который будет просто эмитить какой либо эвент и уже listener будет его хэндлить ?

Main message:
сам думай, так просто ты развяжешь логику, но получишь отоложеную операцию, тоесть сразу не сможешь юзеру вернуть список книг, это я уже через сокеты докидываю когда есть такие кейсы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сам думай, так просто ты развяжешь логику, но получишь отоложеную операцию, тоесть сразу не сможешь юзеру вернуть список книг, это я уже через сокеты докидываю когда есть такие кейсы

--

## My telegram message #128738
**Time:** 21.10.2021 13:12:42 UTC+05:00
**Link:** https://t.me/nest_ru/128738

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Понял, спасибо

Main message:
Там выше я пример с токеном приводил, это когда реализацию докидываешь с апп модуль, юзер умеет работать с некими книгами, некий интерфейс а как он уже будет реализован этого он не знает, ну это труднее сделать и понять но можно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там выше я пример с токеном приводил, это когда реализацию докидываешь с апп модуль, юзер умеет работать с некими книгами, некий интерфейс а как он уже будет реализован этого он не знает, ну это труднее сделать и понять но можно

--

## My telegram message #128760
**Time:** 21.10.2021 16:56:08 UTC+05:00
**Link:** https://t.me/nest_ru/128760

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хотя если честно попахивает XY-проблемой, зачем тебе вообще понадобилось вот так инджектить и потом вручную этот метод вызывать?
- Проблема оказывается была в том что я сервис свой инжектил как провайдер а не напрямую как сервис, а надо это мне для некой обертки, этот сервис работает с конектом к редису Походу придеться в ручную подключать
- Можно посмотреть, как сделано в nestjs/typeorm:  https://github.com/nestjs/typeorm/blob/master/lib/common/typeorm.decorators.ts#L11 Но этот декоратор не вызывают вот так, а используют как обычный декоратор, т.е.  constructor(@InjectRepository(Entity) private readonly repository: EnityRepository) {}
- Если подключать сервис как провайдер и вручную передавать все зависимости в конструктор, нест не видит походу другие глобальные сервисы внутри модуля, хз баг это или фича

Main message:
покажи как вручную создаешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

покажи как вручную создаешь

--

## My telegram message #128762
**Time:** 21.10.2021 16:56:16 UTC+05:00
**Link:** https://t.me/nest_ru/128762

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно посмотреть, как сделано в nestjs/typeorm:  https://github.com/nestjs/typeorm/blob/master/lib/common/typeorm.decorators.ts#L11 Но этот декоратор не вызывают вот так, а используют как обычный декоратор, т.е.  constructor(@InjectRepository(Entity) private readonly repository: EnityRepository) {}
- Если подключать сервис как провайдер и вручную передавать все зависимости в конструктор, нест не видит походу другие глобальные сервисы внутри модуля, хз баг это или фича
- покажи как вручную создаешь
- +

Main message:
через useFactory?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через useFactory?

--

## My telegram message #128769
**Time:** 21.10.2021 16:57:21 UTC+05:00
**Link:** https://t.me/nest_ru/128769

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- покажи как вручную создаешь
- +
- через useFactory?
- да

Main message:
в экспорт нужно токены кидать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в экспорт нужно токены кидать

--

## My telegram message #128771
**Time:** 21.10.2021 16:57:24 UTC+05:00
**Link:** https://t.me/nest_ru/128771

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- через useFactory?
- да
- в экспорт нужно токены кидать
- Как клас видит кеш менеджер, если сервис как провайдер то не видит

Main message:
кидаешь?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кидаешь?

--

## My telegram message #128773
**Time:** 21.10.2021 16:58:22 UTC+05:00
**Link:** https://t.me/nest_ru/128773

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в экспорт нужно токены кидать
- Как клас видит кеш менеджер, если сервис как провайдер то не видит
- кидаешь?
- сейчас еще раз попробую, но пробовал кидать

Main message:
вот эти нужно кидать в модулях где они провайдятся exports:[ DomainBlacklistLookupDITokens.DomainBlacklistLookupRepositorySymbol, DnsBlacklistLookupDITokens.DnsBlacklistLookupServiceSymbol, DITokens.QueryBus, ]

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот эти нужно кидать в модулях где они провайдятся exports:[ DomainBlacklistLookupDITokens.DomainBlacklistLookupRepositorySymbol, DnsBlacklistLookupDITokens.DnsBlacklistLookupServiceSymbol, DITokens.QueryBus, ]

--

## My telegram message #128775
**Time:** 21.10.2021 17:02:11 UTC+05:00
**Link:** https://t.me/nest_ru/128775

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кидаешь?
- сейчас еще раз попробую, но пробовал кидать
- вот эти нужно кидать в модулях где они провайдятся exports:[ DomainBlacklistLookupDITokens.DomainBlacklistLookupRepositorySymbol, DnsBlacklistLookupDITokens.DnsBlacklistLookupServiceSymbol, DITokens.QueryBus, ]
- ну модуль который я подключаю экспортит этот токен, тот же кеш менеджер неста, я посмотрел в сурсе и они его экспортят

Main message:
у тебя щас хотябы один из токенов норм резолвистя ?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя щас хотябы один из токенов норм резолвистя ?

--

## My telegram message #128778
**Time:** 21.10.2021 17:02:48 UTC+05:00
**Link:** https://t.me/nest_ru/128778

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот эти нужно кидать в модулях где они провайдятся exports:[ DomainBlacklistLookupDITokens.DomainBlacklistLookupRepositorySymbol, DnsBlacklistLookupDITokens.DnsBlacklistLookupServiceSymbol, DITokens.QueryBus, ]
- ну модуль который я подключаю экспортит этот токен, тот же кеш менеджер неста, я посмотрел в сурсе и они его экспортят
- у тебя щас хотябы один из токенов норм резолвистя ?
- Все работает нормально, кроме сервиса который я хочу заинжектить в декораторе

Main message:
че это за слова такие

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

че это за слова такие

--

## My telegram message #128783
**Time:** 21.10.2021 17:06:22 UTC+05:00
**Link:** https://t.me/nest_ru/128783

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет Может кто поделиться как подключить сервис в декоратор? А то такой вариант почемуто не работает  const   injectRedisService = Inject(NestRedlockDITokens.RedisServiceSymbol);  injectRedisService(target, 'redisService'); Сервис undefined

Main message:
вот такой код не возможен

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот такой код не возможен

--

## My telegram message #128789
**Time:** 21.10.2021 17:08:49 UTC+05:00
**Link:** https://t.me/nest_ru/128789

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- че это за слова такие
- ну в моем случаее я хочу обернуть метод в редислок, и ему нужны конекты к редису
- вот такой код не возможен
- А какой есть подход дабы оребнуть метод кроме как декоратором? Просто я не хочу копипастить тонны кода каждый раз

Main message:
а че ты хочешь? опиши задачу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а че ты хочешь? опиши задачу

--

## My telegram message #128793
**Time:** 21.10.2021 17:12:41 UTC+05:00
**Link:** https://t.me/nest_ru/128793

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот такой код не возможен
- А какой есть подход дабы оребнуть метод кроме как декоратором? Просто я не хочу копипастить тонны кода каждый раз
- а че ты хочешь? опиши задачу
- есть пакет редлок, он лочит метод по ключу, дабы не выполнить его дважды  https://www.npmjs.com/package/redlock я хочу навесить декоратор на метод, и внутри декоратора обернуть в редлок, который будет либо выполнять метод или же выкинет ошибку

Main message:
ну тут у тя будет логика в декораторе да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну тут у тя будет логика в декораторе да

--

## My telegram message #128801
**Time:** 21.10.2021 17:16:02 UTC+05:00
**Link:** https://t.me/nest_ru/128801

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Та глобал что-то не помог, вот как я это видел в идеале ```  export function   NestRedlock(resource:   string  ) {   const   injectRedisService = Inject(NestRedlockDITokens.RedisServiceSymbol);   return   ( target:   any  , propertyKey:   string  , propertyDescriptor: PropertyDescriptor ) => { injectRedisService(target, 'redisService');   const   originalMethod = propertyDescriptor.value; propertyDescriptor.value =   async function   (...args:   any  []) {   try   {   const   redisService: RedisServiceInterface =   this  .redisService;   const   clients = Array.from( redisService.getClients(), ([item, value]) => value );   const   redlock =   new   Redlock(clients, { driftFactor: 0.01, retryCount: 10, retryDelay: 200, retryJitter: 200, });   await   using( redlock.disposer(resource, 1000, unlockErrorHandler),   async   () => { console.log(  this  );   return await   originalMethod.apply(  this  , args); } ); }   catch   (error) { Logger.error(error); } }; }; }   function   unlockErrorHandler(err:   any  ) { Logger.log(err); } ```

Main message:
const  injectRedisService = Inject(NestRedlockDITokens.RedisServiceSymbol); это не будет работать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

const  injectRedisService = Inject(NestRedlockDITokens.RedisServiceSymbol); это не будет работать

--

## My telegram message #128803
**Time:** 21.10.2021 17:16:43 UTC+05:00
**Link:** https://t.me/nest_ru/128803

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вроде да.
- Норм, спасибо
- const  injectRedisService = Inject(NestRedlockDITokens.RedisServiceSymbol); это не будет работать
- уже понял) не знаю теперь как сделать нормально

Main message:
вот у тя есть фабрика

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот у тя есть фабрика

--

## My telegram message #128812
**Time:** 21.10.2021 18:00:42 UTC+05:00
**Link:** https://t.me/nest_ru/128812

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот у тя есть фабрика
- ну суть только в ручную в провайдере подключить редис сервис?
- Какие хорошие инструменты есть для отладки производительности?
- Здравствуйте. Подскажите где у вас постятся вакансии?

Main message:
https://t.me/nestjs_jobs

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nestjs_jobs

--

## My telegram message #128818
**Time:** 21.10.2021 18:13:46 UTC+05:00
**Link:** https://t.me/nest_ru/128818

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спасибо
- Ребят как в typeorm сделать это У меня есть WalletEntity и InvoiceEntity Тут One-To-Many, 1 wallet -> many invoices У Invoice-а есть status: ENUM( 'SUBMITTED', 'COMPLETED' ) Как найти wallet у которого например есть инвойсы только с статусом COMPLETED
- А для main thread и event loop?
- @KaufmanEndy спасибо вам, сделал внутри сервиса статическую переменную и присвоил туда редис клиент, работаю через него

Main message:
👍 круть, нзшт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

👍 круть, нзшт

--

## My telegram message #128893
**Time:** 22.10.2021 14:58:04 UTC+05:00
**Link:** https://t.me/nest_ru/128893

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ща бы сарказм не выкупать
- какая у тебя классная фамилия
- у меня лучше
- это я тебе как человек с похмельем говорю)))

Main message:
все меня спалили, меня завут не Ильшат а Камиль)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все меня спалили, меня завут не Ильшат а Камиль)

--

## My telegram message #128903
**Time:** 22.10.2021 15:00:14 UTC+05:00
**Link:** https://t.me/nest_ru/128903

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
неа, он даже не знает кто я такой)) я же для неста ниче не делал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа, он даже не знает кто я такой)) я же для неста ниче не делал

--

## My telegram message #128909
**Time:** 22.10.2021 15:12:27 UTC+05:00
**Link:** https://t.me/nest_ru/128909

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- неа, он даже не знает кто я такой)) я же для неста ниче не делал
- Не скромничай
- ты звезда этого чата, повелитель DI
- Был бы тёткой, дал бы тебе

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #128930
**Time:** 23.10.2021 11:57:18 UTC+05:00
**Link:** https://t.me/nest_ru/128930

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Спс, это правит наивысший админ  @pumano

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Спс, это правит наивысший админ  @pumano

--

## My telegram message #128945
**Time:** 23.10.2021 20:31:02 UTC+05:00
**Link:** https://t.me/nest_ru/128945

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- добрый день, можно вопрос куда мне нужно еще прописать Handler чтобы он работал ?

Main message:
https://t.me/nest_ru/115089

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/115089

--

## My telegram message #128948
**Time:** 23.10.2021 20:37:33 UTC+05:00
**Link:** https://t.me/nest_ru/128948

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- за использование винды для разработки, очевидно
- добрый день, можно вопрос куда мне нужно еще прописать Handler чтобы он работал ?
- https://t.me/nest_ru/115089
- эмм, то есть вы не можете сказать, куда мне прописать Handler ?

Main message:
https://wanago.io/2020/12/07/api-nestjs-introduction-cqrs/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://wanago.io/2020/12/07/api-nestjs-introduction-cqrs/

--

## My telegram message #128958
**Time:** 23.10.2021 20:56:09 UTC+05:00
**Link:** https://t.me/nest_ru/128958

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- эмм, то есть вы не можете сказать, куда мне прописать Handler ?
- https://wanago.io/2020/12/07/api-nestjs-introduction-cqrs/
- там нет (
- не, Я НЕ СПОРЮ)))))))))))))))))))

Main message:
пути исправь такого нет from 'src/' может в этом дело

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пути исправь такого нет from 'src/' может в этом дело

--

## My telegram message #128965
**Time:** 23.10.2021 21:13:58 UTC+05:00
**Link:** https://t.me/nest_ru/128965

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- там нет (
- не, Я НЕ СПОРЮ)))))))))))))))))))
- пути исправь такого нет from 'src/' может в этом дело
- я делал пример, один работает

Main message:
тут мало вопросов по этой технологии, может кроме тебя никто и не юзает это)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тут мало вопросов по этой технологии, может кроме тебя никто и не юзает это)

--

## My telegram message #129014
**Time:** 23.10.2021 23:57:59 UTC+05:00
**Link:** https://t.me/nest_ru/129014

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://enterprisecraftsmanship.com/posts/domain-model-purity-completeness/ Думаю статья объяснит почему агрегат не должен быть связан с нестом
- вот тут чел, бомбил, что у него есть агрегат, который для паблиша
- Господа, добрый вечер, расскажите новичку, где вы храните модели? Перехожу с ларавел, использую Sequelize ORM, делаю по доке, он генерирует папку для моделей, но в экспресс курсе я видел, что всё приложение инкапсулируется в виде отдельных модулей, и модели пишутся внутри модуля. Тут вопрос архитектуры, как лучше сделать?
- Кто-нибудь знает, в призме можно как-то модели в отдельных файлах описывать и импортить? Нигде не нашёл инфу про это. А то получается все модели в одном файле описываются

Main message:
@SpacerY просто мое мнение, твой чувак хочет затащить редакс в бекэнд, и так как у вас я так понял сейчас 0 кода, то не вижу смысла, такие вещи они затаскиваются в стабильный обычный бэк, и то в момент затаскивания там два пути: микросервисы, или то что ты пытаешся затащить такие решения не нужно делать архитектурой всего приложения, это просто для неких специфичных фич и не более мое имхо, чел с фронта на реак просто решил редакс юзать на бэке и нашел похожий паттерн тут, и не более, это лично его субьективное решение выбрать такую технологию, по которой он не найдет разрабов и поддерживать будет сложно, так как везде где есть сага это ад, проект на этом заранее обречен на провал по развитию и поддержке

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@SpacerY просто мое мнение, твой чувак хочет затащить редакс в бекэнд, и так как у вас я так понял сейчас 0 кода, то не вижу смысла, такие вещи они затаскиваются в стабильный обычный бэк, и то в момент затаскивания там два пути: микросервисы, или то что ты пытаешся затащить такие решения не нужно делать архитектурой всего приложения, это просто для неких специфичных фич и не более мое имхо, чел с фронта на реак просто решил редакс юзать на бэке и нашел похожий паттерн тут, и не более, это лично его субьективное решение выбрать такую технологию, по которой он не найдет разрабов и поддерживать будет сложно, так как везде где есть сага это ад, проект на этом заранее обречен на провал по развитию и поддержке

--

## My telegram message #129016
**Time:** 24.10.2021 00:01:26 UTC+05:00
**Link:** https://t.me/nest_ru/129016

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Кто-нибудь знает, в призме можно как-то модели в отдельных файлах описывать и импортить? Нигде не нашёл инфу про это. А то получается все модели в одном файле описываются

Main message:
https://t.me/prisma_ru

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/prisma_ru

--

## My telegram message #129018
**Time:** 24.10.2021 00:03:22 UTC+05:00
**Link:** https://t.me/nest_ru/129018

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Практика показала для монолита лучше создать отдельный модуль со всеми моделям и его импортить по мере необходимости

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Практика показала для монолита лучше создать отдельный модуль со всеми моделям и его импортить по мере необходимости

--

## My telegram message #129023
**Time:** 24.10.2021 00:04:55 UTC+05:00
**Link:** https://t.me/nest_ru/129023

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://t.me/prisma_ru
- Так фронтовый redux это же реализация flux архитектуры, а на бек как это можно натянуть ?
- Практика показала для монолита лучше создать отдельный модуль со всеми моделям и его импортить по мере необходимости
- Так покажите мне как можно использовать redux ? Вот если есть фронтовые saga, то есть бековые saga. Это разные вещи, но для бека как можно redux втащить

Main message:
и код не на столько будет запутан

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и код не на столько будет запутан

--

## My telegram message #129030
**Time:** 24.10.2021 00:15:34 UTC+05:00
**Link:** https://t.me/nest_ru/129030

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Так покажите мне как можно использовать redux ? Вот если есть фронтовые saga, то есть бековые saga. Это разные вещи, но для бека как можно redux втащить
- и код не на столько будет запутан
- о, привет)
- Привет

Main message:
каждый хвалит свое болото, че им жаловаться то) для них это просто нормальное состояние, они другого и не видели

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

каждый хвалит свое болото, че им жаловаться то) для них это просто нормальное состояние, они другого и не видели

--

## My telegram message #129033
**Time:** 24.10.2021 00:16:30 UTC+05:00
**Link:** https://t.me/nest_ru/129033

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
даже тот кто внедрял

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

даже тот кто внедрял

--

## My telegram message #129038
**Time:** 24.10.2021 00:19:32 UTC+05:00
**Link:** https://t.me/nest_ru/129038

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А что лучше использовать typeorm или sequelize?
- даже тот кто внедрял
- redux-saga ?
- Саги разные бывают, например замена распр транзакциям

Main message:
не, там на шарпе свое, главное правило - если в вакансии по работе есть слово сага, туда не нужно идти

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не, там на шарпе свое, главное правило - если в вакансии по работе есть слово сага, туда не нужно идти

--

## My telegram message #129045
**Time:** 24.10.2021 00:25:15 UTC+05:00
**Link:** https://t.me/nest_ru/129045

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
причин много, у тя событие не долетело походу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

причин много, у тя событие не долетело походу

--

## My telegram message #129052
**Time:** 24.10.2021 00:29:14 UTC+05:00
**Link:** https://t.me/nest_ru/129052

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А про редакс обсервабл что думаешь ?

Main message:
юзал его да, нравился тогда, так как я шарил код между ангулар и реакт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

юзал его да, нравился тогда, так как я шарил код между ангулар и реакт

--

## My telegram message #129070
**Time:** 24.10.2021 12:40:14 UTC+05:00
**Link:** https://t.me/nest_ru/129070

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Лучше переписать
- У нас в компании все пишут валидации с использованием class-validator. Не думаю что все захотят переписать проект или изучить новую библиотеку. Такая себе идея ради одной валидации идти на такой шаг.
- Необязательно все переписывать. Библиотека одна из лучших по быстродействию. Ее подключение повлияет в итоге разве что на размер папки модулей )
- ну раз так можно подумать) спасибо за помощь

Main message:
кастомный валидатор напиши

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кастомный валидатор напиши

--

## My telegram message #129073
**Time:** 24.10.2021 12:44:11 UTC+05:00
**Link:** https://t.me/nest_ru/129073

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Необязательно все переписывать. Библиотека одна из лучших по быстродействию. Ее подключение повлияет в итоге разве что на размер папки модулей )
- ну раз так можно подумать) спасибо за помощь
- кастомный валидатор напиши
- Не за что ;)

Main message:
я не юзаю массивы с енам поэтому даже не чекал работает нет такое как нить так назвать и все,  @ValidateNestedEnum  https://github.com/typestack/class-validator#custom-validation-decorators

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я не юзаю массивы с енам поэтому даже не чекал работает нет такое как нить так назвать и все,  @ValidateNestedEnum  https://github.com/typestack/class-validator#custom-validation-decorators

--

## My telegram message #129121
**Time:** 24.10.2021 16:29:48 UTC+05:00
**Link:** https://t.me/nest_ru/129121

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как показывает практика, если припрёт поднять 2 инстанса хотя бы (тот же rollingUpdate в кубере), то об этом костыле и не вспомнишь. Поэтому я бы просто сразу redis-lock прикрутил, чтобы и не думать потом об этом))
- Аргумент
- Это дто?
- нет, это был C#, это был DDD и они не в курсе про redux

Main message:
это да, через message pattern микросервисов не выходит сделать?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это да, через message pattern микросервисов не выходит сделать?

--

## My telegram message #129125
**Time:** 24.10.2021 16:32:19 UTC+05:00
**Link:** https://t.me/nest_ru/129125

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это дто?
- нет, это был C#, это был DDD и они не в курсе про redux
- это да, через message pattern микросервисов не выходит сделать?
- в микросервисах, помимо eventoв, нужно еще за целостностью данных в разных бд следить

Main message:
просто событийный потход в рамках монолита, в котором можно напрямую дергать, мне кажется не очень оптимальный выбор

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто событийный потход в рамках монолита, в котором можно напрямую дергать, мне кажется не очень оптимальный выбор

--

## My telegram message #129131
**Time:** 24.10.2021 16:35:31 UTC+05:00
**Link:** https://t.me/nest_ru/129131

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- это да, через message pattern микросервисов не выходит сделать?
- в микросервисах, помимо eventoв, нужно еще за целостностью данных в разных бд следить
- просто событийный потход в рамках монолита, в котором можно напрямую дергать, мне кажется не очень оптимальный выбор
- блин, там помимо этой базы, будут еще расчетные модули

Main message:
ну монолит же?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну монолит же?

--

## My telegram message #129135
**Time:** 24.10.2021 16:37:48 UTC+05:00
**Link:** https://t.me/nest_ru/129135

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- просто событийный потход в рамках монолита, в котором можно напрямую дергать, мне кажется не очень оптимальный выбор
- блин, там помимо этой базы, будут еще расчетные модули
- ну монолит же?
- зачем ?

Main message:
ну нест берут ради него

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну нест берут ради него

--

## My telegram message #129137
**Time:** 24.10.2021 16:38:42 UTC+05:00
**Link:** https://t.me/nest_ru/129137

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну монолит же?
- зачем ?
- ну нест берут ради него
- причем тут не умею, я уже разобрался, че куда кидать

Main message:
у тебя будет 3000 событий которые явно не связаны между собою через код, и они будут между собою так сяк прересекатся и выполнятся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя будет 3000 событий которые явно не связаны между собою через код, и они будут между собою так сяк прересекатся и выполнятся

--

## My telegram message #129142
**Time:** 24.10.2021 16:39:21 UTC+05:00
**Link:** https://t.me/nest_ru/129142

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну нест берут ради него
- причем тут не умею, я уже разобрался, че куда кидать
- у тебя будет 3000 событий которые явно не связаны между собою через код, и они будут между собою так сяк прересекатся и выполнятся
- я в курсе, зачем nest берут, чтобы я сам не писал const repo = new Repo(); const controller = new Controller({repo: repo});

Main message:
ну запутается же все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну запутается же все

--

## My telegram message #129144
**Time:** 24.10.2021 16:39:35 UTC+05:00
**Link:** https://t.me/nest_ru/129144

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тебя будет 3000 событий которые явно не связаны между собою через код, и они будут между собою так сяк прересекатся и выполнятся
- я в курсе, зачем nest берут, чтобы я сам не писал const repo = new Repo(); const controller = new Controller({repo: repo});
- ну запутается же все
- вот вам пример, создан товар

Main message:
когда через сервис то нет путаницы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда через сервис то нет путаницы

--

## My telegram message #129147
**Time:** 24.10.2021 16:40:50 UTC+05:00
**Link:** https://t.me/nest_ru/129147

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну запутается же все
- вот вам пример, создан товар
- когда через сервис то нет путаницы
- потом чел, скажет " после создания, хочу сделать оповещение всех школьников, что у нас акция 104 рубля первому позвонившему по телефону " и тд

Main message:
у меня много таких кейсов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня много таких кейсов

--

## My telegram message #129151
**Time:** 24.10.2021 16:41:48 UTC+05:00
**Link:** https://t.me/nest_ru/129151

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- потом чел, скажет " после создания, хочу сделать оповещение всех школьников, что у нас акция 104 рубля первому позвонившему по телефону " и тд
- у меня много таких кейсов
- ну у меня был один без этого
- делаешь service-notification и всё

Main message:
ProductsEvent{event:Subject} решает это

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ProductsEvent{event:Subject} решает это

--

## My telegram message #129189
**Time:** 25.10.2021 08:32:26 UTC+05:00
**Link:** https://t.me/nest_ru/129189

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- про крон я вкурсе, спасибо все же
- Ну обычно ж всё равно есть где-то история уведомлений. Ну так вот по крону делаешь выборку тех юзеров, которые были подписаны на событие поступление товара (например), но при этом у которых в таблице истории уведомлений нет записи.
- Подскажите новечку в nest, почему для dto используется модель типов в виде класса, а не ввиде интерфейса?
- интерфейсы исчезают после компиляции тса.

Main message:
Декораторы вадидаций только к классам можно добавлять, и к его методам, через интерфейс не выходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Декораторы вадидаций только к классам можно добавлять, и к его методам, через интерфейс не выходит

--

## My telegram message #129261
**Time:** 26.10.2021 08:01:49 UTC+05:00
**Link:** https://t.me/nest_ru/129261

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Кто нибудь сталкивался, чтобы нужно было сделать валидацию по двум DTO в зависимости от того, что мы передаем?

Main message:
Жалко ещё одно поле добавить? Через это потом чекать import { ValidateIf, IsNotEmpty } from 'class-validator'; export class Post { otherProperty: string;  @ValidateIf (o => o.otherProperty === 'value')  @IsNotEmpty () example: string; }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Жалко ещё одно поле добавить? Через это потом чекать import { ValidateIf, IsNotEmpty } from 'class-validator'; export class Post { otherProperty: string;  @ValidateIf (o => o.otherProperty === 'value')  @IsNotEmpty () example: string; }

--

## My telegram message #129274
**Time:** 26.10.2021 12:32:05 UTC+05:00
**Link:** https://t.me/nest_ru/129274

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, разбираюсь с prisma пытаюсь понять, почему в доке написано, что они поддерживают модульную архитектуру Неста, а по факту заставляют описывать модели в одном файле scema.prisma? Это правильно? По моему мнению в каждом модуле должна лежать своя (свои) модель. Но как сделать так не понятно. Как вы используете призму?

Main message:
Где такое написано?)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Где такое написано?)

--

## My telegram message #129278
**Time:** 26.10.2021 12:39:06 UTC+05:00
**Link:** https://t.me/nest_ru/129278

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Для него всегда localhost - "connect ECONNREDUSED", имя pg контейнера было спасением..
- Всем привет, разбираюсь с prisma пытаюсь понять, почему в доке написано, что они поддерживают модульную архитектуру Неста, а по факту заставляют описывать модели в одном файле scema.prisma? Это правильно? По моему мнению в каждом модуле должна лежать своя (свои) модель. Но как сделать так не понятно. Как вы используете призму?
- Где такое написано?)
- В доке вчера читал, белым по чёрному было написано

Main message:
у меня два варианта использования 1) я бью бизнес логику по базам, и для каждой логики свой nx модуль - микросервисы/монолит 2) создаю либу nx libs/server/prisma и в ней храню схему и для нее генерю клиента - монолит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня два варианта использования 1) я бью бизнес логику по базам, и для каждой логики свой nx модуль - микросервисы/монолит 2) создаю либу nx libs/server/prisma и в ней храню схему и для нее генерю клиента - монолит

--

## My telegram message #129282
**Time:** 26.10.2021 12:46:09 UTC+05:00
**Link:** https://t.me/nest_ru/129282

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Где такое написано?)
- В доке вчера читал, белым по чёрному было написано
- у меня два варианта использования 1) я бью бизнес логику по базам, и для каждой логики свой nx модуль - микросервисы/монолит 2) создаю либу nx libs/server/prisma и в ней храню схему и для нее генерю клиента - монолит
- Это больше похоже на правду, но это костыль как по мне

Main message:
затык в связях между таблицами в разных схемах, нужно мутить работу с импортом, так что не так легко это сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

затык в связях между таблицами в разных схемах, нужно мутить работу с импортом, так что не так легко это сделать

--

## My telegram message #129286
**Time:** 26.10.2021 12:52:12 UTC+05:00
**Link:** https://t.me/nest_ru/129286

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня два варианта использования 1) я бью бизнес логику по базам, и для каждой логики свой nx модуль - микросервисы/монолит 2) создаю либу nx libs/server/prisma и в ней храню схему и для нее генерю клиента - монолит
- Это больше похоже на правду, но это костыль как по мне
- затык в связях между таблицами в разных схемах, нужно мутить работу с импортом, так что не так легко это сделать
- Интересный подход)

Main message:
просто может так случится что в какойто момент я решу для чатов юзать монгу а не пг, я просто переключусь когда у меня все разделено

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто может так случится что в какойто момент я решу для чатов юзать монгу а не пг, я просто переключусь когда у меня все разделено

--

## My telegram message #129288
**Time:** 26.10.2021 12:59:32 UTC+05:00
**Link:** https://t.me/nest_ru/129288

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- затык в связях между таблицами в разных схемах, нужно мутить работу с импортом, так что не так легко это сделать
- Интересный подход)
- просто может так случится что в какойто момент я решу для чатов юзать монгу а не пг, я просто переключусь когда у меня все разделено
- И как, часто такие ситуации возникали?)

Main message:
уже есть в паланах две задачи но там не монга а кликхаус, под него пока нет ничего в призме, придется взять аналог какой нить который реализован в призме

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

уже есть в паланах две задачи но там не монга а кликхаус, под него пока нет ничего в призме, придется взять аналог какой нить который реализован в призме

--

## My telegram message #129291
**Time:** 26.10.2021 13:01:35 UTC+05:00
**Link:** https://t.me/nest_ru/129291

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- просто может так случится что в какойто момент я решу для чатов юзать монгу а не пг, я просто переключусь когда у меня все разделено
- И как, часто такие ситуации возникали?)
- уже есть в паланах две задачи но там не монга а кликхаус, под него пока нет ничего в призме, придется взять аналог какой нить который реализован в призме
- На моей практике задача смены базы была ровно один раз - и то по итогу отказались от этой затеи

Main message:
пока только эти

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пока только эти

--

## My telegram message #129300
**Time:** 26.10.2021 15:06:23 UTC+05:00
**Link:** https://t.me/nest_ru/129300

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Мб, не сталкивался
- Привет. Как правильно замокать один из методов сервиса? При создании заказа(OrderService) создается событие (слушается в MessageService). Проверяю руками - метод вызывается, а мок не срабатывает. p.s. sendRequuest - правильное (опечатка в самом названии метода)
- такое видел  https://github.com/citusdata/cstore_fdw . для временных рядов ещё есть  https://github.com/timescale/timescaledb .
- Это получается модульная архитектура? Типо монолит, но который разбит на несколько частей. Где больше об этом подходе почитать?

Main message:
не знаю, я в ангулар так писал, просто сюда этот потход притащил и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не знаю, я в ангулар так писал, просто сюда этот потход притащил и все

--

## My telegram message #129317
**Time:** 26.10.2021 22:03:05 UTC+05:00
**Link:** https://t.me/nest_ru/129317

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Через max(id) с группировкой по chat_id можно
- Спасибо, йду разбираться)
- Ну ладно, я рискну.. В общем - это не реклама, я просто хотел поделиться и порекомендовать официальный сервером по NestJS в Discord.. Там сейчас 21k людей. Много категорий для ответа на вопросы, люди из команды ядра Nestjs, официальные контрибьютеры; Только вы должны понимать инглиш, хотя там есть еще и русский канал связи... Рекомендую потому что мне очень хорошо помогли, когда Гугл не давал ничего (хорошего).. Может быть и вам это поможет:  https://discord.com/invite/nestjs .
- А если это связано с NestJS - то это реклама?

Main message:
народ и тут и там

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

народ и тут и там

--

## My telegram message #129333
**Time:** 26.10.2021 23:35:32 UTC+05:00
**Link:** https://t.me/nest_ru/129333

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- привет. скажите пожалуйста, если я подключу postgres или sql базу данных, как я ее разверну например на хероку? в гайдах описывается как развернуть и настроить локальную бд, но я не могу осмыслить как она будет работать на хосте. тип она будет запускаться на серваке хероку или мне нужно покупать какие то платные решения?
- В хероку для пг есть add-ons
- спасибо
- Я немного по другому решил. У меня есть объект со всеми классами, в запросе у меня есть type, чтобы можно было динамически получить класс по свойству. Так все отлично работает Есть брать пример решения через class transformer, то мне нужно type прокидывать в объект, чтобы он понмал с каким типом класса ему работать.

Main message:
блин хз, мутируемый контракт/спецификация это боль для всех: фронт, бэк, тех писы, тестеры, это одна из ключевых точек изза которой куча говна приходится писать и на фронте и на бэке

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

блин хз, мутируемый контракт/спецификация это боль для всех: фронт, бэк, тех писы, тестеры, это одна из ключевых точек изза которой куча говна приходится писать и на фронте и на бэке

--

## My telegram message #129339
**Time:** 27.10.2021 10:22:29 UTC+05:00
**Link:** https://t.me/nest_ru/129339

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как получить в экземпляре класса доступ к сервису (синглтону). const myCoollClass = new MyCoollClass() myCoollClass.sentryServiсeInitFromDI(a,b,c) без создания в экземпляре нового объекта сервиса

Main message:
@Injectable () export SentryServiсe{static instance:SentryServiсe;constructor(){SentryServiсe.instance=this}}

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@Injectable () export SentryServiсe{static instance:SentryServiсe;constructor(){SentryServiсe.instance=this}}

--

## My telegram message #129341
**Time:** 27.10.2021 11:04:43 UTC+05:00
**Link:** https://t.me/nest_ru/129341

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- блин хз, мутируемый контракт/спецификация это боль для всех: фронт, бэк, тех писы, тестеры, это одна из ключевых точек изза которой куча говна приходится писать и на фронте и на бэке
- Как получить в экземпляре класса доступ к сервису (синглтону). const myCoollClass = new MyCoollClass() myCoollClass.sentryServiсeInitFromDI(a,b,c) без создания в экземпляре нового объекта сервиса
- @Injectable () export SentryServiсe{static instance:SentryServiсe;constructor(){SentryServiсe.instance=this}}
- Мега супер спасибо! (из серии очевидное, но блин невероятное).

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #129449
**Time:** 28.10.2021 00:45:53 UTC+05:00
**Link:** https://t.me/nest_ru/129449

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Импортировать модуль
- А разве не нужно в другом модуле в поле providers каким-либо образом указать данный провайдер?
- Нет
- Всем привет! Подскажите можно ли как-то ограничить количество вызов функции? Я написал модуль для api у которого есть лимиты и хочу сделать ограничения на уровне модуля. Я понимаю как такую логику сделать с редисом, но не хочется в модуль его тянуть. Есть у кого идеи или похожие кейсы?

Main message:
https://nginx.org/ru/docs/http/ngx_http_limit_req_module.html

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://nginx.org/ru/docs/http/ngx_http_limit_req_module.html

--

## My telegram message #129452
**Time:** 28.10.2021 01:07:17 UTC+05:00
**Link:** https://t.me/nest_ru/129452

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Нет
- Всем привет! Подскажите можно ли как-то ограничить количество вызов функции? Я написал модуль для api у которого есть лимиты и хочу сделать ограничения на уровне модуля. Я понимаю как такую логику сделать с редисом, но не хочется в модуль его тянуть. Есть у кого идеи или похожие кейсы?
- https://nginx.org/ru/docs/http/ngx_http_limit_req_module.html
- Спасибо, подходит от части. А для решения на уровне rxjs нашел модуль который позволяет устанавливать лимиты и собирает задачи для того, чтобы вызовы функции не терялись

Main message:
рейт лимит для тяжелых запросов обычно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

рейт лимит для тяжелых запросов обычно

--

## My telegram message #129457
**Time:** 28.10.2021 01:10:59 UTC+05:00
**Link:** https://t.me/nest_ru/129457

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://nginx.org/ru/docs/http/ngx_http_limit_req_module.html
- Спасибо, подходит от части. А для решения на уровне rxjs нашел модуль который позволяет устанавливать лимиты и собирает задачи для того, чтобы вызовы функции не терялись
- рейт лимит для тяжелых запросов обычно
- Это модуль для стороннего api я хочу чтобы я мог отправлять сколько угодно запросов в это api а он выполнял задания исходя из ограничений api

Main message:
у тебя это уже не рейт лимит а очередь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя это уже не рейт лимит а очередь

--

## My telegram message #129461
**Time:** 28.10.2021 01:12:07 UTC+05:00
**Link:** https://t.me/nest_ru/129461

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- рейт лимит для тяжелых запросов обычно
- Это модуль для стороннего api я хочу чтобы я мог отправлять сколько угодно запросов в это api а он выполнял задания исходя из ограничений api
- у тебя это уже не рейт лимит а очередь
- 🤔 ну да получается, я тут напутал

Main message:
в очереди можно ставить задержку перед запуском события

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в очереди можно ставить задержку перед запуском события

--

## My telegram message #129479
**Time:** 28.10.2021 02:39:35 UTC+05:00
**Link:** https://t.me/nest_ru/129479

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Вот с юзВалуе интересно
- 😂😂👍
- Бан
- Я хотел удалить, что бы он не видел от меня таких вопрос

Main message:
Создай сервис нестовый для хранения инстанса не неистового и обращайся к своему объекту класса через нестовый сервис this.myClassContainer.myClassInstance.merhod() Лучше в контейнере реализуй всё методы оригинала и проксируй на оригинал, чтобы цепочка не была длинная Создание тоже можешь пихнуть this.myClassContainer.create(new MyClass())

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Создай сервис нестовый для хранения инстанса не неистового и обращайся к своему объекту класса через нестовый сервис this.myClassContainer.myClassInstance.merhod() Лучше в контейнере реализуй всё методы оригинала и проксируй на оригинал, чтобы цепочка не была длинная Создание тоже можешь пихнуть this.myClassContainer.create(new MyClass())

--

## My telegram message #129573
**Time:** 28.10.2021 22:52:52 UTC+05:00
**Link:** https://t.me/nest_ru/129573

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я хз если честно
- https://plugins.jetbrains.com/plugin/11938-one-dark-theme
- спс 🙏
- ребята извините за мой код но если есть правильный способ написание кода здесь

Main message:
у репозитрия есть опция relations

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у репозитрия есть опция relations

--

## My telegram message #129577
**Time:** 28.10.2021 22:54:14 UTC+05:00
**Link:** https://t.me/nest_ru/129577

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спс 🙏
- ребята извините за мой код но если есть правильный способ написание кода здесь
- у репозитрия есть опция relations
- у меня self join

Main message:
там вроде есть дерево репозиторий некий

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там вроде есть дерево репозиторий некий

--

## My telegram message #129581
**Time:** 28.10.2021 22:56:40 UTC+05:00
**Link:** https://t.me/nest_ru/129581

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у репозитрия есть опция relations
- у меня self join
- там вроде есть дерево репозиторий некий
- ок

Main message:
я пишу обычно parentId а не parentEntityName в рамках сущности когда находишся то не важно как она сама называется, это не всегда справедливо, но для деревьев прям норм правило заходит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я пишу обычно parentId а не parentEntityName в рамках сущности когда находишся то не важно как она сама называется, это не всегда справедливо, но для деревьев прям норм правило заходит

--

## My telegram message #129585
**Time:** 28.10.2021 23:59:49 UTC+05:00
**Link:** https://t.me/nest_ru/129585

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ок
- я пишу обычно parentId а не parentEntityName в рамках сущности когда находишся то не важно как она сама называется, это не всегда справедливо, но для деревьев прям норм правило заходит
- спасибо дружище
- Я бы не советовал вам использовать treeRepository, если есть связи с другими таблицами не сможете сделать join

Main message:
можно ентити создать еще одну) 😎

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

можно ентити создать еще одну) 😎

--

## My telegram message #129586
**Time:** 29.10.2021 00:00:00 UTC+05:00
**Link:** https://t.me/nest_ru/129586

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я пишу обычно parentId а не parentEntityName в рамках сущности когда находишся то не важно как она сама называется, это не всегда справедливо, но для деревьев прям норм правило заходит
- спасибо дружище
- Я бы не советовал вам использовать treeRepository, если есть связи с другими таблицами не сможете сделать join
- можно ентити создать еще одну) 😎

Main message:
и на туже таблицу в базе мапнуть и юзать там где нужна именно в плоском виде сущность

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и на туже таблицу в базе мапнуть и юзать там где нужна именно в плоском виде сущность

--

## My telegram message #129588
**Time:** 29.10.2021 00:04:08 UTC+05:00
**Link:** https://t.me/nest_ru/129588

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я бы не советовал вам использовать treeRepository, если есть связи с другими таблицами не сможете сделать join
- можно ентити создать еще одну) 😎
- и на туже таблицу в базе мапнуть и юзать там где нужна именно в плоском виде сущность
- Мне кажется, что с tree repository только проблемы)) Написать руками запрос на получение sub категорий и тд. проще, если я вас правильно понял?

Main message:
для задач по дереву юзать дерево репу, а для задач где плоские данные обычную репу и обычную ентити

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

для задач по дереву юзать дерево репу, а для задач где плоские данные обычную репу и обычную ентити

--

