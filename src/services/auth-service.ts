
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
        id: authData.user.id,
        ...profileData,
        createdAt: new Date(),
        updatedAt: new Date(),
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
        .where(eq(profiles.id, authData.user.id))
        .limit(1);

      return { user: authData.user, profile: userProfile[0] };
    } catch (error) {
      console.error('SignIn error:', error);
      throw error;
    }
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
