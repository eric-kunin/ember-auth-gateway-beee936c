
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Loader2, Lock, Unlock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfileImage } from './types';

interface ImageCardProps {
  image: ProfileImage;
  index: number;
  isProcessing: boolean;
  disabled: boolean;
  onRemove: (index: number) => void;
  onTogglePrivacy: (index: number) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  index,
  isProcessing,
  disabled,
  onRemove,
  onTogglePrivacy
}) => {
  return (
    <Card className="relative overflow-hidden aspect-square group">
      <img 
        src={image.publicUrl} 
        alt={`Profile ${index + 1}`}
        className={`w-full h-full object-cover ${image.isPrivate ? 'opacity-70' : ''}`}
      />
      {(image.isUploading || isProcessing) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}
      {!image.isUploading && !isProcessing && (
        <div className="absolute top-1 right-1 flex space-x-1">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className={`h-6 w-6 bg-white/80 hover:bg-white ${disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}
            onClick={() => onTogglePrivacy(index)}
            disabled={disabled}
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
            onClick={() => onRemove(index)}
            disabled={disabled}
            title="Remove image"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      {image.isPrivate && !image.isUploading && (
        <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-sm flex items-center">
          <Lock className="h-3 w-3 mr-1" />
          Private
        </div>
      )}
    </Card>
  );
};
