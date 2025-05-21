
import { Camera } from "lucide-react";
import { ProfileImage } from "./types";

interface PhotosSectionProps {
  profileImages: ProfileImage[];
}

const PhotosSection = ({ profileImages }: PhotosSectionProps) => {
  if (profileImages.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white">
        <Camera className="h-4 w-4 mr-1 text-[#9D4EDD]" />
        Profile Photos
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {profileImages.slice(0, 6).map((image, index) => (
          <div 
            key={image.filePath || index} 
            className="aspect-square rounded-md overflow-hidden relative"
          >
            <img 
              src={image.publicUrl} 
              alt={`Profile ${index + 1}`}
              className="object-cover w-full h-full"
            />
            {image.isPrivate && (
              <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1 py-0.5 rounded">
                Private
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosSection;
