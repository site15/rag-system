## My telegram message #263966
**Time:** 03.11.2023 14:30:01 UTC+05:00
**Link:** https://t.me/nest_ru/263966

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я тут задавал вопрос, кстати, пару дней назад. Почему в текущей документации nest в constructor(private catsService: CatsService) {} избавились от readonly. Во всех туториалах и в старой доке он есть. Может все же кто ответит из тех, кто умные книги читал?

Main message:
Просто предположение: может есть некая спека по которой ТС, там будет реальный реал онли объект и диай неста не может туда всунуть сервис, и чтобы не менять кор неста, проще было убрать везде реадонли, это в 1000 раз проще чем потом горы ишью с поломками разгребать, то что аффектнет после переписывания кор

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Просто предположение: может есть некая спека по которой ТС, там будет реальный реал онли объект и диай неста не может туда всунуть сервис, и чтобы не менять кор неста, проще было убрать везде реадонли, это в 1000 раз проще чем потом горы ишью с поломками разгребать, то что аффектнет после переписывания кор

--

## My telegram message #264137
**Time:** 04.11.2023 16:23:08 UTC+05:00
**Link:** https://t.me/nest_ru/264137

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ребята а как на typeorm у казать не нужные поля а не наоборот. async findAll() { const category = await this.categoryRepository .createQueryBuilder('category') .leftJoinAndSelect('category.subcategories', 'subcategories') .loadRelationCountAndMap( 'category.subcategoriesCount', 'category.subcategories', ) .select([ ' category.id ', 'category.title_tkm', 'category.title_ru', 'category.title_en', 'category.imagePath', 'category.imageName', ' subcategories.id ', 'subcategories.title_tkm', 'subcategories.title_ru', 'subcategories.title_en', 'subcategories.imagePath', 'subcategories.imageName', ]) .getMany();
- Есть ли апи для вотсапа, чтобы с бизнес аккаунта делать рассылку ?
- конечно есть, гуглится whatsapp business api выбираешь провайдера - пользуешься, профит
- Подскажите пожалуйста по class-validator. Стояла какая то версия, и мне pnpm сказал поставить дев зависимость class-validator опять же какой то ещё версии, в итоге из save зависимость удалилась и поставилась библа ниже версией в дев депенденси, и раньше приходил json с полем message типа string[] а щас message это объект замудрённый. Чё делать? Поставить как save зависимость последней версией и забить на варнинги которые pnpm пишет?

Main message:
Скорее всего нест версия сменилась

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Скорее всего нест версия сменилась

--

## My telegram message #264342
**Time:** 06.11.2023 14:39:14 UTC+05:00
**Link:** https://t.me/nest_ru/264342

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- как выкинуть ошибку именно на уровне валидации дто, если два условных поля одновременно равны каким то значениям a и b

Main message:
ValidateIf или кастомный валидатор

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ValidateIf или кастомный валидатор

--

## My telegram message #264488
**Time:** 07.11.2023 21:22:41 UTC+05:00
**Link:** https://t.me/nest_ru/264488

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://community.fly.io/t/cant-connect-to-database/5484/2 ну вот моя проблема попробую в твою сторону про порт ещё прошертить, спасибо
- у класс валидатора реально какие то проблемы с вложенной валидацией или у меня руки кривые?
- Наверное 2
- просто есть три дто. валидация второй из первой проходит нормально, а третьей из второй уже нет :)

Main message:
на стек блитс сделай пример

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на стек блитс сделай пример

--

## My telegram message #264491
**Time:** 07.11.2023 21:22:59 UTC+05:00
**Link:** https://t.me/nest_ru/264491

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- просто есть три дто. валидация второй из первой проходит нормально, а третьей из второй уже нет :)
- на стек блитс сделай пример
- Проверь
- это как

Main message:
https://stackblitz.com/

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://stackblitz.com/

--

## My telegram message #264496
**Time:** 07.11.2023 21:24:28 UTC+05:00
**Link:** https://t.me/nest_ru/264496

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://stackblitz.com/
- Круто
- о
- Либо решить проблему))

Main message:
у меня не было проблем с кучей вложенностей, ну это было давно, может в новых версиях и касяк (я заморозился на старой версии, мне пох)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у меня не было проблем с кучей вложенностей, ну это было давно, может в новых версиях и касяк (я заморозился на старой версии, мне пох)

--

