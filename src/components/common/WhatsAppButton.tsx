import React, { useState } from 'react';
import { MessageCircle, X, Send, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WhatsAppButtonProps {
  customMessage?: string;
  buttonText?: string;
  variant?: 'floating' | 'inline';
  className?: string;
  productName?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  customMessage,
  buttonText = 'Chat on WhatsApp',
  variant = 'floating',
  className = '',
  productName,
}) => {
  const { companySettings } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState(productName || 'Corrugated Packaging Boxes');
  const [quantity, setQuantity] = useState('1,000–5,000 units');
  const [notes, setNotes] = useState('Looking for pricing and delivery discussion.');

  const buildUrl = (msg?: string) => {
    const textToSend =
      msg ||
      customMessage ||
      `Hello Hanvision Enterprises,

I would like to inquire about packaging.

Product: ${product}
Quantity: ${quantity}
Additional Requirements: ${notes}

Please let me know the next steps.`;

    const encoded = encodeURIComponent(textToSend.trim());
    return `https://wa.me/${companySettings.whatsappNumber}?text=${encoded}`;
  };

  const handleDirectLaunch = () => {
    window.open(buildUrl(), '_blank', 'noopener,noreferrer');
  };

  if (variant === 'inline') {
    return (
      <button
        onClick={() => setModalOpen(true)}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-sm ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>{buttonText}</span>
      </button>
    );
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95 border border-emerald-400/30"
          aria-label="Chat on WhatsApp with Hanvision Enterprises"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline font-semibold">WhatsApp Inquiry</span>
        </button>
      </div>

      {/* WhatsApp Quick Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#172228] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-[#202D34] p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-[#F4F6F5] text-base leading-tight">
                    Hanvision Enterprises
                  </h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Packaging Sales WhatsApp Desk
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-[#A6B2B7] hover:text-[#F4F6F5] hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-sm">
              <p className="text-xs text-[#A6B2B7] leading-relaxed">
                Connect directly with our Visakhapatnam manufacturing team. Review or adjust your inquiry details before launching WhatsApp:
              </p>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                  Product Type
                </label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0B1114] border border-white/10 text-[#F4F6F5] text-xs focus:outline-none focus:border-[#F28B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                  Estimated Quantity
                </label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0B1114] border border-white/10 text-[#F4F6F5] text-xs focus:outline-none focus:border-[#F28B35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-[#A6B2B7] mb-1.5">
                  Requirement Note / Dimensions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-[#0B1114] border border-white/10 text-[#F4F6F5] text-xs focus:outline-none focus:border-[#F28B35]"
                />
              </div>

              <div className="pt-2">
                <a
                  href={buildUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Launch WhatsApp Chat</span>
                </a>
              </div>

              <p className="text-[11px] text-center text-[#A6B2B7]/70">
                Direct business number: {companySettings.displayPhone}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
