import React, { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { List, LayoutGrid, Eye } from "lucide-react";
import type { ImageItem } from "@/lib/report-data";

export interface ImagesSectionProps {
  images: ImageItem[];
}

export function ImagesSection({ images }: ImagesSectionProps) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const openPreview = useCallback((idx: number) => {
    setPreviewIndex(idx);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewIndex(null);
  }, []);

  // Keyboard handler for spacebar to open/close preview
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
      if (previewIndex === idx) {
        closePreview();
      } else {
        openPreview(idx);
      }
    }
  };

  return (
    <div>
      {/* View toggles */}
      <div className="flex items-center gap-2 mb-4">
        <button
          className={`p-1 rounded ${view === "grid" ? "bg-gray-200" : ""}`}
          onClick={() => setView("grid")}
          aria-label="Grid view"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
        <button
          className={`p-1 rounded ${view === "list" ? "bg-gray-200" : ""}`}
          onClick={() => setView("list")}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
        </button>
      </div>

      {/* Images display */}
      {view === "grid" ? (
        <div className="grid grid-cols-12 gap-2">
          {images.map((img, idx) => (
            <div
              key={img.url}
              ref={(el) => (imageRefs.current[idx] = el)}
              tabIndex={0}
              className="relative group cursor-pointer border rounded overflow-hidden focus:ring-2 focus:ring-blue-400 aspect-square"
              onClick={() => openPreview(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              aria-label={img.caption || `Image ${idx + 1}`}
            >
              <div className="w-full h-full aspect-square flex items-center justify-center bg-gray-100">
                <img
                  src={img.url}
                  alt={img.caption || `Image ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-xs px-2 py-1 truncate">
                {img.caption}
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {images.map((img, idx) => (
            <div
              key={img.url}
              ref={(el) => (imageRefs.current[idx] = el)}
              tabIndex={0}
              className="flex items-center gap-4 py-2 cursor-pointer focus:ring-2 focus:ring-blue-400"
              onClick={() => openPreview(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              aria-label={img.caption || `Image ${idx + 1}`}
            >
              <div className="w-8 h-8 aspect-square flex items-center justify-center bg-gray-100 rounded border overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caption || `Image ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <div className="font-medium text-sm">{img.caption}</div>
                <div className="text-xs text-gray-500">{img.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog preview */}
      <Dialog
        open={previewIndex !== null}
        onOpenChange={(open) => !open && closePreview()}
      >
        <DialogContent className="max-w-2xl">
          {previewIndex !== null && images[previewIndex] && (
            <div className="flex flex-col items-center">
              <img
                src={images[previewIndex].url}
                alt={
                  images[previewIndex].caption || `Image ${previewIndex + 1}`
                }
                className="max-h-[60vh] rounded mb-4"
              />
              <div className="text-base font-semibold mb-1">
                {images[previewIndex].caption}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {images[previewIndex].date}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
