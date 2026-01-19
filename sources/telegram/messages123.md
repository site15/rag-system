## My telegram message #126708
**Time:** 04.10.2021 18:05:48 UTC+05:00
**Link:** https://t.me/nest_ru/126708

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Если цепочка изменений идет строго в одну сторону json-schema => *.ts => sql, то все будет гладко. С допущением, что мы после каждого серьезного изменения готовы убивать всю базу. Но это норм при создании первого прототипа

Main message:
Я против такого потхода, Базу нужно руками всегда создавать автомиграторы не все могут нормально сделать, и они могут снести к херам данные Лучше руками создать базу и по ней че хочешь сгенерить в жехипстере когда писали, миграции тоже руками все делали, схема генератор хипстера тока для Бэка юзали имхо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я против такого потхода, Базу нужно руками всегда создавать автомиграторы не все могут нормально сделать, и они могут снести к херам данные Лучше руками создать базу и по ней че хочешь сгенерить в жехипстере когда писали, миграции тоже руками все делали, схема генератор хипстера тока для Бэка юзали имхо

--

## My telegram message #126711
**Time:** 04.10.2021 18:10:14 UTC+05:00
**Link:** https://t.me/nest_ru/126711

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Был у меня кейс, когда парни в команде уперлись и писали миграции на базу в проект, который еще не вышел в прод и в нем нет данных. Дело было в энтерпрайзе, проект до прода так и не доехал, но у нас все равно было штук 500 меграций и по коду было нереально понять, как выглядит модель данных :)

Main message:
все правильно делали

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все правильно делали

--

## My telegram message #126713
**Time:** 04.10.2021 18:10:35 UTC+05:00
**Link:** https://t.me/nest_ru/126713

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Был у меня кейс, когда парни в команде уперлись и писали миграции на базу в проект, который еще не вышел в прод и в нем нет данных. Дело было в энтерпрайзе, проект до прода так и не доехал, но у нас все равно было штук 500 меграций и по коду было нереально понять, как выглядит модель данных :)
- Нахера так делать? Куда старшие разработчики смотрели?
- все правильно делали
- Так миграции можно ж схлопнуть

Main message:
так как в ентерпрайз куча стендов и нужно изменения накатывать везде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так как в ентерпрайз куча стендов и нужно изменения накатывать везде

--

## My telegram message #126715
**Time:** 04.10.2021 18:10:51 UTC+05:00
**Link:** https://t.me/nest_ru/126715

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все правильно делали
- Так миграции можно ж схлопнуть
- так как в ентерпрайз куча стендов и нужно изменения накатывать везде
- Сунул структурный дамп в первую миграцию, остальное удалил - всё

Main message:
штук 15 разных стендов на разных версиях софта

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

штук 15 разных стендов на разных версиях софта

--

## My telegram message #126718
**Time:** 04.10.2021 18:16:08 UTC+05:00
**Link:** https://t.me/nest_ru/126718

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- разные версии софта появляются, когда проект в проде. А когда с болью пишешь первую версию, добывая требования по крупицам - нет никаких стендов и версий. А модель данных переаджайливается каждый спринт.

Main message:
ты в каком то плюшевом мире живешь) нужно: каждую неделю должен быть релиз - стенд, фичи в своих ветках и тестеры их отдельно на своих тестовых стендах поднимают, когда фича протестирована она сливается в девелоп - скока тестеров стока стендов фронты могут тоже с фичами бэка конкретными работать - каждому фронту по стенду для хотфиксов в релиз предыдущий тоже создается стенд свой куча стендов и база в разных местах разная и данные разные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты в каком то плюшевом мире живешь) нужно: каждую неделю должен быть релиз - стенд, фичи в своих ветках и тестеры их отдельно на своих тестовых стендах поднимают, когда фича протестирована она сливается в девелоп - скока тестеров стока стендов фронты могут тоже с фичами бэка конкретными работать - каждому фронту по стенду для хотфиксов в релиз предыдущий тоже создается стенд свой куча стендов и база в разных местах разная и данные разные

--

## My telegram message #126721
**Time:** 04.10.2021 18:17:39 UTC+05:00
**Link:** https://t.me/nest_ru/126721

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- штук 15 разных стендов на разных версиях софта
- разные версии софта появляются, когда проект в проде. А когда с болью пишешь первую версию, добывая требования по крупицам - нет никаких стендов и версий. А модель данных переаджайливается каждый спринт.
- ты в каком то плюшевом мире живешь) нужно: каждую неделю должен быть релиз - стенд, фичи в своих ветках и тестеры их отдельно на своих тестовых стендах поднимают, когда фича протестирована она сливается в девелоп - скока тестеров стока стендов фронты могут тоже с фичами бэка конкретными работать - каждому фронту по стенду для хотфиксов в релиз предыдущий тоже создается стенд свой куча стендов и база в разных местах разная и данные разные
- Да. Я к тому, что 100500 миграций - это, вроде, не проблема

Main message:
ну да, нет проблемы вообще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну да, нет проблемы вообще

--

## My telegram message #126926
**Time:** 06.10.2021 15:13:35 UTC+05:00
**Link:** https://t.me/nest_ru/126926

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В dto class validator
- Вообще у меня бы такой кейс когда я регистрировал ValidationPipe используя app.useValidationPipe(). Пофиксил это после того как зарегистрировал валидацию в апп модуле
- Попробую, спс
- Привет! Если кому интересно - нашлась вот такая библиотека:  https://github.com/kristianmandrup/json-schema-model-builder . Возможно, это шаг в нужную сторону, надо попробовать

