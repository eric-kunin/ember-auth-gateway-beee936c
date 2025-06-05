import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AtSign } from "lucide-react";
import { Control } from "react-hook-form";
import { PersonalInfoFormValues } from "../schemas";
import { useTranslation } from "react-i18next";

interface UsernameFieldProps {
  control: Control<PersonalInfoFormValues>;
  isLoading: boolean;
}

const UsernameField = ({ control, isLoading }: UsernameFieldProps) => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";

  return (
    <FormField
      control={control}
      name="username"
      render={({ field, fieldState }) => {
        const usernameValue = field.value;
        const usernameState = fieldState;
        const usernameIsValid = usernameValue && !usernameState.invalid && usernameState.isDirty;

        return (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
              {t("username")}
            </FormLabel>
            <div className="relative" dir={direction}>
              {/* Icon */}
              <AtSign className={`absolute top-2.5 h-5 w-5 text-[#9D4EDD]/70 dark:text-white/70 
                ${isHebrew ? "right-3" : "left-3"} transition-colors duration-300`} />

              <FormControl>
                <Input
                  placeholder={t("usernameFieldPlaceholder")}
                  type="text"
                  maxLength={15}
                  className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                    text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                    pl-10 pr-10 h-10 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]
                    ${usernameState.invalid && usernameState.isDirty ? "border-red-500 dark:border-red-500 ring-1 ring-red-500" : ""}
                    ${usernameIsValid ? "border-green-500 dark:border-green-500 ring-1 ring-green-500" : ""}`}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>

              {/* Character counter */}
              <div className={`absolute top-2.5 text-xs text-[#9D4EDD]/60 dark:text-white/60 
                ${isHebrew ? "left-3" : "right-3"}`}>
                {usernameValue?.length || 0}/15
              </div>
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

export default UsernameField;
