
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { item, capitalize } from "./types";
import SummarySection from "./SummarySection";

interface LifestyleSectionProps {
  lifestyleData: any;
}

const LifestyleSection = ({ lifestyleData }: LifestyleSectionProps) => {
  return (
    <SummarySection className="bg-white/30 dark:bg-[#20003b]/30" variants={item}>
      <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white mb-3">
        <Heart className="h-4 w-4 mr-1 text-[#9D4EDD]" />
        Lifestyle Information
      </h4>
      {lifestyleData.hobbies && lifestyleData.hobbies.length > 0 && (
        <div className="mb-2">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter mb-1">
            <span className="text-[#9D4EDD] font-medium">Hobbies:</span>
          </p>
          <div className="flex flex-wrap gap-1">
            {lifestyleData.hobbies.map((hobby: string) => (
              <span 
                key={hobby} 
                className="inline-flex text-xs bg-[#f8f2ff] dark:bg-[#3B185F] text-[#240046] dark:text-white px-2 py-1 rounded-full"
              >
                {hobby}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
          <span className="text-[#9D4EDD] font-medium">Pets:</span> {capitalize(lifestyleData.pets) || 'Not provided'}
        </p>
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
          <span className="text-[#9D4EDD] font-medium">Exercise:</span> {capitalize(lifestyleData.exercise) || 'Not provided'}
        </p>
      </div>
      <p className="text-sm text-[#3B185F] dark:text-custom-lighter mt-1">
        <span className="text-[#9D4EDD] font-medium">Diet:</span> {capitalize(lifestyleData.diet) || 'Not provided'}
      </p>
    </SummarySection>
  );
};

export default LifestyleSection;
