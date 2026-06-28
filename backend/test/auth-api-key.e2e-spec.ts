import { describe, it, expect } from '@jest/globals';
import { ActivityHelper } from './utils/activity-helper';

describe('Auth: Api Key (e2e)', () => {
  const activity = new ActivityHelper({
    baseUrl: process.env.API_URL,
  });
  const firstAdminApiKey = process.env.ADMIN_API_KEYS?.split(',')[0] || '';

  it('login by ApiKey', async () => {
    const result = await activity.loginByApiKey({
      apiKey: firstAdminApiKey,
    });
    expect(result?.isActive).toBeTruthy();
  });
});
