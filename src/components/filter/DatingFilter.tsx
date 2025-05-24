
import React, { useState } from 'react';
import { ChevronDown, Search, Filter, Triangle, User, MapPin, Heart, BadgeCheck, RotateCcw,
  ChevronUp,
  Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RangeSlider = ({ min, max, value, onChange, label }) => (
  <div className="space-y-2 w-full">
    <div className="flex justify-between items-center text-sm text-white/70">
      <span>{label}</span>
      <span className="text-[#FFD1E3]">{value[0]} - {value[1]}</span>
    </div>
    <div className="relative h-2 bg-white/10 rounded-full">
      <div 
        className="absolute h-full bg-[#A367B1] rounded-full"
        style={{
          left: `${((value[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((value[1] - min) / (max - min)) * 100}%`
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[0]}
        onChange={e => onChange([Math.min(parseInt(e.target.value), value[1] - 1), value[1]])}
        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
        style={{ direction: 'rtl' }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value[1]}
        onChange={e => onChange([value[0], Math.max(parseInt(e.target.value), value[0] + 1)])}
        className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none"
        style={{ direction: 'rtl' }}
      />
    </div>
  </div>
);

const FilterSection = ({ label, icon: Icon, children, isOpen, onToggle }) => (
  <div className="border-b border-white/10 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between text-white hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#FFD1E3]" />
        <span className="font-medium">{label}</span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronDown className="w-5 h-5 text-white/70" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden bg-white/5"
        >
          <div className="p-6 space-y-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FilterButton = ({ selected, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2.5 rounded-xl text-sm transition-all duration-300 ${
      selected 
        ? 'bg-[#A367B1] text-white shadow-lg' 
        : 'bg-white/10 text-white/70 hover:bg-white/20'
    }`}
  >
    {children}
  </motion.button>
);


const DatingFilter: React.FC = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [nickname, setNickname] = useState('');
  const [openSections, setOpenSections] = useState({
    basic: false,
    advanced: false
  });

  const [ageRange, setAgeRange] = useState([25, 35]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showVerified, setShowVerified] = useState(false);

  const genders = [
    { label: 'גבר', value: 'male' },
    { label: 'אישה', value: 'female' },
    { label: 'שניהם', value: 'both' },
    { label: 'אחר', value: 'another' },
  ];

  const regions = [
    'תל אביב',
    'ירושלים',
    'חיפה',
    'באר שבע',
    'רמת גן',
    'הרצליה'
  ];

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <>
    {/* This is the start of div of DatingFilter */} 
    <div className="w-full max-w-6xl mx-auto px-4 py-6" dir="rtl"> 
      {/* Main Header of Search filter */}
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
      
      {/* Filters Go Here */}
    {/* Insert full filter JSX from the old version here (FilterSection, inputs, buttons) */}

        <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-[#0B0205] via-[#2C1B47] to-[#0B0205] rounded-2xl shadow-xl overflow-hidden" dir="rtl">
        
        {/* Header with Filter Icon */}
        <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#FFD1E3]" />
            <h2 className="text-white font-medium">סינון</h2>
            </div>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white/70 hover:text-white transition-colors"
            >
            {isOpen ? (
                <ChevronUp className="w-6 h-6" />
            ) : (
                <ChevronDown className="w-6 h-6" />
            )}
            </button>
        </div>
        
        {/* Filter Summary - only show when collapsed */}
        {!isOpen && (
            <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-2 text-sm text-white/70"
            >
            {selectedGender && `מחפש/ת: ${genders.find(g => g.value === selectedGender)?.label}`}
            {ageRange[0] !== 18 || ageRange[1] !== 80 ? ` | גיל: ${ageRange[0]}-${ageRange[1]}` : ''}
            {selectedRegion ? ` | איזור: ${selectedRegion}` : ''}
            </motion.div>
        )}
        </div>

      {/* Basic Search Bar */}
      <div className="p-6 space-y-4">

        {/* Nickname Search */}
        <div className="flex items-center gap-2 text-white">
          <span className="text-white/70">חיפוש לפי כינוי:</span>
          <div className="flex-1 max-w-xs">
            <motion.div className="relative" whileHover={{ scale: 1.01 }}>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="הקלד כינוי..."
                className="w-full px-4 py-2 bg-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#A367B1] transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            </motion.div>
          </div>
        </div>


        {/* Looking for */}
        <div className="flex items-center gap-2 text-white">
          <span className="text-white/70">מחפש/ת:</span>
          <div className="flex gap-2">
            {genders.map(gender => (
              <FilterButton
                key={gender.value}
                selected={selectedGender === gender.value}
                onClick={() => setSelectedGender(gender.value === selectedGender ? '' : gender.value)}
              >
                {gender.label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Area */}
        <div className="flex items-center gap-2 text-white">
          <span className="text-white/70">איזור:</span>
          <div className="flex flex-wrap gap-2">
            {regions.map(region => (
              <FilterButton
                key={region}
                selected={selectedRegion === region}
                onClick={() => setSelectedRegion(region === selectedRegion ? '' : region)}
              >
                {region}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="divide-y divide-white/10">
        {/* Basic Filters */}
        <FilterSection
          label="חיפוש בסיסי"
          icon={User}
          isOpen={openSections.basic}
          onToggle={() => toggleSection('basic')}
        >
          <div className="space-y-6">
            <RangeSlider
              min={18}
              max={80}
              value={ageRange}
              onChange={setAgeRange}
              label="טווח גילאים"
            />
          </div>
        </FilterSection>

        {/* Advanced Filters */}
        <FilterSection
          label="חיפוש מתקדם"
          icon={Star}
          isOpen={openSections.advanced}
          onToggle={() => toggleSection('advanced')}
        >
          <div className="space-y-4">
            {/* Verified Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-white/70">מאומתים בלבד</span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowVerified(!showVerified)}
                className="flex items-center gap-2"
              >
                <div className={`w-10 h-6 rounded-full transition-colors duration-300 ${
                  showVerified ? 'bg-[#A367B1]' : 'bg-white/10'
                }`}>
                  <motion.div
                    animate={{ x: showVerified ? 16 : 0 }}
                    className="w-6 h-6 rounded-full bg-white shadow-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </FilterSection>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-[#0B0205]/50">
        <div className="flex justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>איפוס</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 rounded-xl bg-[#FFD1E3] text-[#392467] font-medium hover:bg-[#FFE4EE] transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>חיפוש</span>
          </motion.button>
        </div>
      </div>
    </div>

    {/* This is the end of div of DatingFilter*/} 
    </div> 
    </>
  );
};

export default DatingFilter;
