## My telegram message #149067
**Time:** 10.03.2022 23:38:06 UTC+05:00
**Link:** https://t.me/nest_ru/149067

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Гайз, всем добрый вечвер. Может кто-то подскажет как можно в typeorm искать в массиве ? Например: У меня есть массив и я хочу в нем найти определененный элемент, если он есть, то отобразить. Может кто подсказать ?
- https://typeorm.io/#/find-options/advanced-options
- благодарю !
- Ребят, а как вы на нестах реализуете http сlients с jwt auth? На чистой ноде я использовал async-lock, чтобы не было асинхронной гонки(упало сразу несколько запросов с 401 и мы пошли все запросы обновлять). Есть какие-то более общепринятые и элегантные варианты реализации?

Main message:
запросы подвисают, потом отпускаются

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

запросы подвисают, потом отпускаются

--

## My telegram message #149070
**Time:** 10.03.2022 23:39:40 UTC+05:00
**Link:** https://t.me/nest_ru/149070

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- благодарю !
- Ребят, а как вы на нестах реализуете http сlients с jwt auth? На чистой ноде я использовал async-lock, чтобы не было асинхронной гонки(упало сразу несколько запросов с 401 и мы пошли все запросы обновлять). Есть какие-то более общепринятые и элегантные варианты реализации?
- запросы подвисают, потом отпускаются
- пока увидел либу axios/jwt, выглядит неплохо, но мб у кого-то еще варианты есть

Main message:
я дам код мой, но объяснять не буду, некогда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

я дам код мой, но объяснять не буду, некогда

--

## My telegram message #149072
**Time:** 10.03.2022 23:40:28 UTC+05:00
**Link:** https://t.me/nest_ru/149072

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- запросы подвисают, потом отпускаются
- пока увидел либу axios/jwt, выглядит неплохо, но мб у кого-то еще варианты есть
- я дам код мой, но объяснять не буду, некогда
- ок, спасибо)

Main message:
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'; import { Inject, Injectable } from '@angular/core'; import { AuthErrorsEnum } from '@app/auth/common'; import { CoreError } from '@app/core/common'; import { AuthRestService } from '@app/sdk/client'; import { BehaviorSubject, Observable, of, throwError } from 'rxjs'; import { catchError, filter, finalize, map, mergeMap, switchMap, take } from 'rxjs/operators'; import { AuthEventsService } from '../auth-services/auth-events.service'; import { AuthFingerprintService } from '../auth-services/auth-fingerprint.service'; import { AuthTokensService } from '../auth-services/auth-tokens.service'; import { AuthTokensConfig, AUTH_TOKENS_CONFIG } from './auth-tokens.config'; @Injectable() export class AuthTokensInterceptor implements HttpInterceptor { private AUTH_HEADER = 'Authorization'; private refreshTokenInProgress = false; private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); constructor( @Inject(AUTH_TOKENS_CONFIG) private readonly authTokensConfig: AuthTokensConfig, private readonly authTokensService: AuthTokensService, private readonly authFingerprintService: AuthFingerprintService, private readonly authRestClientService: AuthRestService, private readonly authEventsService: AuthEventsService ) {} intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { if (!req.headers.has('Content-Type')) { req = req.clone({ headers: req.headers.set('Content-Type', 'application/json'), }); } req = this.addAuthenticationToken(req); return next.handle(req).pipe( map((response: HttpEvent<any>) => { if (response instanceof HttpResponse && response.body?.errors?.[0]?.extensions?.code === AuthErrorsEnum.AccessTokenExpired) { throw new HttpErrorResponse({ error: new CoreError(response.body?.errors?.[0]?.extensions?.code, response.body?.errors?.[0]?.extensions?.message), }); } return response; }), catchError((err: HttpErrorResponse) => { if (err?.error?.code === AuthErrorsEnum.AccessTokenExpired) { // 401 errors are most likely going to be because we have an expired token that we need to refresh. if (this.refreshTokenInProgress) { // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value // which means the new token is ready and we can retry the request again return this.refreshTokenSubject.pipe( filter((result) => result !== null), take(1), switchMap(() => next.handle(this.addAuthenticationToken(req))) ); } else { this.refreshTokenInProgress = true; // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved this.refreshTokenSubject.next(null);

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'; import { Inject, Injectable } from '@angular/core'; import { AuthErrorsEnum } from '@app/auth/common'; import { CoreError } from '@app/core/common'; import { AuthRestService } from '@app/sdk/client'; import { BehaviorSubject, Observable, of, throwError } from 'rxjs'; import { catchError, filter, finalize, map, mergeMap, switchMap, take } from 'rxjs/operators'; import { AuthEventsService } from '../auth-services/auth-events.service'; import { AuthFingerprintService } from '../auth-services/auth-fingerprint.service'; import { AuthTokensService } from '../auth-services/auth-tokens.service'; import { AuthTokensConfig, AUTH_TOKENS_CONFIG } from './auth-tokens.config'; @Injectable() export class AuthTokensInterceptor implements HttpInterceptor { private AUTH_HEADER = 'Authorization'; private refreshTokenInProgress = false; private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); constructor( @Inject(AUTH_TOKENS_CONFIG) private readonly authTokensConfig: AuthTokensConfig, private readonly authTokensService: AuthTokensService, private readonly authFingerprintService: AuthFingerprintService, private readonly authRestClientService: AuthRestService, private readonly authEventsService: AuthEventsService ) {} intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { if (!req.headers.has('Content-Type')) { req = req.clone({ headers: req.headers.set('Content-Type', 'application/json'), }); } req = this.addAuthenticationToken(req); return next.handle(req).pipe( map((response: HttpEvent<any>) => { if (response instanceof HttpResponse && response.body?.errors?.[0]?.extensions?.code === AuthErrorsEnum.AccessTokenExpired) { throw new HttpErrorResponse({ error: new CoreError(response.body?.errors?.[0]?.extensions?.code, response.body?.errors?.[0]?.extensions?.message), }); } return response; }), catchError((err: HttpErrorResponse) => { if (err?.error?.code === AuthErrorsEnum.AccessTokenExpired) { // 401 errors are most likely going to be because we have an expired token that we need to refresh. if (this.refreshTokenInProgress) { // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value // which means the new token is ready and we can retry the request again return this.refreshTokenSubject.pipe( filter((result) => result !== null), take(1), switchMap(() => next.handle(this.addAuthenticationToken(req))) ); } else { this.refreshTokenInProgress = true; // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved this.refreshTokenSubject.next(null);

