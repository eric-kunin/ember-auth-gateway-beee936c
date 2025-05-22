
import { Heart, Ruler, Eye } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { LifestyleFormValues } from "./SignupLifestyleInfo";
import { EyeColorOptions } from "./constants";

interface PhysicalSectionProps {
  form: UseFormReturn<LifestyleFormValues>;
  isLoading: boolean;
}

const PhysicalSection = ({ form, isLoading }: PhysicalSectionProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-[#240046] dark:text-white mb-3 flex items-center gap-2">
        <Heart className="h-4 w-4 text-[#9D4EDD]" />
        Physical Attributes
      </h4>
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                <Ruler className="h-4 w-4 text-[#9D4EDD]" />
                Height (cm)
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Height in cm"
                  className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                           text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                           h-11 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                  disabled={isLoading}
                  {...field}
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    // Remove any non-digit characters
                    const input = e.currentTarget;
                    input.value = input.value.replace(/\D/g, '');
                  }}
                  onChange={event => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eyeColor"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300 flex items-center gap-1">
                <Eye className="h-4 w-4 text-[#9D4EDD]" />
                Eye Color
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
                    <SelectValue placeholder="Select eye color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white dark:bg-[#240046] border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20">
                  {EyeColorOptions.map((eyeColor) => (
                    <SelectItem key={eyeColor.value} value={eyeColor.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{eyeColor.label}</span>
                        <span 
                          className="h-4 w-4 rounded-full ml-2"
                          style={{ backgroundColor: eyeColor.color }}
                        />
                      </div>
                    </SelectItem>
                  ))}
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

export default PhysicalSection;