## My telegram message #264516
**Time:** 07.11.2023 22:31:41 UTC+05:00
**Link:** https://t.me/nest_ru/264516

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- спасибо
- В целом если переболеть трансформ тру.  @type из трансформера на подсущности
- ну дак
- Сорри, если не совсем в тему, но проблема связана с платежками в Юкассе и Страйпе с NestJs. Может быть кто сталкивался, когда Страйп или Юкасса присылают ответ в вебхук через какое-то время после произведённой оплаты? Через час, два или позже. И это часто путает, когда ты хочешь оплатить одну услугу в боте, оплачиваешь её, приходит успешный платеж, а через 5 минут ещё один, и этот ещё один - опоздавший платеж, который был совершён ещё несколько часов назад. Я уже несколько дней думаю, что можно сделать и ничего в голову больше не приходит, кроме делать какие-то костыли. Может есть какое-то решение? Или какая ещё информация от меня нужна, чтобы мне помочь? :(

Main message:
внедри УЕ, туда закидывай сумму

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

внедри УЕ, туда закидывай сумму

--

## My telegram message #264544
**Time:** 08.11.2023 07:43:45 UTC+05:00
**Link:** https://t.me/nest_ru/264544

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- @KaufmanEndy что думаешь если class-validator заменить на nestjs-zod в nx и валидации выносит в lib чтобы фронт переиспользовал?

Main message:
Мне Зод не зашёл, я и так шарю ДТО с класс трансформ и валидатион на фронт и бэк

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Мне Зод не зашёл, я и так шарю ДТО с класс трансформ и валидатион на фронт и бэк

--

## My telegram message #264549
**Time:** 08.11.2023 07:49:32 UTC+05:00
**Link:** https://t.me/nest_ru/264549

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- На фронте тоже class-validator?

Main message:
https://www.npmjs.com/package/ngx-dynamic-form-builder

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://www.npmjs.com/package/ngx-dynamic-form-builder

--

## My telegram message #264551
**Time:** 08.11.2023 07:51:06 UTC+05:00
**Link:** https://t.me/nest_ru/264551

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- хочу уточнить — общие локальные дто для каждого из приложений или же они шарятся по монорепе?

Main message:
Монореп libs/feature/server libs/feature/client libs/feature/common apps/server apps/client apps/feature-job-ms

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Монореп libs/feature/server libs/feature/client libs/feature/common apps/server apps/client apps/feature-job-ms

--

## My telegram message #264635
**Time:** 08.11.2023 20:13:07 UTC+05:00
**Link:** https://t.me/nest_ru/264635

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- пишешь парсеры и кликеры на джсе?
- хихи хаха
- yakuza.dev/:1 Access to XMLHttpRequest at ' https://backend.yakuza.dev/send/feedback ' from origin ' https://yakuza.dev ' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Привет, парни! Подскажите, пожалуйста, в чём ошибка корсов Всё было ок на тестовом домене - поменял домен и возникла ошибка
- А если не angular?) а реакт?)

Main message:
увольняйся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

увольняйся

--

## My telegram message #264638
**Time:** 08.11.2023 20:16:25 UTC+05:00
**Link:** https://t.me/nest_ru/264638

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://github.com/robertt/class-validator-formik вот перовое что нашел, я когда был на реакт у меня формик юзался

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/robertt/class-validator-formik вот перовое что нашел, я когда был на реакт у меня формик юзался

--

## My telegram message #264668
**Time:** 08.11.2023 22:32:18 UTC+05:00
**Link:** https://t.me/nest_ru/264668

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Ну так нет, в ошибке видно что все по схеме приходит
- нет, он говорит что непонятное что-то
- чат гопоту пробовал?
- Чат Nginx? Если да, то пробовал. Там такое себе сообщество....

Main message:
ChatGPT

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ChatGPT

--

## My telegram message #264670
**Time:** 08.11.2023 22:34:09 UTC+05:00
**Link:** https://t.me/nest_ru/264670

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- всем привет. написал приложение, фронтенд reactJS, бэкенд NestJS. Вот так настроил Nginx, в файле /etc/nginx/sites-enabled/default для фронтенда. server { root /var/www/build; index index.html index.htm index.nginx-debian.html; server_name  site.ru  www.site.ru ; gzip on; gzip_min_length 100; gzip_comp_level 3; gzip_types text/plain; gzip_types text/css; gzip_types text/javascript; gzip_disable "msie6"; location / { try_files $uri $uri/  /index .html; } listen 443 ssl; # managed by Certbot ssl_certificate ............ ............................... } фронтенд работает нормально. запускаю бэкенд, тестирую через Postman - работает, а когда фронт пытается получить данные с бэкенда - вылетает ошибка "net::ERR_SSL_PROTOCOL_ERROR" Подскажите как настроить Nginx что бы можно было отправлять запросы с фронтенда на бэкенд ?

Main message:
на одном домене оба?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

на одном домене оба?

--

## My telegram message #264674
**Time:** 08.11.2023 22:37:56 UTC+05:00
**Link:** https://t.me/nest_ru/264674

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Да

Main message:
https://medium.com/geekculture/deploying-a-react-app-and-a-node-js-server-on-a-single-machine-with-pm2-and-nginx-15f17251ee74 просто в поиске вбил

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://medium.com/geekculture/deploying-a-react-app-and-a-node-js-server-on-a-single-machine-with-pm2-and-nginx-15f17251ee74 просто в поиске вбил

--

## My telegram message #264729
**Time:** 09.11.2023 19:56:23 UTC+05:00
**Link:** https://t.me/nest_ru/264729

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Дура сама заплатила и никого не привела
- мошенники короче
- В общем то да
- Они работают

Main message:
сорян, если что тегайте да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сорян, если что тегайте да

--

