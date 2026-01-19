## My telegram message #348189
**Time:** 07.03.2025 09:10:58 UTC+05:00
**Link:** https://t.me/nest_ru/348189

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Ага) время дешёвой рабочей силы пришло, зп меньше так как спецы исхудали, и их теперь в 10тыщ раз больше))

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ага) время дешёвой рабочей силы пришло, зп меньше так как спецы исхудали, и их теперь в 10тыщ раз больше))

--

## My telegram message #348410
**Time:** 08.03.2025 22:10:17 UTC+05:00
**Link:** https://t.me/nest_ru/348410

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- да без разницы же, по сути, нет?
- Ребят, подскажите пж какую библиотеку лучше использовать для работы с s3 хранилищами на nest js? нашел nestjs-minio-client и aws-sdk
- Так ты скинь 2 sql
- еще есть @aws-sdk/client-s3, но оф дока вообще предлагает minio для работы с js

Main message:
я вот эту юзаю  https://www.npmjs.com/package/nestjs-minio

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я вот эту юзаю  https://www.npmjs.com/package/nestjs-minio

--

## My telegram message #348566
**Time:** 10.03.2025 22:41:27 UTC+05:00
**Link:** https://t.me/nest_ru/348566

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Как определил?
- чутье развито
- Видимо недоразвито либо не развито☹️
- Да все верно. Но на одном ядре работает быстрее асинхроность. Иначе зачем её вообще придумывать нужно было

Main message:
сюда закину, очень прикольное и полезное видео как по тулзам, так и по мыслям, я щитаю видос ваще топ!  https://t.me/LLM4dev/250

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сюда закину, очень прикольное и полезное видео как по тулзам, так и по мыслям, я щитаю видос ваще топ!  https://t.me/LLM4dev/250

--

## My telegram message #348712
**Time:** 11.03.2025 17:09:02 UTC+05:00
**Link:** https://t.me/nest_ru/348712

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А нет хорошего совета пока: надо в nest, так как это дело обернётся в либу. Не могу вытащить адаптер, так как бекенды у конечного пользователя могут быть разные (fastify, express). Middleware не зависимую от бекенда придумать надо постараться. Я ещё не думал над этим

Main message:
это все потомучто юзаешь конфиг модуль, пиши свои конфиги и получится нормально все пример  import { Controller, Get } from '@nestjs/common'; import { HealthCheck } from '@nestjs/terminus'; import { TerminusHealthCheckService } from './terminus.service'; export function getTerminusHealthCheckController(endpoint: string) { @Controller(endpoint) class TerminusHealthCheckController { constructor(readonly terminusHealthCheckService: TerminusHealthCheckService) {} @Get() @HealthCheck() check() { return this.terminusHealthCheckService.check(); } } return TerminusHealthCheckController; } потом берешь из forRoot({endpoint:string}) и пихаешь в controllers:[getTerminusHealthCheckController(endpoint)]

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

это все потомучто юзаешь конфиг модуль, пиши свои конфиги и получится нормально все пример  import { Controller, Get } from '@nestjs/common'; import { HealthCheck } from '@nestjs/terminus'; import { TerminusHealthCheckService } from './terminus.service'; export function getTerminusHealthCheckController(endpoint: string) { @Controller(endpoint) class TerminusHealthCheckController { constructor(readonly terminusHealthCheckService: TerminusHealthCheckService) {} @Get() @HealthCheck() check() { return this.terminusHealthCheckService.check(); } } return TerminusHealthCheckController; } потом берешь из forRoot({endpoint:string}) и пихаешь в controllers:[getTerminusHealthCheckController(endpoint)]

--

## My telegram message #348716
**Time:** 11.03.2025 17:15:53 UTC+05:00
**Link:** https://t.me/nest_ru/348716

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- А что это меняет?

Main message:
у тебя конфиг модуль должен отработать свой forRoot а потом ты уже дергаешь конфиг сервис и берешь оттуда опцию и создаешь свой модуль с опциями контролера

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя конфиг модуль должен отработать свой forRoot а потом ты уже дергаешь конфиг сервис и берешь оттуда опцию и создаешь свой модуль с опциями контролера

--

## My telegram message #348719
**Time:** 11.03.2025 17:16:36 UTC+05:00
**Link:** https://t.me/nest_ru/348719

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- у тебя конфиг модуль должен отработать свой forRoot а потом ты уже дергаешь конфиг сервис и берешь оттуда опцию и создаешь свой модуль с опциями контролера

Main message:
но так не получится) сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

но так не получится) сделать

--

