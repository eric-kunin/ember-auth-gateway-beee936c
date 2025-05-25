
import React from 'react';
import { motion } from 'framer-motion';

interface FilterButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  children,
  selected,
  onClick
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
        ${selected 
          ? 'bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] text-white shadow-lg shadow-purple-500/25' 
          : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
        }
        border border-white/20 hover:border-white/30
      `}
    >
      {children}
    </motion.button>
  );
};

export default FilterButton;
