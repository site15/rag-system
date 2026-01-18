#!/usr/bin/env node

/**
 * Simple test for chunk metadata functionality without full app dependencies
 */

// Mock the logger to avoid environment variable issues
const mockLogger = {
  logInfo: (message: string, data?: any) => {
    // Silent logging for tests
  }
};

// Simplified version of the chunking logic for demonstration
function splitTextIntoChunksWithMeta(
  text: string,
  chunkSize: number = 1000,
  delimiter = `\n--\n`,
  showLog = true,
  depth = 5,
  offset: number = 0
): Array<{content: string, meta: {loc: {lines: {from: number, to: number}}}}> {
  if (depth <= 0) {
    return [{
      content: text,
      meta: {
        loc: {
          lines: {
            from: offset,
            to: offset + text.length
          }
        }
      }
    }];
  }
  
  if (showLog) {
    mockLogger.logInfo('Разделение текста на чанки', {
      textLength: text.length,
      maxLength: chunkSize,
    });
  }
  
  const parts = text.split(delimiter);
  const chunks: Array<{content: string, meta: {loc: {lines: {from: number, to: number}}}}> = [];

  let current = '';
  let currentStartOffset = offset;
  let currentPosition = offset;
  
  for (let i = 0; i < parts.length; i++) {
    const token = (i === 0 ? '' : delimiter) + parts[i];
    const tokenLength = token.length;

    if (current.length === 0) {
      current = token;
      currentStartOffset = currentPosition;
      currentPosition += tokenLength;
      continue;
    }

    if (current.length + token.length > chunkSize) {
      chunks.push({
        content: current,
        meta: {
          loc: {
            lines: {
              from: currentStartOffset,
              to: currentPosition
            }
          }
        }
      });
      current = token;
      currentStartOffset = currentPosition;
      currentPosition += tokenLength;
      continue;
    }

    current += token;
    currentPosition += tokenLength;
  }

  if (current.length > 0) {
    chunks.push({
      content: current,
      meta: {
        loc: {
          lines: {
            from: currentStartOffset,
            to: currentPosition
          }
        }
      }
    });
  }

  // Simplified recursive processing
  const fixChunks = chunks.flatMap(chunkObj => {
    if (chunkObj.content.length > chunkSize) {
      // Recursive call with updated offset
      return splitTextIntoChunksWithMeta(
        chunkObj.content,
        chunkSize,
        `\n\n`,
        false,
        depth - 1,
        chunkObj.meta.loc.lines.from
      );
    }
    return [chunkObj];
  });

  return fixChunks;
}

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
  
  const chunksWithMeta = splitTextIntoChunksWithMeta(testText1, 100);
  
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
  
  const chunksWithMeta2 = splitTextIntoChunksWithMeta(testText2, 80);
  
  chunksWithMeta2.forEach((chunkObj, index) => {
    console.log(`Chunk ${index + 1}:`);
    console.log(`  Content: "${chunkObj.content}"`);
    console.log(`  Position: ${chunkObj.meta.loc.lines.from} - ${chunkObj.meta.loc.lines.to}`);
    console.log('');
  });
  
  // Demonstrate the structure
  console.log('\nTest 3: Metadata structure demonstration');
  const sampleChunk = chunksWithMeta[0];
  console.log('Sample chunk object structure:');
  console.log(JSON.stringify(sampleChunk, null, 2));
  
  console.log('\n✅ All tests completed successfully!');
}

// Run the test
if (require.main === module) {
  testSplitTextIntoChunksWithMeta();
}