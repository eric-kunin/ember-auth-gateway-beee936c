
import { motion } from "framer-motion";
import { SummarySectionProps } from "./SummarySectionProps";
import { item } from "./types";

export const SummarySection = ({ title, icon, children, className, variants = item }: SummarySectionProps) => {
  // If title and icon are provided, render the full section with header
  if (title && icon) {
    return (
      <motion.div 
        className="p-4 space-y-3"
        variants={variants}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#9D4EDD] dark:text-[#C77DFF]">{icon}</span>
          <h4 className="font-medium text-[#240046] dark:text-white">
            {title}
          </h4>
        </div>
        <div className="space-y-2 pl-4">
          {children}
        </div>
      </motion.div>
    );
  }
  
  // Otherwise just render a basic container
  return (
    <motion.div 
      className={`p-4 rounded-lg border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20 ${className || ""}`}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default SummarySection;
