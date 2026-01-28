# RAG System

Современная система вопросов и ответов на основе Retrieval-Augmented Generation (RAG) с поддержкой множественных провайдеров LLM и векторных баз данных.

Modern question-answering system based on Retrieval-Augmented Generation (RAG) with support for multiple LLM providers and vector databases.

## 📦 Repository Info

- **Author**: EndyKaufman <admin@site15.ru>
- **Repository**: [git@github.com:site15/rag-system.git](https://github.com/site15/rag-system)
- **License**: MIT

## 📋 Содержание / Table of Contents

- [О проекте / About](#о-проекте--about)
- [Архитектура / Architecture](#архитектура--architecture)
- [Быстрый старт / Quick Start](#быстрый-старт--quick-start)
- [Подпроекты / Subprojects](#подпроекты--subprojects)
- [Документация / Documentation](#документация--documentation)
- [Лицензия / License](#лицензия--license)

## О проекте / About

RAG-система объединяет современные технологии искусственного интеллекта для предоставления контекстуальных ответов на основе обширной базы знаний. Система поддерживает различные провайдеры LLM, векторные базы данных и предоставляет гибкие возможности для настройки и расширения.

The RAG system combines modern AI technologies to provide contextual answers based on an extensive knowledge base. The system supports various LLM providers, vector databases, and provides flexible configuration and expansion capabilities.

### Основные возможности / Key Features

- 🤖 **Множественные LLM провайдеры** - OpenAI, Anthropic, Google, Groq, Ollama, DeepSeek
- 📊 **Векторный поиск** - PostgreSQL с расширением pgvector
- 📚 **Иерархическая обработка документов** - интеллектуальное разделение контента
- 🔍 **Продвинутый поиск** - фильтрация по источникам и ранжирование результатов
- 🌐 **Web интерфейс** - React Admin панель управления
- 🛠️ **Генерация DTO** - автоматическая генерация для NestJS
- 📈 **Мониторинг** - встроенная система трассировки и логирования

## Архитектура / Architecture

```
rag-system/
├── backend/              # NestJS API сервер
├── frontend/             # React Admin интерфейс
├── prisma-generator-nestjs-dto/  # Генератор DTO
├── sources/              # Источники документов
├── docs/                 # Документация
└── docker-compose.yml    # Docker конфигурация
```

## Быстрый старт / Quick Start

### Требования / Requirements

- Node.js >= 18
- Docker и Docker Compose
- PostgreSQL (через Docker)
- Ollama (опционально, для локальных моделей)

### Установка / Installation

```bash
# Клонирование репозитория
git clone git@github.com:site15/rag-system.git
cd rag-system

# Установка зависимостей
npm install

# Копирование конфигурационных файлов
# Backend
cp backend/.env.example backend/.env
# Frontend
cp frontend/.env.example frontend/.env
```

### Запуск в режиме разработки / Development Mode

```bash
# Запуск всей системы в режиме разработки
./start-dev.sh

# Или по отдельности:
# Запуск Docker контейнеров (PostgreSQL, Ollama)
docker compose up -d

# Запуск backend и frontend в режиме разработки
npx pm2 start ecosystem.config.json
```

### Остановка в режиме разработки / Stop Development Mode

```bash
# Остановка всей системы
./stop-dev.sh

# Или по отдельности:
# Остановка Docker контейнеров
docker compose down

# Остановка backend и frontend
npx pm2 delete all
```

### Запуск в режиме production / Production Mode

```bash
# Запуск всей системы в режиме production
./start-prod.sh

# Или по отдельности:
# Запуск Docker контейнеров
docker compose up -d

# Сборка frontend
npm run build --prefix frontend

# Сборка и запуск backend
npm run build --prefix backend
npx pm2 start ecosystem-prod.config.json
```

### Остановка в режиме production / Stop Production Mode

```bash
# Остановка всей системы
./stop-prod.sh

# Или по отдельности:
# Остановка Docker контейнеров
docker compose down

# Остановка backend
npx pm2 delete all
```

Система будет доступна по адресам:
- Backend API: http://localhost:23000
- Frontend: http://localhost:23001
- Swagger: http://localhost:23000/swagger

### Installation

```bash
# Clone repository
git clone git@github.com:site15/rag-system.git
cd rag-system

# Install dependencies
npm install

# Copy configuration files
# Backend
cp backend/.env.example backend/.env
# Frontend
cp frontend/.env.example frontend/.env
```

### Development Mode

```bash
# Start entire system in development mode
./start-dev.sh

# Or separately:
# Start Docker containers (PostgreSQL, Ollama)
docker compose up -d

# Start backend and frontend in development mode
npx pm2 start ecosystem.config.json
```

### Stop Development Mode

```bash
# Stop entire system
./stop-dev.sh

# Or separately:
# Stop Docker containers
docker compose down

# Stop backend and frontend
npx pm2 delete all
```

### Production Mode

```bash
# Start entire system in production mode
./start-prod.sh

# Or separately:
# Start Docker containers
docker compose up -d

# Build frontend
npm run build --prefix frontend

# Build and start backend
npm run build --prefix backend
npx pm2 start ecosystem-prod.config.json
```

### Stop Production Mode

```bash
# Stop entire system
./stop-prod.sh

# Or separately:
# Stop Docker containers
docker compose down

# Stop backend
npx pm2 delete all
```

### Полезные команды PM2 / Useful PM2 Commands

```bash
# Просмотр статуса всех приложений / View status of all applications
npx pm2 list

# Просмотр логов / View logs
npx pm2 logs

# Просмотр логов конкретного приложения / View logs for specific app
npx pm2 logs rag-system-backend

# Перезапуск приложения / Restart application
npx pm2 restart rag-system-backend

# Остановка конкретного приложения / Stop specific application
npx pm2 stop rag-system-backend

# Мониторинг ресурсов / Monitor resources
npx pm2 monit
```

### Проверка статуса системы / System Status Check

```bash
# Проверить текущий статус всех компонентов системы
./status.sh
```

The system will be available at:
- Backend API: http://localhost:23000
- Frontend: http://localhost:23001
- Swagger: http://localhost:23000/swagger

## Подпроекты / Subprojects

### 🏗️ Backend (NestJS)
Ядро RAG-системы с полной реализацией пайплайна обработки документов и поиска.

Core RAG system with complete document processing and search pipeline implementation.

📁 [Документация Backend / Backend Documentation](docs/BACKEND_README_RU.md) | [English](docs/BACKEND_README_EN.md)

### 🌐 Frontend (React Admin)
Веб-интерфейс для управления системой и тестирования функциональности.

Web interface for system management and functionality testing.

📁 [Документация Frontend / Frontend Documentation](docs/FRONTEND_README_RU.md) | [English](docs/FRONTEND_README_EN.md)
📄 [Подробная документация Frontend / Detailed Frontend Documentation](docs/FRONTEND_DETAILED_RU.md) | [English](docs/FRONTEND_DETAILED_EN.md)

### 🛠️ Prisma Generator
Пользовательский генератор DTO для автоматической генерации кода NestJS.

Custom DTO generator for automatic NestJS code generation.

📁 [Документация Prisma Generator](docs/PRISMA_GENERATOR_README_RU.md) | [English](docs/PRISMA_GENERATOR_README_EN.md)
📄 [Подробная документация Generator / Detailed Generator Documentation](docs/PRISMA_GENERATOR_DETAILED_RU.md) | [English](docs/PRISMA_GENERATOR_DETAILED_EN.md)

### 📚 Sources
Источники знаний системы - документы, статьи и другие материалы для обучения.

System knowledge sources - documents, articles and other materials for training.

📁 [Документация Sources](docs/SOURCES_README_RU.md) | [English](docs/SOURCES_README_EN.md)

## Документация / Documentation

### Техническая документация / Technical Documentation

📁 **Архитектура системы / System Architecture**
- [RAG_ARCHITECTURE_OVERVIEW_RU.md](docs/RAG_ARCHITECTURE_OVERVIEW_RU.md) - Детализированное описание архитектуры
- [RAG_ARCHITECTURE_OVERVIEW_EN.md](docs/RAG_ARCHITECTURE_OVERVIEW_EN.md) - Detailed architecture description

📁 **Полная системная документация / Complete System Documentation**
- [ДОКУМЕНТАЦИЯ_RAG_СИСТЕМЫ_RU.md](docs/ДОКУМЕНТАЦИЯ_RAG_СИСТЕМЫ_RU.md) - Комплексная документация на русском
- [RAG_SYSTEM_DOCUMENTATION_EN.md](docs/RAG_SYSTEM_DOCUMENTATION_EN.md) - Comprehensive English documentation

### Additional Materials

📁 **Technical Guides**
- [FILES.md](docs/FILES.md) - Detailed file structure and development process description
- [JAVASCRIPT_CLIENT_GUIDE.md](docs/JAVASCRIPT_CLIENT_GUIDE.md) - Guide for using JavaScript client with the API

📁 **Технические руководства / Technical Guides**
- [FILES.md](docs/FILES.md) - Подробное описание файловой структуры и процесса разработки
- [JAVASCRIPT_CLIENT_GUIDE.md](docs/JAVASCRIPT_CLIENT_GUIDE.md) - Руководство по использованию JavaScript клиента для API

## Лицензия / License

MIT License - см. файл [LICENSE](LICENSE) для подробной информации.

---

**Разработано с ❤️ для сообщества разработчиков**

**Developed with ❤️ for the developer community**