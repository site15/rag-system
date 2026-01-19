## My telegram message #275418
**Time:** 25.12.2023 21:51:14 UTC+05:00
**Link:** https://t.me/nest_ru/275418

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! подскажите, пожалуйста, что нужно сделать для обработки ошибки в интерсепторе, приложу ответ chatgpt, только мне надо поменять throwError на что-то  // custom-response.interceptor.ts import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common'; import { Observable, throwError } from 'rxjs'; import { catchError, map } from 'rxjs/operators'; @Injectable() export class CustomResponseInterceptor implements NestInterceptor { intercept(context: ExecutionContext, next: CallHandler): Observable<any> { return next.handle().pipe( map(data => ({ status: 'success', code: HttpStatus.OK, data, error: null, })), catchError(error => { const response = context.switchToHttp().getResponse(); let status = HttpStatus.INTERNAL_SERVER_ERROR; let message = 'Internal Server Error'; if (error instanceof Error) { if (error instanceof BadGatewayException) { status = HttpStatus.BAD_GATEWAY; message = 'Bad Gateway'; } else if (error instanceof NotFoundException) { status = HttpStatus.NOT_FOUND; message = 'Not Found'; } } return throwError({ status: 'failure', code: status, data: null, error: { message, details: error instanceof Error ? error.message : null, }, }); }), ); } }

