import * as fs from 'fs';
import * as path from 'path';
import { Logger } from '../logger';
import { DocWithMetadataAndId } from '../types';
import { Category } from './questionTransformer';

export interface PromptLogData {
  dialogId: string;
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
    dialogId: string;
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