--

## My telegram message #149075
**Time:** 10.03.2022 23:43:42 UTC+05:00
**Link:** https://t.me/nest_ru/149075

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- пока увидел либу axios/jwt, выглядит неплохо, но мб у кого-то еще варианты есть
- я дам код мой, но объяснять не буду, некогда
- ок, спасибо)
- import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'; import { Inject, Injectable } from '@angular/core'; import { AuthErrorsEnum } from '@app/auth/common'; import { CoreError } from '@app/core/common'; import { AuthRestService } from '@app/sdk/client'; import { BehaviorSubject, Observable, of, throwError } from 'rxjs'; import { catchError, filter, finalize, map, mergeMap, switchMap, take } from 'rxjs/operators'; import { AuthEventsService } from '../auth-services/auth-events.service'; import { AuthFingerprintService } from '../auth-services/auth-fingerprint.service'; import { AuthTokensService } from '../auth-services/auth-tokens.service'; import { AuthTokensConfig, AUTH_TOKENS_CONFIG } from './auth-tokens.config'; @Injectable() export class AuthTokensInterceptor implements HttpInterceptor { private AUTH_HEADER = 'Authorization'; private refreshTokenInProgress = false; private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); constructor( @Inject(AUTH_TOKENS_CONFIG) private readonly authTokensConfig: AuthTokensConfig, private readonly authTokensService: AuthTokensService, private readonly authFingerprintService: AuthFingerprintService, private readonly authRestClientService: AuthRestService, private readonly authEventsService: AuthEventsService ) {} intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { if (!req.headers.has('Content-Type')) { req = req.clone({ headers: req.headers.set('Content-Type', 'application/json'), }); } req = this.addAuthenticationToken(req); return next.handle(req).pipe( map((response: HttpEvent<any>) => { if (response instanceof HttpResponse && response.body?.errors?.[0]?.extensions?.code === AuthErrorsEnum.AccessTokenExpired) { throw new HttpErrorResponse({ error: new CoreError(response.body?.errors?.[0]?.extensions?.code, response.body?.errors?.[0]?.extensions?.message), }); } return response; }), catchError((err: HttpErrorResponse) => { if (err?.error?.code === AuthErrorsEnum.AccessTokenExpired) { // 401 errors are most likely going to be because we have an expired token that we need to refresh. if (this.refreshTokenInProgress) { // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value // which means the new token is ready and we can retry the request again return this.refreshTokenSubject.pipe( filter((result) => result !== null), take(1), switchMap(() => next.handle(this.addAuthenticationToken(req))) ); } else { this.refreshTokenInProgress = true; // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved this.refreshTokenSubject.next(null);

