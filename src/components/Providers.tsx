"use client";

import { enableMapSet } from "immer";
import { Provider } from "react-redux";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NeonAuthUIProvider } from "@neondatabase/auth/react/ui";
import ErrorBoundary from "@/components/Error/ErrorBoundary";
import store from "@/store/configureStore";
import { I18nProvider, type Language } from "@/i18n";
import { authClient } from "@/lib/auth/client";
import "@neondatabase/auth/ui/css";


enableMapSet();

interface ProvidersProps {
  children: React.ReactNode;
  initialLanguage?: Language;
}

type NeonProviderAuthClient = React.ComponentProps<typeof NeonAuthUIProvider>["authClient"];

export default function Providers({ children, initialLanguage = "es" }: ProvidersProps) {
  const neonAuthClient = authClient as unknown as NeonProviderAuthClient;

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
          <NeonAuthUIProvider
            authClient={neonAuthClient}
            redirectTo="/"
            social={{ providers: ["google"] }}
          >
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </NeonAuthUIProvider>
        </I18nProvider>
      </Provider>
    </ErrorBoundary>
  );
}