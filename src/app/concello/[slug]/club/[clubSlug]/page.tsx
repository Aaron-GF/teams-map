import { getConcello, getClub, getPlayersForClub } from "@/lib/data";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PlayerCard from "@/components/features/PlayerCard";

interface PageProps {
  params: Promise<{
    slug: string;
    clubSlug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { clubSlug } = await params;
  const club = await getClub(clubSlug);

  return {
    title: club ? `Jugadores - ${club.name}` : "Club no encontrado",
  };
}

export default async function ClubPage({ params }: PageProps) {
  const { slug, clubSlug } = await params;
  const concello = getConcello(slug);
  const club = await getClub(clubSlug);
  const session = await getServerSession(authOptions);

  // Redirigir si no es admin, ya que esta página es privada
  if (!session) {
    redirect(`/concello/${slug}`);
  }

  if (!concello || !club) {
    notFound();
  }

  const players = await getPlayersForClub(clubSlug);

  return (
    <main className="min-h-screen bg-transparent flex flex-col items-center">
      <div className="max-w-5xl w-full px-2 md:px-6 py-8 flex flex-col">
        <div className="flex items-center gap-4 text-sm font-bold text-gray-400 mb-6">
          <span className="text-blue-celta uppercase tracking-[0.2em]">
            {concello.name}
          </span>
          <span className="opacity-30">/</span>
          <span className="text-dark-blue uppercase tracking-[0.2em]">
            {club.name}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-100 mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            <div className="size-24 md:size-32 bg-white rounded-3xl shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden shrink-0 p-3">
              {club.imageUrl ? (
                <img
                  src={club.imageUrl}
                  alt={club.name}
                  className="size-full object-contain"
                />
              ) : (
                <span className="text-4xl md:text-5xl opacity-20">🛡️</span>
              )}
            </div>
            <div className="flex flex-col my-auto gap-2">
              <span className="text-dark-blue uppercase tracking-widest text-[10px] md:text-xs font-black">
                {club.category} <br />
                {club.division}
              </span>
            </div>
          </div>
          <span className="px-5 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-xs text-dark-blue/60 uppercase">
            {players.length}{" "}
            {players.length === 1
              ? "jugador registrado"
              : "jugadores registrados"}
          </span>
        </div>

        <div className="flex flex-col gap-8">
          {players.length > 0 ? (
            players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <div className="bg-white rounded-5xl p-4 py-20 md:p-20 shadow-xl border border-gray-100 flex flex-col items-center text-center gap-4">
              <div className="size-20 bg-gray-50 rounded-3xl flex items-center justify-center text-4xl opacity-40">
                📋
              </div>
              <h2 className="text-xl font-black text-dark-blue uppercase">
                Sin jugadores
              </h2>
              <p className="text-gray-500 max-w-xs">
                No se han encontrado registros de jugadores para este equipo.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
