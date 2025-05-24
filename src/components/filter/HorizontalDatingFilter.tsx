
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, Filter, Triangle, User, MapPin, Heart, BadgeCheck, RotateCcw } from 'lucide-react';

interface FilterState {
  gender: string;
  seeking: string;
  ageRange: [number, number];
  heightRange: [number, number];
  location: string;
  selectedRegion: string;
  selectedCityType: string;
  selectedRelationshipType: string;
  showVerifiedOnly: boolean;
  selectedGenderType: string;
}

const CustomRangeSlider = ({ min, max, value, onChange, label, unit }: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
  unit: string;
}) => {
  const getBackgroundSize = (val: number) => {
    return ((val - min) * 100) / (max - min);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between text-sm text-white/70">
        <span>{label}</span>
        <span>{value[0]}{unit} - {value[1]}{unit}</span>
      </div>
      <div className="relative h-2 bg-white/10 rounded-full">
        <div 
          className="absolute h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
          style={{
            right: `${getBackgroundSize(value[0])}%`,
            left: `${100 - getBackgroundSize(value[1])}%`
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([Math.min(parseInt(e.target.value), value[1] - 1), value[1]])}
          className="absolute top-0 right-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
          dir="rtl"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], Math.max(parseInt(e.target.value), value[0] + 1)])}
          className="absolute top-0 right-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
          dir="rtl"
        />
      </div>
    </div>
  );
};

