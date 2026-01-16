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

export const AuthSessionList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.AuthSessionScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.AuthSessionScalarFieldEnum.userId} />
      <DataTable.Col source={Prisma.AuthSessionScalarFieldEnum.isActive}>
        <BooleanField source={Prisma.AuthSessionScalarFieldEnum.isActive} />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