Main message:
) блин думал это ангулар чат

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

) блин думал это ангулар чат

--

## My telegram message #149078
**Time:** 10.03.2022 23:45:45 UTC+05:00
**Link:** https://t.me/nest_ru/149078

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ок, спасибо)
- import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'; import { Inject, Injectable } from '@angular/core'; import { AuthErrorsEnum } from '@app/auth/common'; import { CoreError } from '@app/core/common'; import { AuthRestService } from '@app/sdk/client'; import { BehaviorSubject, Observable, of, throwError } from 'rxjs'; import { catchError, filter, finalize, map, mergeMap, switchMap, take } from 'rxjs/operators'; import { AuthEventsService } from '../auth-services/auth-events.service'; import { AuthFingerprintService } from '../auth-services/auth-fingerprint.service'; import { AuthTokensService } from '../auth-services/auth-tokens.service'; import { AuthTokensConfig, AUTH_TOKENS_CONFIG } from './auth-tokens.config'; @Injectable() export class AuthTokensInterceptor implements HttpInterceptor { private AUTH_HEADER = 'Authorization'; private refreshTokenInProgress = false; private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); constructor( @Inject(AUTH_TOKENS_CONFIG) private readonly authTokensConfig: AuthTokensConfig, private readonly authTokensService: AuthTokensService, private readonly authFingerprintService: AuthFingerprintService, private readonly authRestClientService: AuthRestService, private readonly authEventsService: AuthEventsService ) {} intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { if (!req.headers.has('Content-Type')) { req = req.clone({ headers: req.headers.set('Content-Type', 'application/json'), }); } req = this.addAuthenticationToken(req); return next.handle(req).pipe( map((response: HttpEvent<any>) => { if (response instanceof HttpResponse && response.body?.errors?.[0]?.extensions?.code === AuthErrorsEnum.AccessTokenExpired) { throw new HttpErrorResponse({ error: new CoreError(response.body?.errors?.[0]?.extensions?.code, response.body?.errors?.[0]?.extensions?.message), }); } return response; }), catchError((err: HttpErrorResponse) => { if (err?.error?.code === AuthErrorsEnum.AccessTokenExpired) { // 401 errors are most likely going to be because we have an expired token that we need to refresh. if (this.refreshTokenInProgress) { // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value // which means the new token is ready and we can retry the request again return this.refreshTokenSubject.pipe( filter((result) => result !== null), take(1), switchMap(() => next.handle(this.addAuthenticationToken(req))) ); } else { this.refreshTokenInProgress = true; // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved this.refreshTokenSubject.next(null);
- ) блин думал это ангулар чат
- Я после вашего кода слегка испугался и не понял что я пропустил в этой жизни) потом узнал аннуляр 😀

Main message:
)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

)

--

## My telegram message #149080
**Time:** 10.03.2022 23:48:25 UTC+05:00
**Link:** https://t.me/nest_ru/149080

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Подскажите, появилась ли какая-нибудь адекватная альтернатива lerna?

Main message:
сижу в nx ниче не нужно больше)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

сижу в nx ниче не нужно больше)

--

## My telegram message #149082
**Time:** 10.03.2022 23:49:10 UTC+05:00
**Link:** https://t.me/nest_ru/149082

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- )
- Подскажите, появилась ли какая-нибудь адекватная альтернатива lerna?
- сижу в nx ниче не нужно больше)
- Он поддерживает публикацию NPM модулей?

Main message:
да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да

--

## My telegram message #149086
**Time:** 10.03.2022 23:50:13 UTC+05:00
**Link:** https://t.me/nest_ru/149086

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Почти эт как?)

