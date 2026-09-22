import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  queryParams: URLSearchParams;
  isActive: (path: string, exact?: boolean) => boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Read from window.location or fallback to '/'
    if (typeof window !== 'undefined') {
      return window.location.pathname + window.location.search;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (typeof window !== 'undefined') {
      if (to !== window.location.pathname + window.location.search) {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const queryParams = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  const isActive = useCallback((path: string, exact = false): boolean => {
    const currentBase = currentPath.split('?')[0];
    if (exact || path === '/') {
      return currentBase === path;
    }
    return currentBase === path || currentBase.startsWith(`${path}/`);
  }, [currentPath]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate, queryParams, isActive }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
