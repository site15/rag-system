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

export const ChatDialogList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.userId} />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.title} />
      <DataTable.Col
        source={Prisma.ChatDialogScalarFieldEnum.summary}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <DataTable.NumberCol
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
      />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.isFailed}>
        <BooleanField source={Prisma.ChatDialogScalarFieldEnum.isFailed} />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
