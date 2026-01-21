# Frontend документация (React Admin)

## Общее описание

Frontend представляет собой современное React-приложение на базе React Admin для управления и взаимодействия с RAG-системой через веб-интерфейс.

## Технологический стек

- **Фреймворк**: React v19
- **UI библиотека**: Material-UI (MUI) v7
- **Админ-панель**: React Admin v5
- **Сборщик**: Vite v6
- **Типизация**: TypeScript
- **Состояние**: Встроенный state management React Admin

## Основные функции

### Интерфейс администратора
- Управление документами и эмбеддингами
- Мониторинг состояния системы
- Просмотр логов и метрик
- Настройка провайдеров LLM

### Компоненты интерфейса

#### 1. Dashboard
Центральная панель с ключевыми метриками:
- Количество обработанных документов
- Статистика по провайдерам
- Производительность системы
- Состояние подключений

#### 2. Document Management
Управление источниками документов:
- Просмотр списка документов
- Фильтрация по типам и источникам
- Поиск по содержимому
- Управление метаданными

#### 3. Search Interface
Интерфейс для тестирования поиска:
- Ввод поисковых запросов
- Просмотр результатов
- Анализ релевантности
- Сравнение разных провайдеров

#### 4. Configuration
Настройка системы:
- Управление провайдерами LLM
- Настройка параметров эмбеддингов
- Конфигурация базы данных
- Управление API ключами

## Структура проекта

```
frontend/
├── src/
│   ├── forms/          # Формы для ввода данных
│   ├── generated/      # Автогенерированный код OpenAPI
│   ├── services/       # Сервисы для API вызовов
│   ├── App.tsx         # Главный компонент приложения
│   ├── AppAuthProvider.ts # Аутентификация
│   ├── AppDataProvider.ts # Провайдер данных
│   ├── Layout.tsx      # Основной лэйаут
│   ├── index.tsx       # Точка входа
│   └── vite-env.d.ts   # Типы для Vite
├── public/             # Статические файлы
├── index.html          # HTML шаблон
└── vite.config.ts      # Конфигурация Vite
```

## Установка и запуск

### Установка зависимостей
```bash
cd frontend
npm install
```

### Запуск в режиме разработки
```bash
npm run dev
```

### Сборка для production
```bash
npm run build
```

### Предварительный просмотр production сборки
```bash
npm run serve
```

## Конфигурация

### Переменные окружения (`.env`)
```env
# Базовый URL бэкенда
VITE_BACKEND_URL=http://localhost:3000

# API ключ (если требуется)
VITE_API_KEY=your-api-key

# Режим разработки
NODE_ENV=development
```

### Конфигурация Vite (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

## Разработка компонентов

### Создание нового ресурса
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

### Добавление в основное приложение
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

## Интеграция с API

### Генерация типов из OpenAPI
```bash
npm run generate
```

### Использование сгенерированных сервисов
```typescript
import { ChatService } from './generated';

const response = await ChatService.chatControllerCreateCompletion({
  requestBody: {
    message: 'Hello world',
    provider: 'openai'
  }
});
```

## Стилизация

### Использование Material-UI
```typescript
import { Button, Box, Typography } from '@mui/material';

const MyComponent = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h6">Заголовок</Typography>
    <Button variant="contained" color="primary">
      Кнопка
    </Button>
  </Box>
);
```

### Темы
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

## Тестирование

### Запуск проверки типов
```bash
npm run type-check
```

### Линтинг кода
```bash
npm run lint
```

### Форматирование кода
```bash
npm run format
```

## Развертывание

### Production сборка
```bash
npm run build
```

Файлы будут собраны в директорию `dist/`.

### Деплой на сервер
```bash
# Скопировать файлы на сервер
scp -r dist/* user@server:/var/www/frontend/

# Или использовать Docker
docker build -t rag-frontend .
docker run -p 80:80 rag-frontend
```

## Интеграция с бэкендом

### CORS настройка (бэкенд)
```typescript
// backend/src/main.ts
app.enableCors({
  origin: ['http://localhost:3001', 'https://your-domain.com'],
  credentials: true,
});
```

### API клиент
```typescript
// src/services/api.ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
});

// Добавление токена авторизации
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Мониторинг и отладка

### React DevTools
Установите расширение React Developer Tools для браузера для отладки компонентов.

### Redux DevTools
Для отладки состояния приложения (если используется Redux).

### Логирование
```typescript
// src/utils/logger.ts
export const logger = {
  info: (...args: any[]) => console.info('[INFO]', ...args),
  error: (...args: any[]) => console.error('[ERROR]', ...args),
  warn: (...args: any[]) => console.warn('[WARN]', ...args),
};
```

## Решение проблем

### Частые ошибки

1. **CORS ошибка**
   ```
   Access to fetch at 'http://localhost:3000' from origin 'http://localhost:3001' 
   has been blocked by CORS policy
   ```
   Решение: Проверьте настройки CORS в бэкенде.

2. **API недоступен**
   ```
   Network Error: Failed to fetch
   ```
   Решение: Проверьте, запущен ли бэкенд и правильность URL.

3. **Типы не генерируются**
   ```
   Command failed with exit code 1
   ```
   Решение: Проверьте доступность Swagger документации бэкенда.

## Лучшие практики

### Компоненты
- Используйте функциональные компоненты с хуками
- Разделяйте логику и представление
- Используйте TypeScript для типобезопасности

### Производительность
- Мемоизируйте тяжелые компоненты
- Используйте lazy loading для роутов
- Оптимизируйте рендеринг списков

### Безопасность
- Валидируйте все входные данные
- Не храните чувствительные данные в localStorage
- Используйте HTTPS в production

Эта документация охватывает все аспекты frontend части RAG-системы и может служить руководством для разработчиков интерфейсов.