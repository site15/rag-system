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

export const ChatEmbeddingModelEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatEmbeddingModelScalarFieldEnum.name} />
      <TextInput source={Prisma.ChatEmbeddingModelScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatEmbeddingModelScalarFieldEnum.model} />
      <NumberInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.dimension}
      />
    </SimpleForm>
  </Edit>
);

export const ChatEmbeddingModelShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.id}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.name}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.provider}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.model}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.dimension}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.isActive}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatEmbeddingModelCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.ChatEmbeddingModelScalarFieldEnum.name} />
      <TextInput source={Prisma.ChatEmbeddingModelScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatEmbeddingModelScalarFieldEnum.model} />
      <NumberInput
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.dimension}
      />
    </SimpleForm>
  </Create>
);
