# Sources Documentation

## Overview

The `sources` directory contains all source documents used by the RAG system for training and search. This is the primary knowledge base for generating contextual responses.

## Directory Structure

```
sources/
├── articles/           # Articles and publications
│   ├── devto/         # Dev.to articles
│   └── habr/          # Habr articles
├── portfolio/          # Portfolio projects
├── resume/            # Resumes and profiles
└── telegram/          # Telegram messages
    └── [many files]
```

## Source Types

### 1. Articles
Contains technical articles and publications:
- **Dev.to** - articles from Dev.to platform (87 files)
- **Habr** - articles from Habr platform (28 files)

Formats: `.md`, `.txt`

### 2. Portfolio
Project documentation:
- Site15 homepage
- GitHub projects
- Technical descriptions

Formats: `.md`, `.html`

### 3. Resume
Professional information:
- DeepSeek resume
- Professional profiles

Formats: `.md`

### 4. Telegram
Messages from Telegram (262 files):
- Chats and conversations
- Technical discussions
- Notes and thoughts

Formats: `.txt`, `.md`

## File Formats

### Markdown (.md)
```markdown
## Article Title

Article content with formatting.

### Subtitle

Text with **emphasis** and `code`.

-- 

New document section.
```

### Plain Text (.txt)
```
Simple text format
No special formatting
Section separation via -- 
```

## Document Processing

### Hierarchical Splitting
The system uses intelligent splitting strategy:

1. **Primary level**: `\n--\n` - semantic block separation
2. **Secondary level**: double line breaks - paragraphs  
3. **Tertiary level**: single line breaks - sentences
4. **Fallback strategy**: word-based for optimal sizes

### Metadata
Each document receives metadata:
```json
{
  "source": "sources/articles/devto/article.md",
  "type": "article",
  "platform": "devto",
  "created_at": "2024-01-15",
  "tags": ["typescript", "nestjs"]
}
```

## Processing Configuration

### Environment Variables
```env
SOURCES_PATH=./sources
PROCESS_DOCUMENTS=true
MAX_CHUNK_SIZE=1600
CHUNK_OVERLAP=200
```

### Source Filtering
```typescript
// Global mode (exclude Telegram)
filterBySource: '%/telegram/%'
filterBySourceRule: 'not ilike'

// Telegram mode (Telegram only)
filterBySource: '%/telegram/%'
filterBySourceRule: 'ilike'
```

## Adding New Sources

### 1. Creating Structure
```bash
mkdir -p sources/new-category/sub-category
```

### 2. Adding Documents
```bash
# Markdown files
echo "# New Document" > sources/new-category/document.md

# Text files
echo "Document content" > sources/new-category/document.txt
```

### 3. Processing New Documents
```bash
# Run processing
PROCESS_DOCUMENTS=true npm run start:dev

# Or via API
curl -X POST http://localhost:3000/api/documents/process
```

## Best Practices

### Document Formatting
```
## Header

Brief document description.

--

### Main Content

Detailed content with logical block separation.

Use -- to separate major sections.
Use empty lines to separate paragraphs.

### Code Examples

```typescript
const example = "code";
```

--

### Conclusion

Final information.
```

### File Naming
- Use clear, descriptive names
- Avoid special characters
- Use kebab-case or snake_case
- Add dates for versioning: `document-2024-01-15.md`

### Category Organization
```
sources/
├── tutorials/          # Educational materials
├── documentation/      # Technical documentation
├── research/           # Research and analytics
├── notes/              # Notes and drafts
└── conversations/      # Dialogues and discussions
```

## Monitoring and Maintenance

### Source Statistics
```bash
# Count files by category
find sources -name "*.md" | wc -l
find sources -name "*.txt" | wc -l

# Directory sizes
du -sh sources/*
```

### Quality Checks
```bash
# Find empty files
find sources -empty

# Find files without extension
find sources -type f ! -name "*.*"

# Check encoding
file sources/*/*
```

### Regular Maintenance
- Remove duplicates
- Archive old documents
- Update outdated information
- Optimize directory structure

## System Integration

### Automatic Processing
The system automatically tracks changes in the sources directory and processes new documents when started with `PROCESS_DOCUMENTS=true`.

### Management API
```bash
# Get sources list
GET /api/documents/sources

# Process specific source
POST /api/documents/process
{
  "sourcePath": "sources/articles/devto"
}

# Update metadata
PUT /api/documents/metadata
{
  "documentId": "uuid",
  "metadata": { "tags": ["new", "tag"] }
}
```

## Security

### Confidential Information Protection
- Don't store passwords and API keys
- Use placeholders for sensitive data
- Regularly check content before commit

### Access Control
```bash
# Set permissions
chmod 644 sources/*/*
chmod 755 sources/*/

# File ownership
chown -R user:group sources/
```

This documentation covers all aspects of working with document sources in the RAG system and helps effectively manage the system's knowledge base.