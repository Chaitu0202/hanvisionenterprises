import React from 'react';
import { Product } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import { ArrowUpRight, Check, Layers } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate } = useRouter();
  const { setSelectedQuoteProduct } = useApp();

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedQuoteProduct(product.name);
    navigate(`/request-quote?product=${encodeURIComponent(product.slug)}`);
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.slug}`)}
      className="group bg-[#172228] border border-white/10 hover:border-[#F28B35]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-video w-full bg-[#0B1114] overflow-hidden">
        <SafeImage
          src={product.heroImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#172228] via-transparent to-black/20" />

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-[#0B1114]/85 backdrop-blur-sm border border-white/10 text-[#F28B35] text-[11px] font-semibold tracking-wide uppercase">
            {product.category}
          </span>
        </div>

        {product.isPopular && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded bg-[#F28B35] text-[#0B1114] text-[10px] font-bold tracking-wider uppercase">
              Standard
            </span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-[#F4F6F5] group-hover:text-[#F28B35] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-[#A6B2B7] leading-relaxed mt-2 line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Quick Applications list */}
          <div className="mt-4 pt-3 border-t border-white/5 space-y-1.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A6B2B7]">
              Key Applications:
            </p>
            <ul className="space-y-1 text-xs text-[#F4F6F5]/85">
              {product.suggestedApplications.slice(0, 2).map((app, i) => (
                <li key={i} className="flex items-center gap-1.5 truncate">
                  <Check className="w-3.5 h-3.5 text-[#F28B35] flex-shrink-0" />
                  <span className="truncate">{app}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex items-center gap-2">
          <button
            onClick={() => navigate(`/products/${product.slug}`)}
            className="flex-1 py-2 px-3 rounded-lg bg-[#202D34] hover:bg-white/10 text-xs text-[#F4F6F5] font-semibold transition-colors text-center"
          >
            View Details
          </button>

          <button
            onClick={handleRequestQuote}
            className="flex-1 py-2 px-3 rounded-lg bg-[#F28B35] hover:bg-[#FFAB5C] text-xs text-[#0B1114] font-bold transition-all text-center flex items-center justify-center gap-1 shadow-sm"
          >
            <span>Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
