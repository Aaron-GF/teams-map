import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllClubs, concellos } from "@/lib/data";
import Link from "next/link";
import DeleteClubButton from "@/components/ui/DeleteClubButton";

export default async function ClubListPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const allClubs = await getAllClubs();

  return (
    <main className="min-h-[70vh] flex flex-col items-center">
      <div className="max-w-4xl w-full px-2 md:px-6 py-12 flex flex-col gap-10">
        {/* Navegación de Vuelta */}
        <Link
          href="/admin/gestion"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-celta hover:translate-x-[-4px] transition-transform w-fit"
        >
          ← Volver al Panel de Gestión
        </Link>

        {/* Listado de equipos */}
        <div className="bg-white rounded-6xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col gap-4">
          {allClubs.length > 0 ? (
            <div className="flex flex-col gap-2">
              {allClubs.map((club) => {
                const concello = concellos.find(
                  (c) => c.id === club.concelloId
                );
                return (
                  <div
                    key={club.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-celta/30 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                        {club.imageUrl ? (
                          <img
                            src={club.imageUrl}
                            alt={club.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-xl opacity-20">🛡️</span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-dark-blue uppercase tracking-tight">
                          {club.name}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                          {club.category} • {club.division} •{" "}
                          {concello?.name || club.concelloId}
                        </span>
                      </div>
                    </div>
                    <DeleteClubButton
                      clubId={club.id}
                      clubName={club.name}
                      imageUrl={club.imageUrl}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 flex flex-col items-center gap-4">
              <span className="text-4xl opacity-20">🛡️</span>
              <p className="text-gray-500 font-medium">
                No hay equipos registrados todavía.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
