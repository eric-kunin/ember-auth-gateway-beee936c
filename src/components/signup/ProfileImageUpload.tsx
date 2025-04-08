
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, ImagePlus, Loader2, Lock, Unlock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { uploadProfileImage, deleteProfileImage, toggleImagePrivacy, MAX_PROFILE_IMAGES } from '@/services/supabase/storage-service';

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
  isPrivate?: boolean;
}

interface ProfileImageUploadProps {
  userId?: string;
  onImagesChange: (images: ProfileImage[]) => void;
  existingImages?: ProfileImage[];
  disabled?: boolean;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  userId,
  onImagesChange,
  existingImages = [],
  disabled = false
}) => {
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

  const processFiles = async (files: File[]) => {
    if (disabled || isLoading) return;
    
    const newFiles = Array.from(files);
    
    // Check if adding these files would exceed the limit
    if (images.length + newFiles.length > MAX_PROFILE_IMAGES) {
      toast({
        variant: "destructive",
        title: "Too many images",
        description: `You can only upload up to ${MAX_PROFILE_IMAGES} images. Please remove some before adding more.`
      });
      return;
    }
    
    // Create temporary images and add them to state immediately for better UX
    const tempImages = newFiles.map((file, i) => {
      const tempId = `temp-${Date.now()}-${i}`;
      return {
        filePath: tempId,
        publicUrl: URL.createObjectURL(file),
        file,
        isUploading: false,  // We'll set this to true when actually uploading
        isPrivate: false
      } as ProfileImage;
    });
    
    const updatedImages = [...images, ...tempImages];
    setImages(updatedImages);
    onImagesChange(updatedImages);
    
    // If we're in signup mode (no userId yet), we're done - the actual upload will happen when the form is submitted
    if (!userId) {
      toast({
        title: "Images added",
        description: "Images will be uploaded when you complete signup."
      });
      return;
    }
    
    // For existing users with a userId, upload the files immediately
    for (let i = 0; i < tempImages.length; i++) {
      const tempImage = tempImages[i];
      const imageIndex = updatedImages.findIndex(img => img.filePath === tempImage.filePath);
      
      if (imageIndex !== -1 && tempImage.file) {
        setProcessingIndex(imageIndex);
        
        // Mark this image as uploading
        const updatingImages = [...updatedImages];
        updatingImages[imageIndex] = { ...updatingImages[imageIndex], isUploading: true };
        setImages(updatingImages);
        onImagesChange(updatingImages);
        
        try {
          setIsLoading(true);
          const result = await uploadProfileImage(userId, tempImage.file, tempImage.isPrivate || false);
          
          if ('error' in result) {
            toast({
              variant: "destructive",
              title: "Upload failed",
              description: result.error
            });
            
            // Remove the failed image
            const filteredImages = updatingImages.filter(img => img.filePath !== tempImage.filePath);
            setImages(filteredImages);
            onImagesChange(filteredImages);
          } else {
            // Replace temp image with the uploaded one
            const uploadedImage: ProfileImage = {
              imageId: result.imageId,
              filePath: result.filePath,
              publicUrl: result.publicUrl,
              isPrivate: result.isPrivate
            };
            
            const finalImages = updatingImages.map(img => 
              img.filePath === tempImage.filePath ? uploadedImage : img
            );
            
            setImages(finalImages);
            onImagesChange(finalImages);
            
            toast({
              title: "Image uploaded",
              description: "Your image was uploaded successfully."
            });
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          
          // Remove the failed image
          const filteredImages = updatedImages.filter(img => img.filePath !== tempImage.filePath);
          setImages(filteredImages);
          onImagesChange(filteredImages);
          
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
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    processFiles(Array.from(e.target.files));
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isLoading) return;
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isLoading) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled || isLoading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = images[index];
    setProcessingIndex(index);
    
    if (userId && imageToRemove.imageId && !imageToRemove.isUploading) {
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
    
    // Remove from local state
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setProcessingIndex(null);
    
    // Notify parent component
    onImagesChange(updatedImages);
  };

  const handleTogglePrivacy = async (index: number) => {
    const imageToToggle = images[index];
    const newPrivacyStatus = !imageToToggle.isPrivate;
    
    setProcessingIndex(index);
    
    // Update local state first for immediate UI feedback
    const updatedImages = [...images];
    updatedImages[index] = { ...imageToToggle, isPrivate: newPrivacyStatus };
    setImages(updatedImages);
    
    // Update in database if we have a userId and imageId
    if (userId && imageToToggle.imageId && !imageToToggle.isUploading) {
      setIsLoading(true);
      
      try {
        const result = await toggleImagePrivacy(
          userId,
          imageToToggle.imageId,
          newPrivacyStatus
        );
        
        if ('error' in result) {
          // Revert the local state change if the API call fails
          updatedImages[index] = { ...imageToToggle };
          setImages(updatedImages);
          
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
        
        // Revert the local state change if there's an error
        updatedImages[index] = { ...imageToToggle };
        setImages(updatedImages);
        
        toast({
          variant: "destructive",
          title: "Update Error",
          description: "Failed to update image privacy."
        });
      } finally {
        setIsLoading(false);
        setProcessingIndex(null);
      }
    }
    
    // Notify parent component of the change
    onImagesChange(updatedImages);
  };

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Optimize image rendering for better performance
  const renderImages = () => {
    return images.map((image, index) => (
      <Card key={image.filePath || index} className="relative overflow-hidden h-32 group">
        <img 
          src={image.publicUrl} 
          alt={`Profile ${index + 1}`}
          className={`w-full h-full object-cover ${image.isPrivate ? 'opacity-70' : ''}`}
        />
        {(image.isUploading || processingIndex === index) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
        <div className="absolute top-1 right-1 flex space-x-1">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className={`h-6 w-6 bg-white/80 hover:bg-white ${disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            onClick={() => handleTogglePrivacy(index)}
            disabled={disabled || isLoading || image.isUploading || processingIndex !== null}
            title={image.isPrivate ? "Make image public" : "Make image private"}
          >
            {image.isPrivate ? 
              <Lock className="h-3 w-3 text-gray-700" /> : 
              <Unlock className="h-3 w-3 text-gray-700" />
            }
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className={`h-6 w-6 ${disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            onClick={() => handleRemoveImage(index)}
            disabled={disabled || isLoading || processingIndex !== null}
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
        {image.isPrivate && (
          <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
            <Lock className="h-3 w-3 mr-1" />
            Private
          </div>
        )}
      </Card>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
        Profile Photos (Max {MAX_PROFILE_IMAGES})
      </div>
      
      <div 
        ref={dropZoneRef}
        className={`grid grid-cols-2 sm:grid-cols-4 gap-4 ${isDragging ? 'border-2 border-dashed border-[#9D4EDD] bg-[#9D4EDD]/10 p-3 rounded-lg' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {renderImages()}
        
        {images.length < MAX_PROFILE_IMAGES && (
          <Card 
            className={`flex items-center justify-center h-32 border-dashed cursor-pointer
                       ${isDragging ? 'bg-[#9D4EDD]/20 border-[#9D4EDD]' : ''}
                       ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#9D4EDD]'}
                       transition-colors`}
            onClick={(disabled || isLoading) ? undefined : handleAddImage}
          >
            <div className="flex flex-col items-center text-center p-2">
              {isLoading ? 
                <Loader2 className="h-8 w-8 text-[#9D4EDD] mb-2 animate-spin" /> :
                <ImagePlus className="h-8 w-8 text-[#9D4EDD] mb-2" />
              }
              <span className="text-xs">
                {isDragging ? "Drop Images Here" : isLoading ? "Uploading..." : "Add Photo"}
              </span>
              {!isLoading && !isDragging && (
                <span className="text-[10px] text-gray-500 mt-1">or drag & drop</span>
              )}
            </div>
          </Card>
        )}
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1 mb-1">
          <Lock className="h-3 w-3" />
          <span>Private photos will only be visible when you choose to reveal them</span>
        </div>
      </div>
      
      <input 
        type="file" 
        accept="image/*" 
        multiple 
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isLoading || images.length >= MAX_PROFILE_IMAGES}
      />
    </div>
  );
};
