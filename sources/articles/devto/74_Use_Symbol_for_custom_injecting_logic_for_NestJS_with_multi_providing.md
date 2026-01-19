Use Symbol for custom injecting logic for NestJS with multi providing

# Use Symbol for custom injecting logic for NestJS with multi providing

Published: 2022-02-24T05:10:23.794Z
Tags: nestjs, multi, providers, symbol
[Original Article](https://dev.to/endykaufman/use-symbol-for-custom-injecting-logic-for-nestjs-with-multi-providing-28bi)

**Description from API:**
Installation      npm i --save nestjs-custom-injector        Enter fullscreen mode          ...

## 

Installation

```
npm i --save nestjs-custom-injector
```

Enter fullscreen mode

Exit fullscreen mode

--

## 

Links

https://nestjs-custom-injector.site15.ru/api/#/symbol-token/SymbolTokenController_whatSaysAnimals - Demo application with nestjs-custom-injector.
https://github.com/EndyKaufman/nestjs-custom-injector/tree/develop/apps/demo/src/app/symbol-token - Example.

--

## 

Usage

Create common interface with token in animal-provider.interface.ts

```
export const ANIMAL_PROVIDER = Symbol('ANIMAL_PROVIDER');

export interface AnimalProviderInteface {
type: string;
say(): string;
}
```

Enter fullscreen mode

Exit fullscreen mode

Create first type of logic for cats in animal-cats.service.ts

```
import { Injectable } from '@nestjs/common';
import { AnimalProviderInteface } from './animal-provider.interface';

@Injectable()
export class AnimalCatsService implements AnimalProviderInteface {
type = 'cat';
say(): string {
return 'meow';
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Create second type of logic for dogs in animal-dogs.service.ts

```
import { Injectable } from '@nestjs/common';
import { AnimalProviderInteface } from './animal-provider.interface';

@Injectable()
export class AnimalDogsService implements AnimalProviderInteface {
type = 'dog';
say(): string {
return 'woof';
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Create controller animals.controller.ts

```
import { Controller, Get, Query } from '@nestjs/common';
import { CustomInject } from 'nestjs-custom-injector';
import {
AnimalProviderInteface,
ANIMAL_PROVIDER,
} from './animal-provider.interface';

@Controller('animals')
export class AnimalsController {
@CustomInject(ANIMAL_PROVIDER, { multi: true })
private animalProviders!: AnimalProviderInteface[];

@Get('animal-types')
animalTypes() {
return this.animalProviders.map((animalProvider) => animalProvider.type);
}

@Get('what-says-animals')
whatSaysAnimals() {
return this.animalProviders.map(
(animal) => `${animal.type} say ${animal.say()}`
);
}

@Get('who-say')
whoSay(@Query('voice') voice: string) {
const animal = this.animalProviders.find(
(animal) => animal.say() === voice
);
if (!animal) {
return { error: `I don't know who say ${voice}` };
}
return `${animal.type} say ${animal.say()}`;
}
}
```

Enter fullscreen mode

Exit fullscreen mode

Append all logic to main app module app.module.ts

```
import { Module } from '@nestjs/common';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import { AnimalCatsService } from './animal-cats.service';
import { AnimalDogsService } from './animal-dogs.service';
import { AnimalsController } from './animals.controller';

@Module({
...
imports: [
...
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: ANIMAL_PROVIDER, useClass: AnimalCatsService }],
}),
CustomInjectorModule.forFeature({
providers: [
{ provide: ANIMAL_PROVIDER, useValue: new AnimalDogsService() },
],
}),
...
],
controllers: [
...
AnimalsController
...
]
...
})
export class AppModule {}
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