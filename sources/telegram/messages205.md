## My telegram message #223044
**Time:** 19.03.2023 13:10:09 UTC+05:00
**Link:** https://t.me/nest_ru/223044

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Я бы сразу же начал с Неста, потому что есть возможность писать так как требует фреймворк, есть код стайл, есть тесты, есть всё. Проблема express-а в том что все пишут как хотят, я работал в компаниях которые начинали проекты на чистом express-е и к сожалению это была головная боль, а ещё хуже потом они это переписывали на Nest. Возможно если у тебя что-то не большое, можно и на express-е, но если уже есть большая архитектура, есть требование к масштабированию, есть микросервисы, то это лучше сразу же на Nest-е писать
- это заблуждение, использование экспресса не заставляет писать глупости, глупости пишутся от отсутствия опыта, а нест это лишь один из паттернов который ставит в рамки и не всегда это то, что стоит использовать неосознано
- Зависит от того, сколько всего придётся переписать
- Это зависит не от этого. Размер проекта не причина проблем. Большие проекты с сложным бизнесом часто становятся избыточно связанными и что в экспрессе все переплетется что в нест еще сложнее это может выглядеть из-за горы форвард реф импортов модулей друг в друга

Main message:
Не импортируй модули друг в друга просто

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не импортируй модули друг в друга просто

--

## My telegram message #223048
**Time:** 19.03.2023 13:15:29 UTC+05:00
**Link:** https://t.me/nest_ru/223048

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Зависит от того, сколько всего придётся переписать
- Это зависит не от этого. Размер проекта не причина проблем. Большие проекты с сложным бизнесом часто становятся избыточно связанными и что в экспрессе все переплетется что в нест еще сложнее это может выглядеть из-за горы форвард реф импортов модулей друг в друга
- Не импортируй модули друг в друга просто
- Ну вот. Ты Взял нест и создал из него мусорку

Main message:
модули остались чистыми и простыми, все зависимости докидываются через forRootAsync

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

модули остались чистыми и простыми, все зависимости докидываются через forRootAsync

--

## My telegram message #223050
**Time:** 19.03.2023 13:16:08 UTC+05:00
**Link:** https://t.me/nest_ru/223050

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не импортируй модули друг в друга просто
- Ну вот. Ты Взял нест и создал из него мусорку
- модули остались чистыми и простыми, все зависимости докидываются через forRootAsync
- Стоит

Main message:
в слое интеграции делаешь модуль который уже связывает между собою модули

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

в слое интеграции делаешь модуль который уже связывает между собою модули

--

## My telegram message #223058
**Time:** 19.03.2023 13:40:05 UTC+05:00
**Link:** https://t.me/nest_ru/223058

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
libs - тут пишем модули apps - тут пишем интеграции между модулями если нужно шарить на разные аппы интеграции то libs - тут пишем модули libs/integrations - тут пишем интеграции между модулями apps - тут приложения которые импортируют все что нужно

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

libs - тут пишем модули apps - тут пишем интеграции между модулями если нужно шарить на разные аппы интеграции то libs - тут пишем модули libs/integrations - тут пишем интеграции между модулями apps - тут приложения которые импортируют все что нужно

--

## My telegram message #223061
**Time:** 19.03.2023 13:41:21 UTC+05:00
**Link:** https://t.me/nest_ru/223061

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А теперь вот это все переносим на вопрос про экспресс начинающего разработчика
- Ну как бы я о том же. Если всё +- упорядочено, разделено на разные слои абстракций - то и переписывать придётся совсем немного. Модульность итак уже будет - обернуть только в классы, и считай готово
- libs - тут пишем модули apps - тут пишем интеграции между модулями если нужно шарить на разные аппы интеграции то libs - тут пишем модули libs/integrations - тут пишем интеграции между модулями apps - тут приложения которые импортируют все что нужно
- Красиво пишешь ) вопрос у тебя каждая сущность с ее модулем это отдельная либа

Main message:
я не любитель ддд

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я не любитель ддд

--

## My telegram message #223066
**Time:** 19.03.2023 13:42:19 UTC+05:00
**Link:** https://t.me/nest_ru/223066

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- libs - тут пишем модули apps - тут пишем интеграции между модулями если нужно шарить на разные аппы интеграции то libs - тут пишем модули libs/integrations - тут пишем интеграции между модулями apps - тут приложения которые импортируют все что нужно
- Красиво пишешь ) вопрос у тебя каждая сущность с ее модулем это отдельная либа
- я не любитель ддд
- Фича это хорошо но все же

Main message:
она сама должна уметь подниматся и не от кого не зависить у нее своя база вообще

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

она сама должна уметь подниматся и не от кого не зависить у нее своя база вообще

--

## My telegram message #223069
**Time:** 19.03.2023 13:42:49 UTC+05:00
**Link:** https://t.me/nest_ru/223069

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я не любитель ддд
- Фича это хорошо но все же
- она сама должна уметь подниматся и не от кого не зависить у нее своя база вообще
- А как ты делаешь связанность сущностей которые по базе для консистентности должны быть связанные

