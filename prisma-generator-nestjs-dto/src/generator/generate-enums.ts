import { DMMF } from '@prisma/generator-helper';
import { WritableDeep } from 'type-fest';
import { camel } from 'case';
import { each } from './template-helpers';

export const generateEnums = (
  enumModels: WritableDeep<DMMF.DatamodelEnum>[],
) => `
${each(
  enumModels,
  (model) => `
export const ${camel(model.name)} = [${each(model.values, (v) => `'${v.name}'`, ', ')}] as const;
export type ${model.name} = (typeof ${camel(model.name)})[number];
`,
  '\n',
)}
`;
