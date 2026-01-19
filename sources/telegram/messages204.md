## My telegram message #221647
**Time:** 09.03.2023 21:47:23 UTC+05:00
**Link:** https://t.me/nest_ru/221647

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У меня редис)
- я пока особо не разбирался к примеру для чего тащить redis по факту redis это ключ значение я могу создать {} где ключ api+params -> value и повесить на все либо некоторые запросы проверку Если в {} по ключу апи есть что-то отдай это или добавь туда
- Sessions для ssr, jwt при получении данных с сервера (json, XML и др)
- Чтобы сделать библиотеку для ноды с с++ можно использовать библиотеку node-addon-api Например следующий код, просто логирование в файл (достоверность не гарантирую)  #include <node_api.h>  #include <iostream>  #include <fstream>  #include <ctime> napi_value LogWithDate(napi_env env, napi_callback_info info) { napi_status status; size_t argc = 1; napi_value argv[1]; status = napi_get_cb_info(env, info, &argc, argv, nullptr, nullptr); if (status != napi_ok) return nullptr; // Получаем сообщение из аргументов char message[256]; status = napi_get_value_string_utf8(env, argv[0], message, 256, nullptr); if (status != napi_ok) return nullptr; // Открываем файл лога std::ofstream logfile;  logfile.open ("logfile.txt", std::ios::app); // Получаем текущее время и дату time_t now = time(0); char* dt = ctime(&now); // Логируем сообщение вместе с текущей датой и временем logfile << "Сообщение: " << message << " Дата: " << dt << std::endl; // Закрываем файл лога logfile.close(); return nullptr; } napi_value Init(napi_env env, napi_value exports) { napi_status status; napi_value fn; // Создаем функцию LogWithDate и экспортируем ее status = napi_create_function(env, nullptr, 0, LogWithDate, nullptr, &fn); if (status != napi_ok) return nullptr; status = napi_set_named_property(env, exports, "LogWithDate", fn); if (status != napi_ok) return nullptr; return exports; } NAPI_MODULE(NODE_GYP_MODULE_NAME, Init) Здесь мы создаём функцию LogWithDate Затем мы экспортируем эту функцию, создавая функцию Init, которая вызывается при инициализации модуля Наконец, мы используем макрос NAPI_MODULE для определения модуля Node.js с именем, определяемым в переменной NODE_GYP_MODULE_NAME, и функцией инициализации Init. Тебе понадобится инструкция binding.gyp { "targets": [ { "target_name": "logwithdate", "sources": [ "logwithdate.cpp" ], "include_dirs": [ "<!DOCTYPE html>", "<!DOCTYPE html>", "<!DOCTYPE html>", "<!DOCTYPE html>", "<!DOCTYPE html>" ], "libraries": [], "conditions": [ ["OS=='linux'", { "cflags": ["-std=c++11"] }] ] } ] } Чтобы собрать модуль Node.js надо выполнить node-gyp configure && node-gyp build Это создаст файл build/Release/logwithdate.node Чтобы использовать в js надо написать const logwithdate = require('./build/Release/logwithdate.node'); logwithdate.LogWithDate('Привет, мир!'); Это добавит запись в файл лога logfile.txt "Привет, мир!"

Main message:
ChatGPT штоли

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ChatGPT штоли

--

## My telegram message #222080
**Time:** 12.03.2023 16:10:52 UTC+05:00
**Link:** https://t.me/nest_ru/222080

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я уверен и по 5-10т выдержит Если грамотно делать все

Main message:
я чекал одновременно 5 соединений норм держит 👍

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я чекал одновременно 5 соединений норм держит 👍

--

## My telegram message #222175
**Time:** 13.03.2023 18:38:34 UTC+05:00
**Link:** https://t.me/nest_ru/222175

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет использую Nest вместе с призмой создала PrismaService по примеру офф документации неста  import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common'; import { PrismaClient } from '@prisma/client'; @Injectable() export class PrismaService extends PrismaClient implements OnModuleInit { async onModuleInit() { await this.$connect(); } async enableShutdownHooks(app: INestApplication) { this.$on('beforeExit', async () => { await app.close(); }); } } теперь пишу юнит тесты в файле spec все стандартно  describe('TrafficController', () => { let controller: TrafficController; let service: TrafficService; beforeEach(async () => { const module: TestingModule = await Test.createTestingModule({ controllers: [TrafficController], providers: [TrafficService, PrismaService], }).compile(); controller = module.get<TrafficController>(TrafficController); service = module.get<TrafficService>(TrafficService); });  но я получаю теперь ворнинги что у меня уже аж 10 сущностей призма клиента There are already 10 instances of Prisma Client actively running . Может кто-то подскажет как это исправить - изза того что создаеться новая сущность тесты очень долго раняться и у меня падает пайплайн

Main message:
providers: [ PrismaClientService.instance ? { provide: PrismaClientService, useValue: PrismaClientService.instance, } : { provide: PrismaClientService, useClass: PrismaClientService, }, ], exports: [PrismaClientService], ... class PrismaClientService{ constructor(...args) { super(...args); PrismaClientService.instance = this; } } тип того делаю

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

providers: [ PrismaClientService.instance ? { provide: PrismaClientService, useValue: PrismaClientService.instance, } : { provide: PrismaClientService, useClass: PrismaClientService, }, ], exports: [PrismaClientService], ... class PrismaClientService{ constructor(...args) { super(...args); PrismaClientService.instance = this; } } тип того делаю

--

## My telegram message #222210
**Time:** 14.03.2023 09:06:23 UTC+05:00
**Link:** https://t.me/nest_ru/222210

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет, хочу использовать голый bull с nestjs и можно ли как то передать this сервиса с инжектами внутрь process? подскажите плз
- а есть какое то комьюнити по фласку, не шарите?
- всем привет, написал свой вопрос на стековерфлоу, был бы рад любой помощи от вас  https://stackoverflow.com/questions/75727255/nestjs-how-can-i-access-the-server-instance-from-a-websocketgateway-in-another-s связано с nestjs gateway
- привет, подскажите , не могу получить картинку с сервера , не находит . В чем может быть дело ?

Main message:
без апи может

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

без апи может

--

## My telegram message #222214
**Time:** 14.03.2023 10:50:06 UTC+05:00
**Link:** https://t.me/nest_ru/222214

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Подскажите, как подружить graphql-jit с nest/graphql? не могу найти примеры реализации

Main message:
https://github.com/zalando-incubator/graphql-jit/blob/main/examples/blog-apollo-server/src/server.ts сам не пробовал интегрировать просто как то искал тоже

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/zalando-incubator/graphql-jit/blob/main/examples/blog-apollo-server/src/server.ts сам не пробовал интегрировать просто как то искал тоже

--

