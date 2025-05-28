
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserRound } from "lucide-react";
import { Control } from "react-hook-form";
import { ProfileDetailsFormValues } from "./types";

interface NameFieldProps {
  control: Control<ProfileDetailsFormValues>;
  isLoading: boolean;
}

const NameField = ({ control, isLoading }: NameFieldProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
            Full Name
          </FormLabel>
          <div className="relative">
            <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70 transition-colors duration-300" />
            <FormControl>
              <Input
                placeholder="John Doe"
                className="bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0 
                         text-[#240046] dark:text-white placeholder:text-[#9D4EDD]/60 dark:placeholder:text-white/60 
                         pl-10 h-11 sm:h-12 py-2 transition-colors duration-300 focus-visible:ring-[#9D4EDD]"
                disabled={isLoading}
                {...field}
              />
            </FormControl>
          </div>
          <div className="h-5 min-h-[1.25rem]">
            <FormMessage className="text-xs text-red-500" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default NameField;
