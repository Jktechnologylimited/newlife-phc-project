export type AuthState = { status: "idle" | "error"; message: string };
export const initialAuthState: AuthState = { status: "idle", message: "" };
