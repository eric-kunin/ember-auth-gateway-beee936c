
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { AccountFormValues } from "../schemas";

interface TermsCheckboxProps {
  control: Control<AccountFormValues>;
  isLoading: boolean;
}

const TermsCheckbox = ({ control, isLoading }: TermsCheckboxProps) => {
  return (
    <FormField
      control={control}
      name="agreeToTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLoading}
              className="data-[state=checked]:bg-[#9D4EDD] data-[state=checked]:border-[#9D4EDD] border-[#9D4EDD]/30 mt-1"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="text-sm text-[#3B185F] dark:text-custom-lighter transition-colors duration-300">
              I agree to the
              <button
                type="button"
                className="text-[#9D4EDD] dark:text-[#C77DFF] hover:text-[#7B2CBF] dark:hover:text-white ml-1 underline decoration-1 underline-offset-2"
                onClick={() => {
                  // Open terms dialog
                }}
              >
                Terms of Service
              </button>
            </FormLabel>
            <div className="h-5 min-h-[1.25rem]">
              <FormMessage className="text-xs text-red-500" />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsCheckbox;
