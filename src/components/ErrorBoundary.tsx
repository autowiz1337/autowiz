
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-8 max-w-md">
                We encountered an unexpected error. Our engineering team has been notified.
            </p>
            <button 
                onClick={() => window.location.reload()}
                className="btn-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2"
            >
                <RefreshCw className="w-4 h-4" /> Reload Application
            </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
