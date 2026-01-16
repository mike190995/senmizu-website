import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
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
                <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center bg-slate-900/50 rounded-lg border border-slate-700 m-8">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
                    <p className="text-slate-300 mb-4 max-w-md">
                        We encountered an unexpected error while loading this section.
                    </p>
                    <pre className="bg-black/50 p-4 rounded text-xs text-left text-red-300 overflow-auto w-full max-w-lg mb-6">
                        {this.state.error?.message}
                    </pre>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="px-6 py-2 bg-brand-primary text-white rounded-full hover:bg-brand-secondary transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
