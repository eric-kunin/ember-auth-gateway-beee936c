
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { AccountFormValues, PersonalInfoFormValues } from "@/components/signup/schemas";

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
      // Combine data for profile creation
      const completeProfileData = {
        name: profileData.name,
        firstName: profileData.name.split(' ')[0],
        lastName: profileData.name.split(' ').slice(1).join(' '),
        nickname: personalData.nickname, // Pass the nickname from personal data
        birthdate: personalData.birthdate,
        gender: personalData.gender as "Male" | "Female" | "Other",
        bio: profileData.bio || "",
        profession: profileData.profession || "",
        eyeColor: lifestyleData.eyeColor || "",
        height: lifestyleData.height ? Number(lifestyleData.height) : undefined,
        religion: lifestyleData.religion || "",
        religiousLevel: lifestyleData.religiousLevel || "",
        smokingStatus: lifestyleData.smokingStatus || "",
        drinkingStatus: lifestyleData.drinkingStatus || "",
        lookingFor: lifestyleData.lookingFor || "",
        lookingForGender: (lifestyleData.lookingForGender || "Both") as "Male" | "Female" | "Other" | "Both",
      };

      // Call auth service to sign up - this will handle email validation server-side
      await signUp(accountData.email, accountData.password, completeProfileData);
      
      // Redirect to verification page
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