const FilterButton = ({ selected, onClick, children }: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
      selected 
        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
    }`}
  >
    {children}
  </motion.button>
);

const HorizontalDatingFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [nickname, setNickname] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    gender: '',
    seeking: '',
    ageRange: [18, 80],
    heightRange: [150, 190],
    location: '',
    selectedRegion: '',
    selectedCityType: 'popular',
    selectedRelationshipType: '',
    showVerifiedOnly: false,
    selectedGenderType: 'main'
  });

  const genderOptions = [
    { label: 'גבר', value: 'male' },
    { label: 'אישה', value: 'female' }
  ];

  const extraGenders = [
    { label: 'גבר טרנס', value: 'trans-male' },
    { label: 'אישה טרנס', value: 'trans-female' },
    { label: 'נון-בינארי', value: 'non-binary' },
    { label: 'ג׳נדרקוויר', value: 'genderqueer' }
  ];

  const relationshipTypes = [
    { label: 'קשר רציני', value: 'serious' },
    { label: 'חברות', value: 'friendship' },
    { label: 'דייטים', value: 'dating' },
    { label: 'נישואין', value: 'marriage' },
    { label: 'דיסקרטי', value: 'discreet' }
  ];

  const regions = [
    { label: 'צפון', value: 'north' },
    { label: 'מרכז', value: 'center' },
    { label: 'דרום', value: 'south' },
    { label: 'יהודה ושומרון', value: 'judea' }
  ];

  const citiesByRegion = {
    north: [
      { label: 'חיפה', value: 'haifa' },
      { label: 'עכו', value: 'acre' },
      { label: 'נהריה', value: 'nahariya' },
      { label: 'כרמיאל', value: 'karmiel' },
      { label: 'קריית שמונה', value: 'kiryat-shmona' },
      { label: 'טבריה', value: 'tiberias' }
    ],
    center: [
      { label: 'תל אביב', value: 'tel-aviv' },
      { label: 'רמת גן', value: 'ramat-gan' },
      { label: 'פתח תקווה', value: 'petah-tikva' },
      { label: 'הרצליה', value: 'herzliya' },
      { label: 'נתניה', value: 'netanya' },
      { label: 'ראשון לציון', value: 'rishon-lezion' },
      { label: 'חולון', value: 'holon' },
      { label: 'רעננה', value: 'raanana' }
    ],
    south: [
      { label: 'באר שבע', value: 'beer-sheva' },
      { label: 'אשדוד', value: 'ashdod' },
      { label: 'אילת', value: 'eilat' },
      { label: 'אשקלון', value: 'ashkelon' },
      { label: 'דימונה', value: 'dimona' }
    ],
    judea: [
      { label: 'ירושלים', value: 'jerusalem' },
      { label: 'מעלה אדומים', value: 'maale-adumim' },
      { label: 'ביתר עילית', value: 'beitar-illit' },
      { label: 'אריאל', value: 'ariel' }
    ]
  };

  const popularCities = [
    { label: 'תל אביב', value: 'tel-aviv' },
    { label: 'ירושלים', value: 'jerusalem' },
    { label: 'חיפה', value: 'haifa' },
    { label: 'באר שבע', value: 'beer-sheva' },
    { label: 'נתניה', value: 'netanya' },
    { label: 'פתח תקווה', value: 'petah-tikva' }
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
        className="bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden"
      >
        {/* Top Row - Main Controls */}
        <div className="flex items-center p-6 gap-4 bg-gradient-to-r from-slate-800/50 to-purple-800/30">
          {/* Filter Dropdown with Triangle */}
          <div className="relative">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border-2 border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 min-w-[250px] justify-between group shadow-lg backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Triangle className="w-4 h-4 text-purple-400 fill-current" />
                </motion.div>
                <span className="text-white font-medium text-sm">{getFilterSummary()}</span>
              </div>
              <Filter className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </motion.button>
          </div>

          {/* Gender Dropdown */}
          <div className="relative">
            <select
              value={filters.seeking}
              onChange={(e) => setFilters(prev => ({ ...prev, seeking: e.target.value }))}
              className="px-4 py-3 bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl border-2 border-pink-400/20 text-white font-medium text-sm min-w-[140px] appearance-none hover:border-pink-400/40 focus:border-pink-400/60 focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <option value="">מחפש/ת</option>
              {genderOptions.map(option => (
                <option key={option.value} value={option.value} className="bg-slate-800">
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400 pointer-events-none" />
          </div>

          {/* Age Range Display */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-xl border-2 border-emerald-400/20 min-w-[140px] shadow-lg backdrop-blur-sm">
            <span className="text-white font-medium text-sm">
              גילאים: {filters.ageRange[1]} - {filters.ageRange[0]}
            </span>
          </div>

          {/* Location Dropdown */}
          <div className="relative">
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="px-4 py-3 bg-gradient-to-r from-orange-900/30 to-amber-900/30 rounded-xl border-2 border-orange-400/20 text-white font-medium text-sm min-w-[120px] appearance-none hover:border-orange-400/40 focus:border-orange-400/60 focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <option value="">איזור</option>
              {locationOptions.map(option => (
                <option key={option} value={option} className="bg-slate-800">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" />
          </div>

          {/* Search Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="חיפוש"
              className="w-full px-4 py-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border-2 border-slate-400/20 text-white font-medium text-sm hover:border-slate-400/40 focus:border-blue-400/60 focus:outline-none transition-all duration-300 shadow-lg backdrop-blur-sm placeholder-white/50"
            />
          </div>

          {/* Search Button */}
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
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
              className="overflow-hidden border-t border-purple-500/20"
            >
              <div className="p-8 bg-gradient-to-br from-slate-900/40 via-purple-900/20 to-slate-900/40 space-y-8">
                {/* Three Columns Grid */}
                <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {/* Age Range */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <User className="w-4 h-4" />
                      <span>טווח גיל</span>
                    </div>
                    <CustomRangeSlider
                      min={18}
                      max={80}
                      value={filters.ageRange}
                      onChange={(value) => setFilters(prev => ({ ...prev, ageRange: value }))}
                      label=""
                      unit=""
                    />
                  </div>

                  {/* Nickname Search */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <User className="w-4 h-4" />
                      <span>חיפוש לפי כינוי</span>
                    </div>
                    <div className="relative">
                      <motion.input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="הקלד כינוי או שם..."
                        dir="rtl"
                        className="w-full h-10 px-4 rounded-lg bg-white/10 text-white placeholder-white/50 
                                 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300
                                 text-right backdrop-blur-sm border border-white/10 hover:border-white/20"
                        whileFocus={{ scale: 1.01 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        animate={{
                          boxShadow: nickname ? "0 0 8px rgba(168, 85, 247, 0.4)" : "none"
                        }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
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
                      value={filters.heightRange}
                      onChange={(value) => setFilters(prev => ({ ...prev, heightRange: value }))}
                      label=""
                      unit=" ס״מ"
                    />
                  </div>
                </div>

                {/* Gender Selection */}
                <motion.div>
                  <div className="space-y-4 max-w-6xl mx-auto">
                    <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
                      <User className="w-4 h-4" />
                      <span>מגדר</span>
                    </div>

                    {/* Gender Type Tabs */}
                    <div className="flex gap-2 mb-2 justify-center">
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, selectedGenderType: "main" }))}
                        className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                          filters.selectedGenderType === "main"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        בסיסי
                      </button>
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, selectedGenderType: "extra" }))}
                        className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                          filters.selectedGenderType === "extra"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        מורחב
                      </button>
                    </div>

                    {/* Gender Buttons Grid */}
                    {filters.selectedGenderType === "main" ? (
                      <div className="grid grid-cols-4 gap-2">
                        <FilterButton
                          selected={filters.gender === "male"}
                          onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === "male" ? "" : "male" }))}
                        >
                          גבר
                        </FilterButton>
                        <FilterButton
                          selected={filters.gender === "female"}
                          onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === "female" ? "" : "female" }))}
                        >
                          אישה
                        </FilterButton>
                        <FilterButton
                          selected={filters.gender === "both"}
                          onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === "both" ? "" : "both" }))}
                        >
                          גבר ואישה
                        </FilterButton>
                        <FilterButton
                          selected={filters.gender === "other"}
                          onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === "other" ? "" : "other" }))}
                        >
                          אחר
                        </FilterButton>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {extraGenders.map((gender) => (
                          <FilterButton
                            key={gender.value}
                            selected={filters.gender === gender.value}
                            onClick={() => setFilters(prev => ({ ...prev, gender: prev.gender === gender.value ? "" : gender.value }))}
                          >
                            {gender.label}
                          </FilterButton>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Location Section */}
                <div className="space-y-4 max-w-6xl mx-auto">
                  <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>איזור</span>
                  </div>

                  {/* Region Selection */}
                  <div className="grid grid-cols-4 gap-2">
                    {regions.map((region) => (
                      <FilterButton
                        key={region.value}
                        selected={filters.selectedRegion === region.value}
                        onClick={() => setFilters(prev => ({ ...prev, selectedRegion: prev.selectedRegion === region.value ? "" : region.value }))}
                      >
                        {region.label}
                      </FilterButton>
                    ))}
                  </div>

                  {/* City Type Tabs */}
                  <div className="flex justify-center gap-2 mb-2">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, selectedCityType: "popular" }))}
                      className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                        filters.selectedCityType === "popular"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      ערים מרכזיות
                    </button>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, selectedCityType: "all" }))}
                      className={`text-sm px-3 py-1 rounded-lg transition-all duration-300 ${
                        filters.selectedCityType === "all"
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      כל הערים
                    </button>
                  </div>

                  {/* Cities Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {(filters.selectedCityType === "popular" ? popularCities : 
                      filters.selectedRegion ? citiesByRegion[filters.selectedRegion as keyof typeof citiesByRegion] :
                      popularCities).map((city) => (
                      <FilterButton
                        key={city.value}
                        selected={filters.location === city.value}
                        onClick={() => setFilters(prev => ({ ...prev, location: prev.location === city.value ? "" : city.value }))}
                      >
                        {city.label}
                      </FilterButton>
                    ))}
                  </div>
                </div>

                {/* Relationship Type Selection */}
                <div className="space-y-2 max-w-6xl mx-auto">
                  <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
                    <Heart className="w-4 h-4" />
                    <span>מטרת הקשר</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {relationshipTypes.map((type) => (
                      <FilterButton
                        key={type.value}
                        selected={filters.selectedRelationshipType === type.value}
                        onClick={() => setFilters(prev => ({ ...prev, selectedRelationshipType: prev.selectedRelationshipType === type.value ? "" : type.value }))}
                      >
                        {type.label}
                      </FilterButton>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search, Reset & Verified Toggle Section */}
        <div className="flex justify-center gap-4 py-6 px-6 bg-gradient-to-r from-slate-800/30 to-purple-800/20">
          {/* Reset Button */}
          <motion.button
            whileHover={{ 
              scale: 1.02,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
            whileTap={{ scale: 0.98 }}
            className="group w-[160px] h-11 bg-white/5 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg backdrop-blur-sm border border-white/10 hover:border-white/20"
          >
            <motion.div className="group-hover:animate-spin">
              <RotateCcw className="w-5 h-5" />
            </motion.div>
            <span className="text-sm">איפוס</span>
          </motion.button>

          {/* Search Button */}
          <motion.button
            whileHover={{ 
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            className="group w-[160px] h-11 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
          >
            <Search className="w-5 h-5" />
            <span className="text-sm">חיפוש</span>
          </motion.button>

          {/* Verified Toggle */}
          <motion.div 
            className="group w-[180px] h-11 flex items-center justify-between p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20"
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-white/70" />
              <span className="text-white/80 text-sm">מאומתים</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setFilters(prev => ({ ...prev, showVerifiedOnly: !prev.showVerifiedOnly }))}
              className="w-12 h-6 rounded-full relative transition-colors duration-300"
              style={{ backgroundColor: filters.showVerifiedOnly ? '#8B5CF6' : 'rgba(255, 255, 255, 0.1)' }}
            >
              <motion.div
                animate={{ x: filters.showVerifiedOnly ? 24 : 0 }}
                className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HorizontalDatingFilter;
