## My telegram message #99559
**Time:** 29.03.2021 08:29:27 UTC+05:00
**Link:** https://t.me/nest_ru/99559

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я свой код управлять могу, там мб есть баг в либе каком нить, оттуда будет такое

Main message:
В трай катч заверни то что внутри метода контроллера

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

В трай катч заверни то что внутри метода контроллера

--

## My telegram message #99562
**Time:** 29.03.2021 08:54:49 UTC+05:00
**Link:** https://t.me/nest_ru/99562

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как выполнять селект внутри селекта в рамках призмы Ты тоже адепт, давай вместе страдать и искать решение

Main message:
Там если сущности связаны схемой призмы можно их соединять между собою в процессе составления жсон запроса, можно сортировать по вложенным полям или каут считать Если произвольный запрос то лучше на сыром делать Я все простые круды делаю на призме, все что больше и где запросы не простые сырым и запросами В тайп орм также делал, так как он не оптимальные запросы иногда делает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там если сущности связаны схемой призмы можно их соединять между собою в процессе составления жсон запроса, можно сортировать по вложенным полям или каут считать Если произвольный запрос то лучше на сыром делать Я все простые круды делаю на призме, все что больше и где запросы не простые сырым и запросами В тайп орм также делал, так как он не оптимальные запросы иногда делает

--

## My telegram message #99634
**Time:** 29.03.2021 18:48:38 UTC+05:00
**Link:** https://t.me/nest_ru/99634

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Только админству так не обучайся, а то они люди очень нервные и токсичные - зачморят
- да ну ладно, не все )) у меня в компании админы - вообще душки!
- Возможно, это последствия заболевания ковидом)
- Всем привет. Столкнулся с проблемой, не могу сериализовать json ответ своими руками. Мне надо подключить библу  fast-json-stringify  https://github.com/fastify/fast-json-stringify и она возвращает уже json строку, которую нужно отправить на фронт. Уже облазил все доки, но не нашел как это сделать. Пробовал сделать через interceptor, но стрим interceptor должен возвращать js тип, а следом за ним, я так понял, идет уже  JSON.stringify . Кто нибудь может подсказать в какую сторону хотя бы двигаться? Есть ли какой либо штатный способ запретить NestJS вызывать  JSON.stringify и вызывать его самому?

Main message:
в эту сторону нужно копнуть  https://docs.nestjs.com/techniques/mvc#example-1  @Get() root(@Res() res: Response) { return res.render( this.appService.getViewName(), { message: 'Hello world!' }, ); }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в эту сторону нужно копнуть  https://docs.nestjs.com/techniques/mvc#example-1  @Get() root(@Res() res: Response) { return res.render( this.appService.getViewName(), { message: 'Hello world!' }, ); }

--

## My telegram message #99640
**Time:** 29.03.2021 19:14:11 UTC+05:00
**Link:** https://t.me/nest_ru/99640

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет. Столкнулся с проблемой, не могу сериализовать json ответ своими руками. Мне надо подключить библу  fast-json-stringify  https://github.com/fastify/fast-json-stringify и она возвращает уже json строку, которую нужно отправить на фронт. Уже облазил все доки, но не нашел как это сделать. Пробовал сделать через interceptor, но стрим interceptor должен возвращать js тип, а следом за ним, я так понял, идет уже  JSON.stringify . Кто нибудь может подсказать в какую сторону хотя бы двигаться? Есть ли какой либо штатный способ запретить NestJS вызывать  JSON.stringify и вызывать его самому?
- в эту сторону нужно копнуть  https://docs.nestjs.com/techniques/mvc#example-1  @Get() root(@Res() res: Response) { return res.render( this.appService.getViewName(), { message: 'Hello world!' }, ); }
- супер! Круто! Спасибо)
- https://github.com/nestjs/nest/blob/master/packages/platform-express/adapters/express-adapter.ts#L31 Если на примере express адаптера смотреть, то вроде как строки он через res.send посылает. Если я правильно понял ) Может получится через интецептор типо такого сделать:  intercept(context: ExecutionContext, next: CallHandler): Observable<string> { return next.handle().pipe( map(res => serialize(res)) ); }

Main message:
кстати да, можно просто строку в ответ кинуть и все) которую через свой сирализатор сконвертил, чет я не подумал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кстати да, можно просто строку в ответ кинуть и все) которую через свой сирализатор сконвертил, чет я не подумал

--

## My telegram message #99647
**Time:** 29.03.2021 19:30:55 UTC+05:00
**Link:** https://t.me/nest_ru/99647

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- кстати да, можно просто строку в ответ кинуть и все) которую через свой сирализатор сконвертил, чет я не подумал
- мне кажется, или надо будет  @FastJsonStringify ({ schema: { } })
- странно, но такое работает только для файстифай адаптера. Хедер выставил и все сериализуется, все работает. С экспресс адаптером буду дальше разбираться) Скорей всего просто где-то натупил) Спасибо всем за помощь!)
- норм/не норм?

Main message:
нет, лучше сделай интерцепор для сериализации кастомный и группу можешь сразу из реквеста брать тамже или через декоратор навешивать над методом

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет, лучше сделай интерцепор для сериализации кастомный и группу можешь сразу из реквеста брать тамже или через декоратор навешивать над методом

--

## My telegram message #99650
**Time:** 29.03.2021 19:33:40 UTC+05:00
**Link:** https://t.me/nest_ru/99650

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- а если я этот сервис юзаю в других сервисах?

Main message:
вообще сериализировать нужно когда с кем то снаружи работаешь, это всетки тяжелые операции

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вообще сериализировать нужно когда с кем то снаружи работаешь, это всетки тяжелые операции

--

## My telegram message #99653
**Time:** 29.03.2021 19:34:34 UTC+05:00
**Link:** https://t.me/nest_ru/99653

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а если я этот сервис юзаю в других сервисах?
- Всем привет, студент изучаю Nest и RxJs, вопрос если мне нужно зделать регистрацию 1.посмотреть есть ли в базе такой емейл и имя Юзера, 2.Херишровать пароль. 3.Сохранять в базу, то я могу делать это с помощю swithMap? Вопрос может быть тяжёлым потому что сформулировали поверхностно.
- вообще сериализировать нужно когда с кем то снаружи работаешь, это всетки тяжелые операции
- интерцепторы же только на контроллеры вешаются?

Main message:
глобально можно и да только на контроллерах

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

глобально можно и да только на контроллерах

--

## My telegram message #99660
**Time:** 29.03.2021 19:40:21 UTC+05:00
**Link:** https://t.me/nest_ru/99660

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
на вход принимаем жсон, на выходе отдаем жсон, у тя и на вход класс и на выход класс, в декораторах можно задать поведение при выводе в плайн  https://github.com/nestjs/nest/blob/master/packages/common/serializer/class-serializer.interceptor.ts#L62 ну если контроллеры

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на вход принимаем жсон, на выходе отдаем жсон, у тя и на вход класс и на выход класс, в декораторах можно задать поведение при выводе в плайн  https://github.com/nestjs/nest/blob/master/packages/common/serializer/class-serializer.interceptor.ts#L62 ну если контроллеры

--

## My telegram message #99663
**Time:** 29.03.2021 19:42:01 UTC+05:00
**Link:** https://t.me/nest_ru/99663

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я про то, что нам нужен сам класс, который мы будем передавать в plainToClass

Main message:
то что на входе стоит он и спользуется для выхода, просто помечаем параметры через класс ту плайн

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

то что на входе стоит он и спользуется для выхода, просто помечаем параметры через класс ту плайн

--

## My telegram message #99668
**Time:** 29.03.2021 19:46:04 UTC+05:00
**Link:** https://t.me/nest_ru/99668

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у меня не typeorm а mongoose

