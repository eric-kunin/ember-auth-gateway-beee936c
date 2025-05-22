
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useOAuthSignupHandler = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOAuthSignup = (provider: string) => {
    // This would use Supabase OAuth in a real implementation
    // Example: supabase.auth.signInWithOAuth({ provider: provider.toLowerCase() })
    setTimeout(() => {
      toast({
        title: `${provider} Signup`,
        description: `Signing up with ${provider}...`,
      });
      navigate("/dashboard");
    }, 1000);
  };

  return { handleOAuthSignup };
};
