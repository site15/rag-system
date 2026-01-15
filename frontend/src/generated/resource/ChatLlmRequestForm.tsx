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

export const ChatLlmRequestEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.id}
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
      <BooleanInput source={Prisma.ChatLlmRequestScalarFieldEnum.isSuccess} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.dialogId} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.historyId} />
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
      <DateTimeInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatLlmRequestScalarFieldEnum.updatedAt}
        readOnly={true}
      />
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
      <BooleanInput source={Prisma.ChatLlmRequestScalarFieldEnum.isSuccess} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.dialogId} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.historyId} />
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
      <BooleanInput source={Prisma.ChatLlmRequestScalarFieldEnum.isSuccess} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.dialogId} />
      <TextInput source={Prisma.ChatLlmRequestScalarFieldEnum.historyId} />
    </SimpleForm>
  </Create>
);
