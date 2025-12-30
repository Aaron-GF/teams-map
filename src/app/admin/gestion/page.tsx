import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAllClubs, getAllPlayers } from "@/lib/data";

export default async function AdminGestionPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // Obtener estadísticas en vivo
  const clubs = await getAllClubs();
  const players = await getAllPlayers();

  return (
    <main className="min-h-[70vh] flex flex-col items-center">
      <div className="max-w-6xl w-full px-6 py-12 flex flex-col gap-12">
        {/* Sección de Cabecera */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-blue-celta uppercase tracking-[0.3em] text-[10px] font-black">
              Panel de Control
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-blue-celta/20 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-6xl text-dark-blue uppercase tracking-tighter leading-none">
            Gestión de Datos
          </h1>
        </div>

        {/* Interfaz de Gestión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección Añadir Club */}
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col gap-6 group hover:scale-[1.02] transition-all">
            <div className="size-16 bg-blue-celta/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              ⚽
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black text-dark-blue uppercase tracking-tight">
                Añadir Clubes
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Registra nuevos clubes en la plataforma, define su categoría y
                asigna su municipio correspondiente.
              </p>
            </div>
            <Link
              href="/admin/gestion/club"
              className="mt-4 w-full py-4 bg-dark-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-celta transition-all text-center"
            >
              Ir a Formulario de Clubes
            </Link>
          </section>

          {/* Sección Añadir Jugador */}
          <section className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col gap-6 group hover:scale-[1.02] transition-all">
            <div className="size-16 bg-red-celta/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🏃‍♂️
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black text-dark-blue uppercase tracking-tight">
                Añadir Jugadores
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Gestiona las plantillas de los clubes añadiendo jugadores con
                sus fichas técnicas, fotos y valoraciones.
              </p>
            </div>
            <Link
              href="/admin/gestion/jugador"
              className="mt-4 w-full py-4 bg-dark-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-celta transition-all text-center"
            >
              Ir a Formulario de Jugadores
            </Link>
          </section>
        </div>

        {/* Sección de Estadísticas / Resumen */}
        <div className="bg-dark-blue rounded-4xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-blue-celta uppercase tracking-widest text-[10px] font-black">
              Resumen Actual
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              Estadísticas de la Base
            </h3>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black">{clubs.length}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 italic">
                Clubes
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black">{players.length}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 italic">
                Jugadores
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black">313</span>
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 italic">
                Municipios
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
