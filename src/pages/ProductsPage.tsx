import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilter } from '../components/products/ProductFilter';
import { ArrowUpRight, Package, RefreshCw } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { products } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    return [
      'All',
      'Corrugated Boxes',
      'Customized Packaging',
      'Food Packaging',
      'Mono Cartons'
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      let matchesCategory = true;
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Corrugated Boxes') {
          matchesCategory = product.category.includes('Corrugated Boxes') || product.name.includes('Ply');
        } else if (selectedCategory === 'Customized Packaging') {
          matchesCategory = product.category.includes('Customized');
        } else if (selectedCategory === 'Food Packaging') {
          matchesCategory = product.category.includes('Food');
        } else if (selectedCategory === 'Mono Cartons') {
          matchesCategory = product.category.includes('Mono');
        }
      }

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.suggestedApplications.some((app) => app.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Products' }]} />

      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
          Products Catalogue
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F5] tracking-tight">
          PACKAGING FOR YOUR REQUIREMENTS.
        </h1>
        <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
          Browse our complete range of corrugated carton boxes and custom packaging formats. Each product can be customized to your specific dimensions, ply strength, and flexographic printing requirements.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <ProductFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        categories={categories}
      />

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-[#172228] border border-white/10 rounded-2xl space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-xl bg-[#202D34] flex items-center justify-center mx-auto text-[#A6B2B7]">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#F4F6F5]">
            No matching packaging products found
          </h3>
          <p className="text-xs text-[#A6B2B7]">
            We could not find products matching &ldquo;{searchQuery}&rdquo;. Try clearing your search or switching categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#202D34] hover:bg-white/10 text-xs font-semibold text-[#F4F6F5] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Search & Filters</span>
          </button>
        </div>
      )}

      {/* Custom Requirement Bottom CTA */}
      <div className="bg-[#172228] border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-lg font-bold text-[#F4F6F5]">
            Need a specific custom size or unique box profile?
          </h3>
          <p className="text-xs text-[#A6B2B7]">
            We manufacture bespoke die-cut boxes according to your exact product dimensions and packaging load.
          </p>
        </div>

        <button
          onClick={() => navigate('/request-quote')}
          className="px-6 py-3 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center gap-2 flex-shrink-0 transition-all shadow-md"
        >
          <span>Request Custom Quotation</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
