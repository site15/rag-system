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

export const ChatDocumentEmbeddingEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.content}
        multiline
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.graphContent}
        multiline
      />
      <JsonViewerField
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.provider}
      />
      <TextInput source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.model} />
    </SimpleForm>
  </Edit>
);

export const ChatDocumentEmbeddingShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.id}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.content}
        readOnly={true}
        multiline
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.graphContent}
        readOnly={true}
        multiline
      />
      <JsonViewerField
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.provider}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.model}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatDocumentEmbeddingCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.content}
        multiline
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.graphContent}
        multiline
      />
      <JsonViewerField
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.provider}
      />
      <TextInput source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.model} />
    </SimpleForm>
  </Create>
);
