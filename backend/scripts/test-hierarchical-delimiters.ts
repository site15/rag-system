#!/usr/bin/env node

/**
 * Test script to demonstrate hierarchical delimiter splitting
 */

// Mock the logger to avoid environment variable issues
const mockLogger2 = {
  logInfo: (message: string, data?: any) => {
    // Silent logging for tests
  }
};

class TestRAGSearcher {
  // Simplified version of the hierarchical splitting logic
  static splitTextWithHierarchicalDelimiters(
    text: string,
    maxLength: number = 1000,
    offset: number = 0
  ) {
    // Try first delimiter: \n\
    const firstDelimiterChunks = this.trySplitByDelimiter(text, '\n\\', maxLength, offset);
    if (firstDelimiterChunks.length > 1) {
      console.log(`✅ Split by '\\n\\' delimiter into ${firstDelimiterChunks.length} chunks`);
      return firstDelimiterChunks;
    }
    
    // Try second delimiter: space
    const secondDelimiterChunks = this.trySplitByDelimiter(text, ' ', maxLength, offset);
    if (secondDelimiterChunks.length > 1) {
      console.log(`✅ Split by ' ' delimiter into ${secondDelimiterChunks.length} chunks`);
      return secondDelimiterChunks;
    }
    
    // Fall back to basic chunking
    console.log(`ℹ️  Falling back to basic chunking`);
    return this.splitTextIntoChunksBasic(text, maxLength, offset);
  }

  static trySplitByDelimiter(
    text: string,
    delimiter: string,
    maxLength: number,
    offset: number
  ) {
    const parts = text.split(delimiter);
    const chunks = [];
    
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
      
      if (current.length + token.length > maxLength) {
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
    
    return chunks;
  }

  static splitTextIntoChunksBasic(
    text: string,
    maxLength: number = 1000,
    offset: number = 0
  ) {
    const chunks = [];
    let start = 0;
    let currentOffset = offset;
    while (start < text.length) {
      const end = Math.min(start + maxLength, text.length);
      const chunkContent = text.slice(start, end);
      chunks.push({
        content: chunkContent,
        meta: {
          loc: {
            lines: {
              from: currentOffset + start,
              to: currentOffset + end
            }
          }
        }
      });
      start = end;
    }
    return chunks;
  }
}

function testHierarchicalDelimiters() {
  console.log('🧪 Testing Hierarchical Delimiter Splitting...\n');
  
  // Test 1: Text that can be split by \n\ delimiter
  console.log('Test 1: Splitting by \\n\\ delimiter');
  const testText1 = "First line\\n\\Second line\\n\\Third line\\n\\Fourth line";
  console.log('Input text:', testText1);
  console.log('Length:', testText1.length);
  
  const chunks1 = TestRAGSearcher.splitTextWithHierarchicalDelimiters(testText1, 30);
  console.log('Result chunks:');
  chunks1.forEach((chunk, index) => {
    console.log(`  Chunk ${index + 1}: "${chunk.content}" (positions ${chunk.meta.loc.lines.from}-${chunk.meta.loc.lines.to})`);
  });
  console.log('');
  
  // Test 2: Text that cannot be split by \n\ but can be split by space
  console.log('Test 2: Splitting by space delimiter');
  const testText2 = "This is a long sentence with many words that should be split by spaces when line breaks don't work";
  console.log('Input text:', testText2);
  console.log('Length:', testText2.length);
  
  const chunks2 = TestRAGSearcher.splitTextWithHierarchicalDelimiters(testText2, 40);
  console.log('Result chunks:');
  chunks2.forEach((chunk, index) => {
    console.log(`  Chunk ${index + 1}: "${chunk.content}" (positions ${chunk.meta.loc.lines.from}-${chunk.meta.loc.lines.to})`);
  });
  console.log('');
  
  // Test 3: Text that requires basic chunking (no good delimiters)
  console.log('Test 3: Falling back to basic chunking');
  const testText3 = "SupercalifragilisticexpialidociousAntidisestablishmentarianismPneumonoultramicroscopicsilicovolcanoconiosis";
  console.log('Input text:', testText3);
  console.log('Length:', testText3.length);
  
  const chunks3 = TestRAGSearcher.splitTextWithHierarchicalDelimiters(testText3, 30);
  console.log('Result chunks:');
  chunks3.forEach((chunk, index) => {
    console.log(`  Chunk ${index + 1}: "${chunk.content}" (positions ${chunk.meta.loc.lines.from}-${chunk.meta.loc.lines.to})`);
  });
  console.log('');
  
  // Test 4: Real-world example with mixed content
  console.log('Test 4: Mixed content example');
  const testText4 = `Introduction to the topic\\n\\Main content with various ideas and concepts\\n\\Conclusion and summary of findings`;
  console.log('Input text length:', testText4.length);
  
  const chunks4 = TestRAGSearcher.splitTextWithHierarchicalDelimiters(testText4, 50);
  console.log('Result chunks:');
  chunks4.forEach((chunk, index) => {
    const preview = chunk.content.length > 30 ? chunk.content.substring(0, 30) + '...' : chunk.content;
    console.log(`  Chunk ${index + 1}: "${preview}" (positions ${chunk.meta.loc.lines.from}-${chunk.meta.loc.lines.to})`);
  });
  
  console.log('\n✅ All hierarchical delimiter tests completed!');
}

// Run the test
if (require.main === module) {
  testHierarchicalDelimiters();
}