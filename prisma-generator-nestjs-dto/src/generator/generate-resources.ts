import { DMMF } from '@prisma/generator-helper';
import { WritableDeep } from 'type-fest';
import { TemplateHelpers } from './template-helpers';

interface GenerateResourcesParams {
  models: WritableDeep<DMMF.Model>[];
  templateHelpers: TemplateHelpers;
  frontendOutput?: string;
}

export const generateResourcesIndex = ({
  models,
  templateHelpers,
  frontendOutput,
}: GenerateResourcesParams): string => {
  const { entityName } = templateHelpers;

  // Filter out models that should be ignored
  const filteredModels = models.filter((model) => {
    // Skip models with @DtoIgnore annotation
    if (model.documentation && model.documentation.includes('@DtoIgnore')) {
      return false;
    }
    return true;
  });

  // Generate import statements
  const dataProviderImports = filteredModels
    .map((model) => {
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const dataProviderName = `${entityClassName}DataProvider`;
      return `import { ${dataProviderName} } from "./${entityClassName}DataProvider";`;
    })
    .join('\n');

  const formImports = filteredModels
    .map((model) => {
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const createFormName = `${entityClassName}CreateForm`;
      const editFormName = `${entityClassName}EditForm`;
      const showFormName = `${entityClassName}ShowForm`;
      return `import {
  ${createFormName},
  ${editFormName},
  ${showFormName},
} from "./${entityClassName}Form";`;
    })
    .join('\n');

  const listImports = filteredModels
    .map((model) => {
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const listName = `${entityClassName}List`;
      return `import { ${listName} } from "./${entityClassName}List";`;
    })
    .join('\n');

  // Generate the resources object entries
  const resourceEntries = filteredModels
    .map((model) => {
      const modelName = model.name;
      const entityClassName = entityName(modelName);
      const dataProviderName = `${entityClassName}DataProvider`;
      const listName = `${entityClassName}List`;
      const createFormName = `${entityClassName}CreateForm`;
      const editFormName = `${entityClassName}EditForm`;
      const showFormName = `${entityClassName}ShowForm`;

      // Convert PascalCase to readable label
      const label = entityClassName
        .replace(/([A-Z])/g, ' $1')
        .trim()
        .replace(/\s+/g, ' ');

      return `  ${entityClassName}: {
    dataProvider: ${dataProviderName},
    label: "${label}",
    list: ${listName},
    create: ${createFormName},
    edit: ${editFormName},
    show: ${showFormName},
  },`;
    })
    .join('\n');

  return `import { DataProvider } from "react-admin";
import { Prisma } from "../prisma/browser";
${dataProviderImports}
${formImports}
${listImports}

export const resources: Partial<
  Record<
    Prisma.ModelName,
    {
      dataProvider: DataProvider<any>;
      label: string;
      list: any;
      create: any;
      edit: any;
      show: any;
    }
  >
> = {
${resourceEntries}
};
`;
};
