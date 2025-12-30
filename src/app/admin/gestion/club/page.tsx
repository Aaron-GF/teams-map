import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { concellos } from "@/lib/data";
import Link from "next/link";

export default async function AdminClubFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

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
              Gestión de Base
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-blue-celta/20 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-5xl text-dark-blue uppercase tracking-tighter leading-none">
            Nuevo Club Deportivo
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-gray-100">
          <form className="flex flex-col gap-10">
            {/* Field Group: Club Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
                  Nombre del Club <span>*</span>
                </label>
                <input
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
                  required
                  defaultValue=""
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold text-dark-blue focus:bg-white focus:border-blue-celta/30 transition-all outline-hidden appearance-none"
                >
                  <option value="" disabled>
                    Selecciona categoría
                  </option>
                  <option value="La Liga">La Liga</option>
                  <option value="Primera RFEF">Primera RFEF</option>
                  <option value="Segunda RFEF">Segunda RFEF</option>
                  <option value="Tercera RFEF">Tercera RFEF</option>
                  <option value="Preferente">Preferente</option>
                </select>
              </div>
            </div>

            {/* Field: Municipality */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black text-dark-blue uppercase tracking-widest italic ml-1 flex justify-between">
                Concello <span>*</span>
              </label>
              <select
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

            {/* Submit Section */}
            <div className="flex flex-col gap-4 mt-6">
              <button
                type="submit"
                className="w-full py-5 bg-dark-blue text-white rounded-2rem text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-dark-blue/20 hover:bg-blue-celta transition-all active:scale-95"
              >
                Registrar Club
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
