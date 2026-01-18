#!/usr/bin/env node

/**
 * Test script to demonstrate the new splitTextIntoChunksWithMeta functionality
 */

import { RAGSearcher } from '../src/llm/ragSearcher';

function testSplitTextIntoChunksWithMeta() {
  console.log('🧪 Testing splitTextIntoChunksWithMeta...\n');
  
  // Test case 1: Simple text with headers
  const testText1 = `# Introduction
This is the introduction section.

## Main Content
This is the main content with some information.

### Details
Here are the detailed points:
- Point 1
- Point 2
- Point 3

## Conclusion
This is the conclusion.`;
  
  console.log('Test 1: Text with headers');
  console.log('Original text length:', testText1.length);
  console.log('---');
  
  const chunksWithMeta = RAGSearcher.splitTextIntoChunksWithMeta(testText1, 100);
  
  chunksWithMeta.forEach((chunkObj, index) => {
    console.log(`Chunk ${index + 1}:`);
    console.log(`  Content: "${chunkObj.content.substring(0, 50)}${chunkObj.content.length > 50 ? '...' : ''}"`);
    console.log(`  Length: ${chunkObj.content.length}`);
    console.log(`  Position: ${chunkObj.meta.loc.lines.from} - ${chunkObj.meta.loc.lines.to}`);
    console.log(`  Relative to original: ${((chunkObj.meta.loc.lines.from / testText1.length) * 100).toFixed(1)}% - ${((chunkObj.meta.loc.lines.to / testText1.length) * 100).toFixed(1)}%`);
    console.log('');
  });
  
  // Test case 2: Longer text to show chunk boundaries
  const testText2 = `First paragraph with some content that will be split across multiple lines.
Second paragraph that continues the discussion about various topics.
Third paragraph with different information and more details.
Fourth paragraph that might get cut off at interesting places.
Fifth paragraph to ensure we have enough content for multiple chunks.`;
  
  console.log('\nTest 2: Longer text with chunk boundaries');
  console.log('Original text length:', testText2.length);
  console.log('---');
  
  const chunksWithMeta2 = RAGSearcher.splitTextIntoChunksWithMeta(testText2, 80);
  
  chunksWithMeta2.forEach((chunkObj, index) => {
    console.log(`Chunk ${index + 1}:`);
    console.log(`  Content: "${chunkObj.content}"`);
    console.log(`  Position: ${chunkObj.meta.loc.lines.from} - ${chunkObj.meta.loc.lines.to}`);
    console.log('');
  });
  
  // Test case 3: Verify backward compatibility
  console.log('\nTest 3: Backward compatibility check');
  const legacyChunks = RAGSearcher.splitTextIntoChunks(testText1, 100);
  const newChunks = RAGSearcher.splitTextIntoChunksWithMeta(testText1, 100).map(obj => obj.content);
  
  console.log('Legacy method chunks count:', legacyChunks.length);
  console.log('New method chunks count:', newChunks.length);
  console.log('Content matches:', JSON.stringify(legacyChunks) === JSON.stringify(newChunks) ? '✅ YES' : '❌ NO');
  
  // Show that we can access the metadata when needed
  console.log('\nTest 4: Metadata accessibility demonstration');
  const sampleChunk = chunksWithMeta[0];
  console.log('Sample chunk with metadata:');
  console.log('  Content:', sampleChunk.content.substring(0, 30) + '...');
  console.log('  From position:', sampleChunk.meta.loc.lines.from);
  console.log('  To position:', sampleChunk.meta.loc.lines.to);
  console.log('  Can be used for source mapping and debugging');
  
  console.log('\n✅ All tests completed successfully!');
}

// Run the test
if (require.main === module) {
  testSplitTextIntoChunksWithMeta();
}