import { DataTable, List } from "react-admin";
import { Prisma } from "../prisma/browser";

export const ChatLlmRequestList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.request} />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.response} />
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.requestLength}
      />
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.responseLength}
      />
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.executionTimeMs}
      />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.provider} />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.model} />
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.temperature}
      />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.isSuccess} />
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage}
      />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.dialogId} />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.historyId} />
    </DataTable>
  </List>
);