Main message:
Через динамические многие проходили, лично я запарился расширять ядро, под мелкий кастом, его стало так много что уже пошли сайд эффекты не понятные, фичи со сложным кастомом трудно внедрять и никогда не знаешь куда этот кастомом решат воткнуть, и для реализации уходит больше времени и попути ломаешь че-нить уже старое и рабочее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через динамические многие проходили, лично я запарился расширять ядро, под мелкий кастом, его стало так много что уже пошли сайд эффекты не понятные, фичи со сложным кастомом трудно внедрять и никогда не знаешь куда этот кастомом решат воткнуть, и для реализации уходит больше времени и попути ломаешь че-нить уже старое и рабочее

--

## My telegram message #126979
**Time:** 07.10.2021 12:30:50 UTC+05:00
**Link:** https://t.me/nest_ru/126979

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет, юзаю typeorm можно ли как то в миграции дернуть метод серввиса?
- Можно нест поднять и взять нужный сервис из контейнера
- Всем привет юзаю фастифай мультипар и стримом читаю файл, может кто знает как кроме файла получить остальные данные не костылем?
- Всем доброе утро, вчера спрашивал про gql, теперь с новыми знаниями вопросы задаю, как я понял я могу сделать что то вроде такого есть 3 микросервиса, два из которых содержат какую то логику, а третий это gateway, который может шариться запросы между сервисами, то есть отправляем запрос на один сервис, он что то делает на этом сервисе(какую то логику) и вовзращает результат с этого сервиса, но результат идёт не на фронт, а на гейтвей, потом с гейтвея его перенаправляют на еще один сервис, где данные еще раз обрабатываются и вот потом уже я если хочу, то отдаю на фронт, я всё правильно понял?

Main message:
непонятные чуваки там у тебя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

непонятные чуваки там у тебя

--

## My telegram message #126982
**Time:** 07.10.2021 12:32:54 UTC+05:00
**Link:** https://t.me/nest_ru/126982

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет юзаю фастифай мультипар и стримом читаю файл, может кто знает как кроме файла получить остальные данные не костылем?
- Всем доброе утро, вчера спрашивал про gql, теперь с новыми знаниями вопросы задаю, как я понял я могу сделать что то вроде такого есть 3 микросервиса, два из которых содержат какую то логику, а третий это gateway, который может шариться запросы между сервисами, то есть отправляем запрос на один сервис, он что то делает на этом сервисе(какую то логику) и вовзращает результат с этого сервиса, но результат идёт не на фронт, а на гейтвей, потом с гейтвея его перенаправляют на еще один сервис, где данные еще раз обрабатываются и вот потом уже я если хочу, то отдаю на фронт, я всё правильно понял?
- непонятные чуваки там у тебя
- О, Илшат

Main message:
я через мессадж паттерн кидал запрос на обработку в микросервис он когда доделывал кидал другое сообщение, это сообщение потхватывал гейтвей(я зову его монолитом) и это сообщение по сокету через подписку человеку возвращал

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я через мессадж паттерн кидал запрос на обработку в микросервис он когда доделывал кидал другое сообщение, это сообщение потхватывал гейтвей(я зову его монолитом) и это сообщение по сокету через подписку человеку возвращал

--

## My telegram message #126986
**Time:** 07.10.2021 12:35:30 UTC+05:00
**Link:** https://t.me/nest_ru/126986

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- непонятные чуваки там у тебя
- О, Илшат
- я через мессадж паттерн кидал запрос на обработку в микросервис он когда доделывал кидал другое сообщение, это сообщение потхватывал гейтвей(я зову его монолитом) и это сообщение по сокету через подписку человеку возвращал
- тип гейтвей это слушатель обработанных запросов с других сервисов? тип такого?

Main message:
недавно через рабит мк часть работ просто выкинул на микросервисы, но потом вырубил, так как разнос по мс и помог распределить конекшены до базы, при увеличении нагрузки опять все встало колом и у меня кончилось железо, поэтому убрал рабит и переписал все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

недавно через рабит мк часть работ просто выкинул на микросервисы, но потом вырубил, так как разнос по мс и помог распределить конекшены до базы, при увеличении нагрузки опять все встало колом и у меня кончилось железо, поэтому убрал рабит и переписал все

--

## My telegram message #126989
**Time:** 07.10.2021 12:36:22 UTC+05:00
**Link:** https://t.me/nest_ru/126989

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- тип гейтвей это слушатель обработанных запросов с других сервисов? тип такого?

Main message:
типа того он и шлет на обработку, он и возвращает, сами мс они не доступны по сети, они просто чет там обрабатывают и все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

типа того он и шлет на обработку, он и возвращает, сами мс они не доступны по сети, они просто чет там обрабатывают и все

--

## My telegram message #126993
**Time:** 07.10.2021 12:37:06 UTC+05:00
**Link:** https://t.me/nest_ru/126993

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- недавно через рабит мк часть работ просто выкинул на микросервисы, но потом вырубил, так как разнос по мс и помог распределить конекшены до базы, при увеличении нагрузки опять все встало колом и у меня кончилось железо, поэтому убрал рабит и переписал все
- хм хм хм
- типа того он и шлет на обработку, он и возвращает, сами мс они не доступны по сети, они просто чет там обрабатывают и все
- Охуенная система, вот, это мне нравится

