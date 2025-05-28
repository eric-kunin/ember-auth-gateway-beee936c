
import React from 'react';
import { ImagePlus, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AddImageCardProps {
  isDragging: boolean;
  isLoading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const AddImageCard: React.FC<AddImageCardProps> = ({
  isDragging,
  isLoading,
  disabled,
  onClick
}) => {
  return (
    <Card 
      className={`flex items-center justify-center aspect-square border-dashed cursor-pointer
                 ${isDragging ? 'bg-[#9D4EDD]/20 border-[#9D4EDD]' : ''}
                 ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#9D4EDD]'}
                 transition-colors`}
      onClick={(disabled || isLoading) ? undefined : onClick}
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
  );
};
