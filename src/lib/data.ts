import municipalitiesData from "@/data/municipalities.json";

export interface Concello {
  id: string; // Slug para la URL
  name: string;
}

// Map the generated JSON to the Concello interface
const allConcellos: Concello[] = municipalitiesData.map((m) => ({
  id: m.id,
  name: m.name,
}));

export const concellos: Concello[] = allConcellos.map((c) => ({
  ...c,
}));

export function getConcello(id: string): Concello | undefined {
  return concellos.find((c) => c.id === id);
}
