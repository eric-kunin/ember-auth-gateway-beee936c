
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
  loadingText?: string;
}

const SubmitButton = ({ isLoading, isValid, loadingText = "Creating account..." }: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full h-11 sm:h-12 bg-[#9D4EDD] hover:bg-[#7B2CBF] dark:bg-[#9D4EDD] dark:hover:bg-[#C77DFF] text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isLoading || !isValid}
    >
      {isLoading ? loadingText : "Next"}
    </Button>
  );
};

export default SubmitButton;
