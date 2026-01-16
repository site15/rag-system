import {
  BooleanInput,
  Create,
  DateTimeInput,
  Edit,
  NumberInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

import { Prisma } from '../prisma/browser';

export const ChatMessageDocumentEmbeddingEditForm = () => (
  <Edit>
    <SimpleForm>
      <NumberInput
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.relevanceScore
        }
      />
    </SimpleForm>
  </Edit>
);

export const ChatMessageDocumentEmbeddingShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.id}
        readOnly={true}
      />
      <TextInput
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.chatHistoryId
        }
        readOnly={true}
      />
      <TextInput
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.embeddingDocumentId
        }
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.isFound}
        readOnly={true}
      />
      <NumberInput
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.relevanceScore
        }
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatMessageDocumentEmbeddingCreateForm = () => (
  <Create>
    <SimpleForm>
      <NumberInput
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.relevanceScore
        }
      />
    </SimpleForm>
  </Create>
);
