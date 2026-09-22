import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import {
  Send,
  CheckCircle2,
  FileUp,
  AlertCircle,
  Phone,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { PRODUCTS_DATA } from '../data/companyData';

export const RequestQuotePage: React.FC = () => {
  const { queryParams, navigate } = useRouter();
  const {
    addInquiry,
    selectedQuoteProduct,
    setSelectedQuoteProduct,
    showToast,
    companySettings
  } = useApp();

  // Initial pre-fill from query or global state
  const productParam = queryParams.get('product');

  // Customer Details Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'whatsapp' | 'email'>('phone');

  // Packaging Requirements State
  const [productType, setProductType] = useState('3-Ply Corrugated Box');
  const [quantityRange, setQuantityRange] = useState('1,000–5,000');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [dimensionUnit, setDimensionUnit] = useState<'mm' | 'cm' | 'inch'>('mm');
  const [ply, setPly] = useState<'3-Ply' | '5-Ply' | '7-Ply' | 'Not Sure' | 'Other'>('3-Ply');
  const [printing, setPrinting] = useState<'Plain' | 'Printed' | 'Not Sure' | 'To Be Discussed'>('Plain');
  const [productBeingPacked, setProductBeingPacked] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Errors & submission state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  // Synchronize product pre-selection
  useEffect(() => {
    if (productParam) {
      const match = PRODUCTS_DATA.find((p) => p.slug === productParam);
      if (match) {
        setProductType(match.name);
        if (match.category.includes('3-Ply')) setPly('3-Ply');
        else if (match.category.includes('5-Ply')) setPly('5-Ply');
        else if (match.category.includes('7-Ply')) setPly('7-Ply');
      }
    } else if (selectedQuoteProduct) {
      setProductType(selectedQuoteProduct);
    }
  }, [productParam, selectedQuoteProduct]);

  // Handle fake or real file upload preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showToast('File size must be under 10MB', 'error');
        return;
      }
      setUploadedFileName(file.name);
      showToast(`Attached reference file: ${file.name}`, 'info');
    }
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }

    if (!mobile.trim()) {
      errs.mobile = 'Mobile phone number is required.';
    } else {
      const cleanPhone = mobile.replace(/[^0-9+]/g, '');
      if (cleanPhone.length < 8) {
        errs.mobile = 'Please enter a valid phone number with area/country code.';
      }
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format (e.g. name@company.com).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast('Please correct highlighted fields before submitting', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newId = addInquiry({
        customerName: fullName.trim(),
        companyName: companyName.trim() || 'Individual / Small Business',
        mobile: mobile.trim(),
        email: email.trim(),
        city: city.trim() || 'Visakhapatnam Area',
        preferredContact,
        productType,
        quantityRange,
        dimensions: {
          length: length.trim(),
          width: width.trim(),
          height: height.trim(),
          unit: dimensionUnit
        },
        ply,
        printing,
        productBeingPacked: productBeingPacked.trim() || 'Not specified',
        additionalRequirements: additionalRequirements.trim(),
        referenceFileName: uploadedFileName || undefined
      });

      setIsSubmitting(false);
      setSubmittedInquiryId(newId);
      showToast(`Inquiry #${newId} logged successfully`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setFullName('');
    setCompanyName('');
    setMobile('');
    setEmail('');
    setCity('');
    setLength('');
    setWidth('');
    setHeight('');
    setProductBeingPacked('');
    setAdditionalRequirements('');
    setUploadedFileName(null);
    setErrors({});
    setSelectedQuoteProduct(null);
    showToast('Quote form cleared', 'info');
  };

  const buildWhatsAppShareUrl = () => {
    const message = `Hello Hanvision Enterprises,

I have submitted a quotation inquiry (Ref: #${submittedInquiryId || 'NEW'}).

Product: ${productType}
Quantity: ${quantityRange}
Dimensions: ${length || 'TBD'} x ${width || 'TBD'} x ${height || 'TBD'} ${dimensionUnit}
Ply: ${ply}
Printing: ${printing}
Packaged Product: ${productBeingPacked || 'N/A'}
Customer: ${fullName} (${companyName || 'B2B'})
Phone: ${mobile}

Please review and confirm quotation details.`;

    return `https://wa.me/${companySettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // SUCCESS SCREEN
  if (submittedInquiryId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-[#172228] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Reference #{submittedInquiryId}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F5]">
              YOUR INQUIRY HAS BEEN RECEIVED.
            </h1>
            <p className="text-sm text-[#A6B2B7] max-w-lg mx-auto">
              Thank you, <strong className="text-[#F4F6F5]">{fullName}</strong>. Our manufacturing and sales team in Visakhapatnam will review your packaging specifications and follow up via {preferredContact}.
            </p>
          </div>

          {/* Inquiry Summary Box */}
          <div className="p-5 rounded-2xl bg-[#0B1114] border border-white/5 text-left text-xs space-y-3 max-w-lg mx-auto">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#A6B2B7]">Product Type:</span>
              <span className="text-[#F4F6F5] font-semibold">{productType}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#A6B2B7]">Quantity Range:</span>
              <span className="text-[#F4F6F5] font-semibold">{quantityRange} units</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#A6B2B7]">Ply Structure:</span>
              <span className="text-[#F4F6F5] font-semibold">{ply}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#A6B2B7]">Printing:</span>
              <span className="text-[#F4F6F5] font-semibold">{printing}</span>
            </div>
            {length && width && height && (
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-[#A6B2B7]">Target Dimensions:</span>
                <span className="text-[#F4F6F5] font-semibold">
                  {length} × {width} × {height} {dimensionUnit}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-1">
              <span className="text-[#A6B2B7]">Customer Contact:</span>
              <span className="text-[#F4F6F5] font-semibold">{mobile}</span>
            </div>
          </div>

          {/* Quick Follow-Up Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={buildWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Forward to Sales WhatsApp</span>
            </a>

            <a
              href={`tel:${companySettings.phone}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#202D34] hover:bg-white/10 text-[#F4F6F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F28B35]" />
              <span>Call Facility: {companySettings.displayPhone}</span>
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-4 text-xs text-[#A6B2B7]">
            <button
              onClick={() => {
                setSubmittedInquiryId(null);
                handleReset();
              }}
              className="hover:text-[#F28B35] transition-colors"
            >
              Submit Another Inquiry
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/products')}
              className="hover:text-[#F28B35] transition-colors"
            >
              Return to Catalog
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="hover:text-[#F28B35] transition-colors text-[11px]"
            >
              View in Admin Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Request a Quote' }]} />

      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
          Direct Quotation Desk
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F5] tracking-tight">
          TELL US WHAT YOU NEED.
        </h1>
        <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
          Share your packaging requirements and our manufacturing team can review the specifications with you. Provide dimensions, ply strength, and quantities for an accurate quotation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* ================================================== */}
        {/* STEP 1: CUSTOMER DETAILS                           */}
        {/* ================================================== */}
        <div className="bg-[#172228] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-lg font-bold text-[#F4F6F5] flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#F28B35] text-[#0B1114] text-xs font-extrabold flex items-center justify-center">
                1
              </span>
              <span>Customer & Business Information</span>
            </h2>
            <p className="text-xs text-[#A6B2B7] mt-1">
              Who should our quotation and technical team contact?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Full Name <span className="text-[#F28B35]">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                }}
                placeholder="e.g. Ramesh Kumar"
                className={`w-full px-4 py-3 rounded-xl bg-[#0B1114] border text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none transition-colors ${
                  errors.fullName ? 'border-rose-500' : 'border-white/10 focus:border-[#F28B35]'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Company / Enterprise Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g. Coastal Trading Co."
                className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35] transition-colors"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Mobile Number <span className="text-[#F28B35]">*</span>
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                  if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: '' }));
                }}
                placeholder="e.g. +91 98480 12345"
                className={`w-full px-4 py-3 rounded-xl bg-[#0B1114] border text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none transition-colors ${
                  errors.mobile ? 'border-rose-500' : 'border-white/10 focus:border-[#F28B35]'
                }`}
              />
              {errors.mobile && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.mobile}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="e.g. purchasing@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-[#0B1114] border text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none transition-colors ${
                  errors.email ? 'border-rose-500' : 'border-white/10 focus:border-[#F28B35]'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* City / Location */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                City / Delivery Location
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Visakhapatnam, Vizianagaram, Gajuwaka"
                className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35] transition-colors"
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Preferred Contact Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'phone', label: 'Phone Call' },
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'email', label: 'Email' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPreferredContact(item.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      preferredContact === item.id
                        ? 'bg-[#F28B35] text-[#0B1114] border-[#F28B35]'
                        : 'bg-[#0B1114] text-[#A6B2B7] border-white/10 hover:border-white/25'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* STEP 2: PACKAGING REQUIREMENTS                     */}
        {/* ================================================== */}
        <div className="bg-[#172228] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-lg font-bold text-[#F4F6F5] flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#F28B35] text-[#0B1114] text-xs font-extrabold flex items-center justify-center">
                2
              </span>
              <span>Packaging Specifications & Quantities</span>
            </h2>
            <p className="text-xs text-[#A6B2B7] mt-1">
              Select your required box category, dimensions, and structural options.
            </p>
          </div>

          <div className="space-y-6">
            {/* Product Type Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-2">
                Product Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  '3-Ply Corrugated Box',
                  '5-Ply Corrugated Box',
                  '7-Ply Corrugated Box',
                  'Customized Packaging Box',
                  'Food Packaging Box',
                  'Mono Carton',
                  'Corrugated Packaging Box',
                  'Not Sure / Need Consultation'
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setProductType(cat);
                      if (cat.includes('3-Ply')) setPly('3-Ply');
                      else if (cat.includes('5-Ply')) setPly('5-Ply');
                      else if (cat.includes('7-Ply')) setPly('7-Ply');
                    }}
                    className={`p-3 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                      productType === cat
                        ? 'bg-[#202D34] text-[#F28B35] border-[#F28B35] ring-1 ring-[#F28B35]/40 font-bold'
                        : 'bg-[#0B1114] text-[#F4F6F5] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <span>{cat}</span>
                    {productType === cat && <CheckCircle2 className="w-4 h-4 text-[#F28B35]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Dimensions */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase text-[#A6B2B7]">
                  Dimensions (Inner / Outer)
                </label>
                <div className="flex items-center gap-1 bg-[#0B1114] p-1 rounded-lg border border-white/10 text-[11px]">
                  {(['mm', 'cm', 'inch'] as const).map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setDimensionUnit(unit)}
                      className={`px-2 py-0.5 rounded font-semibold uppercase ${
                        dimensionUnit === unit
                          ? 'bg-[#F28B35] text-[#0B1114]'
                          : 'text-[#A6B2B7] hover:text-[#F4F6F5]'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder={`Length (${dimensionUnit})`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder={`Width (${dimensionUnit})`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder={`Height (${dimensionUnit})`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[#A6B2B7] mt-1.5">
                Leave blank if you are unsure; our team can determine optimal dimensions based on your physical product sample.
              </p>
            </div>

            {/* Quantity Range */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-2">
                Required Order Quantity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {['Below 100', '100–500', '500–1,000', '1,000–5,000', '5,000+', 'Not Sure'].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setQuantityRange(qty)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                      quantityRange === qty
                        ? 'bg-[#F28B35] text-[#0B1114] border-[#F28B35]'
                        : 'bg-[#0B1114] text-[#F4F6F5] border-white/10 hover:border-white/25'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            {/* Ply & Printing Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Ply Structure */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-2">
                  Ply Structure
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['3-Ply', '5-Ply', '7-Ply', 'Not Sure', 'Other'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPly(p as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        ply === p
                          ? 'bg-[#202D34] text-[#F28B35] border-[#F28B35]'
                          : 'bg-[#0B1114] text-[#A6B2B7] border-white/10 hover:border-white/20'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Printing */}
              <div>
                <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-2">
                  Printing Requirement
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Plain', 'Printed', 'Not Sure', 'To Be Discussed'].map((prt) => (
                    <button
                      key={prt}
                      type="button"
                      onClick={() => setPrinting(prt as any)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        printing === prt
                          ? 'bg-[#202D34] text-[#F28B35] border-[#F28B35]'
                          : 'bg-[#0B1114] text-[#A6B2B7] border-white/10 hover:border-white/20'
                      }`}
                    >
                      {prt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Being Packed */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Product Being Packed
              </label>
              <input
                type="text"
                value={productBeingPacked}
                onChange={(e) => setProductBeingPacked(e.target.value)}
                placeholder="e.g. Frozen seafood, electrical switchgear, spices, apparel, machine spares"
                className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            {/* Additional Requirements */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Additional Requirements / Special Notes
              </label>
              <textarea
                rows={3}
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="Please describe your product weight, preferred box style (e.g. RSC, die-cut), internal dividers, moisture protection, or delivery deadlines."
                className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            {/* Reference File / PDF upload */}
            <div>
              <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Attach Reference Drawing / Image / PDF (Optional)
              </label>
              <div className="relative border-2 border-dashed border-white/10 hover:border-[#F28B35]/50 rounded-2xl p-6 text-center transition-colors bg-[#0B1114]/60">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".png,.jpg,.jpeg,.pdf,.dwg"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-2 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-[#172228] flex items-center justify-center mx-auto text-[#F28B35]">
                    <FileUp className="w-5 h-5" />
                  </div>
                  {uploadedFileName ? (
                    <p className="text-xs text-emerald-400 font-semibold">
                      Attached: {uploadedFileName}
                    </p>
                  ) : (
                    <>
                      <p className="text-xs text-[#F4F6F5] font-medium">
                        Click or drag drawing / die-line PDF here
                      </p>
                      <p className="text-[11px] text-[#A6B2B7]">
                        Supports PDF, PNG, JPG up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* STEP 3: PRIVACY CONSENT & SUBMIT                   */}
        {/* ================================================== */}
        <div className="bg-[#172228] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-3 text-xs text-[#A6B2B7] bg-[#0B1114] p-4 rounded-xl border border-white/5">
            <Info className="w-4 h-4 text-[#F28B35] flex-shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#F4F6F5]">B2B Privacy Notice:</strong> The information you share is used exclusively by Hanvision Enterprises to analyze box structural requirements and prepare a quotation. We do not automatically subscribe users to marketing spam.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#202D34] hover:bg-white/10 text-xs text-[#A6B2B7] hover:text-[#F4F6F5] font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 active:scale-98"
            >
              {isSubmitting ? (
                <span>Logging Inquiry...</span>
              ) : (
                <>
                  <span>SUBMIT INQUIRY</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
