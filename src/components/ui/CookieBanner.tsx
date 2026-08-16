import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Settings } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

interface CookiePreferences {
  essential: boolean; // Always true
  analytics: boolean;
  advertising: boolean;
  functional: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  advertising: false,
  functional: false,
};

const CONSENT_KEY = 'toolsora_cookie_consent';
const CONSENT_PREFS_KEY = 'toolsora_cookie_prefs';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem(CONSENT_KEY);
    if (!hasConsented) {
      // Small delay to prevent layout shift jarring
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences if they exist
      const savedPrefs = localStorage.getItem(CONSENT_PREFS_KEY);
      if (savedPrefs) {
        try {
          setPreferences(JSON.parse(savedPrefs));
        } catch (e) {
          console.error("Failed to parse cookie preferences");
        }
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      advertising: true,
      functional: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectNonEssential = () => {
    savePreferences(DEFAULT_PREFERENCES);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowPreferences(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(CONSENT_KEY, 'true');
    localStorage.setItem(CONSENT_PREFS_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    
    // In a real app, you would trigger GTM/AdSense initialization here 
    // based on the 'advertising' and 'analytics' flags.
  };

  if (!isVisible && !showPreferences) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 md:p-8 pointer-events-none flex justify-center">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 md:p-8 max-w-4xl w-full pointer-events-auto flex flex-col md:flex-row gap-6 items-start md:items-center relative">
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2">We use cookies</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We use essential cookies to keep ToolsOra working and optional cookies for analytics and advertising. You can manage your preferences at any time. Read our <Link to="/cookie-policy" className="text-indigo-600 hover:underline font-medium">Cookie Policy</Link> for more information.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Button 
                variant="outline" 
                onClick={() => setShowPreferences(true)}
                className="whitespace-nowrap"
              >
                <Settings className="w-4 h-4 mr-2" />
                Manage Preferences
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRejectNonEssential}
                className="whitespace-nowrap"
              >
                Reject Non-Essential
              </Button>
              <Button 
                onClick={handleAcceptAll}
                className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      <Dialog.Root open={showPreferences} onOpenChange={setShowPreferences}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-xl rounded-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="flex justify-between items-center mb-2">
              <Dialog.Title className="text-xl font-bold text-slate-900">Cookie Preferences</Dialog.Title>
              <Dialog.Close asChild>
                <button className="rounded-full p-2 hover:bg-slate-100 transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                  <span className="sr-only">Close</span>
                </button>
              </Dialog.Close>
            </div>
            
            <Dialog.Description className="text-sm text-slate-600 mb-6">
              Customize your cookie preferences below. Essential cookies are required for the site to function properly.
            </Dialog.Description>

            <div className="space-y-6">
              {/* Essential */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Essential Cookies</h4>
                  <p className="text-xs text-slate-500 mt-1">Required for the website to function securely and properly.</p>
                </div>
                <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-wider shrink-0">
                  Always Active
                </div>
              </div>

              {/* Functional */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Functional Cookies</h4>
                  <p className="text-xs text-slate-500 mt-1">Enables personalized features and remembers your preferences.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({...preferences, functional: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Analytics Cookies</h4>
                  <p className="text-xs text-slate-500 mt-1">Helps us understand how visitors interact with the website.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Advertising */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Advertising Cookies</h4>
                  <p className="text-xs text-slate-500 mt-1">Used to deliver relevant advertisements and track ad performance.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={preferences.advertising}
                    onChange={(e) => setPreferences({...preferences, advertising: e.target.checked})}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePreferences} className="bg-indigo-600 text-white hover:bg-indigo-700">
                Save Preferences
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
