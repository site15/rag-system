import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DEFAULT_ALLOWED_IPS, ERROR_MESSAGES } from '../llm/constants';
import { PrismaService } from '../services/prisma.service';
import { AppRequest } from '../types/request';
import { getRequestFromExecutionContext } from '../utils/get-request-fromExecution-context';
import { getClientIp } from '../utils/request-ip';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = getRequestFromExecutionContext(context) as AppRequest;

    // todo: remove mock logic
    req.userId = req.headers.authorization || process.env.ADMIN_ID || '';
    req.userIp = '127.0.0.1'; // getClientIp(req as any);

    // List of allowed IP addresses for security filtering
    const ALLOWED_IPS = process.env.ALLOWED_IPS
      ? [...(process.env.ALLOWED_IPS?.split(',') || [])]
      : [...DEFAULT_ALLOWED_IPS];

    if (!req.userId) {
      throw new UnauthorizedException({ error: ERROR_MESSAGES.UNAUTHORIZED });
    }

    if (!req.userIp || !ALLOWED_IPS.includes(req.userIp)) {
      Logger.log('Blocked request from unauthorized IP', {
        userIp: req.userIp,
        allowedIps: ALLOWED_IPS,
      });
      throw new UnauthorizedException({ error: ERROR_MESSAGES.FORBIDDEN_IP });
    }

    await this.prismaService.authUser.upsert({
      where: { id: req.userId },
      update: {},
      create: { id: req.userId },
    });

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
