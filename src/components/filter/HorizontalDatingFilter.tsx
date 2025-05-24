
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Filter, Triangle } from 'lucide-react';

interface FilterState {
  gender: string;
  seeking: string;
  ageRange: [number, number];
  location: string;
}

const HorizontalDatingFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    gender: '',
    seeking: '',
    ageRange: [18, 80],
    location: ''
  });

  const genderOptions = [
    { label: 'גבר', value: 'male' },
    { label: 'אישה', value: 'female' }
  ];

  const locationOptions = [
    'ירושלים',
    'צפון',
    'חיפה',
    'מרכז',
    'דרום'
  ];

  const getFilterSummary = () => {
    const parts = [];
    if (filters.gender) parts.push(`מין: ${genderOptions.find(g => g.value === filters.gender)?.label}`);
    if (filters.seeking) parts.push(`מחפש/ת: ${genderOptions.find(g => g.value === filters.seeking)?.label}`);
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 80) {
      parts.push(`גילאים: ${filters.ageRange[1]} - ${filters.ageRange[0]}`);
    }
    if (filters.location) parts.push(`איזור: ${filters.location}`);
    return parts.length > 0 ? parts.join(' • ') : 'סינון';
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6" dir="rtl">
      {/* Main Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-2">
          מצא את ההתאמה המושלמת שלך
        </h2>
        <p className="text-white/60 text-lg">גלה את האהבה האמיתית כאן</p>
      </motion.div>

      {/* Enhanced Filter Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Top Row - Main Controls */}
        <div className="flex items-center p-6 gap-4 bg-gradient-to-r from-gray-50 to-white">
          {/* Filter Dropdown with Triangle */}
          <div className="relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100 hover:border-blue-200 transition-all duration-300 min-w-[250px] justify-between group shadow-sm"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Triangle className="w-4 h-4 text-blue-600 fill-current" />
                </motion.div>
                <span className="text-gray-700 font-medium text-sm">{getFilterSummary()}</span>
              </div>
              <Filter className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
            </motion.button>
          </div>

          {/* Gender Dropdown */}
          <div className="relative">
            <select
              value={filters.seeking}
              onChange={(e) => setFilters(prev => ({ ...prev, seeking: e.target.value }))}
              className="px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 text-gray-700 font-medium text-sm min-w-[140px] appearance-none hover:border-purple-200 focus:border-purple-300 focus:outline-none transition-all duration-300 shadow-sm"
            >
              <option value="">מחפש/ת</option>
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-500 pointer-events-none" />
          </div>

          {/* Age Range Display */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-100 min-w-[140px] shadow-sm">
            <span className="text-gray-700 font-medium text-sm">
              גילאים: {filters.ageRange[1]} - {filters.ageRange[0]}
            </span>
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-100 text-gray-700 font-medium text-sm min-w-[120px] appearance-none hover:border-orange-200 focus:border-orange-300 focus:outline-none transition-all duration-300 shadow-sm"
            >
              <option value="">איזור</option>
              {locationOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="חיפוש"
              className="w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-gray-200 text-gray-700 font-medium text-sm hover:border-gray-300 focus:border-blue-300 focus:outline-none transition-all duration-300 shadow-sm"
            />
          </div>

          {/* Search Button */}
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
          >
            <Search className="w-4 h-4" />
            <span className="text-sm">חיפוש</span>
          </motion.button>
        </div>

        {/* Expandable Filter Section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-200"
            >
              <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 space-y-8">
                {/* Detailed Filter Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Gender Selection */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                      מין:
                    </h3>
                    <div className="space-y-3">
                      {genderOptions.map(option => (
                        <motion.label 
                          key={option.value} 
                          className="flex items-center gap-3 cursor-pointer group"
                          whileHover={{ x: 5 }}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={option.value}
                            checked={filters.gender === option.value}
                            onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                            className="w-4 h-4 text-purple-600 border-2 border-gray-300 focus:ring-purple-500"
                          />
                          <span className="text-gray-700 font-medium group-hover:text-purple-600 transition-colors">
                            {option.label}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>

                  {/* Seeking Selection */}
                  <motion.div 
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                      מחפש/ת:
                    </h3>
                    <div className="space-y-3">
                      {genderOptions.map(option => (
                        <motion.label 
                          key={option.value} 
                          className="flex items-center gap-3 cursor-pointer group"
                          whileHover={{ x: 5 }}
                        >
                          <input
                            type="radio"
                            name="seeking"
                            value={option.value}
                            checked={filters.seeking === option.value}
                            onChange={(e) => setFilters(prev => ({ ...prev, seeking: e.target.value }))}
                            className="w-4 h-4 text-blue-600 border-2 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                            {option.label}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>

                  {/* Age Range */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                      <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                      גילאים:
                    </h3>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600 font-medium text-center">
                        {filters.ageRange[1]} - {filters.ageRange[0]}
                      </div>
                      <div className="relative px-2">
                        <div className="h-2 bg-gray-200 rounded-full relative overflow-hidden">
                          <div 
                            className="absolute h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
                            style={{
                              left: `${((filters.ageRange[0] - 18) / (80 - 18)) * 100}%`,
                              right: `${100 - ((filters.ageRange[1] - 18) / (80 - 18)) * 100}%`
                            }}
                          />
                        </div>
                        <input
                          type="range"
                          min={18}
                          max={80}
                          value={filters.ageRange[0]}
                          onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            ageRange: [parseInt(e.target.value), Math.max(parseInt(e.target.value) + 1, prev.ageRange[1])] 
                          }))}
                          className="absolute top-0 w-full h-2 appearance-none bg-transparent cursor-pointer"
                        />
                        <input
                          type="range"
                          min={18}
                          max={80}
                          value={filters.ageRange[1]}
                          onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            ageRange: [Math.min(prev.ageRange[0], parseInt(e.target.value) - 1), parseInt(e.target.value)] 
                          }))}
                          className="absolute top-0 w-full h-2 appearance-none bg-transparent cursor-pointer"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default HorizontalDatingFilter;
