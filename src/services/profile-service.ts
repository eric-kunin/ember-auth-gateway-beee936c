
import { eq } from 'drizzle-orm';
import { db } from '@/lib/drizzle';
import { profiles } from '@/db/schema';
import { supabase } from '@/integrations/supabase/client';

export type ProfileData = {
  name?: string;
  gender?: string;
  birthdate?: Date;
  phone?: string;
  preferences?: Record<string, any>;
};

export class ProfileService {
  // Get profile by ID
  static async getProfile(userId: string) {
    return db.select().from(profiles).where(eq(profiles.id, userId)).limit(1);
  }

  // Create or update profile
  static async upsertProfile(userId: string, data: ProfileData) {
    // First try to find the profile
    const existingProfile = await this.getProfile(userId);
    
    if (existingProfile.length > 0) {
      // Update existing profile
      return db
        .update(profiles)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(profiles.id, userId));
    } else {
      // Create new profile
      return db.insert(profiles).values({
        id: userId,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });
    }
  }

  // Example of combining Supabase Auth with Drizzle ORM
  static async getCurrentUserProfile() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return null;
    }
    
    const userId = session.user.id;
    const profile = await this.getProfile(userId);
    return profile[0] || null;
  }
}
