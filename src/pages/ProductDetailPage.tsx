import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGallery } from '../components/products/ProductGallery';
import { ProductCard } from '../components/products/ProductCard';
import { WhatsAppButton } from '../components/common/WhatsAppButton';
import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Sliders,
  ShieldAlert,
  ArrowLeft,
  Share2,
  Phone
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const { products, setSelectedQuoteProduct, showToast, companySettings } = useApp();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-[#F4F6F5]">Product Not Found</h1>
        <p className="text-sm text-[#A6B2B7]">
          The packaging product you requested does not exist or has been relocated.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-6 py-2.5 rounded-lg bg-[#F28B35] text-[#0B1114] font-bold text-xs inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products Catalogue</span>
        </button>
      </div>
    );
  }

  const handleRequestQuote = () => {
    setSelectedQuoteProduct(product.name);
    navigate(`/request-quote?product=${encodeURIComponent(product.slug)}`);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard', 'info');
    }
  };

  // Find related products (excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs
        items={[
          { label: 'Products', path: '/products' },
          { label: product.name }
        ]}
      />

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <ProductGallery images={product.galleryImages} productName={product.name} />

          {/* Quick Notice Box */}
          <div className="p-4 rounded-xl bg-[#172228] border border-white/5 flex items-start gap-3 text-xs text-[#A6B2B7]">
            <ShieldAlert className="w-4 h-4 text-[#F28B35] flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#F4F6F5]">Manufacturing Note:</strong> Exact GSM, burst strength, and dimensional tolerances are configured based on customer payload weight and shipping environment.
            </p>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#172228] border border-white/10 text-xs font-semibold text-[#F28B35] uppercase">
              <Layers className="w-3.5 h-3.5" />
              <span>{product.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F5] tracking-tight">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed pt-1">
              {product.fullDescription}
            </p>
          </div>

          {/* Conversion Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRequestQuote}
              className="flex-1 py-4 px-6 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <WhatsAppButton
              variant="inline"
              productName={product.name}
              buttonText="Inquire on WhatsApp"
              className="flex-1 py-4 justify-center"
            />

            <button
              onClick={handleShare}
              className="p-4 rounded-xl bg-[#172228] hover:bg-[#202D34] text-[#A6B2B7] hover:text-[#F4F6F5] border border-white/10 transition-colors flex items-center justify-center"
              title="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Common Applications */}
          <div className="bg-[#172228] border border-white/10 rounded-2xl p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
              Common Packaging Applications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4F6F5]">
              {product.suggestedApplications.map((app, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-[#172228] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F28B35] flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              <span>Available Specifications</span>
            </h3>

            <div className="divide-y divide-white/5 text-xs">
              {product.specifications.map((spec, idx) => (
                <div key={idx} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-[#A6B2B7] font-medium">{spec.label}</span>
                  <span className="text-[#F4F6F5] font-semibold sm:text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customization Possibilities */}
          <div className="bg-[#172228] border border-white/10 rounded-2xl p-6 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
              Customization Options
            </h3>
            <ul className="space-y-2 text-xs text-[#A6B2B7]">
              {product.customizationOptions.map((opt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F28B35] flex-shrink-0 mt-1.5" />
                  <span className="text-[#F4F6F5]">{opt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="pt-10 border-t border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#F4F6F5]">
            Other Packaging Options
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="text-xs font-bold text-[#F28B35] hover:text-[#FFAB5C] flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>
    </div>
  );
};
