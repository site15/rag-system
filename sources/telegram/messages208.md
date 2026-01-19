## My telegram message #226606
**Time:** 03.04.2023 20:23:47 UTC+05:00
**Link:** https://t.me/nest_ru/226606

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- не помогло
- По дефолту если не указано, все в одной сети
- Спасибо за поправку. Посмотрю более детально для себя в доках. Еще один интересный параметр название контейнера базы данных. Оно отличается на скрине с терминалом и в файле конфигурации. Это тоже очень интересный вопрос.
- Коллеги, кто-нибудь пробовал пользоваться билдером для динамических модулей? Как правильно сделать registerAsync?

Main message:
Ты хочешь чтобы он подхватил всё интерцепторы

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ты хочешь чтобы он подхватил всё интерцепторы

--

## My telegram message #226612
**Time:** 03.04.2023 22:07:38 UTC+05:00
**Link:** https://t.me/nest_ru/226612

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Коллеги, кто-нибудь пробовал пользоваться билдером для динамических модулей? Как правильно сделать registerAsync?
- Ты хочешь чтобы он подхватил всё интерцепторы
- Я так и делаю. Посмотри на первом скрине, я передаю в Inject один интерсептор.
- Нашёл причину. Проблема была в циклическом импорте. Сервис тянет из файла с модулем токен. А файл с модулем тянет сервис, чтобы запровайдить.

Main message:
я через свою либу такие финты делаю, сам нест туповат в этом всем, и каждая либа кто подобное дает как хочет так и выкручивается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я через свою либу такие финты делаю, сам нест туповат в этом всем, и каждая либа кто подобное дает как хочет так и выкручивается

--

## My telegram message #226745
**Time:** 04.04.2023 19:52:05 UTC+05:00
**Link:** https://t.me/nest_ru/226745

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- коллеги, подскажите можно ли из экземпляра  app: INestApplication получить все провайдеры, которые реализуют определенный мой кастомный интерфейс?

Main message:
везде пихаю (работы, петы, шабашки)  https://www.npmjs.com/package/nestjs-custom-injector будет так  const providersList = app.get(CustomInjectorService).getProviders<MyInterface>(MyInterfaceToken);  нужно чтобы init был вызван у приложения, без инита оно будет падать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

везде пихаю (работы, петы, шабашки)  https://www.npmjs.com/package/nestjs-custom-injector будет так  const providersList = app.get(CustomInjectorService).getProviders<MyInterface>(MyInterfaceToken);  нужно чтобы init был вызван у приложения, без инита оно будет падать

--

## My telegram message #226764
**Time:** 04.04.2023 21:25:48 UTC+05:00
**Link:** https://t.me/nest_ru/226764

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет, посоветуйте где можно начать изучать nest js
- https://wanago.io/2020/05/11/nestjs-api-controllers-routing-module/
- у меня кстати в закладках ;D
- Спасибо!!!

Main message:
Ваще оно было в закрепе, но закрепы никто не читает(

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ваще оно было в закрепе, но закрепы никто не читает(

--

## My telegram message #227161
**Time:** 07.04.2023 14:35:33 UTC+05:00
**Link:** https://t.me/nest_ru/227161

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Вот что то не могу решить следующе. Есть контролер в нем метод, в методе реквест преобразуется в DTO. А как потом серелиазовать ответ на основании этого DTO, не нашел как его подсунть ни  NestInterceptor , ни декоратору котррый обработает ответ метода

Main message:
https://t.me/nest_ru/194571

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/194571

--

## My telegram message #227208
**Time:** 07.04.2023 17:38:14 UTC+05:00
**Link:** https://t.me/nest_ru/227208

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это глобальный интерсептор. Он вообще на уровень приложения вешается
- Да это я понял
- Простите
- ужас))

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

