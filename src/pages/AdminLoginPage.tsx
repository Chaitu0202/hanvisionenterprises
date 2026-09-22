import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { BrandLogo } from '../components/common/BrandLogo';
import { ShieldCheck, Lock, User, ArrowRight, Info } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { navigate } = useRouter();
  const { adminAuth, loginAdmin, showToast } = useApp();

  const [username, setUsername] = useState('admin@hanvision.in');
  const [password, setPassword] = useState('hanvision2025');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = loginAdmin(username, password);
    setIsSubmitting(false);

    if (success) {
      showToast('Admin access granted', 'success');
      navigate('/admin/dashboard');
    } else {
      showToast('Invalid credentials. Use demo credentials provided below.', 'error');
    }
  };

  const handleDemoFill = () => {
    setUsername('admin@hanvision.in');
    setPassword('hanvision2025');
    showToast('Demo admin credentials populated', 'info');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#172228] border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#202D34] text-[#F28B35] border border-white/10 mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#F4F6F5]">
            Staff Portal Login
          </h1>

          <p className="text-xs text-[#A6B2B7]">
            Management dashboard for Hanvision Enterprises sales inquiries and product catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
              Staff Email / ID
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#A6B2B7] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A6B2B7] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="p-4 rounded-2xl bg-[#0B1114] border border-white/5 space-y-2.5 text-xs text-[#A6B2B7]">
          <div className="flex items-center gap-1.5 text-[#F28B35] font-semibold">
            <Info className="w-3.5 h-3.5" />
            <span>Proposal Evaluation Demo Credentials</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Email: <code className="text-[#F4F6F5] bg-[#172228] px-1 rounded">admin@hanvision.in</code><br />
            Password: <code className="text-[#F4F6F5] bg-[#172228] px-1 rounded">hanvision2025</code>
          </p>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-[11px] text-[#F28B35] hover:underline block pt-1 font-semibold"
          >
            Click here to Auto-Fill Credentials
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#A6B2B7] hover:text-[#F4F6F5] transition-colors"
          >
            ← Return to Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
