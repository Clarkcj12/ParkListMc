import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/integrations/next-js";

import { prisma } from "@/lib/prisma";

const trustedOrigins = [
  process.env.NEXT_PUBLIC_APP_URL,
  process.env.BETTER_AUTH_URL,
].filter(Boolean) as string[];

const authSecret = process.env.BETTER_AUTH_SECRET;
const allowEmailLog =
  process.env.AUTH_EMAIL_LOG === "true" ||
  process.env.NODE_ENV !== "production";

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is required.");
}

function logAuthEmail(label: string, email: string, url: string): void {
  if (!allowEmailLog) {
    // In non-production or when email logging is disabled we should not throw
    // to avoid breaking flows during development or test runs. Log a warning
    // so operators can enable email logging if they expect these messages.
    // eslint-disable-next-line no-console
    console.warn(`[Auth] ${label} email not logged for ${email}: logging disabled`);
    return;
  }
  // eslint-disable-next-line no-console
  console.log(`[Auth] ${label} for ${email}: ${url}`);
}

export const auth = betterAuth({
  appName: "ParkListMc",
  secret: authSecret,
  trustedOrigins,
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      logAuthEmail("Reset password", user.email, url);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      enabled: Boolean(
        process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ),
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      enabled: Boolean(
        process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET
      ),
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID ?? "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "",
      tenantId: process.env.MICROSOFT_TENANT_ID,
      enabled: Boolean(
        process.env.MICROSOFT_CLIENT_ID &&
          process.env.MICROSOFT_CLIENT_SECRET
      ),
    },
  },
});
