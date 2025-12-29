"use client";

import { useState, useEffect } from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AdminControlsProps {
  isAuthenticated: boolean;
  userImage?: string | null;
}

export default function AdminControls({
  isAuthenticated,
  userImage,
}: AdminControlsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  const handleLogin = async () => {
    setIsLoading(true);
    await signIn("google");
    // El redireccionamiento lo maneja NextAuth
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <>
      <nav className="fixed top-8 right-8 z-100 flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <button className="px-3.5 py-1.5 bg-blue-celta text-white rounded-2xl transition-all shadow-2xl shadow-blue-celta/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-blue-celta/50 hover:scale-105 active:scale-95">
              {userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userImage}
                  alt="User avatar"
                  className="size-6 rounded-full border border-white/20 shadow-sm"
                />
              ) : (
                <span>🛡️</span>
              )}
              Panel Admin
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 bg-white/10 backdrop-blur-lg hover:bg-red-celta/20 hover:text-red-celta text-gray-400 rounded-xl transition-all border border-white/20 shadow-xl group"
              title="Cerrar Sesión"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-dark-blue rounded-2xl transition-all border border-white/20 shadow-2xl text-[10px] font-black uppercase tracking-widest group flex items-center gap-2"
          >
            <span className="opacity-60 group-hover:opacity-100 transition-opacity">
              🔐
            </span>
            Admin
          </button>
        )}
      </nav>

      {/* Login Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-dark-blue/20 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/50 animate-in zoom-in-95 fade-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-gray-300 hover:text-dark-blue transition-colors p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-8">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-celta blur-2xl opacity-20 animate-pulse" />
                <div className="relative size-20 bg-linear-to-br from-blue-celta/20 to-dark-blue/10 rounded-3xl flex items-center justify-center text-4xl shadow-inner">
                  🔐
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-black text-dark-blue tracking-tighter uppercase mb-2">
                  Acceso Admin
                </h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                  Identifícate para gestionar <br /> el portal de fútbol base
                </p>
              </div>

              <div className="w-full h-px bg-linear-to-r from-transparent via-gray-100 to-transparent" />

              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full py-4.5 bg-dark-blue hover:bg-blue-celta disabled:bg-gray-300 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl shadow-dark-blue/20 hover:shadow-blue-celta/30 active:scale-95 flex items-center justify-center gap-3 overflow-hidden group"
              >
                {isLoading ? (
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="group-hover:translate-x-1 transition-transform">
                    Entrar →
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-300 hover:text-dark-blue transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
