
import { useState, useEffect } from 'react';
import { ProfileService, ProfileData } from '@/services/profile-service';
import { supabase } from '@/integrations/supabase/client';

export function useProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          loadProfile();
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    // Load profile on mount
    loadProfile();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      const data = await ProfileService.getCurrentUserProfile();
      setProfile(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(data: ProfileData) {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('Not authenticated');
      }
      
      await ProfileService.upsertProfile(session.user.id, data);
      await loadProfile();
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { profile, loading, error, updateProfile };
}
