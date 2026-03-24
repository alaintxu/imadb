"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import MainErrorView from './MainErrorView';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    override state: { hasError: boolean; error: Error | null } = {
        hasError: false,
        error: null,
    };
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error: error };
    }
    override componentDidCatch(error: any, errorInfo: any) {
        console.error(error, errorInfo);
    }
    override render() {
        if (this.state.hasError) {
            return (
                <MainErrorView error={this.state.error} />
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;