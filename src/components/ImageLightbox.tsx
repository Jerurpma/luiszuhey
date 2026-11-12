import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  caption: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  imageSrc,
  caption,
  onClose,
}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setScale(1);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 bg-black/90 backdrop-blur-md">
      {/* Top Toolbar */}
      <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-stone-800">
        <div className="text-xs sm:text-sm font-medium text-stone-300 truncate max-w-md">
          {caption}
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            type="button"
            onClick={() => setScale((s) => Math.min(3, s + 0.25))}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setScale((s) => Math.max(0.75, s - 0.25))}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setScale(1)}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Download */}
          <a
            href={imageSrc}
            download="Luis_Villagrana_Campaign_Image.jpeg"
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors"
            title="Download Image"
          >
            <Download className="w-4 h-4" />
          </a>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-white transition-colors cursor-pointer ml-2"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="flex-1 flex items-center justify-center w-full overflow-hidden my-4">
        <img
          src={imageSrc}
          alt={caption}
          referrerPolicy="no-referrer"
          style={{ transform: `scale(${scale})` }}
          className="max-h-[82vh] max-w-[92vw] object-contain transition-transform duration-200 ease-out select-none shadow-2xl rounded-sm"
        />
      </div>

      {/* Footer Caption */}
      <div className="w-full max-w-3xl text-center text-xs text-stone-400 pb-1">
        <span>{caption}</span>
        <span className="mx-2">·</span>
        <span>Use zoom buttons or ESC to exit</span>
      </div>
    </div>
  );
};
