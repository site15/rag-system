// textHelpers.ts
import crypto from 'crypto';
// import { normalizeText } from 'normalize-text';

export class TextHelpers {
  public static normalizeTextMy(text: string): string {
    return text
      .split(`\n--\n`)
      .join('')
      .split(`\n\n\n`)
      .join('')
      .split(`\n`)
      .map((s) => s.replace(/\s+/g, ' ').trim())
      .join('\n')
      .trim();
  }

  public static prepareTextForEmbedding(text: string): string {
    return text
      .toLowerCase()
      .replace(/<[^>]*>/g, ' ')
      .replace(/\t+/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s.,!?-]/g, '')
      .trim();
  }

  public static hashContent(text: string): string {
    return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
  }
}
