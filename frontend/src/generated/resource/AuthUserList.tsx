import { DataTable, List } from "react-admin";
import { Prisma } from "../prisma/browser";

export const AuthUserList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.anonymousId} />
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.supabaseUserId} />
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.supabaseUserData} />
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.isActive} />
    </DataTable>
  </List>
);
