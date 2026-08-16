import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, Loader2, Sparkles, Check, MessageSquare } from "lucide-react";

export function CaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [captionType, setCaptionType] = useState("Promotional");
  const [tone, setTone] = useState("Inspirational");
  const [length, setLength] = useState("Medium (2-3 paragraphs)");
  const [cta, setCta] = useState("");
  const [count, setCount] = useState("3");
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a topic or summary of your post.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "captions",
          payload: { topic, platform, captionType, tone, length, cta, count: parseInt(count) }
        }),
      });

      if (!res.ok) { const errData = await res.json().catch(() => null); throw new Error(errData?.error || "Failed to generate captions"); }

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
      title="Caption Generator"
      description="Write engaging, platform-optimized captions that drive likes, comments, and saves."
      inputs={
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="topic">What is your post about?</Label>
            <Textarea 
              id="topic" 
              placeholder="e.g. A photo of my new desk setup with mechanical keyboard and ultrawide monitor..." 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-24"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <option>Facebook</option>
                <option>LinkedIn</option>
                <option>X / Twitter</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="captionType">Caption Type</Label>
              <select 
                id="captionType"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={captionType}
                onChange={(e) => setCaptionType(e.target.value)}
              >
                <option>Promotional</option>
                <option>Storytelling</option>
                <option>Educational</option>
                <option>Funny</option>
                <option>Inspirational</option>
                <option>Engagement</option>
                <option>Product</option>
                <option>Personal</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <select 
                id="tone"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Casual</option>
                <option>Professional</option>
                <option>Witty</option>
                <option>Inspirational</option>
                <option>Authoritative</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="length">Length</Label>
              <select 
                id="length"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              >
                <option>Short (1-2 sentences)</option>
                <option>Medium (2-3 paragraphs)</option>
                <option>Long (Micro-blog)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cta">Call-to-Action (Optional)</Label>
            <Input 
              id="cta" 
              placeholder="e.g. Link in bio, Leave a comment, Save for later" 
              value={cta}
              onChange={(e) => setCta(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="pt-4 flex gap-3">
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Captions
            </Button>
            <Button variant="outline" onClick={() => setTopic("")} disabled={isLoading}>
              Clear
            </Button>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {results.length === 0 && !isLoading ? (
            <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
              <MessageSquare className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">Your captions will appear here</h3>
              <p className="text-sm text-slate-500">Provide details about your post to get started.</p>
            </div>
          ) : null}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium">Writing captions...</p>
            </div>
          )}

          {!isLoading && results.map((caption, index) => (
            <Card key={index} className="overflow-hidden border-slate-200 relative group">
              <CardContent className="p-6">
                <div className="whitespace-pre-wrap text-slate-800 leading-relaxed mb-6">
                  {caption}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-medium text-slate-400">
                    {caption.length} characters
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopy(caption, index)}>
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
