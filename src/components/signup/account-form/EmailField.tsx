
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Control } from "react-hook-form";
import { AccountFormValues } from "../schemas";
import ValidationIcon from "../ValidationIcon";
import { useTranslation } from "react-i18next";

interface EmailFieldProps {
  control: Control<AccountFormValues>;
  isLoading: boolean;
  isCheckingEmail?: boolean;
}

const EmailField = ({ control, isLoading, isCheckingEmail = false }: EmailFieldProps) => {
  
    const { t, i18n } = useTranslation();
    const isHebrew = i18n.language === "he";
    const direction = isHebrew ? "rtl" : "ltr";
  
    return (
    <FormField
      control={control}
      name="email"
      render={({ field, fieldState }) => {
        const emailValue = field.value;
        const emailState = fieldState;
        const emailIsValid = emailValue && !emailState.invalid && emailState.isDirty && !isCheckingEmail;
        
        return (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
              {t("email")} {isCheckingEmail && <span className="text-xs text-gray-500">(checking...)</span>}
            </FormLabel>
            <div className="relative">
              {direction === "rtl" ? (<>
              <FormControl>
                <Input
                  placeholder="johndoe@example.com"
                  type="email"
                  className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                    text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                    pl-10 pr-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                    ${emailState.invalid && emailState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                    ${emailIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}
                    ${isCheckingEmail ? 'border-yellow-500 dark:border-yellow-500 ring-1 ring-yellow-500' : ''}`}
                  disabled={isLoading}
                  {...field}
                  onChange={(e) => {
                      // Preserve exact user input without any modifications
                      field.onChange(e.target.value);
                    }}
                />
              </FormControl>
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
              </>) : <>
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
              <FormControl>
                <Input
                  placeholder="johndoe@example.com"
                  type="email"
                  className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                              text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                              pl-10 pr-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                              ${emailState.invalid && emailState.isDirty ? 'border-red-500 dark:border-red-500 ring-1 ring-red-500' : ''}
                              ${emailIsValid ? 'border-green-500 dark:border-green-500 ring-1 ring-green-500' : ''}
                              ${isCheckingEmail ? 'border-yellow-500 dark:border-yellow-500 ring-1 ring-yellow-500' : ''}`}
                  disabled={isLoading}
                  {...field}
                  onChange={(e) => {
                    // Preserve exact user input without any modifications
                    field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              </>}
              <ValidationIcon 
                isValid={emailIsValid} 
                showIcon={emailState.isDirty} 
                isLoading={isCheckingEmail}
              />
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

export default EmailField;
