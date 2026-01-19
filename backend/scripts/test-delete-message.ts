#!/usr/bin/env ts-node

/**
 * Test script for message deletion functionality
 * Demonstrates soft delete of message and dialog parameter reset
 */

import { PrismaService } from '../src/services/prisma.service';

async function testDeleteMessage() {
  console.log('=== Testing Message Deletion ===\n');
  
  // Initialize PrismaService
  const prismaService = new PrismaService();
  
  try {
    // First, let's find an existing message to test with
    const testMessage = await prismaService.chatMessage.findFirst({
      where: {
        deletedAt: null, // Only get non-deleted messages
      },
      select: {
        id: true,
        dialogId: true,
        question: true,
        answer: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!testMessage) {
      console.log('❌ No test message found in database');
      return;
    }

    console.log(`📝 Found test message:`);
    console.log(`   ID: ${testMessage.id}`);
    console.log(`   Question: ${testMessage.question.substring(0, 50)}...`);
    console.log(`   Dialog ID: ${testMessage.dialogId || 'None'}\n`);

    // Check current dialog parameters if message has dialog
    if (testMessage.dialogId) {
      const dialogBefore = await prismaService.chatDialog.findUnique({
        where: { id: testMessage.dialogId },
        select: {
          consecutiveFailures: true,
          isFailed: true,
        },
      });

      console.log(`📊 Dialog parameters BEFORE deletion:`);
      console.log(`   Consecutive Failures: ${dialogBefore?.consecutiveFailures}`);
      console.log(`   Is Failed: ${dialogBefore?.isFailed}\n`);
    }

    // Simulate the delete operation (we'll do a dry run first)
    console.log('🔍 Performing dry-run checks...');
    
    // Check if message exists and isn't already deleted
    const messageCheck = await prismaService.chatMessage.findUnique({
      where: { id: testMessage.id },
      select: {
        id: true,
        deletedAt: true,
        dialogId: true,
      },
    });

    if (!messageCheck) {
      console.log('❌ Message not found');
      return;
    }

    if (messageCheck.deletedAt) {
      console.log('⚠️  Message already deleted');
      return;
    }

    console.log('✅ Message found and not deleted\n');

    // Show what the operation would do
    console.log('🎯 Delete operation would:');
    console.log(`   1. Set deletedAt = ${new Date().toISOString()} for message ${testMessage.id}`);
    if (testMessage.dialogId) {
      console.log(`   2. Reset consecutiveFailures = 0 for dialog ${testMessage.dialogId}`);
      console.log(`   3. Reset isFailed = false for dialog ${testMessage.dialogId}`);
    } else {
      console.log(`   2. Message has no dialog, skipping dialog parameter reset`);
    }

    console.log('\n💡 To actually test the API endpoint, use:');
    console.log(`   POST /flow/message/delete`);
    console.log(`   Body: { "messageId": "${testMessage.id}" }`);
    
  } catch (error) {
    console.error('❌ Error during test:', error);
  } finally {
    await prismaService.$disconnect();
  }
}

// Run the test
testDeleteMessage().catch(console.error);