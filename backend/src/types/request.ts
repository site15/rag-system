import { AuthUser } from '../generated/prisma/client';

export type AppRequest = {
  user: AuthUser;
  userId: string;
  userIp: string | null;
  headers: Record<string, string>;
};
