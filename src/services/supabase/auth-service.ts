
import { supabase } from "@/integrations/supabase/client";
import { RegisterFormValues } from "@/components/signup/schemas";
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
