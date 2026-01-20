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

export const AuthUserList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.anonymousId} />
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.supabaseUserId} />
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.supabaseUserData}>
        <JsonViewerField
          source={Prisma.AuthUserScalarFieldEnum.supabaseUserData}
        />
      </DataTable.Col>
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.isActive}>
        <BooleanField source={Prisma.AuthUserScalarFieldEnum.isActive} />
      </DataTable.Col>
      <DataTable.Col source={Prisma.AuthUserScalarFieldEnum.createdAt}>
        <DateField source={Prisma.AuthUserScalarFieldEnum.createdAt} showTime />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
