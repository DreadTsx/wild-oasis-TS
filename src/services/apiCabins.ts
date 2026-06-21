import type { NewCabin } from "../types/cabinTypes";
import supabase, { supabaseUrl } from "./supabase";

//? Fetching the cabins from Supabase
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  //
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

//? Creating /Editing cabin and updates on Supabase
export async function createEditCabin(newCabin: NewCabin, id?: number) {
  const hasImagePath =
    typeof newCabin.image === "string" &&
    newCabin.image?.startsWith?.(supabaseUrl);
  //
  const imageName = `${Math.random()} - ${
    (newCabin.image as File).name
  }`.replace(/\//g, "");
  //
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //? 1. Create/Edit a cabin
  let data, error;

  if (!id) {
    //? A) Create
    const result = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single();
    data = result.data;
    error = result.error;
  } else {
    //? B) Edit
    const result = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select()
      .single();
    data = result.data;
    error = result.error;
  }
  //
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //? 2. If no.1 works without any error ....upload the image
  //* If the the image for the cabin has alresdy been uploaded we dont need to reupload again we just return the data....
  if (hasImagePath) return data;
  //* If not just upload
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image as File);

  //? 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
  return data;
}

//? Deleting a cabin from Supabase and cabin page using the id
export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  //
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
