# Frontend Documentation (React Admin)

## Overview

The frontend is built with React Admin, providing a comprehensive administration panel for the RAG system. It automatically integrates with the backend API through generated code from the Prisma DTO generator.

## Architecture

### Core Components

#### 1. Main Application (`App.tsx`)
```typescript
import { Admin, Resource } from "react-admin";
import { appAuthProvider } from "./AppAuthProvider";
import { appDataProvider } from "./AppDataProvider";
import { CustomLoginPage } from "./forms/CustomLoginPage";
import { client } from "./generated/client/client.gen";
import { resources } from "./generated/resource/resources";

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: { "x-api-key": authService.getApiKey() },
});

export const App = () => {
  const resourceNames = Object.keys(resources);
  
  return (
    <Admin
      requireAuth
      loginPage={CustomLoginPage}
      authProvider={appAuthProvider}
      dataProvider={appDataProvider}
    >
      {resourceNames.map((resourceName, index) => (
        <Resource
          key={index}
          name={resourceName}
          options={{ label: resources[resourceName]?.label }}
          list={resources[resourceName]?.list}
          show={resources[resourceName]?.show}
          create={resources[resourceName]?.create}
          edit={resources[resourceName]?.edit}
        />
      ))}
    </Admin>
  );
};
```

#### 2. Authentication Provider (`AppAuthProvider.ts`)
Handles user authentication and session management:
- Login/logout functionality
- API key management
- Session validation
- Permission checking

#### 3. Data Provider (`AppDataProvider.ts`)
Central routing layer that delegates to model-specific data providers:
- Routes requests to appropriate generated data providers
- Handles global error management
- Manages authentication token refresh
- Implements retry logic

## Generated Resources

The system automatically generates complete CRUD interfaces for all Prisma models:

### Resource Structure
Each model generates:
- **DataProvider**: Implements all React Admin data operations
- **Forms**: Create/Edit/Show forms with appropriate input components
- **List Views**: Searchable and sortable list displays
- **Type Definitions**: Full TypeScript support

### Available Resources

#### Authentication Resources
- `AuthUser` - User management
- `AuthApiKey` - API key management  
- `AuthSession` - Session tracking

#### Chat Resources
- `ChatDialog` - Conversation dialogs
- `ChatMessage` - Individual messages with rich content
- `ChatDocumentEmbedding` - Document embeddings with vector data
- `ChatMessageDocumentEmbedding` - Message-to-document relationships
- `ChatLlmModel` - LLM model configurations
- `ChatEmbeddingModel` - Embedding model configurations
- `ChatLlmRequest` - LLM request tracking
- `ChatPrompt` - Prompt templates

## Auto-Generated Components

### 1. Data Providers
Each resource gets a complete data provider implementing:
```typescript
{
  getList: (resource, params) => Promise<GetListResult>,
  getOne: (resource, params) => Promise<GetOneResult>,
  getMany: (resource, params) => Promise<GetManyResult>,
  getManyReference: (resource, params) => Promise<GetManyReferenceResult>,
  create: (resource, params) => Promise<CreateResult>,
  update: (resource, params) => Promise<UpdateResult>,
  updateMany: (resource, params) => Promise<UpdateManyResult>,
  delete: (resource, params) => Promise<DeleteResult>,
  deleteMany: (resource, params) => Promise<DeleteManyResult>
}
```

### 2. Form Components
Auto-generated forms with:
- **Create Forms**: Fields for required data entry
- **Edit Forms**: Fields for updating existing records
- **Show Forms**: Read-only display of all fields
- Smart input selection based on field types:
  - `TextInput` for strings
  - `NumberInput` for numeric fields
  - `BooleanInput` for boolean values
  - `DateTimeInput` for timestamps
  - `JsonViewerField` for complex JSON data

### 3. List Components
Searchable and sortable lists with:
- Column-based filtering
- Pagination support
- Bulk actions
- Responsive design

## Integration Features

### API Client Integration
Uses generated OpenAPI client:
- Type-safe API calls
- Automatic request/response validation
- Built-in error handling
- Authentication header injection

### Authentication Flow
1. User logs in via custom login page
2. API key is stored securely
3. All requests include authentication headers
4. Automatic logout on authentication errors

### Error Handling
- Global error interception
- Automatic session renewal
- User-friendly error messages
- Graceful degradation

## Customization Points

### Custom Forms
Located in `src/forms/` directory:
- `CustomLoginPage.tsx` - Custom authentication interface
- Extendable for additional custom forms

### Styling
- Uses Material-UI components
- Theme customization through React Admin theme system
- Responsive design for all screen sizes

### Extensions
- Custom field components can be added
- Additional data providers can be integrated
- Custom actions and buttons supported

## Development Workflow

### Adding New Resources
1. Define model in Prisma schema
2. Run `npx prisma generate` to regenerate DTOs
3. Run frontend build to regenerate React Admin components
4. New resource automatically appears in admin panel

### Custom Field Types
For special data types like vectors or embeddings:
1. Create custom input component
2. Register in form generation templates
3. Add to field type mapping

## Performance Optimizations

### Code Splitting
- Lazy loading of resource components
- Bundle splitting by resource type
- Dynamic imports for large components

### Caching
- Client-side caching of frequently accessed data
- Request deduplication
- Stale-while-revalidate patterns

### Bundle Size
- Tree-shaking of unused components
- Selective imports from Material-UI
- Minification and compression

## Security Features

### Authentication
- API key-based authentication
- Secure token storage
- Session timeout handling
- CSRF protection

### Authorization
- Role-based access control
- Resource-level permissions
- Field-level visibility control

### Data Protection
- Input sanitization
- XSS prevention
- Secure API communication
- Audit logging

## Deployment

### Build Process
```bash
npm run build
```
Creates optimized production bundle in `dist/` directory.

### Environment Configuration
- `VITE_API_URL` - Backend API endpoint
- Authentication settings
- Feature flags

### Hosting Options
- Static hosting (Netlify, Vercel)
- Traditional web servers
- Container deployment

## Monitoring and Analytics

### Logging
- Request/response logging
- Error tracking
- Performance metrics
- User activity monitoring

### Debugging
- Development mode with detailed logging
- Component inspection tools
- Network request monitoring
- State debugging utilities

This frontend system provides a complete, type-safe administration interface that automatically adapts to backend schema changes through the Prisma generator integration.