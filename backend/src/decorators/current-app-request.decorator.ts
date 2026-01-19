import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AppRequest } from '../types/request';
import { getRequestFromExecutionContext } from '../utils/get-request-fromExecution-context';

export const CurrentAppRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = getRequestFromExecutionContext(ctx) as AppRequest;

    return req;
  },
);