Main message:
причем тут монго и тайп орм, в дто укажи  @Transform (({ value }) => moment(value), { toPlainOnly: true })  https://github.com/typestack/class-transformer#additional-data-transformation одно дто и для входа и для выхода

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

причем тут монго и тайп орм, в дто укажи  @Transform (({ value }) => moment(value), { toPlainOnly: true })  https://github.com/typestack/class-transformer#additional-data-transformation одно дто и для входа и для выхода

--

## My telegram message #99709
**Time:** 29.03.2021 21:09:18 UTC+05:00
**Link:** https://t.me/nest_ru/99709

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Я недавно начал изучать nestjs и меня смущают некоторые моменты, он запускается в одном потоке? И если на него прийдет 2 одновременно запроса, будут падать ошибки или другие необычные реакции, я пока не смог это съэмулировать с 4 компов, пытался отправить одновременно запрос, но он так быстро отрабатывал, что все было нормально! Конкретно интересует с какими проблемами столкнулись вы, при запуске приложения на проде

Main message:
Один человек может зафризить весь сервер

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Один человек может зафризить весь сервер

--

## My telegram message #99802
**Time:** 30.03.2021 08:19:36 UTC+05:00
**Link:** https://t.me/nest_ru/99802

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я правильно понимаю, что как такового api reference по nest.js нету?

Main message:
Чем оф дока не нравится?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Чем оф дока не нравится?

--

## My telegram message #99885
**Time:** 30.03.2021 17:50:08 UTC+05:00
**Link:** https://t.me/nest_ru/99885

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- та завязываться в своей бизнес логике на либы - идеологически непрально если либу удалишь то бизнес логика будет заафекчена и тд д из солида крч
- Но ты всё равно полностью бизнес-логику от внешних библиотек изолировать не сможешь. От фреймворка - да, но бизнес-логика вполне может юзать другие библиотеки - и это нормально совершенно
- хз, у меня онли тс в блл и на абстракциях завязано все
- думаю, если я буду удалять либу эту - у меня будут проблемы посерьезнее чем то что в бизнесс логике чет отвалится

Main message:
опять цел день будете тереть про свои мысли) чат же есть для мыслей  https://t.me/nest_random

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

опять цел день будете тереть про свои мысли) чат же есть для мыслей  https://t.me/nest_random

--

## My telegram message #99889
**Time:** 30.03.2021 17:51:25 UTC+05:00
**Link:** https://t.me/nest_ru/99889

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- опять цел день будете тереть про свои мысли) чат же есть для мыслей  https://t.me/nest_random
- так мы ж не политику или новости обсуждаем
- тогда здесь будут только вопросы про тайпорм)
- или если в сообщении нет слова нестжс - это сообщение должно идти в оффтоп?)

Main message:
а тут лучше конретику обсуждать) или решать реальные проблемы, просто народу много тут сидит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а тут лучше конретику обсуждать) или решать реальные проблемы, просто народу много тут сидит

--

## My telegram message #99894
**Time:** 30.03.2021 17:53:08 UTC+05:00
**Link:** https://t.me/nest_ru/99894

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- на нгинксе сделай proxy_pass на бэк

Main message:
+1

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

+1

--

## My telegram message #99896
**Time:** 30.03.2021 18:16:53 UTC+05:00
**Link:** https://t.me/nest_ru/99896

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, у меня монорепа, норм практика будет вынести dto куда-то в libs и использовать из в репозитории и в контроллерах?

Main message:
Если шаришь на фронт то да, иначе лучше рядом с контроллерами держать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Если шаришь на фронт то да, иначе лучше рядом с контроллерами держать

--

## My telegram message #99898
**Time:** 30.03.2021 18:25:00 UTC+05:00
**Link:** https://t.me/nest_ru/99898

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- +1
- Всем привет, у меня монорепа, норм практика будет вынести dto куда-то в libs и использовать из в репозитории и в контроллерах?
- Если шаришь на фронт то да, иначе лучше рядом с контроллерами держать
- Не шарю. А для репозиториев получается дублировать?

Main message:
контроллеры отдают и принимают в дто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

контроллеры отдают и принимают в дто

--

## My telegram message #99902
**Time:** 30.03.2021 18:26:45 UTC+05:00
**Link:** https://t.me/nest_ru/99902

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Если шаришь на фронт то да, иначе лучше рядом с контроллерами держать
- Не шарю. А для репозиториев получается дублировать?
- контроллеры отдают и принимают в дто
- Отдавать да, а вот принимать

Main message:
интерфейс можно по идее туда поставить, а дто от этого интерфейса имплементить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

интерфейс можно по идее туда поставить, а дто от этого интерфейса имплементить

--

## My telegram message #99911
**Time:** 30.03.2021 19:46:48 UTC+05:00
**Link:** https://t.me/nest_ru/99911

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- 1) нафига для дто интерфейс? 2) просто наследование для наследования 3) дто - это чисто данные энтити - это чисто данные интерфейс - контракт поведения

Main message:
т - типизация, чтобы когда в сервисе данные сменились они по цепочке все завалили

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

т - типизация, чтобы когда в сервисе данные сменились они по цепочке все завалили

--

## My telegram message #99918
**Time:** 30.03.2021 19:52:52 UTC+05:00
**Link:** https://t.me/nest_ru/99918

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тут ничего не нашлось?  https://docs.nestjs.com/openapi/introduction
- 1) нафига для дто интерфейс? 2) просто наследование для наследования 3) дто - это чисто данные энтити - это чисто данные интерфейс - контракт поведения
- т - типизация, чтобы когда в сервисе данные сменились они по цепочке все завалили
- проблема только в том, что отношение не is a будет, если отнаследовать дто и энтити от одного интерфейса

Main message:
модуль с фичей имеет интерфейс как контракт для всех кто юзает этот модуль, внутри у себя для своих нужд юзает ентити, приложение подрубает модуль и в приложении есть контроллер который работает с сервисом модуля, и он пишет дто которое должно быть совместимо с интерфейсом модуля, да можно не имплиентить оно и так упадет а можно и имплементить кому как нравится, если имплмементить то при билде в сиай оно покажет дто которое разьехалось, а если не имплментить оно покажет место передачи дто в сервис, и в сиай ты не увидешь сразу, нужно будет забрать код и локально линт прогнать и потом пойти в метод птом уже в дто, тоесть немного дольше придется посидеть чтобы исправить ну кому как нравится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модуль с фичей имеет интерфейс как контракт для всех кто юзает этот модуль, внутри у себя для своих нужд юзает ентити, приложение подрубает модуль и в приложении есть контроллер который работает с сервисом модуля, и он пишет дто которое должно быть совместимо с интерфейсом модуля, да можно не имплиентить оно и так упадет а можно и имплементить кому как нравится, если имплмементить то при билде в сиай оно покажет дто которое разьехалось, а если не имплментить оно покажет место передачи дто в сервис, и в сиай ты не увидешь сразу, нужно будет забрать код и локально линт прогнать и потом пойти в метод птом уже в дто, тоесть немного дольше придется посидеть чтобы исправить ну кому как нравится

--

## My telegram message #99925
**Time:** 30.03.2021 20:00:17 UTC+05:00
**Link:** https://t.me/nest_ru/99925

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ДТО в респонс не используют

Main message:
для трансформации и удаления лишних полей, с базы забрал 15 полей, а отдать нужно 4, вот лишние нужно порезать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

для трансформации и удаления лишних полей, с базы забрал 15 полей, а отдать нужно 4, вот лишние нужно порезать

--

## My telegram message #99927
**Time:** 30.03.2021 20:01:00 UTC+05:00
**Link:** https://t.me/nest_ru/99927

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- то есть ты предлагаешь что-то типа такого? interface User {} class UserEntity implements User {} class CreateUserDto implements User {}