Main message:
https://github.com/EndyKaufman/nestjs-custom-injector вот проект публикуется когда я комичу новый тег

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/EndyKaufman/nestjs-custom-injector вот проект публикуется когда я комичу новый тег

--

## My telegram message #149091
**Time:** 10.03.2022 23:55:12 UTC+05:00
**Link:** https://t.me/nest_ru/149091

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Почти эт как?)
- ну насколько я понял, просто статическое поле(блокиратор) и просто ждем пока обновится, единственное нет проблем с тем, что упал запрос с аутентификацией(упал и другие не могут достучаться) и другие запросы висят, а не падают по таймауту?
- https://github.com/EndyKaufman/nestjs-custom-injector вот проект публикуется когда я комичу новый тег
- я про такой кейс: два запроса на чтение -> один идет обновлять токены ->упала аутентификация-> второй запрос, который не упал висит до тех пор, пока не произойдет любой другой запрос обновляющий токен?

Main message:
нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

нет

--

## My telegram message #149098
**Time:** 11.03.2022 00:02:34 UTC+05:00
**Link:** https://t.me/nest_ru/149098

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- я про такой кейс: два запроса на чтение -> один идет обновлять токены ->упала аутентификация-> второй запрос, который не упал висит до тех пор, пока не произойдет любой другой запрос обновляющий токен?
- нет
- все же зависнит только до следующего запроса
- упала аутентификация -> кинулась ошибка -> finalize отловил и убрал блокиратор(флаг) -> следующий запрос идет обновлять токен -> первый отлавливает и оживает.

Main message:
все может быть, писал это года 4 назад, или копипастил уже не помню)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

все может быть, писал это года 4 назад, или копипастил уже не помню)

--

## My telegram message #149104
**Time:** 11.03.2022 00:10:40 UTC+05:00
**Link:** https://t.me/nest_ru/149104

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все же зависнит только до следующего запроса
- упала аутентификация -> кинулась ошибка -> finalize отловил и убрал блокиратор(флаг) -> следующий запрос идет обновлять токен -> первый отлавливает и оживает.
- все может быть, писал это года 4 назад, или копипастил уже не помню)
- так и память может потечь?!

Main message:
логика важнее

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

логика важнее

--

## My telegram message #149108
**Time:** 11.03.2022 00:12:38 UTC+05:00
**Link:** https://t.me/nest_ru/149108

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- все может быть, писал это года 4 назад, или копипастил уже не помню)
- так и память может потечь?!
- логика важнее
- ну для этого есть логеры, elc, sentry

Main message:
ты про них говори не мне а своему работодателю когда похеришь безвозвратно 1 милон долларов)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

ты про них говори не мне а своему работодателю когда похеришь безвозвратно 1 милон долларов)

--

## My telegram message #149119
**Time:** 11.03.2022 16:56:30 UTC+05:00
**Link:** https://t.me/nest_ru/149119

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- всем привет! можно ли настроить TypeOrm так, чтобы он не добавлял название схем при генерации миграции?
- Товарищи, кто нибудь сталкивался с такой ошибкой в ответе при попытке отправить письмо при помощи модуля nestjs nodemailer  code: "ENOENT" errno: -2 path: "var/www/backend/dist/mail/avance-mail.pug" syscall: "open"
- Зайди в контейнер и проверь пути
- разобрался ) теперь вопрос. Можно ли прокинуть контекст в html шаблон письма если не пользоваться шаблонизаторами?

Main message:
просто через символ ` оберни и переменную передай в ${var} 😁

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто через символ ` оберни и переменную передай в ${var} 😁

--

## My telegram message #149195
**Time:** 12.03.2022 14:29:49 UTC+05:00
**Link:** https://t.me/nest_ru/149195

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Гайз, а у вас есть флудилка?)

Main message:
https://t.me/nest_random

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_random

--

## My telegram message #149213
**Time:** 12.03.2022 18:11:43 UTC+05:00
**Link:** https://t.me/nest_ru/149213

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Омит вырезает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Омит вырезает

--

## My telegram message #149231
**Time:** 12.03.2022 20:49:35 UTC+05:00
**Link:** https://t.me/nest_ru/149231

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Привет 👋. Подскажите как прокидывать authorization при тестах, в голову приходит только в Cache ложить. Мне не нравиться эта идея

