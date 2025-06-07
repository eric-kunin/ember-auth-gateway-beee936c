
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cigarette, Wine } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Lifestyle2FormValues } from "./types";
import { useTranslation } from "react-i18next";

interface HabitsSectionProps {
  form: UseFormReturn<Lifestyle2FormValues>;
  isLoading: boolean;
}

const HabitsSection = ({ form, isLoading }: HabitsSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-[#240046] dark:text-white flex items-center gap-2 transition-colors duration-300">
        <Cigarette className="h-4 w-4 text-[#9D4EDD]" />
        {t("lifestyle2.habits.title")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Smoking Status */}
        <FormField
          control={form.control}
          name="smokingStatus"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                {t("lifestyle2.habits.smoking.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.habits.smoking.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="non-smoker">{t("lifestyle2.habits.smoking.options.non-smoker")}</SelectItem>
                  <SelectItem value="occasional">{t("lifestyle2.habits.smoking.options.occasional")}</SelectItem>
                  <SelectItem value="regular">{t("lifestyle2.habits.smoking.options.regular")}</SelectItem>
                  <SelectItem value="quitting">{t("lifestyle2.habits.smoking.options.quitting")}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Drinking Status */}
        <FormField
          control={form.control}
          name="drinkingStatus"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-2">
                <Wine className="h-4 w-4 text-[#9D4EDD]" />
                {t("lifestyle2.habits.drinking.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.habits.drinking.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="non-drinker">{t("lifestyle2.habits.drinking.options.non-drinker")}</SelectItem>
                  <SelectItem value="social">{t("lifestyle2.habits.drinking.options.social")}</SelectItem>
                  <SelectItem value="regular">{t("lifestyle2.habits.drinking.options.regular")}</SelectItem>
                  <SelectItem value="rarely">{t("lifestyle2.habits.drinking.options.rarely")}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default HabitsSection;
