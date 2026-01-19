import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    {
      cors: {
        origin: '*',
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
        credentials: true,
      },
    },
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

  Logger.log('Generating Swagger documentation');
  const document = SwaggerModule.createDocument(app, config);
  try {
    writeFileSync('./swagger.json', JSON.stringify(document));
  } catch (error) {
    //
    Logger.error(error, error.stack);
  }
  Logger.log('Swagger documentation generated');

  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  Logger.log(`Application is running on port ${process.env.PORT ?? 3000}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
