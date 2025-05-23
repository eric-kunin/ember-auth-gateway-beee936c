
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AccountFormValues, PersonalInfoFormValues } from "@/components/signup/schemas";
import { supabase } from "@/integrations/supabase/client";

interface UseSignupCompletionProps {
  accountData: AccountFormValues;
  personalData: PersonalInfoFormValues;
  profileData: any;
  lifestyleData: any;
}

export const useSignupCompletion = ({
  accountData,
  personalData,
  profileData,
  lifestyleData
}: UseSignupCompletionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleCompleteSignup = async () => {
    setIsLoading(true);
    
    try {
      // Check if email already exists before proceeding with signup
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', accountData.email)
        .limit(1);
      
      if (checkError) {
        console.error('Error checking email:', checkError);
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: "Error verifying email availability. Please try again.",
        });
        setIsLoading(false);
        return;
      }
      
      // If email exists, show error and stop signup process
      if (existingUsers && existingUsers.length > 0) {
        toast({
          variant: "destructive",
          title: "Email Already Registered",
          description: "This email is already registered. Please use a different email or try logging in.",
        });
        setIsLoading(false);
        return;
      }
      
      // Combine data for profile creation
      const completeProfileData = {
        name: personalData.name,
        firstName: personalData.name.split(' ')[0],
        lastName: personalData.name.split(' ').slice(1).join(' '),
        birthdate: personalData.birthdate,
        gender: personalData.gender as "Male" | "Female" | "Other",
        phone: personalData.phone,
        bio: profileData.bio || "",
        profession: profileData.profession || "",
        eyeColor: lifestyleData.eyeColor || "",
        height: lifestyleData.height ? Number(lifestyleData.height) : undefined,
        religion: lifestyleData.religion || "",
        religiousLevel: lifestyleData.religiousLevel || "",
        smokingStatus: lifestyleData.smokingStatus || "",
        drinkingStatus: lifestyleData.drinkingStatus || "",
        lookingFor: lifestyleData.lookingFor || "",
        lookingForGender: lifestyleData.lookingForGender || "Both",
      };

      // Call auth service to sign up
      await signUp(accountData.email, accountData.password, completeProfileData);
      
      // Redirect to verification page instead of relying on useEffect
      toast({
        title: "Account Created!",
        description: "Please verify your email to continue.",
      });
      
      // Navigate to verification page with email param
      navigate(`/verify-account?email=${encodeURIComponent(accountData.email)}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An error occurred during signup.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCompleteSignup, isLoading };
};
