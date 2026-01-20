import {
  BooleanInput,
  Create,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

import ReactJson from "react-json-view";
import { useRecordContext, Labeled } from "react-admin";

import { Prisma } from "../prisma/browser";

const JsonViewerField = ({ source, label }) => {
  const record = useRecordContext();
  const value = record?.[source];

  if (!value) return null;

  return (
    <Labeled label={label}>
      <div style={{ marginTop: "8px", marginBottom: "16px" }}>
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

export const AuthApiKeyEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.AuthApiKeyScalarFieldEnum.apiKey} />
      <BooleanInput source={Prisma.AuthApiKeyScalarFieldEnum.isActive} />
    </SimpleForm>
  </Edit>
);

export const AuthApiKeyShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.AuthApiKeyScalarFieldEnum.id} readOnly={true} />
      <TextInput
        source={Prisma.AuthApiKeyScalarFieldEnum.userId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.AuthApiKeyScalarFieldEnum.apiKey}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.AuthApiKeyScalarFieldEnum.isActive}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthApiKeyScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthApiKeyScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const AuthApiKeyCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.AuthApiKeyScalarFieldEnum.apiKey} />
      <BooleanInput source={Prisma.AuthApiKeyScalarFieldEnum.isActive} />
    </SimpleForm>
  </Create>
);
