import { SignJWT, jwtVerify } from "jose";

export type Role = "student" | "parent" | "staff" | "admin";

export type SessionPayload = {
  userId: number;
  role: Role;
  name: string;
  email: string;
};

export const SESSION_COOKIE = "newlife_session";
const SESSION_TTL = "7d";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    // Fall back to a fixed dev-only secret so local preview still works
    // before AUTH_SECRET is configured. Never rely on this in production —
    // set a real AUTH_SECRET (see .env.example).
    return new TextEncoder().encode("dev-only-insecure-secret-change-me");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      typeof payload.userId === "number" &&
      typeof payload.role === "string" &&
      typeof payload.name === "string" &&
      typeof payload.email === "string"
    ) {
      return payload as unknown as SessionPayload;
    }
    return null;
  } catch {
    return null;
  }
}
