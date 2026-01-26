// textHelpers.ts
import crypto from 'crypto';
// import { normalizeText } from 'normalize-text';

export class TextHelpers {
  public static normalizeTextMy(text: string): string {
    const str = text
      .split(`\n--\n`)
      .join('')
      .split(`\n\n\n`)
      .join('')
      .split(`\n`)
      .map((s) => s.replace(/\s+/g, ' ')?.trim())
      .join('\n')
      ?.trim();
    // special case in my data
    return str.replace(/—{3,}/g, '—');
  }

  public static hashContent(text: string): string {
    return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
  }

  public static concat(str: string[], emptyText: string = '') {
    return str.length > 0 ? str.join('\n') : emptyText;
  }
}
