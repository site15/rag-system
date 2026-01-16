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

export const AuthUserEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.AuthUserScalarFieldEnum.anonymousId} />
      <TextInput source={Prisma.AuthUserScalarFieldEnum.supabaseUserId} />
      <JsonViewerField
        source={Prisma.AuthUserScalarFieldEnum.supabaseUserData}
      />
      <BooleanInput source={Prisma.AuthUserScalarFieldEnum.isActive} />
    </SimpleForm>
  </Edit>
);

export const AuthUserShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.AuthUserScalarFieldEnum.id} readOnly={true} />
      <TextInput
        source={Prisma.AuthUserScalarFieldEnum.anonymousId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.AuthUserScalarFieldEnum.supabaseUserId}
        readOnly={true}
      />
      <JsonViewerField
        source={Prisma.AuthUserScalarFieldEnum.supabaseUserData}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.AuthUserScalarFieldEnum.isActive}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthUserScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthUserScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const AuthUserCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.AuthUserScalarFieldEnum.anonymousId} />
      <TextInput source={Prisma.AuthUserScalarFieldEnum.supabaseUserId} />
      <JsonViewerField
        source={Prisma.AuthUserScalarFieldEnum.supabaseUserData}
      />
      <BooleanInput source={Prisma.AuthUserScalarFieldEnum.isActive} />
    </SimpleForm>
  </Create>
);
