import {
  BooleanInput,
  Create,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
} from "react-admin";

import { Prisma } from "../prisma/browser";

export const ChatDocumentEmbeddingEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.content} />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
      />
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
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.embeddingModelId}
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
      <TextInput source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.content} />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
      />
      <TextInput
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
      />
    </SimpleForm>
  </Create>
);
