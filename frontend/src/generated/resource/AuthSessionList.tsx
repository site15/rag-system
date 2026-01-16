import { DataTable, List } from 'react-admin';
import { Prisma } from '../prisma/browser';

export const AuthSessionList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.AuthSessionScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.AuthSessionScalarFieldEnum.userId} />
      <DataTable.Col source={Prisma.AuthSessionScalarFieldEnum.isActive} />
    </DataTable>
  </List>
);
