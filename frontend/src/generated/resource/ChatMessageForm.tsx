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

export const ChatMessageEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.question} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.answer} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.category} />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedQuestion}
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
      />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatMessageScalarFieldEnum.temperature} />
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
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.answer}
        readOnly={true}
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
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
        readOnly={true}
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
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.question} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.answer} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.category} />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedQuestion}
      />
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
      />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatMessageScalarFieldEnum.temperature} />
    </SimpleForm>
  </Create>
);