Main message:
ну в рамках начального вопроса да, ну не как общая практика, все пишут как удобнее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну в рамках начального вопроса да, ну не как общая практика, все пишут как удобнее

--

## My telegram message #99929
**Time:** 30.03.2021 20:01:35 UTC+05:00
**Link:** https://t.me/nest_ru/99929

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- в Entity можно описать и ты мне когда то советовал так сделать)

Main message:
) помнишь еще, у меня просто нет больше слоя ентити, поэтому оговариваюсь)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) помнишь еще, у меня просто нет больше слоя ентити, поэтому оговариваюсь)

--

## My telegram message #99940
**Time:** 30.03.2021 20:06:47 UTC+05:00
**Link:** https://t.me/nest_ru/99940

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
нету чета у меня публичных таких примеров)  https://github.com/typestack/class-transformer#skipping-depend-of-operation

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нету чета у меня публичных таких примеров)  https://github.com/typestack/class-transformer#skipping-depend-of-operation

--

## My telegram message #99943
**Time:** 30.03.2021 20:08:20 UTC+05:00
**Link:** https://t.me/nest_ru/99943

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Слушай а зачем костылить наследование, где оно нарушает принципы ООП и ООАиД, если можно обмазаться тестами, чтобы спастись от описанной выше проблемы?

Main message:
пиши, я ничего не утверждаю, просто совет дал как можно, как делать разраб сам уже решит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

пиши, я ничего не утверждаю, просто совет дал как можно, как делать разраб сам уже решит

--

## My telegram message #99945
**Time:** 30.03.2021 20:09:25 UTC+05:00
**Link:** https://t.me/nest_ru/99945

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- эт ж дорого
- +
- пиши, я ничего не утверждаю, просто совет дал как можно, как делать разраб сам уже решит
- если DTO1 и DTO2 будут сильно отличаться. Interface не поможет, оно проверит что 1 поле присутствует, когда их на самом деле в сущности более 30

Main message:
мне жалко время, лучше я тесты на что нить другое в это время напишу, чем тесты для контрактов писать и если паралельно со мною еще 5 разрабов эти контракты меняют и дто и ентити, я только и буду заниматся починкой тестов

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне жалко время, лучше я тесты на что нить другое в это время напишу, чем тесты для контрактов писать и если паралельно со мною еще 5 разрабов эти контракты меняют и дто и ентити, я только и буду заниматся починкой тестов

--

## My telegram message #99947
**Time:** 30.03.2021 20:10:28 UTC+05:00
**Link:** https://t.me/nest_ru/99947

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- если DTO1 и DTO2 будут сильно отличаться. Interface не поможет, оно проверит что 1 поле присутствует, когда их на самом деле в сущности более 30

Main message:
есть Omit<Test, "a"> чтобы убрать лишние

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть Omit<Test, "a"> чтобы убрать лишние

--

## My telegram message #99953
**Time:** 30.03.2021 20:13:46 UTC+05:00
**Link:** https://t.me/nest_ru/99953

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мне жалко время, лучше я тесты на что нить другое в это время напишу, чем тесты для контрактов писать и если паралельно со мною еще 5 разрабов эти контракты меняют и дто и ентити, я только и буду заниматся починкой тестов
- А всякие Exclude, Include для subtype?)
- есть Omit<Test, "a"> чтобы убрать лишние
- это сделано для того чтобы не тянуть в select вещи которые не учавствуют вбизнес логике. Для остального select

Main message:
делал разные ентити и дто там) без имплементации, падало в момент входа в сервис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

делал разные ентити и дто там) без имплементации, падало в момент входа в сервис

--

## My telegram message #100002
**Time:** 30.03.2021 21:21:45 UTC+05:00
**Link:** https://t.me/nest_ru/100002

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Тогда и Ангуляр отвалится, кстати? В нём тоже ж декораторы

Main message:
Да в нем тоже, если в декораторах нет логики и использовать их только для разметки, то не сложно будет переехать, в ангулар и несте ток для разметки юзается в основном

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да в нем тоже, если в декораторах нет логики и использовать их только для разметки, то не сложно будет переехать, в ангулар и несте ток для разметки юзается в основном

--

## My telegram message #100004
**Time:** 30.03.2021 21:26:53 UTC+05:00
**Link:** https://t.me/nest_ru/100004

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хм
- да-да
- Да в нем тоже, если в декораторах нет логики и использовать их только для разметки, то не сложно будет переехать, в ангулар и несте ток для разметки юзается в основном
- Так а откуда шорох, что декораторов не будет?

Main message:
Где шорох)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Где шорох)

--

## My telegram message #100008
**Time:** 30.03.2021 21:30:10 UTC+05:00
**Link:** https://t.me/nest_ru/100008

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да в нем тоже, если в декораторах нет логики и использовать их только для разметки, то не сложно будет переехать, в ангулар и несте ток для разметки юзается в основном
- Так а откуда шорох, что декораторов не будет?
- Где шорох)
- Логично. Ведь без разницы, есть они в js или нет

Main message:
Нам как разрабам прикладным не стоит переживать, и если пишешь декоры свои то только для разметки их используй, для обработки юзай функцию билдера

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нам как разрабам прикладным не стоит переживать, и если пишешь декоры свои то только для разметки их используй, для обработки юзай функцию билдера

--

## My telegram message #100019
**Time:** 30.03.2021 21:50:09 UTC+05:00
**Link:** https://t.me/nest_ru/100019

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
да ты не понял) юнит тесты попиши на логики и поймешь когда делаешь модуль для какойто штуки птом в тестах только этот моудль и юзаешь, изолируешь модуль как бы от всего приложения и твоя задача в рамках модуля и остается только, не аффектя все приложение

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да ты не понял) юнит тесты попиши на логики и поймешь когда делаешь модуль для какойто штуки птом в тестах только этот моудль и юзаешь, изолируешь модуль как бы от всего приложения и твоя задача в рамках модуля и остается только, не аффектя все приложение

--

## My telegram message #100021
**Time:** 30.03.2021 21:50:54 UTC+05:00
**Link:** https://t.me/nest_ru/100021

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я все равно в спринге сервисы без декораторов делал ну а модуль, да, не сильно нужная штуковина
- Модуль даёт мобильность для импорта и шаринга кода(nest сущностей: сервисы и тд). Удобнее импортировать/шарить модулями, чем отдельными частями типа сервиса
- да ты не понял) юнит тесты попиши на логики и поймешь когда делаешь модуль для какойто штуки птом в тестах только этот моудль и юзаешь, изолируешь модуль как бы от всего приложения и твоя задача в рамках модуля и остается только, не аффектя все приложение
- я без неста тесты пишу

Main message:
как раз в спринге не было такого, там нейспейсы типа для такого

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как раз в спринге не было такого, там нейспейсы типа для такого

--

## My telegram message #100026
**Time:** 30.03.2021 21:59:08 UTC+05:00
**Link:** https://t.me/nest_ru/100026

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Так всё равно же приходится делать импорт нужного класса / интерфейся при инъекции))

Main message:
без модуля в котором провайдер висит на экспорт у тя выйдет две копии сервиса внутри диай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

без модуля в котором провайдер висит на экспорт у тя выйдет две копии сервиса внутри диай

--

## My telegram message #100030
**Time:** 30.03.2021 22:04:48 UTC+05:00
**Link:** https://t.me/nest_ru/100030

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Похоже что сначала нужно добавлять ProfileData
- без модуля в котором провайдер висит на экспорт у тя выйдет две копии сервиса внутри диай
- да, спасибо
- Так модули это не про простые классы ts, а про сущности nest. мол сервисы, пайпы и тд, Обычные классы в модули не пихают, напрямую импортят

