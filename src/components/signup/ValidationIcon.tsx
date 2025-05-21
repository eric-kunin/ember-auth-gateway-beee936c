
import { CheckCircle, AlertCircle } from "lucide-react";

interface ValidationIconProps {
  isValid: boolean;
  showIcon: boolean;
}

const ValidationIcon = ({ isValid, showIcon }: ValidationIconProps) => {
  if (!showIcon) return null;
  
  return isValid ? (
    <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 absolute right-3 top-1/2 -translate-y-1/2" />
  ) : (
    <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400 absolute right-3 top-1/2 -translate-y-1/2" />
  );
};

export default ValidationIcon;
