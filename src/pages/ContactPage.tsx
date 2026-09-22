import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  Building
} from 'lucide-react';
import { WhatsAppButton } from '../components/common/WhatsAppButton';

export const ContactPage: React.FC = () => {
  const { navigate } = useRouter();
  const { companySettings, showToast, addInquiry } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Packaging Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast('Please provide your name, phone number, and message.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addInquiry({
        customerName: name.trim(),
        companyName: 'Contact Form Message',
        mobile: phone.trim(),
        email: email.trim(),
        city: 'Visakhapatnam Area',
        preferredContact: 'phone',
        productType: subject,
        quantityRange: 'Contact Message',
        dimensions: { length: '', width: '', height: '', unit: 'mm' },
        ply: 'Not Sure',
        printing: 'To Be Discussed',
        productBeingPacked: subject,
        additionalRequirements: message.trim()
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Your message has been sent to Hanvision Enterprises.', 'success');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F4F6F5] tracking-tight">
          TALK TO OUR PACKAGING TEAM.
        </h1>
        <p className="text-sm sm:text-base text-[#A6B2B7] leading-relaxed">
          Whether you need a quick discussion regarding box specifications, want to schedule a visit to our facility, or need a preliminary quotation, our team in Visakhapatnam is ready to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Verified Facility Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#172228] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F28B35]">
                Manufacturing Facility & Office
              </span>
              <h2 className="text-2xl font-bold text-[#F4F6F5]">
                {companySettings.companyName}
              </h2>
              <p className="text-xs text-[#A6B2B7]">
                Leadership: <strong className="text-[#F4F6F5]">{companySettings.ceoName}</strong>, CEO
              </p>
            </div>

            {/* Address */}
            <div className="space-y-4 text-xs text-[#A6B2B7]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F28B35] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#F4F6F5] text-sm mb-0.5">
                    Physical Address
                  </p>
                  <p className="leading-relaxed">
                    {companySettings.address}, <br />
                    {companySettings.village} Village & Mandal, <br />
                    {companySettings.city}, {companySettings.state} - {companySettings.pincode}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F28B35] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#F4F6F5] text-sm mb-0.5">
                    Telephone / Mobile
                  </p>
                  <a
                    href={`tel:${companySettings.phone}`}
                    className="text-[#F4F6F5] hover:text-[#F28B35] transition-colors font-medium text-sm"
                  >
                    {companySettings.displayPhone}
                  </a>
                  <p className="text-[11px] text-[#A6B2B7] mt-0.5">
                    Business inquiry phone line
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#F28B35] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#F4F6F5] text-sm mb-0.5">
                    Email Correspondence
                  </p>
                  <a
                    href={`mailto:${companySettings.email}`}
                    className="text-[#F4F6F5] hover:text-[#F28B35] transition-colors break-all"
                  >
                    {companySettings.email}
                  </a>
                  <p className="text-[11px] text-[#A6B2B7] mt-0.5">
                    Official company quotation desk
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#F28B35] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#F4F6F5] text-sm mb-0.5">
                    Facility Operating Hours
                  </p>
                  <p>Monday – Saturday: 9:00 AM – 6:30 PM</p>
                  <p className="text-[11px] text-[#A6B2B7] mt-0.5">Sunday: Closed for routine maintenance</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href={companySettings.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#202D34] hover:bg-white/10 text-xs font-semibold text-[#F4F6F5] flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#F28B35]" />
                <span>Open in Google Maps</span>
              </a>

              <WhatsAppButton
                variant="inline"
                buttonText="Direct WhatsApp Chat"
                className="w-full justify-center py-3"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#172228] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl font-bold text-[#F4F6F5]">
                Send a Message to Hanvision
              </h2>
              <p className="text-xs text-[#A6B2B7] mt-1">
                Fill in your contact details below and our team will get in touch promptly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#F4F6F5]">
                  Message Successfully Delivered!
                </h3>
                <p className="text-xs text-[#A6B2B7] max-w-sm mx-auto">
                  Thank you for reaching out. We have received your query and will reply via phone or email during standard business hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#202D34] text-xs font-semibold text-[#F4F6F5] hover:bg-white/10 transition-colors"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                    Your Name <span className="text-[#F28B35]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                      Phone Number <span className="text-[#F28B35]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98480 12345"
                      className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                    Subject / Reason for Inquiry
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
                  >
                    <option value="General Packaging Inquiry">General Packaging Inquiry</option>
                    <option value="3-Ply Corrugated Box Supply">3-Ply Corrugated Box Supply</option>
                    <option value="5-Ply Heavy Industrial Box Supply">5-Ply Heavy Industrial Box Supply</option>
                    <option value="7-Ply Heavy Duty Shipping Containers">7-Ply Heavy Duty Shipping Containers</option>
                    <option value="Custom Die-Cut Box Development">Custom Die-Cut Box Development</option>
                    <option value="Packaging Sample Evaluation">Packaging Sample Evaluation</option>
                    <option value="Visit to Anandapuram Facility">Visit to Anandapuram Facility</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                    Your Message / Requirements <span className="text-[#F28B35]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you are packing, your estimated monthly volumes, or any questions you have."
                    className="w-full px-4 py-3 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] placeholder-[#A6B2B7]/50 focus:outline-none focus:border-[#F28B35]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Google Map Section */}
      <div className="bg-[#172228] border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#F4F6F5]">
              Google Maps Location
            </h3>
            <p className="text-xs text-[#A6B2B7]">
              Boni Road, Anandapuram Village & Mandal, Visakhapatnam District - 530052
            </p>
          </div>
          <a
            href={companySettings.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F28B35] hover:text-[#FFAB5C] transition-colors"
          >
            <span>Open in Maps App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="h-[360px] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#0B1114]">
          <iframe
            title="Hanvision Enterprises Facility Map Location"
            src="https://maps.google.com/maps?q=Boni+Road+Anandapuram+Visakhapatnam+Andhra+Pradesh+530052&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
