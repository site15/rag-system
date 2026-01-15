import { TemplateHelpers } from '../template-helpers';
import { ControllerParams } from '../types';

interface ComputeControllerParamsParam {
  model: any;
  templateHelpers: TemplateHelpers;
}

export const computeControllerParams = ({
  model,
  templateHelpers,
}: ComputeControllerParamsParam): ControllerParams => {
  const fields = model.fields.map((field: any) => ({
    kind: field.kind,
    name: field.name,
    type: field.type,
    modelName: model.name,
    documentation: field.documentation,
    isRequired: field.isRequired,
    isList: field.isList,
    isId: field.isId,
    isUnique: field.isUnique,
    isReadOnly: field.isReadOnly,
    isUpdatedAt: field.isUpdatedAt,
    isNullable: !field.isRequired,
    hasDefaultValue: field.hasDefaultValue,
    default: field.default,
    apiProperties: [],
    apiHideProperty: false,
    classValidators: [],
    relationName: field.relationName,
    relationFromFields: field.relationFromFields,
    relationToFields: field.relationToFields,
  }));

  // Controller doesn't need complex imports like DTOs
  const imports: any[] = [];

  return {
    model,
    fields,
    imports,
    apiExtraModels: [],
  };
};