import { Component, ReactNode, ErrorInfo } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an error reporting service here
    console.error("Uncaught runtime error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    // In many cases, reloading is the safest way to reset app state after a hard crash
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-in fade-in duration-500">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 border-8 border-rose-100/50">
            <AlertCircle className="h-10 w-10 text-rose-500" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-slate-900 tracking-tight">Oops, something went wrong</h2>
          <p className="mb-8 max-w-md text-slate-600 text-lg leading-relaxed">
            We encountered an unexpected error while processing your request. Don't worry, your data is safe. Please try refreshing the page.
          </p>
          <Button 
            onClick={this.handleReset}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-8 shadow-md shadow-indigo-200 flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
