import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PrismaService } from './services/prisma.service';

@Module({
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
