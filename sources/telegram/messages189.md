## My telegram message #204173
**Time:** 05.12.2022 01:25:42 UTC+05:00
**Link:** https://t.me/nest_ru/204173

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
мани чекни

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мани чекни

--

## My telegram message #204437
**Time:** 06.12.2022 17:10:53 UTC+05:00
**Link:** https://t.me/nest_ru/204437

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Ребят, кто какую ORM использует при работе с ClickHouse?

Main message:
На работе это юзали + своя обертка под нест  https://github.com/apla/node-clickhouse В будущем планирую это юзать  https://www.npmjs.com/package/@depyronick/nestjs-clickhouse

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

На работе это юзали + своя обертка под нест  https://github.com/apla/node-clickhouse В будущем планирую это юзать  https://www.npmjs.com/package/@depyronick/nestjs-clickhouse

--

## My telegram message #204574
**Time:** 07.12.2022 16:14:29 UTC+05:00
**Link:** https://t.me/nest_ru/204574

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Подскажите по призме. Я правильно понимаю, что на данный момент в файле schema.prisma нельзя добавить check constraint для postgres? И также нельзя установить int значения для enum? Задача простая - установить мин и макс значения для int колонки. Кто-нибудь такое уже делал?

Main message:
ну ты миграцию же создаешь по изменениям в схеме, туда и пишешь создание чека

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну ты миграцию же создаешь по изменениям в схеме, туда и пишешь создание чека

--

## My telegram message #204576
**Time:** 07.12.2022 16:22:34 UTC+05:00
**Link:** https://t.me/nest_ru/204576

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет , подскажите а для приватного API есть какой то принцип выдачи апи ключей , что он себе представляет ? Просто уникальный ключ который хранится в бд и проверятся при запросах ?
- в одном из проектов в котором я когда-то работал именно так и было, только там ключ в энвах хранился
- ну ты миграцию же создаешь по изменениям в схеме, туда и пишешь создание чека
- Понял, спасибо. Просто думал может можно как-то в схеме определить constraints, а не руками дополнять потом миграцию

Main message:
это же кастом, а призма схема она типа кроссбазовая

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это же кастом, а призма схема она типа кроссбазовая

--

## My telegram message #204944
**Time:** 08.12.2022 20:08:37 UTC+05:00
**Link:** https://t.me/nest_ru/204944

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- зачем? сделай private readonly whatsapp: WhatsAppAPI; contrructor() { this.whatsapp = new WhatsAppAPI({}) }

Main message:
еще так можно по идее class WhatsAppAPIClient extends WhatsAppAPI{} providers:[{[provide:WhatsAppAPIClient, useFactory:(...args)=>new WhatsAppAPIClient(...args)}]  @Inject (WhatsAppAPIClient) whatsAppAPIClient: WhatsAppAPIClient

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

еще так можно по идее class WhatsAppAPIClient extends WhatsAppAPI{} providers:[{[provide:WhatsAppAPIClient, useFactory:(...args)=>new WhatsAppAPIClient(...args)}]  @Inject (WhatsAppAPIClient) whatsAppAPIClient: WhatsAppAPIClient

--

