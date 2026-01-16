import { DataTable, List } from 'react-admin';
import { Prisma } from '../prisma/browser';

export const ChatDialogList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.userId} />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.title} />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.summary} />
      <DataTable.Col
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
      />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.isFailed} />
    </DataTable>
  </List>
);
