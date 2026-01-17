# Trace Module Mermaid Integration

This module now supports automatic generation of Mermaid diagrams from trace data.

## Features

- **Automatic Diagram Generation**: Converts trace trees into visual Mermaid flowcharts
- **Multiple Diagram Types**: Supports both flowcharts and sequence diagrams
- **Customizable Output**: Configurable themes, directions, and display options
- **File Persistence**: Saves diagrams as markdown files with embedded Mermaid code
- **Fallback Support**: Falls back to console output if file saving fails

## Usage

### Basic Setup

```typescript
import { TraceModule } from './src/trace/trace.module';

@Module({
  imports: [
    TraceModule.forRoot({
      saveTracesAsMermaid: true,
      tracesOutputDir: './traces',
      mermaidOptions: {
        theme: 'forest',
        direction: 'TB',
        showDurations: true,
        showPayloads: false
      }
    })
  ]
})
export class AppModule {}
```

### Configuration Options

```typescript
interface TraceModuleOptions {
  storage?: TraceStorage;
  saveTracesAsMermaid?: boolean;        // Enable/disable Mermaid generation
  mermaidOptions?: MermaidOptions;      // Mermaid-specific options
  tracesOutputDir?: string;             // Output directory for trace files
}

interface MermaidOptions {
  theme?: 'default' | 'forest' | 'dark' | 'neutral';
  direction?: 'TB' | 'TD' | 'BT' | 'RL' | 'LR';
  showDurations?: boolean;              // Show execution times on nodes
  showPayloads?: boolean;               // Show payload information
}
```

## Generated Output

Each trace generates a markdown file with:

1. **Header Information**: Timestamp, HTTP method, URL
2. **Mermaid Diagram**: Visual representation of the trace tree
3. **Raw JSON Data**: Complete trace data for detailed analysis

### Example Output File

```markdown
# Trace Diagram

Generated: 2024-01-15T10:30:45.123Z
Method: POST
URL: /api/documents/search

```mermaid
%%{init: {"theme": "forest"}}%%
graph TB

    AppModule_0_a1b2c[AppModule
(150.23ms)]
    AppModule_0_a1b2c --> DocumentController_1_d3e4f[DocumentController.search
(120.45ms)]
    DocumentController_1_d3e4f --> SearchService_2_g5h6i[SearchService.execute
(85.67ms)]
    SearchService_2_g5h6i --> Database_3_j7k8l[Database.query
(45.23ms)]
```

## Trace Data (JSON)

```json
{
  "name": "AppModule",
  "start": 1234567890,
  "end": 1234567900,
  "duration": 150.23,
  "children": [
    {
      "name": "DocumentController.search",
      "duration": 120.45,
      "children": [...]
    }
  ]
}
```

## Available Themes

- `default` - Standard Mermaid theme
- `forest` - Green-themed forest style  
- `dark` - Dark mode theme
- `neutral` - Neutral color palette

## Diagram Directions

- `TB` - Top to Bottom (default)
- `TD` - Top Down (same as TB)
- `BT` - Bottom to Top
- `RL` - Right to Left
- `LR` - Left to Right

## Best Practices

1. **Enable for Development**: Use Mermaid generation during development for debugging
2. **Disable in Production**: Consider disabling file generation in production environments
3. **Organize Output**: Use descriptive output directories based on environment
4. **Monitor Disk Space**: Regularly clean up old trace files in high-traffic applications

## Example Implementation

```typescript
// main.ts or app.module.ts
import { TraceModule } from './src/trace/trace.module';

const traceOptions = {
  saveTracesAsMermaid: process.env.NODE_ENV === 'development',
  tracesOutputDir: process.env.TRACE_OUTPUT_DIR || './traces/dev',
  mermaidOptions: {
    theme: 'forest',
    showDurations: true,
    showPayloads: false
  }
};

@Module({
  imports: [
    TraceModule.forRoot(traceOptions),
    // ... other modules
  ]
})
export class AppModule {}
```