// mermaid-generator.ts
import { TraceNode, TraceStore } from './trace.module';
import * as fs from 'fs';
import * as path from 'path';

export interface MermaidOptions {
  outputFile?: string;
  theme?: 'default' | 'forest' | 'dark' | 'neutral';
  direction?: 'TB' | 'TD' | 'BT' | 'RL' | 'LR';
  showDurations?: boolean;
  showPayloads?: boolean;
}

export class MermaidGenerator {
  static generateFlowchart(
    traceStore: TraceStore,
    options: MermaidOptions = {},
  ): string {
    const {
      theme = 'default',
      direction = 'TB',
      showDurations = true,
      showPayloads = false,
    } = options;

    if (!traceStore.root) {
      return '';
    }

    const lines: string[] = [];

    // Add header
    lines.push('```mermaid');
    lines.push(`%%{init: {"theme": "${theme}"}}%%`);
    lines.push(`graph ${direction}`);
    lines.push('');

    // Generate nodes and connections
    this.generateNodes(traceStore.root, lines, 0, showDurations, showPayloads);

    lines.push('```');

    return lines.join('\n');
  }

  private static generateNodes(
    node: TraceNode,
    lines: string[],
    level: number,
    showDurations: boolean,
    showPayloads: boolean,
  ): void {
    const nodeId = this.getNodeId(node, level);
    const nodeLabel = this.formatNodeLabel(node, showDurations, showPayloads);

    // Add node definition
    lines.push(`    ${nodeId}[${nodeLabel}]`);

    // Process children
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const childId = this.getNodeId(child, level + 1);

      // Add connection
      lines.push(`    ${nodeId} --> ${childId}`);

      // Recursively process child
      this.generateNodes(child, lines, level + 1, showDurations, showPayloads);
    }
  }

  private static getNodeId(node: TraceNode, level: number): string {
    // Create a safe identifier for the node
    const cleanName = node.name.replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 30);
    return `${cleanName}_${level}_${Math.random().toString(36).substr(2, 5)}`;
  }

  private static formatNodeLabel(
    node: TraceNode,
    showDurations: boolean,
    showPayloads: boolean,
  ): string {
    let label = node.name;

    // Add duration if available and requested
    if (showDurations && node.duration !== undefined) {
      label += `\\n(${node.duration.toFixed(2)}ms)`;
    }

    // Add payload info if requested and available
    if (showPayloads && node.payload) {
      const payloadKeys = Object.keys(node.payload);
      if (payloadKeys.length > 0) {
        label += `\\n[${payloadKeys.join(', ')}]`;
      }
    }

    // Escape special characters for Mermaid
    return `"${label.replace(/"/g, '&quot;')}"`;
  }

  static async saveToFile(content: string, filePath: string): Promise<void> {
    try {
      // Ensure directory exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write file
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Mermaid diagram saved to: ${filePath}`);
    } catch (error) {
      console.error(`Failed to save Mermaid diagram to ${filePath}:`, error);
      throw error;
    }
  }

  static generateSequenceDiagram(
    traceStore: TraceStore,
    options: MermaidOptions = {},
  ): string {
    const {
      theme = 'default',
      showDurations = true,
      showPayloads = false,
    } = options;

    if (!traceStore.root) {
      return '';
    }

    const lines: string[] = [];

    // Add header
    lines.push('```mermaid');
    lines.push(`%%{init: {"theme": "${theme}"}}%%`);
    lines.push('sequenceDiagram');
    lines.push('    participant Client');
    lines.push('');

    // Generate sequence
    this.generateSequence(
      traceStore.root,
      lines,
      'Client',
      showDurations,
      showPayloads,
    );

    lines.push('```');

    return lines.join('\n');
  }

  private static generateSequence(
    node: TraceNode,
    lines: string[],
    caller: string,
    showDurations: boolean,
    showPayloads: boolean,
  ): void {
    const callee = node.name.replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 20);

    // Add activation
    lines.push(`    ${caller}->>${callee}: ${node.name}`);

    // Add payload info if requested
    if (showPayloads && node.payload) {
      const payloadStr = JSON.stringify(node.payload).substring(0, 50);
      lines.push(`    note right of ${callee}: Payload: ${payloadStr}`);
    }

    // Add duration if requested
    if (showDurations && node.duration !== undefined) {
      lines.push(
        `    note right of ${callee}: Duration: ${node.duration.toFixed(2)}ms`,
      );
    }

    // Process children
    for (const child of node.children) {
      this.generateSequence(child, lines, callee, showDurations, showPayloads);
    }

    // Add deactivation
    lines.push(`    ${callee}-->>${caller}: Return`);
  }
}