Main message:
монолит который можно заскейлить тоже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

монолит который можно заскейлить тоже

--

## My telegram message #126996
**Time:** 07.10.2021 12:42:22 UTC+05:00
**Link:** https://t.me/nest_ru/126996

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- типа того он и шлет на обработку, он и возвращает, сами мс они не доступны по сети, они просто чет там обрабатывают и все
- Охуенная система, вот, это мне нравится
- монолит который можно заскейлить тоже
- А какого фига я ничё не нагугли

Main message:
если как я делать, то у тя результат приходит отдельно от запроса, и если все висит то будет некая задержка по реакции на фронте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если как я делать, то у тя результат приходит отдельно от запроса, и если все висит то будет некая задержка по реакции на фронте

--

## My telegram message #127007
**Time:** 07.10.2021 12:49:52 UTC+05:00
**Link:** https://t.me/nest_ru/127007

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- монолит который можно заскейлить тоже
- А какого фига я ничё не нагугли
- если как я делать, то у тя результат приходит отдельно от запроса, и если все висит то будет некая задержка по реакции на фронте
- Из мс в центральный потом в другой мс и с него на фронт

Main message:
в граф куэль без федерации у тя монолит и резолверы все там

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в граф куэль без федерации у тя монолит и резолверы все там

--

## My telegram message #127011
**Time:** 07.10.2021 12:52:08 UTC+05:00
**Link:** https://t.me/nest_ru/127011

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- если как я делать, то у тя результат приходит отдельно от запроса, и если все висит то будет некая задержка по реакции на фронте
- Из мс в центральный потом в другой мс и с него на фронт
- в граф куэль без федерации у тя монолит и резолверы все там
- Ладно

Main message:
не нужно делать микросервисы просто так

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не нужно делать микросервисы просто так

--

## My telegram message #127017
**Time:** 07.10.2021 12:56:55 UTC+05:00
**Link:** https://t.me/nest_ru/127017

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- в граф куэль без федерации у тя монолит и резолверы все там
- Ладно
- не нужно делать микросервисы просто так
- Автоканоном тестируешь?

Main message:
если все хорошо то скейлишь эту шляпу и в прод отправляешь)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если все хорошо то скейлишь эту шляпу и в прод отправляешь)

--

## My telegram message #127028
**Time:** 07.10.2021 13:20:04 UTC+05:00
**Link:** https://t.me/nest_ru/127028

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Автоканоном тестируешь?
- если все хорошо то скейлишь эту шляпу и в прод отправляешь)
- Да
- Один инстанс? На каком железе?

Main message:
1 проц, 1.5 гига оперативы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

1 проц, 1.5 гига оперативы

--

## My telegram message #127030
**Time:** 07.10.2021 13:22:20 UTC+05:00
**Link:** https://t.me/nest_ru/127030

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- Один инстанс? На каком железе?
- 1 проц, 1.5 гига оперативы
- И один nodejs-инстанс?

Main message:
Да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да

--

## My telegram message #127034
**Time:** 07.10.2021 13:23:42 UTC+05:00
**Link:** https://t.me/nest_ru/127034

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- 1 проц, 1.5 гига оперативы
- И один nodejs-инстанс?
- Да
- Странно, у меня даже эндпоинт при выборе по первичному ключу столько не выдаёт. Но там походу не в базе дело

Main message:
Не один запрос в базу а дохера с разными параметрами

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не один запрос в базу а дохера с разными параметрами

--

## My telegram message #127036
**Time:** 07.10.2021 13:24:19 UTC+05:00
**Link:** https://t.me/nest_ru/127036

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- Странно, у меня даже эндпоинт при выборе по первичному ключу столько не выдаёт. Но там походу не в базе дело
- Не один запрос в базу а дохера с разными параметрами
- Тогда вообще какая-то лютая производительность

Main message:
Пусть будет 15 запросов в базу умнож на 500 таких же

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Пусть будет 15 запросов в базу умнож на 500 таких же

--

## My telegram message #127041
**Time:** 07.10.2021 13:28:34 UTC+05:00
**Link:** https://t.me/nest_ru/127041

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не один запрос в базу а дохера с разными параметрами
- Тогда вообще какая-то лютая производительность
- Пусть будет 15 запросов в базу умнож на 500 таких же
- А база там же находится на том же железе?

Main message:
рядом в другом поде

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

рядом в другом поде

--

## My telegram message #127046
**Time:** 07.10.2021 13:30:49 UTC+05:00
**Link:** https://t.me/nest_ru/127046

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А база там же находится на том же железе?
- рядом в другом поде
- А, ну тогда понял
- подписки графкуэл?

Main message:
транспорт я так понял сокеты

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

транспорт я так понял сокеты

--

## My telegram message #127048
**Time:** 07.10.2021 13:31:00 UTC+05:00
**Link:** https://t.me/nest_ru/127048

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А, ну тогда понял
- подписки графкуэл?
- транспорт я так понял сокеты
- по сокетам

Main message:
не тока подписки

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не тока подписки

--

## My telegram message #127053
**Time:** 07.10.2021 13:31:37 UTC+05:00
**Link:** https://t.me/nest_ru/127053

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- транспорт я так понял сокеты
- по сокетам
- не тока подписки
- Мне кажется, что я юзаю немного не то, что все юзают

Main message:
и на прием и на отправку типа везде ws

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

