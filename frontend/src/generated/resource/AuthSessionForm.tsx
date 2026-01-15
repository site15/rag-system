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

export const AuthSessionEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.AuthSessionScalarFieldEnum.id}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthSessionScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthSessionScalarFieldEnum.updatedAt}
        readOnly={true}
      />
      <TextInput source={Prisma.AuthSessionScalarFieldEnum.userId} />
      <BooleanInput source={Prisma.AuthSessionScalarFieldEnum.isActive} />
    </SimpleForm>
  </Edit>
);

export const AuthSessionShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput
        source={Prisma.AuthSessionScalarFieldEnum.id}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthSessionScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthSessionScalarFieldEnum.updatedAt}
        readOnly={true}
      />
      <TextInput source={Prisma.AuthSessionScalarFieldEnum.userId} />
      <BooleanInput source={Prisma.AuthSessionScalarFieldEnum.isActive} />
    </SimpleForm>
  </Edit>
);

export const AuthSessionCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.AuthSessionScalarFieldEnum.userId} />
      <BooleanInput source={Prisma.AuthSessionScalarFieldEnum.isActive} />
    </SimpleForm>
  </Create>
);
