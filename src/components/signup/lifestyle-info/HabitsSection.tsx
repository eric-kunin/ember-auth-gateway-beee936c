
import { Cigarette, Wine } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { LifestyleFormValues } from "./SignupLifestyleInfo";
import { useTranslation } from "react-i18next";

interface HabitsSectionProps {
  form: UseFormReturn<LifestyleFormValues>;
  isLoading: boolean;
}

const HabitsSection = ({ form, isLoading }: HabitsSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
        <Cigarette className="h-4 w-4 text-[#9D4EDD]" />
        {t("lifestyle2.habits.title")}
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="smokingStatus"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                {t("lifestyle2.habits.smoking.label")}
              </FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger 
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                  >
                    <SelectValue placeholder={t("lifestyle2.habits.smoking.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                  <SelectItem value="non-smoker">{t("lifestyle2.habits.smoking.options.non-smoker")}</SelectItem>
                  <SelectItem value="occasional">{t("lifestyle2.habits.smoking.options.occasional")}</SelectItem>
                  <SelectItem value="regular">{t("lifestyle2.habits.smoking.options.regular")}</SelectItem>
                  <SelectItem value="quitting">{t("lifestyle2.habits.smoking.options.quitting")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="drinkingStatus"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                <Wine className="h-4 w-4 text-[#9D4EDD]" />
                {t("lifestyle2.habits.drinking.label")}
              </FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger 
                    className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                             text-[#240046] dark:text-white h-11 transition-colors duration-300 focus:ring-[#9D4EDD]"
                  >
                    <SelectValue placeholder={t("lifestyle2.habits.drinking.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                  <SelectItem value="non-drinker">{t("lifestyle2.habits.drinking.options.non-drinker")}</SelectItem>
                  <SelectItem value="social">{t("lifestyle2.habits.drinking.options.social")}</SelectItem>
                  <SelectItem value="regular">{t("lifestyle2.habits.drinking.options.regular")}</SelectItem>
                  <SelectItem value="rarely">{t("lifestyle2.habits.drinking.options.rarely")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default HabitsSection;
