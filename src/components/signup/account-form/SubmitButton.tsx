
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
}

const SubmitButton = ({ isLoading, isValid }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
               signin-button-hover transition-all duration-300"
      disabled={isLoading || !isValid}
      title="Continue to next step"
    >
      Next
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
};

export default SubmitButton;