Main message:
throwError(()=>

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

throwError(()=>

--

## My telegram message #275421
**Time:** 25.12.2023 22:41:59 UTC+05:00
**Link:** https://t.me/nest_ru/275421

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- а в методе validate как? async validate(payload: JwtPayload, req: Request) вторым свойством прилетает 'verified'
- Всем привет! подскажите, пожалуйста, что нужно сделать для обработки ошибки в интерсепторе, приложу ответ chatgpt, только мне надо поменять throwError на что-то  // custom-response.interceptor.ts import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common'; import { Observable, throwError } from 'rxjs'; import { catchError, map } from 'rxjs/operators'; @Injectable() export class CustomResponseInterceptor implements NestInterceptor { intercept(context: ExecutionContext, next: CallHandler): Observable<any> { return next.handle().pipe( map(data => ({ status: 'success', code: HttpStatus.OK, data, error: null, })), catchError(error => { const response = context.switchToHttp().getResponse(); let status = HttpStatus.INTERNAL_SERVER_ERROR; let message = 'Internal Server Error'; if (error instanceof Error) { if (error instanceof BadGatewayException) { status = HttpStatus.BAD_GATEWAY; message = 'Bad Gateway'; } else if (error instanceof NotFoundException) { status = HttpStatus.NOT_FOUND; message = 'Not Found'; } } return throwError({ status: 'failure', code: status, data: null, error: { message, details: error instanceof Error ? error.message : null, }, }); }), ); } }
- throwError(()=>
- хттп эксепшены юзай

Main message:
лучше юзать декомпозицию вместо ооп

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

лучше юзать декомпозицию вместо ооп

--

## My telegram message #275423
**Time:** 25.12.2023 22:43:36 UTC+05:00
**Link:** https://t.me/nest_ru/275423

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- throwError(()=>
- хттп эксепшены юзай
- лучше юзать декомпозицию вместо ооп
- ща погуглю

Main message:
диа короче

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

диа короче

--

## My telegram message #275426
**Time:** 25.12.2023 22:44:15 UTC+05:00
**Link:** https://t.me/nest_ru/275426

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- лучше юзать декомпозицию вместо ооп
- ща погуглю
- диа короче
- шо

Main message:
наследование убери и абстрактный класс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

наследование убери и абстрактный класс

--

## My telegram message #275429
**Time:** 25.12.2023 22:44:41 UTC+05:00
**Link:** https://t.me/nest_ru/275429

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- диа короче
- шо
- наследование убери и абстрактный класс
- почему

Main message:
сильная связанность

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сильная связанность

--

## My telegram message #275431
**Time:** 25.12.2023 22:45:10 UTC+05:00
**Link:** https://t.me/nest_ru/275431

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- наследование убери и абстрактный класс
- почему
- сильная связанность
- если у меня один сервис может иметь разные реализации

Main message:
ну пусть он имеет некий провайдер в конструкторе с реализацией которая может менятся

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ну пусть он имеет некий провайдер в конструкторе с реализацией которая может менятся

--

## My telegram message #275434
**Time:** 25.12.2023 22:57:19 UTC+05:00
**Link:** https://t.me/nest_ru/275434

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- сильная связанность
- если у меня один сервис может иметь разные реализации
- ну пусть он имеет некий провайдер в конструкторе с реализацией которая может менятся
- а что с эксепшенами?

Main message:
Фильтр преобразует

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фильтр преобразует

--

## My telegram message #275437
**Time:** 25.12.2023 22:57:58 UTC+05:00
**Link:** https://t.me/nest_ru/275437

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну пусть он имеет некий провайдер в конструкторе с реализацией которая может менятся
- а что с эксепшенами?
- Фильтр преобразует
- оо

Main message:
Фильтр уже конвертит под транспорт

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Фильтр уже конвертит под транспорт

--

## My telegram message #275454
**Time:** 25.12.2023 23:52:02 UTC+05:00
**Link:** https://t.me/nest_ru/275454

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
dokku

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

dokku

--

## My telegram message #275456
**Time:** 25.12.2023 23:53:08 UTC+05:00
**Link:** https://t.me/nest_ru/275456

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
dokku

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

dokku

--

## My telegram message #275729
**Time:** 27.12.2023 16:28:48 UTC+05:00
**Link:** https://t.me/nest_ru/275729

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- ну да

Main message:
https://docs.nestjs.com/techniques/validation

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://docs.nestjs.com/techniques/validation

--

## My telegram message #275731
**Time:** 27.12.2023 16:29:45 UTC+05:00
**Link:** https://t.me/nest_ru/275731

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- В конкроллерах, когда нам приходит Реквест с клиента
- ну да
- https://docs.nestjs.com/techniques/validation
- Я не понял что он хочет(

Main message:
) я долго терпел

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) я долго терпел

--

## My telegram message #276173
**Time:** 29.12.2023 23:12:33 UTC+05:00
**Link:** https://t.me/nest_ru/276173

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это просто о том что minio оптимизирован для более скорой отдачи заголовков и максимально сокращает время отдачи данных, ты и локально можешь видео сохранить и статику раздать сделав на странице <video> с файлом и все будет работать
- Ясно
- андрей, не думали совершить путешествие в бахмут?
- Ребят, подскажите пожалуйста что тут происходит, и какую логику накручиват UseGuard и AuthGuard?

Main message:
Токен шлешь потому-что

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Токен шлешь потому-что

--

## My telegram message #276357
**Time:** 31.12.2023 16:45:08 UTC+05:00
**Link:** https://t.me/nest_ru/276357

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Можно ли как-то локализовать ошибки class-validator?

Main message:
https://www.npmjs.com/package/class-validator-multi-lang

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://www.npmjs.com/package/class-validator-multi-lang

--

## My telegram message #276367
**Time:** 31.12.2023 18:19:51 UTC+05:00
**Link:** https://t.me/nest_ru/276367

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- типо добавить зависимости в конструктор?
- типа того
- Если не передаешь поле, то срабатывают все ошибки сразу
- Минус мозг

Main message:
кастомный валидатор можешь сделать

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

кастомный валидатор можешь сделать

--

## My telegram message #276370
**Time:** 31.12.2023 18:48:05 UTC+05:00
**Link:** https://t.me/nest_ru/276370

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Минус мозг
- кастомный валидатор можешь сделать
- Добавь IsOptional(),  @polioan
- Но почему? В этом ситуации не надо мне кажется

Main message:
Там валидаторы типовые всё, обычно бизнесу могут быть нужны другие

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Там валидаторы типовые всё, обычно бизнесу могут быть нужны другие

--

