import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class DefaultDataBootstrapService implements OnApplicationBootstrap {
  constructor(private readonly prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    const adminApiKey = process.env.ADMIN_API_KEY;
    if (
      !(await this.prismaService.authApiKey.findFirst({
        where: { apiKey: adminApiKey },
      }))
    ) {
      await this.prismaService.authApiKey.create({
        data: {
          apiKey: adminApiKey,
          AuthUser: {
            create: { isActive: true },
          },
        },
      });
    }
  }
}
