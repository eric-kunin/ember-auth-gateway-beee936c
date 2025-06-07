
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SummaryActionsProps {
  isLoading: boolean;
  onBack: () => void;
  onComplete: () => void;
}

const SummaryActions = ({ isLoading, onBack, onComplete }: SummaryActionsProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex gap-2 pt-4">
      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30 group"
        disabled={isLoading}
        title="Go back to previous step"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>{t("back")}</span>
      </Button>
      <Button
        type="button"
        onClick={onComplete}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 h-11 sm:h-12 
                 signin-button-hover transition-all duration-300 group"
        disabled={isLoading}
        title="Complete your registration"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>{t("submitButton.creating_account")}</span>
          </>
        ) : (
          <>
            <span>{t("summary.completeSignup")}</span>
            <CheckCircle className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
          </>
        )}
      </Button>
    </div>
  );
};

export default SummaryActions;
