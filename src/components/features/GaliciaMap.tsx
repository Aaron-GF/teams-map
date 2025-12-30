"use client";

import { useRouter } from "next/navigation";
import municipalities from "@/data/municipalities.json";
import { type MunicipalityJSON } from "@/types";
import { PROVINCE_COLORS, PROVINCE_NAMES } from "@/lib/constants";

export default function GaliciaMap() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="aspect-square w-full relative bg-gray-50 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden group">
        <svg
          viewBox="0 0 10000 10000"
          className="size-full"
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

          {(municipalities as MunicipalityJSON[]).map(
            (municipality: MunicipalityJSON) => (
              <path
                key={municipality.id}
                d={municipality.d}
                onClick={() => router.push(`/concello/${municipality.id}`)}
                style={{
                  fill: PROVINCE_COLORS[municipality.provinceId] || "#87ADCE",
                  stroke: "#FFFFFF",
                  strokeWidth: "15",
                }}
                className="transition-all duration-300 cursor-pointer hover:fill-red-celta! hover:stroke-[#FFFFFF] hover:stroke-40 hover:z-50 focus:outline-none"
              >
                <title>
                  {`${municipality.name} (${
                    PROVINCE_NAMES[municipality.provinceId]
                  })`}
                </title>
              </path>
            )
          )}
        </svg>
      </div>

      <div className="flex justify-center items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-dark-blue">
        <span className="w-12 h-px bg-[#87ADCE]/30" />
        Selecciona un municipio para ver sus clubes
        <span className="w-12 h-px bg-[#87ADCE]/30" />
      </div>
    </div>
  );
}
