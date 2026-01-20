import { TemplateHelpers } from './template-helpers';
import { ModelParams } from './types';

export const generateForm = ({
  controller,
  templateHelpers,
  create,
  update,
}: ModelParams & { templateHelpers: TemplateHelpers }): string => {
  const { model } = controller;
  const { entityName } = templateHelpers;

  const modelName = model.name;
  const entityClassName = entityName(modelName);
  const editFormName = `${entityClassName}EditForm`;
  const showFormName = `${entityClassName}ShowForm`;
  const createFormName = `${entityClassName}CreateForm`;

  // Get fields for different form types
  const allFields = model.fields.filter(
    (field) => field.kind === 'scalar' && field.name !== 'deletedAt',
  );
  const editableFields = allFields.filter(
    (field) =>
      !field.isId &&
      field.name !== 'createdAt' &&
      field.name !== 'updatedAt' &&
      field.name !== 'deletedAt',
  );
  const readOnlyFields = allFields.filter(
    (field) =>
      field.isId ||
      field.name === 'createdAt' ||
      field.name === 'updatedAt' ||
      field.name === 'deletedAt',
  );

  // Map Prisma types to React Admin input components
  const getInputComponent = (field: (typeof allFields)[0]): string => {
    switch (field.type) {
      case 'Json':
        return 'JsonViewerField';
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
    .filter((field) => create.fields.find((f) => f.name === field.name))
    .map((field) => {
      const multiline = field.nativeType?.[0] === 'Text' ? ' multiline' : '';
      const component = getInputComponent(field);
      return `      <${component} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}${multiline} />`;
    })
    .join('\n');

  // Generate input fields for edit form (editable + read-only)
  const editFormFields = [
    ...readOnlyFields
      .filter((field) => update.fields.find((f) => f.name === field.name))
      .map((field) => {
        const multiline = field.nativeType?.[0] === 'Text' ? ' multiline' : '';
        const component = getInputComponent(field);
        return `      <${component}
        source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}
        readOnly={true}${multiline}
      />`;
      }),
    ...editableFields
      .filter((field) => update.fields.find((f) => f.name === field.name))
      .map((field) => {
        const multiline = field.nativeType?.[0] === 'Text' ? ' multiline' : '';
        const component = getInputComponent(field);
        return `      <${component} source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}${multiline} />`;
      }),
  ].join('\n');

  const showFormFields = [
    ...allFields.map((field) => {
      const multiline = field.nativeType?.[0] === 'Text' ? ' multiline' : '';
      const component = getInputComponent(field);
      return `      <${component}
        source={Prisma.${entityClassName}ScalarFieldEnum.${field.name}}
        readOnly={true}${multiline}
      />`;
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

import ReactJson from 'react-json-view';
import { useRecordContext, Labeled } from 'react-admin';

import { Prisma } from "../prisma/browser";

const JsonViewerField = ({ source, label }) => {
    const record = useRecordContext();
    const value = record?.[source];

    if (!value) return null;

    return (
        <Labeled label={label}>
            <div style={{ marginTop: '8px', marginBottom: '16px' }}>
                <ReactJson 
                    src={value} 
                    collapsed={1}
                    theme="monokai"
                    displayDataTypes={false}
                    name={false}
                />
            </div>
        </Labeled>
    );
};

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
${showFormFields}
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
