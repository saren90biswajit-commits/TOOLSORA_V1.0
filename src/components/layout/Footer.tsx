import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 shrink-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span style={{ fontFamily: "'Poppins', sans-serif" }} className="font-black text-3xl tracking-tighter uppercase"><span className="text-blue-600">TOOLS</span><span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent pr-1">ORA</span></span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs mb-6">
              The all-in-one toolkit for modern creators. Create better content, post smarter, and grow faster.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Tools</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/youtube-tools/title-generator" className="hover:text-indigo-600 transition-colors">YouTube Title Generator</Link></li>
              <li><Link to="/instagram-tools/hashtag-generator" className="hover:text-indigo-600 transition-colors">Hashtag Generator</Link></li>
              <li><Link to="/instagram-tools/reel-caption-generator" className="hover:text-indigo-600 transition-colors">Caption Generator</Link></li>
              <li><Link to="/instagram-tools/bio-generator" className="hover:text-indigo-600 transition-colors">Bio Generator</Link></li>
              <li><Link to="/tiktok-tools/viral-hooks" className="hover:text-indigo-600 transition-colors">Hook Generator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Creator</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/youtube-tools/script-generator" className="hover:text-indigo-600 transition-colors">Script Generator</Link></li>
              <li><Link to="/tools/font-generator" className="hover:text-indigo-600 transition-colors">Font Generator</Link></li>
              <li><Link to="/tools/emoji-picker" className="hover:text-indigo-600 transition-colors">Emoji Picker</Link></li>
              <li><Link to="/tools/color-palette-generator" className="hover:text-indigo-600 transition-colors">Color Palette</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link to="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-indigo-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-indigo-600 transition-colors">Disclaimer</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-indigo-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2026 ToolsOra. All rights reserved. 100% Free Tools.
          </p>
          <div className="flex gap-4 sm:gap-6 text-sm text-slate-500 flex-wrap justify-center">
            <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-slate-900 transition-colors">Terms & Conditions</Link>
            <Link to="/disclaimer" className="hover:text-slate-900 transition-colors">Disclaimer</Link>
            <Link to="/cookie-policy" className="hover:text-slate-900 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
