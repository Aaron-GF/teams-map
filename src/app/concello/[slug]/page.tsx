import { getConcello } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ConcelloPage({ params }: PageProps) {
  const { slug } = await params;
  const concello = getConcello(slug);

  if (!concello) {
    notFound();
  }

  // Placeholder clubs for demonstration
  const clubs = [
    { name: "Celta de Vigo", category: "La Liga", logo: "" },
    { name: "RC Celta B", category: "Primera RFEF", logo: "" },
    { name: "Gran Peña FC", category: "Tercera RFEF", logo: "" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Premium Header */}
      <header className="relative w-full h-[60vh] overflow-hidden">
        {concello.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={concello.imageUrl}
            alt={`Vista de ${concello.name}`}
            className="w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-100"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/80" />

        <div className="absolute top-8 right-8">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#E30613] text-[#1D428A] hover:text-white rounded-xl transition-all shadow-xl border border-gray-100"
          >
            <span className="text-lg transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Volver
            </span>
          </Link>
        </div>

        <div className="absolute bottom-16 left-8 md:left-16 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-12 bg-[#E30613] rounded-full" />
            <span className="text-[#87ADCE] font-black uppercase tracking-[0.3em] text-sm md:text-base">
              Concello de Galicia
            </span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
            {concello.name}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
        {/* Detail Card */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          <section className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100 transition-all hover:shadow-blue-900/10">
            <div className="flex flex-col md:flex-row gap-12 items-start justify-between mb-12 border-b border-gray-50 pb-12">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-[#87ADCE] uppercase tracking-[0.2em]">
                  Población Estimada
                </span>
                <span className="text-4xl font-black text-[#1D428A]">
                  {concello.population.toLocaleString()}{" "}
                  <span className="text-sm font-medium text-gray-400">
                    hab.
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-[#87ADCE] uppercase tracking-[0.2em]">
                  Provincia
                </span>
                <span className="text-4xl font-black text-[#1D428A]">
                  Galicia
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-2xl font-black text-[#1D428A] uppercase tracking-tight flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#E30613]" />
                Historia y Geografía
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                {concello.description}
              </p>
            </div>
          </section>

          {/* Football Clubs Section */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black text-[#1D428A] uppercase tracking-tighter flex items-center gap-3">
                <span className="text-[#E30613]">#</span>
                Clubes de Fútbol
              </h3>
              <div className="h-px flex-1 mx-8 bg-linear-to-r from-[#87ADCE]/20 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clubs.map((club, i) => (
                <div
                  key={i}
                  className="group bg-gray-50 rounded-3xl p-6 border border-gray-100 transition-all hover:bg-[#87ADCE]/5 hover:border-[#87ADCE]/30 hover:scale-[1.02] flex items-center gap-6 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-gray-100 group-hover:border-[#87ADCE]/20 transition-colors">
                    {/* Simplified logo placeholder */}
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#87ADCE] to-[#1D428A] opacity-20" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-[#1D428A] leading-tight">
                      {club.name}
                    </span>
                    <span className="text-xs font-bold text-[#87ADCE] uppercase tracking-wider">
                      {club.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info (e.g. Stats or Quick Info) */}
        <aside className="flex flex-col gap-8">
          <div className="bg-[#1D428A] rounded-[2.5rem] p-8 text-white shadow-xl flex flex-col gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <h4 className="text-xl font-black uppercase tracking-tight">
              Estadísticas Deportivas
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white/60 uppercase">
                  Clubes federados
                </span>
                <span className="text-2xl font-black">
                  {Math.floor(Math.random() * 20) + 5}
                </span>
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-2">
                <span className="text-xs font-bold text-white/60 uppercase">
                  Licencias activas
                </span>
                <span className="text-2xl font-black">
                  {Math.floor(Math.random() * 1000) + 200}
                </span>
              </div>
            </div>
            <button className="mt-4 w-full py-4 bg-[#E30613] hover:bg-[#c40510] rounded-2xl font-black text-sm uppercase tracking-widest transition-colors shadow-lg shadow-[#E30613]/20">
              Ver todos los clubes
            </button>
          </div>
        </aside>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-[#E30613]" />
            <span className="text-lg font-black text-[#1D428A]">
              MAPA DE GALICIA
            </span>
          </div>
          <p className="text-gray-400 text-sm font-medium">
            © 2025 · Celta de Vigo Edition
          </p>
        </div>
      </footer>
    </div>
  );
}
