
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Camera } from "lucide-react";
import { ProfileImage } from "./image-upload/types";
import { useImageUpload } from "./image-upload/useImageUpload";
import { motion } from "framer-motion";
import AddImageCard from "./image-upload/AddImageCard";
import ImageCard from "./image-upload/ImageCard";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [selectedImages, setSelectedImages] = useState<ProfileImage[]>(initialImages);
  const { uploadImage, isUploading } = useImageUpload();

  // Update local state when initialImages changes
  useEffect(() => {
    setSelectedImages(initialImages);
  }, [initialImages]);

  const handleImageSelect = async (files: FileList) => {
    if (!files.length) return;

    const remainingSlots = 6 - selectedImages.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    for (const file of filesToProcess) {
      try {
        const uploadedImage = await uploadImage(file);
        setSelectedImages(prev => [...prev, uploadedImage]);
      } catch (error) {
        console.error("Failed to upload image:", error);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleTogglePrivacy = (index: number) => {
    setSelectedImages(prev =>
      prev.map((img, i) =>
        i === index ? { ...img, isPrivate: !img.isPrivate } : img
      )
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedImages);
  };

  const canAddMore = selectedImages.length < 6;

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#9D4EDD]/10 dark:bg-[#9D4EDD]/20 text-[#9D4EDD] mb-3">
          <Camera className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-medium text-[#240046] dark:text-white transition-colors duration-300">
          {t("photos.title")}
        </h3>
        <p className="text-sm text-[#3B185F]/70 dark:text-custom-lighter/70 mt-1 transition-colors duration-300">
          {t("photos.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {selectedImages.map((image, index) => (
          <ImageCard
            key={image.filePath || index}
            image={image}
            index={index}
            onRemove={handleRemoveImage}
            onTogglePrivacy={handleTogglePrivacy}
          />
        ))}

        {canAddMore && (
          <AddImageCard
            onImageSelect={handleImageSelect}
            isUploading={isUploading}
            photosCount={selectedImages.length}
          />
        )}
      </div>

      {selectedImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 rounded-lg bg-[#f8f2ff]/50 dark:bg-[#240046]/50 border border-[#E0AAFF]/30 dark:border-[#9D4EDD]/20"
        >
          <p className="text-sm text-[#3B185F] dark:text-custom-lighter">
            {selectedImages.length === 1
              ? `1 ${t("photos.ready")}`
              : `${selectedImages.length} ${t("photos.readyPlural")}`}
          </p>
        </motion.div>
      )}

      <div className="text-xs text-[#3B185F]/70 dark:text-custom-lighter/70 text-center transition-colors duration-300">
        {t("photos.privatePhotosNote")}
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 dark:bg-[#10002B] dark:hover:bg-[#240046] dark:text-white border-[#E0AAFF]/30 group"
          title="Go back to previous step"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("back")}</span>
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-[#9D4EDD] hover:bg-[#7B2CBF] text-white border-0 h-11 sm:h-12 
                   signin-button-hover transition-all duration-300 group"
          disabled={isLoading || isUploading}
          title="Continue to next step"
        >
          <span>{t("next")}</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default SignupProfilePhotos;
