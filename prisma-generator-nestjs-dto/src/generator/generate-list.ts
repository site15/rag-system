import { kebab, pascal } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

export const generateList = ({
  controller,
  templateHelpers,
}: ModelParams & { templateHelpers: TemplateHelpers }): string => {
  const { model } = controller;
  const { entityName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const listName = `${entityClassName}List`;

  // Get all scalar fields for the table columns
  const scalarFields = model.fields.filter(
    (field) =>
      field.kind === 'scalar' &&
      field.name !== 'createdAt' &&
      field.name !== 'updatedAt',
  );

  return `import { DataTable, List } from "react-admin";
import { Prisma } from "../prisma/browser";

export const ${listName} = () => (
  <List>
    <DataTable>
${scalarFields.map((field) => `      <DataTable.Col source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} />`).join('\n')}
    </DataTable>
  </List>
);
`;
};
