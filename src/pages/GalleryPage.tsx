import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { GALLERY_DATA } from '../data/companyData';
import { Maximize2, X, ArrowUpRight, Layers, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GalleryPage: React.FC = () => {
  const { navigate } = useRouter();
  const { setSelectedQuoteProduct } = useApp();

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_DATA[0] | null>(null);

  const categories = ['All', 'Corrugated Cartons', 'Custom Boxes', 'Manufacturing & Material', 'Food & Retail'];

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const handleInquireFromGallery = (title: string) => {
    setSelectedImage(null);
    setSelectedQuoteProduct(`Gallery Reference: ${title}`);
    navigate('/request-quote');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: 'Product Gallery' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
          Visual Portfolio
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F5] tracking-tight">
          PACKAGING SAMPLES & FACILITY GALLERY.
        </h1>
        <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
          Examine samples of corrugated carton boxes, fluting profiles, die-cut packaging designs, and material structures fabricated by Hanvision Enterprises in Visakhapatnam.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-[#F28B35] text-[#0B1114] shadow-md'
                : 'bg-[#172228] text-[#A6B2B7] hover:text-[#F4F6F5] hover:bg-[#202D34]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group bg-[#172228] border border-white/10 hover:border-[#F28B35]/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0B1114]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#172228] via-transparent to-transparent opacity-60" />

              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-md bg-[#0B1114]/80 backdrop-blur-sm text-[10px] font-bold uppercase text-[#F28B35] border border-white/10">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#0B1114]/80 text-[#F4F6F5] opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-5 space-y-1.5">
              <h3 className="text-sm font-bold text-[#F4F6F5] group-hover:text-[#F28B35] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#A6B2B7] leading-relaxed line-clamp-2">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative bg-[#172228] border border-white/15 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-[#0B1114]">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-[#F28B35] hover:text-[#0B1114] transition-colors"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
                  {selectedImage.category}
                </span>
                <span className="text-[11px] text-[#A6B2B7]">
                  Hanvision Enterprises Production Sample
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#F4F6F5]">
                {selectedImage.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#A6B2B7] leading-relaxed">
                {selectedImage.caption}
              </p>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A6B2B7] hover:text-[#F4F6F5]"
                >
                  Close
                </button>

                <button
                  onClick={() => handleInquireFromGallery(selectedImage.title)}
                  className="px-5 py-2.5 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Inquire About This Format</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-[#172228] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#F4F6F5]">
            Looking for something specific not pictured here?
          </h3>
          <p className="text-xs text-[#A6B2B7]">
            We produce custom configurations, specialized flap styles, and custom dimensions tailored to client drawings.
          </p>
        </div>

        <button
          onClick={() => navigate('/request-quote')}
          className="px-6 py-3 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center gap-2 flex-shrink-0 transition-all"
        >
          <span>Share Custom Requirement</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
