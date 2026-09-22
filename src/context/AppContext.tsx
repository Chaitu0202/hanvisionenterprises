import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Inquiry, CompanySettings, InquiryStatus, Product } from '../types';
import { COMPANY_INFO, INITIAL_DEMO_INQUIRIES, PRODUCTS_DATA } from '../data/companyData';

interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  companySettings: CompanySettings;
  updateCompanySettings: (settings: Partial<CompanySettings>) => void;
  products: Product[];
  toggleProductPopular: (id: string) => void;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => string;
  updateInquiryStatus: (id: string, status: InquiryStatus, internalNotes?: string, followUpDate?: string) => void;
  addInquiryNote: (id: string, note: string) => void;
  deleteInquiry: (id: string) => void;
  isAdminAuthenticated: boolean;
  adminAuth: { isAuthenticated: boolean };
  loginAdmin: (username?: string, password?: string) => boolean;
  logoutAdmin: () => void;
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  selectedQuoteProduct: string | null;
  setSelectedQuoteProduct: (productName: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INQUIRIES_STORAGE_KEY = 'hanvision_inquiries_data_v1';
const SETTINGS_STORAGE_KEY = 'hanvision_company_settings_v1';
const ADMIN_AUTH_KEY = 'hanvision_admin_auth_v1';

export function AppProvider({ children }: { children: ReactNode }) {
  // Company settings state
  const [companySettings, setCompanySettings] = useState<CompanySettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load company settings from localStorage', e);
    }
    return COMPANY_INFO;
  });

  // Products state (allows toggling featured/popular status in admin)
  const [products, setProducts] = useState<Product[]>(PRODUCTS_DATA);

  // Inquiries state
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load inquiries from localStorage', e);
    }
    return INITIAL_DEMO_INQUIRIES;
  });

  // Admin auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Prefilled product for quote form
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<string | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Persist inquiries
  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to persist inquiries', e);
    }
  }, [inquiries]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(companySettings));
    } catch (e) {
      console.error('Failed to persist settings', e);
    }
  }, [companySettings]);

  // Persist admin auth
  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_AUTH_KEY, isAdminAuthenticated ? 'true' : 'false');
    } catch (e) {
      console.error('Failed to persist admin state', e);
    }
  }, [isAdminAuthenticated]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateCompanySettings = (settings: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...settings }));
    showToast('Company information updated successfully', 'success');
  };

  const toggleProductPopular = (id: string) => {
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? { ...prod, isPopular: !prod.isPopular } : prod))
    );
  };

  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'updatedAt' | 'status'>): string => {
    const newId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: newId,
      status: 'New',
      createdAt: now,
      updatedAt: now
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    return newId;
  };

  const updateInquiryStatus = (
    id: string,
    status: InquiryStatus,
    internalNotes?: string,
    followUpDate?: string
  ) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          return {
            ...inq,
            status,
            internalNotes: internalNotes !== undefined ? internalNotes : inq.internalNotes,
            followUpDate: followUpDate !== undefined ? followUpDate : inq.followUpDate,
            updatedAt: new Date().toISOString()
          };
        }
        return inq;
      })
    );
    showToast(`Inquiry #${id} status updated`, 'info');
  };

  const addInquiryNote = (id: string, note: string) => {
    setInquiries((prev) =>
      prev.map((inq) => {
        if (inq.id === id) {
          const existing = inq.internalNotes ? inq.internalNotes + '\n' + note : note;
          return {
            ...inq,
            internalNotes: existing,
            updatedAt: new Date().toISOString()
          };
        }
        return inq;
      })
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast(`Inquiry #${id} deleted`, 'info');
  };

  const loginAdmin = (username?: string, password?: string): boolean => {
    if (
      !username ||
      !password ||
      (username === 'admin@hanvision.in' && password === 'hanvision2025')
    ) {
      setIsAdminAuthenticated(true);
      showToast('Signed in to Hanvision Admin Dashboard (Demo)', 'success');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    showToast('Signed out of Admin Dashboard', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        companySettings,
        updateCompanySettings,
        products,
        toggleProductPopular,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        addInquiryNote,
        deleteInquiry,
        isAdminAuthenticated,
        adminAuth: { isAuthenticated: isAdminAuthenticated },
        loginAdmin,
        logoutAdmin,
        toasts,
        showToast,
        removeToast,
        selectedQuoteProduct,
        setSelectedQuoteProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
