
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { ProfileImage } from "./types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PhotosSectionProps {
  profileImages: ProfileImage[];
}

const PhotosSection = ({ profileImages }: PhotosSectionProps) => {
  if (profileImages.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium flex items-center text-[#240046] dark:text-white">
        <Camera className="h-4 w-4 mr-1 text-[#9D4EDD]" />
        Profile Photos
      </h4>
      <div className="relative">
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {profileImages.slice(0, 6).map((image, index) => (
              <CarouselItem key={image.filePath || index} className="basis-1/2">
                <div className="aspect-square rounded-md overflow-hidden relative">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          {profileImages.length > 2 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
        {profileImages.length > 1 && (
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">
              {profileImages.length} photo{profileImages.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotosSection;
