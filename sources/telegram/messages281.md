## My telegram message #316029
**Time:** 30.09.2024 15:41:37 UTC+05:00
**Link:** https://t.me/nest_ru/316029

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- мне нужна помощь по микросервису Nestjs gRPC  #проблема загрузка модуля медленная  #module  @Module({ imports: [ ClientsModule.register([ { name: USER_SERVICE, transport: Transport.GRPC, options: { package: 'user', protoPath: join(__dirname, '../../protos/user.proto'), url: config.USER_SERVICE_URL, }, }, { name: FILE_SERVICE, transport: Transport.GRPC, options: { package: 'file', protoPath: join(__dirname, '../../protos/file.proto'), url: config.FILE_SERVICE_URL, }, }, ]), ], controllers: [CompanyController], providers: [ { provide: 'ICompanyService', useClass: CompanyService, }, { provide: 'IFileService', useClass: FileService }, { provide: 'ICompanyToCompanyService', useClass: CompanyToCompanyService }, ExcelParserService, ], }) export class CompanyModule {}  #service  @Injectable() export class CompanyService implements OnModuleInit, ICompanyService { private userMicroService: IUserMicroCompanyService; constructor(@Inject(USER_SERVICE) private userClient: ClientGrpc) {} onModuleInit() { this.userMicroService = this.userClient.getService('CompanyService'); }}

Main message:
так как в рантайм происходит генерация клиента, создай заранее и используй  https://www.npmjs.com/package/nice-grpc

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

так как в рантайм происходит генерация клиента, создай заранее и используй  https://www.npmjs.com/package/nice-grpc

--

## My telegram message #316479
**Time:** 03.10.2024 12:17:55 UTC+05:00
**Link:** https://t.me/nest_ru/316479

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Кто
- нест
- Я подумал что с утра уже и обзывают 😄
- Ребята, помогите определиться плез. хочу поставить HMR, в доках неста есть инструкция по этому поводу с использованием вебпака. а также в интернете я нашел что есть vite node-plugin в котором тоже написано что есть HMR. проблема в том что во втором случает vite это ж вроде фронт бандлер и я не знаю что там под капотом у плагина, но чисто из выбора меня больше привлекает vite нежели вебпак. какой лучше брать?

Main message:
тормозит чтоли гдет?

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

тормозит чтоли гдет?

--

## My telegram message #316485
**Time:** 03.10.2024 12:23:43 UTC+05:00
**Link:** https://t.me/nest_ru/316485

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
эм, интеграционный тест напиши

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эм, интеграционный тест напиши

--

## My telegram message #316488
**Time:** 03.10.2024 12:24:14 UTC+05:00
**Link:** https://t.me/nest_ru/316488

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- не не поготь, извини конечно за такое мнение) я попробовал два варианта и они работают. стало лучше в обоих случаях. мне нужно теперь определиться какой варик действительно лучше

Main message:
лучше тесты писать)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше тесты писать)

--

## My telegram message #317130
**Time:** 05.10.2024 03:05:29 UTC+05:00
**Link:** https://t.me/nest_ru/317130

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
че за

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

че за

--

