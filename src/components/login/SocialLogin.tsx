
import { Separator } from "@/components/ui/separator";
import SocialLoginButton from "./SocialLoginButton";
import GoogleIcon from "./GoogleIcon";
import { Github, Facebook } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

interface SocialLoginProps {
  handleOAuthLogin: (provider: string) => void;
  isLoading: boolean;
}

const SocialLogin = ({ handleOAuthLogin, isLoading }: SocialLoginProps) => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";
  const isMobile = useIsMobile();

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-[#9D4EDD]/20 dark:bg-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white/90 dark:bg-[#10002B] px-2 text-[#240046] dark:text-custom-lighter transition-colors duration-300">
            {t("continueWith")}
          </span>
        </div>
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-3 gap-3'} mb-6`}>
        <SocialLoginButton
  provider={t("providerGitHub")}
  icon={Github}
  onClick={handleOAuthLogin}
  disabled={isLoading}
/>
<SocialLoginButton
  provider={t("providerGoogle")}
  icon={GoogleIcon}
  onClick={handleOAuthLogin}
  disabled={isLoading}
/>
<SocialLoginButton
  provider={t("providerFacebook")}
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
