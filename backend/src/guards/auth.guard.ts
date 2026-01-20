import {
  BadGatewayException,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { DEFAULT_ALLOWED_IPS, ERROR_MESSAGES } from '../llm/constants';
import { PrismaService } from '../services/prisma.service';
import { AppRequest } from '../types/request';
import { getRequestFromExecutionContext } from '../utils/get-request-fromExecution-context';
import { getClientIp } from '../utils/request-ip';

export const X_API_KEY_HEADER_NAME = 'x-api-key';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = getRequestFromExecutionContext(context) as AppRequest;

    if (req.headers[X_API_KEY_HEADER_NAME]) {
      const apiKey = await this.prismaService.authApiKey.findFirst({
        select: { AuthUser: true },
        where: { apiKey: req.headers[X_API_KEY_HEADER_NAME] },
      });
      if (apiKey && apiKey.AuthUser) {
        req.userId = apiKey.AuthUser.id;
        req.user = apiKey.AuthUser;
      } else {
        throw new BadRequestException({
          code: 'INVALID_API_KEY',
          error: ERROR_MESSAGES.INVALID_API_KEY,
        });
      }
    }

    req.userIp =
      process.env.CHECK_IP === 'true' ? getClientIp(req as any) : '127.0.0.1';

    // List of allowed IP addresses for security filtering
    const ALLOWED_IPS = process.env.ALLOWED_IPS
      ? [...(process.env.ALLOWED_IPS?.split(',') || [])]
      : [...DEFAULT_ALLOWED_IPS];

    if (!req.userId) {
      throw new UnauthorizedException({
        code: 'UNAUTHORIZED',
        error: ERROR_MESSAGES.UNAUTHORIZED,
      });
    }

    if (!req.userIp || !ALLOWED_IPS.includes(req.userIp)) {
      Logger.log('Blocked request from unauthorized IP', {
        userIp: req.userIp,
        allowedIps: ALLOWED_IPS,
      });
      throw new UnauthorizedException({
        code: 'FORBIDDEN_IP',
        error: ERROR_MESSAGES.FORBIDDEN_IP,
      });
    }

    return true;

    // const request = context.switchToHttp().getRequest();
    // const authHeader = request.headers.authorization;
    //
    // if (!authHeader) {
    //   return false;
    // }
    //
    // const token = authHeader.split(' ')[1];
    //
    // try {
    //   const decoded = this.jwtService.verify(token);
    //   request.user = decoded;
    //   return true;
    // } catch (error) {
    //   return false;
    // }
  }
}
