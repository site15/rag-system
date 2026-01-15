import { DataTable, List } from "react-admin";
import { Prisma } from "../prisma/browser";

export const ChatMessageList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.userId} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.question} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.answer} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.dialogId} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.isFound} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.category} />
      <DataTable.Col
        source={Prisma.ChatMessageScalarFieldEnum.transformedQuestion}
      />
      <DataTable.Col
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
      />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.provider} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.model} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.temperature} />
      <DataTable.Col
        source={Prisma.ChatMessageScalarFieldEnum.isGoodResponse}
      />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.isBadResponse} />
    </DataTable>
  </List>
);
