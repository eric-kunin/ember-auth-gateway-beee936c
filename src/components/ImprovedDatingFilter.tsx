
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Heart, User, Filter, Search, BadgeCheck, RotateCcw
} from 'lucide-react';
import CustomRangeSlider from './filter/CustomRangeSlider';
import FilterButton from './filter/FilterButton';
import CollapsibleSection from './filter/CollapsibleSection';
import {
  mainGenders,
  extraGenders,
  relationshipTypes,
  regions,
  citiesByRegion,
  popularCities
} from './filter/filterData';

const ImprovedDatingFilter = () => {
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 35]);
  const [heightRange, setHeightRange] = useState<[number, number]>([150, 190]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedRelationshipType, setSelectedRelationshipType] = useState<string>("");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCityType, setSelectedCityType] = useState<string>("popular");
  const [nickname, setNickname] = useState<string>("");
  const [selectedGenderType, setSelectedGenderType] = useState<string>("main");
  const [selectedGender, setSelectedGender] = useState<string>("");
  
  const [openSections, setOpenSections] = useState({
    basic: false,
    advanced: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const resetFilters = () => {
    setAgeRange([18, 35]);
    setHeightRange([150, 190]);
    setSelectedCity("");
    setSelectedRelationshipType("");
    setShowVerifiedOnly(false);
    setSelectedRegion("");
    setSelectedCityType("popular");
    setNickname("");
    setSelectedGenderType("main");
    setSelectedGender("");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      {/* Main Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          מצא את ההתאמה המושלמת שלך
        </h2>
        
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
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="חפש לפי כינוי..."
              className="w-full px-4 py-3 pr-12 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#A367B1] focus:border-transparent"
              dir="rtl"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
          </div>
        </motion.div>
      </motion.div>

      {/* Filter Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
        dir="rtl"
      >
        {/* Filter Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Filter className="w-6 h-6 text-white/80" />
          <h3 className="text-xl font-semibold text-white">סינון</h3>
        </div>

        {/* Quick Filters - Top Row */}
        <div className="grid grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          {/* Age Range */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <User className="w-4 h-4" />
              <span>טווח גיל</span>
            </div>
            <CustomRangeSlider
              min={18}
              max={80}
              value={ageRange}
              onChange={setAgeRange}
              label=""
              unit=""
            />
          </div>

          {/* Height Range */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <User className="w-4 h-4" />
              <span>טווח גובה</span>
            </div>
            <CustomRangeSlider
              min={150}
              max={190}
              value={heightRange}
              onChange={setHeightRange}
              label=""
              unit=" ס״מ"
            />
          </div>

          {/* Verified Toggle */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <BadgeCheck className="w-4 h-4" />
              <span>מאומתים בלבד</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowVerifiedOnly(!showVerifiedOnly)}
              className="w-14 h-7 rounded-full relative transition-colors duration-300"
              style={{ backgroundColor: showVerifiedOnly ? '#A367B1' : 'rgba(255, 255, 255, 0.1)' }}
            >
              <motion.div
                animate={{ x: showVerifiedOnly ? 28 : 0 }}
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-2">
          {/* Basic Search */}
          <CollapsibleSection
            title="חיפוש בסיסי"
            isOpen={openSections.basic}
            onToggle={() => toggleSection('basic')}
          >
            {/* Gender Selection */}
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
                <User className="w-4 h-4" />
                <span>מגדר</span>
              </div>

              {/* Gender Type Tabs */}
              <div className="flex gap-2 mb-2 justify-center">
                <button
                  onClick={() => setSelectedGenderType("main")}
                  className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                    selectedGenderType === "main"
                      ? "bg-[#A367B1] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  בסיסי
                </button>
                <button
                  onClick={() => setSelectedGenderType("extra")}
                  className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                    selectedGenderType === "extra"
                      ? "bg-[#A367B1] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  מורחב
                </button>
              </div>

              {/* Gender Buttons */}
              {selectedGenderType === "main" ? (
                <div className="grid grid-cols-4 gap-2">
                  <FilterButton
                    selected={selectedGender === "male"}
                    onClick={() => setSelectedGender(selectedGender === "male" ? "" : "male")}
                  >
                    גבר
                  </FilterButton>
                  <FilterButton
                    selected={selectedGender === "female"}
                    onClick={() => setSelectedGender(selectedGender === "female" ? "" : "female")}
                  >
                    אישה
                  </FilterButton>
                  <FilterButton
                    selected={selectedGender === "both"}
                    onClick={() => setSelectedGender(selectedGender === "both" ? "" : "both")}
                  >
                    גבר ואישה
                  </FilterButton>
                  <FilterButton
                    selected={selectedGender === "other"}
                    onClick={() => setSelectedGender(selectedGender === "other" ? "" : "other")}
                  >
                    אחר
                  </FilterButton>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {extraGenders.map((gender) => (
                    <FilterButton
                      key={gender.value}
                      selected={selectedGender === gender.value}
                      onClick={() => setSelectedGender(gender.value === selectedGender ? "" : gender.value)}
                    >
                      {gender.label}
                    </FilterButton>
                  ))}
                </div>
              )}
            </div>
          </CollapsibleSection>

          {/* Advanced Search */}
          <CollapsibleSection
            title="חיפוש מתקדם"
            isOpen={openSections.advanced}
            onToggle={() => toggleSection('advanced')}
          >
            {/* Location Section */}
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4" />
                <span>איזור</span>
              </div>

              {/* Region Selection */}
              <div className="grid grid-cols-4 gap-2">
                {regions.map((region) => (
                  <FilterButton
                    key={region.value}
                    selected={selectedRegion === region.value}
                    onClick={() => setSelectedRegion(region.value === selectedRegion ? "" : region.value)}
                  >
                    {region.label}
                  </FilterButton>
                ))}
              </div>

              {/* City Type Tabs */}
              <div className="flex justify-center gap-2 mb-2">
                <button
                  onClick={() => setSelectedCityType("popular")}
                  className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                    selectedCityType === "popular"
                      ? "bg-[#A367B1] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  ערים מרכזיות
                </button>
                <button
                  onClick={() => setSelectedCityType("all")}
                  className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                    selectedCityType === "all"
                      ? "bg-[#A367B1] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  כל הערים
                </button>
              </div>

              {/* Cities Grid */}
              <div className="grid grid-cols-3 gap-2">
                {(selectedCityType === "popular" ? popularCities : 
                  selectedRegion ? citiesByRegion[selectedRegion as keyof typeof citiesByRegion] :
                  popularCities).map((city) => (
                  <FilterButton
                    key={city.value}
                    selected={selectedCity === city.value}
                    onClick={() => setSelectedCity(city.value === selectedCity ? "" : city.value)}
                  >
                    {city.label}
                  </FilterButton>
                ))}
              </div>
            </div>

            {/* Relationship Type Section */}
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
                <Heart className="w-4 h-4" />
                <span>מטרת הקשר</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {relationshipTypes.map((type) => (
                  <FilterButton
                    key={type.value}
                    selected={selectedRelationshipType === type.value}
                    onClick={() => setSelectedRelationshipType(type.value === selectedRelationshipType ? "" : type.value)}
                  >
                    {type.label}
                  </FilterButton>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
            whileTap={{ scale: 0.98 }}
            onClick={resetFilters}
            className="px-6 py-3 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2 text-sm font-medium border border-red-500/30 hover:border-red-500/50"
          >
            <RotateCcw className="w-4 h-4" />
            איפוס
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: '#FFE4EE',
            }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-[#FFD1E3] hover:bg-[#FFE4EE] text-[#392467] rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            <Search className="w-5 h-5" />
            חיפוש
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ImprovedDatingFilter;
