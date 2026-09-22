import React from 'react';
import { useRouter } from '../../context/RouterContext';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Globe, Clock, ExternalLink } from 'lucide-react';
import { PRODUCTS_DATA } from '../../data/companyData';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();
  const { companySettings } = useApp();

  return (
    <footer className="bg-[#0B1114] border-t border-white/10 pt-16 pb-12 text-[#A6B2B7] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="md" />
            <p className="text-sm leading-relaxed text-[#A6B2B7] max-w-sm mt-3">
              Packaging That Fits Your Business. Manufacturer of 3-ply, 5-ply, 7-ply corrugated carton boxes and custom die-cut industrial packaging solutions in Visakhapatnam.
            </p>

            <div className="pt-2 text-xs text-[#A6B2B7]/80 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[#F28B35] font-semibold">Leadership:</span>
                <span className="text-[#F4F6F5]">{companySettings.ceoName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#F28B35] font-semibold">Location:</span>
                <span>Anandapuram, Visakhapatnam District</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigate('/request-quote')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F28B35] text-[#0B1114] font-bold text-xs uppercase tracking-wider hover:bg-[#FFAB5C] transition-all"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F4F6F5] border-l-2 border-[#F28B35] pl-2.5">
              Packaging Products
            </h4>
            <ul className="space-y-2 text-xs">
              {PRODUCTS_DATA.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="hover:text-[#F28B35] transition-colors flex items-center gap-1.5 group text-left"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#A6B2B7]/50 group-hover:bg-[#F28B35] transition-colors" />
                    <span>{product.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation & Capabilities */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F4F6F5] border-l-2 border-[#F28B35] pl-2.5">
              Company
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-[#F28B35] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products')} className="hover:text-[#F28B35] transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/solutions')} className="hover:text-[#F28B35] transition-colors">
                  Packaging Solutions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/manufacturing')} className="hover:text-[#F28B35] transition-colors">
                  Manufacturing Process
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-[#F28B35] transition-colors">
                  About Hanvision
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-[#F28B35] transition-colors">
                  Product Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#F28B35] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/admin/dashboard')} className="hover:text-[#F28B35] transition-colors flex items-center gap-1 text-[11px] text-[#A6B2B7]/70">
                  <ShieldCheck className="w-3 h-3 text-[#F28B35]" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F4F6F5] border-l-2 border-[#F28B35] pl-2.5">
              Manufacturing Facility
            </h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F28B35] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F4F6F5] font-medium leading-relaxed">
                    {companySettings.address},
                  </p>
                  <p>{companySettings.city}, {companySettings.state} - {companySettings.pincode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F28B35] flex-shrink-0" />
                <a
                  href={`tel:${companySettings.phone}`}
                  className="text-[#F4F6F5] hover:text-[#F28B35] transition-colors font-medium"
                >
                  {companySettings.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F28B35] flex-shrink-0" />
                <a
                  href={`mailto:${companySettings.email}`}
                  className="text-[#F4F6F5] hover:text-[#F28B35] transition-colors break-all"
                >
                  {companySettings.email}
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={companySettings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#172228] hover:bg-[#202D34] text-[#F4F6F5] text-xs font-medium border border-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#F28B35]" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A6B2B7]/70 gap-4">
          <p>
            © {new Date().getFullYear()} Hanvision Enterprises. All rights reserved. Visakhapatnam, Andhra Pradesh.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Corrugated Box Manufacturing</span>
            <span>•</span>
            <span>Custom Industrial Packaging</span>
            <span>•</span>
            <button
              onClick={() => navigate('/admin/login')}
              className="hover:text-[#F4F6F5] transition-colors"
            >
              Staff Access
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
