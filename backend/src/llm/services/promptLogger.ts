import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../logger';
import { DocWithMetadataAndId } from '../types';
import { Category } from './questionTransformer';

export interface PromptLogData {
  dialogId: number;
  question: string;
  transformedQuestion: string;
  sourceFilter?: string | null;
  contextDocs: DocWithMetadataAndId[];
  history: string[];
  category: Category;
  llmModel: string;
  llmProvider: string;
  timestamp: Date;
  userAgent?: string;
  clientIp?: string;
}

export class PromptLogger {
  private static readonly PROMPT_LOGS_DIR = 'prompt_logs';

  /**
   * Creates a detailed prompt log file with full context
   * @param logData - Complete information about the prompt and context
   */
  static async logPrompt(logData: {
    dialogId: number;
    mode: string;
    prompt: string;
  }): Promise<void> {
    try {
      // Ensure prompt logs directory exists
      const logsDir = path.join(process.cwd(), this.PROMPT_LOGS_DIR);
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      // Generate filename with timestamp and dialog ID
      const timestampStr = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `prompt_${timestampStr}_dialog_${logData.dialogId}_${logData.mode}.txt`;
      const filepath = path.join(logsDir, filename);

      // Write to file
      fs.writeFileSync(filepath, logData.prompt, 'utf8');

      Logger.logInfo('Prompt log file created', {
        dialogId: logData.dialogId,
        filepath,
      });
    } catch (error) {
      Logger.logError('Failed to create prompt log file', {
        error: (error as Error).message,
        dialogId: logData.dialogId,
      });
    }
  }

  /**
   * Creates a detailed prompt log file with full context
   * @param logData - Complete information about the prompt and context
   */
  static async logFullPrompt(logData: PromptLogData): Promise<void> {
    try {
      // Ensure prompt logs directory exists
      const logsDir = path.join(process.cwd(), this.PROMPT_LOGS_DIR);
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }

      // Generate filename with timestamp and dialog ID
      const timestampStr = logData.timestamp
        .toISOString()
        .replace(/[:.]/g, '-');
      const filename = `prompt_${timestampStr}_dialog_${logData.dialogId}_${logData.category}.txt`;
      const filepath = path.join(logsDir, filename);

      // Build the full prompt log content
      const logContent = this.buildPromptLogContent(logData);

      // Write to file
      fs.writeFileSync(filepath, logContent, 'utf8');

      Logger.logInfo('Prompt log file created', {
        dialogId: logData.dialogId,
        filepath,
        contextDocsCount: logData.contextDocs.length,
      });
    } catch (error) {
      Logger.logError('Failed to create prompt log file', {
        error: (error as Error).message,
        dialogId: logData.dialogId,
      });
    }
  }

  /**
   * Builds the complete prompt log content with all metadata
   */
  private static buildPromptLogContent(logData: PromptLogData): string {
    const lines: string[] = [];

    // Header
    lines.push('='.repeat(80));
    lines.push('FULL PROMPT LOG');
    lines.push('='.repeat(80));
    lines.push('');

    // Metadata section
    lines.push('METADATA:');
    lines.push('-'.repeat(40));
    lines.push(`Dialog ID: ${logData.dialogId}`);
    lines.push(`Timestamp: ${logData.timestamp.toISOString()}`);
    lines.push(`Mode: ${logData.category}`);
    lines.push(`LLM Model: ${logData.llmModel}`);
    lines.push(`LLM Provider: ${logData.llmProvider}`);
    if (logData.userAgent) {
      lines.push(`User Agent: ${logData.userAgent}`);
    }
    if (logData.clientIp) {
      lines.push(`Client IP: ${logData.clientIp}`);
    }
    if (logData.category) {
      lines.push(`Category: ${logData.category}`);
    }
    if (logData.sourceFilter) {
      lines.push(`Source Filter: ${logData.sourceFilter}`);
    }
    lines.push('');

    // Questions section
    lines.push('QUESTIONS:');
    lines.push('-'.repeat(40));
    lines.push(`Original Question: ${logData.question}`);
    lines.push(`Transformed Question: ${logData.transformedQuestion}`);
    lines.push('');

    // History section
    lines.push('CONVERSATION HISTORY:');
    lines.push('-'.repeat(40));
    if (logData.history.length > 0) {
      logData.history.forEach((msg, index) => {
        lines.push(`[${index + 1}] ${msg}`);
      });
    } else {
      lines.push('(No conversation history)');
    }
    lines.push('');

    // Context documents section
    lines.push('CONTEXT DOCUMENTS:');
    lines.push('-'.repeat(40));
    lines.push(`Total Documents: ${logData.contextDocs.length}`);
    lines.push('');

    logData.contextDocs.forEach((doc, index) => {
      lines.push(`DOCUMENT ${index + 1}:`);
      lines.push(`  ID: ${doc.id}`);
      lines.push(`  Source: ${doc.source}`);
      lines.push(`  From Line: ${doc.fromLine}`);
      lines.push(`  To Line: ${doc.toLine}`);
      lines.push(`  Distance: ${doc.distance}`);
      lines.push(`  Content:`);
      lines.push(`${doc.content}`);
      lines.push('');
    });

    // Footer
    lines.push('='.repeat(80));
    lines.push('END OF PROMPT LOG');
    lines.push('='.repeat(80));

    return lines.join('\n');
  }

  /**
   * Gets the path to the prompt logs directory
   */
  static getPromptLogsDirectory(): string {
    return path.join(process.cwd(), this.PROMPT_LOGS_DIR);
  }

  /**
   * Lists all prompt log files
   */
  static listPromptLogFiles(): string[] {
    try {
      const logsDir = this.getPromptLogsDirectory();
      if (!fs.existsSync(logsDir)) {
        return [];
      }

      return fs
        .readdirSync(logsDir)
        .filter((file) => file.startsWith('prompt_') && file.endsWith('.txt'))
        .sort()
        .reverse(); // Newest first
    } catch (error) {
      Logger.logError('Failed to list prompt log files', {
        error: (error as Error).message,
      });
      return [];
    }
  }

  /**
   * Reads a specific prompt log file
   */
  static readPromptLogFile(filename: string): string | null {
    try {
      const filepath = path.join(this.getPromptLogsDirectory(), filename);
      if (!fs.existsSync(filepath)) {
        return null;
      }

      return fs.readFileSync(filepath, 'utf8');
    } catch (error) {
      Logger.logError('Failed to read prompt log file', {
        error: (error as Error).message,
        filename,
      });
      return null;
    }
  }
}
