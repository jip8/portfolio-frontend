import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttachmentResp } from "@/api/generated";

interface ImageGalleryProps {
  images: AttachmentResp[];
  onValidImagesDetected?: (imageIds: Set<number>) => void;
}

const getAttachmentUrl = (link: string): string => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return `${baseUrl}/attachments/${link}`;
};

export function ImageGallery({ images, onValidImagesDetected }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [validImageIds, setValidImageIds] = useState<Set<number>>(new Set());
  const [checking, setChecking] = useState(true);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedIndex !== null && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [selectedIndex]);

  useEffect(() => {
    const checkImages = async () => {
      setChecking(true);
      const imageIds = new Set<number>();

      await Promise.all(
        images.map(async (attachment) => {
          try {
            const img = new Image();
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
              img.src = getAttachmentUrl(attachment.link);
            });
            imageIds.add(attachment.id);
          } catch (error) {
            console.log(`Not an image or failed to load: ${attachment.title}`);
          }
        })
      );

      setValidImageIds(imageIds);
      if (onValidImagesDetected) {
        onValidImagesDetected(imageIds);
      }
      setChecking(false);
    };

    if (images.length > 0) {
      checkImages();
    } else {
      setChecking(false);
    }
  }, [images]);

  const handleImageError = (attachmentId: number) => {
    setImageErrors(prev => new Set(prev).add(attachmentId));
  };

  const validImages = images.filter(img =>
    validImageIds.has(img.id) && !imageErrors.has(img.id)
  );

  if (checking) {
    return null;
  }

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null && selectedIndex < validImages.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
  };

  if (validImages.length === 0) return null;

  const lightbox = selectedIndex !== null && (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center outline-none"
      onClick={closeLightbox}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
        onClick={(e) => {
          e.stopPropagation();
          closeLightbox();
        }}
      >
        <X className="w-6 h-6" />
      </Button>

      {selectedIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          <ChevronLeft className="w-10 h-10" />
        </Button>
      )}

      {selectedIndex < validImages.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <ChevronRight className="w-10 h-10" />
        </Button>
      )}

      <div
        className="relative flex flex-col items-center justify-center w-full h-full px-4 py-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={getAttachmentUrl(validImages[selectedIndex].link)}
          alt={validImages[selectedIndex].title}
          className="max-w-full max-h-full object-contain"
        />

        <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1">
                {validImages[selectedIndex].title}
              </h3>
              {validImages[selectedIndex].description && (
                <p className="text-sm text-gray-300 line-clamp-2">
                  {validImages[selectedIndex].description}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {selectedIndex + 1} / {validImages.length}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-white/20 flex-shrink-0"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <a
                href={getAttachmentUrl(validImages[selectedIndex].link)}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </Button>
          </div>
        </div>

        {validImages.length > 1 && (
          <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
            {validImages.map((image, index) => (
              <div
                key={image.id}
                className={`flex-shrink-0 w-16 h-16 rounded border-2 cursor-pointer transition-all ${
                  index === selectedIndex
                    ? 'border-white scale-110'
                    : 'border-white/30 hover:border-white/60'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(index);
                }}
              >
                <img
                  src={getAttachmentUrl(image.link)}
                  alt={image.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {validImages.map((image, index) => (
          <div
            key={image.id}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border cursor-pointer hover:border-primary transition-all duration-300"
            onClick={() => openLightbox(index)}
          >
            <img
              src={getAttachmentUrl(image.link)}
              alt={image.title}
              onError={() => handleImageError(image.id)}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
                <p className="font-medium text-sm truncate">{image.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightbox && createPortal(lightbox, document.body)}
    </>
  );
}
