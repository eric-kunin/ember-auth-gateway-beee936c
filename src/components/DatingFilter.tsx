
import React, { useState } from "react";
import { motion } from 'framer-motion';
import { 
  MapPin, Heart, Music, Book, Camera, BadgeCheck,
  User, Filter, Search, RotateCcw, Star
} from "lucide-react";

const CustomRangeSlider = ({ min, max, value, onChange, label, unit }) => {
    const getBackgroundSize = (value) => {
      return ((value - min) * 100) / (max - min);
    };
  
    return (
      <div className="space-y-2 w-full">
        <div className="flex justify-between text-sm text-white/70">
          <span>{label}</span>
          <span>{value[0]}{unit} - {value[1]}{unit}</span>
        </div>
        <div className="relative h-2 bg-white/10 rounded-full">
          <div 
            className="absolute h-full bg-[#A367B1] rounded-full transition-all duration-50"
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
            className="absolute top-0 right-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
            dir="rtl"
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={(e) => onChange([value[0], Math.max(parseInt(e.target.value), value[0] + 1)])}
            className="absolute top-0 right-0 w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
            dir="rtl"
          />
        </div>
      </div>
    );
  };
  
  

const FilterButton = ({ selected, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
      selected ? 'bg-[#A367B1] text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
    }`}
  >
    {children}
  </motion.button>
);

const DatingFilter = () => {
    const [ageRange, setAgeRange] = useState<[number, number]>([18, 35]);
    const [heightRange, setHeightRange] = useState<[number, number]>([150, 190]);
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedRelationshipType, setSelectedRelationshipType] = useState<string>("");
    const [selectedEducation, setSelectedEducation] = useState<string>("");
    const [showVerifiedOnly, setShowVerifiedOnly] = useState<boolean>(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [eyeColor, setEyeColor] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [selectedCityType, setSelectedCityType] = useState<string>("all");
    const [nickname, setNickname] = useState<string>("");
  
    // 🔹 Add the missing state variables
    const [selectedGenderType, setSelectedGenderType] = useState<string>("main");
    const [selectedGender, setSelectedGender] = useState<string>("");
// Add to your data arrays
const mainGenders = [
    { label: "גבר", value: "male" },
    { label: "אישה", value: "female" }
  ];
  
  const extraGenders = [
    { label: "גבר טרנס", value: "trans-male" },
    { label: "אישה טרנס", value: "trans-female" },
    { label: "נון-בינארי", value: "non-binary" },
    { label: "ג׳נדרקוויר", value: "genderqueer" }
  ];

  const relationshipTypes = [
    { label: "קשר רציני", value: "serious" },
    { label: "חברות", value: "friendship" },
    { label: "דייטים", value: "dating" },
    { label: "נישואין", value: "marriage" }, // Marriage
    { label: "דיסקרטי", value: "discreet" }, // Discreet
  ];
  

  const educationLevels = [
    { label: "תיכונית", value: "highschool" },
    { label: "תואר ראשון", value: "bachelors" },
    { label: "תואר שני", value: "masters" },
    { label: "דוקטורט", value: "phd" }
  ];

  const cities = [
    { label: "תל אביב", value: "tel-aviv" },
    { label: "ירושלים", value: "jerusalem" },
    { label: "חיפה", value: "haifa" },
    { label: "באר שבע", value: "beer-sheva" }
  ];

  const interests = [
    { icon: Music, label: "מוזיקה" },
    { icon: Book, label: "ספרים" },
    { icon: Camera, label: "צילום" },
    { icon: Star, label: "בילויים" }
  ];

  const regions = [
    { label: "צפון", value: "north" },
    { label: "מרכז", value: "center" },
    { label: "דרום", value: "south" },
    { label: "יהודה ושומרון", value: "judea" }
  ];
  
  const citiesByRegion = {
    north: [
      { label: "חיפה", value: "haifa" },
      { label: "עכו", value: "acre" },
      { label: "נהריה", value: "nahariya" },
      { label: "כרמיאל", value: "karmiel" },
      { label: "קריית שמונה", value: "kiryat-shmona" },
      { label: "טבריה", value: "tiberias" }
    ],
    center: [
      { label: "תל אביב", value: "tel-aviv" },
      { label: "רמת גן", value: "ramat-gan" },
      { label: "פתח תקווה", value: "petah-tikva" },
      { label: "הרצליה", value: "herzliya" },
      { label: "נתניה", value: "netanya" },
      { label: "ראשון לציון", value: "rishon-lezion" },
      { label: "חולון", value: "holon" },
      { label: "רעננה", value: "raanana" }
    ],
    south: [
      { label: "באר שבע", value: "beer-sheva" },
      { label: "אשדוד", value: "ashdod" },
      { label: "אילת", value: "eilat" },
      { label: "אשקלון", value: "ashkelon" },
      { label: "דימונה", value: "dimona" }
    ],
    judea: [
      { label: "ירושלים", value: "jerusalem" },
      { label: "מעלה אדומים", value: "maale-adumim" },
      { label: "ביתר עילית", value: "beitar-illit" },
      { label: "אריאל", value: "ariel" }
    ]
  };
  
  const popularCities = [
    { label: "תל אביב", value: "tel-aviv" },
    { label: "ירושלים", value: "jerusalem" },
    { label: "חיפה", value: "haifa" },
    { label: "באר שבע", value: "beer-sheva" },
    { label: "נתניה", value: "netanya" },
    { label: "פתח תקווה", value: "petah-tikva" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br to-[#0B0205] via-[#2C1B47] from-[#0B0205] rounded-xl shadow-lg overflow-hidden"
      dir="rtl"
    >
            {/* Header */}
<div className="container mx-auto px-4">
    <div className="p-3 border-b border-white/10">
    <div className="flex items-center justify-center gap-2">
        <Filter className="w-5 h-5 text-[#FFD1E3]" />
        <h2 className="text-white text-lg font-semibold">חיפוש דייטים</h2>
    </div>
    </div>
</div>

      {/* Scrollable Content */}
      <div className="relative">
        <div className="h-[140px]  overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-6 pb-6">
{/* Grid Layout for Three Columns */}
<div className="grid grid-cols-3 gap-4 items-start max-w-4xl mx-auto">

  {/* Age Range */}
  <div className="space-y-2 max-w-sm w-full">
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
                 focus:ring-2 focus:ring-[#A367B1] focus:outline-none transition-all duration-300
                 text-right"
        whileFocus={{ scale: 1.01 }}
      />
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{
          boxShadow: nickname ? "0 0 8px rgba(163, 103, 177, 0.5)" : "none"
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  </div>
  
  {/* Height Range */}
  <div className="space-y-2 max-w-sm w-full">
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
</div>

{/* Gender Selection */}
<motion.div>
  <div className="space-y-4 max-w-4xl mx-auto">
    {/* Centered Header */}
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

    {/* Gender Buttons Grid */}
    {selectedGenderType === "main" ? (
      <div className="grid grid-cols-4 gap-2">
        <motion.button
          key="male"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedGender(selectedGender === "male" ? "" : "male")}
          className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
            selectedGender === "male"
              ? "bg-[#A367B1] text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          גבר
        </motion.button>
        <motion.button
          key="female"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedGender(selectedGender === "female" ? "" : "female")}
          className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
            selectedGender === "female"
              ? "bg-[#A367B1] text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          אישה
        </motion.button>
        <motion.button
          key="both"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedGender(selectedGender === "both" ? "" : "both")}
          className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
            selectedGender === "both"
              ? "bg-[#A367B1] text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          גבר ואישה
        </motion.button>
        <motion.button
          key="other"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedGender(selectedGender === "other" ? "" : "other")}
          className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
            selectedGender === "other"
              ? "bg-[#A367B1] text-white"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          אחר
        </motion.button>
      </div>
    ) : (
      <div className="grid grid-cols-4 gap-2">
        {extraGenders.map((gender) => (
          <motion.button
            key={gender.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedGender(gender.value === selectedGender ? "" : gender.value)}
            className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
              selectedGender === gender.value
                ? "bg-[#A367B1] text-white"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {gender.label}
          </motion.button>
        ))}
      </div>
    )}
  </div>
</motion.div>



          {/* Location Section */}
<div className="space-y-4 max-w-4xl mx-auto">
  <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
    <MapPin className="w-4 h-4" />
    <span>איזור</span>
  </div>

  {/* Region Selection */}
  <div className="grid grid-cols-4 gap-2">
    {regions.map((region) => (
      <motion.button
        key={region.value}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedRegion(region.value === selectedRegion ? "" : region.value)}
        className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
          selectedRegion === region.value
            ? "bg-[#A367B1] text-white"
            : "bg-white/10 text-white/70 hover:bg-white/20"
        }`}
      >
        {region.label}
      </motion.button>
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
      selectedRegion ? citiesByRegion[selectedRegion] :
      popularCities).map((city) => (
      <motion.button
        key={city.value}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedCity(city.value === selectedCity ? "" : city.value)}
        className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
          selectedCity === city.value
            ? "bg-[#A367B1] text-white"
            : "bg-white/10 text-white/70 hover:bg-white/20"
        }`}
      >
        {city.label}
      </motion.button>
    ))}
  </div>
</div>


          {/* Relationship Type Selection */}
<div className="space-y-2 max-w-4xl mx-auto">
  <div className="flex justify-center items-center gap-2 text-white/80 text-sm">
    <Heart className="w-4 h-4" />
    <span>מטרת הקשר</span>
  </div>

  {/* Relationship Type Buttons Grid */}
  <div className="grid grid-cols-4 gap-2">
    <motion.button
      key="serious"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedRelationshipType(selectedRelationshipType === "serious" ? "" : "serious")}
      className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
        selectedRelationshipType === "serious"
          ? "bg-[#A367B1] text-white"
          : "bg-white/10 text-white/70 hover:bg-white/20"
      }`}
    >
      קשר רציני
    </motion.button>

    <motion.button
      key="friendship"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedRelationshipType(selectedRelationshipType === "friendship" ? "" : "friendship")}
      className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
        selectedRelationshipType === "friendship"
          ? "bg-[#A367B1] text-white"
          : "bg-white/10 text-white/70 hover:bg-white/20"
      }`}
    >
      חברות
    </motion.button>

    <motion.button
      key="dating"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedRelationshipType(selectedRelationshipType === "dating" ? "" : "dating")}
      className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
        selectedRelationshipType === "dating"
          ? "bg-[#A367B1] text-white"
          : "bg-white/10 text-white/70 hover:bg-white/20"
      }`}
    >
      דייטים
    </motion.button>

    <motion.button
      key="discreet"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedRelationshipType(selectedRelationshipType === "discreet" ? "" : "discreet")}
      className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
        selectedRelationshipType === "discreet"
          ? "bg-[#A367B1] text-white"
          : "bg-white/10 text-white/70 hover:bg-white/20"
      }`}
    >
      דיסקרטי
    </motion.button>
  </div>
</div>

        </div>
      </div>
      </div>

{/* Search, Reset & Verified Toggle Section */}
<div className="flex justify-center gap-4 py-4 w-full max-w-lg mx-auto">
  
  {/* Search & Reset Buttons */}
  <div className="flex justify-center gap-4">
    
    {/* Reset Button */}
    <motion.button
      whileHover={{ 
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group w-[180px] h-11 bg-white/10 text-white rounded-xl font-semibold transition-all duration-100 flex items-center justify-center gap-2 shadow-lg"
    >
      <motion.div className="group-hover:animate-[spin_0.8s_infinite]">
        <RotateCcw className="w-6 h-6" />
      </motion.div>
      <span className="text-sm">איפוס</span>
    </motion.button>

    {/* Search Button */}
    <motion.button
      whileHover={{ 
        scale: 1.02,
        backgroundColor: '#FFE4EE',
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group w-[180px] h-11 bg-[#FFD1E3] text-[#392467] rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
    >
      <motion.div className="group-hover:animate-[wiggle_0.5s_infinite]">
        <Search className="w-6 h-6" />
      </motion.div>
      <span className="text-sm">חיפוש</span>
    </motion.button>

    {/* Verified Toggle - Right Side */}
    <motion.div 
      className="group w-[180px] h-11 flex items-center justify-between p-3 bg-white/5 rounded-lg w-[200px]"
      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      
      <div className="flex items-center gap-2">
        <BadgeCheck className="w-5 h-5 text-white/70" />
        <span className="text-white/80">מאומתים</span>
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
    </motion.div>

  </div>

</div>


{/* Add this to your existing styles */}
<style jsx global>{`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    40% { transform: rotate(-180deg); }
    100% { transform: rotate(-360deg); }
  }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-15deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(15deg); }
  }
`}</style>

{/* Add this at the bottom of your component where your styles are */}
<style jsx global>{`
  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-15deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(15deg); }
  }
`}</style>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(163, 103, 177, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(163, 103, 177, 0.7);
        }
      `}</style>
    </motion.div>
  );
};

export default DatingFilter;
