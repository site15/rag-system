#!/usr/bin/env node

/**
 * Test script to demonstrate the message trace functionality
 */

import { JsonNullValueFilter } from '../src/generated/prisma/internal/prismaNamespace';
import { DialogManager } from '../src/llm/dialogManager';
import { PrismaService } from '../src/services/prisma.service';

async function testMessageTraceFunctionality() {
  console.log('🧪 Testing Message Trace Functionality...\n');

  try {
    // Test 1: Try to get trace for non-existent message
    console.log('Test 1: Getting trace for non-existent message');
    const nonExistentTrace = await DialogManager.getMessageTrace(
      '00000000-0000-0000-0000-000000000000',
    );
    console.log(
      'Result:',
      nonExistentTrace === null
        ? '✅ Null returned as expected'
        : '❌ Unexpected result',
    );
    console.log('');

    // Test 2: Get a real message trace (if any exist)
    console.log('Test 2: Getting trace for existing messages');

    // First, find any existing messages with traces
    const messagesWithTraces =
      await PrismaService.instance.chatMessage.findMany({
        where: {
          trace: {
            not: null as unknown as JsonNullValueFilter,
          },
        },
        select: {
          id: true,
          trace: true,
          question: true,
          createdAt: true,
        },
        take: 3,
        orderBy: {
          createdAt: 'desc',
        },
      });

    if (messagesWithTraces.length > 0) {
      console.log(`Found ${messagesWithTraces.length} messages with traces:`);

      for (const message of messagesWithTraces) {
        console.log(`\nMessage ID: ${message.id}`);
        console.log(
          `Question: ${message.question.substring(0, 50)}${message.question.length > 50 ? '...' : ''}`,
        );
        console.log(`Created: ${message.createdAt.toISOString()}`);

        const trace = await DialogManager.getMessageTrace(message.id);
        console.log(`Has trace: ${!!trace}`);

        if (trace) {
          // Show trace structure without dumping all the data
          const traceKeys = Object.keys(trace);
          console.log(`Trace keys: [${traceKeys.join(', ')}]`);

          if (trace.children) {
            console.log(`Trace has ${trace.children.length} child nodes`);
          }
        }
      }
    } else {
      console.log('No messages with traces found in database');
    }

    console.log('\n✅ Message trace functionality test completed!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
if (require.main === module) {
  testMessageTraceFunctionality().catch(console.error);
}
