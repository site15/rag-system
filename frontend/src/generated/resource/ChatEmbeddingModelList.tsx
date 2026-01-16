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

export const ChatEmbeddingModelList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatEmbeddingModelScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatEmbeddingModelScalarFieldEnum.name} />
      <DataTable.Col
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.provider}
      />
      <DataTable.Col source={Prisma.ChatEmbeddingModelScalarFieldEnum.model} />
      <DataTable.NumberCol
        source={Prisma.ChatEmbeddingModelScalarFieldEnum.dimension}
      />
      <DataTable.Col source={Prisma.ChatEmbeddingModelScalarFieldEnum.isActive}>
        <BooleanField
          source={Prisma.ChatEmbeddingModelScalarFieldEnum.isActive}
        />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
