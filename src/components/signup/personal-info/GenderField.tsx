import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control } from "react-hook-form";
import { PersonalInfoFormValues } from "../schemas";
import { useTranslation } from "react-i18next";

interface GenderFieldProps {
  control: Control<PersonalInfoFormValues>;
  isLoading: boolean;
}

const GenderField = ({ control, isLoading }: GenderFieldProps) => {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";
  const direction = isHebrew ? "rtl" : "ltr";
  const alignmentClass = isHebrew ? "text-end" : "text-start";

  return (
    <FormField
      control={control}
      name="gender"
      render={({ field, fieldState }) => {
        const genderIsValid =
          field.value && !fieldState.invalid && fieldState.isDirty;

        return (
          <FormItem className="space-y-2" dir={direction}>
            <FormLabel className="text-sm text-[#240046] dark:text-white transition-colors duration-300">
              {t("gender")}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger
                  className={`bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                    text-[#240046] dark:text-white h-10 transition-colors duration-300 
                    focus:ring-[#9D4EDD] focus:border-[#9D4EDD] pl-10 pr-10 ${alignmentClass}
                    ${fieldState.invalid && fieldState.isDirty ? "border-red-500 dark:border-red-500 ring-1 ring-red-500" : ""}
                    ${genderIsValid ? "border-green-500 dark:border-green-500 ring-1 ring-green-500" : ""}`}
                  dir={direction}
                >
                  <SelectValue
                    placeholder={t("genderOptions.placeholder")}
                    className={`${alignmentClass}`}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent
                className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/30"
                dir={direction}
              >
                <SelectItem
                  value="Male"
                  className="text-[#240046] dark:text-white hover:bg-[#E0AAFF]/20 dark:hover:bg-[#9D4EDD]/20"
                >
                  {t("genderOptions.male")}
                </SelectItem>
                <SelectItem
                  value="Female"
                  className="text-[#240046] dark:text-white hover:bg-[#E0AAFF]/20 dark:hover:bg-[#9D4EDD]/20"
                >
                  {t("genderOptions.female")}
                </SelectItem>
                <SelectItem
                  value="Other"
                  className="text-[#240046] dark:text-white hover:bg-[#E0AAFF]/20 dark:hover:bg-[#9D4EDD]/20"
                >
                  {t("genderOptions.other")}
                </SelectItem>
              </SelectContent>
            </Select>
            <div className="h-5 min-h-[1.25rem]">
              <FormMessage className="text-xs text-red-500" />
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default GenderField;
