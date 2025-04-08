
import { supabase } from '@/integrations/supabase/client';
import { SignupFormData } from '@/types/supabase';

interface ProfileImage {
  filePath: string;
  publicUrl: string;
  file?: File;
}

export const signUpUser = async (userData: SignupFormData, profileImages: ProfileImage[] = []) => {
  try {
    // First, create the user account with email and password
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          gender: userData.gender,
          birth_date: userData.birthdate ? new Date(userData.birthdate).toISOString() : null,
          phone: userData.phone || null,
        }
      }
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error('Signup failed - no user data returned');
    }

    // Store profile images if provided
    if (profileImages.length > 0) {
      // Upload images to Supabase storage
      const uploadPromises = profileImages.map(async (image, index) => {
        if (!image.file) {
          return { ...image, publicUrl: image.publicUrl };
        }
        
        const filePath = `avatars/${authData.user!.id}/${image.file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, image.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        const { data: storageData } = supabase.storage.from('avatars').getPublicUrl(filePath);
        return { ...image, publicUrl: storageData.publicUrl };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      profileImages = uploadedImages;
    }
    
    // Make sure the gender value is properly capitalized to match the enum
    const genderValue = userData.gender; // Should be "Male", "Female", or "Other"

    // Then create a profile for the user - fixed TypeScript error by using .upsert instead of .insert
    const { error: profileError } = await supabase.from('profiles').upsert({
        id: authData.user.id,
        first_name: userData.name.split(' ')[0] || '',
        last_name: userData.name.split(' ')[1] || '',
        gender: genderValue,
        birth_date: userData.birthdate ? new Date(userData.birthdate).toISOString() : null,
        phone: userData.phone || null,
        bio: userData.bio || null,
        profile_images: profileImages.map(img => img.publicUrl) || [],
        // Additional profile fields
        religion: userData.religion || null,
        religious_level: userData.religiousLevel || null,
        profession: userData.profession || null,
        smoking_status: userData.smokingStatus || null,
        drinking_status: userData.drinkingStatus || null,
        eye_color: userData.eyeColor || null,
        height: userData.height || null,
        looking_for: userData.lookingFor || null,
        looking_for_gender: userData.lookingForGender || null
    });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      throw new Error(`Failed to create profile: ${profileError.message}`);
    }

    return { user: authData.user, error: null };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { user: null, error: error.message };
  }
};
