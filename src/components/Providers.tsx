"use client";

import { enableMapSet } from "immer";
import { Provider } from "react-redux";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import store from "@/store/configureStore";
import { I18nProvider, type Language } from "@/i18n";


enableMapSet();

interface ProvidersProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

export default function Providers({ children, initialLanguage = "es" }: ProvidersProps) {
  const [queryClient] = useState(
    () => 
      new QueryClient({
        defaultOptions: {
          queries: {
            experimental_prefetchInRender: true,
            staleTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
          },
        }
      }
  ));
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <I18nProvider initialLanguage={initialLanguage}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </I18nProvider>
      </Provider>
    </ErrorBoundary>
  );
}