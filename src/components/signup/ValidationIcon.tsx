
import { Check, X, Loader2 } from "lucide-react";

interface ValidationIconProps {
  isValid: boolean;
  showIcon: boolean;
  isLoading?: boolean;
}

const ValidationIcon = ({ isValid, showIcon, isLoading = false }: ValidationIconProps) => {
  if (!showIcon && !isLoading) return null;

  if (isLoading) {
    return (
      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-500 animate-spin" />
    );
  }

  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      {isValid ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        showIcon && <X className="h-4 w-4 text-red-500" />
      )}
    </div>
  );
};

export default ValidationIcon;
