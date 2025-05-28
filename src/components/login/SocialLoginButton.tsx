
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
      title={`Login with ${provider}`}
    >
      {/* Icon with animated bounce on hover */}
      <span className="transition-transform duration-300 ease-out group-hover:animate-bounce">
        {typeof Icon === "function" && Icon.displayName ? (
          <Icon className="h-5 w-5" color={iconColor || undefined} />
        ) : (
          <Icon className="h-5 w-5" color={iconColor || undefined} />
        )}
      </span>
      {/* Show provider name (only on desktop) */}
      {!isMobile && (
        <span className="ml-2 transition-colors duration-300">{provider}</span>
      )}
      {isMobile && <span className="sr-only">{provider}</span>}
    </Button>
  );
};

export default SocialLoginButton;
