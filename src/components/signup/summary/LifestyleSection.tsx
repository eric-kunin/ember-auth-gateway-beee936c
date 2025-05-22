
import { Heart, Ruler, Eye, Church, Cigarette, Wine, Users, MessageCircle } from "lucide-react";
import { capitalize } from "./types";
import { SummarySection } from "./SummarySection";

interface LifestyleSectionProps {
  lifestyleData: any;
}

const LifestyleSection = ({ lifestyleData }: LifestyleSectionProps) => {
  return (
    <SummarySection 
      title="Lifestyle & Preferences"
      icon={<Heart className="h-4 w-4" />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <div className="space-y-1">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Ruler className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Height:</span> {lifestyleData.height ? `${lifestyleData.height} cm` : 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Church className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Religion:</span> {capitalize(lifestyleData.religion) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Cigarette className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Smoking:</span> {capitalize(lifestyleData.smokingStatus) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <MessageCircle className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Looking for:</span> {capitalize(lifestyleData.lookingFor)} {lifestyleData.lookingForGender ? `(${lifestyleData.lookingForGender})` : ''}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Eye className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Eye color:</span> {capitalize(lifestyleData.eyeColor) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Church className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Religious level:</span> {capitalize(lifestyleData.religiousLevel) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Wine className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Drinking:</span> {capitalize(lifestyleData.drinkingStatus) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Users className="h-3 w-3 text-[#9D4EDD] mr-1" />
            <span className="text-[#9D4EDD] font-medium">Interested in:</span> {lifestyleData.lookingForGender || 'Not provided'}
          </p>
        </div>
      </div>

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

      {lifestyleData.pets && (
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
          <span className="text-[#9D4EDD] font-medium">Pets:</span> {capitalize(lifestyleData.pets) || 'Not provided'}
        </p>
      )}
      
      {lifestyleData.exercise && (
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
          <span className="text-[#9D4EDD] font-medium">Exercise:</span> {capitalize(lifestyleData.exercise) || 'Not provided'}
        </p>
      )}
      
      {lifestyleData.diet && (
        <p className="text-sm text-[#3B185F] dark:text-custom-lighter mt-1">
          <span className="text-[#9D4EDD] font-medium">Diet:</span> {capitalize(lifestyleData.diet) || 'Not provided'}
        </p>
      )}
    </SummarySection>
  );
};

export default LifestyleSection;
