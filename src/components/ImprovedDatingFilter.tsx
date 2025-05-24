
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, RotateCcw } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterDropdown = ({ title, options, value, onChange, isOpen, onToggle }) => (
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

const ImprovedDatingFilter = () => {
  const [filters, setFilters] = useState({
    location: '',
    age: '',
    lookingFor: '',
    city: ''
  });
  
  const [openDropdowns, setOpenDropdowns] = useState({
    location: false,
    age: false,
    lookingFor: false,
    city: false
  });

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key],
      // Close other dropdowns
      ...Object.keys(prev).reduce((acc, k) => ({
        ...acc,
        [k]: k === key ? !prev[key] : false
      }), {})
    }));
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      age: '',
      lookingFor: '',
      city: ''
    });
    setOpenDropdowns({
      location: false,
      age: false,
      lookingFor: false,
      city: false
    });
  };

  const filterOptions = {
    location: ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'אשדוד', 'נתניה'],
    age: ['18-25', '26-30', '31-35', '36-40', '41+'],
    lookingFor: ['מערכת יחסים רצינית', 'היכרות', 'חברות', 'נישואין'],
    city: ['מרכז', 'צפון', 'דרום', 'ירושלים והסביבה', 'השפלה']
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      {/* Main Search Section */}
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-4"
        >
          מצא את ההתאמה המושלמת שלך
        </motion.h2>
        
        {/* Search Bar */}
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

      {/* Filter Tags */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-8"
      >
        <FilterDropdown
          title="אזור"
          options={filterOptions.location}
          value={filters.location}
          onChange={(value) => updateFilter('location', value)}
          isOpen={openDropdowns.location}
          onToggle={() => toggleDropdown('location')}
        />
        
        <FilterDropdown
          title="גיל"
          options={filterOptions.age}
          value={filters.age}
          onChange={(value) => updateFilter('age', value)}
          isOpen={openDropdowns.age}
          onToggle={() => toggleDropdown('age')}
        />
        
        <FilterDropdown
          title="מחפש"
          options={filterOptions.lookingFor}
          value={filters.lookingFor}
          onChange={(value) => updateFilter('lookingFor', value)}
          isOpen={openDropdowns.lookingFor}
          onToggle={() => toggleDropdown('lookingFor')}
        />
        
        <FilterDropdown
          title="עיר"
          options={filterOptions.city}
          value={filters.city}
          onChange={(value) => updateFilter('city', value)}
          isOpen={openDropdowns.city}
          onToggle={() => toggleDropdown('city')}
        />

        {/* Reset Button */}
        <motion.button
          onClick={resetFilters}
          className="px-4 py-2 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2 text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="w-4 h-4" />
          איפוס
        </motion.button>
      </motion.div>

      {/* Advanced Filters Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-white mb-4 text-center">חיפוש מתקדם</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Advanced Filter Options */}
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
    </div>
  );
};

export default ImprovedDatingFilter;
