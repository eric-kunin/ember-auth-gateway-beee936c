import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

interface SocialLoginButtonProps {
  provider: string;
  icon: LucideIcon | React.FC;
  onClick: (provider: string) => void;
  disabled: boolean;
  iconColor?: string;
}

const SocialLoginButton = ({
  provider,
  icon: Icon,
  onClick,
  disabled,
  iconColor
}: SocialLoginButtonProps) => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";

  return (
    <Button
      variant="outline"
      className="bg-[#f5efff]/90 dark:bg-[#240046]/40
        text-[#240046] dark:text-white
        border border-[#9D4EDD]/30
        backdrop-blur-sm
        transition-all duration-300 ease-in-out
        w-full sm:w-auto flex items-center justify-center
        hover:-translate-y-[2px] hover:scale-105
        hover:shadow-md hover:shadow-[#9D4EDD]/50
        hover:bg-[#9D4EDD] dark:hover:bg-[#7B2CBF]
        hover:text-white
        group"
      type="button"
      onClick={() => onClick(provider)}
      disabled={disabled}
      title={t("loginWith") + " " + provider} // translated title
      dir={direction} // set direction
    >
      <span className="transition-transform duration-300 ease-out group-hover:animate-bounce">
        {typeof Icon === "function" && Icon.displayName ? (
          <Icon className="h-5 w-5" color={iconColor || undefined} />
        ) : (
          <Icon className="h-5 w-5" color={iconColor || undefined} />
        )}
      </span>
      {!isMobile && (
        <span
          className={`transition-colors duration-300 ${isHebrew ? "mr-2" : "ml-2"}`}
        >
          {provider}
        </span>
      )}
      {isMobile && <span className="sr-only">{provider}</span>}
    </Button>
  );
};

export default SocialLoginButton;
