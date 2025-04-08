
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Maximum number of profile images allowed
export const MAX_PROFILE_IMAGES = 4;

/**
 * Upload a file to Supabase storage
 */
export const uploadProfileImage = async (userId: string, file: File, isPrivate: boolean = false) => {
  try {
    // Create a unique file path
    const fileName = `${uuidv4()}-${file.name}`;
    const filePath = `${userId}/${fileName}`;

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile_images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile_images')
      .getPublicUrl(filePath);

    // Save reference in the profile_images table
    const { data: imageRecord, error: imageError } = await supabase
      .from('profile_images')
      .insert({
        profile_id: userId,
        image_url: publicUrl,
        file_path: filePath,
        display_order: 0,
        is_lock: isPrivate
      })
      .select('*')
      .single();

    if (imageError) {
      // If there was an error saving the record, try to delete the uploaded file
      await supabase.storage.from('profile_images').remove([filePath]);
      throw imageError;
    }

    return {
      imageId: imageRecord.id,
      filePath,
      publicUrl,
      isPrivate
    };
  } catch (error: any) {
    console.error("Error uploading profile image:", error);
    return { error: error.message || 'Failed to upload image' };
  }
};

/**
 * Delete a profile image
 */
export const deleteProfileImage = async (userId: string, filePath: string, imageId?: string) => {
  try {
    // Delete from storage
    const { error: deleteError } = await supabase.storage
      .from('profile_images')
      .remove([filePath]);

    if (deleteError) {
      throw deleteError;
    }

    // Delete from the profile_images table if imageId is provided
    if (imageId) {
      const { error: recordError } = await supabase
        .from('profile_images')
        .delete()
        .eq('id', imageId)
        .eq('profile_id', userId);

      if (recordError) {
        throw recordError;
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting profile image:", error);
    return { error: error.message || 'Failed to delete image' };
  }
};

/**
 * Toggle image privacy status
 */
export const toggleImagePrivacy = async (userId: string, imageId: string, isPrivate: boolean) => {
  try {
    const { error } = await supabase
      .from('profile_images')
      .update({ is_lock: isPrivate })
      .eq('id', imageId)
      .eq('profile_id', userId);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error updating image privacy:", error);
    return { error: error.message || 'Failed to update image privacy' };
  }
};

/**
 * Get all profile images for a user
 */
export const getProfileImages = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profile_images')
      .select('*')
      .eq('profile_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { images: data };
  } catch (error: any) {
    console.error("Error fetching profile images:", error);
    return { error: error.message || 'Failed to fetch images' };
  }
};

/**
 * Check if a user has reached the maximum number of profile images
 */
export const checkImageLimit = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('profile_images')
      .select('id', { count: 'exact' })
      .eq('profile_id', userId);

    if (error) {
      throw error;
    }

    return (data?.length || 0) >= MAX_PROFILE_IMAGES;
  } catch (error) {
    console.error("Error checking image limit:", error);
    return false;
  }
};
