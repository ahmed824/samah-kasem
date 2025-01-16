'use client';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePathname } from 'next/navigation'; // Use for path changes
import Loader from '../components/Loader/page';

const queryClient = new QueryClient();

export default function QueryProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);  

    return () => clearTimeout(timer);  
  }, [pathname]);  

  return (
    <QueryClientProvider client={queryClient}>
      {loading ? <Loader /> : children}
    </QueryClientProvider>
  );
}