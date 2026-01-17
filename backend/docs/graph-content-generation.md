# Graph Content Generation for Document Embeddings

This feature adds semantic metadata extraction to document embeddings by analyzing document content with an LLM and storing structured metadata in the `graphContent` field, along with corresponding embedding vectors in `graphEmbedding*` fields.

## Method: `RAGApplication.fillGraphEmbedDocuments(embeddings?: OpenAIEmbeddings | OllamaEmbeddings)`

### Parameters
- `embeddings` (optional): Pre-initialized embeddings model. If not provided, the method will initialize embeddings using the default configuration.

### Purpose
Processes all `ChatDocumentEmbedding` records that don't have `graphContent` populated yet. For each document:
1. Calls an LLM with a specialized prompt to analyze the content
2. Extracts structured metadata in JSON format
3. Generates embedding vectors for the JSON metadata
4. Stores the result in the `graphContent` field and appropriate `graphEmbedding*` field based on vector dimension

### Features
- **Smart Processing**: Only processes documents without existing graphContent
- **Dual Storage**: Saves both structured JSON metadata and embedding vectors
- **Dimension-aware**: Automatically selects the correct `graphEmbedding*` field based on vector dimensions (384, 768, 1024, 1536, 3072)
- **Raw SQL Operations**: Uses raw PostgreSQL queries for vector operations (since Prisma lacks native vector support)
- **Flexible Initialization**: Can accept pre-initialized embeddings or initialize them automatically
- **Error Handling**: Continues processing even if individual documents fail
- **Rate Limiting**: Built-in delays to prevent API rate limiting
- **Logging**: Detailed logs for monitoring progress
- **Validation**: Ensures valid JSON output before saving

### Output Structure
The LLM generates metadata in this JSON format:

```json
{
  "title": "Short descriptive title",
  "summary": "Concise summary of document",
  "documentType": "note|instruction|article|code|log|resume|cv|spec|unknown",
  "language": "ru|en|other",
  "topics": ["array", "of", "themes"],
  "entities": ["named", "entities", "technologies"],
  "technologies": ["frameworks", "languages", "tools"],
  "infrastructure": { "components": "described" },
  "problems": ["issues", "pain points"],
  "solutions": ["approaches", "fixes"],
  "limitations": ["constraints", "drawbacks"],
  "steps": ["ordered", "procedural", "steps"],
  "tags": ["categorical", "labels"],
  "publishedAt": "ISO 8601 date",
  "source": { "origin": "information" },
  "importance": 0.8,
  "classification": "spam|job|freelance|consulting|etc"
}
```

### Classification Priority
Documents are classified with these priorities (highest to lowest):
spam, job, freelance, consulting, pricing, partnership, investment, hiring, interview, speaking, media, support, review, decision, technology, product, access, resume, portfolio, articles, life, intro, followup, gratitude, clarification, none

## Usage

### Via Script
```bash
cd backend
npm run fill-graph-content
```

### Programmatically
```typescript
import { RAGApplication } from './src/llm/ragApplication';

// Option 1: Auto-initialize embeddings (uses default configuration)
const result = await RAGApplication.fillGraphEmbedDocuments();
console.log(result);
// Output: { success: true, processedCount: 42, totalCount: 45, errors: [] }

// Option 2: Provide pre-initialized embeddings
import { EmbeddingsFactory } from './src/llm/embeddingsFactory';
import { ConfigManager } from './src/llm/config';

const appConfig = ConfigManager.getAppConfig();
const embeddingsConfig = ConfigManager.getEmbeddingsConfig(appConfig.embeddingsProvider);
const embeddings = EmbeddingsFactory.createEmbeddings(
  appConfig.embeddingsProvider,
  embeddingsConfig
);

const result2 = await RAGApplication.fillGraphEmbedDocuments(embeddings);
```

## Configuration
The method uses the default chat configuration from `ConfigManager.getChatConfig()` which reads from environment variables:
- `CHAT_PROVIDER` - LLM provider (openai, groq, anthropic, etc.)
- `CHAT_MODEL` - Model name
- `CHAT_API_KEY` - API key
- `CHAT_TEMPERATURE` - Temperature setting (default: 1)

## Monitoring
The process logs detailed information:
- Total documents found for processing
- Progress for each document
- Success/failure counts
- Error details for failed documents

## Error Handling
- Individual document failures don't stop the overall process
- All errors are collected and reported at the end
- Invalid JSON responses are rejected with descriptive errors
- Rate limiting is handled with automatic delays

## Performance
- Processes documents sequentially to avoid rate limiting
- 1-second delay between LLM calls
- Efficient database queries using Prisma ORM
- Streaming-style processing for memory efficiency