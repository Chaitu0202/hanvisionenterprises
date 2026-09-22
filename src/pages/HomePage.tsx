import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/products/ProductCard';
import { SafeImage } from '../components/common/SafeImage';
import { BoxSpecVisualizer } from '../components/home/BoxSpecVisualizer';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Layers,
  Sparkles,
  Cog,
  FileText,
  Sliders,
  PackageCheck,
  Factory
} from 'lucide-react';
import { MANUFACTURING_STEPS, PACKAGING_ASSETS, SOLUTIONS_DATA } from '../data/companyData';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { products, companySettings } = useApp();
  const [heroShowcaseIdx, setHeroShowcaseIdx] = useState(0);

  const heroShowcaseImages = [
    {
      label: 'Shipping Cartons',
      title: '3-Ply & 5-Ply Shipping Cartons',
      location: 'Universal Kraft Packaging',
      desc: 'Custom manufactured kraft corrugated cartons built to client weight, fluting, and dimensional specifications.',
      src: PACKAGING_ASSETS.hero,
    },
    {
      label: 'Corrugator Plant',
      title: 'Industrial Corrugator Line',
      location: 'Anandapuram Plant',
      desc: 'Heavy kraft paper reel feeding, steam heating, fluting, and automated slitting under controlled conditions.',
      src: PACKAGING_ASSETS.factory,
    },
    {
      label: 'Agro & Food Boxes',
      title: 'Ventilated Produce Containers',
      location: 'Perishable Exports',
      desc: 'Perforated 5-ply cartons designed for fruit, agricultural goods, and cold storage seafood shipments.',
      src: PACKAGING_ASSETS.agro,
    },
    {
      label: 'Die-Cut Cartons',
      title: 'Precision Die-Cut Cartons',
      location: 'Custom Engineering',
      desc: 'Self-locking mailers and precision inserts fabricated without requiring manual adhesive taping.',
      src: PACKAGING_ASSETS.diecut,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* ================================================== */}
      {/* 1. HERO SECTION                                   */}
      {/* ================================================== */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 pb-16 overflow-hidden bg-industrial-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#172228] border border-white/10 text-xs font-semibold text-[#F28B35] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F28B35]" />
                <span>Corrugated Packaging / Custom Boxes</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F6F5] leading-[1.1]">
                PACKAGING THAT <br className="hidden sm:inline" />
                <span className="text-[#F28B35]">FITS YOUR BUSINESS.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#A6B2B7] max-w-xl leading-relaxed">
                Explore corrugated and customized packaging solutions designed around your product requirements and business needs. Serving commercial enterprises across Visakhapatnam and coastal Andhra Pradesh.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => navigate('/request-quote')}
                  className="px-8 py-4 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <span>REQUEST A QUOTE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="px-7 py-4 rounded-xl bg-[#172228] hover:bg-[#202D34] text-[#F4F6F5] font-semibold text-sm border border-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <span>EXPLORE PRODUCTS</span>
                  <ArrowRight className="w-4 h-4 text-[#A6B2B7]" />
                </button>
              </div>

              {/* Verified Trust Line */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#A6B2B7]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />
                  <span>Custom Dimensions & Ply Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />
                  <span>Prompt Quotation Follow-up</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />
                  <span>Visakhapatnam Manufacturing</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#F28B35]/20 to-transparent blur-xl opacity-60" />

                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#172228] shadow-2xl">
                  {/* Interactive Visual Category Selector */}
                  <div className="p-2.5 bg-[#0B1114] border-b border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                    {heroShowcaseImages.map((img, idx) => (
                      <button
                        key={img.label}
                        onClick={() => setHeroShowcaseIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                          heroShowcaseIdx === idx
                            ? 'bg-[#F28B35] text-[#0B1114]'
                            : 'bg-[#172228] text-[#A6B2B7] hover:text-[#F4F6F5]'
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative aspect-[4/3] w-full bg-[#0B1114]">
                    <SafeImage
                      src={heroShowcaseImages[heroShowcaseIdx].src}
                      alt={heroShowcaseImages[heroShowcaseIdx].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172228] via-transparent to-transparent opacity-50" />
                  </div>

                  {/* Caption & Metadata Pill */}
                  <div className="p-5 bg-[#172228] border-t border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F28B35] font-semibold uppercase tracking-wider">
                        {heroShowcaseImages[heroShowcaseIdx].title}
                      </span>
                      <span className="text-[#A6B2B7] text-[11px]">
                        {heroShowcaseImages[heroShowcaseIdx].location}
                      </span>
                    </div>
                    <p className="text-xs text-[#A6B2B7] leading-relaxed">
                      {heroShowcaseImages[heroShowcaseIdx].desc}
                    </p>
                  </div>
                </div>

                {/* Floating quick spec badge */}
                <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#0B1114]/95 border border-white/15 backdrop-blur-md rounded-xl p-3.5 shadow-xl items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F28B35]/15 border border-[#F28B35]/30 flex items-center justify-center text-[#F28B35]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#F4F6F5] uppercase">
                      3-Ply • 5-Ply • 7-Ply
                    </div>
                    <div className="text-[10px] text-[#A6B2B7]">
                      Single, Double & Triple Wall Options
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. PRODUCT CATEGORIES                              */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
              Product Catalogue
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F4F6F5] tracking-tight">
              PACKAGING FOR DIFFERENT REQUIREMENTS.
            </h2>
            <p className="text-sm text-[#A6B2B7] max-w-xl">
              From lightweight parcel cartons to heavy-duty industrial shipping containers, explore our core corrugated packaging categories.
            </p>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#F28B35] hover:text-[#FFAB5C] transition-colors"
          >
            <span>View All 7 Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. WHY HANVISION ENTERPRISES                       */}
      {/* ================================================== */}
      <section className="bg-[#172228] border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
                Why Hanvision Enterprises
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F4F6F5] tracking-tight leading-tight">
                A PACKAGING PARTNER FOR YOUR BUSINESS.
              </h2>

              <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
                We believe practical packaging starts with understanding your actual product dimensions, vulnerability, and transportation routes. Rather than forcing one-size-fits-all boxes, we focus on responsive communication and tailored packaging fabrication.
              </p>

              {/* Verified Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#202D34] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F4F6F5] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />
                    <span>Customized Dimensions</span>
                  </div>
                  <p className="text-xs text-[#A6B2B7]">
                    Boxes built to match your exact CAD geometry and product tolerances.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#202D34] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F4F6F5] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />
                    <span>Multiple Ply Options</span>
                  </div>
                  <p className="text-xs text-[#A6B2B7]">
                    Choice of 3-ply, 5-ply, or 7-ply depending on weight and stacking rigour.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#202D34] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F4F6F5] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />
                    <span>Printing & Branding</span>
                  </div>
                  <p className="text-xs text-[#A6B2B7]">
                    Custom flexo printing for brand logos, shipping marks, and barcodes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#202D34] border border-white/5 space-y-1.5">
                  <div className="text-xs font-bold text-[#F4F6F5] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />
                    <span>Local Manufacturing</span>
                  </div>
                  <p className="text-xs text-[#A6B2B7]">
                    Based at Anandapuram, Visakhapatnam for responsive local coordination.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual showing structural fluting */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0B1114]">
                <SafeImage
                  src={PACKAGING_ASSETS.fluting}
                  alt="Corrugated Fluting Structure Architecture"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="p-6 bg-[#202D34] border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#F28B35]">
                    <Layers className="w-4 h-4" />
                    <span>Fluting Medium Cushioning Analysis</span>
                  </div>
                  <p className="text-xs text-[#A6B2B7] leading-relaxed">
                    The wave architecture in our corrugated boards acts as an engineered cushion, absorbing transit shock and providing high stacking stability for industrial cargo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3.5. INTERACTIVE BOX SPEC VISUALIZER               */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BoxSpecVisualizer />
      </section>

      {/* ================================================== */}
      {/* 4. MANUFACTURING PROCESS                           */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
            Our Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F4F6F5] tracking-tight">
            FROM REQUIREMENT TO PACKAGING.
          </h2>
          <p className="text-sm text-[#A6B2B7]">
            A structured, transparent manufacturing sequence designed to ensure the delivered cartons precisely meet your operational requirements.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANUFACTURING_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="bg-[#172228] border border-white/10 rounded-2xl p-6 relative flex flex-col justify-between hover:border-[#F28B35]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#202D34] text-[#F28B35] font-extrabold text-sm flex items-center justify-center border border-white/10">
                    0{step.stepNumber}
                  </span>
                  <span className="text-[11px] font-semibold text-[#A6B2B7] uppercase tracking-wider">
                    Step {step.stepNumber}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#F4F6F5] mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-[#A6B2B7] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1">
                {step.details.map((detail, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#F4F6F5]/80">
                    <span className="w-1 h-1 rounded-full bg-[#F28B35]" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/manufacturing')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#202D34] hover:bg-white/10 text-xs text-[#F4F6F5] font-bold border border-white/10 transition-colors"
          >
            <span>EXPLORE OUR CAPABILITIES</span>
            <ArrowRight className="w-4 h-4 text-[#F28B35]" />
          </button>
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. SOLUTIONS BY INDUSTRY                           */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#172228] border border-white/10 rounded-3xl p-8 sm:p-12">
          <div className="max-w-2xl space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
              Targeted Packaging Solutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F5] tracking-tight">
              PACKAGING TAILORED TO YOUR INDUSTRY SECTOR.
            </h2>
            <p className="text-sm text-[#A6B2B7]">
              Whether fulfilling customer e-commerce parcels or transporting heavy cast iron machine parts, we configure packaging to your sector&apos;s distribution challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SOLUTIONS_DATA.slice(0, 3).map((sol) => (
              <div
                key={sol.id}
                className="p-6 rounded-2xl bg-[#202D34] border border-white/5 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-[#F4F6F5]">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-[#A6B2B7] leading-relaxed mt-2">
                    {sol.shortDescription}
                  </p>
                  <div className="mt-3 inline-block px-2.5 py-1 rounded bg-[#0B1114] text-[11px] text-[#F28B35] font-medium border border-white/5">
                    Recommended: {sol.recommendedPly}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => navigate('/solutions')}
                    className="text-xs font-bold text-[#F4F6F5] hover:text-[#F28B35] transition-colors flex items-center gap-1"
                  >
                    <span>View solution details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F28B35]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. REQUEST A QUOTE BANNER CTA                      */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#202D34] via-[#172228] to-[#0B1114] border border-white/10 p-8 sm:p-12 lg:p-16">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F6F5] tracking-tight">
              HAVE A PACKAGING REQUIREMENT?
            </h2>
            <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
              Share your packaging requirements with our team so we can better understand your request. Provide dimensions, ply specifications, and expected order quantities for a prompt quotation discussion.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/request-quote')}
                className="px-8 py-3.5 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-sm tracking-wide shadow-lg transition-all flex items-center gap-2"
              >
                <span>REQUEST A QUOTE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3.5 rounded-xl bg-[#0B1114] hover:bg-white/5 text-[#F4F6F5] font-semibold text-sm border border-white/10 transition-colors"
              >
                CONTACT HANVISION
              </button>

              <WhatsAppButton variant="inline" buttonText="WhatsApp Enquiry" />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. LOCATION & VERIFIED FACILITY PREVIEW            */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-[#172228] border border-white/10 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#202D34] text-xs font-semibold text-[#F28B35]">
                <Factory className="w-3.5 h-3.5" />
                <span>Manufacturing Location</span>
              </div>

              <h3 className="text-2xl font-bold text-[#F4F6F5]">
                {companySettings.companyName}
              </h3>

              <div className="space-y-3 text-xs text-[#A6B2B7]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F28B35] flex-shrink-0 mt-0.5" />
                  <p className="text-[#F4F6F5] leading-relaxed">
                    {companySettings.address}, <br />
                    {companySettings.village} Village & Mandal, <br />
                    {companySettings.city}, {companySettings.state} - {companySettings.pincode}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#F28B35] flex-shrink-0" />
                  <a
                    href={`tel:${companySettings.phone}`}
                    className="text-[#F4F6F5] hover:text-[#F28B35] transition-colors"
                  >
                    {companySettings.displayPhone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#F28B35] flex-shrink-0" />
                  <a
                    href={`mailto:${companySettings.email}`}
                    className="text-[#F4F6F5] hover:text-[#F28B35] transition-colors"
                  >
                    {companySettings.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
              <a
                href={companySettings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F28B35] text-[#0B1114] font-bold text-xs hover:bg-[#FFAB5C] transition-all"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => navigate('/contact')}
                className="px-4 py-2.5 rounded-lg bg-[#202D34] hover:bg-white/10 text-xs font-semibold text-[#F4F6F5] border border-white/10 transition-colors"
              >
                Full Contact Details
              </button>
            </div>
          </div>

          {/* Interactive Google Map Embed Frame */}
          <div className="lg:col-span-7 bg-[#172228] border border-white/10 rounded-2xl overflow-hidden min-h-[340px] relative">
            <iframe
              title="Hanvision Enterprises Manufacturing Facility Location"
              src="https://maps.google.com/maps?q=Boni+Road+Anandapuram+Visakhapatnam+Andhra+Pradesh+530052&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              className="w-full h-full border-0 min-h-[340px] grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
