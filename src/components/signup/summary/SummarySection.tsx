
import { motion } from "framer-motion";
import { SummarySectionProps } from "./types";

const SummarySection = ({ children, className, variants }: SummarySectionProps) => {
  return (
    <motion.div 
      className={`p-4 ${className || ""}`}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default SummarySection;
