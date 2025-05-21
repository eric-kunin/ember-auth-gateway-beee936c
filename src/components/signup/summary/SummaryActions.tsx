
import { Button } from "@/components/ui/button";

interface SummaryActionsProps {
  isLoading: boolean;
  onBack: () => void;
  onComplete: () => void;
}

const SummaryActions = ({ isLoading, onBack, onComplete }: SummaryActionsProps) => {
  return (
    <div className="flex gap-2 pt-4">
      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
        title="Go back to previous step"
      >
        Back
      </Button>
      <Button
        type="button"
        onClick={onComplete}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 h-11 sm:h-12 
                 transition-all duration-300"
        disabled={isLoading}
        title="Complete registration"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
            <span>Creating Account...</span>
          </div>
        ) : (
          "Complete Signup"
        )}
      </Button>
    </div>
  );
};

export default SummaryActions;
