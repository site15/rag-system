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

export const AuthUserEditForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.AuthUserScalarFieldEnum.anonymousId} />
      <TextInput source={Prisma.AuthUserScalarFieldEnum.supabaseUserId} />
      <TextInput source={Prisma.AuthUserScalarFieldEnum.supabaseUserData} />
      <BooleanInput source={Prisma.AuthUserScalarFieldEnum.isActive} />
    </SimpleForm>
  </Edit>
);

export const AuthUserShowForm = () => (
  <Edit>
    <SimpleForm>
      <TextInput source={Prisma.AuthUserScalarFieldEnum.id} readOnly={true} />
      <TextInput
        source={Prisma.AuthUserScalarFieldEnum.anonymousId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.AuthUserScalarFieldEnum.supabaseUserId}
        readOnly={true}
      />
      <TextInput
        source={Prisma.AuthUserScalarFieldEnum.supabaseUserData}
        readOnly={true}
      />
      <BooleanInput
        source={Prisma.AuthUserScalarFieldEnum.isActive}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthUserScalarFieldEnum.createdAt}
        readOnly={true}
      />
      <DateTimeInput
        source={Prisma.AuthUserScalarFieldEnum.updatedAt}
        readOnly={true}
      />
    </SimpleForm>
  </Edit>
);

export const AuthUserCreateForm = () => (
  <Create>
    <SimpleForm>
      <TextInput source={Prisma.AuthUserScalarFieldEnum.anonymousId} />
      <TextInput source={Prisma.AuthUserScalarFieldEnum.supabaseUserId} />
      <TextInput source={Prisma.AuthUserScalarFieldEnum.supabaseUserData} />
      <BooleanInput source={Prisma.AuthUserScalarFieldEnum.isActive} />
    </SimpleForm>
  </Create>
);
