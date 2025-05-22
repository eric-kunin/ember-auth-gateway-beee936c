
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface FormButtonsProps {
  isLoading: boolean;
  onBack: () => void;
}

const FormButtons = ({ isLoading, onBack }: FormButtonsProps) => {
  return (
    <div className="flex gap-2 pt-2">
      <Button
        type="button"
        onClick={onBack}
        variant="outline"
        className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
        title="Go back to previous step"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Button
        type="submit"
        className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                 signin-button-hover transition-all duration-300"
        disabled={isLoading}
        title="Continue to next step"
      >
        Next
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default FormButtons;
