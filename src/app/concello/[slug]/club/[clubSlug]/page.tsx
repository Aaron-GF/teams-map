import { getConcello, getClub, getPlayersForClub } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PlayerCard from "@/components/PlayerCard";

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
  const club = getClub(clubSlug);

  return {
    title: club ? `Jugadores - ${club.name}` : "Club no encontrado",
  };
}

export default async function ClubPage({ params }: PageProps) {
  const { slug, clubSlug } = await params;
  const concello = getConcello(slug);
  const club = getClub(clubSlug);
  const session = await getServerSession(authOptions);

  // Redirigir si no es admin, ya que esta página es privada
  if (!session) {
    redirect(`/concello/${slug}`);
  }

  if (!concello || !club) {
    notFound();
  }

  const players = getPlayersForClub(clubSlug);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Mini Header / Navigation */}
      <div className="w-full bg-dark-blue py-12 px-6 flex flex-col items-center text-center gap-4 shadow-2xl">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <Link
            href={`/concello/${slug}`}
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10"
          >
            ← Volver al municipio
          </Link>

          <div className="flex flex-col items-center md:items-end">
            <span className="text-blue-celta uppercase tracking-[0.3em] text-[10px] font-black">
              Plantilla de jugadores
            </span>
            <h1 className="text-2xl md:text-4xl text-white uppercase tracking-tighter">
              {club.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl w-full px-6 py-16 flex flex-col gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl text-dark-blue uppercase tracking-tighter flex items-center gap-3">
            <span className="text-red-celta">#</span>
            Listado de Jugadores
          </h2>
          <span className="text-sm font-bold text-gray-400">
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
              <h3 className="text-xl font-black text-dark-blue uppercase">
                Sin jugadores
              </h3>
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
