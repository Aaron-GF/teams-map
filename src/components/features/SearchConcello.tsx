"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { concellos } from "@/lib/data";

export default function SearchConcello() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cierra el desplegable cuando se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtra las sugerencias
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    // Normaliza el texto (elimina acentos y minúsculas) para una mejor coincidencia
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const normalizedQuery = normalize(query);

    return concellos
      .filter((c) => normalize(c.name).includes(normalizedQuery))
      .slice(0, 3);
  }, [query]);

  const handleSelect = (id: string) => {
    router.push(`/concello/${id}`);
    setQuery("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0].id);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl z-50 mb-12">
      <div className="relative group">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Busca el concello..."
          className="w-full pl-14 pr-10 py-4 bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-celta/50 focus:border-blue-celta transition-all text-dark-blue placeholder-gray-400 font-medium"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-celta transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            className="size-5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0"
              strokeWidth={2.5}
            />
          </svg>
        </div>
      </div>

      {/* Desplegable de sugerencias */}
      {isOpen && query.trim() !== "" && (
        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.length > 0 ? (
            <ul className="divide-y divide-gray-50">
              {suggestions.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => handleSelect(c.id)}
                    className="w-full px-6 py-4 text-left hover:bg-blue-celta/5 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="text-dark-blue font-bold tracking-tight group-hover:text-blue-celta transition-colors">
                        {c.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-celta/30 group-hover:text-blue-celta transition-colors">
                      Seleccionar →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-400 text-sm font-medium">
                No se encontraron municipios
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
