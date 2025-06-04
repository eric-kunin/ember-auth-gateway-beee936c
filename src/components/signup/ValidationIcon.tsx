import { Check, X, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ValidationIconProps {
  isValid: boolean;
  showIcon: boolean;
  isLoading?: boolean;
}

const ValidationIcon = ({ isValid, showIcon, isLoading = false }: ValidationIconProps) => {
  const { i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const sideClass = isHebrew ? "left-3" : "right-3";

  if (!showIcon && !isLoading) return null;

  if (isLoading) {
    return (
      <Loader2
        className={`absolute ${sideClass} top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-500 animate-spin`}
      />
    );
  }

  return (
    <div className={`absolute ${sideClass} top-1/2 -translate-y-1/2`}>
      {isValid ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        showIcon && <X className="h-4 w-4 text-red-500" />
      )}
    </div>
  );
};

export default ValidationIcon;
