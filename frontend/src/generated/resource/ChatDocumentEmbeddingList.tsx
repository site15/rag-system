import { DataTable, List } from "react-admin";
import { Prisma } from "../prisma/browser";

export const ChatDocumentEmbeddingList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.id} />
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.content}
      />
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
      />
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
      />
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.embeddingModelId}
      />
    </DataTable>
  </List>
);
