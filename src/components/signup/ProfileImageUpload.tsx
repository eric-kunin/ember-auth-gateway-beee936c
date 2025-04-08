import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, ImagePlus, Loader2, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { uploadProfileImage, deleteProfileImage, MAX_PROFILE_IMAGES } from '@/services/supabase/storage-service';

interface ProfileImage {
  imageId?: string;
  filePath: string;
  publicUrl: string;
  file?: File;
  isUploading?: boolean;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (existingImages.length > 0) {
      setImages(existingImages);
    }
  }, [existingImages]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files);
    
    // Check if adding these files would exceed the limit
    if (images.length + newFiles.length > MAX_PROFILE_IMAGES) {
      toast({
        variant: "destructive",
        title: "Too many images",
        description: `You can only upload up to ${MAX_PROFILE_IMAGES} images. Please remove some before adding more.`
      });
      return;
    }
    
    // Show pending upload state
    const pendingImages = newFiles.map(file => ({
      file,
      filePath: URL.createObjectURL(file),
      publicUrl: URL.createObjectURL(file),
      isUploading: true
    }));
    
    setImages(prev => [...prev, ...pendingImages]);
    
    // If we have a userId, upload the files to Supabase
    if (userId) {
      setIsLoading(true);
      
      try {
        const uploadedImages: ProfileImage[] = [];
        
        for (const file of newFiles) {
          const result = await uploadProfileImage(userId, file);
          
          if ('error' in result) {
            toast({
              variant: "destructive",
              title: "Upload failed",
              description: result.error
            });
          } else {
            uploadedImages.push({
              imageId: result.imageId,
              filePath: result.filePath,
              publicUrl: result.publicUrl
            });
          }
        }
        
        // Replace the pending images with the uploaded ones
        setImages(prev => 
          prev.filter(img => !pendingImages.find(p => p.filePath === img.filePath))
            .concat(uploadedImages)
        );
        
        // Notify parent component
        onImagesChange(images.filter(img => !pendingImages.find(p => p.filePath === img.filePath))
          .concat(uploadedImages));
      } catch (error) {
        console.error('Error uploading images:', error);
        toast({
          variant: "destructive",
          title: "Upload Error",
          description: "Failed to upload one or more images."
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      // No userId means we're in the signup process, just keep the local files
      setImages(prev => [...prev]);
      onImagesChange([...images, ...pendingImages]);
    }
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = images[index];
    
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
          return;
        }
      } catch (error) {
        console.error('Error deleting image:', error);
        toast({
          variant: "destructive",
          title: "Delete Error",
          description: "Failed to delete the image."
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    // Remove from local state
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    
    // Notify parent component
    onImagesChange(updatedImages);
  };

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-[#240046] dark:text-white text-sm transition-colors duration-300">
        Profile Photos (Max {MAX_PROFILE_IMAGES})
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card key={index} className="relative overflow-hidden h-32 group">
            <img 
              src={image.publicUrl} 
              alt={`Profile ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {image.isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
            )}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
              onClick={() => handleRemoveImage(index)}
              disabled={disabled || isLoading}
            >
              <X className="h-4 w-4" />
            </Button>
          </Card>
        ))}
        
        {images.length < MAX_PROFILE_IMAGES && (
          <Card 
            className={`flex items-center justify-center h-32 border-dashed cursor-pointer
                       ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#9D4EDD]'}
                       transition-colors`}
            onClick={disabled ? undefined : handleAddImage}
          >
            <div className="flex flex-col items-center text-center p-2">
              <ImagePlus className="h-8 w-8 text-[#9D4EDD] mb-2" />
              <span className="text-xs">Add Photo</span>
            </div>
          </Card>
        )}
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
