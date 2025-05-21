
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CheckCircle, User, Mail, Calendar, Phone, Users, Info, Award, Heart, Camera } from "lucide-react";
import { AccountFormValues, PersonalInfoFormValues } from "./schemas";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

interface SignupSummaryProps {
  accountData: AccountFormValues;
  personalData: PersonalInfoFormValues;
  profileData: any;
  lifestyleData: any;
  profileImages: ProfileImage[];
  isLoading: boolean;
  onBack: () => void;
  onComplete: () => void;
}

const SignupSummary = ({
  accountData,
  personalData,
  profileData,
  lifestyleData,
  profileImages,
  isLoading,
  onBack,
  onComplete,
}: SignupSummaryProps) => {
  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-3">
          <CheckCircle className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium text-[#240046] dark:text-white">
          Profile Summary
        </h3>
        <p className="text-sm text-[#3B185F]/70 dark:text-custom-lighter/70 mt-1">
          Review your information before completing the registration
        </p>
      </div>

      {/* Photo gallery preview */}
      {profileImages.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white">
            <Camera className="h-4 w-4 mr-1 text-[#9D4EDD]" />
            Profile Photos
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {profileImages.slice(0, 6).map((image, index) => (
              <div 
                key={image.filePath || index} 
                className="aspect-square rounded-md overflow-hidden relative"
              >
                <img 
                  src={image.publicUrl} 
                  alt={`Profile ${index + 1}`}
                  className="object-cover w-full h-full"
                />
                {image.isPrivate && (
                  <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1 py-0.5 rounded">
                    Private
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <motion.div
        className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Account Information */}
        <motion.div className="p-4 bg-white/50 dark:bg-[#20003b]/50" variants={item}>
          <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white mb-3">
            <Mail className="h-4 w-4 mr-1 text-[#9D4EDD]" />
            Account Information
          </h4>
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            Email: {accountData.email}
          </p>
        </motion.div>

        {/* Personal Information */}
        <motion.div className="p-4 bg-white/30 dark:bg-[#20003b]/30" variants={item}>
          <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white mb-3">
            <User className="h-4 w-4 mr-1 text-[#9D4EDD]" />
            Personal Information
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Name:</span> {personalData.name}
              </p>
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Gender:</span> {personalData.gender}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Birthdate:</span> {personalData.birthdate ? format(personalData.birthdate, 'PPP') : 'Not provided'}
              </p>
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Phone:</span> {personalData.phone || 'Not provided'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div className="p-4 bg-white/50 dark:bg-[#20003b]/50" variants={item}>
          <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white mb-3">
            <Info className="h-4 w-4 mr-1 text-[#9D4EDD]" />
            Profile Details
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Height:</span> {profileData.height || 'Not provided'}
              </p>
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Religion:</span> {capitalize(profileData.religion) || 'Not provided'}
              </p>
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Smoking:</span> {capitalize(profileData.smokingStatus) || 'Not provided'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Eye color:</span> {capitalize(profileData.eyeColor) || 'Not provided'}
              </p>
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Religious level:</span> {capitalize(profileData.religiousLevel) || 'Not provided'}
              </p>
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Drinking:</span> {capitalize(profileData.drinkingStatus) || 'Not provided'}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
              <span className="text-[#9D4EDD] font-medium">Looking for:</span> {capitalize(profileData.lookingFor)} {profileData.lookingForGender ? `(${profileData.lookingForGender})` : ''}
            </p>
          </div>
          {profileData.bio && (
            <div className="mt-2">
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Bio:</span> {profileData.bio}
              </p>
            </div>
          )}
          {profileData.profession && (
            <div className="mt-2">
              <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
                <span className="text-[#9D4EDD] font-medium">Profession:</span> {profileData.profession}
              </p>
            </div>
          )}
        </motion.div>

        {/* Lifestyle Info */}
        <motion.div className="p-4 bg-white/30 dark:bg-[#20003b]/30" variants={item}>
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
        </motion.div>
      </motion.div>

      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
          title="Go back to previous step"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={onComplete}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 h-11 sm:h-12 
                   transition-all duration-300"
          disabled={isLoading}
          title="Complete registration"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
              <span>Creating Account...</span>
            </div>
          ) : (
            "Complete Signup"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SignupSummary;
