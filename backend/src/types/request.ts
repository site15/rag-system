/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthUser } from '../generated/prisma/client';

export function prepareHeaders(headers: any): any {
  return Object.fromEntries(
    Object.entries(headers || {}).map(([key, value]) => [
      key.toLowerCase(),
      value,
    ]),
  );
}

export function getRequestFromExecutionContext(ctx: ExecutionContext) {
  let req: any;
  try {
    const contextType: string = ctx.getType();
    switch (contextType) {
      case 'rpc':
        req = {
          ...(ctx.switchToRpc ? ctx.switchToRpc().getContext() : {}),
          headers: {
            // nats
            ...(ctx.switchToRpc &&
            ctx.switchToRpc().getContext &&
            ctx.switchToRpc().getContext().getHeaders
              ? ctx.switchToRpc().getContext().getHeaders()
              : {}),
            // mqtt
            ...(ctx.switchToRpc &&
            ctx.switchToRpc().getContext &&
            ctx.switchToRpc().getContext().getPacket &&
            ctx.switchToRpc().getContext().getPacket().properties
              ? ctx.switchToRpc().getContext().getPacket().properties
              : {}),
            // rmq
            ...(ctx.switchToRpc &&
            ctx.switchToRpc().getContext &&
            ctx.switchToRpc().getContext().getMessage &&
            ctx.switchToRpc().getContext().getMessage().properties?.headers
              ? ctx.switchToRpc().getContext().getMessage().properties.headers
              : {}),
            // kafka
            ...(ctx.switchToRpc &&
            ctx.switchToRpc().getContext &&
            ctx.switchToRpc().getContext().getMessage &&
            ctx.switchToRpc().getContext().getMessage().headers
              ? ctx.switchToRpc().getContext().getMessage().headers
              : {}),
          },
        };
        break;
      case 'http':
        req = ctx.switchToHttp().getRequest();
        break;
      case 'graphql':
        [, , req] = ctx.getArgs();
        break;
      case 'ws':
        req = ctx.switchToWs().getClient();
        break;
      default:
        req = ctx;
        break;
    }
  } catch (err) {
    req = ctx;
  }
  if (req.headers) {
    req.headers = prepareHeaders(req.headers);
  }
  const result =
    req?.connection?.parser?.incoming ||
    req?.req?.extra?.request ||
    req?.req ||
    req;
  if (result.headers) {
    result.headers = prepareHeaders(result.headers);
  }
  return result;
}

export type AppRequest = {
  user: AuthUser;
  userId: string;
  headers: Record<string, string>;
};

export const CurrentAppRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = getRequestFromExecutionContext(ctx) as AppRequest;
    return req;
  },
);
