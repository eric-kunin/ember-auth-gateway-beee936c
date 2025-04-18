
import { supabase } from "@/integrations/supabase/client";
import type { UUID } from "crypto";

export const signUpUser = async (
  userData: any,
  userId: UUID,
  imageUrls: string[],
  imagePaths: string[]
) => {
  try {
    // Update user's profile in the profiles table with image URLs and paths
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        main_profile_image_url: imageUrls[0], // Changed to main_profile_image_url
        phone_number: userData.phone, // Changed from phone to phone_number
        profile_photos: imageUrls, // Changed from photos to profile_photos
        profile_photo_paths: imagePaths // Changed from photo_paths to profile_photo_paths
      })
      .eq('id', userId);

    if (profileUpdateError) {
      console.error("Error updating profile:", profileUpdateError);
      throw new Error("Failed to update profile");
    }

    console.log("User profile updated successfully");
    return { user: userId, error: null };
  } catch (error: any) {
    console.error("Error during sign up:", error.message);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`
    });

    if (error) {
      console.error('Error resetting password:', error);
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      data
    };
  } catch (err: any) {
    console.error('Unexpected error during password reset:', err);
    return {
      success: false,
      error: err.message
    };
  }
};