и на прием и на отправку типа везде ws

--

## My telegram message #127059
**Time:** 07.10.2021 13:32:47 UTC+05:00
**Link:** https://t.me/nest_ru/127059

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не тока подписки
- Мне кажется, что я юзаю немного не то, что все юзают
- и на прием и на отправку типа везде ws
- Ладно, буду верить в лучшее

Main message:
с рефрешь токеном в подписках пока у меня затык, вот думал может graphql-ws поможет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

с рефрешь токеном в подписках пока у меня затык, вот думал может graphql-ws поможет

--

## My telegram message #127062
**Time:** 07.10.2021 13:33:56 UTC+05:00
**Link:** https://t.me/nest_ru/127062

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- и на прием и на отправку типа везде ws
- Ладно, буду верить в лучшее
- с рефрешь токеном в подписках пока у меня затык, вот думал может graphql-ws поможет
- Это как?

Main message:
у тя подписка по токену работает?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя подписка по токену работает?

--

## My telegram message #127066
**Time:** 07.10.2021 13:34:59 UTC+05:00
**Link:** https://t.me/nest_ru/127066

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- с рефрешь токеном в подписках пока у меня затык, вот думал может graphql-ws поможет
- Это как?
- у тя подписка по токену работает?
- Хм, что то явно упадёт?

Main message:
да сокет упадет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да сокет упадет

--

## My telegram message #127068
**Time:** 07.10.2021 13:35:26 UTC+05:00
**Link:** https://t.me/nest_ru/127068

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя подписка по токену работает?
- Хм, что то явно упадёт?
- да сокет упадет
- А, ты хочешь тип сокет автоПоднимать?

Main message:
я ретраи втыкаю на фронте как быстрая победа, чтобы автоподнимало

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я ретраи втыкаю на фронте как быстрая победа, чтобы автоподнимало

--

## My telegram message #127070
**Time:** 07.10.2021 13:35:34 UTC+05:00
**Link:** https://t.me/nest_ru/127070

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да сокет упадет
- А, ты хочешь тип сокет автоПоднимать?
- я ретраи втыкаю на фронте как быстрая победа, чтобы автоподнимало
- Ну тип, если протух токен, то сокет новый открываем?

Main message:
да тип того

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да тип того

--

## My telegram message #127075
**Time:** 07.10.2021 13:36:59 UTC+05:00
**Link:** https://t.me/nest_ru/127075

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я ретраи втыкаю на фронте как быстрая победа, чтобы автоподнимало
- Ну тип, если протух токен, то сокет новый открываем?
- да тип того
- Тож сложно

Main message:
ну rxjs на фронте облегчает такие жопные места

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну rxjs на фронте облегчает такие жопные места

--

## My telegram message #127083
**Time:** 07.10.2021 13:54:37 UTC+05:00
**Link:** https://t.me/nest_ru/127083

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тож сложно
- ну rxjs на фронте облегчает такие жопные места
- Я знаю, что ребятки все асинки через rx пишут
- Ребят подскажите пожалуйста, на 7м несте пробую реализовать подписки у графкуеля, в плейграунде подписываюсь, потом в другом браузере запускаю квери, в первом в ответ на подписку приходит сообщение с пейлоадом NULL, может кто подскажет что я делаю не так:

Main message:
дто где?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

дто где?

--

## My telegram message #127101
**Time:** 07.10.2021 15:44:06 UTC+05:00
**Link:** https://t.me/nest_ru/127101

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не всегда n+1. Если был откат транзакции, например, то будет дырка
- Если так, то да. Но как не крути когда будет новая запись будет n+1 то есть последний ID + 1
- Опять-таки смотря как сиквенс настроишь. Там можно и через один делать, например. Так делаю, когда в 2 базы пишут. В одной чётные, в другой - нечётные
- Вообще пофиг - забота админов/девопсов

Main message:
у тя коннект может висеть активный в приложении, и он прервется если с наружи делать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя коннект может висеть активный в приложении, и он прервется если с наружи делать

--

## My telegram message #127105
**Time:** 07.10.2021 15:47:46 UTC+05:00
**Link:** https://t.me/nest_ru/127105

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Опять-таки смотря как сиквенс настроишь. Там можно и через один делать, например. Так делаю, когда в 2 базы пишут. В одной чётные, в другой - нечётные
- Вообще пофиг - забота админов/девопсов
- у тя коннект может висеть активный в приложении, и он прервется если с наружи делать
- Ну чего ты как маленький) RollingUpdate strategy в кубере на новый коннект

Main message:
хм оно следит чтоли что коннекты все пропали и ток после этого прибьет под?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хм оно следит чтоли что коннекты все пропали и ток после этого прибьет под?

--

## My telegram message #127110
**Time:** 07.10.2021 15:52:10 UTC+05:00
**Link:** https://t.me/nest_ru/127110

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у тя коннект может висеть активный в приложении, и он прервется если с наружи делать
- Ну чего ты как маленький) RollingUpdate strategy в кубере на новый коннект
- хм оно следит чтоли что коннекты все пропали и ток после этого прибьет под?
- Нет, просто создаешь новый коннект, деплоишь новые поды, которые его юзают, а старые будут выбиваться. Количество живых подов в этот момент определяется параметром maxUnavailable. А maxSurge определяет, по сколько под за раз будет гаситься. Когда процесс будет завершён, значит, все старые поды (использующие старый коннект) вырублены, вместо них запущены новые, которые юзают новый. Значит, старую учётку из PostgreSQL можно выпилить

