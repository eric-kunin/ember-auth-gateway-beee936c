
import React from 'react';
import { motion } from 'framer-motion';

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
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = parseInt(e.target.value);
    if (newMin <= value[1]) {
      onChange([newMin, value[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value);
    if (newMax >= value[0]) {
      onChange([value[0], newMax]);
    }
  };

  const minPercent = ((value[0] - min) / (max - min)) * 100;
  const maxPercent = ((value[1] - min) / (max - min)) * 100;

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-white/60">{value[0]}{unit}</span>
          <span className="text-xs text-white/60">{value[1]}{unit}</span>
        </div>
        
        <div className="relative h-2 bg-white/20 rounded-full">
          <div 
            className="absolute h-2 bg-gradient-to-r from-[#9D4EDD] to-[#C77DFF] rounded-full"
            style={{
              left: `${minPercent}%`,
              right: `${100 - maxPercent}%`
            }}
          />
          
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={handleMinChange}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
          />
          
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={handleMaxChange}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider"
          />
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #C77DFF;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #C77DFF;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default CustomRangeSlider;
