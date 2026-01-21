# Prisma Generator NestJS DTO Documentation

## Overview

Custom Prisma generator for automatically creating Data Transfer Objects (DTOs) and other artifacts for NestJS applications. This tool significantly simplifies development by automatically generating type-safe code based on the Prisma schema.

## Key Features

### Automatic Generation
- **DTO classes** for all Prisma models
- **Validation decorators** from `class-validator`
- **Serialization decorators** from `class-transformer`
- **Swagger/OpenAPI documentation**
- **CRUD controllers** and services
- **Migrations** and database schemas

### Supported Decorators
- `@ApiProperty()` for Swagger documentation
- `@IsString()`, `@IsNumber()`, `@IsBoolean()` for validation
- `@Expose()`, `@Exclude()` for serialization
- `@Transform()` for data transformation

## Installation

### Via npm
```bash
npm install prisma-generator-nestjs-dto
```

### Via yarn
```bash
yarn add prisma-generator-nestjs-dto
```

## Configuration

### Adding to schema.prisma
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

### Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `output` | string | `../src/generated/nestjs-dto` | Directory for generated files |
| `dtoFileName` | string | `dto` | DTO file name |
| `entityPrefix` | string | `""` | Prefix for entity classes |
| `entitySuffix` | string | `"Entity"` | Suffix for entity classes |
| `dtoPrefix` | string | `""` | Prefix for DTO classes |
| `dtoSuffix` | string | `"Dto"` | Suffix for DTO classes |
| `createDtoPrefix` | string | `"Create"` | Prefix for Create DTO |
| `createDtoSuffix` | string | `"Dto"` | Suffix for Create DTO |
| `updateDtoPrefix` | string | `"Update"` | Prefix for Update DTO |
| `updateDtoSuffix` | string | `"Dto"` | Suffix for Update DTO |
| `paginateDtoPrefix` | string | `"Paginate"` | Prefix for Paginate DTO |
| `paginateDtoSuffix` | string | `"Dto"` | Suffix for Paginate DTO |
| `orderByDtoPrefix` | string | `"OrderBy"` | Prefix for OrderBy DTO |
| `orderByDtoSuffix` | string | `"Dto"` | Suffix for OrderBy DTO |
| `enumPrefix` | string | `""` | Prefix for enum |
| `enumSuffix` | string | `""` | Suffix for enum |
| `classValidator` | boolean | `true` | Generate validation |
| `classTransformer` | boolean | `true` | Generate serialization |
| `swagger` | boolean | `true` | Generate Swagger documentation |
| `noDependencies` | boolean | `false` | Don't add dependencies |
| `dryRun` | boolean | `false` | Test run without generation |

## Usage

### Generating DTOs
```bash
npx prisma generate
```

### Generated Code Example

#### Entity Class
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

## NestJS Integration

### Controller
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

### Service
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

## Advanced Features

### Custom Decorators
```prisma
model User {
  id        String   @id @default(uuid()) @custom.decorator()
  email     String   @unique @email()
  createdAt DateTime @default(now()) @omit()
  updatedAt DateTime @updatedAt
}
```

### Validation Groups
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

### Type Transformations
```typescript
export class UserEntity {
  @Transform(({ value }) => new Date(value))
  createdAt: Date;

  @Transform(({ value }) => value.toISOString())
  updatedAt: string;
}
```

## Best Practices

### File Organization
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

### Generator Configuration
```prisma
generator nestjsDto {
  provider     = "prisma-generator-nestjs-dto"
  output       = "../src/generated/nestjs-dto"
  
  // Disable unnecessary features
  swagger      = true
  classValidator = true
  classTransformer = false
  
  // Custom naming settings
  dtoSuffix    = "RequestDto"
  entitySuffix = "Model"
}
```

## Troubleshooting

### Common Errors

1. **Generation not working**
   ```bash
   # Check installation
   npm list prisma-generator-nestjs-dto
   
   # Regenerate
   npx prisma generate --watch
   ```

2. **Type conflicts**
   ```typescript
   // Import with alias
   import { User as UserModel } from '@prisma/client';
   import { UserDto } from './dto/user.dto';
   ```

3. **Validation issues**
   ```typescript
   // Check global pipe
   // main.ts
   app.useGlobalPipes(
     new ValidationPipe({
       transform: true,
       whitelist: true,
     }),
   );
   ```

### Debugging

#### Dry run mode
```prisma
generator nestjsDto {
  provider = "prisma-generator-nestjs-dto"
  dryRun   = true
}
```

#### Logging
```bash
DEBUG=prisma-generator-nestjs-dto npx prisma generate
```

## Extending Functionality

### Creating Custom Generator
```typescript
// src/custom-generator.ts
import { DMMF } from '@prisma/generator-helper';

export function generateCustomCode(dmmf: DMMF.Document) {
  // Custom generation logic
  return {
    fileName: 'custom-output.ts',
    content: '// Generated custom code',
  };
}
```

### Integration with Other Tools
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

## Testing

### Unit Tests for DTOs
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

This generator significantly accelerates NestJS application development with Prisma, providing type safety and automatic boilerplate code generation.