
import React from 'react';
import { motion } from 'framer-motion';

interface FilterButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ selected, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
      selected ? 'bg-[#A367B1] text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
    }`}
  >
    {children}
  </motion.button>
);

export default FilterButton;
