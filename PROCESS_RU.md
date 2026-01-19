создание пустого проекта на nestjs
npm i -g @nestjs/cli@latest
nest new backend --package-manager=pnpm --strict --skip-install --skip-git
cd backend
npm i --save-dev @swc/cli @swc/core
npm i --save @nestjs/swagger
npm i --save @nestjs/platform-fastify
npm i --save class-validator class-transformer

настройка бд
npm i --save-dev prisma@latest
npm install --save pg @prisma/adapter-pg

работа с призмой
npm run prisma:migrate
npm run generate
npm run prisma:create -- init

запуск в ватч режиме
./start-dev.sh

создание пустого проекта на react
npx create-react-admin@latest frontend