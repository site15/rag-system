import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('RAG-system')
    .setDescription('The RAG-system API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => {
    const document = SwaggerModule.createDocument(app, config);
    try {
      writeFileSync('./swagger.json', JSON.stringify(document));
    } catch (error) {
      //
      Logger.error(error, error.stack);
    }
    return document;
  };

  SwaggerModule.setup('swagger', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  Logger.log(`Application is running on port ${process.env.PORT ?? 3000}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
