
import { useState, useEffect, useCallback } from 'react';
import { AuthService } from '@/services/auth-service';
import { useToast } from '@/hooks/use-toast';
import type { ProfileData } from '@/types/profile';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthState {
  user: User | null;
  profile: any | null;
  loading: boolean;
  error: Error | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });
  const { toast } = useToast();

  // Fetch current user on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await AuthService.getCurrentUser();
        setState(prev => ({
          ...prev,
          user: userData?.user || null,
          profile: userData?.profile || null,
          loading: false
        }));
      } catch (error) {
        setState(prev => ({ ...prev, error: error as Error, loading: false }));
      }
    };

    fetchCurrentUser();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Use setTimeout to avoid Supabase auth deadlock
          setTimeout(() => {
            fetchCurrentUser();
          }, 0);
        } else if (event === 'SIGNED_OUT') {
          setState(prev => ({
            ...prev,
            user: null,
            profile: null,
            loading: false
          }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = useCallback(async (email: string, password: string, profileData: ProfileData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { user, profile } = await AuthService.signUp(email, password, profileData);
      setState(prev => ({ ...prev, user, profile, loading: false }));
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      return { user, profile };
    } catch (error) {
      const err = error as Error;
      setState(prev => ({ ...prev, error: err, loading: false }));
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: err.message || "An error occurred during registration",
      });
      throw error;
    }
  }, [toast]);

  const signIn = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { user, profile } = await AuthService.signIn(email, password);
      setState(prev => ({ ...prev, user, profile, loading: false }));
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      return { user, profile };
    } catch (error) {
      const err = error as Error;
      setState(prev => ({ ...prev, error: err, loading: false }));
      toast({
        variant: "destructive",
        title: "Login failed",
        description: err.message || "Invalid email or password",
      });
      throw error;
    }
  }, [toast]);

  const signOut = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await AuthService.signOut();
      setState(prev => ({ ...prev, user: null, profile: null, loading: false }));
      toast({
        title: "Goodbye!",
        description: "You've been signed out successfully.",
      });
    } catch (error) {
      const err = error as Error;
      setState(prev => ({ ...prev, error: err, loading: false }));
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: err.message || "An error occurred while signing out",
      });
    }
  }, [toast]);

  const updateProfile = useCallback(async (profileData: ProfileData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      await AuthService.updateProfile(profileData);
      
      // Refresh the profile data
      const userData = await AuthService.getCurrentUser();
      
      setState(prev => ({ 
        ...prev, 
        profile: userData?.profile || prev.profile,
        loading: false 
      }));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      return true;
    } catch (error) {
      const err = error as Error;
      setState(prev => ({ ...prev, error: err, loading: false }));
      
      toast({
        variant: "destructive",
        title: "Update failed",
        description: err.message || "An error occurred while updating your profile",
      });
      
      return false;
    }
  }, [toast]);

  return {
    ...state,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAuthenticated: !!state.user,
  };
}
