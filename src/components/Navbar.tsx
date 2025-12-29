import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminControls from "./AdminControls";
import FiltersButton from "./FiltersButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;

  return (
    <header className="fixed top-0 left-0 right-0 z-100 px-4 md:px-6 py-4">
      <nav className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl px-6 py-2.5 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: Logo / Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group justify-self-start"
        >
          <div className="size-9 bg-linear-to-br from-blue-celta to-dark-blue rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-lg">⚽</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[11px] font-black text-dark-blue uppercase tracking-tighter leading-none">
              Teams Map
            </span>
            <span className="text-[7px] font-bold text-blue-celta uppercase tracking-[0.2em] leading-none mt-1">
              Galicia Base
            </span>
          </div>
        </Link>

        {/* Center: Filters (Admin only) */}
        <div className="hidden md:flex justify-center">
          {isAuthenticated && <FiltersButton />}
        </div>

        {/* Right: Auth Controls */}
        <div className="justify-self-end">
          <AdminControls
            isAuthenticated={isAuthenticated}
            userImage={session?.user?.image}
            userName={session?.user?.name}
          />
        </div>
      </nav>
    </header>
  );
}
