
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, getYear, setYear } from "date-fns";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function YearNavigation(props: {
  displayMonth: Date;
  onChange: (date: Date) => void;
  captionLayout?: "buttons" | "dropdown";
}) {
  const { displayMonth, onChange, captionLayout } = props;
  const currentYear = getYear(new Date());
  
  // Create a range of years - 100 years in the past to current year
  const startYear = currentYear - 100;
  const years = Array.from({ length: currentYear - startYear + 1 }, 
    (_, i) => startYear + i);

  return (
    <Select
      value={getYear(displayMonth).toString()}
      onValueChange={(year) => {
        const newDate = setYear(displayMonth, parseInt(year));
        onChange(newDate);
      }}
    >
      <SelectTrigger 
        className="h-7 w-16 text-xs border-none bg-transparent focus:ring-0"
        aria-label="Change year"
      >
        <SelectValue placeholder={getYear(displayMonth)} />
      </SelectTrigger>
      <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()} className="text-xs">
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

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
        Caption: props => (
          <div className="flex justify-center items-center gap-1">
            <div className="flex-1 text-right">
              <YearNavigation 
                displayMonth={props.displayMonth} 
                onChange={(date) => props.goToMonth && props.goToMonth(date)} 
              />
            </div>
            <div className="flex-1 text-center">
              <span className="text-sm font-medium">
                {format(props.displayMonth, 'MMMM')}
              </span>
            </div>
            <div className="flex-1">
              {/* Spacer div to maintain centering */}
            </div>
          </div>
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
