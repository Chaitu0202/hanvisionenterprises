import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
          info: <Info className="w-5 h-5 text-[#F28B35] flex-shrink-0" />
        };

        const borders = {
          success: 'border-emerald-500/30 bg-[#172228]',
          error: 'border-rose-500/30 bg-[#172228]',
          info: 'border-[#F28B35]/30 bg-[#172228]'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl text-xs text-[#F4F6F5] ${borders[toast.type]} animate-fadeIn`}
          >
            {icons[toast.type]}
            <p className="flex-1 font-medium leading-relaxed">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#A6B2B7] hover:text-[#F4F6F5] transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
