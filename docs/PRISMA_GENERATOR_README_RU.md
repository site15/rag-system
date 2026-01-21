# Prisma Generator NestJS DTO документация

## Общее описание

Пользовательский генератор Prisma для автоматического создания Data Transfer Objects (DTO) и других артефактов для NestJS приложений. Этот инструмент значительно упрощает разработку, автоматически генерируя типобезопасный код на основе схемы Prisma.

## Основные возможности

### Автоматическая генерация
- **DTO классы** для всех моделей Prisma
- **Validation decorators** из `class-validator`
- **Serialization decorators** из `class-transformer`
- **Swagger/OpenAPI документация**
- **CRUD контроллеры** и сервисы
- **Полные REST API эндпоинты** с правильной маршрутизацией
- **Генерация кода для фронтенда**
- **TypeScript интерфейсы** и типы
- **Миграции** и схемы базы данных

## Генерируемые артефакты

Генератор создает полный набор артефактов для каждой модели Prisma, обеспечивая быструю разработку полнофункциональных приложений:

### 1. DTO классы
- `Create<ModelName>Dto` - для POST запросов с обязательными полями
- `Update<ModelName>Dto` - для PATCH/PUT запросов с опциональными полями
- `<ModelName>Dto` - для сериализации ответов со всеми полями

### 2. Entity классы
- `<ModelName>Entity` - типизированные представления сущностей, соответствующие схеме Prisma
- Правильно сопоставленные скалярные и связанные поля
- Определения свойств с полной типобезопасностью

### 3. Контроллеры
- Полные CRUD REST контроллеры с правильной маршрутизацией
- Аннотации Swagger документации (`@ApiTags`, `@ApiOkResponse`, и т.д.)
- Интеграция с валидационным пайплайном через `class-validator`
- Поддержка мягкого удаления для моделей с полем `deletedAt`
- Интеграция контекста пользователя для моделей с полем `userId`
- Автоматическая поддержка пагинации и сортировки
- Валидация параметров UUID

### 4. Сервисы
- Сервисы операций с базой данных с поддержкой транзакций
- Утилиты построения запросов для сложной фильтрации
- Обработка связей и жадная загрузка
- Логика трансформации данных

### 5. Интеграция с фронтендом
- **Формы React Admin**: Автогенерируемые формы создания/редактирования/просмотра с соответствующими компонентами ввода
  - `TextInput` для строк
  - `NumberInput` для числовых полей
  - `BooleanInput` для булевых полей
  - `DateTimeInput` для полей даты/времени
  - `JsonViewerField` для JSON данных с сворачиваемым просмотрщиком
- **Data Providers**: Полные data providers React Admin, реализующие все CRUD операции
  - Автоматическое сопоставление API эндпоинтов
  - Обработка ошибок и интеграция аутентификации
  - Поддержка пагинации и сортировки
- **Просмотр списков**: Автогенерируемые компоненты списков с возможностью поиска по колонкам
- **TypeScript интерфейсы**: Полная типобезопасность для использования во фронтенде

### 6. Клиентский код API
- Сгенерированный SDK с типизированными вызовами API
- Автоматическое извлечение параметров маршрутов
- Определения типов запросов/ответов
- Утилиты обработки ошибок

### 7. Документация
- Определения схем OpenAPI/Swagger
- Документация эндпоинтов API
- Диаграммы отношений моделей
- Примеры интеграции

### Поддерживаемые декораторы
- `@ApiProperty()` для Swagger документации
- `@IsString()`, `@IsNumber()`, `@IsBoolean()` для валидации
- `@Expose()`, `@Exclude()` для сериализации
- `@Transform()` для преобразования данных

## Установка

### Через npm
```bash
npm install prisma-generator-nestjs-dto
```

### Через yarn
```bash
yarn add prisma-generator-nestjs-dto
```

## Конфигурация

### Добавление в schema.prisma
```prisma
generator nestjsDto {
  provider              = "prisma-generator-nestjs-dto"
  output                = "../src/generated/nestjs-dto"
  dtoFileName           = "dto"
  entityPrefix          = ""
  entitySuffix          = "Entity"
  dtoPrefix             = ""
  dtoSuffix             = "Dto"
  createDtoPrefix       = "Create"
  createDtoSuffix       = "Dto"
  updateDtoPrefix       = "Update"
  updateDtoSuffix       = "Dto"
  paginateDtoPrefix     = "Paginate"
  paginateDtoSuffix     = "Dto"
  orderByDtoPrefix      = "OrderBy"
  orderByDtoSuffix      = "Dto"
  enumPrefix            = ""
  enumSuffix            = ""
  classValidator        = true
  classTransformer      = true
  swagger               = true
  noDependencies        = false
  dryRun                = false
}
```

