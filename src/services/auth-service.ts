
import { eq } from 'drizzle-orm';
import { db } from '@/lib/drizzle';
import { profiles } from '@/db/schema';
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

      // Then create the profile using Drizzle
      const newProfile = await db.insert(profiles).values({
        userId: authData.user.id,
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
      });

      return { user: authData.user, profile: newProfile };
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

      // Fetch the user's profile using Drizzle
      const userProfile = await db
        .select()
        .from(profiles)
        .where(eq(profiles.userId, authData.user.id))
        .limit(1);

      // Update last seen and online status
      await db.update(profiles)
        .set({ 
          lastSeenAt: new Date(),
          isOnline: true 
        })
        .where(eq(profiles.userId, authData.user.id));

      return { user: authData.user, profile: userProfile[0] };
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
        await db.update(profiles)
          .set({ 
            lastSeenAt: new Date(),
            isOnline: false 
          })
          .where(eq(profiles.userId, user.id));
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
      const userProfile = await db
        .select()
        .from(profiles)
        .where(eq(profiles.userId, user.id))
        .limit(1);

      return {
        user,
        profile: userProfile[0] || null
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
      await db.update(profiles)
        .set({
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
        .where(eq(profiles.userId, user.id));

      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
}
