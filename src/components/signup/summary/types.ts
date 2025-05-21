
import { motion } from "framer-motion";

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
