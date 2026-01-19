Major version of nestjs-custom-injector: Exception if the provider is not set, use a promise in the default value and etc...

# Major version of nestjs-custom-injector: Exception if the provider is not set, use a promise in the default value and etc...

Published: 2022-07-15T13:37:37.563Z
Tags: nestjs, inject, provider, typescript
[Original Article](https://dev.to/endykaufman/major-version-of-nestjs-custom-injector-exception-if-the-provider-is-not-set-use-a-promise-in-the-default-value-and-etc-2jo5)

**Description from API:**
Installation      npm i --save nestjs-custom-injector        Enter fullscreen mode          ...

## 

Installation

```
npm i --save nestjs-custom-injector
```

Enter fullscreen mode

Exit fullscreen mode

## 

Links

https://github.com/EndyKaufman/nestjs-custom-injector - Source code of library
https://nestjs-custom-injector.site15.ru/api - Demo application with nestjs-custom-injector.
https://github.com/EndyKaufman/nestjs-custom-injector-example - Example generated with nest cli.

## 

BREAKING CHANGES

- Change getLastComponentByName and getLastComponentByClass to
getProvider

- Change getComponentsByName and getComponentsByClass to
getProviders

- Remove static options from CustomInject decorator

- Rename defaultPropertyValue to defaultProviderValue

- Because now after start application library search all need providers tokens, you must always import CustomInjectorModule.forRoot() in your root application module, if you want exclude provider from checking, please add options `@CustomInject(PROVIDER_TOKEN,{ lazy:true })`

## 

Tests all features with multi providers

--

### 

Work with multi providers

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, { multi: true })
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();

const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers.map((o) => o.type)).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Work with multi regular and async providers

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, { multi: true })
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [
{
provide: C_PROVIDER,
useFactory: () =>
new Promise((resolve) => setTimeout(() => resolve(new C2()), 1000)),
},
],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers.map((o) => o.type)).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Error if array of providers not set

```
interface CProvider {
type: string;
}
const C_PROVIDER1 = 'C_PROVIDER1';
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER1, { multi: true })
providers!: CProvider;
}
const module = await Test.createTestingModule({
imports: [CustomInjectorModule.forRoot()],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
try {
await app.init();
expect(true).toEqual(false);
} catch (err) {
expect(err instanceof CustomInjectorError && err.message).toEqual(
`Providers "C_PROVIDER1" not found!`
);
expect(
err instanceof CustomInjectorError &&
err.injectedProvidersStorageItem?.token
).toEqual(C_PROVIDER1);
}
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Custom error if array of providers not set

```
interface CProvider {
type: string;
}
class CustomError extends CustomInjectorError<CProvider> {
constructor(public override message: string) {
super(message);
}
}
const C_PROVIDER1 = 'C_PROVIDER1';
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER1, {
multi: true,
errorFactory: (message: string) => new CustomError(message),
})
providers!: CProvider;
}
const module = await Test.createTestingModule({
imports: [CustomInjectorModule.forRoot()],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
try {
await app.init();
expect(true).toEqual(false);
} catch (err) {
expect(err instanceof CustomError && err.message).toEqual(
`Providers "C_PROVIDER1" not found!`
);
expect(
err instanceof CustomError && err.injectedProvidersStorageItem?.token
).toEqual(undefined);
}
await app.close();
});
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create multi providers with factory

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 {
name = 'c1';
}
@Injectable()
class C2 {
name = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
providerFactory: (data) => ({ type: data.name }),
})
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers.map((o) => o.type)).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create multi providers with async factory

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 {
name = 'c1';
}
@Injectable()
class C2 {
name = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
providerFactory: (data) =>
new Promise((resolve) =>
setTimeout(() => resolve({ type: data.name }), 1000)
),
})
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers.map((o) => o.type)).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Load multi providers with lazy option on getting data, without set them from application bootstrap

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, { multi: true, lazy: true })
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
// we don't need start application, because providers marked with lazy options will be ignored when the application bootstrap
// await app.init();
const p = app.get<P>(P);
expect(p.providers.map((o) => o.type)).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update multi providers on runtime

