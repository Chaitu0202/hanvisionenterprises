import React from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';
import {
  ArrowUpRight,
  UserCheck,
  Building,
  Target,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { PACKAGING_ASSETS } from '../data/companyData';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();
  const { companySettings } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero / Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
          Company Profile
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F5] tracking-tight">
          ABOUT HANVISION ENTERPRISES.
        </h1>
        <p className="text-base sm:text-lg text-[#A6B2B7] leading-relaxed">
          A dedicated corrugated packaging manufacturer based in Anandapuram, Visakhapatnam District, committed to building strong, fit-for-purpose shipping boxes for local businesses and regional industries.
        </p>
      </div>

      {/* Leadership & Facility Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-[#F4F6F5]">
              Practical Packaging, Built with Care
            </h2>
            <p className="text-sm text-[#A6B2B7] leading-relaxed">
              At Hanvision Enterprises, we believe that packaging is more than a cardboard container—it is the first protective layer between your finished product and the hazards of transit. Under the leadership of CEO <strong className="text-[#F4F6F5]">{companySettings.ceoName}</strong>, our operation focuses on understanding customer requirements in detail before cutting paper.
            </p>
            <p className="text-sm text-[#A6B2B7] leading-relaxed">
              Located at Anandapuram along Boni Road in Visakhapatnam District, our facility is positioned to supply commercial distributors, food businesses, industrial workshops, and e-commerce companies with reliable packaging containers without prolonged turnaround delays.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#172228] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F4F6F5]">
                <Target className="w-4 h-4 text-[#F28B35]" />
                <span>Fit-for-Purpose Focus</span>
              </div>
              <p className="text-xs text-[#A6B2B7]">
                Every box is dimensioned and layered to withstand its intended payload and transit mode.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#172228] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F4F6F5]">
                <ShieldCheck className="w-4 h-4 text-[#F28B35]" />
                <span>Honest Specifications</span>
              </div>
              <p className="text-xs text-[#A6B2B7]">
                Clear and transparent ply, flute, and paper grades agreed upon before batch production.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#172228] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F4F6F5]">
                <UserCheck className="w-4 h-4 text-[#F28B35]" />
                <span>Direct Ownership Contact</span>
              </div>
              <p className="text-xs text-[#A6B2B7]">
                Direct communication with knowledgeable manufacturing personnel for fast adjustments.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#172228] border border-white/5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#F4F6F5]">
                <Building className="w-4 h-4 text-[#F28B35]" />
                <span>Regional Accountability</span>
              </div>
              <p className="text-xs text-[#A6B2B7]">
                Proudly rooted in Visakhapatnam, supporting local commercial commerce and employment.
              </p>
            </div>
          </div>
        </div>

        {/* Right Leadership & Facility Card */}
        <div className="lg:col-span-5 bg-[#172228] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
              Executive Leadership
            </span>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#202D34] border border-white/10 flex items-center justify-center text-[#F28B35] font-extrabold text-xl">
                RB
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F4F6F5]">
                  {companySettings.ceoName}
                </h3>
                <p className="text-xs text-[#A6B2B7]">
                  Chief Executive Officer • Hanvision Enterprises
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1114] border border-white/5 text-xs text-[#A6B2B7] leading-relaxed">
              &ldquo;Our focus is simple: listen closely to what the customer is packing, deliver boxes that keep that product safe, and maintain an honest and responsive relationship with every business client.&rdquo;
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6B2B7]">
              Facility & Location Overview
            </span>

            <div className="flex items-start gap-2.5 text-[#F4F6F5]">
              <MapPin className="w-4 h-4 text-[#F28B35] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#A6B2B7] leading-relaxed">
                <span className="text-[#F4F6F5] font-medium">{companySettings.address}</span>, <br />
                {companySettings.village} Village & Mandal, <br />
                {companySettings.city}, {companySettings.state} - {companySettings.pincode}
              </p>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#A6B2B7]">
              <Phone className="w-4 h-4 text-[#F28B35] flex-shrink-0" />
              <a href={`tel:${companySettings.phone}`} className="hover:text-[#F4F6F5]">
                {companySettings.displayPhone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-[#A6B2B7]">
              <Mail className="w-4 h-4 text-[#F28B35] flex-shrink-0" />
              <a href={`mailto:${companySettings.email}`} className="hover:text-[#F4F6F5]">
                {companySettings.email}
              </a>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={companySettings.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#202D34] hover:bg-white/10 text-xs font-semibold text-[#F4F6F5] flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <span>View Facility on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#F28B35]" />
            </a>
          </div>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="bg-[#172228] border border-white/10 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-[#F4F6F5]">
            Ready to partner on your upcoming packaging requirements?
          </h3>
          <p className="text-xs text-[#A6B2B7]">
            Connect directly with our team in Anandapuram to discuss your specifications or schedule a sample review.
          </p>
        </div>

        <button
          onClick={() => navigate('/request-quote')}
          className="px-6 py-3 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center gap-2 flex-shrink-0 transition-all shadow-md"
        >
          <span>Request a Quote</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
