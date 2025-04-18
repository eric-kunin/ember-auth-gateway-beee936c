import { supabase } from "@/lib/supabase";
import { RegisterFormValues } from "@/components/register/schemas";
import { UUID } from "crypto";

export const signUpUser = async (
  userData: RegisterFormValues,
  userId: UUID,
  imageUrls: string[],
  imagePaths: string[]
) => {
  try {
    // Update user's profile in the profiles table with image URLs and paths
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        avatar_url: imageUrls[0], // Use first image as main avatar
        phone: userData.phone,
        photos: imageUrls, // Store all images in photos array
        photo_paths: imagePaths
      })
      .eq('id', userId);

    if (profileUpdateError) {
      console.error("Error updating profile:", profileUpdateError);
      throw new Error("Failed to update profile");
    }

    console.log("User profile updated successfully");
  } catch (error: any) {
    console.error("Error during sign up:", error.message);
    throw error;
  }
};
