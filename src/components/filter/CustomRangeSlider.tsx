
import React from 'react';

interface CustomRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
  unit: string;
}

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({ 
  min, 
  max, 
  value, 
  onChange, 
  label, 
  unit 
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

export default CustomRangeSlider;
