"use client";

import { useState } from "react";
import { createPlayer } from "@/lib/actions";
import { Club } from "@/lib/data";

interface PlayerFormProps {
  clubs: Club[];
}

export default function PlayerForm({ clubs }: PlayerFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage(null);

    const result = await createPlayer(formData);

    setLoading(false);
    if (result.success) {
      setMessage({ type: "success", text: "¡Jugador registrado con éxito!" });
      const form = document.getElementById("player-form") as HTMLFormElement;
      form?.reset();
    } else {
      setMessage({ type: "error", text: `Error: ${result.error}` });
    }
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-gray-100">
      <form
        id="player-form"
        action={handleSubmit}
        className="flex flex-col gap-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
              Nombre <span>*</span>
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
              Club / Equipo <span>*</span>
            </label>
            <select
              name="clubId"
              required
              defaultValue=""
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
            >
              <option value="" disabled>
                Selecciona club
              </option>
              {clubs.map((club) => (
                <option key={club.id} value={club.id}>
                  {club.name} ({club.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
              Fecha de Nacimiento <span>*</span>
            </label>
            <input
              name="birthDate"
              type="date"
              required
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
              Posición <span>*</span>
            </label>
            <select
              name="position"
              required
              defaultValue=""
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
            >
              <option value="" disabled>
                Selecciona posición
              </option>
              <option value="Portero">Portero</option>
              <option value="Lateral derecho">Lateral derecho</option>
              <option value="Lateral izquierdo">Lateral izquierdo</option>
              <option value="Defensa central">Defensa central</option>
              <option value="Mediocentro">Mediocentro</option>
              <option value="Interior">Interior</option>
              <option value="Extremo">Extremo</option>
              <option value="Delantero">Delantero</option>
              <option value="Carrilero">Carrilero</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1">
              Pierna Hábil <span>*</span>
            </label>
            <div className="flex gap-4">
              {["Diestro", "Zurdo"].map((foot) => (
                <label key={foot} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="foot"
                    value={foot}
                    className="hidden peer"
                    required
                  />
                  <div className="py-4 text-center rounded-2xl text-[10px] font-black uppercase tracking-widest border border-gray-100 bg-gray-50 peer-checked:bg-dark-blue peer-checked:text-white peer-checked:border-dark-blue transition-all">
                    {foot}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-center md:text-left">
            <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1">
              Valoración General (1-10) <span>*</span>
            </label>
            <div className="flex gap-2 justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <label key={num} className="cursor-pointer flex-1">
                  <input
                    type="radio"
                    name="rating"
                    value={num}
                    className="hidden peer"
                    required
                  />
                  <div className="aspect-square flex items-center justify-center rounded-xl text-[10px] font-black border border-gray-100 bg-gray-50 peer-checked:bg-blue-celta peer-checked:text-white peer-checked:border-blue-celta transition-all">
                    {num}
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
            Foto del Jugador (Opcional)
          </label>
          <div className="relative group">
            <input
              name="image"
              type="file"
              accept="image/*"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-blue-celta/10 file:text-blue-celta hover:file:bg-blue-celta/20 transition-all cursor-pointer outline-hidden"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
            Descripción / Notas <span>*</span>
          </label>
          <textarea
            name="description"
            placeholder="Añade una breve descripción sobre el jugador..."
            required
            rows={4}
            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold text-dark-blue placeholder:text-gray-300 focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden resize-none"
          />
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

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-dark-blue text-white rounded-4xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-dark-blue/20 hover:bg-blue-celta transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registrando..." : "Registrar Jugador"}
          </button>
          <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest">
            Los campos marcados con (*) son obligatorios
          </p>
        </div>
      </form>
    </div>
  );
}
