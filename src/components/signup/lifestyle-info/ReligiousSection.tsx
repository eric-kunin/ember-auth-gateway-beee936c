
import { Church } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ReligiousSectionProps {
  form: UseFormReturn<any>;
  isLoading: boolean;
}

const ReligiousSection = ({ form, isLoading }: ReligiousSectionProps) => {
  const { t, i18n } = useTranslation();
const isHebrew = i18n.language === "he";
const direction = isHebrew ? "rtl" : "ltr";
  
  return (
    <div>
      <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
        <Church className="h-4 w-4 text-[#9D4EDD]" />
        {t("lifestyle1.religious.title")}
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                {t("lifestyle1.religious.religion.label")}
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
                  dir={direction} >
                    <SelectValue placeholder={t("lifestyle1.religious.religion.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem dir={direction} value="orthodox">{t("lifestyle1.religious.religion.options.orthodox")}</SelectItem>
                  <SelectItem dir={direction} value="conservative">{t("lifestyle1.religious.religion.options.conservative")}</SelectItem>
                  <SelectItem dir={direction} value="reform">{t("lifestyle1.religious.religion.options.reform")}</SelectItem>
                  <SelectItem dir={direction} value="secular">{t("lifestyle1.religious.religion.options.secular")}</SelectItem>
                  <SelectItem dir={direction} value="traditional">{t("lifestyle1.religious.religion.options.traditional")}</SelectItem>
                  <SelectItem dir={direction} value="other">{t("lifestyle1.religious.religion.options.other")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="religiousLevel"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                <Church className="h-4 w-4 text-[#9D4EDD]" />
                {t("lifestyle1.religious.religiousLevel.label")}
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
                  dir={direction}>
                    <SelectValue placeholder={t("lifestyle1.religious.religiousLevel.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem dir={direction} value="not religious">{t("lifestyle1.religious.religiousLevel.options.not religious")}</SelectItem>
                  <SelectItem dir={direction} value="somewhat religious">{t("lifestyle1.religious.religiousLevel.options.somewhat religious")}</SelectItem>
                  <SelectItem dir={direction} value="religious">{t("lifestyle1.religious.religiousLevel.options.religious")}</SelectItem>
                  <SelectItem dir={direction} value="very religious">{t("lifestyle1.religious.religiousLevel.options.very religious")}</SelectItem>
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

export default ReligiousSection;
