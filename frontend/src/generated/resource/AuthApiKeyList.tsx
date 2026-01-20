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

export const AuthApiKeyList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.AuthApiKeyScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.AuthApiKeyScalarFieldEnum.userId} />
      <DataTable.Col source={Prisma.AuthApiKeyScalarFieldEnum.apiKey} />
      <DataTable.Col source={Prisma.AuthApiKeyScalarFieldEnum.isActive}>
        <BooleanField source={Prisma.AuthApiKeyScalarFieldEnum.isActive} />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
