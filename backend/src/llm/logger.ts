// logger.ts
import * as fs from 'fs';
import * as path from 'path';

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

// Async file writer queue to prevent blocking
class AsyncFileWriter {
  private static logQueue: string[] = [];
  private static isWriting = false;
  private static logDir = path.join(process.cwd(), 'logs');

  // Ensure log directory exists
  private static ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  // Get current date-based log file path
  private static getLogFilePath(): string {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    return path.join(this.logDir, `${dateString}.log`);
  }

  // Process the queue asynchronously
  private static async processQueue() {
    if (this.isWriting || this.logQueue.length === 0) {
      return;
    }

    this.isWriting = true;
    this.ensureLogDirectory();

    while (this.logQueue.length > 0) {
      const logEntry = this.logQueue.shift();
      if (logEntry) {
        try {
          // Use setImmediate to yield to event loop and prevent blocking
          await new Promise<void>((resolve) => {
            setImmediate(() => {
              fs.appendFileSync(this.getLogFilePath(), logEntry + '\n', {
                encoding: 'utf8',
              });
              resolve();
            });
          });
        } catch (error) {
          // If file write fails, log to console as fallback
          console.error('Failed to write to log file:', error);
        }
      }
    }

    this.isWriting = false;
  }

  // Add log entry to queue
  public static enqueue(logEntry: string) {
    this.logQueue.push(logEntry);
    // Start processing if not already running
    if (!this.isWriting) {
      setImmediate(() => this.processQueue());
    }
  }
}

export class Logger {
  public static log(level: LogLevel, message: string, meta?: any, stack?: any) {
    if (meta && typeof meta === 'object' && meta.stack) {
      stack = meta.stack;
      meta = undefined;
    }
    const time = new Date().toISOString();
    const stackPayload = stack ? `\n${stack}` : '';
    const consolePayload = meta ? ` | ${JSON.stringify(meta)}` : '';
    const consoleMessage = `[${time}] [${level}] ${message}${consolePayload}`;

    // Log to console immediately
    console.log(consoleMessage);
    if (stack) {
      console.error(stackPayload);
    }

    // Log to file only if file logging is enabled
    if (process.env.ENABLE_FILE_LOGGING === 'true') {
      // Log to file asynchronously (non-blocking) with different format
      let fileLogEntry = `[${time}] [${level}] ${message.trim()}`;
      if (meta) {
        if (typeof meta === 'object') {
          for (const [key, value] of Object.entries(meta)) {
            fileLogEntry += `\n${key}: ${
              typeof value === 'object' ? JSON.stringify(value) : String(value)
            }`;
          }
        } else {
          fileLogEntry += `\n${String(meta)}`;
        }
        fileLogEntry += '\n';
      } else {
        fileLogEntry += '\n';
      }
      AsyncFileWriter.enqueue(fileLogEntry);
    }
  }

  public static logInfo = (msg: string, meta?: any) =>
    Logger.log(LogLevel.INFO, msg, meta);
  public static logWarn = (msg: string, meta?: any) =>
    Logger.log(LogLevel.WARN, msg, meta);
  public static logError = (msg: string, meta?: any, stack?: any) =>
    Logger.log(LogLevel.ERROR, msg, meta, stack);
}
