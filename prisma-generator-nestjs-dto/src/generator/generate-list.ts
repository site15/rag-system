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

  // Map Prisma types to React Admin input components
  const getColumnComponent = (field: (typeof model.fields)[0]): string => {
    switch (field.type) {
      case 'Int':
      case 'Float':
      case 'Decimal':
        return 'NumberCol';
      default:
        return 'Col';
    }
  };

  // Get all scalar fields for the table columns
  const scalarFields = model.fields.filter(
    (field) =>
      field.kind === 'scalar' &&
      field.name !== 'createdAt' &&
      field.name !== 'updatedAt',
  );

  return `import { DataTable, DeleteButton, EditButton, List, BooleanField, DateField } from "react-admin";
import { Prisma } from "../prisma/browser";

import ReactJson from 'react-json-view';
import { useRecordContext } from 'react-admin';

const JsonViewerField = ({ source }) => {
    const record = useRecordContext();
    if (!record || !record[source]) return null;
    return (
        <ReactJson 
            src={record[source]} 
            collapsed={true} 
            theme="monokai"
            displayDataTypes={false}
        />
    );
};

export const ${listName} = () => (
  <List>
    <DataTable>
${scalarFields
  .map((field) => {
    const columnType = getColumnComponent(field);
    const multiline =
      field.nativeType?.[0] === 'Text'
        ? `sx={{
                    display: 'inline-block',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }} `
        : '';
    switch (field.type) {
      case 'Json':
        return `      <DataTable.${columnType} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}><JsonViewerField source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} /></DataTable.${columnType}>`;
      case 'Int':
      case 'Float':
      case 'Decimal':
        return `      <DataTable.${columnType} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} />`;
      case 'Boolean':
        return `      <DataTable.${columnType} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}><BooleanField source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} /></DataTable.${columnType}>`;
      case 'DateTime':
        return `      <DataTable.${columnType} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}><DateField source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} showTime /></DataTable.${columnType}>`;
      default:
        return `      <DataTable.${columnType} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} ${multiline}/>`;
    }
  })
  .join('\n')}
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
`;
};
