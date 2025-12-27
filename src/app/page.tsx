import GaliciaMap from "@/components/GaliciaMap";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
          Concellos de Galicia
        </h1>
        <p className="text-lg text-gray-600">
          Explora la información detallada de los municipios de Galicia haciendo
          clic en el mapa interactivo.
        </p>
      </div>

      <GaliciaMap />
    </main>
  );
}
