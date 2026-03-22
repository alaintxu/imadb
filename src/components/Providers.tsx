"use client";

import { enableMapSet } from "immer";
import { Provider } from "react-redux";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import store from "@/store/configureStore";


enableMapSet();

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () => 
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
          },
        }
      }
  ));
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}