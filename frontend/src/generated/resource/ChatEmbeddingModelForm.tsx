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
