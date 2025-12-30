import { getConcello, getClub, getPlayersForClub } from "@/lib/data";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PlayerCard from "@/components/features/PlayerCard";
import DeleteClubButton from "@/components/ui/DeleteClubButton";
import Link from "next/link";

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
      <div className="max-w-5xl w-full px-6 py-8 flex flex-col gap-10">
        <div className="flex items-center gap-4 text-sm font-bold text-gray-400 mb-2">
          <span className="text-blue-celta uppercase tracking-[0.2em]">
            {concello.name}
          </span>
          <span className="opacity-30">/</span>
          <span className="text-dark-blue uppercase tracking-[0.2em]">
            {club.name}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-blue-celta uppercase tracking-[0.3em] text-[10px] font-black">
              Plantilla de jugadores
            </span>
            <h1 className="text-4xl md:text-6xl text-dark-blue uppercase tracking-tighter leading-none">
              {club.name}
            </h1>
          </div>
          <span className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100 text-sm font-bold text-dark-blue/60">
            {players.length} {players.length === 1 ? "jugador" : "jugadores"}{" "}
            registrados
          </span>
        </div>

        <div className="flex flex-col gap-8">
          {players.length > 0 ? (
            players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <div className="bg-white rounded-[2.5rem] p-20 shadow-xl border border-gray-100 flex flex-col items-center text-center gap-4">
              <div className="size-20 bg-gray-50 rounded-3xl flex items-center justify-center text-4xl opacity-40">
                📋
              </div>
              <h2 className="text-xl font-black text-dark-blue uppercase">
                Sin jugadores
              </h2>
              <p className="text-gray-500 max-w-xs">
                No se han encontrado registros de jugadores para este club
                todavía.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
