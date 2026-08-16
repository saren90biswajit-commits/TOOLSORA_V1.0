import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ErrorBoundary } from "./ErrorBoundary";
import { Toaster } from "react-hot-toast";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
