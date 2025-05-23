
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProfileDetailsFormValues } from "../profile-details/types";

interface BioSectionProps {
  form: UseFormReturn<ProfileDetailsFormValues>;
  isLoading: boolean;
}

const BioSection = ({ form, isLoading }: BioSectionProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
              Bio
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about yourself..."
                className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                         text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                         h-24 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="profession"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
              Profession
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Your profession"
                className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                         text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                         h-11 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
};

export default BioSection;
