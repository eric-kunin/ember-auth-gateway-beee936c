
import { useCallback } from 'react';

export const useDragAndDrop = (
  disabled: boolean,
  isLoading: boolean,
  isDragging: boolean,
  setIsDragging: (dragging: boolean) => void,
  processFiles: (files: File[]) => void
) => {
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isLoading) return;
    setIsDragging(true);
  }, [disabled, isLoading, setIsDragging]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isLoading) return;
    setIsDragging(true);
  }, [disabled, isLoading, setIsDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled || isLoading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  }, [disabled, isLoading, setIsDragging, processFiles]);

  return {
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop
  };
};
