# Frontend Table Generator Documentation

## Overview

The frontend table generator automatically creates React Admin list components from Prisma schema models. These components provide comprehensive data display with automatic field type detection and appropriate rendering components.

## Generated Components

For each Prisma model, the generator creates:
- `ModelNameList.tsx` - Table view component with all relevant fields
- `ModelNameForm.tsx` - Form component for creating/editing records  
- `ModelDataProvider.ts` - Data provider for API integration

## Automatic Field Handling

The generator automatically detects field types and applies appropriate display components:

### Scalar Fields
- **String/Text fields**: Standard table columns with optional truncation for long content
- **Numeric fields** (Int, Float, Decimal): Number columns with proper formatting
- **Boolean fields**: Checkbox display using BooleanField component
- **JSON fields**: Interactive JSON viewer using react-json-view
- **DateTime fields**: Formatted date display with time using DateField component

### Special Field Treatment

#### Date Fields
All `createdAt` fields are automatically included in list views with proper date/time formatting:
```tsx
<DataTable.Col source={Prisma.ModelNameScalarFieldEnum.createdAt}>
  <DateField source={Prisma.ModelNameScalarFieldEnum.createdAt} showTime />
</DataTable.Col>
```

The generator excludes `updatedAt` fields from list displays by default, as they're typically less relevant for end-user consumption.

#### Long Text Fields
Fields mapped to database TEXT types automatically get ellipsis styling:
```tsx
<DataTable.Col 
  source={Prisma.ModelNameScalarFieldEnum.longTextField}
  sx={{
    display: 'inline-block',
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }}
/>
```

## Example Generated Component

Here's an example of a generated list component for a ChatDialog model:

```tsx
import {
  DataTable,
  DeleteButton,
  EditButton,
  List,
  BooleanField,
  DateField,
} from 'react-admin';
import { Prisma } from '../prisma/browser';

import ReactJson from 'react-json-view';
import { useRecordContext } from 'react-admin';

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
          display: 'inline-block',
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      />
      <DataTable.NumberCol
        source={Prisma.ChatDialogScalarFieldEnum.consecutiveFailures}
      />
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.isFailed}>
        <BooleanField source={Prisma.ChatDialogScalarFieldEnum.isFailed} />
      </DataTable.Col>
      <DataTable.Col source={Prisma.ChatDialogScalarFieldEnum.createdAt}>
        <DateField
          source={Prisma.ChatDialogScalarFieldEnum.createdAt}
          showTime
        />
      </DataTable.Col>
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
```

## Customization Options

While the generator provides sensible defaults, you can customize the generated components by:

1. **Manual modifications**: Edit the generated `.tsx` files directly
2. **Styling adjustments**: Modify the sx props for column styling
3. **Component overrides**: Replace default field components with custom ones
4. **Column ordering**: Rearrange DataTable.Col elements to change display order

## Regeneration Process

To regenerate components after Prisma schema changes:
```bash
cd backend
npx prisma generate
```

This will update all generated frontend components to match the current schema structure, including any new fields or type changes.

## Field Selection Logic

The generator includes the following fields in list views:
- All scalar fields except `updatedAt`
- Automatically formats fields based on their Prisma types
- Applies appropriate React Admin components for optimal display

Fields excluded from list views:
- `updatedAt` - typically not useful for end-user display
- Relation fields - handled separately in detail views