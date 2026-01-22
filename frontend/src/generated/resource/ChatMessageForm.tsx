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

export const ChatMessageEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.question}
        multiline
      />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.answer} multiline />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.category} />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedQuestion}
        multiline
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
        multiline
      />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatMessageScalarFieldEnum.temperature} />
      <JsonViewerField source={Prisma.ChatMessageScalarFieldEnum.trace} />
      <JsonViewerField source={Prisma.ChatMessageScalarFieldEnum.constants} />
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.questionReceivedAt}
      />
      <DateTimeInput source={Prisma.ChatMessageScalarFieldEnum.answerSentAt} />
    </SimpleForm>
  </Edit>
);

export const ChatMessageShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.id}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.userId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.question}
        readOnly={true}
        multiline
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.answer}
        readOnly={true}
        multiline
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.dialogId}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatMessageScalarFieldEnum.isFound}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.category}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedQuestion}
        readOnly={true}
        multiline
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
        readOnly={true}
        multiline
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.provider}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.model}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatMessageScalarFieldEnum.temperature}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatMessageScalarFieldEnum.isGoodResponse}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatMessageScalarFieldEnum.isBadResponse}
        readOnly={true}
      />
      <JsonViewerField
        source={Prisma.ChatMessageScalarFieldEnum.trace}
        readOnly={true}
      />
      <JsonViewerField
        source={Prisma.ChatMessageScalarFieldEnum.constants}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatMessageScalarFieldEnum.isProcessing}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.questionReceivedAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.answerSentAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatMessageCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.question}
        multiline
      />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.answer} multiline />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.category} />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedQuestion}
        multiline
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
        multiline
      />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatMessageScalarFieldEnum.temperature} />
      <JsonViewerField source={Prisma.ChatMessageScalarFieldEnum.trace} />
      <JsonViewerField source={Prisma.ChatMessageScalarFieldEnum.constants} />
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.questionReceivedAt}
      />
      <DateTimeInput source={Prisma.ChatMessageScalarFieldEnum.answerSentAt} />
    </SimpleForm>
  </Create>
);
