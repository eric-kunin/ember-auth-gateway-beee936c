
import { AccountFormValues, PersonalInfoFormValues } from "../schemas";

export interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

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

export interface SummarySectionProps {
  children: React.ReactNode;
  className?: string;
  variants?: any;
}

// Helper function to capitalize first letter
export const capitalize = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Animation variants for list items
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