Main message:
Посмотри тесты гардов, в оф сайт тестах

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Посмотри тесты гардов, в оф сайт тестах

--

## My telegram message #149234
**Time:** 12.03.2022 20:51:55 UTC+05:00
**Link:** https://t.me/nest_ru/149234

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Привет 👋. Подскажите как прокидывать authorization при тестах, в голову приходит только в Cache ложить. Мне не нравиться эта идея
- ты хочешь тестировать реальную бд ?
- Посмотри тесты гардов, в оф сайт тестах
- Почему нет если создать отдельного пользователя и тесты подчищают за собой. Или так не принято ?

Main message:
Юнит тесты - файлы просто и классы Интеграционные - модули неста Е2е - тесты енд пойнтов, как будто тест это фронт Смоки - тесты внешних интеграций с другими сайтами (ну я это называю смок)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Юнит тесты - файлы просто и классы Интеграционные - модули неста Е2е - тесты енд пойнтов, как будто тест это фронт Смоки - тесты внешних интеграций с другими сайтами (ну я это называю смок)

--

## My telegram message #149236
**Time:** 12.03.2022 20:52:50 UTC+05:00
**Link:** https://t.me/nest_ru/149236

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Посмотри тесты гардов, в оф сайт тестах
- Почему нет если создать отдельного пользователя и тесты подчищают за собой. Или так не принято ?
- Юнит тесты - файлы просто и классы Интеграционные - модули неста Е2е - тесты енд пойнтов, как будто тест это фронт Смоки - тесты внешних интеграций с другими сайтами (ну я это называю смок)
- Я как раз e2e тесты делаю

Main message:
Ну в них реальная БД да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Ну в них реальная БД да

--

## My telegram message #149248
**Time:** 12.03.2022 22:01:39 UTC+05:00
**Link:** https://t.me/nest_ru/149248

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
Это короче как гарант того что, то что ты написал работает, так как в начале мало логик и кажется че их тестить то, со временем их всё больше и больше становится, потом они начинают пересекатся, и нужно в голове держать весь код всегда и каждый раз при модификации чего-то ранее созданного на примере месяц назад, нужно тестить через постман всё, и так всегда, и в один из дней ты не ппотестишь один из 500 логик, так как нужно релизить, в итоге логика сработает не так и похеришь лям долларов например, или лекарства в больничке не так распределишь, и кто то пострадает

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это короче как гарант того что, то что ты написал работает, так как в начале мало логик и кажется че их тестить то, со временем их всё больше и больше становится, потом они начинают пересекатся, и нужно в голове держать весь код всегда и каждый раз при модификации чего-то ранее созданного на примере месяц назад, нужно тестить через постман всё, и так всегда, и в один из дней ты не ппотестишь один из 500 логик, так как нужно релизить, в итоге логика сработает не так и похеришь лям долларов например, или лекарства в больничке не так распределишь, и кто то пострадает

--

## My telegram message #149264
**Time:** 12.03.2022 22:39:20 UTC+05:00
**Link:** https://t.me/nest_ru/149264

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Можно написать в сервисе если node_env === testing, то тогда возвращать токен? Или это плохая практика?
- Нет, если есть сложность в тестировании, то это же явный признак что нужно разделить код
- Тогда я вас не понимаю. Код генерируется разный каждый раз Когда дергается эндпоинт регистрации - создается юзер и ему дается код и кладется в базу, а в ответ возвращается сообщение проверить почту Как этот код вытянуть чтоб юзера подтвердить то?
- Сделать 2 тест кейса. Первый который проверит что код сгенерирован, сохранен в базу, отправлен в письме. Второй что код позволяет подтвердить регистрацию

Main message:
Из е2е можно дёргать базу и емайл

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Из е2е можно дёргать базу и емайл

--

## My telegram message #149266
**Time:** 12.03.2022 22:47:54 UTC+05:00
**Link:** https://t.me/nest_ru/149266

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Тогда я вас не понимаю. Код генерируется разный каждый раз Когда дергается эндпоинт регистрации - создается юзер и ему дается код и кладется в базу, а в ответ возвращается сообщение проверить почту Как этот код вытянуть чтоб юзера подтвердить то?
- Сделать 2 тест кейса. Первый который проверит что код сгенерирован, сохранен в базу, отправлен в письме. Второй что код позволяет подтвердить регистрацию
- Из е2е можно дёргать базу и емайл
- А ну то есть норм если вытяну код из базы

