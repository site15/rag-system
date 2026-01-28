# Frontend Documentation (React Admin)

## Overview

The frontend is a modern React application based on React Admin for managing and interacting with the RAG system through a web interface.

## Technology Stack

- **Framework**: React v19
- **UI Library**: Material-UI (MUI) v7
- **Admin Panel**: React Admin v5
- **Bundler**: Vite v6
- **Typing**: TypeScript
- **State**: Built-in React Admin state management

## Core Features

### Administrator Interface
- Document and embedding management
- System status monitoring
- Log and metrics viewing
- LLM provider configuration

### Interface Components

#### 1. Dashboard
Central panel with key metrics:
- Number of processed documents
- Provider statistics
- System performance
- Connection status

#### 2. Document Management
Document source management:
- Document list viewing
- Filtering by types and sources
- Content search
- Metadata management

#### 3. Search Interface
Interface for testing search:
- Search query input
- Results viewing
- Relevance analysis
- Provider comparison

#### 4. Configuration
System configuration:
- LLM provider management
- Embedding parameter configuration
- Database configuration
- API key management

## Project Structure

```
frontend/
├── src/
│   ├── forms/          # Data input forms
│   ├── generated/      # Auto-generated OpenAPI code
│   ├── services/       # API call services
│   ├── App.tsx         # Main application component
│   ├── AppAuthProvider.ts # Authentication
│   ├── AppDataProvider.ts # Data provider
│   ├── Layout.tsx      # Main layout
│   ├── index.tsx       # Entry point
│   └── vite-env.d.ts   # Types for Vite
├── public/             # Static files
├── index.html          # HTML template
└── vite.config.ts      # Vite configuration
```

## Installation and Running

### Installing Dependencies
```bash
cd frontend
npm install
```

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Previewing Production Build
```bash
npm run serve
```

## Configuration

### Environment Variables (`.env`)
```env
# Server Port
PORT=23001

# Backend base URL
VITE_API_URL=http://localhost:23000

# API key (if required)
VITE_API_KEY=your-api-key

# Development mode
NODE_ENV=development
```

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 23001,
    proxy: {
      '/api': {
        target: 'http://localhost:23000',
        changeOrigin: true
      }
    }
  }
})
```

## Component Development

### Creating a New Resource
```typescript
// src/resources/MyResource.tsx
import { List, Datagrid, TextField, EditButton } from 'react-admin';

export const MyResourceList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EditButton />
    </Datagrid>
  </List>
);
```

### Adding to Main Application
```typescript
// src/App.tsx
import { MyResourceList } from './resources/MyResource';

function App() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="my-resource" list={MyResourceList} />
    </Admin>
  );
}
```

## API Integration

### Generating Types from OpenAPI
```bash
npm run generate
```

### Using Generated Services
```typescript
import { ChatService } from './generated';

const response = await ChatService.chatControllerCreateCompletion({
  requestBody: {
    message: 'Hello world',
    provider: 'openai'
  }
});
```

## Styling

### Using Material-UI
```typescript
import { Button, Box, Typography } from '@mui/material';

const MyComponent = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">Header</Typography>
    <Button variant="contained" color="primary">
      Button
    </Button>
  </Box>
);
```

### Themes
```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
```

## Testing

### Running Type Checking
```bash
npm run type-check
```

### Code Linting
```bash
npm run lint
```

### Code Formatting
```bash
npm run format
```

## Deployment

### Production Build
```bash
npm run build
```

Files will be built to the `dist/` directory.

### Deploying to Server
```bash
# Copy files to server
scp -r dist/* user@server:/var/www/frontend/

# Or use Docker
docker build -t rag-frontend .
docker run -p 80:80 rag-frontend
```

## Backend Integration

### CORS Configuration (Backend)
```typescript
// backend/src/main.ts
app.enableCors({
  origin: ['http://localhost:23001', 'https://your-domain.com'],
  credentials: true,
});
```

### API Client
```typescript
// src/services/api.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});
```
// Adding authorization token
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Monitoring and Debugging

### React DevTools
Install the React Developer Tools browser extension for component debugging.

### Redux DevTools
For application state debugging (if Redux is used).

### Logging
```typescript
// src/utils/logger.ts
export const logger = {
  info: (...args: any[]) => console.info('[INFO]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  warn: (...args: any[]) => console.warn('[WARN]', ...args),
};
```

## Troubleshooting

### Common Errors

1. **CORS Error**
   ```
   Access to fetch at 'http://localhost:23000' from origin 'http://localhost:23001' 
   has been blocked by CORS policy
   ```
   Solution: Check CORS settings in backend.

2. **API Unavailable**
   ```
   Network Error: Failed to fetch
   ```
   Solution: Check if backend is running and URL is correct.

3. **Types Not Generating**
   ```
   Command failed with exit code 1
   ```
   Solution: Check backend Swagger documentation availability.

## Best Practices

### Components
- Use functional components with hooks
- Separate logic and presentation
- Use TypeScript for type safety

### Performance
- Memoize heavy components
- Use lazy loading for routes
- Optimize list rendering

### Security
- Validate all input data
- Don't store sensitive data in localStorage
- Use HTTPS in production

This documentation covers all aspects of the frontend RAG system and serves as a guide for interface developers.