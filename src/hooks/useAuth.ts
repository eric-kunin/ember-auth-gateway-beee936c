
import { useState } from 'react';
import { AuthService } from '@/services/auth-service';
import { useToast } from '@/hooks/use-toast';
import type { ProfileData } from '@/types/profile';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const signUp = async (email: string, password: string, profileData: ProfileData) => {
    try {
      setLoading(true);
      const { user, profile } = await AuthService.signUp(email, password, profileData);
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      return { user, profile };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user, profile } = await AuthService.signIn(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      return { user, profile };
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message || "Invalid email or password",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await AuthService.signOut();
      toast({
        title: "Goodbye!",
        description: "You've been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message || "An error occurred while signing out",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    loading
  };
}
