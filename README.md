## 🚀 Quick Start

### Prerequisites
- Node.js v24.12.0
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository:**
```bash
git clone git@github.com:site15/rag-system.git
cd rag-system
```

2. **Install dependencies:**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install generator dependencies
cd prisma-generator-nestjs-dto && npm install && cd ..
```

3. **Start the development environment:**
```bash
./start-dev.sh
```

This script will:
- Launch PostgreSQL container
- Wait for services to be healthy
- Pull required AI models (mistral, nomic-embed-text)
- Run database migrations
- Start backend and frontend services

### Manual Startup Alternative
```bash
# Start infrastructure
docker compose up -d

# Start services
npx pm2 start ecosystem.config.json

# Stop services
npx pm2 stop all
./stop-dev.sh
```

## 📁 Project Structure

```
rag-system/
├── backend/                    # NestJS API server
│   ├── src/
│   │   ├── controllers/       # REST API controllers
│   │   ├── generated/         # Auto-generated DTOs and entities
│   │   ├── services/          # Business logic services
│   │   └── types/             # TypeScript types
│   └── prisma/                # Database schema and migrations
├── frontend/                   # React Admin dashboard
│   └── src/
│       ├── generated/         # Auto-generated admin components
│       └── App.tsx            # Main application component
└── prisma-generator-nestjs-dto/ # Custom DTO generator
```

## 🔧 Configuration

### Environment Variables

**Backend** (`.env`):
```bash
DATABASE_URL=postgresql://user:password@localhost:25432/rag_system_db
PORT=23000
```

**Frontend** (`.env`):
```bash
VITE_API_URL=http://localhost:23000
```

### Database Connection
- **Host**: localhost
- **Port**: 25432
- **Database**: rag_system_db
- **Username**: rag_system_user
- **Password**: c9pc5fQ81ME03VgfpU1Wuhlb3EjX069gC4QQ

## 🛠️ Development Workflow

### Code Generation
The system uses a custom Prisma generator to automatically create:
- DTO classes with validation
- REST controllers
- React Admin components (Lists, Forms, DataProviders)
- Database entities

To regenerate after schema changes:
```bash
cd backend
npx prisma generate
```

### Code Formatting
Automatic formatting is enforced on commit via husky hooks:
- **Frontend**: `npm run format` (Prettier for `./src`)
- **Backend**: `npm run format` (Prettier for TypeScript files)
- **Generator**: `npm run format` (Prettier for source files)

### Testing
```bash
# Backend tests
cd backend && npm run test

# Frontend tests
cd frontend && npm run test

# End-to-end tests
cd backend && npm run test:e2e
```

## 🚨 Troubleshooting

### Common Issues

**Database Connection Failed:**
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# View logs
docker logs rag_system_postgres
```

**Frontend Not Loading:**
```bash
# Check if services are running
npx pm2 list

# View frontend logs
npx pm2 logs frontend
```

### Reset Development Environment
```bash
./stop-dev.sh
docker compose down -v
./start-dev.sh
```