
import { motion } from "framer-motion";
import { AccountFormValues, PersonalInfoFormValues } from "../schemas";

// Animation variants for staggered animation
export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export interface SummarySectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
}

export interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

// Adding the missing SignupSummaryProps interface
export interface SignupSummaryProps {
  accountData: AccountFormValues;
  personalData: PersonalInfoFormValues;
  profileData: any;
  lifestyleData: any;
  profileImages: ProfileImage[];
  isLoading: boolean;
  onBack: () => void;
  onComplete: () => void;
}

// Adding the missing capitalize utility function
export const capitalize = (str?: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