Main message:
А чего нет то

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

А чего нет то

--

## My telegram message #149270
**Time:** 12.03.2022 23:03:19 UTC+05:00
**Link:** https://t.me/nest_ru/149270

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Из е2е можно дёргать базу и емайл
- А ну то есть норм если вытяну код из базы
- А чего нет то
- Можешь помочь. Проблема в том что бек не видит куки если запрос отправлен не с https хоста, при прогоне тестов и попытке дернуть в postmat падают ошибки

Main message:
Хттпс это про нгинкс

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Хттпс это про нгинкс

--

## My telegram message #149278
**Time:** 12.03.2022 23:55:18 UTC+05:00
**Link:** https://t.me/nest_ru/149278

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А чего нет то
- Можешь помочь. Проблема в том что бек не видит куки если запрос отправлен не с https хоста, при прогоне тестов и попытке дернуть в postmat падают ошибки
- Хттпс это про нгинкс
- Не понимаю почему в контроллер не долетают куки с обеда бьюсь с ним

Main message:
У меня долетают

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня долетают

--

## My telegram message #149280
**Time:** 12.03.2022 23:55:41 UTC+05:00
**Link:** https://t.me/nest_ru/149280

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Хттпс это про нгинкс
- Не понимаю почему в контроллер не долетают куки с обеда бьюсь с ним
- У меня долетают
- Что я мог сделать не так ?

Main message:
У меня всё хттп онли

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

У меня всё хттп онли

--

## My telegram message #149287
**Time:** 12.03.2022 23:58:09 UTC+05:00
**Link:** https://t.me/nest_ru/149287

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- У меня долетают
- Что я мог сделать не так ?
- У меня всё хттп онли
- Интерестно

Main message:
Для фронта тоже генератор юзаю но для ангулар

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Для фронта тоже генератор юзаю но для ангулар

--

## My telegram message #149292
**Time:** 13.03.2022 00:01:02 UTC+05:00
**Link:** https://t.me/nest_ru/149292

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Интерестно
- Для фронта тоже генератор юзаю но для ангулар
- Это круто 👍👍. Я помоему начал понимать в чем причина
- Может криво обьясню. Тут я поднимаю проект для теста

Main message:
Это интеграционный тест

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Это интеграционный тест

--

## My telegram message #149294
**Time:** 13.03.2022 00:01:27 UTC+05:00
**Link:** https://t.me/nest_ru/149294

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это круто 👍👍. Я помоему начал понимать в чем причина
- Может криво обьясню. Тут я поднимаю проект для теста
- Это интеграционный тест
- Но если я посмотрю main файл там используется cookieParser

Main message:
Гардов там нет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Гардов там нет

--

## My telegram message #149296
**Time:** 13.03.2022 00:01:50 UTC+05:00
**Link:** https://t.me/nest_ru/149296

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Это интеграционный тест
- Но если я посмотрю main файл там используется cookieParser
- Гардов там нет
- Может быть в этом причина ?

Main message:
Куки тестируют в е2е

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Куки тестируют в е2е

--

## My telegram message #149300
**Time:** 13.03.2022 00:03:53 UTC+05:00
**Link:** https://t.me/nest_ru/149300

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Гардов там нет
- Может быть в этом причина ?
- Куки тестируют в е2е
- Что означает гард ?

Main message:
https://t.me/nest_ru/149231

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://t.me/nest_ru/149231

--

## My telegram message #149304
**Time:** 13.03.2022 00:07:21 UTC+05:00
**Link:** https://t.me/nest_ru/149304

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Куки тестируют в е2е
- Что означает гард ?
- https://t.me/nest_ru/149231
- 😂😂😂

Main message:
Не переопределять

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Не переопределять

--

## My telegram message #149314
**Time:** 13.03.2022 00:11:45 UTC+05:00
**Link:** https://t.me/nest_ru/149314

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://t.me/nest_ru/149231
- 😂😂😂
- Не переопределять
- ААААААА но в моем случае на этой ручке нет Guard это refresh

Main message:
Раньше там гарды не работали, может ща уже пашут

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Раньше там гарды не работали, может ща уже пашут

