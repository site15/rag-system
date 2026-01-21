# Prisma Generator Detailed Documentation

## Architecture Analysis

The Prisma NestJS DTO Generator is a sophisticated code generation tool that transforms Prisma schema definitions into complete, production-ready NestJS applications with React Admin frontend integration.

## Core Architecture

### Entry Point (`src/index.ts`)
The main generator handler that processes Prisma schema and coordinates the generation pipeline:

```typescript
generatorHandler({
  onManifest: () => ({
    defaultOutput: '../src/generated/nestjs-dto',
    prettyName: 'NestJS DTO Generator',
  }),
  onGenerate: generate,
});
```

### Configuration Processing
Supports extensive configuration options:
- **Naming conventions**: camel, pascal, snake, kebab case
- **Output types**: classes vs interfaces
- **Validation**: class-validator integration
- **Structure**: flat vs nested resource organization
- **Frontend generation**: React Admin components and data providers

### Generation Pipeline (`src/generator/index.ts`)
Coordinates the generation of multiple artifact types:
- DTO classes (Create, Update, Plain)
- Entity classes
- Controllers with full CRUD operations
- Services for business logic
- Frontend forms and data providers
- Enums and type definitions

## Key Generation Modules

### 1. Controller Generation (`generate-controller.ts`)
Generates complete NestJS REST controllers with:

**Features:**
- Full CRUD operations (GET, POST, PUT, DELETE)
- Swagger documentation with proper annotations
- Automatic pagination and sorting
- Soft delete support for models with `deletedAt`
- User context integration for models with `userId`
- UUID parameter validation
- Transaction support for atomic operations

**Generated Endpoints:**
```typescript
@Controller('api/model-name')
export class ModelNameController {
  @Get() findMany()        // List with pagination
  @Post() createOne()      // Create new record
  @Get(':id') findOne()    // Get by ID
  @Put(':id') updateOne()  // Update existing
  @Delete(':id') deleteOne() // Delete record
}
```

### 2. Frontend Form Generation (`generate-form.ts`)
Creates React Admin forms with intelligent field mapping:

**Smart Component Selection:**
- `TextInput` for string fields
- `NumberInput` for numeric types (Int, Float, Decimal)
- `BooleanInput` for boolean fields
- `DateTimeInput` for DateTime fields
- `JsonViewerField` for JSON data with collapsible viewer

**Form Types Generated:**
- Create forms (editable fields only)
- Edit forms (editable + read-only fields)
- Show forms (all fields read-only)

### 3. Data Provider Generation (`generate-data-provider.ts`)
Implements complete React Admin data provider interface:

**Operations Supported:**
- `getList` - Fetch paginated lists
- `getOne` - Fetch single record
- `getMany` - Fetch multiple records
- `getManyReference` - Fetch related data
- `create` - Create new records
- `update` - Update existing records
- `updateMany` - Bulk updates
- `delete` - Delete single record
- `deleteMany` - Bulk deletes

### 4. Template Helpers (`template-helpers.ts`)
Provides utility functions for:
- Naming convention transformations
- Path resolution
- Import statement generation
- File naming consistency

## Advanced Features

### Relation Handling
Automatically handles Prisma relations:
- One-to-many relationships
- Many-to-many relationships
- Nested create/update operations
- Relation validation

### Custom Annotations
Supports field-level annotations:
- `@DtoReadOnly` - Makes field read-only in forms
- `@DtoHide` - Hides field from generated code
- `@DtoOverrideType` - Overrides generated TypeScript type
- Custom validation rules

### Soft Delete Support
Automatic integration for models with `deletedAt` field:
- Filters out deleted records in queries
- Implements soft delete in update operations
- Proper handling in list views

### User Context Integration
For models with `userId` field:
- Automatic user ID injection in create operations
- User-specific data filtering
- Request context propagation

## Frontend Integration Capabilities

### Complete React Admin Stack
The generator creates a full React Admin application including:

**Data Layer:**
- Typed data providers for all models
- Automatic API endpoint mapping
- Error handling and retry logic
- Authentication integration

**Presentation Layer:**
- Auto-generated forms with appropriate input types
- Searchable and sortable list views
- Detail views with all field information
- Bulk action support

**Configuration:**
- Central resource registration
- Menu labeling and organization
- Permission-based access control

### Generated File Structure
```
generated/
├── client/              # API client code
├── prisma/              # Browser-compatible Prisma types
├── resource/            # React Admin components
│   ├── ModelNameDataProvider.ts
│   ├── ModelNameForm.tsx
│   ├── ModelNameList.tsx
│   └── resources.ts      # Central resource registry
└── rest/                # Backend DTOs and controllers
```

## Configuration Options

### Generator Settings
```prisma
generator nestjsDto {
  provider = "prisma-generator-nestjs-dto"
  
  # Output configuration
  output = "../src/generated/nestjs-dto"
  fileNamingStyle = "camel"
  outputType = "class"
  
  # Feature toggles
  classValidation = true
  swagger = true
  generateControllers = true
  generateDataProviders = true
  generateForms = true
  
  # Frontend integration
  frontendOutput = "../frontend/src/generated"
  generateLists = true
  
  # Advanced options
  definiteAssignmentAssertion = false
  wrapRelationsAsType = true
  showDefaultValues = false
}
```

### Environment Integration
- Automatic Prisma client path detection
- Prettier formatting integration
- TypeScript compilation compatibility
- Cross-platform path handling

## Performance Optimizations

### Code Generation Efficiency
- Incremental generation (respects DO_NOT_CHANGE_WHICH_GENERATING_CODE)
- Parallel processing of multiple models
- Memory-efficient AST manipulation
- Caching of computed values

### Generated Code Quality
- Minimal bundle size through tree-shaking
- Optimal import statements
- Consistent code formatting
- Type-safe implementations

## Extensibility Points

### Custom Templates
The generator architecture allows for:
- Custom controller templates
- Alternative frontend frameworks
- Different validation libraries
- Custom field processors

### Plugin System
Support for extending functionality through:
- Custom field classifiers
- Additional annotation handlers
- Custom output generators
- External tooling integration

## Integration Workflow

### Development Process
1. Define Prisma schema with models and relations
2. Configure generator options in schema.prisma
3. Run `npx prisma generate`
4. Generated code appears in specified output directories
5. Frontend automatically picks up new resources

### Continuous Integration
- Automated regeneration on schema changes
- Version control friendly (clear separation of generated vs manual code)
- Diff-friendly output formatting
- Consistent across development environments

This generator represents a complete solution for rapidly building type-safe, full-stack applications from Prisma schema definitions, eliminating boilerplate code while maintaining flexibility for customization.