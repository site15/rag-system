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

export const ChatLlmRequestEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.request} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.response} />
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
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage} />
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
      />
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.response}
        readOnly={true}
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
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.request} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.response} />
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
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage} />
    </SimpleForm>
  </Create>
);
