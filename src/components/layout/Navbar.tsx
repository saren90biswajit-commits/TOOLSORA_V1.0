import { Link } from "react-router-dom";
import { Sparkles, Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 shrink-0 shadow-sm transition-all">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span style={{ fontFamily: "'Poppins', sans-serif" }} className="font-black text-3xl tracking-tighter uppercase"><span className="text-blue-600">TOOLS</span><span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent pr-1">ORA</span></span>
          </Link>
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            100% Free • No Signup Required
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-2">
              Tools <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col py-2">
              <Link to="/youtube-tools/title-generator" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">YouTube Titles</Link>
              <Link to="/tools/thumbnail-downloader" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Thumbnail Downloader</Link>
              <Link to="/instagram-tools/hashtag-generator" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Hashtag Generator</Link>
              <Link to="/instagram-tools/reel-caption-generator" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Caption Generator</Link>
              <Link to="/instagram-tools/bio-generator" className="px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600">Bio Generator</Link>
            </div>
          </div>
          <Link to="/tools" className="hover:text-indigo-600 transition-colors font-medium">Tools</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors font-medium">About</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition-colors font-medium">Contact</Link>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
          <>
            <Link to="/tools">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 shadow-md shadow-indigo-200">
                <Sparkles className="w-4 h-4 mr-2" /> Start Creating Free
              </Button>
            </Link>
          </>
      </div>

      {/* Mobile menu button */}
      <div className="flex md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 border-b border-slate-200 bg-white md:hidden shadow-lg">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link to="/" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/tools" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600" onClick={() => setIsOpen(false)}>All Tools</Link>
            <Link to="/about" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link to="/contact" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Contact Us</Link>
            <Link to="/privacy-policy" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Terms & Conditions</Link>
            <div className="mt-4 flex flex-col gap-2 px-3">
                <>
                  <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg p-3 text-sm font-semibold text-center mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    No Signup Required
                  </div>
                  <Link to="/tools" className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
                      Start Creating Free
                    </Button>
                  </Link>
                </>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
