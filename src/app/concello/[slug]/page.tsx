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
    <div className="font-sans">
      {/* Header */}
      <header className="relative w-full h-[40vh] bg-linear-to-b from-dark-blue to-[#0f2a5a] overflow-hidden flex flex-col justify-center items-center text-center">
        <div className="absolute top-8 right-8 z-20">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md hover:bg-red-celta text-white rounded-xl transition-all border border-white/10"
          >
            <span className="text-lg transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              Volver
            </span>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-red-celta" />
            <span className="text-blue-celta uppercase tracking-[0.3em] text-xs">
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
      <main className="max-w-6xl mx-auto w-full px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
        {/* Tarjeta de detalle */}
        <div className="lg:col-span-2 flex flex-col gap-12">
          {/* Sección de clubes de fútbol */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl text-dark-blue uppercase tracking-tighter flex items-center gap-3">
                <span className="text-red-celta">#</span>
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
                  <div className="size-16 rounded-2xl shadow-sm flex items-center justify-center border border-gray-100 group-hover:border-[#87ADCE]/20 transition-colors">
                    {/* Logo simplificado */}
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
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