## My telegram message #349006
**Time:** 12.03.2025 23:28:42 UTC+05:00
**Link:** https://t.me/nest_ru/349006

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет. Хотел метрики прикрутить к сервису на Nest, все запустил на docker compose, на сервере конфиг nginx поднастроил немного так  location /grafana/ { proxy_pass http://localhost:3000/; proxy_set_header Host $host; proxy_set_header X-Real-IP $remote_addr; proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; proxy_set_header X-Forwarded-Proto $scheme; rewrite ^/grafana/(.*) /$1 break; } пусть по такому пути открывается. Вот кусочек compose-файла  app: build: context: . dockerfile: Dockerfile environment: DB_HOST: ${DB_HOST} DB_PORT: ${DB_PORT} MYSQL_ROOT_PASSWORD: 1 DB_USER: ${DB_USER} DB_PASSWORD: ${DB_PASSWORD} DB_DATABASE: ${DB_DATABASE} ports: - ${HTTP_PORT}:${HTTP_PORT} restart: always depends_on: redis: condition: service_healthy networks: - monitoring-network prometheus: image: prom/prometheus:latest ports: - '9090:9090' volumes: - ./prometheus.yml:/etc/prometheus/prometheus.yml - prometheus-data:/prometheus command: - '--config.file=/etc/prometheus/prometheus.yml' - '--storage.tsdb.path=/prometheus' networks: - monitoring-network grafana: image: grafana/grafana:latest ports: - '3000:3000' volumes: - grafana-data:/var/lib/grafana environment: - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD} depends_on: - prometheus networks: - monitoring-network networks: monitoring-network: driver: bridge volumes: redis-data: prometheus-data: grafana-data: nginx перезагрузил, в итоге по  /grafana ругается только 404. Кто может подсказать, что я упустил?

Main message:
у тебя нет конфига по нгинкс, создай пустой проект и повтори проблему, залей в гитхаб и скидывай ссылку, твоя проблема имеет 10000 решений, дай репозиторий в гитхаб чтобы сузить хотябь до 100

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя нет конфига по нгинкс, создай пустой проект и повтори проблему, залей в гитхаб и скидывай ссылку, твоя проблема имеет 10000 решений, дай репозиторий в гитхаб чтобы сузить хотябь до 100

--

## My telegram message #349166
**Time:** 13.03.2025 18:35:26 UTC+05:00
**Link:** https://t.me/nest_ru/349166

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Нет. Скорее всего для моего кейса действительно достаточно обычного process.env, потому не понимаю реальной проблематики использования его вместо конфиг сервиса. А можете привести примеры где конфиг сервис необходим?

Main message:
при написании интеграционных тестов для своего модуля ты можешь создать свой модуль несколько раз с разными опциями, а если завяжешся чисто на процесс енв, то у тебя две копии модуля получат одну и туже опцию

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

при написании интеграционных тестов для своего модуля ты можешь создать свой модуль несколько раз с разными опциями, а если завяжешся чисто на процесс енв, то у тебя две копии модуля получат одну и туже опцию

--

## My telegram message #349300
**Time:** 14.03.2025 08:31:26 UTC+05:00
**Link:** https://t.me/nest_ru/349300

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Нет, всё языки кроме дот нет созданы так чисто ради прикола, ржакаже создать язык который не ентерпрайз и потом смотреть как люди на нём пишут проды свои)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Нет, всё языки кроме дот нет созданы так чисто ради прикола, ржакаже создать язык который не ентерпрайз и потом смотреть как люди на нём пишут проды свои)

--

## My telegram message #349406
**Time:** 14.03.2025 09:31:59 UTC+05:00
**Link:** https://t.me/nest_ru/349406

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А где еще
- Можно правило в CI добавить, чтобы при наличии определенного слова в теле коммита - запускалась сборка только одного какого-то проекта
- ахахахахахах жесть
- Дохуя хочешь...

Main message:
через это  @theunderscorer/nx-semantic-release версии бампаю всего что затронулось и деплою только то что изменилось

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

через это  @theunderscorer/nx-semantic-release версии бампаю всего что затронулось и деплою только то что изменилось

--

## My telegram message #349411
**Time:** 14.03.2025 11:03:18 UTC+05:00
**Link:** https://t.me/nest_ru/349411

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Крч я подумал, видимо пойду сделаю тулинг для дотнета по типу changesets, но более автоматизированный

Main message:
https://github.com/nx-dotnet/nx-dotnet по идее есть уже нкс для дотнет, плагин что выше скинул можно прикрутить и будет тот же самый еффект

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/nx-dotnet/nx-dotnet по идее есть уже нкс для дотнет, плагин что выше скинул можно прикрутить и будет тот же самый еффект

--

## My telegram message #349711
**Time:** 15.03.2025 14:18:51 UTC+05:00
**Link:** https://t.me/nest_ru/349711

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- да, это понятно, что есть простор для оптимизации)) но я подумал, что если удастся ускорить раннер малой кровью, то разбирательство с кодом можно будет немного отложить =)

Main message:
Они в параллель стартуют?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Они в параллель стартуют?

--

## My telegram message #349714
**Time:** 15.03.2025 14:25:10 UTC+05:00
**Link:** https://t.me/nest_ru/349714

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- dotnet affected кстати может выплевывать .proj файл перечислением всех задетых проектов, и на нем можно запустить билд / тесты / паблиш и тд

Main message:
https://t.me/DotNetRuChat

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/DotNetRuChat

--

## My telegram message #349746
**Time:** 15.03.2025 18:44:42 UTC+05:00
**Link:** https://t.me/nest_ru/349746

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- По пакетам или прямо по модулям?

Main message:
как создашь уж, я обычно модули компилируемыми создаю, тоесть пакет получается

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

как создашь уж, я обычно модули компилируемыми создаю, тоесть пакет получается

--

