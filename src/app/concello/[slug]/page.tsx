import { getConcello, getClubsForConcello } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const concello = getConcello(slug);

  return {
    title: concello ? concello.name : "Concello no encontrado",
  };
}

export default async function ConcelloPage({ params }: PageProps) {
  const { slug } = await params;
  const concello = getConcello(slug);
  const session = await getServerSession(authOptions);
  const isAdmin = !!session;

  if (!concello) {
    notFound();
  }

  const clubs = await getClubsForConcello(slug);

  return (
    <>
      <header className="relative w-full h-[35vh] bg-linear-to-b from-dark-blue to-[#0f2a5a] overflow-hidden flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-red-celta" />
            <span className="text-blue-celta uppercase tracking-[0.3em] text-xs font-black">
              Concello de Galicia
            </span>
            <div className="w-12 h-[2px] bg-red-celta" />
          </div>
          <h1 className="text-3xl md:text-6xl text-white uppercase tracking-tighter drop-shadow-2xl">
            {concello.name}
          </h1>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-6xl mx-auto w-full px-2 md:px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
        <div className="lg:col-span-3 flex flex-col gap-12">
          {/* Sección de clubes de fútbol */}
          <section className="flex flex-col gap-8 bg-white rounded-6xl p-4 md:p-12 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl text-dark-blue uppercase tracking-tighter flex items-center gap-3">
                <span className="text-red-celta">#</span>
                Clubes de Fútbol
              </h2>
              <div className="h-px flex-1 mx-8 bg-linear-to-r from-blue-celta/20 to-transparent" />
            </div>

            {isAdmin ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubs.length > 0 ? (
                  clubs.map((club) => (
                    <Link
                      key={club.id}
                      href={`/concello/${slug}/club/${club.id}`}
                      className="group bg-gray-50 rounded-3xl p-6 border border-gray-100 transition-all hover:bg-blue-celta/5 hover:border-blue-celta/30 hover:scale-[1.02] flex items-center gap-6"
                    >
                      <div className="size-16 rounded-2xl shadow-sm flex items-center justify-center border border-gray-100 group-hover:border-blue-celta/20 transition-colors bg-white">
                        <div className="size-8 rounded-full bg-linear-to-br from-blue-celta to-dark-blue opacity-20" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-lg font-black text-dark-blue leading-tight">
                          {club.name}
                        </span>
                        <span className="text-xs font-bold text-blue-celta uppercase tracking-wider">
                          {club.category}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-400 font-medium">
                    No hay clubes registrados todavía en este municipio.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50/50 rounded-4xl border border-dashed border-gray-200">
                <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 text-2xl">
                  🔒
                </div>
                <h3 className="text-xl font-black text-dark-blue uppercase tracking-tight mb-2">
                  Acceso Restringido
                </h3>
                <p className="text-gray-500 text-sm max-w-sm mb-8">
                  La información detallada de los clubes y jugadores solo está
                  disponible para usuarios administradores.
                </p>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-celta border border-blue-celta/30 px-4 py-2 rounded-full">
                  Identifícate como Admin para continuar
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
