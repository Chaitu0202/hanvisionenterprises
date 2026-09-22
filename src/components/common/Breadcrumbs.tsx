import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigate } = useRouter();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#A6B2B7] py-3 mb-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 hover:text-[#F28B35] transition-colors"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-2 text-[#A6B2B7]/40 flex-shrink-0" />
            {isLast || !item.path ? (
              <span className="text-[#F4F6F5] font-medium truncate max-w-[220px]">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => item.path && navigate(item.path)}
                className="hover:text-[#F28B35] transition-colors truncate max-w-[180px]"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