Main message:
в спринге это и бесило что нет скоупов по диай, один большой контейнер и туда все все импортят, может и можно было как то сделать, я чет не изучал глубоко, хотелось много контейнеров с диай, чтобы они не пересекались и реализацию например в 5 таких контейнерах для сервиса А иметь Б и в одном из контейнеров реализация уже С, но фиг так не выходило там

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в спринге это и бесило что нет скоупов по диай, один большой контейнер и туда все все импортят, может и можно было как то сделать, я чет не изучал глубоко, хотелось много контейнеров с диай, чтобы они не пересекались и реализацию например в 5 таких контейнерах для сервиса А иметь Б и в одном из контейнеров реализация уже С, но фиг так не выходило там

--

## My telegram message #100033
**Time:** 30.03.2021 22:06:00 UTC+05:00
**Link:** https://t.me/nest_ru/100033

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да, спасибо
- Так модули это не про простые классы ts, а про сущности nest. мол сервисы, пайпы и тд, Обычные классы в модули не пихают, напрямую импортят
- в спринге это и бесило что нет скоупов по диай, один большой контейнер и туда все все импортят, может и можно было как то сделать, я чет не изучал глубоко, хотелось много контейнеров с диай, чтобы они не пересекались и реализацию например в 5 таких контейнерах для сервиса А иметь Б и в одном из контейнеров реализация уже С, но фиг так не выходило там
- А нафиг это нужно? Вот реально за всё время разработки такого не требовалось)

Main message:
ну такое и в несте вроде не пашет нифига

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну такое и в несте вроде не пашет нифига

--

## My telegram message #100036
**Time:** 30.03.2021 22:06:38 UTC+05:00
**Link:** https://t.me/nest_ru/100036

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в спринге это и бесило что нет скоупов по диай, один большой контейнер и туда все все импортят, может и можно было как то сделать, я чет не изучал глубоко, хотелось много контейнеров с диай, чтобы они не пересекались и реализацию например в 5 таких контейнерах для сервиса А иметь Б и в одном из контейнеров реализация уже С, но фиг так не выходило там
- А нафиг это нужно? Вот реально за всё время разработки такого не требовалось)
- ну такое и в несте вроде не пашет нифига
- Если прилагу можно по DI контейнерам разделить, значит, её можно вообще по разным проектам разнести

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #100040
**Time:** 30.03.2021 22:08:37 UTC+05:00
**Link:** https://t.me/nest_ru/100040

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну такое и в несте вроде не пашет нифига
- Если прилагу можно по DI контейнерам разделить, значит, её можно вообще по разным проектам разнести
- да
- Я, видимо, настолько огромные сервисы не писал, где был бы хоть какой-то профит с этого

Main message:
отправка подтверждения на емайл и смс например

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

отправка подтверждения на емайл и смс например

--

## My telegram message #100046
**Time:** 30.03.2021 22:10:45 UTC+05:00
**Link:** https://t.me/nest_ru/100046

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- отправка подтверждения на емайл и смс например
- так и зачем модуль
- Это просто шаблон стратегия и всё. Зачем DI делить?
- +1

Main message:
сперва небыло смс, потом сказалми добавить смс, птом сказали добавить звонилку аи, птом курьер должен пойти отдать письмо и чекнуть в приложении что он отдал, увеличиваются слои внутренних модулей и реализаций

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сперва небыло смс, потом сказалми добавить смс, птом сказали добавить звонилку аи, птом курьер должен пойти отдать письмо и чекнуть в приложении что он отдал, увеличиваются слои внутренних модулей и реализаций

--

## My telegram message #100048
**Time:** 30.03.2021 22:11:01 UTC+05:00
**Link:** https://t.me/nest_ru/100048

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это просто шаблон стратегия и всё. Зачем DI делить?
- +1
- сперва небыло смс, потом сказалми добавить смс, птом сказали добавить звонилку аи, птом курьер должен пойти отдать письмо и чекнуть в приложении что он отдал, увеличиваются слои внутренних модулей и реализаций
- так и модуль тут причем?

Main message:
каждая реализация это моудль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

каждая реализация это моудль

--

## My telegram message #100052
**Time:** 30.03.2021 22:12:14 UTC+05:00
**Link:** https://t.me/nest_ru/100052

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сперва небыло смс, потом сказалми добавить смс, птом сказали добавить звонилку аи, птом курьер должен пойти отдать письмо и чекнуть в приложении что он отдал, увеличиваются слои внутренних модулей и реализаций
- так и модуль тут причем?
- каждая реализация это моудль
- Чет переусложняешь

Main message:
а в прилаге это выглядмит вот так imports:[EmailDostavchik,SMSDostavchik,AIPhoneDostavchik,CurierDostavchik]

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

а в прилаге это выглядмит вот так imports:[EmailDostavchik,SMSDostavchik,AIPhoneDostavchik,CurierDostavchik]

--

## My telegram message #100060
**Time:** 30.03.2021 22:17:04 UTC+05:00
**Link:** https://t.me/nest_ru/100060

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- каждая реализация это моудль
- Чет переусложняешь
- а в прилаге это выглядмит вот так imports:[EmailDostavchik,SMSDostavchik,AIPhoneDostavchik,CurierDostavchik]
- Я это понял, и ты описываешь шаблон стратегия. Но я не понял всё равно, зачем для этого "хотелось много контейнеров с диай, чтобы они не пересекались"

Main message:
шагов много внутри

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

шагов много внутри

--

## My telegram message #100067
**Time:** 30.03.2021 22:22:44 UTC+05:00
**Link:** https://t.me/nest_ru/100067

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а в прилаге это выглядмит вот так imports:[EmailDostavchik,SMSDostavchik,AIPhoneDostavchik,CurierDostavchik]
- Я это понял, и ты описываешь шаблон стратегия. Но я не понял всё равно, зачем для этого "хотелось много контейнеров с диай, чтобы они не пересекались"
- шагов много внутри
- А если инжектить конкретную реализацию? Ну, 1 2 3 4 - в EmailDostavchik и 1 2 3(кастом1) 4 - в SMSDostavchik. Разве 3 и 3 (кастом 1) будет пересекаться?

Main message:
1 2 3 4 вложенность я показал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

1 2 3 4 вложенность я показал

--

## My telegram message #100071
**Time:** 30.03.2021 22:23:16 UTC+05:00
**Link:** https://t.me/nest_ru/100071

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- шагов много внутри
- А если инжектить конкретную реализацию? Ну, 1 2 3 4 - в EmailDostavchik и 1 2 3(кастом1) 4 - в SMSDostavchik. Разве 3 и 3 (кастом 1) будет пересекаться?
- 1 2 3 4 вложенность я показал
- А, вложенность. Я думал, это ты перечислил сервисы просто

Main message:
сорян

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сорян

--

## My telegram message #100073
**Time:** 30.03.2021 22:24:00 UTC+05:00
**Link:** https://t.me/nest_ru/100073

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 1 2 3 4 вложенность я показал
- А, вложенность. Я думал, это ты перечислил сервисы просто
- сорян
- Ну тогда да, не подумал о такой ситуации

Main message:
в ангулар часто такое все делаем, в несте по работе пытался, но в итоге тех дир сказал выкинуть)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в ангулар часто такое все делаем, в несте по работе пытался, но в итоге тех дир сказал выкинуть)

--

## My telegram message #100077
**Time:** 30.03.2021 22:24:49 UTC+05:00
**Link:** https://t.me/nest_ru/100077

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сорян
- Ну тогда да, не подумал о такой ситуации
- в ангулар часто такое все делаем, в несте по работе пытался, но в итоге тех дир сказал выкинуть)
- Ну я бы такое тоже делать не стал. Слишком сложно ИМХО для восприятия

Main message:
да оно кажется сложным новичкам

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да оно кажется сложным новичкам

--

