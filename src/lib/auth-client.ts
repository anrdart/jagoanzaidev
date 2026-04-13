import { createAuthClient } from '@neondatabase/auth';
import { BetterAuthReactAdapter } from '@neondatabase/auth/react/adapters';

const NEON_AUTH_URL = 'https://ep-billowing-flower-a1w155rk.neonauth.ap-southeast-1.aws.neon.tech/neondb/auth';

export const authClient = createAuthClient(NEON_AUTH_URL, {
  adapter: BetterAuthReactAdapter(),
});
