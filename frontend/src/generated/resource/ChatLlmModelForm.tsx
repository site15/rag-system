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

export const ChatLlmModelEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatLlmModelScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatLlmModelScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatLlmModelScalarFieldEnum.temperature} />
      <NumberInput source={Prisma.ChatLlmModelScalarFieldEnum.chunkSize} />
      <DateTimeInput source={Prisma.ChatLlmModelScalarFieldEnum.startTime} />
      <DateTimeInput source={Prisma.ChatLlmModelScalarFieldEnum.endTime} />
      <BooleanInput source={Prisma.ChatLlmModelScalarFieldEnum.isActive} />
    </SimpleForm>
  </Edit>
);

export const ChatLlmModelShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatLlmModelScalarFieldEnum.id}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmModelScalarFieldEnum.provider}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmModelScalarFieldEnum.model}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatLlmModelScalarFieldEnum.temperature}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatLlmModelScalarFieldEnum.chunkSize}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatLlmModelScalarFieldEnum.startTime}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatLlmModelScalarFieldEnum.endTime}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmModelScalarFieldEnum.status}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatLlmModelScalarFieldEnum.lastRequestId}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatLlmModelScalarFieldEnum.isActive}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatLlmModelScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatLlmModelScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatLlmModelCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.ChatLlmModelScalarFieldEnum.provider} />
      <TextInput source={Prisma.ChatLlmModelScalarFieldEnum.model} />
      <NumberInput source={Prisma.ChatLlmModelScalarFieldEnum.temperature} />
      <NumberInput source={Prisma.ChatLlmModelScalarFieldEnum.chunkSize} />
      <DateTimeInput source={Prisma.ChatLlmModelScalarFieldEnum.startTime} />
      <DateTimeInput source={Prisma.ChatLlmModelScalarFieldEnum.endTime} />
      <BooleanInput source={Prisma.ChatLlmModelScalarFieldEnum.isActive} />
    </SimpleForm>
  </Create>
);
