# Процесс разработки RAG-системы

## 📦 Repository Information

- **Author**: EndyKaufman <admin@site15.ru>
- **Repository**: [git@github.com:site15/rag-system.git](https://github.com/site15/rag-system)
- **License**: MIT

## 📁 Общая структура проекта

```
rag-system/
├── backend/              # NestJS backend приложение
├── frontend/             # React frontend приложение
├── prisma-generator-nestjs-dto/  # Кастомный генератор DTO
├── sources/              # Источники данных для обучения
├── docs/                 # Документация проекта
├── data/                 # Данные (создается автоматически)
│   └── ollama/          # Модели Ollama
└── scripts/              # Вспомогательные скрипты
```

## 🔧 1. Создание основного проекта

### 1.1. Инициализация монорепозитория
```bash
mkdir rag-system
cd rag-system
npm init -y
```

### 1.2. Установка глобальных зависимостей
```bash
npm i -g @nestjs/cli@latest
npm i -g pnpm  # Альтернативный менеджер пакетов
npm i -g pm2   # Менеджер процессов для production
```

## 🏗️ 2. Backend (NestJS)

### 2.1. Создание NestJS приложения
```bash
nest new backend --package-manager=pnpm --strict --skip-install --skip-git
cd backend
```

### 2.2. Основные зависимости NestJS
```bash
# Компилятор для ускорения сборки
npm i --save-dev @swc/cli @swc/core

# Swagger документация API
npm i --save @nestjs/swagger

# Быстрый сервер Fastify вместо Express
npm i --save @nestjs/platform-fastify

# Валидация и преобразование данных
npm i --save class-validator class-transformer

# JWT аутентификация
npm i --save @nestjs/jwt

# Статические файлы
npm i --save @nestjs/serve-static @fastify/static
```

### 2.3. Настройка базы данных (PostgreSQL + Prisma)
```bash
# Prisma ORM
npm i --save-dev prisma@latest

# PostgreSQL адаптер и клиент
npm install --save pg @prisma/adapter-pg @prisma/client

# Генерация клиента
npm run generate
```

### 2.4. LLM интеграции
```bash
# OpenAI API
npm i --save @langchain/openai openai

# Anthropic (Claude)
npm i --save @langchain/anthropic

# Google Gemini
npm i --save @langchain/google-genai

# Groq (быстрые модели)
npm i --save @langchain/groq

# Ollama (локальные модели)
npm i --save @langchain/ollama

# HuggingFace
npm i --save @huggingface/inference

# Общий функционал LangChain
npm i --save langchain @langchain/community
```

### 2.5. Работа с документами
```bash
# Парсинг PDF
npm i --save pdf-parse

# Парсинг HTML/XML
npm i --save cheerio xml2js

# HTTP клиенты
npm i --save axios node-fetch

# Текстовые утилиты
npm i --save normalize-text node-summarizer
```

### 2.6. Конфигурационные файлы backend

#### tsconfig.json
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false,
    "lib": [
      "es2021",
      "dom"
    ]
  }
}
```

#### .env файл
```env
# База данных
DATABASE_URL="postgresql://rag_system_user:c9pc5fQ81ME03VgfpU1Wuhlb3EjX069gC4QQ@localhost:25432/rag_system_db?schema=public"

# API ключи
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
GOOGLE_API_KEY=your-google-key
GROQ_API_KEY=your-groq-key

# Ollama
OLLAMA_BASE_URL=http://localhost:21434

# JWT
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=24h

# Порт приложения
PORT=3000
```

## 🌐 3. Frontend (React Admin)

### 3.1. Создание React приложения
```bash
# Из корневой директории проекта
cd ..
npx create-react-admin@latest frontend
cd frontend
```

### 3.2. Основные зависимости frontend
```bash
# Material UI компоненты
npm i --save @mui/material @mui/icons-material @emotion/react @emotion/styled

# React Router
npm i --save react-router react-router-dom

