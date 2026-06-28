export const pickDtoFields = <T extends Record<string, unknown>>(
  data: Record<string, unknown>,
  fields: readonly string[],
): T => Object.fromEntries(fields.map((field) => [field, data[field]])) as T;