Main message:
хм, нашим девопс ща скрин перешлю)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хм, нашим девопс ща скрин перешлю)

--

## My telegram message #127114
**Time:** 07.10.2021 15:54:22 UTC+05:00
**Link:** https://t.me/nest_ru/127114

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хм оно следит чтоли что коннекты все пропали и ток после этого прибьет под?
- Нет, просто создаешь новый коннект, деплоишь новые поды, которые его юзают, а старые будут выбиваться. Количество живых подов в этот момент определяется параметром maxUnavailable. А maxSurge определяет, по сколько под за раз будет гаситься. Когда процесс будет завершён, значит, все старые поды (использующие старый коннект) вырублены, вместо них запущены новые, которые юзают новый. Значит, старую учётку из PostgreSQL можно выпилить
- хм, нашим девопс ща скрин перешлю)
- За rollingUpdate отвечает replicaSet

Main message:
ааа) я то методом тыка учусь

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ааа) я то методом тыка учусь

--

## My telegram message #127116
**Time:** 07.10.2021 15:54:57 UTC+05:00
**Link:** https://t.me/nest_ru/127116

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Нет, просто создаешь новый коннект, деплоишь новые поды, которые его юзают, а старые будут выбиваться. Количество живых подов в этот момент определяется параметром maxUnavailable. А maxSurge определяет, по сколько под за раз будет гаситься. Когда процесс будет завершён, значит, все старые поды (использующие старый коннект) вырублены, вместо них запущены новые, которые юзают новый. Значит, старую учётку из PostgreSQL можно выпилить

Main message:
@AlexDaSoul смари как можно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@AlexDaSoul смари как можно

--

## My telegram message #127121
**Time:** 07.10.2021 16:01:57 UTC+05:00
**Link:** https://t.me/nest_ru/127121

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да я тоже, первый раз попробовал
- Что за курс?
- Не буду ж тут писать - меня забанят
- почему?

Main message:
хм, не за что банить так то))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хм, не за что банить так то))

--

## My telegram message #127126
**Time:** 07.10.2021 16:03:29 UTC+05:00
**Link:** https://t.me/nest_ru/127126

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не буду ж тут писать - меня забанят
- почему?
- хм, не за что банить так то))
- Опа! Я не в курсе: это запрещено правилами? Что ж плохого, что люди развиваются и становятся умнее?!

Main message:
как раз тока что кинул чистую архитектуру в камин, холодно ато хорошо трящит

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как раз тока что кинул чистую архитектуру в камин, холодно ато хорошо трящит

--

## My telegram message #127187
**Time:** 08.10.2021 01:39:22 UTC+05:00
**Link:** https://t.me/nest_ru/127187

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- документация робокассы... несколько часов... wat?
- всем хай, у меня постоянно приходит только undefined. В чём може быть проблема (может имя другое нужно)??
- как сделал в итоге? мне не дает покоя эта штука ))
- Эндпоинт авторизации ведь не только куку ставит, но и отдаёт оба токена в теле ответа в json. В проде я использую куку (там всё работает), но при локальной разработке я вместо куки использую тот токен, что в json отдаётся

Main message:
У меня один код норм все

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня один код норм все

--

## My telegram message #127199
**Time:** 08.10.2021 11:43:20 UTC+05:00
**Link:** https://t.me/nest_ru/127199

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет, как правильно реализовать данный пример: Есть интерфейс CurrencyService у которого есть один метод это createWallet. Есть сервисы которые имплементируют CurrencyService это ( EthereumService, BitcoinService, LitecoinService ) И Есть сущность Wallet Мне нужно сделать API которое в зависимостри от Currency будет вызывать метод createWallet в одном из сервисов ( EthereumService, BitcoinService и т.д ) и после создвать сущность wallet в БД Как правильно это сделать, чтобы в зависимости от какого типа currency вызывать метод в одном из сервисов? Чтобы не инжектить их все в сервис и после проверять if-ами в каком сервисе вызвать метод

Main message:
https://t.me/nest_ru/79063 И ниже описание как применять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/79063 И ниже описание как применять

--

## My telegram message #127202
**Time:** 08.10.2021 12:39:56 UTC+05:00
**Link:** https://t.me/nest_ru/127202

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем хай, я отправляю на сервер данные (нужно файл хтмл, но у меня, почему то там постоянно undefined, так что отправляю строку), которые я трансформирую в .docx. Если я отправляю файл обратно в блоб, то когда на клиенте его скачиваю, файл просто хериться и не открываеться. Как этот файл отправить обратно и скачать на клиенте?? п.с. файл нормальный, так как сохранял его на сервер-сайд и он открывался нормально
- Всем привет, как правильно реализовать данный пример: Есть интерфейс CurrencyService у которого есть один метод это createWallet. Есть сервисы которые имплементируют CurrencyService это ( EthereumService, BitcoinService, LitecoinService ) И Есть сущность Wallet Мне нужно сделать API которое в зависимостри от Currency будет вызывать метод createWallet в одном из сервисов ( EthereumService, BitcoinService и т.д ) и после создвать сущность wallet в БД Как правильно это сделать, чтобы в зависимости от какого типа currency вызывать метод в одном из сервисов? Чтобы не инжектить их все в сервис и после проверять if-ами в каком сервисе вызвать метод
- https://t.me/nest_ru/79063 И ниже описание как применять
- https://refactoring.guru/ru/design-patterns/abstract-factory

