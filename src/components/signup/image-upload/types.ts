
export interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

export interface ProfileImageUploadProps {
  userId?: string;
  onImagesChange: (images: ProfileImage[]) => void;
  existingImages?: ProfileImage[];
  disabled?: boolean;
}