# JSON отображение
npm i --save react-json-view

# Prisma клиент для типизации
npm i --save @prisma/client
```

### 3.3. Инструменты разработки
```bash
# Vite для сборки
npm i --save-dev @vitejs/plugin-react vite

# TypeScript
npm i --save-dev typescript @types/node @types/react @types/react-dom

# ESLint и Prettier
npm i --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier

# OpenAPI генератор
npm i --save-dev @hey-api/openapi-ts
```

## 🐳 4. Docker и контейнеризация

### 4.1. docker-compose.yml
```yaml
version: "3.8"

services:
  # Ollama для локальных LLM моделей
  ollama:
    image: ollama/ollama
    container_name: rag_system_ollama
    ports:
      - "21434:11434"
    environment:
      OLLAMA_NUM_PARALLEL: 2
      OLLAMA_NUM_THREADS: 1
      OLLAMA_MAX_LOADED_MODELS: 2
      OLLAMA_KEEP_ALIVE: 30m
      OLLAMA_VULKAN: 1
    volumes:
      - ./data/ollama:/root/.ollama
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "bash", "-c", "{ printf >&3 'GET / HTTP/1.0\\r\\n\\r\\n'; cat <&3; } 3<>/dev/tcp/localhost/11434 | grep 'Ollama is' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 10s
    deploy:
      resources:
        limits:
          cpus: "4"
          memory: 8G

  # PostgreSQL с расширением pgvector
  postgres:
    image: pgvector/pgvector:pg18
    container_name: rag_system_postgres
    environment:
      POSTGRES_DB: rag_system_db
      POSTGRES_USER: rag_system_user
      POSTGRES_PASSWORD: c9pc5fQ81ME03VgfpU1Wuhlb3EjX069gC4QQ
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - rag_system_postgres_volume:/var/lib/postgresql/data
    ports:
      - "25432:5432"
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U rag_system_user -d rag_system_db"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

volumes:
  rag_system_postgres_volume:
```

## ⚙️ 5. Скрипты управления проектом

### 5.1. start-dev.sh - Запуск в режиме разработки
```bash
#!/usr/bin/env bash

# Запуск Docker контейнеров
docker compose up -d

# Ожидание готовности PostgreSQL
echo "Waiting for PostgreSQL to be healthy..."
while [ "$(docker inspect --format='{{json .State.Health}}' rag_system_postgres | grep -o '"Status":"healthy"')" != '"Status":"healthy"' ]; do
  sleep 2
done
echo "PostgreSQL is healthy"

# Ожидание готовности Ollama
echo "Waiting for Ollama to be healthy..."
while [ "$(docker inspect --format='{{json .State.Health}}' rag_system_ollama | grep -o '"Status":"healthy"')" != '"Status":"healthy"' ]; do
  sleep 2
done
echo "Ollama is healthy"

set -e

# Ожидание готовности Ollama API
echo "▶ Waiting for Ollama..."
until docker exec rag_system_ollama ollama list >/dev/null 2>&1; do
  sleep 2
done

# Загрузка необходимых моделей
pull_if_missing () {
  MODEL=$1
  if docker exec rag_system_ollama ollama list | grep -q "^$MODEL"; then
    echo "✔ Model '$MODEL' already exists"
  else
    echo "⬇ Pulling model '$MODEL'"
    docker exec rag_system_ollama ollama pull "$MODEL"
  fi
}

pull_if_missing mistral
pull_if_missing nomic-embed-text

# Применение миграций Prisma
echo "▶ Running Prisma migrations"
cd ./backend
./node_modules/.bin/prisma migrate deploy
cd ..

