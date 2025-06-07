
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Users, PawPrint, Dumbbell, UtensilsCrossed } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Lifestyle2FormValues } from "../SignupLifestyleInfo2";
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                  <SelectItem value="marriage">{t("lifestyle2.preferences.lookingFor.options.marriage")}</SelectItem>
                  <SelectItem value="friendship">{t("lifestyle2.preferences.lookingFor.options.friendship")}</SelectItem>
                  <SelectItem value="dating">{t("lifestyle2.preferences.lookingFor.options.dating")}</SelectItem>
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
                {t("lifestyle2.preferences.lookingForGender.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.preferences.lookingForGender.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">{t("lifestyle2.preferences.lookingForGender.options.male")}</SelectItem>
                  <SelectItem value="female">{t("lifestyle2.preferences.lookingForGender.options.female")}</SelectItem>
                  <SelectItem value="both">{t("lifestyle2.preferences.lookingForGender.options.both")}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Pets */}
        <FormField
          control={form.control}
          name="pets"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-[#9D4EDD]" />
                {t("lifestyle2.preferences.pets.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.preferences.pets.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="love-pets">{t("lifestyle2.preferences.pets.options.love-pets")}</SelectItem>
                  <SelectItem value="have-pets">{t("lifestyle2.preferences.pets.options.have-pets")}</SelectItem>
                  <SelectItem value="allergic">{t("lifestyle2.preferences.pets.options.allergic")}</SelectItem>
                  <SelectItem value="no-pets">{t("lifestyle2.preferences.pets.options.no-pets")}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Exercise */}
        <FormField
          control={form.control}
          name="exercise"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-2">
                <Dumbbell className="h-4 w-4 text-[#9D4EDD]" />
                {t("lifestyle2.preferences.exercise.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.preferences.exercise.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">{t("lifestyle2.preferences.exercise.options.daily")}</SelectItem>
                  <SelectItem value="weekly">{t("lifestyle2.preferences.exercise.options.weekly")}</SelectItem>
                  <SelectItem value="monthly">{t("lifestyle2.preferences.exercise.options.monthly")}</SelectItem>
                  <SelectItem value="rarely">{t("lifestyle2.preferences.exercise.options.rarely")}</SelectItem>
                  <SelectItem value="never">{t("lifestyle2.preferences.exercise.options.never")}</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Diet */}
        <FormField
          control={form.control}
          name="diet"
          render={({ field }) => (
            <FormItem className="space-y-2 sm:col-span-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-[#9D4EDD]" />
                {t("lifestyle2.preferences.diet.label")}
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                <FormControl>
                  <SelectTrigger className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                                         text-[#240046] dark:text-white h-11 py-2 transition-colors duration-300 
                                         focus:ring-[#9D4EDD] placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60">
                    <SelectValue placeholder={t("lifestyle2.preferences.diet.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="omnivore">{t("lifestyle2.preferences.diet.options.omnivore")}</SelectItem>
                  <SelectItem value="vegetarian">{t("lifestyle2.preferences.diet.options.vegetarian")}</SelectItem>
                  <SelectItem value="vegan">{t("lifestyle2.preferences.diet.options.vegan")}</SelectItem>
                  <SelectItem value="kosher">{t("lifestyle2.preferences.diet.options.kosher")}</SelectItem>
                  <SelectItem value="halal">{t("lifestyle2.preferences.diet.options.halal")}</SelectItem>
                  <SelectItem value="other">{t("lifestyle2.preferences.diet.options.other")}</SelectItem>
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
