export function removeCodeWrappers(code?: string | null): string {
  return code?.split('```').join('') || '';
}
