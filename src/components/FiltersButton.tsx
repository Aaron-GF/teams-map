"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function FiltersButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear scroll cuando el panel está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const slideOverContent = (
    <div className="fixed inset-0 z-200 overflow-hidden">
      <div
        className="absolute inset-0 bg-dark-blue/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-500"
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="relative w-screen max-w-md animate-in slide-in-from-right duration-500">
          <div className="h-full flex flex-col bg-white shadow-2xl rounded-l-[3rem] border-l border-white/50">
            {/* Header */}
            <div className="px-8 py-10 flex items-center justify-between border-b border-gray-50">
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-dark-blue uppercase tracking-tighter">
                  Filtros Avanzados
                </h2>
                <span className="text-[10px] font-bold text-blue-celta uppercase tracking-widest mt-1">
                  Panel de Administración
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="size-10 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-dark-blue hover:bg-gray-100 transition-all"
              >
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
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10 flex flex-col gap-10">
              {/* Category Filter */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-dark-blue uppercase tracking-[0.2em] italic">
                  Categoría
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Primera RFEF",
                    "Segunda RFEF",
                    "Tercera RFEF",
                    "Preferente",
                  ].map((cat) => (
                    <button
                      key={cat}
                      className="px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:bg-blue-celta/5 hover:border-blue-celta/20 hover:text-blue-celta transition-all"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black text-dark-blue uppercase tracking-[0.2em] italic">
                  Estado de Datos
                </span>
                <div className="flex flex-wrap gap-3">
                  {["Completos", "Pendientes", "Sin Jugadores"].map(
                    (status) => (
                      <button
                        key={status}
                        className="px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:border-dark-blue/20 hover:text-dark-blue transition-all"
                      >
                        {status}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Placeholder for more filters */}
              <div className="p-8 bg-blue-celta/5 border border-dashed border-blue-celta/20 rounded-3xl flex flex-col items-center text-center gap-3">
                <span className="text-xl opacity-40">🏗️</span>
                <p className="text-[10px] font-bold text-blue-celta/60 uppercase tracking-widest leading-relaxed">
                  Más filtros de búsqueda <br /> próximamente
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-10 bg-gray-50/50 border-t border-gray-100 flex gap-4">
              <button className="flex-1 py-4 bg-dark-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-dark-blue/20 hover:bg-blue-celta transition-all">
                Aplicar Filtros
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-4 bg-white border border-gray-200 text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-red-celta hover:border-red-celta/20 transition-all"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-2.5 bg-white/50 border border-white hover:border-blue-celta/30 hover:bg-white transition-all rounded-2xl shadow-sm group"
      >
        <div className="size-6 rounded-lg bg-linear-to-br from-blue-celta/10 to-dark-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="size-3.5 text-blue-celta"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 18H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 12h7.5"
            />
          </svg>
        </div>
        <span className="text-[10px] font-black text-dark-blue uppercase tracking-widest hidden md:inline">
          Filtros
        </span>
      </button>

      {isOpen && mounted && createPortal(slideOverContent, document.body)}
    </>
  );
}
