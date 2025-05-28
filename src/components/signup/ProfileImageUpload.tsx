
import React from 'react';
import { Lock } from "lucide-react";
import { MAX_PROFILE_IMAGES } from '@/services/supabase/storage-service';
import { ProfileImageUploadProps } from './image-upload/types';
import { useImageUpload } from './image-upload/useImageUpload';
import { useDragAndDrop } from './image-upload/useDragAndDrop';
import { ImageCard } from './image-upload/ImageCard';
import { AddImageCard } from './image-upload/AddImageCard';

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  userId,
  onImagesChange,
  existingImages = [],
  disabled = false
}) => {
  const {
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
  } = useImageUpload(userId, existingImages, onImagesChange, disabled);

  const {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useDragAndDrop(disabled, isLoading, isDragging, setIsDragging, processFiles);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    processFiles(Array.from(e.target.files));
  };

  const handleAddImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const renderImages = () => {
    return images.map((image, index) => (
      <ImageCard
        key={image.filePath || index}
        image={image}
        index={index}
        isProcessing={processingIndex === index}
        disabled={disabled || isLoading || processingIndex !== null}
        onRemove={handleRemoveImage}
        onTogglePrivacy={handleTogglePrivacy}
      />
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
          <AddImageCard
            isDragging={isDragging}
            isLoading={isLoading}
            disabled={disabled || isLoading}
            onClick={handleAddImage}
          />
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
