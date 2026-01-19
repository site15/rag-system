#!/usr/bin/env node

/**
 * Test script to demonstrate retry logic with delay
 */

async function simulateEmbeddingCreation(shouldFail: boolean = false): Promise<void> {
  if (shouldFail) {
    throw new Error('Simulated embedding creation error');
  }
  console.log('✅ Embedding created successfully');
}

async function testRetryLogic() {
  console.log('🧪 Testing Retry Logic with 2-second delays...\n');
  
  // Test 1: Successful operation (no retry needed)
  console.log('Test 1: Successful operation');
  const startTime1 = Date.now();
  
  let retryCount1 = 0;
  const maxRetries1 = 1;
  
  while (retryCount1 <= maxRetries1) {
    try {
      await simulateEmbeddingCreation(false); // Should succeed
      console.log('✅ Operation completed successfully');
      break;
    } catch (error) {
      retryCount1++;
      if (retryCount1 <= maxRetries1) {
        console.log(`⚠️  Attempt ${retryCount1} failed, retrying in 2 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.log('❌ All retry attempts failed');
      }
    }
  }
  
  const duration1 = Date.now() - startTime1;
  console.log(`⏱️  Total time: ${duration1}ms\n`);
  
  // Test 2: Failed operation with retry
  console.log('Test 2: Failed operation with retry');
  const startTime2 = Date.now();
  
  let retryCount2 = 0;
  const maxRetries2 = 1;
  
  while (retryCount2 <= maxRetries2) {
    try {
      console.log(`🔄 Attempt ${retryCount2 + 1}`);
      await simulateEmbeddingCreation(true); // Should fail
      console.log('✅ Operation completed successfully');
      break;
    } catch (error) {
      retryCount2++;
      if (retryCount2 <= maxRetries2) {
        console.log(`⚠️  Attempt ${retryCount2} failed: ${error.message}`);
        console.log('⏳ Waiting 2 seconds before retry...');
        const waitStart = Date.now();
        await new Promise(resolve => setTimeout(resolve, 2000));
        const waitDuration = Date.now() - waitStart;
        console.log(`⏰ Waited ${waitDuration}ms`);
      } else {
        console.log(`❌ All ${maxRetries2 + 1} attempts failed: ${error.message}`);
      }
    }
  }
  
  const duration2 = Date.now() - startTime2;
  console.log(`⏱️  Total time: ${duration2}ms (approximately 2000ms for retry delay)\n`);
  
  // Test 3: Multiple operations showing continue behavior
  console.log('Test 3: Processing multiple chunks (simulating continue behavior)');
  const chunks = ['chunk1', 'chunk2', 'chunk3'];
  
  for (let i = 0; i < chunks.length; i++) {
    console.log(`\n📝 Processing ${chunks[i]} (chunk ${i + 1}/${chunks.length})`);
    
    let retryCount = 0;
    const maxRetries = 1;
    
    while (retryCount <= maxRetries) {
      try {
        // Simulate some chunks failing
        const shouldFail = (i === 1 && retryCount === 0); // Second chunk fails first attempt
        await simulateEmbeddingCreation(shouldFail);
        console.log(`✅ ${chunks[i]} processed successfully`);
        break;
      } catch (error) {
        retryCount++;
        if (retryCount <= maxRetries) {
          console.log(`⚠️  ${chunks[i]} failed, retrying in 2 seconds...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } else {
          console.log(`❌ ${chunks[i]} failed after all retries, moving to next chunk`);
          break; // Continue with next chunk (don't throw)
        }
      }
    }
  }
  
  console.log('\n✅ All retry tests completed successfully!');
}

// Run the test
if (require.main === module) {
  testRetryLogic().catch(console.error);
}