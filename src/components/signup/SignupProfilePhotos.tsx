
import { Button } from "@/components/ui/button";
import { ProfileImageUpload } from "./ProfileImageUpload";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Camera, CheckCircle } from "lucide-react";

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

interface SignupProfilePhotosProps {
  isLoading: boolean;
  onSubmit: (images: ProfileImage[]) => void;
  onBack: () => void;
  initialImages?: ProfileImage[];
}

const SignupProfilePhotos = ({
  isLoading,
  onSubmit,
  onBack,
  initialImages = [],
}: SignupProfilePhotosProps) => {
  const [profileImages, setProfileImages] = useState<ProfileImage[]>(initialImages);
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    if (initialImages?.length > 0) {
      setProfileImages(initialImages);
      setIsReady(true);
    }
  }, [initialImages]);

  const handleProfileImageChange = (images: ProfileImage[]) => {
    setProfileImages(images);
    setIsReady(images.length > 0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(profileImages);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#9D4EDD]/10 text-[#9D4EDD] mb-3">
          <Camera className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium text-[#240046] dark:text-white">
          Upload Profile Photos
        </h3>
        <p className="text-sm text-[#3B185F]/70 dark:text-custom-lighter/70 mt-1">
          Add photos to complete your profile. You can add up to 6 photos.
        </p>
      </div>

      <div className="space-y-6">
        <ProfileImageUpload 
          onImagesChange={handleProfileImageChange}
          existingImages={initialImages}
          disabled={isLoading}
        />
      </div>

      {isReady && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
            <CheckCircle className="mr-1 h-4 w-4" />
            <span>{profileImages.length} photo{profileImages.length !== 1 ? 's' : ''} ready to upload</span>
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30"
          title="Go back to previous step"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                   signin-button-hover transition-all duration-300"
          disabled={isLoading}
          title="Continue to final step"
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default SignupProfilePhotos;
