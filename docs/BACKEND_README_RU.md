# Backend документация (NestJS RAG-система)

## Общее описание

Backend представляет собой мощную систему на базе NestJS, реализующую полный цикл RAG (Retrieval-Augmented Generation) для обработки документов и генерации интеллектуальных ответов.

## Основные компоненты

### Архитектура
- **Фреймворк**: NestJS v11
- **База данных**: PostgreSQL с расширением pgvector
- **ORM**: Prisma
- **Сервер**: Fastify
- **Документация API**: Swagger/OpenAPI

### Ключевые модули

#### 1. LLM модуль (`/src/llm/`)
Содержит всю логику работы с языковыми моделями:
- **RAGApplication** - основной класс приложения
- **RAGSearcher** - поисковая система
- **LLMFactory** - фабрика провайдеров LLM
- **EmbeddingsFactory** - фабрика эмбеддингов
- **Services** - вспомогательные сервисы (суммаризация, трассировка)

#### 2. Сервисы (`/src/services/`)
- **PrismaService** - работа с базой данных
- **ChatDocumentEmbeddingDumpService** - сервис дампов
- **DefaultProvidersInitializer** - инициализация провайдеров

#### 3. Контроллеры (`/src/controllers/`)
- REST API эндпоинты для взаимодействия с системой

#### 4. Декораторы и Guards (`/src/decorators/`, `/src/guards/`)
- Аутентификация и авторизация
- Валидация запросов

## Конфигурация

### Переменные окружения (`.env`)
```env
# База данных
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# Провайдеры LLM
CHAT_PROVIDER="openai"
OPENAI_API_KEY="sk-..."

# Провайдеры эмбеддингов
EMBEDDINGS_PROVIDER="openai"
EMBEDDINGS_API_KEY="sk-..."

# Ollama
OLLAMA_BASE_URL="http://localhost:11434"

# Пути
SOURCES_PATH="./sources"
PROCESS_DOCUMENTS="true"
```

### Поддерживаемые провайдеры

#### LLM провайдеры:
- OpenAI (GPT-3.5, GPT-4)
- Anthropic (Claude)
- Google (Gemini)
- Groq (Llama, Mixtral)
- Ollama (локальные модели)
- DeepSeek (китайские модели)

#### Embedding провайдеры:
- OpenAI (text-embedding-3-small/large)
- DeepSeek
- Ollama (nomic-embed-text)

## База данных

### Структура таблицы `ChatDocumentEmbedding`
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

### Индексы для оптимизации
```sql
CREATE INDEX ON "ChatDocumentEmbedding" USING hnsw (embedding1536 vector_cosine_ops);
CREATE INDEX ON "ChatDocumentEmbedding" USING hnsw (graphEmbedding1536 vector_cosine_ops);
```

## API эндпоинты

### Основные маршруты
```
POST /api/chat/completions    - Генерация ответов
GET  /api/documents/search    - Поиск документов
POST /api/documents/process   - Обработка документов
GET  /api/dump/full           - Полный дамп
GET  /api/dump/filtered       - Фильтрованный дамп
GET  /swagger                 - Swagger документация
```

## Разработка

### Установка зависимостей
```bash
cd backend
npm install
```

### Запуск в режиме разработки
```bash
npm run start:dev
```

### Сборка для production
```bash
npm run build
npm run start:prod
```

### Миграции базы данных
```bash
# Создание миграции
npm run prisma:create -- название_миграции

# Применение миграций
npm run prisma:migrate

# Генерация клиента Prisma
npm run generate
```

### Тестирование
```bash
# Unit тесты
npm run test

# Watch mode
npm run test:watch

# С покрытием
npm run test:cov

# E2E тесты
npm run test:e2e
```

## Мониторинг и логирование

### Система логирования
```typescript
Logger.logInfo('Сообщение', { данные: 'значения' });
Logger.logError('Ошибка', { error: error });
Logger.logWarn('Предупреждение', { details: 'информация' });
```

### Трассировка вызовов
Декоратор `@Trace()` автоматически логирует:
- Время выполнения
- Параметры вызова
- Результаты операций
- Ошибки и исключения

## Производительность

### Оптимизации
- Пул подключений к базе данных
- Асинхронная обработка с ограничением конкурентности
- Кэширование эмбеддингов
- HNSW индексы для векторного поиска

### Масштабирование
- Горизонтальное масштабирование через PM2
- Разделение нагрузки между провайдерами
- Очереди обработки для больших объемов

## Безопасность

### Аутентификация
- API ключи для внешних вызовов
- Валидация входных данных через `class-validator`
- Защита от инъекций через Prisma ORM

### Защита данных
- Шифрование чувствительных переменных окружения
- Ограничение доступа к базе данных
- Аудит логов безопасности

## Решение проблем

### Частые ошибки

1. **Connection refused to PostgreSQL**
   ```bash
   # Проверка контейнера
   docker ps | grep postgres
   
   # Проверка DATABASE_URL
   echo $DATABASE_URL
   ```

2. **Rate limit exceeded**
   ```typescript
   // Настройка повторных попыток
   const maxRetries = 3;
   const retryDelay = 1000;
   ```

3. **Embedding dimension mismatch**
   ```typescript
   // Проверка размерности
   const supportedDimensions = [384, 768, 1024, 1536, 3072];
   ```

## Структура проекта
```
backend/
├── src/
│   ├── controllers/     # REST контроллеры
│   ├── decorators/      # Декораторы
│   ├── guards/          # Guards для авторизации
│   ├── llm/            # Ядро RAG системы
│   ├── services/       # Бизнес-логика
│   ├── trace/          # Система трассировки
│   ├── types/          # TypeScript типы
│   └── utils/          # Утилиты
├── prisma/             # Схема и миграции
├── scripts/            # Вспомогательные скрипты
└── test/               # Тесты
```

Эта документация охватывает все аспекты backend части RAG-системы и может служить руководством для разработчиков и администраторов.