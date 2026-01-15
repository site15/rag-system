import { DataTable, List } from "react-admin";
import { Prisma } from "../prisma/browser";

export const ChatEmbeddingModelList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatEmbeddingModelScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatEmbeddingModelScalarFieldEnum.name} />
      <DataTable.Col
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.provider}
      />
      <DataTable.Col source={Prisma.ChatEmbeddingModelScalarFieldEnum.model} />
      <DataTable.Col
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.dimension}
      />
      <DataTable.Col
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.isActive}
      />
    </DataTable>
  </List>
);
