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
import { AppRequest, getRequestFromExecutionContext } from '../types/request';

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
    req.userIp = '127.0.0.1';

    // List of allowed IP addresses for security filtering
    const ALLOWED_IPS = process.env.ALLOWED_IPS
      ? [...(process.env.ALLOWED_IPS?.split(',') || [])]
      : [...DEFAULT_ALLOWED_IPS];

    const userId = req.userId;
    if (!userId) {
      throw new UnauthorizedException({ error: ERROR_MESSAGES.UNAUTHORIZED });
    }

    const clientIp = req.userIp;
    if (!clientIp || !ALLOWED_IPS.includes(clientIp)) {
      Logger.log('Blocked request from unauthorized IP', {
        clientIp,
        allowedIps: ALLOWED_IPS,
      });
      throw new UnauthorizedException({ error: ERROR_MESSAGES.FORBIDDEN_IP });
    }

    await this.prismaService.authUser.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
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
