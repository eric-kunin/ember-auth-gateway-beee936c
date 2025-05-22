
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProfileDetailsFormValues } from "./types";

interface PhysicalSectionProps {
  form: UseFormReturn<ProfileDetailsFormValues>;
  isLoading: boolean;
}

const PhysicalSection = ({ form, isLoading }: PhysicalSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="height"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
                onChange={event => {
                  // Convert to integer by removing decimal part
                  const value = event.target.value;
                  const intValue = value ? parseInt(value, 10) : undefined;
                  field.onChange(intValue);
                }}
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
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
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
              <SelectContent>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="hazel">Hazel</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PhysicalSection;