Main message:
не нужно изобретать свои фабрики, в несте есть диай и можно его юзать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не нужно изобретать свои фабрики, в несте есть диай и можно его юзать

--

## My telegram message #127204
**Time:** 08.10.2021 12:49:14 UTC+05:00
**Link:** https://t.me/nest_ru/127204

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://t.me/nest_ru/79063 И ниже описание как применять
- https://refactoring.guru/ru/design-patterns/abstract-factory
- не нужно изобретать свои фабрики, в несте есть диай и можно его юзать
- Спасибо! Работает, то что и искал

Main message:
нзшта, наконец-то кто то использует диай) тут мало таких

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нзшта, наконец-то кто то использует диай) тут мало таких

--

## My telegram message #127208
**Time:** 08.10.2021 12:59:06 UTC+05:00
**Link:** https://t.me/nest_ru/127208

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо! Работает, то что и искал
- нзшта, наконец-то кто то использует диай) тут мало таких
- Что это такое
- Подскажите пожалуйста, мне нужно сделать модуль где буду хранить все сервисы которые работают с внешними АПИ, в какую папку будет правильнее его закинуть? Получается у меня будут около 5 сервисов и 1 модуль

Main message:
возьми nx и сделай так libs/core libs/feature1 libs/feature2 libs/feature3 shared уйдет на верх в уровень приложения в apps/server common - не нужен твой модуль эта фича модуль

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

возьми nx и сделай так libs/core libs/feature1 libs/feature2 libs/feature3 shared уйдет на верх в уровень приложения в apps/server common - не нужен твой модуль эта фича модуль

--

## My telegram message #127223
**Time:** 08.10.2021 15:32:21 UTC+05:00
**Link:** https://t.me/nest_ru/127223

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет всем. Есть ли какой-то способ получить список полей и их тип из Entity? Цель такая, чтобы передавать поля, которые требуется заполнить (названия и тип) на фронтенд. Не знаю как это лучше сдлеать. Может DTO как-то отдавать?

Main message:
я шарю дто на фронт и форма и рест метод юзают одно и тоже дто с темиже валидаторами в ангулар юзаю это для форм  https://github.com/EndyKaufman/ngx-dynamic-form-builder

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я шарю дто на фронт и форма и рест метод юзают одно и тоже дто с темиже валидаторами в ангулар юзаю это для форм  https://github.com/EndyKaufman/ngx-dynamic-form-builder

--

## My telegram message #127227
**Time:** 08.10.2021 15:34:11 UTC+05:00
**Link:** https://t.me/nest_ru/127227

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Имеете ввиду импорт одного и того же файла «на двоих»? Но если бэк и фронт в разных местах…

Main message:
у меня nx монорепа мне пофигу один и тот же файл да, а ты можешь третю репу сделать и шарить через нее файлы, как саб три подруби к гиту

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня nx монорепа мне пофигу один и тот же файл да, а ты можешь третю репу сделать и шарить через нее файлы, как саб три подруби к гиту

--

## My telegram message #127232
**Time:** 08.10.2021 19:24:50 UTC+05:00
**Link:** https://t.me/nest_ru/127232

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- nx.dev
- у меня nx монорепа мне пофигу один и тот же файл да, а ты можешь третю репу сделать и шарить через нее файлы, как саб три подруби к гиту
- С json-схемой это можно сделать довольно универсально. К тому же json-схему можно генерить из ts классов с декораторами class-validator - есть либы такие. Делали такое в прошлом проекте. Для не очень сложных форм - норм вариант
- Всем Привет👋 . Парни подскажите как прокинуть данные из interceptor дальше в метод запроса ?

Main message:
Через request

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Через request

--

## My telegram message #127259
**Time:** 08.10.2021 23:31:06 UTC+05:00
**Link:** https://t.me/nest_ru/127259

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Есть подобное, но на вызовы внутри аппки? То есть не http

Main message:
Я такое юзаю, хз сможешь понять че там или нет)  https://t.me/nest_random/7837 Проще примера увы нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я такое юзаю, хз сможешь понять че там или нет)  https://t.me/nest_random/7837 Проще примера увы нет

--

## My telegram message #127261
**Time:** 08.10.2021 23:35:45 UTC+05:00
**Link:** https://t.me/nest_ru/127261

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребят кто есть в паблике Kubernetes -- русскоговорящие сообщество ? Помогите плиз меня там забанило и за капчи
- Спасибо  @tictak21 и  @KaufmanEndy 🙏
- Я такое юзаю, хз сможешь понять че там или нет)  https://t.me/nest_random/7837 Проще примера увы нет
- Это ужас)) Я не про код А про подход

Main message:
ну хз)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну хз)

--

## My telegram message #127265
**Time:** 08.10.2021 23:39:08 UTC+05:00
**Link:** https://t.me/nest_ru/127265

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я такое юзаю, хз сможешь понять че там или нет)  https://t.me/nest_random/7837 Проще примера увы нет
- Это ужас)) Я не про код А про подход
- ну хз)
- Я делаю более явную валидацию в каждом методе, чуть больше кода, зато для других людей нету чуда за ширмой

Main message:
ну тут не валидация а именно подключение к произвольным участкам внешних обработчиков типа мидл варе для разных мест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну тут не валидация а именно подключение к произвольным участкам внешних обработчиков типа мидл варе для разных мест

