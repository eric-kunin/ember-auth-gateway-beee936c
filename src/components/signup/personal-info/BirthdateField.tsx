
import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { BirthdateFormValues } from "../schemas";

interface BirthdateFieldProps {
  control: Control<BirthdateFormValues>;
  isLoading: boolean;
}

const BirthdateField = ({ control, isLoading }: BirthdateFieldProps) => {
  const defaultDate = new Date();
  defaultDate.setFullYear(defaultDate.getFullYear() - 18);

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 80;

  const isMobile = useIsMobile();

  return (
    <FormField
      control={control}
      name="birthdate"
      render={({ field, fieldState }) => {
        const birthdateIsValid = field.value && !fieldState.invalid && fieldState.isDirty;

        return (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm text-[#240046] dark:text-white transition-colors duration-300">
              Date of Birth
            </FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal h-11 sm:h-12 px-4",
                      "bg-[#f8f2ff]/70 dark:bg-[#240046]/80",
                      "border border-[#E0AAFF]/40 dark:border-[#9D4EDD]/30",
                      "text-[#240046] dark:text-white",
                      "hover:bg-[#f0e6ff] dark:hover:bg-[#2C1B47]",
                      "transition-all duration-300",
                      "focus-visible:ring-2 focus-visible:ring-[#9D4EDD] focus-visible:ring-offset-2",
                      "shadow-sm hover:shadow-md",
                      !field.value && "text-muted-foreground",
                      fieldState.invalid && fieldState.isDirty && "border-red-500 dark:border-red-500 ring-1 ring-red-500",
                      birthdateIsValid && "border-green-500 dark:border-green-500 ring-1 ring-green-500"
                    )}
                    disabled={isLoading}
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-[#9D4EDD]/70 dark:text-custom-lighter/70" />
                    <span className="flex-1">
                      {field.value ? format(field.value, "MMMM dd, yyyy") : "Select your birth date"}
                    </span>
                  </Button>
                </FormControl>
              </PopoverTrigger>

              <PopoverContent
                className="w-auto p-0 bg-white/95 dark:bg-[#240046]/95 border-[#9D4EDD]/30 rounded-xl shadow-2xl backdrop-blur-sm pointer-events-auto"
                align="center"
                sideOffset={8}
              >
                <div className="bg-gradient-to-br from-[#f8f2ff] to-[#f0e6ff] dark:from-[#240046] dark:to-[#10002B] rounded-xl p-1">
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
                    className="rounded-lg pointer-events-auto bg-white/90 dark:bg-[#240046]/90 shadow-inner"
                    classNames={{
                      months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                      month: "space-y-4",
                      caption: "flex justify-center pt-2 pb-1 relative items-center",
                      caption_label: "text-sm font-semibold text-[#240046] dark:text-white",
                      caption_dropdowns: "flex justify-center gap-2",
                      dropdown: "relative z-10",
                      dropdown_month:
                        "text-sm rounded-lg bg-[#9D4EDD] dark:bg-[#7B2CBF] border border-[#9D4EDD]/50 py-1.5 px-3 text-white font-medium shadow-md hover:bg-[#7B2CBF] dark:hover:bg-[#5A1A7B] transition-colors",
                      dropdown_year:
                        "text-sm rounded-lg bg-[#9D4EDD] dark:bg-[#7B2CBF] border border-[#9D4EDD]/50 py-1.5 px-3 text-white font-medium shadow-md hover:bg-[#7B2CBF] dark:hover:bg-[#5A1A7B] transition-colors",
                      dropdown_icon:
                        "absolute right-2 top-1/2 -translate-y-1/2 size-4 text-white",
                      nav: "space-x-1 flex items-center",
                      nav_button:
                        "h-8 w-8 bg-white/80 dark:bg-[#240046]/80 p-0 opacity-80 hover:opacity-100 text-[#240046] dark:text-white hover:bg-[#E0AAFF]/30 dark:hover:bg-[#9D4EDD]/30 border border-[#E0AAFF]/50 dark:border-[#9D4EDD]/50 rounded-lg shadow-sm hover:shadow-md transition-all",
                      nav_button_previous: "absolute left-2",
                      nav_button_next: "absolute right-2",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell:
                        "text-[#240046] dark:text-gray-300 rounded-md w-9 font-medium text-xs uppercase tracking-wide",
                      row: "flex w-full mt-2",
                      cell:
                        "relative p-0 text-center text-sm focus-within:z-20 [&:has([aria-selected])]:rounded-lg",
                      day:
                        "h-9 w-9 p-0 font-medium text-[#240046] dark:text-white hover:bg-[#E0AAFF]/40 dark:hover:bg-[#9D4EDD]/40 rounded-lg transition-all duration-200 hover:shadow-sm hover:scale-105",
                      day_selected:
                        "bg-gradient-to-br from-[#9D4EDD] to-[#7B2CBF] text-white hover:from-[#7B2CBF] hover:to-[#5A1A7B] hover:text-white focus:from-[#9D4EDD] focus:to-[#7B2CBF] shadow-md font-semibold",
                      day_today:
                        "bg-[#E0AAFF]/60 dark:bg-[#240046] text-[#240046] dark:text-white font-bold border border-[#9D4EDD]/30 shadow-sm",
                      day_outside: "text-muted-foreground opacity-40",
                      day_disabled: "text-muted-foreground opacity-30",
                      day_range_middle:
                        "aria-selected:bg-accent aria-selected:text-accent-foreground dark:aria-selected:bg-[#240046]/50",
                      day_hidden: "invisible",
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <div className="h-6">
              <FormMessage className="text-xs text-red-500 mt-1" />
            </div>
          </FormItem>
        );
      }}
    />
  );
};

export default BirthdateField;
