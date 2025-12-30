"use server";

import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function createClub(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const division = formData.get("division") as string;
  const concelloId = formData.get("concelloId") as string;

  const { error } = await supabase.from("clubs").insert([
    {
      name,
      category,
      division,
      concello_id: concelloId,
    },
  ]);

  if (error) {
    console.error("Error creating club:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/gestion");
  revalidatePath("/admin/filtros");
  revalidatePath("/");
  return { success: true };
}

export async function createPlayer(formData: FormData) {
  const name = formData.get("name") as string;
  const clubId = formData.get("clubId") as string;
  const birthDate = formData.get("birthDate") as string;
  const position = formData.get("position") as string;
  const foot = formData.get("foot") as string;
  const rating = parseInt(formData.get("rating") as string);
  const description = formData.get("description") as string;
  const imageFile = formData.get("image") as File;

  let imageUrl = null;

  // Handle image upload if a file was provided
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Math.random()
      .toString(36)
      .substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("player-photos")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return { success: false, error: "Error al subir la imagen a Storage" };
    }

    const { data } = supabase.storage
      .from("player-photos")
      .getPublicUrl(filePath);

    imageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("players").insert([
    {
      name,
      club_id: clubId,
      birth_date: birthDate,
      position,
      foot,
      rating,
      description,
      image_url: imageUrl,
    },
  ]);

  if (error) {
    console.error("Error creating player:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/gestion");
  revalidatePath("/admin/filtros");
  revalidatePath("/");
  return { success: true };
}
