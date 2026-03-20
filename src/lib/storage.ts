import { supabase } from "./supabase";

export const uploadImage = async (
  file: File,
  bucket: string = "images",
): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${bucket}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });
  console.log(data);

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return publicUrl;
};

export const deleteImage = async (
  url: string,
  bucket: string = "images",
): Promise<void> => {
  // Extract file path from URL
  const urlParts = url.split("/");
  const fileName = urlParts[urlParts.length - 1];
  const filePath = `${bucket}/${fileName}`;

  const { error } = await supabase.storage.from(bucket).remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const uploadMultipleImages = async (
  files: File[],
  bucket: string = "images",
): Promise<string[]> => {
  const uploadPromises = files.map((file) => uploadImage(file, bucket));
  return Promise.all(uploadPromises);
};

// Helper function to convert file to base64 for preview
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
