import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
            <p className="text-red-600 mb-6">
              An unexpected error occurred. Please try refreshing the page or navigating back home.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Return Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
