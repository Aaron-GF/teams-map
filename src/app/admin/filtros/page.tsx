import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllPlayers, getAllClubs } from "@/lib/data";
import AdvancedFilters from "@/components/features/AdvancedFilters";

export default async function AdminFiltersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const allPlayers = await getAllPlayers();
  const allClubs = await getAllClubs();

  return (
    <main className="min-h-[70vh] flex flex-col items-center">
      <div className="max-w-6xl w-full px-2 md:px-6 py-12 flex flex-col gap-12">

        {/* Filtros y Resultados */}
        <AdvancedFilters allPlayers={allPlayers} allClubs={allClubs} />
      </div>
    </main>
  );
}