## My telegram message #100081
**Time:** 30.03.2021 22:25:38 UTC+05:00
**Link:** https://t.me/nest_ru/100081

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в ангулар часто такое все делаем, в несте по работе пытался, но в итоге тех дир сказал выкинуть)
- Ну я бы такое тоже делать не стал. Слишком сложно ИМХО для восприятия
- да оно кажется сложным новичкам
- Хз. Я в разработке не новичок, но выглядит сложно

Main message:
новичкам в диай)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

новичкам в диай)

--

## My telegram message #100083
**Time:** 30.03.2021 22:27:28 UTC+05:00
**Link:** https://t.me/nest_ru/100083

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да оно кажется сложным новичкам
- Хз. Я в разработке не новичок, но выглядит сложно
- новичкам в диай)
- У меня просто не было необходимости кастомизировать что-то именно в середине иерархии зависимостей

Main message:
когда не знаешь что можно и так, то и не делаешь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

когда не знаешь что можно и так, то и не делаешь

--

## My telegram message #100090
**Time:** 30.03.2021 22:29:45 UTC+05:00
**Link:** https://t.me/nest_ru/100090

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- новичкам в диай)
- У меня просто не было необходимости кастомизировать что-то именно в середине иерархии зависимостей
- когда не знаешь что можно и так, то и не делаешь
- На самом деле, выглядит-то проще

Main message:
лишний код в таком случаи приходит даже если сделаешь абстркные методы только для определенных вещей

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лишний код в таком случаи приходит даже если сделаешь абстркные методы только для определенных вещей

--

## My telegram message #100111
**Time:** 30.03.2021 23:00:30 UTC+05:00
**Link:** https://t.me/nest_ru/100111

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну, миграции я для начала генерирую, потом уже ручками шлифую. И на каждое микроизменение, которых в процессе разработки (первоначальной) много делать миграцию - мороки много

Main message:
про миграции писал уже, думать больше заставляют, и старатся нормально все предусмотреть чтобы потом тыщу раз не писать миграции для модификации тебе повезет если не грохнешь данные в проде при использовании генерируемых миграций) всегда все только руками нужно писать и сто раз обдумав что как будет хранится и как запросы будут строится

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

про миграции писал уже, думать больше заставляют, и старатся нормально все предусмотреть чтобы потом тыщу раз не писать миграции для модификации тебе повезет если не грохнешь данные в проде при использовании генерируемых миграций) всегда все только руками нужно писать и сто раз обдумав что как будет хранится и как запросы будут строится

--

## My telegram message #100130
**Time:** 30.03.2021 23:05:34 UTC+05:00
**Link:** https://t.me/nest_ru/100130

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у меня в голове в центре блл а снаружи бд и презентации, и у меня тайпормовские ентити не попадают в блл

Main message:
у меня бл с схемой бд идет сразу в голове

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня бл с схемой бд идет сразу в голове

--

## My telegram message #100140
**Time:** 30.03.2021 23:08:04 UTC+05:00
**Link:** https://t.me/nest_ru/100140

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- сегодня я фанат солидов и чистой архитектуры, так что осуждаю

Main message:
я в парусе работал, там кода не было все только в бд, гуи строился по метаданным из базы, логики все в базе, много лет там работал, так что вот так вот у меня в мозгу, бэк это прослойка между фронтом и базой

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я в парусе работал, там кода не было все только в бд, гуи строился по метаданным из базы, логики все в базе, много лет там работал, так что вот так вот у меня в мозгу, бэк это прослойка между фронтом и базой

--

## My telegram message #100145
**Time:** 30.03.2021 23:09:32 UTC+05:00
**Link:** https://t.me/nest_ru/100145

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://parus.com/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://parus.com/

--

## My telegram message #100156
**Time:** 30.03.2021 23:13:13 UTC+05:00
**Link:** https://t.me/nest_ru/100156

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy Привет, чуть выше видел что вы общались по поводу dto и реализации, можно небольшой пример, допустим у меня есть интерфейс user с 20 полями, я реализую его с entity, там мне нужны все поля, но есть некоторые запросы, которые возвращают различные поля юзера, к примеру один возвращает 10 полей, другой 8, и т.д. как я могу частично реализовывать интерфейс, в случае если мне для каждого такого запроса нужно сгенерить swagger, в которых должны быть только те поля, которые отдаются в этом запросе?

Main message:
отдельные дто( только так, одна из причин почему я ушел в граф

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

отдельные дто( только так, одна из причин почему я ушел в граф

--

## My telegram message #100160
**Time:** 30.03.2021 23:15:17 UTC+05:00
**Link:** https://t.me/nest_ru/100160

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Как тебе оброботка ошибок в гарфе?

Main message:
я пока на это забил)) по фичам задач много, а так как дто на фронте теже самые, то с фронта запросы не уходят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я пока на это забил)) по фичам задач много, а так как дто на фронте теже самые, то с фронта запросы не уходят

--

## My telegram message #100168
**Time:** 30.03.2021 23:25:43 UTC+05:00
**Link:** https://t.me/nest_ru/100168

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Хотел максимально переиспользовать все, буду смотреть в сторону графа на будущих проектах, валидации с помощью груп максимально переиспользую, а тут тогда буду описывать, спасибо)

Main message:
именно с валидацией там затык немного в графе, когда нить доберусь и решу, отпишу может сюда или спроси когда решишь попробовать граф, может я в то время решу и отпишу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

именно с валидацией там затык немного в графе, когда нить доберусь и решу, отпишу может сюда или спроси когда решишь попробовать граф, может я в то время решу и отпишу)

--

## My telegram message #100171
**Time:** 30.03.2021 23:28:42 UTC+05:00
**Link:** https://t.me/nest_ru/100171

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- был бы больше рад, если бы удалось помочь
- Хотел максимально переиспользовать все, буду смотреть в сторону графа на будущих проектах, валидации с помощью груп максимально переиспользую, а тут тогда буду описывать, спасибо)
- именно с валидацией там затык немного в графе, когда нить доберусь и решу, отпишу может сюда или спроси когда решишь попробовать граф, может я в то время решу и отпишу)
- Я сам пол вечера потратил на то что б разобраться когда как оно отрабатывает, но вроде маскимально настроил под свои нужды, до 5 групп в 1 дто получается

Main message:
там в двух группах уже путаешся а у тя 5)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там в двух группах уже путаешся а у тя 5)

--

## My telegram message #100173
**Time:** 30.03.2021 23:31:22 UTC+05:00
**Link:** https://t.me/nest_ru/100173

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- именно с валидацией там затык немного в графе, когда нить доберусь и решу, отпишу может сюда или спроси когда решишь попробовать граф, может я в то время решу и отпишу)
- Я сам пол вечера потратил на то что б разобраться когда как оно отрабатывает, но вроде маскимально настроил под свои нужды, до 5 групп в 1 дто получается
- там в двух группах уже путаешся а у тя 5)
- )) ну 5 не везде, просто есть сущности с 25+ полями, и копипастить много получится

Main message:
еще есть вариант бить их на мелкие дто, чисто для транспорта, а базе хранить как одну сущность

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

еще есть вариант бить их на мелкие дто, чисто для транспорта, а базе хранить как одну сущность

--

## My telegram message #100182
**Time:** 31.03.2021 00:05:59 UTC+05:00
**Link:** https://t.me/nest_ru/100182

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как вариант, попробую поиграться с таким подходом
- А вариант по поводу dto через  nestjs/mapped-types не очень?
- Лично я не пробовал через него, завтра утром попробую, может нормально будет, спасибо
- Я сам ещё не пробовал) просто вроде чуть сокращает время написания

