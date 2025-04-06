
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SocialLoginButtonProps {
  provider: string;
  icon: LucideIcon;
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
      className="bg-[#240046]/80 hover:bg-[#240046] border-0 text-white h-12"
      type="button"
      onClick={() => onClick(provider)}
      disabled={disabled}
    >
      <Icon className={`h-5 w-5 ${iconColor ? "" : ""}`} color={iconColor} />
    </Button>
  );
};

export default SocialLoginButton;