Main message:
мне похер на них)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мне похер на них)

--

## My telegram message #223072
**Time:** 19.03.2023 13:43:12 UTC+05:00
**Link:** https://t.me/nest_ru/223072

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- она сама должна уметь подниматся и не от кого не зависить у нее своя база вообще
- А как ты делаешь связанность сущностей которые по базе для консистентности должны быть связанные
- мне похер на них)
- Ответ из серии объединить в одну либу приведет к монолиту

Main message:
просто есть externalUserId

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто есть externalUserId

--

## My telegram message #223076
**Time:** 19.03.2023 13:43:57 UTC+05:00
**Link:** https://t.me/nest_ru/223076

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- мне похер на них)
- Ответ из серии объединить в одну либу приведет к монолиту
- просто есть externalUserId
- Я скорее не только о юзере

Main message:
данные в базе удалять по закону нельзя

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

данные в базе удалять по закону нельзя

--

## My telegram message #223080
**Time:** 19.03.2023 13:44:36 UTC+05:00
**Link:** https://t.me/nest_ru/223080

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
у меня это была бы одна либа

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня это была бы одна либа

--

## My telegram message #223083
**Time:** 19.03.2023 13:45:13 UTC+05:00
**Link:** https://t.me/nest_ru/223083

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- данные в базе удалять по закону нельзя
- И я себе не могу позволить не давать бд за этими связями следить
- у меня это была бы одна либа
- Ну то есть монолит

Main message:
у тебя они все связаны между собою

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя они все связаны между собою

--

## My telegram message #223088
**Time:** 19.03.2023 13:46:21 UTC+05:00
**Link:** https://t.me/nest_ru/223088

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- у меня это была бы одна либа
- Ну то есть монолит
- у тебя они все связаны между собою
- Ага без вариаартов

Main message:
ну надо чтобы кто то бил по рукам) я у нас пыфтаюсь бить, когда начинают мудрить моудли на ровном месте

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну надо чтобы кто то бил по рукам) я у нас пыфтаюсь бить, когда начинают мудрить моудли на ровном месте

--

## My telegram message #223132
**Time:** 19.03.2023 18:58:55 UTC+05:00
**Link:** https://t.me/nest_ru/223132

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Он тоже влияет
- в данном случаи влияла await app.listen(4000)
- а статику чтобы фронт отдавал что ли какой делаешь?
- Пусть пока так делает

Main message:
Обычно есть некий шаблон с нгинкс фронтом и бэком кубером доккером, копирую его и в нём проект развиваю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Обычно есть некий шаблон с нгинкс фронтом и бэком кубером доккером, копирую его и в нём проект развиваю

--

## My telegram message #223145
**Time:** 19.03.2023 20:35:42 UTC+05:00
**Link:** https://t.me/nest_ru/223145

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Приветствую Прикручивал ли кто несколько микросервисов к одному бэкенду ? Вижу, что у  @MessagePattern есть возможность передать Transport в виде Symbol, но при таком подходе не срабатывает

Main message:
У меня так, но транспорты разные раббит и натс, когда один транспорт там не выходит разные раббиты юзать, поэтому разные транспорты юзаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня так, но транспорты разные раббит и натс, когда один транспорт там не выходит разные раббиты юзать, поэтому разные транспорты юзаю

--

## My telegram message #223160
**Time:** 19.03.2023 21:12:00 UTC+05:00
**Link:** https://t.me/nest_ru/223160

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy Привет, подскажи пожалуйста в твоей библиотеке typegraphql-prisma-nestjs, есть возможность в сгенерированых резолверах как то закрывать по ролям?

Main message:
не моя, я форкнул чтобы ввести лучшую поддержку неста, лучше чем в оригинале  https://prisma.typegraphql.com/docs/advanced/additional-decorators

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

не моя, я форкнул чтобы ввести лучшую поддержку неста, лучше чем в оригинале  https://prisma.typegraphql.com/docs/advanced/additional-decorators

--

## My telegram message #223211
**Time:** 20.03.2023 01:02:08 UTC+05:00
**Link:** https://t.me/nest_ru/223211

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не, как-то иначе он объяснял.

Main message:
нет какой то нормальной причины) просто при кафке не балансируем через тонны консьюмеров а разбиваем монолит на моносервисы, при рмк горизонтально нагрузку распределяем через кучу консьюмеров

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет какой то нормальной причины) просто при кафке не балансируем через тонны консьюмеров а разбиваем монолит на моносервисы, при рмк горизонтально нагрузку распределяем через кучу консьюмеров

--

## My telegram message #223214
**Time:** 20.03.2023 01:23:27 UTC+05:00
**Link:** https://t.me/nest_ru/223214

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Под капотом сделано очень по-наркомански, потоки разделяются по transportId, можно сделать класс, наследоваться от транспорта и указать там другой transportId, тогда можно разделять по отдельным транспортам без пересечения с другими

Main message:
Да я тоже чет копал, в итоге просто взял натс и всё) у меня реквест респонс патерн пока

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Да я тоже чет копал, в итоге просто взял натс и всё) у меня реквест респонс патерн пока

--

