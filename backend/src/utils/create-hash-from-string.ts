import { createHash } from 'crypto';

export const createHashFromString = (string: string) =>
  createHash('sha256').update(string).digest('hex');