Main message:
Module.forConsumer(тут урлы или доменное имя передаешь где лежит мс или урл к редис или еще какието настройки) - когда хочу использовать чужие ендпойнты Module.forProducer(тут урлы или доменное имя передаешь где лежит мс или урл к редис или еще какието настройки) - при подключении в приложение появляются ендпойнты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Module.forConsumer(тут урлы или доменное имя передаешь где лежит мс или урл к редис или еще какието настройки) - когда хочу использовать чужие ендпойнты Module.forProducer(тут урлы или доменное имя передаешь где лежит мс или урл к редис или еще какието настройки) - при подключении в приложение появляются ендпойнты

--

## My telegram message #100187
**Time:** 31.03.2021 00:12:01 UTC+05:00
**Link:** https://t.me/nest_ru/100187

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Лично я не пробовал через него, завтра утром попробую, может нормально будет, спасибо
- Я сам ещё не пробовал) просто вроде чуть сокращает время написания
- Module.forConsumer(тут урлы или доменное имя передаешь где лежит мс или урл к редис или еще какието настройки) - когда хочу использовать чужие ендпойнты Module.forProducer(тут урлы или доменное имя передаешь где лежит мс или урл к редис или еще какието настройки) - при подключении в приложение появляются ендпойнты
- Я пока что вынес grpc clients в либы, и просто подключаю как провайдер

Main message:
вот типа того тоже да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот типа того тоже да

--

## My telegram message #100193
**Time:** 31.03.2021 00:16:00 UTC+05:00
**Link:** https://t.me/nest_ru/100193

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Т.е. грубо говоря dto из одного мс будет доступно в другом мс? Нужно будет попробовать

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #100198
**Time:** 31.03.2021 00:22:07 UTC+05:00
**Link:** https://t.me/nest_ru/100198

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Т.е. грубо говоря dto из одного мс будет доступно в другом мс? Нужно будет попробовать
- И самое печальное что на данный момент все равно дублирую дто в гейтвее, так как там накатываю клас валидатор и свагер
- да
- Ну можно попробовать, тогда будет только ентити и интерфейсы которые автоматом генерируются, а с интерфейсов дто классы

Main message:
я начинал делать такую фигню, пишу дто для бэка, с декораторами графа, и скрипт копирует их в либу и при этом сносит декораторы графа) - идея такая была но потом чет другими делами занялся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я начинал делать такую фигню, пишу дто для бэка, с декораторами графа, и скрипт копирует их в либу и при этом сносит декораторы графа) - идея такая была но потом чет другими делами занялся

--

## My telegram message #100229
**Time:** 31.03.2021 02:09:23 UTC+05:00
**Link:** https://t.me/nest_ru/100229

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- можете перефразировать, чет не понял.
- Как я понял просто отлавливайте код ошибки
- ну код not_found. я в filter получаю это. а откуда мне знать это route not found или user not found
- export class HttpExceptionFilter implements ExceptionFilter { public catch(exception: HttpException, host: ArgumentsHost) { const ctx = host.switchToHttp(); const response = ctx.getResponse(); const request = ctx.getRequest(); const status = exception.getStatus(); if (status === 404) { response .status(status) .send( 'Go to home page <a href="https://my.url/">https://my.url/</a>', ); } else { response.status(status).json({ statusCode: status, timestamp: new Date().toISOString(), path: request.url, }); } } }

Main message:
https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts такое еще есть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts такое еще есть

--

## My telegram message #100232
**Time:** 31.03.2021 02:13:53 UTC+05:00
**Link:** https://t.me/nest_ru/100232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- export class HttpExceptionFilter implements ExceptionFilter { public catch(exception: HttpException, host: ArgumentsHost) { const ctx = host.switchToHttp(); const response = ctx.getResponse(); const request = ctx.getRequest(); const status = exception.getStatus(); if (status === 404) { response .status(status) .send( 'Go to home page <a href="https://my.url/">https://my.url/</a>', ); } else { response.status(status).json({ statusCode: status, timestamp: new Date().toISOString(), path: request.url, }); } } }
- https://github.com/rucken/core-nestjs/blob/develop/libs/rucken/core-nestjs/src/filters/custom-exception.filter.ts такое еще есть
- ну статус код  NotFoundException всегда 404. это не решает мою проблему, ошибкаа была от неста, из за роута, или я сам кидал, потому что юзера нет
- Писать кастомные ошибки и проверять на instance of можно ещё попробовать

Main message:
по ссылке выше как это

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по ссылке выше как это

--

## My telegram message #100245
**Time:** 31.03.2021 10:22:54 UTC+05:00
**Link:** https://t.me/nest_ru/100245

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy  https://docs.nestjs.com/openapi/mapped-types с помощью этого можно не дублировать поля в разных ДТО, попробовал, работает

Main message:
о супер! надо пробнуть

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

о супер! надо пробнуть

--

## My telegram message #100258
**Time:** 31.03.2021 13:49:11 UTC+05:00
**Link:** https://t.me/nest_ru/100258

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Подскажите новичку, если не затруднит. Есть стек Nuxt + Nest, оба на тайпскрипте. Как можно переиспользовать общие интерфейсы типов на фронте и бэке?

Main message:
нужно в монорепу схлопнуть на nx например и там сделать два аппа ./apps/nuxt ./apps/nest и общую либу ./libs/common

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нужно в монорепу схлопнуть на nx например и там сделать два аппа ./apps/nuxt ./apps/nest и общую либу ./libs/common

--

## My telegram message #100263
**Time:** 31.03.2021 13:50:21 UTC+05:00
**Link:** https://t.me/nest_ru/100263

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я лично делал services shared
- А в общей либе обычно что находится? Дто?
- nx - что это?
- Это страшно

Main message:
https://nx.dev/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://nx.dev/

--

## My telegram message #100265
**Time:** 31.03.2021 13:51:29 UTC+05:00
**Link:** https://t.me/nest_ru/100265

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А в общей либе обычно что находится? Дто?

Main message:
дто, валидаторы, интерфейсы, мелочь всякая, переводы, словари, кастомные ошибки, енам

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дто, валидаторы, интерфейсы, мелочь всякая, переводы, словари, кастомные ошибки, енам

--

## My telegram message #100269
**Time:** 31.03.2021 14:03:04 UTC+05:00
**Link:** https://t.me/nest_ru/100269

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- «Движок» монорепозитория
- дто, валидаторы, интерфейсы, мелочь всякая, переводы, словари, кастомные ошибки, енам
- Пока изучал - опплевался и забил))
- Аналогично

Main message:
нест кли же тоже монорепозиторий, тот же нкс просто урезанный

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нест кли же тоже монорепозиторий, тот же нкс просто урезанный

--

## My telegram message #100275
**Time:** 31.03.2021 14:09:15 UTC+05:00
**Link:** https://t.me/nest_ru/100275

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Аналогично
- нест кли же тоже монорепозиторий, тот же нкс просто урезанный
- ребят как то можно сбросить миграцию? чет не мигрируется в БД как указано в dist/migration/42352353235-init.js
- Парадокс в том, что 2 команды и почти никогда не тронутый конфиг, это не миллиард непонятных штук в nx

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #100277
**Time:** 31.03.2021 14:14:26 UTC+05:00
**Link:** https://t.me/nest_ru/100277

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ребят как то можно сбросить миграцию? чет не мигрируется в БД как указано в dist/migration/42352353235-init.js
- Парадокс в том, что 2 команды и почти никогда не тронутый конфиг, это не миллиард непонятных штук в nx
- )
- Это на словах так. По факту там много тонкостей. Начиная с конфигов, консольных команд и заканчивая общим node_modules (что тоже такое себе, ибо образ раздувается)

Main message:
ну для имаджей свой пакедж жсон так то)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну для имаджей свой пакедж жсон так то)

--

