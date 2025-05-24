
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}) => (
  <div className="border-b border-white/10">
    <motion.button
      onClick={onToggle}
      className="w-full py-3 px-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
    >
      <span className="font-medium text-sm">{title}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-4 h-4 text-white/70" />
      </motion.div>
    </motion.button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="p-4 space-y-4 bg-white/2">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default CollapsibleSection;
