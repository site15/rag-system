## My telegram message #206568
**Time:** 15.12.2022 20:19:18 UTC+05:00
**Link:** https://t.me/nest_ru/206568

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тогда просто используй правило exports для модуля сообщений внутри папки tickets/messages. Прокинь его в импорт модуля тикетов. А в контроллере сообщений просто добавь префикс tickets для класса
- Уже так сделал, но если я просто добавлю префикс tickets то у меня будет путь /tickets/messages/1 а надо tickets/1/messages где 1 id тикета
- И к слову, что-бы контроллер не разрастался - ты можешь создать рядом еще один контроллер и так-же прокинуть его в массив контроллеров в модуле. И в этом контроллере прописываешь эндпоинты уже другого под-адреса
- Вот это вопрос, можно ли сделать динамический префикс контролёра и где его потом достать. Такого в доке нет и в Гугле не нашел

Main message:
https://docs.nestjs.com/recipes/router-module

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://docs.nestjs.com/recipes/router-module

--

