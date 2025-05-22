
import { motion } from "framer-motion";
import { AccountFormValues, PersonalInfoFormValues } from "../schemas";

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

export function capitalize(str?: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
