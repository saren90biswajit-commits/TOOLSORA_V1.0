import { useState, FormEvent } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Copy, RefreshCw, Check } from "lucide-react";

export function FacebookPageBioGenerator() {
  const [pageName, setPageName] = useState("");
  const [niche, setNiche] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [cta, setCta] = useState("");
  
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateBios = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!pageName || !niche || !description) {
      setError("Please fill in the required fields (Name, Niche, Description).");
      return;
    }

    setLoading(true);
    setError("");
    setBios([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "facebook-page-bio",
          payload: { pageName, niche, description, audience, tone, cta, platform: "Facebook" }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate bios.");
      }

      const data = await response.json();
      setBios(data);
    } catch (err: any) {
      setError("We couldn't generate results right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetForm = () => {
    setPageName("");
    setNiche("");
    setDescription("");
    setAudience("");
    setTone("Professional");
    setCta("");
    setBios([]);
    setError("");
  };

  return (
    <ToolLayout
      title="Facebook Page Bio Generator"
      description='Create a professional and compelling "About" section for your Facebook Business or Creator Page.'
      inputs={
        <form onSubmit={generateBios} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pageName">Page Name *</Label>
            <Input
              id="pageName"
              placeholder="e.g. Mike's Auto Repair"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="niche">Business Niche *</Label>
            <Input
              id="niche"
              placeholder="e.g. Automotive Services"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">What do you do? *</Label>
            <Textarea
              id="description"
              placeholder="e.g. We provide fast, reliable auto repair services in the Chicago area..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="resize-none"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience (Optional)</Label>
            <Input
              id="audience"
              placeholder="e.g. Local car owners"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Brand Tone</Label>
            <select
              id="tone"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Professional & Trustworthy</option>
              <option>Friendly & Local</option>
              <option>Energetic & Fun</option>
              <option>Luxurious & Premium</option>
              <option>Modern & Innovative</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta">Call to Action (Optional)</Label>
            <Input
              id="cta"
              placeholder="e.g. Visit our website to book an appointment"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Bios"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
              Reset
            </Button>
          </div>
        </form>
      }
      results={
        <div className="space-y-6">
          {bios.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900">Generated Page Bios</h3>
              </div>
              {bios.map((bio, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:border-indigo-200 transition-colors">
                  <p className="text-slate-900 leading-relaxed whitespace-pre-wrap pr-12">{bio}</p>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-slate-400 font-medium">{bio.length} characters</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => copyToClipboard(bio, index)}
                    >
                      {copiedIndex === index ? (
                        <span className="flex items-center text-emerald-600"><Check className="w-4 h-4 mr-1" /> Copied</span>
                      ) : (
                        <span className="flex items-center"><Copy className="w-4 h-4 mr-1" /> Copy</span>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={() => generateBios()} className="w-full mt-4" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate More Options
              </Button>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-indigo-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Build Your Page Identity</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Provide details about your business on the left to get a customized, professional Facebook Page bio.
              </p>
            </div>
          )}
        </div>
      }
    />
  );
}
