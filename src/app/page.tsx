import GaliciaMap from "@/components/features/GaliciaMap";
import SearchConcello from "@/components/features/SearchConcello";

export default function Home() {
  return (
    <main className="p-2 md:p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          Fútbol base en Galicia
        </h1>
        <p className="text-lg text-gray-600">
          Explora la información detallada seleccionando el municipio en el mapa
          interactivo o usando el buscador.
        </p>
      </div>

      <SearchConcello />
      <GaliciaMap />
    </main>
  );
}
