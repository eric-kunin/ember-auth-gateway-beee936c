
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  title: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  title, 
  options, 
  value, 
  onChange, 
  isOpen, 
  onToggle 
}) => (
  <div className="relative">
    <motion.button
      onClick={onToggle}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
        isOpen 
          ? 'bg-[#A367B1] text-white shadow-lg' 
          : 'bg-white/20 text-white hover:bg-white/30'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {value || title}
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </motion.button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute top-full mt-2 min-w-[150px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
        >
          {options.map((option, index) => (
            <motion.button
              key={option}
              onClick={() => {
                onChange(option);
                onToggle();
              }}
              className="w-full px-4 py-3 text-right text-gray-700 hover:bg-[#A367B1]/10 transition-colors text-sm"
              whileHover={{ backgroundColor: '#A367B1', color: 'white' }}
            >
              {option}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default FilterDropdown;
