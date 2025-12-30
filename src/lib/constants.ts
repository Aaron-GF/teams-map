export const FOOTBALL_CATEGORIES = [
  "Biberón",
  "Prebenjamín",
  "Benjamín",
  "Alevín",
  "Infantil",
  "Cadete",
  "Juvenil",
] as const;

export const PLAYER_POSITIONS = [
  "Portero",
  "Lateral derecho",
  "Lateral izquierdo",
  "Defensa central",
  "Mediocentro",
  "Interior",
  "Extremo",
  "Delantero",
  "Carrilero",
] as const;

export const PROVINCE_COLORS: Record<string, string> = {
  "15": "#87ADCE", // A Coruña
  "27": "#7399BD", // Lugo
  "32": "#A5C4DF", // Ourense
  "36": "#6CACE4", // Pontevedra
};

export const PROVINCE_NAMES: Record<string, string> = {
  "15": "A Coruña",
  "27": "Lugo",
  "32": "Ourense",
  "36": "Pontevedra",
};
