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

export const ChatDialogEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.title} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.summary} multiline />
    </SimpleForm>
  </Edit>
);

export const ChatDialogShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.id} readOnly={true} />
      <TextInput
        source={Prisma.ChatDialogScalarFieldEnum.userId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDialogScalarFieldEnum.title}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDialogScalarFieldEnum.summary}
        readOnly={true}
        multiline
      />
      <NumberInput
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatDialogScalarFieldEnum.isFailed}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatDialogCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.title} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.summary} multiline />
    </SimpleForm>
  </Create>
);
