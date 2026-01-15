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

export const ChatDialogEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.id} readOnly={true} />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.updatedAt}
        readOnly={true}
      />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.userId} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.title} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.summary} />
      <NumberInput
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
      />
      <BooleanInput source={Prisma.ChatDialogScalarFieldEnum.isFailed} />
    </SimpleForm>
  </Edit>
);

export const ChatDialogShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.id} readOnly={true} />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.ChatDialogScalarFieldEnum.updatedAt}
        readOnly={true}
      />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.userId} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.title} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.summary} />
      <NumberInput
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
      />
      <BooleanInput source={Prisma.ChatDialogScalarFieldEnum.isFailed} />
    </SimpleForm>
  </Edit>
);

export const ChatDialogCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.userId} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.title} />
      <TextInput source={Prisma.ChatDialogScalarFieldEnum.summary} />
      <NumberInput
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
      />
      <BooleanInput source={Prisma.ChatDialogScalarFieldEnum.isFailed} />
    </SimpleForm>
  </Create>
);
