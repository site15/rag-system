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

export const ChatLlmRequestEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.request}
        multiline
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.response}
        multiline
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.requestLength}
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.responseLength}
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.executionTimeMs}
      />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatLlmRequestScalarFieldEnum.temperature} />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage}
        multiline
      />
    </SimpleForm>
  </Edit>
);

export const ChatLlmRequestShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.id}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.request}
        readOnly={true}
        multiline
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.response}
        readOnly={true}
        multiline
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.requestLength}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.responseLength}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.executionTimeMs}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.provider}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.model}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.temperature}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.isSuccess}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage}
        readOnly={true}
        multiline
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.dialogId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.historyId}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatLlmRequestCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.request}
        multiline
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.response}
        multiline
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.requestLength}
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.responseLength}
      />
      <NumberInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.executionTimeMs}
      />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatLlmRequestScalarFieldEnum.temperature} />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage}
        multiline
      />
    </SimpleForm>
  </Create>
);
