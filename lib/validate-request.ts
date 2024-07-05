// validateRequest.ts

import { cookies } from "next/headers";
import { cache } from "react";
import { lucia } from "./auth";
import type { Session, User } from "lucia";

export const validateRequest = cache(
  async (): Promise<{ userId: string | null; user: User | null; session: Session | null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        userId: null,
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    console.log("Session Validation Result:", result);

    console.log("User ID:", result.user?.id ?? null);

    // Handle session cookie updates (if needed)
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } else if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    return {
      userId: result.user?.id ?? null,
      user: result.user,
      session: result.session,
    };
  }
);
