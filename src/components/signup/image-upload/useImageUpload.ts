
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { uploadProfileImage, deleteProfileImage, toggleImagePrivacy, MAX_PROFILE_IMAGES } from '@/services/supabase/storage-service';
import { ProfileImage } from './types';

export const useImageUpload = (
  userId?: string,
  existingImages: ProfileImage[] = [],
  onImagesChange?: (images: ProfileImage[]) => void,
  disabled = false
) => {
  const [images, setImages] = useState<ProfileImage[]>(existingImages);
  const [isLoading, setIsLoading] = useState(false);
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (existingImages.length > 0) {
      setImages(existingImages);
    }
  }, [existingImages]);

  const updateImages = (newImages: ProfileImage[]) => {
    setImages(newImages);
    onImagesChange?.(newImages);
  };

  const processFiles = async (files: File[]) => {
    if (disabled || isLoading) return;
    
    const newFiles = Array.from(files);
    
    if (images.length + newFiles.length > MAX_PROFILE_IMAGES) {
      toast({
        variant: "destructive",
        title: "Too many images",
        description: `You can only upload up to ${MAX_PROFILE_IMAGES} images. Please remove some before adding more.`
      });
      return;
    }
    
    const tempImages = newFiles.map((file, i) => {
      const tempId = `temp-${Date.now()}-${i}`;
      return {
        filePath: tempId,
        publicUrl: URL.createObjectURL(file),
        file,
        isUploading: true,
        isPrivate: false
      } as ProfileImage;
    });
    
    const updatedImages = [...images, ...tempImages];
    updateImages(updatedImages);
    
    if (!userId) {
      setTimeout(() => {
        const completedImages = updatedImages.map(img => ({
          ...img, 
          isUploading: false
        }));
        updateImages(completedImages);
        
        toast({
          title: "Images added",
          description: "Images will be uploaded when you complete signup."
        });
      }, 700);
      return;
    }
    
    for (let i = 0; i < tempImages.length; i++) {
      const tempImage = tempImages[i];
      const imageIndex = updatedImages.findIndex(img => img.filePath === tempImage.filePath);
      
      if (imageIndex !== -1 && tempImage.file) {
        setProcessingIndex(imageIndex);
        
        const updatingImages = [...updatedImages];
        updatingImages[imageIndex] = { ...updatingImages[imageIndex], isUploading: true };
        updateImages(updatingImages);
        
        try {
          setIsLoading(true);
          const result = await uploadProfileImage(userId, tempImage.file, tempImage.isPrivate || false);
          
          if ('error' in result) {
            toast({
              variant: "destructive",
              title: "Upload failed",
              description: result.error
            });
            
            const filteredImages = updatingImages.filter(img => img.filePath !== tempImage.filePath);
            updateImages(filteredImages);
          } else {
            const uploadedImage: ProfileImage = {
              imageId: result.imageId,
              filePath: result.filePath,
              publicUrl: result.publicUrl,
              isPrivate: result.isPrivate,
              isUploading: false
            };
            
            const finalImages = updatingImages.map(img => 
              img.filePath === tempImage.filePath ? uploadedImage : img
            );
            
            updateImages(finalImages);
            
            toast({
              title: "Image uploaded",
              description: "Your image was uploaded successfully."
            });
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          
          const filteredImages = updatedImages.filter(img => img.filePath !== tempImage.filePath);
          updateImages(filteredImages);
          
          toast({
            variant: "destructive",
            title: "Upload Error",
            description: "Failed to upload the image. Please try again."
          });
        } finally {
          setIsLoading(false);
          setProcessingIndex(null);
        }
      }
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = async (index: number) => {
    if (disabled || isLoading || processingIndex !== null) return;
    
    const imageToRemove = images[index];
    setProcessingIndex(index);
    
    if (!userId) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      updateImages(updatedImages);
      setProcessingIndex(null);
      return;
    }
    
    if (imageToRemove.imageId && !imageToRemove.isUploading) {
      setIsLoading(true);
      
      try {
        const result = await deleteProfileImage(
          userId, 
          imageToRemove.filePath, 
          imageToRemove.imageId
        );
        
        if ('error' in result) {
          toast({
            variant: "destructive",
            title: "Delete failed",
            description: result.error
          });
          setProcessingIndex(null);
          setIsLoading(false);
          return;
        }
        
        toast({
          title: "Image removed",
          description: "The image was successfully removed."
        });
      } catch (error) {
        console.error('Error deleting image:', error);
        toast({
          variant: "destructive",
          title: "Delete Error",
          description: "Failed to delete the image."
        });
        setProcessingIndex(null);
        setIsLoading(false);
        return;
      } finally {
        setIsLoading(false);
      }
    }
    
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    updateImages(updatedImages);
    setProcessingIndex(null);
  };

  const handleTogglePrivacy = async (index: number) => {
    if (disabled || isLoading || processingIndex !== null) return;
    
    const imageToToggle = images[index];
    const newPrivacyStatus = !imageToToggle.isPrivate;
    
    setProcessingIndex(index);
    
    const updatedImages = [...images];
    updatedImages[index] = { ...imageToToggle, isPrivate: newPrivacyStatus };
    updateImages(updatedImages);
    
    if (!userId) {
      setProcessingIndex(null);
      return;
    }
    
    if (imageToToggle.imageId && !imageToToggle.isUploading) {
      setIsLoading(true);
      
      try {
        const result = await toggleImagePrivacy(
          userId,
          imageToToggle.imageId,
          newPrivacyStatus
        );
        
        if ('error' in result) {
          updatedImages[index] = { ...imageToToggle };
          updateImages(updatedImages);
          
          toast({
            variant: "destructive",
            title: "Update failed",
            description: result.error
          });
        } else {
          toast({
            title: newPrivacyStatus ? "Image Private" : "Image Public",
            description: newPrivacyStatus ? 
              "Image is now private and won't be visible to others" : 
              "Image is now public and visible to others"
          });
        }
      } catch (error) {
        console.error('Error toggling image privacy:', error);
        
        updatedImages[index] = { ...imageToToggle };
        updateImages(updatedImages);
        
        toast({
          variant: "destructive",
          title: "Update Error",
          description: "Failed to update image privacy."
        });
      } finally {
        setIsLoading(false);
        setProcessingIndex(null);
      }
    } else {
      setProcessingIndex(null);
    }
  };

  return {
    images,
    isLoading,
    processingIndex,
    isDragging,
    setIsDragging,
    fileInputRef,
    dropZoneRef,
    processFiles,
    handleRemoveImage,
    handleTogglePrivacy
  };
};
