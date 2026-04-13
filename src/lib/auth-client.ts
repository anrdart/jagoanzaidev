import { createAuthClient } from '@neondatabase/auth';
import { BetterAuthReactAdapter } from '@neondatabase/auth/react/adapters';

const NEON_AUTH_URL = 'https://ep-billowing-flower-a1w155rk.neonauth.ap-southeast-1.aws.neon.tech/neondb/auth';

export const authClient = createAuthClient(NEON_AUTH_URL, {
  adapter: BetterAuthReactAdapter(),
});

type EmailOtpClient = {
  sendVerificationOtp: (data: { email: string; type: 'sign-in' | 'email-verification' | 'forget-password' }) => Promise<{ data: { success: boolean } | null; error: { message?: string; code?: string } | null }>;
  verifyEmail: (data: { email: string; otp: string }) => Promise<{ data: { status: boolean; token: string | null; user: { id: string; email: string; name: string; emailVerified: boolean; image: string | null; createdAt: Date; updatedAt: Date } } | null; error: { message?: string; code?: string } | null }>;
};

type SessionUser = { id: string; email: string; name: string; emailVerified: boolean; image: string | null; createdAt: Date; updatedAt: Date };
type SessionResult = { data: { user: SessionUser; session: { id: string; userId: string; expiresAt: Date; token: string } } | null; error: { message?: string; code?: string } | null };

export const emailOtp = (authClient as unknown as { emailOtp: EmailOtpClient }).emailOtp;
export const getSession = authClient.getSession as unknown as () => Promise<SessionResult>;
