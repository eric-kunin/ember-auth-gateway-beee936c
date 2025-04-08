
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, getYear, getMonth, setYear, setMonth } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center gap-1",
        caption_label: "text-sm font-medium grow text-center",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        Caption: ({ displayMonth, onMonthChange }) => {
          // List of months
          const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          
          // Current year and month
          const currentYear = getYear(displayMonth);
          const currentMonth = getMonth(displayMonth);
          
          // Create a range of years - 100 years in the past to current year
          const endYear = new Date().getFullYear();
          const startYear = endYear - 100;
          const years = Array.from(
            { length: endYear - startYear + 1 },
            (_, i) => startYear + i
          ).reverse(); // Reverse to show newest years first
          
          return (
            <div className="flex px-2 justify-between items-center w-full">
              <Select
                value={currentYear.toString()}
                onValueChange={(year) => {
                  const newDate = setYear(displayMonth, parseInt(year));
                  onMonthChange(newDate);
                }}
              >
                <SelectTrigger 
                  className="h-8 w-20 text-sm border-0 focus:ring-0 bg-transparent dark:bg-[#10002B] dark:hover:bg-[#240046]/80"
                  aria-label="Change year"
                >
                  <SelectValue placeholder={currentYear} />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-xs">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select
                value={currentMonth.toString()}
                onValueChange={(month) => {
                  const newDate = setMonth(displayMonth, parseInt(month));
                  onMonthChange(newDate);
                }}
              >
                <SelectTrigger 
                  className="h-8 w-28 text-sm border-0 focus:ring-0 bg-transparent dark:bg-[#10002B] dark:hover:bg-[#240046]/80"
                  aria-label="Change month"
                >
                  <SelectValue placeholder={months[currentMonth]} />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] overflow-y-auto">
                  {months.map((month, index) => (
                    <SelectItem key={month} value={index.toString()} className="text-xs">
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
