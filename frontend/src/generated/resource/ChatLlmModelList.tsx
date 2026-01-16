import { DataTable, List } from 'react-admin';
import { Prisma } from '../prisma/browser';

export const ChatLlmModelList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.provider} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.model} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.temperature} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.chunkSize} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.startTime} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.endTime} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.status} />
      <DataTable.Col
        source={Prisma.ChatLlmModelScalarFieldEnum.lastRequestId}
      />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.isActive} />
    </DataTable>
  </List>
);
