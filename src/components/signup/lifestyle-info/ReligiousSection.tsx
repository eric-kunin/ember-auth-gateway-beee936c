
import { Church } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { LifestyleFormValues } from "./SignupLifestyleInfo";

interface ReligiousSectionProps {
  form: UseFormReturn<LifestyleFormValues>;
  isLoading: boolean;
}

const ReligiousSection = ({ form, isLoading }: ReligiousSectionProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
        <Church className="h-4 w-4 text-[#9D4EDD]" />
        Religious Information
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
                Religion
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
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                  <SelectItem value="orthodox">Orthodox</SelectItem>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="reform">Reform</SelectItem>
                  <SelectItem value="secular">Secular</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
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
                Religious Level
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
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                  <SelectItem value="not religious">Not Religious</SelectItem>
                  <SelectItem value="somewhat religious">Somewhat Religious</SelectItem>
                  <SelectItem value="religious">Religious</SelectItem>
                  <SelectItem value="very religious">Very Religious</SelectItem>
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
