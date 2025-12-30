import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllClubs } from "@/lib/data";
import Link from "next/link";
import PlayerForm from "@/components/forms/PlayerForm";

export default async function AdminPlayerFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const allClubs = await getAllClubs();

  return (
    <main className="min-h-[70vh] flex flex-col items-center">
      <div className="max-w-4xl w-full px-6 py-12 flex flex-col gap-10">
        {/* Navegación de Vuelta */}
        <Link
          href="/admin/gestion"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-celta hover:translate-x-[-4px] transition-transform w-fit"
        >
          ← Volver al Panel de Gestión
        </Link>

        {/* Sección de Cabecera */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-blue-celta uppercase tracking-[0.3em] text-[10px] font-black">
              Gestión de Plantilla
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-blue-celta/20 to-transparent" />
          </div>
          <h1 className="text-4xl md:text-5xl text-dark-blue uppercase tracking-tighter leading-none">
            Nuevo Jugador
          </h1>
        </div>

        {/* Componente del Formulario */}
        <PlayerForm clubs={allClubs} />
      </div>
    </main>
  );
}
