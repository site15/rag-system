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

export const AuthSessionEditForm = () => (
  <Edit>
    <SimpleForm>
      <BooleanInput source={Prisma.AuthSessionScalarFieldEnum.isActive} />
    </SimpleForm>
  </Edit>
);

export const AuthSessionShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.AuthSessionScalarFieldEnum.id}
        readOnly={true}
      />
      <TextInput
        source={Prisma.AuthSessionScalarFieldEnum.userId}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.AuthSessionScalarFieldEnum.isActive}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthSessionScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthSessionScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const AuthSessionCreateForm = () => (
  <Create>
    <SimpleForm>
      <BooleanInput source={Prisma.AuthSessionScalarFieldEnum.isActive} />
    </SimpleForm>
  </Create>
);
