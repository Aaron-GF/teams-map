import { supabase } from "./supabase";
import municipalitiesData from "@/data/municipalities.json";

export interface Concello {
  id: string; // Slug para la URL
  name: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  division: string;
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

// Concellos are static local data
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

// Database Fetchers
export async function getAllClubs(): Promise<Club[]> {
  const { data, error } = await supabase
    .from("clubs")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching clubs:", error);
    return [];
  }

  return data.map((club) => ({
    id: club.id,
    name: club.name,
    category: club.category,
    division: club.division,
    concelloId: club.concello_id,
  }));
}

export async function getAllPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching players:", error);
    return [];
  }

  return data.map((player) => ({
    id: player.id,
    clubId: player.club_id,
    name: player.name,
    birthDate: player.birth_date,
    position: player.position,
    foot: player.foot,
    rating: player.rating,
    description: player.description,
    imageUrl: player.image_url,
  }));
}

export async function getClubsForConcello(concelloId: string): Promise<Club[]> {
  const { data, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("concello_id", concelloId)
    .order("name");

  if (error) {
    console.error("Error fetching clubs for concello:", error);
    return [];
  }

  return data.map((club) => ({
    id: club.id,
    name: club.name,
    category: club.category,
    division: club.division,
    concelloId: club.concello_id,
  }));
}

export async function getClub(id: string): Promise<Club | undefined> {
  const { data, error } = await supabase
    .from("clubs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching club:", error);
    return undefined;
  }

  return {
    id: data.id,
    name: data.name,
    category: data.category,
    division: data.division,
    concelloId: data.concello_id,
  };
}

export async function getPlayersForClub(clubId: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .eq("club_id", clubId)
    .order("name");

  if (error) {
    console.error("Error fetching players for club:", error);
    return [];
  }

  return data.map((player) => ({
    id: player.id,
    clubId: player.club_id,
    name: player.name,
    birthDate: player.birth_date,
    position: player.position,
    foot: player.foot,
    rating: player.rating,
    description: player.description,
    imageUrl: player.image_url,
  }));
}
