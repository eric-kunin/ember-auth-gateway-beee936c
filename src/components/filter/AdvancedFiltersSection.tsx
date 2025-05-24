
import React from 'react';
import { motion } from 'framer-motion';

const AdvancedFiltersSection: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
    >
      <h3 className="text-lg font-semibold text-white mb-4 text-center">חיפוש מתקדם</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-white/80">חיפוש בסיסי</label>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-[#A367B1] text-white rounded-lg text-sm font-medium"
            >
              חיפוש
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              אפיוני
            </motion.button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-white/80">חיפוש מתקדם</label>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              ★
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              👤
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdvancedFiltersSection;
