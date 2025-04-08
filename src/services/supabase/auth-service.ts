import { supabase } from '@/integrations/supabase/client';
import { SignupFormData } from '@/types/supabase';

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

export const signUpUser = async (userData: SignupFormData, profileImages: ProfileImage[] = []) => {
  try {
    // First, register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw authError;
    
    if (!authData.user) {
      throw new Error('User creation failed');
    }

    // Format the birthdate as a string since we're getting TypeScript errors related to Date objects
    const birthDateString = userData.birthdate instanceof Date 
      ? userData.birthdate.toISOString().split('T')[0] 
      : String(userData.birthdate || '');

    // Make sure the gender value is properly capitalized to match the enum
    const genderValue = userData.gender; // Should be "Male", "Female", or "Other"

    // Then create a profile for the user - the proper way with the correct field names
    const { error: profileError } = await supabase.from('profiles').insert({
        // Using the correct field names according to the database schema
        user_id: authData.user.id,
        first_name: userData.name.split(' ')[0] || '',
        last_name: userData.name.split(' ')[1] || '',
        gender: genderValue,
        birth_date: birthDateString,
        bio: userData.bio || '',
        profession: userData.profession || '',
        eye_color: userData.eyeColor || null,
        height: userData.height || null,
        religion: userData.religion || null,
        religious_level: userData.religiousLevel || null,
        smoking_status: userData.smokingStatus || null,
        drinking_status: userData.drinkingStatus || null,
        looking_for: userData.lookingFor || null,
        looking_for_gender: userData.lookingForGender || null,
        user_role: 'user',
        is_online: true,
        last_seen_at: new Date().toISOString()
    });

    if (profileError) {
      throw profileError;
    }

    // Upload profile images if any
    if (profileImages.length > 0) {
      for (const image of profileImages) {
        if (image.file) {
          const fileName = `${authData.user.id}/${Date.now()}-${image.file.name.replace(/\s+/g, '-')}`;
          
          const { error: uploadError } = await supabase.storage
            .from('profile_images')
            .upload(fileName, image.file);
            
          if (uploadError) {
            console.error("Error uploading image:", uploadError);
            continue;
          }
          
          // Get public URL for the image
          const { data: { publicUrl } } = supabase.storage
            .from('profile_images')
            .getPublicUrl(fileName);
            
          // Store the reference in the profile_images table
          await supabase.from('profile_images').insert({
            profile_id: authData.user.id,
            file_path: fileName,
            image_url: publicUrl,
            display_order: profileImages.indexOf(image),
            is_main: profileImages.indexOf(image) === 0, // First image is main
            is_lock: image.isPrivate || false
          });
          
          // If this is the first image, set it as the main profile image
          if (profileImages.indexOf(image) === 0) {
            await supabase.from('profiles').update({
              main_profile_image_url: publicUrl
            }).eq('id', authData.user.id);
          }
        }
      }
    }

    // Add entry to password_management
    const { error: passwordError } = await supabase.from('password_management').insert([{
      user_id: authData.user.id,
      password_strength: 'default',
      requires_reset: false,
      password_last_changed: new Date().toISOString()
    }]);

    if (passwordError) {
      console.error("Error adding password management entry:", passwordError);
    }

    // Set up initial balance
    const { error: balanceError } = await supabase.from('profile_balance').insert([{
      user_id: authData.user.id,
      balance: 0,
      total_spent: 0,
      total_received: 0
    }]);

    if (balanceError) {
      console.error("Error setting up initial balance:", balanceError);
    }

    // Handle languages if provided
    if (userData.languageIds && userData.languageIds.length > 0) {
      const languageRows = userData.languageIds.map(langId => ({
        profile_id: authData.user.id,
        language_id: langId
      }));
      
      const { error: languageError } = await supabase.from('profile_languages').insert(languageRows);
      
      if (languageError) {
        console.error("Error adding language preferences:", languageError);
      }
    }

    // Handle location if provided
    if (userData.locationId) {
      const { error: locationError } = await supabase.from('profile_locations').insert({
        profile_id: authData.user.id,
        location_id: userData.locationId
      });
      
      if (locationError) {
        console.error("Error adding location:", locationError);
      }
    }

    return { user: authData.user, error: null };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { user: null, error: error.message || 'An error occurred during signup' };
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    
    return { profile: data, error: null };
  } catch (error: any) {
    return { profile: null, error: error.message };
  }
};
