import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";
import { isAdminUser } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in?redirect=%2Fadmin");
  }

  if (!isAdminUser(session.user)) {
    redirect("/");
  }

  return children;
}
