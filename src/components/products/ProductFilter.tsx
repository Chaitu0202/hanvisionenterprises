import React from 'react';
import { Search, X } from 'lucide-react';

interface ProductFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categories: string[];
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categories,
}) => {
  return (
    <div className="bg-[#172228] border border-white/10 rounded-2xl p-5 mb-10 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#A6B2B7] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by box type, ply, packaging application..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/60 focus:outline-none focus:border-[#F28B35] transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A6B2B7] hover:text-[#F4F6F5]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-[#A6B2B7] uppercase tracking-wider whitespace-nowrap mr-1">
          Categories:
        </span>
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#F28B35] text-[#0B1114] font-bold shadow-sm'
                  : 'bg-[#202D34] text-[#A6B2B7] hover:text-[#F4F6F5] hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
