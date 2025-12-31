import { supabase } from "./supabase";
import municipalitiesData from "@/data/municipalities.json";
import {
  type Concello,
  type Club,
  type Player,
  type MunicipalityJSON,
} from "@/types";

// Concellos are static local data
const allConcellos: Concello[] = (municipalitiesData as MunicipalityJSON[])
  .map((m) => ({
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
    imageUrl: club.image_url,
  }));
}

export async function getAllPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*, clubs(name, category)")
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
    clubName: (player.clubs as any)?.name,
    clubCategory: (player.clubs as any)?.category,
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
    imageUrl: club.image_url,
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
    imageUrl: data.image_url,
  };
}

export async function getPlayersForClub(clubId: string): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*, clubs(name, category)")
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
    clubName: (player.clubs as any)?.name,
    clubCategory: (player.clubs as any)?.category,
  }));
}
