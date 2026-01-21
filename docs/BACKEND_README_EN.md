# Backend Documentation (NestJS RAG System)

## Overview

The backend is a powerful NestJS-based system implementing a complete RAG (Retrieval-Augmented Generation) cycle for document processing and intelligent response generation.

## Core Components

### Architecture
- **Framework**: NestJS v11
- **Database**: PostgreSQL with pgvector extension
- **ORM**: Prisma
- **Server**: Fastify
- **API Documentation**: Swagger/OpenAPI

### Key Modules

#### 1. LLM Module (`/src/llm/`)
Contains all language model logic:
- **RAGApplication** - main application class
- **RAGSearcher** - search engine
- **LLMFactory** - LLM provider factory
- **EmbeddingsFactory** - embeddings factory
- **Services** - helper services (summarization, tracing)

#### 2. Services (`/src/services/`)
- **PrismaService** - database operations
- **ChatDocumentEmbeddingDumpService** - dump service
- **DefaultProvidersInitializer** - provider initialization

#### 3. Controllers (`/src/controllers/`)
- REST API endpoints for system interaction

#### 4. Decorators and Guards (`/src/decorators/`, `/src/guards/`)
- Authentication and authorization
- Request validation

## Configuration

### Environment Variables (`.env`)
```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# LLM Providers
CHAT_PROVIDER="openai"
OPENAI_API_KEY="sk-..."

# Embedding Providers
EMBEDDINGS_PROVIDER="openai"
EMBEDDINGS_API_KEY="sk-..."

# Ollama
OLLAMA_BASE_URL="http://localhost:11434"

# Paths
SOURCES_PATH="./sources"
PROCESS_DOCUMENTS="true"
```

### Supported Providers

#### LLM Providers:
- OpenAI (GPT-3.5, GPT-4)
- Anthropic (Claude)
- Google (Gemini)
- Groq (Llama, Mixtral)
- Ollama (local models)
- DeepSeek (Chinese models)

#### Embedding Providers:
- OpenAI (text-embedding-3-small/large)
- DeepSeek
- Ollama (nomic-embed-text)

## Database

### ChatDocumentEmbedding Table Structure
```sql
CREATE TABLE "ChatDocumentEmbedding" (
  id UUID PRIMARY KEY,
  content TEXT NOT NULL,
  embedding384 VECTOR(384),
  embedding768 VECTOR(768),
  embedding1024 VECTOR(1024),
  embedding1536 VECTOR(1536),
  embedding3072 VECTOR(3072),
  metadata JSONB,
  contentHash TEXT UNIQUE,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  graphContent TEXT,
  graphEmbedding384 VECTOR(384),
  graphEmbedding768 VECTOR(768),
  graphEmbedding1024 VECTOR(1024),
  graphEmbedding1536 VECTOR(1536),
  graphEmbedding3072 VECTOR(3072),
  model TEXT,
  provider TEXT
);
```

### Optimization Indexes
```sql
CREATE INDEX ON "ChatDocumentEmbedding" USING hnsw (embedding1536 vector_cosine_ops);
CREATE INDEX ON "ChatDocumentEmbedding" USING hnsw (graphEmbedding1536 vector_cosine_ops);
```

## API Endpoints

### Main Routes
```
POST /api/chat/completions    - Response generation
GET  /api/documents/search    - Document search
POST /api/documents/process   - Document processing
GET  /api/dump/full           - Full dump
GET  /api/dump/filtered       - Filtered dump
GET  /swagger                 - Swagger documentation
```

## Development

### Installing Dependencies
```bash
cd backend
npm install
```

### Running in Development Mode
```bash
npm run start:dev
```

### Building for Production
```bash
npm run build
npm run start:prod
```

### Database Migrations
```bash
# Create migration
npm run prisma:create -- migration_name

# Apply migrations
npm run prisma:migrate

# Generate Prisma client
npm run generate
```

### Testing
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

## Monitoring and Logging

### Logging System
```typescript
Logger.logInfo('Message', { data: 'values' });
Logger.logError('Error', { error: error });
Logger.logWarn('Warning', { details: 'information' });
```

### Call Tracing
The `@Trace()` decorator automatically logs:
- Execution time
- Call parameters
- Operation results
- Errors and exceptions

## Performance

### Optimizations
- Database connection pooling
- Asynchronous processing with concurrency limits
- Embedding caching
- HNSW indexes for vector search

### Scaling
- Horizontal scaling through PM2
- Load distribution between providers
- Processing queues for large volumes

## Security

### Authentication
- API keys for external calls
- Input validation via `class-validator`
- Injection protection via Prisma ORM

### Data Protection
- Encryption of sensitive environment variables
- Database access limitation
- Security logs audit

## Troubleshooting

### Common Errors

1. **Connection refused to PostgreSQL**
   ```bash
   # Check container
   docker ps | grep postgres
   
   # Check DATABASE_URL
   echo $DATABASE_URL
   ```

2. **Rate limit exceeded**
   ```typescript
   // Configure retries
   const maxRetries = 3;
   const retryDelay = 1000;
   ```

3. **Embedding dimension mismatch**
   ```typescript
   // Check dimensions
   const supportedDimensions = [384, 768, 1024, 1536, 3072];
   ```

## Project Structure
```
backend/
├── src/
│   ├── controllers/     # REST controllers
│   ├── decorators/      # Decorators
│   ├── guards/          # Authorization guards
│   ├── llm/            # RAG system core
│   ├── services/       # Business logic
│   ├── trace/          # Tracing system
│   ├── types/          # TypeScript types
│   └── utils/          # Utilities
├── prisma/             # Schema and migrations
├── scripts/            # Helper scripts
└── test/               # Tests
```

This documentation covers all aspects of the backend RAG system and serves as a guide for developers and administrators.