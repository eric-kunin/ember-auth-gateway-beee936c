
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 pl-4">
        <div className="space-y-4">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Ruler className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Height:</span> {lifestyleData.height ? `${lifestyleData.height} cm` : 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Church className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Religion:</span> {capitalize(lifestyleData.religion) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Cigarette className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Smoking:</span> {capitalize(lifestyleData.smokingStatus) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <MessageCircle className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Looking for:</span> {capitalize(lifestyleData.lookingFor)} {lifestyleData.lookingForGender ? `(${lifestyleData.lookingForGender})` : ''}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Eye className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Eye color:</span> {capitalize(lifestyleData.eyeColor) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Church className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Religious level:</span> {capitalize(lifestyleData.religiousLevel) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Wine className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Drinking:</span> {capitalize(lifestyleData.drinkingStatus) || 'Not provided'}
          </p>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter flex items-center">
            <Users className="h-3.5 w-3.5 text-[#9D4EDD] mr-3 flex-shrink-0" />
            <span className="text-[#9D4EDD] font-medium mr-1.5">Interested in:</span> {lifestyleData.lookingForGender || 'Not provided'}
          </p>
        </div>
      </div>

      {lifestyleData.hobbies && lifestyleData.hobbies.length > 0 && (
        <div className="mb-5 pl-6">
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter mb-2">
            <span className="text-[#9D4EDD] font-medium">Hobbies:</span>
          </p>
          <div className="flex flex-wrap gap-2 ml-3">
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

      <div className="space-y-3 pl-6 mb-2">
        {lifestyleData.pets && (
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Pets:</span> {capitalize(lifestyleData.pets) || 'Not provided'}
          </p>
        )}
        
        {lifestyleData.exercise && (
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Exercise:</span> {capitalize(lifestyleData.exercise) || 'Not provided'}
          </p>
        )}
        
        {lifestyleData.diet && (
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            <span className="text-[#9D4EDD] font-medium mr-1.5">Diet:</span> {capitalize(lifestyleData.diet) || 'Not provided'}
          </p>
        )}
      </div>
    </SummarySection>
  );
};

export default LifestyleSection;
