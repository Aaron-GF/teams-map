"use client";

import Link from "next/link";

import municipalities from "@/data/municipalities.json";

const COLOR_MAP: Record<string, string> = {
  "15": "#87ADCE", // A Coruña - Celeste Base
  "27": "#7399BD", // Lugo - Azul Profundo
  "32": "#A5C4DF", // Ourense - Celeste Suave
  "36": "#6CACE4", // Pontevedra - Azul Celta
};

const PROVINCE_NAMES: Record<string, string> = {
  "15": "A Coruña",
  "27": "Lugo",
  "32": "Ourense",
  "36": "Pontevedra",
};

export default function GaliciaMap() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
      <div className="aspect-square w-full relative bg-gray-50 rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden group">
        <svg
          viewBox="0 0 10000 10000"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Decorative Pattern */}
          <defs>
            <pattern
              id="grid"
              width="500"
              height="500"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 500 0 L 0 0 0 500"
                fill="none"
                stroke="rgba(135, 173, 206, 0.1)"
                strokeWidth="10"
              />
            </pattern>
          </defs>
          <rect width="10000" height="10000" fill="url(#grid)" />

          {municipalities.map((municipality: any) => (
            <Link key={municipality.id} href={`/concello/${municipality.id}`}>
              <path
                d={municipality.d}
                style={{
                  fill: COLOR_MAP[municipality.provinceId] || "#87ADCE",
                  stroke: "#FFFFFF",
                  strokeWidth: "15",
                }}
                className="transition-all duration-300 cursor-pointer hover:fill-[#E30613]! hover:stroke-[#FFFFFF] hover:stroke-40 hover:z-50 focus:outline-none"
              >
                <title>
                  {municipality.name} ({PROVINCE_NAMES[municipality.provinceId]}
                  )
                </title>
              </path>
            </Link>
          ))}
        </svg>
      </div>

      <div className="flex justify-center items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#87ADCE]">
        <span className="w-12 h-px bg-[#87ADCE]/30" />
        Selecciona un municipio para ver sus clubes
        <span className="w-12 h-px bg-[#87ADCE]/30" />
      </div>
    </div>
  );
}
