import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Control, useController } from "react-hook-form";
import { cn } from "@/lib/utils";
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
  const getStartOfDecade = (year: number) => year - (year % 10);

  const {
    field,
    fieldState
  } = useController({
    name: "birthdate",
    control,
  });

  const birthdateIsValid = field.value && !fieldState.invalid && fieldState.isDirty;
  const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");
  const [displayedMonth, setDisplayedMonth] = useState<Date>(field.value || defaultDate);

  const changeYear = (offset: number) => {
    const newDate = new Date(displayedMonth);
    newDate.setFullYear(newDate.getFullYear() + offset);
    setDisplayedMonth(newDate);
  };

  const changeDecade = (offset: number) => {
    const start = getStartOfDecade(displayedMonth.getFullYear());
    const newDate = new Date(displayedMonth);
    newDate.setFullYear(start + offset * 10);
    setDisplayedMonth(newDate);
  };

  const navButtonClass =
    "w-8 h-8 flex items-center justify-center bg-white/80 dark:bg-[#240046]/80 text-[#240046] dark:text-white border border-[#E0AAFF]/50 dark:border-[#9D4EDD]/50 rounded-lg p-1 hover:bg-[#E0AAFF]/30 dark:hover:bg-[#9D4EDD]/30 transition-all shadow-sm hover:shadow-md";

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
                "group w-full justify-start text-left font-normal h-11 sm:h-12 px-4",
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
              <CalendarIcon
                className={cn(
                  "mr-3 h-5 w-5 transition-transform duration-300",
                  "text-[#9D4EDD] dark:text-[#C77DFF]",
                  "group-hover:rotate-12 group-hover:scale-110"
                )}
              />
              <span
                className={cn(
                  "flex-1 text-sm sm:text-base transition-colors duration-300",
                  field.value
                    ? "text-[#7B2CBF] dark:text-[#E0AAFF] group-hover:text-[#9D4EDD] dark:group-hover:text-[#C77DFF]"
                    : "text-muted-foreground"
                )}
              >
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
            {viewMode === "day" ? (
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                defaultMonth={displayedMonth}
                month={displayedMonth}
                onMonthChange={setDisplayedMonth}
                disabled={(date) => date > new Date()}
                initialFocus
                fromYear={minYear}
                toYear={currentYear}
                captionLayout="buttons"
                className="rounded-lg pointer-events-auto bg-white/90 dark:bg-[#240046]/90 shadow-inner"
                classNames={{
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-2 pb-1 items-center text-center",
                  caption_label:
                    "text-sm font-semibold text-[#240046] dark:text-white px-5 py-2 rounded-md transition-colors duration-200 cursor-pointer hover:bg-[#E0AAFF]/40 dark:hover:bg-[#9D4EDD]/40",
                  nav: "space-x-1 flex items-center",
                  nav_button: navButtonClass,
                  nav_button_previous: "absolute left-2",
                  nav_button_next: "absolute right-2",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-[#240046] dark:text-gray-300 rounded-md w-9 font-medium text-xs uppercase tracking-wide",
                  row: "flex w-full mt-2",
                  cell: "relative p-0 text-center text-sm focus-within:z-20 [&:has([aria-selected])]:rounded-lg",
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
                components={{
                  CaptionLabel: ({ displayMonth }) => (
                    <button
                      type="button"
                      onClick={() => setViewMode("month")}
                      className="text-sm font-semibold text-[#240046] dark:text-white px-5 py-2 rounded-md transition-colors duration-200 cursor-pointer hover:bg-[#E0AAFF]/40 dark:hover:bg-[#9D4EDD]/40"
                    >
                      {format(displayMonth, "MMMM yyyy")}
                    </button>
                  ),
                }}
              />
            ) : viewMode === "month" ? (
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <button onClick={() => changeYear(-1)} className={navButtonClass}><ChevronLeft className="w-5 h-5" /></button>
                  <button
                    type="button"
                    onClick={() => setViewMode("year")}
                    className="text-sm font-semibold text-[#240046] dark:text-white px-5 py-2 rounded-md bg-[#f0e6ff]/40 dark:bg-[#9D4EDD]/20 transition-colors duration-200 cursor-pointer hover:bg-[#E0AAFF]/40 dark:hover:bg-[#9D4EDD]/40"
                  >
                    {format(displayedMonth, "yyyy")}
                  </button>
                  <button onClick={() => changeYear(1)} className={navButtonClass}><ChevronRight className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const monthDate = new Date(displayedMonth);
                    monthDate.setMonth(i);
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const updated = new Date(displayedMonth);
                          updated.setMonth(i);
                          setDisplayedMonth(updated);
                          setViewMode("day");
                        }}
                        className="text-sm font-medium text-[#240046] dark:text-white px-3 py-2 rounded-lg hover:bg-[#E0AAFF]/30 dark:hover:bg-[#9D4EDD]/30 transition-colors"
                      >
                        {format(monthDate, "MMM")}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <button onClick={() => changeDecade(-1)} className={navButtonClass}><ChevronLeft className="w-6 h-6" /></button>
                  <button
                    type="button"
                    onClick={() => setViewMode("month")}
                    className="text-sm font-semibold text-[#240046] dark:text-white px-5 py-2 rounded-md bg-[#f0e6ff]/40 dark:bg-[#9D4EDD]/20 transition-colors duration-200 cursor-pointer hover:bg-[#E0AAFF]/40 dark:hover:bg-[#9D4EDD]/40"
                  >
                    {getStartOfDecade(displayedMonth.getFullYear())}–{getStartOfDecade(displayedMonth.getFullYear()) + 9}
                  </button>
                  <button onClick={() => changeDecade(1)} className={navButtonClass}><ChevronRight className="w-6 h-6" /></button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const start = getStartOfDecade(displayedMonth.getFullYear());
                    const year = start + i;
                    return (
                      <button
                        key={year}
                        onClick={() => {
                          const updated = new Date(displayedMonth);
                          updated.setFullYear(year);
                          setDisplayedMonth(updated);
                          setViewMode("month");
                        }}
                        className="text-sm font-medium text-[#240046] dark:text-white px-3 py-2 rounded-lg hover:bg-[#E0AAFF]/30 dark:hover:bg-[#9D4EDD]/30 transition-colors"
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      <div className="h-6">
        <FormMessage className="text-xs text-red-500 mt-1" />
      </div>
    </FormItem>
  );
};

export default BirthdateField;