```
interface CProvider {
type: string;
}
const C_PROVIDER_NEW = Symbol('C_PROVIDER_NEW');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER_NEW, { multi: true })
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER_NEW, useValue: new C1() }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER_NEW, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers.map((o) => o.type)).toEqual(['c1', 'c2']);
p.providers.forEach((o) => {
o.type = `updated ${o.type}`;
});
const p2 = app.get<P>(P);
expect(p2.providers.map((o) => o.type)).toEqual([
'updated c1',
'updated c2',
]);
await app.close();
});
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Update multi providers created with factory on runtime

```
interface CProvider {
type: string;
}
const C_PROVIDER_NEW = Symbol('C_PROVIDER_NEW');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER_NEW, {
multi: true,
providerFactory: (data) => ({ ...data, type: `factory ${data.type}` }),
})
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER_NEW, useValue: new C1() }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER_NEW, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const providers = app.get<P>(P).providers;
expect(providers.map((o) => o.type)).toEqual(['factory c1', 'factory c2']);
providers.forEach((o) => {
o.type = `updated ${o.type}`;
});
const currentProviders = [...app.get<P>(P).providers];
expect(currentProviders.map((o) => o.type)).toEqual([
'updated factory c1',
'updated factory c2',
]);
await app.close();
});
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Use default providers if providers for token not found

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
defaultProvidersValue: [],
})
providers!: CProvider[];
}
const module = await Test.createTestingModule({
imports: [CustomInjectorModule.forRoot()],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const providers = app.get<P>(P).providers;
expect(providers).toEqual([]);
await app.close();
});
```

Enter fullscreen mode

Exit fullscreen mode

## 

Tests all features with multi providers and sub property

--

### 

Work with multi providers

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
propertyName: 'type',
})
providers!: CProvider['type'][];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers).toEqual(['c1', 'c2']);
await app.close();
});
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Work with multi regular and async providers

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
propertyName: 'type',
})
providers!: CProvider['type'][];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [
{
provide: C_PROVIDER,
useFactory: () =>
new Promise((resolve) => setTimeout(() => resolve(new C2()), 1000)),
},
],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Error if array of providers not set

```
interface CProvider {
type: string;
}
const C_PROVIDER1 = 'C_PROVIDER1';
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER1, {
multi: true,
propertyName: 'type',
})
providers!: CProvider['type'];
}
const module = await Test.createTestingModule({
imports: [CustomInjectorModule.forRoot()],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
try {
await app.init();
expect(true).toEqual(false);
} catch (err) {
expect(err instanceof CustomInjectorError && err.message).toEqual(
`Providers "C_PROVIDER1" not found!`
);
expect(
err instanceof CustomInjectorError &&
err.injectedProvidersStorageItem?.token
).toEqual(C_PROVIDER1);
}
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Custom error if array of providers not set

```
interface CProvider {
type: string;
}
class CustomError extends CustomInjectorError<CProvider> {
constructor(public override message: string) {
super(message);
}
}
const C_PROVIDER1 = 'C_PROVIDER1';
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER1, {
multi: true,
propertyName: 'type',
errorFactory: (message: string) => new CustomError(message),
})
providers!: CProvider['type'];
}
const module = await Test.createTestingModule({
imports: [CustomInjectorModule.forRoot()],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
try {
await app.init();
expect(true).toEqual(false);
} catch (err) {
expect(err instanceof CustomError && err.message).toEqual(
`Providers "C_PROVIDER1" not found!`
);
expect(
err instanceof CustomError && err.injectedProvidersStorageItem?.token
).toEqual(undefined);
}
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create multi providers with factory

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 {
name = 'c1';
}
@Injectable()
class C2 {
name = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
propertyName: 'type',
providerFactory: (data) => ({ type: data.name }),
})
providers!: CProvider['type'][];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Create multi providers with async factory

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 {
name = 'c1';
}
@Injectable()
class C2 {
name = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
propertyName: 'type',
providerFactory: (data) =>
new Promise((resolve) =>
setTimeout(() => resolve({ type: data.name }), 1000)
),
})
providers!: CProvider['type'][];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const p = app.get<P>(P);
expect(p.providers).toEqual(['c1', 'c2']);
await app.close();
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Load multi providers with lazy option on getting data, without set them from application bootstrap

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class C1 implements CProvider {
type = 'c1';
}
@Injectable()
class C2 implements CProvider {
type = 'c2';
}
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
propertyName: 'type',
lazy: true,
})
providers!: CProvider['type'][];
}
const module = await Test.createTestingModule({
imports: [
CustomInjectorModule.forRoot(),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C1 }],
}),
CustomInjectorModule.forFeature({
providers: [{ provide: C_PROVIDER, useClass: C2 }],
}),
],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
// we don't need start application, because providers marked with lazy options will be ignored when the application bootstrap
// await app.init();
const p = app.get<P>(P);
expect(p.providers).toEqual(['c1', 'c2']);
await app.close();
});
```

Enter fullscreen mode

Exit fullscreen mode

--

### 

Use default providers if providers for token not found

```
interface CProvider {
type: string;
}
const C_PROVIDER = Symbol('C_PROVIDER');
@Injectable()
class P {
@CustomInject<CProvider>(C_PROVIDER, {
multi: true,
propertyName: 'type',
defaultProvidersValue: [],
})
providers!: CProvider['type'][];
}
const module = await Test.createTestingModule({
imports: [CustomInjectorModule.forRoot()],
providers: [P],
exports: [P],
}).compile();
const app = module.createNestApplication();
await app.init();
const providers = app.get<P>(P).providers;
expect(providers).toEqual([]);
await app.close();
});
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