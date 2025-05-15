
import { supabase } from '@/integrations/supabase/client';

export type ProfileData = {
  name?: string;
  gender?: "Male" | "Female" | "Other";
  birthdate?: Date;
  phone?: string;
  preferences?: Record<string, any>;
};

export class ProfileService {
  // Get profile by ID
  static async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  }

  // Create or update profile
  static async upsertProfile(userId: string, data: ProfileData) {
    try {
      // First try to find the profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .single();
      
      if (existingProfile) {
        // Update existing profile with snake_case field names
        const { error } = await supabase
          .from('profiles')
          .update({
            ...(data.name && { display_name: data.name }),
            ...(data.gender && { gender: data.gender }),
            ...(data.birthdate && { birth_date: data.birthdate.toISOString() }),
            ...(data.phone && { phone: data.phone }),
            ...(data.preferences && { preferences: data.preferences }),
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);
          
        if (error) throw error;
        return existingProfile;
      } else {
        // Create new profile with snake_case field names
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            ...(data.name && { display_name: data.name }),
            ...(data.gender && { gender: data.gender }),
            ...(data.birthdate && { birth_date: data.birthdate.toISOString() }),
            ...(data.phone && { phone: data.phone }),
            ...(data.preferences && { preferences: data.preferences }),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select();
          
        if (error) throw error;
        return newProfile[0];
      }
    } catch (error) {
      console.error('Upsert profile error:', error);
      throw error;
    }
  }

  // Get current user profile
  static async getCurrentUserProfile() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return null;
    }
    
    const userId = session.user.id;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  }
}
