
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import FilterDropdown from './filter/FilterDropdown';
import SearchSection from './filter/SearchSection';
import AdvancedFiltersSection from './filter/AdvancedFiltersSection';
import { filterOptions } from './filter/filterOptions';

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

  const toggleDropdown = (key: keyof typeof openDropdowns) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key],
      // Close other dropdowns
      ...Object.keys(prev).reduce((acc, k) => ({
        ...acc,
        [k]: k === key ? !prev[key as keyof typeof prev] : false
      }), {})
    }));
  };

  const updateFilter = (key: keyof typeof filters, value: string) => {
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

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <SearchSection />

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

      <AdvancedFiltersSection />
    </div>
  );
};

export default ImprovedDatingFilter;
