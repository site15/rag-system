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

export const ChatMessageEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatMessageScalarFieldEnum.id}
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
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.userId} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.question} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.answer} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.dialogId} />
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isFound} />
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
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isGoodResponse} />
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isBadResponse} />
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
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatMessageScalarFieldEnum.updatedAt}
        readOnly={true}
      />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.userId} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.question} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.answer} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.dialogId} />
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isFound} />
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
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isGoodResponse} />
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isBadResponse} />
    </SimpleForm>
  </Edit>
);

export const ChatMessageCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.userId} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.question} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.answer} />
      <TextInput source={Prisma.ChatMessageScalarFieldEnum.dialogId} />
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isFound} />
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
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isGoodResponse} />
      <BooleanInput source={Prisma.ChatMessageScalarFieldEnum.isBadResponse} />
    </SimpleForm>
  </Create>
);
