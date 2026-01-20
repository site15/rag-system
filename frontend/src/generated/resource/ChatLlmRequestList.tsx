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

export const ChatLlmRequestList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.id} />
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.request}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.response}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.NumberCol
        source={Prisma.ChatLlmRequestScalarFieldEnum.requestLength}
      />
      <DataTable.NumberCol
        source={Prisma.ChatLlmRequestScalarFieldEnum.responseLength}
      />
      <DataTable.NumberCol
        source={Prisma.ChatLlmRequestScalarFieldEnum.executionTimeMs}
      />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.provider} />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.model} />
      <DataTable.NumberCol
        source={Prisma.ChatLlmRequestScalarFieldEnum.temperature}
      />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.isSuccess}>
        <BooleanField source={Prisma.ChatLlmRequestScalarFieldEnum.isSuccess} />
      </DataTable.Col>
      <DataTable.Col
        source={Prisma.ChatLlmRequestScalarFieldEnum.errorMessage}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.dialogId} />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.messageId} />
      <DataTable.Col source={Prisma.ChatLlmRequestScalarFieldEnum.createdAt}>
        <DateField
          source={Prisma.ChatLlmRequestScalarFieldEnum.createdAt}
          showTime
        />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
