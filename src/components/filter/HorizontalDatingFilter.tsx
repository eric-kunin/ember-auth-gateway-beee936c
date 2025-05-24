
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Filter } from 'lucide-react';

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
    <div className="w-full max-w-4xl mx-auto" dir="rtl">
      {/* Main Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-4">
          מצא את ההתאמה המושלמת שלך
        </h2>
      </div>

      {/* Horizontal Filter Container */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        {/* Top Row - Main Controls */}
        <div className="flex items-center p-4 gap-4">
          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors min-w-[200px] justify-between"
            >
              <span className="text-gray-700 text-sm">{getFilterSummary()}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </motion.div>
            </button>
          </div>

          {/* Gender Dropdown */}
          <div className="relative">
            <select
              value={filters.seeking}
              onChange={(e) => setFilters(prev => ({ ...prev, seeking: e.target.value }))}
              className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm min-w-[120px] appearance-none"
            >
              <option value="">מחפש/ת</option>
              {genderOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Age Range Display */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 min-w-[120px]">
            <span className="text-gray-700 text-sm">
              גילאים: {filters.ageRange[1]} - {filters.ageRange[0]}
            </span>
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm min-w-[100px] appearance-none"
            >
              <option value="">איזור</option>
              {locationOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="חיפוש"
              className="w-full px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm"
            />
          </div>

          {/* Search Button */}
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span className="text-sm">חיפוש</span>
          </button>
        </div>

        {/* Expandable Filter Section */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gray-200"
            >
              <div className="p-6 bg-gray-50 space-y-6">
                {/* Detailed Filter Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Gender Selection */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700">מין:</h3>
                    <div className="space-y-2">
                      {genderOptions.map(option => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={option.value}
                            checked={filters.gender === option.value}
                            onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
                            className="text-blue-600"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Seeking Selection */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700">מחפש/ת:</h3>
                    <div className="space-y-2">
                      {genderOptions.map(option => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="seeking"
                            value={option.value}
                            checked={filters.seeking === option.value}
                            onChange={(e) => setFilters(prev => ({ ...prev, seeking: e.target.value }))}
                            className="text-blue-600"
                          />
                          <span className="text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Age Range */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-gray-700">גילאים:</h3>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600">
                        {filters.ageRange[1]} - {filters.ageRange[0]}
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min={18}
                          max={80}
                          value={filters.ageRange[0]}
                          onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            ageRange: [parseInt(e.target.value), Math.max(parseInt(e.target.value) + 1, prev.ageRange[1])] 
                          }))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer absolute top-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HorizontalDatingFilter;
