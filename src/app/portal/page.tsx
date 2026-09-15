import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";

export default async function PortalIndexPage() {
  const session = await getSession();
  redirect(session ? `/portal/${session.role}` : "/login");
}
