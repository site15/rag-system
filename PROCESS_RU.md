создание пустого проекта на nestjs
npm i -g @nestjs/cli@latest
nest new backend --package-manager=pnpm --strict --skip-install --skip-git
cd backend
npm i --save-dev @swc/cli @swc/core
npm i --save @nestjs/swagger