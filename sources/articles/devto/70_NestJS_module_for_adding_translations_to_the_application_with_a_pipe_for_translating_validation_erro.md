NestJS module for adding translations to the application, with a pipe for translating validation errors

# NestJS module for adding translations to the application, with a pipe for translating validation errors

Published: 2022-03-01T18:40:34.690Z
Tags: nestjs, translate, i18n, validation
[Original Article](https://dev.to/endykaufman/nestjs-module-for-adding-translations-to-the-application-with-a-pipe-for-translating-validation-errors-2mf3)

**Description from API:**
Installation      npm i --save nestjs-translates class-validator-multi-lang...

# 

Installation

```
npm i --save nestjs-translates class-validator-multi-lang class-transformer
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Links

https://github.com/EndyKaufman/nestjs-translates - Source code

https://nestjs-translates.site15.ru/api - Demo application with nestjs-translates.

https://github.com/EndyKaufman/nestjs-translates-example - Example generated with nest cli

https://dev.to/endykaufman/nestjs-module-for-adding-translations-to-the-application-with-a-pipe-for-translating-validation-errors-2mf3 - Post in dev.to

https://twitter.com/KaufmanEndy/status/1498730314339954695?s=20&amp;t=FwCcltTG-Vxut6M3JVPsCA - Twitter post

--

## 

Usage

Update file in app.module.ts

```
import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { ValidationError } from 'class-validator-multi-lang';
import {
getDefaultTranslatesModuleOptions,
TranslatesModule,
} from 'nestjs-translates';
import { join } from 'path';
import { AppController } from './app.controller';

@Module({
imports: [
TranslatesModule.forRoot(
getDefaultTranslatesModuleOptions({
localePaths: [
join(__dirname, 'assets', 'i18n'),
join(__dirname, 'assets', 'i18n', 'class-validator-messages'),
],
locales: ['en', 'ru'],
validationPipeOptions: {
transform: true,
validationError: {
target: false,
value: false,
},
transformOptions: {
strategy: 'excludeAll',
},
exceptionFactory: (errors: ValidationError[]) =>
new HttpException(errors, HttpStatus.BAD_REQUEST),
},
})
),
],
controllers: [AppController],
})
export class AppModule {}
```

Enter fullscreen mode

Exit fullscreen mode

Create dictionaries ../assets/i18n/ru.json

```
{
"word": "слово"
}
```

Enter fullscreen mode

Exit fullscreen mode

![pic](https://media2.dev.to/dynamic/image/width=256,height=,fit=scale-down,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8j7kvp660rqzt99zui8e.png)

[
Create template
](/settings/response-templates)
Templates let you quickly answer FAQs or store snippets for re-use.

Submit
Preview
[Dismiss](/404.html)

Are you sure you want to hide this comment? It will become hidden in your post, but will still be visible via the comment's permalink.

Hide child comments as well

Confirm

For further actions, you may consider blocking this person and/or reporting abuse