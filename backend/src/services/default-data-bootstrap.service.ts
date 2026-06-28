import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class DefaultDataBootstrapService implements OnApplicationBootstrap {
  constructor(private readonly prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    const adminApiKeys = process.env.ADMIN_API_KEYS?.split(',') || [];

    for (const adminApiKey of adminApiKeys) {
      if (
        !(await this.prismaService.authApiKey.findFirst({
          where: { apiKey: adminApiKey },
        }))
      ) {
        await this.prismaService.authApiKey.upsert({
          where: { apiKey: adminApiKey },
          create: {
            apiKey: adminApiKey,
            AuthUser: { create: { isActive: true } },
          },
          update: {
            apiKey: adminApiKey,
            AuthUser: { update: { isActive: true } },
          },
        });
      }
    }
  }
}
