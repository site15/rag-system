import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';
import { DATABASE_CONFIG } from './constants';
import { Logger } from './logger';

dotenv.config();

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    const {
      DB_HOST = DATABASE_CONFIG.DEFAULT_HOST,
      DB_PORT = DATABASE_CONFIG.DEFAULT_PORT,
      DB_USER = DATABASE_CONFIG.DEFAULT_USER,
      DB_PASSWORD = DATABASE_CONFIG.DEFAULT_PASSWORD,
      DB_NAME = DATABASE_CONFIG.DEFAULT_NAME,
    } = process.env;

    this.pool = new Pool({
      host: DB_HOST,
      port: parseInt(DB_PORT, 10),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    // Handle pool errors
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(DATABASE_CONFIG.ERROR_EXIT_CODE);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  public async query(text: string, params?: any[]) {
    const client = await this.getClient();
    try {
      // Logger.logInfo("Executing query", { query: text, params });
      const result = await client.query(text, params);
      return result;
    } catch (e) {
      // Logger.logError(
      //   "Error executing query",
      //   { query: text, params },
      //   (e as Error).stack
      // );
      throw e;
    } finally {
      client.release();
    }
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}
