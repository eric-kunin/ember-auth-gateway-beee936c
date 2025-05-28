
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import { Control, useWatch } from "react-hook-form";
import { PersonalInfoFormValues } from "../schemas";
import ValidationFeedback from "./ValidationFeedback";

interface PhoneFieldProps {
  control: Control<PersonalInfoFormValues>;
  isLoading: boolean;
}

const PhoneField = ({ control, isLoading }: PhoneFieldProps) => {
  return (
    <FormField
      control={control}
      name="phone"
      render={({ field, fieldState }) => {
        const phoneValue = field.value;
        const phoneState = fieldState;
        const phoneIsValid = phoneValue && !phoneState.invalid && phoneState.isDirty;

        return (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
              Phone Number (Optional)
            </FormLabel>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
              <FormControl>
                <Input
                  placeholder="+972 (05) 12345678"
                  type="tel"
                  maxLength={15}
                  className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                           text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                           pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                           ${phoneState.invalid && phoneState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                           ${phoneIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}`}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              {phoneValue && phoneValue.length > 0 && (
                <ValidationFeedback message="Maximum 15 digits allowed" />
              )}
            </div>
            <div className="h-5 min-h-[1.25rem]">
              <FormMessage className="text-xs text-red-500" />
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default PhoneField;