--

## My telegram message #127273
**Time:** 08.10.2021 23:49:28 UTC+05:00
**Link:** https://t.me/nest_ru/127273

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну хз)
- Я делаю более явную валидацию в каждом методе, чуть больше кода, зато для других людей нету чуда за ширмой
- ну тут не валидация а именно подключение к произвольным участкам внешних обработчиков типа мидл варе для разных мест
- Ну не знаю, я бы это сделал на уровне энтити, не орм а энтити где валидация все такое что-то из ддд)

Main message:
я просто пример привел) на работе есть разные варианты генерации отчета, можно через два генератора прогнать, эта штука нужна когда много разных логик и нужно их по разному комбинировать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я просто пример привел) на работе есть разные варианты генерации отчета, можно через два генератора прогнать, эта штука нужна когда много разных логик и нужно их по разному комбинировать

--

## My telegram message #127279
**Time:** 08.10.2021 23:54:01 UTC+05:00
**Link:** https://t.me/nest_ru/127279

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну тут не валидация а именно подключение к произвольным участкам внешних обработчиков типа мидл варе для разных мест
- Ну не знаю, я бы это сделал на уровне энтити, не орм а энтити где валидация все такое что-то из ддд)
- я просто пример привел) на работе есть разные варианты генерации отчета, можно через два генератора прогнать, эта штука нужна когда много разных логик и нужно их по разному комбинировать
- Кстати вопрос назрел, не по этой теме, может подскажете, мне надо передать в другой микросервис данные записать в базу и передать ещё данные и сразу создать связь, передать все кучей и другим сервисом обьединить это все и сделать транзакцию, или второй пакет данных в очередь кинуть

Main message:
транзакция залочит таблицу, ее с умом нужно юзать, если у тя много людей начнут писать, то запросы подвиснут и будут ждать пока транзакция освободит таблицу

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

транзакция залочит таблицу, ее с умом нужно юзать, если у тя много людей начнут писать, то запросы подвиснут и будут ждать пока транзакция освободит таблицу

--

## My telegram message #127283
**Time:** 08.10.2021 23:55:58 UTC+05:00
**Link:** https://t.me/nest_ru/127283

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я просто пример привел) на работе есть разные варианты генерации отчета, можно через два генератора прогнать, эта штука нужна когда много разных логик и нужно их по разному комбинировать
- Кстати вопрос назрел, не по этой теме, может подскажете, мне надо передать в другой микросервис данные записать в базу и передать ещё данные и сразу создать связь, передать все кучей и другим сервисом обьединить это все и сделать транзакцию, или второй пакет данных в очередь кинуть
- транзакция залочит таблицу, ее с умом нужно юзать, если у тя много людей начнут писать, то запросы подвиснут и будут ждать пока транзакция освободит таблицу
- Это данные которые падают в очередь в одном мс, и после валидации идут в другой

Main message:
у тя мс если заскейлить то несколько инстансов начнут писать и залочат

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тя мс если заскейлить то несколько инстансов начнут писать и залочат

--

## My telegram message #127287
**Time:** 08.10.2021 23:58:27 UTC+05:00
**Link:** https://t.me/nest_ru/127287

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- транзакция залочит таблицу, ее с умом нужно юзать, если у тя много людей начнут писать, то запросы подвиснут и будут ждать пока транзакция освободит таблицу
- Это данные которые падают в очередь в одном мс, и после валидации идут в другой
- у тя мс если заскейлить то несколько инстансов начнут писать и залочат
- Тоже так думал, сделал прослойку с cqrs неста

Main message:
ну в другом мс этой базы уже нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну в другом мс этой базы уже нет

--

## My telegram message #127348
**Time:** 09.10.2021 18:45:10 UTC+05:00
**Link:** https://t.me/nest_ru/127348

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Он пьет сегодня

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Он пьет сегодня

--

## My telegram message #127380
**Time:** 09.10.2021 23:50:33 UTC+05:00
**Link:** https://t.me/nest_ru/127380

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Почему локально нельзя
- Перед коммитом тесты, если у себя, то pre commit, husky можешь прикрутить
- Да, у себя
- спасибо, всё работает

Main message:
один день решил попить и уже тригерят) это успех)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

один день решил попить и уже тригерят) это успех)

--

## My telegram message #127385
**Time:** 10.10.2021 00:02:27 UTC+05:00
**Link:** https://t.me/nest_ru/127385

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да, у себя
- спасибо, всё работает
- один день решил попить и уже тригерят) это успех)
- Думаю стоит отдыхать, надо себя беречь)

Main message:
вот и отдыхаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

вот и отдыхаю

--

## My telegram message #127389
**Time:** 10.10.2021 00:04:43 UTC+05:00
**Link:** https://t.me/nest_ru/127389

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- один день решил попить и уже тригерят) это успех)
- Думаю стоит отдыхать, надо себя беречь)
- вот и отдыхаю
- Выходных тоже нету? Это как-то тяжело, я наоборот стараюсь максимально от работы абстрагироваться на выходных

Main message:
у меня не слова выходной уже года три

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня не слова выходной уже года три

--