### Параметры конфигурации

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `output` | string | `../src/generated/nestjs-dto` | Директория для генерируемых файлов |
| `dtoFileName` | string | `dto` | Имя файла для DTO |
| `entityPrefix` | string | `""` | Префикс для entity классов |
| `entitySuffix` | string | `"Entity"` | Суффикс для entity классов |
| `dtoPrefix` | string | `""` | Префикс для DTO классов |
| `dtoSuffix` | string | `"Dto"` | Суффикс для DTO классов |
| `createDtoPrefix` | string | `"Create"` | Префикс для Create DTO |
| `createDtoSuffix` | string | `"Dto"` | Суффикс для Create DTO |
| `updateDtoPrefix` | string | `"Update"` | Префикс для Update DTO |
| `updateDtoSuffix` | string | `"Dto"` | Суффикс для Update DTO |
| `paginateDtoPrefix` | string | `"Paginate"` | Префикс для Paginate DTO |
| `paginateDtoSuffix` | string | `"Dto"` | Суффикс для Paginate DTO |
| `orderByDtoPrefix` | string | `"OrderBy"` | Префикс для OrderBy DTO |
| `orderByDtoSuffix` | string | `"Dto"` | Суффикс для OrderBy DTO |
| `enumPrefix` | string | `""` | Префикс для enum |
| `enumSuffix` | string | `""` | Суффикс для enum |
| `classValidator` | boolean | `true` | Генерировать валидацию |
| `classTransformer` | boolean | `true` | Генерировать сериализацию |
| `swagger` | boolean | `true` | Генерировать Swagger документацию |
| `noDependencies` | boolean | `false` | Не добавлять зависимости |
| `dryRun` | boolean | `false` | Тестовый запуск без генерации |

## Использование

### Генерация DTO
```bash
npx prisma generate
```

### Пример сгенерированного кода

#### Entity класс
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class UserEntity {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;
}
```

#### Create DTO
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;
}
```

#### Update DTO
```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
```

## Интеграция с NestJS

### Контроллер
```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
```

### Сервис
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }
}
```

## Расширенные возможности

### Кастомные декораторы
```prisma
model User {
  id        String   @id @default(uuid()) @custom.decorator()
  email     String   @unique @email()
  createdAt DateTime @default(now()) @omit()
  updatedAt DateTime @updatedAt
}
```

### Группы валидации
```typescript
export class CreateUserDto {
  @ValidateIf((object: CreateUserDto) => object.isSocial === false)
  @IsString()
  @MinLength(6)
  password?: string;

  @IsBoolean()
  isSocial: boolean;
}
```

### Преобразование типов
```typescript
export class UserEntity {
  @Transform(({ value }) => new Date(value))
  createdAt: Date;

  @Transform(({ value }) => value.toISOString())
  updatedAt: string;
}
```

## Лучшие практики

### Организация файлов
```
src/
├── user/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── index.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.module.ts
└── generated/
    └── nestjs-dto/
        ├── user/
        │   ├── dto/
        │   └── entities/
        └── index.ts
```

### Настройка генератора
```prisma
generator nestjsDto {
  provider     = "prisma-generator-nestjs-dto"
  output       = "../src/generated/nestjs-dto"
  
  // Отключение ненужных функций
  swagger      = true
  classValidator = true
  classTransformer = false
  
  // Кастомные настройки имен
  dtoSuffix    = "RequestDto"
  entitySuffix = "Model"
}
```

## Решение проблем

### Частые ошибки

1. **Генерация не работает**
   ```bash
   # Проверка установки
   npm list prisma-generator-nestjs-dto
   
   # Перегенерация
   npx prisma generate --watch
   ```

2. **Конфликты типов**
   ```typescript
   // Импорт с псевдонимом
   import { User as UserModel } from '@prisma/client';
   import { UserDto } from './dto/user.dto';
   ```

3. **Проблемы с валидацией**
   ```typescript
   // Проверка глобального pipe
   // main.ts
   app.useGlobalPipes(
     new ValidationPipe({
       transform: true,
       whitelist: true,
     }),
   );
   ```

### Отладка

#### Dry run режим
```prisma
generator nestjsDto {
  provider = "prisma-generator-nestjs-dto"
  dryRun   = true
}
```

#### Логирование
```bash
DEBUG=prisma-generator-nestjs-dto npx prisma generate
```

## Расширение функциональности

### Создание кастомного генератора
```typescript
// src/custom-generator.ts
import { DMMF } from '@prisma/generator-helper';

export function generateCustomCode(dmmf: DMMF.Document) {
  // Кастомная логика генерации
  return {
    fileName: 'custom-output.ts',
    content: '// Generated custom code',
  };
}
```

### Интеграция с другими инструментами
```prisma
generator client {
  provider = "prisma-client-js"
}

generator nestjsDto {
  provider = "prisma-generator-nestjs-dto"
}

generator graphqlSchema {
  provider = "prisma-generator-graphql-schema"
}
```

## Тестирование

### Unit тесты для DTO
```typescript
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';

describe('CreateUserDto', () => {
  it('should validate correct data', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.name = 'Test User';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should reject invalid email', async () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid-email';
    
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
```

Этот генератор значительно ускоряет разработку NestJS приложений с Prisma, обеспечивая типобезопасность и автоматическую генерацию boilerplate кода.