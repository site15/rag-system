import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getClientIp } from '../utils/request-ip';
import { getRequestFromExecutionContext } from '../utils/get-request-fromExecution-context';

export const IpAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = getRequestFromExecutionContext(ctx);
    return getClientIp(request);
  },
);