## My telegram message #127393
**Time:** 10.10.2021 00:11:26 UTC+05:00
**Link:** https://t.me/nest_ru/127393

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- вот и отдыхаю
- Выходных тоже нету? Это как-то тяжело, я наоборот стараюсь максимально от работы абстрагироваться на выходных
- у меня не слова выходной уже года три
- Отпуск это да, такого тоже нету) но выходные хотя бы есть) хотя я думаю это пока) когда после релиза полезут правки и может быть баги)

Main message:
ну работа это одни деньги, есть еще после работы, там тоже деньги

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну работа это одни деньги, есть еще после работы, там тоже деньги

--

## My telegram message #127423
**Time:** 10.10.2021 16:28:18 UTC+05:00
**Link:** https://t.me/nest_ru/127423

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А вот как в нест сделать какой-нибудь универсальный класс контроллера что бы потом наследоваться от него, ведь в него как-то надо передать какиет-то данные которые потом использовать в GET, POST и т д если там не просто :id, просто на скажем на @GET(this.options.get) компилятор совершенно справедливо ругается на this Хочется посмотреть какой-то живой пример если он существует

Main message:
https://github.com/nestjsx/crud

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/nestjsx/crud

--

## My telegram message #127473
**Time:** 11.10.2021 17:54:51 UTC+05:00
**Link:** https://t.me/nest_ru/127473

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у вас UserEntityRepository используется в AuthModule напрямую, при этом к нему нет доступа в этом модуле
- И это странно, потому что там задействован только сервис юзеров
- Даже не в этом дело было. Это похоже ошибка внутри typeorm или NestJs/typeorm. В общем, сделал тестовый репозиторий, там два модуля, один shop, другой blog. Все те же сущности Category, которые между собой никак не связаны. И вся та же ошибка, данные не с той таблицы юерутсг(
- Интересно получается, что название репозитория должно содержать название сущности. И видать из-за этого и возник конфликт имён внутри typeorm, причем никаких ошибок не выдавал, что больше огорчает. Вот и наткнулся на один из подводных камней typeorm) Может кто-то сталкивался с такой же проблемой?

Main message:
да верно есть такая штука, тоже ловил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да верно есть такая штука, тоже ловил

--

## My telegram message #127487
**Time:** 11.10.2021 19:47:00 UTC+05:00
**Link:** https://t.me/nest_ru/127487

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
хедар передавай дальше по цепочке, можешь даже расширить и дальше передавать, через гард это делаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хедар передавай дальше по цепочке, можешь даже расширить и дальше передавать, через гард это делаю

--

## My telegram message #127490
**Time:** 11.10.2021 19:49:57 UTC+05:00
**Link:** https://t.me/nest_ru/127490

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- В grpc ведь нет хедеров

Main message:
есть метадата

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть метадата

--

## My telegram message #127500
**Time:** 12.10.2021 02:00:26 UTC+05:00
**Link:** https://t.me/nest_ru/127500

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- есть метадата
- А есть у кого-то хороший опыт дебага grpc?
- Не забываем про байты)
- https://youtu.be/-qJv4ks6YAE

Main message:
это вроде в грпс клиент надо

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это вроде в грпс клиент надо

--

## My telegram message #127509
**Time:** 12.10.2021 07:20:47 UTC+05:00
**Link:** https://t.me/nest_ru/127509

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- да давно уже сделали и даже слили ж. по кукам как раз

Main message:
Забыл уже все то что там у нас в кишках 🙈

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Забыл уже все то что там у нас в кишках 🙈

--

## My telegram message #127512
**Time:** 12.10.2021 13:17:53 UTC+05:00
**Link:** https://t.me/nest_ru/127512

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А гуд
- Забыл уже все то что там у нас в кишках 🙈
- Всем привет! Речь пойдёт о Kafka-клиенте и функционале из  @nestjs /microservices Есть ли возможность внутри метода контроллера, на который повешен  @MessagePattern , отправлять сообщение в топик, который указан в заголовке пришедшего сообщения? Стандартная модель для автоматического определения reply-топика на основе названия входного топика не подходит, поэтому переопределение метода getResponsePatternName() никак не поможет
- Кстати есть у кого удачный вариант доставки прото для грпс в несколько сервисов? Чтобы не дублировать его в каждом сервисе постоянно

Main message:
если nx то можно настроить сбор ассетов с либ в каждый микросервис apps - тут лежат микросервисы по сути просто апп моудли и все, в них уже импортишь из либ модули самодостаточные

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

если nx то можно настроить сбор ассетов с либ в каждый микросервис apps - тут лежат микросервисы по сути просто апп моудли и все, в них уже импортишь из либ модули самодостаточные

--

## My telegram message #127514
**Time:** 12.10.2021 13:19:53 UTC+05:00
**Link:** https://t.me/nest_ru/127514

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет! Речь пойдёт о Kafka-клиенте и функционале из  @nestjs /microservices Есть ли возможность внутри метода контроллера, на который повешен  @MessagePattern , отправлять сообщение в топик, который указан в заголовке пришедшего сообщения? Стандартная модель для автоматического определения reply-топика на основе названия входного топика не подходит, поэтому переопределение метода getResponsePatternName() никак не поможет
- Кстати есть у кого удачный вариант доставки прото для грпс в несколько сервисов? Чтобы не дублировать его в каждом сервисе постоянно
- если nx то можно настроить сбор ассетов с либ в каждый микросервис apps - тут лежат микросервисы по сути просто апп моудли и все, в них уже импортишь из либ модули самодостаточные
- nx?

Main message:
Nx nrwl монорепа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Nx nrwl монорепа

--

