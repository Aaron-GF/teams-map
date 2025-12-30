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

// Map the generated JSON to the Concello interface and sort alphabetically
const allConcellos: Concello[] = municipalitiesData
  .map((m: any) => ({
    id: m.id,
    name: m.name,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const concellos: Concello[] = [...allConcellos];

export function getConcello(id: string): Concello | undefined {
  return concellos.find((c) => c.id === id);
}

// Mock Database
const MOCK_CLUBS: Club[] = [
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
  {
    id: "compostela",
    name: "SD Compostela",
    category: "Segunda RFEF",
    concelloId: "santiago-de-compostela",
  },
  {
    id: "pontevedra",
    name: "Pontevedra CF",
    category: "Segunda RFEF",
    concelloId: "pontevedra",
  },
];

const MOCK_PLAYERS: Player[] = [
  {
    id: "1",
    clubId: "celta-vigo",
    name: "Iago Aspas",
    birthDate: "2006-08-01",
    position: "Delantero",
    foot: "Zurdo",
    rating: 10,
    description:
      "Referente de la cantera. Máxima eficacia goleadora y visión de juego excepcional.",
  },
  {
    id: "2",
    clubId: "celta-vigo",
    name: "Fran Beltrán",
    birthDate: "2007-02-03",
    position: "Centrocampista",
    foot: "Diestro",
    rating: 8,
    description:
      "Motor del equipo juvenil. Gran capacidad de recuperación y distribución.",
  },
  {
    id: "3",
    clubId: "rc-celta-b",
    name: "Hugo Álvarez",
    birthDate: "2005-07-02",
    position: "Extremo",
    foot: "Diestro",
    rating: 9,
    description: "Extremo con gran desborde y calidad técnica en el filial.",
  },
  {
    id: "4",
    clubId: "compostela",
    name: "Lucas Barreiro",
    birthDate: "2010-07-08",
    position: "Delantero",
    foot: "Diestro",
    rating: 7,
    description: "Prometedor delantero infantil con gran juego aéreo.",
  },
  {
    id: "5",
    clubId: "pontevedra",
    name: "Charly",
    birthDate: "2008-05-15",
    position: "Delantero",
    foot: "Diestro",
    rating: 7,
    description:
      "Delantero cadete con instinto goleador y movilidad constante.",
  },
  {
    id: "6",
    clubId: "celta-vigo",
    name: "Óscar Mingueza",
    birthDate: "2006-05-13",
    position: "Defensa",
    foot: "Diestro",
    rating: 8,
    description:
      "Defensor polivalente con gran salida de balón para el equipo A.",
  },
];

export function getAllClubs(): Club[] {
  return MOCK_CLUBS;
}

export function getAllPlayers(): Player[] {
  return MOCK_PLAYERS;
}

// Mock Clubs
export function getClubsForConcello(concelloId: string): Club[] {
  return MOCK_CLUBS.filter((club) => club.concelloId === concelloId);
}

export function getClub(id: string): Club | undefined {
  return MOCK_CLUBS.find((c) => c.id === id);
}

// Mock Players
export function getPlayersForClub(clubId: string): Player[] {
  return MOCK_PLAYERS.filter((p) => p.clubId === clubId);
}
