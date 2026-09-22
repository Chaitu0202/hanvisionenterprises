import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SOLUTIONS_DATA, PRODUCTS_DATA } from '../data/companyData';
import {
  ArrowUpRight,
  ShoppingBag,
  Factory,
  Apple,
  Box,
  Truck,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SolutionsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { setSelectedQuoteProduct } = useApp();

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6 text-[#F28B35]" />;
      case 'Factory':
        return <Factory className="w-6 h-6 text-[#F28B35]" />;
      case 'Apple':
        return <Apple className="w-6 h-6 text-[#F28B35]" />;
      case 'Box':
        return <Box className="w-6 h-6 text-[#F28B35]" />;
      case 'Truck':
      default:
        return <Truck className="w-6 h-6 text-[#F28B35]" />;
    }
  };

  const handleSolutionQuote = (solutionTitle: string) => {
    setSelectedQuoteProduct(`Solution Requirement: ${solutionTitle}`);
    navigate('/request-quote');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs items={[{ label: 'Solutions' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
          Industry & Requirement Solutions
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F5] tracking-tight">
          PACKAGING BUILT AROUND YOUR DISTRIBUTION REALITY.
        </h1>
        <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
          Packaging needs vary widely depending on transit vibrations, stacking heights, environmental humidity, and handling methods. Discover packaging architectures tailored to your specific sector.
        </p>
      </div>

      {/* Solutions Cards Grid */}
      <div className="space-y-8">
        {SOLUTIONS_DATA.map((solution, index) => (
          <div
            key={solution.id}
            className="bg-[#172228] border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all hover:border-[#F28B35]/40"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#202D34] flex items-center justify-center border border-white/5">
                    {getIcon(solution.iconName)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#F28B35] uppercase tracking-wider">
                      Solution {index + 1}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#F4F6F5]">
                      {solution.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[#F4F6F5] leading-relaxed">
                  {solution.shortDescription}
                </p>

                {/* Practical Use Case */}
                <div className="p-4 rounded-xl bg-[#0B1114] border border-white/5 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6B2B7]">
                    Target Applications:
                  </span>
                  <p className="text-xs text-[#A6B2B7] leading-relaxed">
                    {solution.useCase}
                  </p>
                </div>

                {/* Key Structural Highlights */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F28B35]">
                    Engineering & Design Focus:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4F6F5]">
                    {solution.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Recommendation & Actions */}
              <div className="lg:col-span-4 bg-[#202D34] border border-white/5 rounded-2xl p-6 space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B1114] text-xs font-semibold text-[#F28B35] border border-white/5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Recommended: {solution.recommendedPly}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6B2B7]">
                      Suggested Box Types:
                    </span>
                    <ul className="space-y-1 text-xs text-[#F4F6F5]">
                      {solution.suggestedProducts.map((pName, pIdx) => {
                        const productMatch = PRODUCTS_DATA.find((p) => p.name === pName);
                        return (
                          <li key={pIdx}>
                            {productMatch ? (
                              <button
                                onClick={() => navigate(`/products/${productMatch.slug}`)}
                                className="hover:text-[#F28B35] text-left underline decoration-white/20 underline-offset-2 flex items-center gap-1"
                              >
                                <span>{pName}</span>
                                <ArrowRight className="w-3 h-3 text-[#F28B35]" />
                              </button>
                            ) : (
                              <span>{pName}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => handleSolutionQuote(solution.title)}
                    className="w-full py-3 px-4 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
                  >
                    <span>Request Solution Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
