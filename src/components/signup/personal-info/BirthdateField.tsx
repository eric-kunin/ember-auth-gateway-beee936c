
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import { PersonalInfoFormValues } from "../schemas";
import { useIsMobile } from "@/hooks/use-mobile";

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
  
  const isMobile = useIsMobile();

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
                    "bg-[#f8f2ff]/70 dark:bg-[#240046]/80 border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/30",
                    "text-[#240046] dark:text-white transition-colors duration-300 focus:ring-[#9D4EDD] hover:bg-[#f0e6ff] dark:hover:bg-[#2C1B47]",
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
            <PopoverContent 
              className="w-auto p-0 bg-[#f8f2ff] dark:bg-[#240046] border-[#9D4EDD]/30 rounded-lg shadow-lg pointer-events-auto"
              align="center"
              sideOffset={5}
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                defaultMonth={field.value || defaultDate}
                disabled={(date) => date > new Date()}
                initialFocus
                fromYear={minYear}
                toYear={currentYear}
                captionLayout="dropdown-buttons"
                className="rounded-md bg-[#f8f2ff] dark:bg-[#240046] pointer-events-auto"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium text-[#240046] dark:text-white",
                  caption_dropdowns: "flex justify-center gap-1",
                  dropdown: "relative z-10",
                  dropdown_month: "text-sm rounded-md bg-[#f0e6ff] dark:bg-[#10002B] border border-[#E0AAFF]/50 dark:border-[#9D4EDD]/30 py-1 pl-2 pr-8 text-[#240046] dark:text-white",
                  dropdown_year: "text-sm rounded-md bg-[#f0e6ff] dark:bg-[#10002B] border border-[#E0AAFF]/50 dark:border-[#9D4EDD]/30 py-1 pl-2 pr-8 text-[#240046] dark:text-white",
                  dropdown_icon: "absolute right-2 top-[50%] translate-y-[-50%] size-4 text-[#240046] dark:text-white",
                  nav: "space-x-1 flex items-center",
                  nav_button: cn(
                    "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 text-[#240046] dark:text-white hover:bg-[#E0AAFF]/20 dark:hover:bg-[#9D4EDD]/20 border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/30 rounded-md"
                  ),
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-[#240046] dark:text-gray-300 rounded-md w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: cn(
                    "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                    "[&:has([aria-selected])]:rounded-md"
                  ),
                  day: cn(
                    "h-8 w-8 p-0 font-normal aria-selected:opacity-100 pointer-events-auto text-[#240046] dark:text-white hover:bg-[#E0AAFF]/30 dark:hover:bg-[#9D4EDD]/30 rounded-md transition-colors"
                  ),
                  day_selected: "bg-[#9D4EDD] text-white hover:bg-[#7B2CBF] hover:text-white focus:bg-[#9D4EDD] focus:text-white",
                  day_today: "bg-[#E0AAFF]/50 dark:bg-[#240046] text-[#240046] dark:text-white font-semibold",
                  day_outside: "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground dark:aria-selected:bg-[#240046]/50",
                  day_hidden: "invisible",
                }}
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
