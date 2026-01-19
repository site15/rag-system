## My telegram message #161035
**Time:** 18.05.2022 19:08:34 UTC+05:00
**Link:** https://t.me/nest_ru/161035

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В штат?
- Напишите ещё сюда:  @nodejs_jobs
- Благодарю!
- @KaufmanEndy работу нашёл?

Main message:
неа) проектную работу взял, на ней сижу, почти как работа получается, просто не постоянная, как временное решение пойдет)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

неа) проектную работу взял, на ней сижу, почти как работа получается, просто не постоянная, как временное решение пойдет)

--

## My telegram message #161526
**Time:** 20.05.2022 11:26:31 UTC+05:00
**Link:** https://t.me/nest_ru/161526

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
есть способ, генерируй из базы призма схему и из нее клиента, этот клиент можно юзать на фронте как тайпинги, тоесть использовать призму для генерации типов обьектов базы данных фронту, при этом в бэке юзать тайп орм как обычно)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

есть способ, генерируй из базы призма схему и из нее клиента, этот клиент можно юзать на фронте как тайпинги, тоесть использовать призму для генерации типов обьектов базы данных фронту, при этом в бэке юзать тайп орм как обычно)

--

## My telegram message #161551
**Time:** 20.05.2022 13:39:59 UTC+05:00
**Link:** https://t.me/nest_ru/161551

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- поделишься?
- Да, через пару часов Сейчас не у пк
- Я делаю подключение typeorm к другой БД, в рамках одного сервиса.  @Entity ({ name: 'name', database: 'db', }) export... такой подход работает, но typeorm прибавляет к name префикс, что указан в настройках подключения. Вопрос, можно ли как-то узнать ему, что именно к этой entity применять префикс ненужно?
- привет. подскажите пожалуйста как запустить скрипт из вне приложения?

Main message:
fork-ом можно внутри под процесс создать и он не будет грузить основной процесс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

fork-ом можно внутри под процесс создать и он не будет грузить основной процесс

--

## My telegram message #161698
**Time:** 20.05.2022 19:14:22 UTC+05:00
**Link:** https://t.me/nest_ru/161698

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- тут единого мнения не слышал. умные люди говорят что не норм. но я так делаю
- хз, мне кажется норм, сервис на то и сервис чтобы быть прокладкой между контроллером и бд
- Как я из чата узнал - норм бросать Exception специальные. Отлавливать их Exception Filter и уже от туда бросать HttpException
- Добрый день, подскажите, по базам в контейнере докер , там по умолчанию часовой пояс UTC , какая практика ? Приводят его к часовому поясу системы в которой докер установлен , или оставляют как есть ?

Main message:
UTC

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

UTC

--

## My telegram message #161745
**Time:** 20.05.2022 20:00:06 UTC+05:00
**Link:** https://t.me/nest_ru/161745

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Здарова парни )) Вопрос по prisma что делать если нужно на лету менять схему базы данныех ? Заранее создать несколько призма.схем и в коде к разным обращаться ?

Main message:
ты просто хочешь менять конекшены? там же есть методы дисконекта и коннекта и для всех конекшен стрингов просто создай пулл с разными подключениями

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты просто хочешь менять конекшены? там же есть методы дисконекта и коннекта и для всех конекшен стрингов просто создай пулл с разными подключениями

--

## My telegram message #161756
**Time:** 20.05.2022 20:08:20 UTC+05:00
**Link:** https://t.me/nest_ru/161756

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я правильно понял тут прнимать параметром схему базы ? А connect принимает схему ?

Main message:
у тебя не так будет, инжектабла не будет, будет так class PrismaClients{ clients:Record<string,PrismaService>={}; getByConnectionString(cs:string){ if(!this.clients[cs]){ this.clients[cs]=new PrismaService(cs); } return this.clients[cs]; } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

у тебя не так будет, инжектабла не будет, будет так class PrismaClients{ clients:Record<string,PrismaService>={}; getByConnectionString(cs:string){ if(!this.clients[cs]){ this.clients[cs]=new PrismaService(cs); } return this.clients[cs]; } }

--

## My telegram message #161776
**Time:** 20.05.2022 20:47:38 UTC+05:00
**Link:** https://t.me/nest_ru/161776

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У меня то он и не зависает ....
- Значит не впш кейс. Таймаутов на бездействие вроде нет там
- а где хранить эксепшены, которые юзаются только в сервайсе? в  [module].exceptions.ts ? или прямо в сервайсе их писать?
- Я пытаюсь понять но у меня не получается что делает класс PrismaClients ? getByConnectionString возвращает PrismaService в которую мы предали свой datasources ?

Main message:
@Injectable() export class PrismaClients { clients: Record<string, PrismaClient> = {}; getClient(url: string) { if (!this.clients[url]) { this.clients[url] = new PrismaClient({ datasources: { db: { url, }, }, rejectOnNotFound: true, log: [ { emit: 'event', level: 'query', }, { emit: 'event', level: 'error', }, ], }); } return this.clients[url]; } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

@Injectable() export class PrismaClients { clients: Record<string, PrismaClient> = {}; getClient(url: string) { if (!this.clients[url]) { this.clients[url] = new PrismaClient({ datasources: { db: { url, }, }, rejectOnNotFound: true, log: [ { emit: 'event', level: 'query', }, { emit: 'event', level: 'error', }, ], }); } return this.clients[url]; } }

--

## My telegram message #161786
**Time:** 20.05.2022 23:54:40 UTC+05:00
**Link:** https://t.me/nest_ru/161786

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Я в плане, что маршруты админа и пользователя могут содержать разные методы, либо пользователь создаёт запись с одними данными, а админ для этого пользователя с другими, в таком случае если делать в одном контроллере, то это нарушает принцип единственной ответственности. Как быть с этим? В папке Post создавать два контроллера PostController и AdminPostController?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

