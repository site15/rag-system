Use abstract-class for custom injecting logic for NestJS with multi providing

# Use abstract-class for custom injecting logic for NestJS with multi providing

Published: 2022-02-24T04:39:15.534Z
Tags: nestjs, multi, providers, abstract
[Original Article](https://dev.to/endykaufman/use-abstract-class-for-custom-injecting-logic-for-nestjs-with-multi-providing-3n1e)

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

https://nestjs-custom-injector.site15.ru/api/#/abstract-class - Demo application with nestjs-custom-injector.
https://github.com/EndyKaufman/nestjs-custom-injector/tree/develop/apps/demo/src/app/abstract-class - Example.

--

## 

Usage

Create abstract class in animal.provider.ts

```
export abstract class AbstractAnimalProvider {
abstract type: string;
abstract say(): string;
}

```

Enter fullscreen mode

Exit fullscreen mode

Create first type of logic for cats in animal-cats.service.ts

```
import { Injectable } from '@nestjs/common';
import { AbstractAnimalProvider } from './animal.provider';

@Injectable()
export class AnimalCatsService extends AbstractAnimalProvider {
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
import { AbstractAnimalProvider } from './animal.provider';

@Injectable()
export class AnimalDogsService extends AbstractAnimalProvider {
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
import { AbstractAnimalProvider } from './animal.provider';

@Controller('animals')
export class AnimalsController {
@CustomInject(AbstractAnimalProvider, { multi: true })
private animalProviders!: AbstractAnimalProvider[];

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
import { AbstractAnimalProvider } from './animal.provider';

@Module({
...
imports: [
...
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: AbstractAnimalProvider, useClass: AnimalCatsService }],
}),
CustomInjectorModule.forFeature({
providers: [
{ provide: AbstractAnimalProvider, useValue: new AnimalDogsService() },
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