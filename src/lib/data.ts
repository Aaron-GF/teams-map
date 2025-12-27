import municipalitiesData from "@/data/municipalities.json";

export interface Concello {
  id: string; // Slug para la URL
  name: string;
  population: number;
  description: string;
  imageUrl?: string;
}

// Map the generated JSON to the Concello interface
const allConcellos: Concello[] = municipalitiesData.map((m) => ({
  id: m.id,
  name: m.name,
  population: Math.floor(Math.random() * 50000) + 1000, // Placeholder population
  description: `Municipio de ${m.name}, ubicado en la comunidad autónoma de Galicia.`,
  imageUrl:
    "https://images.unsplash.com/photo-1576774619714-d035f5647565?q=80&w=2600&auto=format&fit=crop",
}));

// Predefined detailed data for some major cities
const detailedConcellos: Record<string, Partial<Concello>> = {
  "a-coruna": {
    population: 244850,
    description:
      "La ciudad de A Coruña es la capital de la provincia homónima. Conocida por la Torre de Hércules, el faro romano en funcionamiento más antiguo del mundo.",
    imageUrl:
      "https://images.unsplash.com/photo-1576774619714-d035f5647565?q=80&w=2600&auto=format&fit=crop",
  },
  "santiago-de-compostela": {
    population: 97848,
    description:
      "Capital de Galicia y destino final del Camino de Santiago, famosa por su catedral y su casco histórico Patrimonio de la Humanidad.",
    imageUrl:
      "https://images.unsplash.com/photo-1533224756184-4b5b8c9d4669?q=80&w=2574&auto=format&fit=crop",
  },
  vigo: {
    population: 292817,
    description:
      "La ciudad más poblada de Galicia, ubicada en las Rías Baixas. Es un importante puerto pesquero y centro industrial.",
    imageUrl:
      "https://images.unsplash.com/photo-1590760447385-05e1975b9f47?q=80&w=2574&auto=format&fit=crop",
  },
  ourense: {
    population: 103756,
    description:
      "Conocida como la ciudad de las Burgas por sus aguas termales. Es la única capital de provincia gallega sin salida al mar.",
    imageUrl:
      "https://images.unsplash.com/photo-1620748118678-755dd3f92561?q=80&w=2574&auto=format&fit=crop",
  },
  lugo: {
    population: 97260,
    description:
      "Famosa por su muralla romana, la única del mundo que se conserva entera y Patrimonio de la Humanidad.",
    imageUrl:
      "https://images.unsplash.com/photo-1589404739572-c0cb49a46c3b?q=80&w=2670&auto=format&fit=crop",
  },
};

export const concellos: Concello[] = allConcellos.map((c) => ({
  ...c,
  ...(detailedConcellos[c.id] || {}),
}));

export function getConcello(id: string): Concello | undefined {
  return concellos.find((c) => c.id === id);
}