--

## My telegram message #149319
**Time:** 13.03.2022 00:13:49 UTC+05:00
**Link:** https://t.me/nest_ru/149319

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Не переопределять
- ААААААА но в моем случае на этой ручке нет Guard это refresh
- Раньше там гарды не работали, может ща уже пашут
- Только хотел это спросить, спасибо 👍👍👍

Main message:
Пиши е2е всегда

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Пиши е2е всегда

--

## My telegram message #149325
**Time:** 13.03.2022 00:19:16 UTC+05:00
**Link:** https://t.me/nest_ru/149325

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Раньше там гарды не работали, может ща уже пашут
- Только хотел это спросить, спасибо 👍👍👍
- Пиши е2е всегда
- По книжке наоборот вроде

Main message:
по книжке да

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

по книжке да

--

## My telegram message #149462
**Time:** 14.03.2022 13:15:57 UTC+05:00
**Link:** https://t.me/nest_ru/149462

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Через переменные окружения указывать путь к папке миграций и название схемы
- а дальше? мне надо запустить миграцию программно, т.е не получится вызвать npm run typeorm:migration:run
- Можно просто cli вызывать через exec передавая переменные окружения. Или делать подключения к определенной схеме и на этом подключении вызывать запуск миграций
- Начинаю изучать микросервисы, может мне кто сказать чем отличается TCP от Kafra, RabbitMQ, gRPC и т.д. ? Какой когда лучше использовать?

Main message:
мое личное мнение TCP - напрямую мс соединяются, как будто разносишь код по разным бэкам Kafka - продюсеры шлют сообщения в очередь и консьюмеры получают, есть возможность чтобы события последовательно обрабатывались, всякие штуки с деньгами тут удобно, так как один мс пополняет баланс другой спмисывает, это все последовательно будет RabbitMQ - продюсеры шлют сообщения в очередь и консьюмеры получают, если много событий летит то много консьюмеров могут обрабатывать параллельно их, тут не важна последовательность gRPC - как тсп только формат обмена протобаф, удобен когда у тебя часть микросервисов на го или других языках почитай в инете)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

мое личное мнение TCP - напрямую мс соединяются, как будто разносишь код по разным бэкам Kafka - продюсеры шлют сообщения в очередь и консьюмеры получают, есть возможность чтобы события последовательно обрабатывались, всякие штуки с деньгами тут удобно, так как один мс пополняет баланс другой спмисывает, это все последовательно будет RabbitMQ - продюсеры шлют сообщения в очередь и консьюмеры получают, если много событий летит то много консьюмеров могут обрабатывать параллельно их, тут не важна последовательность gRPC - как тсп только формат обмена протобаф, удобен когда у тебя часть микросервисов на го или других языках почитай в инете)

--

## My telegram message #149536
**Time:** 15.03.2022 12:00:48 UTC+05:00
**Link:** https://t.me/nest_ru/149536

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- ну я в целом говорю тем бэкендерам, кто думает, что фронт - это изи
- ну вообще да) Таже кроссбраузерность уже взрывает мозг у тех кто не был к этому готов)
- 99% бекендеров, которые кроме как html/css не трогали, удивляя своей однобокостью, именно так и думают)
- Как бэкендер говорю - тот факт что твой язык может работать не полностью и ты на это никак не повлияешь Это говно ломает больше

Main message:
фронт сложнее, я там кода пишу раза в три больше, верстка вообще сжирает время

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

фронт сложнее, я там кода пишу раза в три больше, верстка вообще сжирает время

--

## My telegram message #149613
**Time:** 15.03.2022 22:22:37 UTC+05:00
**Link:** https://t.me/nest_ru/149613

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Vs code ругается, подскажите пожалуйста, я новичок не особо шарю

Main message:
/trust

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

/trust

--

## My telegram message #149626
**Time:** 15.03.2022 23:10:27 UTC+05:00
**Link:** https://t.me/nest_ru/149626

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- /trust
- Я не бот и не мусор, я учусь разработке изучаю БД
- Запусти PowerShell от имени администратора и пропиши "Set-ExecutionPolicy RemoteSigned"
- Пробовал и вставлял там(A), всё равно не получается

