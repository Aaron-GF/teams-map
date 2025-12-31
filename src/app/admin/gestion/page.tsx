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
      <div className="max-w-6xl w-full px-2 md:px-6 py-12 flex flex-col gap-12">

        {/* Interfaz de Gestión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección Añadir Equipo */}
          <section className="bg-white rounded-6xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col gap-6 group hover:scale-[1.02] transition-all">
            <div className="size-16 bg-blue-celta/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              ⚽
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black text-dark-blue uppercase tracking-tight">
                Equipos
              </h2>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                Gestiona los equipos de la plataforma, define su categoría y
                asigna su municipio correspondiente.
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="/admin/gestion/club"
                className="w-full py-4 bg-dark-blue text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-celta transition-all text-center"
              >
                Añadir Nuevo Equipo
              </Link>
              <Link
                href="/admin/gestion/club/list"
                className="w-full py-4 bg-gray-50 text-dark-blue border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all text-center"
              >
                Ver Listado y Eliminar
              </Link>
            </div>
          </section>

          {/* Sección Añadir Jugador */}
          <section className="bg-white rounded-6xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col gap-6 group hover:scale-[1.02] transition-all">
            <div className="size-16 bg-red-celta/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🏃‍♂️
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-black text-dark-blue uppercase tracking-tight">
                Jugadores
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
              Añadir nuevo Jugador
            </Link>
          </section>
        </div>

        {/* Sección de Estadísticas / Resumen */}
        <div className="bg-dark-blue rounded-4xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-blue-celta uppercase tracking-tighter">
              Resumen Actual de la Base de datos
            </h2>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black">{clubs.length}</span>
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-60 italic">
                Equipos
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
