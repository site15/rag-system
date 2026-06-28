import { randomUUID } from 'crypto';
import { createHashFromString } from './create-hash-from-string';

export const getRandomSha7 = () =>
  createHashFromString(Date.now().toString() + randomUUID().toString()).slice(
    0,
    7,
  );
