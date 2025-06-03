import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    rtlAware?: boolean // Optional prop to manually override direction
  }
>(({ className, value, rtlAware = true, ...props }, ref) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === "he" && rtlAware

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
      dir={isRTL ? "rtl" : "ltr"} // Also helpful for accessibility
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{
          transform: isRTL
            ? `translateX(${100 - (value || 0)}%)` // fill from right to left
            : `translateX(-${100 - (value || 0)}%)`, // default: left to right
        }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
