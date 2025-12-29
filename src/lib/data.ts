import municipalitiesData from "@/data/municipalities.json";

export interface Concello {
  id: string; // Slug para la URL
  name: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  concelloId: string;
}

export interface Player {
  id: string;
  clubId: string;
  name: string;
  birthDate: string;
  position: string;
  foot: "Diestro" | "Zurdo";
  rating: number; // 1-10
  description: string;
  imageUrl?: string;
}

// Map the generated JSON to the Concello interface
const allConcellos: Concello[] = municipalitiesData.map((m: any) => ({
  id: m.id,
  name: m.name,
}));

export const concellos: Concello[] = allConcellos.map((c) => ({
  ...c,
}));

export function getConcello(id: string): Concello | undefined {
  return concellos.find((c) => c.id === id);
}

// Mock Clubs
export function getClubsForConcello(concelloId: string): Club[] {
  return [
    {
      id: "celta-vigo",
      name: "Celta de Vigo",
      category: "La Liga",
      concelloId: "vigo",
    },
    {
      id: "rc-celta-b",
      name: "RC Celta B",
      category: "Primera RFEF",
      concelloId: "vigo",
    },
    {
      id: "gran-pena",
      name: "Gran Peña FC",
      category: "Tercera RFEF",
      concelloId: "vigo",
    },
  ].filter((club) => club.concelloId === concelloId);
}

export function getClub(id: string): Club | undefined {
  const allClubs = [
    {
      id: "celta-vigo",
      name: "Celta de Vigo",
      category: "La Liga",
      concelloId: "vigo",
    },
    {
      id: "rc-celta-b",
      name: "RC Celta B",
      category: "Primera RFEF",
      concelloId: "vigo",
    },
    {
      id: "gran-pena",
      name: "Gran Peña FC",
      category: "Tercera RFEF",
      concelloId: "vigo",
    },
  ];
  return allClubs.find((c) => c.id === id);
}

// Mock Players
export function getPlayersForClub(clubId: string): Player[] {
  const players: Player[] = [
    {
      id: "1",
      clubId: "celta-vigo",
      name: "Iago Aspas",
      birthDate: "1987-08-01",
      position: "Delantero",
      foot: "Zurdo",
      rating: 10,
      description:
        "Capitán y leyenda del club. Máxima eficacia goleadora y visión de juego excepcional.",
      imageUrl:
        "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=200&auto=format&fit=crop",
    },
    {
      id: "2",
      clubId: "celta-vigo",
      name: "Fran Beltrán",
      birthDate: "1999-02-03",
      position: "Centrocampista",
      foot: "Diestro",
      rating: 8,
      description:
        "Motor del equipo en el centro del campo. Gran capacidad de recuperación y distribución.",
    },
  ];
  return players.filter((p) => p.clubId === clubId);
}
