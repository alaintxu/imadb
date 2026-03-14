"use client";

import { enableMapSet } from "immer";
import { Provider } from "react-redux";

import ErrorBoundary from "@/components/Error/ErrorBoundary";
import store from "@/store/configureStore";

enableMapSet();

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>{children}</Provider>
    </ErrorBoundary>
  );
}