#!/usr/bin/env node
/**
 * Offline script: extract graphContent + graphEmbeddings for indexed documents.
 *
 * Usage:
 *   cd backend && npm run fill-graph-content
 */
import 'dotenv/config';
import { GraphEmbedService } from '../src/llm/graphEmbedService';
import { DefaultProvidersInitializer } from '../src/llm/services/defaultProvidersInitializer';
import { PrismaService } from '../src/services/prisma.service';
import { loadConstantsFromFiles } from '../src/utils/get-constant';

async function main() {
  console.log('🔄 Запуск fill-graph-content (offline)...\n');

  await loadConstantsFromFiles();
  const prisma = new PrismaService();
  await DefaultProvidersInitializer.initializeDefaultProviders();

  const result = await GraphEmbedService.fillGraphEmbedDocuments();

  console.log('\n✅ Готово:', {
    processed: result.processedCount,
    total: result.totalCount,
    errors: result.errors.length,
  });

  if (result.errors.length > 0) {
    console.error('\nОшибки:');
    result.errors.forEach((e) => console.error(`  - ${e}`));
  }

  await prisma.$disconnect();
  process.exit(result.errors.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('Критическая ошибка:', error);
  process.exit(1);
});
