import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useApp } from '../context/AppContext';
import { Inquiry, CompanySettings, Product, InquiryStatus } from '../types';
import {
  ShieldCheck,
  LogOut,
  ExternalLink,
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  Clock,
  Archive,
  Save,
  Trash2,
  Eye,
  X,
  FileText,
  Sliders,
  Layers,
  Building
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const {
    adminAuth,
    logoutAdmin,
    inquiries,
    updateInquiryStatus,
    addInquiryNote,
    deleteInquiry,
    companySettings,
    updateCompanySettings,
    products,
    toggleProductPopular,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'settings' | 'catalog'>('inquiries');

  // Inquiries Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [noteInput, setNoteInput] = useState('');

  // Settings State (copy from context)
  const [settingsForm, setSettingsForm] = useState<CompanySettings>({ ...companySettings });

  // If not authenticated, redirect to login
  if (!adminAuth.isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-[#172228] border border-white/10 rounded-3xl text-center space-y-4">
        <ShieldCheck className="w-12 h-12 text-[#F28B35] mx-auto" />
        <h2 className="text-xl font-bold text-[#F4F6F5]">Authentication Required</h2>
        <p className="text-xs text-[#A6B2B7]">
          Please sign in to access the Hanvision Enterprises quotation management dashboard.
        </p>
        <button
          onClick={() => navigate('/admin/login')}
          className="px-6 py-2.5 rounded-xl bg-[#F28B35] text-[#0B1114] font-bold text-xs"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      inq.customerName.toLowerCase().includes(query) ||
      inq.companyName.toLowerCase().includes(query) ||
      inq.mobile.includes(query) ||
      inq.productType.toLowerCase().includes(query) ||
      inq.id.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // Stats calculation
  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === 'New').length;
  const contactedCount = inquiries.filter((i) => i.status === 'Contacted').length;
  const quotedCount = inquiries.filter((i) => i.status === 'Quotation Sent').length;

  const handleExportCSV = () => {
    const headers = [
      'Inquiry ID',
      'Date',
      'Status',
      'Customer',
      'Company',
      'Phone',
      'Email',
      'City',
      'Product',
      'Quantity',
      'Ply',
      'Printing',
      'Length',
      'Width',
      'Height',
      'Unit',
      'Requirements'
    ];

    const rows = inquiries.map((i) => [
      i.id,
      new Date(i.createdAt).toLocaleDateString(),
      i.status,
      `"${i.customerName}"`,
      `"${i.companyName}"`,
      `"${i.mobile}"`,
      `"${i.email || ''}"`,
      `"${i.city || ''}"`,
      `"${i.productType}"`,
      `"${i.quantityRange}"`,
      `"${i.ply}"`,
      `"${i.printing}"`,
      i.dimensions?.length || '',
      i.dimensions?.width || '',
      i.dimensions?.height || '',
      i.dimensions?.unit || '',
      `"${(i.additionalRequirements || '').replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Hanvision_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Inquiries exported to CSV', 'success');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanySettings(settingsForm);
    showToast('Company profile & contact details updated across website', 'success');
  };

  const handleAddNote = () => {
    if (!selectedInquiry || !noteInput.trim()) return;
    addInquiryNote(selectedInquiry.id, noteInput.trim());
    setNoteInput('');
    // refresh selected inquiry in modal
    const updated = inquiries.find((i) => i.id === selectedInquiry.id);
    if (updated) setSelectedInquiry(updated);
    showToast('Internal note saved', 'success');
  };

  const statusBadges: Record<InquiryStatus, string> = {
    'New': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    'Contacted': 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    'Quotation Sent': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Negotiation': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    'Won': 'bg-green-500/10 text-green-400 border-green-500/30',
    'Lost': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    'On Hold': 'bg-white/5 text-[#A6B2B7] border-white/10'
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#F28B35] font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Staff Administration Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F4F6F5]">
            Hanvision Quotations & Orders
          </h1>
          <p className="text-xs text-[#A6B2B7]">
            Review incoming packaging requests, update fulfillment stages, and manage contact settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-xl bg-[#202D34] hover:bg-white/10 text-xs text-[#F4F6F5] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              navigate('/admin/login');
            }}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-rose-500/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'inquiries'
              ? 'bg-[#F28B35] text-[#0B1114]'
              : 'bg-[#172228] text-[#A6B2B7] hover:text-[#F4F6F5]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Quotations & Inquiries ({inquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'catalog'
              ? 'bg-[#F28B35] text-[#0B1114]'
              : 'bg-[#172228] text-[#A6B2B7] hover:text-[#F4F6F5]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-[#F28B35] text-[#0B1114]'
              : 'bg-[#172228] text-[#A6B2B7] hover:text-[#F4F6F5]'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Facility & Contact Settings</span>
        </button>
      </div>

      {/* ================================================== */}
      {/* TAB 1: INQUIRIES & QUOTATIONS                      */}
      {/* ================================================== */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#172228] border border-white/5 space-y-1">
              <span className="text-[11px] font-semibold text-[#A6B2B7] uppercase tracking-wider">
                Total Inquiries
              </span>
              <div className="text-2xl font-extrabold text-[#F4F6F5]">{totalCount}</div>
              <p className="text-[10px] text-[#A6B2B7]">Logged across all channels</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#172228] border border-amber-500/20 space-y-1">
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>New / Pending</span>
              </span>
              <div className="text-2xl font-extrabold text-amber-400">{newCount}</div>
              <p className="text-[10px] text-[#A6B2B7]">Awaiting initial technical review</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#172228] border border-sky-500/20 space-y-1">
              <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>Contacted</span>
              </span>
              <div className="text-2xl font-extrabold text-sky-400">{contactedCount}</div>
              <p className="text-[10px] text-[#A6B2B7]">Customer discussion initiated</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#172228] border border-emerald-500/20 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Quote Sent</span>
              </span>
              <div className="text-2xl font-extrabold text-emerald-400">{quotedCount}</div>
              <p className="text-[10px] text-[#A6B2B7]">Pricing proposal submitted</p>
            </div>
          </div>

          {/* Filtering & Action Bar */}
          <div className="bg-[#172228] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-[#A6B2B7] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, company, phone, ID..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B1114] border border-white/10 text-xs text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <span className="text-xs text-[#A6B2B7] uppercase font-semibold mr-1">Status:</span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase transition-all whitespace-nowrap ${
                  statusFilter === 'all'
                    ? 'bg-[#F28B35] text-[#0B1114] font-bold'
                    : 'bg-[#202D34] text-[#A6B2B7] hover:text-[#F4F6F5]'
                }`}
              >
                ALL
              </button>
              {(['New', 'Contacted', 'Quotation Sent', 'Won'] as InquiryStatus[]).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase transition-all whitespace-nowrap ${
                    statusFilter === st
                      ? 'bg-[#F28B35] text-[#0B1114] font-bold'
                      : 'bg-[#202D34] text-[#A6B2B7] hover:text-[#F4F6F5]'
                  }`}
                >
                  {st}
                </button>
              ))}

              <button
                onClick={handleExportCSV}
                className="ml-auto px-3.5 py-1.5 rounded-lg bg-[#202D34] hover:bg-white/10 text-xs font-semibold text-[#F4F6F5] border border-white/10 flex items-center gap-1.5 transition-colors whitespace-nowrap"
                title="Export list to CSV file"
              >
                <Download className="w-3.5 h-3.5 text-[#F28B35]" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-[#172228] border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#A6B2B7]">
                <thead className="bg-[#202D34] text-[11px] uppercase tracking-wider text-[#F4F6F5]">
                  <tr>
                    <th className="py-3 px-4">Ref ID / Date</th>
                    <th className="py-3 px-4">Customer & Enterprise</th>
                    <th className="py-3 px-4">Product Requested</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInquiries.length > 0 ? (
                    filteredInquiries.map((inq) => {
                      return (
                        <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4">
                            <span className="font-bold text-[#F4F6F5] block font-mono">
                              #{inq.id}
                            </span>
                            <span className="text-[10px] text-[#A6B2B7]/70">
                              {new Date(inq.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-semibold text-[#F4F6F5] block">
                              {inq.customerName}
                            </span>
                            <span className="text-[11px] text-[#A6B2B7]">
                              {inq.companyName || 'B2B Client'} • {inq.mobile}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className="text-[#F4F6F5] font-medium block">
                              {inq.productType}
                            </span>
                            <span className="text-[10px] text-[#F28B35]">
                              {inq.ply} • {inq.printing}
                            </span>
                          </td>

                          <td className="py-4 px-4 font-medium text-[#F4F6F5]">
                            {inq.quantityRange}
                          </td>

                          <td className="py-4 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) =>
                                updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                              }
                              className={`text-[10px] font-bold uppercase rounded-lg px-2.5 py-1 border focus:outline-none ${
                                statusBadges[inq.status] || 'bg-white/5 text-[#A6B2B7]'
                              }`}
                            >
                              {(['New', 'Contacted', 'Quotation Sent', 'Negotiation', 'Won', 'Lost', 'On Hold'] as InquiryStatus[]).map(
                                (opt) => (
                                  <option key={opt} value={opt} className="bg-[#172228] text-[#F4F6F5]">
                                    {opt.toUpperCase()}
                                  </option>
                                )
                              )}
                            </select>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                className="p-1.5 rounded-lg bg-[#202D34] hover:bg-white/10 text-[#F4F6F5]"
                                title="Inspect Full Specifications"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <a
                                href={`tel:${inq.mobile}`}
                                className="p-1.5 rounded-lg bg-[#202D34] hover:bg-white/10 text-emerald-400"
                                title="Call customer"
                              >
                                <Phone className="w-4 h-4" />
                              </a>

                              <a
                                href={`https://wa.me/${inq.mobile.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-[#202D34] hover:bg-white/10 text-emerald-400"
                                title="WhatsApp chat"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>

                              <button
                                onClick={() => {
                                  if (confirm(`Delete inquiry #${inq.id}?`)) {
                                    deleteInquiry(inq.id);
                                    showToast(`Inquiry #${inq.id} removed`, 'info');
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-[#202D34] hover:bg-rose-500/20 text-[#A6B2B7] hover:text-rose-400"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-xs text-[#A6B2B7]">
                        No packaging inquiries match your active filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* TAB 2: PACKAGING CATALOG MANAGEMENT               */}
      {/* ================================================== */}
      {activeTab === 'catalog' && (
        <div className="bg-[#172228] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-lg font-bold text-[#F4F6F5]">
              Packaging Product Catalog
            </h2>
            <p className="text-xs text-[#A6B2B7] mt-0.5">
              Review and toggle product spotlighting on the website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-[#202D34] border border-white/5 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-[#F28B35] bg-[#0B1114] px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    <button
                      onClick={() => {
                        toggleProductPopular(p.id);
                        showToast(`Updated popular flag for ${p.name}`, 'info');
                      }}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                        p.isPopular
                          ? 'bg-[#F28B35] text-[#0B1114]'
                          : 'bg-white/10 text-[#A6B2B7]'
                      }`}
                    >
                      {p.isPopular ? 'Featured' : 'Standard'}
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-[#F4F6F5]">{p.name}</h3>
                  <p className="text-xs text-[#A6B2B7] line-clamp-2">
                    {p.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => navigate(`/products/${p.slug}`)}
                    className="text-xs text-[#F28B35] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* TAB 3: COMPANY SETTINGS & CONTACT CONFIGURATION    */}
      {/* ================================================== */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-[#172228] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-white/5 pb-4">
            <h2 className="text-lg font-bold text-[#F4F6F5]">
              Verified Business & Facility Information
            </h2>
            <p className="text-xs text-[#A6B2B7] mt-0.5">
              Updates made here immediately propagate to the website navbar, footer, contact section, and quotation messages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Company Legal Name
              </label>
              <input
                type="text"
                value={settingsForm.companyName}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, companyName: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                CEO / Leadership Name
              </label>
              <input
                type="text"
                value={settingsForm.ceoName}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, ceoName: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Display Phone Number
              </label>
              <input
                type="text"
                value={settingsForm.displayPhone}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, displayPhone: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                WhatsApp Number (International with Country Code)
              </label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                value={settingsForm.email}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, email: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Google Maps URL
              </label>
              <input
                type="text"
                value={settingsForm.mapsUrl}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, mapsUrl: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold uppercase text-[#A6B2B7] mb-1.5">
                Facility Physical Address
              </label>
              <textarea
                rows={2}
                value={settingsForm.address}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, address: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-[#0B1114] border border-white/10 text-sm text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#F28B35] hover:bg-[#FFAB5C] text-[#0B1114] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Business Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* ================================================== */}
      {/* INQUIRY DETAIL MODAL                               */}
      {/* ================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#172228] border border-white/15 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-[#F28B35] uppercase tracking-wider">
                  Inquiry Review
                </span>
                <h2 className="text-xl font-bold text-[#F4F6F5]">
                  Reference #{selectedInquiry.id}
                </h2>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-lg text-[#A6B2B7] hover:text-[#F4F6F5] hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Details */}
            <div className="bg-[#0B1114] p-4 rounded-xl border border-white/5 space-y-2 text-xs">
              <span className="font-bold text-[#F28B35] uppercase text-[10px]">
                Customer Profile
              </span>
              <div className="grid grid-cols-2 gap-2 text-[#F4F6F5]">
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Name:</span>
                  <span className="font-semibold">{selectedInquiry.customerName}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Company:</span>
                  <span>{selectedInquiry.companyName}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Phone:</span>
                  <a href={`tel:${selectedInquiry.mobile}`} className="text-[#F28B35] hover:underline font-semibold">
                    {selectedInquiry.mobile}
                  </a>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Email:</span>
                  <span>{selectedInquiry.email || 'None provided'}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Location:</span>
                  <span>{selectedInquiry.city || 'Visakhapatnam Area'}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Preferred Contact:</span>
                  <span className="capitalize">{selectedInquiry.preferredContact}</span>
                </div>
              </div>
            </div>

            {/* Packaging Specifications */}
            <div className="bg-[#0B1114] p-4 rounded-xl border border-white/5 space-y-2 text-xs">
              <span className="font-bold text-[#F28B35] uppercase text-[10px]">
                Packaging Specification
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[#F4F6F5]">
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Box Category:</span>
                  <span className="font-semibold">{selectedInquiry.productType}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Required Quantity:</span>
                  <span className="font-semibold">{selectedInquiry.quantityRange}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Ply Type:</span>
                  <span>{selectedInquiry.ply}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Printing:</span>
                  <span>{selectedInquiry.printing}</span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Dimensions (L × W × H):</span>
                  <span>
                    {selectedInquiry.dimensions?.length && selectedInquiry.dimensions?.width && selectedInquiry.dimensions?.height
                      ? `${selectedInquiry.dimensions.length} × ${selectedInquiry.dimensions.width} × ${selectedInquiry.dimensions.height} ${selectedInquiry.dimensions.unit}`
                      : 'Dimensions not specified (Sample discussion)'}
                  </span>
                </div>
                <div>
                  <span className="text-[#A6B2B7] block text-[10px]">Product Packed:</span>
                  <span>{selectedInquiry.productBeingPacked || 'General Goods'}</span>
                </div>
              </div>

              {selectedInquiry.additionalRequirements && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[#A6B2B7] block text-[10px]">Customer Notes:</span>
                  <p className="text-xs text-[#F4F6F5] leading-relaxed pt-0.5">
                    {selectedInquiry.additionalRequirements}
                  </p>
                </div>
              )}

              {selectedInquiry.referenceFileName && (
                <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-emerald-400">
                  <FileText className="w-4 h-4" />
                  <span>Attached Reference File: {selectedInquiry.referenceFileName}</span>
                </div>
              )}
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-[#A6B2B7]">
                Internal Staff Notes
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="e.g. Quoted ₹38/box for 2000 units on 22/09"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#0B1114] border border-white/10 text-xs text-[#F4F6F5] focus:outline-none focus:border-[#F28B35]"
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="px-4 py-2 rounded-xl bg-[#202D34] hover:bg-white/10 text-xs font-semibold text-[#F4F6F5]"
                >
                  Save Note
                </button>
              </div>

              {selectedInquiry.internalNotes && selectedInquiry.internalNotes.trim().length > 0 && (
                <ul className="space-y-1.5 pt-2">
                  {selectedInquiry.internalNotes
                    .split('\n')
                    .filter((line: string) => line.trim().length > 0)
                    .map((note: string, nIdx: number) => (
                      <li
                        key={nIdx}
                        className="p-2.5 rounded-lg bg-[#0B1114] border border-white/5 text-xs text-[#A6B2B7]"
                      >
                        {note}
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${selectedInquiry.mobile}`}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>

                <a
                  href={`https://wa.me/${selectedInquiry.mobile.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#202D34] hover:bg-white/10 text-[#F4F6F5] font-bold text-xs flex items-center gap-1.5 border border-white/10"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Open WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-5 py-2.5 rounded-xl bg-[#202D34] text-xs font-semibold text-[#F4F6F5]"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
