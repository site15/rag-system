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

export const ChatLlmModelList = () => (
  <List>
    <DataTable>
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.id} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.provider} />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.model} />
      <DataTable.NumberCol
        source={Prisma.ChatLlmModelScalarFieldEnum.temperature}
      />
      <DataTable.NumberCol
        source={Prisma.ChatLlmModelScalarFieldEnum.chunkSize}
      />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.startTime}>
        <DateField
          source={Prisma.ChatLlmModelScalarFieldEnum.startTime}
          showTime
        />
      </DataTable.Col>
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.endTime}>
        <DateField
          source={Prisma.ChatLlmModelScalarFieldEnum.endTime}
          showTime
        />
      </DataTable.Col>
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.status} />
      <DataTable.Col
        source={Prisma.ChatLlmModelScalarFieldEnum.lastRequestId}
      />
      <DataTable.Col source={Prisma.ChatLlmModelScalarFieldEnum.isActive}>
        <BooleanField source={Prisma.ChatLlmModelScalarFieldEnum.isActive} />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