Main message:
wsl попробуй поставить, или как я виртуальную убунту и к ней конектится из вс код ремут плагина (у меня тоже винда)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

wsl попробуй поставить, или как я виртуальную убунту и к ней конектится из вс код ремут плагина (у меня тоже винда)

--

## My telegram message #149643
**Time:** 16.03.2022 01:29:06 UTC+05:00
**Link:** https://t.me/nest_ru/149643

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Парни вопрос у меня есть 2 запроса  @Controller('addresses') { @Put('/:id') @Put('label') }  и при запросе PUT addresses/label я попадаю в @Put('/:id')

Main message:
порядок смени

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

порядок смени

--

## My telegram message #149645
**Time:** 16.03.2022 01:29:38 UTC+05:00
**Link:** https://t.me/nest_ru/149645

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо
- Парни вопрос у меня есть 2 запроса  @Controller('addresses') { @Put('/:id') @Put('label') }  и при запросе PUT addresses/label я попадаю в @Put('/:id')
- порядок смени
- то есть @Put('label') на верх поднять ?

Main message:
да пробни

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да пробни

--

## My telegram message #150043
**Time:** 19.03.2022 18:44:05 UTC+05:00
**Link:** https://t.me/nest_ru/150043

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо!
- Добрый день всем Подскажите пожалуйста Стучусь на эндпоинт с фронтового приложения на реакте он отправляет обыкновенный эксепшен По непонятным мне причинам аксиос его отлавливает в then Это так и должно быть или я что то делаю не так?
- здравствуйте
- народ, а что конкретно делает  tty: true в docker-compose.yml? Типо пишут что-то про терминал, типо позволяет коннектить тот же баш к контейнеру, но можно же итак к запущеному контейнеру подключится через  docker exec -it ... Или эта опция как-то упрощает подключение терминала к контейнеру, я не понял.  @KaufmanEndy я так понимаю это ж ваш топик?  https://dev.to/endykaufman/add-dev-and-prod-infrastructure-on-docker-compose-for-nestjs-application-p6p тут увидел и задася вопросом

Main message:
давно какие то траблы были с подключением к контейнеру с тех пор и юзаю)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

давно какие то траблы были с подключением к контейнеру с тех пор и юзаю)

--

## My telegram message #150055
**Time:** 19.03.2022 23:03:22 UTC+05:00
**Link:** https://t.me/nest_ru/150055

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- Всем привет! Кто в курсе, какие есть хорошие клауды для деплоя nestjs приложений?

Main message:
Я тут сижу, пока тока ВПС, но у них есть и вдс, если не зайдёт перееду  https://dev.to/endykaufman/deploy-nestjs-project-to-vps-with-dokku-31c5

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Я тут сижу, пока тока ВПС, но у них есть и вдс, если не зайдёт перееду  https://dev.to/endykaufman/deploy-nestjs-project-to-vps-with-dokku-31c5

--

## My telegram message #150119
**Time:** 20.03.2022 20:10:26 UTC+05:00
**Link:** https://t.me/nest_ru/150119

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- А разве статика не должна быть в корне проекта? Ну типо и не в срц и не в дист
- у меня есть сущность которая используется relation. например this.EntityRepo.find({ where: { relationArray: <— релейшен ввиде массива в котором лежит объект и я хочу у этого объекта взять ключ } })
- Если честно яснее не стало)
- поправил )

Main message:
хочешь у результата выборки взять или хочешь до запуска запроса, или хочешь передать ид

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

хочешь у результата выборки взять или хочешь до запуска запроса, или хочешь передать ид

--

## My telegram message #150123
**Time:** 20.03.2022 20:13:44 UTC+05:00
**Link:** https://t.me/nest_ru/150123

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- хочешь у результата выборки взять или хочешь до запуска запроса, или хочешь передать ид
- То есть у тебя есть связь одной таблицы(пусть А) с другой(пусть В). Тебе нужно сделать выборку из таблицы А но условие по таблице В. Правильно понял?
- Да, но таблица B ввиде массива объекта
- Таблица это таблица. Я не совсем понимаю как она может быть массивом объектов. Может одна из колонок таблицы В это массив объектов?

Main message:
items.map (subItems=> subItems.map ( subItem.id )).flat() может так)

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

items.map (subItems=> subItems.map ( subItem.id )).flat() может так)

--

