import React, { useState, useEffect } from 'react';
import { useRouter } from '../../context/RouterContext';
import { BrandLogo } from './BrandLogo';
import { Menu, X, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { currentPath, navigate, isActive } = useRouter();
  const { companySettings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Manufacturing', path: '/manufacturing' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B1114]/95 backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-[#0B1114] border-b border-white/5'
        }`}
      >
        {/* Top business notice banner */}
        <div className="hidden lg:flex items-center justify-between px-6 py-1.5 bg-[#172228] text-xs text-[#A6B2B7] border-b border-white/5">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Corrugated Carton Manufacturer • Visakhapatnam, AP
            </span>
            <span className="text-white/20">|</span>
            <span>B2B Industrial & Custom Packaging Quotations</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${companySettings.phone}`}
              className="flex items-center gap-1.5 text-[#F4F6F5] hover:text-[#F28B35] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#F28B35]" />
              <span>{companySettings.displayPhone}</span>
            </a>
            <span className="text-white/20">|</span>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center gap-1 text-[#A6B2B7] hover:text-[#F4F6F5] transition-colors text-[11px]"
              title="Admin Portal (Demo)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#A6B2B7]" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-left focus:outline-none group"
              aria-label="Hanvision Enterprises Home"
            >
              <BrandLogo size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const active = isActive(link.path, link.path === '/');
                return (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all relative ${
                      active
                        ? 'text-[#F28B35] bg-[#172228]'
                        : 'text-[#A6B2B7] hover:text-[#F4F6F5] hover:bg-[#172228]/50'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#F28B35] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => navigate('/request-quote')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => navigate('/request-quote')}
                className="px-3 py-1.5 rounded-md bg-[#F28B35] text-[#0B1114] font-bold text-xs flex items-center gap-1"
              >
                <span>QUOTE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-lg text-[#F4F6F5] hover:bg-[#172228] focus:outline-none"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-[#0B1114] animate-fadeIn">
          {/* Top Bar inside mobile menu */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
            <BrandLogo size="sm" />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg text-[#F4F6F5] hover:bg-[#172228]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
            {navLinks.map((link) => {
              const active = isActive(link.path, link.path === '/');
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3.5 rounded-lg text-lg font-medium flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-[#172228] text-[#F28B35] border-l-4 border-[#F28B35]'
                      : 'text-[#F4F6F5] hover:bg-[#172228]/60'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  navigate('/admin/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-[#A6B2B7] hover:text-[#F4F6F5] flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#F28B35]" />
                <span>Admin Inquiry Portal (Demo)</span>
              </button>
            </div>
          </div>

          {/* Bottom Actions inside mobile menu */}
          <div className="p-6 border-t border-white/10 bg-[#172228]/50 space-y-3">
            <button
              onClick={() => {
                navigate('/request-quote');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 px-4 rounded-lg bg-[#F28B35] text-[#0B1114] font-bold text-center flex items-center justify-center gap-2 text-base shadow-lg"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            <a
              href={`tel:${companySettings.phone}`}
              className="w-full py-3 px-4 rounded-lg bg-[#202D34] text-[#F4F6F5] font-medium text-center flex items-center justify-center gap-2 text-sm border border-white/10"
            >
              <Phone className="w-4 h-4 text-[#F28B35]" />
              <span>Call: {companySettings.displayPhone}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
