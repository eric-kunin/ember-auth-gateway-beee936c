
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { item } from "./types";

export interface SummarySectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const SummarySection = ({ title, icon, children }: SummarySectionProps) => {
  return (
    <motion.div 
      className="p-4 space-y-3"
      variants={item}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#9D4EDD] dark:text-[#C77DFF]">{icon}</span>
        <h4 className="font-medium text-[#240046] dark:text-white">
          {title}
        </h4>
      </div>
      <div className="space-y-2 pl-7">
        {children}
      </div>
    </motion.div>
  );
};
