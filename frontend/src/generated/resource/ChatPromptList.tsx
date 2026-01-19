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

export const ChatPromptList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatPromptScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatPromptScalarFieldEnum.key} />
      <DataTable.Col
        source={Prisma.ChatPromptScalarFieldEnum.prompt}
        sx={{
          display: "inline-block",
          maxWidth: "200px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      />
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