# Запуск приложений через PM2
npx -y pm2 start ./ecosystem.config.json
echo "✅ Done"
```

### 5.2. ecosystem.config.json - Конфигурация PM2
```json
{
  "apps": [
    {
      "name": "backend",
      "script": "cd backend && npm run start:dev"
    },
    {
      "name": "frontend",
      "script": "cd frontend && npm run dev"
    }
  ]
}
```

### 5.3. Корневые скрипты package.json
```json
{
  "scripts": {
    "prepare": "husky",
    "postinstall": "npm install --force --prefix backend && npm install --force --prefix frontend && npm install --force --prefix prisma-generator-nestjs-dto",
    "format": "npm run format --prefix backend && npm run format --prefix frontend && npm run format --prefix prisma-generator-nestjs-dto",
    "generate": "npm run generate --prefix backend && npm run generate --prefix frontend && npm run build --prefix frontend",
    "start:dev": "./start-dev.sh",
    "stop:dev": "./stop-dev.sh",
    "start:prod": "./start-prod.sh",
    "stop:prod": "./stop-prod.sh"
  }
}
```

## 📊 6. Работа с базой данных

### 6.1. Миграции Prisma
```bash
# Создание новой миграции
npm run prisma:create -- имя_миграции

# Применение миграций
npm run prisma:migrate

# Генерация клиента Prisma
npm run generate

# Сброс базы данных (осторожно!)
npm run prisma:reset
```

### 6.2. Структура базы данных
Основные таблицы:
- `ChatDocumentEmbedding` - Хранение эмбеддингов документов
- `Message` - Сообщения чата
- `Chat` - Чаты пользователей
- `Document` - Исходные документы
- `Chunk` - Фрагменты документов

## 🧪 7. Тестирование

### 7.1. Unit тесты
```bash
cd backend
npm run test
npm run test:watch  # Режим наблюдения
npm run test:cov    # С покрытием кода
```

### 7.2. End-to-end тесты
```bash
npm run test:e2e
```

## 📦 8. Production деплой

### 8.1. Сборка приложений
```bash
# Сборка backend
npm run build --prefix backend

# Сборка frontend
npm run build --prefix frontend
```

### 8.2. Production конфигурация
```json
# ecosystem-prod.config.json
{
  "apps": [
    {
      "name": "backend",
      "script": "./backend/dist/src/main.js",
      "instances": "max",
      "exec_mode": "cluster",
      "env": {
        "NODE_ENV": "production",
        "PORT": "3000"
      }
    },
    {
      "name": "frontend",
      "script": "npx serve ./backend/client -s -l 3001",
      "env": {
        "NODE_ENV": "production"
      }
    }
  ]
}
```

## 🔍 9. Мониторинг и отладка

### 9.1. PM2 команды
```bash
# Список запущенных процессов
npx -y pm2 list

# Логи приложений
npx -y pm2 logs

# Перезапуск приложений
npx -y pm2 restart all

# Остановка всех процессов
npx -y pm2 stop all
```

### 9.2. Docker команды
```bash
# Просмотр логов контейнеров
docker compose logs -f

# Остановка контейнеров
docker compose down

# Пересоздание контейнеров
docker compose up -d --force-recreate
```

## 🛠️ 10. Разработка новых фич

### 10.1. Создание нового контроллера
```bash
nest generate controller имя_контроллера
```

### 10.2. Создание нового сервиса
```bash
nest generate service имя_сервиса
```

### 10.3. Создание DTO
```bash
nest generate dto имя_dto
```

## 📚 11. Полезные ссылки и ресурсы

### 11.1. Документация
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [LangChain Documentation](https://js.langchain.com/docs/)
- [React Admin Documentation](https://marmelab.com/react-admin/)
- [Material UI Components](https://mui.com/material-ui/)

### 11.2. Модели LLM
- Mistral (для генерации)
- Nomic Embed (для эмбеддингов)
- OpenAI GPT (альтернатива)
- Claude (альтернатива)

### 11.3. Векторные базы данных
- pgvector (PostgreSQL расширение)
- Pinecone (облачное решение)
- Weaviate (альтернатива)

Этот документ охватывает полный цикл разработки RAG-системы от инициализации проекта до production деплоя.
