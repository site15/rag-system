// server.ts

import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { ConfigManager } from './config';
import { messageController } from './controllers/messageController';
import { dialogMessagesController } from './controllers/dialogMessagesController';
import { Logger } from './logger';
import { RAGApplication } from './ragApplication';

// Create Fastify instance
const server: FastifyInstance = fastify({
  logger: true,
});

// Register the message controller with configuration
messageController(server);

// Register the dialog messages controller
dialogMessagesController(server);

// Default route
server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return {
    message: 'RAG API Server is running',
    timestamp: new Date().toISOString(),
  };
});

// Error handling
server.setErrorHandler(
  (error: any, request: FastifyRequest, reply: FastifyReply) => {
    Logger.logError(
      'Server error',
      { error: error.message, url: request.url },
      error.stack,
    );
    reply.status(500).send({ error: error.message || 'Internal server error' });
  },
);

// Start the server
async function startServer() {
  try {
    await server.listen({
      port: ConfigManager.getAppConfig().port,
      host: ConfigManager.getAppConfig().host,
    });

    await RAGApplication.start({
      app: ConfigManager.getAppConfig(),
      providers: {
        embeddings: ConfigManager.getEmbeddingsConfig(
          ConfigManager.getAppConfig().embeddingsProvider,
        ),
      },
    });

    Logger.logInfo(
      `Server running on http://${ConfigManager.getAppConfig().host}:${
        ConfigManager.getAppConfig().port
      }`,
    );
    // File logging is configured through appConfig.enableFileLogging
  } catch (err: any) {
    await RAGApplication.stop();
    Logger.logError('Failed to start server', { error: err.message });
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await RAGApplication.stop();
  Logger.logInfo('Shutting down server...');
  await server.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await RAGApplication.stop();
  Logger.logInfo('Shutting down server...');
  await server.close();
  process.exit(0);
});

startServer();

export { server };
