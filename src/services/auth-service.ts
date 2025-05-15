
import { supabase } from '@/integrations/supabase/client';
import type { ProfileData } from '@/types/profile';

export class AuthService {
  static async signUp(email: string, password: string, profileData: ProfileData) {
    try {
      // First, create the auth user with Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned');

      // Then create the profile using Supabase
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          firstName: profileData.firstName || profileData.name?.split(' ')?.[0] || '',
          lastName: profileData.lastName || profileData.name?.split(' ')?.[1] || '',
          displayName: profileData.displayName || profileData.name || authData.user.email?.split('@')[0] || 'User',
          username: profileData.username || authData.user.email?.split('@')[0] || 'user_' + Math.random().toString(36).substring(2, 7),
          bio: profileData.bio || '',
          profession: profileData.profession || '',
          birthDate: profileData.birthdate || new Date(),
          gender: profileData.gender || '',
          height: profileData.height,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSeenAt: new Date(),
          isOnline: true
        })
        .select();

      if (profileError) throw profileError;

      return { user: authData.user, profile: profile[0] };
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
          last_seen_at: new Date(),
          isOnline: true 
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
            last_seen_at: new Date(),
            isOnline: false 
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

      // Update the profile
      const { error } = await supabase
        .from('profiles')
        .update({
          firstName: profileData.firstName || profileData.name?.split(' ')?.[0],
          lastName: profileData.lastName || profileData.name?.split(' ')?.[1],
          displayName: profileData.displayName || profileData.name,
          bio: profileData.bio,
          profession: profileData.profession,
          birthDate: profileData.birthdate instanceof Date ? profileData.birthdate : undefined,
          gender: profileData.gender,
          height: profileData.height,
          updatedAt: new Date()
        })
        .eq('id', user.id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}