## My telegram message #100281
**Time:** 31.03.2021 14:16:26 UTC+05:00
**Link:** https://t.me/nest_ru/100281

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )
- Это на словах так. По факту там много тонкостей. Начиная с конфигов, консольных команд и заканчивая общим node_modules (что тоже такое себе, ибо образ раздувается)
- ну для имаджей свой пакедж жсон так то)
- Ну вот ставлю я через  npm i typeorm например - и как, руками делать отдельный package.json?

Main message:
для фронта не нужен отдельный пакедж, там веб пак норм все билдит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

для фронта не нужен отдельный пакедж, там веб пак норм все билдит

--

## My telegram message #100286
**Time:** 31.03.2021 14:22:26 UTC+05:00
**Link:** https://t.me/nest_ru/100286

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
при создании образа докер имаджа нужно использовтаь другой пакедж жсон а не тот же что и в репе)))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

при создании образа докер имаджа нужно использовтаь другой пакедж жсон а не тот же что и в репе)))

--

## My telegram message #100288
**Time:** 31.03.2021 14:22:56 UTC+05:00
**Link:** https://t.me/nest_ru/100288

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у нх есть пропертя чтобы при сборке он сгенерил package.json в котором будут только те рантайм зависимости, которые требуются конкретному микросервису

Main message:
оно не все схватило, руками пишу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

оно не все схватило, руками пишу

--

## My telegram message #100292
**Time:** 31.03.2021 14:25:16 UTC+05:00
**Link:** https://t.me/nest_ru/100292

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Появилась идея сейчас между фронтом и беком (они в разных репо) сделать еще git submodule и туда упаковать common-вещи. У кого-то такой опыт есть? Юзабельно?

Main message:
был, говно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

был, говно

--

## My telegram message #100296
**Time:** 31.03.2021 14:25:48 UTC+05:00
**Link:** https://t.me/nest_ru/100296

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
) 100метров у меня

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) 100метров у меня

--

## My telegram message #100299
**Time:** 31.03.2021 14:26:11 UTC+05:00
**Link:** https://t.me/nest_ru/100299

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- сто топит за тайпскрипт и считает что место на диске никто не считает - значит ок

Main message:
по сети гонять долго просто и деплой затягивается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по сети гонять долго просто и деплой затягивается

--

## My telegram message #100304
**Time:** 31.03.2021 14:27:19 UTC+05:00
**Link:** https://t.me/nest_ru/100304

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Если можно, какой-то реальный пример

Main message:
может поможет  https://gist.github.com/Stanback/6998085

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

может поможет  https://gist.github.com/Stanback/6998085

--

## My telegram message #100314
**Time:** 31.03.2021 14:32:00 UTC+05:00
**Link:** https://t.me/nest_ru/100314

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- насколько я понимаю, тут просто фронт рендерится, а вот как мне обработать запросы на бек...

Main message:
https://github.com/site15/site15.ru/blob/develop/docker/__nginx/nginx-backend-with-frontend.conf

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/site15/site15.ru/blob/develop/docker/__nginx/nginx-backend-with-frontend.conf

--

## My telegram message #100323
**Time:** 31.03.2021 14:35:12 UTC+05:00
**Link:** https://t.me/nest_ru/100323

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
в до 2010 ого года так делал, непомню в чем была причина ну я ушел от этого)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в до 2010 ого года так делал, непомню в чем была причина ну я ушел от этого)

--

## My telegram message #100327
**Time:** 31.03.2021 14:38:03 UTC+05:00
**Link:** https://t.me/nest_ru/100327

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
она бесплатная, у ся можешь поднят, но сейчас есть сср, через него быстрее будет рендерить

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

она бесплатная, у ся можешь поднят, но сейчас есть сср, через него быстрее будет рендерить

--

## My telegram message #100329
**Time:** 31.03.2021 14:38:34 UTC+05:00
**Link:** https://t.me/nest_ru/100329

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в до 2010 ого года так делал, непомню в чем была причина ну я ушел от этого)
- Да, тебе просто нужно склонировать этот конфиг и изменить сервернейм, добавить этот конфиг ниже своего с фронтом
- она бесплатная, у ся можешь поднят, но сейчас есть сср, через него быстрее будет рендерить
- У нас вуе, на накст переходить задолбаемся

Main message:
я для ангулар1 поднимал пререндер локально

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я для ангулар1 поднимал пререндер локально

--

## My telegram message #100334
**Time:** 31.03.2021 14:51:51 UTC+05:00
**Link:** https://t.me/nest_ru/100334

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я для ангулар1 поднимал пререндер локально
- Из юзкейсов только чуть-чуть сео поднять
- но буду благодарен если скинешь конфиг с субдоменом)
- Возможно, тогда не было летсэнкрипт, а обычные ssl-сертификаты с защитой поддоменов дорогие

Main message:
Хз, непомню, с какой-то фигней провозился месяц или куки или ифрейм или хедар, вообще не помню прикинь)) просто чувство тока помню что выбесило тогда ещё на пхп

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Хз, непомню, с какой-то фигней провозился месяц или куки или ифрейм или хедар, вообще не помню прикинь)) просто чувство тока помню что выбесило тогда ещё на пхп

--

## My telegram message #100404
**Time:** 31.03.2021 19:47:35 UTC+05:00
**Link:** https://t.me/nest_ru/100404

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Стоп, при чём тут серверный рендеринг вообще? SSR для реакт делается либо через Гэтсби, либо через НекстJS
- видимо я не правильно выразился, я должен отдать реакт
- Во вкладке Console в гугл хроме что выводится в ошибках при открытии страницы?
- в консоли ошибки реактовские

Main message:
без нгинкс запусти приложение через статик неста

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

без нгинкс запусти приложение через статик неста

--

## My telegram message #100408
**Time:** 31.03.2021 19:48:13 UTC+05:00
**Link:** https://t.me/nest_ru/100408

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Во вкладке Console в гугл хроме что выводится в ошибках при открытии страницы?
- в консоли ошибки реактовские
- без нгинкс запусти приложение через статик неста
- работает

Main message:
ну выкатывай на прод и не парься)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну выкатывай на прод и не парься)

--

## My telegram message #100417
**Time:** 31.03.2021 21:44:11 UTC+05:00
**Link:** https://t.me/nest_ru/100417

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- class-validator?
- Всем привет, что мне заюзать с class-transformer чтоб видеть только поля с декоратором expose??
- Expose и заюзай, а потом plainToClass
- Заюзал expose что то с плейн ту клас не понял как работает но спасибо)))

Main message:
ща

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ща

--

## My telegram message #100421
**Time:** 31.03.2021 22:03:18 UTC+05:00
**Link:** https://t.me/nest_ru/100421

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Expose и заюзай, а потом plainToClass
- Заюзал expose что то с плейн ту клас не понял как работает но спасибо)))
- ща
- Всем привет, скажете пожалуйста, это годный пример реализации репозитория для typeorm?  https://medium.com/the-crowdlinker-chronicle/best-way-to-inject-repositories-using-typeorm-nestjs-e134c3dbf53c

Main message:
структуру папок под себя сделай

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

структуру папок под себя сделай

--

## My telegram message #100425
**Time:** 31.03.2021 22:13:01 UTC+05:00
**Link:** https://t.me/nest_ru/100425

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ща
- Всем привет, скажете пожалуйста, это годный пример реализации репозитория для typeorm?  https://medium.com/the-crowdlinker-chronicle/best-way-to-inject-repositories-using-typeorm-nestjs-e134c3dbf53c
- структуру папок под себя сделай
- Вроде понял, спасибо.

Main message:
там просто он пример показал когда по доменам, и народ страдает потом так как нужно скрещивать сущности

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

там просто он пример показал когда по доменам, и народ страдает потом так как нужно скрещивать сущности

--

