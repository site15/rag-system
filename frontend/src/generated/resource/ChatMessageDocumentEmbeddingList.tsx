import { DataTable, List } from "react-admin";
import { Prisma } from "../prisma/browser";

export const ChatMessageDocumentEmbeddingList = () => (
  <List>
    <DataTable>
      <DataTable.Col
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.id}
      />
      <DataTable.Col
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.chatHistoryId
        }
      />
      <DataTable.Col
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.embeddingDocumentId
        }
      />
      <DataTable.Col
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.isFound}
      />
      <DataTable.Col
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.relevanceScore
        }
      />
    </DataTable>
  </List>
);
