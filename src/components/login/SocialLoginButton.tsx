
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
      className="bg-[#f5efff]/90 dark:bg-[#240046]/40 hover:bg-[#e0d8eb] dark:hover:bg-[#240046]/60 
                border-[#9D4EDD]/20 text-[#240046] dark:text-white
                transform transition-all duration-300 ease-in-out
                hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20
                w-full sm:w-auto flex justify-center items-center py-2"
      type="button"
      onClick={() => onClick(provider)}
      disabled={disabled}
    >
      {typeof Icon === 'function' && Icon.displayName ? (
        <Icon className="h-5 w-5" color={iconColor || undefined} />
      ) : (
        <Icon className="h-5 w-5" color={iconColor || undefined} />
      )}
      {!isMobile && <span className="ml-2">{provider}</span>}
      {isMobile && <span className="sr-only">{provider}</span>}
    </Button>
  );
};

export default SocialLoginButton;
