
import { supabase } from '@/integrations/supabase/client';

// Define a simplified ProfileData interface to avoid circular references
interface ProfileData {
  firstName?: string;
  lastName?: string;
  name?: string;
  displayName?: string;
  username?: string;
  bio?: string;
  profession?: string;
  birthdate?: Date;
  gender?: 'Male' | 'Female' | 'Other';
  height?: number;
  eyeColor?: string;
  religion?: string;
  religiousLevel?: string;
  smokingStatus?: string;
  drinkingStatus?: string;
  lookingFor?: string;
  lookingForGender?: 'Male' | 'Female' | 'Other' | 'Both';
}

export class AuthService {
  static async checkEmailExists(email: string): Promise<boolean> {
    try {
      // Use auth.users table to check if email exists
      const { data, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        console.error('Error checking email:', error);
        return false;
      }
      
      // Explicitly check the users array with proper typing
      const users = data?.users || [];
      return users.some((user: any) => user.email === email);
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }

  static async signUp(email: string, password: string, profileData: ProfileData) {
    try {
      // Check if email already exists first
      const emailExists = await this.checkEmailExists(email);
      if (emailExists) {
        throw new Error('An account with this email already exists. Please use a different email or try signing in.');
      }

      // First, create the auth user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        // Handle specific auth errors
        if (authError.message.includes('already registered')) {
          throw new Error('This email is already registered. Please use a different email or try signing in.');
        }
        throw authError;
      }
      
      if (!authData.user) throw new Error('No user data returned');

      // Prepare profile data for database insertion with correct field names
      const dbProfileData = {
        id: authData.user.id,
        first_name: profileData.firstName || profileData.name?.split(' ')?.[0] || '',
        last_name: profileData.lastName || profileData.name?.split(' ')?.[1] || '',
        display_name: profileData.displayName || profileData.name || authData.user.email?.split('@')[0] || 'User',
        username: profileData.username || authData.user.email?.split('@')[0] || 'user_' + Math.random().toString(36).substring(2, 7),
        bio: profileData.bio || '',
        profession: profileData.profession || '',
        birth_date: profileData.birthdate ? profileData.birthdate.toISOString() : new Date().toISOString(),
        gender: (profileData.gender || 'Other') as 'Male' | 'Female' | 'Other',
        height: profileData.height,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Then create the profile using Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert(dbProfileData)
        .select()
        .single();

      if (profileError) {
        // If profile creation fails, clean up the auth user
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw profileError;
      }

      return { user: authData.user, profile: profile };
    } catch (error) {
      console.error('SignUp error:', error);
      throw error;
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned');

      // Fetch the user's profile using Supabase
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      // Update last seen and online status
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          last_seen_at: new Date().toISOString(),
          is_online: true 
        })
        .eq('id', authData.user.id);

      if (updateError) throw updateError;

      return { user: authData.user, profile: userProfile };
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  }

  static async signOut() {
    try {
      // Get current user before signing out
      const { data: { user } } = await supabase.auth.getUser();
      
      // If there is a user, update their online status
      if (user) {
        await supabase
          .from('profiles')
          .update({ 
            last_seen_at: new Date().toISOString(),
            is_online: false 
          })
          .eq('id', user.id);
      }
      
      // Then sign out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('SignOut error:', error);
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      if (!session) return null;

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw userError || new Error('User not found');
      }

      // Get profile from database
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        // If no profile exists yet, return just the user
        return { user, profile: null };
      }

      return {
        user,
        profile: userProfile
      };
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  static async updateProfile(profileData: ProfileData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('User not authenticated');

      // Prepare update data with proper field names and types
      const updateData: Record<string, any> = {
        updated_at: new Date().toISOString()
      };

      if (profileData.firstName) updateData.first_name = profileData.firstName;
      if (profileData.lastName) updateData.last_name = profileData.lastName;
      if (profileData.displayName) updateData.display_name = profileData.displayName;
      if (profileData.bio) updateData.bio = profileData.bio;
      if (profileData.profession) updateData.profession = profileData.profession;
      if (profileData.birthdate) updateData.birth_date = profileData.birthdate.toISOString();
      if (profileData.gender) updateData.gender = profileData.gender;
      if (profileData.height) updateData.height = profileData.height;
      if (profileData.eyeColor) updateData.eye_color = profileData.eyeColor;
      if (profileData.religion) updateData.religion = profileData.religion;
      if (profileData.religiousLevel) updateData.religious_level = profileData.religiousLevel;
      if (profileData.smokingStatus) updateData.smoking = profileData.smokingStatus;
      if (profileData.drinkingStatus) updateData.drinking = profileData.drinkingStatus;
      if (profileData.lookingFor) updateData.looking_for = profileData.lookingFor;
      if (profileData.lookingForGender) updateData.looking_for_gender = profileData.lookingForGender;

      // Update the profile with proper field names and types
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}
