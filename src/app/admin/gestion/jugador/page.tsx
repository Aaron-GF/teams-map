import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllClubs } from "@/lib/data";
import Link from "next/link";

export default async function AdminPlayerFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const allClubs = getAllClubs();

  return (
    <main className="min-h-[70vh] flex flex-col items-center">
      <div className="max-w-4xl w-full px-6 py-12 flex flex-col gap-10">
        {/* Breadcrumbs / Back navigation */}
        <Link
          href="/admin/gestion"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-celta hover:translate-x-[-4px] transition-transform w-fit"
        >
          ← Volver al Panel de Gestión
        </Link>

        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-blue-celta uppercase tracking-[0.3em] text-[10px] font-black">
              Gestión de Plantilla
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-blue-celta/20 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-5xl text-dark-blue uppercase tracking-tighter leading-none">
            Nuevo Jugador
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-gray-100">
          <form className="flex flex-col gap-10">
            {/* Row 1: Name and Club */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
                  Nombre <span>*</span>
                </label>
                <input
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
                  required
                  defaultValue=""
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
                >
                  <option value="" disabled>
                    Selecciona club
                  </option>
                  {allClubs.map((club) => (
                    <option key={club.id} value={club.id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Birth Date and Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
                  Fecha de Nacimiento <span>*</span>
                </label>
                <input
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

            {/* Row 3: Foot and Rating */}
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

            {/* Field: Description */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
                Descripción / Notas <span>*</span>
              </label>
              <textarea
                placeholder="Añade una breve descripción sobre el jugador..."
                required
                rows={4}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl text-sm font-bold text-dark-blue placeholder:text-gray-300 focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden resize-none"
              />
            </div>

            {/* Submit Section */}
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="w-full py-5 bg-dark-blue text-white rounded-2rem text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-dark-blue/20 hover:bg-blue-celta transition-all active:scale-95"
              >
                Registrar Jugador
              </button>
              <p className="text-center text-[9px] font-bold text-gray-300 uppercase tracking-widest">
                Los campos marcados con (*) son obligatorios
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
