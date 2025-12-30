"use client";

import { useState } from "react";
import Link from "next/link";
import AdminControls from "@/components/ui/AdminControls";
import FiltersButton from "@/components/ui/FiltersButton";
import GestionButton from "@/components/ui/GestionButton";
import { type Session } from "next-auth";

interface NavbarClientProps {
  session: Session | null;
}

export default function NavbarClient({ session }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = !!session;

  return (
    <header className="fixed top-0 left-0 right-0 z-100 px-4 md:px-6 py-4">
      <nav className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl px-6 py-2.5 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Izquierda: Logo / Marca */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
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

        {/* Centro: Filtros y Gestión (Solo Desktop) */}
        <div className="hidden md:flex justify-center gap-3">
          {isAuthenticated && (
            <>
              <FiltersButton />
              <GestionButton />
            </>
          )}
        </div>

        {/* Derecha: Controles y Hamburger */}
        <div className="flex items-center gap-3 justify-end">
          {/* Admin Controls (Desktop always, Mobile sometimes simplified) */}
          <div className="hidden md:block">
            <AdminControls
              isAuthenticated={isAuthenticated}
              userImage={session?.user?.image}
              userName={session?.user?.name}
            />
          </div>

          {/* Mobile Profile & Trigger */}
          <div className="flex md:hidden items-center gap-2">
            {!session ? (
              <AdminControls isAuthenticated={false} />
            ) : (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="size-10 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center text-dark-blue transition-all active:scale-95 overflow-hidden"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Menu desplegable para moviles */}
      {session && isMobileMenuOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-[calc(100vw-2rem)] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-4xl p-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/admin/filtros"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-blue-celta/5 rounded-2xl border border-blue-celta/10 text-dark-blue group active:bg-blue-celta/10 transition-colors"
              >
                <div className="size-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">
                  🔍
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest">
                    Buscador
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                    Filtros Avanzados
                  </span>
                </div>
              </Link>

              <Link
                href="/admin/gestion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-red-celta/5 rounded-2xl border border-red-celta/10 text-dark-blue group active:bg-red-celta/10 transition-colors"
              >
                <div className="size-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-xl">
                  ⚙️
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest">
                    Gestión
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                    Registros y Datos
                  </span>
                </div>
              </Link>
            </div>

            <div className="pt-2">
              <AdminControls
                isAuthenticated={true}
                userImage={session.user?.image}
                userName={session.user?.name}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
