import {
  DataTable,
  DeleteButton,
  EditButton,
  List,
  BooleanField,
  DateField,
} from "react-admin";
import { Prisma } from "../prisma/browser";

import ReactJson from "react-json-view";
import { useRecordContext } from "react-admin";

const JsonViewerField = ({ source }) => {
  const record = useRecordContext();
  if (!record || !record[source]) return null;
  return (
    <ReactJson
      src={record[source]}
      collapsed={true}
      theme="monokai"
      displayDataTypes={false}
    />
  );
};

export const ChatMessageDocumentEmbeddingList = () => (
  <List>
    <DataTable>
      <DataTable.Col
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.id}
      />
      <DataTable.Col
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.messageId}
      />
      <DataTable.Col
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.embeddingDocumentId
        }
      />
      <DataTable.Col
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.isFound}
      >
        <BooleanField
          source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.isFound}
        />
      </DataTable.Col>
      <DataTable.NumberCol
        source={
          Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.relevanceScore
        }
      />
      <DataTable.Col
        source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.createdAt}
      >
        <DateField
          source={Prisma.ChatMessageDocumentEmbeddingScalarFieldEnum.createdAt}
          showTime
        />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
