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
DATABASE_URL="postgresql://rag_system_user:c9pc5fQ81ME03VgfpU1Wuhlb3EjX069gC4QQ@localhost:25432/rag_system_db?schema=public"

# Server Port
PORT=23000

# LLM Providers
CHAT_PROVIDER="ollama"
# OPENAI_CHAT_API_KEY=sk-...
# GROQ_CHAT_API_KEY=gsk_...

# Embedding Providers
EMBEDDINGS_PROVIDER="ollama"
OLLAMA_EMBEDDINGS_MODEL="nomic-embed-text"
OLLAMA_EMBEDDINGS_BASE_URL="http://localhost:21434"

# Ollama
OLLAMA_BASE_URL="http://localhost:21434"

# Paths
SOURCES_PATH="../sources"
PROCESS_DOCUMENTS="false"
CREATE_DUMP_DOCUMENTS="false"

# Security
ADMIN_API_KEY="a1a9a512-aceb-49cf-83ac-a0b534486e0b"
CHECK_IP="false"
ALLOWED_IPS="127.0.0.1,192.168.168.1,::1"
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
POST /api/flow/message/send   - Send message to start/continue conversation
GET  /api/flow/dialog         - Get dialog messages with pagination
GET  /api/flow/message/trace  - Get message trace/debug information
POST /api/flow/message/cancel - Cancel/delete a message
GET  /swagger                 - Swagger API documentation
```

### Generated REST API Routes
The system automatically generates CRUD endpoints for all Prisma models:
```
# Authentication
GET  /api/auth/user           - Get users
GET  /api/auth/user/:id       - Get user by ID
POST /api/auth/user           - Create user
...

# Chat Models
GET  /api/chat/document-embedding     - Get document embeddings
GET  /api/chat/document-embedding/:id - Get embedding by ID
POST /api/chat/document-embedding     - Create embedding
...

# Other Models
GET  /api/chat/dialog
GET  /api/chat/message
GET  /api/chat/llm-model
GET  /api/chat/embedding-model
GET  /api/chat/prompt
GET  /api/chat/llm-request
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