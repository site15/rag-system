import { kebab, pascal } from 'case';
import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

export const generateForm = ({
  controller,
  templateHelpers,
}: ModelParams & { templateHelpers: TemplateHelpers }): string => {
  const { model } = controller;
  const { entityName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const editFormName = `${entityClassName}EditForm`;
  const showFormName = `${entityClassName}ShowForm`;
  const createFormName = `${entityClassName}CreateForm`;

  // Get fields for different form types
  const allFields = model.fields.filter((field) => field.kind === 'scalar');
  const editableFields = allFields.filter(
    (field) =>
      !field.isId && field.name !== 'createdAt' && field.name !== 'updatedAt',
  );
  const readOnlyFields = allFields.filter(
    (field) =>
      field.isId || field.name === 'createdAt' || field.name === 'updatedAt',
  );

  // Map Prisma types to React Admin input components
  const getInputComponent = (field: (typeof allFields)[0]): string => {
    switch (field.type) {
      case 'String':
        return 'TextInput';
      case 'Int':
      case 'Float':
      case 'Decimal':
        return 'NumberInput';
      case 'Boolean':
        return 'BooleanInput';
      case 'DateTime':
        return 'DateTimeInput';
      default:
        return 'TextInput';
    }
  };

  // Generate input fields for create form (only editable fields)
  const createFormFields = editableFields
    .map((field) => {
      const component = getInputComponent(field);
      return `      <${component} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} />`;
    })
    .join('\n');

  // Generate input fields for edit form (editable + read-only)
  const editFormFields = [
    ...readOnlyFields.map((field) => {
      const component = getInputComponent(field);
      return `      <${component}
        source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}
        readOnly={true}
      />`;
    }),
    ...editableFields.map((field) => {
      const component = getInputComponent(field);
      return `      <${component} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}} />`;
    }),
  ].join('\n');

  return `import {
  BooleanInput,
  Create,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

import { Prisma } from "../prisma/browser";

export const ${editFormName} = () => (
  <Edit>
    <SimpleForm>
${editFormFields}
    </SimpleForm>
  </Edit>
);

export const ${showFormName} = () => (
  <Edit>
    <SimpleForm>
${editFormFields}
    </SimpleForm>
  </Edit>
);

export const ${createFormName} = () => (
  <Create>
    <SimpleForm>
${createFormFields}
    </SimpleForm>
  </Create>
);
`;
};
