import { useEffect, useState, ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LegalLayoutProps {
  title: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[900px] mx-auto">
        <div className="mb-10 bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-slate-200 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 mt-2">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-slate-500 font-medium">Last Updated: {lastUpdated}</p>
          )}
        </div>
        
        <div className="space-y-8">
          {children}
        </div>
      </div>

      {/* Back to top button */}
      <div 
        className={`fixed bottom-8 right-8 transition-all duration-300 z-40 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <Button 
          onClick={scrollToTop}
          size="icon"
          className="rounded-full w-12 h-12 shadow-lg bg-slate-900 hover:bg-slate-800 text-white"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
