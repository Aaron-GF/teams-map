"use client";

import { useState } from "react";
import { createClub } from "@/lib/actions";
import { type Concello } from "@/types";
import { FOOTBALL_CATEGORIES } from "@/lib/constants";

interface ClubFormProps {
  concellos: Concello[];
}

export default function ClubForm({ concellos }: ClubFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const result = await createClub(formData);

    setLoading(false);
    if (result.success) {
      setMessage({ type: "success", text: "¡Club registrado con éxito!" });
      // Reiniciar el formulario
      const form = document.getElementById("club-form") as HTMLFormElement;
      form?.reset();
    } else {
      setMessage({ type: "error", text: `Error: ${result.error}` });
    }
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-gray-100">
      <form
        id="club-form"
        action={handleSubmit}
        className="flex flex-col gap-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
              Nombre del Club <span>*</span>
            </label>
            <input
              name="name"
              type="text"
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
              Categoría <span>*</span>
            </label>
            <select
              name="category"
              required
              defaultValue=""
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
            >
              <option value="" disabled>
                Selecciona categoría
              </option>
              {FOOTBALL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
              División <span>*</span>
            </label>
            <input
              name="division"
              type="text"
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
              Concello <span>*</span>
            </label>
            <select
              name="concelloId"
              required
              defaultValue=""
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
            >
              <option value="" disabled>
                Selecciona municipio
              </option>
              {concellos.map((concello) => (
                <option key={concello.id} value={concello.id}>
                  {concello.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center ${
              message.type === "success"
                ? "bg-green-50 text-green-600 border border-green-100"
                : "bg-red-50 text-red-600 border border-red-100"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-dark-blue text-white rounded-4xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-dark-blue/20 hover:bg-blue-celta transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registrando..." : "Registrar Club"}
          </button>
          <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest">
            Los campos marcados con (*) son obligatorios
          </p>
        </div>
      </form>
    </div>
  );
}
