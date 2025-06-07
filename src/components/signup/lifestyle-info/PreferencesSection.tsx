
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Lifestyle2FormValues } from "./types";
import { useTranslation } from "react-i18next";

interface PreferencesSectionProps {
  form: UseFormReturn<Lifestyle2FormValues>;
  isLoading: boolean;
}

const PreferencesSection = ({ form, isLoading }: PreferencesSectionProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="text-base font-medium text-[#240046] dark:text-white flex items-center gap-2 transition-colors duration-300">
        <Heart className="h-4 w-4 text-[#9D4EDD]" />
        {t("lifestyle2.preferences.title")}
      </h3>

      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {/* Looking For */}
        <FormField
          control={form.control}
          name="lookingFor"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                {t("lifestyle2.preferences.lookingFor.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.preferences.lookingFor.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="serious-relationship">{t("lifestyle2.preferences.lookingFor.options.serious-relationship")}</SelectItem>
                  <SelectItem value="casual-dating">{t("lifestyle2.preferences.lookingFor.options.casual-dating")}</SelectItem>
                  <SelectItem value="friendship">{t("lifestyle2.preferences.lookingFor.options.friendship")}</SelectItem>
                  <SelectItem value="not-sure">{t("lifestyle2.preferences.lookingFor.options.not-sure")}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Looking For Gender */}
        <FormField
          control={form.control}
          name="lookingForGender"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-2">
                <Users className="h-4 w-4 text-[#9D4EDD]" />
                {t("lifestyle2.preferences.interestedIn.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.preferences.interestedIn.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="men">{t("lifestyle2.preferences.interestedIn.options.men")}</SelectItem>
                  <SelectItem value="women">{t("lifestyle2.preferences.interestedIn.options.women")}</SelectItem>
                  <SelectItem value="both">{t("lifestyle2.preferences.interestedIn.options.both")}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PreferencesSection;
