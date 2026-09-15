"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { createSessionToken, SESSION_COOKIE, type Role } from "./session";
import type { AuthState } from "./types";

type UserRow = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
};

const roles = ["student", "parent", "staff", "admin"] as const;

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
  role: z.enum(roles),
});

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const db = getDb();
  if (!db) {
    return {
      status: "error",
      message: "The database isn't connected yet — set DATABASE_URL to enable sign-in.",
    };
  }

  const { email, password, role } = parsed.data;
  const rows = (await db`
    SELECT id, name, email, password_hash AS "passwordHash", role
    FROM users
    WHERE email = ${email}
  `) as UserRow[];
  const user = rows[0];

  // Same generic message whether the email is unknown, the password is
  // wrong, or the role tab doesn't match — don't leak which one it was.
  const genericError = { status: "error" as const, message: "Incorrect email, password, or portal." };
  if (!user || user.role !== role) return genericError;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return genericError;

  const token = await createSessionToken({ userId: user.id, role: user.role, name: user.name, email: user.email });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(`/portal/${user.role}`);
}

const signupSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["student", "parent"]), // self-registration is only for these two
});

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const db = getDb();
  if (!db) {
    return {
      status: "error",
      message: "The database isn't connected yet — set DATABASE_URL to enable sign-up.",
    };
  }

  const { name, email, password, role } = parsed.data;
  const existing = await db`SELECT id FROM users WHERE email = ${email}`;
  if (existing.length > 0) {
    return { status: "error", message: "An account with that email already exists." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = (
    (await db`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (${name}, ${email}, ${passwordHash}, ${role})
      RETURNING id, name, email, role
    `) as UserRow[]
  )[0];

  if (role === "student") {
    await db`INSERT INTO student_profiles (user_id, grade_level) VALUES (${created.id}, 'Unassigned')`;
  }

  const token = await createSessionToken({ userId: created.id, role: created.role, name: created.name, email: created.email });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(`/portal/${created.role}`);
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/login");
}

