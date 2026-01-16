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

export const ChatDialogEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.title} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.summary} />
    </SimpleForm>
  </Edit>
);

export const ChatDialogShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.id} readOnly={true} />
      <TextInput
        source={Prisma.ChatDialogScalarFieldEnum.userId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDialogScalarFieldEnum.title}
        readOnly={true}
      />
      <TextInput
        source={Prisma.ChatDialogScalarFieldEnum.summary}
        readOnly={true}
      />
      <NumberInput
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.ChatDialogScalarFieldEnum.isFailed}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const ChatDialogCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.title} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.summary} />
    </SimpleForm>
  </Create>
);
