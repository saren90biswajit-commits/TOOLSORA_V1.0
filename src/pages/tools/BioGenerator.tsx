import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, Loader2, Sparkles, Check, UserCircle } from "lucide-react";

export function BioGenerator() {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [interests, setInterests] = useState("");
  const [personality, setPersonality] = useState("Professional");
  const [cta, setCta] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!name || !profession) {
      setError("Please enter your name and profession.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "bio",
          payload: { name, profession, niche, platform, interests, personality, cta }
        }),
      });

      if (!res.ok) { const errData = await res.json().catch(() => null); throw new Error(errData?.error || "Failed to generate bios"); }

      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="Bio Generator"
      description="Create a compelling, professional social media bio that attracts followers and clients."
      inputs={
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name or Brand</Label>
              <Input 
                id="name" 
                placeholder="e.g. Alex Chen" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <select 
                id="platform"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>Instagram</option>
                <option>TikTok</option>
                <option>X (Twitter)</option>
                <option>LinkedIn</option>
                <option>YouTube</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Input 
                id="profession" 
                placeholder="e.g. Graphic Designer" 
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="niche">Your Niche</Label>
              <Input 
                id="niche" 
                placeholder="e.g. UI/UX Design" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests / Hobbies (Optional)</Label>
            <Input 
              id="interests" 
              placeholder="e.g. Coffee lover, traveler" 
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personality">Personality / Tone</Label>
              <select 
                id="personality"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
              >
                <option>Professional</option>
                <option>Creative & Fun</option>
                <option>Minimalist</option>
                <option>Authoritative</option>
                <option>Humorous</option>
                <option>Inspirational</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta">Call-to-Action</Label>
              <Input 
                id="cta" 
                placeholder="e.g. Work with me 👇" 
                value={cta}
                onChange={(e) => setCta(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="pt-4 flex gap-3">
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Bios
            </Button>
            <Button variant="outline" onClick={() => setName("")} disabled={isLoading}>
              Clear
            </Button>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {results.length === 0 && !isLoading ? (
            <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
              <UserCircle className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">Your bios will appear here</h3>
              <p className="text-sm text-slate-500">Fill out your profile details to generate.</p>
            </div>
          ) : null}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium">Crafting the perfect bio...</p>
            </div>
          )}

          {!isLoading && results.map((bio, index) => (
            <Card key={index} className="overflow-hidden border-slate-200 relative group">
              <CardContent className="p-6">
                <div className="whitespace-pre-wrap text-slate-800 leading-relaxed mb-6 font-medium text-lg">
                  {bio}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-400">
                    {bio.length} characters
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopy(bio, index)}>
                      {copiedIndex === index ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }
    />
  );
}
