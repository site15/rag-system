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

export const ChatMessageList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.userId} />
      <DataTable.Col
        source={Prisma.ChatMessageScalarFieldEnum.question}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.Col
        source={Prisma.ChatMessageScalarFieldEnum.answer}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.dialogId} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.isFound}>
        <BooleanField source={Prisma.ChatMessageScalarFieldEnum.isFound} />
      </DataTable.Col>
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.category} />
      <DataTable.Col
        source={Prisma.ChatMessageScalarFieldEnum.transformedQuestion}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.Col
        source={Prisma.ChatMessageScalarFieldEnum.transformedEmbeddingQuery}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.provider} />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.model} />
      <DataTable.NumberCol
        source={Prisma.ChatMessageScalarFieldEnum.temperature}
      />
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.isGoodResponse}>
        <BooleanField
          source={Prisma.ChatMessageScalarFieldEnum.isGoodResponse}
        />
      </DataTable.Col>
      <DataTable.Col source={Prisma.ChatMessageScalarFieldEnum.isBadResponse}>
        <BooleanField
          source={Prisma.ChatMessageScalarFieldEnum.isBadResponse}
        />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
