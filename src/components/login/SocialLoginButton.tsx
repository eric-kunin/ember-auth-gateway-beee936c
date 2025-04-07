
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

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
  return (
    <Button
      variant="outline"
      className="bg-[#240046]/40 hover:bg-[#240046]/60 border-[#9D4EDD]/20 text-white"
      type="button"
      onClick={() => onClick(provider)}
      disabled={disabled}
    >
      {typeof Icon === 'function' && '$$typeof' in Icon ? (
        <Icon className={`h-5 w-5`} color={iconColor} />
      ) : (
        <Icon />
      )}
    </Button>
  );
};

export default SocialLoginButton;
