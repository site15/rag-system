## My telegram message #215264
**Time:** 03.02.2023 22:08:28 UTC+05:00
**Link:** https://t.me/nest_ru/215264

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Всем привет. Вопрос к знатокам. Подскажите, middleware в nest не работает при использовании grpc? На оф сайте ничего про это не нашёл, а на просторах интернета есть утверждение, что не работает.  https://stackoverflow.com/questions/67595929/nestjs-grpc-middlware
- https://playground.prisma.io/examples/advanced/transactions/batch
- Что мешает сказать докеру, притормозить пока база не подымется?
- как?

Main message:
https://github.com/site15/site15.ru/blob/develop/devops/docker/prod/docker-compose.yml

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/site15/site15.ru/blob/develop/devops/docker/prod/docker-compose.yml

--

## My telegram message #215267
**Time:** 03.02.2023 22:10:44 UTC+05:00
**Link:** https://t.me/nest_ru/215267

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Replied message context:
- оу, круто. Сейчас попробую. У меня стоит так, но он видимо плевать хотел на эту строчку

Main message:
эта строчка говорит что запустить и погнал следующий запускать, а при моей оно не просто запускает а еще ждет

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

эта строчка говорит что запустить и погнал следующий запускать, а при моей оно не просто запускает а еще ждет

--

## My telegram message #215278
**Time:** 03.02.2023 22:26:15 UTC+05:00
**Link:** https://t.me/nest_ru/215278

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Main message:
https://github.com/site15/site15.ru/blob/develop/devops/docker/prod/docker-compose-up.sh

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

https://github.com/site15/site15.ru/blob/develop/devops/docker/prod/docker-compose-up.sh

--

## My telegram message #215281
**Time:** 03.02.2023 22:35:30 UTC+05:00
**Link:** https://t.me/nest_ru/215281

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Да
- звучит логично, но по другому не знаю как ))
- https://github.com/site15/site15.ru/blob/develop/devops/docker/prod/docker-compose-up.sh
- а через docker exec если прописать npx prisma migrate? Чтобы так сильно не запариваться. Или не прокатит?

Main message:
да хоть как можно, я себе такую штуку замутил и везде юзаю, на докер перевести миграции и тесты все руки не доходят

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

да хоть как можно, я себе такую штуку замутил и везде юзаю, на докер перевести миграции и тесты все руки не доходят

--

## My telegram message #215283
**Time:** 03.02.2023 22:37:04 UTC+05:00
**Link:** https://t.me/nest_ru/215283

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- https://github.com/site15/site15.ru/blob/develop/devops/docker/prod/docker-compose-up.sh
- а через docker exec если прописать npx prisma migrate? Чтобы так сильно не запариваться. Или не прокатит?
- да хоть как можно, я себе такую штуку замутил и везде юзаю, на докер перевести миграции и тесты все руки не доходят
- спасибо большое. Буду пробовать

Main message:
просто образ собранный отличается и там нет дев тулзов типа мигратора

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

просто образ собранный отличается и там нет дев тулзов типа мигратора

--

## My telegram message #215387
**Time:** 04.02.2023 19:59:57 UTC+05:00
**Link:** https://t.me/nest_ru/215387

### Semantic Search Content
This section is used ONLY for semantic search and understanding.

Conversation context:
- Спасибо огромное  🤝
- new UserEntity({ name: 'John', age: 20, email: '', password: '123', }).getPublicUser(); как-то так будет, но можно сделать entity используя паттерн билдер, тогда уже придется проводить манипуляцию с самим классом, убирая из него пароль я пока не могу додумать как с class-transformer это совместить
- вот и я о том) Спасибо
- Так и призма тоже)

Main message:
Внезапно смог победить проблему при сериализации выходных данных, тип беру из декоратора сваггера 😎 Короче кому надо тот поймет, давно просто парился и по разному решал и наконец-то небольшим кодом вышло (первая реализация, возможны проблемы, ну проект перевел, все тесты прошли успешно, все что лишнее норм режется)  import { ClassSerializerInterceptor, ClassSerializerInterceptorOptions, Injectable, PlainLiteralObject, } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; @Injectable() export class AppClassSerializerInterceptor extends ClassSerializerInterceptor { constructor( protected override readonly reflector: Reflector, defaultOptions?: ClassSerializerInterceptorOptions ) { super(reflector, defaultOptions); } protected override getContextOptions(context) { const responses = Reflect.getMetadata('swagger/apiResponse', context.getHandler()) || {}; const firstCode = Object.keys(responses).filter((key) => +key >= 200)[0]; if (firstCode && responses[firstCode.toString()]?.type) { return { ...this.defaultOptions, type: responses[firstCode.toString()].type, }; } return { ...this.defaultOptions }; } override transformToPlain(plainOrClass, options): PlainLiteralObject { if (options.type && !(plainOrClass instanceof options.type)) { return super.transformToPlain( Object.assign(new options.type(), plainOrClass), options ); } return super.transformToPlain(plainOrClass, options); } }

---

### Author Message (Answer Source)
This section MUST be used to generate the final answer.

Внезапно смог победить проблему при сериализации выходных данных, тип беру из декоратора сваггера 😎 Короче кому надо тот поймет, давно просто парился и по разному решал и наконец-то небольшим кодом вышло (первая реализация, возможны проблемы, ну проект перевел, все тесты прошли успешно, все что лишнее норм режется)  import { ClassSerializerInterceptor, ClassSerializerInterceptorOptions, Injectable, PlainLiteralObject, } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; @Injectable() export class AppClassSerializerInterceptor extends ClassSerializerInterceptor { constructor( protected override readonly reflector: Reflector, defaultOptions?: ClassSerializerInterceptorOptions ) { super(reflector, defaultOptions); } protected override getContextOptions(context) { const responses = Reflect.getMetadata('swagger/apiResponse', context.getHandler()) || {}; const firstCode = Object.keys(responses).filter((key) => +key >= 200)[0]; if (firstCode && responses[firstCode.toString()]?.type) { return { ...this.defaultOptions, type: responses[firstCode.toString()].type, }; } return { ...this.defaultOptions }; } override transformToPlain(plainOrClass, options): PlainLiteralObject { if (options.type && !(plainOrClass instanceof options.type)) { return super.transformToPlain( Object.assign(new options.type(), plainOrClass), options ); } return super.transformToPlain(plainOrClass, options); } }

--

