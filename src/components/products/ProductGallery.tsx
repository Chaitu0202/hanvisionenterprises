import React, { useState } from 'react';
import { Maximize2, Shield } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const currentImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Large Display Frame */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#172228] border border-white/10 group">
        <SafeImage
          src={currentImage}
          alt={`${productName} sample view ${selectedIndex + 1}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Demo image notice badge */}
        <div className="absolute top-3 left-3 bg-[#0B1114]/90 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] text-[#A6B2B7] flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-[#F28B35]" />
          <span>Industrial Studio Sample Shot</span>
        </div>

        {/* Zoom button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#0B1114]/80 text-[#F4F6F5] hover:bg-[#F28B35] hover:text-[#0B1114] transition-colors shadow-md"
          title="View full image"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative aspect-video rounded-xl overflow-hidden border transition-all ${
                selectedIndex === idx
                  ? 'border-[#F28B35] ring-2 ring-[#F28B35]/20 scale-100'
                  : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
              }`}
            >
              <SafeImage
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10">
            <SafeImage
              src={currentImage}
              alt={productName}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#0B1114]/80 text-white hover:bg-[#F28B35] hover:text-[#0B1114] text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
