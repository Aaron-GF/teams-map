import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllPlayers, getAllClubs } from "@/lib/data";
import AdvancedFilters from "@/components/AdvancedFilters";

export default async function AdminFiltersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const allPlayers = await getAllPlayers();
  const allClubs = await getAllClubs();

  return (
    <main className="min-h-[70vh] flex flex-col items-center">
      <div className="max-w-6xl w-full px-6 py-12 flex flex-col gap-12">
        {/* Sección de Cabecera */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-blue-celta uppercase tracking-[0.3em] text-[10px] font-black">
              Gestión Avanzada
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-blue-celta/20 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-6xl text-dark-blue uppercase tracking-tighter leading-none">
            Buscador de Jugadores
          </h1>
        </div>

        {/* Filtros y Resultados */}
        <AdvancedFilters allPlayers={allPlayers} allClubs={allClubs} />
      </div>
    </main>
  );
}
