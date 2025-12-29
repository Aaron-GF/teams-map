import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminControls from "./AdminControls";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;

  return (
    <AdminControls
      isAuthenticated={isAuthenticated}
      userImage={session?.user?.image}
    />
  );
}
