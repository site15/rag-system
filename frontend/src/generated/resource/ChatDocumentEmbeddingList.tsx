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

export const ChatDocumentEmbeddingList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.id} />
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.content}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
      >
        <JsonViewerField
          source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.metadata}
        />
      </DataTable.Col>
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.contentHash}
      />
      <DataTable.Col
        source={Prisma.ChatDocumentEmbeddingScalarFieldEnum.embeddingModelId}
      />
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
