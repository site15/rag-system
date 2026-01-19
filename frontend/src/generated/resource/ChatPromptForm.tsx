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

export const ChatPromptEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatPromptScalarFieldEnum.key} />
      <TextInput source={Prisma.ChatPromptScalarFieldEnum.prompt} multiline />
    </SimpleForm>
  </Edit>
);

export const ChatPromptShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatPromptScalarFieldEnum.id} readOnly={true} />
      <TextInput
        source={Prisma.ChatPromptScalarFieldEnum.key}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatPromptScalarFieldEnum.prompt}
        readOnly={true}
        multiline
      />
      <DateTimeInput
        source={Prisma.ChatPromptScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatPromptScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatPromptCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.ChatPromptScalarFieldEnum.key} />
      <TextInput source={Prisma.ChatPromptScalarFieldEnum.prompt} multiline />
    </SimpleForm>
  </Create>
);