## My telegram message #100427
**Time:** 31.03.2021 22:15:20 UTC+05:00
**Link:** https://t.me/nest_ru/100427

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- структуру папок под себя сделай
- Вроде понял, спасибо.
- там просто он пример показал когда по доменам, и народ страдает потом так как нужно скрещивать сущности
- Я вообще думаю вынести в libs репозитории все, и там все держать, чтоб не дублировать для каждого мс базовые модели

Main message:
в либсах все у меня, в аппах только соединяю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в либсах все у меня, в аппах только соединяю

--

## My telegram message #100429
**Time:** 31.03.2021 22:17:47 UTC+05:00
**Link:** https://t.me/nest_ru/100429

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да я тоже недавно все туда тулить, ну в пределах разумного, так теперь в самом мс, чисто бизнес логика осталась и контролер)

Main message:
тоже туда перенес

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тоже туда перенес

--

## My telegram message #100431
**Time:** 31.03.2021 22:22:08 UTC+05:00
**Link:** https://t.me/nest_ru/100431

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в либсах все у меня, в аппах только соединяю
- Да я тоже недавно все туда тулить, ну в пределах разумного, так теперь в самом мс, чисто бизнес логика осталась и контролер)
- тоже туда перенес
- Ну я все же ещё оставил в мс таски, очереди и остальное по мелочи. Мне в том примере понравилось как там мапинг происходит, но пока выглядит как магия с этим класс трансфом, я до этого по старинке мапил)

Main message:
я тоже не сразу все вынес в либы, со временем туда все уехало, класс трансформ да прикольно, но это математика, юзаю только на входе выходе из бэка

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я тоже не сразу все вынес в либы, со временем туда все уехало, класс трансформ да прикольно, но это математика, юзаю только на входе выходе из бэка

--

## My telegram message #100437
**Time:** 31.03.2021 22:42:03 UTC+05:00
**Link:** https://t.me/nest_ru/100437

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А можно ещё такой вопрос, если у вас монорепа, где вы храните файлы конфига?

Main message:
.env

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

.env

--

## My telegram message #100446
**Time:** 31.03.2021 22:45:25 UTC+05:00
**Link:** https://t.me/nest_ru/100446

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://github.com/site15/site15.ru/blob/develop/env/prod.env вот тут в репе, то что не критично то в репе, всякие пасы, вне репы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/site15/site15.ru/blob/develop/env/prod.env вот тут в репе, то что не критично то в репе, всякие пасы, вне репы

--

## My telegram message #100448
**Time:** 31.03.2021 22:46:00 UTC+05:00
**Link:** https://t.me/nest_ru/100448

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
в кубере

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в кубере

--

## My telegram message #100451
**Time:** 31.03.2021 22:46:50 UTC+05:00
**Link:** https://t.me/nest_ru/100451

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я оч хочу переехать на yaml конфиг, но мне так впадлу этим заниматься, что продолжаю просто хранить ts файл которйы экспортит глобальные переменные из энв переменных)

Main message:
также делаю, криминала не вижу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

также делаю, криминала не вижу

--

## My telegram message #100455
**Time:** 31.03.2021 22:48:35 UTC+05:00
**Link:** https://t.me/nest_ru/100455

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а, точн. все время забываю про эту штуку
- также делаю, криминала не вижу
- Ну по примеру с офф доки с yaml очень удобно, если ещё под конфиг сервис интерфейс написать
- я так пару раз забыл добавить в локальный мс конфиг пропертю, и она по умолчанию импортнулась из другого микросервиса. поскольку в нмп и нх области видимости не существует, то у меня просто потянулся еще один микросервис в другой

Main message:
я про конфиг уже писал, в идеале не нужно юзать никакой конфиг сервис

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я про конфиг уже писал, в идеале не нужно юзать никакой конфиг сервис

--

## My telegram message #100457
**Time:** 31.03.2021 22:49:19 UTC+05:00
**Link:** https://t.me/nest_ru/100457

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- я так пару раз забыл добавить в локальный мс конфиг пропертю, и она по умолчанию импортнулась из другого микросервиса. поскольку в нмп и нх области видимости не существует, то у меня просто потянулся еще один микросервис в другой

Main message:
енвы можно одни на весх юзать, у меня так

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

енвы можно одни на весх юзать, у меня так

--

## My telegram message #100459
**Time:** 31.03.2021 22:49:55 UTC+05:00
**Link:** https://t.me/nest_ru/100459

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- это ж клево

Main message:
значит мало декомпозировал, блин во флуд нужно идти опять тонна не поделу)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

значит мало декомпозировал, блин во флуд нужно идти опять тонна не поделу)

--

## My telegram message #100461
**Time:** 31.03.2021 22:50:23 UTC+05:00
**Link:** https://t.me/nest_ru/100461

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А вероятность в кубере чисто забыть добавить что-то ?

Main message:
тесты е2е упадут и деплоймент не пройдет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тесты е2е упадут и деплоймент не пройдет

--

## My telegram message #100464
**Time:** 31.03.2021 22:54:36 UTC+05:00
**Link:** https://t.me/nest_ru/100464

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- значит мало декомпозировал, блин во флуд нужно идти опять тонна не поделу)
- А вероятность в кубере чисто забыть добавить что-то ?
- тесты е2е упадут и деплоймент не пройдет
- Точняк)

Main message:
я делаю сразу две версии под докер композ и кубер, у меня юниты гонятся до билда, птом поднимается докер композ на пустой базе и гонятся е2е, если все норм, поднимаем на кубере, и там гоним е2е, если успешно то мр для релиза готов, идем руками в только что поднятый стенд тыкаем если надо, и если все норм, мр льем в продакшен, и гоним е2е

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я делаю сразу две версии под докер композ и кубер, у меня юниты гонятся до билда, птом поднимается докер композ на пустой базе и гонятся е2е, если все норм, поднимаем на кубере, и там гоним е2е, если успешно то мр для релиза готов, идем руками в только что поднятый стенд тыкаем если надо, и если все норм, мр льем в продакшен, и гоним е2е

--

## My telegram message #100469
**Time:** 31.03.2021 23:01:50 UTC+05:00
**Link:** https://t.me/nest_ru/100469

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тесты е2е упадут и деплоймент не пройдет
- Точняк)
- я делаю сразу две версии под докер композ и кубер, у меня юниты гонятся до билда, птом поднимается докер композ на пустой базе и гонятся е2е, если все норм, поднимаем на кубере, и там гоним е2е, если успешно то мр для релиза готов, идем руками в только что поднятый стенд тыкаем если надо, и если все норм, мр льем в продакшен, и гоним е2е
- друзья я тут думал насчет jwt / db session, и в итоге решил такой вариант. просто хочу узнать если что то не так с этим вариантом. если в базе создать session для каждого логина (uuid например) и проверять при запросах, то даже если uuid неправильный, все таки надо будет делать запрос в бд, если такая сессия не будет, кинуть ошибку, а если все ок, то еще делать запрос в users, получить юзера и добавить в request. если только юзать jwt и не хранить их нигде, то тут проблема контроля, логaута , ролей, рефреш токенa. в чем плох вариант юзать оба. то есть при логине создать сессию в бд, и добавить там access_token. и именно этот токен отправить юзера. у этого токена будет ид юзера и ид сессии в бд. теперь если юзер отправит неправилный токен, то запрос на базу не будет, ибо jwt.verify даст ошибку. и только когда verify успешный, можно взять id юзера и сессии из payload и получать сессию из бд и смотреть там закрытая ли сессия, или expired

Main message:
про жвт сто раз поднимали вопрос вот прочитай тут есть манула и пример кода  https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

про жвт сто раз поднимали вопрос вот прочитай тут есть манула и пример кода  https://gist.github.com/zmts/802dc9c3510d79fd40f9dc38a12bccfc

--

