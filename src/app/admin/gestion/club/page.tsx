import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { concellos } from "@/lib/data";
import ClubForm from "@/components/forms/ClubForm";

export default async function AdminClubFormPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

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

        {/* Componente del Formulario */}
        <ClubForm concellos={concellos} />
      </div>
    </main>
  );
}
