// promptInjectionProtector.ts
export class PromptInjectionProtector {
  private static readonly forbiddenPatterns = [
    'act as',
    'simulate',
    'you are',
    'answer as',
    'pretend',
    'generate',
    'write code',
    'sql',
    'json',
    'script',
  ];

  public static isForbidden(input: string): boolean {
    const lower = input.toLowerCase();
    return PromptInjectionProtector.forbiddenPatterns.some((p) =>
      lower.includes(p),
    );
  }
}
