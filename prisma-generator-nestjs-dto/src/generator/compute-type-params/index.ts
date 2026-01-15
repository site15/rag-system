import { TemplateHelpers } from '../template-helpers';
import { Model, TypeParams } from '../types';
import { computeCreateDtoParams } from '../compute-model-params/compute-create-dto-params';
import { computeUpdateDtoParams } from '../compute-model-params/compute-update-dto-params';
import { computePlainDtoParams } from '../compute-model-params/compute-plain-dto-params';

interface ComputeModelParamsParam {
  model: Model;
  allModels: Model[];
  templateHelpers: TemplateHelpers;
}
export const computeTypeParams = ({
  model,
  allModels,
  templateHelpers,
}: ComputeModelParamsParam): TypeParams => ({
  create: computeCreateDtoParams({
    model,
    allModels,
    templateHelpers,
  }),
  update: computeUpdateDtoParams({
    model,
    allModels,
    templateHelpers,
  }),
  plain: computePlainDtoParams({
    model,
    allModels,
    templateHelpers,
  }),
});
