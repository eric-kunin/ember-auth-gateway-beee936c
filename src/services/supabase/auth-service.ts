import { supabase } from '@/integrations/supabase/client';
import { SignupFormData } from '@/types/supabase';
import { Database } from '@/integrations/supabase/types';

interface ProfileImage {
  filePath: string;
  publicUrl: string;
  file?: File;
}

type Gender = "Male" | "Female" | "Other";
type Religion = "prefer not to say" | "other" | "jewish" | "christian" | "catholic" | "protestant" | "orthodox" | "muslim" | "hindu" | "buddhist" | "sikh" | "spiritual but not religious" | "atheist" | "agnostic";
type ReligiousLevel = "orthodox" | "not religious" | "somewhat religious" | "moderately religious" | "very religious";
type SmokingStatus = "regular" | "non-smoker" | "occasional" | "trying to quit";
type DrinkingStatus = "non-drinker" | "social" | "regular";
type EyeColor = "other" | "blue" | "green" | "brown" | "hazel";
type LookingFor = "friendship" | "casual dating" | "serious relationship" | "long-term relationship" | "marriage";
type LookingForGender = "Male" | "Female" | "Other" | "Both";

export const signUpUser = async (userData: SignupFormData, profileImages: ProfileImage[] = []) => {
  try {
    // First, create the user account with email and password
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          gender: userData.gender as Gender,
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
    
    const profileInsert: Database['public']['Tables']['profiles']['Insert'] = {
      user_id: authData.user.id,
      first_name: userData.name.split(' ')[0] || '',
      last_name: userData.name.split(' ')[1] || '',
      gender: userData.gender as Gender,
      birth_date: userData.birthdate ? new Date(userData.birthdate).toISOString() : null,
      phone: userData.phone || null,
      bio: userData.bio || null,
      profile_images: profileImages.map(img => img.publicUrl) || [],
      religion: (userData.religion || null) as Religion | null,
      religious_level: (userData.religiousLevel || null) as ReligiousLevel | null,
      profession: userData.profession || null,
      smoking_status: (userData.smokingStatus || null) as SmokingStatus | null,
      drinking_status: (userData.drinkingStatus || null) as DrinkingStatus | null,
      eye_color: (userData.eyeColor || null) as EyeColor | null,
      height: userData.height || null,
      looking_for: (userData.lookingFor || null) as LookingFor | null,
      looking_for_gender: (userData.lookingForGender || null) as LookingForGender | null
    };

    const { error: profileError } = await supabase.from('profiles').upsert(profileInsert);

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

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Password reset error:", error);
    return { success: false, error: error.message };
  }
};
