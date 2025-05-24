
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SearchSection: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-white mb-4"
      >
        מצא את ההתאמה המושלמת שלך
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-md mx-auto mb-6"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="חפש לפי כינוי..."
            className="w-full px-4 py-3 pr-12 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#A367B1] focus:border-transparent"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
        </div>
      </motion.div>
    </div>
  );
};

export default SearchSection;
