
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export const signUpUser = async (userData: any, profileImages: any[] = []) => {
  try {
    // Remove phone from userData as it's not part of the profiles table
    const { phone, ...profileData } = userData;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          ...profileData,
          name: userData.name,
          gender: userData.gender,
          birthdate: userData.birthdate,
          role: 'authenticated',
        },
      },
    });
    
    if (authError) {
      return { user: null, error: authError.message };
    }
    
    const userId = authData.user?.id;
    
    // Upload profile images and get their public URLs
    const uploadedImages = await Promise.all(
      profileImages.map(async (image) => {
        if (!image.file) {
          console.warn("Skipping upload for image without file:", image);
          return { ...image, publicUrl: image.publicUrl || null };
        }
        
        const imageName = `${uuidv4()}-${image.file.name}`;
        const imagePath = `avatars/${userId}/${imageName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(imagePath, image.file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          return { ...image, publicUrl: null, uploadError: uploadError.message };
        }
        
        // Use the proper Supabase URL from the environment variable
        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${imagePath}`;
        return { ...image, publicUrl, imagePath };
      })
    );
    
    // Filter out any images that failed to upload
    const successfulImages = uploadedImages.filter(image => image.publicUrl);
    
    // Extract public URLs and paths of the uploaded images
    const imageUrls = successfulImages.map(image => image.publicUrl);
    const imagePaths = successfulImages.map(image => image.imagePath);
    
    // Update user's profile in the profiles table with image URLs and paths
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        avatar_urls: imageUrls,
        avatar_paths: imagePaths,
        phone: userData.phone, // Add phone number here
      })
      .eq('id', userId);
    
    if (profileUpdateError) {
      console.error("Error updating profile:", profileUpdateError);
      return { user: null, error: profileUpdateError.message };
    }
    
    return { user: authData.user, error: null };
  } catch (error: any) {
    console.error("Error during signup:", error);
    return { user: null, error: error.message };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) {
      console.error('Error resetting password:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    console.error('Unexpected error during password reset:', err);
    return { success: false, error: err.message };
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      console.error('Error updating password:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    console.error('Unexpected error during password update:', err);
    return { success: false, error: err.message };
  }
};
