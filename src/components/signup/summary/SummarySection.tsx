
import { motion } from "framer-motion";
import { SummarySectionProps } from "./types";

const SummarySection = ({ children, className, variants }: SummarySectionProps) => {
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
