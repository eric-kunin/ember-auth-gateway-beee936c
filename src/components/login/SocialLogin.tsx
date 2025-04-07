
import { Separator } from "@/components/ui/separator";
import SocialLoginButton from "./SocialLoginButton";
import GoogleIcon from "./GoogleIcon";
import { Github, Facebook } from "lucide-react";

interface SocialLoginProps {
  handleOAuthLogin: (provider: string) => void;
  isLoading: boolean;
}

const SocialLogin = ({ handleOAuthLogin, isLoading }: SocialLoginProps) => {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#10002B] px-2 text-custom-lighter">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <SocialLoginButton
          provider="GitHub"
          icon={Github}
          onClick={handleOAuthLogin}
          disabled={isLoading}
        />
        <SocialLoginButton
          provider="Google"
          icon={GoogleIcon}
          onClick={handleOAuthLogin}
          disabled={isLoading}
        />
        <SocialLoginButton
          provider="Facebook"
          icon={Facebook}
          onClick={handleOAuthLogin}
          disabled={isLoading}
          iconColor="#1877F2"
        />
      </div>
    </>
  );
};

export default SocialLogin;
