import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { CONTROLLERS } from './generated/rest/controllers';
import { AppService } from './services/app.service';
import { PrismaService } from './services/prisma.service';

@Module({
  controllers: [...CONTROLLERS, AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
