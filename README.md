# RAG System

Современная система вопросов и ответов на основе Retrieval-Augmented Generation (RAG) с поддержкой множественных провайдеров LLM и векторных баз данных.

Modern question-answering system based on Retrieval-Augmented Generation (RAG) with support for multiple LLM providers and vector databases.

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
git clone <repository-url>
cd rag-system

# Установка зависимостей
npm install

# Запуск в режиме разработки
./start-dev.sh
```

Система будет доступна по адресам:
- Backend API: http://localhost:3000
- Frontend: http://localhost:3001
- Swagger: http://localhost:3000/swagger

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