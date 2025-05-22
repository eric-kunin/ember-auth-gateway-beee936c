
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import { PersonalInfoFormValues } from "../schemas";

interface BirthdateFieldProps {
  control: Control<PersonalInfoFormValues>;
  isLoading: boolean;
}

const BirthdateField = ({ control, isLoading }: BirthdateFieldProps) => {
  // Calculate a sensible default birth year (18 years ago)
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 18);
  
  // Set exact 80 years ago as minimum year
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 80;

  return (
    <FormField
      control={control}
      name="birthdate"
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
            Date of Birth
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-11 sm:h-12",
                    "bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-0",
                    "text-[#240046] dark:text-white transition-colors duration-300 focus:ring-[#9D4EDD]",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Select your birth date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 min-w-[320px] pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                defaultMonth={field.value || defaultDate}
                disabled={(date) => date > new Date()}
                initialFocus
                fromYear={minYear}
                toYear={currentYear}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <div className="h-5 min-h-[1.25rem]">
            <FormMessage className="text-xs text-red-500" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default BirthdateField;
