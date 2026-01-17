#!/usr/bin/env node

// Test script for trace mermaid functionality
import { TraceModule, Trace, traceRun, getTraceStorage, AlsTraceStorage } from '../src/trace/trace.module';
import { MermaidGenerator } from '../src/trace/mermaid-generator';
import * as fs from 'fs';

// Mock execution context for testing
class MockExecutionContext {
  switchToHttp() {
    return {
      getRequest: () => ({
        method: 'GET',
        url: '/test/endpoint'
      })
    };
  }
}

// Test service with traced methods
class TestService {
  @Trace('database-query')
  async queryDatabase() {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { result: 'data' };
  }

  @Trace('business-logic')
  async processData(data: any) {
    await new Promise(resolve => setTimeout(resolve, 30));
    return { processed: data.result.toUpperCase() };
  }

  @Trace('api-handler')
  async handleRequest() {
    const data = await this.queryDatabase();
    const result = await this.processData(data);
    return result;
  }
}

async function runTest() {
  console.log('🧪 Testing Trace Mermaid Generation...');
  
  // Set up trace storage
  const storage = new AlsTraceStorage();
  const mockStorage = {
    getStore: () => storage.getStore(),
    run: (store: any, fn: () => any) => storage.run(store, fn)
  };
  
  // Create trace store
  const store: any = { stack: [] };
  
  try {
    // Run traced operation
    const result = await mockStorage.run(store, async () => {
      const service = new TestService();
      return await service.handleRequest();
    });
    
    console.log('✅ Trace completed successfully');
    console.log('Result:', result);
    
    if (store.root) {
      // Test Mermaid generation
      const mermaidOptions: any = {
        theme: 'forest',
        direction: 'TB',
        showDurations: true,
        showPayloads: false
      };
      
      const mermaidContent = MermaidGenerator.generateFlowchart(store, mermaidOptions);
      console.log('\n📊 Generated Mermaid Diagram:');
      console.log(mermaidContent);
      
      // Test file saving
      const testDir = './test-traces';
      const filename = `test_trace_${new Date().toISOString().replace(/[:.]/g, '-')}.md`;
      const filepath = `${testDir}/${filename}`;
      
      const markdownContent = `# Test Trace Diagram

Generated: ${new Date().toISOString()}
Method: TEST
URL: /test/endpoint

${mermaidContent}

## Trace Data (JSON)

\`\`\`json
${JSON.stringify(store.root || {}, null, 2)}
\`\`\``;
      
      await MermaidGenerator.saveToFile(markdownContent, filepath);
      console.log(`\n💾 Trace saved to: ${filepath}`);
      
      // Verify file was created
      if (fs.existsSync(filepath)) {
        console.log('✅ File creation verified');
        // Clean up test file
        fs.unlinkSync(filepath);
        console.log('🧹 Test file cleaned up');
      }
      
      return true;
    } else {
      console.log('❌ No trace root found');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  }
}

// Run the test
if (require.main === module) {
  runTest().then(success => {
    process.exit(success ? 0 : 1);
  });
}